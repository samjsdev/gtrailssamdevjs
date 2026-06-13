"use client";

import { useState, useCallback } from "react";

type GalleryItem = {
  cat: string;
  title: string;
  desc: string;
  img: string;
  span?: "tall" | "wide";
};

type GalleryGridProps = {
  items: GalleryItem[];
};

export default function GalleryGrid({ items }: GalleryGridProps) {
  const [activeTab, setActiveTab] = useState<string>("All");
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);

  const categories = ["All", "Residential", "Commercial", "Studio & Process"];

  const filteredItems = activeTab === "All"
    ? items
    : items.filter(item => item.cat.toLowerCase() === activeTab.toLowerCase() || (activeTab === "Studio & Process" && item.cat.includes("Studio")));

  const openLightbox = useCallback((idx: number) => setLightboxIdx(idx), []);
  const closeLightbox = useCallback(() => setLightboxIdx(null), []);

  const goNext = useCallback(() => {
    if (lightboxIdx === null) return;
    setLightboxIdx((lightboxIdx + 1) % filteredItems.length);
  }, [lightboxIdx, filteredItems.length]);

  const goPrev = useCallback(() => {
    if (lightboxIdx === null) return;
    setLightboxIdx((lightboxIdx - 1 + filteredItems.length) % filteredItems.length);
  }, [lightboxIdx, filteredItems.length]);

  const lightboxItem = lightboxIdx !== null ? filteredItems[lightboxIdx] : null;

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

      {/* UNIFORM GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6" data-gsap="gallery-grid">
        {filteredItems.map((item, idx) => (
          <div
            key={idx}
            onClick={() => openLightbox(idx)}
            className="group relative overflow-hidden border border-stone-200 cursor-zoom-in bg-stone-100 aspect-square transition-all duration-500 hover:border-stone-400 hover:shadow-lg"
            data-gsap="gallery-card"
          >
            {/* Image fills card uniformly */}
            <img
              src={item.img}
              alt={item.title}
              loading="lazy"
              className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
            />

            {/* Hover Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400 flex flex-col justify-end p-4">
              <div className="text-white transform translate-y-3 group-hover:translate-y-0 transition-transform duration-400 ease-out space-y-1">
                <span className="text-[8px] font-bold uppercase tracking-[0.2em] text-white/70">
                  {item.cat}
                </span>
                <h3 className="text-sm font-light tracking-wide">{item.title}</h3>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* LIGHTBOX MODAL */}
      {lightboxItem && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-sm p-4 cursor-zoom-out"
          onClick={closeLightbox}
        >
          {/* Close button */}
          <button 
            onClick={closeLightbox}
            className="absolute top-6 right-6 text-white/60 hover:text-white text-xs uppercase tracking-widest font-bold flex items-center gap-2 border border-white/20 rounded-full px-4 py-2 hover:bg-white/5 transition-colors z-10"
          >
            Close
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Previous button */}
          <button
            onClick={(e) => { e.stopPropagation(); goPrev(); }}
            className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 text-white/50 hover:text-white border border-white/20 rounded-full w-10 h-10 flex items-center justify-center hover:bg-white/10 transition-colors z-10"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          </button>

          {/* Next button */}
          <button
            onClick={(e) => { e.stopPropagation(); goNext(); }}
            className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 text-white/50 hover:text-white border border-white/20 rounded-full w-10 h-10 flex items-center justify-center hover:bg-white/10 transition-colors z-10"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </button>

          {/* Image */}
          <div className="max-w-5xl max-h-[85vh] overflow-hidden relative" onClick={(e) => e.stopPropagation()}>
            <img 
              src={lightboxItem.img} 
              alt={lightboxItem.title} 
              className="max-w-full max-h-[80vh] object-contain mx-auto shadow-2xl border border-white/10"
            />
            <div className="text-center mt-4 space-y-1">
              <p className="text-white/80 text-sm font-light">{lightboxItem.title}</p>
              <p className="text-white/40 text-[10px] uppercase tracking-widest font-bold">
                {lightboxIdx !== null ? lightboxIdx + 1 : 0} / {filteredItems.length} — {lightboxItem.cat}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
