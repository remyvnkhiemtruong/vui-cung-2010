import React, { forwardRef } from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  fullWidth?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      variant = 'primary',
      size = 'md',
      fullWidth = false,
      leftIcon,
      rightIcon,
      className = '',
      disabled,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      'inline-flex items-center justify-center font-extrabold transition-all duration-200 select-none focus:outline-hidden focus-visible:ring-4 focus-visible:ring-rose-500 focus-visible:ring-offset-2';

    const sizeStyles = {
      sm: 'text-xs px-3.5 py-2 rounded-lg gap-1.5',
      md: 'text-sm sm:text-base px-5 py-2.5 rounded-xl gap-2',
      lg: 'text-base sm:text-lg px-6 py-3.5 rounded-xl gap-2.5 shadow-md',
      xl: 'text-lg sm:text-xl md:text-2xl px-8 py-4 sm:py-5 rounded-2xl gap-3 shadow-xl',
    };

    const variantStyles = {
      primary: disabled
        ? 'bg-slate-200 text-slate-400 cursor-not-allowed shadow-none border border-slate-300'
        : 'bg-gradient-to-r from-rose-600 via-rose-500 to-rose-600 hover:from-rose-700 hover:via-rose-600 hover:to-rose-700 text-white shadow-rose-500/30 hover:shadow-rose-500/50 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer active:scale-[0.99]',
      secondary: disabled
        ? 'bg-slate-100 text-slate-400 border border-slate-200 cursor-not-allowed'
        : 'bg-white hover:bg-rose-50/80 text-rose-700 border-2 border-rose-200/90 shadow-xs hover:border-rose-400 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer',
      outline: disabled
        ? 'border-2 border-slate-200 text-slate-400 cursor-not-allowed'
        : 'border-2 border-rose-400 text-rose-700 hover:bg-rose-50 cursor-pointer',
      ghost: disabled
        ? 'text-slate-400 cursor-not-allowed'
        : 'text-rose-700 hover:bg-rose-100/60 cursor-pointer',
    };

    return (
      <button
        ref={ref}
        disabled={disabled}
        className={`
          ${baseStyles}
          ${sizeStyles[size]}
          ${variantStyles[variant]}
          ${fullWidth ? 'w-full' : ''}
          ${className}
        `}
        {...props}
      >
        {leftIcon && <span className="shrink-0">{leftIcon}</span>}
        <span>{children}</span>
        {rightIcon && <span className="shrink-0">{rightIcon}</span>}
      </button>
    );
  }
);

Button.displayName = 'Button';
