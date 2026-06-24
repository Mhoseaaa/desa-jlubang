/* ========================================================
   WordPress REST API Client — Portal Desa Jlubang
   Falls back to mock data whenever WP is not configured
   (NEXT_PUBLIC_WORDPRESS_API_URL unset), so the site is always
   fully functional even before a real WordPress backend exists.

   Expected WP REST contract — see wordpress-setup/ for the
   companion plugin that registers exactly this shape:
   - Custom Post Types: dusun, umkm, wisata, kebudayaan, agenda,
     galeri, pemerintahan — each `show_in_rest`, custom fields
     exposed under the `acf` key (ACF free v6+, per-field
     `show_in_rest`, no extra REST plugin needed).
   - Dusun-relation fields (UMKM/Wisata/Kebudayaan/Galeri -> Dusun)
     are an ACF Post Object field with return_format=object, so
     `acf.dusun` is `{ post_title, post_name }`, not a bare ID.
   - List-style fields (UMKM.products, Wisata.facilities) are
     comma-separated ACF Text fields, split on the client.
   - Desa Profile (singleton vision/mission/contact/stats) is an
     ACF Options Page served via one custom route (getDesaProfile).
   ======================================================== */

import type {
  NewsArticle,
  PaginatedResponse,
  Dusun,
  UMKMItem,
  WisataItem,
  KebudayaanItem,
  AgendaItem,
  GalleryItem,
  GovernmentMember,
  DesaProfile,
} from '@/types/content';
import { WP_API_URL, REVALIDATE_INTERVAL, ITEMS_PER_PAGE, GALLERY_PER_PAGE, DESA_PROFILE } from '@/lib/constants';
import { stripHtml, truncateText, getGoogleMapsUrl } from '@/lib/utils';
import {
  getMockNews,
  getMockNewsBySlug,
  mockDusunList,
  getMockDusunBySlug,
  mockUMKMItems,
  getMockUMKMByDusun,
  getMockUMKMBySlug,
  mockWisataItems,
  getMockWisataByDusun,
  getMockWisataBySlug,
  mockKebudayaan,
  getMockKebudayaanByDusun,
  getMockKebudayaanBySlug,
  mockAgendaItems,
  mockGallery,
  getMockGalleryByDusun,
  mockGovernment,
  paginate,
} from './mock-data';

const isWordPressConfigured = !!WP_API_URL;
// wp-json root (strips the trailing /wp/v2) for custom-namespace routes like the Desa Profile.
const WP_ROOT = WP_API_URL.replace(/\/wp\/v2\/?$/, '');

/* --------------------------------------------------------
   Generic Fetcher (wp/v2 + custom post type endpoints)
   -------------------------------------------------------- */
async function fetchAPI<T>(
  endpoint: string,
  params?: Record<string, string | number | boolean>
): Promise<{ data: T; totalPages: number; totalItems: number }> {
  const url = new URL(`${WP_API_URL}/${endpoint}`);
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      url.searchParams.append(key, String(value));
    });
  }

  const res = await fetch(url.toString(), {
    next: { revalidate: REVALIDATE_INTERVAL },
    headers: { 'Content-Type': 'application/json' },
  });

  if (!res.ok) {
    throw new Error(`WordPress API error: ${res.status} ${res.statusText}`);
  }

  const data = await res.json();
  const totalPages = parseInt(res.headers.get('X-WP-TotalPages') || '1', 10);
  const totalItems = parseInt(res.headers.get('X-WP-Total') || '0', 10);
  return { data, totalPages, totalItems };
}

/* --------------------------------------------------------
   Posts (Berita)
   -------------------------------------------------------- */
interface GetPostsParams {
  page?: number;
  per_page?: number;
  search?: string;
}

export async function getPosts(params?: GetPostsParams): Promise<PaginatedResponse<NewsArticle>> {
  if (!isWordPressConfigured) {
    return getMockNews(params);
  }

  const queryParams: Record<string, string | number | boolean> = {
    _embed: true,
    per_page: params?.per_page || 9,
    page: params?.page || 1,
    orderby: 'date',
    order: 'desc',
  };
  if (params?.search) queryParams.search = params.search;

  const { data: posts, totalPages, totalItems } = await fetchAPI<WPPost[]>('posts', queryParams);
  const articles = posts.map(transformWPPostToNews);
  return { data: articles, totalPages, totalItems };
}

export async function getPostBySlug(slug: string): Promise<NewsArticle | null> {
  if (!isWordPressConfigured) {
    return getMockNewsBySlug(slug);
  }

  const { data: posts } = await fetchAPI<WPPost[]>('posts', { slug, _embed: true });
  return posts[0] ? transformWPPostToNews(posts[0]) : null;
}

/* --------------------------------------------------------
   WP Types & Transformer — Posts (internal)
   -------------------------------------------------------- */
interface WPPost {
  id: number;
  date: string;
  slug: string;
  title: { rendered: string };
  content: { rendered: string };
  excerpt: { rendered: string };
  _embedded?: {
    'wp:featuredmedia'?: Array<{ source_url: string; alt_text: string }>;
    'wp:term'?: Array<Array<{ name: string }>>;
    author?: Array<{ name: string }>;
  };
}

function transformWPPostToNews(post: WPPost): NewsArticle {
  const media = post._embedded?.['wp:featuredmedia']?.[0];
  const cat = post._embedded?.['wp:term']?.[0]?.[0];
  const author = post._embedded?.author?.[0];
  return {
    id: post.id,
    slug: post.slug,
    title: stripHtml(post.title.rendered),
    excerpt: truncateText(stripHtml(post.excerpt.rendered), 160),
    content: post.content.rendered,
    date: post.date,
    imageUrl: media?.source_url || '/images/placeholder.jpg',
    imageAlt: media?.alt_text || stripHtml(post.title.rendered),
    category: cat?.name || 'Umum',
    author: author?.name || 'Admin',
  };
}

/* --------------------------------------------------------
   Shared ACF helpers (internal)
   -------------------------------------------------------- */
interface WPDusunRelation {
  post_title?: string;
  post_name?: string;
}

interface WPFeaturedMediaEmbed {
  source_url: string;
  alt_text: string;
  media_details?: { width: number; height: number };
}

interface WPAcfPost<T> {
  id: number;
  slug: string;
  title: { rendered: string };
  content?: { rendered: string };
  excerpt?: { rendered: string };
  acf: T;
  _embedded?: { 'wp:featuredmedia'?: WPFeaturedMediaEmbed[] };
}

function splitList(value?: string): string[] {
  return value ? value.split(',').map((v) => v.trim()).filter(Boolean) : [];
}

function dusunFromAcf(rel?: WPDusunRelation): { dusunSlug: string; dusunName: string } {
  return { dusunSlug: rel?.post_name || '', dusunName: rel?.post_title || '' };
}

function featuredImage(post: WPAcfPost<unknown>) {
  const media = post._embedded?.['wp:featuredmedia']?.[0];
  return {
    url: media?.source_url || '/images/placeholder.jpg',
    alt: media?.alt_text || '',
    width: media?.media_details?.width || 800,
    height: media?.media_details?.height || 533,
  };
}

interface ListByDusunParams {
  dusunSlug?: string;
  page?: number;
  per_page?: number;
}

/* --------------------------------------------------------
   Dusun
   -------------------------------------------------------- */
interface WPDusunAcf {
  history: string;
  latitude: number;
  longitude: number;
  head_name: string;
  population: number;
  area: string;
  rt: number;
  rw: number;
}

function transformWPDusun(post: WPAcfPost<WPDusunAcf>): Dusun {
  const img = featuredImage(post);
  return {
    id: post.id,
    slug: post.slug,
    name: stripHtml(post.title.rendered),
    description: stripHtml(post.excerpt?.rendered || ''),
    history: post.acf.history,
    imageUrl: img.url,
    latitude: post.acf.latitude,
    longitude: post.acf.longitude,
    headName: post.acf.head_name,
    population: post.acf.population,
    area: post.acf.area,
    rt: post.acf.rt,
    rw: post.acf.rw,
  };
}

export async function getDusunList(): Promise<Dusun[]> {
  if (!isWordPressConfigured) return mockDusunList;
  const { data } = await fetchAPI<WPAcfPost<WPDusunAcf>[]>('dusun', { _embed: true, per_page: 100 });
  return data.map(transformWPDusun);
}

export async function getDusunBySlug(slug: string): Promise<Dusun | null> {
  if (!isWordPressConfigured) return getMockDusunBySlug(slug);
  const { data } = await fetchAPI<WPAcfPost<WPDusunAcf>[]>('dusun', { slug, _embed: true });
  return data[0] ? transformWPDusun(data[0]) : null;
}

/* --------------------------------------------------------
   UMKM
   -------------------------------------------------------- */
interface WPUMKMAcf {
  description: string;
  category: string;
  owner: string;
  phone: string;
  address: string;
  products: string;
  latitude: number;
  longitude: number;
  dusun?: WPDusunRelation;
  gallery?: Array<{ url: string }>;
}

function transformWPUMKM(post: WPAcfPost<WPUMKMAcf>): UMKMItem {
  const img = featuredImage(post);
  const { dusunSlug, dusunName } = dusunFromAcf(post.acf.dusun);
  return {
    id: post.id,
    slug: post.slug,
    name: stripHtml(post.title.rendered),
    description: post.acf.description,
    imageUrl: img.url,
    images: (post.acf.gallery || []).map((g) => g.url),
    category: post.acf.category,
    owner: post.acf.owner,
    phone: post.acf.phone,
    address: post.acf.address,
    products: splitList(post.acf.products),
    latitude: post.acf.latitude,
    longitude: post.acf.longitude,
    dusunSlug,
    dusunName,
  };
}

export async function getUMKMList(params?: ListByDusunParams): Promise<PaginatedResponse<UMKMItem>> {
  if (!isWordPressConfigured) {
    const items = params?.dusunSlug ? getMockUMKMByDusun(params.dusunSlug) : mockUMKMItems;
    return paginate(items, params?.page || 1, params?.per_page || ITEMS_PER_PAGE);
  }
  // Village-scale CPTs (well under WP's 100-per-page ceiling): fetch once, filter/paginate in JS.
  const { data } = await fetchAPI<WPAcfPost<WPUMKMAcf>[]>('umkm', { _embed: true, per_page: 100 });
  let items = data.map(transformWPUMKM);
  if (params?.dusunSlug) items = items.filter((u) => u.dusunSlug === params.dusunSlug);
  return paginate(items, params?.page || 1, params?.per_page || ITEMS_PER_PAGE);
}

export async function getUMKMBySlug(slug: string): Promise<UMKMItem | null> {
  if (!isWordPressConfigured) return getMockUMKMBySlug(slug);
  const { data } = await fetchAPI<WPAcfPost<WPUMKMAcf>[]>('umkm', { slug, _embed: true });
  return data[0] ? transformWPUMKM(data[0]) : null;
}

/* --------------------------------------------------------
   Wisata
   -------------------------------------------------------- */
interface WPWisataAcf {
  description: string;
  category: string;
  facilities: string;
  ticket_price: string;
  open_hours: string;
  latitude: number;
  longitude: number;
  address: string;
  rating: number;
  dusun?: WPDusunRelation;
  gallery?: Array<{ url: string }>;
}

function transformWPWisata(post: WPAcfPost<WPWisataAcf>): WisataItem {
  const img = featuredImage(post);
  const { dusunSlug, dusunName } = dusunFromAcf(post.acf.dusun);
  return {
    id: post.id,
    slug: post.slug,
    name: stripHtml(post.title.rendered),
    description: post.acf.description,
    imageUrl: img.url,
    images: (post.acf.gallery || []).map((g) => g.url),
    category: post.acf.category,
    facilities: splitList(post.acf.facilities),
    ticketPrice: post.acf.ticket_price,
    openHours: post.acf.open_hours,
    latitude: post.acf.latitude,
    longitude: post.acf.longitude,
    address: post.acf.address,
    rating: post.acf.rating,
    dusunSlug,
    dusunName,
    googleMapsUrl: getGoogleMapsUrl(post.acf.latitude, post.acf.longitude),
  };
}

export async function getWisataList(params?: ListByDusunParams): Promise<PaginatedResponse<WisataItem>> {
  if (!isWordPressConfigured) {
    const items = params?.dusunSlug ? getMockWisataByDusun(params.dusunSlug) : mockWisataItems;
    return paginate(items, params?.page || 1, params?.per_page || ITEMS_PER_PAGE);
  }
  const { data } = await fetchAPI<WPAcfPost<WPWisataAcf>[]>('wisata', { _embed: true, per_page: 100 });
  let items = data.map(transformWPWisata);
  if (params?.dusunSlug) items = items.filter((w) => w.dusunSlug === params.dusunSlug);
  return paginate(items, params?.page || 1, params?.per_page || ITEMS_PER_PAGE);
}

export async function getWisataBySlug(slug: string): Promise<WisataItem | null> {
  if (!isWordPressConfigured) return getMockWisataBySlug(slug);
  const { data } = await fetchAPI<WPAcfPost<WPWisataAcf>[]>('wisata', { slug, _embed: true });
  return data[0] ? transformWPWisata(data[0]) : null;
}

/* --------------------------------------------------------
   Kebudayaan
   -------------------------------------------------------- */
interface WPKebudayaanAcf {
  category: string;
  dusun?: WPDusunRelation;
  video_url?: string;
  gallery?: Array<{ url: string }>;
}

function transformWPKebudayaan(post: WPAcfPost<WPKebudayaanAcf>): KebudayaanItem {
  const img = featuredImage(post);
  const { dusunSlug, dusunName } = dusunFromAcf(post.acf.dusun);
  return {
    id: post.id,
    slug: post.slug,
    title: stripHtml(post.title.rendered),
    description: stripHtml(post.excerpt?.rendered || ''),
    content: post.content?.rendered || '',
    imageUrl: img.url,
    images: (post.acf.gallery || []).map((g) => g.url),
    category: post.acf.category as KebudayaanItem['category'],
    dusunSlug,
    dusunName,
    videoUrl: post.acf.video_url || undefined,
  };
}

interface KebudayaanListParams extends ListByDusunParams {
  category?: string;
}

export async function getKebudayaanList(params?: KebudayaanListParams): Promise<PaginatedResponse<KebudayaanItem>> {
  if (!isWordPressConfigured) {
    let items = params?.dusunSlug ? getMockKebudayaanByDusun(params.dusunSlug) : mockKebudayaan;
    if (params?.category) items = items.filter((k) => k.category === params.category);
    return paginate(items, params?.page || 1, params?.per_page || ITEMS_PER_PAGE);
  }
  const { data } = await fetchAPI<WPAcfPost<WPKebudayaanAcf>[]>('kebudayaan', { _embed: true, per_page: 100 });
  let items = data.map(transformWPKebudayaan);
  if (params?.dusunSlug) items = items.filter((k) => k.dusunSlug === params.dusunSlug);
  if (params?.category) items = items.filter((k) => k.category === params.category);
  return paginate(items, params?.page || 1, params?.per_page || ITEMS_PER_PAGE);
}

export async function getKebudayaanBySlug(slug: string): Promise<KebudayaanItem | null> {
  if (!isWordPressConfigured) return getMockKebudayaanBySlug(slug);
  const { data } = await fetchAPI<WPAcfPost<WPKebudayaanAcf>[]>('kebudayaan', { slug, _embed: true });
  return data[0] ? transformWPKebudayaan(data[0]) : null;
}

/* --------------------------------------------------------
   Agenda
   -------------------------------------------------------- */
interface WPAgendaAcf {
  event_date: string;
  event_time: string;
  location: string;
  category: string;
  status: 'upcoming' | 'ongoing' | 'completed';
}

function transformWPAgenda(post: WPAcfPost<WPAgendaAcf>): AgendaItem {
  return {
    id: post.id,
    title: stripHtml(post.title.rendered),
    description: stripHtml(post.excerpt?.rendered || post.content?.rendered || ''),
    date: post.acf.event_date,
    time: post.acf.event_time,
    location: post.acf.location,
    category: post.acf.category,
    status: post.acf.status,
  };
}

export async function getAgendaList(): Promise<AgendaItem[]> {
  if (!isWordPressConfigured) return mockAgendaItems;
  const { data } = await fetchAPI<WPAcfPost<WPAgendaAcf>[]>('agenda', { per_page: 100 });
  return data.map(transformWPAgenda).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

/* --------------------------------------------------------
   Galeri
   -------------------------------------------------------- */
interface WPGaleriAcf {
  caption?: string;
  dusun?: WPDusunRelation;
}

function transformWPGaleri(post: WPAcfPost<WPGaleriAcf>): GalleryItem {
  const img = featuredImage(post);
  const { dusunSlug } = dusunFromAcf(post.acf.dusun);
  return {
    id: post.id,
    title: stripHtml(post.title.rendered),
    caption: post.acf.caption || '',
    imageUrl: img.url,
    thumbnailUrl: img.url,
    altText: img.alt || stripHtml(post.title.rendered),
    width: img.width,
    height: img.height,
    dusunSlug: dusunSlug || undefined,
  };
}

interface GalleryParams {
  page?: number;
  per_page?: number;
  dusunSlug?: string;
}

export async function getGallery(params?: GalleryParams): Promise<PaginatedResponse<GalleryItem>> {
  if (!isWordPressConfigured) {
    const items = params?.dusunSlug ? getMockGalleryByDusun(params.dusunSlug) : mockGallery;
    return paginate(items, params?.page || 1, params?.per_page || GALLERY_PER_PAGE);
  }
  const { data, totalPages, totalItems } = await fetchAPI<WPAcfPost<WPGaleriAcf>[]>('galeri', {
    _embed: true,
    per_page: params?.per_page || GALLERY_PER_PAGE,
    page: params?.page || 1,
  });
  const items = data.map(transformWPGaleri);
  if (params?.dusunSlug) {
    const filtered = items.filter((g) => g.dusunSlug === params.dusunSlug);
    return paginate(filtered, params?.page || 1, params?.per_page || GALLERY_PER_PAGE);
  }
  return { data: items, totalPages, totalItems };
}

/* --------------------------------------------------------
   Pemerintahan (Government)
   -------------------------------------------------------- */
interface WPGovernmentAcf {
  role: string;
  period?: string;
}

function transformWPGovernment(post: WPAcfPost<WPGovernmentAcf>): GovernmentMember {
  const img = featuredImage(post);
  return {
    id: post.id,
    name: stripHtml(post.title.rendered),
    role: post.acf.role,
    period: post.acf.period,
    photo: img.url !== '/images/placeholder.jpg' ? img.url : undefined,
  };
}

export async function getGovernment(): Promise<GovernmentMember[]> {
  if (!isWordPressConfigured) return mockGovernment;
  const { data } = await fetchAPI<WPAcfPost<WPGovernmentAcf>[]>('pemerintahan', { _embed: true, per_page: 100 });
  return data.map(transformWPGovernment);
}

/* --------------------------------------------------------
   Desa Profile (singleton — ACF Options Page via custom route)
   -------------------------------------------------------- */
export async function getDesaProfile(): Promise<DesaProfile> {
  if (!isWordPressConfigured) return DESA_PROFILE;

  const res = await fetch(`${WP_ROOT}/portal-desa/v1/profile`, {
    next: { revalidate: REVALIDATE_INTERVAL },
    headers: { 'Content-Type': 'application/json' },
  });

  if (!res.ok) {
    throw new Error(`WordPress API error: ${res.status} ${res.statusText}`);
  }

  return res.json();
}
