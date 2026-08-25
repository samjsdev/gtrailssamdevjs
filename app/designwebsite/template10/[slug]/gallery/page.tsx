import { readSourceConfig } from '@/lib/dataBuilder';
import { cleanClinicName } from '@/lib/copyCleaner';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import GalleryClient from '../GalleryClient';
import { Building, Compass, Sparkles, ArrowRight, Phone } from 'lucide-react';

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
  const clinicTagline = data.clinic.tagline || 'Delivering Iconic Architectural Elevations & Turnkey Residential Villas';
  const clinicPhone = data.clinic.contact?.phone || '+91 81100 00384';

  const media = data.media || {};
  const heroImage = media.clinicImages?.[0] || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1920&q=80';

  const rawImages = [
    media.otherImages?.[0] || 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
    media.otherImages?.[1] || 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
    media.otherImages?.[2] || 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80',
    media.otherImages?.[3] || 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80',
    media.otherImages?.[4] || 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80',
    media.otherImages?.[5] || 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=80',
  ];

  const projects = [
    {
      id: 'p1',
      title: 'THE OBSIDIAN GRAND VILLA',
      category: 'construction' as const,
      location: 'Grand Enclave, Chennai',
      area: '4,500 sq.ft Built-Up',
      image: rawImages[0],
      description: 'Turnkey G+2 luxury residential villa with double-height living foyer, cantilevered balcony slabs, and integrated thermal insulation.',
      badge: 'RESIDENTIAL CONSTRUCTION',
    },
    {
      id: 'p2',
      title: 'MONOLITH ARCHITECTURAL RESIDENCE',
      category: 'architecture' as const,
      location: 'Hilltop Avenue, Bangalore',
      area: '5,500 sq.ft Built-Up',
      image: rawImages[1],
      description: 'Modern geometric facade elevation incorporating exposed concrete textures, large glazed curtain walls, and central courtyard ventilation.',
      badge: 'ARCHITECTURAL DESIGN',
    },
    {
      id: 'p3',
      title: 'VANGUARD PENTHOUSE INTERIOR',
      category: 'interior' as const,
      location: 'Skyline Heights, Hyderabad',
      area: '3,600 sq.ft Built-Up',
      image: rawImages[2],
      description: 'Ultra-luxury interior fit-out featuring imported bookmatched Italian marble, custom acoustic wall panelling, and integrated smart lighting.',
      badge: 'LUXURY INTERIOR',
    },
    {
      id: 'p4',
      title: 'THE COURTYARD CONTEMPORARY VILLA',
      category: 'construction' as const,
      location: 'Palm Meadows, Coimbatore',
      area: '4,800 sq.ft Built-Up',
      image: rawImages[3],
      description: 'Full-scope turnkey civil construction with Fe550D reinforcement, custom swimming pool engineering, and landscaped perimeter walls.',
      badge: 'RESIDENTIAL CONSTRUCTION',
    },
    {
      id: 'p5',
      title: 'INDUSTRIAL BRUTALIST ELEVATION',
      category: 'architecture' as const,
      location: 'Boulevard Road, Chennai',
      area: '6,100 sq.ft Built-Up',
      image: rawImages[4],
      description: 'Architectural blueprint highlighting sharp rectangular cantilevers, steel framing, bespoke louvre screening, and complete 3D BIM coordination.',
      badge: 'ARCHITECTURAL DESIGN',
    },
    {
      id: 'p6',
      title: 'LUXE LIVING SUITE & KITCHEN',
      category: 'interior' as const,
      location: 'Central Residency, Bangalore',
      area: '3,100 sq.ft Built-Up',
      image: rawImages[5],
      description: 'German modular kitchen with integrated Blum motorized drawers, custom quartz island counter, and bespoke master suite walk-in wardrobes.',
      badge: 'LUXURY INTERIOR',
    },
  ];

  const basePath = `/designwebsite/template10/${slug}`;

  return (
    <div className="w-full bg-[#111111] text-[#F4F3EE]">
      {/* ─── Hero Banner Section ─── */}
      <section id="gallery-hero" className="relative py-20 sm:py-28 bg-[#181B1A] border-b-4 border-[#252A29]">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#E94B26] text-[#F4F3EE] text-xs font-black uppercase tracking-widest mb-4 border border-[#111111]">
              <Building className="w-3.5 h-3.5" />
              <span>COMPLETED SITES & DELIVERED HOMES</span>
            </div>
            <h1 className="text-4xl sm:text-6xl font-black uppercase text-[#F4F3EE] tracking-tight leading-none mb-4">
              OUR BUILT <span className="text-[#E94B26]">PROJECT PORTFOLIO</span>
            </h1>
            <p className="text-sm sm:text-base font-bold uppercase tracking-wider text-[#C8A84E]">
              {clinicName} &bull; {clinicTagline}
            </p>
          </div>
        </div>
      </section>

      {/* ─── Interactive Gallery Section ─── */}
      <section id="gallery-grid" className="py-20 px-4 sm:px-8 bg-[#111111] border-b-4 border-[#252A29]">
        <div className="max-w-7xl mx-auto">
          <GalleryClient projects={projects} />
        </div>
      </section>

      {/* ─── CTA Banner Section ─── */}
      <section id="gallery-cta" className="py-16 px-4 sm:px-8 bg-[#E94B26] text-[#F4F3EE]">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-6">
          <div>
            <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-[#F4F3EE]">
              WANT TO VISIT OUR COMPLETED SITES IN PERSON?
            </h2>
            <p className="text-xs font-mono text-[#F4F3EE]/90 uppercase mt-1">
              Call {clinicPhone} to schedule a guided technical site walkthrough.
            </p>
          </div>
          <Link
            href={`${basePath}/contact`}
            className="px-8 py-4 bg-[#111111] text-[#F4F3EE] font-black text-xs uppercase tracking-widest border border-[#111111] shadow-[4px_4px_0px_#000000] hover:bg-[#181B1A] transition-all flex items-center gap-2"
          >
            <span>REQUEST SITE VISIT</span>
            <ArrowRight className="w-4 h-4 text-[#E94B26]" />
          </Link>
        </div>
      </section>
    </div>
  );
}
