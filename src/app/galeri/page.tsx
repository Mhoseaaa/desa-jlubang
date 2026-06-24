import type { Metadata } from 'next';
import { getGallery, getDusunList } from '@/lib/api/wordpress';
import GalleryGrid from '@/components/features/gallery/GalleryGrid';
import DusunFilter from '@/components/ui/DusunFilter';
import Pagination from '@/components/ui/Pagination';
import { GALLERY_PER_PAGE } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Galeri',
  description: 'Galeri foto dan dokumentasi kegiatan Desa Jlubang — pemandangan alam, budaya, dan kehidupan warga dari setiap dusun.',
  openGraph: {
    title: 'Galeri Desa Jlubang',
    description: 'Dokumentasi foto keindahan dan kegiatan Desa Jlubang.',
  },
};

interface GaleriPageProps {
  searchParams: Promise<{ page?: string; dusun?: string }>;
}

export default async function GaleriPage({ searchParams }: GaleriPageProps) {
  const params = await searchParams;
  const page = Number(params.page) || 1;

  const [{ data: galleryItems, totalPages }, dusunList] = await Promise.all([
    getGallery({ page, per_page: GALLERY_PER_PAGE, dusunSlug: params.dusun }),
    getDusunList(),
  ]);

  return (
    <div className="page-transition">
      {/* Header */}
      <section className="gradient-hero py-16 lg:py-20">
        <div className="container-custom text-center">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-3">
            Galeri Foto
          </h1>
          <p className="text-white/80 text-base sm:text-lg max-w-2xl mx-auto">
            Dokumentasi keindahan alam, budaya, dan kehidupan warga Dusun Wonodadi
          </p>
        </div>
      </section>

      {/* Dusun Filter */}
      <section className="container-custom pt-12 lg:pt-16" id="gallery-filter">
        <DusunFilter dusunList={dusunList} className="mb-10" />
      </section>

      {/* Gallery */}
      <section className="container-custom pb-12 lg:pb-16" id="gallery">
        {galleryItems.length > 0 ? (
          <>
            <GalleryGrid items={galleryItems} />
            <Pagination
              currentPage={page}
              totalPages={totalPages}
              basePath="/galeri"
              searchParams={params.dusun ? { dusun: params.dusun } : {}}
            />
          </>
        ) : (
          <div className="text-center py-16">
            <div className="text-5xl mb-4">📷</div>
            <h3 className="text-lg font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
              Galeri masih kosong
            </h3>
            <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
              Belum ada foto yang ditambahkan.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}
