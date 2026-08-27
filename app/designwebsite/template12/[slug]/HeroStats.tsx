'use client';

import CountUp from '@/components/CountUp';
import { Star, Award, Layers, Home } from 'lucide-react';

export type HeroStat = {
  value: string | number;
  label: string;
  sublabel?: string;
  suffix?: string;
  decimals?: number;
  icon?: 'star' | 'award' | 'layers' | 'home';
};

interface HeroStatsProps {
  stats: HeroStat[];
  className?: string;
}

export default function HeroStats({ stats, className = '' }: HeroStatsProps) {
  const getIcon = (iconName?: string) => {
    switch (iconName) {
      case 'star':
        return <Star className="w-4 h-4 text-[#f2a007] fill-[#f2a007]" />;
      case 'award':
        return <Award className="w-4 h-4 text-[#0e5a43]" />;
      case 'layers':
        return <Layers className="w-4 h-4 text-[#0e5a43]" />;
      case 'home':
        return <Home className="w-4 h-4 text-[#0e5a43]" />;
      default:
        return null;
    }
  };

  return (
    <div
      className={`bg-white border border-[#1b1b1b]/10 rounded-2xl shadow-[0_16px_36px_rgba(27,27,27,0.06)] overflow-hidden ${className}`}
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
              className={`p-5 sm:p-6 flex flex-col justify-center transition-colors duration-300 hover:bg-[#faf7f1]/60
                ${isTopRowMobile ? 'border-b md:border-b-0 border-[#1b1b1b]/10' : ''}
                ${isLeftColMobile ? 'border-r md:border-r-0 border-[#1b1b1b]/10' : ''}
                ${hasLeftBorderDesktop ? 'md:border-l md:border-[#1b1b1b]/10' : ''}
              `}
            >
              <div className="flex items-center gap-2 mb-2">
                {stat.icon && (
                  <span className="w-7 h-7 rounded-lg bg-[#faf7f1] border border-[#1b1b1b]/8 flex items-center justify-center shrink-0">
                    {getIcon(stat.icon)}
                  </span>
                )}
                <span className="text-[11px] font-extrabold tracking-[0.08em] uppercase text-[#6b6660] truncate">
                  {stat.label}
                </span>
              </div>

              <div className="font-[family-name:var(--font-bricolage)] font-bold text-[clamp(26px,2.8vw,36px)] text-[#0e5a43] leading-none mb-1">
                <CountUp
                  value={stat.value}
                  suffix={stat.suffix}
                  decimals={stat.decimals}
                />
              </div>

              {stat.sublabel && (
                <span className="text-[11.5px] text-[#6b6660] font-medium leading-tight">
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
