'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, MapPin } from 'lucide-react';

export interface MarqueeProject {
  image: string;
  title: string;
  location: string;
}

const projects: MarqueeProject[] = [
  { image: '/images/architecture/modern-villa-duplex.webp', title: 'MPA Signature Duplex Villa', location: 'Anna Nagar East' },
  { image: '/images/architecture/geometric-villa-elevation.webp', title: 'Geometric Parametric Facade', location: 'Anna Nagar' },
  { image: '/images/architecture/hero-villa-twilight.webp', title: 'Dusk Contemporary Villa', location: 'Chennai' },
  { image: '/images/architecture/linear-pool-pavilion.webp', title: 'Poolside Luxury Villa', location: 'ECR, Chennai' },
  { image: '/images/architecture/villa-after-finished.webp', title: 'White Modern Residence', location: 'Neelankarai' },
  { image: '/images/architecture/monolithic-brutalist-facade.webp', title: 'Contemporary Facade Home', location: 'Injambakkam' },
  { image: '/images/architecture/courtyard-water-residence.webp', title: 'Courtyard Villa Elevation', location: 'Velachery' },
  { image: '/images/architecture/tropical-modern-villa.webp', title: 'Tropical Modern Turnkey Villa', location: 'Kilpauk' },
];

export default function ProjectMarquee() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    if (paused) {
      el.style.animationPlayState = 'paused';
    } else {
      el.style.animationPlayState = 'running';
    }
  }, [paused]);

  const scrollByAmount = (dir: number) => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.querySelector('div[data-card]') as HTMLElement | null;
    const w = card ? card.offsetWidth + 24 : 340;
    el.scrollLeft += dir * w * 2;
  };

  return (
    <section className="relative w-full bg-white border-y border-stone-200 py-14 sm:py-16 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 flex flex-wrap items-end justify-between gap-4 mb-10">
        <div className="space-y-3 max-w-2xl">
          <div className="flex items-center gap-2.5">
            <span className="w-8 h-[3px] bg-[#E64D16]" />
            <span className="text-[11px] font-extrabold tracking-[0.22em] uppercase text-[#E64D16]">
              Delivered Across Chennai
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-stone-900 tracking-tight">
            Our Completed Projects
          </h2>
        </div>
        <div className="hidden sm:flex items-center gap-2">
          <button
            onClick={() => scrollByAmount(-1)}
            aria-label="Scroll projects left"
            className="w-11 h-11 rounded-full border border-stone-300 text-stone-700 hover:bg-[#E64D16] hover:border-[#E64D16] hover:text-white flex items-center justify-center transition-all"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => scrollByAmount(1)}
            aria-label="Scroll projects right"
            className="w-11 h-11 rounded-full border border-stone-300 text-stone-700 hover:bg-[#E64D16] hover:border-[#E64D16] hover:text-white flex items-center justify-center transition-all"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div
        className="marquee-viewport relative"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <div className="marquee-fade-left" />
        <div className="marquee-fade-right" />
        <div ref={trackRef} className={`marquee-track ${paused ? 'paused' : ''}`}>
          {[...projects, ...projects].map((p, i) => (
            <div
              key={i}
              data-card
              className="marquee-card group relative shrink-0 w-[360px] sm:w-[440px] aspect-[4/3] overflow-hidden bg-stone-200"
            >
              <Image
                src={p.image}
                alt={p.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
                sizes="440px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1A1B1A]/85 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                <h4 className="font-bold text-sm leading-tight">{p.title}</h4>
                <div className="flex items-center gap-1.5 text-[11px] text-[#E6C673] font-semibold mt-1">
                  <MapPin className="w-3 h-3 text-[#E64D16]" />
                  <span>{p.location}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
