import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import Link from 'next/link';

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    id: 'REC-001',
    text: "I hired Lumina Interior for my full home renovation. Really it was a wonderful experience. The design team was always polite and creative. Taking care of a client's vision is so good in this place. I am really satisfied with the final look. And also the fees were very reasonable.",
    author: "Sanjeev V",
    treatment: "Full Home Renovation",
    rating: 5
  },
  {
    id: 'REC-002',
    text: "One of the Top Notch Interior Designers in the city. They explained well about the space optimization and what we should do now and also talked about future steps needed for scaling the aesthetics. Awesome care, polite and professional team.",
    author: "Victor D",
    treatment: "Space Planning",
    rating: 5
  },
  {
    id: 'REC-003',
    text: "My family recently underwent a complete living room and kitchen makeover with Lumina Interior, and we couldn't be happier with the experience. The entire process, from consultation to completion, was handled with exceptional care and professionalism.",
    author: "Arumuga Nainar",
    treatment: "Kitchen & Living Room",
    rating: 5
  },
  {
    id: 'REC-004',
    text: "Lumina Interior is one of the best agencies. I went for the first time with a lot of doubts in my mind but beyond my expectations everything was so good. Especially the lead designer was so polite and kind enough. They explained each and every step clearly.",
    author: "Christy Elsie",
    treatment: "Residential Design",
    rating: 5
  }
];

const TestimonialsSection = ({ data }: { data?: any }) => {
  const containerRef = useRef<HTMLElement>(null);
  
  const reviews = data?.reviews?.length ? data.reviews : testimonials;

  useGSAP(() => {
    // Header Trigger
    gsap.fromTo('.testimonials-pill',
      { y: 20, opacity: 0 },
      { 
        y: 0, 
        opacity: 1, 
        duration: 0.8, 
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.testimonials-pill',
          start: 'top 85%'
        }
      }
    );

    gsap.fromTo('.testimonials-title',
      { y: 35, opacity: 0 },
      { 
        y: 0, 
        opacity: 1, 
        duration: 1.0, 
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.testimonials-title',
          start: 'top 85%'
        }
      }
    );

    gsap.fromTo('.testimonials-rating',
      { y: 20, opacity: 0 },
      { 
        y: 0, 
        opacity: 1, 
        duration: 0.8, 
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.testimonials-rating',
          start: 'top 90%'
        }
      }
    );

    // Cards Batch Trigger
    ScrollTrigger.batch('.testimonial-card', {
      start: 'top 85%',
      onEnter: (batch) => {
        gsap.fromTo(batch, 
          { y: 60, opacity: 0 }, 
          {
            y: 0, 
            opacity: 1, 
            duration: 1, 
            stagger: 0.2, 
            ease: 'power3.out',
            onComplete: () => {
              gsap.set(batch, { clearProps: 'transform,opacity' }); // Optional: clear to allow hover effects if CSS transforms are utilized
            }
          }
        );
      },
      once: true
    });
      
    // CTA Animation (Separate Trigger)
    gsap.fromTo('.cta-container', 
      { y: 40, opacity: 0, scale: 0.98 },
      { 
        y: 0, 
        opacity: 1, 
        scale: 1, 
        duration: 1, 
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.cta-container',
          start: 'top 80%', // Wait for it to be substantially in view
          toggleActions: 'play none none none'
        }
      }
    );

  }, { scope: containerRef });

  return (
    <section
      ref={containerRef}
      className="py-16 md:py-24 px-6"
      style={{ backgroundColor: "var(--bg)" }}
      id="testimonials"
    >
      <div className="max-w-[1200px] mx-auto">
        <div className="text-center mb-12 md:mb-16">
          <div
            className="testimonials-pill inline-block px-4 py-2 rounded-full text-xs font-mono tracking-wide mb-6"
            style={{
              backgroundColor: "var(--surface)",
              color: "var(--accent-2)",
            }}
          >
            // CLIENT_REVIEWS
          </div>
          <h2
            className="testimonials-title text-3xl md:text-4xl lg:text-5xl font-light mb-8"
            style={{ fontFamily: "var(--serif-font)", color: "var(--text)" }}
          >
            Why Clients Choose Us
          </h2>
          <div
            className="testimonials-rating inline-flex items-center gap-3 px-5 py-2.5 rounded-full border"
            style={{
              borderColor: "var(--accent-2)",
              backgroundColor: "var(--glow)",
            }}
          >
            <span
              className="text-lg tracking-wide"
              style={{ color: "var(--accent-2)" }}
            >
              ★★★★★
            </span>
            <span
              className="text-sm font-medium"
              style={{ color: "var(--text)" }}
            >
              Trusted by Homeowners
            </span>
          </div>
        </div>

        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 mb-24">
          {reviews.map((testimonial: any, idx: number) => (
            <article
              key={idx}
              className="testimonial-card relative p-8 md:p-10 rounded-[32px] bg-[var(--surface-2)] border border-[var(--border)] hover:border-[var(--accent-2)]/50 transition-all duration-300 flex flex-col justify-between"
              style={{
                background: "linear-gradient(145deg, rgba(255,255,255,0.6) 0%, rgba(255,255,255,0.2) 100%)",
                backdropFilter: "blur(20px)",
              }}
            >
              {/* Large Quote Icon Background */}
              <div className="absolute top-6 right-8 text-8xl leading-none opacity-5 font-serif pointer-events-none select-none text-[var(--accent)] group-hover:opacity-10 transition-opacity">
                &rdquo;
              </div>

              <div className="flex flex-wrap items-center justify-between mb-8 relative z-10 gap-4">
                <div className="flex flex-col gap-1">
                   <div className="flex items-center gap-2">
                       <span className="w-8 h-8 rounded-full bg-[var(--surface-2)] flex items-center justify-center text-xs font-bold text-[var(--accent)] border border-[var(--border)]">
                          {idx + 1}
                       </span>
                   </div>
                </div>
                
                <div
                  className="px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide border border-blue-100/50 shadow-sm"
                  style={{
                    backgroundColor: "rgba(255,255,255,0.5)",
                    color: "var(--accent)",
                  }}
                >
                  {testimonial.treatment}
                </div>
              </div>

              <p
                className="t-content text-lg md:text-[1.15rem] leading-relaxed mb-8 font-light relative z-10"
                style={{
                  fontFamily: "var(--serif-font)",
                  color: "var(--text)",
                }}
              >
                "{testimonial.text}"
              </p>

              <div
                className="flex flex-col sm:flex-row sm:items-end justify-between pt-6 border-t border-white/30 relative z-10 gap-4"
              >
                <div className="t-meta">
                  <h4 className="font-serif text-lg text-[var(--text)]">{testimonial.author || testimonial.author_name}</h4>
                  <p className="text-sm text-[var(--muted)]">{testimonial.treatment || 'Verified Client'}</p>
                </div>
                <div className="flex gap-0.5">
                  {Array.from({ length: testimonial.rating || 5 }).map((_, i) => (
                    <span
                      key={i}
                      className="t-star text-lg drop-shadow-sm"
                      style={{ color: "#FFB02E" }}
                    >
                      ★
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* CTA Section */}
        <div className="cta-container text-center max-w-3xl mx-auto py-12 px-6 rounded-3xl glass-card border border-white/40 shadow-xl relative overflow-hidden group">
           {/* Background decorative glow */}
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[var(--accent-2)] opacity-5 rounded-full blur-[100px] pointer-events-none group-hover:opacity-10 transition-opacity duration-700" />
           
           <div className="relative z-10">
              <span className="inline-block text-xs font-bold tracking-widest text-[var(--accent-2)] uppercase mb-4">
                CONSULTATIONS OPEN
              </span>
              <h3 className="text-3xl md:text-5xl font-light mb-6" style={{ fontFamily: "var(--serif-font)", color: "var(--text)" }}>
                Ready to take the next step?
              </h3>
              <p className="text-lg text-[var(--muted)] mb-10 max-w-xl mx-auto leading-relaxed">
                Speak with our design team and get a clear project plan with transparent pricing—focused on aesthetics, functionality, and long‑term satisfaction.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                 <Link 
                   href="/contact" 
                   className="px-8 py-4 rounded-full bg-[var(--text)] text-[var(--bg)] font-medium text-lg hover:scale-105 transition-transform shadow-lg flex items-center gap-2"
                 >
                   Book a Consultation <span>→</span>
                 </Link>
                 <a 
                   href="tel:09543602232" 
                   className="px-8 py-4 rounded-full border border-[var(--border)] text-[var(--text)] font-medium text-lg hover:bg-[var(--surface-2)] transition-colors"
                 >
                   Call 095436 02232
                 </a>
              </div>
           </div>
        </div>

      </div>

    </section>
  );
};

export default TestimonialsSection;
