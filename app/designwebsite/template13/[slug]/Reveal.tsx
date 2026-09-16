'use client';

import { ReactNode, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export type RevealDirection = 'up' | 'down' | 'left' | 'right' | 'scale' | 'curtain' | 'fade' | 'none';

export interface RevealProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  direction?: RevealDirection;
  className?: string;
  threshold?: number;
  reversible?: boolean;
}

export default function Reveal({
  children,
  delay = 0,
  duration = 0.85,
  direction = 'up',
  className = '',
  reversible = false,
}: RevealProps) {
  const elRef = useRef<HTMLDivElement>(null);

  // Normalize delay: if <= 10 and > 0, assume seconds; otherwise assume milliseconds
  const delaySec = delay > 0 ? (delay <= 10 ? delay : delay / 1000) : 0;

  useGSAP(() => {
    const el = elRef.current;
    if (!el) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      gsap.set(el, { opacity: 1, clearProps: 'transform' });
      return;
    }

    const isMobile = window.innerWidth < 768;
    const yOffset = isMobile ? 32 : 54;
    const xOffset = isMobile ? 35 : 60;

    const fromVars: gsap.TweenVars = { opacity: 0 };
    const toVars: gsap.TweenVars = { opacity: 1, ease: 'power3.out' };

    switch (direction) {
      case 'up':
        fromVars.y = yOffset;
        toVars.y = 0;
        break;
      case 'down':
        fromVars.y = -yOffset;
        toVars.y = 0;
        break;
      case 'left':
        fromVars.x = xOffset;
        toVars.x = 0;
        break;
      case 'right':
        fromVars.x = -xOffset;
        toVars.x = 0;
        break;
      case 'scale':
        fromVars.scale = isMobile ? 0.94 : 0.88;
        toVars.scale = 1;
        break;
      case 'curtain':
        fromVars.clipPath = 'inset(18% 0% 18% 0%)';
        fromVars.scale = 1.05;
        toVars.clipPath = 'inset(0% 0% 0% 0%)';
        toVars.scale = 1;
        break;
      case 'fade':
        break;
      case 'none':
        gsap.set(el, { opacity: 1 });
        return;
      default:
        fromVars.y = yOffset;
        toVars.y = 0;
    }

    gsap.fromTo(el, fromVars, {
      ...toVars,
      duration,
      delay: delaySec,
      scrollTrigger: {
        trigger: el,
        start: isMobile ? 'top 92%' : 'top 85%',
        end: isMobile ? 'bottom 8%' : 'bottom 12%',
        toggleActions: reversible ? 'play reverse play reverse' : 'play none none reverse',
        invalidateOnRefresh: true,
      },
    });
  }, { scope: elRef, dependencies: [direction, delaySec, duration, reversible] });

  return (
    <div
      ref={elRef}
      className={`${className} ${direction === 'curtain' ? 'overflow-hidden' : ''}`}
      style={{ willChange: 'opacity, transform' }}
    >
      {children}
    </div>
  );
}
