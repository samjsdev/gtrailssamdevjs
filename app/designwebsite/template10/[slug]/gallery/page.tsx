import { readSourceConfig } from '@/lib/dataBuilder';
import { cleanClinicName } from '@/lib/copyCleaner';
import { notFound } from 'next/navigation';
import GalleryClient from '../GalleryClient';
import { Compass, HardHat, Sparkles } from 'lucide-react';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function Template10GalleryPage({ params }: PageProps) {
  const resolvedParams = await params;
  const { slug } = resolvedParams;
  const data = await readSourceConfig(slug, 'template10');

  if (!data || !data.clinic) {
    notFound();
  }

  const clinicName = cleanClinicName(data.clinic.name);
  const clinicTagline = data.clinic.tagline || 'Delivered Architecture, Turnkey Villas & Luxury Interior Sites';

  const media = data.media || {};
  const projectImages = [
    media.otherImages?.[0] || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    media.otherImages?.[1] || 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
    media.otherImages?.[2] || 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
    media.otherImages?.[3] || 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80',
    media.otherImages?.[4] || 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80',
    media.otherImages?.[5] || 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80',
    media.otherImages?.[6] || 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=80',
  ];

  const projects = [
    {
      id: 'p1',
      title: 'The Obsidian Grand Duplex Villa',
      category: 'construction' as const,
      location: 'Prime Residential Enclave',
      area: '4,500 sq.ft Built-Up',
      image: projectImages[0],
      description: 'Turnkey RCC framed residential villa execution with Fe550D TMT reinforcement, double-height living foyer, and German UPVC architectural fenestrations.',
      badge: 'RESIDENTIAL CIVIL CONSTRUCTION',
    },
    {
      id: 'p2',
      title: 'Monolith Brutalist Elevation & Facade',
      category: 'architecture' as const,
      location: 'Hilltop Avenue',
      area: '5,500 sq.ft Plot Plan',
      image: projectImages[1],
      description: '3D BIM architectural concept, cantilevers, textured stone louvers, and complete structural working blueprints aligned with municipal sanctions.',
      badge: 'ARCHITECTURAL DESIGN',
    },
    {
      id: 'p3',
      title: 'Vanguard Penthouse Full-Home Fitout',
      category: 'interior' as const,
      location: 'Skyline Residences',
      area: '3,600 sq.ft Interior',
      image: projectImages[2],
      description: 'Imported bookmatched Italian marble flooring, motorized Blum kitchen cabinetry, acoustic wood-fluted panelling, and integrated architectural lighting.',
      badge: 'LUXURY INTERIOR DESIGN',
    },
    {
      id: 'p4',
      title: 'The Courtyard Contemporary Villa',
      category: 'construction' as const,
      location: 'Palm Meadows',
      area: '4,800 sq.ft Built-Up',
      image: projectImages[3],
      description: 'Custom G+2 residence with private courtyard, M20 lab-certified concrete casting, and full 10-year waterproofing & structural warranty.',
      badge: 'RESIDENTIAL CIVIL CONSTRUCTION',
    },
    {
      id: 'p5',
      title: 'Minimalist Cubist Residence Facade',
      category: 'architecture' as const,
      location: 'Boulevard Road',
      area: '6,100 sq.ft Plan',
      image: projectImages[4],
      description: 'Parametric screen detailing, cantilevered overhangs, 3D sun-path simulation, and structural framing drawings.',
      badge: 'ARCHITECTURAL DESIGN',
    },
    {
      id: 'p6',
      title: 'Bespoke Master Suite & Modular Kitchen',
      category: 'interior' as const,
      location: 'Central Residency',
      area: '3,100 sq.ft Interior',
      image: projectImages[5],
      description: 'Full-height seamless wardrobes, hydraulic hardware, quartz stone countertops, and ambient cove lighting systems.',
      badge: 'LUXURY INTERIOR DESIGN',
    },
  ];

  return (
    <div className="w-full bg-[#252A29] text-[#F4F3EE]">
      {/* ─── Hero Banner Section ─── */}
      <section id="gallery-hero" className="relative py-24 sm:py-32 bg-[#1A1E1D] border-b-4 border-[#111111]">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#E94B26] text-[#F4F3EE] text-xs font-black uppercase tracking-[0.2em] mb-4 border border-[#111111] shadow-[3px_3px_0px_#111111]">
              <Compass className="w-3.5 h-3.5" />
              <span>DELIVERED SITES & PORTFOLIO</span>
            </div>
            <h1 className="text-4xl sm:text-6xl font-black uppercase text-[#F4F3EE] tracking-tight leading-[0.95] mb-4">
              PORTFOLIO OF <span className="text-[#E94B26]">BUILT SITES</span> & ELEVATIONS
            </h1>
            <p className="text-sm sm:text-base font-bold uppercase tracking-wider text-[#C8A84E]">
              {clinicName} &bull; {clinicTagline}
            </p>
          </div>
        </div>
      </section>

      {/* ─── Gallery Grid Section ─── */}
      <section id="gallery-grid" className="py-24 px-4 sm:px-8 bg-[#252A29] border-b-4 border-[#111111]">
        <div className="max-w-7xl mx-auto">
          <GalleryClient projects={projects} />
        </div>
      </section>
    </div>
  );
}
