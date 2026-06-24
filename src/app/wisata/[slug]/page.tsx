import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getWisataBySlug, getWisataList } from '@/lib/api/wordpress';
import Badge from '@/components/ui/Badge';

interface WisataDetailProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const { data } = await getWisataList({ per_page: 100 });
  return data.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: WisataDetailProps): Promise<Metadata> {
  const { slug } = await params;
  const item = await getWisataBySlug(slug);
  if (!item) return { title: 'Wisata Tidak Ditemukan' };

  return {
    title: item.name,
    description: item.description,
    openGraph: {
      title: item.name,
      description: item.description,
      images: [{ url: item.imageUrl, width: 1200, height: 630 }],
    },
  };
}

export default async function WisataDetailPage({ params }: WisataDetailProps) {
  const { slug } = await params;
  const item = await getWisataBySlug(slug);

  if (!item) {
    notFound();
  }

  const gallery = item.images.length > 0 ? item.images : [item.imageUrl];

  return (
    <div className="page-transition">
      {/* Hero Image */}
      <section className="relative h-[45vh] min-h-[350px]">
        <Image src={item.imageUrl} alt={item.name} fill className="object-cover" priority sizes="100vw" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 container-custom pb-8">
          <div className="flex items-center gap-2 mb-3">
            <Badge variant="success" size="md">{item.category}</Badge>
            <div className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-black/50 backdrop-blur-sm">
              <svg className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>
              <span className="text-xs font-bold text-white">{item.rating}</span>
            </div>
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-2 max-w-3xl">{item.name}</h1>
          <Link href={`/dusun/${item.dusunSlug}`} className="inline-flex items-center gap-1.5 text-white/80 text-sm hover:text-white transition-colors">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg>
            {item.dusunName}
          </Link>
        </div>
      </section>

      <section className="container-custom py-12 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-10">
            <div>
              <h2 className="text-lg font-bold mb-3" style={{ color: 'var(--text-primary)' }}>Deskripsi</h2>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{item.description}</p>
            </div>

            {gallery.length > 1 && (
              <div>
                <h2 className="text-lg font-bold mb-3" style={{ color: 'var(--text-primary)' }}>Foto</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {gallery.map((src, i) => (
                    <div key={src + i} className="relative aspect-square rounded-xl overflow-hidden">
                      <Image src={src} alt={`${item.name} ${i + 1}`} fill className="object-cover" sizes="(max-width: 768px) 50vw, 33vw" />
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div>
              <h2 className="text-lg font-bold mb-3" style={{ color: 'var(--text-primary)' }}>Fasilitas</h2>
              <div className="flex flex-wrap gap-2">
                {item.facilities.map((f) => (
                  <span key={f} className="px-3 py-1.5 rounded-lg text-sm font-medium" style={{ backgroundColor: 'var(--bg-secondary)', color: 'var(--text-secondary)', border: '1px solid var(--border-color)' }}>{f}</span>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-lg font-bold mb-3" style={{ color: 'var(--text-primary)' }}>Lokasi</h2>
              <div className="aspect-[16/9] rounded-xl overflow-hidden mb-4" style={{ border: '1px solid var(--border-color)' }}>
                <iframe
                  src={`https://www.openstreetmap.org/export/embed.html?bbox=${item.longitude - 0.01}%2C${item.latitude - 0.01}%2C${item.longitude + 0.01}%2C${item.latitude + 0.01}&layer=mapnik&marker=${item.latitude}%2C${item.longitude}`}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  loading="lazy"
                  title={`Lokasi ${item.name}`}
                />
              </div>
              <a href={item.googleMapsUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-white bg-primary-500 hover:bg-primary-600 transition-all shadow-md">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" /></svg>
                Buka di Google Maps
              </a>
            </div>
          </div>

          {/* Sidebar — Info */}
          <aside className="lg:col-span-1">
            <div className="sticky top-20 p-6 rounded-2xl space-y-4" style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-color)' }}>
              <h2 className="text-base font-bold" style={{ color: 'var(--text-primary)' }}>Informasi</h2>

              <div className="flex items-start gap-3">
                <svg className="w-4 h-4 mt-0.5 shrink-0 text-primary-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>Jam Operasional</p>
                  <p className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>{item.openHours}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <svg className="w-4 h-4 mt-0.5 shrink-0 text-primary-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="1" x2="12" y2="23" /><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" /></svg>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>Harga Tiket</p>
                  <p className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>{item.ticketPrice}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <svg className="w-4 h-4 mt-0.5 shrink-0 text-primary-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>Alamat</p>
                  <p className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>{item.address}</p>
                </div>
              </div>
            </div>
          </aside>
        </div>

        <div className="mt-8">
          <Link href="/wisata" className="inline-flex items-center gap-2 text-sm font-semibold text-primary-500 hover:text-primary-600 transition-colors">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" /></svg>
            Kembali ke Wisata
          </Link>
        </div>
      </section>
    </div>
  );
}
