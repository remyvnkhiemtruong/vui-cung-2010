import React from 'react';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  glow?: boolean;
}

export function Card({
  children,
  glow = false,
  className = '',
  ...props
}: CardProps) {
  return (
    <div
      className={`
        stage-card rounded-3xl p-6 sm:p-8 md:p-10 border border-rose-200/80 shadow-2xl relative
        ${glow ? 'stage-glow ring-2 ring-rose-400/20' : ''}
        ${className}
      `}
      {...props}
    >
      {children}
    </div>
  );
}
