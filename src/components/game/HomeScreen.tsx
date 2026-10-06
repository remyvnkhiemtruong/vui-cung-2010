'use client';

import React, { useState, useRef, useEffect } from 'react';
import {
  Play,
  Clock,
  HelpCircle,
  Trophy,
  Flame,
  User,
  Sparkles,
  AlertCircle,
  X,
  Award,
} from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { StageDecorations } from '@/components/decorations/StageDecorations';
import SoundToggle from '@/components/common/SoundToggle';
import { HighScoreRecord } from '@/types/quiz';
import { QUESTION_TIME_LIMIT } from '@/utils/gameEngine';

export interface HomeScreenProps {
  onStart: (playerName: string) => void;
  highScore: HighScoreRecord | null;
  totalQuestions?: number;
  timeLimit?: number;
}

export default function HomeScreen({
  onStart,
  highScore,
  totalQuestions = 12,
  timeLimit = QUESTION_TIME_LIMIT,
}: HomeScreenProps) {
  const [playerName, setPlayerName] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  // Auto focus input on mount
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const trimmedName = playerName.trim();
  const isValid = trimmedName.length >= 1 && trimmedName.length <= 30;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.length <= 30) {
      setPlayerName(value);
      if (errorMessage && value.trim().length > 0) {
        setErrorMessage(null);
      }
    }
  };

  const handleClearInput = () => {
    setPlayerName('');
    setErrorMessage(null);
    inputRef.current?.focus();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!trimmedName) {
      setErrorMessage('Vui lòng nhập tên người chơi hoặc tên đội để bắt đầu!');
      inputRef.current?.focus();
      return;
    }

    if (trimmedName.length > 30) {
      setErrorMessage('Tên người chơi không được vượt quá 30 ký tự.');
      return;
    }

    setErrorMessage(null);
    onStart(trimmedName);
  };

  return (
    <div className="relative w-full max-w-4xl lg:max-w-5xl mx-auto px-4 py-4 sm:py-8 flex flex-col items-center">
      {/* Background Stage Lighting & Confetti */}
      <StageDecorations />

      {/* Main Stage Card */}
      <Card glow className="w-full z-10 p-6 sm:p-10 md:p-12 relative">
        {/* Sound Toggle Top-Right */}
        <div className="absolute right-4 top-4 z-20">
          <SoundToggle />
        </div>

        {/* Top Celebration Ribbon / Pill */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-5">
          <Badge variant="rose" icon={<Sparkles className="w-4 h-4 text-rose-500 animate-pulse" />}>
            Chào Mừng 20/10
          </Badge>
          <Badge variant="amber" icon={<HelpCircle className="w-4 h-4 text-amber-600" />}>
            {totalQuestions} Questions
          </Badge>
          <Badge variant="emerald" icon={<Clock className="w-4 h-4 text-emerald-600" />}>
            {timeLimit} Seconds / Question
          </Badge>
        </div>

        {/* Hero Title Section */}
        <div className="text-center mb-6 sm:mb-8">
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-rose-950 uppercase leading-none drop-shadow-xs">
            VUI CÙNG{' '}
            <span className="text-rose-600 underline decoration-rose-300 decoration-wavy decoration-3">
              20/10
            </span>
          </h1>
          <div className="text-base sm:text-2xl font-black text-rose-800 tracking-wider uppercase mt-2.5">
            Vietnamese Women&apos;s Day Quiz
          </div>
          <p className="text-sm sm:text-lg md:text-xl font-medium text-slate-700 italic mt-3 max-w-2xl mx-auto">
            “Thử thách kiến thức – Tôn vinh phụ nữ Việt Nam”
          </p>
        </div>

        {/* Player Name Form */}
        <form onSubmit={handleSubmit} className="w-full max-w-xl mx-auto mb-8 sm:mb-10">
          <div className="relative mb-2">
            <label
              htmlFor="playerNameInput"
              className="block text-xs sm:text-sm font-extrabold text-slate-800 mb-2 flex items-center justify-between"
            >
              <span className="flex items-center gap-1.5 text-rose-950">
                <User className="w-4 h-4 text-rose-600" />
                Tên Người Chơi / Tên Đội Thi:
                <span className="text-rose-600">*</span>
              </span>
              <span className="text-xs text-slate-400 font-normal">
                {playerName.length}/30 ký tự
              </span>
            </label>

            <div className="relative">
              <input
                ref={inputRef}
                id="playerNameInput"
                type="text"
                value={playerName}
                onChange={handleInputChange}
                placeholder="Nhập tên của bạn hoặc tên đội (VD: Đội Hoa Hướng Dương...)"
                maxLength={30}
                required
                className={`
                  w-full px-5 py-4 sm:py-5 rounded-2xl border-2 bg-white/95 text-slate-900 text-base sm:text-xl font-semibold shadow-inner transition-all placeholder:text-slate-400 placeholder:font-normal focus:outline-hidden
                  ${
                    errorMessage
                      ? 'border-red-400 ring-2 ring-red-200'
                      : 'border-rose-200 focus:border-rose-500 focus:ring-4 focus:ring-rose-200/50'
                  }
                `}
              />

              {playerName.length > 0 && (
                <button
                  type="button"
                  onClick={handleClearInput}
                  aria-label="Xóa tên"
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-1.5 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>

            {/* Error Message */}
            {errorMessage && (
              <div className="flex items-center gap-1.5 text-red-600 text-xs sm:text-sm font-semibold mt-2 animate-in fade-in duration-200">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}
          </div>

          {/* Big Stage Action Button */}
          <div className="mt-5">
            <Button
              type="submit"
              variant="primary"
              size="xl"
              fullWidth
              disabled={!isValid}
              leftIcon={<Play className="w-6 h-6 sm:w-7 sm:h-7 fill-white" />}
            >
              BẮT ĐẦU CHƠI
            </Button>
            <p className="text-center text-xs text-slate-500 mt-2">
              Bấm Enter hoặc chạm vào nút để bước lên sân khấu
            </p>
          </div>
        </form>

        {/* Game Rules / Highlights for Projectors & Players */}
        <div className="w-full pt-6 sm:pt-8 border-t border-rose-100/90">
          <div className="text-center text-xs sm:text-sm font-extrabold text-slate-500 uppercase tracking-wider mb-4">
            Thể Lệ Cuộc Thi &amp; Cách Tính Điểm
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
            {/* Rule 1 */}
            <div className="bg-white/80 backdrop-blur-xs rounded-2xl p-4 border border-rose-100/80 shadow-xs flex flex-col items-center text-center">
              <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center mb-2.5">
                <Clock className="w-5 h-5" />
              </div>
              <div className="font-extrabold text-slate-800 text-sm sm:text-base">
                {timeLimit}s / Câu hỏi
              </div>
              <p className="text-xs text-slate-600 mt-1">
                Thời gian đếm ngược trực tiếp cho mỗi câu hỏi trắc nghiệm và hình ảnh.
              </p>
            </div>

            {/* Rule 2 */}
            <div className="bg-white/80 backdrop-blur-xs rounded-2xl p-4 border border-rose-100/80 shadow-xs flex flex-col items-center text-center">
              <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center mb-2.5">
                <Trophy className="w-5 h-5" />
              </div>
              <div className="font-extrabold text-slate-800 text-sm sm:text-base">
                +100đ + Thưởng Tốc Độ
              </div>
              <p className="text-xs text-slate-600 mt-1">
                Trả lời đúng nhận +100 điểm, trả lời càng nhanh nhận thêm tối đa +50 điểm.
              </p>
            </div>

            {/* Rule 3 */}
            <div className="bg-white/80 backdrop-blur-xs rounded-2xl p-4 border border-rose-100/80 shadow-xs flex flex-col items-center text-center">
              <div className="w-10 h-10 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center mb-2.5">
                <Flame className="w-5 h-5" />
              </div>
              <div className="font-extrabold text-slate-800 text-sm sm:text-base">
                Combo Streak +20đ
              </div>
              <p className="text-xs text-slate-600 mt-1">
                Duy trì chuỗi đúng từ 3 câu liên tiếp để bứt phá bảng xếp hạng.
              </p>
            </div>
          </div>
        </div>

        {/* High Score Record Banner */}
        {highScore && (
          <div className="mt-6 pt-4 flex items-center justify-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-amber-50/90 border border-amber-200 text-amber-900 text-xs sm:text-sm font-semibold shadow-xs">
              <Award className="w-4 h-4 text-amber-500 shrink-0" />
              <span>
                Kỷ lục sân khấu: <strong>{highScore.playerName}</strong> đạt{' '}
                <strong>{highScore.score.toLocaleString()} điểm</strong> ({highScore.accuracy}%)
              </span>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}
