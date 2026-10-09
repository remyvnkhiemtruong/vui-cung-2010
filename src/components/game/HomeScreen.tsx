'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Play, Clock3, Trophy, Flame, Sparkles, HelpCircle, Award } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { StageDecorations } from '@/components/decorations/StageDecorations';
import SoundToggle from '@/components/common/SoundToggle';
import MusicPicker from '@/components/common/MusicPicker';
import { HighScoreRecord } from '@/types/quiz';
import { QUESTION_TIME_LIMIT } from '@/utils/gameEngine';

export interface HomeScreenProps {
  onStart: (playerName: string) => void;
  highScore: HighScoreRecord | null;
  totalQuestions?: number;
  bankSize?: number;
  timeLimit?: number;
}

export default function HomeScreen({
  onStart,
  highScore,
  totalQuestions = 12,
  bankSize = totalQuestions,
  timeLimit = QUESTION_TIME_LIMIT,
}: HomeScreenProps) {
  const [playerName, setPlayerName] = useState('');
  const [error, setError] = useState('');
  const trimmed = playerName.trim();

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!trimmed) {
      setError('Please enter a player or team name.');
      return;
    }
    setError('');
    onStart(trimmed);
  };

  return (
    <div className="home-screen relative max-w-6xl">
      <StageDecorations />
      <Card glow className="home-card relative z-10">
        <div className="home-badges flex justify-center items-center gap-2 pr-12">
          <Badge variant="rose" icon={<Sparkles className="w-3.5 h-3.5" />}>
            ENGLISH CLUB | OCTOBER 20
          </Badge>
          <span className="rounded-full bg-amber-50 px-3 py-1 text-[11px] sm:text-xs font-bold text-amber-800">
            {bankSize} in the bank | {totalQuestions} per game
          </span>
        </div>

        <div className="absolute right-3 top-3 z-20 flex items-center gap-1.5">
          <MusicPicker />
          <SoundToggle />
        </div>

        <div className="home-hero">
          <h1 className="home-title text-rose-950">
            CELEBRATE <span className="text-rose-600">20/10</span>
          </h1>
          <p className="home-subtitle mt-1 text-rose-800">
            VIETNAMESE WOMEN&apos;S DAY
          </p>
          <p className="mt-1 text-[11px] sm:text-sm text-slate-600">
            12 teacher-prepared questions | Picture clues | 30 seconds per question
          </p>
        </div>

        <form onSubmit={submit} className="home-form" noValidate>
          <label htmlFor="playerNameInput" className="mb-1 block text-xs sm:text-sm font-extrabold text-rose-950">
            Player or team name
          </label>
          <div className="home-form-controls">
            <input
              id="playerNameInput"
              type="text"
              value={playerName}
              onChange={(e) => { setPlayerName(e.target.value.slice(0, 30)); setError(''); }}
              placeholder="Enter your name or team"
              maxLength={30}
              required
              aria-invalid={!!error}
              aria-describedby={error ? 'player-error' : undefined}
              className="rounded-xl border-2 border-rose-200 bg-white px-4 py-2.5 text-base font-semibold text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-rose-500 focus:ring-2 focus:ring-rose-200"
            />
            <button
              type="submit"
              disabled={!trimmed}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-rose-600 to-pink-600 px-5 py-2.5 text-base font-black text-white shadow-lg transition hover:from-rose-700 hover:to-pink-700 disabled:cursor-not-allowed disabled:opacity-50 focus-visible:ring-4 focus-visible:ring-rose-300"
            >
              <Play className="h-5 w-5 fill-white" aria-hidden="true" />
              START QUIZ
            </button>
          </div>
          {error && <p id="player-error" role="alert" className="mt-1 text-xs font-bold text-red-700">{error}</p>}
        </form>

        <div className="home-rules" aria-label="Game rules">
          <div className="home-rule">
            <Clock3 aria-hidden="true" className="h-5 w-5 text-rose-600" />
            <strong>{timeLimit} seconds</strong>
            <span>for every question</span>
          </div>
          <div className="home-rule">
            <Trophy aria-hidden="true" className="h-5 w-5 text-amber-600" />
            <strong>+100 points</strong>
            <span>plus a speed bonus</span>
          </div>
          <div className="home-rule">
            <Flame aria-hidden="true" className="h-5 w-5 text-orange-600" />
            <strong>3-answer streak</strong>
            <span>earns a combo bonus</span>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-2 text-center text-[11px] sm:text-xs text-slate-600">
          <HelpCircle className="h-3.5 w-3.5 text-rose-600" aria-hidden="true" />
          <span>Choose A, B, C or D | Play solo or as a team</span>
          <Link href="/live/host" className="rounded-full bg-rose-600 px-3 py-1 text-xs font-extrabold text-white hover:bg-rose-700">
            CREATE LIVE ROOM ->
          </Link>
          {highScore && (
            <span className="inline-flex items-center gap-1 font-bold text-amber-800">
              <Award className="h-3.5 w-3.5" />
              Best: {highScore.playerName} ({highScore.score.toLocaleString()} pts)
            </span>
          )}
        </div>
      </Card>
    </div>
  );
}
