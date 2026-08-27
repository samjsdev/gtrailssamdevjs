'use client';

import { useState } from 'react';
import { X } from 'lucide-react';

export type GalleryItem = {
  img: string;
  title: string;
  cat: string;
  sub: string;
};

export default function GalleryGrid({ items }: { items: GalleryItem[] }) {
  const [filter, setFilter] = useState<string>('All');
  const [active, setActive] = useState<GalleryItem | null>(null);

  const cats = ['All', ...Array.from(new Set(items.map((i) => i.cat)))];
  const visible = filter === 'All' ? items : items.filter((i) => i.cat === filter);

  return (
    <>
      {/* Filter pills */}
      <div className="flex flex-wrap gap-2.5 mb-9">
        {cats.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-5 py-2.5 rounded-full text-[13.5px] font-bold transition-all duration-200 border-[1.5px] ${
              filter === cat
                ? 'bg-[#d8442c] border-[#d8442c] text-white'
                : 'bg-white border-[#241f1a]/12 text-[#6d6259] hover:border-[#d8442c] hover:text-[#d8442c]'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5.5">
        {visible.map((item, idx) => (
          <button
            key={`${item.img}-${idx}`}
            onClick={() => setActive(item)}
            className="group relative block rounded-[18px] overflow-hidden aspect-[4/3.3] text-left focus:outline-none"
          >
            <img
              src={item.img}
              alt={item.title}
              loading="lazy"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.07]"
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_40%,rgba(29,23,19,0.9))]" />
            <span className="absolute top-3.5 left-3.5 z-[2] bg-white text-[#241f1a] text-[11px] font-extrabold px-3.5 py-1.5 rounded-full">
              {item.cat}
            </span>
            <div className="absolute bottom-0 left-0 right-0 p-5 z-[2] text-white">
              <b className="text-[17px] block tracking-[-0.01em]">{item.title}</b>
              <span className="text-[12.5px] text-white/80">{item.sub}</span>
            </div>
          </button>
        ))}
      </div>

      {/* Lightbox */}
      {active && (
        <div
          className="fixed inset-0 z-[400] bg-[#1d1713]/95 flex items-center justify-center p-6"
          onClick={() => setActive(null)}
        >
          <button
            aria-label="Close preview"
            className="absolute top-6 right-6 w-11 h-11 rounded-full grid place-items-center border border-white/30 text-white hover:border-[#f4b942] hover:text-[#f4b942] transition-colors"
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
