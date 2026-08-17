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
    <div className="grid gap-3.5">
      {items.map((item, idx) => {
        const isOpen = openIdx === idx;
        return (
          <div
            key={idx}
            className={`border rounded-2xl transition-all duration-250 ${
              isOpen
                ? 'bg-white border-[#d8442c] shadow-[0_12px_28px_rgba(216,68,44,0.08)]'
                : 'bg-[#fbf7f2] border-[#241f1a]/10 hover:border-[#d8442c]/40'
            }`}
          >
            <button
              onClick={() => toggle(idx)}
              className="w-full p-5.5 sm:p-6 flex items-center justify-between gap-4 text-left group focus:outline-none"
              aria-expanded={isOpen}
            >
              <div className="flex items-center gap-3.5">
                <span className="w-7 h-7 rounded-full bg-[#d8442c]/10 text-[#d8442c] text-[12px] font-extrabold grid place-items-center shrink-0">
                  {idx + 1}
                </span>
                <span className="text-[17px] sm:text-[19px] font-extrabold text-[#1d1713] group-hover:text-[#d8442c] transition-colors leading-snug">
                  {item.q}
                </span>
              </div>
              <span
                className={`w-8 h-8 rounded-lg grid place-items-center shrink-0 transition-colors ${
                  isOpen ? 'bg-[#d8442c] text-white' : 'bg-white text-[#1d1713] border border-[#241f1a]/10'
                }`}
              >
                {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
              </span>
            </button>
            {isOpen && (
              <div className="px-6 pb-6 text-[#6d6259] font-medium leading-[1.7] text-[15px] border-t border-[#241f1a]/6 pt-4">
                <p>{item.a}</p>
                {item.tag && (
                  <span className="inline-block mt-3 text-[11px] font-extrabold tracking-wider uppercase text-[#d8442c] bg-[#d8442c]/10 px-3 py-1 rounded-full">
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
