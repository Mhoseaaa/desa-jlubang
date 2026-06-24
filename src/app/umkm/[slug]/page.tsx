import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getUMKMBySlug, getUMKMList } from '@/lib/api/wordpress';
import { getGoogleMapsUrl } from '@/lib/utils';
import Badge from '@/components/ui/Badge';

interface UMKMDetailProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const { data } = await getUMKMList({ per_page: 100 });
  return data.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: UMKMDetailProps): Promise<Metadata> {
  const { slug } = await params;
  const item = await getUMKMBySlug(slug);
  if (!item) return { title: 'UMKM Tidak Ditemukan' };

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

export default async function UMKMDetailPage({ params }: UMKMDetailProps) {
  const { slug } = await params;
  const item = await getUMKMBySlug(slug);

  if (!item) {
    notFound();
  }

  const googleMapsUrl = getGoogleMapsUrl(item.latitude, item.longitude, item.name);
  const whatsappUrl = `https://wa.me/${item.phone.replace(/[^0-9]/g, '').replace(/^0/, '62')}`;
  const gallery = item.images.length > 0 ? item.images : [item.imageUrl];

  return (
    <div className="page-transition">
      {/* Hero Image */}
      <section className="relative h-[40vh] min-h-[320px]">
        <Image src={item.imageUrl} alt={item.name} fill className="object-cover" priority sizes="100vw" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 container-custom pb-8">
          <Badge variant="secondary" size="md" className="mb-3">{item.category}</Badge>
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
              <h2 className="text-lg font-bold mb-3" style={{ color: 'var(--text-primary)' }}>Produk Unggulan</h2>
              <div className="flex flex-wrap gap-2">
                {item.products.map((p) => (
                  <span key={p} className="px-3 py-1.5 rounded-lg text-sm font-medium" style={{ backgroundColor: 'var(--bg-secondary)', color: 'var(--text-secondary)', border: '1px solid var(--border-color)' }}>{p}</span>
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
              <a href={googleMapsUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-white bg-primary-500 hover:bg-primary-600 transition-all shadow-md">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" /></svg>
                Buka di Google Maps
              </a>
            </div>
          </div>

          {/* Sidebar — Kontak */}
          <aside className="lg:col-span-1">
            <div className="sticky top-20 p-6 rounded-2xl space-y-4" style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-color)' }}>
              <h2 className="text-base font-bold" style={{ color: 'var(--text-primary)' }}>Kontak & Alamat</h2>

              <div className="flex items-start gap-3">
                <svg className="w-4 h-4 mt-0.5 shrink-0 text-primary-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>Pemilik</p>
                  <p className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>{item.owner}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <svg className="w-4 h-4 mt-0.5 shrink-0 text-primary-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>Alamat</p>
                  <p className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>{item.address}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <svg className="w-4 h-4 mt-0.5 shrink-0 text-primary-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" /></svg>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>Telepon</p>
                  <p className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>{item.phone}</p>
                </div>
              </div>

              <div className="pt-2 space-y-2">
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold text-white bg-emerald-500 hover:bg-emerald-600 transition-all">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347" /></svg>
                  Chat WhatsApp
                </a>
                <a href={`tel:${item.phone.replace(/[^0-9+]/g, '')}`} className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold transition-all" style={{ border: '1px solid var(--border-color)', color: 'var(--text-primary)' }}>
                  Telepon
                </a>
              </div>
            </div>
          </aside>
        </div>

        <div className="mt-8">
          <Link href="/umkm" className="inline-flex items-center gap-2 text-sm font-semibold text-primary-500 hover:text-primary-600 transition-colors">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" /></svg>
            Kembali ke UMKM
          </Link>
        </div>
      </section>
    </div>
  );
}
