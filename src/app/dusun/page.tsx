import type { Metadata } from 'next';
import { getDusunList } from '@/lib/api/wordpress';
import DusunCard from '@/components/features/dusun/DusunCard';

export const metadata: Metadata = {
  title: 'Daftar Dusun',
  description: 'Daftar seluruh dusun di Desa Jlubang — profil, sejarah, dan potensi setiap dusun.',
  openGraph: {
    title: 'Daftar Dusun Desa Jlubang',
    description: 'Jelajahi profil dan potensi setiap dusun di Desa Jlubang.',
  },
};

export default async function DusunPage() {
  const dusunList = await getDusunList();

  return (
    <div className="page-transition">
      {/* Header */}
      <section className="gradient-hero py-16 lg:py-20">
        <div className="container-custom text-center">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-3">
            Dusun di Desa Jlubang
          </h1>
          <p className="text-white/80 text-base sm:text-lg max-w-2xl mx-auto">
            Setiap dusun memiliki keunikan budaya, sejarah, dan potensi tersendiri
          </p>
        </div>
      </section>

      {/* Dusun Grid */}
      <section className="container-custom py-12 lg:py-16" id="dusun-grid">
        {dusunList.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {dusunList.map((dusun) => (
              <DusunCard key={dusun.id} dusun={dusun} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="text-5xl mb-4">🏘️</div>
            <h3 className="text-lg font-bold mb-2" style={{ color: 'var(--text-primary)' }}>Belum ada data dusun</h3>
          </div>
        )}
      </section>
    </div>
  );
}
