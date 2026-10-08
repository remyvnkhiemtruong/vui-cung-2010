'use client';

import React from 'react';
import { User, Trophy, Flame } from 'lucide-react';
import CircularTimer from './CircularTimer';

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
  playerName,
  currentIndex,
  totalQuestions,
  score,
  streak,
  timeLeft,
  maxTime = 20,
}: GameHUDProps) {
  const currentStep = currentIndex + 1;
  const progressPercent = Math.min(100, (currentStep / totalQuestions) * 100);

  return (
    <div className="w-full max-w-4xl lg:max-w-5xl mx-auto px-3 sm:px-4 mb-3 sm:mb-5 select-none">
      {/* Broadcast Game Show HUD Banner */}
      <div className="stage-card rounded-2xl sm:rounded-3xl p-2.5 sm:p-4 md:p-5 border border-rose-200/80 shadow-xl flex flex-col gap-2.5 sm:gap-3">
        {/* Top Section: 3-column responsive layout (Left: Player, Center: Timer, Right: Score/Streak) */}
        <div className="grid grid-cols-[1fr_auto_1fr] sm:flex sm:items-center sm:justify-between items-center gap-2">
          {/* Left: Player & Question Counter */}
          <div className="flex items-center gap-1.5 sm:gap-3 min-w-0">
            {/* Player Pill */}
            <div className="flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3.5 py-1.5 sm:py-2 rounded-xl bg-white/95 border border-rose-100 shadow-xs min-w-0">
              <div className="w-5 h-5 sm:w-7 sm:h-7 rounded-lg bg-rose-100 text-rose-600 flex items-center justify-center shrink-0">
                <User className="w-3 h-3 sm:w-4 sm:h-4" />
              </div>
              <div className="min-w-0">
                <div className="text-[9px] sm:text-[10px] font-bold text-slate-400 uppercase tracking-wider leading-none hidden sm:block">
                  Player
                </div>
                <div
                  className="text-xs sm:text-sm font-extrabold text-slate-900 truncate max-w-[65px] xs:max-w-[90px] sm:max-w-[140px] md:max-w-[180px]"
                  title={playerName}
                >
                  {playerName || 'Guest'}
                </div>
              </div>
            </div>

            {/* Question Counter Pill */}
            <div className="flex items-center gap-1 px-2 sm:px-3 py-1.5 sm:py-2 rounded-xl bg-purple-50/90 border border-purple-100 shadow-xs shrink-0">
              <span className="text-[10px] sm:text-xs font-bold text-purple-500 uppercase tracking-wider hidden xs:inline">
                Question
              </span>
              <span className="text-xs sm:text-base md:text-lg font-black text-purple-800">
                {currentStep}
              </span>
              <span className="text-[11px] sm:text-xs text-purple-400 font-semibold">
                /{totalQuestions}
              </span>
            </div>
          </div>

          {/* Center: Prominent Circular Countdown Timer */}
          <div className="flex justify-center shrink-0 px-1">
            <CircularTimer timeLeft={timeLeft} maxTime={maxTime} />
          </div>

          {/* Right: Score & Streak Combo */}
          <div className="flex items-center justify-end gap-1.5 sm:gap-2.5 min-w-0">
            {/* Streak Badge */}
            <div
              className={`flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1.5 sm:py-2 rounded-xl border shadow-xs transition-all shrink-0 ${
                streak >= 3
                  ? 'bg-orange-500 text-white border-orange-600 shadow-orange-500/30 animate-pulse'
                  : 'bg-white/95 text-orange-600 border-orange-100'
              }`}
            >
              <Flame
                className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${
                  streak >= 3 ? 'fill-white' : 'text-orange-500 fill-orange-500'
                }`}
              />
              <div className="text-right">
                <div
                  className={`text-[8px] sm:text-[9px] font-bold uppercase tracking-wider leading-none hidden sm:block ${
                    streak >= 3 ? 'text-orange-100' : 'text-slate-400'
                  }`}
                >
                  Streak
                </div>
                <div
                  key={streak}
                  className="text-xs sm:text-sm md:text-base font-black leading-none mt-0.5 animate-score-bump"
                >
                  {streak}
                  {streak >= 3 && (
                    <span className="text-[9px] sm:text-[10px] ml-0.5 opacity-90">+20</span>
                  )}
                </div>
              </div>
            </div>

            {/* Total Score Badge */}
            <div className="flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-xl bg-amber-500 text-white border border-amber-600 shadow-md shadow-amber-500/20 shrink-0">
              <Trophy className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-white shrink-0" />
              <div>
                <div className="text-[8px] sm:text-[9px] font-bold text-amber-100 uppercase tracking-wider leading-none hidden sm:block">
                  Score
                </div>
                <div
                  key={score}
                  className="text-xs sm:text-base md:text-lg font-black leading-none mt-0.5 tracking-tight animate-score-bump"
                >
                  {score.toLocaleString()}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom: Full Game Progress Bar */}
        <div className="w-full flex items-center gap-2 sm:gap-3 pt-0.5 sm:pt-1">
          <div className="text-[9px] sm:text-xs font-bold text-slate-500 uppercase tracking-wider shrink-0">
            Progress
          </div>
          <div className="grow bg-rose-100/70 h-2 sm:h-2.5 rounded-full overflow-hidden p-0.5 shadow-inner">
            <div
              className="bg-gradient-to-r from-rose-500 via-pink-500 to-rose-600 h-full rounded-full transition-all duration-500 ease-out shadow-xs"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <div className="text-[10px] sm:text-xs font-black text-rose-600 shrink-0 min-w-[28px] text-right">
            {Math.round(progressPercent)}%
          </div>
        </div>
      </div>
    </div>
  );
}
