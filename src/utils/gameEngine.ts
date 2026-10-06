import {
  QuizGameState,
  ScoreCalculationResult,
  OptionKey,
  Question,
  PlayerAnswerRecord,
} from '@/types/quiz';

export const QUESTION_TIME_LIMIT = 20;

/**
 * Pure calculation function for score, speed bonus, and streak bonus.
 *
 * Rules:
 * - baseScore = 100
 * - speedBonus = Math.round((timeLeft / 20) * 50)
 * - streakBonus: +20 when streak >= 3 after answering correctly
 * - wrong/timeout: 0 points, streak resets to 0
 */
export function calculateQuestionScore(
  isCorrect: boolean,
  timeLeft: number,
  currentStreak: number,
  timeLimit: number = QUESTION_TIME_LIMIT
): ScoreCalculationResult {
  if (!isCorrect) {
    return {
      isCorrect: false,
      baseScore: 0,
      speedBonus: 0,
      streakBonus: 0,
      totalGained: 0,
      newStreak: 0,
    };
  }

  const baseScore = 100;
  const safeTimeLeft = Math.max(0, Math.min(timeLimit, timeLeft));
  const speedBonus = Math.round((safeTimeLeft / timeLimit) * 50);

  const newStreak = currentStreak + 1;
  const streakBonus = newStreak >= 3 ? 20 : 0;
  const totalGained = baseScore + speedBonus + streakBonus;

  return {
    isCorrect: true,
    baseScore,
    speedBonus,
    streakBonus,
    totalGained,
    newStreak,
  };
}

/**
 * Initial state factory.
 */
export function createInitialGameState(): QuizGameState {
  return {
    screen: 'start',
    playerName: '',
    currentQuestionIndex: 0,
    selectedAnswer: null,
    score: 0,
    correctCount: 0,
    wrongCount: 0,
    currentStreak: 0,
    maxStreak: 0,
    timeLeft: QUESTION_TIME_LIMIT,
    questionStartedAt: 0,
    answers: [],
    isAnswerLocked: false,
    lastScoreGained: 0,
  };
}

/**
 * Action definitions for the quiz game reducer.
 */
export type QuizGameAction =
  | { type: 'START_GAME'; payload: { playerName: string; timestamp: number } }
  | { type: 'TICK_TIMER' }
  | {
      type: 'SELECT_ANSWER';
      payload: {
        selectedKey: OptionKey;
        currentQuestion: Question;
        timestamp: number;
      };
    }
  | {
      type: 'HANDLE_TIMEOUT';
      payload: {
        currentQuestion: Question;
        timestamp: number;
      };
    }
  | {
      type: 'NEXT_QUESTION';
      payload: {
        totalQuestions: number;
        timestamp: number;
      };
    }
  | { type: 'REPLAY_GAME'; payload: { timestamp: number } }
  | { type: 'GO_HOME' };

/**
 * Pure Game Engine Reducer.
 * Ensures idempotent transitions, strict lock guards, and zero double-click side effects.
 */
export function quizGameReducer(
  state: QuizGameState,
  action: QuizGameAction
): QuizGameState {
  switch (action.type) {
    case 'START_GAME': {
      return {
        ...createInitialGameState(),
        screen: 'playing',
        playerName: action.payload.playerName.trim(),
        timeLeft: QUESTION_TIME_LIMIT,
        questionStartedAt: action.payload.timestamp,
      };
    }

    case 'TICK_TIMER': {
      // Guard: do not tick if not in active playing state or if answer already locked
      if (state.screen !== 'playing' || state.isAnswerLocked) {
        return state;
      }

      if (state.timeLeft <= 0) {
        return state;
      }

      return {
        ...state,
        timeLeft: state.timeLeft - 1,
      };
    }

    case 'SELECT_ANSWER': {
      // Guard against double clicks or answering outside play screen
      if (state.screen !== 'playing' || state.isAnswerLocked) {
        return state;
      }

      const { selectedKey, currentQuestion, timestamp } = action.payload;
      const isCorrect = selectedKey === currentQuestion.correctAnswer;
      const calc = calculateQuestionScore(isCorrect, state.timeLeft, state.currentStreak);

      const timeSpent = Math.max(0, Math.min(QUESTION_TIME_LIMIT, Math.round((timestamp - state.questionStartedAt) / 1000)));

      const answerRecord: PlayerAnswerRecord = {
        questionId: currentQuestion.id,
        selectedAnswer: selectedKey,
        correctAnswer: currentQuestion.correctAnswer,
        isCorrect,
        timeSpent,
        timeLeft: state.timeLeft,
        baseScore: calc.baseScore,
        speedBonus: calc.speedBonus,
        streakBonus: calc.streakBonus,
        scoreAwarded: calc.totalGained,
      };

      return {
        ...state,
        isAnswerLocked: true,
        selectedAnswer: selectedKey,
        score: state.score + calc.totalGained,
        correctCount: isCorrect ? state.correctCount + 1 : state.correctCount,
        wrongCount: isCorrect ? state.wrongCount : state.wrongCount + 1,
        currentStreak: calc.newStreak,
        maxStreak: Math.max(state.maxStreak, calc.newStreak),
        lastScoreGained: calc.totalGained,
        answers: [...state.answers, answerRecord],
      };
    }

    case 'HANDLE_TIMEOUT': {
      // Guard: already locked or not playing
      if (state.screen !== 'playing' || state.isAnswerLocked) {
        return state;
      }

      const { currentQuestion } = action.payload;
      const timeSpent = QUESTION_TIME_LIMIT;

      const answerRecord: PlayerAnswerRecord = {
        questionId: currentQuestion.id,
        selectedAnswer: null, // Timed out
        correctAnswer: currentQuestion.correctAnswer,
        isCorrect: false,
        timeSpent,
        timeLeft: 0,
        baseScore: 0,
        speedBonus: 0,
        streakBonus: 0,
        scoreAwarded: 0,
      };

      return {
        ...state,
        isAnswerLocked: true,
        selectedAnswer: null,
        timeLeft: 0,
        wrongCount: state.wrongCount + 1,
        currentStreak: 0,
        lastScoreGained: 0,
        answers: [...state.answers, answerRecord],
      };
    }

    case 'NEXT_QUESTION': {
      // Guard: can only advance if actively playing and answer is locked (prevents spam skipping)
      if (state.screen !== 'playing' || !state.isAnswerLocked) {
        return state;
      }

      // Check if this was the last question
      if (state.currentQuestionIndex + 1 >= action.payload.totalQuestions) {
        return {
          ...state,
          screen: 'result',
          isAnswerLocked: true,
        };
      }

      return {
        ...state,
        currentQuestionIndex: state.currentQuestionIndex + 1,
        selectedAnswer: null,
        isAnswerLocked: false,
        timeLeft: QUESTION_TIME_LIMIT,
        lastScoreGained: 0,
        questionStartedAt: action.payload.timestamp,
      };
    }

    case 'REPLAY_GAME': {
      return {
        ...createInitialGameState(),
        screen: 'playing',
        playerName: state.playerName,
        timeLeft: QUESTION_TIME_LIMIT,
        questionStartedAt: action.payload.timestamp,
      };
    }

    case 'GO_HOME': {
      return {
        ...createInitialGameState(),
        screen: 'start',
      };
    }

    default:
      return state;
  }
}
