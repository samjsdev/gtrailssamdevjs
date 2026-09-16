'use client';

import React, { useRef, ReactNode } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

type CurtainDirection = 'left' | 'right' | 'center';

interface CurtainRevealProps {
  children: ReactNode;
  direction?: CurtainDirection;
  delay?: number;
  duration?: number;
  className?: string;
  overlayColor?: string;
}

export default function CurtainReveal({
  children,
  direction = 'center',
  delay = 0,
  duration = 1200,
  className = '',
  overlayColor = '#17130f',
}: CurtainRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const leftPanelRef = useRef<HTMLDivElement>(null);
  const rightPanelRef = useRef<HTMLDivElement>(null);
  const singlePanelRef = useRef<HTMLDivElement>(null);

  const delaySec = delay > 0 ? (delay <= 10 ? delay : delay / 1000) : 0;
  const durationSec = duration > 0 ? (duration <= 10 ? duration : duration / 1000) : 1.2;

  useGSAP(() => {
    const container = containerRef.current;
    if (!container) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      if (contentRef.current) gsap.set(contentRef.current, { scale: 1 });
      if (leftPanelRef.current) gsap.set(leftPanelRef.current, { xPercent: -100 });
      if (rightPanelRef.current) gsap.set(rightPanelRef.current, { xPercent: 100 });
      if (singlePanelRef.current) gsap.set(singlePanelRef.current, { xPercent: direction === 'left' ? 100 : -100 });
      return;
    }

    const tl = gsap.timeline({
      delay: delaySec,
      scrollTrigger: {
        trigger: container,
        start: 'top 85%',
        toggleActions: 'play none none reverse',
        invalidateOnRefresh: true,
      },
      defaults: { ease: 'power3.inOut' },
    });

    if (contentRef.current) {
      tl.fromTo(
        contentRef.current,
        { scale: 1.15 },
        { scale: 1.0, duration: durationSec * 1.1, ease: 'power2.out' },
        0
      );
    }

    if (direction === 'center') {
      if (leftPanelRef.current) {
        tl.fromTo(
          leftPanelRef.current,
          { xPercent: 0 },
          { xPercent: -102, duration: durationSec },
          0
        );
      }
      if (rightPanelRef.current) {
        tl.fromTo(
          rightPanelRef.current,
          { xPercent: 0 },
          { xPercent: 102, duration: durationSec },
          0
        );
      }
    } else {
      if (singlePanelRef.current) {
        tl.fromTo(
          singlePanelRef.current,
          { xPercent: 0 },
          { xPercent: direction === 'left' ? 102 : -102, duration: durationSec },
          0
        );
      }
    }
  }, { scope: containerRef, dependencies: [direction, delaySec, durationSec] });

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden ${className}`}
    >
      {/* Scaled Content (Image / Container) */}
      <div
        ref={contentRef}
        className="w-full h-full will-change-transform"
      >
        {children}
      </div>

      {/* Curtain Panels */}
      {direction === 'center' ? (
        <>
          {/* Left Curtain */}
          <div
            ref={leftPanelRef}
            className="absolute top-0 left-0 bottom-0 z-20 pointer-events-none will-change-transform"
            style={{
              width: '50.5%',
              backgroundColor: overlayColor,
            }}
          />
          {/* Right Curtain */}
          <div
            ref={rightPanelRef}
            className="absolute top-0 right-0 bottom-0 z-20 pointer-events-none will-change-transform"
            style={{
              width: '50.5%',
              backgroundColor: overlayColor,
            }}
          />
        </>
      ) : (
        /* Single Curtain */
        <div
          ref={singlePanelRef}
          className="absolute inset-0 z-20 pointer-events-none will-change-transform"
          style={{
            backgroundColor: overlayColor,
          }}
        />
      )}
    </div>
  );
}
