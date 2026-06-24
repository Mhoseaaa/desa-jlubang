import type { Metadata } from 'next';
import { getUMKMList, getDusunList } from '@/lib/api/wordpress';
import UMKMCard from '@/components/features/umkm/UMKMCard';
import DusunFilter from '@/components/ui/DusunFilter';
import Pagination from '@/components/ui/Pagination';
import { ITEMS_PER_PAGE } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'UMKM',
  description: 'Daftar UMKM unggulan Desa Jlubang — batik, kopi, kerajinan, kuliner, dan produk lokal dari setiap dusun.',
  openGraph: {
    title: 'UMKM Desa Jlubang',
    description: 'Produk-produk unggulan UMKM dari seluruh dusun di Desa Jlubang.',
  },
};

interface UMKMPageProps {
  searchParams: Promise<{ page?: string; dusun?: string }>;
}

export default async function UMKMPage({ searchParams }: UMKMPageProps) {
  const params = await searchParams;
  const page = Number(params.page) || 1;

  const [{ data: items, totalPages, totalItems }, dusunList] = await Promise.all([
    getUMKMList({ page, per_page: ITEMS_PER_PAGE, dusunSlug: params.dusun }),
    getDusunList(),
  ]);

  return (
    <div className="page-transition">
      {/* Header */}
      <section className="gradient-hero py-16 lg:py-20">
        <div className="container-custom text-center">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-3">
            UMKM Desa Jlubang
          </h1>
          <p className="text-white/80 text-base sm:text-lg max-w-2xl mx-auto">
            Produk-produk unggulan dari para pelaku usaha mikro, kecil, dan menengah di seluruh dusun
          </p>
        </div>
      </section>

      {/* Dusun Filter */}
      <section className="container-custom pt-12 lg:pt-16" id="umkm-filter">
        <DusunFilter dusunList={dusunList} className="mb-2" />
        <p className="text-center text-xs mt-4 mb-6" style={{ color: 'var(--text-muted)' }}>
          Menampilkan {totalItems} UMKM
        </p>
      </section>

      {/* UMKM Grid */}
      <section className="container-custom pb-12 lg:pb-16" id="umkm-grid">
        {items.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {items.map((item) => (
                <UMKMCard key={item.id} item={item} />
              ))}
            </div>
            <Pagination currentPage={page} totalPages={totalPages} basePath="/umkm" searchParams={params.dusun ? { dusun: params.dusun } : {}} />
          </>
        ) : (
          <div className="text-center py-16">
            <div className="text-5xl mb-4">🏪</div>
            <h3 className="text-lg font-bold mb-2" style={{ color: 'var(--text-primary)' }}>Belum ada UMKM</h3>
            <p className="text-sm" style={{ color: 'var(--text-muted)' }}>Tidak ada UMKM untuk filter ini.</p>
          </div>
        )}
      </section>
    </div>
  );
}
