'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Compass, Sparkles } from 'lucide-react';

export type SeriesTheme = {
  img: string;
  name: string;
  desc: string;
};

interface CurtainHorizontalSliderProps {
  themes: SeriesTheme[];
  collection?: string;
  basePath?: string;
}

export default function CurtainHorizontalSlider({
  themes,
  collection = 'Design Series',
  basePath = '',
}: CurtainHorizontalSliderProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [curtainOpen, setCurtainOpen] = useState(false);
  const [mousePos, setMousePos] = useState<{ x: number; y: number } | null>(null);
  const [hoverSide, setHoverSide] = useState<'left' | 'right' | null>(null);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const total = themes.length;

  const nextSlide = useCallback(() => {
    setActiveIndex((prev) => (prev < total - 1 ? prev + 1 : 0));
  }, [total]);

  const prevSlide = useCallback(() => {
    setActiveIndex((prev) => (prev > 0 ? prev - 1 : total - 1));
  }, [total]);

  // Observer to trigger the curtain open effect once in viewport
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setCurtainOpen(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Detect touch device
  useEffect(() => {
    setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') nextSlide();
      if (e.key === 'ArrowLeft') prevSlide();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextSlide, prevSlide]);

  // Track cursor position and side
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isTouchDevice) return;
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMousePos({ x, y });

    if (x < rect.width / 2) {
      setHoverSide('left');
    } else {
      setHoverSide('right');
    }
  };

  const handleMouseLeave = () => {
    setMousePos(null);
    setHoverSide(null);
  };

  // Click on left/right half (Aparna Kaushik signature interaction)
  const handleContainerClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // Avoid triggering slide if clicked directly on an interactive button or anchor
    const target = e.target as HTMLElement;
    if (target.closest('a') || target.closest('button')) return;

    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;

    const clickX = e.clientX - rect.left;
    if (clickX < rect.width / 2) {
      prevSlide();
    } else {
      nextSlide();
    }
  };

  // Touch swipe support
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const diff = touchStartX.current - touchEndX.current;
    if (Math.abs(diff) > 50) {
      if (diff > 0) nextSlide();
      else prevSlide();
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  return (
    <div className="relative w-full overflow-hidden bg-[#17130f] select-none">
      {/* Outer Container */}
      <div
        ref={containerRef}
        onClick={handleContainerClick}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        className="relative min-h-[640px] md:min-h-[760px] lg:min-h-[820px] w-full flex items-center justify-center overflow-hidden cursor-pointer group"
      >
        {/* Background Images Slider Track */}
        <div
          className="absolute inset-0 flex transition-transform duration-[1200ms]"
          style={{
            transform: `translateX(-${(activeIndex * 100) / total}%)`,
            transitionTimingFunction: 'cubic-bezier(0.25, 1, 0.5, 1)',
            width: `${total * 100}%`,
          }}
        >
          {themes.map((theme, idx) => (
            <div
              key={theme.name}
              className="relative h-full w-full shrink-0 overflow-hidden"
              style={{ width: `${100 / total}%` }}
            >
              <img
                src={theme.img}
                alt={theme.name}
                className="w-full h-full object-cover object-center transition-transform duration-[1800ms] ease-out"
                style={{
                  transform: activeIndex === idx ? 'scale(1.04)' : 'scale(1.15)',
                }}
              />
              {/* Luxury Obsidian Gradient Overlay with rich visibility */}
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(23,19,15,0.55)_0%,rgba(23,19,15,0.25)_45%,rgba(23,19,15,0.88)_100%)]" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(23,19,15,0.05)_0%,rgba(23,19,15,0.6)_100%)]" />
            </div>
          ))}
        </div>

        {/* Ambient Top Studio Brand Mark */}
        <div className="absolute top-8 left-8 md:left-12 z-20 flex items-center gap-3">
          <span className="w-2 h-2 rounded-full bg-[#d9c49a] animate-pulse" />
          <span className="text-[11px] tracking-[0.34em] uppercase text-[#d9c49a] font-semibold">
            {collection}
          </span>
          <span className="text-white/40 text-[12px] font-mono">/ {String(activeIndex + 1).padStart(2, '0')}</span>
        </div>

        {/* Top Right Quick Controls */}
        <div className="absolute top-8 right-8 md:right-12 z-20 flex items-center gap-3">
          <button
            onClick={(e) => {
              e.stopPropagation();
              prevSlide();
            }}
            aria-label="Previous narrative"
            className="w-10 h-10 rounded-full border border-white/20 bg-black/30 backdrop-blur-md text-white flex items-center justify-center hover:bg-[#d9c49a] hover:text-[#17130f] hover:border-[#d9c49a] transition-all duration-300"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              nextSlide();
            }}
            aria-label="Next narrative"
            className="w-10 h-10 rounded-full border border-white/20 bg-black/30 backdrop-blur-md text-white flex items-center justify-center hover:bg-[#d9c49a] hover:text-[#17130f] hover:border-[#d9c49a] transition-all duration-300"
          >
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Center Typographic Narrative Track (Aparna Kaushik Section 5 typography) */}
        <div className="relative z-10 w-full max-w-[1240px] mx-auto px-6 md:px-12 pointer-events-none">
          <div className="overflow-hidden py-12">
            <div
              className="flex transition-transform duration-[1200ms]"
              style={{
                transform: `translateX(-${activeIndex * 100}%)`,
                transitionTimingFunction: 'cubic-bezier(0.25, 1, 0.5, 1)',
              }}
            >
              {themes.map((theme, idx) => {
                const isActive = activeIndex === idx;
                return (
                  <div
                    key={theme.name}
                    className="w-full shrink-0 flex flex-col items-center text-center transition-all duration-[900ms]"
                    style={{
                      transform: isActive ? 'scale(1)' : 'scale(0.85)',
                      opacity: isActive ? 1 : 0.25,
                    }}
                  >
                    {/* Chapter Number Badge */}
                    <div className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.3em] uppercase text-[#d9c49a] mb-4">
                      <Compass className="w-3.5 h-3.5" />
                      <span>Movement 0{idx + 1}</span>
                    </div>

                    {/* Massive Editorial Headline */}
                    <h2 className="font-[family-name:var(--font-cormorant)] text-[clamp(40px,6.5vw,88px)] font-light text-white leading-[1.04] tracking-[-0.01em] max-w-[960px] mb-5">
                      {theme.name}
                    </h2>

                    {/* Poetic Description */}
                    <p className="text-white/80 text-[16px] md:text-[18px] font-light max-w-[620px] leading-relaxed mb-8">
                      {theme.desc}
                    </p>

                    {/* CTA Link */}
                    {basePath && (
                      <div className="pointer-events-auto">
                        <Link
                          href={`${basePath}/contact`}
                          onClick={(e) => e.stopPropagation()}
                          className="inline-flex items-center gap-2 bg-[#a4532f] text-white text-[11px] font-semibold tracking-[0.22em] uppercase px-7 py-3.5 transition-all duration-300 hover:bg-[#854021] hover:scale-105 shadow-[0_12px_32px_rgba(0,0,0,0.4)]"
                        >
                          Commission This Living Narrative
                          <Sparkles className="w-3.5 h-3.5 text-[#d9c49a]" />
                        </Link>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bottom Slide Indicators & Progress Bar */}
        <div className="absolute bottom-8 left-8 right-8 md:left-12 md:right-12 z-20 flex flex-col sm:flex-row items-center justify-between gap-4 pointer-events-none">
          {/* Numbers Navigation */}
          <div className="flex items-center gap-3 pointer-events-auto">
            {themes.map((theme, idx) => (
              <button
                key={theme.name}
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveIndex(idx);
                }}
                className={`text-[12px] font-mono tracking-widest px-2.5 py-1 rounded transition-all duration-300 ${
                  activeIndex === idx
                    ? 'text-[#17130f] bg-[#d9c49a] font-semibold scale-105 shadow-md'
                    : 'text-white/50 hover:text-white hover:bg-white/10'
                }`}
              >
                0{idx + 1}
              </button>
            ))}
          </div>

          {/* Progress Line */}
          <div className="w-full sm:w-64 h-[2px] bg-white/15 relative overflow-hidden rounded-full">
            <div
              className="absolute top-0 bottom-0 left-0 bg-[#d9c49a] transition-all duration-700 ease-out"
              style={{
                width: `${((activeIndex + 1) / total) * 100}%`,
              }}
            />
          </div>

          <div className="text-[11px] uppercase tracking-[0.24em] text-white/50 hidden md:block">
            Click Left/Right to Navigate
          </div>
        </div>

        {/* Custom Aparna Kaushik Magnetic Cursor Pill */}
        {mousePos && !isTouchDevice && hoverSide && (
          <div
            className="fixed pointer-events-none z-50 transform -translate-x-1/2 -translate-y-1/2 transition-transform duration-75 ease-out"
            style={{
              left: `${mousePos.x + (containerRef.current?.getBoundingClientRect().left || 0)}px`,
              top: `${mousePos.y + (containerRef.current?.getBoundingClientRect().top || 0)}px`,
            }}
          >
            <div className="flex items-center gap-2 bg-[#d9c49a] text-[#17130f] text-[11px] font-semibold tracking-[0.2em] uppercase px-4 py-2 rounded-full shadow-[0_10px_28px_rgba(0,0,0,0.5)] border border-white/40 animate-in fade-in zoom-in-90 duration-150">
              {hoverSide === 'left' ? (
                <>
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Prev</span>
                </>
              ) : (
                <>
                  <span>Next</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </>
              )}
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* THE APARNA KAUSHIK SIGNATURE CENTER CURTAIN OPEN ANIMATION    */}
        {/* ============================================================ */}
        {/* Left Curtain Door */}
        <div
          className="absolute top-0 left-0 bottom-0 z-40 bg-[#17130f] border-r border-[#d9c49a]/30 pointer-events-none transition-transform"
          style={{
            width: '50.2%',
            transform: curtainOpen ? 'translateX(-100%)' : 'translateX(0%)',
            transitionDuration: '1400ms',
            transitionTimingFunction: 'cubic-bezier(0.77, 0, 0.175, 1)',
          }}
        >
          {/* Decorative gold monogram on curtain */}
          <div className="absolute top-1/2 right-6 -translate-y-1/2 flex flex-col items-end opacity-40">
            <span className="font-[family-name:var(--font-cormorant)] text-[28px] text-[#d9c49a] italic">Atelier</span>
            <span className="w-12 h-px bg-[#d9c49a]/50 mt-1" />
          </div>
        </div>

        {/* Right Curtain Door */}
        <div
          className="absolute top-0 right-0 bottom-0 z-40 bg-[#17130f] border-l border-[#d9c49a]/30 pointer-events-none transition-transform"
          style={{
            width: '50.2%',
            transform: curtainOpen ? 'translateX(100%)' : 'translateX(0%)',
            transitionDuration: '1400ms',
            transitionTimingFunction: 'cubic-bezier(0.77, 0, 0.175, 1)',
          }}
        >
          {/* Decorative gold monogram on curtain */}
          <div className="absolute top-1/2 left-6 -translate-y-1/2 flex flex-col items-start opacity-40">
            <span className="font-[family-name:var(--font-cormorant)] text-[28px] text-[#d9c49a] italic">Living</span>
            <span className="w-12 h-px bg-[#d9c49a]/50 mt-1" />
          </div>
        </div>

        {/* Central Luminous Seam Line that fades as curtains part */}
        <div
          className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-0.5 bg-[#d9c49a] z-50 pointer-events-none transition-opacity duration-1000"
          style={{
            opacity: curtainOpen ? 0 : 0.9,
          }}
        />
      </div>
    </div>
  );
}
