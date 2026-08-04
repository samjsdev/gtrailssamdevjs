'use client';

import { useEffect, useState } from 'react';

export type Testimonial = {
  text: string;
  author: string;
  detail: string;
};

export default function TestimonialRotator({ items }: { items: Testimonial[] }) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (items.length < 2) return;
    const timer = setInterval(() => setCurrent((c) => (c + 1) % items.length), 5000);
    return () => clearInterval(timer);
  }, [items.length, current]);

  return (
    <div>
      <div className="relative max-w-[820px] mx-auto text-center min-h-[300px]">
        {items.map((item, idx) => (
          <div
            key={idx}
            className={`absolute inset-0 flex flex-col justify-center transition-all duration-[800ms] ease-out ${
              idx === current ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3.5 pointer-events-none'
            }`}
          >
            <div className="font-[family-name:var(--font-cormorant)] text-[90px] leading-[0.6] text-[#d9c49a] mb-4.5">
              &ldquo;
            </div>
            <p className="font-[family-name:var(--font-cormorant)] italic text-[clamp(21px,2.6vw,28px)] leading-[1.5] text-[#221c14] mb-6">
              {item.text}
            </p>
            <div>
              <b className="text-[15px] font-semibold block tracking-[0.02em]">{item.author}</b>
              <span className="text-[12px] tracking-[0.16em] uppercase text-[#7a6f60]">{item.detail}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="flex gap-2.5 justify-center mt-[34px]">
        {items.map((_, idx) => (
          <button
            key={idx}
            aria-label={`Testimonial ${idx + 1}`}
            onClick={() => setCurrent(idx)}
            className={`w-[34px] h-[3px] transition-colors duration-300 ${idx === current ? 'bg-[#a4532f]' : 'bg-[#221c14]/14'}`}
          />
        ))}
      </div>
    </div>
  );
}
