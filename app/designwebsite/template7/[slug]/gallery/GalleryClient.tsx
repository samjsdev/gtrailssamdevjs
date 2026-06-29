'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

type Category = 'All' | 'Living Room' | 'Kitchen' | 'Bedroom' | 'Office' | 'Bathroom' | 'Outdoor';

// Enhanced gallery data with categories
const galleryItems = [
  {
    src: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=2000&q=80",
    alt: "Modern living room with natural light",
    title: "Modern Living",
    category: "Living Room",
    description: "Elegant open-plan living space with natural materials"
  },
  {
    src: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=2000&q=80",
    alt: "Contemporary kitchen design",
    title: "Gourmet Kitchen",
    category: "Kitchen",
    description: "Sleek contemporary kitchen with premium finishes"
  },
  {
    src: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=2000&q=80",
    alt: "Luxury bedroom interior",
    title: "Master Suite",
    category: "Bedroom",
    description: "Tranquil master bedroom retreat"
  },
  {
    src: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=2000&q=80",
    alt: "Modern office workspace",
    title: "Creative Office",
    category: "Office",
    description: "Inspiring workspace designed for productivity"
  },
  {
    src: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?auto=format&fit=crop&w=2000&q=80",
    alt: "Luxury bathroom design",
    title: "Spa Bathroom",
    category: "Bathroom",
    description: "Resort-inspired bathroom with stone accents"
  },
  {
    src: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=2000&q=80",
    alt: "Outdoor living area",
    title: "Outdoor Lounge",
    category: "Outdoor",
    description: "Seamless indoor-outdoor living experience"
  },
  {
    src: "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&w=2000&q=80",
    alt: "Cozy reading nook",
    title: "Reading Nook",
    category: "Living Room",
    description: "Intimate corner designed for relaxation"
  },
];

const categories: Category[] = ['All', 'Living Room', 'Kitchen', 'Bedroom', 'Office', 'Bathroom', 'Outdoor'];

export default function GalleryClient() {
  const [activeCategory, setActiveCategory] = useState<Category>('All');
  const [filteredItems, setFilteredItems] = useState(galleryItems);
  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  // Filter logic
  useEffect(() => {
    if (activeCategory === 'All') {
      setFilteredItems(galleryItems);
    } else {
      setFilteredItems(galleryItems.filter(item => item.category === activeCategory));
    }
  }, [activeCategory]);

  // Animation for items when filter changes
  useGSAP(() => {
    // Animate items in
    gsap.fromTo('.gallery-card',
      { 
        y: 20, 
        opacity: 0,
        scale: 0.95
      },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.5,
        stagger: 0.1,
        ease: 'power2.out',
        overwrite: 'auto'
      }
    );
  }, [filteredItems]);

  // Initial header animation
  useGSAP(() => {
    const tl = gsap.timeline();
    
    tl.from('.header-title', {
        y: 50,
        opacity: 0,
        duration: 1.2
    }, '-=0.8')
    .from('.header-desc', {
        y: 30,
        opacity: 0,
        duration: 1
    }, '-=0.8');

  }, []);

  return (
    <div ref={containerRef} className="min-h-screen bg-[#eaf6ff] text-[var(--text)] overflow-hidden relative">
      
       {/* Background - Soft Blue Gradient Match Home */}
       <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#eaf6ff] via-[#e2f1ff] to-[#f0f9ff] opacity-100 pointer-events-none" />

       {/* Massive Background Watermark */}
       <div className="absolute top-[2%] left-0 right-0 z-0 overflow-hidden pointer-events-none select-none flex justify-center">
          <h1 className="text-[18vw] leading-none font-bold text-white opacity-40 text-center uppercase tracking-tighter whitespace-nowrap"
              style={{ 
                  textShadow: '0 4px 20px rgba(186, 219, 255, 0.4)',
                  WebkitTextStroke: '2px rgba(255,255,255,0.8)'
              }}>
            GALLERY
          </h1>
       </div>

      {/* Header Section */}
      <section className="px-6 mb-16 pt-32 relative z-10">
        <div ref={headerRef} className="max-w-[1200px] mx-auto">
            <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
                 <h1 className="header-title text-5xl md:text-7xl font-light leading-[1.1] mb-8 text-slate-900" style={{ fontFamily: 'var(--serif-font)' }}>
                    Real Results. <span className="italic text-blue-600">Modern Craft.</span>
                </h1>
                
                <p className="header-desc text-xl leading-relaxed text-slate-600 max-w-2xl">
                    A curated look at the care we deliver—from precision alignment to restorative artistry.
                </p>
            </div>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="px-6 mb-12 sticky top-24 z-30">
        <div className="max-w-[1200px] mx-auto">
            <div className="overflow-x-auto flex items-center justify-start md:justify-center gap-2 no-scrollbar mx-auto md:w-fit py-2">
                {categories.map((cat) => (
                    <button
                        key={cat}
                        onClick={() => setActiveCategory(cat)}
                        className={`category-tab px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 whitespace-nowrap border
                            ${activeCategory === cat 
                                ? 'bg-[var(--accent-2)] text-white border-[var(--accent-2)] shadow-lg shadow-[var(--accent-2)]/25' 
                                : 'bg-[var(--surface)] text-[var(--muted)] border-transparent hover:text-[var(--text)] hover:bg-[var(--surface-2)]'
                            }
                        `}
                    >
                        {cat}
                    </button>
                ))}
            </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="px-6 min-h-[50vh]">
        <div className="max-w-[1200px] mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredItems.map((item, index) => (
                    <div 
                        key={`${item.title}-${index}`}
                        className="gallery-card group relative aspect-[3/4] rounded-3xl overflow-hidden cursor-pointer bg-[var(--surface-2)] shadow-sm hover:shadow-xl transition-shadow duration-300"
                    >
                        <Image
                            src={item.src}
                            alt={item.alt}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                        
                        {/* Overlay - Always visible for text readability */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent transition-opacity duration-300" />
                        
                        {/* Content - Always visible */}
                        <div className="absolute inset-x-0 bottom-0 p-8">
                            <span className="text-[var(--accent-2)] text-sm font-medium mb-2 block">
                                {item.category}
                            </span>
                            <h3 className="text-white text-2xl font-medium mb-2" style={{ fontFamily: 'var(--serif-font)' }}>
                                {item.title}
                            </h3>
                            <p className="text-white/80 text-sm">
                                {item.description}
                            </p>
                        </div>

                        {/* Hover Icon - Still hover only for interactivity hint */}
                        <div className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:rotate-45">
                            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                        </div>
                    </div>
                ))}
            </div>

             {filteredItems.length === 0 && (
                <div className="text-center py-20">
                    <p className="text-[var(--muted)] text-lg">No items found in this category.</p>
                </div>
            )}
        </div>
      </section>

        {/* Bottom CTA */}
        <section className="px-6 py-24 text-center">
            <div className="max-w-2xl mx-auto">
                <h2 className="text-4xl font-light mb-6" style={{ fontFamily: 'var(--serif-font)' }}>
                    Ready to start your journey?
                </h2>
                <Link
                    href="/contact"
                    className="inline-flex items-center justify-center px-8 py-4 text-sm font-medium rounded-full transition-all duration-300 bg-[var(--text)] text-[var(--bg)] hover:scale-105 hover:shadow-2xl"
                >
                    Book Consultation
                </Link>
            </div>
        </section>

    </div>
  );
}
