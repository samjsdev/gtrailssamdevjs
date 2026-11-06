'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Plus, ArrowRight } from 'lucide-react';
import Reveal from './Reveal';
import { montserrat } from '../fonts';

interface DisciplineItem {
  id: string;
  name: string;
  category: string;
  image: string;
  description: string;
}

const DISCIPLINES: DisciplineItem[] = [
  {
    id: 'iconic-architecture',
    name: 'ICONIC ARCHITECTURE',
    category: 'Architecture',
    image: '/images/architecture/cantilever-garden-overhang.webp',
    description: 'Bespoke ultra-luxury residences and private estates blending classical proportions with modern monolithic cantilevers.',
  },
  {
    id: 'interior-design',
    name: 'INTERIOR DESIGN',
    category: 'Haute Interiors',
    image: '/images/architecture/living-room-double-height.webp',
    description: 'Sculptural double-height living volumes, bookmatched Italian marble cladding, and refined bespoke joinery.',
  },
  {
    id: 'landscape-design',
    name: 'LANDSCAPE DESIGN',
    category: 'Biophilic Spaces',
    image: '/images/architecture/courtyard-water-residence.webp',
    description: 'Open-air central water courtyards and terrace gardens engineered to lower ambient indoor tropical heat.',
  },
  {
    id: 'smart-home',
    name: 'SMART HOME',
    category: 'Automation',
    image: '/images/architecture/modern-villa-duplex.webp',
    description: 'Concealed intelligent home climate, acoustic scenes, motorized shading, and integrated biometric security.',
  },
  {
    id: 'lighting',
    name: 'LIGHTING',
    category: 'Illumination',
    image: '/images/architecture/hero-villa-twilight.webp',
    description: 'Layered architectural mood lighting, micro-aperture recessed downlights, and museum-grade accent fixtures.',
  },
  {
    id: 'furniture',
    name: 'FURNITURE',
    category: 'Joinery',
    image: '/images/architecture/custom-furniture-joinery.webp',
    description: 'Custom-crafted teak dining portals, modular walk-in wardrobes, and handcrafted bespoke atelier furniture.',
  },
  {
    id: 'turnkey-execution',
    name: 'TURNKEY EXECUTION',
    category: 'Interior Fitout',
    image: '/images/architecture/interior-double-height.webp',
    description: 'End-to-end turnkey interior execution, acoustic ceiling paneling, bespoke joinery, and premium finishes delivered with meticulous precision.',
  },
];

function getCategoryAndDesc(name: string, index: number) {
  const lower = name.toLowerCase();
  if (lower.includes('washroom') || lower.includes('bath')) {
    return {
      category: 'Restoration & Tile',
      description: 'Curbless frameless showers, custom vanities, waterproofing to Ontario Building Code, and Italian porcelain tilework.'
    };
  }
  if (lower.includes('floor')) {
    return {
      category: 'Flooring Systems',
      description: 'Wide-plank natural hardwood, luxury vinyl plank, subfloor levelling, and soundproof underlayment.'
    };
  }
  if (lower.includes('paint')) {
    return {
      category: 'Finishes & Coating',
      description: 'Interior and exterior architectural coating, precision edge cut-lines, and spray enamel finishes.'
    };
  }
  if (lower.includes('deck') || lower.includes('patio')) {
    return {
      category: 'Outdoor Living',
      description: 'Custom Western red cedar and composite decks, aluminum glass railings, and integrated step illumination.'
    };
  }
  if (lower.includes('basement') || lower.includes('suite')) {
    return {
      category: 'Turnkey Living',
      description: 'Full legal basement suites, acoustic ceiling isolation, drywall framing, and contemporary media lounges.'
    };
  }
  if (lower.includes('remodel') || lower.includes('renovat')) {
    return {
      category: 'Whole-Home Remodeling',
      description: 'Complete interior transformations, structural opening modifications, and premium architectural finishing.'
    };
  }
  return {
    category: `Specialty 0${index + 1}`,
    description: `Bespoke residential craftsmanship delivered with obsessive attention to detail and turnkey project management.`
  };
}

interface DisciplinesShowcaseProps {
  basePath: string;
  services?: string[];
  media?: any;
}

export default function DisciplinesShowcase({ basePath, services, media }: DisciplinesShowcaseProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  const candidateImages = Array.from(new Set([
    ...(media?.treatmentImages || []),
    ...(media?.clinicImages || []),
    ...(media?.otherImages || []),
  ].filter(Boolean)));

  const disciplines: DisciplineItem[] = (services && services.length > 0)
    ? services.slice(0, 6).map((service, idx) => {
        const meta = getCategoryAndDesc(service, idx);
        return {
          id: `discipline-${idx}`,
          name: service.toUpperCase(),
          category: meta.category,
          image: candidateImages[idx % candidateImages.length] || DISCIPLINES[idx % DISCIPLINES.length]?.image || '/images/architecture/cantilever-garden-overhang.webp',
          description: meta.description,
        };
      })
    : DISCIPLINES;

  const safeIndex = activeIndex < disciplines.length ? activeIndex : 0;
  const activeItem = disciplines[safeIndex] || disciplines[0];

  return (
    <section className="py-24 bg-white text-black">
      {/* Intro Heading modeled on hp_sec4 */}
      <div className="max-w-[1440px] mx-auto px-6 sm:px-12 mb-12">
        <Reveal direction="up">
          <div className="grid lg:grid-cols-12 gap-8 items-baseline border-b border-black pb-8">
            <div className="lg:col-span-4">
              <h2 className={`${montserrat.className} text-[36px] sm:text-[48px] uppercase font-light tracking-[0.06em] text-black`}>
                Services
              </h2>
            </div>
            <div className="lg:col-span-8">
              <p className="text-[15px] sm:text-[17px] text-[#444444] font-light leading-relaxed max-w-3xl">
                Dedicated residential craftsmanship conceiving and executing synergistic, forward-thinking, and visually striking projects across GTA.
              </p>
            </div>
          </div>
        </Reveal>
      </div>

      {/* Signature Full-Width Interactive Hover Experience */}
      <div className="relative w-full h-[620px] sm:h-[700px] overflow-hidden bg-black select-none">
        {/* Dynamic Background Image Switcher */}
        {disciplines.map((item, idx) => (
          <div
            key={item.id}
            className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
              safeIndex === idx ? 'opacity-70 scale-100' : 'opacity-0 scale-105 pointer-events-none'
            }`}
          >
            <Image
              src={item.image}
              alt={item.name}
              fill
              className="object-cover transition-transform duration-1000 ease-out"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/50" />
          </div>
        ))}

        {/* Foreground Disciplines Text List */}
        <div className="relative z-10 h-full max-w-[1440px] mx-auto px-6 sm:px-12 flex flex-col justify-between py-12">
          {/* Top metadata badge */}
          <div className="flex justify-between items-center text-white text-[11px] tracking-[0.25em] uppercase font-medium">
            <span>Discipline 0{safeIndex + 1} / 0{disciplines.length}</span>
            <span className="text-[#e2b88b]">{activeItem.category}</span>
          </div>

          {/* Center: List of services in large typography */}
          <div className="flex flex-wrap gap-x-10 gap-y-4 items-center justify-center text-center my-auto max-w-5xl mx-auto">
            {disciplines.map((item, idx) => {
              const isSelected = safeIndex === idx;
              return (
                <button
                  key={item.id}
                  onMouseEnter={() => setActiveIndex(idx)}
                  onClick={() => setActiveIndex(idx)}
                  className={`${montserrat.className} text-[20px] sm:text-[30px] md:text-[38px] uppercase tracking-[0.06em] font-light transition-all duration-300 ${
                    isSelected
                      ? 'text-white font-medium scale-105 underline decoration-1 underline-offset-8'
                      : 'text-white/45 hover:text-white/80'
                  }`}
                >
                  {item.name}
                </button>
              );
            })}
          </div>

          {/* Bottom active description & View all services CTA */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-6 border-t border-white/20 text-white">
            <p className="text-[13px] sm:text-[14px] text-white/80 max-w-xl font-light text-center sm:text-left leading-relaxed">
              {activeItem.description}
            </p>

            <Link
              href={`${basePath}/services`}
              className="inline-flex items-center gap-2.5 bg-white text-black px-6 py-3 rounded-full text-[10.5px] tracking-[0.2em] uppercase font-semibold hover:bg-[#7d3333] hover:text-white transition-all duration-300 shrink-0"
            >
              <span>View all services</span>
              <Plus className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
