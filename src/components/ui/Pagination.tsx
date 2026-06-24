'use client';

import Link from 'next/link';
import { cn } from '@/lib/utils';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  basePath: string;
  searchParams?: Record<string, string>;
}

export default function Pagination({
  currentPage,
  totalPages,
  basePath,
  searchParams = {},
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const buildUrl = (page: number) => {
    const params = new URLSearchParams(searchParams);
    if (page > 1) {
      params.set('page', String(page));
    } else {
      params.delete('page');
    }
    const qs = params.toString();
    return qs ? `${basePath}?${qs}` : basePath;
  };

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible + 2) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (currentPage > 3) pages.push('...');
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);
      for (let i = start; i <= end; i++) pages.push(i);
      if (currentPage < totalPages - 2) pages.push('...');
      pages.push(totalPages);
    }

    return pages;
  };

  return (
    <nav className="flex items-center justify-center gap-2 mt-10" aria-label="Pagination" id="pagination">
      {/* Previous */}
      {currentPage > 1 ? (
        <Link
          href={buildUrl(currentPage - 1)}
          className="px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:bg-primary-500/10"
          style={{ color: 'var(--text-secondary)', border: '1px solid var(--border-color)' }}
          id="pagination-prev"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </Link>
      ) : (
        <span
          className="px-3 py-2 rounded-lg text-sm opacity-40 cursor-not-allowed"
          style={{ color: 'var(--text-muted)', border: '1px solid var(--border-color)' }}
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </span>
      )}

      {/* Page Numbers */}
      {getPageNumbers().map((page, index) => {
        if (page === '...') {
          return (
            <span
              key={`ellipsis-${index}`}
              className="px-2 py-2 text-sm"
              style={{ color: 'var(--text-muted)' }}
            >
              ···
            </span>
          );
        }

        const pageNum = page as number;
        const isActive = pageNum === currentPage;

        return isActive ? (
          <span
            key={pageNum}
            className={cn(
              'px-3.5 py-2 rounded-lg text-sm font-semibold',
              'bg-primary-500 text-white shadow-md'
            )}
            id={`pagination-page-${pageNum}`}
          >
            {pageNum}
          </span>
        ) : (
          <Link
            key={pageNum}
            href={buildUrl(pageNum)}
            className="px-3.5 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:bg-primary-500/10"
            style={{ color: 'var(--text-secondary)' }}
            id={`pagination-page-${pageNum}`}
          >
            {pageNum}
          </Link>
        );
      })}

      {/* Next */}
      {currentPage < totalPages ? (
        <Link
          href={buildUrl(currentPage + 1)}
          className="px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:bg-primary-500/10"
          style={{ color: 'var(--text-secondary)', border: '1px solid var(--border-color)' }}
          id="pagination-next"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </Link>
      ) : (
        <span
          className="px-3 py-2 rounded-lg text-sm opacity-40 cursor-not-allowed"
          style={{ color: 'var(--text-muted)', border: '1px solid var(--border-color)' }}
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </span>
      )}
    </nav>
  );
}
