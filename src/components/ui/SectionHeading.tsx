'use client';

import { cn } from '@/lib/utils';

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  center?: boolean;
  className?: string;
  gradient?: boolean;
}

export default function SectionHeading({
  title,
  subtitle,
  center = true,
  className,
  gradient = false,
}: SectionHeadingProps) {
  return (
    <div className={cn(center && 'text-center', 'mb-10 lg:mb-14', className)}>
      <h2
        className={cn(
          'text-2xl sm:text-3xl lg:text-4xl font-bold mb-3',
          gradient ? 'gradient-text' : ''
        )}
        style={gradient ? undefined : { color: 'var(--text-primary)' }}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className="text-base sm:text-lg max-w-2xl leading-relaxed"
          style={{
            color: 'var(--text-secondary)',
            marginLeft: center ? 'auto' : undefined,
            marginRight: center ? 'auto' : undefined,
          }}
        >
          {subtitle}
        </p>
      )}
      <div className={cn('mt-4 flex items-center gap-2', center && 'justify-center')}>
        <div className="h-1 w-12 rounded-full bg-primary-500" />
        <div className="h-1 w-6 rounded-full bg-primary-300" />
        <div className="h-1 w-3 rounded-full bg-primary-200" />
      </div>
    </div>
  );
}
