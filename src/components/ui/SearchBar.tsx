'use client';

import { useState, useCallback } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { cn } from '@/lib/utils';

interface SearchBarProps {
  placeholder?: string;
  basePath: string;
  className?: string;
}

export default function SearchBar({
  placeholder = 'Cari...',
  basePath,
  className,
}: SearchBarProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('search') || '');

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      const params = new URLSearchParams(searchParams.toString());
      if (query.trim()) {
        params.set('search', query.trim());
        params.delete('page');
      } else {
        params.delete('search');
      }
      const qs = params.toString();
      router.push(qs ? `${basePath}?${qs}` : basePath);
    },
    [query, basePath, router, searchParams]
  );

  const handleClear = () => {
    setQuery('');
    const params = new URLSearchParams(searchParams.toString());
    params.delete('search');
    params.delete('page');
    const qs = params.toString();
    router.push(qs ? `${basePath}?${qs}` : basePath);
  };

  return (
    <form onSubmit={handleSubmit} className={cn('relative max-w-lg w-full', className)} id="search-bar">
      <div className="relative">
        <svg
          className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4"
          style={{ color: 'var(--text-muted)' }}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          className={cn(
            'w-full pl-10 pr-20 py-2.5 rounded-xl text-sm',
            'transition-all duration-200',
            'focus:ring-2 focus:ring-primary-500/30 focus:border-primary-500',
            'outline-none'
          )}
          style={{
            backgroundColor: 'var(--bg-card)',
            color: 'var(--text-primary)',
            border: '1px solid var(--border-color)',
          }}
          id="search-input"
        />
        <div className="absolute right-1.5 top-1/2 -translate-y-1/2 flex items-center gap-1">
          {query && (
            <button
              type="button"
              onClick={handleClear}
              className="p-1.5 rounded-lg transition-colors hover:bg-surface-200 dark:hover:bg-surface-700"
              style={{ color: 'var(--text-muted)' }}
              aria-label="Clear search"
            >
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          )}
          <button
            type="submit"
            className="px-3 py-1.5 rounded-lg text-xs font-semibold text-white bg-primary-500 hover:bg-primary-600 transition-colors"
            id="search-submit"
          >
            Cari
          </button>
        </div>
      </div>
    </form>
  );
}
