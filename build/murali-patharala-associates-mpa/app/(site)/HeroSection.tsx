'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, MapPin, Play, Pause, ArrowRight } from 'lucide-react';

interface HeroSectionProps {
  phone: string;
}

interface VillaSlide {
  image: string;
  tag: string;
  location: string;
  title: string;
  specs: string;
  shortSpecs: string;
}

const VILLA_SLIDES: VillaSlide[] = [
  {
    image: '/images/architecture/hero-villa-twilight.webp',
    tag: 'Completed Turnkey Villa',
    location: 'Boat Club Road',
    title: 'The Cantilever Twilight Villa',
    specs: '5,400 sq.ft • Turnkey Architectural & Civil Execution • G+2',
    shortSpecs: '5,400 sq.ft • G+2 Turnkey Residence',
  },
  {
    image: '/images/architecture/modern-villa-duplex.webp',
    tag: 'Bespoke Luxury Residence',
    location: 'Anna Nagar East',
    title: 'The Contemporary Duplex Villa',
    specs: '4,600 sq.ft • Monolithic Concrete & Teak Louvers • G+1',
    shortSpecs: '4,600 sq.ft • Contemporary Duplex',
  },
  {
    image: '/images/architecture/tropical-modern-villa.webp',
    tag: 'Tropical Modernist Landmark',
    location: 'Kilpauk',
    title: 'The Courtyard Atrium Villa',
    specs: '3,950 sq.ft • Double-Height Living & Private Garden • G+2',
    shortSpecs: '3,950 sq.ft • Courtyard Atrium Villa',
  },
  {
    image: '/images/architecture/luxury-modernist-estate.webp',
    tag: 'Signature Architectural Estate',
    location: 'Poes Garden',
    title: 'The Grand Modernist Estate',
    specs: '6,200 sq.ft • Primary TMT & Imported Marble Finishes • G+2',
    shortSpecs: '6,200 sq.ft • Signature Villa Estate',
  },
  {
    image: '/images/architecture/geometric-villa-elevation.webp',
    tag: 'Contemporary Coastal Villa',
    location: 'ECR Corridor',
    title: 'The Geometric Facade Villa',
    specs: '4,200 sq.ft • Climate-Responsive Shading & Glass Pavilion • G+1',
    shortSpecs: '4,200 sq.ft • Coastal Villa Pavilion',
  },
  {
    image: '/images/hero-villa.webp',
    tag: 'Executive Turnkey Home',
    location: 'Anna Nagar West',
    title: 'The Signature White Villa',
    specs: '4,500 sq.ft • In-House Supervision & 425+ QC Checks • G+2',
    shortSpecs: '4,500 sq.ft • Turnkey White Villa',
  },
];

export default function HeroSection({ phone }: HeroSectionProps) {
  const [current, setCurrent] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  const rawDigits = phone.replace(/\D/g, '');
  const cleanPhone = rawDigits.startsWith('91') ? rawDigits : `91${rawDigits.replace(/^0+/, '')}`;

  const nextSlide = useCallback(() => {
    setCurrent((prev) => (prev + 1) % VILLA_SLIDES.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrent((prev) => (prev - 1 + VILLA_SLIDES.length) % VILLA_SLIDES.length);
  }, []);

  // Slideshow changes every 2.3s and does NOT stop on hover
  useEffect(() => {
    if (!isPlaying) return;
    const timer = setInterval(() => {
      nextSlide();
    }, 2300);
    return () => clearInterval(timer);
  }, [isPlaying, nextSlide]);

  const activeSlide = VILLA_SLIDES[current];

  return (
    <section id="home" className="relative lg:min-h-[85vh] flex items-stretch border-b-4 border-[#111111] bg-white">
      <div className="flex flex-col-reverse lg:grid lg:grid-cols-2 w-full">
        {/* Left Content Column */}
        <div className="px-5 sm:px-8 md:px-12 lg:px-16 py-8 sm:py-12 lg:py-20 flex flex-col justify-center border-b-4 lg:border-b-0 lg:border-r-4 border-[#111111] bg-white z-10">
          {/* Eyebrow Pill */}
          <div className="mb-3 sm:mb-4">
            <span className="text-[10px] sm:text-xs font-bold tracking-[0.2em] uppercase text-[#EA580C] inline-block border-b-2 border-[#EA580C] pb-0.5 sm:pb-1">
              A Residential Construction Company &bull; One-Stop Solution
            </span>
          </div>

          {/* Heading */}
          <h1
            className="text-2xl sm:text-4xl lg:text-5xl font-bold leading-[1.15] lg:leading-[1.12] tracking-tight mb-3 sm:mb-5 text-[#111111]"
            style={{ fontFamily: "'Lora', serif" }}
          >
            We Build Homes Professionally. <br />
            <span className="text-[#EA580C]">High Quality</span> at Reasonable Price.
          </h1>

          {/* Description: Desktop full version */}
          <p className="hidden lg:block text-sm sm:text-base text-[#444444] mb-8 max-w-xl leading-relaxed font-normal">
            Founded in 1998 in Anna Nagar, Chennai, Murali Patharala Associates (MPA) was established to replace contractor uncertainty with architectural discipline. We unite licensed architectural design, civil structural engineering, and modular interior execution under a single accountable contract—backed by transparent fixed prices, 425+ quality checks, and a 10-year structural warranty.
          </p>

          {/* Description: Mobile concise punchy version */}
          <p className="lg:hidden text-xs sm:text-sm text-[#555555] mb-5 leading-relaxed font-medium">
            Chennai&apos;s premier turnkey firm uniting licensed architectural design, civil RCC construction, and bespoke interiors with guaranteed fixed prices and 425+ quality checks.
          </p>

          {/* CTAs Group */}
          <div className="space-y-4 sm:space-y-5">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3.5">
              <a
                href="#packages"
                className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3.5 sm:py-4 bg-[#EA580C] text-white font-bold uppercase tracking-widest text-[11px] sm:text-xs hover:bg-[#111111] transition-all duration-200 shadow-md group text-center"
              >
                <span>Explore Packages</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" />
              </a>
              <a
                href={`https://wa.me/${cleanPhone}?text=${encodeURIComponent(
                  'Hi Murali Patharala Associates (MPA),\nI would like to discuss a residential villa construction project in Chennai.'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 sm:px-7 py-3.5 sm:py-4 bg-white text-[#111111] border-2 border-[#111111] font-bold uppercase tracking-widest text-[11px] sm:text-xs hover:bg-[#111111] hover:text-white transition-all duration-200 shadow-sm text-center"
              >
                <span>WhatsApp Studio</span>
                <span className="text-[#25D366] text-base leading-none">●</span>
              </a>
            </div>

            {/* Trust Micro-Badges */}
            <div className="flex flex-wrap items-center gap-x-4 sm:gap-x-6 gap-y-1.5 text-[11px] sm:text-xs text-[#555555] pt-0.5 sm:pt-1">
              <span className="inline-flex items-center gap-1 font-semibold text-[#111111]">
                <span className="text-[#EA580C] font-bold">✓</span> Fixed Price
              </span>
              <span className="inline-flex items-center gap-1 font-semibold text-[#111111]">
                <span className="text-[#EA580C] font-bold">✓</span> 425+ QC Checks
              </span>
              <span className="inline-flex items-center gap-1 font-semibold text-[#111111]">
                <span className="text-[#EA580C] font-bold">✓</span> 10-Yr Warranty
              </span>
            </div>
          </div>
        </div>

        {/* Right Villa Slideshow Column (Continuous Auto-Play) */}
        <div className="relative h-[360px] sm:h-[460px] lg:h-full lg:min-h-full bg-[#111111] overflow-hidden select-none group">
          {/* Villa Images with Smooth Crossfade */}
          {VILLA_SLIDES.map((slide, idx) => (
            <div
              key={slide.image}
              className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                idx === current ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
              }`}
            >
              <Image
                src={slide.image}
                alt={`${slide.title} - ${slide.location}`}
                fill
                priority={idx === 0}
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              {/* Cinematic Vignette Scrim */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-[#111111]/30 to-black/20" />
            </div>
          ))}

          {/* Top Info Strip */}
          <div className="absolute top-4 sm:top-6 left-4 sm:left-6 right-4 sm:right-6 z-20 flex items-center justify-between gap-2 pointer-events-none">
            <div className="bg-[#111111]/90 backdrop-blur-sm text-white border border-white/20 px-2.5 sm:px-3.5 py-1 sm:py-1.5 text-[9px] sm:text-[10px] font-bold uppercase tracking-widest flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#EA580C] animate-pulse" />
              <span className="hidden sm:inline">Turnkey Villa Projects &bull; Chennai</span>
              <span className="sm:hidden">Turnkey Villas</span>
            </div>

            {/* Controls: Play/Pause Button & Counter */}
            <div className="flex items-center gap-1.5 sm:gap-2 pointer-events-auto">
              <button
                type="button"
                onClick={() => setIsPlaying((p) => !p)}
                className="bg-[#111111]/90 hover:bg-[#EA580C] text-white border border-white/20 px-2 sm:px-2.5 py-1 sm:py-1.5 rounded-sm text-xs transition-all flex items-center gap-1.5 shadow-md group/btn"
                aria-label={isPlaying ? 'Pause slideshow' : 'Play slideshow'}
                title={isPlaying ? 'Pause slideshow' : 'Play slideshow'}
              >
                {isPlaying ? (
                  <Pause className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-current text-[#EA580C] group-hover/btn:text-white" />
                ) : (
                  <Play className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-current text-[#EA580C] group-hover/btn:text-white" />
                )}
                <span className="text-[10px] font-bold uppercase tracking-wider hidden md:inline">
                  {isPlaying ? 'Pause' : 'Play'}
                </span>
              </button>

              <div className="bg-[#111111]/90 backdrop-blur-sm text-white border border-white/20 px-2 sm:px-3 py-1 sm:py-1.5 text-[10px] sm:text-[11px] font-mono font-bold">
                <span className="text-[#EA580C]">0{current + 1}</span>
                <span className="text-white/40"> / </span>
                <span>0{VILLA_SLIDES.length}</span>
              </div>
            </div>
          </div>

          {/* Navigation Arrows: Sleek and subtle */}
          <div className="absolute inset-y-0 left-2 sm:left-4 right-2 sm:right-4 z-20 flex items-center justify-between pointer-events-none">
            <button
              type="button"
              onClick={prevSlide}
              className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[#111111]/70 hover:bg-[#EA580C] text-white flex items-center justify-center border border-white/20 transition-all pointer-events-auto shadow-lg hover:scale-105"
              aria-label="Previous Villa Slide"
            >
              <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
            <button
              type="button"
              onClick={nextSlide}
              className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[#111111]/70 hover:bg-[#EA580C] text-white flex items-center justify-center border border-white/20 transition-all pointer-events-auto shadow-lg hover:scale-105"
              aria-label="Next Villa Slide"
            >
              <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>

          {/* Bottom Caption & Villa Details */}
          <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 md:p-8 z-20 text-white bg-gradient-to-t from-[#111111] via-[#111111]/90 to-transparent">
            <div className="flex items-center gap-1.5 sm:gap-2 mb-1">
              <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.2em] text-[#EA580C] bg-[#EA580C]/15 px-1.5 sm:px-2 py-0.5 border border-[#EA580C]/30 truncate max-w-[150px] sm:max-w-none">
                {activeSlide.tag}
              </span>
              <span className="text-[10px] sm:text-[11px] font-medium text-white/70 flex items-center gap-1">
                <MapPin className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-[#EA580C]" />
                <span>{activeSlide.location}</span>
              </span>
            </div>

            <h3
              className="text-base sm:text-xl md:text-2xl font-bold font-serif tracking-tight text-white mb-0.5 sm:mb-1"
              style={{ fontFamily: "'Lora', serif" }}
            >
              {activeSlide.title}
            </h3>

            <p className="text-[11px] sm:text-xs text-white/80 font-medium tracking-wide">
              <span className="hidden sm:inline">{activeSlide.specs}</span>
              <span className="sm:hidden">{activeSlide.shortSpecs}</span>
            </p>

            {/* Slide Pagination Dots / Progress */}
            <div className="flex items-center gap-1.5 sm:gap-2 pt-2.5 sm:pt-4">
              {VILLA_SLIDES.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setCurrent(idx)}
                  className={`h-1 sm:h-1.5 transition-all duration-300 rounded-full ${
                    idx === current
                      ? 'w-6 sm:w-8 bg-[#EA580C]'
                      : 'w-1.5 sm:w-2 bg-white/40 hover:bg-white/70'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
