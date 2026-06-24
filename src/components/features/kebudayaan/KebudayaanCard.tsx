import Image from 'next/image';
import Link from 'next/link';
import Badge from '@/components/ui/Badge';
import type { KebudayaanItem } from '@/types/content';
import { KEBUDAYAAN_CATEGORIES } from '@/types/content';

interface KebudayaanCardProps {
  item: KebudayaanItem;
}

export default function KebudayaanCard({ item }: KebudayaanCardProps) {
  return (
    <Link
      href={`/kebudayaan/${item.slug}`}
      className="group block rounded-2xl overflow-hidden card-hover"
      style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-color)' }}
      id={`kebudayaan-card-${item.id}`}
    >
      <div className="relative aspect-[16/10] overflow-hidden img-hover-zoom">
        <Image src={item.imageUrl} alt={item.title} fill className="object-cover" sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" />
        <div className="absolute top-3 left-3 flex gap-1.5">
          <Badge variant="primary" size="sm">{KEBUDAYAAN_CATEGORIES[item.category]}</Badge>
        </div>
      </div>
      <div className="p-5">
        <h3 className="text-base font-bold mb-1 group-hover:text-primary-500 transition-colors" style={{ color: 'var(--text-primary)' }}>{item.title}</h3>
        <p className="text-xs font-medium mb-2 text-primary-500">{item.dusunName}</p>
        <p className="text-sm line-clamp-3 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{item.description}</p>
      </div>
    </Link>
  );
}
