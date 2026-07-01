'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTheme } from 'next-themes';
import { cn } from '@/lib/utils';
import { NAV_ITEMS } from '@/lib/constants';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [prevPathname, setPrevPathname] = useState<string | null>(null);
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  if (pathname !== prevPathname) {
    setPrevPathname(pathname);
    setIsOpen(false);
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 shadow-md" style={{ backgroundColor: 'var(--navbar-bg)' }}>
      {/* Top strip — merah-putih accent */}
      <div className="h-1 w-full" style={{ background: 'linear-gradient(90deg, #dc2626 50%, #f1f5f9 50%)' }} />

      <nav className="container-custom flex items-center justify-between py-3" id="main-nav">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group" id="nav-logo">
          <div className="w-9 h-9 rounded-lg bg-white/15 flex items-center justify-center border border-white/20 group-hover:bg-white/25 transition-colors">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
          </div>
          <div className="flex flex-col">
            <span className="text-base font-bold text-white leading-tight">Desa Jlubang</span>
            <span className="text-[10px] font-medium tracking-wider uppercase text-blue-100/80">Portal Digital Desa</span>
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
                  'px-3 py-2 rounded-md text-[13px] font-medium transition-all duration-200',
                  isActive
                    ? 'bg-white/20 text-white'
                    : 'text-blue-100 hover:bg-white/10 hover:text-white',
                )}
              >
                {item.name}
              </Link>
            );
          })}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          {mounted && (
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="p-2 rounded-md text-blue-100 hover:bg-white/10 hover:text-white transition-all"
              aria-label="Toggle dark mode"
            >
              {theme === 'dark' ? (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>
              ) : (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
              )}
            </button>
          )}
          {/* Hamburger (mobile/tablet) */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="xl:hidden p-2 rounded-md text-blue-100 hover:bg-white/10 hover:text-white transition-all"
            aria-label={isOpen ? 'Tutup menu' : 'Buka menu'}
          >
            <div className="w-5 h-5 relative flex flex-col justify-center items-center">
              <span className={cn('block h-0.5 w-5 rounded-full bg-white transition-all duration-300', isOpen ? 'rotate-45 translate-y-0' : '-translate-y-1.5')} />
              <span className={cn('block h-0.5 w-5 rounded-full bg-white transition-all duration-300', isOpen ? 'opacity-0 scale-0' : 'opacity-100')} />
              <span className={cn('block h-0.5 w-5 rounded-full bg-white transition-all duration-300', isOpen ? '-rotate-45 translate-y-0' : 'translate-y-1.5')} />
            </div>
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={cn('xl:hidden fixed inset-0 top-[57px] z-40 transition-all duration-300', isOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none')}>
        <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" onClick={() => setIsOpen(false)} />
        <div
          className={cn('relative w-full max-h-[calc(100vh-57px)] overflow-y-auto transition-all duration-300 shadow-xl', isOpen ? 'translate-y-0' : '-translate-y-4')}
          style={{ backgroundColor: 'var(--navbar-bg)' }}
        >
          <div className="p-3 space-y-0.5">
            {NAV_ITEMS.map((item) => {
              const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'block px-4 py-3 rounded-lg text-sm font-medium transition-all',
                    isActive ? 'bg-white/20 text-white' : 'text-blue-100 hover:bg-white/10 hover:text-white',
                  )}
                >
                  {item.name}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </header>
  );
}
