import type { Metadata, Viewport } from 'next';
import { Inter, Outfit } from 'next/font/google';
import ThemeProvider from '@/components/layout/ThemeProvider';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { SITE_CONFIG } from '@/lib/constants';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });
const outfit = Outfit({ subsets: ['latin'], variable: '--font-outfit', display: 'swap' });

export const metadata: Metadata = {
  metadataBase: new URL(SITE_CONFIG.url),
  title: { default: `${SITE_CONFIG.name} — ${SITE_CONFIG.tagline}`, template: `%s | ${SITE_CONFIG.name}` },
  description: SITE_CONFIG.description,
  keywords: SITE_CONFIG.keywords,
  authors: [{ name: 'Tim KKN Desa Jlubang' }],
  openGraph: { type: 'website', locale: SITE_CONFIG.locale, url: SITE_CONFIG.url, siteName: SITE_CONFIG.name, title: `${SITE_CONFIG.name} — ${SITE_CONFIG.tagline}`, description: SITE_CONFIG.description, images: [{ url: SITE_CONFIG.ogImage, width: 1200, height: 630 }] },
  twitter: { card: 'summary_large_image', title: `${SITE_CONFIG.name} — ${SITE_CONFIG.tagline}`, description: SITE_CONFIG.description },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  width: 'device-width', initialScale: 1,
  themeColor: [{ media: '(prefers-color-scheme: light)', color: '#ffffff' }, { media: '(prefers-color-scheme: dark)', color: '#0f172a' }],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body className={`${inter.variable} ${outfit.variable} antialiased`}>
        <ThemeProvider>
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-1 pt-[60px]">{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
