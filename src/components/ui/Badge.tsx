'use client';

import { cn } from '@/lib/utils';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'success' | 'warning' | 'info';
  size?: 'sm' | 'md';
  className?: string;
}

const variantStyles: Record<string, string> = {
  primary: 'bg-primary-500/10 text-primary-600 dark:text-primary-400',
  secondary: 'bg-secondary-500/10 text-secondary-600 dark:text-secondary-400',
  outline: 'border border-current bg-transparent',
  success: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400',
  warning: 'bg-amber-500/10 text-amber-600 dark:text-amber-400',
  info: 'bg-blue-500/10 text-blue-600 dark:text-blue-400',
};

const sizeStyles: Record<string, string> = {
  sm: 'px-2 py-0.5 text-[10px]',
  md: 'px-3 py-1 text-xs',
};

export default function Badge({
  children,
  variant = 'primary',
  size = 'md',
  className,
}: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center font-semibold rounded-full uppercase tracking-wider',
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
    >
      {children}
    </span>
  );
}
