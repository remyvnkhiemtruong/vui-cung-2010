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
    screen,
    currentQuestion,
    currentIndex,
    totalQuestions,
    questions,
    bankSize,
    selectedOption,
    isAnswered,
    timeLeft,
    scoreGainedLast,
    stats,
    highScore,
    startGame,
    handleSelectOption,
    handleNextQuestion,
    handlePlayAgain,
    handleGoHome,
  } = useQuizGame();

  return (
    <main className="relative min-h-screen flex flex-col justify-between overflow-x-hidden">
      {/* Background Petals Effect */}
      <PetalCanvas />

      {/* Main Content Area */}
      <div className="relative z-10 flex flex-col grow justify-between py-2 sm:py-4">
        {/* Stage Header (Shown during gameplay & result) */}
        {screen !== 'start' && <Header />}

        {/* Dynamic Screen View */}
        <div className="grow flex items-center justify-center my-2 sm:my-4">
          {screen === 'start' && (
            <HomeScreen
              onStart={startGame}
              highScore={highScore}
              totalQuestions={totalQuestions}
              bankSize={bankSize}
            />
          )}

          {screen === 'playing' && (
            <div className="w-full flex flex-col items-center">
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

        {/* Footer */}
        <footer className="relative z-10 w-full py-3 text-center text-xs text-rose-800/70 select-none">
          Celebrating Vietnamese Women's Day • Designed for schools and live events
        </footer>
      </div>
    </main>
  );
}
