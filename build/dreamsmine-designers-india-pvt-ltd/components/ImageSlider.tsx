'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ImageSliderProps {
  images: string[];
  autoPlay?: boolean;
  interval?: number;
  showArrows?: boolean;
  showDots?: boolean;
  transition?: 'fade' | 'slide';
  className?: string;
  imageClassName?: string;
  overlay?: React.ReactNode;
  onSlideChange?: (index: number) => void;
  pauseOnHover?: boolean;
  aspectRatio?: string;
  kenBurns?: boolean;
}

export default function ImageSlider({
  images,
  autoPlay = true,
  interval = 5000,
  showArrows = true,
  showDots = true,
  transition = 'fade',
  className = '',
  imageClassName = '',
  overlay,
  onSlideChange,
  pauseOnHover = true,
  aspectRatio,
  kenBurns = false,
}: ImageSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const goToSlide = useCallback((index: number) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex(index);
    onSlideChange?.(index);
    setTimeout(() => setIsTransitioning(false), 600);
  }, [isTransitioning, onSlideChange]);

  const goNext = useCallback(() => {
    goToSlide((currentIndex + 1) % images.length);
  }, [currentIndex, images.length, goToSlide]);

  const goPrev = useCallback(() => {
    goToSlide((currentIndex - 1 + images.length) % images.length);
  }, [currentIndex, images.length, goToSlide]);

  // Auto-play
  useEffect(() => {
    if (!autoPlay || isPaused || images.length <= 1) return;
    const timer = setInterval(goNext, interval);
    return () => clearInterval(timer);
  }, [autoPlay, isPaused, interval, goNext, images.length]);

  // Touch handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const diff = touchStartX.current - touchEndX.current;
    if (Math.abs(diff) > 50) {
      if (diff > 0) goNext();
      else goPrev();
    }
  };

  if (!images.length) return null;

  return (
    <div
      className={`slider-container relative overflow-hidden ${className}`}
      style={aspectRatio ? { aspectRatio } : undefined}
      onMouseEnter={() => pauseOnHover && setIsPaused(true)}
      onMouseLeave={() => pauseOnHover && setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Images */}
      {transition === 'fade' ? (
        <div className="relative w-full h-full">
          {images.map((src, idx) => (
            <div
              key={idx}
              className={`absolute inset-0 transition-opacity duration-[1000ms] ease-in-out ${
                idx === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
              }`}
            >
              <img
                src={src}
                alt={`Slide ${idx + 1}`}
                className={`w-full h-full object-contain bg-[#101820] ${kenBurns && idx === currentIndex ? 'animate-kenburns' : ''} ${imageClassName}`}
                loading={idx === 0 ? 'eager' : 'lazy'}
              />
            </div>
          ))}
        </div>
      ) : (
        <div
          className="slider-track h-full"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {images.map((src, idx) => (
            <div key={idx} className="slider-slide h-full">
              <img
                src={src}
                alt={`Slide ${idx + 1}`}
                className={`w-full h-full object-contain bg-[#101820] ${imageClassName}`}
                loading={idx === 0 ? 'eager' : 'lazy'}
              />
            </div>
          ))}
        </div>
      )}

      {/* Custom Overlay Content */}
      {overlay && (
        <div className="absolute inset-0 z-20">
          {overlay}
        </div>
      )}

      {/* Navigation Arrows */}
      {showArrows && images.length > 1 && (
        <>
          <button
            onClick={goPrev}
            className="slider-arrow prev"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={goNext}
            className="slider-arrow next"
            aria-label="Next slide"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </>
      )}

      {/* Dots */}
      {showDots && images.length > 1 && (
        <div className="slider-dots absolute bottom-4 left-1/2 -translate-x-1/2 z-30">
          {images.map((_, idx) => (
            <button
              key={idx}
              onClick={() => goToSlide(idx)}
              className={`slider-dot ${idx === currentIndex ? 'active' : ''}`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
