'use client';
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export default function ClientLoader({ brandName }: { brandName: string }) {
  const [isMounted, setIsMounted] = useState(true);
  const loaderRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!textRef.current || !loaderRef.current) return;
    
    // Split text into spans for staggered animation
    const chars = textRef.current.innerText.split('');
    textRef.current.innerHTML = '';
    chars.forEach((char) => {
      const span = document.createElement('span');
      span.innerText = char === ' ' ? '\u00A0' : char;
      span.style.opacity = '0';
      span.style.display = 'inline-block';
      span.style.transform = 'translateY(20px)';
      textRef.current?.appendChild(span);
    });

    const spans = textRef.current.querySelectorAll('span');

    const tl = gsap.timeline({
      onComplete: () => {
        setIsMounted(false);
      }
    });

    // Animate letters in
    tl.to(spans, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      stagger: 0.05,
      ease: 'power3.out'
    })
    // Animate letters out
    .to(spans, {
      opacity: 0,
      y: -20,
      duration: 0.4,
      stagger: 0.03,
      delay: 0.4,
      ease: 'power3.in'
    })
    // Slide entire loader up
    .to(loaderRef.current, {
      yPercent: -100,
      duration: 1,
      ease: 'expo.inOut'
    });
  }, []);

  if (!isMounted) return null;

  return (
    <div 
      ref={loaderRef}
      className="fixed inset-0 z-[99999] bg-[#1a1a2e] flex items-center justify-center"
      style={{ isolation: 'isolate' }}
    >
      <div 
        ref={textRef}
        className="text-white text-2xl md:text-4xl font-light tracking-[0.3em] uppercase drop-shadow-md"
      >
        {brandName || 'DESIGN'}
      </div>
    </div>
  );
}
