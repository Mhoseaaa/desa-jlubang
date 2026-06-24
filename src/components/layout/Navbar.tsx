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

  // Client-mount flag for SSR-safe rendering (theme icon is unknown until hydrated) —
  // no render-time equivalent exists for "has the browser taken over yet".
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close the mobile menu when the route changes — adjusted during render
  // (comparing against the previous render's pathname) instead of an effect.
  if (pathname !== prevPathname) {
    setPrevPathname(pathname);
    setIsOpen(false);
  }

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled ? 'py-2 shadow-lg' : 'py-3',
      )}
      style={{ backgroundColor: 'var(--navbar-bg)', backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)', borderBottom: isScrolled ? '1px solid var(--border-color)' : 'none' }}
    >
      <nav className="container-custom flex items-center justify-between" id="main-nav">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group" id="nav-logo">
          <div className="w-9 h-9 rounded-lg gradient-primary flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
          </div>
          <div className="flex flex-col">
            <span className="text-base font-bold tracking-tight leading-tight" style={{ color: 'var(--text-primary)' }}>Desa Jlubang</span>
            <span className="text-[10px] font-medium tracking-wider uppercase" style={{ color: 'var(--text-muted)' }}>Portal Digital</span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden xl:flex items-center gap-0.5" id="nav-desktop">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
            return (
              <Link key={item.href} href={item.href}
                className={cn('px-2.5 py-2 rounded-lg text-[13px] font-medium transition-all duration-200', isActive ? 'bg-primary-500/10 text-primary-600 dark:text-primary-400' : 'hover:bg-primary-500/5')}
                style={{ color: isActive ? undefined : 'var(--text-secondary)' }}
              >{item.name}</Link>
            );
          })}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          {mounted && (
            <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} className="p-2 rounded-lg transition-all duration-200 hover:bg-primary-500/10" style={{ color: 'var(--text-secondary)' }} aria-label="Toggle dark mode" id="theme-toggle">
              {theme === 'dark' ? (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>
              ) : (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
              )}
            </button>
          )}
          {/* Hamburger (mobile/tablet) */}
          <button onClick={() => setIsOpen(!isOpen)} className="xl:hidden p-2 rounded-lg" style={{ color: 'var(--text-primary)' }} aria-label={isOpen ? 'Close menu' : 'Open menu'} id="mobile-menu-toggle">
            <div className="w-5 h-5 relative flex flex-col justify-center items-center">
              <span className={cn('block h-0.5 w-5 rounded-full transition-all duration-300', isOpen ? 'rotate-45 translate-y-0' : '-translate-y-1.5')} style={{ backgroundColor: 'var(--text-primary)' }} />
              <span className={cn('block h-0.5 w-5 rounded-full transition-all duration-300', isOpen ? 'opacity-0 scale-0' : 'opacity-100')} style={{ backgroundColor: 'var(--text-primary)' }} />
              <span className={cn('block h-0.5 w-5 rounded-full transition-all duration-300', isOpen ? '-rotate-45 translate-y-0' : 'translate-y-1.5')} style={{ backgroundColor: 'var(--text-primary)' }} />
            </div>
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={cn('xl:hidden fixed inset-0 top-[56px] transition-all duration-300 z-40', isOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none')}>
        <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" onClick={() => setIsOpen(false)} />
        <div className={cn('relative w-full max-h-[calc(100vh-56px)] overflow-y-auto transition-all duration-300 shadow-xl', isOpen ? 'translate-y-0' : '-translate-y-4')} style={{ backgroundColor: 'var(--bg-primary)' }} id="mobile-menu">
          <div className="p-4 space-y-1">
            {NAV_ITEMS.map((item) => {
              const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
              return (
                <Link key={item.href} href={item.href}
                  className={cn('block px-4 py-3 rounded-xl text-base font-medium transition-all', isActive ? 'bg-primary-500/10 text-primary-600 dark:text-primary-400' : '')}
                  style={{ color: isActive ? undefined : 'var(--text-secondary)' }}
                >{item.name}</Link>
              );
            })}
          </div>
        </div>
      </div>
    </header>
  );
}
