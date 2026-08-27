'use client';

import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

export type FAQItem = {
  q: string;
  a: string;
  tag?: string;
};

export default function FAQAccordion({ items }: { items: FAQItem[] }) {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <div className="divide-y divide-[#221c14]/12 border-y border-[#221c14]/12">
      {items.map((item, idx) => {
        const isOpen = openIdx === idx;
        return (
          <div key={idx} className="transition-colors duration-250">
            <button
              onClick={() => toggle(idx)}
              className="w-full py-6 flex items-center justify-between gap-4 text-left group focus:outline-none"
              aria-expanded={isOpen}
            >
              <div className="flex items-center gap-4">
                <span className="font-[family-name:var(--font-cormorant)] text-[16px] text-[#a4532f] select-none">
                  0{idx + 1}
                </span>
                <span className="font-[family-name:var(--font-cormorant)] text-[20px] sm:text-[22px] text-[#17130f] group-hover:text-[#a4532f] transition-colors leading-snug">
                  {item.q}
                </span>
              </div>
              <span className="w-8 h-8 rounded-full border border-[#b08d4f]/30 grid place-items-center shrink-0 group-hover:border-[#b08d4f] transition-colors">
                {isOpen ? (
                  <Minus className="w-3.5 h-3.5 text-[#a4532f]" />
                ) : (
                  <Plus className="w-3.5 h-3.5 text-[#a4532f]" />
                )}
              </span>
            </button>
            {isOpen && (
              <div className="pb-6 pl-10 pr-4 text-[#7a6f60] font-light leading-[1.8] text-[15px] animate-fadeIn">
                <p>{item.a}</p>
                {item.tag && (
                  <span className="inline-block mt-3 text-[11px] tracking-[0.2em] uppercase text-[#a4532f] font-semibold">
                    {item.tag}
                  </span>
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
