'use client';

import { useMemo, useState } from 'react';
import Image from 'next/image';
import { X } from 'lucide-react';

type GalleryItem = {
  cat: string;
  title: string;
  desc: string;
  img: string;
  span?: 'wide' | 'tall' | 'normal';
};

type GalleryGridProps = {
  items: GalleryItem[];
};

const filters = ['All', 'Villas', 'Elevations', 'Plans', 'Interiors'];

export default function GalleryGrid({ items }: GalleryGridProps) {
  const [active, setActive] = useState('All');
  const [selected, setSelected] = useState<GalleryItem | null>(null);

  const filtered = useMemo(() => {
    if (active === 'All') return items;
    return items.filter((item) => item.cat === active);
  }, [active, items]);

  return (
    <div>
      <div className="mb-8 grid grid-cols-2 gap-2 md:flex md:flex-wrap">
        {filters.map((filter) => (
          <button
            key={filter}
            type="button"
            onClick={() => setActive(filter)}
            className={`border px-4 py-3 text-[0.68rem] font-black uppercase tracking-[0.18em] transition ${
              active === filter ? 'border-[var(--ink)] bg-[var(--ink)] text-white' : 'border-[var(--line)] bg-[var(--white)] text-[var(--ink)]'
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      <div className="grid auto-rows-[190px] grid-cols-2 gap-3 md:grid-cols-4 lg:grid-cols-6">
        {filtered.map((item, index) => (
          <button
            key={`${item.img}-${index}`}
            type="button"
            onClick={() => setSelected(item)}
            className={`image-box group text-left ${
              item.span === 'wide'
                ? 'col-span-2 row-span-1'
                : item.span === 'tall'
                  ? 'row-span-2'
                  : index % 7 === 0
                    ? 'col-span-2 row-span-2'
                    : ''
            }`}
          >
            <Image src={item.img} alt={item.title} fill sizes="(max-width: 768px) 50vw, 18vw" className="object-cover transition duration-500 group-hover:scale-105" unoptimized />
            <div className="absolute bottom-0 left-0 right-0 z-10 bg-black/58 p-3 text-white">
              <p className="text-[0.56rem] font-black uppercase tracking-[0.18em] text-[var(--safety)]">{item.cat}</p>
              <h3 className="mt-1 line-clamp-1 text-sm font-black uppercase tracking-[-0.02em]">{item.title}</h3>
            </div>
          </button>
        ))}
      </div>

      {selected ? (
        <div className="fixed inset-0 z-[80] grid place-items-center bg-black/88 p-3" onClick={() => setSelected(null)}>
          <button
            type="button"
            className="absolute right-4 top-4 grid h-11 w-11 place-items-center border border-white/24 bg-black text-white"
            onClick={() => setSelected(null)}
            aria-label="Close image preview"
          >
            <X className="h-5 w-5" />
          </button>
          <div className="grid max-h-[88vh] w-full max-w-6xl grid-rows-[1fr_auto] border border-white/20 bg-[var(--paper)]" onClick={(event) => event.stopPropagation()}>
            <div className="relative min-h-[60vh]">
              <Image src={selected.img} alt={selected.title} fill sizes="90vw" className="object-contain" unoptimized />
            </div>
            <div className="border-t border-[var(--line)] p-5">
              <p className="eyebrow">{selected.cat}</p>
              <h2 className="mt-2 text-2xl font-black uppercase tracking-[-0.04em]">{selected.title}</h2>
              <p className="mt-2 max-w-3xl text-sm text-black/65">{selected.desc}</p>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
