import Link from 'next/link';
import { NAV_ITEMS, DESA_PROFILE } from '@/lib/constants';

const SOSMED_ICON = {
  facebook: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
  ),
  instagram: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
  ),
  youtube: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
  ),
};

export default function Footer() {
  const year = new Date().getFullYear();
  const social = DESA_PROFILE.socialMedia;

  const kunjunganRows = [
    { label: 'Hari Ini',    value: 0 },
    { label: 'Kemarin',     value: 0 },
    { label: 'Minggu Ini',  value: 0 },
    { label: 'Minggu Lalu', value: 0 },
    { label: 'Bulan Ini',   value: 0 },
    { label: 'Total',       value: 0 },
  ];

  const nomorPenting = [
    { label: 'Puskesmas',   no: '(0357) 881-234' },
    { label: 'Polsek',      no: '(0357) 881-110' },
    { label: 'Damkar',      no: '113' },
    { label: 'BPBD',        no: '(0357) 881-555' },
  ];

  return (
    <footer id="footer">
      {/* ── quick links bar ── */}
      <div className="bg-blue-700">
        <div className="container-custom py-3 flex flex-wrap gap-x-6 gap-y-1">
          {NAV_ITEMS.slice(0, 6).map((item) => (
            <Link key={item.href} href={item.href}
              className="text-xs font-semibold text-blue-100 hover:text-white transition-colors">
              {item.name}
            </Link>
          ))}
        </div>
      </div>

      {/* ── main dark footer ── */}
      <div className="bg-slate-900 text-slate-300">
        <div className="container-custom py-10 lg:py-14">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">

            {/* Col 1 — Village Identity */}
            <div>
              <div className="flex items-center gap-2.5 mb-4">
                <div className="w-10 h-10 rounded-lg bg-blue-600 flex items-center justify-center shrink-0">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                    <polyline points="9 22 9 12 15 12 15 22"/>
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-extrabold text-white leading-tight">Desa Jlubang</p>
                  <p className="text-[10px] text-slate-400 uppercase tracking-wide">Portal Digital Resmi</p>
                </div>
              </div>
              <ul className="space-y-1 text-xs text-slate-400 mb-4">
                <li>Desa Jlubang</li>
                <li>Kecamatan Pringkuku</li>
                <li>Kabupaten Pacitan</li>
                <li>Provinsi Jawa Timur {DESA_PROFILE.postalCode}</li>
              </ul>
              {/* social */}
              <div className="flex gap-2 mt-3">
                {social.facebook && (
                  <a href={social.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook"
                    className="w-8 h-8 rounded-md bg-slate-700 hover:bg-blue-600 flex items-center justify-center text-slate-300 hover:text-white transition-all">
                    {SOSMED_ICON.facebook}
                  </a>
                )}
                {social.instagram && (
                  <a href={social.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram"
                    className="w-8 h-8 rounded-md bg-slate-700 hover:bg-pink-600 flex items-center justify-center text-slate-300 hover:text-white transition-all">
                    {SOSMED_ICON.instagram}
                  </a>
                )}
                {social.youtube && (
                  <a href={social.youtube} target="_blank" rel="noopener noreferrer" aria-label="YouTube"
                    className="w-8 h-8 rounded-md bg-slate-700 hover:bg-red-600 flex items-center justify-center text-slate-300 hover:text-white transition-all">
                    {SOSMED_ICON.youtube}
                  </a>
                )}
              </div>
            </div>

            {/* Col 2 — Statistik Kunjungan */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">Statistik Kunjungan</h4>
              <ul className="space-y-2">
                {kunjunganRows.map((r) => (
                  <li key={r.label} className="flex justify-between text-xs">
                    <span className="text-slate-400">{r.label}</span>
                    <span className="font-bold text-white">{r.value.toLocaleString('id-ID')}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Col 3 — Kontak */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">Kontak Desa</h4>
              <ul className="space-y-3 text-xs">
                <li className="flex items-start gap-2">
                  <svg className="w-3.5 h-3.5 text-blue-400 mt-0.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                  <span className="text-slate-400">Jl. Raya Jlubang, Desa Jlubang, Kec. Pringkuku, Kab. Pacitan</span>
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-3.5 h-3.5 text-blue-400 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.11 12 19.79 19.79 0 0 1 1.04 3.4A2 2 0 0 1 3 1.39h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.9a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                  <a href={`tel:${DESA_PROFILE.phone}`} className="text-slate-400 hover:text-white transition-colors">{DESA_PROFILE.phone}</a>
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-3.5 h-3.5 text-blue-400 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                  <a href={`mailto:${DESA_PROFILE.email}`} className="text-slate-400 hover:text-white transition-colors">{DESA_PROFILE.email}</a>
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-3.5 h-3.5 text-blue-400 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                  <span className="text-slate-400">Senin – Jumat, 08:00 – 15:00 WIB</span>
                </li>
              </ul>
            </div>

            {/* Col 4 — Nomor Penting + Menu */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">Nomor Penting</h4>
              <ul className="space-y-2 mb-6">
                {nomorPenting.map((n) => (
                  <li key={n.label} className="flex justify-between text-xs">
                    <span className="text-slate-400">{n.label}</span>
                    <a href={`tel:${n.no}`} className="font-semibold text-white hover:text-blue-400 transition-colors">{n.no}</a>
                  </li>
                ))}
              </ul>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">Menu Cepat</h4>
              <div className="flex flex-wrap gap-2">
                {NAV_ITEMS.slice(6).map((item) => (
                  <Link key={item.href} href={item.href}
                    className="text-[11px] text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 px-2 py-1 rounded transition-all">
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── bottom bar ── */}
      <div className="bg-slate-950 py-3">
        <div className="container-custom flex flex-col sm:flex-row justify-between items-center gap-1.5">
          <p className="text-[11px] text-slate-500">
            © {year} Pemerintah Desa Jlubang, Kecamatan Pringkuku, Kabupaten Pacitan. Hak Cipta Dilindungi.
          </p>
          <p className="text-[11px] text-slate-600">Dibuat oleh Tim KKN Desa Jlubang</p>
        </div>
      </div>
    </footer>
  );
}
