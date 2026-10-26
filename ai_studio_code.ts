export type TeamId = 'BRITAIN' | 'FRANCE' | 'SIAM';
export type Role = TeamId | 'MODERATOR' | 'SPECTATOR';

export type ActionType = 'NEGOTIATE' | 'ATTACK';
export type SiamStrategy = 'CONCEDE' | 'REJECT' | 'DEFEND';
export type SiamNegotiateResponse = 'ACCEPT' | 'COUNTER' | 'REJECT';

export type GamePhase =
  | 'LOBBY'
  | 'ROUND_START'
  | 'CHOOSING_MOVES'
  | 'MOVES_REVEALED'
  | 'ACTION_QUESTIONS'
  | 'SIAM_RESPONSE'
  | 'DUEL_PHASE'
  | 'PREVIEW_SCORE'
  | 'ROUND_SUMMARY'
  | 'GAME_OVER';

export interface Question {
  id: string;
  category: 'A' | 'B' | 'C' | 'D' | 'E';
  difficulty: 'medium' | 'hard' | 'very-hard';
  question: string;
  options: { key: string; text: string }[];
  correctAnswer: string;
  explanation: string;
}

export interface TeamMove {
  action?: ActionType;
  negotiateDemand?: number; // 10, 20, 30, 40, 50
  strategy?: SiamStrategy;
  submitted: boolean;
}

export interface ScoreLog {
  id: string;
  round: number;
  timestamp: number;
  type: string;
  team: TeamId;
  pointsBefore: number;
  change: number;
  pointsAfter: number;
  reason: string;
}

export interface RoomState {
  roomCode: string;
  phase: GamePhase;
  round: number; // 1, 2, 3
  scores: {
    BRITAIN: number;
    FRANCE: number;
    SIAM: number;
  };
  initialScores: {
    BRITAIN: number;
    FRANCE: number;
    SIAM: number;
  };
  moves: {
    BRITAIN?: TeamMove;
    FRANCE?: TeamMove;
    SIAM?: TeamMove;
  };
  movesRevealed: boolean;
  activeQuestions: {
    BRITAIN?: { question: Question; answered?: string; correct?: boolean };
    FRANCE?: { question: Question; answered?: string; correct?: boolean };
    SIAM?: { question: Question; answered?: string; correct?: boolean };
    DUEL?: { question: Question; winner?: TeamId };
  };
  siamDecisions: {
    britainOfferResponse?: {
      action: SiamNegotiateResponse;
      counterPercent?: number;
      finalPercent?: number;
    };
    franceOfferResponse?: {
      action: SiamNegotiateResponse;
      counterPercent?: number;
      finalPercent?: number;
    };
    defenseSuccess?: boolean;
  };
  proposedScoreChanges: {
    team: TeamId;
    change: number;
    reason: string;
  }[];
  history: ScoreLog[];
  usedQuestionIds: string[];
  timerSeconds: number;
  timerActive: boolean;
  winner?: { team: TeamId; changePercent: number };
}