import type { Metadata } from 'next';
import Image from 'next/image';
import SectionHeading from '@/components/ui/SectionHeading';
import { getDesaProfile, getGovernment } from '@/lib/api/wordpress';

export const metadata: Metadata = {
  title: 'Profil Desa',
  description: 'Profil lengkap Desa Jlubang — sejarah, visi misi, dan pemerintahan desa.',
  openGraph: {
    title: 'Profil Desa Jlubang',
    description: 'Mengenal lebih dekat Desa Jlubang — sejarah, visi misi, dan pemerintahan desa.',
  },
};

export default async function ProfilPage() {
  const [profile, government] = await Promise.all([getDesaProfile(), getGovernment()]);

  return (
    <div className="page-transition">
      {/* Hero Banner */}
      <section className="relative h-[40vh] min-h-[300px] flex items-center">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=1920&q=80"
            alt={profile.name}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary-950/80 to-primary-900/60" />
        </div>
        <div className="container-custom relative z-10">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-3">
            Profil {profile.name}
          </h1>
          <p className="text-white/80 text-base sm:text-lg max-w-2xl">
            {profile.tagline} — terletak di Kecamatan {profile.district}, Kabupaten {profile.regency}, {profile.province}.
          </p>
        </div>
      </section>

      {/* Sejarah */}
      <section className="container-custom py-16 lg:py-24" id="sejarah">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <SectionHeading title="Sejarah Desa" center={false} gradient />
            <div className="prose-custom">
              {profile.history.split('\n\n').map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>
          </div>
          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
            <Image
              src="https://images.unsplash.com/photo-1565967511849-76a60a516170?w=800&q=80"
              alt={`Sejarah ${profile.name}`}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </div>
      </section>

      {/* Visi Misi */}
      <section className="py-16 lg:py-24" style={{ backgroundColor: 'var(--bg-secondary)' }} id="visi-misi">
        <div className="container-custom">
          <SectionHeading title="Visi & Misi" gradient />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Visi */}
            <div className="p-8 rounded-2xl card-hover" style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-color)' }}>
              <div className="w-14 h-14 rounded-2xl gradient-primary flex items-center justify-center mb-4 shadow-lg">
                <svg className="w-7 h-7 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="2" y1="12" x2="22" y2="12" />
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3" style={{ color: 'var(--text-primary)' }}>Visi</h3>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                {profile.vision}
              </p>
            </div>

            {/* Misi */}
            <div className="p-8 rounded-2xl card-hover" style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-color)' }}>
              <div className="w-14 h-14 rounded-2xl bg-secondary-500/10 flex items-center justify-center mb-4">
                <svg className="w-7 h-7 text-secondary-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                  <line x1="16" y1="13" x2="8" y2="13" />
                  <line x1="16" y1="17" x2="8" y2="17" />
                  <polyline points="10 9 9 9 8 9" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3" style={{ color: 'var(--text-primary)' }}>Misi</h3>
              <ul className="space-y-2 text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                {profile.mission.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary-500 mt-2 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Data Demografis */}
      <section className="container-custom py-16 lg:py-24" id="demografi">
        <SectionHeading title="Data Demografis" subtitle="Informasi statistik Desa Jlubang" gradient />
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
          {[
            { label: 'Jumlah Penduduk', value: profile.stats.population.toLocaleString('id-ID') + ' jiwa', icon: '👥' },
            { label: 'Luas Wilayah', value: profile.stats.area, icon: '📐' },
            { label: 'Jumlah Dusun', value: profile.stats.dusun.toString(), icon: '🏘️' },
            { label: 'Jumlah RT', value: profile.stats.rt.toString(), icon: '🏡' },
            { label: 'Jumlah RW', value: profile.stats.rw.toString(), icon: '🌾' },
            { label: 'Ketinggian', value: profile.stats.elevation, icon: '⛰️' },
          ].map((item) => (
            <div key={item.label} className="p-6 rounded-xl text-center card-hover" style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-color)' }}>
              <div className="text-3xl mb-2">{item.icon}</div>
              <div className="text-2xl font-bold mb-1" style={{ color: 'var(--text-primary)' }}>{item.value}</div>
              <div className="text-xs font-medium" style={{ color: 'var(--text-muted)' }}>{item.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Pemerintahan Desa */}
      <section className="py-16 lg:py-24" style={{ backgroundColor: 'var(--bg-secondary)' }} id="pemerintahan">
        <div className="container-custom">
          <SectionHeading title="Pemerintahan Desa" subtitle="Struktur organisasi Desa Jlubang dan setiap dusun" gradient />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {government.map((person, index) => (
              <div key={person.id} className="p-5 rounded-xl text-center card-hover" style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-color)' }}>
                <div
                  className="w-16 h-16 rounded-full mx-auto mb-3 flex items-center justify-center text-xl font-bold text-white shadow-lg"
                  style={{ background: index === 0 ? 'linear-gradient(135deg, #10b981, #059669)' : 'linear-gradient(135deg, #64748b, #475569)' }}
                >
                  {person.name.charAt(person.name.indexOf(' ') + 1) || person.name.charAt(0)}
                </div>
                <h4 className="text-sm font-bold" style={{ color: 'var(--text-primary)' }}>{person.name}</h4>
                <p className="text-xs font-medium mt-1 text-primary-500">{person.role}</p>
                {person.period && <p className="text-[11px] mt-0.5" style={{ color: 'var(--text-muted)' }}>{person.period}</p>}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
