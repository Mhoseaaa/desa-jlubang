'use client';

import dynamic from 'next/dynamic';
import type { MapMarker, Dusun } from '@/types/content';

// next/dynamic with ssr:false is only allowed inside a Client Component.
const InteractiveMap = dynamic(() => import('./TourismMap'), {
  ssr: false,
  loading: () => (
    <div
      className="rounded-2xl flex items-center justify-center"
      style={{ height: '70vh', backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)' }}
    >
      <div className="text-center">
        <div className="w-10 h-10 border-4 border-primary-500 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
        <p className="text-sm font-medium" style={{ color: 'var(--text-muted)' }}>Memuat peta interaktif...</p>
      </div>
    </div>
  ),
});

interface InteractiveMapLoaderProps {
  markers: MapMarker[];
  dusunList: Dusun[];
}

export default function InteractiveMapLoader({ markers, dusunList }: InteractiveMapLoaderProps) {
  return <InteractiveMap markers={markers} dusunList={dusunList} />;
}
