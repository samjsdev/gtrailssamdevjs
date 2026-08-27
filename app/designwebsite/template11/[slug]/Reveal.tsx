'use client';

import { ReactNode, useEffect, useRef } from 'react';

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
};

export default function Reveal({ children, className = '', delay = 0 }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reveal = () => {
      el.style.opacity = '1';
      el.style.transform = 'none';
    };

    // Above-the-fold content should appear immediately on mobile.
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.92 && rect.bottom > 0) {
      reveal();
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            reveal();
            io.unobserve(el);
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -8% 0px' }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: 0,
        transform: 'translateY(28px)',
        transition: `opacity .9s cubic-bezier(.19,1,.22,1) ${delay}ms, transform .9s cubic-bezier(.19,1,.22,1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}
