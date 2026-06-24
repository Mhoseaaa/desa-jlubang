import type { NavigationItem, DesaProfile } from '@/types/content';

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
    'Dusun Citro',
    'Dusun Wonodadi',
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
  description: 'Desa Jlubang merupakan desa yang terletak di wilayah Kabupaten Blitar, Jawa Timur. Desa ini terdiri dari beberapa dusun yang masing-masing memiliki keunikan budaya, potensi wisata, dan UMKM unggulan.',
  history: `Desa Jlubang memiliki sejarah panjang yang erat kaitannya dengan perkembangan peradaban di wilayah Blitar. Nama "Jlubang" berasal dari bahasa Jawa yang menggambarkan kondisi geografis desa yang subur dan kaya akan sumber air.

Sejak zaman dahulu, masyarakat Desa Jlubang hidup dengan semangat gotong royong dan kekeluargaan yang kuat. Tradisi dan budaya lokal terus dijaga dan dilestarikan hingga saat ini.

Desa ini terus berkembang menjadi desa yang maju dengan tetap menjaga kearifan lokal dan nilai-nilai budaya yang menjadi identitasnya.`,
  vision: 'Mewujudkan Desa Jlubang yang maju, mandiri, sejahtera, dan berbudaya berbasis potensi lokal serta berwawasan digital.',
  mission: [
    'Meningkatkan kualitas sumber daya manusia melalui pendidikan dan pelatihan',
    'Mengembangkan potensi ekonomi lokal melalui pemberdayaan UMKM',
    'Melestarikan budaya dan kearifan lokal setiap dusun',
    'Mengembangkan potensi wisata desa secara berkelanjutan',
    'Meningkatkan infrastruktur dan pelayanan publik',
    'Mewujudkan tata kelola pemerintahan desa yang transparan dan akuntabel',
  ],
  address: 'Desa Jlubang',
  district: 'Sanan Kulon',
  regency: 'Blitar',
  province: 'Jawa Timur',
  postalCode: '66171',
  phone: '(0342) 123-4567',
  email: 'desajlubang@gmail.com',
  headName: 'Bpk. Suharto',
  headTitle: 'Kepala Desa Jlubang',
  latitude: -8.08,
  longitude: 112.14,
  socialMedia: {
    facebook: 'https://facebook.com/desajlubang',
    instagram: 'https://instagram.com/desajlubang',
    youtube: 'https://youtube.com/@desajlubang',
  },
  stats: {
    population: 6500,
    area: '12.5 km²',
    dusun: 2,
    rt: 24,
    rw: 8,
    elevation: '200 mdpl',
  },
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
  dusun: '#8b5cf6',
  wisata: '#10b981',
  umkm: '#f59e0b',
};

export const MAP_CATEGORY_LABELS: Record<string, string> = {
  dusun: 'Dusun',
  wisata: 'Wisata',
  umkm: 'UMKM',
};
