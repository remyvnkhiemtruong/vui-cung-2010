'use client';

import React from 'react';
import PetalCanvas from '@/components/background/PetalCanvas';
import Header from '@/components/common/Header';
import HomeScreen from '@/components/game/HomeScreen';
import GameHUD from '@/components/game/GameHUD';
import QuestionCard from '@/components/game/QuestionCard';
import ResultScreen from '@/components/game/ResultScreen';
import { useQuizGame } from '@/hooks/useQuizGame';

export default function QuizApp() {
  const {
    screen, currentQuestion, currentIndex, totalQuestions, questions, bankSize,
    selectedOption, isAnswered, timeLeft, scoreGainedLast, stats, highScore,
    startGame, handleSelectOption, handleNextQuestion, handlePlayAgain, handleGoHome,
  } = useQuizGame();

  return (
    <main className="app-shell">
      <PetalCanvas />

      <div className="app-layout relative z-10">
        {screen !== 'start' && <Header />}

        <div className="app-content">
          {screen === 'start' && (
            <HomeScreen
              onStart={startGame}
              highScore={highScore}
              totalQuestions={totalQuestions}
              bankSize={bankSize}
            />
          )}

          {screen === 'playing' && (
            <div className="app-game">
              <GameHUD
                playerName={stats.playerName}
                currentIndex={currentIndex}
                totalQuestions={totalQuestions}
                score={stats.score}
                streak={stats.streak}
                timeLeft={timeLeft}
              />
              <QuestionCard
                question={currentQuestion}
                selectedOption={selectedOption}
                onSelectOption={handleSelectOption}
                isAnswered={isAnswered}
                onNext={handleNextQuestion}
                isLastQuestion={currentIndex === totalQuestions - 1}
                scoreGained={scoreGainedLast}
              />
            </div>
          )}

          {screen === 'result' && (
            <ResultScreen
              stats={stats}
              totalQuestions={totalQuestions}
              questions={questions}
              highScore={highScore}
              onPlayAgain={handlePlayAgain}
              onGoHome={handleGoHome}
            />
          )}
        </div>

        <footer className="app-footer" aria-label="Website credits">
          <span>Questions: <strong>Ms. Phan Thanh Thùy</strong> — English Teacher, Vo Van Kiet High School</span>
          <span className="footer-separator" aria-hidden="true"> • </span>
          <span>System: <strong>Trương Minh Khiêm</strong> — Cohort 52 Student, Ho Chi Minh City University of Education</span>
        </footer>
      </div>
    </main>
  );
}
