"use client";

import { useState } from "react";

type PortfolioItem = {
  cat: string;
  title: string;
  desc: string;
  img: string;
  span?: "tall" | "wide";
};

type GalleryGridProps = {
  items: PortfolioItem[];
};

export default function GalleryGrid({ items }: GalleryGridProps) {
  const [activeTab, setActiveTab] = useState<string>("All");
  const [lightboxImg, setLightboxImg] = useState<string | null>(null);

  const categories = ["All", "Residential", "Commercial", "Studio & Process"];

  const filteredItems = activeTab === "All"
    ? items
    : items.filter(item => item.cat.toLowerCase() === activeTab.toLowerCase() || (activeTab === "Studio & Process" && item.cat.includes("Studio")));

  return (
    <div className="space-y-12">
      {/* FILTER TABS */}
      <div className="flex flex-wrap justify-center gap-6 text-[10px] uppercase tracking-[0.25em] font-semibold border-b border-stone-200 pb-6 max-w-2xl mx-auto">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveTab(cat)}
            className={`relative py-2 transition-colors duration-300 ${
              activeTab === cat ? "text-stone-900" : "text-stone-400 hover:text-stone-600"
            }`}
          >
            {cat}
            {activeTab === cat && (
              <span className="absolute bottom-0 left-0 w-full h-[1px] bg-stone-900 animate-fade-in" />
            )}
          </button>
        ))}
      </div>

      {/* MASONRY/GRID CONTAINER */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[320px]">
        {filteredItems.map((item, idx) => {
          const isTall = item.span === "tall";
          const isWide = item.span === "wide";
          
          return (
            <div
              key={idx}
              onClick={() => setLightboxImg(item.img)}
              className={`group relative overflow-hidden border border-stone-250 cursor-zoom-in bg-stone-100 ${
                isTall ? "md:row-span-2" : ""
              } ${
                isWide ? "md:col-span-2" : ""
              } transition-transform duration-500`}
            >
              {/* Image with rich scale transition */}
              <img
                src={item.img}
                alt={item.title}
                className="w-full h-full object-cover transform group-hover:scale-103 transition-transform duration-[1500ms] ease-out"
              />

              {/* Minimal Dark Hover Overlay */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6 md:p-8">
                <div className="text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 ease-out space-y-2">
                  <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-white/70 bg-white/10 px-2 py-1 backdrop-blur-sm rounded-full w-fit inline-block">
                    {item.cat}
                  </span>
                  <h3 className="text-lg md:text-xl font-light tracking-wide">{item.title}</h3>
                  <p className="text-xs text-white/60 font-light max-w-sm line-clamp-2 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* LIGHTBOX MODAL */}
      {lightboxImg && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-sm p-4 animate-fade-in cursor-zoom-out"
          onClick={() => setLightboxImg(null)}
        >
          {/* Close trigger */}
          <button 
            onClick={() => setLightboxImg(null)}
            className="absolute top-6 right-6 text-white/60 hover:text-white text-xs uppercase tracking-widest font-bold flex items-center gap-2 border border-white/20 rounded-full px-4 py-2 hover:bg-white/5 transition-colors"
          >
            Close
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          
          <div className="max-w-5xl max-h-[85vh] overflow-hidden relative" onClick={(e) => e.stopPropagation()}>
            <img 
              src={lightboxImg} 
              alt="Zoomed portfolio workspace" 
              className="max-w-full max-h-[80vh] object-contain mx-auto shadow-2xl border border-white/10"
            />
          </div>
        </div>
      )}
    </div>
  );
}
