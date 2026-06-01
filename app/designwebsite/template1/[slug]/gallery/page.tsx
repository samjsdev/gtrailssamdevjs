import { readSourceConfig } from '@/lib/dataBuilder';
import { notFound } from 'next/navigation';
import GalleryGrid from './GalleryGrid';
import { Camera, Sparkles } from 'lucide-react';
import { cleanClinicName } from '@/lib/copyCleaner';

type PageProps = {
  params: Promise<{ slug: string }>;
};

export default async function GalleryPage({ params }: PageProps) {
  const resolvedParams = await params;
  const { slug } = resolvedParams;
  const data = await readSourceConfig(slug, 'template1');
  if (!data) return notFound();

  const { clinic, media, doctor } = data;
  const cleanName = cleanClinicName(clinic.name);

  const allGalleryImages = [
    ...(media.clinicImages || []),
    ...(media.treatmentImages || []),
    ...(media.otherImages || [])
  ].filter(Boolean);

  const curatePortfolio = [
    {
      cat: 'Residential',
      title: 'Modern Living Room',
      desc: 'Minimalist design with warm textures and natural light.',
      img: 'https://interior.growhigh.studio/images/residential_design.png',
      span: 'tall' as const,
    },
    {
      cat: 'Residential',
      title: 'Master Bedroom Suite',
      desc: 'Serene retreat with custom joinery and muted tones.',
      img: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=800&q=80',
    },
    {
      cat: 'Residential',
      title: 'Kitchen Renovation',
      desc: 'Contemporary kitchen with premium finishes and smart storage.',
      img: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=800&q=80',
      span: 'wide' as const,
    },
    {
      cat: 'Commercial',
      title: 'Corporate Office Lobby',
      desc: 'Welcoming reception area with brand-aligned design.',
      img: 'https://interior.growhigh.studio/images/commercial_interiors.png',
      span: 'tall' as const,
    },
    {
      cat: 'Commercial',
      title: 'Co-Working Space',
      desc: 'Flexible workspace with collaborative and focus zones.',
      img: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=800&q=80',
    },
    {
      cat: 'Residential',
      title: 'Bathroom Retreat',
      desc: 'Spa-inspired bathroom with natural stone and ambient lighting.',
      img: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?auto=format&fit=crop&w=800&q=80',
    },
    {
      cat: 'Commercial',
      title: 'Boutique Retail Store',
      desc: 'Curated retail environment designed to elevate the shopping experience.',
      img: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=800&q=80',
      span: 'wide' as const,
    },
    {
      cat: 'Residential',
      title: 'Penthouse Dining',
      desc: 'Elegant dining space with custom lighting and bespoke furniture.',
      img: 'https://interior.growhigh.studio/images/custom_furniture.png',
      span: 'tall' as const,
    },
    {
      cat: 'Studio & Process',
      title: 'Design Studio',
      desc: 'Where creativity meets precision—our design workspace.',
      img: 'https://interior.growhigh.studio/images/principal_designer.png',
    },
    {
      cat: 'Studio & Process',
      title: 'Material Library',
      desc: 'Curated collection of fabrics, finishes, and samples.',
      img: 'https://interior.growhigh.studio/images/styling_decor.png',
      span: 'wide' as const,
    },
    {
      cat: 'Studio & Process',
      title: 'Client Consultation',
      desc: 'One-on-one design discussions with mood boards and 3D renders.',
      img: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=800&q=80',
    },
  ];

  const userPortfolio = allGalleryImages.map((img, idx) => {
    const cats = ['Residential', 'Commercial', 'Studio & Process'];
    const cat = cats[idx % cats.length];
    return {
      cat,
      title: `Client Space Highlight #${idx + 1}`,
      desc: `Custom designed interior layout completed for ${cleanName || 'our studio'}.`,
      img,
      span: idx % 3 === 0 ? ('wide' as const) : idx % 5 === 0 ? ('tall' as const) : ('normal' as const)
    };
  });

  const PORTFOLIO = [...userPortfolio, ...curatePortfolio];

  return (
    <div className="font-sans text-[#0A0A0A] bg-[#FCFAF6] min-h-screen pb-28 space-y-16 selection:bg-[#C1FF72] selection:text-[#0A0A0A] relative z-10 text-left">
      
      {/* Editorial Hero Header */}
      <section className="text-center space-y-6 max-w-4xl mx-auto pt-28 px-8 relative z-20">
        <div className="inline-flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#C1FF72] animate-pulse"></span>
          <span className="text-[10px] font-bold tracking-[0.25em] uppercase text-[#0A0A0A]/60">PORTFOLIO ARCHIVE</span>
        </div>

        <h1 className="font-serif text-5xl sm:text-6xl lg:text-[4.5rem] font-light tracking-tight leading-[1.05] text-[#0A0A0A]">
          Spaces with <span className="italic font-normal text-[#0A0A0A]/60 inline-block relative">Character.<span className="absolute bottom-2 left-0 w-full h-[1.5px] bg-[#C1FF72]"></span></span>
        </h1>

        <p className="text-base sm:text-lg text-gray-500 font-normal leading-relaxed max-w-2xl mx-auto">
          Explore complete design previews, modular fabrications, and customized styling executions.
        </p>

        {/* Stats Strip */}
        <div className="flex flex-wrap justify-center gap-x-16 gap-y-6 pt-8 max-w-2xl mx-auto border-t border-[#0A0A0A]/5">
          {[
            { num: '200+', label: 'Projects Delivered' },
            { num: '100%', label: 'Turnkey Guarantee' },
            { num: doctor?.experience || '10+ Years', label: 'Design Experience' }
          ].map((stat, i) => (
            <div key={i} className="flex flex-col items-center">
              <span className="font-serif text-3xl md:text-4xl font-light text-[#0A0A0A] tracking-tight">{stat.num}</span>
              <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mt-2">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Elegant Layout Divider */}
      <div className="flex items-center gap-6 max-w-5xl mx-auto px-8 relative z-20">
        <div className="h-px flex-1 bg-[#0A0A0A]/5" />
        <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-gray-400">
          Browse Collection
        </span>
        <div className="h-px flex-1 bg-[#0A0A0A]/5" />
      </div>

      {/* Grid Container */}
      <div className="max-w-7xl mx-auto px-8 relative z-20">
        <GalleryGrid items={PORTFOLIO} />
      </div>

    </div>
  );
}
