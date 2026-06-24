import type { MetadataRoute } from 'next';
import { SITE_CONFIG } from '@/lib/constants';
import { getPosts, getDusunList, getUMKMList, getWisataList, getKebudayaanList } from '@/lib/api/wordpress';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = SITE_CONFIG.url;

  const staticPages: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: 'daily', priority: 1.0 },
    { url: `${baseUrl}/profil`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/dusun`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/umkm`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/wisata`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/kebudayaan`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 },
    { url: `${baseUrl}/berita`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
    { url: `${baseUrl}/agenda`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 },
    { url: `${baseUrl}/galeri`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 },
    { url: `${baseUrl}/peta`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/kontak`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
  ];

  const [posts, dusunList, umkm, wisata, kebudayaan] = await Promise.all([
    getPosts({ per_page: 100 }),
    getDusunList(),
    getUMKMList({ per_page: 100 }),
    getWisataList({ per_page: 100 }),
    getKebudayaanList({ per_page: 100 }),
  ]);

  const beritaPages: MetadataRoute.Sitemap = posts.data.map((post) => ({
    url: `${baseUrl}/berita/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: 'weekly',
    priority: 0.6,
  }));

  const dusunPages: MetadataRoute.Sitemap = dusunList.map((d) => ({
    url: `${baseUrl}/dusun/${d.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  const umkmPages: MetadataRoute.Sitemap = umkm.data.map((u) => ({
    url: `${baseUrl}/umkm/${u.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.6,
  }));

  const wisataPages: MetadataRoute.Sitemap = wisata.data.map((w) => ({
    url: `${baseUrl}/wisata/${w.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.6,
  }));

  const kebudayaanPages: MetadataRoute.Sitemap = kebudayaan.data.map((k) => ({
    url: `${baseUrl}/kebudayaan/${k.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.6,
  }));

  return [...staticPages, ...beritaPages, ...dusunPages, ...umkmPages, ...wisataPages, ...kebudayaanPages];
}
