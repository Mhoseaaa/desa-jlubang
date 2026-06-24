import type { Metadata } from 'next';
import { Suspense } from 'react';
import { getPosts } from '@/lib/api/wordpress';
import NewsCard from '@/components/features/news/NewsCard';
import SearchBar from '@/components/ui/SearchBar';
import Pagination from '@/components/ui/Pagination';
import { POSTS_PER_PAGE } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Berita',
  description: 'Berita terbaru dari Dusun Wonodadi — informasi pembangunan, budaya, dan kegiatan warga.',
  openGraph: {
    title: 'Berita Dusun Wonodadi',
    description: 'Berita dan informasi terkini dari Dusun Wonodadi.',
  },
};

interface BeritaPageProps {
  searchParams: Promise<{ page?: string; search?: string }>;
}

async function BeritaContent({ searchParams }: BeritaPageProps) {
  const params = await searchParams;
  const page = Number(params.page) || 1;
  const search = params.search || '';

  const { data: newsArticles, totalPages } = await getPosts({
    page,
    per_page: POSTS_PER_PAGE,
    search: search || undefined,
  });

  return (
    <>
      {/* Search */}
      <div className="flex justify-center mb-10">
        <SearchBar placeholder="Cari berita..." basePath="/berita" />
      </div>

      {/* Results info */}
      {search && (
        <p className="text-sm mb-6 text-center" style={{ color: 'var(--text-muted)' }}>
          Menampilkan hasil pencarian untuk &ldquo;<strong>{search}</strong>&rdquo; ({newsArticles.length} berita)
        </p>
      )}

      {/* News Grid */}
      {newsArticles.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {newsArticles.map((article) => (
            <NewsCard key={article.id} article={article} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <div className="text-5xl mb-4">📰</div>
          <h3 className="text-lg font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
            Tidak ada berita ditemukan
          </h3>
          <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
            {search ? `Tidak ada hasil untuk "${search}". Coba kata kunci lain.` : 'Belum ada berita yang dipublikasikan.'}
          </p>
        </div>
      )}

      {/* Pagination */}
      <Pagination
        currentPage={page}
        totalPages={totalPages}
        basePath="/berita"
        searchParams={search ? { search } : {}}
      />
    </>
  );
}

export default function BeritaPage(props: BeritaPageProps) {
  return (
    <div className="page-transition">
      {/* Header */}
      <section className="gradient-hero py-16 lg:py-20">
        <div className="container-custom text-center">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-3">
            Berita Dusun
          </h1>
          <p className="text-white/80 text-base sm:text-lg max-w-2xl mx-auto">
            Informasi terkini seputar kegiatan dan pembangunan Dusun Wonodadi
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="container-custom py-12 lg:py-16">
        <Suspense fallback={
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="rounded-2xl overflow-hidden animate-pulse" style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-color)' }}>
                <div className="aspect-[16/10]" style={{ backgroundColor: 'var(--bg-secondary)' }} />
                <div className="p-5 space-y-3">
                  <div className="h-3 rounded-full w-24" style={{ backgroundColor: 'var(--bg-secondary)' }} />
                  <div className="h-4 rounded-full w-full" style={{ backgroundColor: 'var(--bg-secondary)' }} />
                  <div className="h-3 rounded-full w-3/4" style={{ backgroundColor: 'var(--bg-secondary)' }} />
                </div>
              </div>
            ))}
          </div>
        }>
          <BeritaContent searchParams={props.searchParams} />
        </Suspense>
      </section>
    </div>
  );
}
