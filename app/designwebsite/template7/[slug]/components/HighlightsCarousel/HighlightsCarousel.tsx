'use client';

import { useEffect, useMemo, useRef, useState } from 'react';

type Slide = {
  id: string;
  title: string;
  subtitle: string;
  kind: 'div' | 'video' | 'image';
  src?: string;
};

export default function HighlightsCarousel({ data }: { data?: any }) {
  const mainHeading = data?.projects?.title || "Real spaces. \\n Real beauty.";
  const smallHeading = data?.projects?.subtitle || "FEATURED PROJECTS";

  const slides: Slide[] = useMemo(
    () => {
      const defaultTitles = ["Modern Living.", "Gourmet Kitchens.", "Minimalist Bedrooms.", "Home Offices.", "Luxury Bathrooms.", "Dining Rooms.", "Outdoor Living."];
      const defaultSubtitles = ["Spaces designed for comfort and style.", "Functional elegance for culinary creativity.", "Serene retreats for restful nights.", "Inspiring environments for focused work.", "Spa-inspired retreats at home.", "Where memories are made around the table.", "Seamless indoor-outdoor experiences."];
      const defaultImages = [
        '/images/stock/a151a9e5.webp',
        '/images/stock/bf333360.webp',
        '/images/stock/84fea9c5.webp',
        '/images/stock/284d6d29.webp',
        '/images/stock/36e83915.webp',
        '/images/stock/90879216.webp',
        '/images/stock/34bba44b.webp'
      ];

      const titles = data?.business?.highlights?.length ? data.business.highlights : defaultTitles;
      const subtitles = data?.projects?.descriptions?.length ? data.projects.descriptions : defaultSubtitles;
      
      const dataImages = data?.media?.treatmentImages?.filter(Boolean) || [];
      const images = dataImages.length > 1 ? dataImages : defaultImages;

      return defaultTitles.map((_, i) => ({
        id: `s${i + 1}`,
        title: titles[i] || defaultTitles[i] || '',
        subtitle: subtitles[i] || defaultSubtitles[i] || '',
        kind: 'image',
        src: images[i] || defaultImages[i] || defaultImages[0]
      }));
    },
    [data]
  );

  const viewportRef = useRef<HTMLDivElement | null>(null);
  const slideRefs = useRef<Array<HTMLDivElement | null>>([]);
  const videoRefs = useRef<Array<HTMLVideoElement | null>>([]);

  const sectionRef = useRef<HTMLElement | null>(null);
  const [isSectionInView, setIsSectionInView] = useState(false);

  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [translateX, setTranslateX] = useState(0);

  const clampIndex = (index: number) => {
    const len = slides.length;
    return ((index % len) + len) % len;
  };

  const syncTranslateToActive = () => {
    const slideEl = slideRefs.current[activeIndex];
    if (!slideEl) return;

    const viewportWidth = viewportRef.current?.offsetWidth || 0;
    const slideWidth = slideEl.offsetWidth;
    const offset = slideEl.offsetLeft;

    const centerOffset = (viewportWidth - slideWidth) / 2;
    setTranslateX(-(offset - centerOffset));
  };

  useEffect(() => {
    syncTranslateToActive();

    slides.forEach((_, idx) => {
      const video = videoRefs.current[idx];
      if (video) {
        if (idx === activeIndex) {
          video.currentTime = 0;
        } else {
          video.pause();
        }
      }
    });
  }, [activeIndex]);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        setIsSectionInView(entry.isIntersecting && entry.intersectionRatio >= 0.35);
      },
      { threshold: [0, 0.15, 0.35, 0.6, 1] }
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!isSectionInView) {
      videoRefs.current.forEach((v) => v?.pause());
    }
  }, [isSectionInView]);

  useEffect(() => {
    const activeVideo = videoRefs.current[activeIndex];
    if (!activeVideo) return;

    if (isPlaying && isSectionInView) {
      activeVideo.play().catch(() => { });
    } else {
      activeVideo.pause();
    }
  }, [isPlaying, activeIndex, isSectionInView]);

  useEffect(() => {
    const viewportEl = viewportRef.current;
    if (!viewportEl) return;

    const ro = new ResizeObserver(() => {
      requestAnimationFrame(() => {
        syncTranslateToActive();
      });
    });

    ro.observe(viewportEl);
    return () => ro.disconnect();
  }, [activeIndex]);

  const handleVideoEnded = () => {
    if (isPlaying) {
      setActiveIndex((prev) => clampIndex(prev + 1));
    }
  };

  // Simulate video ending for images after 2 seconds
  useEffect(() => {
    if (!isPlaying || !isSectionInView) return;
    
    const slide = slides[activeIndex];
    if (slide.kind === 'image') {
      const timer = setTimeout(() => {
        setActiveIndex((prev) => clampIndex(prev + 1));
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [activeIndex, isPlaying, isSectionInView, slides]);

  const goTo = (index: number) => setActiveIndex(clampIndex(index));

  return (
    <section
      ref={(el) => { sectionRef.current = el; }}
      className="relative flex flex-col justify-center min-h-screen py-32 overflow-hidden bg-gradient-to-b from-white via-blue-50 to-white"
      aria-label="Treatment highlights"
    >
      {/* Background Glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[20%] left-[10%] w-[600px] h-[600px] rounded-full bg-blue-200 blur-[150px] opacity-40 mix-blend-multiply" />
        <div className="absolute bottom-[20%] right-[10%] w-[500px] h-[500px] rounded-full bg-indigo-200 blur-[120px] opacity-40 mix-blend-multiply" />
      </div>

      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 md:px-16">
        <div className="flex flex-col md:flex-row items-baseline justify-between mb-12 md:mb-20 gap-4">
          <div>
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-4 border border-blue-100 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-blue-600"></span>
              <span className="text-sm font-bold text-blue-900 uppercase tracking-wider">{smallHeading}</span>
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 tracking-tight whitespace-pre-line">
              {mainHeading}
            </h2>
          </div>
          <a href="/treatments" className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors shadow-lg hover:shadow-blue-500/30">
            View Project Gallery
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </div>

      <div className="w-full relative z-10">
        <div className="overflow-x-clip overflow-visible" ref={viewportRef}>
          <div
            className="flex gap-6 pb-10 transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] will-change-transform"
            style={{ transform: `translate3d(${translateX}px, 0, 0)` }}
          >
            {slides.map((slide, idx) => (
              <div
                key={slide.id}
                ref={(el) => { slideRefs.current[idx] = el; }}
                className="flex-none w-[85vw] max-w-[900px] cursor-pointer transition-opacity duration-300"
                aria-hidden={idx !== activeIndex}
                onClick={() => goTo(idx)}
              >
                <div className={`glass-card relative h-[400px] md:h-[550px] rounded-[48px] overflow-hidden transition-all duration-500 border-[4px] border-white
                  ${idx === activeIndex 
                    ? 'scale-100 shadow-2xl shadow-blue-900/10 opacity-100' 
                    : 'scale-[0.9] opacity-50 grayscale hover:grayscale-0 hover:opacity-80'}`}
                >
                  {/* Full-bleed image background */}
                  <div className="absolute inset-0 z-0">
                    {slide.kind === 'video' && slide.src ? (
                      <video
                        ref={(el) => { videoRefs.current[idx] = el; }}
                        src={slide.src}
                        className="w-full h-full object-cover"
                        muted
                        playsInline
                        preload="metadata"
                        onEnded={handleVideoEnded}
                      />
                    ) : slide.kind === 'image' && slide.src ? (
                      <img
                        src={slide.src}
                        className="w-full h-full object-cover"
                        alt={slide.title}
                        loading={idx < 3 ? 'eager' : 'lazy'}
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-blue-600 to-indigo-700" />
                    )}
                  </div>

                  {/* Gradient overlay for text readability */}
                  <div className="absolute inset-0 z-[1] bg-gradient-to-b from-black/50 via-black/10 to-black/60 pointer-events-none" />

                  {/* Text overlay */}
                  <div className="absolute inset-0 z-[2] flex flex-col items-center justify-center p-8 md:p-12 text-center">
                    <h3 className="text-3xl md:text-5xl font-bold text-white drop-shadow-lg tracking-tight mb-3">
                      {slide.title}
                    </h3>
                    <p className="text-lg text-white/90 font-medium max-w-[80%] drop-shadow-md">
                      {slide.subtitle}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Controls */}
        <div className="w-full flex justify-center items-center gap-4 pointer-events-none z-20 mt-8 md:mt-12">
          <div className="pointer-events-auto bg-white/40 backdrop-blur-md px-6 py-4 md:py-3 rounded-full flex items-center gap-4 md:gap-3 shadow-lg border border-white/50">
            {slides.map((s, idx) => {
              const isActive = idx === activeIndex;
              return (
                <button
                  key={s.id}
                  type="button"
                  className={`transition-all duration-300 rounded-full ${isActive ? 'w-12 h-3 md:w-10 md:h-2 bg-blue-600' : 'w-3 h-3 md:w-2 md:h-2 bg-blue-900/20 hover:bg-blue-600/50 cursor-pointer'}`}
                  aria-label={`Go to slide ${idx + 1}`}
                  onClick={() => goTo(idx)}
                />
              );
            })}
          </div>

          <button
            type="button"
            className="pointer-events-auto w-16 h-16 md:w-14 md:h-14 rounded-full bg-white flex items-center justify-center text-blue-600 shadow-xl transition-all hover:scale-105 hover:bg-blue-50"
            aria-label={isPlaying ? 'Pause' : 'Play'}
            onClick={() => setIsPlaying((p) => !p)}
          >
            {isPlaying ? (
              <svg viewBox="0 0 24 24" className="w-7 h-7 md:w-6 md:h-6" fill="currentColor">
                <rect x="7" y="6" width="3" height="12" rx="1.5" />
                <rect x="14" y="6" width="3" height="12" rx="1.5" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" className="w-7 h-7 md:w-6 md:h-6" fill="currentColor">
                <path d="M8 5V19L19 12L8 5Z" />
              </svg>
            )}
          </button>
        </div>
      </div>
    </section>
  );
}
