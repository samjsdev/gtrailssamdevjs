"use client";

import { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';
import { useLoading } from '../../context/LoadingContext';
import { useTemplateData } from '../../context/TemplateContext';

export default function Preloader() {
  const { isLoading: hasBlockingTasks } = useLoading();
  const { data } = useTemplateData();
  const [shouldHide, setShouldHide] = useState(false);
  
  const overlayRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Disable scrolling while loading
    if (!shouldHide) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [shouldHide]);

  useEffect(() => {
    const tl = gsap.timeline();

    // 1. Initial Progress (Fast to 60%, then slow to 90%)
    if (barRef.current) {
        tl.to(barRef.current, {
            width: '60%',
            duration: 0.8,
            ease: 'power2.out'
        })
        .to(barRef.current, {
            width: '90%',
            duration: 2.0,
            ease: 'power1.out'
        });
    }

    // This effect runs once. The timeline will pause at the end of the above sequence naturally 
    // because we haven't added more tweens.
    // We need to wait for `hasBlockingTasks` to be false AND the timeline to be sufficiently progressed.
    
    return () => {
        tl.kill();
        document.body.style.overflow = '';
    };
  }, []);

  // Monitor completion
  useEffect(() => {
      // If we have no blocking tasks, we can finish the animation.
      if (!hasBlockingTasks && barRef.current && overlayRef.current) {
         
         // Animate to 100% and close
         const tl = gsap.timeline({
             onComplete: () => setShouldHide(true)
         });

         tl.to(barRef.current, {
             width: '100%',
             duration: 0.2,
             ease: 'power2.inOut',
             overwrite: true // Overwrite the slow 90% creep
         });
         
         if (textRef.current) {
            tl.to(textRef.current, {
                opacity: 0,
                y: -20,
                duration: 0.2,
                ease: 'power2.in'
            }, "-=0.1");
         }

         tl.to(overlayRef.current, {
             opacity: 0,
             duration: 0.3,
             ease: 'power2.inOut'
         }, "-=0.1");
      }
  }, [hasBlockingTasks]);

  if (shouldHide) return null;

  return (
    <div ref={overlayRef} className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#eaf6ff]" style={{ zIndex: 9999 }}>
      <div ref={textRef} className="flex flex-col items-center gap-6">
        {/* Logo or Brand Name */}
        <h1 className="text-4xl md:text-6xl font-bold text-slate-800 tracking-tighter text-center px-4">
          {(() => {
            const businessName = data?.business?.name || data?.clinic?.name || 'LUMINA INTERIOR';
            const nameParts = businessName.split(' ');
            const lastWord = nameParts.length > 1 ? nameParts.pop() : '';
            const firstPart = nameParts.join(' ');
            return (
              <>
                {firstPart} {lastWord && <span className="text-blue-600">{lastWord}</span>}
              </>
            );
          })()}
        </h1>
        
        {/* Progress Bar Container */}
        <div className="w-64 h-1 bg-blue-200/50 rounded-full overflow-hidden">
          <div ref={barRef} className="h-full w-0 bg-blue-600 rounded-full" />
        </div>
        
        {/* Optional Text to show what we are waiting for (debug only usually) */}
        {/* <div className="text-xs text-blue-400">Loading Experience...</div> */}
      </div>
    </div>
  );
}
