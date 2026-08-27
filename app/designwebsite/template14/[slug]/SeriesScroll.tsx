'use client';

import { useRef } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';

export type SeriesTheme = {
  img: string;
  name: string;
  desc: string;
};

export default function SeriesScroll({ themes, collection }: { themes: SeriesTheme[]; collection: string }) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollBy = (dir: number) => {
    scrollRef.current?.scrollBy({ left: dir * 420, behavior: 'smooth' });
  };

  return (
    <div>
      <div className="flex justify-end gap-2.5 mb-6">
        <button
          onClick={() => scrollBy(-1)}
          aria-label="Scroll series left"
          className="w-[46px] h-[46px] rounded-full border border-[#221c14]/14 grid place-items-center text-[#221c14] hover:bg-[#17130f] hover:text-white hover:border-[#17130f] transition-all duration-250"
        >
          <ArrowLeft className="w-[18px] h-[18px]" />
        </button>
        <button
          onClick={() => scrollBy(1)}
          aria-label="Scroll series right"
          className="w-[46px] h-[46px] rounded-full border border-[#221c14]/14 grid place-items-center text-[#221c14] hover:bg-[#17130f] hover:text-white hover:border-[#17130f] transition-all duration-250"
        >
          <ArrowRight className="w-[18px] h-[18px]" />
        </button>
      </div>

      <div
        ref={scrollRef}
        className="grid grid-flow-col auto-cols-[min(400px,78vw)] gap-[22px] overflow-x-auto pb-4 snap-x [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {themes.map((theme, idx) => (
          <div key={theme.name} className="group relative overflow-hidden aspect-[4/4.6] snap-start cursor-pointer">
            <img
              src={theme.img}
              alt={`${theme.name} theme`}
              loading="lazy"
              className="w-full h-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.07]"
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(23,19,15,0.05)_40%,rgba(23,19,15,0.85))]" />
            <span className="absolute top-5 right-6 z-[2] font-[family-name:var(--font-cormorant)] italic text-[60px] leading-none text-white/50">
              {String(idx + 1).padStart(2, '0')}
            </span>
            <div className="absolute bottom-0 left-0 right-0 p-7 z-[2] text-white">
              <div className="text-[10.5px] tracking-[0.26em] uppercase text-[#d9c49a] mb-2">{collection}</div>
              <b className="font-[family-name:var(--font-cormorant)] text-[30px] font-semibold block leading-tight">{theme.name}</b>
              <span className="text-[13px] text-white/75 font-light">{theme.desc}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
