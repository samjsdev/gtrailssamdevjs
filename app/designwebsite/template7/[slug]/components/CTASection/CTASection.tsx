import React, { useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const CTASection = () => {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 70%',
        toggleActions: 'play reverse play reverse'
      }
    });

    tl.fromTo('.cta-shell', { scale: 0.95, opacity: 0 }, { scale: 1, opacity: 1, duration: 1, ease: 'power2.out' }, 0)

      .fromTo('.cta-title', { y: 35, opacity: 0 }, { y: 0, opacity: 1, duration: 1 }, 0.15)
      .fromTo('.cta-copy', { y: 25, opacity: 0 }, { y: 0, opacity: 1, duration: 0.85 }, 0.22)
      .fromTo('.cta-actions > *', 
        { y: 18, opacity: 0 }, 
        { 
          y: 0, 
          opacity: 1, 
          duration: 0.7, 
          stagger: 0.12, 
          onComplete: () => {
            gsap.set('.cta-actions > *', { transition: 'all 0.2s ease' });
          }
        }, 
        0.3
      );
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="py-20 md:py-24 px-6 bg-[var(--bg)]" id="cta">
      <div className="max-w-[1100px] mx-auto">
        <div className="cta-shell relative p-8 md:p-12 lg:p-16 rounded-[32px] bg-[var(--surface)] border border-[var(--border)] overflow-hidden shadow-2xl">
          <div
            className="absolute inset-0 opacity-[0.4] pointer-events-none"
            style={{
              backgroundImage: 'radial-gradient(circle at 20% 20%, var(--glow) 0%, transparent 40%), radial-gradient(circle at 80% 80%, var(--glow-2) 0%, transparent 40%)'
            }}
          ></div>

          <div className="relative z-10 grid md:grid-cols-[1.15fr_0.85fr] gap-8 xl:gap-12 items-start">
            <div>
              <p className="font-mono text-xs tracking-[0.2em] uppercase text-[var(--accent)] mb-4">Next Step</p>
              <h2 className="cta-title text-4xl md:text-5xl font-light mb-6 text-[var(--text)] leading-[1.05]" style={{ fontFamily: 'var(--serif-font)' }}>
                Ready to take the next step?
              </h2>
              <p className="cta-copy text-base md:text-lg max-w-2xl text-[var(--muted)] leading-relaxed mb-8">
                Speak with our team and get a clear treatment plan with transparent pricing-focused on comfort, precision, and long-term oral health.
              </p>

              <div className="cta-actions flex flex-col sm:flex-row gap-4 items-stretch sm:items-center">
                <Link href="/contact" className="group inline-flex justify-center items-center gap-2 px-8 py-4 font-semibold rounded-xl bg-[var(--accent)] text-white hover:bg-[var(--accent)]/90 transition-all duration-200 shadow-lg shadow-[var(--accent)]/25">
                  Book a Consultation
                  <span className="transition-transform duration-200 group-hover:translate-x-0.5">→</span>
                </Link>
                <a href="tel:+919543602232" className="inline-flex justify-center items-center px-8 py-4 font-medium rounded-xl border border-[var(--border)] bg-[var(--surface-2)] text-[var(--text)] hover:border-[var(--accent-2)] hover:text-[var(--accent)] transition-colors">
                  Call +91 95436 02232
                </a>
              </div>
            </div>

            <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface-2)]/50 p-6 md:p-8 backdrop-blur-sm">
              <p className="font-mono text-[11px] tracking-[0.16em] uppercase text-[var(--muted-2)] mb-5">Consultation Promise</p>
              <ul className="space-y-4 text-sm text-[var(--muted)]">
                <li className="flex items-start gap-4">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-[var(--accent-2)] flex-shrink-0"></span>
                  <span>Clear explanation of treatment options and expected outcomes.</span>
                </li>
                <li className="flex items-start gap-4">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-[var(--accent-2)] flex-shrink-0"></span>
                  <span>Transparent pricing discussion before any procedure starts.</span>
                </li>
                <li className="flex items-start gap-4">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-[var(--accent-2)] flex-shrink-0"></span>
                  <span>Care plan coordinated by the right specialist for your case.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
