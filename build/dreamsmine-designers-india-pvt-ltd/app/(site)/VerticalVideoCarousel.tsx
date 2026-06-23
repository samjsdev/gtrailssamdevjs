'use client';

import { useEffect, useRef, useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

type VideoSlide = {
  src: string;
  title: string;
};

export default function VerticalVideoCarousel({ videos }: { videos: VideoSlide[] }) {
  const [active, setActive] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setVisible(entry.isIntersecting);
      },
      { threshold: 0.35 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    videoRefs.current.forEach((vid, idx) => {
      if (vid) {
        if (idx === active && visible) {
          if (vid.paused) {
            // Only reset time if it was not playing to avoid restarting constantly
            if (vid.currentTime === 0 || vid.ended) {
              vid.currentTime = 0;
            }
            vid.play().catch(e => {
              console.log("Autoplay prevented:", e.name);
              if (e.name === 'NotAllowedError') {
                vid.muted = true;
                setIsMuted(true);
                vid.play().catch(err => console.log("Muted autoplay also prevented", err));
              }
            });
          }
        } else {
          vid.pause();
        }
      }
    });
  }, [active, visible]);

  const handleVideoEnd = () => {
    setActive((curr) => (curr + 1) % videos.length);
  };

  useEffect(() => {
    let frame: number;
    const updateProgress = () => {
      const vid = videoRefs.current[active];
      if (vid && vid.duration) {
        setProgress(vid.currentTime / vid.duration);
      } else {
        setProgress(0);
      }
      frame = requestAnimationFrame(updateProgress);
    };
    frame = requestAnimationFrame(updateProgress);
    return () => cancelAnimationFrame(frame);
  }, [active]);

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
      setActive((current) => (current + 1) % videos.length);
    } else if (isRightSwipe) {
      setActive((current) => (current === 0 ? videos.length - 1 : current - 1));
    }
  };

  return (
    <section ref={sectionRef} className="relative w-full bg-[var(--ink)] py-20 sm:py-32 overflow-hidden border-t border-white/10">
      <div className="site-grid relative z-10 text-center mb-12 sm:mb-16">
        <span className="eyebrow text-[var(--safety)] mb-3 inline-block">Dreamsmine Builder</span>
        <h2 className="text-4xl sm:text-6xl font-black uppercase tracking-[-0.04em] text-white">Build Your Dream Home</h2>
      </div>

      <div 
        className="relative w-full h-[75vh] min-h-[600px] max-h-[900px] flex items-center justify-center touch-pan-y"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {videos.map((video, index) => {
          let offset = index - active;
          
          const isCenter = offset === 0;
          
          // Calculate responsive positioning
          let translateX = offset * 110; 
          let scale = 1 - Math.abs(offset) * 0.15;
          let opacity = 1 - Math.abs(offset) * 0.4;
          let zIndex = 10 - Math.abs(offset);

          return (
            <div 
              key={video.src}
              className="absolute w-[80vw] sm:w-[380px] md:w-[420px] aspect-[9/16] transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] cursor-pointer group"
              style={{
                transform: `translateX(${translateX}%) scale(${Math.max(scale, 0.7)})`,
                opacity: Math.max(opacity, 0),
                zIndex
              }}
              onClick={() => !isCenter && setActive(index)}
            >
              <div className={`relative w-full h-full overflow-hidden rounded-2xl transition-colors duration-500 border-4 ${isCenter ? 'border-[var(--safety)] shadow-2xl shadow-black' : 'border-white/10'}`}>
                <video
                  ref={el => { videoRefs.current[index] = el; }}
                  src={video.src}
                  className="w-full h-full object-contain bg-black"
                  playsInline
                  controls
                  muted={isMuted}
                  onEnded={handleVideoEnd}
                />
                
                {/* Overlay for inactive slides to make them darker */}
                {!isCenter && (
                  <div className="absolute inset-0 bg-black/40 transition-opacity duration-500 group-hover:bg-black/20" />
                )}
                
                {/* Content for active slide */}
                <div className={`absolute inset-0 bg-gradient-to-b from-black/90 via-black/20 to-transparent transition-opacity duration-500 pointer-events-none ${isCenter ? 'opacity-100' : 'opacity-0'}`}>
                  <div className="absolute top-0 left-0 right-0 p-6 sm:p-8 flex flex-col items-start gap-4 pointer-events-auto">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setIsMuted(!isMuted);
                        if (videoRefs.current[index]) {
                          videoRefs.current[index]!.muted = !isMuted;
                        }
                      }}
                      className="bg-black/50 hover:bg-[var(--safety)] hover:text-black text-white rounded-full p-2 sm:p-3 backdrop-blur-md transition-colors"
                      aria-label={isMuted ? "Unmute" : "Mute"}
                    >
                      {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                    </button>
                    <h3 className="text-white font-black text-xl sm:text-2xl uppercase leading-tight tracking-[-0.02em]">
                      {video.title}
                    </h3>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      
      {/* Progress Lines */}
      <div className="flex justify-center gap-2 mt-8 max-w-sm mx-auto relative z-10 w-full px-4">
        {videos.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setActive(idx)}
            className="h-1 flex-1 bg-white/20 rounded-full overflow-hidden cursor-pointer backdrop-blur-sm"
            aria-label={`Go to video ${idx + 1}`}
          >
            <div 
              className="h-full bg-[var(--safety)] transition-all duration-75"
              style={{
                width: idx === active ? `${progress * 100}%` : idx < active ? '100%' : '0%'
              }}
            />
          </button>
        ))}
      </div>
    </section>
  );
}
