'use client';

import { useState } from 'react';
import Image from 'next/image';
import { X, ZoomIn } from 'lucide-react';

import { useTemplateData } from './context/TemplateContext';

export default function GalleryGrid() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const { data } = useTemplateData();
  const galleryData = data?.gallery?.sections?.[1] || {};

  const defaultImages = [
    '/images/stock/8f61297a.webp',
    '/images/stock/ca97efb9.webp',
    '/images/stock/49bce86b.webp',
    '/images/stock/a8927807.webp',
    '/images/stock/65d3ec82.webp',
    '/images/stock/68b39046.webp',
    '/images/stock/d2cd7311.webp',
    '/images/stock/c093e1b3.webp'
  ];

  const getImg = (i: number) => data?.media?.otherImages?.[i] || galleryData.image_sources?.[i] || defaultImages[i];
  
  const images = Array.from({ length: 8 }).map((_, i) => ({
    src: getImg(i),
    title: galleryData.text?.[i] || `Project 0${i + 1}`,
    subtitle: galleryData.headings?.[0] || 'Curated Interior'
  }));

  return (
    <>
      <div data-gsap="stagger-container" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {images.map((item, index) => (
          <div 
            key={index} 
            data-gsap="stagger-item"
            className="relative group overflow-hidden rounded-[32px] shadow-sm hover:shadow-2xl transition-all duration-500 cursor-pointer aspect-[4/3]"
            onClick={() => setSelectedImage(item.src)}
          >
            <Image 
              src={item.src} 
              alt={item.title} 
              fill
              className="object-cover transform transition-transform duration-1000 group-hover:scale-110"
            />
            {/* Overlay */}
            <div className="absolute inset-0 bg-[#1A1D27]/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center backdrop-blur-[2px]">
              <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white transform scale-50 group-hover:scale-100 transition-transform duration-500">
                <ZoomIn className="w-8 h-8" />
              </div>
            </div>
            {/* Tag */}
            <div className="absolute bottom-6 left-6 right-6">
              <div className="bg-white/90 backdrop-blur-sm px-6 py-4 rounded-2xl transform translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-100">
                <span className="text-[#2b347b] text-xs font-bold uppercase tracking-widest block mb-1">{item.title}</span>
                <h3 className="text-[#1A1D27] text-lg font-bold">{item.subtitle}</h3>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-sm flex items-center justify-center p-4 md:p-8 opacity-100 animate-in fade-in duration-300"
          onClick={() => setSelectedImage(null)}
        >
          <button 
            className="absolute top-6 right-6 md:top-8 md:right-8 text-white/50 hover:text-white transition-colors bg-white/10 hover:bg-white/20 rounded-full p-2 z-[101]"
            onClick={(e) => {
              e.stopPropagation();
              setSelectedImage(null);
            }}
          >
            <X className="w-8 h-8" />
          </button>
          
          <div 
            className="relative w-full max-w-6xl aspect-[16/9] md:aspect-auto md:h-[85vh] rounded-2xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()} // Prevent clicking the image from closing
          >
            <Image 
              src={selectedImage} 
              alt="Expanded gallery view" 
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>
      )}
    </>
  );
}
