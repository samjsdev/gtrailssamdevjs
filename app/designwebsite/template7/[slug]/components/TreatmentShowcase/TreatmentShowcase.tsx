"use client";

import React, { useState, useRef, useEffect, useCallback } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const ICONS = ['🛋️', '🍳', '🛏️', '💻', '🌿'];
const ACCENTS = ['#3b82f6', '#f59e0b', '#8b5cf6', '#10b981', '#06b6d4'];

const CYCLE_DURATION = 3500; // ms per slide

export default function TreatmentShowcase({ data }: { data?: any }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState<number | null>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);

  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useRef(false);
  const animFrameRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number | null>(null);
  const elapsedTimeRef = useRef<number>(0);

  const sectionTitle = data?.gallery?.exploreTitle || 'Explore Our Designs';
  const services = data?.business?.services?.length ? data.business.services : ['Living Room Design', 'Modern Kitchens', 'Bedroom Styling', 'Home Office', 'Outdoor Spaces'];
  const dataImages = data?.media?.otherImages?.filter(Boolean) || [];
  
  const images = dataImages.length > 1 ? dataImages.slice(1, 6) : [
    '/images/stock/7617327a.webp',
    '/images/stock/bf333360.webp',
    '/images/stock/84fea9c5.webp',
    '/images/stock/284d6d29.webp',
    '/images/stock/13246fc0.webp'
  ];

  const treatments = services.slice(0, 5).map((srv: string, i: number) => ({
    id: `service-${i}`,
    label: srv,
    imagePath: images[i] || images[0],
    icon: ICONS[i % ICONS.length],
    accent: ACCENTS[i % ACCENTS.length]
  }));

  const activeTreatment = treatments[activeIndex];

  // IntersectionObserver for auto-play only when in view
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        isInView.current = entry.isIntersecting && entry.intersectionRatio >= 0.25;
        if (!isInView.current) {
          // Reset time tracking when leaving view
          lastTimeRef.current = null;
        }
      },
      { threshold: [0, 0.25, 0.5] }
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Auto-cycle with requestAnimationFrame for smooth progress
  const advanceSlide = useCallback(() => {
    setPrevIndex(activeIndex);
    setActiveIndex((prev) => (prev + 1) % treatments.length);
    setProgress(0);
    elapsedTimeRef.current = 0;
    lastTimeRef.current = null;
  }, [activeIndex]);

  useEffect(() => {
    const tick = (timestamp: number) => {
      if (!isInView.current || isPaused) {
        lastTimeRef.current = null; // Stop tracking time while paused
        animFrameRef.current = requestAnimationFrame(tick);
        return;
      }

      if (lastTimeRef.current === null) {
        lastTimeRef.current = timestamp;
      }

      const delta = timestamp - lastTimeRef.current;
      lastTimeRef.current = timestamp;
      
      elapsedTimeRef.current += delta;
      
      const pct = Math.min(elapsedTimeRef.current / CYCLE_DURATION, 1);
      setProgress(pct);

      if (pct >= 1) {
        advanceSlide();
      }

      animFrameRef.current = requestAnimationFrame(tick);
    };

    animFrameRef.current = requestAnimationFrame(tick);
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [isPaused, advanceSlide]);

  // Clear prevIndex after transition completes
  useEffect(() => {
    if (prevIndex !== null) {
      const timer = setTimeout(() => setPrevIndex(null), 600);
      return () => clearTimeout(timer);
    }
  }, [prevIndex]);

  const handleSelect = (index: number) => {
    if (index === activeIndex) return;
    setPrevIndex(activeIndex);
    setActiveIndex(index);
    setProgress(0);
    elapsedTimeRef.current = 0;
    lastTimeRef.current = null;
  };

  // GSAP entrance animations
  useGSAP(() => {
    if (!sectionRef.current) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    gsap.fromTo(['.treatment-showcase-badge', '.treatment-showcase-title'],
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.treatment-showcase-title',
          start: 'top 85%',
          toggleActions: 'play none none none'
        }
      }
    );

    const buttons = sectionRef.current.querySelectorAll('.treatment-btn');
    if (buttons.length) {
      gsap.fromTo(buttons,
        { opacity: 0, x: -20 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          stagger: 0.08,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: buttons[0],
            start: 'top 85%',
            toggleActions: 'play none none none'
          }
        }
      );
    }

    const viewerContainer = sectionRef.current.querySelector('.treatment-viewer-container');
    if (viewerContainer) {
      gsap.fromTo(viewerContainer,
        { opacity: 0, y: 40, scale: 0.98 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: viewerContainer,
            start: 'top 80%',
            toggleActions: 'play none none none'
          }
        }
      );
    }

  }, { scope: sectionRef });

  return (
    <section
      className="relative py-24 overflow-hidden bg-[var(--surface-2)]"
      ref={sectionRef}
    >
      {/* Background Glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full bg-[var(--glow)] blur-[120px] opacity-60" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full bg-[var(--glow-2)] blur-[100px] opacity-60" />
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="treatment-showcase-badge inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-6">
            <span className="w-2 h-2 rounded-full bg-[var(--accent-2)] animate-pulse"></span>
            <span className="text-sm font-semibold text-[var(--accent)] uppercase tracking-wider">Our Services</span>
          </span>
          <h2 className="treatment-showcase-title text-4xl md:text-5xl lg:text-6xl font-bold text-[var(--text)] tracking-tight">
            {sectionTitle}
          </h2>
        </div>

        <div className="grid lg:grid-cols-[1fr_2.5fr] gap-12 items-center">
          {/* Treatment Selection */}
          <div className="space-y-3">
            {treatments.map((treatment: any, index: number) => {
              const isActive = index === activeIndex;
              return (
                <button
                  key={treatment.id}
                  className={`treatment-btn group w-full flex items-center gap-4 p-5 rounded-2xl border transition-all duration-300 text-left relative overflow-hidden
                    ${isActive
                      ? 'bg-[var(--accent)] border-[var(--accent)] text-white shadow-lg shadow-blue-500/20'
                      : 'glass-card text-[var(--text)] border-transparent hover:border-[var(--accent-2)] hover:bg-white/80'}`}
                  onClick={() => handleSelect(index)}
                >
                  {/* Progress bar for active item */}
                  {isActive && (
                    <div className="absolute bottom-0 left-0 h-[3px] bg-white/40 transition-none"
                      style={{ width: `${progress * 100}%` }}
                    />
                  )}

                  <span className={`flex items-center justify-center w-12 h-12 rounded-xl text-2xl transition-all duration-300
                    ${isActive
                      ? 'bg-white/20 scale-110'
                      : 'bg-[var(--surface-2)] group-hover:bg-white group-hover:scale-105'}`}>
                    {treatment.icon}
                  </span>

                  <div className="flex-1 min-w-0">
                    <span className="text-lg font-semibold block">{treatment.label}</span>
                    {isActive && (
                      <span className="text-xs text-white/70 font-medium mt-0.5 block animate-fade-in">
                        {isPaused ? 'Paused — hover off to resume' : 'Auto-playing…'}
                      </span>
                    )}
                  </div>

                  <svg
                    className={`w-6 h-6 ml-auto transition-all duration-300 flex-shrink-0 ${isActive ? 'rotate-0 opacity-100' : '-rotate-45 opacity-0 group-hover:opacity-100 group-hover:rotate-0'}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </button>
              );
            })}

            {/* Slide counter */}
            <div className="flex items-center justify-center gap-2 pt-4">
              {treatments.map((_: any, idx: number) => (
                <button
                  key={idx}
                  onClick={() => handleSelect(idx)}
                  className={`rounded-full transition-all duration-300 ${idx === activeIndex ? 'w-8 h-2 bg-[var(--accent)]' : 'w-2 h-2 bg-slate-300 hover:bg-slate-400'}`}
                  aria-label={`Go to design ${idx + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Viewer with crossfade */}
          <div className="relative">
            <div 
              className="treatment-viewer-container relative rounded-[32px] glass-card overflow-hidden"
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
            >
              {/* Animated accent glow that changes color */}
              <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] opacity-20 rounded-full blur-[80px] pointer-events-none z-0 transition-colors duration-700"
                style={{ backgroundColor: activeTreatment.accent }}
              />

              <div className="h-[500px] md:h-[650px] w-full relative z-10">
                {/* Previous image (fading out) */}
                {prevIndex !== null && (
                  <div className="absolute inset-0 z-10 animate-fade-out">
                    <Image
                      src={treatments[prevIndex].imagePath}
                      alt={treatments[prevIndex].label}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}

                {/* Active image (fading in) */}
                <div className={`absolute inset-0 z-20 ${prevIndex !== null ? 'animate-fade-in' : ''}`}>
                  <Image
                    src={activeTreatment.imagePath}
                    alt={activeTreatment.label}
                    fill
                    className="object-cover"
                    priority
                  />
                </div>

                {/* Gradient overlay */}
                <div className="absolute inset-0 z-30 bg-gradient-to-t from-black/50 via-transparent to-black/10 pointer-events-none" />
              </div>

              {/* Active Treatment Label */}
              <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between z-40">
                <div
                  className="px-5 py-3 rounded-full text-white font-semibold shadow-lg transition-colors duration-500 flex items-center gap-2"
                  style={{ backgroundColor: activeTreatment.accent }}
                >
                  <span className="text-lg">{activeTreatment.icon}</span>
                  {activeTreatment.label}
                </div>
                <div className="px-4 py-2 rounded-full glass-card text-white text-sm font-semibold backdrop-blur-md border border-white/20">
                  {activeIndex + 1} / {treatments.length}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CSS animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(1.05); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes fadeOut {
          from { opacity: 1; }
          to { opacity: 0; }
        }
        .animate-fade-in {
          animation: fadeIn 0.6s ease-out forwards;
        }
        .animate-fade-out {
          animation: fadeOut 0.6s ease-out forwards;
        }
      `}</style>
    </section>
  );
}
