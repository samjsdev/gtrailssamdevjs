'use client';

import { useState, useEffect, useCallback } from 'react';
import { X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut } from 'lucide-react';

interface LightboxProps {
  images: string[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onIndexChange?: (index: number) => void;
}

export default function Lightbox({
  images,
  currentIndex,
  isOpen,
  onClose,
  onIndexChange,
}: LightboxProps) {
  const [index, setIndex] = useState(currentIndex);
  const [isZoomed, setIsZoomed] = useState(false);

  useEffect(() => {
    setIndex(currentIndex);
  }, [currentIndex]);

  const goNext = useCallback(() => {
    const next = (index + 1) % images.length;
    setIndex(next);
    setIsZoomed(false);
    onIndexChange?.(next);
  }, [index, images.length, onIndexChange]);

  const goPrev = useCallback(() => {
    const prev = (index - 1 + images.length) % images.length;
    setIndex(prev);
    setIsZoomed(false);
    onIndexChange?.(prev);
  }, [index, images.length, onIndexChange]);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'Escape':
          onClose();
          break;
        case 'ArrowRight':
          goNext();
          break;
        case 'ArrowLeft':
          goPrev();
          break;
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    // Prevent body scroll
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, goNext, goPrev, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="lightbox-overlay"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-6 right-6 z-50 w-12 h-12  bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
        aria-label="Close lightbox"
      >
        <X className="w-6 h-6" />
      </button>

      {/* Counter */}
      <div className="absolute top-6 left-6 z-50 text-white/70 text-sm font-semibold tracking-wider">
        {index + 1} / {images.length}
      </div>

      {/* Zoom toggle */}
      <button
        onClick={() => setIsZoomed(!isZoomed)}
        className="absolute top-6 right-20 z-50 w-12 h-12  bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
        aria-label={isZoomed ? 'Zoom out' : 'Zoom in'}
      >
        {isZoomed ? <ZoomOut className="w-5 h-5" /> : <ZoomIn className="w-5 h-5" />}
      </button>

      {/* Navigation */}
      {images.length > 1 && (
        <>
          <button
            onClick={goPrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-50 w-14 h-14  bg-white/10 hover:bg-[#D4A03C] flex items-center justify-center text-white transition-all hover:scale-110"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={goNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-50 w-14 h-14  bg-white/10 hover:bg-[#D4A03C] flex items-center justify-center text-white transition-all hover:scale-110"
            aria-label="Next image"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </>
      )}

      {/* Image */}
      <img
        src={images[index]}
        alt={`Image ${index + 1}`}
        className={`lightbox-image transition-transform duration-300 ${
          isZoomed ? 'scale-150 cursor-zoom-out' : 'cursor-zoom-in'
        }`}
        onClick={() => setIsZoomed(!isZoomed)}
      />
    </div>
  );
}
