'use client';

import { ReactNode, useEffect, useRef } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

interface SmoothScrollProviderProps {
  children: ReactNode;
}

export default function SmoothScrollProvider({ children }: SmoothScrollProviderProps) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // 1. Initialize Lenis
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
    });

    lenisRef.current = lenis;

    // 2. Sync Lenis scroll with GSAP ScrollTrigger updates
    lenis.on('scroll', ScrollTrigger.update);

    // 3. Connect GSAP ticker to Lenis RAF
    const updateTicker = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(updateTicker);
    gsap.ticker.lagSmoothing(0);

    // 4. Handle pointer-events on iframes (e.g. Google Maps) during scroll to prevent hijacking
    let scrollTimeout: NodeJS.Timeout;
    const handleScrollStart = () => {
      document.body.classList.add('is-scrolling');
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        document.body.classList.remove('is-scrolling');
      }, 150);
    };

    lenis.on('scroll', handleScrollStart);

    // Clean up
    return () => {
      gsap.ticker.remove(updateTicker);
      lenis.destroy();
      clearTimeout(scrollTimeout);
      document.body.classList.remove('is-scrolling');
    };
  }, []);

  return (
    <>
      {/* Inject Lenis styling directly to ensure smooth scrolling matches browser configuration */}
      <style jsx global>{`
        html.lenis, html.lenis body {
          height: auto;
        }
        
        .lenis.lenis-smooth {
          scroll-behavior: auto !important;
        }
        
        .lenis.lenis-smooth [data-lenis-prevent] {
          overscroll-behavior: contain;
        }
        
        .lenis.lenis-stopped {
          overflow: hidden;
        }
        
        .lenis.lenis-scrolling iframe {
          pointer-events: none !important;
        }

        /* Customize scrollbar to match premium minimal stone aesthetic */
        ::-webkit-scrollbar {
          width: 8px;
        }
        ::-webkit-scrollbar-track {
          background: #f5f5f3;
        }
        ::-webkit-scrollbar-thumb {
          background: #d6d3d1;
          border-radius: 4px;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: #a8a29e;
        }
      `}</style>
      {children}
    </>
  );
}
