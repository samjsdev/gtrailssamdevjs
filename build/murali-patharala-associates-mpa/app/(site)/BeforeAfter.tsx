'use client';

import Image from 'next/image';
import { useState, useRef, useEffect, useCallback } from 'react';
import styles from './BeforeAfter.module.css';

interface BeforeAfterProps {
  image?: string;
  beforeImage?: string;
  afterImage?: string;
  title?: string;
  caption?: string;
  aspectRatio?: string;
}

export default function BeforeAfter({
  image,
  beforeImage,
  afterImage,
  title = 'Architectural design',
  caption,
  aspectRatio,
}: BeforeAfterProps) {
  const [pos, setPos] = useState(100);
  const [beforeLoaded, setBeforeLoaded] = useState(false);
  const [afterLoaded, setAfterLoaded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const animRef = useRef<number | null>(null);
  const delayRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const hasAnimated = useRef(false);
  const userInteracted = useRef(false);

  const stopAnimation = useCallback(() => {
    if (delayRef.current !== null) clearTimeout(delayRef.current);
    if (animRef.current !== null) cancelAnimationFrame(animRef.current);
  }, []);

  useEffect(() => {
    if (!beforeLoaded || !afterLoaded || !containerRef.current) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      if (!userInteracted.current) setPos(50);
      return;
    }

    const observer = new IntersectionObserver(entries => {
      if (!entries.some(entry => entry.isIntersecting && entry.intersectionRatio >= 0.15)) return;
      observer.disconnect();
      if (hasAnimated.current || userInteracted.current) return;
      hasAnimated.current = true;

      // Preserve the original pause and 2.2-second sweep from sketch to split view.
      delayRef.current = setTimeout(() => {
        if (userInteracted.current) return;
        const start = performance.now();
        const sweep = (now: number) => {
          if (userInteracted.current) return;
          const progress = Math.min((now - start) / 2200, 1);
          const ease = progress < 0.5 ? 4 * progress ** 3 : 1 - (-2 * progress + 2) ** 3 / 2;
          setPos(100 - 50 * ease);
          if (progress < 1) animRef.current = requestAnimationFrame(sweep);
        };
        animRef.current = requestAnimationFrame(sweep);
      }, 700);
    }, { threshold: 0.15 });

    observer.observe(containerRef.current);
    return () => { observer.disconnect(); stopAnimation(); };
  }, [beforeLoaded, afterLoaded, stopAnimation]);

  const takeControl = () => { userInteracted.current = true; stopAnimation(); };
  const imageSizes = '(max-width: 767px) calc(100vw - 48px), (max-width: 1200px) calc((100vw - 80px) / 2), 588px';

  return (
    <div>
      <div className={styles.labels}><span>2D sketch</span><span>3D view</span></div>
      <div
        ref={containerRef}
        data-comparison-frame
        className={styles.frame}
        style={aspectRatio ? { aspectRatio } : undefined}
      >
        <Image src={beforeImage || image || '/images/architecture/villa-plan-sketch.webp'} alt={`${title}: 2D elevation sketch`} fill sizes={imageSizes} className={styles.image} onLoad={() => setBeforeLoaded(true)} />
        <div className={styles.reveal} style={{ clipPath: `inset(0 0 0 ${pos}%)` }}>
          <Image src={afterImage || image || '/images/architecture/villa-after-finished.webp'} alt={`${title}: 3D exterior visualisation`} fill sizes={imageSizes} loading={beforeLoaded ? 'eager' : 'lazy'} className={styles.image} onLoad={() => setAfterLoaded(true)} />
        </div>
        <div className={styles.divider} style={{ left: `${pos}%` }} aria-hidden="true"><span>↔</span></div>
        <input type="range" min={0} max={100} step={0.1} value={pos} onPointerDown={takeControl} onKeyDown={takeControl}
          onChange={event => { takeControl(); setPos(Number(event.target.value)); }}
          aria-label={`${title}: drag to compare 2D sketch and 3D view`} aria-valuetext={`${Math.round(pos)}% sketch, ${Math.round(100 - pos)}% 3D view`} className={styles.slider} />
      </div>
      {caption && <p className={styles.caption}>{caption}</p>}
    </div>
  );
}
