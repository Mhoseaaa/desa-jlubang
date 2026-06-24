import type { Metadata } from 'next';
import { getDusunList, getUMKMList, getWisataList } from '@/lib/api/wordpress';
import type { MapMarker } from '@/types/content';
import { getGoogleMapsUrl } from '@/lib/utils';
import InteractiveMapLoader from '@/components/features/tourism/InteractiveMapLoader';

export const metadata: Metadata = {
  title: 'Peta Interaktif',
  description: 'Peta interaktif Desa Jlubang — lokasi seluruh dusun, UMKM, dan wisata dengan filter kategori dan dusun.',
  openGraph: {
    title: 'Peta Interaktif Desa Jlubang',
    description: 'Jelajahi lokasi dusun, UMKM, dan wisata dalam satu peta interaktif.',
  },
};

export default async function PetaPage() {
  const [dusunList, { data: umkmItems }, { data: wisataItems }] = await Promise.all([
    getDusunList(),
    getUMKMList({ per_page: 100 }),
    getWisataList({ per_page: 100 }),
  ]);

  const markers: MapMarker[] = [
    ...dusunList.map((d): MapMarker => ({
      id: 1000 + d.id,
      name: d.name,
      description: d.description.substring(0, 100) + '...',
      latitude: d.latitude,
      longitude: d.longitude,
      category: 'dusun',
      imageUrl: d.imageUrl,
      dusunSlug: d.slug,
      dusunName: d.name,
      googleMapsUrl: getGoogleMapsUrl(d.latitude, d.longitude),
    })),
    ...wisataItems.map((w): MapMarker => ({
      id: 2000 + w.id,
      name: w.name,
      description: w.description.substring(0, 100) + '...',
      latitude: w.latitude,
      longitude: w.longitude,
      category: 'wisata',
      imageUrl: w.imageUrl,
      dusunSlug: w.dusunSlug,
      dusunName: w.dusunName,
      googleMapsUrl: w.googleMapsUrl,
    })),
    ...umkmItems.map((u): MapMarker => ({
      id: 3000 + u.id,
      name: u.name,
      description: u.description.substring(0, 100) + '...',
      latitude: u.latitude,
      longitude: u.longitude,
      category: 'umkm',
      imageUrl: u.imageUrl,
      dusunSlug: u.dusunSlug,
      dusunName: u.dusunName,
      googleMapsUrl: getGoogleMapsUrl(u.latitude, u.longitude),
    })),
  ];

  return (
    <div className="page-transition">
      {/* Header */}
      <section className="gradient-hero py-12 lg:py-16">
        <div className="container-custom text-center">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-3">
            🗺️ Peta Interaktif
          </h1>
          <p className="text-white/80 text-base sm:text-lg max-w-2xl mx-auto">
            Jelajahi seluruh dusun, UMKM, dan wisata Desa Jlubang dalam satu peta. Gunakan filter kategori dan dusun di bawah.
          </p>
        </div>
      </section>

      {/* Map Section */}
      <section className="container-custom py-8 lg:py-12" id="peta-interaktif">
        <InteractiveMapLoader markers={markers} dusunList={dusunList} />
      </section>

      {/* Info */}
      <section className="py-8 lg:py-12" style={{ backgroundColor: 'var(--bg-secondary)' }}>
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-5 rounded-xl text-center" style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-color)' }}>
              <div className="text-3xl mb-2">🏘️</div>
              <h3 className="text-sm font-bold mb-1" style={{ color: 'var(--text-primary)' }}>{dusunList.length} Dusun</h3>
              <p className="text-xs" style={{ color: 'var(--text-muted)' }}>Wilayah Desa Jlubang</p>
            </div>
            <div className="p-5 rounded-xl text-center" style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-color)' }}>
              <div className="text-3xl mb-2">📍</div>
              <h3 className="text-sm font-bold mb-1" style={{ color: 'var(--text-primary)' }}>{wisataItems.length} Lokasi Wisata</h3>
              <p className="text-xs" style={{ color: 'var(--text-muted)' }}>Destinasi alam dan budaya</p>
            </div>
            <div className="p-5 rounded-xl text-center" style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-color)' }}>
              <div className="text-3xl mb-2">🏪</div>
              <h3 className="text-sm font-bold mb-1" style={{ color: 'var(--text-primary)' }}>{umkmItems.length} UMKM</h3>
              <p className="text-xs" style={{ color: 'var(--text-muted)' }}>Pusat oleh-oleh dan kuliner</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
