'use client';

import Image from 'next/image';
import { useState } from 'react';
import type { GalleryItem } from '@/types/content';

interface GalleryGridProps {
  items: GalleryItem[];
}

export default function GalleryGrid({ items }: GalleryGridProps) {
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);

  return (
    <>
      {/* Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
        {items.map((item, index) => (
          <button
            key={item.id}
            onClick={() => setSelectedItem(item)}
            className="group relative aspect-square rounded-xl overflow-hidden cursor-pointer card-hover"
            style={{
              animationDelay: `${index * 50}ms`,
            }}
            id={`gallery-item-${item.id}`}
          >
            <Image
              src={item.thumbnailUrl || item.imageUrl}
              alt={item.altText}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
              sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
              <p className="text-white text-xs font-medium line-clamp-2">
                {item.title}
              </p>
            </div>
            {/* Zoom Icon */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                  <line x1="11" y1="8" x2="11" y2="14" />
                  <line x1="8" y1="11" x2="14" y2="11" />
                </svg>
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Lightbox Modal */}
      {selectedItem && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setSelectedItem(null)}
          id="gallery-lightbox"
        >
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
          <div
            className="relative max-w-4xl w-full max-h-[85vh] animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedItem(null)}
              className="absolute -top-12 right-0 p-2 text-white/80 hover:text-white transition-colors z-10"
              aria-label="Close lightbox"
            >
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
            <div className="relative w-full h-[70vh] rounded-xl overflow-hidden">
              <Image
                src={selectedItem.imageUrl}
                alt={selectedItem.altText}
                fill
                className="object-contain"
                sizes="100vw"
                priority
              />
            </div>
            {(selectedItem.title || selectedItem.caption) && (
              <div className="mt-3 text-center">
                {selectedItem.title && (
                  <h3 className="text-white text-base font-semibold">{selectedItem.title}</h3>
                )}
                {selectedItem.caption && (
                  <p className="text-white/70 text-sm mt-1">{selectedItem.caption}</p>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
