'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTheme } from 'next-themes';
import { cn } from '@/lib/utils';
import { NAV_ITEMS } from '@/lib/constants';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [prevPathname, setPrevPathname] = useState<string | null>(null);
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  if (pathname !== prevPathname) {
    setPrevPathname(pathname);
    setIsOpen(false);
  }

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled ? 'shadow-md' : 'shadow-sm',
      )}
      style={{ backgroundColor: 'var(--navbar-bg)' }}
    >
      {/* thin red-white government accent stripe */}
      <div className="h-1.5 flex">
        <div className="flex-1 bg-red-600" />
        <div className="flex-1 bg-white border-b border-gray-200" />
      </div>

      <nav className="container-custom flex items-center justify-between py-2.5" id="main-nav">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group" id="nav-logo">
          <div className="w-10 h-10 rounded-lg bg-blue-600 flex items-center justify-center shadow group-hover:bg-blue-700 transition-colors">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
          </div>
          <div className="flex flex-col leading-tight">
            <span className="text-sm font-extrabold text-slate-800 dark:text-slate-100">Desa Jlubang</span>
            <span className="text-[10px] font-medium text-slate-400 dark:text-slate-500 tracking-wide uppercase">Kec. Pringkuku, Kab. Pacitan</span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden xl:flex items-center gap-0.5" id="nav-desktop">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'px-3 py-2 rounded-md text-[13px] font-medium transition-all duration-150',
                  isActive
                    ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400'
                    : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700/50 hover:text-blue-700 dark:hover:text-blue-400',
                )}
              >
                {item.name}
              </Link>
            );
          })}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-1.5">
          {mounted && (
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="p-2 rounded-md text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 hover:text-blue-600 transition-all"
              aria-label="Toggle dark mode"
            >
              {theme === 'dark' ? (
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>
              ) : (
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
              )}
            </button>
          )}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="xl:hidden p-2 rounded-md text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-all"
            aria-label={isOpen ? 'Tutup menu' : 'Buka menu'}
          >
            <div className="w-5 h-5 relative flex flex-col justify-center items-center gap-1">
              <span className={cn('block h-0.5 w-5 rounded-full bg-current transition-all duration-300', isOpen ? 'rotate-45 translate-y-1.5' : '')} />
              <span className={cn('block h-0.5 w-5 rounded-full bg-current transition-all duration-300', isOpen ? 'opacity-0' : '')} />
              <span className={cn('block h-0.5 w-5 rounded-full bg-current transition-all duration-300', isOpen ? '-rotate-45 -translate-y-1.5' : '')} />
            </div>
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={cn(
        'xl:hidden fixed inset-0 top-[57px] z-40 transition-all duration-300',
        isOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none',
      )}>
        <div className="absolute inset-0 bg-black/20" onClick={() => setIsOpen(false)} />
        <div
          className={cn('relative shadow-xl transition-all duration-300', isOpen ? 'translate-y-0' : '-translate-y-2')}
          style={{ backgroundColor: 'var(--navbar-bg)' }}
        >
          <div className="container-custom py-2 grid grid-cols-2 gap-1">
            {NAV_ITEMS.map((item) => {
              const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'px-4 py-3 rounded-lg text-sm font-medium transition-all',
                    isActive
                      ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400'
                      : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700/50',
                  )}
                >
                  {item.name}
                </Link>
              );
            })}
          </div>
          <div className="h-px" style={{ backgroundColor: 'var(--border-color)' }} />
        </div>
      </div>
    </header>
  );
}
