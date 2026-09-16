'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { Cinzel } from 'next/font/google';

const cinzel = Cinzel({ subsets: ['latin'], weight: ['600', '700'] });

export interface FAQItem {
  q: string;
  a: string;
}

interface FAQAccordionProps {
  items: FAQItem[];
  title?: string;
  subtitle?: string;
}

export default function FAQAccordion({
  items,
  title = 'Frequently Addressed Inquiries',
  subtitle = 'Everything you need to know regarding architectural commissions, statutory sanctions, structural guarantees, and turnkey delivery.',
}: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="py-20 sm:py-28 bg-[#faf8f5]">
      <div className="max-w-[1000px] mx-auto px-5 sm:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <span className="text-[11px] tracking-[0.32em] uppercase font-bold text-[#b89568]">
            Advisory & Clarifications
          </span>
          <h2
            className={`${cinzel.className} mt-2.5 text-[28px] sm:text-[38px] lg:text-[42px] font-bold text-[#141414] leading-tight`}
          >
            {title}
          </h2>
          <p className="mt-3.5 text-[15px] sm:text-[16px] text-[#5a544c] leading-relaxed max-w-2xl mx-auto">
            {subtitle}
          </p>
        </div>

        <div className="divide-y divide-[#141414]/10 border-y border-[#141414]/10">
          {items.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div key={item.q} className="py-5 sm:py-6">
                <button
                  onClick={() => toggle(idx)}
                  className="w-full text-left flex items-center justify-between gap-4 group"
                  aria-expanded={isOpen}
                >
                  <span
                    className={`${cinzel.className} text-[17px] sm:text-[20px] font-bold text-[#141414] group-hover:text-[#b89568] transition-colors`}
                  >
                    {item.q}
                  </span>
                  <div
                    className={`w-8 h-8 rounded-full border border-[#141414]/15 flex items-center justify-center shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-180 bg-[#141414] text-white' : 'text-[#141414]'
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    isOpen ? 'max-h-[400px] opacity-100 mt-4' : 'max-h-0 opacity-0 mt-0'
                  }`}
                >
                  <p className="text-[14.5px] sm:text-[15.5px] text-[#5a544c] leading-relaxed pr-8">
                    {item.a}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
