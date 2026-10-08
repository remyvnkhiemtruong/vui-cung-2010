'use client';

import React from 'react';
import { Sparkles, Heart } from 'lucide-react';
import SoundToggle from './SoundToggle';

export default function Header() {
  return (
    <header className="relative z-10 w-full py-3 sm:py-4 px-4 flex flex-col items-center justify-center text-center">
      {/* Sound Toggle Button Top-Right */}
      <div className="absolute right-4 top-3 sm:top-4 z-20">
        <SoundToggle />
      </div>

      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-100/80 border border-rose-200 text-rose-700 text-xs sm:text-sm font-semibold mb-2 shadow-xs">
        <Sparkles className="w-3.5 h-3.5 text-rose-500 animate-pulse" />
        <span>ENGLISH CLUB • WOMEN'S DAY SPECIAL</span>
        <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
      </div>

      <h1 className="text-2xl sm:text-4xl md:text-5xl font-black tracking-tight text-rose-950 uppercase drop-shadow-xs">
        CELEBRATE <span className="text-rose-600 underline decoration-rose-300 decoration-wavy decoration-2">20/10</span>
      </h1>
      <p className="text-xs sm:text-sm md:text-base font-medium text-rose-800/80 mt-1 tracking-wider uppercase">
        QUICK QUIZ • VOCABULARY • FUN FACTS • PICTURES
      </p>
    </header>
  );
}
