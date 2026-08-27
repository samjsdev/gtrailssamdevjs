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
            className={`px-5 sm:px-7 py-3 text-xs font-bold uppercase tracking-widest transition-all border-2 border-[#111111] cursor-pointer ${
              activeFilter === tab.id
                ? 'bg-[#111111] text-[#EA580C]'
                : 'bg-white text-[#111111] hover:bg-[#FAFAFA]'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Grid of Portfolio Works */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredItems.map((item, idx) => (
          <div
            key={idx}
            onClick={() => setActiveModalItem(item)}
            className="group cursor-pointer border-2 border-[#111111] hover:shadow-xl transition-all duration-300 flex flex-col bg-white"
          >
            {/* Image Container */}
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#181818]">
              <Image
                src={item.url}
                alt={item.title}
                fill
                className="object-cover grayscale-[0.2] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-[#111111]/30 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

              {/* Top Category Badge */}
              <div className="absolute top-3 left-3">
                <span className="px-3 py-1 bg-[#111111] text-[#EA580C] text-[10px] font-bold uppercase tracking-widest border border-[#333333]">
                  {item.categoryLabel}
                </span>
              </div>

              {/* Zoom Trigger */}
              <div className="absolute top-3 right-3 w-8 h-8 bg-[#111111] text-[#EA580C] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
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
          className="fixed inset-0 z-50 bg-[#111111]/85 backdrop-blur-sm p-4 sm:p-8 flex items-center justify-center"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white border-4 border-[#111111] max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
          >
            <div className="relative aspect-16/9 w-full bg-[#111111]">
              <Image
                src={activeModalItem.url}
                alt={activeModalItem.title}
                fill
                className="object-cover"
              />
              <button
                onClick={() => setActiveModalItem(null)}
                className="absolute top-4 right-4 w-10 h-10 bg-[#111111] hover:bg-[#EA580C] hover:text-[#111111] text-white flex items-center justify-center transition-colors cursor-pointer border border-[#333333]"
                aria-label="Close lightbox"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 sm:p-8 space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-4 border-b-2 border-[#111111] pb-4">
                <div>
                  <div className="inline-block px-3 py-1 bg-[#EA580C] text-[#111111] text-[10px] font-bold uppercase tracking-widest mb-2">
                    {activeModalItem.categoryLabel}
                  </div>
                  <h3
                    className="text-xl sm:text-3xl font-bold font-serif text-[#111111]"
                    style={{ fontFamily: "'Lora', serif" }}
                  >
                    {activeModalItem.title}
                  </h3>
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#757575] mt-1">
                    <MapPin className="w-3.5 h-3.5 text-[#EA580C]" />
                    <span>{activeModalItem.location}</span>
                    <span>•</span>
                    <span>{activeModalItem.area}</span>
                  </div>
                </div>

                <a
                  href={`https://wa.me/919841098490?text=${encodeURIComponent(`Hi Murali Patharala Associates, I am inquiring about project: ${activeModalItem.title}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 bg-[#EA580C] text-[#111111] font-bold text-xs uppercase tracking-widest hover:bg-[#111111] hover:text-white transition-colors"
                >
                  Inquire About This Project
                </a>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-[#111111]">
                <div className="p-5 bg-[#FAFAFA] border-2 border-[#111111] space-y-2">
                  <div className="font-bold text-sm uppercase tracking-wider flex items-center gap-2 text-[#111111]">
                    <span className="text-[#EA580C]">■</span>
                    <span>Project Scope &amp; Engineering</span>
                  </div>
                  <p className="leading-relaxed text-[#757575] font-medium">
                    {activeModalItem.scope}
                  </p>
                </div>

                <div className="p-5 bg-[#FAFAFA] border-2 border-[#111111] space-y-2">
                  <div className="font-bold text-sm uppercase tracking-wider flex items-center gap-2 text-[#111111]">
                    <span className="text-[#EA580C]">■</span>
                    <span>Materials &amp; Finish Grades</span>
                  </div>
                  <p className="leading-relaxed text-[#757575] font-medium">
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
