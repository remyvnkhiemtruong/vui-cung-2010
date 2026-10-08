'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import {
  Award, Trophy, RotateCcw, Home, Flame, CheckCircle2,
  XCircle, ArrowLeft, ArrowRight, ListChecks, Medal,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { PlayerStats, HighScoreRecord, Question } from '@/types/quiz';
import { Card } from '@/components/ui/Card';

interface ResultScreenProps {
  stats: PlayerStats;
  totalQuestions: number;
  questions: Question[];
  highScore?: HighScoreRecord | null;
  onPlayAgain: () => void;
  onGoHome: () => void;
}

export default function ResultScreen({
  stats, totalQuestions, questions, highScore, onPlayAgain, onGoHome,
}: ResultScreenProps) {
  const [reviewIndex, setReviewIndex] = useState<number | null>(null);
  const accuracy = Math.round((stats.correctCount / totalQuestions) * 100) || 0;
  const bestScore = highScore?.bestScore ?? highScore?.score;
  const rank =
    accuracy >= 90 ? 'OCTOBER 20 MASTER 🌸' :
    accuracy >= 75 ? 'VIETNAMESE WOMEN EXPERT 🌷' :
    accuracy >= 50 ? 'RISING QUIZ STAR ✨' : 'KEEP LEARNING & CELEBRATING 💪';

  useEffect(() => {
    if (accuracy < 75 || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const end = Date.now() + 1100;
    let frame = 0;
    const celebrate = () => {
      confetti({ particleCount: 5, spread: 55, origin: { x: 0.1, y: 0.65 } });
      confetti({ particleCount: 5, spread: 55, origin: { x: 0.9, y: 0.65 } });
      if (Date.now() < end) frame = requestAnimationFrame(celebrate);
    };
    celebrate();
    return () => cancelAnimationFrame(frame);
  }, [accuracy]);

  const active = reviewIndex === null ? null : questions[reviewIndex];
  const record = active ? stats.answers.find(a => a.questionId === active.id) : null;
  const correct = active?.options.find(o => o.key === active.correctAnswer);
  const chosen = active?.options.find(o => o.key === record?.selectedAnswer);

  return (
    <div className="results-screen">
      <Card glow className="results-card">
        {reviewIndex === null ? (
          <>
            <div className="text-center">
              <div className="mb-1 inline-flex items-center justify-center gap-2 rounded-full bg-rose-100 px-3 py-1 text-[10px] sm:text-xs font-bold text-rose-700">
                <Trophy className="h-4 w-4" /> Vietnamese Women&apos;s Day
              </div>
              <h2 className="results-title text-slate-900">QUIZ COMPLETE!</h2>
              <p className="mt-1 truncate text-sm font-bold text-rose-800" title={stats.playerName}>
                {stats.playerName || 'Guest'}
              </p>
              <p className="mt-1 text-xs sm:text-sm font-extrabold text-rose-700">{rank}</p>
            </div>

            <div className="rounded-2xl bg-gradient-to-br from-rose-600 to-pink-600 px-4 py-3 text-center text-white shadow-lg">
              <p className="text-[10px] sm:text-xs font-extrabold tracking-widest">TOTAL SCORE</p>
              <p className="results-score">{stats.score.toLocaleString()}</p>
              <p className="text-[10px] sm:text-xs text-rose-100">Correct answers · Speed bonus · Streak bonus</p>
            </div>

            <div className="results-stats" aria-label="Game statistics">
              <div className="results-stat bg-emerald-50">
                <CheckCircle2 className="mx-auto h-4 w-4 text-emerald-700" />
                <strong className="block text-emerald-800">{stats.correctCount}/{totalQuestions}</strong>
                <span className="text-[10px] sm:text-xs font-bold text-slate-600">Correct</span>
              </div>
              <div className="results-stat bg-rose-50">
                <XCircle className="mx-auto h-4 w-4 text-rose-700" />
                <strong className="block text-rose-800">{stats.wrongCount}</strong>
                <span className="text-[10px] sm:text-xs font-bold text-slate-600">Wrong / Timed out</span>
              </div>
              <div className="results-stat bg-blue-50">
                <Medal className="mx-auto h-4 w-4 text-blue-700" />
                <strong className="block text-blue-800">{accuracy}%</strong>
                <span className="text-[10px] sm:text-xs font-bold text-slate-600">Accuracy</span>
              </div>
              <div className="results-stat bg-amber-50">
                <Flame className="mx-auto h-4 w-4 text-orange-700" />
                <strong className="block text-orange-800">{stats.maxStreak}</strong>
                <span className="text-[10px] sm:text-xs font-bold text-slate-600">Best streak</span>
              </div>
            </div>

            {highScore && bestScore !== undefined && (
              <div className="flex items-center justify-center gap-2 text-center text-[10px] sm:text-xs font-bold text-amber-800">
                <Award className="h-4 w-4 shrink-0" />
                <span className="truncate">Device best: {highScore.playerName} — {bestScore.toLocaleString()} pts</span>
              </div>
            )}

            <div className="results-actions">
              <button type="button" onClick={() => setReviewIndex(0)}
                className="inline-flex items-center justify-center gap-1 rounded-xl border-2 border-rose-200 bg-white px-2 py-2.5 text-xs sm:text-sm font-black text-rose-800 hover:bg-rose-50">
                <ListChecks className="h-4 w-4" /> REVIEW
              </button>
              <button type="button" onClick={onPlayAgain}
                className="inline-flex items-center justify-center gap-1 rounded-xl bg-rose-600 px-2 py-2.5 text-xs sm:text-sm font-black text-white hover:bg-rose-700">
                <RotateCcw className="h-4 w-4" /> PLAY AGAIN
              </button>
              <button type="button" onClick={onGoHome}
                className="inline-flex items-center justify-center gap-1 rounded-xl border-2 border-rose-200 bg-white px-2 py-2.5 text-xs sm:text-sm font-black text-rose-800 hover:bg-rose-50">
                <Home className="h-4 w-4" /> HOME
              </button>
            </div>
          </>
        ) : active ? (
          <div className="results-review">
            <div className="flex items-center justify-between gap-2">
              <div>
                <p className="text-[10px] sm:text-xs font-extrabold uppercase text-rose-700">ANSWER REVIEW</p>
                <h2 className="text-base sm:text-xl font-black text-slate-900">Question {reviewIndex + 1} of {totalQuestions}</h2>
              </div>
              <button type="button" onClick={() => setReviewIndex(null)}
                className="rounded-lg border border-rose-200 bg-white px-3 py-2 text-xs font-extrabold text-rose-800 hover:bg-rose-50">
                BACK TO RESULTS
              </button>
            </div>

            <div className="min-h-0 flex-1 flex flex-col justify-center gap-2">
              {active.image && (
                <div className="flex items-center justify-center">
                  <Image
                    src={active.image}
                    alt={`Illustration for ${active.question}`}
                    width={300}
                    height={185}
                    className="review-illustration"
                    unoptimized
                  />
                </div>
              )}
              <p className="text-[10px] sm:text-xs font-bold uppercase text-rose-700">{active.category}</p>
              <h3 className="review-question text-slate-900">{active.question}</h3>

              <div className="review-info">
                <div>
                  <span className="text-[10px] font-bold uppercase text-rose-700">Your answer</span>
                  <p className={`text-xs sm:text-base font-extrabold ${record?.isCorrect ? 'text-emerald-800' : 'text-rose-800'}`}>
                    {record?.selectedAnswer ? `${record.selectedAnswer}. ${chosen?.text}` : "Time's up"}
                  </p>
                </div>
                <div className="!bg-emerald-50">
                  <span className="text-[10px] font-bold uppercase text-emerald-700">Correct answer</span>
                  <p className="text-xs sm:text-base font-extrabold text-emerald-900">
                    {active.correctAnswer}. {correct?.text}
                  </p>
                </div>
              </div>

              {active.explanation && (
                <p className="text-xs sm:text-sm leading-snug text-slate-700">
                  <strong>Explanation: </strong>{active.explanation}
                </p>
              )}
              {active.sourceUrl && (
                <a href={active.sourceUrl} target="_blank" rel="noopener noreferrer"
                   className="text-[10px] sm:text-xs font-bold text-rose-700 underline">
                  Read the historical source ↗
                </a>
              )}
            </div>

            <div className="review-nav">
              <button type="button" disabled={reviewIndex === 0}
                onClick={() => setReviewIndex(i => Math.max(0, (i ?? 0) - 1))}
                className="inline-flex items-center justify-center gap-1 rounded-xl border border-rose-300 bg-white px-2 py-2.5 text-xs sm:text-sm font-black text-rose-800 disabled:opacity-40">
                <ArrowLeft className="h-4 w-4" /> PREVIOUS
              </button>
              <button type="button" disabled={reviewIndex === questions.length - 1}
                onClick={() => setReviewIndex(i => Math.min(questions.length - 1, (i ?? 0) + 1))}
                className="inline-flex items-center justify-center gap-1 rounded-xl bg-rose-600 px-2 py-2.5 text-xs sm:text-sm font-black text-white disabled:opacity-40">
                NEXT <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        ) : null}
      </Card>
    </div>
  );
}
