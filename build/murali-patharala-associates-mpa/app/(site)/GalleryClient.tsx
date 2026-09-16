'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { 
  X, ArrowUpRight, Maximize2, MapPin, 
  Ruler, Layers, CheckCircle2, MessageCircle, Phone
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
  materialTags: string[];
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

  // Close modal on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveModalItem(null);
      }
    };
    if (activeModalItem) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [activeModalItem]);

  const allItems: GalleryItem[] = [
    {
      url: '/images/architecture/hero-villa-twilight.webp',
      title: 'The Cantilever Twilight Villa',
      category: 'villas',
      categoryLabel: 'Turnkey Construction',
      area: '5,400 Sq.Ft Villa',
      location: 'Boat Club Road, Chennai',
      scope: 'Complete Turnkey Construction from Soil Testing to Handover, Cantilever Balconies & Infinity Pool',
      materials: 'Tata Tiscon 550D Steel, UltraTech Super Concrete, Teak Louvers, Double-Glazed Glass',
      materialTags: ['Tata Tiscon 550D', 'UltraTech Super', 'Teak Louvers', 'Infinity Pool'],
    },
    {
      url: '/images/architecture/geometric-villa-elevation.webp',
      title: 'Modern Minimalist Architectural Elevation & 3D BIM',
      category: 'architecture',
      categoryLabel: 'Architectural Elevation',
      area: '4,200 Sq.Ft Residence',
      location: 'ECR Sea-Breeze Enclave, Chennai',
      scope: 'Parametric Facade Design, Louvered Solar Shading, Structural Engineering & CMDA Sanction Approvals',
      materials: 'Thermally Broken Aluminium Profiles, High-Pressure Laminate Louvers, Textured Stucco',
      materialTags: ['3D BIM Modeling', 'Solar Louvers', 'CMDA Sanctioned', 'Thermal Breaks'],
    },
    {
      url: '/images/architecture/modular-kitchen-luxury.webp',
      title: 'Island Modular Kitchen with Calacatta Quartz',
      category: 'kitchen',
      categoryLabel: 'Modular Kitchen',
      area: '380 Sq.Ft Kitchen Suite',
      location: 'Kilpauk Enclave, Chennai',
      scope: 'Seamless Quartz Countertops, Häfele Soft-Close Tandem Boxes, Appliance Garage & Under-Mount Sink',
      materials: '100% BWR Marine Plywood (IS:710), Anti-Fingerprint Matte Acrylic, Calacatta Quartz',
      materialTags: ['Calacatta Quartz', 'BWR Marine Plywood', 'Häfele Hardware', 'Built-in Pantry'],
    },
    {
      url: '/images/architecture/luxury-master-bedroom.webp',
      title: 'Master Bedroom Suite & Walk-in Wardrobe',
      category: 'living',
      categoryLabel: 'Living & Interiors',
      area: '560 Sq.Ft Suite',
      location: 'Mogappair West, Chennai',
      scope: 'Floor-to-Ceiling Fluted Glass Wardrobes, Sensor LED Profiling & Acoustic Bedhead Wall Paneling',
      materials: 'Smoked Walnut Veneer, Tinted Fluted Glass, Häfele Wardrobe Sliders, Italian Wall Sconces',
      materialTags: ['Fluted Glass', 'Smoked Walnut', 'Sensor LED', 'Walk-in Wardrobe'],
    },
    {
      url: '/images/architecture/structural-construction-frame.webp',
      title: 'Duplex Villa Structural Civil Framework & Foundation',
      category: 'villas',
      categoryLabel: 'Turnkey Construction',
      area: '3,850 Sq.Ft Villa Structure',
      location: 'Velachery Extension, Chennai',
      scope: 'Seismic Zone III RCC Framing, 425+ Quality Audits, Concrete Cube Compressive Testing',
      materials: 'Primary TMT Fe550 Steel, Coromandel 53-Grade Cement, Waterproofed Foundation Slabs',
      materialTags: ['Primary TMT Fe550', '53-Grade Cement', 'Seismic Zone III', 'Cube Testing'],
    },
    {
      url: '/images/architecture/living-room-double-height.webp',
      title: 'Double-Height Living & Media Console Architecture',
      category: 'living',
      categoryLabel: 'Living & Interiors',
      area: '820 Sq.Ft Living Hall',
      location: 'Anna Nagar West, Chennai',
      scope: 'Acoustic Fluted Paneling, Concealed Magnetic Track Lights, Floating TV Unit & Stone Backing',
      materials: 'European Smoked Oak Veneer, Gyproc False Ceiling, Asian Paints Royale Luxury Emulsion',
      materialTags: ['Double-Height Atrium', 'Smoked Oak', 'Magnetic Track Lights', 'Acoustic Wall'],
    },
    {
      url: '/images/architecture/courtyard-water-residence.webp',
      title: 'Chettinad-Contemporary Courtyard Residence',
      category: 'architecture',
      categoryLabel: 'Architectural Design',
      area: '5,100 Sq.Ft Residence',
      location: 'Harrington Road, Chennai',
      scope: 'Central Courtyard with Water Body, Traditional Wooden Pillars, Natural Cross-Drafting & Vastu Alignment',
      materials: 'Reclaimed Teak Pillars, Handmade Terracotta Tiles, Basalt Water Fountain',
      materialTags: ['Central Courtyard', 'Reclaimed Teak', 'Passive Cooling', 'Vastu Aligned'],
    },
    {
      url: '/images/architecture/parallel-kitchen-luxury.webp',
      title: 'Parallel High-Gloss Kitchen with Breakfast Bar',
      category: 'kitchen',
      categoryLabel: 'Modular Kitchen',
      area: '310 Sq.Ft Kitchen',
      location: 'Shenoy Nagar, Chennai',
      scope: 'Full-Extension Soft Close Drawers, Tall Pantry Pull-Outs & Built-In Microwave Housing',
      materials: 'BWR Marine Ply, Acrylic Fronts, Blum Soft-Close Hinges, Composite Quartz Top',
      materialTags: ['High-Gloss Acrylic', 'Blum Motion', 'Breakfast Bar', 'Pantry Pull-Outs'],
    },
    {
      url: '/images/architecture/modern-villa-duplex.webp',
      title: 'The Contemporary Duplex Villa',
      category: 'villas',
      categoryLabel: 'Turnkey Construction',
      area: '4,600 Sq.Ft Duplex',
      location: 'Anna Nagar East, Chennai',
      scope: 'Full Turnkey Civil Build, Monolithic RCC Frame, Custom Joinery & Landscaping',
      materials: 'Primary TMT Fe550 Steel, Coromandel 53-Grade Cement, Granite & Teak Portals',
      materialTags: ['Monolithic RCC', 'Granite Portals', 'Integrated Garden', 'Full Turnkey'],
    },
    {
      url: '/images/architecture/porotherm-clay-facade.webp',
      title: 'Passive Solar & Porotherm Clay Screen Architecture',
      category: 'architecture',
      categoryLabel: 'Architectural Design',
      area: '3,400 Sq.Ft Residence',
      location: 'Poes Garden, Chennai',
      scope: 'Passive Solar Cantilevers, Thermal Porotherm Blocks, Light-and-Shadow Perforated Screens',
      materials: 'Porotherm Clay Hollow Bricks, Exposed Form-Finish Concrete, Teak Louver Screens',
      materialTags: ['Porotherm Blocks', 'Passive Solar', 'Perforated Jali', 'Exposed Concrete'],
    },
    {
      url: '/images/architecture/custom-furniture-joinery.webp',
      title: 'Custom Dining Cabinetry & Teak Joinery',
      category: 'living',
      categoryLabel: 'Living & Interiors',
      area: '420 Sq.Ft Dining Space',
      location: 'Alwarpet, Chennai',
      scope: 'Custom Smoked Teak Woodwork, Integrated Sideboards, Precision Joinery & Ambient Lighting',
      materials: '100% BWR Marine Plywood (IS:710), Teak Veneer, Concealed Blum Drawer Slides',
      materialTags: ['100% BWR Marine Ply', 'Smoked Teak', 'Concealed Slides', 'Integrated Lighting'],
    },
    {
      url: '/images/architecture/pooja-mandir-foyer.webp',
      title: 'Teak Pooja Mandir & Backlit Brass CNC Foyer',
      category: 'living',
      categoryLabel: 'Living & Interiors',
      area: '240 Sq.Ft Pooja & Foyer',
      location: 'Nungambakkam, Chennai',
      scope: 'Backlit Brass CNC Jali, Natural Burma Teak Joinery, White Marble Plinth & Concealed Warm LED Lighting',
      materials: 'Solid Burma Teak, Statuario Marble Plinth, Perforated Brass Jali, Polyurethane Scratch-Resistant Finish',
      materialTags: ['Burma Teak', 'Statuario Marble', 'Brass CNC Jali', 'Vastu Orientated'],
    },
    {
      url: '/images/architecture/villa-after-finished.webp',
      title: 'The Signature White Turnkey Villa',
      category: 'villas',
      categoryLabel: 'Turnkey Construction',
      area: '4,500 Sq.Ft Villa',
      location: 'Anna Nagar West, Chennai',
      scope: 'In-House Supervision & 425+ QC Checks, G+2 Luxury Modern Villa Turnkey Delivery',
      materials: 'Primary TMT Steel, Double-Glazed Low-E Glass, Weather-Shield Acrylic Exterior Coating',
      materialTags: ['G+2 Luxury Villa', '425+ QC Checks', 'Low-E Double Glazed', 'Key Handover'],
    },
  ];

  const filteredItems = activeFilter === 'all'
    ? allItems
    : allItems.filter(item => item.category === activeFilter);

  const filterTabs = [
    { id: 'all', label: 'All Projects', count: allItems.length },
    { id: 'villas', label: 'Turnkey Villas', count: allItems.filter(i => i.category === 'villas').length },
    { id: 'architecture', label: 'Architectural Elevations', count: allItems.filter(i => i.category === 'architecture').length },
    { id: 'kitchen', label: 'Modular Kitchens', count: allItems.filter(i => i.category === 'kitchen').length },
    { id: 'living', label: 'Living & Interiors', count: allItems.filter(i => i.category === 'living').length },
  ] as const;

  return (
    <div className="space-y-12">
      {/* ── Filter Bar ── */}
      <div className="flex overflow-x-auto sm:flex-wrap items-center sm:justify-center gap-2 sm:gap-3 border-b border-[#111111]/15 pb-4 sm:pb-8 no-scrollbar -mx-2 px-2 sm:mx-0 sm:px-0">
        {filterTabs.map((tab) => {
          const isActive = activeFilter === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveFilter(tab.id as any)}
              className={`shrink-0 px-4 sm:px-5 py-2 sm:py-2.5 text-xs font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer flex items-center gap-2.5 border ${
                isActive
                  ? 'bg-[#111111] text-white border-[#111111] shadow-md'
                  : 'bg-white text-[#444444] border-[#111111]/20 hover:border-[#EA580C] hover:text-[#111111]'
              }`}
            >
              <span>{tab.label}</span>
              <span
                className={`text-[10px] px-1.5 py-0.5 font-mono ${
                  isActive ? 'bg-[#EA580C] text-[#111111] font-black' : 'bg-[#FAFAF8] text-[#757575]'
                }`}
              >
                {tab.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* ── Active Filter Indicator Summary ── */}
      <div className="flex items-center justify-between text-xs font-semibold text-[#757575] px-1">
        <p>
          Showing <span className="text-[#111111] font-bold">{filteredItems.length}</span>{' '}
          documented residential projects in Chennai &amp; Tamil Nadu
        </p>
        <span className="hidden sm:inline text-[#EA580C] font-bold uppercase tracking-widest text-[11px]">
          Click any card to inspect full specifications
        </span>
      </div>

      {/* ── Architectural Monograph Grid ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredItems.map((item, idx) => (
          <article
            key={idx}
            onClick={() => setActiveModalItem(item)}
            className="group cursor-pointer border border-[#111111]/15 hover:border-[#EA580C] bg-white transition-all duration-300 hover:shadow-xl flex flex-col justify-between overflow-hidden"
          >
            {/* Image Container */}
            <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#181818]">
              <Image
                src={item.url}
                alt={item.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#111111]/90 via-[#111111]/25 to-transparent opacity-75 group-hover:opacity-60 transition-opacity" />

              {/* Category Badge */}
              <div className="absolute top-3 left-3 z-10">
                <span className="px-2.5 py-1 bg-[#111111]/90 backdrop-blur-sm text-[#EA580C] text-[10px] font-bold uppercase tracking-widest border border-white/15">
                  {item.categoryLabel}
                </span>
              </div>

              {/* Quick Inspect Trigger */}
              <div className="absolute top-3 right-3 z-10 w-8 h-8 bg-[#111111]/90 backdrop-blur-sm text-white group-hover:bg-[#EA580C] group-hover:text-[#111111] flex items-center justify-center transition-colors border border-white/15">
                <Maximize2 className="w-3.5 h-3.5" />
              </div>

              {/* Location Badge Over Image */}
              <div className="absolute bottom-3 left-3 right-3 z-10">
                <div className="flex items-center gap-1.5 text-[11px] font-bold text-white/95 drop-shadow-sm">
                  <MapPin className="w-3.5 h-3.5 text-[#EA580C] shrink-0" />
                  <span className="truncate">{item.location}</span>
                  <span className="text-white/40">•</span>
                  <span className="shrink-0 text-[#EA580C]">{item.area}</span>
                </div>
              </div>
            </div>

            {/* Card Body Details */}
            <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
              <div className="space-y-2.5">
                <h3
                  className="text-lg font-bold font-serif text-[#111111] group-hover:text-[#EA580C] transition-colors line-clamp-2 leading-snug"
                  style={{ fontFamily: "'Lora', serif" }}
                >
                  {item.title}
                </h3>
                <p className="text-xs text-[#55534E] line-clamp-2 leading-relaxed font-medium">
                  {item.scope}
                </p>
              </div>

              {/* Specification Tags */}
              <div className="space-y-3 pt-3 border-t border-[#111111]/10">
                <div className="flex flex-wrap gap-1.5">
                  {item.materialTags.map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      className="text-[10px] font-medium px-2 py-0.5 bg-[#FAFAF8] text-[#55534E] border border-[#111111]/10"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Action Row */}
                <div className="pt-2 flex items-center justify-between text-xs font-bold text-[#EA580C] group-hover:text-[#C2410C]">
                  <span className="flex items-center gap-1.5">
                    Inspect Specifications
                    <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </span>

                  <a
                    href={`https://wa.me/919841098490?text=${encodeURIComponent(`Hi MPA, I would like to inquire about project: ${item.title}`)}`}
                    onClick={(e) => e.stopPropagation()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1.5 text-[#25D366] hover:bg-[#25D366]/10 rounded transition-colors"
                    title="WhatsApp about this project"
                    aria-label={`WhatsApp about ${item.title}`}
                  >
                    <MessageCircle className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* ── Modal Lightbox ── */}
      {activeModalItem && (
        <div
          onClick={() => setActiveModalItem(null)}
          className="fixed inset-0 z-50 bg-[#111111]/85 backdrop-blur-md p-4 sm:p-8 flex items-center justify-center"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-project-title"
        >
          <div
            data-lenis-prevent
            onClick={(e) => e.stopPropagation()}
            className="bg-white border-2 border-[#111111] max-w-4xl w-full max-h-[92vh] overflow-y-auto shadow-2xl relative"
          >
            {/* Modal Image Header */}
            <div className="relative aspect-[16/9] w-full bg-[#111111]">
              <Image
                src={activeModalItem.url}
                alt={activeModalItem.title}
                fill
                priority
                className="object-cover"
              />
              <button
                onClick={() => setActiveModalItem(null)}
                className="absolute top-4 right-4 w-10 h-10 bg-[#111111]/90 hover:bg-[#EA580C] text-white hover:text-[#111111] flex items-center justify-center transition-colors cursor-pointer border border-white/20 z-10"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="absolute bottom-4 left-4 z-10">
                <span className="px-3 py-1 bg-[#EA580C] text-[#111111] text-xs font-bold uppercase tracking-widest">
                  {activeModalItem.categoryLabel}
                </span>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-6 sm:p-8 space-y-6">
              <div className="flex flex-wrap items-start justify-between gap-4 border-b border-[#111111]/15 pb-6">
                <div>
                  <h3
                    id="modal-project-title"
                    className="text-2xl sm:text-3xl font-bold font-serif text-[#111111]"
                    style={{ fontFamily: "'Lora', serif" }}
                  >
                    {activeModalItem.title}
                  </h3>
                  <div className="flex items-center gap-2.5 text-xs font-bold uppercase tracking-wider text-[#757575] mt-2">
                    <MapPin className="w-4 h-4 text-[#EA580C]" />
                    <span>{activeModalItem.location}</span>
                    <span>•</span>
                    <span className="text-[#EA580C] font-mono">{activeModalItem.area}</span>
                  </div>
                </div>

                <a
                  href={`https://wa.me/919841098490?text=${encodeURIComponent(`Hi Murali Patharala & Associates, I am inquiring about project: ${activeModalItem.title} (${activeModalItem.location})`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto justify-center px-6 py-3.5 bg-[#EA580C] text-[#111111] font-bold text-xs uppercase tracking-widest hover:bg-[#111111] hover:text-white transition-colors flex items-center gap-2"
                >
                  <MessageCircle className="w-4 h-4" />
                  Inquire About This Project
                </a>
              </div>

              {/* Technical Specifications Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-[#111111]">
                <div className="p-5 bg-[#FAFAF8] border border-[#111111]/15 space-y-3">
                  <div className="font-bold text-sm uppercase tracking-wider flex items-center gap-2 text-[#111111]">
                    <span className="text-[#EA580C]">■</span>
                    <span>Civil &amp; Architectural Scope</span>
                  </div>
                  <p className="leading-relaxed text-[#55534E] font-medium text-sm">
                    {activeModalItem.scope}
                  </p>
                </div>

                <div className="p-5 bg-[#FAFAF8] border border-[#111111]/15 space-y-3">
                  <div className="font-bold text-sm uppercase tracking-wider flex items-center gap-2 text-[#111111]">
                    <span className="text-[#EA580C]">■</span>
                    <span>Material &amp; Structural Schedule</span>
                  </div>
                  <p className="leading-relaxed text-[#55534E] font-medium text-sm">
                    {activeModalItem.materials}
                  </p>
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {activeModalItem.materialTags.map((tag, tIdx) => (
                      <span key={tIdx} className="px-2 py-0.5 bg-white border border-[#111111]/10 text-[11px] font-semibold text-[#111111]">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-[#111111]/10 flex flex-wrap items-center justify-between gap-4 text-xs text-[#757575]">
                <div className="flex items-center gap-4">
                  {activeModalItem.category === 'villas' ? (
                    <a href="/construction-package" className="text-[#EA580C] hover:underline font-bold">
                      Compare Construction Package Specifications &rarr;
                    </a>
                  ) : activeModalItem.category === 'architecture' ? (
                    <a href="/design-package" className="text-[#EA580C] hover:underline font-bold">
                      Compare Architectural Design Packages &rarr;
                    </a>
                  ) : (
                    <a href="/services/interior-design" className="text-[#EA580C] hover:underline font-bold">
                      Explore Full Interior Joinery Scope &rarr;
                    </a>
                  )}
                </div>
                <button
                  onClick={() => setActiveModalItem(null)}
                  className="px-4 py-2 text-xs font-bold uppercase tracking-wider text-[#111111] hover:text-[#EA580C]"
                >
                  Close [Esc]
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
