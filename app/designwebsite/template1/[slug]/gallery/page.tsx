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

  const defaultGalleryStock = [
    "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=2000&q=80",
    "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=2000&q=80",
    "https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=2000&q=80",
    "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=2000&q=80",
    "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=2000&q=80",
    "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?auto=format&fit=crop&w=2000&q=80",
    "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=2000&q=80",
    "https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&w=2000&q=80",
    "https://images.unsplash.com/photo-1581579438747-1dc8d1e0ca96?auto=format&fit=crop&w=2000&q=80",
    "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=2000&q=80",
    "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=2000&q=80",
    "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=2000&q=80",
    "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=2000&q=80",
    "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=2000&q=80",
    "https://images.unsplash.com/photo-1600210492493-0946911123ea?auto=format&fit=crop&w=2000&q=80",
    "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=2000&q=80",
    "https://images.unsplash.com/photo-1600121848594-d8644e57abab?auto=format&fit=crop&w=2000&q=80",
    "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=2000&q=80",
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2000&q=80",
    "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=2000&q=80",
    "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=2000&q=80"
  ];

  const uniqueUserImages = Array.from(new Set([
    ...(media.clinicImages || []),
    ...(media.treatmentImages || []),
    ...(media.otherImages || [])
  ].filter(Boolean)));

  const PORTFOLIO = [];
  const totalToRender = 50;

  for (let i = 0; i < totalToRender; i++) {
    let imgUrl = "";
    let isUserImg = false;

    if (uniqueUserImages.length > 0) {
      imgUrl = uniqueUserImages[i % uniqueUserImages.length];
      isUserImg = true;
    } else {
      imgUrl = defaultGalleryStock[i % defaultGalleryStock.length];
    }

    const cats = ['Residential', 'Commercial', 'Studio & Process'];
    const cat = cats[i % cats.length];
    const span = i % 3 === 0 ? ('wide' as const) : i % 5 === 0 ? ('tall' as const) : ('normal' as const);

    PORTFOLIO.push({
      cat,
      title: isUserImg ? `Client Project Space #${i + 1}` : `Curated Design Space #${i + 1}`,
      desc: isUserImg 
        ? `Custom interior feature designed and coordinated for ${cleanName || 'our studio'}.`
        : `Bespoke room configuration showcasing fine materials and detailing.`,
      img: imgUrl,
      span
    });
  }

  return (
    <div className="font-sans text-[#0A0A0A] bg-[#FCFAF6] min-h-screen pb-28 space-y-16 selection:bg-[#C1FF72] selection:text-[#0A0A0A] relative z-10 text-left">
      
      {/* Editorial Hero Header */}
      <section className="text-center space-y-6 max-w-4xl mx-auto pt-28 px-8 relative z-20">
        <div className="inline-flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#C1FF72] animate-pulse"></span>
          <span className="text-[10px] font-bold tracking-[0.25em] uppercase text-[#0A0A0A]/60">PORTFOLIO ARCHIVE</span>
        </div>

        <h1 className="font-serif text-5xl sm:text-6xl lg:text-[4.5rem] font-light tracking-tight leading-[1.05] text-[#0A0A0A]">
          {clinic.name || "Spaces with Character."} - <span className="italic font-normal text-[#0A0A0A]/60 inline-block relative">Portfolio<span className="absolute bottom-2 left-0 w-full h-[1.5px] bg-[#C1FF72]"></span></span>
        </h1>

        <p className="text-base sm:text-lg text-gray-500 font-normal leading-relaxed max-w-2xl mx-auto">
          {clinic.description || "Explore complete design previews, modular fabrications, and customized styling executions."}
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
      <section id="gallery-grid" className="max-w-7xl mx-auto px-8 relative z-20">
        <GalleryGrid items={PORTFOLIO} />
      </section>

    </div>
  );
}
