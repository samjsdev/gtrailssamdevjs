'use client';

import { useState, useRef, useEffect, useCallback } from 'react';

interface BeforeAfterProps {
  image?: string;
  beforeImage?: string;
  afterImage?: string;
  caption?: string;
}

export default function BeforeAfter({ image, beforeImage, afterImage, caption }: BeforeAfterProps) {
  // Start on far right (100%) so 100% of Before image is shown on initial load
  const [pos, setPos] = useState<number>(100);
  const containerRef = useRef<HTMLDivElement>(null);
  const animRef = useRef<number | null>(null);
  const hasAnimated = useRef(false);
  const userInteracted = useRef(false);

  const beforeSrc = beforeImage || image || '/images/architecture/villa-before-frame.webp';
  const afterSrc = afterImage || image || '/images/architecture/villa-after-finished.webp';

  const triggerSweep = useCallback(() => {
    if (hasAnimated.current || userInteracted.current) return;
    hasAnimated.current = true;

    setPos(100);

    const startPos = 100;
    const targetPos = 50;
    const duration = 2200; // 2.2s cinematic sweep

    // 700ms pause so viewer registers the raw structural concrete frame first
    const delayTimer = setTimeout(() => {
      if (userInteracted.current) return;
      const startTime = performance.now();

      const step = (now: number) => {
        if (userInteracted.current) return;
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Smooth easeInOutCubic: gentle departure, smooth sweep, graceful arrival
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
      <div
        className="relative overflow-hidden rounded-[24px] sm:rounded-[28px] aspect-[16/10] sm:aspect-[16/9.5] shadow-[0_30px_70px_rgba(33,26,19,0.3)] select-none border border-[#a58150]/30 bg-[#211a13]"
        onPointerDown={handlePointerDown}
      >
        {/* Before: Raw Structure (Underneath) */}
        <img
          src={beforeSrc}
          alt="Raw structural RCC frame"
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        />

        {/* After: Completed Landmark (Clipped from left at pos%) */}
        <img
          src={afterSrc}
          alt="Completed architectural residence"
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
          style={{ clipPath: `inset(0 0 0 ${pos}%)` }}
        />

        {/* Badges */}
        <span className="absolute top-3 sm:top-5 left-2 max-[379px]:left-3 sm:left-5 z-[3] text-[8.5px] max-[379px]:text-[7.5px] max-[379px]:tracking-[0.02em] max-[379px]:px-2 max-[379px]:py-1 sm:text-[11.5px] tracking-[0.12em] sm:tracking-[0.2em] uppercase px-2.5 sm:px-4 py-1.5 sm:py-2 bg-[#211a13]/85 text-white backdrop-blur-sm border border-white/10 rounded-full font-medium shadow-md pointer-events-none">
          Topography &amp; Shell
        </span>
        <span className="absolute top-3 sm:top-5 right-2 max-[379px]:right-3 sm:right-5 z-[3] text-[8.5px] max-[379px]:text-[7.5px] max-[379px]:tracking-[0.02em] max-[379px]:px-2 max-[379px]:py-1 sm:text-[11.5px] tracking-[0.12em] sm:tracking-[0.2em] uppercase px-2.5 sm:px-4 py-1.5 sm:py-2 bg-[#a58150] text-white font-semibold rounded-full shadow-md pointer-events-none">
          Completed Landmark
        </span>

        {/* Divider line & handle */}
        <div
          className="absolute top-0 bottom-0 w-[3px] bg-[#c9ab7c] -translate-x-1/2 shadow-[0_0_20px_rgba(0,0,0,0.5)] pointer-events-none z-[4]"
          style={{ left: `${pos}%` }}
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[46px] h-[46px] sm:w-[52px] sm:h-[52px] rounded-full bg-[#a58150] grid place-items-center text-white text-[16px] font-bold shadow-[0_8px_24px_rgba(0,0,0,0.4)] border-2 border-white">
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
          aria-label="Drag to compare before and after"
          className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-[10]"
        />
      </div>

      {caption && (
        <p className="text-center text-[13px] text-[#7d7264] mt-4 font-light tracking-wide">
          {caption}
        </p>
      )}
    </div>
  );
}
