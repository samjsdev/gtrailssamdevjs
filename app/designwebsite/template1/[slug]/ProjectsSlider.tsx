"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  { src: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=2000", title: "Premium Villas" },
  { src: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80&w=2000", title: "Luxury Exteriors" },
  { src: "https://images.unsplash.com/photo-1600121848594-d8644e57abab?auto=format&fit=crop&q=80&w=2000", title: "Modern Elevation" },
  { src: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&q=80&w=2000", title: "Classic Facade" },
  { src: "https://images.unsplash.com/photo-1600210492493-0946911123ea?auto=format&fit=crop&q=80&w=2000", title: "Interior Layouts" },
];

export default function ProjectsSlider() {
  const sectionRef = useRef<HTMLElement>(null);
  const scrollWrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const wrapper = scrollWrapperRef.current;
    if (!section || !wrapper) return;

    let ctx = gsap.context(() => {
      // Calculate how far to move left
      const getScrollAmount = () => {
        let wrapperWidth = wrapper.scrollWidth;
        return -(wrapperWidth - window.innerWidth + 80); // 80px buffer
      };

      const tween = gsap.to(wrapper, {
        x: getScrollAmount,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${getScrollAmount() * -1}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true
        }
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="bg-[#0A0A0A] text-[#FCFAF6] py-24 min-h-screen flex flex-col justify-center overflow-hidden relative">
      <div className="absolute inset-0 bg-[radial-gradient(#FCFAF6_1px,transparent_1px)] [background-size:24px_24px] opacity-[0.03] pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-8 w-full mb-12 relative z-10 flex items-end justify-between">
        <div>
          <h2 className="text-4xl md:text-6xl font-serif font-medium tracking-tight mb-4">Our Featured Projects</h2>
          <p className="text-[#FCFAF6]/60 max-w-xl text-lg">
            Showcasing our excellence in architecture, infra development, and premium interior design. Experience the premium standard.
          </p>
        </div>
        <div className="hidden md:block text-[#C1FF72] uppercase tracking-widest text-sm font-bold">
          Scroll to explore ⟶
        </div>
      </div>

      <div className="pl-8 relative z-10 w-full">
        <div ref={scrollWrapperRef} className="flex gap-8 w-max">
          {projects.map((proj, idx) => (
            <div key={idx} className="group relative w-[70vw] md:w-[45vw] lg:w-[35vw] h-[50vh] md:h-[60vh] overflow-hidden rounded-[2rem] border border-[#FCFAF6]/10 flex-shrink-0 cursor-grab active:cursor-grabbing">
              <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500 z-10 pointer-events-none" />
              <img 
                src={proj.src} 
                alt={proj.title}
                className="w-full h-full object-cover transform scale-105 group-hover:scale-100 transition-transform duration-700 ease-out"
              />
              <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-[#0A0A0A]/90 to-transparent z-20 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                <h3 className="text-2xl font-bold text-white tracking-wide">{proj.title}</h3>
                <div className="w-12 h-1 bg-[#C1FF72] mt-4 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 delay-100"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
