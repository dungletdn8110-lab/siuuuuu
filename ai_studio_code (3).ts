import express from 'express';
import http from 'http';
import { Server, Socket } from 'socket.io';
import path from 'path';
import { RoomState, Role, TeamId } from '../shared/types';
import { calculateProposedChanges, pickUnusedQuestion, calculateWinner } from './gameEngine';

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: '*' }
});

const PORT = process.env.PORT || 3000;

// Bộ nhớ phòng chơi trên RAM
const rooms = new Map<string, RoomState>();

function createDefaultRoom(code: string): RoomState {
  return {
    roomCode: code,
    phase: 'LOBBY',
    round: 1,
    scores: { BRITAIN: 100, FRANCE: 100, SIAM: 200 },
    initialScores: { BRITAIN: 100, FRANCE: 100, SIAM: 200 },
    moves: {},
    movesRevealed: false,
    activeQuestions: {},
    siamDecisions: {},
    proposedScoreChanges: [],
    history: [],
    usedQuestionIds: [],
    timerSeconds: 120,
    timerActive: false,
  };
}

/**
 * Hàm lọc trạng thái bảo mật:
 * KHÔNG gửi lựa chọn của đội khác xuống client cho đến khi Quản trò nhấn Công bố
 */
function getSanitizedStateForRole(state: RoomState, role: Role) {
  const cloned: RoomState = JSON.parse(JSON.stringify(state));

  // Nếu Quản trò hoặc đã công bố thì thấy tất cả
  if (role === 'MODERATOR' || state.movesRevealed) {
    return cloned;
  }

  // Đội chỉ thấy lựa chọn của chính mình
  const maskedMoves: any = {};
  if (cloned.moves.BRITAIN) {
    maskedMoves.BRITAIN = role === 'BRITAIN' ? cloned.moves.BRITAIN : { submitted: true };
  }
  if (cloned.moves.FRANCE) {
    maskedMoves.FRANCE = role === 'FRANCE' ? cloned.moves.FRANCE : { submitted: true };
  }
  if (cloned.moves.SIAM) {
    maskedMoves.SIAM = role === 'SIAM' ? cloned.moves.SIAM : { submitted: true };
  }
  cloned.moves = maskedMoves;

  // Ẩn đáp án đúng của các câu hỏi khỏi người chơi
  if (role !== 'MODERATOR') {
    Object.keys(cloned.activeQuestions).forEach(k => {
      const qObj = (cloned.activeQuestions as any)[k];
      if (qObj?.question) {
        delete qObj.question.correctAnswer;
        delete qObj.question.explanation;
      }
    });
  }

  return cloned;
}

function broadcastState(roomCode: string) {
  const state = rooms.get(roomCode);
  if (!state) return;

  const socketsInRoom = io.sockets.adapter.rooms.get(roomCode);
  if (!socketsInRoom) return;

  socketsInRoom.forEach(socketId => {
    const s = io.sockets.sockets.get(socketId) as any;
    if (s && s.role) {
      const sanitized = getSanitizedStateForRole(state, s.role);
      s.emit('ROOM_STATE_UPDATE', sanitized);
    }
  });
}

// Timer Loop
setInterval(() => {
  rooms.forEach((state, roomCode) => {
    if (state.timerActive && state.timerSeconds > 0) {
      state.timerSeconds -= 1;
      if (state.timerSeconds === 0) {
        state.timerActive = false;
      }
      io.to(roomCode).emit('TIMER_TICK', { seconds: state.timerSeconds, active: state.timerActive });
    }
  });
}, 1000);

io.on('connection', (socket: Socket & { role?: Role; roomCode?: string }) => {
  socket.on('JOIN_ROOM', ({ roomCode, role }: { roomCode: string; role: Role }) => {
    const upperCode = roomCode.toUpperCase().trim();
    if (!rooms.has(upperCode)) {
      rooms.set(upperCode, createDefaultRoom(upperCode));
    }

    socket.join(upperCode);
    socket.role = role;
    socket.roomCode = upperCode;

    const state = rooms.get(upperCode)!;
    socket.emit('ROOM_STATE_UPDATE', getSanitizedStateForRole(state, role));
    socket.to(upperCode).emit('PLAYER_JOINED', { role });
  });

  // QUẢN TRÒ BẮT ĐẦU VÁN CHƠI
  socket.on('START_GAME', () => {
    if (socket.role !== 'MODERATOR' || !socket.roomCode) return;
    const state = rooms.get(socket.roomCode)!;
    state.phase = 'CHOOSING_MOVES';
    state.round = 1;
    state.moves = {};
    state.movesRevealed = false;
    state.timerSeconds = 120;
    state.timerActive = true;
    broadcastState(socket.roomCode);
  });

  // ĐỘI GỬI LỰA CHỌN BÍ MẬT
  socket.on('SUBMIT_MOVE', (moveData: any) => {
    if (!socket.roomCode || !socket.role) return;
    const state = rooms.get(socket.roomCode)!;
    if (state.phase !== 'CHOOSING_MOVES') return;

    if (socket.role === 'BRITAIN' || socket.role === 'FRANCE') {
      state.moves[socket.role] = {
        action: moveData.action,
        negotiateDemand: moveData.negotiateDemand,
        submitted: true
      };
    } else if (socket.role === 'SIAM') {
      state.moves.SIAM = {
        strategy: moveData.strategy,
        submitted: true
      };
    }

    broadcastState(socket.roomCode);
  });

  // QUẢN TRÒ CÔNG BỐ NƯỚC ĐI
  socket.on('REVEAL_MOVES', () => {
    if (socket.role !== 'MODERATOR' || !socket.roomCode) return;
    const state = rooms.get(socket.roomCode)!;
    state.movesRevealed = true;
    state.phase = 'MOVES_REVEALED';
    broadcastState(socket.roomCode);
  });

  // QUẢN TRÒ BẮT ĐẦU CÂU HỎI HÀNH ĐỘNG
  socket.on('START_ACTION_QUESTIONS', () => {
    if (socket.role !== 'MODERATOR' || !socket.roomCode) return;
    const state = rooms.get(socket.roomCode)!;
    state.phase = 'ACTION_QUESTIONS';

    // Chọn câu hỏi Nhóm A cho Anh & Pháp
    if (state.moves.BRITAIN?.submitted && !state.activeQuestions.BRITAIN) {
      const qB = pickUnusedQuestion('A', state.usedQuestionIds);
      state.activeQuestions.BRITAIN = { question: qB };
      state.usedQuestionIds.push(qB.id);
    }
    if (state.moves.FRANCE?.submitted && !state.activeQuestions.FRANCE) {
      const qF = pickUnusedQuestion('A', state.usedQuestionIds);
      state.activeQuestions.FRANCE = { question: qF };
      state.usedQuestionIds.push(qF.id);
    }

    broadcastState(socket.roomCode);
  });

  // ĐỘI NỘP CÂU TRẢ LỜI CÂU HỎI
  socket.on('SUBMIT_ANSWER', ({ team, answerKey }: { team: TeamId; answerKey: string }) => {
    if (!socket.roomCode) return;
    const state = rooms.get(socket.roomCode)!;
    const qObj = (state.activeQuestions as any)[team];
    if (qObj && !qObj.answered) {
      qObj.answered = answerKey;
      // Kiểm tra tự động
      qObj.correct = answerKey === qObj.question.correctAnswer;
    }
    broadcastState(socket.roomCode);
  });

  // QUẢN TRÒ XÁC NHẬN ĐÚNG/SAI BẰNG TAY (NẾU CẦN ĐIỀU CHỈNH)
  socket.on('SET_ANSWER_STATUS', ({ team, isCorrect }: { team: TeamId | 'DUEL'; isCorrect: boolean }) => {
    if (socket.role !== 'MODERATOR' || !socket.roomCode) return;
    const state = rooms.get(socket.roomCode)!;
    const qObj = (state.activeQuestions as any)[team];
    if (qObj) {
      qObj.correct = isCorrect;
    }
    broadcastState(socket.roomCode);
  });

  // TIẾN VÀO GIAI ĐOẠN XIÊM PHẢN HỒI HOẶC ĐỐI ĐẦU
  socket.on('PROCEED_TO_SIAM_OR_DUEL', () => {
    if (socket.role !== 'MODERATOR' || !socket.roomCode) return;
    const state = rooms.get(socket.roomCode)!;

    const bAttack = state.moves.BRITAIN?.action === 'ATTACK' && state.activeQuestions.BRITAIN?.correct;
    const fAttack = state.moves.FRANCE?.action === 'ATTACK' && state.activeQuestions.FRANCE?.correct;

    if (bAttack && fAttack) {
      // Cả hai cùng tấn công -> Xiêm câu C, rồi D cho đối đầu
      state.phase = 'DUEL_PHASE';
      const qSiam = pickUnusedQuestion('C', state.usedQuestionIds);
      state.activeQuestions.SIAM = { question: qSiam };
      state.usedQuestionIds.push(qSiam.id);

      const qDuel = pickUnusedQuestion('D', state.usedQuestionIds);
      state.activeQuestions.DUEL = { question: qDuel };
      state.usedQuestionIds.push(qDuel.id);
    } else {
      // Đàm phán hoặc tấn công đơn lẻ
      state.phase = 'SIAM_RESPONSE';
      const needsDefense = (bAttack && !fAttack) || (fAttack && !bAttack);
      const cat = needsDefense ? 'C' : 'B';
      const qSiam = pickUnusedQuestion(cat, state.usedQuestionIds);
      state.activeQuestions.SIAM = { question: qSiam };
      state.usedQuestionIds.push(qSiam.id);
    }

    broadcastState(socket.roomCode);
  });

  // XIÊM NỘP PHẢN HỒI ĐÀM PHÁN
  socket.on('SUBMIT_SIAM_DECISION', (data: any) => {
    if (!socket.roomCode || socket.role !== 'SIAM') return;
    const state = rooms.get(socket.roomCode)!;

    if (data.target === 'BRITAIN') {
      const demand = state.moves.BRITAIN?.negotiateDemand || 0;
      let final = 0;
      if (data.action === 'ACCEPT') final = demand;
      if (data.action === 'COUNTER') final = Math.round((demand + data.counterPercent) / 2);
      state.siamDecisions.britainOfferResponse = {
        action: data.action,
        counterPercent: data.counterPercent,
        finalPercent: final
      };
    }
    if (data.target === 'FRANCE') {
      const demand = state.moves.FRANCE?.negotiateDemand || 0;
      let final = 0;
      if (data.action === 'ACCEPT') final = demand;
      if (data.action === 'COUNTER') final = Math.round((demand + data.counterPercent) / 2);
      state.siamDecisions.franceOfferResponse = {
        action: data.action,
        counterPercent: data.counterPercent,
        finalPercent: final
      };
    }
    broadcastState(socket.roomCode);
  });

  // QUẢN TRÒ CHỌN ĐỘI THẮNG ĐỐI ĐẦU ANH-PHÁP
  socket.on('SET_DUEL_WINNER', ({ winner }: { winner: TeamId }) => {
    if (socket.role !== 'MODERATOR' || !socket.roomCode) return;
    const state = rooms.get(socket.roomCode)!;
    if (state.activeQuestions.DUEL) {
      state.activeQuestions.DUEL.winner = winner;
    }
    broadcastState(socket.roomCode);
  });

  // QUẢN TRÒ MỞ BẢNG TÍNH ĐIỂM XEM TRƯỚC (PREVIEW)
  socket.on('PREVIEW_SCORE_CHANGES', () => {
    if (socket.role !== 'MODERATOR' || !socket.roomCode) return;
    const state = rooms.get(socket.roomCode)!;
    state.phase = 'PREVIEW_SCORE';
    state.proposedScoreChanges = calculateProposedChanges(state);
    broadcastState(socket.roomCode);
  });

  // QUẢN TRÒ XÁC NHẬN CỘNG/TRỪ ĐIỂM (CHỈ CHẠY 1 LẦN DUY NHẤT)
  socket.on('CONFIRM_SCORE_CHANGES', () => {
    if (socket.role !== 'MODERATOR' || !socket.roomCode) return;
    const state = rooms.get(socket.roomCode)!;
    if (state.phase !== 'PREVIEW_SCORE') return;

    state.proposedScoreChanges.forEach(item => {
      const before = state.scores[item.team];
      const after = before + item.change;
      state.scores[item.team] = after;

      state.history.push({
        id: Math.random().toString(36).substring(2, 9),
        round: state.round,
        timestamp: Date.now(),
        type: 'SCORE_UPDATE',
        team: item.team,
        pointsBefore: before,
        change: item.change,
        pointsAfter: after,
        reason: item.reason
      });
    });

    state.proposedScoreChanges = [];
    state.phase = 'ROUND_SUMMARY';
    broadcastState(socket.roomCode);
  });

  // HOÀN TÁC SỰ KIỆN TÍNH ĐIỂM GẦN NHẤT
  socket.on('UNDO_LAST_ACTION', () => {
    if (socket.role !== 'MODERATOR' || !socket.roomCode) return;
    const state = rooms.get(socket.roomCode)!;
    if (state.history.length === 0) return;

    const last = state.history.pop()!;
    state.scores[last.team] = last.pointsBefore;
    broadcastState(socket.roomCode);
  });

  // CHUYỂN SANG LƯỢT TIẾP THEO HOẶC KẾT THÚC
  socket.on('NEXT_ROUND', () => {
    if (socket.role !== 'MODERATOR' || !socket.roomCode) return;
    const state = rooms.get(socket.roomCode)!;

    if (state.round >= 3) {
      state.phase = 'GAME_OVER';
      state.winner = calculateWinner(state);
    } else {
      state.round += 1;
      state.phase = 'CHOOSING_MOVES';
      state.moves = {};
      state.movesRevealed = false;
      state.activeQuestions = {};
      state.siamDecisions = {};
      state.proposedScoreChanges = [];
      state.timerSeconds = 120;
      state.timerActive = true;
    }
    broadcastState(socket.roomCode);
  });

  // LÀM MỚI VÁN CHƠI
  socket.on('RESET_GAME', () => {
    if (socket.role !== 'MODERATOR' || !socket.roomCode) return;
    rooms.set(socket.roomCode, createDefaultRoom(socket.roomCode));
    broadcastState(socket.roomCode);
  });
});

// Phục vụ frontend tĩnh khi build xong
const clientBuildPath = path.join(__dirname, '../../dist');
app.use(express.static(clientBuildPath));
app.get('*', (req, res) => {
  res.sendFile(path.join(clientBuildPath, 'index.html'));
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});