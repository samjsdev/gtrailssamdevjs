'use client';

import { useState } from 'react';
import { Camera, X, ArrowUpRight, CheckCircle2 } from 'lucide-react';

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
  const [selectedImg, setSelectedImg] = useState<GalleryItem | null>(null);

  const filtered = active === 'All' ? items : items.filter(i => i.cat === active);

  return (
    <div className="space-y-12 text-left selection:bg-[#C1FF72] selection:text-[#0A0A0A] relative z-20">
      
      {/* Filter Pills */}
      <div className="flex justify-center gap-3 flex-wrap">
        {FILTERS.map((cat) => (
          <button
            key={cat}
            onClick={() => setActive(cat)}
            className={`px-5 py-2 rounded-full text-[10px] font-bold tracking-[0.2em] uppercase transition-all duration-500 ${
              active === cat
                ? 'bg-[#0A0A0A] text-[#FCFAF6] shadow-lg scale-105'
                : 'bg-white text-[#0A0A0A]/50 border border-[#0A0A0A]/5 hover:border-[#0A0A0A]/10 hover:text-[#0A0A0A]'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Masonry Columns Grid using native columns */}
      <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
        {filtered.map((item, i) => (
          <div
            key={`${active}-${i}`}
            onClick={() => setSelectedImg(item)}
            className="break-inside-avoid group relative rounded-4xl overflow-hidden cursor-pointer border border-[#0A0A0A]/5 hover:border-[#0A0A0A]/10 hover:shadow-xl transition-all duration-500 bg-white p-4"
            style={{
              animationDelay: `${i * 50}ms`,
            }}
          >
            <div
              className={`relative overflow-hidden rounded-3xl w-full ${
                item.span === 'tall'
                  ? 'aspect-[3/4]'
                  : item.span === 'wide'
                  ? 'aspect-[16/9]'
                  : i % 4 === 0
                  ? 'aspect-[3/4]'
                  : i % 3 === 1
                  ? 'aspect-square'
                  : 'aspect-[4/3]'
              }`}
            >
              <img
                src={item.img}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-750"
                loading="lazy"
              />

              {/* Sophisticated dark styling overlay on hover */}
              <div className="absolute inset-0 bg-[#0A0A0A]/20 group-hover:bg-[#0A0A0A]/60 transition-colors duration-500 z-10" />

              {/* Hover Zoom circle indicator */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-20">
                <span className="flex flex-col items-center justify-center bg-[#FCFAF6] text-[#0A0A0A] w-16 h-16 rounded-full shadow-xl transform scale-75 group-hover:scale-100 transition-transform duration-300">
                  <Camera className="w-4 h-4 mb-0.5 text-[#C1FF72]" />
                  <span className="text-[8px] uppercase font-bold tracking-widest text-[#0A0A0A]/70">Zoom</span>
                </span>
              </div>
            </div>

            {/* Title & category details below image */}
            <div className="flex justify-between items-center px-2 pt-6 pb-2">
              <div>
                <span className="text-[9px] font-bold tracking-[0.2em] uppercase text-gray-400 group-hover:text-[#0A0A0A] transition-colors">{item.cat}</span>
                <h4 className="font-serif text-lg font-normal text-[#0A0A0A] mt-1 group-hover:text-[#0A0A0A] transition-colors tracking-wide">{item.title}</h4>
              </div>
              <div className="w-8 h-8 rounded-full bg-[#FCFAF6] border border-[#0A0A0A]/5 flex items-center justify-center text-[#0A0A0A] group-hover:bg-[#C1FF72] group-hover:border-[#C1FF72] transition-all shrink-0 ml-4 duration-300">
                <ArrowUpRight className="w-4 h-4 group-hover:rotate-45 transition-transform" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox / Zoom Modal */}
      {selectedImg && (
        <div 
          className="fixed inset-0 z-50 bg-[#FCFAF6]/95 backdrop-blur-md flex items-center justify-center p-4 md:p-8 animate-fadeIn"
          onClick={() => setSelectedImg(null)}
        >
          {/* Close button */}
          <button 
            className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white hover:bg-gray-50 border border-[#0A0A0A]/5 text-[#0A0A0A] flex items-center justify-center shadow-sm transition-all hover:scale-105 active:scale-95 duration-300"
            onClick={() => setSelectedImg(null)}
          >
            <X className="w-5 h-5" />
          </button>

          {/* Modal Card */}
          <div 
            className="relative max-w-5xl w-full bg-white border border-[#0A0A0A]/5 rounded-4xl p-6 md:p-8 flex flex-col md:flex-row items-center gap-8 shadow-xl animate-scaleUp"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Zoomed Image */}
            <div className="w-full md:w-2/3 aspect-[4/3] rounded-3xl overflow-hidden border border-[#0A0A0A]/5 bg-[#FCFAF6]">
              <img 
                src={selectedImg.img} 
                alt={selectedImg.title} 
                className="w-full h-full object-cover"
              />
            </div>

            {/* Showcase Specifications */}
            <div className="w-full md:w-1/3 text-left space-y-6 flex flex-col justify-between h-full">
              <div className="space-y-4">
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FCFAF6] border border-[#0A0A0A]/5 text-[9px] font-bold text-[#0A0A0A] tracking-wider uppercase">
                  {selectedImg.cat}
                </span>
                <h3 className="font-serif text-2xl font-normal text-[#0A0A0A] leading-tight tracking-wide">
                  {selectedImg.title}
                </h3>
                <p className="text-xs text-gray-500 font-normal leading-relaxed">
                  {selectedImg.desc}
                </p>
              </div>

              <div className="border-t border-[#0A0A0A]/5 pt-6">
                <h5 className="text-[9px] font-bold tracking-[0.25em] uppercase text-gray-400 mb-3">Studio Standards</h5>
                <ul className="space-y-2.5">
                  {[
                    "Itemized Sourcing Costs Approved",
                    "Modular Carpentry QC Checked",
                    "Detailed Operations Manuals Handed Over"
                  ].map((x, xi) => (
                    <li key={xi} className="flex items-center gap-2 text-xs text-gray-500 font-normal">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#C1FF72] shrink-0" />
                      <span>{x}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Empty State */}
      {filtered.length === 0 && (
        <div className="text-center py-24 text-gray-400 font-normal">
          No showcase projects found in this category.
        </div>
      )}
    </div>
  );
}
