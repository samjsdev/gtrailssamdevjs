'use client';

import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface Project {
  img: string;
  title: string;
  tag: string;
  sqft: string;
  category: string;
}

const PROJECTS: Project[] = [
  {
    img: '/images/stock/68b39046.webp',
    title: 'The Courtyard Villa',
    tag: 'Anna Nagar East',
    sqft: '4,400 sq.ft',
    category: 'Turnkey Construction & Architecture',
  },
  {
    img: '/images/stock/a151a9e5.webp',
    title: 'Minimalist Linear Residence',
    tag: 'Kilpauk, Chennai',
    sqft: '3,850 sq.ft',
    category: 'Architecture & Interior Architecture',
  },
  {
    img: '/images/stock/bf333360.webp',
    title: 'Warm Teak & Timber Home',
    tag: 'Boat Club Road',
    sqft: '5,200 sq.ft',
    category: 'Turnkey Execution',
  },
  {
    img: '/images/stock/84fea9c5.webp',
    title: 'Contemporary Urban Estate',
    tag: 'Nungambakkam',
    sqft: '6,100 sq.ft',
    category: 'Residential Design & Build',
  },
  {
    img: '/images/stock/284d6d29.webp',
    title: 'Bespoke Duplex Penthouse',
    tag: 'Besant Nagar',
    sqft: '3,600 sq.ft',
    category: 'Interior Fit-Out & Joinery',
  },
];

export default function ProjectCarousel() {
  const carouselRef = useRef<HTMLDivElement>(null);

  const scrollCarousel = (dir: 'left' | 'right') => {
    if (carouselRef.current) {
      const scrollAmount = 450;
      carouselRef.current.scrollBy({
        left: dir === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section id="projects" className="border-b-4 border-[#111111] bg-[#111111] text-[#FAFAFA]">
      <div className="p-6 md:p-12 border-b-2 border-[#212121] flex flex-wrap justify-between items-end gap-4">
        <div>
          <p className="text-xs font-bold tracking-[0.2em] uppercase text-[#EA580C] mb-3">Portfolio</p>
          <h2
            className="text-3xl md:text-5xl font-bold font-serif text-white tracking-tight"
            style={{ fontFamily: "'Lora', serif" }}
          >
            Signature Residences
          </h2>
          <p className="text-xs md:text-sm text-[#757575] mt-2 font-medium">
            A curated selection of our completed turnkey homes and architectural residences across Chennai.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/gallery"
            className="hidden sm:inline-block text-xs font-bold uppercase tracking-widest text-[#EA580C] hover:text-white mr-4 transition-colors"
          >
            View Full Gallery →
          </Link>
          <button
            aria-label="Previous project"
            onClick={() => scrollCarousel('left')}
            className="w-12 h-12 border border-[#333333] flex items-center justify-center hover:bg-[#EA580C] hover:text-[#111111] hover:border-[#EA580C] transition-colors cursor-pointer text-lg font-bold"
          >
            ←
          </button>
          <button
            aria-label="Next project"
            onClick={() => scrollCarousel('right')}
            className="w-12 h-12 border border-[#333333] flex items-center justify-center hover:bg-[#EA580C] hover:text-[#111111] hover:border-[#EA580C] transition-colors cursor-pointer text-lg font-bold"
          >
            →
          </button>
        </div>
      </div>

      <div
        ref={carouselRef}
        className="flex overflow-x-auto snap-x snap-mandatory hide-scrollbar"
        style={{ scrollbarWidth: 'none' }}
      >
        {PROJECTS.map((proj, i) => (
          <div
            key={i}
            className="min-w-[85vw] sm:min-w-[65vw] md:min-w-[50vw] lg:min-w-[42vw] snap-center border-r-2 border-[#212121] relative group shrink-0"
          >
            <div className="aspect-[4/3] relative overflow-hidden bg-[#181818]">
              <Image
                src={proj.img}
                alt={proj.title}
                fill
                className="object-cover grayscale-[0.25] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                sizes="(max-width: 768px) 85vw, 42vw"
              />
            </div>
            <div className="p-6 md:p-8 absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#111111] via-[#111111]/85 to-transparent pt-28">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[#EA580C] text-[11px] font-bold tracking-widest uppercase">
                  {proj.tag}
                </span>
                <span className="text-white/40">•</span>
                <span className="text-white/70 text-[11px] font-bold tracking-wider uppercase">
                  {proj.sqft}
                </span>
              </div>
              <h3
                className="text-xl sm:text-2xl font-bold font-serif text-white group-hover:text-[#EA580C] transition-colors"
                style={{ fontFamily: "'Lora', serif" }}
              >
                {proj.title}
              </h3>
              <p className="text-xs text-white/50 uppercase tracking-widest mt-1">
                {proj.category}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
