'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, Calculator, Compass, Star } from 'lucide-react';

interface Slide {
  image: string;
  kicker: string;
  titleA: string;
  titleB: string;
  titleC?: string;
  desc: string;
}

const slides: Slide[] = [
  {
    image: '/images/clinicImages-1.webp',
    kicker: 'Since 1998 • 28+ Years • 500+ Homes',
    titleA: 'GET YOUR DREAM HOME',
    titleB: 'CONSTRUCTED',
    titleC: 'BY EXPERTS.',
    desc: 'ARCH Foundations & Murali Patharala Associates (MPA) — Chennai\u2019s one-stop firm for architecture, turnkey construction, and bespoke interiors under one roof.',
  },
  {
    image: '/images/clinicImages-2.webp',
    kicker: 'Architecture • Approvals • Execution',
    titleA: 'DESIGNED & BUILT',
    titleB: 'UNDER ONE ROOF',
    desc: 'From CMDA/DTCP sanctions and Vastu-compliant 3D elevations to high-strength RCC construction — zero coordination gaps, zero cost escalation.',
  },
  {
    image: '/images/stock/34bba44b.webp',
    kicker: 'Turnkey Villas • Independent Homes',
    titleA: 'LUXURY VILLAS',
    titleB: 'TURNKEY DELIVERED',
    desc: 'Primary-grade Tata/JSW steel, 53-grade cement, a dedicated full-time site engineer, and a 10-year structural warranty on every home we build.',
  },
  {
    image: '/images/stock/1c7b75e9.webp',
    kicker: '3D Elevations • Facade Design',
    titleA: 'SIGNATURE 3D',
    titleB: 'ELEVATIONS',
    desc: 'Photorealistic exterior designs your villa is actually built to — the elevation you approve is the home you move into.',
  },
];

export default function HeroSlider() {
  const [index, setIndex] = useState(0);
  const [animKey, setAnimKey] = useState(0);

  const go = useCallback((next: number) => {
    setIndex((next + slides.length) % slides.length);
    setAnimKey((k) => k + 1);
  }, []);

  useEffect(() => {
    const t = setInterval(() => go(index + 1), 6500);
    return () => clearInterval(t);
  }, [index, go]);

  const slide = slides[index];

  return (
    <section id="hero" className="relative w-full h-[95vh] min-h-[640px] max-h-[920px] overflow-hidden bg-[#1A1B1A]">
      {/* Slides */}
      {slides.map((s, i) => (
        <div
          key={i}
          className={`absolute inset-0 transition-opacity duration-1000 ease-out ${i === index ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
        >
          <Image
            src={s.image}
            alt={s.titleA}
            fill
            priority={i === 0}
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#1A1B1A]/78 via-[#1A1B1A]/38 to-[#1A1B1A]/8" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1A1B1A]/70 via-transparent to-[#1A1B1A]/15" />
        </div>
      ))}

      {/* Content */}
      <div className="relative z-20 h-full max-w-7xl mx-auto px-4 sm:px-8 flex items-center">
        <div className="max-w-2xl text-white" key={animKey}>
          <div className="mpa-fade-up flex items-center gap-2.5 mb-5">
            <span className="w-10 h-[3px] bg-[#E64D16]" />
            <span className="text-[11px] sm:text-xs font-extrabold tracking-[0.22em] uppercase text-[#E6C673]">
              {slide.kicker}
            </span>
          </div>

          <h1 className="mpa-fade-up d1 font-serif font-black text-4xl sm:text-6xl lg:text-[4.2rem] leading-[1.04] tracking-tight drop-shadow-lg">
            {slide.titleA}
            <br />
            <span className="text-[#E64D16]">{slide.titleB}</span>
            {slide.titleC && (
              <>
                <br />
                {slide.titleC}
              </>
            )}
          </h1>

          <p className="mpa-fade-up d2 mt-6 text-sm sm:text-base text-stone-200/95 leading-relaxed max-w-xl font-normal">
            {slide.desc}
          </p>

          <div className="mpa-fade-up d3 mt-8 flex flex-wrap items-center gap-4">
            <Link
              href="#cost-calculator"
              className="px-7 py-4 bg-[#E64D16] hover:bg-[#C93F0F] text-white font-extrabold text-xs uppercase tracking-[0.15em] rounded-md shadow-lg shadow-orange-900/40 hover:-translate-y-0.5 transition-all flex items-center gap-2.5"
            >
              <Calculator className="w-4 h-4" />
              <span>Get Instant Cost Estimate</span>
            </Link>
            <Link
              href="#consultation-form-section"
              className="px-7 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/30 text-white font-bold text-xs uppercase tracking-[0.15em] rounded-md transition-all flex items-center gap-2.5"
            >
              <Compass className="w-4 h-4 text-[#E6C673]" />
              <span>Book Free Site Survey</span>
            </Link>
          </div>

          <div className="mpa-fade-up d4 mt-8 flex items-center gap-4 text-xs text-stone-300">
            <span className="flex items-center gap-1.5 font-semibold text-[#E6C673]">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-[#E6C673]" />
              ))}
              <span className="ml-1 text-white">4.8/5</span>
            </span>
            <span className="w-px h-4 bg-white/25" />
            <span>100% Fixed-Price Contracts</span>
            <span className="w-px h-4 bg-white/25 hidden sm:inline" />
            <span className="hidden sm:inline">10-Year Structural Warranty</span>
          </div>
        </div>
      </div>

      {/* Arrows */}
      <button
        onClick={() => go(index - 1)}
        aria-label="Previous slide"
        className="absolute z-30 left-3 sm:left-5 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/10 hover:bg-[#E64D16] backdrop-blur-sm border border-white/25 text-white flex items-center justify-center transition-all"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button
        onClick={() => go(index + 1)}
        aria-label="Next slide"
        className="absolute z-30 right-3 sm:right-5 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/10 hover:bg-[#E64D16] backdrop-blur-sm border border-white/25 text-white flex items-center justify-center transition-all"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Dots + counter */}
      <div className="absolute z-30 bottom-7 left-1/2 -translate-x-1/2 flex items-center gap-2.5">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => go(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`h-2 rounded-full transition-all duration-300 ${
              i === index ? 'w-8 bg-[#E64D16]' : 'w-2 bg-white/40 hover:bg-white/70'
            }`}
          />
        ))}
      </div>
      <div className="absolute z-30 bottom-6 right-6 sm:right-10 text-white/70 text-xs font-bold tracking-widest">
        {String(index + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}
      </div>
    </section>
  );
}
