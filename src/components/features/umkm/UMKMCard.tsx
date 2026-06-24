import Image from 'next/image';
import Link from 'next/link';
import type { UMKMItem } from '@/types/content';
import Badge from '@/components/ui/Badge';

interface UMKMCardProps { item: UMKMItem; }

export default function UMKMCard({ item }: UMKMCardProps) {
  return (
    <Link href={`/umkm/${item.slug}`} className="group block rounded-2xl overflow-hidden card-hover" style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-color)' }} id={`umkm-card-${item.id}`}>
      <div className="relative aspect-[4/3] overflow-hidden img-hover-zoom">
        <Image src={item.imageUrl} alt={item.name} fill className="object-cover" sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" />
        <div className="absolute top-3 left-3 flex gap-1.5">
          <Badge variant="secondary" size="sm">{item.category}</Badge>
        </div>
      </div>
      <div className="p-5">
        <h3 className="text-lg font-bold mb-1 group-hover:text-primary-500 transition-colors" style={{ color: 'var(--text-primary)' }}>{item.name}</h3>
        <p className="text-xs font-medium mb-2 text-primary-500">{item.dusunName} · {item.owner}</p>
        <p className="text-sm line-clamp-2 mb-3 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{item.description}</p>
        <div className="flex flex-wrap gap-1.5 mb-3">
          {item.products.slice(0, 3).map((p) => (<span key={p} className="px-2 py-0.5 rounded-md text-[10px] font-medium" style={{ backgroundColor: 'var(--bg-secondary)', color: 'var(--text-secondary)' }}>{p}</span>))}
          {item.products.length > 3 && <span className="px-2 py-0.5 text-[10px]" style={{ color: 'var(--text-muted)' }}>+{item.products.length - 3}</span>}
        </div>
        <div className="flex items-center gap-2 pt-3" style={{ borderTop: '1px solid var(--border-color)' }}>
          <svg className="w-3.5 h-3.5 text-primary-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
          <span className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>{item.phone}</span>
        </div>
      </div>
    </Link>
  );
}
