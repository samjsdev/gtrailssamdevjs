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
      <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-12">
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
            className={`px-4 py-2 font-mono text-xs font-semibold uppercase tracking-wider rounded-sm border transition-all ${
              activeFilter === btn.id
                ? 'bg-[#181C1B] text-white border-[#181C1B] shadow-sm'
                : 'bg-white text-[#1E2322] border-[#1E2322]/20 hover:border-[#C85A32] hover:bg-[#F8F7F4]'
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
            className="group bg-white border border-[#1E2322]/15 rounded-sm shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all cursor-pointer flex flex-col overflow-hidden"
          >
            {/* Image Container */}
            <div className="relative h-64 sm:h-72 w-full bg-[#141716] overflow-hidden border-b border-[#1E2322]/15">
              <Image
                src={item.url}
                alt={item.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px"
              />
              <div className="absolute top-3 left-3 bg-[#181C1B]/90 backdrop-blur-sm text-[#C49B45] text-[10px] font-mono font-bold uppercase tracking-widest px-2.5 py-1 rounded-sm border border-white/10">
                {item.category.toUpperCase()}
              </div>
              <div className="absolute bottom-3 right-3 w-8 h-8 bg-[#C85A32] text-white flex items-center justify-center rounded-sm shadow-sm opacity-0 group-hover:opacity-100 transition-opacity">
                <Maximize2 className="w-4 h-4" />
              </div>
            </div>

            {/* Content Area */}
            <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
              <div>
                <span className="text-[10px] font-mono font-semibold uppercase tracking-wider text-[#C85A32] block mb-1">
                  {item.area} &bull; {item.location}
                </span>
                <h4 className="text-lg font-bold uppercase text-[#1E2322] tracking-tight leading-snug group-hover:text-[#C85A32] transition-colors">
                  {item.title}
                </h4>
              </div>

              <div className="pt-3 border-t border-[#1E2322]/10 flex items-center justify-between text-xs font-mono text-[#1E2322]/70">
                <span className="truncate max-w-[220px]">{item.scope}</span>
                <ArrowUpRight className="w-4 h-4 text-[#1E2322] shrink-0 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[#C85A32] transition-transform" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ─── Full-Screen Technical Lightbox Modal ─── */}
      {activeModalItem && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4 sm:p-8 animate-in fade-in duration-200">
          <div className="bg-white border border-[#1E2322]/20 rounded-sm shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto flex flex-col">
            {/* Modal Header */}
            <div className="bg-[#181C1B] text-white p-4 sm:p-5 flex items-center justify-between border-b border-[#2D3331]">
              <div className="flex items-center gap-3">
                <span className="px-2.5 py-1 bg-[#C85A32] text-white text-[10px] font-mono font-bold uppercase tracking-wider rounded-xs">
                  {activeModalItem.category.toUpperCase()} SPECIFICATION
                </span>
                <span className="text-sm font-bold uppercase tracking-tight text-[#C49B45]">
                  PROJECT BLUEPRINT & SPECIFICATION
                </span>
              </div>
              <button
                onClick={() => setActiveModalItem(null)}
                className="p-1.5 bg-white text-[#1E2322] hover:bg-[#C85A32] hover:text-white rounded-sm transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 sm:p-8 space-y-6">
              <div className="relative h-80 sm:h-[450px] w-full border border-[#1E2322]/15 rounded-sm bg-[#141716] overflow-hidden">
                <Image
                  src={activeModalItem.url}
                  alt={activeModalItem.title}
                  fill
                  className="object-contain"
                  sizes="1000px"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-mono text-xs">
                <div className="p-4 bg-[#F8F7F4] border border-[#1E2322]/15 rounded-sm">
                  <span className="text-[10px] font-semibold text-[#C85A32] uppercase block mb-1">PROJECT TITLE</span>
                  <span className="font-bold text-sm text-[#1E2322]">{activeModalItem.title}</span>
                </div>
                <div className="p-4 bg-[#F8F7F4] border border-[#1E2322]/15 rounded-sm">
                  <span className="text-[10px] font-semibold text-[#C85A32] uppercase block mb-1">SCALE & FOOTPRINT</span>
                  <span className="font-bold text-sm text-[#1E2322]">{activeModalItem.area}</span>
                </div>
                <div className="p-4 bg-[#F8F7F4] border border-[#1E2322]/15 rounded-sm">
                  <span className="text-[10px] font-semibold text-[#C85A32] uppercase block mb-1">EXECUTION SCOPE</span>
                  <span className="font-bold text-sm text-[#1E2322]">{activeModalItem.scope}</span>
                </div>
              </div>

              <div className="flex justify-end pt-4 border-t border-[#1E2322]/15">
                <button
                  onClick={() => setActiveModalItem(null)}
                  className="px-6 py-2.5 bg-[#1E2322] text-white font-semibold text-xs uppercase tracking-widest rounded-sm hover:bg-[#C85A32] transition-colors"
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
