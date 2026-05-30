'use client';

import Link from 'next/link';
import { Cormorant_Garamond } from 'next/font/google';
import { Hammer, Armchair, Home, Ruler } from 'lucide-react';

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
});

interface ClientHeroProps {
  clinic: any;
  business: any;
  basePath: string;
  heroImage?: string;
}

export default function ClientHero({ clinic, business, basePath, heroImage }: ClientHeroProps) {
  // Use woodworking workshop image as default to match screenshot exactly
  const backgroundImage = 'https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&q=80&w=1600';

  return (
    <div className="relative bg-[#FAF6F0]">
      {/* Hero section */}
      <section className="relative min-h-[80vh] flex flex-col justify-center items-start px-8 sm:px-12 lg:px-24 py-32 overflow-hidden">
        {/* Background Image with Dark Warm Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src={backgroundImage}
            alt="Woodworking workshop" 
            className="w-full h-full object-cover" 
          />
          <div className="absolute inset-0 bg-black/55 mix-blend-multiply" />
        </div>

        {/* Content wrapper */}
        <div className="relative z-10 max-w-3xl w-full text-white space-y-6">
          <h1 className={`${cormorant.className} text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-light tracking-tight leading-[1.1]`}>
            Craftsmanship<br />in Every Detail
          </h1>

          <p className="text-lg sm:text-xl text-white/80 font-light max-w-xl leading-relaxed">
            Expert woodworking and custom carpentry services.
          </p>

          <div className="pt-4">
            <a 
              href="#contact"
              className="inline-block px-10 py-4 bg-[#B48A66] hover:bg-[#9E7551] text-white font-medium transition-all duration-300 text-sm tracking-widest uppercase rounded shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]"
            >
              Get A Quote
            </a>
          </div>
        </div>
      </section>

      {/* Floating 4 Cards */}
      <div className="relative z-20 max-w-7xl mx-auto px-8 -mt-16 pb-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              title: "Custom Woodwork",
              desc: "Lorem ipsum dolor sit amet, consectetur elit, sed do eiusmod tempor.",
              icon: Hammer
            },
            {
              title: "Bespoke Furniture",
              desc: "Lorem ipsum dolor sit amet, consectetur elit, sed do eiusmod tempor.",
              icon: Armchair
            },
            {
              title: "Home Renovation",
              desc: "Lorem ipsum dolor sit amet, consectetur elit, sed do eiusmod tempor.",
              icon: Home
            },
            {
              title: "Precision Craft",
              desc: "Lorem ipsum dolor sit amet, consectetur elit, sed do eiusmod tempor.",
              icon: Ruler
            }
          ].map((card, idx) => (
            <div 
              key={idx} 
              className="bg-[#2A2A2E] text-white p-8 rounded shadow-2xl border border-white/5 flex flex-col items-center text-center group hover:border-[#B48A66]/30 transition-all duration-300"
            >
              <div className="w-16 h-16 flex items-center justify-center mb-6 text-[#B48A66] group-hover:scale-110 transition-transform duration-300">
                <card.icon className="w-8 h-8 stroke-[1.25]" />
              </div>
              <h3 className="text-lg font-medium mb-3 tracking-wide">{card.title}</h3>
              <p className="text-white/60 text-xs leading-relaxed font-light">{card.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

