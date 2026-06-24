import type { Metadata } from 'next';
import Link from 'next/link';
import { getKebudayaanList, getDusunList } from '@/lib/api/wordpress';
import { KEBUDAYAAN_CATEGORIES } from '@/types/content';
import KebudayaanCard from '@/components/features/kebudayaan/KebudayaanCard';
import DusunFilter from '@/components/ui/DusunFilter';
import Pagination from '@/components/ui/Pagination';
import { cn } from '@/lib/utils';
import { ITEMS_PER_PAGE } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Kebudayaan',
  description: 'Tradisi, kesenian, makanan khas, kerajinan, dan cerita rakyat dari setiap dusun di Desa Jlubang.',
  openGraph: {
    title: 'Kebudayaan Desa Jlubang',
    description: 'Kekayaan budaya dari setiap dusun di Desa Jlubang.',
  },
};

interface KebudayaanPageProps {
  searchParams: Promise<{ page?: string; dusun?: string; category?: string }>;
}

export default async function KebudayaanPage({ searchParams }: KebudayaanPageProps) {
  const params = await searchParams;
  const page = Number(params.page) || 1;

  const [{ data: items, totalPages }, dusunList] = await Promise.all([
    getKebudayaanList({ page, per_page: ITEMS_PER_PAGE, dusunSlug: params.dusun, category: params.category }),
    getDusunList(),
  ]);

  const buildCategoryUrl = (category: string | null) => {
    const sp = new URLSearchParams();
    if (params.dusun) sp.set('dusun', params.dusun);
    if (category) sp.set('category', category);
    const qs = sp.toString();
    return qs ? `/kebudayaan?${qs}` : '/kebudayaan';
  };

  return (
    <div className="page-transition">
      {/* Header */}
      <section className="gradient-hero py-16 lg:py-20">
        <div className="container-custom text-center">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-3">
            Kebudayaan Desa Jlubang
          </h1>
          <p className="text-white/80 text-base sm:text-lg max-w-2xl mx-auto">
            Tradisi, kesenian, makanan khas, kerajinan, dan cerita rakyat dari setiap dusun
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="container-custom pt-12 lg:pt-16 space-y-4" id="kebudayaan-filter">
        <DusunFilter dusunList={dusunList} />
        <div className="flex flex-wrap justify-center gap-2">
          <Link
            href={buildCategoryUrl(null)}
            className={cn('px-4 py-2 rounded-xl text-sm font-medium transition-all', !params.category ? 'bg-secondary-500 text-white shadow-md' : 'hover:bg-secondary-500/10')}
            style={params.category ? { backgroundColor: 'var(--bg-secondary)', color: 'var(--text-secondary)', border: '1px solid var(--border-color)' } : undefined}
          >
            Semua Kategori
          </Link>
          {Object.entries(KEBUDAYAAN_CATEGORIES).map(([key, label]) => (
            <Link
              key={key}
              href={buildCategoryUrl(key)}
              className={cn('px-4 py-2 rounded-xl text-sm font-medium transition-all', params.category === key ? 'bg-secondary-500 text-white shadow-md' : 'hover:bg-secondary-500/10')}
              style={params.category !== key ? { backgroundColor: 'var(--bg-secondary)', color: 'var(--text-secondary)', border: '1px solid var(--border-color)' } : undefined}
            >
              {label}
            </Link>
          ))}
        </div>
      </section>

      {/* Grid */}
      <section className="container-custom py-12 lg:py-16" id="kebudayaan-grid">
        {items.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {items.map((item) => <KebudayaanCard key={item.id} item={item} />)}
            </div>
            <Pagination
              currentPage={page}
              totalPages={totalPages}
              basePath="/kebudayaan"
              searchParams={{ ...(params.dusun ? { dusun: params.dusun } : {}), ...(params.category ? { category: params.category } : {}) }}
            />
          </>
        ) : (
          <div className="text-center py-16">
            <div className="text-5xl mb-4">🎭</div>
            <h3 className="text-lg font-bold mb-2" style={{ color: 'var(--text-primary)' }}>Belum ada data</h3>
            <p className="text-sm" style={{ color: 'var(--text-muted)' }}>Tidak ada kebudayaan untuk filter ini.</p>
          </div>
        )}
      </section>
    </div>
  );
}
