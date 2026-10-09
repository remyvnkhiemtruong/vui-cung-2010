'use client';

import React, { useCallback, useEffect } from 'react';
import { ArrowRight, CheckCircle2, XCircle, ImageIcon, AlertTriangle, Flame } from 'lucide-react';
import QuestionMedia from './QuestionMedia';
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
  question, selectedOption, onSelectOption, isAnswered, onNext,
  isLastQuestion, scoreGained,
}: QuestionCardProps) {
  const isCorrect = isAnswered && selectedOption === question.correctAnswer;
  const isTimeout = isAnswered && selectedOption === null;
  const correctOption = question.options.find(opt => opt.key === question.correctAnswer);

  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (event.target instanceof HTMLInputElement || event.target instanceof HTMLTextAreaElement) return;
    if (isAnswered) {
      if (event.key === 'Enter') {
        event.preventDefault();
        onNext();
      }
      return;
    }
    const choice = ({ a: 'A', b: 'B', c: 'C', d: 'D', 1: 'A', 2: 'B', 3: 'C', 4: 'D' } as Record<string,OptionKey>)[event.key.toLowerCase()];
    if (choice) {
      event.preventDefault();
      onSelectOption(choice);
    }
  }, [isAnswered, onNext, onSelectOption]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  const difficultyLabel =
    question.difficulty === 'warm-up' ? 'WARM-UP' :
    question.difficulty === 'standard' ? 'MAIN ROUND' : 'FINAL CHALLENGE';

  return (
    <div key={question.id} className={`question-shell animate-question-in ${isAnswered ? 'is-answered' : ''}`}>
      <section className="stage-card question-card" aria-label="Quiz question">
        <div className="question-labels text-[10px] sm:text-xs font-extrabold">
          <div className="flex min-w-0 flex-wrap gap-1.5">
            <span className="rounded-full bg-rose-100 px-2.5 py-1 text-rose-800">{question.category}</span>
            <span className="rounded-full bg-amber-50 px-2.5 py-1 text-amber-800">{difficultyLabel}</span>
            {question.image && (
              <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2.5 py-1 text-blue-800">
                <ImageIcon className="h-3 w-3" /> PICTURE
              </span>
            )}
          </div>
          <span className="question-hint text-slate-500">
            {isAnswered ? 'Answer revealed' : 'Choose A / B / C / D'}
          </span>
        </div>

        <div className={`question-content ${question.image ? 'has-image' : ''}`}>
          {question.image && (
            <QuestionMedia
              key={question.id}
              src={question.image}
              alt={question.question}
              category={question.category}
              credit={question.imageCredit}
              sourceUrl={question.imageSourceUrl}
              className="question-media"
            />
          )}
          <h2 className="question-title text-slate-900">{question.question}</h2>
        </div>

        {!isAnswered ? (
          <div className="question-options" aria-label="Answer choices">
            {question.options.map(option => (
              <button
                type="button"
                key={option.key}
                className="quiz-option-btn question-option bg-white text-slate-900 hover:bg-rose-50 hover:border-rose-500 focus:outline-none focus-visible:ring-4 focus-visible:ring-rose-300"
                onClick={() => onSelectOption(option.key)}
                aria-label={`Option ${option.key}: ${option.text}`}
              >
                <span className="question-option-letter">{option.key}</span>
                <span>{option.text}</span>
              </button>
            ))}
          </div>
        ) : (
          <div className={`question-feedback ${isCorrect ? 'correct' : ''}`} role="status" aria-live="polite">
            <div className="question-feedback-header">
              <strong className={`flex items-center gap-2 text-base sm:text-lg font-black ${isCorrect ? 'text-emerald-800' : 'text-rose-800'}`}>
                {isCorrect ? <CheckCircle2 className="h-5 w-5" /> : isTimeout ? <AlertTriangle className="h-5 w-5" /> : <XCircle className="h-5 w-5" />}
                {isCorrect ? 'CORRECT!' : isTimeout ? "TIME'S UP!" : 'NOT QUITE!'}
              </strong>
              {isCorrect && scoreGained ? (
                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-600 px-2.5 py-1 text-xs font-bold text-white">
                  <Flame className="h-3.5 w-3.5" /> +{scoreGained} points
                </span>
              ) : null}
            </div>
            <p className="text-xs sm:text-sm font-extrabold text-slate-900">
              Correct answer: <span className="text-emerald-800">{question.correctAnswer}. {correctOption?.text}</span>
            </p>
            {question.explanation && (
              <p className="question-feedback-explanation text-slate-700">{question.explanation}</p>
            )}
            <div className="flex items-center justify-between gap-2">
              {question.sourceUrl ? (
                <a href={question.sourceUrl} target="_blank" rel="noopener noreferrer"
                   className="truncate text-[10px] sm:text-xs font-bold text-rose-700 underline underline-offset-2">
                  Read the source
                </a>
              ) : <span />}
              <button
                type="button"
                onClick={onNext}
                className="question-next inline-flex items-center justify-center gap-2 bg-gradient-to-r from-rose-600 to-pink-600 px-4 font-black text-xs sm:text-sm text-white shadow-lg hover:from-rose-700 hover:to-pink-700 focus-visible:ring-4 focus-visible:ring-rose-300"
              >
                {isLastQuestion ? 'VIEW RESULTS' : 'NEXT QUESTION'} <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
