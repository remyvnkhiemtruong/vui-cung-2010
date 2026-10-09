'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { ImageIcon, FileQuestion } from 'lucide-react';

interface QuestionMediaProps {
  src?: string;
  alt: string;
  category?: string;
  credit?: string;
  sourceUrl?: string;
  className?: string;
}

export default function QuestionMedia({
  src,
  alt,
  category,
  credit,
  sourceUrl,
  className = '',
}: QuestionMediaProps) {
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // If no source is provided or image loading failed
  if (!src || hasError) {
    return (
      <div
        className={`
          relative w-full max-w-md h-56 sm:h-64 md:h-72 rounded-2xl sm:rounded-3xl overflow-hidden
          border-2 border-dashed border-rose-300/80 bg-gradient-to-b from-rose-50/80 to-slate-100/90
          flex flex-col items-center justify-center p-4 text-center select-none shadow-xs shrink-0
          ${className}
        `}
        role="figure"
        aria-label={`Question illustration: ${alt}`}
      >
        <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center mb-2.5 shadow-xs">
          <FileQuestion className="w-6 h-6 sm:w-7 sm:h-7" />
        </div>

        <div className="font-extrabold text-slate-800 text-sm sm:text-base leading-snug mb-1">
          Question Illustration
        </div>

        <p className="text-xs text-slate-500 max-w-xs mb-3 line-clamp-2">
          {alt}
        </p>

        {/* Developer Notice Badge */}
        <div className="px-3 py-1.5 rounded-xl bg-white/90 border border-slate-200 text-[11px] text-slate-600 shadow-xs max-w-xs">
          <span className="font-mono text-rose-600 font-bold">
            {src || 'Image source is not configured'}
          </span>
          <div className="text-[10px] text-slate-400 mt-0.5">
            [Image unavailable - the quiz will continue normally]
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`
        relative w-full max-w-md h-56 sm:h-64 md:h-72 rounded-2xl sm:rounded-3xl overflow-hidden
        border-2 border-rose-200/90 bg-slate-900/5 shadow-md shrink-0 flex items-center justify-center
        p-2 transition-all duration-200
        ${className}
      `}
      role="figure"
      aria-label={`Illustration for: ${alt}`}
    >
      {/* Loading Skeleton */}
      {isLoading && (
        <div className="absolute inset-0 bg-rose-50/60 animate-pulse flex flex-col items-center justify-center z-0">
          <ImageIcon className="w-8 h-8 text-rose-300 animate-bounce" />
          <span className="text-xs font-semibold text-rose-400 mt-2">
            Loading image...
          </span>
        </div>
      )}

      {/* Main Image with object-contain to never crop question content */}
      <Image
        src={src}
        alt={alt}
        fill
        unoptimized
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 450px"
        className={`
          object-contain drop-shadow-xs transition-opacity duration-300
          ${isLoading ? 'opacity-0' : 'opacity-100'}
        `}
        onLoad={() => setIsLoading(false)}
        onError={() => {
          setIsLoading(false);
          setHasError(true);
        }}
        priority
      />

      {credit && <span className="sr-only">{credit}</span>}
    </div>
  );
}
