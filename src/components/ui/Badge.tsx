import React from 'react';

export interface BadgeProps {
  children: React.ReactNode;
  variant?: 'rose' | 'amber' | 'emerald' | 'blue' | 'purple' | 'neutral';
  icon?: React.ReactNode;
  className?: string;
}

export function Badge({
  children,
  variant = 'rose',
  icon,
  className = '',
}: BadgeProps) {
  const variantStyles = {
    rose: 'bg-rose-100/90 text-rose-800 border-rose-200/80 shadow-xs',
    amber: 'bg-amber-100/90 text-amber-800 border-amber-200/80 shadow-xs',
    emerald: 'bg-emerald-100/90 text-emerald-800 border-emerald-200/80 shadow-xs',
    blue: 'bg-blue-100/90 text-blue-800 border-blue-200/80 shadow-xs',
    purple: 'bg-purple-100/90 text-purple-800 border-purple-200/80 shadow-xs',
    neutral: 'bg-slate-100/90 text-slate-700 border-slate-200/80 shadow-xs',
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs sm:text-sm font-bold border tracking-wide transition-colors ${variantStyles[variant]} ${className}`}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      <span>{children}</span>
    </span>
  );
}
