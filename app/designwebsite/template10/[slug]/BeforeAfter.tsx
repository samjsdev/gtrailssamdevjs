'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import Image from 'next/image';
import { ChevronsLeftRight } from 'lucide-react';
import { Cinzel } from 'next/font/google';
import Reveal from './Reveal';

const cinzel = Cinzel({ subsets: ['latin'], weight: ['600', '700'] });

interface BeforeAfterProps {
  beforeImage?: string;
  afterImage?: string;
  beforeLabel?: string;
  afterLabel?: string;
  title?: string;
  subtitle?: string;
}

export default function BeforeAfter({
  beforeImage = '/images/architecture/structural-construction-frame.webp',
  afterImage = '/images/architecture/villa-after-finished.webp',
  beforeLabel = 'RAW RCC REINFORCED FRAME',
  afterLabel = 'DELIVERED TURNKEY MASTERPIECE',
  title = 'From Structural Concrete to Haute Architecture',
  subtitle = 'Drag the divider to observe how our rigorous engineering and IS-456 structural standards translate into sculptural permanence.',
}: BeforeAfterProps) {
  const [sliderPos, setSliderPos] = useState(100); // starts on before image
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const userInteracted = useRef(false);
  const hasAnimated = useRef(false);

  // Trigger smooth scroll sweep from 100% -> 50%
  const triggerSweep = useCallback(() => {
    if (hasAnimated.current || userInteracted.current) return;
    hasAnimated.current = true;

    setSliderPos(100);
    const startPos = 100;
    const targetPos = 50;
    const duration = 1600;

    const delayTimer = setTimeout(() => {
      if (userInteracted.current) return;
      const startTime = performance.now();

      const step = (now: number) => {
        if (userInteracted.current) return;
        const elapsed = now - startTime;
        const p = Math.min(1, elapsed / duration);
        // easeOutQuart
        const ease = 1 - Math.pow(1 - p, 4);
        const current = startPos - (startPos - targetPos) * ease;
        setSliderPos(current);

        if (p < 1) {
          requestAnimationFrame(step);
        }
      };
      requestAnimationFrame(step);
    }, 400);

    return () => clearTimeout(delayTimer);
  }, []);

  // IntersectionObserver to trigger sweep on scroll
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            triggerSweep();
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [triggerSweep]);

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    userInteracted.current = true;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const pct = Math.max(5, Math.min(95, (x / rect.width) * 100));
    setSliderPos(pct);
  }, []);

  const onTouchMove = useCallback(
    (e: TouchEvent) => {
      if (!isDragging.current) return;
      handleMove(e.touches[0].clientX);
    },
    [handleMove]
  );

  const onMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isDragging.current) return;
      handleMove(e.clientX);
    },
    [handleMove]
  );

  const onStopDrag = useCallback(() => {
    isDragging.current = false;
  }, []);

  useEffect(() => {
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onStopDrag);
    window.addEventListener('touchmove', onTouchMove);
    window.addEventListener('touchend', onStopDrag);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onStopDrag);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onStopDrag);
    };
  }, [onMouseMove, onStopDrag, onTouchMove]);

  return (
    <div className="py-16 sm:py-24 bg-[#f5f2ea] border-y border-[#141414]/10">
      <div className="max-w-[1360px] mx-auto px-5 sm:px-8">
        <Reveal direction="up">
          <div className="max-w-3xl mx-auto text-center mb-10 sm:mb-14">
            <span className="text-[11px] tracking-[0.32em] uppercase font-bold text-[#b89568]">
              Craftsmanship & Precision
            </span>
            <h2
              className={`${cinzel.className} mt-2.5 text-[28px] sm:text-[38px] lg:text-[42px] font-bold text-[#141414] leading-tight`}
            >
              {title}
            </h2>
            <p className="mt-3.5 text-[15px] sm:text-[16px] text-[#5a544c] leading-relaxed">
              {subtitle}
            </p>
          </div>
        </Reveal>

        {/* Interactive Comparison Container */}
        <Reveal direction="scale" duration={0.95}>
          <div
            ref={containerRef}
            className="relative w-full max-w-5xl mx-auto aspect-[16/10] sm:aspect-[16/9] overflow-hidden select-none cursor-ew-resize border border-[#141414]/15 shadow-xl bg-black"
            onMouseDown={() => {
              isDragging.current = true;
              userInteracted.current = true;
            }}
            onTouchStart={() => {
              isDragging.current = true;
              userInteracted.current = true;
            }}
          >
            {/* AFTER Image (Full background) */}
            <div className="absolute inset-0">
              <Image
                src={afterImage}
                alt="Delivered Masterpiece"
                fill
                className="object-cover"
                sizes="(max-width: 1200px) 100vw, 1200px"
                loading="lazy"
              />
              <div className="absolute bottom-5 right-5 bg-[#141414]/80 backdrop-blur-sm text-[#faf8f5] text-[10px] sm:text-[11px] tracking-[0.2em] uppercase px-3.5 py-1.5 font-bold border border-white/10">
                {afterLabel}
              </div>
            </div>

            {/* BEFORE Image (Clipped overlay) */}
            <div
              className="absolute inset-0 overflow-hidden"
              style={{ width: `${sliderPos}%` }}
            >
              <div className="relative w-full h-full" style={{ width: containerRef.current?.offsetWidth || '100%' }}>
                <Image
                  src={beforeImage}
                  alt="Structural Concrete Frame"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1200px) 100vw, 1200px"
                  loading="lazy"
                />
                <div className="absolute bottom-5 left-5 bg-[#141414]/80 backdrop-blur-sm text-[#faf8f5] text-[10px] sm:text-[11px] tracking-[0.2em] uppercase px-3.5 py-1.5 font-bold border border-white/10 whitespace-nowrap">
                  {beforeLabel}
                </div>
              </div>
            </div>

            {/* Draggable Divider Line & Knob */}
            <div
              className="absolute top-0 bottom-0 w-[2px] bg-[#faf8f5] shadow-[0_0_12px_rgba(0,0,0,0.6)] cursor-ew-resize"
              style={{ left: `${sliderPos}%` }}
            >
              <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-[#141414] border-2 border-[#c5a47e] text-[#faf8f5] flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
                <ChevronsLeftRight className="w-4 h-4 text-[#c5a47e]" />
              </div>
            </div>
          </div>
        </Reveal>

        {/* Bottom Technical Note */}
        <Reveal direction="up" delay={200}>
          <div className="mt-6 max-w-2xl mx-auto flex flex-wrap items-center justify-center gap-6 text-[12px] text-[#7a746d] text-center">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#c5a47e]" />
              IS 456 Structural Concrete Standard
            </span>
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#c5a47e]" />
              Tata Tiscon Fe550D Rebar Detailing
            </span>
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#c5a47e]" />
              Turnkey Construction Supervision
            </span>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
