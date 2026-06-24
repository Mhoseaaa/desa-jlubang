/* ========================================================
   WordPress REST API Type Definitions
   ======================================================== */

export interface WPRenderedContent {
  rendered: string;
  protected?: boolean;
}

export interface WPFeaturedMedia {
  id: number;
  source_url: string;
  alt_text: string;
  media_details: {
    width: number;
    height: number;
    sizes: {
      thumbnail?: WPMediaSize;
      medium?: WPMediaSize;
      medium_large?: WPMediaSize;
      large?: WPMediaSize;
      full?: WPMediaSize;
    };
  };
}

export interface WPMediaSize {
  file: string;
  width: number;
  height: number;
  mime_type: string;
  source_url: string;
}

export interface WPPost {
  id: number;
  date: string;
  date_gmt: string;
  modified: string;
  modified_gmt: string;
  slug: string;
  status: string;
  type: string;
  link: string;
  title: WPRenderedContent;
  content: WPRenderedContent;
  excerpt: WPRenderedContent;
  author: number;
  featured_media: number;
  categories: number[];
  tags: number[];
  _embedded?: {
    'wp:featuredmedia'?: WPFeaturedMedia[];
    'wp:term'?: WPCategory[][];
    author?: WPAuthor[];
  };
}

export interface WPPage {
  id: number;
  date: string;
  slug: string;
  status: string;
  title: WPRenderedContent;
  content: WPRenderedContent;
  excerpt: WPRenderedContent;
  featured_media: number;
  _embedded?: {
    'wp:featuredmedia'?: WPFeaturedMedia[];
  };
}

export interface WPMedia {
  id: number;
  date: string;
  slug: string;
  title: WPRenderedContent;
  caption: WPRenderedContent;
  alt_text: string;
  source_url: string;
  media_details: {
    width: number;
    height: number;
    sizes: {
      thumbnail?: WPMediaSize;
      medium?: WPMediaSize;
      large?: WPMediaSize;
      full?: WPMediaSize;
    };
  };
}

export interface WPCategory {
  id: number;
  name: string;
  slug: string;
  description: string;
  count: number;
  parent: number;
}

export interface WPTag {
  id: number;
  name: string;
  slug: string;
  count: number;
}

export interface WPAuthor {
  id: number;
  name: string;
  slug: string;
  avatar_urls: {
    '24': string;
    '48': string;
    '96': string;
  };
}

export interface WPPaginatedResponse<T> {
  data: T[];
  totalPages: number;
  totalItems: number;
}

export interface WPQueryParams {
  page?: number;
  per_page?: number;
  search?: string;
  categories?: number[];
  tags?: number[];
  slug?: string;
  orderby?: string;
  order?: 'asc' | 'desc';
  _embed?: boolean;
}
