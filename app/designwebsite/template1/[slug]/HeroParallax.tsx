'use client';

import { ReactNode, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

interface HeroParallaxProps {
  children: ReactNode;
  bgImageSelector?: string;
  contentSelector?: string;
}

export default function HeroParallax({
  children,
  bgImageSelector = '.hero-bg-img',
  contentSelector = '.hero-content',
}: HeroParallaxProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const container = containerRef.current;
    if (!container) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const bg = container.querySelector<HTMLElement>(bgImageSelector);
    const content = container.querySelector<HTMLElement>(contentSelector);

    // Initial entrance choreography
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    if (bg) {
      tl.fromTo(
        bg,
        { scale: 1.08 },
        { scale: 1.0, duration: 1.6, ease: 'power2.out' },
        0
      );

      // Scroll-driven parallax scrub on background
      gsap.to(bg, {
        yPercent: 20,
        ease: 'none',
        scrollTrigger: {
          trigger: container,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });
    }

    if (content) {
      const items = content.children;
      if (items.length > 0) {
        tl.fromTo(
          items,
          { opacity: 0, y: 35 },
          { opacity: 1, y: 0, duration: 0.9, stagger: 0.14 },
          0.2
        );
      }

      // Parallax upward float and soft fade on scroll
      gsap.to(content, {
        yPercent: -16,
        opacity: 0.15,
        ease: 'none',
        scrollTrigger: {
          trigger: container,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });
    }
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="relative overflow-hidden w-full">
      {children}
    </div>
  );
}
