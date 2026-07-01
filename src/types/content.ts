/* ========================================================
   Application Content Types — Portal Desa Jlubang
   Arsitektur: Desa → Dusun → (UMKM, Wisata, Kebudayaan)
   ======================================================== */

/* --------------------------------------------------------
   Desa (Village Level)
   -------------------------------------------------------- */
export interface DesaProfile {
  name: string;
  tagline: string;
  description: string;
  history: string;
  vision: string;
  mission: string[];
  address: string;
  district: string;
  regency: string;
  province: string;
  postalCode: string;
  phone: string;
  email: string;
  headName: string;
  headTitle: string;
  latitude: number;
  longitude: number;
  socialMedia: SocialMedia;
  stats: DesaStats;
}

export interface DesaStats {
  population: number;
  male: number;
  female: number;
  kk: number;
  area: string;
  dusun: number;
  rt: number;
  rw: number;
  elevation: string;
}

export interface ApbDes {
  year: number;
  pendapatan: number;
  belanja: number;
  pembiayaan: number;
  surplus: number;
  sumberDana: { label: string; nilai: number }[];
}

export interface SocialMedia {
  facebook?: string;
  instagram?: string;
  youtube?: string;
  twitter?: string;
  tiktok?: string;
}

export interface GovernmentMember {
  id: number;
  name: string;
  role: string;
  photo?: string;
  period?: string;
}

/* --------------------------------------------------------
   Dusun (Hamlet Level)
   -------------------------------------------------------- */
export interface Dusun {
  id: number;
  slug: string;
  name: string;
  description: string;
  history: string;
  imageUrl: string;
  latitude: number;
  longitude: number;
  headName: string;
  population: number;
  area: string;
  rt: number;
  rw: number;
}

/* --------------------------------------------------------
   Berita (News)
   -------------------------------------------------------- */
export interface NewsArticle {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  imageUrl: string;
  imageAlt: string;
  category: string;
  author: string;
}

/* --------------------------------------------------------
   Agenda
   -------------------------------------------------------- */
export interface AgendaItem {
  id: number;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  category: string;
  status: 'upcoming' | 'ongoing' | 'completed';
}

/* --------------------------------------------------------
   UMKM
   -------------------------------------------------------- */
export interface UMKMItem {
  id: number;
  slug: string;
  name: string;
  description: string;
  imageUrl: string;
  images: string[];
  category: string;
  owner: string;
  phone: string;
  address: string;
  products: string[];
  latitude: number;
  longitude: number;
  dusunSlug: string;
  dusunName: string;
}

/* --------------------------------------------------------
   Wisata (Tourism)
   -------------------------------------------------------- */
export interface WisataItem {
  id: number;
  slug: string;
  name: string;
  description: string;
  imageUrl: string;
  images: string[];
  category: string;
  facilities: string[];
  ticketPrice: string;
  openHours: string;
  latitude: number;
  longitude: number;
  address: string;
  rating: number;
  dusunSlug: string;
  dusunName: string;
  googleMapsUrl: string;
}

/* --------------------------------------------------------
   Kebudayaan (Culture)
   -------------------------------------------------------- */
export interface KebudayaanItem {
  id: number;
  slug: string;
  title: string;
  description: string;
  content: string;
  imageUrl: string;
  images: string[];
  category: 'tradisi' | 'kesenian' | 'makanan' | 'kerajinan' | 'cerita-rakyat';
  dusunSlug: string;
  dusunName: string;
  videoUrl?: string;
}

export const KEBUDAYAAN_CATEGORIES: Record<string, string> = {
  tradisi: 'Tradisi',
  kesenian: 'Kesenian',
  makanan: 'Makanan Khas',
  kerajinan: 'Kerajinan',
  'cerita-rakyat': 'Cerita Rakyat',
};

/* --------------------------------------------------------
   Galeri
   -------------------------------------------------------- */
export interface GalleryItem {
  id: number;
  title: string;
  caption: string;
  imageUrl: string;
  thumbnailUrl: string;
  altText: string;
  width: number;
  height: number;
  dusunSlug?: string;
}

/* --------------------------------------------------------
   Map
   -------------------------------------------------------- */
export interface MapMarker {
  id: number;
  name: string;
  description: string;
  latitude: number;
  longitude: number;
  category: 'dusun' | 'wisata' | 'umkm';
  imageUrl?: string;
  dusunSlug?: string;
  dusunName?: string;
  googleMapsUrl?: string;
}

/* --------------------------------------------------------
   Navigation
   -------------------------------------------------------- */
export interface NavigationItem {
  name: string;
  href: string;
}

/* --------------------------------------------------------
   Paginated Response
   -------------------------------------------------------- */
export interface PaginatedResponse<T> {
  data: T[];
  totalPages: number;
  totalItems: number;
}
