'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

type Slide = {
  src: string;
  title: string;
  label: string;
};

type VerticalImageCarouselProps = {
  slides: Slide[];
};

export default function VerticalImageCarousel({ slides }: VerticalImageCarouselProps) {
  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  useEffect(() => {
    const duration = 4500;
    const timer = window.setInterval(() => {
      setActive((current) => (current + 1) % slides.length);
    }, duration);

    return () => window.clearInterval(timer);
  }, [slides.length]);

  useEffect(() => {
    setProgress(0);
    const startTime = Date.now();
    const duration = 4500;
    
    let frame: number;
    const updateProgress = () => {
      const elapsed = Date.now() - startTime;
      setProgress(Math.min(elapsed / duration, 1));
      if (elapsed < duration) {
        frame = requestAnimationFrame(updateProgress);
      }
    };
    frame = requestAnimationFrame(updateProgress);
    
    return () => cancelAnimationFrame(frame);
  }, [active]);

  const current = slides[active];

  const minSwipeDistance = 40;

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      setActive((current) => (current + 1) % slides.length);
    } else if (isRightSwipe) {
      setActive((current) => (current === 0 ? slides.length - 1 : current - 1));
    }
  };

  return (
    <div 
      className="image-box relative w-full h-full min-h-[450px] bg-[var(--paper)] touch-pan-y"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <Image
        key={current.src}
        src={current.src}
        alt={current.title}
        fill
        priority
        sizes="(max-width: 1024px) 100vw, 50vw"
        className="carousel-fade object-cover"
        unoptimized
      />
      
      {/* Overlay details */}
      <div className="absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t from-black/80 via-black/30 to-transparent p-6 pt-24 text-white">
        <p className="text-[0.6rem] font-black uppercase tracking-[0.2em] text-[var(--safety)] mb-2">{current.label}</p>
        <h3 className="text-xl sm:text-2xl font-black uppercase tracking-[-0.02em]">{current.title}</h3>
      </div>

      {/* Progress Lines */}
      <div className="absolute top-4 left-4 right-4 z-20 flex gap-2">
        {slides.map((_, idx) => (
          <button 
            key={idx} 
            type="button"
            onClick={() => setActive(idx)}
            className="h-1 flex-1 bg-black/20 overflow-hidden cursor-pointer backdrop-blur-sm"
            aria-label={`Go to slide ${idx + 1}`}
          >
            <div 
              className="h-full bg-white" 
              style={{
                width: idx === active ? `${progress * 100}%` : idx < active ? '100%' : '0%'
              }}
            />
          </button>
        ))}
      </div>
    </div>
  );
}
