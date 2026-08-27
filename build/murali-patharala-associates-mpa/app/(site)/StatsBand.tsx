'use client';

import { useEffect, useState, useRef } from 'react';

const stats = [
  { value: 28, suffix: '+', label: 'Years of Trust', sub: 'Since 1998 in Chennai' },
  { value: 500, suffix: '+', label: 'Projects Delivered', sub: 'Villas & Residences' },
  { value: 10, suffix: ' Yrs', label: 'Structural Warranty', sub: 'On every home' },
  { value: 400, suffix: '+', label: 'Quality Checks', sub: 'Cube & soil tests' },
  { value: 100, suffix: '%', label: 'Fixed Price', sub: 'Zero budget creep' },
  { value: 100, suffix: '%', label: 'In-House Team', sub: 'No sub-contracting' },
];

function useCountUp(target: number, start: boolean, duration = 1600) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!start) return;
    let raf = 0;
    const t0 = performance.now();
    const tick = (t: number) => {
      const p = Math.min((t - t0) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setValue(Math.round(target * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [start, target, duration]);
  return value;
}

function StatItem({ stat, start }: { stat: (typeof stats)[number]; start: boolean }) {
  const value = useCountUp(stat.value, start);
  return (
    <div className="space-y-1">
      <div className="text-3xl sm:text-4xl font-black text-[#242624]">
        {value}
        <span className="text-[#E64D16]">{stat.suffix}</span>
      </div>
      <div className="text-xs uppercase tracking-wider text-[#242624]/80 font-bold">{stat.label}</div>
      <div className="text-[10px] text-[#242624]/60">{stat.sub}</div>
    </div>
  );
}

export default function StatsBand() {
  const ref = useRef<HTMLDivElement>(null);
  const [start, setStart] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setStart(true);
          obs.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section className="w-full bg-[#DFB65E] text-[#242624] relative overflow-hidden">
      {/* charcoal pinstripes echoing the name board */}
      <div className="h-[3px] w-full bg-gradient-to-r from-[#242624] via-[#E64D16] to-[#242624]" />
      <div ref={ref} className="max-w-7xl mx-auto px-4 sm:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 text-center">
          {stats.map((s) => (
            <StatItem key={s.label} stat={s} start={start} />
          ))}
        </div>
      </div>
      <div className="h-[3px] w-full bg-gradient-to-r from-[#242624] via-[#E64D16] to-[#242624]" />
    </section>
  );
}
