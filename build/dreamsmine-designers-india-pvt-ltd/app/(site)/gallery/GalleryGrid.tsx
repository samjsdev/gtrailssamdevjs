'use client';

import { useMemo, useState, useEffect } from 'react';
import Image from 'next/image';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

type GalleryItem = {
  cat: string;
  title: string;
  desc: string;
  img: string;
};

type GalleryGridProps = {
  items: GalleryItem[];
};

const filters = ['All', 'Villas', 'Elevations', 'Plans', 'Interiors'];

export default function GalleryGrid({ items }: GalleryGridProps) {
  const [active, setActive] = useState('All');
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const filteredItems = useMemo(() => {
    if (active === 'All') return items;
    return items.filter((item) => item.cat === active);
  }, [active, items]);

  const categories = useMemo(() => {
    if (active !== 'All') return [{ name: active, items: filteredItems }];
    return filters.filter(f => f !== 'All').map(cat => ({
      name: cat,
      items: items.filter(item => item.cat === cat)
    })).filter(cat => cat.items.length > 0);
  }, [active, items, filteredItems]);

  const selectedItem = selectedIndex !== null ? filteredItems[selectedIndex] : null;

  // Handle keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedIndex === null) return;
      if (e.key === 'Escape') setSelectedIndex(null);
      if (e.key === 'ArrowLeft') setSelectedIndex((prev) => (prev !== null && prev > 0 ? prev - 1 : filteredItems.length - 1));
      if (e.key === 'ArrowRight') setSelectedIndex((prev) => (prev !== null && prev < filteredItems.length - 1 ? prev + 1 : 0));
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedIndex, filteredItems.length]);

  const renderGrid = (gridItems: GalleryItem[]) => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {gridItems.map((item) => {
        // Find index in the currently active filteredItems array for lightbox navigation
        const globalIndex = filteredItems.findIndex(fi => fi.img === item.img);
        
        return (
          <button
            key={item.img}
            type="button"
            onClick={() => setSelectedIndex(globalIndex)}
            className="group relative overflow-hidden aspect-[4/3] w-full text-left bg-[var(--white)] border border-[var(--line-strong)] hover:border-[var(--ink)] transition-colors"
          >
            <Image src={item.img} alt={item.title} fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" className="object-cover transition duration-500 group-hover:scale-105" unoptimized />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors z-0" />
            <div className="absolute bottom-0 left-0 right-0 z-10 bg-gradient-to-t from-black/80 to-transparent p-5 text-white opacity-0 group-hover:opacity-100 transition-opacity translate-y-2 group-hover:translate-y-0">
              <p className="text-[0.6rem] font-black uppercase tracking-[0.2em] text-[var(--safety)]">{item.cat}</p>
              <h3 className="mt-2 line-clamp-1 text-sm font-black uppercase tracking-[-0.02em]">{item.title}</h3>
            </div>
          </button>
        );
      })}
    </div>
  );

  return (
    <div>
      <div className="mb-10 flex flex-wrap gap-3 border-b border-[var(--line)] pb-8">
        {filters.map((filter) => (
          <button
            key={filter}
            type="button"
            onClick={() => setActive(filter)}
            className={`px-6 py-3 text-[0.68rem] font-black uppercase tracking-[0.18em] transition rounded-full ${
              active === filter 
                ? 'bg-[var(--ink)] text-white shadow-md' 
                : 'bg-[var(--paper)] text-black/60 hover:bg-[var(--line-strong)] hover:text-black border border-[var(--line)]'
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      <div className="space-y-16">
        {categories.map((category) => (
          <div key={category.name}>
            {active === 'All' && (
              <h2 className="text-3xl font-black uppercase tracking-[-0.04em] mb-6 text-[var(--ink)] border-l-4 border-[var(--safety)] pl-4">
                {category.name}
              </h2>
            )}
            {renderGrid(category.items)}
          </div>
        ))}
      </div>

      {selectedItem ? (
        <div className="fixed inset-0 z-[100] grid place-items-center bg-black/95 backdrop-blur-sm p-4 md:p-8" onClick={() => setSelectedIndex(null)}>
          <button
            type="button"
            className="absolute right-4 top-4 md:right-8 md:top-8 grid h-12 w-12 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20 transition z-10"
            onClick={(e) => { e.stopPropagation(); setSelectedIndex(null); }}
            aria-label="Close image preview"
          >
            <X className="h-6 w-6" />
          </button>

          <button 
            className="absolute left-4 top-1/2 -translate-y-1/2 grid h-14 w-14 place-items-center rounded-full bg-white/5 border border-white/10 text-white hover:bg-white/20 transition z-10 hidden md:grid"
            onClick={(e) => { e.stopPropagation(); setSelectedIndex(prev => prev !== null && prev > 0 ? prev - 1 : filteredItems.length - 1); }}
            aria-label="Previous image"
          >
             <ChevronLeft className="h-8 w-8" />
          </button>

          <button 
            className="absolute right-4 top-1/2 -translate-y-1/2 grid h-14 w-14 place-items-center rounded-full bg-white/5 border border-white/10 text-white hover:bg-white/20 transition z-10 hidden md:grid"
            onClick={(e) => { e.stopPropagation(); setSelectedIndex(prev => prev !== null && prev < filteredItems.length - 1 ? prev + 1 : 0); }}
            aria-label="Next image"
          >
             <ChevronRight className="h-8 w-8" />
          </button>

          <div className="relative w-full h-full max-h-[85vh] flex flex-col items-center justify-center" onClick={(e) => e.stopPropagation()}>
            <div className="relative w-full h-[70vh] md:h-[80vh]">
              <Image src={selectedItem.img} alt={selectedItem.title} fill sizes="100vw" className="object-contain" unoptimized priority />
            </div>
            <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black via-black/80 to-transparent pt-12 pb-6 px-6 text-center pointer-events-none">
              <p className="text-xs font-black uppercase tracking-[0.2em] text-[var(--safety)] mb-2">{selectedItem.cat}</p>
              <h2 className="text-2xl md:text-3xl font-black uppercase tracking-[-0.04em] text-white">{selectedItem.title}</h2>
              <p className="mt-2 max-w-3xl mx-auto text-sm font-medium leading-relaxed text-white/70 hidden md:block">{selectedItem.desc}</p>
              <p className="mt-4 text-xs font-bold text-white/40">{selectedIndex !== null ? selectedIndex + 1 : 0} of {filteredItems.length}</p>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
