'use client';

import { useEffect, useState, useRef } from 'react';

interface StatItemData {
  value: number;
  suffix: string;
  label: string;
  sub: string;
}

const stats: StatItemData[] = [
  { value: 28, suffix: '+', label: 'Years of Trust', sub: 'Since 1998 in Anna Nagar' },
  { value: 500, suffix: '+', label: 'Homes Delivered', sub: 'Villas & Residences' },
  { value: 425, suffix: '+', label: 'Quality Checks', sub: 'Documented QC Audits' },
  { value: 10, suffix: ' Yrs', label: 'Structural Warranty', sub: 'Legally Binding Guarantee' },
  { value: 100, suffix: '%', label: 'Fixed Price', sub: 'Zero Cost Escalation' },
  { value: 100, suffix: '%', label: 'In-House Team', sub: 'Dedicated Site Engineers' },
];

function useCountUp(target: number, start: boolean, duration = 1800) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!start) return;

    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setValue(target);
      return;
    }

    let raf = 0;
    const t0 = performance.now();
    const tick = (t: number) => {
      const p = Math.min((t - t0) / duration, 1);
      // easeOutCubic curve
      const eased = 1 - Math.pow(1 - p, 3);
      setValue(Math.round(target * eased));
      if (p < 1) {
        raf = requestAnimationFrame(tick);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [start, target, duration]);

  return value;
}

function StatItem({ stat, start }: { stat: StatItemData; start: boolean }) {
  const value = useCountUp(stat.value, start);
  return (
    <div className="space-y-2 w-full">
      <div
        className="text-4xl sm:text-5xl font-bold text-[#111111] tracking-tight flex items-center justify-center"
        style={{ fontFamily: "'Lora', serif" }}
      >
        <span>{value}</span>
        <span className="text-[#EA580C] ml-1">{stat.suffix}</span>
      </div>
      <div className="text-xs sm:text-sm uppercase tracking-wider text-[#111111] font-bold">
        {stat.label}
      </div>
      <div className="text-xs text-[#666666] font-medium leading-relaxed max-w-[260px] mx-auto">
        {stat.sub}
      </div>
    </div>
  );
}

export default function StatsBand() {
  const ref = useRef<HTMLDivElement>(null);
  const [start, setStart] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (!('IntersectionObserver' in window)) {
      setStart(true);
      return;
    }

    const obs = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setStart(true);
          obs.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      aria-label="MPA Credentials and Numbers"
      className="w-full bg-white border-b-4 border-[#111111] relative py-12 sm:py-16"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-8">
        {/* Two-row grid (3 columns x 2 rows on medium/large screens) */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 text-center">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className="p-6 sm:p-8 bg-[#FAFAFA] border-2 border-[#111111] flex flex-col justify-center items-center hover:border-[#EA580C] hover:shadow-md transition-all duration-200 group"
            >
              <StatItem stat={stat} start={start} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
