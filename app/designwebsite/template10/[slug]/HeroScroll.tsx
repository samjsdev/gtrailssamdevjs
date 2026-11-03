'use client';

import { useState } from 'react';
import { Montserrat } from 'next/font/google';
import { useLenis } from 'lenis/react';
import { ChevronDown } from 'lucide-react';

const montserrat = Montserrat({ subsets: ['latin'], weight: ['300', '400', '500', '600'] });

interface HeroScrollProps {
  cleanName: string;
}

export default function HeroScroll({ cleanName }: HeroScrollProps) {
  const [scrollY, setScrollY] = useState(0);

  const lenis = useLenis(({ scroll }) => {
    setScrollY(scroll);
  });

  const handleExploreClick = () => {
    if (lenis) {
      lenis.scrollTo(window.innerHeight, { duration: 1.4 });
    } else {
      window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
    }
  };

  // Parallax calculations
  const videoTranslate = scrollY * 0.35;
  const videoScale = Math.min(1.15, 1 + scrollY * 0.00025);
  const textTranslate = -scrollY * 0.22;
  const textOpacity = Math.max(0, 1 - scrollY / 460);
  const hintOpacity = Math.max(0, 1 - scrollY / 100);

  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-black select-none">
      {/* Fullscreen Video / Visual Background with Parallax */}
      <div
        className="absolute inset-0 z-0 will-change-transform"
        style={{
          transform: `translate3d(0, ${videoTranslate}px, 0) scale(${videoScale})`,
          transformOrigin: 'center center',
        }}
      >
        <video
          autoPlay
          muted
          loop
          playsInline
          poster="/images/architecture/hero-villa-twilight.webp"
          className="w-full h-full object-cover opacity-75"
        >
          <source src="https://aparnakaushik.com/frontend/assets/images/homepage.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/20 to-black/65" />
      </div>

      {/* Minimalist Centered Atelier Crest with Parallax and Fade */}
      <div
        className="relative z-10 text-center px-6 max-w-4xl mx-auto flex flex-col items-center will-change-transform"
        style={{
          transform: `translate3d(0, ${textTranslate}px, 0)`,
          opacity: textOpacity,
        }}
      >
        <span className="w-14 h-14 border border-white/40 text-white grid place-items-center text-[24px] font-light mb-6 tracking-widest transition-transform duration-700 hover:scale-105">
          {(cleanName || 'A').charAt(0).toUpperCase()}
        </span>
        <h1
          className={`${montserrat.className} text-[26px] sm:text-[38px] md:text-[48px] uppercase font-light tracking-[0.24em] text-white leading-tight`}
        >
          {cleanName || 'Aparna Kaushik'}
        </h1>
        <p className="mt-3 text-[11px] sm:text-[12px] tracking-[0.38em] uppercase text-white/80 font-light">
          Architecture · Interior Architecture · Turnkey Construction
        </p>
      </div>

      {/* Bottom subtle scroll hint - Interactive Smooth Scroll Trigger */}
      <button
        onClick={handleExploreClick}
        aria-label="Scroll down to explore"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 text-white/70 hover:text-white text-[9.5px] tracking-[0.3em] uppercase font-light flex flex-col items-center gap-1.5 transition-all duration-300 cursor-pointer group"
        style={{
          opacity: hintOpacity,
          pointerEvents: hintOpacity < 0.1 ? 'none' : 'auto',
        }}
      >
        <span className="group-hover:tracking-[0.36em] transition-all">Scroll to explore</span>
        <ChevronDown className="w-3.5 h-3.5 animate-bounce text-white/60 group-hover:text-white" />
      </button>
    </section>
  );
}
