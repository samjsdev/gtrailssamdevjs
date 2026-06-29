'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function GsapInit() {
  const pathname = usePathname();

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    // Create GSAP Context to easily clean up/revert all animations on path change
    const ctx = gsap.context(() => {
      
      // 1. REVEALS (FADE & SLIDE UP)
      const reveals = gsap.utils.toArray('[data-gsap="reveal"]');
      gsap.set(reveals, { y: 40, opacity: 0 });

      // 2. STAGGERED GRIDS / CARDS
      const staggerContainers = gsap.utils.toArray('[data-gsap="stagger-container"]');
      staggerContainers.forEach((container: any) => {
        const items = container.querySelectorAll('[data-gsap="stagger-item"]');
        if (items.length > 0) {
          gsap.set(items, { y: 30, opacity: 0 });
        }
      });

      // 3. FADE IN ONLY (NO MOVEMENT)
      const fadeIns = gsap.utils.toArray('[data-gsap="fade-in"]');
      gsap.set(fadeIns, { opacity: 0 });

      // Delay ScrollTrigger initialization until loader is done (approx 2.5s)
      timeoutId = setTimeout(() => {
        ctx.add(() => {
          
          reveals.forEach((element: any) => {
            gsap.to(element, {
              y: 0,
              opacity: 1,
              duration: 0.8,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: element,
                start: 'top 85%',
                toggleActions: 'play none none none',
              }
            });
          });

          staggerContainers.forEach((container: any) => {
            const items = container.querySelectorAll('[data-gsap="stagger-item"]');
            if (items.length === 0) return;

            gsap.to(items, {
              y: 0,
              opacity: 1,
              duration: 0.8,
              stagger: 0.1,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: container,
                start: 'top 85%',
                toggleActions: 'play none none none',
              }
            });
          });

          fadeIns.forEach((element: any) => {
            gsap.to(element, {
              opacity: 1,
              duration: 1.0,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: element,
                start: 'top 85%',
                toggleActions: 'play none none none',
              }
            });
          });

          ScrollTrigger.refresh();
        });
      }, 2500);

      // Allow initial render to settle
      ScrollTrigger.refresh();
    });

    return () => {
      clearTimeout(timeoutId);
      ctx.revert();
    };
  }, [pathname]);

  return null;
}
