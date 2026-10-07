'use client';

import { useReducer, useEffect, useCallback, useSyncExternalStore, useMemo, useState } from 'react';
import {
  HighScoreRecord,
  OptionKey,
  Question,
  PlayerStats,
} from '@/types/quiz';
import {
  questionBank,
  isCorrectAnswer,
  buildQuizRound,
  QUESTIONS_PER_ROUND,
} from '@/data/questions';
import {
  quizGameReducer,
  createInitialGameState,
} from '@/utils/gameEngine';
import { soundManager } from '@/utils/sound';

const STORAGE_KEY_HIGH_SCORE = 'quiz_2010_high_score_v2';

function subscribeHighScore(callback: () => void) {
  window.addEventListener('storage', callback);
  window.addEventListener('quiz_highscore_updated', callback);
  return () => {
    window.removeEventListener('storage', callback);
    window.removeEventListener('quiz_highscore_updated', callback);
  };
}

function getHighScoreSnapshot(): string | null {
  try {
    return localStorage.getItem(STORAGE_KEY_HIGH_SCORE);
  } catch {
    return null;
  }
}

function getServerHighScoreSnapshot(): string | null {
  return null;
}

export function useQuizGame() {
  const [state, dispatch] = useReducer(
    quizGameReducer,
    undefined,
    createInitialGameState
  );

  const [activeQuestions, setActiveQuestions] = useState<Question[]>(
    () => questionBank.slice(0, QUESTIONS_PER_ROUND)
  );

  const rawHighScore = useSyncExternalStore(
    subscribeHighScore,
    getHighScoreSnapshot,
    getServerHighScoreSnapshot
  );

  const highScore = useMemo<HighScoreRecord | null>(() => {
    if (!rawHighScore) return null;
    try {
      return JSON.parse(rawHighScore);
    } catch {
      return null;
    }
  }, [rawHighScore]);

  const totalQuestions = activeQuestions.length;
  const currentQuestion: Question =
    activeQuestions[state.currentQuestionIndex] || activeQuestions[0] || questionBank[0];

  // Active Timer Effect
  useEffect(() => {
    // Only tick when actively in 'playing' state and answer is not yet locked
    if (state.screen !== 'playing' || state.isAnswerLocked) {
      return;
    }

    if (state.timeLeft <= 0) {
      soundManager.playTimeout();
      dispatch({
        type: 'HANDLE_TIMEOUT',
        payload: {
          currentQuestion,
          timestamp: Date.now(),
        },
      });
      return;
    }

    const timerId = setTimeout(() => {
      dispatch({ type: 'TICK_TIMER' });
    }, 1000);

    return () => {
      clearTimeout(timerId);
    };
  }, [
    state.screen,
    state.isAnswerLocked,
    state.timeLeft,
    currentQuestion,
  ]);

  // Action dispatches
  const startGame = useCallback((playerName: string) => {
    setActiveQuestions(buildQuizRound(questionBank, QUESTIONS_PER_ROUND));
    soundManager.playStart();
    dispatch({
      type: 'START_GAME',
      payload: {
        playerName,
        timestamp: Date.now(),
      },
    });
  }, []);

  const selectAnswer = useCallback(
    (key: OptionKey) => {
      if (!state.isAnswerLocked) {
        const isCorrect = isCorrectAnswer(currentQuestion, key);
        if (isCorrect) {
          soundManager.playCorrect();
        } else {
          soundManager.playWrong();
        }
      }
      dispatch({
        type: 'SELECT_ANSWER',
        payload: {
          selectedKey: key,
          currentQuestion,
          timestamp: Date.now(),
        },
      });
    },
    [currentQuestion, state.isAnswerLocked]
  );

  const nextQuestion = useCallback(() => {
    if (state.currentQuestionIndex + 1 >= totalQuestions) {
      soundManager.playResult();
    }
    dispatch({
      type: 'NEXT_QUESTION',
      payload: {
        totalQuestions,
        timestamp: Date.now(),
      },
    });
  }, [totalQuestions, state.currentQuestionIndex]);

  const replayGame = useCallback(() => {
    setActiveQuestions(buildQuizRound(questionBank, QUESTIONS_PER_ROUND));
    soundManager.playStart();
    dispatch({
      type: 'REPLAY_GAME',
      payload: {
        timestamp: Date.now(),
      },
    });
  }, []);

  const goHome = useCallback(() => {
    dispatch({ type: 'GO_HOME' });
  }, []);

  // Save High Score on Result Screen
  useEffect(() => {
    if (state.screen === 'result' && state.score > 0) {
      const accuracy =
        Math.round((state.correctCount / totalQuestions) * 100) || 0;
      const newRecord: HighScoreRecord = {
        playerName: state.playerName,
        score: state.score,
        bestScore: state.score,
        accuracy,
        date: new Date().toLocaleDateString('vi-VN'),
      };

      try {
        const existingRaw = localStorage.getItem(STORAGE_KEY_HIGH_SCORE);
        const existingScore = existingRaw
          ? (JSON.parse(existingRaw).bestScore ?? JSON.parse(existingRaw).score ?? 0)
          : -1;

        if (!existingRaw || state.score > existingScore) {
          localStorage.setItem(
            STORAGE_KEY_HIGH_SCORE,
            JSON.stringify(newRecord)
          );
          window.dispatchEvent(new Event('quiz_highscore_updated'));
        }
      } catch {
        // Ignore localStorage error (SSR / private browsing)
      }
    }
  }, [
    state.screen,
    state.score,
    state.correctCount,
    state.playerName,
    totalQuestions,
  ]);

  // Player stats object for compatibility with ResultScreen and GameHUD
  const stats: PlayerStats = useMemo(
    () => ({
      playerName: state.playerName,
      score: state.score,
      correctCount: state.correctCount,
      wrongCount: state.wrongCount,
      streak: state.currentStreak,
      maxStreak: state.maxStreak,
      answers: state.answers,
    }),
    [
      state.playerName,
      state.score,
      state.correctCount,
      state.wrongCount,
      state.currentStreak,
      state.maxStreak,
      state.answers,
    ]
  );

  return {
    // Core game state
    screen: state.screen,
    playerName: state.playerName,
    currentQuestionIndex: state.currentQuestionIndex,
    selectedAnswer: state.selectedAnswer,
    score: state.score,
    correctCount: state.correctCount,
    wrongCount: state.wrongCount,
    currentStreak: state.currentStreak,
    maxStreak: state.maxStreak,
    timeLeft: state.timeLeft,
    questionStartedAt: state.questionStartedAt,
    answers: state.answers,
    isAnswerLocked: state.isAnswerLocked,
    lastScoreGained: state.lastScoreGained,

    // Derived helpers
    currentQuestion,
    totalQuestions,
    questions: activeQuestions,
    bankSize: questionBank.length,
    highScore,
    stats,

    // Action methods
    startGame,
    selectAnswer,
    nextQuestion,
    replayGame,
    goHome,

    // Aliases for component prop compatibility
    isAnswered: state.isAnswerLocked,
    selectedOption: state.selectedAnswer,
    currentIndex: state.currentQuestionIndex,
    scoreGainedLast: state.lastScoreGained,
    handleSelectOption: selectAnswer,
    handleNextQuestion: nextQuestion,
    handlePlayAgain: replayGame,
    handleGoHome: goHome,
  };
}
