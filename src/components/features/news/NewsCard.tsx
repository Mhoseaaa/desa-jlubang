import Image from 'next/image';
import Link from 'next/link';
import Badge from '@/components/ui/Badge';
import type { NewsArticle } from '@/types/content';
import { formatDate } from '@/lib/utils';

interface NewsCardProps {
  article: NewsArticle;
}

export default function NewsCard({ article }: NewsCardProps) {
  return (
    <Link
      href={`/berita/${article.slug}`}
      className="group block rounded-2xl overflow-hidden card-hover"
      style={{
        backgroundColor: 'var(--bg-card)',
        border: '1px solid var(--border-color)',
      }}
      id={`news-card-${article.id}`}
    >
      {/* Image */}
      <div className="relative aspect-[16/10] overflow-hidden img-hover-zoom">
        <Image
          src={article.imageUrl}
          alt={article.imageAlt}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute top-3 left-3">
          <Badge variant="primary" size="sm">{article.category}</Badge>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="flex items-center gap-2 mb-2">
          <svg className="w-3.5 h-3.5 text-primary-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
            <line x1="16" y1="2" x2="16" y2="6" />
            <line x1="8" y1="2" x2="8" y2="6" />
            <line x1="3" y1="10" x2="21" y2="10" />
          </svg>
          <time
            dateTime={article.date}
            className="text-xs font-medium"
            style={{ color: 'var(--text-muted)' }}
          >
            {formatDate(article.date)}
          </time>
        </div>

        <h3
          className="text-base font-bold mb-2 line-clamp-2 group-hover:text-primary-500 transition-colors duration-200"
          style={{ color: 'var(--text-primary)' }}
        >
          {article.title}
        </h3>

        <p
          className="text-sm line-clamp-2 leading-relaxed"
          style={{ color: 'var(--text-secondary)' }}
        >
          {article.excerpt}
        </p>

        <div className="mt-4 flex items-center gap-1 text-primary-500 text-sm font-semibold">
          <span>Baca Selengkapnya</span>
          <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </div>
      </div>
    </Link>
  );
}
