import { readSourceConfig } from '@/lib/dataBuilder';
import { notFound } from 'next/navigation';
import { Archivo_Black, Inter } from 'next/font/google';
import GalleryGrid from './GalleryGrid';
import { cleanClinicName } from '@/lib/copyCleaner';

const archivo = Archivo_Black({
  subsets: ['latin'],
  weight: ['400'],
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  display: 'swap',
});

export default async function GalleryPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const { slug } = resolvedParams;
  const data = await readSourceConfig(slug, 'template10');
  if (!data) return notFound();

  const { clinic, media } = data;
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
      title: isUserImg ? `Loft Design Project #${i + 1}` : `Curated Loft Space #${i + 1}`,
      desc: isUserImg 
        ? `Custom loft architecture feature designed and coordinated for ${cleanName || 'our studio'}.`
        : `Bespoke room configuration showcasing industrial materials and structural detailing.`,
      img: imgUrl,
      span
    });
  }

  const clinicName = data?.clinic?.name || 'Studio';

  return (
    <div className={`${inter.className} text-[#F4F1DE] min-h-screen bg-[#1E2022]`}>

      {/* ── HERO BANNER ─────────────────────────────────────────────────── */}
      <section className="pt-44 pb-0 border-b border-white/10 bg-[#1E2022]">
        <div className="max-w-7xl mx-auto px-8 pb-16">
          <div className="grid lg:grid-cols-12 gap-12 items-end">
            <div className="lg:col-span-7 space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-8 h-[1px] bg-[#E07A5F]" />
                <span className="text-[10px] font-bold tracking-[0.35em] text-[#E07A5F] uppercase">BUILT SHELLS</span>
              </div>
              <h1 className={`${archivo.className} text-5xl sm:text-6xl lg:text-8xl text-white uppercase leading-[1.05]`}>
                {clinic.name || "Loft Work"} &amp;<br />
                <span className="text-[#E07A5F]">Shells</span>
              </h1>
            </div>
            
            <div className="lg:col-span-5 space-y-8 lg:pb-4">
              <p className="text-slate-400 font-light leading-relaxed text-sm md:text-base">
                {clinic.description || "Explore the spaces we have transformed and the creative environment where our designs come to life."}
              </p>
              
              {/* Stats strip - Template 3 matching stats styled in raw metal columns */}
              <div className="flex flex-wrap gap-x-12 gap-y-4 pt-4">
                {[
                  { num: '200+', label: 'Loft Handovers' },
                  { num: '11', label: 'Portfolio Shells' },
                  { num: '15+', label: 'Years in Fabrication' },
                ].map((stat, i) => (
                  <div key={i} className="flex flex-col">
                    <span className={`${archivo.className} text-4xl text-white`}>{stat.num}</span>
                    <span className="text-[9px] font-bold tracking-[0.25em] text-slate-500 uppercase mt-1">
                      {stat.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="flex items-center gap-6 max-w-7xl mx-auto px-8 py-12 border-t border-white/10">
          <div className="h-[1px] flex-1 bg-white/10" />
          <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-slate-500">
            Browse Shell Catalog
          </span>
          <div className="h-[1px] flex-1 bg-white/10" />
        </div>
      </section>

      {/* ── GALLERY GRID ─────────────────────────────────────────────────── */}
      <section id="gallery-grid" className="max-w-7xl mx-auto px-8 py-20 bg-[#1E2022]">
        <GalleryGrid items={PORTFOLIO} />
      </section>

      {/* ── FOOTER SEPARATOR ─────────────────────────────────────────────── */}
      <section className="border-t border-white/10 py-16 bg-[#141517]">
        <div className="max-w-7xl mx-auto px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className={`${archivo.className} text-xl md:text-2xl text-white uppercase`}>
            &ldquo;Every exposed weld represents structural truth.&rdquo;
          </p>
          <span className="text-[9px] font-bold tracking-[0.3em] text-[#E07A5F] uppercase shrink-0">— {clinicName} Studio</span>
        </div>
      </section>

    </div>
  );
}
