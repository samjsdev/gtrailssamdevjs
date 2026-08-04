'use client';

import { useState } from 'react';
import { X } from 'lucide-react';

export type GalleryItem = {
  img: string;
  title: string;
  cat: string;
};

export default function GalleryGrid({ items }: { items: GalleryItem[] }) {
  const [active, setActive] = useState<GalleryItem | null>(null);

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {items.map((item, idx) => (
          <button
            key={idx}
            onClick={() => setActive(item)}
            className={`group relative overflow-hidden text-left text-white focus:outline-none ${
              idx % 5 === 0 ? 'aspect-[4/4.6]' : 'aspect-[4/3.2]'
            }`}
          >
            <img
              src={item.img}
              alt={item.title}
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 ease-[cubic-bezier(.19,1,.22,1)] group-hover:scale-[1.06]"
            />
            <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(24,18,12,0.8)_0%,transparent_45%)] opacity-90 transition-opacity duration-400" />
            <div className="absolute bottom-0 left-0 right-0 z-10 flex justify-between items-end px-6 py-5">
              <div>
                <span className="text-[10.5px] tracking-[0.24em] uppercase text-[#c9ab7c]">{item.cat}</span>
                <b className="font-normal text-[18px] block">{item.title}</b>
              </div>
              <span className="text-[14px] text-white/55">/ {String(idx + 1).padStart(2, '0')}</span>
            </div>
          </button>
        ))}
      </div>

      {/* Lightbox */}
      {active && (
        <div
          className="fixed inset-0 z-[100] bg-[#17130f]/95 flex items-center justify-center p-6"
          onClick={() => setActive(null)}
        >
          <button
            aria-label="Close preview"
            className="absolute top-6 right-6 w-11 h-11 grid place-items-center border border-white/30 text-white hover:border-[#c9ab7c] hover:text-[#c9ab7c] transition-colors"
            onClick={() => setActive(null)}
          >
            <X className="w-5 h-5" />
          </button>
          <figure className="max-w-5xl w-full" onClick={(e) => e.stopPropagation()}>
            <img src={active.img} alt={active.title} className="w-full max-h-[78vh] object-contain" />
            <figcaption className="text-center mt-4 text-white/70 text-[13px] tracking-[0.14em] uppercase">
              {active.cat} — {active.title}
            </figcaption>
          </figure>
        </div>
      )}
    </>
  );
}
