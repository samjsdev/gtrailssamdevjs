'use client';

import { useState, useRef, useEffect, useCallback } from 'react';

interface BeforeAfterProps {
  image?: string;
  beforeImage?: string;
  afterImage?: string;
  caption?: string;
}

export default function BeforeAfter({ image, beforeImage, afterImage, caption }: BeforeAfterProps) {
  // Start on far right (100%) so the raw before plan sketch fills the frame on initial load
  const [pos, setPos] = useState<number>(100);
  const containerRef = useRef<HTMLDivElement>(null);
  const animRef = useRef<number | null>(null);
  const hasAnimated = useRef(false);
  const userInteracted = useRef(false);

  const beforeSrc = beforeImage || image || '/images/architecture/villa-plan-sketch.webp';
  const afterSrc = afterImage || image || '/images/architecture/villa-after-finished.webp';

  const triggerSweep = useCallback(() => {
    if (hasAnimated.current || userInteracted.current) return;
    hasAnimated.current = true;

    setPos(100);

    const startPos = 100;
    const targetPos = 50;
    const duration = 2200; // 2.2s cinematic sweep

    // 700ms pause so the viewer registers the plan sketch first
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
    <div ref={containerRef} className="w-full">
      {/* Mobile Badges (Above image) */}
      <div className="flex sm:hidden items-center justify-between mb-4 mt-2">
        <span className="text-[10px] font-bold tracking-widest uppercase bg-[#111111] text-white px-3 py-1.5">
          Plan Sketch
        </span>
        <span className="text-[10px] font-bold tracking-widest uppercase bg-[#EA580C] text-[#111111] px-3 py-1.5 shadow-sm">
          Completed Project
        </span>
      </div>

      <div
        className="relative overflow-hidden aspect-[16/10] sm:aspect-[16/9.5] shadow-2xl select-none border-y-4 border-x-0 sm:border-4 border-[#111111] bg-[#111111] -mx-6 w-[calc(100%+3rem)] sm:mx-0 sm:w-full"
        onPointerDown={handlePointerDown}
      >
        {/* Before: Plan Sketch (Underneath) */}
        <img
          src={beforeSrc}
          alt="Architectural plan sketch and blueprint"
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        />

        {/* After: Completed Project (Clipped from left at pos%) */}
        <img
          src={afterSrc}
          alt="Completed architectural project"
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
          style={{ clipPath: `inset(0 0 0 ${pos}%)` }}
        />

        {/* Badges (Desktop Only) */}
        <span className="hidden sm:block absolute top-4 sm:top-5 left-3 sm:left-5 z-[3] text-[9px] sm:text-[11px] font-bold tracking-widest uppercase px-3.5 py-1.5 bg-[#111111]/90 text-white backdrop-blur-sm border border-white/20 pointer-events-none">
          Plan Sketch
        </span>
        <span className="hidden sm:block absolute top-4 sm:top-5 right-3 sm:right-5 z-[3] text-[9px] sm:text-[11px] font-bold tracking-widest uppercase px-3.5 py-1.5 bg-[#EA580C] text-[#111111] font-extrabold shadow-md pointer-events-none">
          Completed Project
        </span>

        {/* Divider line & handle */}
        <div
          className="absolute top-0 bottom-0 w-[3px] bg-white -translate-x-1/2 shadow-[0_0_25px_rgba(0,0,0,0.6)] pointer-events-none z-[4]"
          style={{ left: `${pos}%` }}
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[46px] h-[46px] sm:w-[54px] sm:h-[54px] rounded-full bg-[#EA580C] grid place-items-center text-[#111111] text-[18px] font-extrabold shadow-[0_8px_24px_rgba(0,0,0,0.4)] border-2 border-white">
            ↔
          </div>
        </div>

        {/* Interactive range input overlay */}
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
          aria-label="Drag to compare plan sketch and completed project"
          className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-[10]"
        />
      </div>

      {caption && (
        <p className="text-center text-xs sm:text-sm text-[#757575] mt-4 font-semibold uppercase tracking-wider">
          {caption}
        </p>
      )}
    </div>
  );
}
