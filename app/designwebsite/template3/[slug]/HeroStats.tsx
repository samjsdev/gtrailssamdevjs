'use client';

import CountUp from '@/components/CountUp';
import { Star, Clock, ShieldCheck, Layers, Award } from 'lucide-react';

export type HeroStat = {
  value: string | number;
  label: string;
  sublabel?: string;
  suffix?: string;
  prefix?: string;
  decimals?: number;
  icon?: 'star' | 'clock' | 'shield' | 'layers' | 'award';
};

interface HeroStatsProps {
  stats: HeroStat[];
  className?: string;
}

export default function HeroStats({ stats, className = '' }: HeroStatsProps) {
  const getIcon = (iconName?: string) => {
    switch (iconName) {
      case 'star':
        return <Star className="w-4 h-4 text-[#f4b942] fill-[#f4b942]" />;
      case 'clock':
        return <Clock className="w-4 h-4 text-[#f4b942]" />;
      case 'shield':
        return <ShieldCheck className="w-4 h-4 text-[#f4b942]" />;
      case 'layers':
        return <Layers className="w-4 h-4 text-[#f4b942]" />;
      case 'award':
        return <Award className="w-4 h-4 text-[#f4b942]" />;
      default:
        return null;
    }
  };

  return (
    <div
      className={`bg-[#16110e]/90 backdrop-blur-xl border border-white/15 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.4)] overflow-hidden text-white ${className}`}
    >
      <div className="grid grid-cols-2 md:grid-cols-4">
        {stats.map((stat, i) => {
          // Responsive borders:
          // Mobile 2x2 grid: items 0 and 1 have bottom border; items 0 and 2 have right border
          // Desktop 4-col: item 0 has no left border, items 1, 2, 3 have left border; no bottom borders
          const isLeftColMobile = i % 2 === 0;
          const isTopRowMobile = i < 2;
          const hasLeftBorderDesktop = i > 0;

          return (
            <div
              key={stat.label}
              className={`p-5 sm:p-6 flex flex-col justify-center transition-colors duration-300 hover:bg-white/[0.04]
                ${isTopRowMobile ? 'border-b md:border-b-0 border-white/10' : ''}
                ${isLeftColMobile ? 'border-r md:border-r-0 border-white/10' : ''}
                ${hasLeftBorderDesktop ? 'md:border-l md:border-white/10' : ''}
              `}
            >
              <div className="flex items-center gap-2 mb-2">
                {stat.icon && (
                  <span className="w-7 h-7 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                    {getIcon(stat.icon)}
                  </span>
                )}
                <span className="text-[11px] font-extrabold tracking-[0.1em] uppercase text-white/70 truncate">
                  {stat.label}
                </span>
              </div>

              <div className="text-[clamp(26px,2.8vw,36px)] font-extrabold text-[#f4b942] leading-none mb-1">
                <CountUp
                  value={stat.value}
                  suffix={stat.suffix}
                  prefix={stat.prefix}
                  decimals={stat.decimals}
                />
              </div>

              {stat.sublabel && (
                <span className="text-[11.5px] text-white/60 font-medium leading-tight">
                  {stat.sublabel}
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
