import Image from 'next/image';
import Link from 'next/link';
import { getPosts, getDusunList, getWisataList } from '@/lib/api/wordpress';
import { DESA_PROFILE } from '@/lib/constants';
import NewsCard from '@/components/features/news/NewsCard';
import DusunCard from '@/components/features/dusun/DusunCard';
import WisataCard from '@/components/features/tourism/TourismCard';
import SectionHeading from '@/components/ui/SectionHeading';

export default async function HomePage() {
  const [{ data: newsArticles }, dusunList, { data: wisataItems }] = await Promise.all([
    getPosts({ per_page: 3 }),
    getDusunList(),
    getWisataList({ per_page: 3 }),
  ]);
  const stats = [
    { label: 'Penduduk', value: DESA_PROFILE.stats.population.toLocaleString('id-ID'), icon: '👥' },
    { label: 'Luas Wilayah', value: DESA_PROFILE.stats.area, icon: '🌾' },
    { label: 'Dusun', value: String(DESA_PROFILE.stats.dusun), icon: '🏘️' },
    { label: 'RT/RW', value: `${DESA_PROFILE.stats.rt}/${DESA_PROFILE.stats.rw}`, icon: '🏡' },
  ];

  return (
    <div className="page-transition">
      {/* HERO */}
      <section className="relative min-h-[85vh] flex items-center overflow-hidden" id="hero">
        <div className="absolute inset-0">
          <Image src="https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=1920&q=80" alt="Desa Jlubang" fill className="object-cover" priority sizes="100vw" />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(6,78,59,0.85) 0%, rgba(5,150,105,0.6) 50%, rgba(16,185,129,0.4) 100%)' }} />
        </div>
        <div className="absolute top-20 right-10 w-72 h-72 rounded-full bg-primary-400/10 blur-3xl animate-float" />
        <div className="absolute bottom-20 left-10 w-96 h-96 rounded-full bg-secondary-400/10 blur-3xl animate-float" style={{ animationDelay: '3s' }} />
        <div className="container-custom relative z-10 py-20">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-6 animate-fade-in">
              <span className="w-2 h-2 rounded-full bg-primary-400 animate-pulse-soft" />
              <span className="text-white/90 text-sm font-medium">Portal Digital Resmi</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-6 leading-tight animate-slide-up">
              Desa{' '}<span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-300 to-secondary-300">Jlubang</span>
            </h1>
            <p className="text-lg sm:text-xl text-white/80 mb-8 max-w-2xl leading-relaxed animate-slide-up" style={{ animationDelay: '0.2s' }}>
              {DESA_PROFILE.tagline}. Temukan pesona alam, budaya, UMKM, dan potensi wisata dari setiap dusun.
            </p>
            <div className="flex flex-wrap gap-3 animate-slide-up" style={{ animationDelay: '0.4s' }}>
              <Link href="/profil" className="px-6 py-3 rounded-xl text-sm font-bold text-white bg-primary-500 hover:bg-primary-600 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5">Jelajahi Desa</Link>
              <Link href="/peta" className="px-6 py-3 rounded-xl text-sm font-bold text-white bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 transition-all hover:-translate-y-0.5">🗺️ Peta Interaktif</Link>
            </div>
          </div>
        </div>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce"><svg className="w-6 h-6 text-white/50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9"/></svg></div>
      </section>

      {/* STATS */}
      <section className="relative -mt-16 z-10 container-custom" id="stats">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 p-6 rounded-2xl glass shadow-xl">
          {stats.map((s) => (<div key={s.label} className="text-center py-3"><div className="text-2xl mb-1">{s.icon}</div><div className="text-xl sm:text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>{s.value}</div><div className="text-xs font-medium" style={{ color: 'var(--text-muted)' }}>{s.label}</div></div>))}
        </div>
      </section>

      {/* DUSUN */}
      <section className="container-custom py-16 lg:py-24" id="dusun-section">
        <SectionHeading title="Dusun Kami" subtitle="Setiap dusun memiliki keunikan budaya dan potensi tersendiri" gradient />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {dusunList.map((d) => <DusunCard key={d.id} dusun={d} />)}
        </div>
        <div className="text-center mt-8">
          <Link href="/dusun" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold text-primary-600 hover:bg-primary-500/10 transition-all" style={{ border: '1px solid var(--border-color)' }}>
            Lihat Semua Dusun <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
          </Link>
        </div>
      </section>

      {/* BERITA */}
      <section className="py-16 lg:py-24" style={{ backgroundColor: 'var(--bg-secondary)' }} id="news-section">
        <div className="container-custom">
          <SectionHeading title="Berita Terbaru" subtitle="Informasi terkini dari Desa Jlubang" gradient />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {newsArticles.map((a) => <NewsCard key={a.id} article={a} />)}
          </div>
          <div className="text-center mt-8">
            <Link href="/berita" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold text-primary-600 hover:bg-primary-500/10 transition-all" style={{ border: '1px solid var(--border-color)' }}>Lihat Semua Berita <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg></Link>
          </div>
        </div>
      </section>

      {/* WISATA */}
      <section className="container-custom py-16 lg:py-24" id="wisata-section">
        <SectionHeading title="Potensi Wisata" subtitle="Destinasi wisata dari seluruh dusun di Desa Jlubang" gradient />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">{wisataItems.map((s) => <WisataCard key={s.id} spot={s} />)}</div>
        <div className="text-center mt-8">
          <Link href="/wisata" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold text-primary-600 hover:bg-primary-500/10 transition-all" style={{ border: '1px solid var(--border-color)' }}>Lihat Semua Wisata <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg></Link>
        </div>
      </section>

      {/* CTA */}
      <section className="container-custom py-16 lg:py-24" id="cta">
        <div className="relative overflow-hidden rounded-3xl gradient-hero p-8 lg:p-16 text-center">
          <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-white/5 -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full bg-white/5 translate-y-1/2 -translate-x-1/2" />
          <div className="relative z-10">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4">Yuk Jelajahi Desa Jlubang!</h2>
            <p className="text-white/80 text-base sm:text-lg mb-8 max-w-2xl mx-auto">Temukan keindahan alam, kekayaan budaya, dan kehangatan warga dari setiap dusun.</p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link href="/peta" className="px-6 py-3 rounded-xl text-sm font-bold text-primary-900 bg-white hover:bg-white/90 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5">🗺️ Buka Peta Interaktif</Link>
              <Link href="/kontak" className="px-6 py-3 rounded-xl text-sm font-bold text-white bg-white/10 hover:bg-white/20 border border-white/20 transition-all hover:-translate-y-0.5">Hubungi Kami</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
