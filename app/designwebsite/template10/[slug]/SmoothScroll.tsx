'use client';

import { ReactNode, useState, useEffect, useSyncExternalStore } from 'react';
import { ReactLenis, useLenis } from 'lenis/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import 'lenis/dist/lenis.css';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface SmoothScrollProps {
  children: ReactNode;
}

function subscribeReducedMotion(callback: () => void) {
  const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
  mq.addEventListener('change', callback);
  return () => mq.removeEventListener('change', callback);
}

function getReducedMotionSnapshot() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function getServerSnapshot() {
  return false;
}

function ScrollProgressBar() {
  const [progress, setProgress] = useState(0);

  useLenis(({ progress: p }) => {
    setProgress(p);
  });

  return (
    <div
      className="fixed top-0 left-0 right-0 h-[2.5px] z-[100] origin-left pointer-events-none bg-gradient-to-r from-[#7d3333] via-[#c5a47e] to-[#b38a5b] transition-transform duration-100 ease-out"
      style={{ transform: `scaleX(${progress})` }}
      aria-hidden="true"
    />
  );
}

function GsapLenisBridge() {
  useLenis(() => {
    ScrollTrigger.update();
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 200);
    return () => clearTimeout(timer);
  }, []);

  return null;
}

export default function SmoothScroll({ children }: SmoothScrollProps) {
  const isReducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    getServerSnapshot
  );

  if (isReducedMotion) {
    return <>{children}</>;
  }

  return (
    <ReactLenis
      root
      options={{
        lerp: 0.08,
        duration: 1.3,
        smoothWheel: true,
        wheelMultiplier: 0.95,
        touchMultiplier: 1.6,
      }}
    >
      <ScrollProgressBar />
      <GsapLenisBridge />
      {children}
    </ReactLenis>
  );
}
