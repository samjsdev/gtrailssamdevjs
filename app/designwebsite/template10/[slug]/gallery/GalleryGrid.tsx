'use client';

import { useState } from 'react';
import { Camera, ArrowUpRight } from 'lucide-react';
import { Archivo_Black } from 'next/font/google';

const archivo = Archivo_Black({
  subsets: ['latin'],
  weight: ['400'],
  display: 'swap',
});

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

const FILTERS = ['All', 'Residential', 'Commercial', 'Studio & Process'];

export default function GalleryGrid({ items }: GalleryGridProps) {
  const [active, setActive] = useState('All');

  const filtered = active === 'All' ? items : items.filter(i => i.cat === active);

  return (
    <div className="space-y-12">
      {/* Filter Buttons */}
      <div className="flex justify-center gap-3 flex-wrap">
        {FILTERS.map((cat) => (
          <button
            key={cat}
            onClick={() => setActive(cat)}
            className={`px-6 py-3 rounded-none text-[10px] font-bold uppercase tracking-widest transition-all border ${
              active === cat
                ? 'bg-[#E07A5F] text-white border-[#E07A5F] shadow-lg font-bold'
                : 'bg-[#141517] text-slate-400 border-white/10 hover:border-white/20 hover:text-white'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Bento Grid */}
      <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
        {filtered.map((item, i) => (
          <div
            key={`${active}-${i}`}
            className="break-inside-avoid group flex flex-col h-full bg-[#141517] p-4 border border-white/10 hover:border-[#E07A5F] transition-all duration-500"
            style={{
              animationDelay: `${i * 60}ms`,
            }}
          >
            <div
              className={`relative overflow-hidden w-full mb-4 bg-slate-950 ${
                item.span === 'tall'
                  ? 'aspect-[3/4]'
                  : item.span === 'wide'
                  ? 'aspect-[16/9]'
                  : i % 5 === 0
                  ? 'aspect-[3/4]'
                  : i % 3 === 1
                  ? 'aspect-square'
                  : 'aspect-[4/3]'
              }`}
            >
              {/* Grayscale hover transition */}
              <img
                src={item.img}
                alt={item.title}
                className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-102 transition-all duration-700 ease-out"
              />

              {/* Rusty Orange overlay on hover */}
              <div className="absolute inset-0 bg-black/40 group-hover:bg-[#E07A5F]/10 transition-colors z-10" />

              {/* View tag button overlay */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-20">
                <span className="flex flex-col items-center justify-center bg-[#E07A5F] text-white w-14 h-14 rounded-none shadow-lg transform group-hover:scale-110 transition-all font-bold">
                  <Camera className="w-4 h-4 mb-1" />
                  <span className="text-[8px] uppercase tracking-wider">VIEW</span>
                </span>
              </div>
            </div>

            {/* Static labels below */}
            <div className="px-2 py-1 space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-[9px] font-bold text-[#E07A5F] uppercase tracking-widest bg-white/5 border border-white/10 px-2 py-0.5">
                  {item.cat}
                </span>
                <span className="text-[9px] font-mono text-slate-500">#{i + 1 < 10 ? `0${i + 1}` : i + 1}</span>
              </div>
              <h4 className={`${archivo.className} text-base text-white uppercase leading-tight`}>
                {item.title}
              </h4>
              <p className="text-slate-400 text-xs font-light leading-relaxed">
                {item.desc}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filtered.length === 0 && (
        <div className="text-center py-24 text-slate-500 font-light text-sm uppercase tracking-widest">
          No projects found in this category.
        </div>
      )}
    </div>
  );
}
