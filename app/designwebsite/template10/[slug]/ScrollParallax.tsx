'use client';

import { ReactNode, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

interface ScrollParallaxProps {
  children: ReactNode;
  speed?: number; // supports e.g. 0.14 or 14
  className?: string;
}

export default function ScrollParallax({ children, speed = 0.12, className = '' }: ScrollParallaxProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const container = containerRef.current;
    const inner = innerRef.current;
    if (!container || !inner) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const basePct = speed < 1 ? speed * 100 : speed;
    const isMobile = window.innerWidth < 768;
    const actualSpeed = isMobile ? basePct * 0.55 : basePct;

    gsap.fromTo(
      inner,
      { yPercent: -actualSpeed, scale: 1.08 },
      {
        yPercent: actualSpeed,
        scale: 1.08,
        ease: 'none',
        scrollTrigger: {
          trigger: container,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 0.8,
        },
      }
    );
  }, { scope: containerRef, dependencies: [speed] });

  return (
    <div ref={containerRef} className={`overflow-hidden relative ${className}`}>
      <div ref={innerRef} className="w-full h-full will-change-transform">
        {children}
      </div>
    </div>
  );
}
