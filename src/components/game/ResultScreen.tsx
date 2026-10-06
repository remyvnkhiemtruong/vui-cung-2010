'use client';

import React, { useState, useEffect } from 'react';
import {
  Trophy,
  RotateCcw,
  Home,
  Flame,
  CheckCircle,
  XCircle,
  Percent,
  Award,
  Sparkles,
  ChevronDown,
  ChevronUp,
  ListFilter,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { PlayerStats, HighScoreRecord } from '@/types/quiz';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import QuestionReviewList from './QuestionReviewList';

interface ResultScreenProps {
  stats: PlayerStats;
  totalQuestions: number;
  highScore?: HighScoreRecord | null;
  onPlayAgain: () => void;
  onGoHome: () => void;
}

export default function ResultScreen({
  stats,
  totalQuestions,
  highScore,
  onPlayAgain,
  onGoHome,
}: ResultScreenProps) {
  const [showReview, setShowReview] = useState(false);
  const accuracy = Math.round((stats.correctCount / totalQuestions) * 100) || 0;

  // Exact Rank Titles based on user requirements
  const getRankInfo = () => {
    if (accuracy >= 90) {
      return {
        title: 'BẬC THẦY 20/10 🌸',
        subtext: 'Tuyệt đỉnh xuất sắc! Bạn am hiểu sâu sắc và có niềm tự hào lớn lao về người phụ nữ Việt Nam!',
        badgeColor: 'from-amber-400 via-rose-500 to-pink-500',
        textColor: 'text-amber-800',
        borderColor: 'border-amber-300',
        bgColor: 'bg-amber-50',
      };
    } else if (accuracy >= 75) {
      return {
        title: 'CHUYÊN GIA PHỤ NỮ VIỆT NAM 🌷',
        subtext: 'Thành tích rất ấn tượng! Kiến thức về lịch sử, truyền thống và phụ nữ Việt Nam của bạn vô cùng đáng nể!',
        badgeColor: 'from-rose-500 to-pink-500',
        textColor: 'text-rose-800',
        borderColor: 'border-rose-300',
        bgColor: 'bg-rose-50',
      };
    } else if (accuracy >= 50) {
      return {
        title: 'NGƯỜI CHƠI TIỀM NĂNG ✨',
        subtext: 'Chúc mừng bạn! Bạn đã hoàn thành phần thi với số điểm rất tốt và vượt qua hơn nửa chặng đường.',
        badgeColor: 'from-pink-500 to-purple-500',
        textColor: 'text-purple-800',
        borderColor: 'border-purple-300',
        bgColor: 'bg-purple-50',
      };
    } else {
      return {
        title: 'THỬ LẠI ĐỂ PHÁ KỶ LỤC 💪',
        subtext: 'Cảm ơn bạn đã tham gia! Cùng ôn lại những câu chuyện lịch sử thú vị và bứt phá điểm số cao hơn nhé!',
        badgeColor: 'from-slate-600 to-rose-600',
        textColor: 'text-slate-800',
        borderColor: 'border-slate-300',
        bgColor: 'bg-slate-50',
      };
    }
  };

  const rank = getRankInfo();

  // Fire celebratory confetti when accuracy >= 75%
  useEffect(() => {
    if (accuracy >= 75) {
      if (
        typeof window !== 'undefined' &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches
      ) {
        return;
      }

      const end = Date.now() + 2000;
      const colors = ['#f43f5e', '#ec4899', '#fbbf24', '#ffffff', '#10b981'];

      (function frame() {
        confetti({
          particleCount: 4,
          angle: 60,
          spread: 60,
          origin: { x: 0, y: 0.7 },
          colors: colors,
        });
        confetti({
          particleCount: 4,
          angle: 120,
          spread: 60,
          origin: { x: 1, y: 0.7 },
          colors: colors,
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      })();
    }
  }, [accuracy]);

  const bestScoreVal = highScore?.bestScore ?? highScore?.score;

  return (
    <div className="w-full max-w-3xl lg:max-w-4xl mx-auto px-4 py-4 sm:py-6 flex flex-col items-center select-none animate-in fade-in duration-300">
      <Card glow className="w-full flex flex-col items-center p-6 sm:p-10 md:p-12">
        {/* Stage Crown / Medal Icon */}
        <div
          className={`w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-gradient-to-tr ${rank.badgeColor} flex items-center justify-center text-white shadow-xl shadow-rose-500/25 mb-4 animate-bounce`}
        >
          <Trophy className="w-10 h-10 sm:w-12 sm:h-12 drop-shadow-md" />
        </div>

        {/* Main Heading & Player Name */}
        <div className="text-center mb-6 sm:mb-8">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-rose-100 text-rose-700 font-extrabold text-xs sm:text-sm uppercase tracking-wider mb-2 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-rose-600" />
            <span>Kỷ Niệm Ngày Phụ Nữ Việt Nam 20/10</span>
          </div>

          <h1 className="text-2xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight uppercase">
            HOÀN THÀNH THỬ THÁCH 20/10
          </h1>

          <div className="text-lg sm:text-2xl font-bold text-rose-700 mt-2">
            Người chơi:{' '}
            <span className="font-black text-slate-900 underline decoration-rose-300">
              {stats.playerName || 'Khách'}
            </span>
          </div>

          {/* Fun Title Badge */}
          <div className="mt-3">
            <div
              className={`inline-block px-5 py-2 rounded-2xl border-2 font-black text-base sm:text-xl shadow-sm ${rank.bgColor} ${rank.borderColor} ${rank.textColor}`}
            >
              {rank.title}
            </div>
          </div>

          <p className="text-xs sm:text-sm text-slate-600 mt-2.5 max-w-lg mx-auto leading-relaxed">
            {rank.subtext}
          </p>
        </div>

        {/* Total Score Highlight Card */}
        <div className="w-full bg-gradient-to-br from-rose-600 via-rose-500 to-pink-600 rounded-3xl p-6 sm:p-8 text-white text-center shadow-xl shadow-rose-500/30 mb-6 sm:mb-8 relative overflow-hidden">
          <div className="text-xs sm:text-sm font-bold uppercase tracking-widest text-rose-100">
            TỔNG ĐIỂM ĐẠT ĐƯỢC
          </div>
          <div className="text-5xl sm:text-7xl font-black tracking-tight my-2 drop-shadow-sm">
            {stats.score.toLocaleString()}
          </div>
          <div className="text-xs sm:text-sm text-rose-100 font-medium">
            Bao gồm điểm chính xác (+100/câu), thưởng tốc độ &amp; combo streak
          </div>
        </div>

        {/* 4 Key Metrics Grid */}
        <div className="w-full grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
          {/* Metric 1: Correct / 12 */}
          <div className="bg-emerald-50/90 border border-emerald-200 rounded-2xl p-3.5 sm:p-4 text-center shadow-xs">
            <CheckCircle className="w-6 h-6 mx-auto text-emerald-600 mb-1" />
            <div className="text-xl sm:text-3xl font-black text-emerald-800">
              {stats.correctCount}{' '}
              <span className="text-xs sm:text-sm text-emerald-600 font-bold">
                /{totalQuestions}
              </span>
            </div>
            <div className="text-[11px] sm:text-xs font-bold text-slate-500 mt-0.5">
              Số câu đúng
            </div>
          </div>

          {/* Metric 2: Wrong / 12 */}
          <div className="bg-rose-50/90 border border-rose-200 rounded-2xl p-3.5 sm:p-4 text-center shadow-xs">
            <XCircle className="w-6 h-6 mx-auto text-rose-600 mb-1" />
            <div className="text-xl sm:text-3xl font-black text-rose-800">
              {stats.wrongCount}{' '}
              <span className="text-xs sm:text-sm text-rose-600 font-bold">
                /{totalQuestions}
              </span>
            </div>
            <div className="text-[11px] sm:text-xs font-bold text-slate-500 mt-0.5">
              Số câu sai / Hết giờ
            </div>
          </div>

          {/* Metric 3: Accuracy % */}
          <div className="bg-blue-50/90 border border-blue-200 rounded-2xl p-3.5 sm:p-4 text-center shadow-xs">
            <Percent className="w-6 h-6 mx-auto text-blue-600 mb-1" />
            <div className="text-xl sm:text-3xl font-black text-blue-800">
              {accuracy}%
            </div>
            <div className="text-[11px] sm:text-xs font-bold text-slate-500 mt-0.5">
              Độ chính xác
            </div>
          </div>

          {/* Metric 4: Highest Streak */}
          <div className="bg-orange-50/90 border border-orange-200 rounded-2xl p-3.5 sm:p-4 text-center shadow-xs">
            <Flame className="w-6 h-6 mx-auto text-orange-600 mb-1" />
            <div className="text-xl sm:text-3xl font-black text-orange-800">
              {stats.maxStreak}
            </div>
            <div className="text-[11px] sm:text-xs font-bold text-slate-500 mt-0.5">
              Streak cao nhất
            </div>
          </div>
        </div>

        {/* LocalStorage Record Banner */}
        {highScore && bestScoreVal !== undefined && (
          <div className="w-full mb-6 p-3.5 sm:p-4 rounded-2xl bg-amber-50/90 border border-amber-200/90 text-center shadow-xs">
            <div className="flex items-center justify-center gap-2 text-xs sm:text-sm font-bold text-amber-900 flex-wrap">
              <Award className="w-4 h-4 text-amber-600 shrink-0" />
              <span>
                Kỷ lục trên thiết bị này:{' '}
                <strong className="text-amber-950 font-black">
                  {highScore.playerName}
                </strong>{' '}
                –{' '}
                <strong className="text-rose-700 font-black">
                  {bestScoreVal.toLocaleString()} điểm
                </strong>{' '}
                ({highScore.accuracy}%)
              </span>
              {highScore.date && (
                <span className="text-[11px] text-amber-700/80">
                  • {highScore.date}
                </span>
              )}
            </div>
          </div>
        )}

        {/* Review Section Toggle Button & Content */}
        <div className="w-full mb-6">
          <button
            type="button"
            onClick={() => setShowReview(!showReview)}
            aria-expanded={showReview}
            aria-controls="review-list-section"
            className="w-full py-3.5 px-5 rounded-2xl bg-white hover:bg-rose-50/80 border-2 border-rose-200 text-rose-800 font-extrabold text-sm sm:text-base flex items-center justify-between shadow-xs transition-all cursor-pointer hover:border-rose-400 focus:outline-hidden focus-visible:ring-4 focus-visible:ring-rose-500 focus-visible:ring-offset-2"
          >
            <div className="flex items-center gap-2">
              <ListFilter className="w-4 h-4 text-rose-600" />
              <span>XEM LẠI CÂU TRẢ LỜI</span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-rose-100 text-rose-700 font-bold">
                {totalQuestions} câu
              </span>
            </div>
            <div className="flex items-center gap-1 text-xs text-rose-600">
              <span>{showReview ? 'Thu gọn' : 'Chi tiết'}</span>
              {showReview ? (
                <ChevronUp className="w-5 h-5" />
              ) : (
                <ChevronDown className="w-5 h-5" />
              )}
            </div>
          </button>

          {/* Expandable Review Card List */}
          {showReview && (
            <div id="review-list-section" className="mt-4 pt-2">
              <QuestionReviewList
                answers={stats.answers}
                totalQuestions={totalQuestions}
              />
            </div>
          )}
        </div>

        {/* Action Buttons: Chơi lại & Về trang chủ */}
        <div className="w-full flex flex-col sm:flex-row gap-3 sm:gap-4">
          <Button
            type="button"
            variant="primary"
            size="lg"
            fullWidth
            onClick={onPlayAgain}
            leftIcon={<RotateCcw className="w-5 h-5 sm:w-6 sm:h-6" />}
          >
            CHƠI LẠI
          </Button>

          <Button
            type="button"
            variant="secondary"
            size="lg"
            fullWidth
            onClick={onGoHome}
            leftIcon={<Home className="w-5 h-5 sm:w-6 sm:h-6" />}
          >
            VỀ TRANG CHỦ
          </Button>
        </div>
      </Card>
    </div>
  );
}
