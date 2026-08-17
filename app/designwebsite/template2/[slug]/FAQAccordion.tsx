'use client';

import { useState } from 'react';
import { ChevronDown, Plus, Minus } from 'lucide-react';

export type FAQItem = {
  q: string;
  a: string;
  tag?: string;
};

export default function FAQAccordion({ items }: { items: FAQItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <div className="grid gap-3.5">
      {items.map((item, idx) => {
        const isOpen = openIndex === idx;
        return (
          <div
            key={idx}
            className={`border rounded-2xl transition-all duration-300 overflow-hidden ${
              isOpen
                ? 'bg-white border-[#0e5a43] shadow-[0_12px_28px_rgba(14,90,67,0.08)]'
                : 'bg-white/80 border-[#1b1b1b]/10 hover:border-[#0e5a43]/40'
            }`}
          >
            <button
              onClick={() => toggle(idx)}
              className="w-full p-6 flex items-center justify-between gap-4 text-left group focus:outline-none"
              aria-expanded={isOpen}
            >
              <span className="font-[family-name:var(--font-bricolage)] font-bold text-[17px] sm:text-[19px] text-[#1b1b1b] group-hover:text-[#0e5a43] transition-colors leading-snug">
                {item.q}
              </span>
              <span
                className={`w-9 h-9 rounded-xl grid place-items-center shrink-0 transition-colors ${
                  isOpen ? 'bg-[#0e5a43] text-white' : 'bg-[#faf7f1] text-[#0e5a43] group-hover:bg-[#fdeecb]'
                }`}
              >
                {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
              </span>
            </button>
            {isOpen && (
              <div className="px-6 pb-6 text-[#6b6660] font-medium leading-[1.75] text-[15px] border-t border-[#1b1b1b]/6 pt-4">
                <p>{item.a}</p>
                {item.tag && (
                  <span className="inline-block mt-3 text-[11px] font-extrabold tracking-wider uppercase text-[#0e5a43] bg-[#fdeecb] px-3 py-1 rounded-full">
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
