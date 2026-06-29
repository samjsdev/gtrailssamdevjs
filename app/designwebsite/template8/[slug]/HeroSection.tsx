'use client';

import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import gsap from 'gsap';

import { useTemplateData } from './context/TemplateContext';

/* ─────────────────── Default Image Pool ─────────────────── */
const DEFAULT_POOL = [
  { src: '/images/template8/hero-pool/hero-1.webp', title: 'Modern Minimalist' },
  { src: '/images/template8/hero-pool/hero-2.webp', title: 'Classic Elegance' },
  { src: '/images/template8/hero-pool/hero-3.webp', title: 'Bohemian Chic' },
  { src: '/images/template8/hero-pool/hero-4.webp', title: 'Industrial Urban' },
  { src: '/images/template8/hero-pool/hero-5.webp', title: 'Luxury Villa' },
  { src: '/images/template8/hero-pool/hero-6.webp', title: 'Corporate Office' },
  { src: '/images/template8/hero-pool/hero-7.webp', title: 'Art Deco Suite' }
];

/* ─────────────────── Layout Constants ─────────────────── */
// We use 7 cards to allow smooth sliding in from right and out to left.
// Indices: 0 (hidden left), 1, 2, 3 (center), 4, 5 (visible), 6 (hidden right).
const STEP    = 19.5;     
const WIDTH   = 16.5;     
const OFFSET  = -16.75;  

const SLIDE_MS = 1000;
const FLY_MS   = 900;
const OVERLAP  = 0.80; // Fly duplicate at 80% of slide
const PAUSE_MS = 2500;

/* ─────────────────── Types ─────────────────── */
type Card      = { src: string; title: string; uid: number };
type HeroLayer = { src: string; title: string; uid: number; z: number };

export default function HeroSection({ clinic, media }: { clinic?: any; media?: any }) {
  const { data } = useTemplateData();
  const heroData = data?.home?.sections?.[0] || {};
  const customImages = data?.media?.heroCarousel || heroData.image_sources || [];
  
  // Construct pool from data
  const POOL = customImages.length > 0 ? customImages.map((src: string, index: number) => ({
      src,
      title: heroData.text?.[index + 2] || DEFAULT_POOL[index % DEFAULT_POOL.length].title
  })) : DEFAULT_POOL;

  const badgeText = heroData.text?.[0] || 'Featured';
  const descriptionText = heroData.text?.[1] || 'Elevating modern interiors with thoughtful design and premium craftsmanship.';
  const websiteName = data?.home?.website || clinic?.name || 'Discover Our Interiors';

  const sectionRef   = useRef<HTMLElement>(null);
  const heroRef      = useRef<HTMLDivElement>(null);
  const carouselRef  = useRef<HTMLDivElement>(null);
  const mountedRef   = useRef(true);
  const startedRef   = useRef(false);
  const uidRef       = useRef(0);
  const poolIdxRef   = useRef(0);
  const heroZRef     = useRef(10);

  const [cards, setCards] = useState<Card[]>([]);
  const [heroLayers, setHeroLayers] = useState<HeroLayer[]>([]);

  const nextUid = () => ++uidRef.current;
  const nextFromPool = () => {
    const img = POOL[poolIdxRef.current % POOL.length];
    poolIdxRef.current++;
    return img;
  };

  /* ─────────────────── Bootstrap ─────────────────── */
  useEffect(() => {
    const init: Card[] = [];
    for (let i = 0; i < 7; i++) {
      const img = POOL[i % POOL.length];
      init.push({ src: img.src, title: img.title, uid: nextUid() });
    }
    poolIdxRef.current = 7;
    setCards(init);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(POOL)]); // Re-run if POOL changes

  useEffect(() => {
    mountedRef.current = true;
    return () => { mountedRef.current = false; };
  }, []);

  /* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
     Core Fly Logic (Clone & Expand)
     ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
  function flyClone(cardIndex: number, onComplete?: () => void) {
    if (!mountedRef.current || !sectionRef.current || !heroRef.current || !carouselRef.current) return;

    const section  = sectionRef.current;
    const hero     = heroRef.current;
    const carousel = carouselRef.current;

    const cardEls = carousel.querySelectorAll<HTMLElement>('[data-hero-card]');
    const cardEl  = cardEls[cardIndex];
    if (!cardEl) return;
    const thumbEl = cardEl.querySelector<HTMLElement>('[data-thumb]');
    if (!thumbEl) return;

    /* Measure start and end positions */
    const tR = thumbEl.getBoundingClientRect();
    const hR = hero.getBoundingClientRect();
    const sR = section.getBoundingClientRect();

    const imgSrc = cardEl.getAttribute('data-src') || '';
    const title  = cardEl.getAttribute('data-title') || '';

    /* Create the clone flyer container */
    const flyer = document.createElement('div');
    const newZ  = ++heroZRef.current;
    
    // Target Hero dimensions
    const fL = hR.left - sR.left;
    const fT = hR.top  - sR.top;
    const fW = hR.width;
    const fH = hR.height;

    // Start Thumbnail dimensions (reading current mid-slide position)
    const startL = tR.left - sR.left;
    const startT = tR.top  - sR.top;
    const startW = tR.width;
    const startH = tR.height;

    Object.assign(flyer.style, {
      position: 'absolute',
      left:     `${startL}px`,
      top:      `${startT}px`,
      width:    `${startW}px`,
      height:   `${startH}px`,
      zIndex:   String(newZ + 100),
      overflow: 'hidden',
      pointerEvents: 'none',
      borderRadius: '16px', // Matches card
      boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
    });

    // We apply an initial scale to the inner image, and tween it to 1. 
    // This creates an organic zooming-out effect that perfectly masks the bounding box aspect ratio shift.
    flyer.innerHTML = `<img src="${imgSrc}" alt="" style="width:100%;height:100%;object-fit:cover;display:block;transform:scale(1.2);transform-origin:center;" />`;
    section.appendChild(flyer);

    const flyerImg = flyer.querySelector('img');

    /* CRUCIAL: The original thumbnail is NEVER hidden. The user explicitly requested no empty cards. */

    /* Animate to hero */
    gsap.to(flyer, {
      left: fL,
      top: fT,
      width: fW,
      height: fH,
      borderRadius: '32px',
      duration: FLY_MS / 1000,
      ease: 'power3.inOut',
      onComplete: () => {
        if (!mountedRef.current) return;

        /* Push to hero stack, keeping max 2 layers so the old one is cleaned up */
        setHeroLayers(prev =>
          [...prev, { src: imgSrc, title, uid: nextUid(), z: newZ }].slice(-2)
        );
        flyer.remove();
        
        if (onComplete) onComplete();
      },
    });

    if (flyerImg) {
      gsap.to(flyerImg, {
        scale: 1,
        duration: FLY_MS / 1000,
        ease: 'power3.inOut'
      });
    }
  }

  /* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
     Sequence Orchestration
     ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
  function runLoop() {
    if (!mountedRef.current) return;

    /* 1. Slide: Shift cards left */
    setCards(prev => {
      const shifted = prev.slice(1);
      const img = nextFromPool();
      shifted.push({ src: img.src, title: img.title, uid: nextUid() });
      return shifted;
    });

    /* 2. Overlap Rise: At 80% of slide, spawn clone from the NEW center card */
    requestAnimationFrame(() => requestAnimationFrame(() => {
      if (!mountedRef.current) return;

      setTimeout(() => {
        if (!mountedRef.current) return;

        // Index 3 is the new center card. It is currently sliding into position.
        flyClone(3, () => {
          /* Loop continues */
          setTimeout(() => {
            if (mountedRef.current) runLoop();
          }, PAUSE_MS);
        });

      }, SLIDE_MS * OVERLAP);
    }));
  }

  /* Initial kick-off */
  useEffect(() => {
    if (cards.length === 7 && !startedRef.current) {
      startedRef.current = true;
      
      const timer = setTimeout(() => {
        if (!mountedRef.current) return;
        
        /* First setup: Fly center card up */
        flyClone(3, () => {
          setTimeout(() => {
            if (mountedRef.current) runLoop();
          }, 1500);
        });

      }, 1000);
      
      return () => clearTimeout(timer);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cards.length]);

  return (
    <section
      ref={sectionRef}
      className="relative px-4 md:px-8 mt-6 mb-12"
      style={{ isolation: 'isolate' }}
    >
      <div
        className="max-w-7xl mx-auto relative w-full"
        style={{ height: 'clamp(520px, 72vh, 760px)' }}
      >
        {/* ─── Hero Display Area ─── */}
        <div
          ref={heroRef}
          className="absolute top-0 left-0 w-full h-[calc(100%-210px)] rounded-[32px] overflow-hidden z-[5]"
          style={{ background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)' }}
        >
          {heroLayers.length === 0 && (
            <div className="absolute inset-0 flex items-center justify-center z-0">
              <p className="text-white/20 text-lg tracking-widest uppercase font-light">
                {websiteName}
              </p>
            </div>
          )}

          {heroLayers.map(layer => (
            <div
              key={layer.uid}
              className="absolute inset-0"
              style={{ zIndex: layer.z }}
            >
              <Image
                src={layer.src}
                alt={layer.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 1280px"
                priority
                unoptimized
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a]/90 via-[#0f172a]/20 to-transparent" />
              <div className="absolute bottom-6 md:bottom-10 left-6 md:left-10 right-6 text-white z-10">
                <span className="inline-block px-3 py-1 mb-3 text-[0.65rem] font-semibold uppercase tracking-[0.2em] bg-white/15 backdrop-blur-sm rounded-full border border-white/20">
                  {badgeText}
                </span>
                <h3 className="text-2xl md:text-5xl font-bold mb-2 md:mb-3 leading-tight drop-shadow-md">
                  {layer.title}
                </h3>
                <p className="text-white/80 max-w-md text-xs md:text-base leading-relaxed line-clamp-2">
                  {descriptionText}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* ─── Bottom Carousel ─── */}
        <div
          ref={carouselRef}
          className="absolute bottom-0 left-0 w-full h-[210px] overflow-hidden z-[4]"
        >
          {cards.map((card, i) => {
            const isCenter = i === 3;
            const leftPct  = OFFSET + i * STEP;

            return (
              <div
                key={card.uid}
                data-hero-card=""
                data-title={card.title}
                data-src={card.src}
                className="flex items-center justify-center"
                style={{
                  position: 'absolute',
                  left: `${leftPct}%`,
                  width: `${WIDTH}%`,
                  top: 0,
                  bottom: 0,
                  transition: `left ${SLIDE_MS}ms cubic-bezier(0.65, 0, 0.35, 1)`,
                  zIndex: isCenter ? 2 : 1,
                }}
              >
                {/* Two-part card design as per user request */}
                <div
                  style={{
                    position: 'relative',
                    display: 'flex',
                    flexDirection: 'column',
                    width: '100%',
                    aspectRatio: '4 / 3',
                    borderRadius: '16px',
                    overflow: 'hidden',
                    backgroundColor: '#ffffff',
                    border: '1px solid rgba(0,0,0,0.08)',
                    transform: isCenter ? 'translateY(-6px) scale(1.08)' : 'scale(1)',
                    transition: 'transform 0.5s cubic-bezier(0.4,0,0.2,1)',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                  }}
                >
                  <div
                    data-thumb=""
                    className="relative w-full"
                    style={{ height: '75%' }}
                  >
                    <Image
                      src={card.src}
                      alt={card.title}
                      fill
                      className="object-cover"
                      sizes="200px"
                      unoptimized
                    />
                  </div>

                  {/* Label */}
                  <div className="w-full bg-white border-t border-gray-100 px-1 flex items-center justify-center shrink-0" style={{ height: '25%' }}>
                    <span className="text-[clamp(0.55rem,0.7vw,0.72rem)] font-bold uppercase tracking-wider text-gray-800 text-center line-clamp-1">
                      {card.title}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
