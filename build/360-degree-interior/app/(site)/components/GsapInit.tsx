'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

export default function GsapInit() {
  const pathname = usePathname();

  useEffect(() => {
    // Create GSAP Context to easily clean up/revert all animations on path change
    const ctx = gsap.context(() => {
      
      // 1. HERO ANIMATIONS
      const heroTitle = document.querySelector('[data-gsap="hero-title"]');
      const heroSub = document.querySelector('[data-gsap="hero-sub"]');
      const heroBtn = document.querySelector('[data-gsap="hero-btn"]');
      const heroBg = document.querySelector('[data-gsap="hero-bg"]');

      if (heroBg) {
        gsap.fromTo(heroBg, 
          { scale: 1.15, opacity: 0 }, 
          { scale: 1, opacity: 1, duration: 1.8, ease: 'power3.out' }
        );
      }

      const heroTimeline = gsap.timeline({ delay: 0.15 });

      if (heroSub) {
        heroTimeline.fromTo(heroSub, 
          { y: 30, opacity: 0 }, 
          { y: 0, opacity: 0.8, duration: 0.8, ease: 'power3.out' }
        );
      }
      if (heroTitle) {
        heroTimeline.fromTo(heroTitle, 
          { y: 40, opacity: 0 }, 
          { y: 0, opacity: 1, duration: 1.0, ease: 'power3.out' },
          '-=0.6'
        );
      }
      if (heroBtn) {
        heroTimeline.fromTo(heroBtn, 
          { y: 20, opacity: 0 }, 
          { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' },
          '-=0.5'
        );
      }

      // 2. ELEMENT REVEALS (FADE & SLIDE UP)
      const reveals = gsap.utils.toArray('[data-gsap="reveal"]');
      reveals.forEach((element: any) => {
        gsap.fromTo(element,
          { y: 45, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.0,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: element,
              start: 'top 88%',
              toggleActions: 'play none none none',
            }
          }
        );
      });

      // 3. STAGGERED GRIDS / CARDS
      const staggerContainers = gsap.utils.toArray('[data-gsap="stagger-container"]');
      staggerContainers.forEach((container: any) => {
        const items = container.querySelectorAll('[data-gsap="stagger-item"]');
        if (items.length === 0) return;

        gsap.fromTo(items,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.12,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: container,
              start: 'top 85%',
              toggleActions: 'play none none none',
            }
          }
        );
      });

      // 4. IMAGE PARALLAX EFFECT
      const parallaxContainers = gsap.utils.toArray('[data-gsap="parallax-container"]');
      parallaxContainers.forEach((container: any) => {
        const img = container.querySelector('[data-gsap="parallax-img"]');
        if (!img) return;

        gsap.fromTo(img,
          { yPercent: -8 },
          {
            yPercent: 8,
            ease: 'none',
            scrollTrigger: {
              trigger: container,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
            }
          }
        );
      });

      // 5. CHRONICLE JOURNEY TIMELINE (ABOUT PAGE)
      const timelineTrack = document.querySelector('[data-gsap="timeline-track"]');
      if (timelineTrack) {
        // Draw the vertical line on scroll
        const progressBar = timelineTrack.querySelector('[data-gsap="timeline-progress"]');
        if (progressBar) {
          gsap.fromTo(progressBar,
            { scaleY: 0 },
            {
              scaleY: 1,
              ease: 'none',
              scrollTrigger: {
                trigger: timelineTrack,
                start: 'top 30%',
                end: 'bottom 70%',
                scrub: true,
              }
            }
          );
        }

        // Reveal the bullets & text as they scroll into view
        const nodes = timelineTrack.querySelectorAll('[data-gsap="timeline-node"]');
        nodes.forEach((node: any) => {
          const bullet = node.querySelector('.timeline-bullet');
          const content = node.querySelector('.timeline-content');
          
          if (bullet) {
            gsap.fromTo(bullet,
              { scale: 0.8, backgroundColor: '#fafaf9' }, // bg-stone-50
              {
                scale: 1.25,
                backgroundColor: '#1c1917', // bg-stone-900
                duration: 0.4,
                scrollTrigger: {
                  trigger: node,
                  start: 'top 55%',
                  end: 'top 45%',
                  scrub: true,
                }
              }
            );
          }

          if (content) {
            gsap.fromTo(content,
              { opacity: 0.3, y: 15 },
              {
                opacity: 1,
                y: 0,
                duration: 0.5,
                scrollTrigger: {
                  trigger: node,
                  start: 'top 65%',
                  toggleActions: 'play none none reverse',
                }
              }
            );
          }
        });
      }

      // 6. GALLERY CARD ENTRANCES ON LOAD/RENDER
      const galleryGrid = document.querySelector('[data-gsap="gallery-grid"]');
      if (galleryGrid) {
        const cards = galleryGrid.querySelectorAll('[data-gsap="gallery-card"]');
        if (cards.length > 0) {
          gsap.fromTo(cards,
            { opacity: 0, scale: 0.95 },
            {
              opacity: 1,
              scale: 1,
              duration: 0.6,
              stagger: 0.05,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: galleryGrid,
                start: 'top 90%',
                toggleActions: 'play none none none',
              }
            }
          );
        }
      }

      // 7. WORK CYCLE TIMELINE ANIMATIONS (HOME PAGE)
      const workCycleTrack = document.querySelector('[data-gsap="work-cycle-track"]');
      if (workCycleTrack) {
        const items = workCycleTrack.querySelectorAll('[data-gsap="work-cycle-item"]');
        items.forEach((item: any) => {
          const imgContainer = item.querySelector('[data-gsap="work-cycle-img-container"]');
          const img = item.querySelector('[data-gsap="work-cycle-img"]');
          const text = item.querySelector('[data-gsap="work-cycle-text"]');
          const num = item.querySelector('[data-gsap="work-cycle-num"]');

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: item,
              start: 'top 75%',
              toggleActions: 'play none none none',
            }
          });

          // Image reveal and scale down
          if (imgContainer && img) {
            tl.fromTo(imgContainer,
              { opacity: 0, y: 30 },
              { opacity: 1, y: 0, duration: 1.0, ease: 'power3.out' }
            )
            .fromTo(img,
              { scale: 1.05 },
              { scale: 1, duration: 1.5, ease: 'power2.out' },
              '-=1.0' // start at same time
            );
          }

          // Number watermark fade in
          if (num) {
            tl.fromTo(num,
              { opacity: 0, x: -20 },
              { opacity: 0.2, x: 0, duration: 0.8, ease: 'power2.out' },
              '-=1.2'
            );
          }

          // Text slide up and fade in
          if (text) {
            tl.fromTo(text,
              { opacity: 0, y: 40 },
              { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
              '-=1.0' // start slightly after image starts
            );
          }
        });
      }

      // Initial ScrollTrigger layout calculations refresh
      ScrollTrigger.refresh();
    });

    // Make sure layouts and images have settled before calculating trigger points
    const handle = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 150);

    return () => {
      clearTimeout(handle);
      ctx.revert(); // Kills and reverts all scrolltriggers and tweens
    };
  }, [pathname]);

  return null;
}
