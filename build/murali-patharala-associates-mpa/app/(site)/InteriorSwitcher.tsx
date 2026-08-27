'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

const INTERIOR_PROJECTS = [
  {
    img: '/images/stock/a151a9e5.webp',
    title: 'Living & Dining Spaces',
    label: 'Living & Dining — Open Plan & Concealed Architectural Lighting',
    desc: 'Deep structural planning allows for recessed cove lighting, flush floor transitions, and concealed HVAC/ducting before casting slabs.',
  },
  {
    img: '/images/stock/af2da1d1.webp',
    title: 'Master Bedroom Suites',
    label: 'Master Bedroom — Acoustic Insulation & Floor-to-Ceiling Millwork',
    desc: 'Bespoke wardrobe alcoves, acoustic glazing, and private balcony orientation designed directly into the architectural layout.',
  },
  {
    img: '/images/stock/c87d10e5.webp',
    title: 'Modular Kitchens & Pantries',
    label: 'Kitchen & Utility — Ergonomic Work Triangles & Seamless Ventilation',
    desc: 'Gas piping, chimney shafts, heavy-duty quartz counters, and water filtration conduits planned before foundation masonry.',
  },
];

export default function InteriorSwitcher() {
  const [interiorIndex, setInteriorIndex] = useState(0);

  // Auto-advance tabs every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setInteriorIndex((prev) => (prev + 1) % INTERIOR_PROJECTS.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="border-b-4 border-[#111111] bg-[#111111]">
      <div className="grid md:grid-cols-2">
        {/* Left Explanation Column */}
        <div className="p-8 md:p-16 border-b-4 md:border-b-0 md:border-r-4 border-[#111111] flex flex-col justify-center bg-[#111111] text-white">
          <p className="text-xs font-bold tracking-[0.2em] uppercase text-[#EA580C] mb-4">
            Interior Architecture
          </p>
          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-bold font-serif mb-6 leading-tight text-white tracking-tight"
            style={{ fontFamily: "'Lora', serif" }}
          >
            Designed From The Inside Out.
          </h2>
          <p className="text-white/75 mb-6 text-sm sm:text-base leading-relaxed font-medium">
            We design interiors concurrently with the structural blueprint. This allows for perfectly placed recessed lighting, concealed plumbing conduits, and custom wall niches—eliminating expensive post-construction hacking and modifications.
          </p>

          <p className="text-xs sm:text-sm text-[#EA580C] font-semibold mb-8">
            {INTERIOR_PROJECTS[interiorIndex].desc}
          </p>

          {/* Interactive Progress Tabs */}
          <div className="space-y-3">
            <div className="flex gap-3">
              {INTERIOR_PROJECTS.map((proj, i) => (
                <button
                  key={i}
                  onClick={() => setInteriorIndex(i)}
                  aria-label={`View ${proj.title}`}
                  className="flex-1 text-left group cursor-pointer focus:outline-none"
                >
                  <div
                    className={`h-2 transition-all duration-300 ${
                      i === interiorIndex ? 'bg-[#EA580C]' : 'bg-[#2A2A2A] hover:bg-[#444444]'
                    }`}
                  />
                  <span
                    className={`block mt-2 text-[10px] sm:text-xs font-bold uppercase tracking-wider transition-colors ${
                      i === interiorIndex ? 'text-white' : 'text-[#757575] group-hover:text-white/80'
                    }`}
                  >
                    0{i + 1}. {proj.title}
                  </span>
                </button>
              ))}
            </div>
            <p className="text-xs font-bold uppercase tracking-widest text-[#EA580C] pt-4 border-t border-[#262626]">
              {INTERIOR_PROJECTS[interiorIndex].label}
            </p>
          </div>
        </div>

        {/* Right Dynamic Cross-fading Image Display */}
        <div className="relative min-h-[400px] md:min-h-full aspect-square md:aspect-auto bg-[#181818] overflow-hidden">
          {INTERIOR_PROJECTS.map((proj, i) => (
            <div
              key={i}
              className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                i === interiorIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
              }`}
            >
              <Image
                src={proj.img}
                alt={proj.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#111111]/80 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white z-20">
                <span className="text-[10px] font-bold tracking-widest uppercase bg-[#EA580C] text-[#111111] px-2.5 py-1">
                  Active Space Preview
                </span>
                <h4
                  className="text-xl sm:text-2xl font-bold font-serif mt-2"
                  style={{ fontFamily: "'Lora', serif" }}
                >
                  {proj.title}
                </h4>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
