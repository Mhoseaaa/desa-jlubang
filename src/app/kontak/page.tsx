import type { Metadata } from 'next';
import ContactForm from '@/components/features/contact/ContactForm';
import { getDesaProfile } from '@/lib/api/wordpress';

export const metadata: Metadata = {
  title: 'Kontak',
  description: 'Hubungi Desa Jlubang — informasi alamat, telepon, email, dan formulir kontak.',
  openGraph: {
    title: 'Kontak Desa Jlubang',
    description: 'Hubungi kami untuk informasi lebih lanjut tentang Desa Jlubang.',
  },
};

export default async function KontakPage() {
  const profile = await getDesaProfile();

  const contactItems = [
    {
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
          <circle cx="12" cy="10" r="3" />
        </svg>
      ),
      label: 'Alamat',
      value: `${profile.address}, Kec. ${profile.district}, Kab. ${profile.regency}, ${profile.province} ${profile.postalCode}`,
    },
    {
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
        </svg>
      ),
      label: 'Telepon',
      value: profile.phone,
    },
    {
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
          <polyline points="22,6 12,13 2,6" />
        </svg>
      ),
      label: 'Email',
      value: profile.email,
    },
    {
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
          <circle cx="12" cy="7" r="4" />
        </svg>
      ),
      label: 'Kepala Desa',
      value: `${profile.headName} — ${profile.headTitle}`,
    },
  ];

  return (
    <div className="page-transition">
      {/* Header */}
      <section className="gradient-hero py-16 lg:py-20">
        <div className="container-custom text-center">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-3">
            Hubungi Kami
          </h1>
          <p className="text-white/80 text-base sm:text-lg max-w-2xl mx-auto">
            Kami siap membantu Anda. Jangan ragu untuk menghubungi kami melalui formulir atau kontak di bawah ini.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="container-custom py-12 lg:py-16" id="kontak-content">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Contact Info */}
          <div>
            <h2 className="text-xl font-bold mb-6" style={{ color: 'var(--text-primary)' }}>
              Informasi Kontak
            </h2>
            <div className="space-y-4 mb-8">
              {contactItems.map((item) => (
                <div
                  key={item.label}
                  className="flex items-start gap-4 p-4 rounded-xl"
                  style={{
                    backgroundColor: 'var(--bg-card)',
                    border: '1px solid var(--border-color)',
                  }}
                >
                  <div className="w-10 h-10 rounded-lg bg-primary-500/10 flex items-center justify-center shrink-0 text-primary-500">
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider mb-0.5" style={{ color: 'var(--text-muted)' }}>
                      {item.label}
                    </p>
                    <p className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>
                      {item.value}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Social Media */}
            <h3 className="text-base font-bold mb-3" style={{ color: 'var(--text-primary)' }}>
              Media Sosial
            </h3>
            <div className="flex gap-3">
              {profile.socialMedia.facebook && (
                <a
                  href={profile.socialMedia.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-11 h-11 rounded-xl flex items-center justify-center transition-all hover:bg-primary-500/10 hover:-translate-y-0.5"
                  style={{ border: '1px solid var(--border-color)', color: 'var(--text-muted)' }}
                  aria-label="Facebook"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
              )}
              {profile.socialMedia.instagram && (
                <a
                  href={profile.socialMedia.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-11 h-11 rounded-xl flex items-center justify-center transition-all hover:bg-primary-500/10 hover:-translate-y-0.5"
                  style={{ border: '1px solid var(--border-color)', color: 'var(--text-muted)' }}
                  aria-label="Instagram"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                  </svg>
                </a>
              )}
              {profile.socialMedia.youtube && (
                <a
                  href={profile.socialMedia.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-11 h-11 rounded-xl flex items-center justify-center transition-all hover:bg-primary-500/10 hover:-translate-y-0.5"
                  style={{ border: '1px solid var(--border-color)', color: 'var(--text-muted)' }}
                  aria-label="YouTube"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                </a>
              )}
            </div>

            {/* Map Embed */}
            <div className="mt-8">
              <h3 className="text-base font-bold mb-3" style={{ color: 'var(--text-primary)' }}>
                Lokasi Kami
              </h3>
              <div
                className="aspect-[16/9] rounded-xl overflow-hidden"
                style={{ border: '1px solid var(--border-color)' }}
              >
                <iframe
                  src={`https://www.openstreetmap.org/export/embed.html?bbox=${profile.longitude - 0.01}%2C${profile.latitude - 0.01}%2C${profile.longitude + 0.01}%2C${profile.latitude + 0.01}&layer=mapnik&marker=${profile.latitude}%2C${profile.longitude}`}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  loading="lazy"
                  title={`Lokasi ${profile.name}`}
                />
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <h2 className="text-xl font-bold mb-6" style={{ color: 'var(--text-primary)' }}>
              Kirim Pesan
            </h2>
            <ContactForm />
          </div>
        </div>
      </section>
    </div>
  );
}
