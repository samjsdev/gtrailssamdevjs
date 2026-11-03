'use client';

import { Cinzel } from 'next/font/google';

const cinzel = Cinzel({ subsets: ['latin'], weight: ['600', '700'] });

export interface HeroStat {
  value: string;
  label: string;
  sublabel?: string;
}

interface HeroStatsProps {
  stats?: HeroStat[];
}

const DEFAULT_STATS: HeroStat[] = [
  { value: '300+', label: 'Delivered Residences', sublabel: 'Ultra-luxury villas & estates' },
  { value: '18+', label: 'Design Accolades', sublabel: 'National & regional recognition' },
  { value: '10-Yr', label: 'Structural Warranty', sublabel: 'IS-456 compliant reinforced RCC' },
  { value: '100%', label: 'Turnkey On-Time', sublabel: 'Milestone tracked handover' },
];

export default function HeroStats({ stats = DEFAULT_STATS }: HeroStatsProps) {
  return (
    <div className="border-y border-[#141414]/10 bg-[#faf8f5]">
      <div className="max-w-[1360px] mx-auto px-5 sm:px-8 py-8 sm:py-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 divide-y md:divide-y-0 md:divide-x divide-[#141414]/10">
          {stats.map((stat, idx) => (
            <div
              key={stat.label}
              className={`${
                idx !== 0 ? 'pt-5 md:pt-0 md:pl-8' : ''
              } flex flex-col justify-center`}
            >
              <div
                className={`${cinzel.className} text-[30px] sm:text-[38px] lg:text-[44px] font-bold text-[#141414] tracking-tight leading-none`}
              >
                {stat.value}
              </div>
              <div className="mt-2 text-[11px] sm:text-[12px] tracking-[0.2em] uppercase font-bold text-[#141414]">
                {stat.label}
              </div>
              {stat.sublabel && (
                <div className="mt-1 text-[12px] text-[#7a746d] font-normal leading-snug">
                  {stat.sublabel}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
