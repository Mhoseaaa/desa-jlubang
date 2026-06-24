import Image from 'next/image';
import Link from 'next/link';
import type { Dusun } from '@/types/content';

interface DusunCardProps {
  dusun: Dusun;
}

export default function DusunCard({ dusun }: DusunCardProps) {
  return (
    <Link
      href={`/dusun/${dusun.slug}`}
      className="group block rounded-2xl overflow-hidden card-hover"
      style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-color)' }}
      id={`dusun-card-${dusun.slug}`}
    >
      <div className="relative aspect-[16/10] overflow-hidden img-hover-zoom">
        <Image src={dusun.imageUrl} alt={dusun.name} fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        <div className="absolute bottom-4 left-4 right-4">
          <h3 className="text-xl font-bold text-white mb-1">{dusun.name}</h3>
          <p className="text-white/80 text-xs">Kadus: {dusun.headName}</p>
        </div>
      </div>
      <div className="p-5">
        <p className="text-sm line-clamp-2 mb-4 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{dusun.description}</p>
        <div className="grid grid-cols-3 gap-3 mb-4">
          {[{ label: 'Penduduk', value: dusun.population.toLocaleString('id-ID') }, { label: 'Luas', value: dusun.area }, { label: 'RT/RW', value: `${dusun.rt}/${dusun.rw}` }].map((s) => (
            <div key={s.label} className="text-center p-2 rounded-lg" style={{ backgroundColor: 'var(--bg-secondary)' }}>
              <div className="text-sm font-bold" style={{ color: 'var(--text-primary)' }}>{s.value}</div>
              <div className="text-[10px]" style={{ color: 'var(--text-muted)' }}>{s.label}</div>
            </div>
          ))}
        </div>
        <div className="flex items-center gap-1 text-primary-500 text-sm font-semibold">
          <span>Lihat Detail</span>
          <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
        </div>
      </div>
    </Link>
  );
}
