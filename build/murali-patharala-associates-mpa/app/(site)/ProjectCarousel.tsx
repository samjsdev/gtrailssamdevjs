'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, MapPin, ArrowUpRight } from 'lucide-react';

export interface ShowcaseProject {
  image: string;
  title: string;
  category: string;
  location: string;
  area: string;
  scope: string;
  materials: string;
}

export const showcaseProjects: ShowcaseProject[] = [
  {
    image: '/images/clinicImages-1.jpg',
    title: 'Contemporary G+2 Villa — Night Elevation',
    category: 'Turnkey Construction',
    location: 'Anna Nagar East, Chennai',
    area: '3,850 Sq.Ft',
    scope: 'Complete turnkey delivery from soil testing to handover — double-height living, cantilevered balconies, and landscape terrace.',
    materials: 'Tata Tiscon 550D TMT, UltraTech 53-Grade, Glazed Vitrified Cladding, Burma Teak Entrance',
  },
  {
    image: '/images/stock/34bba44b.webp',
    title: 'Poolside Luxury Villa Residence',
    category: 'Turnkey Construction',
    location: 'ECR, Chennai',
    area: '4,200 Sq.Ft',
    scope: 'White modernist villa with infinity pool deck, floor-to-ceiling glazing, and imported marble flooring throughout.',
    materials: 'JSW Neosteel 550D, Schüco Aluminium Fenestrations, Statuario Italian Marble',
  },
  {
    image: '/images/stock/1c7b75e9.webp',
    title: 'Cantilevered 3D Elevation Design',
    category: '3D Architectural Elevation',
    location: 'Kilpauk, Chennai',
    area: '3,400 Sq.Ft',
    scope: 'Parametric facade with louvered solar shading, cantilevered massing, and full CMDA sanction drawings.',
    materials: 'HPL Louvers, Textured Stucco, Thermally-Broken Aluminium Profiles',
  },
  {
    image: '/images/stock/13246fc0.webp',
    title: 'Black Timber Facade Residence',
    category: '3D Architectural Elevation',
    location: 'Injambakkam, ECR',
    area: '2,950 Sq.Ft',
    scope: 'Charred-timber and glass composition with courtyard planning and Vastu-aligned spatial layout.',
    materials: 'Charred Cedar Cladding, Double-Glazed Units, Exposed Concrete',
  },
  {
    image: '/images/stock/c87d10e5.webp',
    title: 'Parallel Modular Kitchen — Acrylic Finish',
    category: 'Modular Kitchen',
    location: 'Shenoy Nagar, Chennai',
    area: '310 Sq.Ft',
    scope: 'Full-extension soft-close drawers, tall pantry pull-outs, breakfast counter, and appliance garage.',
    materials: 'BWR IS:710 Marine Ply, Anti-Fingerprint Acrylic, Blum Hinges, Quartz Top',
  },
  {
    image: '/images/stock/0d97766b.webp',
    title: 'Master Suite & Fluted Wardrobe',
    category: 'Interiors',
    location: 'Mogappair West, Chennai',
    area: '560 Sq.Ft',
    scope: 'Floor-to-ceiling fluted shutters with profile LED lighting, upholstered headboard wall, and dressing bay.',
    materials: 'Smoked Walnut Veneer, Tinted Fluted Glass, Häfele Sliders',
  },
  {
    image: '/images/stock/65d3ec82.webp',
    title: 'Minimal Living Room Styling',
    category: 'Interiors',
    location: 'Anna Nagar West, Chennai',
    area: '480 Sq.Ft',
    scope: 'Floating media console, acoustic fluted feature wall, and concealed magnetic track lighting.',
    materials: 'European Oak Veneer, Gyproc Ceiling, Asian Paints Royale',
  },
  {
    image: '/images/stock/704fc1ee.webp',
    title: 'Courtyard Villa Elevation',
    category: 'Turnkey Construction',
    location: 'Velachery, Chennai',
    area: '3,100 Sq.Ft',
    scope: 'Internal courtyard villa blending natural light wells with a contemporary sloped roof elevation.',
    materials: 'Primary TMT Fe550, Coromandel Cement, Somany Vitrified Tiles',
  },
];

export default function ProjectCarousel() {
  const [active, setActive] = useState<ShowcaseProject | null>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const [canLeft, setCanLeft] = useState(false);
  const [canRight, setCanRight] = useState(true);

  const updateArrows = useCallback(() => {
    const el = viewportRef.current;
    if (!el) return;
    setCanLeft(el.scrollLeft > 8);
    setCanRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 8);
  }, []);

  useEffect(() => {
    updateArrows();
    const el = viewportRef.current;
    if (!el) return;
    el.addEventListener('scroll', updateArrows, { passive: true });
    window.addEventListener('resize', updateArrows);
    return () => {
      el.removeEventListener('scroll', updateArrows);
      window.removeEventListener('resize', updateArrows);
    };
  }, [updateArrows]);

  const scroll = (dir: number) => {
    const el = viewportRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * Math.min(el.clientWidth * 0.85, 760), behavior: 'smooth' });
  };

  return (
    <>
      <div className="relative">
        <div
          ref={viewportRef}
          className="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth pb-2 snap-x snap-mandatory"
        >
          {showcaseProjects.map((p, i) => (
            <button
              key={i}
              onClick={() => setActive(p)}
              className="group relative shrink-0 snap-start w-[340px] sm:w-[480px] aspect-[4/3] overflow-hidden text-left bg-stone-200 focus:outline-none focus:ring-2 focus:ring-[#E64D16]"
            >
              <Image
                src={p.image}
                alt={p.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
                sizes="(max-width: 640px) 340px, 480px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1A1B1A]/90 via-[#1A1B1A]/10 to-transparent" />
              <span className="absolute top-3.5 left-3.5 px-3 py-1 bg-[#E64D16] text-white text-[10px] font-extrabold uppercase tracking-wider rounded-md">
                {p.category}
              </span>
              <span className="absolute top-3.5 right-3.5 w-9 h-9 rounded-full bg-white/15 backdrop-blur-sm border border-white/30 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <ArrowUpRight className="w-4 h-4" />
              </span>
              <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
                <div className="flex items-center gap-2 text-[11px] text-[#E6C673] font-semibold mb-1.5">
                  <MapPin className="w-3 h-3 text-[#E64D16]" />
                  <span>{p.location}</span>
                  <span className="text-white/50">&bull;</span>
                  <span className="text-white/80">{p.area}</span>
                </div>
                <h4 className="font-bold text-base leading-snug">{p.title}</h4>
              </div>
            </button>
          ))}
        </div>

        {/* Arrows */}
        <button
          onClick={() => scroll(-1)}
          aria-label="Scroll left"
          disabled={!canLeft}
          className={`absolute top-1/2 -translate-y-1/2 -left-2 sm:-left-5 z-10 w-12 h-12 rounded-full shadow-lg flex items-center justify-center transition-all ${
            canLeft
              ? 'bg-white text-stone-800 hover:bg-[#E64D16] hover:text-white border border-stone-200'
              : 'bg-stone-100 text-stone-300 border border-stone-100 cursor-default'
          }`}
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={() => scroll(1)}
          aria-label="Scroll right"
          disabled={!canRight}
          className={`absolute top-1/2 -translate-y-1/2 -right-2 sm:-right-5 z-10 w-12 h-12 rounded-full shadow-lg flex items-center justify-center transition-all ${
            canRight
              ? 'bg-white text-stone-800 hover:bg-[#E64D16] hover:text-white border border-stone-200'
              : 'bg-stone-100 text-stone-300 border border-stone-100 cursor-default'
          }`}
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Lightbox Modal */}
      {active && (
        <div
          onClick={() => setActive(null)}
          className="fixed inset-0 z-[60] bg-[#1A1B1A]/85 backdrop-blur-sm p-4 sm:p-8 flex items-center justify-center animate-in fade-in duration-200"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl animate-in zoom-in-95 duration-200"
          >
            <div className="relative aspect-16/9 w-full bg-stone-900">
              <Image src={active.image} alt={active.title} fill className="object-cover" sizes="896px" />
              <button
                onClick={() => setActive(null)}
                aria-label="Close project details"
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/60 hover:bg-[#E64D16] text-white flex items-center justify-center transition-colors"
              >
                ✕
              </button>
            </div>
            <div className="p-6 sm:p-8 space-y-5">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <span className="inline-block px-2.5 py-1 bg-orange-100 text-[#E64D16] text-[10px] font-extrabold uppercase tracking-wider rounded-md mb-2">
                    {active.category}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold text-stone-900">{active.title}</h3>
                  <div className="flex items-center gap-2 text-xs text-stone-500 mt-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#E64D16]" />
                    <span>
                      {active.location} &bull; {active.area}
                    </span>
                  </div>
                </div>
                <a
                  href="#consultation-form"
                  onClick={() => setActive(null)}
                  className="px-5 py-2.5 bg-[#E64D16] hover:bg-[#C93F0F] text-white font-bold text-xs uppercase tracking-wider rounded-md transition-all"
                >
                  Inquire About Similar Project
                </a>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs">
                <div className="p-4 bg-stone-50 rounded-md border border-stone-200 space-y-1.5">
                  <div className="font-bold text-stone-900 text-sm">Project Scope &amp; Engineering</div>
                  <p className="leading-relaxed text-stone-600">{active.scope}</p>
                </div>
                <div className="p-4 bg-stone-50 rounded-md border border-stone-200 space-y-1.5">
                  <div className="font-bold text-stone-900 text-sm">Materials &amp; Finish Grades</div>
                  <p className="leading-relaxed text-stone-600">{active.materials}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
