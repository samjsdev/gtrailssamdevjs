import { readSourceConfig } from '@/lib/dataBuilder';
import { notFound } from 'next/navigation';
import { Cormorant_Garamond } from 'next/font/google';
import GalleryGrid from './GalleryGrid';
import { cleanClinicName } from '@/lib/copyCleaner';

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
});

export default async function GalleryPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const { slug } = resolvedParams;
  const data = await readSourceConfig(slug, 'template2');
  if (!data) return notFound();

  const { clinic, media, doctor } = data;
  const cleanName = cleanClinicName(clinic.name);

  const defaultGalleryStock = [
    "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1581579438747-1dc8d1e0ca96?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1600210492493-0946911123ea?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1600121848594-d8644e57abab?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=800&q=80"
  ];

  const uniqueUserImages = Array.from(new Set([
    ...(media.clinicImages || []),
    ...(media.treatmentImages || []),
    ...(media.otherImages || [])
  ].filter(Boolean)));

  const PORTFOLIO = [];
  const totalToRender = uniqueUserImages.length > 0 ? Math.min(12, uniqueUserImages.length * 2) : 12;

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
    <div className="font-sans text-[#2A2421] bg-[#F7F4EF] min-h-screen pb-24 space-y-16">
      {/* Hero Header */}
      <section className="text-center space-y-6 max-w-3xl mx-auto pt-20 pb-12">
        <div className="flex items-center justify-center gap-2 text-[#8E7056] text-[10px] font-bold uppercase tracking-[0.2em]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#8E7056]" />
          PORTFOLIO SHOWCASE
        </div>

        <h1 className={`${cormorant.className} text-5xl sm:text-6xl lg:text-7xl font-light tracking-wide leading-tight`}>
          Refined Projects &amp; <span className="text-[#8E7056] italic">Curated Spaces</span>
        </h1>

        <p className="text-sm sm:text-base text-[#2A2421]/90 font-light leading-relaxed max-w-xl mx-auto">
          Explore our completed premium interior design and turnkey fabrication projects across Chennai.
        </p>

        {/* Stats strip */}
        <div className="flex flex-wrap justify-center gap-x-12 gap-y-4 pt-6 max-w-xl mx-auto">
          {[
            { num: '250+', label: 'Completed Projects' },
            { num: '12+', label: 'Service Offerings' },
            { num: doctor?.experience ? doctor.experience.replace(/\D/g, '') + '+' : '8+', label: 'Years Experience' },
          ].map((stat, i) => (
            <div key={i} className="flex flex-col items-center">
              <span className={`${cormorant.className} text-3xl font-bold text-[#2A2421]`}>{stat.num}</span>
              <span className="text-[9px] font-bold text-[#2A2421]/75 uppercase tracking-widest mt-1">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Decorative Divider */}
      <div className="flex items-center gap-6 max-w-5xl mx-auto px-4">
        <div className="h-px flex-1 bg-[#EAE3D8]" />
        <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#2A2421]/75">
          Bespoke Chennai Collection
        </span>
        <div className="h-px flex-1 bg-[#EAE3D8]" />
      </div>

      {/* Interactive gallery grid */}
      <div className="max-w-7xl mx-auto px-4">
        <GalleryGrid items={PORTFOLIO} />
      </div>
    </div>
  );
}
