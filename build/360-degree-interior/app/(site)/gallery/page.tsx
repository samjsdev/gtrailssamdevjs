import { readSourceConfig } from '@/lib/sourceData';
import { notFound } from "next/navigation";
import GalleryGrid from "./GalleryGrid";
import { INTERIOR_HERO_IMAGES } from "@/lib/interiorContent";
import { cleanClinicName } from "@/lib/copyCleaner";

export default async function GalleryPage({ params }: { params?: any }) {
  const slug = ''; // standalone: slug not needed for data loading

  const data = await readSourceConfig(undefined, 'template4');
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
    const span = i % 3 === 0 ? ('wide' as const) : i % 5 === 0 ? ('tall' as const) : undefined;

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
    <div className="text-stone-900 bg-stone-50 min-h-screen pb-32 selection:bg-stone-200">
      
      {/* HEADER HERO */}
      <section className="relative pt-36 pb-16 px-6 max-w-6xl mx-auto text-center z-10 space-y-16">
        <div className="space-y-6 max-w-4xl mx-auto">
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-stone-500">— EDITORIAL PORTFOLIO</p>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-light text-stone-900 leading-tight">
            {clinic.name || "Our Work & Space"}
          </h1>
          <p className="text-base md:text-lg text-stone-600 font-light max-w-2xl mx-auto leading-relaxed">
            {clinic.description || "Explore the spatial designs we have developed and the clean physical library where our projects begin."}
          </p>

          {/* Minimal Stats Bar */}
          <div className="flex flex-wrap justify-center gap-x-12 gap-y-6 pt-8 max-w-2xl mx-auto">
            {[
              { val: "200+", tag: "STUDIOS DELIVERED" },
              { val: "12", tag: "SHOWCASE GALLERIES" },
              { val: "10+", tag: "YEARS ARCHITECTURE" }
            ].map((stat, idx) => (
              <div key={idx} className="flex flex-col items-center">
                <span className="text-2xl md:text-3xl font-light text-stone-900">{stat.val}</span>
                <span className="text-[9px] font-bold text-stone-400 uppercase tracking-widest mt-1">
                  {stat.tag}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Fine Horizontal Divider Line */}
        <div className="flex items-center gap-6 max-w-5xl mx-auto opacity-80">
          <div className="h-px flex-1 bg-stone-200" />
          <span className="text-[9px] font-bold uppercase tracking-[0.25em] text-stone-400">
            FINE PRINT EXHIBITION
          </span>
          <div className="h-px flex-1 bg-stone-200" />
        </div>
      </section>

      {/* Interactive Gallery */}
      <section id="gallery-grid" className="max-w-5xl mx-auto text-left px-6">
        <GalleryGrid items={PORTFOLIO} />
      </section>

    </div>
  );
}
