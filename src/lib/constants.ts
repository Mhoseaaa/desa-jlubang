import type { NavigationItem, DesaProfile, ApbDes } from '@/types/content';

/* ========================================================
   Navigation — Portal Desa Jlubang
   ======================================================== */
export const NAV_ITEMS: NavigationItem[] = [
  { name: 'Beranda', href: '/' },
  { name: 'Profil Desa', href: '/profil' },
  { name: 'Dusun', href: '/dusun' },
  { name: 'UMKM', href: '/umkm' },
  { name: 'Wisata', href: '/wisata' },
  { name: 'Kebudayaan', href: '/kebudayaan' },
  { name: 'Berita', href: '/berita' },
  { name: 'Agenda', href: '/agenda' },
  { name: 'Peta', href: '/peta' },
  { name: 'Kontak', href: '/kontak' },
];

/* ========================================================
   Site Configuration
   ======================================================== */
export const SITE_CONFIG = {
  name: 'Desa Jlubang',
  tagline: 'Portal Digital Desa',
  description: 'Portal digital resmi Desa Jlubang — informasi profil desa, dusun, UMKM, wisata, kebudayaan, berita, dan agenda.',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
  ogImage: '/images/og-image.jpg',
  locale: 'id_ID',
  keywords: [
    'Desa Jlubang',
    'portal desa',
    'desa digital',
    'UMKM desa',
    'wisata desa',
    'kebudayaan desa',
    'Dusun Citrowonodadi',
    'Pringkuku',
    'Pacitan',
  ],
};

/* ========================================================
   WordPress API
   ======================================================== */
export const WP_API_URL = process.env.NEXT_PUBLIC_WORDPRESS_API_URL || '';
export const POSTS_PER_PAGE = 9;
export const ITEMS_PER_PAGE = 9;
export const GALLERY_PER_PAGE = 12;
export const REVALIDATE_INTERVAL = 60;

/* ========================================================
   Desa Profile Data
   ======================================================== */
export const DESA_PROFILE: DesaProfile = {
  name: 'Desa Jlubang',
  tagline: 'Desa Maju, Mandiri, Berbudaya',
  description: 'Desa Jlubang merupakan desa yang terletak di Kecamatan Pringkuku, Kabupaten Pacitan, Jawa Timur. Portal ini berfokus menampilkan Dusun Citrowonodadi beserta potensi budaya, wisata, dan UMKM-nya.',
  history: `Desa Jlubang terletak di Kecamatan Pringkuku, Kabupaten Pacitan, Jawa Timur — wilayah yang dikenal dengan kontur perbukitan dan kekayaan alamnya, termasuk gua alami Goa Jaran yang menjadi salah satu daya tarik wisata di desa ini.

Salah satu dusun di Desa Jlubang, Citrowonodadi, terbentuk dari dua area permukiman: bagian selatan sebagai permukiman utama (Citro) dan bagian utara sebagai permukiman yang berkembang lebih kemudian (Wonodadi). Kedua area ini kini menyatu sebagai satu wilayah dusun.

Sejak dahulu, masyarakat Desa Jlubang hidup dengan semangat gotong royong dan kekeluargaan yang kuat. Tradisi dan budaya lokal terus dijaga dan dilestarikan hingga saat ini.`,
  vision: 'Mewujudkan Desa Jlubang yang maju, mandiri, sejahtera, dan berbudaya berbasis potensi lokal serta berwawasan digital.',
  mission: [
    'Meningkatkan kualitas sumber daya manusia melalui pendidikan dan pelatihan',
    'Mengembangkan potensi ekonomi lokal melalui pemberdayaan UMKM',
    'Melestarikan budaya dan kearifan lokal Dusun Citrowonodadi',
    'Mengembangkan potensi wisata desa secara berkelanjutan',
    'Meningkatkan infrastruktur dan pelayanan publik',
    'Mewujudkan tata kelola pemerintahan desa yang transparan dan akuntabel',
  ],
  address: 'Desa Jlubang',
  district: 'Pringkuku',
  regency: 'Pacitan',
  province: 'Jawa Timur',
  postalCode: '63552',
  phone: '(0357) 123-4567',
  email: 'desajlubang@gmail.com',
  headName: 'Bpk. Suharto',
  headTitle: 'Kepala Desa Jlubang',
  // Approximate village-level coordinate (geocoded via OpenStreetMap Nominatim for "Jlubang, Pacitan").
  // TODO: replace with the precise Kantor Desa pin once available.
  latitude: -8.209,
  longitude: 111.0062,
  socialMedia: {
    facebook: 'https://facebook.com/desajlubang',
    instagram: 'https://instagram.com/desajlubang',
    youtube: 'https://youtube.com/@desajlubang',
  },
  stats: {
    population: 3200,
    male: 1620,
    female: 1580,
    kk: 892,
    area: '6.2 km²',
    dusun: 1,
    rt: 12,
    rw: 4,
    elevation: '200 mdpl',
  },
};

/* ========================================================
   APBDes (Village Budget) — TA 2026
   ======================================================== */
export const APBDES: ApbDes = {
  year: 2026,
  pendapatan: 1_250_000_000,
  belanja: 1_150_000_000,
  pembiayaan: 0,
  surplus: 100_000_000,
  sumberDana: [
    { label: 'Dana Desa', nilai: 850_000_000 },
    { label: 'ADD', nilai: 280_000_000 },
    { label: 'PADes', nilai: 120_000_000 },
  ],
};

/* ========================================================
   Map Configuration
   ======================================================== */
export const MAP_CONFIG = {
  center: [-8.08, 112.14] as [number, number],
  zoom: 14,
  minZoom: 10,
  maxZoom: 18,
  tileUrl: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  tileAttribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
};

export const MAP_CATEGORY_COLORS: Record<string, string> = {
  dusun: '#2563eb',
  wisata: '#10b981',
  umkm: '#f97316',
};

export const MAP_CATEGORY_LABELS: Record<string, string> = {
  dusun: 'Dusun',
  wisata: 'Wisata',
  umkm: 'UMKM',
};
