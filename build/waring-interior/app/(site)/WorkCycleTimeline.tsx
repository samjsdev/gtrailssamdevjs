"use client";

import React from "react";

const WORK_CYCLE = [
  { title: "Client Meeting", desc: "We begin by deeply understanding your vision, lifestyle, and the unique potential of your space.", img: "/images/interiorimages/cycle1.webp" },
  { title: "Concept Design", desc: "Translating ideas into comprehensive mood boards, spatial layouts, and photorealistic 3D renders.", img: "/images/interiorimages/cycle2.webp" },
  { title: "Visualize Design to Client", desc: "Hand-selecting premium finishes, bespoke furnishings, and exquisite textures to elevate the design.", img: "/images/interiorimages/cycle3.webp" },
  { title: "Estimation and Agreement", desc: "Developing rigorous timelines, technical drawings, and resource allocations for flawless execution.", img: "/images/interiorimages/cycle4.webp" },
  { title: "Project Implementation", desc: "Our master craftsmen and project managers bring the vision to life with uncompromising precision.", img: "/images/interiorimages/cycle5.webp" },
  { title: "Work Completion and Handover", desc: "The final layer of polish—staging your space to perfection before welcoming you to your new sanctuary.", img: "/images/interiorimages/cycle6.webp" },
];

export default function WorkCycleTimeline() {
  return (
    <section className="py-24 md:py-32 px-6 bg-stone-50 relative overflow-hidden border-t border-stone-200/60" data-gsap="work-cycle-track">
      <div className="max-w-7xl mx-auto relative z-10">
        
        <div className="text-center mb-24 md:mb-32">
          <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-stone-500 mb-4">— OUR CHRONICLE</p>
          <h2 className="text-3xl md:text-5xl font-light text-stone-900 leading-tight mb-6">
            The Work Cycle
          </h2>
          <p className="text-sm text-stone-500 font-light leading-relaxed max-w-2xl mx-auto">
            A seamless and transparent journey from initial concept to the final, breathtaking reveal.
          </p>
        </div>

        <div className="relative pb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
            {WORK_CYCLE.map((step, index) => {
              return (
                <div key={index} className="flex flex-col group h-full" data-gsap="work-cycle-item">
                  
                  {/* Image Side */}
                  <div className="relative overflow-hidden aspect-[4/3] mb-6 shadow-md rounded-sm border border-stone-200/80 bg-white" data-gsap="work-cycle-img-container">
                    <img 
                      src={step.img} 
                      alt={step.title} 
                      className="w-full h-full object-cover object-center transform transition-transform duration-700 group-hover:scale-105"
                      data-gsap="work-cycle-img"
                    />
                    <div className="absolute bottom-4 right-4 z-20 text-stone-900/40 text-6xl font-thin tracking-tighter" data-gsap="work-cycle-num">
                      0{index + 1}
                    </div>
                  </div>

                  {/* Text Side */}
                  <div data-gsap="work-cycle-text" className="flex flex-col flex-grow text-left">
                    <span className="text-[10px] font-bold uppercase tracking-[0.25em] mb-3 block text-stone-500" data-gsap="work-cycle-phase">
                      Phase 0{index + 1}
                    </span>
                    <h3 className="text-xl font-medium text-stone-900 mb-3">{step.title}</h3>
                    <p className="text-sm text-stone-500 font-light leading-relaxed">
                      {step.desc}
                    </p>
                  </div>

                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
