'use client';

import { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { Playfair_Display } from "next/font/google";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
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
      {/* Dynamic Filter Pills */}
      <div className="flex justify-center gap-3 flex-wrap">
        {FILTERS.map((cat) => (
          <button
            key={cat}
            onClick={() => setActive(cat)}
            className={`px-6 py-2.5 rounded-xl text-[9px] font-bold uppercase tracking-widest transition-all duration-300 border ${
              active === cat
                ? 'bg-white text-black border-white shadow-lg'
                : 'bg-[#121212] text-zinc-500 border-white/5 hover:border-white/20 hover:text-white'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Masonry Bento Grid */}
      <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
        {filtered.map((item, i) => (
          <div
            key={`${active}-${i}`}
            className="break-inside-avoid group relative rounded-2xl overflow-hidden cursor-pointer border border-white/5 bg-[#121212] hover:border-white/15 transition-all duration-500 shadow-xl"
            style={{
              animationDelay: `${i * 60}ms`,
            }}
          >
            {/* Image Wrap */}
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
              {/* Luxury silver tint overlay on hover */}
              <div className="absolute inset-0 bg-white/5 mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity duration-750 z-10" />

              <img
                src={item.img}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-[1200ms] ease-out"
              />

              {/* Dynamic Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20" />

              {/* Arrow Icon Top-Right */}
              <div className="absolute top-5 right-5 w-10 h-10 bg-white/10 backdrop-blur-md rounded-full border border-white/15 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:rotate-12 z-30">
                <ArrowUpRight className="w-4 h-4" />
              </div>

              {/* Sliding Text Details */}
              <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-3 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-400 z-30">
                <span className="inline-block px-3 py-1 mb-3 bg-white/10 backdrop-blur-md rounded-full text-[8px] font-bold text-white tracking-widest uppercase border border-white/10">
                  {item.cat}
                </span>
                <h3 className={`${playfair.className} text-xl text-white leading-snug mb-1`}>
                  {item.title}
                </h3>
                <p className="text-zinc-400 text-xs font-light line-clamp-2 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>

            {/* Always visible static title label below */}
            <div className="bg-[#121212] px-6 py-4 flex items-center justify-between border-t border-white/5">
              <div>
                <span className="text-[8px] font-bold text-zinc-500 uppercase tracking-widest">
                  {item.cat}
                </span>
                <h4 className={`${playfair.className} text-base text-white mt-0.5 leading-tight`}>
                  {item.title}
                </h4>
              </div>
              <div className="w-8 h-8 rounded-full border border-white/5 flex items-center justify-center text-zinc-500 group-hover:border-white/20 group-hover:text-white transition-colors duration-300 shrink-0 ml-4">
                <ArrowUpRight className="w-3.5 h-3.5" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filtered.length === 0 && (
        <div className="text-center py-24 text-zinc-500 font-light text-sm uppercase tracking-widest">
          No showcases found in this category.
        </div>
      )}
    </div>
  );
}
