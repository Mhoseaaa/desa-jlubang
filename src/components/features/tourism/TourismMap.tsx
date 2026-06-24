'use client';

import { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { MAP_CONFIG, MAP_CATEGORY_COLORS, MAP_CATEGORY_LABELS } from '@/lib/constants';
import type { MapMarker } from '@/types/content';
import type { Dusun } from '@/types/content';
import 'leaflet/dist/leaflet.css';

// Fix Leaflet icons
delete (L.Icon.Default.prototype as unknown as Record<string, unknown>)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

function createIcon(category: string) {
  const color = MAP_CATEGORY_COLORS[category] || '#10b981';
  const symbols: Record<string, string> = { dusun: '🏘', wisata: '★', umkm: '◆' };
  return L.divIcon({
    className: 'custom-marker',
    html: `<div style="width:30px;height:30px;border-radius:50% 50% 50% 0;background:${color};transform:rotate(-45deg);border:3px solid white;box-shadow:0 2px 8px rgba(0,0,0,.3);display:flex;align-items:center;justify-content:center"><div style="transform:rotate(45deg);font-size:12px">${symbols[category] || '●'}</div></div>`,
    iconSize: [30, 30], iconAnchor: [15, 30], popupAnchor: [0, -30],
  });
}

interface InteractiveMapProps {
  markers: MapMarker[];
  dusunList: Dusun[];
  className?: string;
}

export default function InteractiveMap({ markers, dusunList, className = '' }: InteractiveMapProps) {
  const [activeCategories, setActiveCategories] = useState<Set<string>>(new Set(Object.keys(MAP_CATEGORY_COLORS)));
  const [activeDusun, setActiveDusun] = useState<string | null>(null);

  const toggleCategory = (cat: string) => {
    setActiveCategories((prev) => {
      const n = new Set(prev);
      if (n.has(cat)) n.delete(cat); else n.add(cat);
      return n;
    });
  };

  const filtered = markers.filter((m) => {
    if (!activeCategories.has(m.category)) return false;
    if (activeDusun && m.dusunSlug !== activeDusun && m.category !== 'dusun') return false;
    return true;
  });

  return (
    <div className={className}>
      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-4">
        {/* Category Filter */}
        <div className="p-4 rounded-xl flex-1" style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-color)' }} id="map-filter-category">
          <h3 className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color: 'var(--text-muted)' }}>Kategori</h3>
          <div className="flex flex-wrap gap-2">
            {Object.entries(MAP_CATEGORY_LABELS).map(([key, label]) => (
              <button key={key} onClick={() => toggleCategory(key)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${activeCategories.has(key) ? 'opacity-100' : 'opacity-40'}`}
                style={{ backgroundColor: activeCategories.has(key) ? `${MAP_CATEGORY_COLORS[key]}15` : 'var(--bg-secondary)', color: activeCategories.has(key) ? MAP_CATEGORY_COLORS[key] : 'var(--text-muted)', border: `1px solid ${activeCategories.has(key) ? MAP_CATEGORY_COLORS[key] : 'var(--border-color)'}` }}>
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: MAP_CATEGORY_COLORS[key] }} />
                {label}
              </button>
            ))}
          </div>
        </div>
        {/* Dusun Filter */}
        <div className="p-4 rounded-xl flex-1" style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-color)' }} id="map-filter-dusun">
          <h3 className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color: 'var(--text-muted)' }}>Dusun</h3>
          <div className="flex flex-wrap gap-2">
            <button onClick={() => setActiveDusun(null)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${!activeDusun ? 'bg-primary-500 text-white' : ''}`}
              style={activeDusun ? { backgroundColor: 'var(--bg-secondary)', color: 'var(--text-secondary)', border: '1px solid var(--border-color)' } : undefined}>
              Semua
            </button>
            {dusunList.map((d) => (
              <button key={d.slug} onClick={() => setActiveDusun(activeDusun === d.slug ? null : d.slug)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${activeDusun === d.slug ? 'bg-primary-500 text-white' : ''}`}
                style={activeDusun !== d.slug ? { backgroundColor: 'var(--bg-secondary)', color: 'var(--text-secondary)', border: '1px solid var(--border-color)' } : undefined}>
                {d.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Map */}
      <div className="rounded-2xl overflow-hidden shadow-xl" style={{ border: '1px solid var(--border-color)' }}>
        <MapContainer center={MAP_CONFIG.center} zoom={MAP_CONFIG.zoom} minZoom={MAP_CONFIG.minZoom} maxZoom={MAP_CONFIG.maxZoom} style={{ height: '65vh', width: '100%' }} className="z-0">
          <TileLayer attribution={MAP_CONFIG.tileAttribution} url={MAP_CONFIG.tileUrl} />
          {filtered.map((marker) => (
            <Marker key={marker.id} position={[marker.latitude, marker.longitude]} icon={createIcon(marker.category)}>
              <Popup>
                <div className="p-2 min-w-[200px]">
                  {marker.imageUrl && <div className="w-full h-28 rounded-lg overflow-hidden mb-2"><img src={marker.imageUrl} alt={marker.name} className="w-full h-full object-cover" /></div>}
                  <h3 className="text-sm font-bold mb-0.5" style={{ color: '#0f172a' }}>{marker.name}</h3>
                  {marker.dusunName && <p className="text-[10px] font-medium mb-1" style={{ color: '#10b981' }}>{marker.dusunName}</p>}
                  <p className="text-xs mb-2" style={{ color: '#64748b' }}>{marker.description}</p>
                  {marker.googleMapsUrl && (
                    <a href={marker.googleMapsUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-xs font-semibold" style={{ color: '#059669' }}>
                      <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                      Buka Google Maps
                    </a>
                  )}
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3 mt-4">
        {Object.entries(MAP_CATEGORY_LABELS).map(([key, label]) => (
          <div key={key} className="p-3 rounded-xl text-center" style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-color)' }}>
            <div className="text-xl font-bold" style={{ color: MAP_CATEGORY_COLORS[key] }}>{filtered.filter((m) => m.category === key).length}</div>
            <div className="text-xs" style={{ color: 'var(--text-muted)' }}>{label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
