'use client';

import { useState } from 'react';
import Image from 'next/image';
import { 
  Building, Compass, Layers, X, ArrowUpRight, 
  HardHat, CheckCircle2, Maximize2 
} from 'lucide-react';

interface GalleryItem {
  url: string;
  title: string;
  category: 'architecture' | 'construction' | 'interior';
  area: string;
  location: string;
  scope: string;
}

interface GalleryClientProps {
  images: {
    clinicImages?: string[];
    treatmentImages?: string[];
    otherImages?: string[];
  };
}

export default function GalleryClient({ images }: GalleryClientProps) {
  const [activeFilter, setActiveFilter] = useState<'all' | 'architecture' | 'construction' | 'interior'>('all');
  const [activeModalItem, setActiveModalItem] = useState<GalleryItem | null>(null);

  // Compile rich gallery items from media and stock
  const clinicImgs = images?.clinicImages || [];
  const treatmentImgs = images?.treatmentImages || [];
  const otherImgs = images?.otherImages || [];

  const allItems: GalleryItem[] = [
    {
      url: clinicImgs[0] || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
      title: 'Contemporary 4BHK Cantilever Villa',
      category: 'architecture',
      area: '4,850 Sq.Ft',
      location: 'Prime Residential Enclave',
      scope: 'Architectural 3D BIM, Structural Engineering & Civil Turnkey',
    },
    {
      url: clinicImgs[1] || 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',
      title: 'Luxury Double-Height Living & Foyer',
      category: 'interior',
      area: '1,200 Sq.Ft Zone',
      location: 'South City Boulevard',
      scope: 'Custom Italian Marble, Acoustic Ceiling & Designer Lighting',
    },
    {
      url: treatmentImgs[0] || 'https://images.unsplash.com/photo-1541888946425-d0fbb18f15f6?auto=format&fit=crop&w=1200&q=80',
      title: 'RCC Framed Civil Slab & Column Execution',
      category: 'construction',
      area: '5,200 Sq.Ft Structure',
      location: 'East Coast Sector',
      scope: 'Fe550D TMT Reinforcement & Grade-53 Structural Concreting',
    },
    {
      url: treatmentImgs[1] || 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=80',
      title: 'Modern Minimalist Villa Facade & Landscaping',
      category: 'architecture',
      area: '3,600 Sq.Ft',
      location: 'Greenwood Estates',
      scope: 'Facade Louvers, Weather-Resistant Texture & Lighting',
    },
    {
      url: otherImgs[0] || 'https://images.unsplash.com/photo-1600210492493-0946911123ea?auto=format&fit=crop&w=1200&q=80',
      title: 'Island Modular Kitchen with Acrylic Finish',
      category: 'interior',
      area: '450 Sq.Ft Kitchen',
      location: 'Palm Meadows Villa',
      scope: 'Hettich Soft-Close Hardware, Quartz Countertop & Bosch Appliances',
    },
    {
      url: otherImgs[1] || 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=80',
      title: 'Turnkey Ground+2 Independent Residence',
      category: 'construction',
      area: '6,400 Sq.Ft Total',
      location: 'Highland Avenue',
      scope: 'Complete Design-to-Handover with 10-Year Structural Guarantee',
    },
    {
      url: clinicImgs[2] || 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=80',
      title: 'Master Bedroom Suite & Walk-in Wardrobe',
      category: 'interior',
      area: '680 Sq.Ft Suite',
      location: 'Emerald Hills',
      scope: 'Smoked Oak Veneer, Concealed Fluted Panels & Mood Lighting',
    },
    {
      url: treatmentImgs[2] || 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80',
      title: 'Brutalist Architectural Form with Water Court',
      category: 'architecture',
      area: '5,500 Sq.Ft Villa',
      location: 'Lakefront Enclave',
      scope: 'Exposed Concrete Texture, Triple Glazed Glass & Solar Roof',
    },
  ];

  const filteredItems = activeFilter === 'all' 
    ? allItems 
    : allItems.filter(item => item.category === activeFilter);

  return (
    <div className="w-full">
      {/* ─── Category Filter Navigation ─── */}
      <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 mb-12">
        {[
          { id: 'all', label: 'ALL PORTFOLIO' },
          { id: 'architecture', label: 'ARCHITECTURAL ELEVATIONS' },
          { id: 'construction', label: 'CIVIL & RESIDENTIAL BUILDS' },
          { id: 'interior', label: 'LUXURY INTERIOR FITOUTS' },
        ].map((btn) => (
          <button
            key={btn.id}
            onClick={() => setActiveFilter(btn.id as any)}
            type="button"
            className={`px-5 py-3 font-mono text-xs font-black uppercase tracking-wider border-2 transition-all ${
              activeFilter === btn.id
                ? 'bg-[#252A29] text-[#F4F3EE] border-[#111111] shadow-[3px_3px_0px_#E94B26]'
                : 'bg-[#FFFFFF] text-[#252A29] border-[#252A29]/30 hover:border-[#252A29] hover:bg-[#F4F3EE]'
            }`}
          >
            {btn.label}
          </button>
        ))}
      </div>

      {/* ─── Masonry / Uniform Grid ─── */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredItems.map((item, idx) => (
          <div
            key={idx}
            onClick={() => setActiveModalItem(item)}
            className="group bg-[#FFFFFF] border-4 border-[#252A29] shadow-[6px_6px_0px_#252A29] hover:shadow-[2px_2px_0px_#252A29] hover:translate-x-[2px] hover:translate-y-[2px] transition-all cursor-pointer flex flex-col overflow-hidden"
          >
            {/* Image Container */}
            <div className="relative h-64 sm:h-72 w-full bg-[#111111] overflow-hidden border-b-2 border-[#252A29]">
              <Image
                src={item.url}
                alt={item.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px"
              />
              <div className="absolute top-3 left-3 bg-[#252A29] text-[#C8A84E] text-[10px] font-mono font-bold uppercase tracking-widest px-3 py-1 border border-[#111111]">
                {item.category.toUpperCase()}
              </div>
              <div className="absolute bottom-3 right-3 w-8 h-8 bg-[#E94B26] text-[#F4F3EE] flex items-center justify-center border border-[#111111] opacity-0 group-hover:opacity-100 transition-opacity">
                <Maximize2 className="w-4 h-4" />
              </div>
            </div>

            {/* Content Area */}
            <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
              <div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#E94B26] block mb-1">
                  {item.area} &bull; {item.location}
                </span>
                <h4 className="text-lg font-black uppercase text-[#252A29] tracking-tight leading-snug group-hover:text-[#E94B26] transition-colors">
                  {item.title}
                </h4>
              </div>

              <div className="pt-3 border-t border-[#252A29]/15 flex items-center justify-between text-xs font-mono text-[#252A29]/70">
                <span className="truncate max-w-[220px]">{item.scope}</span>
                <ArrowUpRight className="w-4 h-4 text-[#252A29] shrink-0 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ─── Full-Screen Technical Lightbox Modal ─── */}
      {activeModalItem && (
        <div className="fixed inset-0 z-50 bg-[#111111]/90 backdrop-blur-xs flex items-center justify-center p-4 sm:p-8 animate-in fade-in duration-200">
          <div className="bg-[#FFFFFF] border-4 border-[#252A29] shadow-[10px_10px_0px_#E94B26] max-w-4xl w-full max-h-[90vh] overflow-y-auto flex flex-col">
            {/* Modal Header */}
            <div className="bg-[#252A29] text-[#F4F3EE] p-4 sm:p-5 flex items-center justify-between border-b-2 border-[#111111]">
              <div className="flex items-center gap-3">
                <span className="px-2.5 py-1 bg-[#E94B26] text-[#F4F3EE] text-[10px] font-mono font-bold uppercase tracking-wider border border-[#111111]">
                  {activeModalItem.category.toUpperCase()} SPECIFICATION
                </span>
                <span className="text-sm font-black uppercase tracking-tight text-[#C8A84E]">
                  PROJECT BLUEPRINT & SPECIFICATION
                </span>
              </div>
              <button
                onClick={() => setActiveModalItem(null)}
                className="p-1.5 bg-[#FFFFFF] text-[#252A29] hover:bg-[#E94B26] hover:text-[#F4F3EE] border border-[#111111] transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 sm:p-8 space-y-6">
              <div className="relative h-80 sm:h-[450px] w-full border-2 border-[#252A29] bg-[#111111]">
                <Image
                  src={activeModalItem.url}
                  alt={activeModalItem.title}
                  fill
                  className="object-contain"
                  sizes="1000px"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-mono text-xs">
                <div className="p-4 bg-[#F4F3EE] border-2 border-[#252A29]">
                  <span className="text-[10px] font-bold text-[#E94B26] uppercase block mb-1">PROJECT TITLE</span>
                  <span className="font-black text-sm text-[#252A29]">{activeModalItem.title}</span>
                </div>
                <div className="p-4 bg-[#F4F3EE] border-2 border-[#252A29]">
                  <span className="text-[10px] font-bold text-[#E94B26] uppercase block mb-1">SCALE & FOOTPRINT</span>
                  <span className="font-black text-sm text-[#252A29]">{activeModalItem.area}</span>
                </div>
                <div className="p-4 bg-[#F4F3EE] border-2 border-[#252A29]">
                  <span className="text-[10px] font-bold text-[#E94B26] uppercase block mb-1">EXECUTION SCOPE</span>
                  <span className="font-black text-sm text-[#252A29]">{activeModalItem.scope}</span>
                </div>
              </div>

              <div className="flex justify-end pt-4 border-t-2 border-[#252A29]/20">
                <button
                  onClick={() => setActiveModalItem(null)}
                  className="px-6 py-3 bg-[#252A29] text-[#F4F3EE] font-black text-xs uppercase tracking-widest border border-[#111111] hover:bg-[#E94B26] transition-colors"
                >
                  CLOSE INSPECTION
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
