'use client';

import React from 'react';
import { AlertCircle } from 'lucide-react';

interface CircularTimerProps {
  timeLeft: number;
  maxTime?: number;
  isUrgentThreshold?: number;
}

export default function CircularTimer({
  timeLeft,
  maxTime = 20,
  isUrgentThreshold = 5,
}: CircularTimerProps) {
  const isUrgent = timeLeft <= isUrgentThreshold && timeLeft > 0;
  const isExpired = timeLeft === 0;

  // SVG circle calculations
  const radius = 28;
  const strokeWidth = 5;
  const circumference = 2 * Math.PI * radius;
  const fraction = Math.max(0, Math.min(1, timeLeft / maxTime));
  const strokeDashoffset = circumference * (1 - fraction);

  // Dynamic colors
  let strokeColor = '#10b981'; // Emerald
  let bgHalo = 'rgba(16, 185, 129, 0.15)';
  let textColor = 'text-slate-800';

  if (isExpired) {
    strokeColor = '#ef4444';
    bgHalo = 'rgba(239, 68, 68, 0.2)';
    textColor = 'text-red-600';
  } else if (isUrgent) {
    strokeColor = '#e11d48'; // Rose-600
    bgHalo = 'rgba(225, 29, 72, 0.25)';
    textColor = 'text-rose-600';
  } else if (timeLeft <= 10) {
    strokeColor = '#f59e0b'; // Amber
    bgHalo = 'rgba(245, 158, 11, 0.15)';
    textColor = 'text-amber-700';
  }

  return (
    <div className={`time-ring ${isUrgent?'is-urgent':timeLeft<=10&&timeLeft>0?'is-warning':''} relative flex items-center justify-center select-none`}>
      <div
        className={`relative w-14 h-14 sm:w-20 sm:h-20 flex items-center justify-center rounded-full transition-all duration-300 ${
          isUrgent ? 'scale-105 shadow-lg shadow-rose-500/20 ring-2 ring-rose-400/40 animate-pulse' : ''
        }`}
        style={{ backgroundColor: bgHalo }}
      >
        <svg
          className="w-full h-full -rotate-90"
          viewBox="0 0 68 68"
          aria-hidden="true"
        >
          {/* Background track circle */}
          <circle
            cx="34"
            cy="34"
            r={radius}
            fill="none"
            stroke="rgba(0, 0, 0, 0.08)"
            strokeWidth={strokeWidth}
          />
          {/* Animated active countdown circle */}
          <circle
            cx="34"
            cy="34"
            r={radius}
            fill="none"
            stroke={strokeColor}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            className="timer-stroke transition-all duration-700 ease-linear"
          />
        </svg>

        {/* Center label */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span
            className={`text-lg sm:text-2xl font-black tracking-tight leading-none ${textColor}`}
          >
            {timeLeft}
          </span>
          <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-slate-500">
            sec
          </span>
        </div>

        {/* Urgent warning icon badge */}
        {isUrgent && (
          <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-rose-600 text-white flex items-center justify-center shadow-xs">
            <AlertCircle className="w-3.5 h-3.5" />
          </div>
        )}
      </div>
    </div>
  );
}
