'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Play, Pause, ArrowRight, Sparkles, MapPin } from 'lucide-react';

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
    img: '/images/architecture/hero-villa-twilight.webp',
    title: 'The Cantilever Twilight Villa',
    tag: 'Boat Club Road',
    sqft: '5,400 sq.ft',
    category: 'Full Architectural & Structural Execution',
  },
  {
    img: '/images/stock/a151a9e5.webp',
    title: 'Minimalist Linear Residence',
    tag: 'Kilpauk, Chennai',
    sqft: '3,850 sq.ft',
    category: 'Architecture & Interior Architecture',
  },
  {
    img: '/images/architecture/modern-villa-duplex.webp',
    title: 'The Contemporary Duplex',
    tag: 'Anna Nagar, Chennai',
    sqft: '4,600 sq.ft',
    category: 'Bespoke Turnkey Residential Build',
  },
  {
    img: '/images/stock/bf333360.webp',
    title: 'Warm Teak & Timber Home',
    tag: 'Poes Garden',
    sqft: '5,200 sq.ft',
    category: 'Turnkey Execution & Joinery',
  },
  {
    img: '/images/stock/84fea9c5.webp',
    title: 'Contemporary Urban Estate',
    tag: 'Nungambakkam',
    sqft: '6,100 sq.ft',
    category: 'Residential Design & Build',
  },
  {
    img: '/images/architecture/geometric-villa-elevation.webp',
    title: 'The Geometric Facade Villa',
    tag: 'ECR Coastal Corridor',
    sqft: '4,200 sq.ft',
    category: 'Glass Pavilion & Seismic RCC Structure',
  },
  {
    img: '/images/hero-villa.webp',
    title: 'The Signature White Villa',
    tag: 'Anna Nagar West',
    sqft: '4,500 sq.ft',
    category: 'Full Turnkey Villa Execution',
  },
  {
    img: '/images/architecture/tropical-modern-villa.webp',
    title: 'The Tropical Modernist Villa',
    tag: 'Harrington Road',
    sqft: '4,100 sq.ft',
    category: 'Double-Height Living & Courtyard Build',
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
  const [isPaused, setIsPaused] = useState(false);

  // Duplicate for smooth seamless infinite continuous scrolling loop
  const displayProjects = [...PROJECTS, ...PROJECTS];

  return (
    <section id="projects" className="border-b-4 border-[#111111] bg-[#111111] text-[#FAFAFA] overflow-hidden">
      {/* Header Strip */}
      <div className="p-6 md:p-12 border-b-2 border-[#212121] flex flex-wrap justify-between items-end gap-6">
        <div>
          <p className="text-xs font-bold tracking-[0.2em] uppercase text-[#EA580C] mb-3 flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>PORTFOLIO</span>
          </p>
          <h2
            className="text-3xl md:text-5xl font-bold font-serif text-white tracking-tight"
            style={{ fontFamily: "'Lora', serif" }}
          >
            Signature Residences
          </h2>
          <p className="text-xs md:text-sm text-[#888888] mt-2 font-medium max-w-xl">
            A curated selection of our completed turnkey homes and architectural residences across Chennai.
          </p>
        </div>

        {/* Right Controls & Link */}
        <div className="flex items-center gap-4">
          {/* Continuous Scroll Play / Pause Toggle */}
          <button
            type="button"
            onClick={() => setIsPaused((prev) => !prev)}
            className="px-3.5 py-2 border border-[#333333] hover:border-[#EA580C] hover:bg-[#EA580C] hover:text-[#111111] transition-colors text-xs font-bold uppercase tracking-wider flex items-center gap-2 text-white/90"
            aria-label={isPaused ? 'Resume continuous scroll' : 'Pause continuous scroll'}
            title={isPaused ? 'Resume continuous scroll' : 'Pause continuous scroll'}
          >
            {isPaused ? <Play className="w-3.5 h-3.5 fill-current text-[#EA580C]" /> : <Pause className="w-3.5 h-3.5 fill-current text-[#EA580C]" />}
            <span className="hidden sm:inline text-[11px]">
              {isPaused ? 'Resume Scroll' : 'Pause Scroll'}
            </span>
          </button>

          <Link
            href="/gallery"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#EA580C] text-[#111111] hover:bg-white text-xs font-bold uppercase tracking-widest transition-colors shadow-sm"
          >
            <span>View Full Gallery</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* Guaranteed Hardware-Accelerated Continuous Scrolling Animation */}
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes continuousPortfolioScroll {
            0% {
              transform: translate3d(0, 0, 0);
            }
            100% {
              transform: translate3d(-50%, 0, 0);
            }
          }
          .portfolio-continuous-track {
            display: flex !important;
            width: max-content !important;
            will-change: transform;
            animation: continuousPortfolioScroll 45s linear infinite !important;
          }
          .portfolio-continuous-track.is-paused {
            animation-play-state: paused !important;
          }
          .portfolio-continuous-track:hover {
            animation-play-state: paused;
          }
        `
      }} />

      {/* Infinite Continuous Scrolling Track */}
      <div className="relative py-8 md:py-10">
        <div className="overflow-hidden w-full">
          <div className={`portfolio-continuous-track ${isPaused ? 'is-paused' : ''}`}>
            {displayProjects.map((proj, i) => (
              <div
                key={`${proj.title}-${i}`}
                className="w-[300px] sm:w-[400px] md:w-[460px] lg:w-[500px] mx-3 md:mx-4 border-2 border-[#262626] hover:border-[#EA580C] bg-[#181818] relative group shrink-0 transition-colors duration-300 select-none overflow-hidden"
              >
                {/* Project Image */}
                <div className="aspect-[16/11] relative overflow-hidden bg-[#181818]">
                  <Image
                    src={proj.img}
                    alt={`${proj.title} - ${proj.tag}`}
                    fill
                    className="object-cover grayscale-[0.2] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                    sizes="(max-width: 768px) 300px, 500px"
                  />
                  {/* Image Scrim */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-[#111111]/60 to-transparent" />
                </div>

                {/* Caption / Details Overlay */}
                <div className="p-5 md:p-6 absolute bottom-0 left-0 right-0 z-10">
                  <div className="flex items-center gap-2 mb-2 flex-wrap">
                    <span className="text-[#EA580C] text-[10px] sm:text-[11px] font-bold tracking-widest uppercase flex items-center gap-1 bg-[#111111]/80 backdrop-blur-xs px-2 py-0.5 border border-[#EA580C]/40">
                      <MapPin className="w-3 h-3" />
                      <span>{proj.tag}</span>
                    </span>
                    <span className="text-white/40">•</span>
                    <span className="text-white/80 text-[10px] sm:text-[11px] font-mono font-bold tracking-wider uppercase bg-[#111111]/80 backdrop-blur-xs px-2 py-0.5 border border-white/20">
                      {proj.sqft}
                    </span>
                  </div>

                  <h3
                    className="text-lg sm:text-xl md:text-2xl font-bold font-serif text-white group-hover:text-[#EA580C] transition-colors leading-tight"
                    style={{ fontFamily: "'Lora', serif" }}
                  >
                    {proj.title}
                  </h3>

                  <p className="text-[11px] text-white/65 uppercase tracking-wider mt-1.5 line-clamp-1 font-medium">
                    {proj.category}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
