'use client';

import React, { useEffect, useCallback } from 'react';
import QuestionMedia from './QuestionMedia';
import {
  CheckCircle2,
  XCircle,
  ArrowRight,
  Sparkles,
  HelpCircle,
  ImageIcon,
  AlertTriangle,
  Flame,
} from 'lucide-react';
import { Question, OptionKey } from '@/types/quiz';

interface QuestionCardProps {
  question: Question;
  selectedOption: OptionKey | null;
  onSelectOption: (key: OptionKey) => void;
  isAnswered: boolean;
  onNext: () => void;
  isLastQuestion: boolean;
  scoreGained?: number;
}

export default function QuestionCard({
  question,
  selectedOption,
  onSelectOption,
  isAnswered,
  onNext,
  isLastQuestion,
  scoreGained,
}: QuestionCardProps) {
  const isCorrect = selectedOption !== null && selectedOption === question.correctAnswer;
  const isTimeout = isAnswered && selectedOption === null;
  const correctOption = question.options.find((opt) => opt.key === question.correctAnswer);

  // Keyboard accessibility: 1/2/3/4 and A/B/C/D to choose, Enter for Next after answered
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      // Ignore if user is currently typing in an input element
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement
      ) {
        return;
      }

      // If already answered (locked): Enter triggers Next
      if (isAnswered) {
        if (e.key === 'Enter') {
          e.preventDefault();
          onNext();
        }
        return;
      }

      // If active and answer is NOT locked: map 1=A, 2=B, 3=C, 4=D
      const keyMap: Record<string, OptionKey> = {
        '1': 'A',
        a: 'A',
        A: 'A',
        '2': 'B',
        b: 'B',
        B: 'B',
        '3': 'C',
        c: 'C',
        C: 'C',
        '4': 'D',
        d: 'D',
        D: 'D',
      };

      if (keyMap[e.key]) {
        e.preventDefault();
        onSelectOption(keyMap[e.key]);
      }
    },
    [isAnswered, onNext, onSelectOption]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  return (
    <div
      key={question.id}
      className="w-full max-w-4xl lg:max-w-5xl mx-auto px-4 animate-question-in"
    >
      <div className="stage-card rounded-3xl p-5 sm:p-8 md:p-10 border border-rose-200/90 shadow-2xl relative overflow-hidden">
        {/* Top Header Tag & Category */}
        <div className="flex items-center justify-between gap-2 mb-4 sm:mb-6">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-black bg-rose-100 text-rose-800 uppercase tracking-wider shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-rose-600" />
              {question.category || '20/10 Quiz'}
            </span>
            {question.type === 'image-choice' && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-blue-100 text-blue-800 shadow-xs">
                <ImageIcon className="w-3.5 h-3.5 text-blue-600" />
                Câu hỏi hình ảnh
              </span>
            )}
          </div>

          <span className="text-xs sm:text-sm font-semibold text-slate-500 hidden sm:flex items-center gap-1">
            <HelpCircle className="w-4 h-4 text-slate-400" /> Chọn 1 đáp án hoặc nhấn phím A, B, C, D
          </span>
        </div>

        {/* Question Content & Responsive Image Area */}
        <div
          className={`mb-6 sm:mb-8 ${
            question.image
              ? 'flex flex-col md:flex-row items-center md:items-start gap-5 md:gap-8'
              : ''
          }`}
        >
          {/* Responsive Illustration Image with graceful error fallback */}
          {question.image && (
            <QuestionMedia
              src={question.image}
              alt={question.question}
              category={question.category}
              className="md:w-5/12"
            />
          )}

          {/* Large Question Typography for Stage / Projector Screen */}
          <div className="grow flex items-center min-h-[60px] sm:min-h-[90px]">
            <h2 className="text-xl sm:text-3xl md:text-4xl font-black text-slate-900 leading-tight tracking-tight whitespace-pre-line break-words">
              {question.question}
            </h2>
          </div>
        </div>

        {/* 4 Options: Desktop 2x2, Mobile 1-Column */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 mb-6">
          {question.options.map((option) => {
            const isOptionSelected = selectedOption === option.key;
            const isOptionCorrect = option.key === question.correctAnswer;

            // Default State
            let containerStyle =
              'bg-white/95 hover:bg-rose-50/90 border-slate-200 text-slate-900 hover:border-rose-300 shadow-xs hover:shadow-md';
            let badgeStyle =
              'bg-slate-100 text-slate-700 border-slate-300 group-hover:bg-rose-500 group-hover:text-white group-hover:border-rose-500';

            // Post-Answer States
            if (isAnswered) {
              if (isOptionCorrect) {
                // Success State (Green)
                containerStyle =
                  'bg-emerald-50 border-emerald-500 text-emerald-950 font-bold shadow-lg shadow-emerald-500/20 ring-4 ring-emerald-400/40 animate-pulse';
                badgeStyle = 'bg-emerald-600 text-white border-emerald-700';
              } else if (isOptionSelected && !isOptionCorrect) {
                // Error State (Red / Rose)
                containerStyle =
                  'bg-rose-50 border-rose-500 text-rose-950 font-bold shadow-lg shadow-rose-500/20 ring-4 ring-rose-400/40';
                badgeStyle = 'bg-rose-600 text-white border-rose-700';
              } else {
                // Dimmed / Muted State for other options
                containerStyle =
                  'bg-slate-50/70 border-slate-200 text-slate-400 opacity-45 pointer-events-none';
                badgeStyle = 'bg-slate-200 text-slate-400 border-slate-200';
              }
            }

            return (
              <button
                key={option.key}
                type="button"
                disabled={isAnswered}
                onClick={() => onSelectOption(option.key)}
                aria-label={`Lựa chọn ${option.key}: ${option.text}`}
                className={`
                  group quiz-option-btn w-full text-left p-4 sm:p-5 rounded-2xl border-2 flex items-start gap-3.5 sm:gap-4 transition-all duration-200 cursor-pointer disabled:cursor-default focus:outline-hidden focus-visible:ring-4 focus-visible:ring-rose-500 focus-visible:ring-offset-2
                  ${containerStyle}
                `}
              >
                {/* A / B / C / D Option Badge */}
                <div
                  className={`
                    w-9 h-9 sm:w-11 sm:h-11 rounded-xl border-2 flex items-center justify-center font-black text-sm sm:text-lg shrink-0 transition-colors shadow-xs
                    ${badgeStyle}
                  `}
                >
                  {option.key}
                </div>

                {/* Option Text */}
                <div className="grow pt-1 text-sm sm:text-lg md:text-xl font-bold leading-snug">
                  {option.text}
                </div>

                {/* Visual Status Indicator Icon */}
                {isAnswered && (
                  <div className="shrink-0 pt-1">
                    {isOptionCorrect && (
                      <CheckCircle2 className="w-6 h-6 sm:w-7 sm:h-7 text-emerald-600 fill-emerald-100" />
                    )}
                    {isOptionSelected && !isOptionCorrect && (
                      <XCircle className="w-6 h-6 sm:w-7 sm:h-7 text-rose-600 fill-rose-100" />
                    )}
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {/* Feedback Card (Shown immediately upon answer or timeout) */}
        {isAnswered && (
          <div
            className={`
              mt-5 p-5 sm:p-6 rounded-2xl border-2 flex flex-col md:flex-row items-start md:items-center justify-between gap-5 transition-all duration-300 animate-in fade-in slide-in-from-bottom-2
              ${
                isCorrect
                  ? 'bg-emerald-50/95 border-emerald-300 shadow-xl shadow-emerald-500/10'
                  : 'bg-rose-50/95 border-rose-300 shadow-xl shadow-rose-500/10'
              }
            `}
          >
            {/* Feedback Message */}
            <div className="space-y-1.5 grow">
              {/* Header Status */}
              <div className="flex items-center gap-2">
                {isCorrect ? (
                  <>
                    <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0" />
                    <span className="font-black text-emerald-900 text-lg sm:text-2xl tracking-tight">
                      CHÍNH XÁC! 🎉
                    </span>
                    {scoreGained !== undefined && scoreGained > 0 && (
                      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-600 text-white font-black text-xs sm:text-sm shadow-xs">
                        <Flame className="w-3.5 h-3.5 fill-white" />
                        +{scoreGained} điểm
                      </span>
                    )}
                  </>
                ) : isTimeout ? (
                  <>
                    <AlertTriangle className="w-6 h-6 text-amber-600 shrink-0" />
                    <span className="font-black text-rose-900 text-lg sm:text-2xl tracking-tight">
                      HẾT GIỜ! ⏰
                    </span>
                  </>
                ) : (
                  <>
                    <XCircle className="w-6 h-6 text-rose-600 shrink-0" />
                    <span className="font-black text-rose-900 text-lg sm:text-2xl tracking-tight">
                      CHƯA CHÍNH XÁC
                    </span>
                  </>
                )}
              </div>

              {/* Correct Answer Display */}
              <div className="text-sm sm:text-base font-bold text-slate-800">
                Đáp án đúng:{' '}
                <span className="text-emerald-800 font-extrabold underline decoration-emerald-400">
                  {question.correctAnswer}. {correctOption?.text}
                </span>
              </div>

              {/* Explanation Note */}
              {question.explanation && (
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-2xl pt-0.5">
                  {question.explanation}
                </p>
              )}
            </div>

            {/* Next / Result Action Button */}
            <button
              type="button"
              onClick={onNext}
              className="w-full md:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-rose-600 via-rose-500 to-rose-600 hover:from-rose-700 hover:to-rose-600 text-white font-black text-base sm:text-lg shadow-xl shadow-rose-500/30 flex items-center justify-center gap-2.5 transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer shrink-0 focus:outline-hidden focus-visible:ring-4 focus-visible:ring-rose-500 focus-visible:ring-offset-2"
            >
              <span>{isLastQuestion ? 'XEM KẾT QUẢ' : 'CÂU TIẾP THEO →'}</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
