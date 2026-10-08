'use client';

import React from 'react';
import { Heart } from 'lucide-react';
import SoundToggle from './SoundToggle';

export default function Header() {
  return (
    <header className="app-header relative z-10 flex w-full items-center justify-center px-3 py-1.5 text-center">
      <div className="min-w-0">
        <span className="header-extra block text-[10px] font-extrabold uppercase tracking-wider text-rose-700">
          English Club Mini Game
        </span>
        <h1 className="header-title text-xl sm:text-3xl font-black leading-none text-rose-950">
          CELEBRATE <span className="text-rose-600">20/10</span>
        </h1>
        <p className="header-subtitle text-[10px] sm:text-xs font-semibold uppercase tracking-wide text-rose-700">
          Vietnamese Women&apos;s Day <Heart className="inline h-3 w-3 fill-rose-400" aria-hidden="true" />
        </p>
      </div>
      <div className="absolute right-2 top-1.5">
        <SoundToggle />
      </div>
    </header>
  );
}
