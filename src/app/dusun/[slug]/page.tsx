import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  getDusunBySlug,
  getDusunList,
  getUMKMList,
  getWisataList,
  getKebudayaanList,
  getGallery,
} from '@/lib/api/wordpress';
import { getGoogleMapsUrl } from '@/lib/utils';
import SectionHeading from '@/components/ui/SectionHeading';
import UMKMCard from '@/components/features/umkm/UMKMCard';
import TourismCard from '@/components/features/tourism/TourismCard';
import KebudayaanCard from '@/components/features/kebudayaan/KebudayaanCard';
import GalleryGrid from '@/components/features/gallery/GalleryGrid';

interface DusunDetailProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const dusunList = await getDusunList();
  return dusunList.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({ params }: DusunDetailProps): Promise<Metadata> {
  const { slug } = await params;
  const dusun = await getDusunBySlug(slug);
  if (!dusun) return { title: 'Dusun Tidak Ditemukan' };

  return {
    title: dusun.name,
    description: dusun.description,
    openGraph: {
      title: dusun.name,
      description: dusun.description,
      images: [{ url: dusun.imageUrl, width: 1200, height: 630 }],
    },
  };
}

export default async function DusunDetailPage({ params }: DusunDetailProps) {
  const { slug } = await params;
  const dusun = await getDusunBySlug(slug);

  if (!dusun) {
    notFound();
  }

  const [{ data: umkmItems }, { data: wisataItems }, { data: kebudayaanItems }, { data: galleryItems }] = await Promise.all([
    getUMKMList({ dusunSlug: slug, per_page: 6 }),
    getWisataList({ dusunSlug: slug, per_page: 6 }),
    getKebudayaanList({ dusunSlug: slug, per_page: 6 }),
    getGallery({ dusunSlug: slug, per_page: 8 }),
  ]);

  const googleMapsUrl = getGoogleMapsUrl(dusun.latitude, dusun.longitude, dusun.name);

  return (
    <div className="page-transition">
      {/* Hero */}
      <section className="relative h-[45vh] min-h-[350px] flex items-center">
        <div className="absolute inset-0">
          <Image src={dusun.imageUrl} alt={dusun.name} fill className="object-cover" priority sizes="100vw" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        </div>
        <div className="container-custom relative z-10">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-3">{dusun.name}</h1>
          <p className="text-white/80 text-base sm:text-lg max-w-2xl">{dusun.description}</p>
        </div>
      </section>

      {/* Profil singkat */}
      <section className="container-custom py-12 lg:py-16" id="profil-dusun">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-12">
          {[
            { label: 'Kepala Dusun', value: dusun.headName, icon: '👤' },
            { label: 'Penduduk', value: dusun.population.toLocaleString('id-ID'), icon: '👥' },
            { label: 'Luas', value: dusun.area, icon: '📐' },
            { label: 'RT/RW', value: `${dusun.rt}/${dusun.rw}`, icon: '🏡' },
          ].map((s) => (
            <div key={s.label} className="p-4 rounded-xl text-center card-hover" style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-color)' }}>
              <div className="text-2xl mb-1">{s.icon}</div>
              <div className="text-sm font-bold" style={{ color: 'var(--text-primary)' }}>{s.value}</div>
              <div className="text-[11px]" style={{ color: 'var(--text-muted)' }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Sejarah */}
        <SectionHeading title={`Sejarah ${dusun.name}`} center={false} gradient />
        <div className="prose-custom max-w-3xl">
          {dusun.history.split('\n\n').map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>
      </section>

      {/* Kebudayaan Khas */}
      {kebudayaanItems.length > 0 && (
        <section className="py-12 lg:py-16" style={{ backgroundColor: 'var(--bg-secondary)' }} id="kebudayaan-dusun">
          <div className="container-custom">
            <SectionHeading title="Kebudayaan Khas" subtitle={`Tradisi dan kesenian khas ${dusun.name}`} gradient />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {kebudayaanItems.map((item) => <KebudayaanCard key={item.id} item={item} />)}
            </div>
          </div>
        </section>
      )}

      {/* UMKM */}
      {umkmItems.length > 0 && (
        <section className="container-custom py-12 lg:py-16" id="umkm-dusun">
          <SectionHeading title="UMKM" subtitle={`Produk unggulan pelaku usaha ${dusun.name}`} gradient />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {umkmItems.map((item) => <UMKMCard key={item.id} item={item} />)}
          </div>
          <div className="text-center mt-8">
            <Link href={`/umkm?dusun=${dusun.slug}`} className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold text-primary-600 hover:bg-primary-500/10 transition-all" style={{ border: '1px solid var(--border-color)' }}>
              Lihat Semua UMKM {dusun.name}
            </Link>
          </div>
        </section>
      )}

      {/* Wisata */}
      {wisataItems.length > 0 && (
        <section className="py-12 lg:py-16" style={{ backgroundColor: 'var(--bg-secondary)' }} id="wisata-dusun">
          <div className="container-custom">
            <SectionHeading title="Wisata" subtitle={`Destinasi wisata di ${dusun.name}`} gradient />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {wisataItems.map((item) => <TourismCard key={item.id} spot={item} />)}
            </div>
          </div>
        </section>
      )}

      {/* Galeri */}
      {galleryItems.length > 0 && (
        <section className="container-custom py-12 lg:py-16" id="galeri-dusun">
          <SectionHeading title="Galeri" subtitle={`Dokumentasi foto ${dusun.name}`} gradient />
          <GalleryGrid items={galleryItems} />
        </section>
      )}

      {/* Lokasi Peta */}
      <section className="py-12 lg:py-16" style={{ backgroundColor: 'var(--bg-secondary)' }} id="lokasi-dusun">
        <div className="container-custom">
          <SectionHeading title="Lokasi" subtitle={`Peta lokasi ${dusun.name}`} gradient />
          <div className="max-w-3xl mx-auto">
            <div className="aspect-[16/9] rounded-xl overflow-hidden mb-4" style={{ border: '1px solid var(--border-color)' }}>
              <iframe
                src={`https://www.openstreetmap.org/export/embed.html?bbox=${dusun.longitude - 0.015}%2C${dusun.latitude - 0.015}%2C${dusun.longitude + 0.015}%2C${dusun.latitude + 0.015}&layer=mapnik&marker=${dusun.latitude}%2C${dusun.longitude}`}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                title={`Lokasi ${dusun.name}`}
              />
            </div>
            <div className="text-center">
              <a
                href={googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold text-white bg-primary-500 hover:bg-primary-600 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" />
                </svg>
                Buka di Google Maps
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
