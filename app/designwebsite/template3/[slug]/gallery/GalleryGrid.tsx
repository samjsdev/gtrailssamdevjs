'use client';

import { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';

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
      {/* Filter Pills */}
      <div className="flex justify-center gap-3 flex-wrap">
        {FILTERS.map((cat) => (
          <button
            key={cat}
            onClick={() => setActive(cat)}
            className={`px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest transition-all duration-300 ${
              active === cat
                ? 'bg-slate-900 text-white shadow-lg shadow-slate-900/20'
                : 'bg-white text-slate-500 border border-slate-200 hover:border-[#B48A66] hover:text-[#B48A66]'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Masonry-style Bento Grid */}
      <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
        {filtered.map((item, i) => (
          <div
            key={`${active}-${i}`}
            className="break-inside-avoid group relative rounded-[2rem] overflow-hidden cursor-pointer border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-[#B48A66]/5 transition-all duration-500"
            style={{
              animationDelay: `${i * 60}ms`,
            }}
          >
            {/* Image */}
            <div
              className={`relative overflow-hidden w-full ${
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
              {/* Gold tint overlay on hover */}
              <div className="absolute inset-0 bg-[#B48A66]/15 mix-blend-multiply opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-10" />

              <img
                src={item.img}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />

              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20" />

              {/* Arrow icon top-right */}
              <div className="absolute top-5 right-5 w-10 h-10 bg-white/15 backdrop-blur-md rounded-full border border-white/25 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:rotate-12 z-30">
                <ArrowUpRight className="w-4 h-4" />
              </div>

              {/* Text reveal on hover */}
              <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-3 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-400 z-30">
                <span className="inline-block px-3 py-1 mb-3 bg-white/20 backdrop-blur-md rounded-full text-[10px] font-bold text-white tracking-[0.15em] uppercase border border-white/20">
                  {item.cat}
                </span>
                <h3 className="text-xl font-bold text-white leading-snug mb-1">
                  {item.title}
                </h3>
                <p className="text-slate-300 text-xs font-light line-clamp-2 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>

            {/* Static label below image (always visible) */}
            <div className="bg-white px-6 py-4 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold text-[#B48A66] uppercase tracking-widest">
                  {item.cat}
                </span>
                <h4 className="text-sm font-bold text-slate-900 mt-0.5 leading-tight">
                  {item.title}
                </h4>
              </div>
              <div className="w-8 h-8 rounded-full border border-slate-100 flex items-center justify-center text-slate-400 group-hover:border-[#B48A66] group-hover:text-[#B48A66] transition-colors duration-300 shrink-0 ml-4">
                <ArrowUpRight className="w-3.5 h-3.5" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty state */}
      {filtered.length === 0 && (
        <div className="text-center py-24 text-slate-400 font-light">
          No projects found in this category.
        </div>
      )}
    </div>
  );
}
