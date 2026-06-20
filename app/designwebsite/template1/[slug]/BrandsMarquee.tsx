"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

const brands = [
  "ARS 550D",
  "KAG Tiles",
  "Asian Paints",
  "Orbit Wires & Cables",
  "Finolex Industries",
  "Parryware"
];

export default function BrandsMarquee() {
  const marqueeRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const marquee = marqueeRef.current;
    if (!marquee) return;

    // We clone the elements to ensure seamless loop
    const totalWidth = marquee.scrollWidth / 2;

    const tween = gsap.to(marquee, {
      x: -totalWidth,
      ease: "none",
      duration: 15,
      repeat: -1,
    });

    return () => {
      tween.kill();
    };
  }, []);

  return (
    <section className="bg-[#C1FF72] py-6 overflow-hidden flex items-center border-y border-[#0A0A0A]/10">
      <div className="flex gap-4 items-center">
        <h3 className="uppercase font-bold text-[#0A0A0A] tracking-wider whitespace-nowrap pl-8 pr-4">Brands We Used</h3>
        <div className="w-1 h-8 bg-[#0A0A0A] opacity-20 mr-4"></div>
      </div>
      <div className="flex-1 overflow-hidden" ref={containerRef}>
        <div ref={marqueeRef} className="flex whitespace-nowrap gap-16 items-center pr-16 w-max">
          {[...brands, ...brands, ...brands, ...brands].map((brand, index) => (
            <div key={index} className="flex items-center gap-4 group cursor-default">
              <span className="text-xl md:text-3xl font-black text-[#0A0A0A]/80 uppercase tracking-tight group-hover:text-[#0A0A0A] transition-colors">{brand}</span>
              <span className="text-[#0A0A0A]/30 text-2xl">✦</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
