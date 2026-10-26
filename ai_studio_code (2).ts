import { RoomState, TeamId } from '../shared/types';
import { QUESTIONS_BANK } from '../shared/questions';

export function calculateProposedChanges(state: RoomState): { team: TeamId; change: number; reason: string }[] {
  const changes: { team: TeamId; change: number; reason: string }[] = [];

  const bMove = state.moves.BRITAIN;
  const fMove = state.moves.FRANCE;
  const sMove = state.moves.SIAM;

  const bActionValid = bMove?.submitted && state.activeQuestions.BRITAIN?.correct === true;
  const fActionValid = fMove?.submitted && state.activeQuestions.FRANCE?.correct === true;

  // 1. Trường hợp cả Anh và Pháp cùng TẤN CÔNG hợp lệ
  if (bActionValid && bMove?.action === 'ATTACK' && fActionValid && fMove?.action === 'ATTACK') {
    // Xiêm trả lời câu phòng thủ
    const siamDefCorrect = state.activeQuestions.SIAM?.correct === true;
    const siamDeduction = siamDefCorrect ? -10 : -20;
    changes.push({
      team: 'SIAM',
      change: siamDeduction,
      reason: `Cả hai nước cùng tấn công. Xiêm ${siamDefCorrect ? 'trả lời đúng phòng thủ (-10)' : 'trả lời sai phòng thủ (-20)'}.`
    });

    // Đối đầu Anh - Pháp
    const duelWinner = state.activeQuestions.DUEL?.winner;
    if (duelWinner === 'BRITAIN') {
      changes.push({ team: 'BRITAIN', change: 30, reason: 'Thắng câu hỏi đối đầu (+30)' });
      changes.push({ team: 'FRANCE', change: -15, reason: 'Thua câu hỏi đối đầu (-15)' });
    } else if (duelWinner === 'FRANCE') {
      changes.push({ team: 'FRANCE', change: 30, reason: 'Thắng câu hỏi đối đầu (+30)' });
      changes.push({ team: 'BRITAIN', change: -15, reason: 'Thua câu hỏi đối đầu (-15)' });
    } else {
      // Cả hai sai hoặc chưa có ai thắng
      changes.push({ team: 'BRITAIN', change: 0, reason: 'Đối đầu không phân định (0)' });
      changes.push({ team: 'FRANCE', change: 0, reason: 'Đối đầu không phân định (0)' });
    }
    return changes;
  }

  // 2. Xử lý nước Anh độc lập (nếu không đối đầu kép)
  if (bActionValid) {
    if (bMove?.action === 'NEGOTIATE') {
      const resp = state.siamDecisions.britainOfferResponse;
      if (resp && resp.action !== 'REJECT' && state.activeQuestions.SIAM?.correct === true) {
        const points = resp.finalPercent || 0;
        changes.push({ team: 'BRITAIN', change: points, reason: `Đàm phán thành công nhượng bộ ${points}% (+${points})` });
        changes.push({ team: 'SIAM', change: -points, reason: `Nhượng bộ Anh ${points}% (-${points})` });
      } else {
        changes.push({ team: 'BRITAIN', change: 0, reason: 'Đàm phán với Xiêm bị từ chối hoặc thất bại (0)' });
      }
    } else if (bMove?.action === 'ATTACK') {
      // Tấn công đơn lẻ của Anh
      const siamDefended = sMove?.strategy === 'DEFEND' && state.activeQuestions.SIAM?.correct === true;
      if (siamDefended) {
        changes.push({ team: 'BRITAIN', change: -30, reason: 'Tấn công thất bại trước phòng thủ Xiêm (-30)' });
        changes.push({ team: 'SIAM', change: 0, reason: 'Phòng thủ thành công cuộc tấn công của Anh (0)' });
      } else {
        changes.push({ team: 'BRITAIN', change: 40, reason: 'Tấn công thành công (+40)' });
        changes.push({ team: 'SIAM', change: -30, reason: 'Phòng thủ thất bại trước cuộc tấn công của Anh (-30)' });
      }
    }
  }

  // 3. Xử lý nước Pháp độc lập (nếu không đối đầu kép)
  if (fActionValid) {
    if (fMove?.action === 'NEGOTIATE') {
      const resp = state.siamDecisions.franceOfferResponse;
      if (resp && resp.action !== 'REJECT' && state.activeQuestions.SIAM?.correct === true) {
        const points = resp.finalPercent || 0;
        changes.push({ team: 'FRANCE', change: points, reason: `Đàm phán thành công nhượng bộ ${points}% (+${points})` });
        changes.push({ team: 'SIAM', change: -points, reason: `Nhượng bộ Pháp ${points}% (-${points})` });
      } else {
        changes.push({ team: 'FRANCE', change: 0, reason: 'Đàm phán với Xiêm bị từ chối hoặc thất bại (0)' });
      }
    } else if (fMove?.action === 'ATTACK') {
      // Tấn công đơn lẻ của Pháp
      const siamDefended = sMove?.strategy === 'DEFEND' && state.activeQuestions.SIAM?.correct === true;
      if (siamDefended) {
        changes.push({ team: 'FRANCE', change: -30, reason: 'Tấn công thất bại trước phòng thủ Xiêm (-30)' });
        changes.push({ team: 'SIAM', change: 0, reason: 'Phòng thủ thành công cuộc tấn công của Pháp (0)' });
      } else {
        changes.push({ team: 'FRANCE', change: 40, reason: 'Tấn công thành công (+40)' });
        changes.push({ team: 'SIAM', change: -30, reason: 'Phòng thủ thất bại trước cuộc tấn công của Pháp (-30)' });
      }
    }
  }

  return changes;
}

export function pickUnusedQuestion(category: 'A' | 'B' | 'C' | 'D' | 'E', usedIds: string[]) {
  const pool = QUESTIONS_BANK.filter(q => q.category === category && !usedIds.includes(q.id));
  if (pool.length > 0) {
    const idx = Math.floor(Math.random() * pool.length);
    return pool[idx];
  }
  // Nếu hết nhóm, lấy câu chưa dùng bất kỳ
  const fallbackPool = QUESTIONS_BANK.filter(q => !usedIds.includes(q.id));
  if (fallbackPool.length > 0) {
    return fallbackPool[Math.floor(Math.random() * fallbackPool.length)];
  }
  // Trường hợp dùng hết toàn bộ ngân hàng
  return QUESTIONS_BANK[0];
}

export function calculateWinner(state: RoomState): { team: TeamId; changePercent: number } {
  const teams: TeamId[] = ['BRITAIN', 'FRANCE', 'SIAM'];
  const results = teams.map(t => {
    const init = state.initialScores[t];
    const final = state.scores[t];
    const changePercent = ((final - init) / init) * 100;
    return { team: t, changePercent, final };
  });

  results.sort((a, b) => {
    if (b.changePercent !== a.changePercent) return b.changePercent - a.changePercent;
    return b.final - a.final;
  });

  return { team: results[0].team, changePercent: Number(results[0].changePercent.toFixed(2)) };
}