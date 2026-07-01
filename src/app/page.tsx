import Image from 'next/image';
import Link from 'next/link';
import {
  getPosts, getWisataList, getUMKMList, getGallery, getGovernment,
} from '@/lib/api/wordpress';
import { DESA_PROFILE, APBDES } from '@/lib/constants';
import NewsCard from '@/components/features/news/NewsCard';
import WisataCard from '@/components/features/tourism/TourismCard';

/* ── helpers ─────────────────────────────────────────────── */
function fmtRp(n: number) {
  return 'Rp ' + n.toLocaleString('id-ID', { minimumFractionDigits: 2 });
}

function STitle({
  caps, rest, sub, center,
}: { caps: string; rest?: string; sub?: string; center?: boolean }) {
  return (
    <div className={center ? 'text-center' : ''}>
      <h2 className="text-2xl sm:text-3xl font-black tracking-tight" style={{ color: 'var(--text-primary)' }}>
        <span className="text-blue-600">{caps}</span>
        {rest && <span className="dark:text-slate-100"> {rest}</span>}
      </h2>
      {sub && <p className="text-sm mt-1" style={{ color: 'var(--text-muted)' }}>{sub}</p>}
      <div className={`mt-2.5 h-1 w-12 rounded-full bg-blue-600 ${center ? 'mx-auto' : ''}`} />
    </div>
  );
}

/* ── page ─────────────────────────────────────────────────── */
export default async function HomePage() {
  const [
    { data: news },
    { data: wisata },
    { data: umkm },
    { data: gallery },
    government,
  ] = await Promise.all([
    getPosts({ per_page: 3 }),
    getWisataList({ per_page: 3 }),
    getUMKMList({ per_page: 3 }),
    getGallery({ per_page: 6 }),
    getGovernment(),
  ]);

  const s = DESA_PROFILE.stats;

  /* quick-access cards */
  const quickLinks = [
    { label: 'Profil Desa',  href: '/profil',    bg: 'bg-blue-600',   icon: <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" /> },
    { label: 'Infografis',   href: '/profil#demografi', bg: 'bg-orange-500', icon: <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" /> },
    { label: 'Peta Desa',    href: '/peta',      bg: 'bg-teal-600',   icon: <path strokeLinecap="round" strokeLinejoin="round" d="M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 00-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0z" /> },
    { label: 'Dusun',        href: '/dusun',     bg: 'bg-violet-600', icon: <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z" /> },
    { label: 'Berita',       href: '/berita',    bg: 'bg-red-500',    icon: <path strokeLinecap="round" strokeLinejoin="round" d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 01-2.25 2.25M16.5 7.5V18a2.25 2.25 0 002.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 002.25 2.25h13.5M6 7.5h3v3H6v-3z" /> },
    { label: 'Wisata',       href: '/wisata',    bg: 'bg-emerald-600',icon: <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" /> },
    { label: 'UMKM',         href: '/umkm',      bg: 'bg-amber-500',  icon: <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 21v-7.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349m-16.5 11.65V9.35m0 0a3.001 3.001 0 003.75-.615A2.993 2.993 0 009.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 002.25 1.016c.896 0 1.7-.393 2.25-1.016a3.001 3.001 0 003.75.614m-16.5 0a3.004 3.004 0 01-.621-4.72L4.318 3.44A1.5 1.5 0 015.378 3h13.243a1.5 1.5 0 011.06.44l1.19 1.189a3 3 0 01-.621 4.72m-13.5 8.65h3.75a.75.75 0 00.75-.75V13.5a.75.75 0 00-.75-.75H6.75a.75.75 0 00-.75.75v3.75c0 .415.336.75.75.75z" /> },
    { label: 'Kebudayaan',   href: '/kebudayaan',bg: 'bg-pink-600',   icon: <path strokeLinecap="round" strokeLinejoin="round" d="M9 9l10.5-3m0 6.553v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 11-.99-3.467l2.31-.66a2.25 2.25 0 001.632-2.163zm0 0V2.25L9 5.25v10.303m0 0v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 01-.99-3.467l2.31-.66A2.25 2.25 0 009 15.553z" /> },
  ];

  /* population stat boxes */
  const pendudukStats = [
    { label: 'Penduduk',          value: s.population, bg: 'bg-blue-600',   icon: 'M17 20h5v-2a4 4 0 00-4-4h-1M9 20H4v-2a4 4 0 014-4h1m4 6v-2a4 4 0 00-4-4H9a4 4 0 00-4 4v2m8 0v-2a4 4 0 014-4h1a4 4 0 014 4v2M12 11a4 4 0 100-8 4 4 0 000 8z' },
    { label: 'Laki-Laki',         value: s.male,       bg: 'bg-indigo-500', icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' },
    { label: 'Kepala Keluarga',   value: s.kk,         bg: 'bg-orange-500', icon: 'M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z M9 22V12h6v10' },
    { label: 'Perempuan',         value: s.female,     bg: 'bg-pink-500',   icon: 'M12 14a7 7 0 00-7 7h14a7 7 0 00-7-7zm0 0V9m0 5a4 4 0 100-8 4 4 0 000 8z' },
    { label: 'Pddk. Sementara',   value: 0,            bg: 'bg-teal-500',   icon: 'M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z' },
    { label: 'Mutasi Penduduk',   value: 0,            bg: 'bg-slate-500',  icon: 'M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4' },
  ];

  /* APBDes rows */
  const apbRows = [
    { label: 'Pendapatan',       value: APBDES.pendapatan, indent: false, bold: false },
    { label: 'Belanja',          value: APBDES.belanja,    indent: false, bold: false },
    { label: 'Pembiayaan',       value: null,              indent: false, bold: false },
    { label: '— Penerimaan',     value: 0,                 indent: true,  bold: false },
    { label: '— Pengeluaran',    value: 0,                 indent: true,  bold: false },
    { label: 'Surplus / Defisit',value: APBDES.surplus,   indent: false, bold: true  },
  ];

  return (
    <div className="page-transition">

      {/* ══════════════════════════════════════════════════════════
          1. HERO
      ══════════════════════════════════════════════════════════ */}
      <section className="relative min-h-[88vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=1920&q=80"
            alt="Desa Jlubang"
            fill className="object-cover" priority sizes="100vw"
          />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(15,23,42,0.85) 0%, rgba(30,64,175,0.70) 60%, rgba(37,99,235,0.40) 100%)' }} />
        </div>

        <div className="container-custom relative z-10 py-24">
          <div className="max-w-2xl">
            <p className="text-blue-300 text-sm font-semibold tracking-widest uppercase mb-3 animate-fade-in">
              Website Resmi — Desa Jlubang
            </p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-5 leading-tight animate-slide-up">
              Selamat Datang di<br />
              <span className="text-blue-300">Desa Jlubang</span>
            </h1>
            <p className="text-base sm:text-lg text-white/75 mb-8 leading-relaxed animate-slide-up" style={{ animationDelay: '0.15s' }}>
              Sumber informasi terbaru tentang pemerintahan dan potensi Desa Jlubang — Kecamatan Pringkuku, Kabupaten Pacitan, Jawa Timur.
            </p>
            <div className="flex flex-wrap gap-3 animate-slide-up" style={{ animationDelay: '0.3s' }}>
              <Link href="/profil"
                className="px-6 py-2.5 rounded-md text-sm font-bold text-white bg-blue-600 hover:bg-blue-500 transition-all shadow-lg hover:-translate-y-0.5">
                Profil Desa
              </Link>
              <Link href="/berita"
                className="px-6 py-2.5 rounded-md text-sm font-bold text-white border border-white/30 hover:bg-white/15 transition-all hover:-translate-y-0.5">
                Berita Terbaru
              </Link>
              <Link href="/peta"
                className="px-6 py-2.5 rounded-md text-sm font-bold text-white border border-white/30 hover:bg-white/15 transition-all hover:-translate-y-0.5">
                🗺️ Peta
              </Link>
            </div>
          </div>
        </div>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <svg className="w-6 h-6 text-white/40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9"/></svg>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          2. JELAJAHI Desa
      ══════════════════════════════════════════════════════════ */}
      <section className="py-10" style={{ backgroundColor: 'var(--bg-primary)' }}>
        <div className="container-custom">
          <div className="mb-7">
            <STitle caps="JELAJAHI" rest="Desa" sub="Melalui website ini Anda dapat menjelajahi segala hal yang terkait dengan Desa Jlubang" />
          </div>
          <div className="grid grid-cols-4 sm:grid-cols-4 lg:grid-cols-8 gap-3">
            {quickLinks.map((ql) => (
              <Link key={ql.href} href={ql.href}
                className="group flex flex-col items-center gap-2 p-4 rounded-xl border transition-all hover:shadow-md hover:-translate-y-1 card-hover"
                style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-color)' }}>
                <div className={`w-12 h-12 rounded-xl ${ql.bg} flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform`}>
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                    {ql.icon}
                  </svg>
                </div>
                <span className="text-[11px] font-semibold text-center leading-tight" style={{ color: 'var(--text-secondary)' }}>{ql.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          3. SAMBUTAN Kepala Desa
      ══════════════════════════════════════════════════════════ */}
      <section className="py-12 lg:py-16" style={{ backgroundColor: 'var(--bg-secondary)' }}>
        <div className="container-custom">
          <div className="mb-8">
            <STitle caps="SAMBUTAN" rest="Kepala Desa" sub="Kata sambutan dari pimpinan Desa Jlubang" />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            {/* photo card */}
            <div className="flex flex-col items-center p-6 rounded-2xl text-center"
              style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-color)' }}>
              <div className="w-28 h-28 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mb-4 ring-4 ring-blue-200 dark:ring-blue-800">
                <svg className="w-16 h-16 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <h3 className="font-bold text-base" style={{ color: 'var(--text-primary)' }}>{DESA_PROFILE.headName}</h3>
              <p className="text-xs font-medium text-blue-600 mt-0.5">{DESA_PROFILE.headTitle}</p>
              <p className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>Periode 2024–2030</p>
            </div>
            {/* greeting text */}
            <div className="lg:col-span-2 rounded-2xl p-6"
              style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-color)' }}>
              <p className="text-sm font-semibold text-blue-600 mb-3">Assalamualaikum Warahmatullahi Wabarakatuh,</p>
              <p className="text-sm leading-relaxed mb-3" style={{ color: 'var(--text-secondary)' }}>
                Selamat datang di Portal Resmi Desa Jlubang. Atas nama seluruh jajaran pemerintah desa, kami mengucapkan terima kasih atas kunjungan Anda di website ini.
              </p>
              <p className="text-sm leading-relaxed mb-3" style={{ color: 'var(--text-secondary)' }}>
                Melalui portal ini, kami berkomitmen untuk menyediakan informasi yang transparan dan akuntabel kepada seluruh warga Desa Jlubang dan masyarakat luas mengenai penyelenggaraan pemerintahan, pembangunan, dan potensi desa kami.
              </p>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                Semoga Desa Jlubang terus berkembang menjadi desa yang maju, mandiri, dan sejahtera. Bersama-sama kita wujudkan cita-cita mulia ini untuk generasi yang akan datang.
              </p>
              <p className="text-sm font-semibold mt-4" style={{ color: 'var(--text-primary)' }}>
                Wassalamualaikum Warahmatullahi Wabarakatuh,
              </p>
              <p className="text-sm font-bold text-blue-600 mt-1">{DESA_PROFILE.headName}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          4. ADMINISTRASI Penduduk
      ══════════════════════════════════════════════════════════ */}
      <section className="py-12 lg:py-16" style={{ backgroundColor: 'var(--bg-primary)' }}>
        <div className="container-custom">
          <div className="flex items-end justify-between mb-8 flex-wrap gap-3">
            <STitle caps="ADMINISTRASI" rest="Penduduk" sub="Data kependudukan Desa Jlubang" />
            <Link href="/profil#demografi" className="text-xs font-semibold text-blue-600 hover:underline flex items-center gap-1">
              Selengkapnya
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="9 18 15 12 9 6"/></svg>
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {pendudukStats.map((st) => (
              <div key={st.label}
                className="rounded-xl overflow-hidden shadow-sm"
                style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-color)' }}>
                <div className={`${st.bg} py-4 flex items-center justify-center`}>
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" strokeWidth={1.6} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d={st.icon} />
                  </svg>
                </div>
                <div className="p-3 text-center">
                  <div className="text-2xl font-black" style={{ color: 'var(--text-primary)' }}>
                    {st.value.toLocaleString('id-ID')}
                  </div>
                  <div className="text-[11px] mt-0.5" style={{ color: 'var(--text-muted)' }}>{st.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          5. APB DESA
      ══════════════════════════════════════════════════════════ */}
      <section className="py-12 lg:py-16" style={{ backgroundColor: 'var(--bg-secondary)' }}>
        <div className="container-custom">
          <div className="flex items-end justify-between mb-8 flex-wrap gap-3">
            <STitle caps="APB" rest={`Desa ${APBDES.year}`} sub="Akses cepat dan transparan terhadap Anggaran Pendapatan dan Belanja Desa" />
            <Link href="/profil" className="text-xs font-semibold text-blue-600 hover:underline flex items-center gap-1">
              Lihat data lebih lengkap
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="9 18 15 12 9 6"/></svg>
            </Link>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* table */}
            <div className="rounded-xl overflow-hidden shadow-sm"
              style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-color)' }}>
              <div className="bg-blue-600 px-5 py-3">
                <p className="text-white text-sm font-bold">Rekapitulasi APBDes {APBDES.year}</p>
              </div>
              <div className="divide-y" style={{ borderColor: 'var(--border-color)' }}>
                {apbRows.map((r) => (
                  <div key={r.label}
                    className={`flex justify-between items-center px-5 py-3 ${r.bold ? 'bg-blue-50 dark:bg-blue-950/20' : ''}`}>
                    <span className={`text-sm ${r.indent ? 'pl-4' : ''} ${r.bold ? 'font-bold' : 'font-medium'}`}
                      style={{ color: r.bold ? 'var(--text-primary)' : 'var(--text-secondary)' }}>
                      {r.label}
                    </span>
                    <span className={`text-sm font-mono ${r.bold ? 'font-bold text-blue-600' : ''}`}
                      style={{ color: r.bold ? undefined : 'var(--text-secondary)' }}>
                      {r.value !== null ? fmtRp(r.value) : '—'}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            {/* sumber dana */}
            <div className="rounded-xl overflow-hidden shadow-sm"
              style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-color)' }}>
              <div className="bg-orange-500 px-5 py-3">
                <p className="text-white text-sm font-bold">Sumber Pendapatan Desa</p>
              </div>
              <div className="p-5 space-y-4">
                {APBDES.sumberDana.map((s) => {
                  const pct = Math.round((s.nilai / APBDES.pendapatan) * 100);
                  return (
                    <div key={s.label}>
                      <div className="flex justify-between mb-1.5">
                        <span className="text-xs font-semibold" style={{ color: 'var(--text-secondary)' }}>{s.label}</span>
                        <span className="text-xs font-bold text-blue-600">{pct}%</span>
                      </div>
                      <div className="h-3 rounded-full overflow-hidden" style={{ backgroundColor: 'var(--border-color)' }}>
                        <div className="h-3 rounded-full bg-blue-600" style={{ width: `${pct}%` }} />
                      </div>
                      <p className="text-[11px] mt-1 text-right font-mono" style={{ color: 'var(--text-muted)' }}>{fmtRp(s.nilai)}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          6. SOTK
      ══════════════════════════════════════════════════════════ */}
      <section className="py-12 lg:py-16" style={{ backgroundColor: 'var(--bg-primary)' }}>
        <div className="container-custom">
          <div className="flex items-end justify-between mb-8 flex-wrap gap-3">
            <STitle caps="SOTK" sub="Struktur Organisasi dan Tata Kerja Desa Jlubang" />
            <Link href="/profil#pemerintahan" className="text-xs font-semibold text-blue-600 hover:underline flex items-center gap-1">
              Lihat Selengkapnya
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="9 18 15 12 9 6"/></svg>
            </Link>
          </div>
          {government.length === 0 ? (
            <p className="text-sm text-center py-8" style={{ color: 'var(--text-muted)' }}>Belum ada data aparat desa.</p>
          ) : (
            <div className="flex flex-col items-center gap-6">
              {/* Kepala Desa — top */}
              {government.slice(0, 1).map((p) => (
                <div key={p.id} className="flex flex-col items-center gap-2">
                  <div className="w-16 h-16 rounded-full bg-blue-600 flex items-center justify-center text-white text-xl font-black shadow-md">
                    {p.name.split(' ').slice(-1)[0]?.charAt(0) || p.name.charAt(0)}
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-bold" style={{ color: 'var(--text-primary)' }}>{p.name}</p>
                    <p className="text-xs font-semibold text-blue-600">{p.role}</p>
                    {p.period && <p className="text-[11px]" style={{ color: 'var(--text-muted)' }}>{p.period}</p>}
                  </div>
                </div>
              ))}
              {/* connector line */}
              <div className="w-px h-6 bg-blue-200 dark:bg-blue-800" />
              {/* rest — horizontal row */}
              <div className="flex flex-wrap justify-center gap-4">
                {government.slice(1).map((p, idx) => (
                  <div key={p.id} className="flex flex-col items-center gap-2 p-4 rounded-xl w-36 text-center"
                    style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-color)' }}>
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white text-base font-black shadow ${idx % 3 === 0 ? 'bg-indigo-500' : idx % 3 === 1 ? 'bg-teal-500' : 'bg-orange-500'}`}>
                      {p.name.split(' ').slice(-1)[0]?.charAt(0) || p.name.charAt(0)}
                    </div>
                    <p className="text-xs font-bold leading-tight" style={{ color: 'var(--text-primary)' }}>{p.name}</p>
                    <p className="text-[11px] font-semibold text-blue-600 leading-tight">{p.role}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          7. BERITA Desa
      ══════════════════════════════════════════════════════════ */}
      <section className="py-12 lg:py-16" style={{ backgroundColor: 'var(--bg-secondary)' }}>
        <div className="container-custom">
          <div className="flex items-end justify-between mb-8 flex-wrap gap-3">
            <STitle caps="BERITA" rest="Desa" sub="Menyajikan informasi terbaru tentang peristiwa dan kegiatan Desa Jlubang" />
            <Link href="/berita" className="text-xs font-semibold text-blue-600 hover:underline flex items-center gap-1">
              Lihat Semua Berita
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="9 18 15 12 9 6"/></svg>
            </Link>
          </div>
          {news.length === 0 ? (
            <p className="text-sm text-center py-12" style={{ color: 'var(--text-muted)' }}>Belum Ada Data</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {news.map((a) => <NewsCard key={a.id} article={a} />)}
            </div>
          )}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          8. WISATA
      ══════════════════════════════════════════════════════════ */}
      <section className="py-12 lg:py-16" style={{ backgroundColor: 'var(--bg-primary)' }}>
        <div className="container-custom">
          <div className="flex items-end justify-between mb-8 flex-wrap gap-3">
            <STitle caps="WISATA" sub="Layanan yang mempermudah promosi wisata Desa Jlubang" />
            <Link href="/wisata" className="text-xs font-semibold text-blue-600 hover:underline flex items-center gap-1">
              Lihat Semua Wisata
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="9 18 15 12 9 6"/></svg>
            </Link>
          </div>
          {wisata.length === 0 ? (
            <p className="text-sm text-center py-12" style={{ color: 'var(--text-muted)' }}>Belum ada titik wisata yang terdaftar.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {wisata.map((s) => <WisataCard key={s.id} spot={s} />)}
            </div>
          )}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          9. BELI DARI Desa  (UMKM)
      ══════════════════════════════════════════════════════════ */}
      <section className="py-12 lg:py-16" style={{ backgroundColor: 'var(--bg-secondary)' }}>
        <div className="container-custom">
          <div className="flex items-end justify-between mb-8 flex-wrap gap-3">
            <STitle caps="BELI DARI" rest="Desa" sub="Layanan promosi produk UMKM unggulan Desa Jlubang" />
            <Link href="/umkm" className="text-xs font-semibold text-blue-600 hover:underline flex items-center gap-1">
              Lihat Semua UMKM
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="9 18 15 12 9 6"/></svg>
            </Link>
          </div>
          {umkm.length === 0 ? (
            <p className="text-sm text-center py-12" style={{ color: 'var(--text-muted)' }}>Belum ada produk desa yang dipasarkan.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {umkm.map((u) => (
                <Link key={u.id} href={`/umkm/${u.slug}`}
                  className="group flex gap-4 p-4 rounded-xl card-hover"
                  style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-color)' }}>
                  <div className="relative w-20 h-20 rounded-lg overflow-hidden shrink-0">
                    <Image src={u.imageUrl} alt={u.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="80px" />
                  </div>
                  <div className="min-w-0">
                    <span className="inline-block text-[10px] font-bold uppercase text-orange-600 bg-orange-50 dark:bg-orange-950/30 px-1.5 py-0.5 rounded mb-1">{u.category}</span>
                    <h4 className="text-sm font-bold line-clamp-1 group-hover:text-blue-600 transition-colors" style={{ color: 'var(--text-primary)' }}>{u.name}</h4>
                    <p className="text-xs line-clamp-2 mt-0.5 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{u.description}</p>
                    <p className="text-[11px] mt-1.5 font-medium flex items-center gap-1" style={{ color: 'var(--text-muted)' }}>
                      <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/><circle cx="12" cy="9" r="2.5"/></svg>
                      {u.dusunName}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          10. GALERI Desa
      ══════════════════════════════════════════════════════════ */}
      <section className="py-12 lg:py-16" style={{ backgroundColor: 'var(--bg-primary)' }}>
        <div className="container-custom">
          <div className="flex items-end justify-between mb-8 flex-wrap gap-3">
            <STitle caps="GALERI" rest="Desa" sub="Menampilkan kegiatan dan potensi yang berlangsung di Desa Jlubang" />
            <Link href="/galeri" className="text-xs font-semibold text-blue-600 hover:underline flex items-center gap-1">
              Lihat Semua Foto
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="9 18 15 12 9 6"/></svg>
            </Link>
          </div>
          {gallery.length === 0 ? (
            <p className="text-sm text-center py-12" style={{ color: 'var(--text-muted)' }}>Belum ada foto galeri yang diunggah.</p>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {gallery.map((g) => (
                <Link key={g.id} href="/galeri"
                  className="group relative aspect-[4/3] rounded-xl overflow-hidden shadow-sm img-hover-zoom">
                  <Image src={g.imageUrl} alt={g.altText} fill className="object-cover" sizes="(max-width: 640px) 50vw, 33vw" />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-end">
                    <p className="w-full px-3 py-2 text-xs font-medium text-white translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-gradient-to-t from-black/60 to-transparent">
                      {g.caption || g.title}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

    </div>
  );
}
