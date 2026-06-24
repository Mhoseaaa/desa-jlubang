import type { Metadata } from 'next';
import Link from 'next/link';
import { getWisataList, getDusunList } from '@/lib/api/wordpress';
import TourismCard from '@/components/features/tourism/TourismCard';
import DusunFilter from '@/components/ui/DusunFilter';
import Pagination from '@/components/ui/Pagination';
import { ITEMS_PER_PAGE } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Wisata',
  description: 'Destinasi wisata unggulan di Desa Jlubang — air terjun, hutan pinus, telaga, dan wisata budaya dari seluruh dusun.',
  openGraph: {
    title: 'Wisata Desa Jlubang',
    description: 'Jelajahi keindahan wisata alam dan budaya dari setiap dusun di Desa Jlubang.',
  },
};

interface WisataPageProps {
  searchParams: Promise<{ page?: string; dusun?: string }>;
}

export default async function WisataPage({ searchParams }: WisataPageProps) {
  const params = await searchParams;
  const page = Number(params.page) || 1;

  const [{ data: spots, totalPages }, dusunList] = await Promise.all([
    getWisataList({ page, per_page: ITEMS_PER_PAGE, dusunSlug: params.dusun }),
    getDusunList(),
  ]);

  return (
    <div className="page-transition">
      {/* Header */}
      <section className="gradient-hero py-16 lg:py-20">
        <div className="container-custom text-center">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-3">
            Potensi Wisata
          </h1>
          <p className="text-white/80 text-base sm:text-lg max-w-2xl mx-auto">
            Jelajahi destinasi wisata alam dan budaya yang memukau dari setiap dusun di Desa Jlubang
          </p>
        </div>
      </section>

      {/* Dusun Filter */}
      <section className="container-custom pt-12 lg:pt-16" id="wisata-filter">
        <DusunFilter dusunList={dusunList} className="mb-10" />
      </section>

      {/* Tourism Grid */}
      <section className="container-custom pb-12 lg:pb-16" id="wisata-grid">
        {spots.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {spots.map((spot) => (
                <TourismCard key={spot.id} spot={spot} />
              ))}
            </div>
            <Pagination currentPage={page} totalPages={totalPages} basePath="/wisata" searchParams={params.dusun ? { dusun: params.dusun } : {}} />
          </>
        ) : (
          <div className="text-center py-16">
            <div className="text-5xl mb-4">🏞️</div>
            <h3 className="text-lg font-bold mb-2" style={{ color: 'var(--text-primary)' }}>Belum ada wisata</h3>
            <p className="text-sm" style={{ color: 'var(--text-muted)' }}>Tidak ada destinasi wisata untuk filter ini.</p>
          </div>
        )}
      </section>

      {/* CTA Peta */}
      <section className="py-12 lg:py-16" style={{ backgroundColor: 'var(--bg-secondary)' }}>
        <div className="container-custom text-center">
          <div className="max-w-2xl mx-auto">
            <div className="text-5xl mb-4">🗺️</div>
            <h2 className="text-2xl sm:text-3xl font-bold mb-3" style={{ color: 'var(--text-primary)' }}>
              Lihat di Peta Interaktif
            </h2>
            <p className="text-sm mb-6" style={{ color: 'var(--text-secondary)' }}>
              Jelajahi semua lokasi wisata, UMKM, dan dusun dalam satu peta interaktif.
            </p>
            <Link
              href="/peta"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold text-white bg-primary-500 hover:bg-primary-600 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6" />
                <line x1="8" y1="2" x2="8" y2="18" />
                <line x1="16" y1="6" x2="16" y2="22" />
              </svg>
              Buka Peta Interaktif
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
