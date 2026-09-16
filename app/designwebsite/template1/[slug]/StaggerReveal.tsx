'use client';

import { ReactNode, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

interface StaggerRevealProps {
  children: ReactNode;
  stagger?: number;
  duration?: number;
  yOffset?: number;
  className?: string;
}

export default function StaggerReveal({
  children,
  stagger = 0.12,
  duration = 0.85,
  yOffset = 46,
  className = '',
}: StaggerRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const container = containerRef.current;
    if (!container) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const isMobile = window.innerWidth < 768;
    const actualY = isMobile ? Math.min(yOffset, 28) : yOffset;
    const actualStagger = isMobile ? stagger * 0.7 : stagger;
    const items = container.children;

    if (!items.length) return;

    gsap.fromTo(
      items,
      { opacity: 0, y: actualY },
      {
        opacity: 1,
        y: 0,
        duration,
        stagger: actualStagger,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: container,
          start: isMobile ? 'top 92%' : 'top 85%',
          end: isMobile ? 'bottom 8%' : 'bottom 12%',
          toggleActions: 'play reverse play reverse',
          invalidateOnRefresh: true,
        },
      }
    );
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  );
}
