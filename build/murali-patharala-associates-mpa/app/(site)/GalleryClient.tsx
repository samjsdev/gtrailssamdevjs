'use client';

import { useState } from 'react';
import Image from 'next/image';
import { 
  X, ArrowUpRight, Maximize2, Sparkles, MapPin, 
  Ruler, Palette, Layers, ChevronRight, Home, Building2, CheckCircle2
} from 'lucide-react';

interface GalleryItem {
  url: string;
  title: string;
  category: 'villas' | 'architecture' | 'kitchen' | 'living';
  categoryLabel: string;
  area: string;
  location: string;
  scope: string;
  materials: string;
}

interface GalleryClientProps {
  images?: {
    clinicImages?: string[];
    treatmentImages?: string[];
    otherImages?: string[];
  };
}

export default function GalleryClient({ images }: GalleryClientProps) {
  const [activeFilter, setActiveFilter] = useState<'all' | 'villas' | 'architecture' | 'kitchen' | 'living'>('all');
  const [activeModalItem, setActiveModalItem] = useState<GalleryItem | null>(null);

  const clinicImgs = images?.clinicImages || [];

  const allItems: GalleryItem[] = [
    {
      url: clinicImgs[0] || '/images/clinicImages-1.jpg',
      title: 'Contemporary G+2 Independent Villa',
      category: 'villas',
      categoryLabel: 'Turnkey Construction',
      area: '3,850 Sq.Ft Villa',
      location: 'Anna Nagar East, Chennai',
      scope: 'Complete Turnkey Construction from Soil Testing to Handover, Double-Height Living & Landscape Terrace',
      materials: 'Tata Tiscon 550D Steel, UltraTech Super Concrete, Glazed Ceramic Cladding, Teak Entrance Door',
    },
    {
      url: '/images/stock/1c7b75e9.webp',
      title: 'Modern Minimalist Architectural Elevation & 3D BIM',
      category: 'architecture',
      categoryLabel: 'Architectural Elevation',
      area: '4,200 Sq.Ft Residence',
      location: 'ECR Sea-Breeze Enclave, Chennai',
      scope: 'Parametric Facade Design, Louvered Solar Shading, Structural Engineering & CMDA Sanction Approvals',
      materials: 'Thermally Broken Aluminium Profiles, High-Pressure Laminate Louvers, Textured Stucco',
    },
    {
      url: clinicImgs[1] || '/images/clinicImages-2.jpg',
      title: 'Island Modular Kitchen with Calacatta Quartz',
      category: 'kitchen',
      categoryLabel: 'Modular Kitchen',
      area: '380 Sq.Ft Kitchen Suite',
      location: 'Kilpauk Enclave, Chennai',
      scope: 'Seamless Quartz Countertops, Häfele Soft-Close Tandem Boxes, Appliance Garage & Under-Mount Sink',
      materials: '100% BWR Marine Plywood (IS:710), Anti-Fingerprint Matte Acrylic, Calacatta Quartz',
    },
    {
      url: clinicImgs[2] || '/images/clinicImages-3.jpg',
      title: 'Master Bedroom Suite & Walk-in Wardrobe',
      category: 'living',
      categoryLabel: 'Living & Bedroom',
      area: '560 Sq.Ft Suite',
      location: 'Mogappair West, Chennai',
      scope: 'Floor-to-Ceiling Fluted Glass Wardrobes, Sensor LED Profiling & Acoustic Bedhead Wall Paneling',
      materials: 'Smoked Walnut Veneer, Tinted Fluted Glass, Häfele Wardrobe Sliders, Italian Wall Sconces',
    },
    {
      url: '/images/stock/6dcb103c.webp',
      title: 'Duplex Villa Structural Civil Framework & Elevation',
      category: 'villas',
      categoryLabel: 'Turnkey Construction',
      area: '2,900 Sq.Ft Duplex',
      location: 'Velachery Extension, Chennai',
      scope: 'Turnkey RCC Structural Frame, Cantilevered Balconies, Waterproofing & Vitrified Tile Flooring',
      materials: 'Primary TMT Fe550 Steel, Coromandel 53-Grade Cement, Somany 4x2 Vitrified Tiles',
    },
    {
      url: clinicImgs[3] || '/images/clinicImages-4.jpg',
      title: 'Double-Height Living & Media Console Architecture',
      category: 'living',
      categoryLabel: 'Living & Bedroom',
      area: '820 Sq.Ft Living Hall',
      location: 'Anna Nagar West, Chennai',
      scope: 'Acoustic Fluted Paneling, Concealed Magnetic Track Lights, Floating TV Unit & Stone Backing',
      materials: 'European Smoked Oak Veneer, Gyproc False Ceiling, Asian Paints Royale Luxury Emulsion',
    },
    {
      url: '/images/stock/a9daeddb.webp',
      title: 'Contemporary Urban Residence Architectural Facade',
      category: 'architecture',
      categoryLabel: 'Architectural Elevation',
      area: '3,100 Sq.Ft Residence',
      location: 'Porur Garden Town, Chennai',
      scope: 'Vastu-Compliant 3D Elevation, Double-Glazed Fenestration & Concrete Textured Geometric Pointers',
      materials: 'Exposed Concrete Stucco, Weather-Shield Exterior Emulsion, Toughened Glass Balustrades',
    },
    {
      url: '/images/stock/c87d10e5.webp',
      title: 'Parallel High-Gloss Kitchen with Breakfast Bar',
      category: 'kitchen',
      categoryLabel: 'Modular Kitchen',
      area: '310 Sq.Ft Kitchen',
      location: 'Shenoy Nagar, Chennai',
      scope: 'Full-Extension Soft Close Drawers, Tall Pantry Pull-Outs & Built-In Microwave Housing',
      materials: 'BWR Marine Ply, Acrylic Fronts, Blum Soft-Close Hinges, Composite Quartz Top',
    },
  ];

  const filteredItems = activeFilter === 'all'
    ? allItems
    : allItems.filter(item => item.category === activeFilter);

  const filterTabs = [
    { id: 'all', label: 'All Portfolio Works' },
    { id: 'villas', label: 'Turnkey Villas & Construction' },
    { id: 'architecture', label: '3D Architectural Elevations' },
    { id: 'kitchen', label: 'Modular Kitchens' },
    { id: 'living', label: 'Living & Bedrooms' },
  ] as const;

  return (
    <div className="space-y-12">
      {/* Filter Navigation */}
      <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
        {filterTabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveFilter(tab.id as any)}
            className={`px-4 sm:px-6 py-2.5 rounded-full text-xs font-bold transition-all ${
              activeFilter === tab.id
                ? 'bg-[#E64D16] text-white shadow-md'
                : 'bg-white text-stone-700 hover:text-[#E64D16] border border-stone-200 hover:border-stone-300'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Grid of Portfolio Works */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item, idx) => (
          <div
            key={idx}
            onClick={() => setActiveModalItem(item)}
            className="group cursor-pointer overflow-hidden border border-stone-200 hover:border-orange-300 hover:shadow-lg transition-all duration-300 flex flex-col bg-white"
          >
            {/* Image Container */}
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-stone-100">
              <Image
                src={item.url}
                alt={item.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-900/80 via-stone-900/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

              {/* Top Category Badge */}
              <div className="absolute top-3 left-3">
                <span className="px-3 py-1 bg-[#242624]/90 backdrop-blur-xs text-white text-[10px] font-bold uppercase tracking-wider rounded-md border border-stone-700">
                  {item.categoryLabel}
                </span>
              </div>

              {/* Zoom Trigger */}
              <div className="absolute top-3 right-3 w-8 h-8 rounded-md bg-white/20 backdrop-blur-xs text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <Maximize2 className="w-4 h-4" />
              </div>

              {/* Bottom Overlay Info */}
              <div className="absolute bottom-3 left-3 right-3 text-white space-y-1">
                <div className="flex items-center gap-2 text-[11px] text-[#E6C673] font-semibold">
                  <MapPin className="w-3.5 h-3.5 text-[#E64D16]" />
                  <span>{item.location}</span>
                  <span>&bull;</span>
                  <span>{item.area}</span>
                </div>
                <h4 className="font-bold text-sm text-white line-clamp-1 leading-snug">
                  {item.title}
                </h4>
              </div>
            </div>

            {/* Card Body Details */}
            <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
              <div className="space-y-2">
                <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed">
                  {item.scope}
                </p>
                <div className="pt-2 border-t border-stone-100 text-[11px] text-stone-500 flex items-center gap-1.5">
                  <span className="font-bold text-stone-700">Specifications:</span>
                  <span className="truncate">{item.materials}</span>
                </div>
              </div>

              <div className="pt-2 flex items-center justify-between text-xs font-bold text-[#E64D16] group-hover:text-[#C93F0F]">
                <span>View Project Specifications</span>
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal Lightbox */}
      {activeModalItem && (
        <div
          onClick={() => setActiveModalItem(null)}
          className="fixed inset-0 z-50 bg-stone-900/80 backdrop-blur-sm p-4 sm:p-8 flex items-center justify-center animate-in fade-in duration-200"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-stone-200 shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200"
          >
            <div className="relative aspect-16/9 w-full bg-stone-900">
              <Image
                src={activeModalItem.url}
                alt={activeModalItem.title}
                fill
                className="object-cover"
              />
              <button
                onClick={() => setActiveModalItem(null)}
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/60 hover:bg-black text-white flex items-center justify-center transition-colors"
                aria-label="Close lightbox"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 sm:p-8 space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-stone-100 pb-4">
                <div>
                  <div className="inline-block px-2.5 py-0.5 bg-orange-100 text-[#E64D16] text-[10px] font-bold uppercase tracking-wider rounded-md mb-1.5">
                    {activeModalItem.categoryLabel}
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-stone-900">
                    {activeModalItem.title}
                  </h3>
                  <div className="flex items-center gap-2 text-xs text-stone-500 mt-1">
                    <MapPin className="w-3.5 h-3.5 text-[#E64D16]" />
                    <span>{activeModalItem.location}</span>
                    <span>&bull;</span>
                    <span>{activeModalItem.area}</span>
                  </div>
                </div>

                <a
                  href="#consultation-form"
                  onClick={() => setActiveModalItem(null)}
                  className="px-5 py-2.5 bg-[#E64D16] hover:bg-[#C93F0F] text-white font-bold text-xs uppercase tracking-wider rounded-md transition-all shadow-xs"
                >
                  Inquire About Similar Project
                </a>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-stone-700">
                <div className="p-4 bg-stone-50 rounded-md border border-stone-200 space-y-2">
                  <div className="font-bold text-stone-900 text-sm flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#E64D16]" />
                    <span>Project Scope &amp; Engineering</span>
                  </div>
                  <p className="leading-relaxed text-stone-600">
                    {activeModalItem.scope}
                  </p>
                </div>

                <div className="p-4 bg-stone-50 rounded-md border border-stone-200 space-y-2">
                  <div className="font-bold text-stone-900 text-sm flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#E64D16]" />
                    <span>Materials &amp; Finish Grades</span>
                  </div>
                  <p className="leading-relaxed text-stone-600">
                    {activeModalItem.materials}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
