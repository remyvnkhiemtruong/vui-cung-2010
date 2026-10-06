export type OptionKey = 'A' | 'B' | 'C' | 'D';

export type QuestionType = 'multiple-choice' | 'text-choice' | 'image-choice';

export interface QuestionOption {
  key: OptionKey;
  text: string;
}

export interface Question {
  id: number | string;
  type: QuestionType;
  question: string;
  options: QuestionOption[];
  correctAnswer: OptionKey;
  image?: string;
  explanation?: string;
  category?: string;
}

export type GameScreen = 'start' | 'playing' | 'result';

export interface PlayerAnswerRecord {
  questionId: number | string;
  selectedAnswer: OptionKey | null; // null if timed out
  correctAnswer: OptionKey;
  isCorrect: boolean;
  timeSpent: number;
  timeLeft: number;
  baseScore: number;
  speedBonus: number;
  streakBonus: number;
  scoreAwarded: number;
}

export interface PlayerStats {
  playerName: string;
  score: number;
  correctCount: number;
  wrongCount: number;
  streak: number;
  maxStreak: number;
  answers: PlayerAnswerRecord[];
}

export interface QuizGameState {
  screen: GameScreen;
  playerName: string;
  currentQuestionIndex: number;
  selectedAnswer: OptionKey | null;
  score: number;
  correctCount: number;
  wrongCount: number;
  currentStreak: number;
  maxStreak: number;
  timeLeft: number;
  questionStartedAt: number;
  answers: PlayerAnswerRecord[];
  isAnswerLocked: boolean;
  lastScoreGained: number;
}

export interface ScoreCalculationResult {
  isCorrect: boolean;
  baseScore: number;
  speedBonus: number;
  streakBonus: number;
  totalGained: number;
  newStreak: number;
}

export interface HighScoreRecord {
  playerName: string;
  score: number;
  bestScore?: number;
  accuracy: number;
  date: string;
}
