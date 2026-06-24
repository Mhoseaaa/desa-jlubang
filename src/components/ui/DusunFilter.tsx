'use client';

import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { cn } from '@/lib/utils';

interface DusunFilterProps {
  dusunList: Array<{ slug: string; name: string }>;
  className?: string;
}

export default function DusunFilter({ dusunList, className }: DusunFilterProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const activeDusun = searchParams.get('dusun');

  const buildUrl = (slug: string | null) => {
    const params = new URLSearchParams(searchParams.toString());
    if (slug) {
      params.set('dusun', slug);
    } else {
      params.delete('dusun');
    }
    params.delete('page');
    const qs = params.toString();
    return qs ? `${pathname}?${qs}` : pathname;
  };

  const pillClass = (active: boolean) =>
    cn(
      'px-4 py-2 rounded-xl text-sm font-medium transition-all',
      active ? 'bg-primary-500 text-white shadow-md' : 'hover:bg-primary-500/10'
    );

  return (
    <div className={cn('flex flex-wrap justify-center gap-2', className)} id="dusun-filter">
      <Link
        href={buildUrl(null)}
        className={pillClass(!activeDusun)}
        style={!activeDusun ? undefined : { backgroundColor: 'var(--bg-secondary)', color: 'var(--text-secondary)', border: '1px solid var(--border-color)' }}
      >
        Semua Dusun
      </Link>
      {dusunList.map((d) => (
        <Link
          key={d.slug}
          href={buildUrl(d.slug)}
          className={pillClass(activeDusun === d.slug)}
          style={activeDusun === d.slug ? undefined : { backgroundColor: 'var(--bg-secondary)', color: 'var(--text-secondary)', border: '1px solid var(--border-color)' }}
        >
          {d.name}
        </Link>
      ))}
    </div>
  );
}
