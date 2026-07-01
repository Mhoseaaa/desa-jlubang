import Image from 'next/image';
import Link from 'next/link';
import { getPosts, getDusunList, getWisataList, getUMKMList } from '@/lib/api/wordpress';
import { DESA_PROFILE, APBDES } from '@/lib/constants';
import NewsCard from '@/components/features/news/NewsCard';
import WisataCard from '@/components/features/tourism/TourismCard';

function formatRupiah(n: number) {
  if (n >= 1_000_000_000) return `Rp ${(n / 1_000_000_000).toFixed(2).replace('.', ',')} M`;
  if (n >= 1_000_000) return `Rp ${(n / 1_000_000).toFixed(0)} Jt`;
  return `Rp ${n.toLocaleString('id-ID')}`;
}

export default async function HomePage() {
  const [{ data: newsArticles }, dusunList, { data: wisataItems }, { data: umkmItems }] =
    await Promise.all([
      getPosts({ per_page: 3 }),
      getDusunList(),
      getWisataList({ per_page: 3 }),
      getUMKMList({ per_page: 3 }),
    ]);

  const stats = DESA_PROFILE.stats;

  const demografiCards = [
    { label: 'Total Penduduk', value: stats.population.toLocaleString('id-ID'), sub: 'jiwa', color: 'bg-blue-600', icon: (
      <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a4 4 0 00-4-4h-1M9 20H4v-2a4 4 0 014-4h1m4 6v-2a4 4 0 00-4-4H9a4 4 0 00-4 4v2m8 0v-2a4 4 0 014-4h1a4 4 0 014 4v2M12 11a4 4 0 100-8 4 4 0 000 8z"/></svg>
    )},
    { label: 'Laki-laki', value: stats.male.toLocaleString('id-ID'), sub: 'jiwa', color: 'bg-indigo-600', icon: (
      <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.8}><circle cx="12" cy="8" r="4"/><path strokeLinecap="round" d="M6 20v-2a6 6 0 0112 0v2"/></svg>
    )},
    { label: 'Perempuan', value: stats.female.toLocaleString('id-ID'), sub: 'jiwa', color: 'bg-pink-500', icon: (
      <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.8}><circle cx="12" cy="8" r="4"/><path strokeLinecap="round" d="M12 14v7m-3-3h6"/></svg>
    )},
    { label: 'Kepala Keluarga', value: stats.kk.toLocaleString('id-ID'), sub: 'KK', color: 'bg-orange-500', icon: (
      <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline strokeLinecap="round" strokeLinejoin="round" points="9 22 9 12 15 12 15 22"/></svg>
    )},
    { label: 'Jumlah RT', value: String(stats.rt), sub: 'RT', color: 'bg-teal-600', icon: (
      <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.8}><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg>
    )},
    { label: 'Jumlah RW', value: String(stats.rw), sub: 'RW', color: 'bg-violet-600', icon: (
      <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0H5m7-10h.01M10 11h.01M14 11h.01M10 15h.01M14 15h.01"/></svg>
    )},
  ];

  const apbdesCards = [
    { label: 'Pendapatan', value: formatRupiah(APBDES.pendapatan), icon: '💰', color: 'border-blue-500', bg: 'bg-blue-50 dark:bg-blue-950/30' },
    { label: 'Belanja', value: formatRupiah(APBDES.belanja), icon: '💸', color: 'border-orange-500', bg: 'bg-orange-50 dark:bg-orange-950/30' },
    { label: 'Pembiayaan', value: formatRupiah(APBDES.pembiayaan), icon: '🏦', color: 'border-violet-500', bg: 'bg-violet-50 dark:bg-violet-950/30' },
    { label: 'Surplus / Defisit', value: formatRupiah(APBDES.surplus), icon: '📊', color: 'border-teal-500', bg: 'bg-teal-50 dark:bg-teal-950/30' },
  ];

  return (
    <div className="page-transition">

      {/* ── HERO ───────────────────────────────────────────────── */}
      <section className="relative min-h-[80vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=1920&q=80"
            alt="Desa Jlubang"
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(23,37,84,0.90) 0%, rgba(30,58,138,0.75) 50%, rgba(37,99,235,0.55) 100%)' }} />
        </div>
        {/* decorative blobs */}
        <div className="absolute top-16 right-16 w-72 h-72 rounded-full bg-blue-400/10 blur-3xl animate-float" />
        <div className="absolute bottom-16 left-16 w-96 h-96 rounded-full bg-indigo-400/10 blur-3xl animate-float" style={{ animationDelay: '3s' }} />

        <div className="container-custom relative z-10 py-24">
          <div className="max-w-3xl">
            {/* badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-6 animate-fade-in">
              <span className="w-2 h-2 rounded-full bg-blue-300 animate-pulse-soft" />
              <span className="text-white/90 text-sm font-medium">Portal Resmi Desa Jlubang</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-5 leading-tight animate-slide-up">
              Selamat Datang di<br />
              <span className="text-transparent bg-clip-text" style={{ backgroundImage: 'linear-gradient(90deg,#93c5fd,#e0e7ff)' }}>
                Desa Jlubang
              </span>
            </h1>
            <p className="text-base sm:text-lg text-white/80 mb-8 max-w-2xl leading-relaxed animate-slide-up" style={{ animationDelay: '0.15s' }}>
              {DESA_PROFILE.tagline} — Sumber informasi resmi tentang pemerintahan, potensi desa, dan kehidupan masyarakat Desa Jlubang, Kec. Pringkuku, Kab. Pacitan.
            </p>
            <div className="flex flex-wrap gap-3 animate-slide-up" style={{ animationDelay: '0.3s' }}>
              <Link href="/profil" className="px-6 py-3 rounded-lg text-sm font-bold text-white bg-blue-600 hover:bg-blue-500 transition-all shadow-lg hover:-translate-y-0.5">
                Profil Desa
              </Link>
              <Link href="/peta" className="px-6 py-3 rounded-lg text-sm font-bold text-white bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 transition-all hover:-translate-y-0.5">
                🗺️ Peta Interaktif
              </Link>
              <Link href="/dusun" className="px-6 py-3 rounded-lg text-sm font-bold text-white bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 transition-all hover:-translate-y-0.5">
                Lihat Dusun
              </Link>
            </div>
          </div>
        </div>
        {/* scroll arrow */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <svg className="w-6 h-6 text-white/50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9"/></svg>
        </div>
      </section>

      {/* ── DATA PENDUDUK ──────────────────────────────────────── */}
      <section className="py-12 lg:py-16" style={{ backgroundColor: 'var(--bg-secondary)' }}>
        <div className="container-custom">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>Data Kependudukan</h2>
              <p className="text-sm mt-1" style={{ color: 'var(--text-muted)' }}>Statistik penduduk Desa Jlubang</p>
            </div>
            <Link href="/profil#demografi" className="text-sm font-medium text-primary-600 hover:text-primary-700 flex items-center gap-1">
              Selengkapnya
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {demografiCards.map((c) => (
              <div key={c.label} className="rounded-xl overflow-hidden shadow-sm card-hover" style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-color)' }}>
                <div className={`${c.color} flex items-center justify-center py-4`}>{c.icon}</div>
                <div className="p-3 text-center">
                  <div className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>{c.value}</div>
                  <div className="text-[11px] font-medium" style={{ color: 'var(--text-muted)' }}>{c.sub}</div>
                  <div className="text-[11px] mt-0.5" style={{ color: 'var(--text-secondary)' }}>{c.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── APBDes ─────────────────────────────────────────────── */}
      <section className="py-12 lg:py-16">
        <div className="container-custom">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>APB Desa {APBDES.year}</h2>
              <p className="text-sm mt-1" style={{ color: 'var(--text-muted)' }}>Anggaran Pendapatan dan Belanja Desa — transparansi keuangan</p>
            </div>
            <Link href="/profil" className="text-sm font-medium text-primary-600 hover:text-primary-700 flex items-center gap-1">
              Detail
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {apbdesCards.map((c) => (
              <div key={c.label} className={`p-5 rounded-xl border-l-4 ${c.color} ${c.bg} card-hover`} style={{ border: '1px solid var(--border-color)', borderLeftWidth: '4px' }}>
                <div className="text-2xl mb-2">{c.icon}</div>
                <div className="text-base font-bold" style={{ color: 'var(--text-primary)' }}>{c.value}</div>
                <div className="text-xs font-medium mt-1" style={{ color: 'var(--text-muted)' }}>{c.label}</div>
              </div>
            ))}
          </div>
          {/* Sumber Dana bar */}
          <div className="rounded-xl p-5" style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-color)' }}>
            <h3 className="text-sm font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>Sumber Pendapatan Desa</h3>
            <div className="space-y-3">
              {APBDES.sumberDana.map((s) => {
                const pct = Math.round((s.nilai / APBDES.pendapatan) * 100);
                return (
                  <div key={s.label}>
                    <div className="flex justify-between text-xs mb-1" style={{ color: 'var(--text-secondary)' }}>
                      <span>{s.label}</span>
                      <span className="font-medium">{formatRupiah(s.nilai)} ({pct}%)</span>
                    </div>
                    <div className="h-2 rounded-full" style={{ backgroundColor: 'var(--border-color)' }}>
                      <div className="h-2 rounded-full bg-blue-600 transition-all" style={{ width: `${pct}%` }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ── DUSUN ──────────────────────────────────────────────── */}
      <section className="py-12 lg:py-16" style={{ backgroundColor: 'var(--bg-secondary)' }}>
        <div className="container-custom">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>Dusun Kami</h2>
              <p className="text-sm mt-1" style={{ color: 'var(--text-muted)' }}>Wilayah dan permukiman Desa Jlubang</p>
            </div>
            <Link href="/dusun" className="text-sm font-medium text-primary-600 hover:text-primary-700 flex items-center gap-1">
              Semua Dusun
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {dusunList.map((d) => (
              <Link key={d.id} href={`/dusun/${d.slug}`} className="group flex gap-0 rounded-2xl overflow-hidden card-hover" style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-color)' }}>
                <div className="relative w-40 shrink-0 overflow-hidden">
                  <Image src={d.imageUrl} alt={d.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="160px" />
                </div>
                <div className="flex-1 p-5">
                  <div className="inline-block text-[10px] font-bold uppercase tracking-wider text-blue-600 bg-blue-50 dark:bg-blue-950/40 px-2 py-0.5 rounded mb-2">Dusun</div>
                  <h3 className="text-base font-bold mb-1 group-hover:text-primary-600 transition-colors" style={{ color: 'var(--text-primary)' }}>{d.name}</h3>
                  <p className="text-xs leading-relaxed line-clamp-2 mb-3" style={{ color: 'var(--text-secondary)' }}>{d.description}</p>
                  <div className="flex flex-wrap gap-3 text-xs" style={{ color: 'var(--text-muted)' }}>
                    <span>👥 {d.population.toLocaleString('id-ID')} jiwa</span>
                    <span>📐 {d.area}</span>
                    <span>🏠 {d.rt} RT / {d.rw} RW</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── STRUKTUR PEMERINTAHAN PREVIEW ─────────────────────── */}
      <section className="py-12 lg:py-16">
        <div className="container-custom">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>Pemerintahan Desa</h2>
              <p className="text-sm mt-1" style={{ color: 'var(--text-muted)' }}>Kepala Desa dan perangkat Desa Jlubang</p>
            </div>
            <Link href="/profil#pemerintahan" className="text-sm font-medium text-primary-600 hover:text-primary-700 flex items-center gap-1">
              SOTK Lengkap
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl">
            {[
              { name: DESA_PROFILE.headName, role: DESA_PROFILE.headTitle, isHead: true },
              { name: 'Bpk. Bambang S.', role: 'Sekretaris Desa', isHead: false },
              { name: 'Ibu Retno W.', role: 'Bendahara Desa', isHead: false },
            ].map((p) => (
              <div key={p.role} className="p-5 rounded-xl text-center card-hover" style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-color)' }}>
                <div className={`w-14 h-14 rounded-full mx-auto mb-3 flex items-center justify-center text-lg font-bold text-white shadow ${p.isHead ? 'bg-blue-600' : 'bg-slate-400'}`}>
                  {p.name.split(' ').find((_, i) => i === 1)?.charAt(0) || p.name.charAt(0)}
                </div>
                <div className="text-sm font-bold" style={{ color: 'var(--text-primary)' }}>{p.name}</div>
                <div className="text-xs font-medium text-primary-600 mt-0.5">{p.role}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BERITA TERBARU ─────────────────────────────────────── */}
      <section className="py-12 lg:py-16" style={{ backgroundColor: 'var(--bg-secondary)' }}>
        <div className="container-custom">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>Berita Terbaru</h2>
              <p className="text-sm mt-1" style={{ color: 'var(--text-muted)' }}>Informasi terkini dari Desa Jlubang</p>
            </div>
            <Link href="/berita" className="text-sm font-medium text-primary-600 hover:text-primary-700 flex items-center gap-1">
              Semua Berita
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {newsArticles.map((a) => <NewsCard key={a.id} article={a} />)}
          </div>
        </div>
      </section>

      {/* ── POTENSI WISATA ─────────────────────────────────────── */}
      <section className="py-12 lg:py-16">
        <div className="container-custom">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>Potensi Wisata</h2>
              <p className="text-sm mt-1" style={{ color: 'var(--text-muted)' }}>Destinasi wisata unggulan Desa Jlubang</p>
            </div>
            <Link href="/wisata" className="text-sm font-medium text-primary-600 hover:text-primary-700 flex items-center gap-1">
              Semua Wisata
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {wisataItems.map((s) => <WisataCard key={s.id} spot={s} />)}
          </div>
        </div>
      </section>

      {/* ── UMKM UNGGULAN ─────────────────────────────────────── */}
      <section className="py-12 lg:py-16" style={{ backgroundColor: 'var(--bg-secondary)' }}>
        <div className="container-custom">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>UMKM Unggulan</h2>
              <p className="text-sm mt-1" style={{ color: 'var(--text-muted)' }}>Produk dan usaha lokal warga Desa Jlubang</p>
            </div>
            <Link href="/umkm" className="text-sm font-medium text-primary-600 hover:text-primary-700 flex items-center gap-1">
              Semua UMKM
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {umkmItems.map((u) => (
              <Link key={u.id} href={`/umkm/${u.slug}`} className="group flex gap-4 p-4 rounded-xl card-hover" style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-color)' }}>
                <div className="relative w-20 h-20 rounded-lg overflow-hidden shrink-0">
                  <Image src={u.imageUrl} alt={u.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="80px" />
                </div>
                <div className="min-w-0">
                  <div className="text-[10px] font-bold uppercase text-orange-600 mb-0.5">{u.category}</div>
                  <h4 className="text-sm font-bold line-clamp-1 group-hover:text-primary-600 transition-colors" style={{ color: 'var(--text-primary)' }}>{u.name}</h4>
                  <p className="text-xs line-clamp-2 mt-0.5" style={{ color: 'var(--text-secondary)' }}>{u.description}</p>
                  <div className="text-[11px] mt-1.5 font-medium" style={{ color: 'var(--text-muted)' }}>📍 {u.dusunName}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA KONTAK ─────────────────────────────────────────── */}
      <section className="py-16 lg:py-20">
        <div className="container-custom">
          <div className="relative overflow-hidden rounded-2xl gradient-hero p-8 lg:p-14 text-center">
            <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-white/5 -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full bg-white/5 translate-y-1/2 -translate-x-1/2" />
            <div className="relative z-10">
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">Jelajahi Desa Jlubang</h2>
              <p className="text-white/80 text-sm sm:text-base mb-8 max-w-xl mx-auto">
                Temukan keindahan alam, kekayaan budaya, dan kehangatan warga dari Dusun Citrowonodadi.
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <Link href="/peta" className="px-6 py-3 rounded-lg text-sm font-bold text-blue-900 bg-white hover:bg-blue-50 transition-all shadow-lg hover:-translate-y-0.5">🗺️ Peta Interaktif</Link>
                <Link href="/galeri" className="px-6 py-3 rounded-lg text-sm font-bold text-white bg-white/10 hover:bg-white/20 border border-white/20 transition-all hover:-translate-y-0.5">📸 Galeri Foto</Link>
                <Link href="/kontak" className="px-6 py-3 rounded-lg text-sm font-bold text-white bg-white/10 hover:bg-white/20 border border-white/20 transition-all hover:-translate-y-0.5">Hubungi Kami</Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
