'use client';

import React from 'react';
import { UserRound, Trophy, Flame } from 'lucide-react';
import CircularTimer from './CircularTimer';
import { QUESTION_TIME_LIMIT } from '@/utils/gameEngine';

interface GameHUDProps {
  playerName: string;
  currentIndex: number;
  totalQuestions: number;
  score: number;
  streak: number;
  timeLeft: number;
  maxTime?: number;
}

export default function GameHUD({
  playerName, currentIndex, totalQuestions, score, streak, timeLeft,
  maxTime = QUESTION_TIME_LIMIT,
}: GameHUDProps) {
  const progress = Math.round(((currentIndex + 1) / totalQuestions) * 100);
  return (
    <div className="game-hud-shell">
      <div className="game-hud-inner stage-card rounded-2xl">
        <div className="grid grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-1.5 sm:gap-3">
          <div className="flex min-w-0 items-center gap-1.5 sm:gap-2">
            <UserRound className="h-4 w-4 shrink-0 text-rose-600" aria-hidden="true" />
            <div className="min-w-0">
              <p className="truncate text-xs sm:text-sm font-extrabold text-rose-950" title={playerName}>
                {playerName || 'Guest'}
              </p>
              <p className="text-[10px] sm:text-xs font-bold text-slate-500">Q {currentIndex + 1}/{totalQuestions}</p>
            </div>
          </div>
          <div className="game-hud-timer" aria-label={`Time left: ${timeLeft} seconds`}>
            <CircularTimer timeLeft={timeLeft} maxTime={maxTime} />
          </div>
          <div className="min-w-0 text-right">
            <p className="flex items-center justify-end gap-1 text-sm sm:text-lg font-black text-amber-700">
              <Trophy className="h-4 w-4 shrink-0" aria-hidden="true" />
              {score.toLocaleString()}
            </p>
            <p className="flex items-center justify-end gap-1 text-[10px] sm:text-xs font-bold text-orange-700">
              <Flame className="h-3 w-3" aria-hidden="true" /> Streak {streak}
            </p>
          </div>
        </div>
        <div className="game-hud-progress flex items-center gap-2" aria-label={`Game progress ${progress}%`}>
          <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-rose-100">
            <div className="h-full rounded-full bg-rose-500 transition-[width] duration-300" style={{width: `${progress}%`}} />
          </div>
          <span className="text-[10px] font-bold text-rose-700">{progress}%</span>
        </div>
      </div>
    </div>
  );
}
