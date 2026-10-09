import React from 'react';
import { Sparkles, Heart } from 'lucide-react';

export function StageDecorations() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden z-0 select-none" aria-hidden="true">
      {/* Top Center Spotlight Glow */}
      <div className="stage-ambient-glow absolute top-0 left-1/2 -translate-x-1/2 w-[600px] md:w-[900px] h-[350px] bg-gradient-to-b from-rose-300/30 via-pink-200/20 to-transparent blur-3xl rounded-full" />

      {/* Top Left Floral Accent */}
      <div className="absolute -top-10 -left-10 w-48 h-48 md:w-72 md:h-72 bg-radial from-rose-400/20 via-pink-300/10 to-transparent rounded-full blur-2xl" />

      {/* Bottom Right Warm Accent */}
      <div className="absolute -bottom-10 -right-10 w-48 h-48 md:w-80 md:h-80 bg-radial from-amber-300/20 via-rose-300/10 to-transparent rounded-full blur-2xl" />

      {/* Floating Sparkles & Hearts (Static / Subtle) */}
      <div className="absolute top-12 left-[12%] text-rose-300/70 hidden sm:block">
        <Sparkles className="w-6 h-6 animate-pulse" />
      </div>

      <div className="absolute top-20 right-[14%] text-pink-300/60 hidden sm:block">
        <Heart className="w-5 h-5 fill-rose-200/50" />
      </div>

      <div className="absolute bottom-24 left-[8%] text-amber-300/50 hidden md:block">
        <Sparkles className="w-5 h-5" />
      </div>

      <div className="absolute bottom-16 right-[10%] text-rose-300/60 hidden sm:block">
        <Sparkles className="w-6 h-6 animate-pulse" />
      </div>

      {/* Subtle Static Confetti Flakes */}
      <div className="absolute top-28 left-[22%] w-2.5 h-2.5 rounded-full bg-rose-400/30 rotate-12 hidden md:block" />
      <div className="absolute top-36 right-[24%] w-3 h-2 rounded-xs bg-amber-400/30 -rotate-45 hidden md:block" />
      <div className="absolute bottom-32 left-[28%] w-2 h-3 rounded-xs bg-pink-400/30 rotate-45 hidden md:block" />
      <div className="absolute bottom-28 right-[26%] w-2.5 h-2.5 rounded-full bg-rose-300/40 hidden md:block" />
    </div>
  );
}
