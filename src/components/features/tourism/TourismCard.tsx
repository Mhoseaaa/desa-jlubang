import Image from 'next/image';
import Link from 'next/link';
import type { WisataItem } from '@/types/content';
import Badge from '@/components/ui/Badge';

interface WisataCardProps { spot: WisataItem; }

export default function WisataCard({ spot }: WisataCardProps) {
  return (
    <Link href={`/wisata/${spot.slug}`} className="group block rounded-2xl overflow-hidden card-hover" style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-color)' }} id={`wisata-card-${spot.id}`}>
      <div className="relative aspect-[16/10] overflow-hidden img-hover-zoom">
        <Image src={spot.imageUrl} alt={spot.name} fill className="object-cover" sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" />
        <div className="absolute top-3 left-3"><Badge variant="success" size="sm">{spot.category}</Badge></div>
        <div className="absolute top-3 right-3 flex items-center gap-1 px-2 py-1 rounded-lg bg-black/50 backdrop-blur-sm">
          <svg className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
          <span className="text-xs font-bold text-white">{spot.rating}</span>
        </div>
      </div>
      <div className="p-5">
        <h3 className="text-lg font-bold mb-1 group-hover:text-primary-500 transition-colors" style={{ color: 'var(--text-primary)' }}>{spot.name}</h3>
        <p className="text-xs font-medium mb-2 text-primary-500">{spot.dusunName}</p>
        <p className="text-sm line-clamp-2 mb-3 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{spot.description}</p>
        <div className="grid grid-cols-2 gap-2 mb-3">
          <div className="flex items-center gap-1.5"><svg className="w-3.5 h-3.5 text-primary-500 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg><span className="text-xs" style={{ color: 'var(--text-muted)' }}>{spot.openHours}</span></div>
          <div className="flex items-center gap-1.5"><svg className="w-3.5 h-3.5 text-primary-500 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg><span className="text-xs font-medium" style={{ color: 'var(--text-muted)' }}>{spot.ticketPrice}</span></div>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {spot.facilities.slice(0, 4).map((f) => (<span key={f} className="px-2 py-0.5 rounded-md text-[10px] font-medium" style={{ backgroundColor: 'var(--bg-secondary)', color: 'var(--text-secondary)' }}>{f}</span>))}
        </div>
      </div>
    </Link>
  );
}
