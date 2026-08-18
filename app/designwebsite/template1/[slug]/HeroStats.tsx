'use client';

import { useEffect, useRef, useState } from 'react';

export type HeroStat = {
  value: number;
  decimals?: number;
  suffix?: string;
  prefix?: string;
  label: string;
};

type HeroStatsProps = {
  stats: HeroStat[];
};

function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

export default function HeroStats({ stats }: HeroStatsProps) {
  const [counts, setCounts] = useState<number[]>(() => stats.map(() => 0));
  const containerRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const startAnimation = () => {
      if (hasAnimated.current) return;
      hasAnimated.current = true;

      // Respect prefers-reduced-motion
      if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        setCounts(stats.map((s) => s.value));
        return;
      }

      const duration = 1600; // ms
      const startTime = performance.now();

      const updateCounter = (now: number) => {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = easeOutCubic(progress);

        const currentCounts = stats.map((stat) => {
          return stat.value * eased;
        });

        setCounts(currentCounts);

        if (progress < 1) {
          requestAnimationFrame(updateCounter);
        } else {
          setCounts(stats.map((s) => s.value));
        }
      };

      requestAnimationFrame(updateCounter);
    };

    // If already in view (above-the-fold)
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      startAnimation();
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            startAnimation();
            observer.disconnect();
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -10px 0px' }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
    };
  }, [stats]);

  return (
    <div ref={containerRef} className="relative z-10 max-w-7xl mx-auto px-6 lg:px-7 w-full">
      <div className="grid grid-cols-2 md:grid-cols-4 border-t border-[#c9ab7c]/35 bg-[#140e09]/80 backdrop-blur-md shadow-[0_20px_50px_rgba(0,0,0,0.45)]">
        {stats.map((stat, i) => {
          const currentVal = counts[i] ?? 0;
          const displayVal =
            stat.decimals !== undefined && stat.decimals > 0
              ? currentVal.toFixed(stat.decimals)
              : Math.round(currentVal).toLocaleString();

          const isEvenColMobile = i % 2 === 1;
          const isSecondRowMobile = i >= 2;
          const isNotFirstDesktop = i > 0;

          return (
            <div
              key={i}
              className={`py-6 sm:py-7 px-5 sm:px-6 md:px-7 flex flex-col justify-center transition-all duration-300 hover:bg-white/[0.04] group ${
                isEvenColMobile ? 'border-l border-[#f6f1e8]/15' : ''
              } ${isSecondRowMobile ? 'border-t border-[#f6f1e8]/15 md:border-t-0' : ''} ${
                isNotFirstDesktop ? 'md:border-l md:border-[#f6f1e8]/15' : ''
              }`}
            >
              <div className="font-[family-name:var(--font-marcellus)] text-[clamp(30px,3.4vw,46px)] leading-none text-white flex items-baseline font-normal tracking-tight">
                {stat.prefix && <span className="text-[#c9ab7c] mr-1 text-[0.8em]">{stat.prefix}</span>}
                <span className="tabular-nums font-normal">{displayVal}</span>
                {stat.suffix && (
                  <span className="not-italic text-[#c9ab7c] text-[0.68em] font-normal tracking-normal ml-1 inline-block transition-transform duration-300 group-hover:translate-x-0.5">
                    {stat.suffix}
                  </span>
                )}
              </div>
              <span className="block mt-2.5 text-[11px] sm:text-[11.5px] tracking-[0.22em] sm:tracking-[0.26em] uppercase text-white/70 font-medium leading-snug">
                {stat.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
