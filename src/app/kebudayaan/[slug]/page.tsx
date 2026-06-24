import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getKebudayaanBySlug, getKebudayaanList } from '@/lib/api/wordpress';
import { getYouTubeEmbedUrl } from '@/lib/utils';
import { KEBUDAYAAN_CATEGORIES } from '@/types/content';
import Badge from '@/components/ui/Badge';

interface KebudayaanDetailProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const { data } = await getKebudayaanList({ per_page: 100 });
  return data.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: KebudayaanDetailProps): Promise<Metadata> {
  const { slug } = await params;
  const item = await getKebudayaanBySlug(slug);
  if (!item) return { title: 'Kebudayaan Tidak Ditemukan' };

  return {
    title: item.title,
    description: item.description,
    openGraph: {
      title: item.title,
      description: item.description,
      images: [{ url: item.imageUrl, width: 1200, height: 630 }],
    },
  };
}

export default async function KebudayaanDetailPage({ params }: KebudayaanDetailProps) {
  const { slug } = await params;
  const item = await getKebudayaanBySlug(slug);

  if (!item) {
    notFound();
  }

  const embedUrl = item.videoUrl ? getYouTubeEmbedUrl(item.videoUrl) : null;

  return (
    <div className="page-transition">
      {/* Hero Image */}
      <section className="relative h-[40vh] min-h-[320px]">
        <Image src={item.imageUrl} alt={item.title} fill className="object-cover" priority sizes="100vw" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 container-custom pb-8">
          <Badge variant="primary" size="md" className="mb-3">{KEBUDAYAAN_CATEGORIES[item.category]}</Badge>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-2 max-w-3xl">{item.title}</h1>
          <Link href={`/dusun/${item.dusunSlug}`} className="inline-flex items-center gap-1.5 text-white/80 text-sm hover:text-white transition-colors">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg>
            {item.dusunName}
          </Link>
        </div>
      </section>

      <section className="container-custom py-12 lg:py-16">
        <div className="max-w-3xl mx-auto">
          <p className="text-base leading-relaxed mb-8" style={{ color: 'var(--text-secondary)' }}>{item.description}</p>

          {item.content && (
            <div className="prose-custom" dangerouslySetInnerHTML={{ __html: item.content }} />
          )}

          {embedUrl && (
            <div className="mt-8">
              <h2 className="text-lg font-bold mb-3" style={{ color: 'var(--text-primary)' }}>Video</h2>
              <div className="aspect-video rounded-xl overflow-hidden" style={{ border: '1px solid var(--border-color)' }}>
                <iframe
                  src={embedUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  loading="lazy"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  title={`Video ${item.title}`}
                />
              </div>
            </div>
          )}

          {item.images.length > 0 && (
            <div className="mt-8">
              <h2 className="text-lg font-bold mb-3" style={{ color: 'var(--text-primary)' }}>Dokumentasi Foto</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {item.images.map((src, i) => (
                  <div key={src + i} className="relative aspect-square rounded-xl overflow-hidden">
                    <Image src={src} alt={`${item.title} ${i + 1}`} fill className="object-cover" sizes="(max-width: 768px) 50vw, 33vw" />
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="mt-10 pt-6" style={{ borderTop: '1px solid var(--border-color)' }}>
            <Link href="/kebudayaan" className="inline-flex items-center gap-2 text-sm font-semibold text-primary-500 hover:text-primary-600 transition-colors">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" /></svg>
              Kembali ke Kebudayaan
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
