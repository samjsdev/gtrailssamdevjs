'use client';

import { CONTACT_LINKS } from '@/lib/contactLinks';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { X, ArrowUpRight, Layers, MessageCircle } from 'lucide-react';
import { siteAssets } from '@/lib/siteAssets';
import type { ArchiveGroup, ArchiveImage } from '@/lib/projectArchive';

const archiveGroupLabels: Record<ArchiveGroup, string> = {
  exterior_renders: 'Exterior Renders',
  interior_renders: 'Interior Renders',
  completed_interiors: 'Completed Interiors',
  portfolio_showcase: 'Portfolio Showcase',
};

const archiveImageTitles: Record<ArchiveGroup, string> = {
  exterior_renders: 'Exterior Render',
  interior_renders: 'Interior Render',
  completed_interiors: 'Completed Interior',
  portfolio_showcase: 'Portfolio Image',
};

interface GalleryItem {
  url: string;
  archiveId?: string;
  archiveGroup?: ArchiveGroup;
  rotation?: 0 | 90;
  hasCuratedDetails?: boolean;
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
  archiveImages: ArchiveImage[];
}

function GalleryImage({ item, enlarged = false }: { item: GalleryItem; enlarged?: boolean }) {
  const image = (
    <Image
      src={item.url}
      alt={item.title}
      fill
      priority={enlarged}
      sizes={enlarged ? '100vw' : '(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw'}
      className={`${enlarged ? 'object-contain' : 'object-cover'} ${enlarged ? '' : 'transition-transform duration-500 ease-out group-hover:scale-[1.025]'}`}
    />
  );

  if (item.rotation !== 90) return image;

  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div
        className="relative shrink-0"
        style={{ width: '100cqh', height: '100cqw', transform: 'rotate(90deg)' }}
      >
        {image}
      </div>
    </div>
  );
}

export default function GalleryClient({ archiveImages }: GalleryClientProps) {
  const [activeFilter, setActiveFilter] = useState<'all' | ArchiveGroup>('all');
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

  const featuredItems: GalleryItem[] = [
    {
      url: siteAssets.exteriors.whiteDuplex,
      title: 'Contemporary White Duplex',
      category: 'villas', categoryLabel: 'Exterior Render',
      area: 'Residential elevation', location: 'MPA project archive',
      scope: 'A multi-level home with broad balconies and a landscaped entrance.',
      materials: 'White facade planes, warm accent panels and glazed balcony edges are visible in this design.',
      materialTags: ['Duplex', 'Balconies', 'Landscape'],
    },
    {
      url: siteAssets.exteriors.geometricFacade,
      title: 'Geometric Facade Study',
      category: 'architecture', categoryLabel: 'Architectural Elevation',
      area: 'Exterior render', location: 'MPA project archive',
      scope: 'An angular facade composition with contrasting light and textured surfaces.',
      materials: 'Layered rectangular volumes, deep window reveals and a bold vertical feature wall.',
      materialTags: ['Geometric volumes', 'Facade', '3D view'],
    },
    {
      url: siteAssets.interiors.kitchenDining,
      title: 'Open Kitchen & Dining Interior',
      category: 'kitchen', categoryLabel: 'Completed Interior',
      area: 'Kitchen and dining', location: 'MPA project archive',
      scope: 'A completed open-plan kitchen and dining space with a breakfast counter.',
      materials: 'Dark cabinetry, warm wood fronts, pendant lights and an integrated dining area.',
      materialTags: ['Kitchen', 'Dining', 'Breakfast counter'],
    },
    {
      url: siteAssets.interiors.mediaWall,
      title: 'Entertainment Room Interior',
      category: 'living', categoryLabel: 'Completed Interior',
      area: 'Living space', location: 'MPA project archive',
      scope: 'A completed entertainment room with a media wall and lounge seating.',
      materials: 'Red and white wall treatment, integrated lighting and a central games table.',
      materialTags: ['Media wall', 'Lighting', 'Lounge'],
    },
    {
      url: siteAssets.exteriors.duskVilla,
      title: 'Contemporary Villa at Dusk',
      category: 'villas', categoryLabel: 'Exterior Render',
      area: 'Residential elevation', location: 'MPA project archive',
      scope: 'A contemporary corner villa visualized with evening lighting.',
      materials: 'White facade surfaces, timber-toned screens and illuminated balconies.',
      materialTags: ['Villa', 'Balconies', 'Evening view'],
    },
    {
      url: siteAssets.interiors.livingRoom,
      title: 'Bright Contemporary Living Room',
      category: 'living', categoryLabel: 'Interior Render',
      area: 'Living space', location: 'MPA project archive',
      scope: 'A light-filled living room visualization with an open stair and seating area.',
      materials: 'Layered ceiling, feature wall, recessed lighting and neutral upholstery.',
      materialTags: ['Living room', 'Feature wall', 'Ceiling'],
    },
    {
      url: siteAssets.exteriors.courtyardHome,
      title: 'Garden-Facing Courtyard Home',
      category: 'architecture', categoryLabel: 'Architectural Elevation',
      area: 'Exterior render', location: 'MPA project archive',
      scope: 'A compact residence designed around a green front court.',
      materials: 'Flat roofline, brick-toned vertical detail and planted entry court.',
      materialTags: ['Courtyard', 'Garden', 'Facade'],
    },
    {
      url: siteAssets.interiors.contemporaryKitchen,
      title: 'Contemporary Island Kitchen',
      category: 'kitchen', categoryLabel: 'Interior Render',
      area: 'Kitchen design', location: 'MPA project archive',
      scope: 'A spacious kitchen visualization with a central island and dining connection.',
      materials: 'Light cabinetry, stone-look worktops and a dark accent wall.',
      materialTags: ['Kitchen island', 'Cabinetry', 'Dining'],
    },
    {
      url: siteAssets.exteriors.timberVilla,
      title: 'Timber Accent Residence',
      category: 'villas', categoryLabel: 'Exterior Render',
      area: 'Residential elevation', location: 'MPA project archive',
      scope: 'A white residential facade with a prominent warm-toned upper volume.',
      materials: 'Strong rectangular framing, screened glazing and planted frontage.',
      materialTags: ['Villa', 'Facade', 'Landscape'],
    },
    {
      url: siteAssets.interiors.completedLiving,
      title: 'Completed Living & Entertainment Space',
      category: 'living', categoryLabel: 'Completed Interior',
      area: 'Living space', location: 'MPA project archive',
      scope: 'A completed interior showing integrated seating and an entertainment zone.',
      materials: 'White surfaces, red accents and a coordinated wall display.',
      materialTags: ['Living', 'Media', 'Interior'],
    },
    {
      url: siteAssets.exteriors.orangeFacade,
      title: 'Vertical Accent Facade',
      category: 'architecture', categoryLabel: 'Architectural Elevation',
      area: 'Exterior render', location: 'MPA project archive',
      scope: 'A tall urban residence with strong vertical facade elements.',
      materials: 'White and orange planes, narrow vertical openings and balcony details.',
      materialTags: ['Urban home', 'Elevation', 'Facade'],
    },
    {
      url: siteAssets.interiors.warmKitchen,
      title: 'Warm Timber Kitchen Concept',
      category: 'kitchen', categoryLabel: 'Interior Render',
      area: 'Kitchen design', location: 'MPA project archive',
      scope: 'An open kitchen and dining concept with timber-toned ceiling features.',
      materials: 'Wood-look surfaces, overhead storage and a compact breakfast counter.',
      materialTags: ['Kitchen', 'Timber tones', 'Storage'],
    },
    {
      url: siteAssets.interiors.ceilingAndLiving,
      title: 'Layered Ceiling Living Concept',
      category: 'living', categoryLabel: 'Interior Render',
      area: 'Living space', location: 'MPA project archive',
      scope: 'A living room visualization centered on a sculpted ceiling and seating layout.',
      materials: 'Layered ceiling planes, a feature wall and warm accent lighting.',
      materialTags: ['Living room', 'Lighting', 'Ceiling'],
    },
  ];

  const archiveByUrl = new Map(archiveImages.map((image) => [image.url, image]));
  const featuredUrls = new Set(featuredItems.map((item) => item.url));
  const allItems: GalleryItem[] = [
    ...featuredItems.map((item) => {
      const archive = archiveByUrl.get(item.url);
      return {
        ...item,
        archiveId: archive?.id,
        archiveGroup: archive?.group,
        rotation: archive?.rotation,
        hasCuratedDetails: true,
      };
    }),
    ...archiveImages.filter((image) => !featuredUrls.has(image.url)).map((image) => ({
      url: image.url,
      archiveId: image.id,
      archiveGroup: image.group,
      rotation: image.rotation,
      title: archiveImageTitles[image.group],
      category: image.group === 'exterior_renders' ? 'architecture' as const : 'living' as const,
      categoryLabel: archiveGroupLabels[image.group],
      area: archiveGroupLabels[image.group],
      location: 'MPA image archive',
      scope: `An image from the MPA ${archiveGroupLabels[image.group].toLowerCase()} archive.`,
      materials: '',
      materialTags: [archiveGroupLabels[image.group]],
    })),
  ];

  const filteredItems = activeFilter === 'all'
    ? allItems
    : allItems.filter(item => item.archiveGroup === activeFilter);

  const filterTabs = [
    { id: 'all', label: 'All Images', count: allItems.length },
    ...Object.entries(archiveGroupLabels).map(([id, label]) => ({
      id: id as ArchiveGroup,
      label,
      count: allItems.filter((item) => item.archiveGroup === id).length,
    })),
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
              onClick={() => setActiveFilter(tab.id)}
              className={`shrink-0 px-4 sm:px-5 py-2 sm:py-2.5 text-xs font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer flex items-center gap-2.5 border ${
                isActive
                  ? 'bg-surface-sand text-[#302A20] border-[#111111] shadow-md'
                  : 'bg-surface-cream text-[#444444] border-[#111111]/20 hover:border-[#EA580C] hover:text-[#111111]'
              }`}
            >
              <span>{tab.label}</span>
              <span
                className={`text-[10px] px-1.5 py-0.5 font-mono ${
                  isActive ? 'bg-[#EA580C] text-[#111111] font-black' : 'bg-surface-cream text-[#757575]'
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
          images from MPA&apos;s archive
        </p>
        <span className="hidden sm:inline text-[#703015] font-bold uppercase tracking-widest text-[11px]">
          Select an image to view it larger
        </span>
      </div>

      {/* ── Image-first project gallery ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-7">
        {filteredItems.map((item) => (
          <button
            type="button"
            key={item.archiveId ?? item.url}
            onClick={() => setActiveModalItem(item)}
            aria-label={`View ${item.title}, image ${item.archiveId}`}
            className="group grid grid-rows-[1fr_auto] h-[400px] sm:h-[460px] lg:h-[410px] min-w-0 overflow-hidden border border-[#111111]/15 bg-surface-cream text-left transition-colors duration-300 hover:border-[#EA580C] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#EA580C] cursor-pointer"
          >
            <div className="relative min-h-0 w-full overflow-hidden bg-surface-linen" style={{ containerType: 'size' }}>
              <GalleryImage item={item} />
              <span className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/10" />
            </div>
            <div className="min-h-0 flex items-center justify-between gap-3 px-4 py-4 sm:px-5">
              <div className="min-w-0">

                <h3 className="truncate font-serif text-base sm:text-lg font-bold text-[#111111] group-hover:text-[#703015] transition-colors">
                  {item.title}
                </h3>
              </div>
              <ArrowUpRight className="h-5 w-5 shrink-0 text-[#703015] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </div>
          </button>
        ))}
      </div>

      {/* ── Modal Lightbox ── */}
      {activeModalItem && (
        <div
          onClick={() => setActiveModalItem(null)}
          className="fixed inset-0 z-50 bg-surface-sand/85 backdrop-blur-md p-4 sm:p-8 flex items-center justify-center"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-project-title"
        >
          <div
            data-lenis-prevent
            onClick={(e) => e.stopPropagation()}
            className="bg-surface-cream border-2 border-[#111111] max-w-6xl w-full max-h-[94vh] overflow-y-auto shadow-2xl relative"
          >
            {/* Modal Image Header */}
            <div className="relative h-[42vh] min-h-[250px] w-full bg-surface-linen sm:h-[68vh]" style={{ containerType: 'size' }}>
              <GalleryImage item={activeModalItem} enlarged />
              <button
                onClick={() => setActiveModalItem(null)}
                className="absolute top-4 right-4 w-10 h-10 bg-surface-sand/90 hover:bg-[#EA580C] text-[#302A20] hover:text-[#111111] flex items-center justify-center transition-colors cursor-pointer border border-[#5D5140]/25 z-10"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 sm:p-8 space-y-6">
              <div className="flex flex-wrap items-start justify-between gap-4 border-b border-[#111111]/15 pb-6">
                <div>
                  <h3
                    id="modal-project-title"
                    className="text-2xl sm:text-3xl font-bold font-serif text-[#111111]"
                    style={{ fontFamily: "var(--font-content)" }}
                  >
                    {activeModalItem.title}
                  </h3>
                  {activeModalItem.hasCuratedDetails && <div className="flex items-center gap-2.5 text-xs font-bold uppercase tracking-wider text-[#757575] mt-2">
                    <Layers className="w-4 h-4 text-[#703015]" />
                    <span>{activeModalItem.location}</span>
                    <span>•</span>
                    <span className="text-[#703015] font-mono">{activeModalItem.area}</span>
                  </div>}
                </div>

                <a
                  href={`${CONTACT_LINKS.whatsapp}?text=${encodeURIComponent(`Hi Murali Patharala & Associates, I am inquiring about project: ${activeModalItem.title} (${activeModalItem.location})`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto justify-center px-6 py-3.5 bg-[#EA580C] text-[#111111] font-bold text-xs uppercase tracking-widest hover:bg-surface-sand hover:text-[#302A20] transition-colors flex items-center gap-2"
                >
                  <MessageCircle className="w-4 h-4" />
                  Inquire About This Project
                </a>
              </div>

              {/* Image Details Grid */}
              {activeModalItem.hasCuratedDetails && <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-[#111111]">
                <div className="p-5 bg-surface-cream border border-[#111111]/15 space-y-3">
                  <div className="font-bold text-sm uppercase tracking-wider flex items-center gap-2 text-[#111111]">
                    <span className="text-[#703015]">■</span>
                    <span>Design Focus</span>
                  </div>
                  <p className="leading-relaxed text-[#55534E] font-medium text-sm">
                    {activeModalItem.scope}
                  </p>
                </div>

                <div className="p-5 bg-surface-cream border border-[#111111]/15 space-y-3">
                  <div className="font-bold text-sm uppercase tracking-wider flex items-center gap-2 text-[#111111]">
                    <span className="text-[#703015]">■</span>
                    <span>Visible Details</span>
                  </div>
                  <p className="leading-relaxed text-[#55534E] font-medium text-sm">
                    {activeModalItem.materials}
                  </p>
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {activeModalItem.materialTags.map((tag, tIdx) => (
                      <span key={tIdx} className="px-2 py-0.5 bg-surface-cream border border-[#111111]/10 text-[11px] font-semibold text-[#111111]">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>}

              <div className="pt-4 border-t border-[#111111]/10 flex flex-wrap items-center justify-between gap-4 text-xs text-[#757575]">
                <div className="flex items-center gap-4">
                  {activeModalItem.archiveGroup === 'exterior_renders' ? (
                    <a href="/construction-package" className="mpa-outline-cta">
                      Construction packages &rarr;
                    </a>
                  ) : activeModalItem.archiveGroup === 'interior_renders' || activeModalItem.archiveGroup === 'completed_interiors' ? (
                    <a href="/services/interior-design" className="mpa-outline-cta">
                      Interior design &rarr;
                    </a>
                  ) : null}
                </div>
                <button
                  onClick={() => setActiveModalItem(null)}
                  className="px-4 py-2 text-xs font-bold uppercase tracking-wider text-[#111111] hover:text-[#703015]"
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
