'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { useTemplateData } from '../../context/TemplateContext';

interface RealTransformationProps {
  data?: any;
}

export default function RealTransformation({ data }: RealTransformationProps) {
  const { basePath } = useTemplateData();
  // Start on far right (100%) so the raw before image fills the frame on initial load
  const [pos, setPos] = useState<number>(100);
  const containerRef = useRef<HTMLDivElement>(null);
  const animRef = useRef<number | null>(null);
  const hasAnimated = useRef(false);
  const userInteracted = useRef(false);

  const beforeSrc = '/images/architecture/villa-before-frame.webp';
  const afterSrc = '/images/architecture/villa-after-finished.webp';

  const triggerSweep = useCallback(() => {
    if (hasAnimated.current || userInteracted.current) return;
    hasAnimated.current = true;

    setPos(100);

    const startPos = 100;
    const targetPos = 50;
    const duration = 2200; // 2.2s cinematic sweep

    // 700ms pause so the viewer registers the raw structural frame first
    const delayTimer = setTimeout(() => {
      if (userInteracted.current) return;
      const startTime = performance.now();

      const step = (now: number) => {
        if (userInteracted.current) return;
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // easeInOutCubic: gentle departure, smooth sweep, graceful arrival
        const ease =
          progress < 0.5
            ? 4 * progress * progress * progress
            : 1 - Math.pow(-2 * progress + 2, 3) / 2;

        const current = startPos - (startPos - targetPos) * ease;
        setPos(current);

        if (progress < 1) {
          animRef.current = requestAnimationFrame(step);
        }
      };

      animRef.current = requestAnimationFrame(step);
    }, 700);

    return () => clearTimeout(delayTimer);
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    let observer: IntersectionObserver | null = null;
    const setupTimer = setTimeout(() => {
      if (hasAnimated.current || userInteracted.current) return;

      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && entry.intersectionRatio >= 0.15) {
              triggerSweep();
              if (observer) observer.disconnect();
            }
          });
        },
        { threshold: [0.15, 0.35] }
      );

      observer.observe(el);
    }, 250);

    return () => {
      clearTimeout(setupTimer);
      if (observer) (observer as IntersectionObserver).disconnect();
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, [triggerSweep]);

  const handlePointerDown = () => {
    userInteracted.current = true;
    if (animRef.current) cancelAnimationFrame(animRef.current);
  };

  const handleSliderChange = (newVal: number) => {
    userInteracted.current = true;
    if (animRef.current) cancelAnimationFrame(animRef.current);
    setPos(newVal);
  };

  return (
    <section className="py-24 px-6 bg-[var(--bg)] border-b border-[var(--border)] relative overflow-hidden">
      <div ref={containerRef} className="max-w-[1280px] mx-auto">
        {/* Centered narrative header */}
        <div className="max-w-2xl mx-auto text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[var(--border)] bg-[var(--surface-2)] mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[#2563eb]" />
            <span className="font-mono text-[11px] text-[var(--muted)] tracking-widest uppercase">
              Real Transformation
            </span>
          </div>

          <h2
            className="text-4xl md:text-5xl font-light tracking-tight text-[var(--text)] leading-[1.1] mb-5"
            style={{ fontFamily: 'var(--serif-font)' }}
          >
            From raw topography to a{' '}
            <span className="italic text-[#2563eb]">completed landmark</span>
          </h2>

          <p className="text-[var(--muted)] text-base md:text-lg leading-relaxed">
            See how our structural engineering, spacious shaded verandas, and double-glazed curtain walls transform raw topography into a luminous, climate-responsive estate.
          </p>
        </div>

        {/* Full-width before/after interactive slider */}
        <div className="w-full">
          <div
            className="relative rounded-3xl overflow-hidden aspect-[16/10] md:aspect-[16/9] shadow-[0_24px_60px_rgba(0,0,0,0.12)] select-none border border-[var(--border)]"
            onPointerDown={handlePointerDown}
          >
            {/* Before: Raw RCC Structure */}
            <img
              src={beforeSrc}
              alt="Raw structural RCC frame"
              className="absolute inset-0 w-full h-full object-cover pointer-events-none"
            />
            {/* After: Completed Landmark (Clipped from left at pos%) */}
            <img
              src={afterSrc}
              alt="Completed architectural landmark"
              className="absolute inset-0 w-full h-full object-cover pointer-events-none"
              style={{ clipPath: `inset(0 0 0 ${pos}%)` }}
            />

            <span className="absolute top-3 md:top-5 left-2 max-[379px]:left-3 md:left-5 z-[3] text-[8.5px] max-[379px]:text-[7.5px] max-[379px]:tracking-[0.02em] max-[379px]:px-2 max-[379px]:py-1 md:text-[10.5px] font-bold tracking-[0.06em] max-[379px]:tracking-[0.02em] md:tracking-[0.14em] uppercase px-2 max-[379px]:px-2 md:px-3.5 py-1.5 rounded-full bg-slate-950/75 text-white backdrop-blur-sm border border-white/10 pointer-events-none">
              Topography &amp; Shell
            </span>
            <span className="absolute top-3 md:top-5 right-2 max-[379px]:right-3 md:right-5 z-[3] text-[8.5px] max-[379px]:text-[7.5px] max-[379px]:tracking-[0.02em] max-[379px]:px-2 max-[379px]:py-1 md:text-[10.5px] font-bold tracking-[0.06em] max-[379px]:tracking-[0.02em] md:tracking-[0.14em] uppercase px-2 max-[379px]:px-2 md:px-3.5 py-1.5 rounded-full bg-[#2563eb] text-white shadow-md pointer-events-none">
              Completed Landmark
            </span>

            {/* Divider line & handle */}
            <div
              className="absolute top-0 bottom-0 w-[3px] bg-white -translate-x-1/2 shadow-[0_0_20px_rgba(0,0,0,0.4)] pointer-events-none z-[4]"
              style={{ left: `${pos}%` }}
            >
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[46px] h-[46px] md:w-[52px] md:h-[52px] rounded-full bg-[#2563eb] grid place-items-center text-white font-extrabold text-[15px] shadow-[0_8px_20px_rgba(37,99,235,0.4)] border-2 border-white">
                ↔
              </div>
            </div>

            <input
              type="range"
              min={0}
              max={100}
              step={0.1}
              value={pos}
              onPointerDown={handlePointerDown}
              onTouchStart={handlePointerDown}
              onMouseDown={handlePointerDown}
              onChange={(e) => handleSliderChange(Number(e.target.value))}
              aria-label="Drag to compare before and after"
              className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-[10]"
            />
          </div>
          <p className="text-center text-xs text-[var(--muted)] mt-3.5 font-medium">
            Drag slider to compare raw structural RCC frame vs completed architectural landmark
          </p>
        </div>

        {/* Stats + CTA row */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-5 md:gap-8">
          <div className="bg-[var(--surface-card)] border border-[var(--border)] rounded-2xl px-5 py-3 shadow-sm">
            <b className="text-2xl font-bold text-[#2563eb] mr-3">10-Year</b>
            <span className="text-xs text-[var(--muted)] uppercase tracking-wider font-semibold">
              Structural Warranty
            </span>
          </div>
          <div className="bg-[var(--surface-card)] border border-[var(--border)] rounded-2xl px-5 py-3 shadow-sm">
            <b className="text-2xl font-bold text-[#2563eb] mr-3">100%</b>
            <span className="text-xs text-[var(--muted)] uppercase tracking-wider font-semibold">
              Fe550D TMT Steel
            </span>
          </div>
          <Link
            href={`${basePath}/appointment`}
            className="inline-flex items-center gap-2 text-sm font-semibold tracking-wider uppercase text-[#2563eb] border-b-2 border-[#2563eb] pb-1 hover:gap-3.5 transition-all"
          >
            Get a feasibility report for your plot <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
