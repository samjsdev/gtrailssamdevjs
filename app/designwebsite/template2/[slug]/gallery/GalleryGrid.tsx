'use client';

import { useState } from 'react';
import { X } from 'lucide-react';

export type GalleryItem = {
  img: string;
  title: string;
  cat: string;
};

export default function GalleryGrid({ items }: { items: GalleryItem[] }) {
  const [filter, setFilter] = useState<string>('All');
  const [active, setActive] = useState<GalleryItem | null>(null);

  const cats = ['All', ...Array.from(new Set(items.map((i) => i.cat)))];
  const visible = filter === 'All' ? items : items.filter((i) => i.cat === filter);

  return (
    <>
      {/* Filter pills */}
      <div className="flex flex-wrap gap-2.5 justify-center mb-10">
        {cats.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-5 py-2.5 rounded-full text-[13px] font-bold transition-all duration-300 border-[1.5px] ${
              filter === cat
                ? 'bg-[#0e5a43] border-[#0e5a43] text-white'
                : 'bg-white border-[#1b1b1b]/10 text-[#6b6660] hover:border-[#0e5a43] hover:text-[#0e5a43]'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {visible.map((item, idx) => (
          <button
            key={`${item.img}-${idx}`}
            onClick={() => setActive(item)}
            className="group text-left border border-[#1b1b1b]/10 rounded-[22px] overflow-hidden bg-white transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_24px_60px_rgba(27,27,27,0.12)] focus:outline-none"
          >
            <div className="relative aspect-[16/11] overflow-hidden">
              <span className="absolute top-3.5 left-3.5 z-10 bg-white/95 rounded-full px-3.5 py-1.5 text-[11px] font-extrabold tracking-[0.1em] uppercase text-[#0e5a43]">
                {item.cat}
              </span>
              <img
                src={item.img}
                alt={item.title}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-800 ease-[cubic-bezier(.19,1,.22,1)] group-hover:scale-[1.06]"
              />
            </div>
            <div className="px-5.5 py-4.5">
              <h3 className="font-bold text-[16px]">{item.title}</h3>
              <span className="text-[12.5px] text-[#6b6660] font-semibold">Tap to view full size</span>
            </div>
          </button>
        ))}
      </div>

      {/* Lightbox */}
      {active && (
        <div
          className="fixed inset-0 z-[100] bg-[#1b1b1b]/95 flex items-center justify-center p-6"
          onClick={() => setActive(null)}
        >
          <button
            aria-label="Close preview"
            className="absolute top-6 right-6 w-11 h-11 rounded-full grid place-items-center border border-white/30 text-white hover:border-[#f2a007] hover:text-[#f2a007] transition-colors"
            onClick={() => setActive(null)}
          >
            <X className="w-5 h-5" />
          </button>
          <figure className="max-w-5xl w-full" onClick={(e) => e.stopPropagation()}>
            <img src={active.img} alt={active.title} className="w-full max-h-[78vh] object-contain rounded-2xl" />
            <figcaption className="text-center mt-4 text-white/70 text-[13px] font-bold uppercase tracking-[0.12em]">
              {active.cat} — {active.title}
            </figcaption>
          </figure>
        </div>
      )}
    </>
  );
}
