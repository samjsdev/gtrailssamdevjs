'use client';

import { useState } from 'react';
import { X } from 'lucide-react';

export type GalleryItem = {
  img: string;
  title: string;
  sub: string;
};

export default function GalleryGrid({ items }: { items: GalleryItem[] }) {
  const [active, setActive] = useState<GalleryItem | null>(null);

  return (
    <>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-[22px]">
        {items.map((item, idx) => (
          <button
            key={`${item.img}-${idx}`}
            onClick={() => setActive(item)}
            className="group relative block overflow-hidden aspect-[4/4.2] text-left focus:outline-none"
          >
            <img
              src={item.img}
              alt={item.title}
              loading="lazy"
              className="w-full h-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.07]"
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(23,19,15,0.05)_40%,rgba(23,19,15,0.85))]" />
            <span className="absolute top-5 right-6 z-[2] font-[family-name:var(--font-cormorant)] italic text-[52px] leading-none text-white/50">
              {String(idx + 1).padStart(2, '0')}
            </span>
            <div className="absolute bottom-0 left-0 right-0 p-7 z-[2] text-white">
              <b className="font-[family-name:var(--font-cormorant)] text-[26px] font-semibold block leading-tight">{item.title}</b>
              <span className="text-[13px] text-white/75 font-light">{item.sub}</span>
            </div>
          </button>
        ))}
      </div>

      {active && (
        <div
          className="fixed inset-0 z-[400] bg-[#17130f]/95 flex items-center justify-center p-6"
          onClick={() => setActive(null)}
        >
          <button
            aria-label="Close preview"
            className="absolute top-6 right-6 w-11 h-11 rounded-full grid place-items-center border border-white/30 text-white hover:border-[#b08d4f] hover:text-[#d9c49a] transition-colors"
            onClick={() => setActive(null)}
          >
            <X className="w-5 h-5" />
          </button>
          <figure className="max-w-5xl w-full" onClick={(e) => e.stopPropagation()}>
            <img src={active.img} alt={active.title} className="w-full max-h-[78vh] object-contain" />
            <figcaption className="text-center mt-4 text-white/70 font-[family-name:var(--font-cormorant)] italic text-[19px]">
              {active.title} — {active.sub}
            </figcaption>
          </figure>
        </div>
      )}
    </>
  );
}
