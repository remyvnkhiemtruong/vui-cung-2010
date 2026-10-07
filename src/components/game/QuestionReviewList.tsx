'use client';

import React from 'react';
import {
  CheckCircle2,
  XCircle,
  Clock,
  Sparkles,
  HelpCircle,
  Lightbulb,
} from 'lucide-react';
import { PlayerAnswerRecord, Question } from '@/types/quiz';

interface QuestionReviewListProps {
  answers: PlayerAnswerRecord[];
  questions: Question[];
  totalQuestions?: number;
}

export default function QuestionReviewList({
  answers,
  questions,
  totalQuestions,
}: QuestionReviewListProps) {
  const reviewItems = questions
    .slice(0, totalQuestions ?? questions.length)
    .map((question, index) => {
    const record = answers.find((a) => a.questionId === question.id);

    const isAnswered = !!record;
    const isCorrect = record?.isCorrect ?? false;
    const isTimeout = isAnswered && record.selectedAnswer === null;
    const selectedKey = record?.selectedAnswer ?? null;
    const correctKey = question.correctAnswer;

    const selectedOption = selectedKey
      ? question.options.find((opt) => opt.key === selectedKey)
      : null;

    const correctOption = question.options.find((opt) => opt.key === correctKey);

    return {
      index: index + 1,
      question,
      record,
      isCorrect,
      isTimeout,
      selectedKey,
      selectedText: selectedOption?.text,
      correctKey,
      correctText: correctOption?.text,
      scoreAwarded: record?.scoreAwarded ?? 0,
      explanation: question.explanation,
    };
  });

  return (
    <div className="w-full space-y-3.5 select-none animate-in fade-in duration-300">
      {reviewItems.map((item) => {
        // Status Colors & Badges
        let statusBadge = (
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-black bg-rose-100 text-rose-800 border border-rose-200">
            <XCircle className="w-3.5 h-3.5 text-rose-600" />
            Chưa đúng
          </span>
        );
        let borderStyle = 'border-rose-200/90 bg-rose-50/20';

        if (item.isCorrect) {
          statusBadge = (
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-black bg-emerald-100 text-emerald-800 border border-emerald-200">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              Chính xác (+{item.scoreAwarded}đ)
            </span>
          );
          borderStyle = 'border-emerald-200/90 bg-emerald-50/20';
        } else if (item.isTimeout) {
          statusBadge = (
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-black bg-amber-100 text-amber-800 border border-amber-200">
              <Clock className="w-3.5 h-3.5 text-amber-600" />
              Hết giờ (0đ)
            </span>
          );
          borderStyle = 'border-amber-200/90 bg-amber-50/20';
        }

        return (
          <div
            key={item.question.id}
            className={`
              rounded-2xl border-2 p-4 sm:p-5 transition-all bg-white shadow-xs
              ${borderStyle}
            `}
          >
            {/* Header: Question Number, Category & Status Badge */}
            <div className="flex items-center justify-between gap-2 mb-2.5 flex-wrap">
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center justify-center w-7 h-7 rounded-lg bg-rose-600 text-white font-black text-xs shadow-xs">
                  #{item.index}
                </span>
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-rose-500" />
                  {item.question.category || '20/10 Quiz'}
                </span>
              </div>

              <div>{statusBadge}</div>
            </div>

            {/* Question Text */}
            <h3 className="text-sm sm:text-base md:text-lg font-bold text-slate-900 leading-snug mb-3">
              {item.question.question}
            </h3>

            {/* Answers Comparison Layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 sm:gap-3 text-xs sm:text-sm">
              {/* Player's Choice */}
              <div
                className={`
                  p-3 rounded-xl border flex items-start gap-2
                  ${
                    item.isCorrect
                      ? 'bg-emerald-50/80 border-emerald-200 text-emerald-950'
                      : item.isTimeout
                      ? 'bg-amber-50/80 border-amber-200 text-amber-950'
                      : 'bg-rose-50/80 border-rose-200 text-rose-950'
                  }
                `}
              >
                <div className="shrink-0 mt-0.5">
                  <HelpCircle className="w-4 h-4 text-slate-500" />
                </div>
                <div className="min-w-0">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500 leading-none mb-1">
                    Bạn chọn:
                  </div>
                  <div className="font-extrabold leading-snug">
                    {item.isTimeout ? (
                      <span className="italic text-amber-800">
                        Hết giờ (Không chọn kịp)
                      </span>
                    ) : item.selectedKey ? (
                      <span>
                        <strong className="underline decoration-slate-400">
                          {item.selectedKey}.
                        </strong>{' '}
                        {item.selectedText}
                      </span>
                    ) : (
                      <span className="italic text-slate-400">Chưa trả lời</span>
                    )}
                  </div>
                </div>
              </div>

              {/* Correct Answer */}
              <div className="p-3 rounded-xl border bg-emerald-50/90 border-emerald-300 text-emerald-950 flex items-start gap-2">
                <div className="shrink-0 mt-0.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                </div>
                <div className="min-w-0">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 leading-none mb-1">
                    Đáp án đúng:
                  </div>
                  <div className="font-extrabold text-emerald-900 leading-snug">
                    <span className="underline decoration-emerald-500">
                      {item.correctKey}.
                    </span>{' '}
                    {item.correctText}
                  </div>
                </div>
              </div>
            </div>

            {/* Explanation Note */}
            {item.explanation && (
              <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-start gap-1.5 text-xs text-slate-600">
                <Lightbulb className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                <span className="leading-relaxed">
                  <strong>Ghi chú:</strong> {item.explanation}
                </span>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
