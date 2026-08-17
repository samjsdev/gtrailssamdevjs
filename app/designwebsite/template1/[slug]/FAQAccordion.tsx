'use client';

import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

export type FAQItem = {
  q: string;
  a: string;
  tag?: string;
};

export default function FAQAccordion({
  items,
}: {
  items: FAQItem[];
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <div className="divide-y divide-[#211a13]/10 border-y border-[#211a13]/10">
      {items.map((item, idx) => {
        const isOpen = openIndex === idx;
        return (
          <div key={idx} className="transition-colors duration-200">
            <button
              onClick={() => toggle(idx)}
              className="w-full py-6 flex items-center justify-between gap-4 text-left group focus:outline-none"
              aria-expanded={isOpen}
            >
              <div className="flex items-center gap-4">
                <span className="font-[family-name:var(--font-marcellus)] text-[14px] text-[#a58150] select-none">
                  0{idx + 1}
                </span>
                <span className="font-[family-name:var(--font-marcellus)] text-[18px] sm:text-[20px] text-[#211a13] group-hover:text-[#a58150] transition-colors leading-snug">
                  {item.q}
                </span>
              </div>
              <span className="w-8 h-8 rounded-full border border-[#a58150]/30 grid place-items-center shrink-0 group-hover:border-[#a58150] transition-colors">
                {isOpen ? (
                  <Minus className="w-3.5 h-3.5 text-[#a58150]" />
                ) : (
                  <Plus className="w-3.5 h-3.5 text-[#a58150]" />
                )}
              </span>
            </button>
            {isOpen && (
              <div className="pb-6 pl-10 pr-4 text-[#7d7264] font-light leading-[1.8] text-[15px]">
                <p>{item.a}</p>
                {item.tag && (
                  <span className="inline-block mt-3 text-[11px] tracking-[0.2em] uppercase text-[#a58150] font-medium">
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
