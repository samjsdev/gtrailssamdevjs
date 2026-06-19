'use client';

import { useState } from 'react';
import { ArrowUpRight, X } from 'lucide-react';
import { Cormorant_Garamond } from 'next/font/google';

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
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
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filtered = active === 'All' ? items : items.filter(i => i.cat === active);

  return (
    <div className="space-y-12 text-left">
      {/* Filter Pills */}
      <div className="flex justify-center gap-3 flex-wrap">
        {FILTERS.map((cat) => (
          <button
            key={cat}
            onClick={() => setActive(cat)}
            className={`px-6 py-2.5 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all duration-300 ${
              active === cat
                ? 'bg-[#2A2421] text-[#FAF8F5] shadow-md shadow-[#2A2421]/10'
                : 'bg-white text-[#2A2421]/60 border border-[#EAE3D8] hover:border-[#8E7056] hover:text-[#8E7056]'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Uniform 3-Column Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((item, i) => (
          <div
            key={`${active}-${i}`}
            onClick={() => setLightboxIndex(i)}
            className="group relative rounded-[2rem] overflow-hidden cursor-pointer border border-[#EAE3D8]/60 shadow-xs hover:shadow-md hover:border-[#8E7056]/30 transition-all duration-500 bg-white flex flex-col"
            style={{
              animationDelay: `${i * 50}ms`,
            }}
          >
            {/* Uniform Image Container */}
            <div className="relative overflow-hidden w-full aspect-square">
              {/* Clay tint overlay on hover */}
              <div className="absolute inset-0 bg-[#8E7056]/15 mix-blend-multiply opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-10" />

              <img
                src={item.img}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-700"
              />

              {/* Dark Warm gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#2A2421]/80 via-[#2A2421]/15 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20" />

              {/* Arrow icon top-right */}
              <div className="absolute top-5 right-5 w-9 h-9 bg-white/20 backdrop-blur-md rounded-full border border-white/25 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:rotate-12 z-30">
                <ArrowUpRight className="w-4 h-4" />
              </div>

              {/* Text reveal on hover */}
              <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-3 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500 z-30">
                <span className="inline-block px-3 py-1 mb-3 bg-white/20 backdrop-blur-md rounded-full text-[9px] font-bold text-white tracking-widest uppercase border border-white/20">
                  {item.cat}
                </span>
                <h3 className={`${cormorant.className} text-xl font-light text-white leading-snug mb-1`}>
                  {item.title}
                </h3>
                <p className="text-[#FAF8F5]/85 text-[11.5px] font-light line-clamp-2 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>

            {/* Static label below image */}
            <div className="bg-white px-6 py-4 flex items-center justify-between flex-1">
              <div>
                <span className="text-[9px] font-bold text-[#8E7056] uppercase tracking-widest">
                  {item.cat}
                </span>
                <h4 className="text-[13.5px] font-bold text-[#2A2421] mt-0.5 leading-tight group-hover:text-[#8E7056] transition-colors">
                  {item.title}
                </h4>
              </div>
              <div className="w-8 h-8 rounded-full border border-[#EAE3D8] flex items-center justify-center text-[#2A2421]/40 group-hover:border-[#8E7056] group-hover:text-[#8E7056] transition-colors duration-300 shrink-0 ml-4">
                <ArrowUpRight className="w-3.5 h-3.5" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty state */}
      {filtered.length === 0 && (
        <div className="text-center py-24 text-[#2A2421]/50 font-light">
          No projects found in this category.
        </div>
      )}

      {/* Lightbox Overlay */}
      {lightboxIndex !== null && (
        <div 
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4 backdrop-blur-sm"
          onClick={() => setLightboxIndex(null)}
        >
          <button 
            className="absolute top-6 right-6 text-white bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors z-[60]"
            onClick={(e) => {
              e.stopPropagation();
              setLightboxIndex(null);
            }}
          >
            <X className="w-6 h-6" />
          </button>
          
          <img 
            src={filtered[lightboxIndex].img} 
            alt={filtered[lightboxIndex].title} 
            className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />
          
          {/* Simple controls if needed (left/right clicking the background could close it, but let's add arrows if possible. For simplicity, just close on background click) */}
          <div className="absolute bottom-6 text-white/70 text-sm font-light tracking-wide bg-black/50 px-4 py-2 rounded-full">
            {filtered[lightboxIndex].title}
          </div>
        </div>
      )}
    </div>
  );
}
