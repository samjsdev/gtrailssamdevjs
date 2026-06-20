'use client';

import { useEffect, useRef, useState } from 'react';

type VideoSequenceProps = {
  videos: string[];
  label: string;
  title: string;
};

export default function VideoSequence({ videos, label, title }: VideoSequenceProps) {
  const [active, setActive] = useState(0);
  const [visible, setVisible] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setVisible(entry.isIntersecting);
      },
      { threshold: 0.35 }
    );

    observer.observe(root);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (visible) {
      if (video.paused) {
        if (video.currentTime === 0 || video.ended) {
          video.currentTime = 0;
        }
        video.play().catch((e) => {
          if (e.name === 'NotAllowedError') {
            video.muted = true;
            setIsMuted(true);
            video.play().catch(() => undefined);
          }
        });
      }
    } else {
      video.pause();
    }
  }, [active, visible]);

  return (
    <div ref={rootRef} className="dark-panel overflow-hidden">
      <div className="relative aspect-[16/10] bg-black">
        <video
          ref={videoRef}
          key={videos[active]}
          src={videos[active]}
          muted={isMuted}
          playsInline
          controls
          className="h-full w-full object-cover opacity-90"
          onEnded={() => setActive((current) => (current + 1) % videos.length)}
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.08)_0%,rgba(0,0,0,0.64)_100%)]" />
        <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
          <p className="text-[0.62rem] font-black uppercase tracking-[0.22em] text-[var(--safety)]">{label}</p>
          <h3 className="mt-2 text-2xl font-black uppercase leading-none tracking-[-0.04em]">{title}</h3>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-px bg-white/12">
        {videos.map((video, index) => (
          <button
            key={video}
            type="button"
            onClick={() => setActive(index)}
            className={`h-10 text-[0.62rem] font-black uppercase tracking-[0.16em] transition ${
              index === active ? 'bg-[var(--safety)] text-[var(--ink)]' : 'bg-[#151515] text-white/50'
            }`}
          >
            {String(index + 1).padStart(2, '0')}
          </button>
        ))}
      </div>
    </div>
  );
}
