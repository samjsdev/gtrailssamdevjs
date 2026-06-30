"use client";

import { useRef } from "react";
import { ArrowRight } from "lucide-react";

const services = [
  {
    title: "Construction",
    price: "Premium Quality",
    desc: "100% Vastu Plan, 1 Year Maintenance, High Quality Materials.",
    image: "https://images.unsplash.com/photo-1541888081628-912b7a97dc95?auto=format&fit=crop&q=80&w=2000",
    color: "bg-[#0A0A0A]",
    textColor: "text-[#FCFAF6]"
  },
  {
    title: "Home Interiors",
    price: "Custom Quotes",
    desc: "Material Warranty, Modular Kitchens, Premium Finishes.",
    image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=2000",
    color: "bg-[#FCFAF6]",
    textColor: "text-[#0A0A0A]"
  },
  {
    title: "Architectural Planning",
    price: "2D/3D Elevations",
    desc: "Custom layouts, structurally sound, aesthetics driven.",
    image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&q=80&w=2000",
    color: "bg-[#C1FF72]",
    textColor: "text-[#0A0A0A]"
  },
  {
    title: "Renovations",
    price: "Expert Execution",
    desc: "Turnkey execution, smart space planning, modern upgrades.",
    image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=2000",
    color: "bg-[#151515]",
    textColor: "text-[#FCFAF6]"
  }
];

export default function ServicesSlider() {
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <section className="py-24 bg-[#FCFAF6] text-[#0A0A0A] overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-8 mb-16 flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div className="max-w-2xl">
          <h2 className="text-4xl md:text-6xl font-serif font-bold tracking-tight mb-6">Our Services</h2>
          <p className="text-[#0A0A0A]/60 text-lg leading-relaxed">
            From foundation to finishing, we provide end-to-end solutions. Honest pricing and premium materials, delivered by industry leading experts.
          </p>
        </div>
        <div className="flex gap-4">
          <button 
            onClick={() => scrollRef.current?.scrollBy({ left: -350, behavior: 'smooth' })}
            className="w-14 h-14 rounded-full border border-[#0A0A0A]/20 flex items-center justify-center hover:bg-[#0A0A0A] hover:text-[#FCFAF6] transition-colors"
          >
            <ArrowRight className="w-6 h-6 rotate-180" />
          </button>
          <button 
            onClick={() => scrollRef.current?.scrollBy({ left: 350, behavior: 'smooth' })}
            className="w-14 h-14 rounded-full border border-[#0A0A0A]/20 flex items-center justify-center hover:bg-[#0A0A0A] hover:text-[#FCFAF6] transition-colors"
          >
            <ArrowRight className="w-6 h-6" />
          </button>
        </div>
      </div>

      <div 
        ref={scrollRef}
        className="flex overflow-x-auto gap-8 px-8 pb-16 snap-x snap-mandatory hide-scrollbar"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {services.map((service, idx) => (
          <div 
            key={idx} 
            className={`snap-center shrink-0 w-[85vw] md:w-[400px] rounded-[2rem] overflow-hidden group border border-[#0A0A0A]/5 shadow-xl hover:shadow-2xl transition-all duration-500 ${service.color} ${service.textColor}`}
          >
            <div className="h-64 overflow-hidden relative">
              <img 
                src={service.image} 
                alt={service.title} 
                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute top-4 right-4 bg-[#C1FF72] text-[#0A0A0A] px-4 py-2 rounded-full font-bold text-sm shadow-md transform -translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                {service.price}
              </div>
            </div>
            <div className="p-8">
              <h3 className="text-2xl font-bold mb-2">{service.title}</h3>
              <p className="opacity-70 mb-8 min-h-[48px]">{service.desc}</p>
              
              <div className="flex items-center gap-4 cursor-pointer font-bold uppercase tracking-widest text-sm group/btn">
                <span className="group-hover/btn:mr-2 transition-all">Explore</span>
                <div className="w-10 h-10 rounded-full border border-current flex items-center justify-center group-hover/btn:bg-current group-hover/btn:text-white transition-colors">
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
