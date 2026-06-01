import { readSourceConfig } from "@/lib/dataBuilder";
import { notFound } from "next/navigation";
import GalleryGrid from "./GalleryGrid";
import { INTERIOR_HERO_IMAGES } from "@/lib/interiorContent";

type PageProps = {
  params: Promise<{ slug: string }>;
};

const PORTFOLIO = [
  {
    cat: "Residential",
    title: "Quiet Living Room",
    desc: "Restrained spatial plan highlighting natural oak joinery and warm textured plaster.",
    img: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=800&q=80",
    span: "tall" as const,
  },
  {
    cat: "Residential",
    title: "Serene Master Chamber",
    desc: "Restful bedroom utilizing biophilic tones, sustainable wall linens, and soft circadian lighting.",
    img: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=800&q=80",
  },
  {
    cat: "Residential",
    title: "Artisanal Kitchen Space",
    desc: "Ergonomic work-triangle layouts featuring solid stone counters and custom oak panels.",
    img: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=800&q=80",
    span: "wide" as const,
  },
  {
    cat: "Commercial",
    title: "Premium Design Showroom",
    desc: "Tactile display layouts styled to showcase wood textures, sample slabs, and curated ceramics.",
    img: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80",
    span: "tall" as const,
  },
  {
    cat: "Commercial",
    title: "Quiet Focus Studio",
    desc: "Ergonomic shared corporate layout focusing on light, natural wood partitions, and smart acoustics.",
    img: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=800&q=80",
  },
  {
    cat: "Residential",
    title: "Biophilic Bath Retreat",
    desc: "Quiet spa bathroom displaying raw travertine walls, skylight highlights, and oak vanity cabinets.",
    img: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?auto=format&fit=crop&w=800&q=80",
  },
  {
    cat: "Commercial",
    title: "Artisanal Lounge Lobby",
    desc: "Brand reception utilizing clean vertical slats, custom ironworks, and warm ambient uplighting.",
    img: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=800&q=80",
    span: "wide" as const,
  },
  {
    cat: "Residential",
    title: "Minimal Dining Salon",
    desc: "Bespoke solid timber dining setting styled with clean lines, custom sconces, and neutral curtains.",
    img: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80",
    span: "tall" as const,
  },
  {
    cat: "Studio & Process",
    title: "Material Snagging Laboratory",
    desc: "Where carpentry meets architectural drawings—our main design material sorting lab.",
    img: INTERIOR_HERO_IMAGES.designer,
  },
  {
    cat: "Studio & Process",
    title: "Tactile Finish Library",
    desc: "Curated collection of timber veneers, natural linens, and healthy biophilic clay coatings.",
    img: INTERIOR_HERO_IMAGES.services,
    span: "wide" as const,
  },
  {
    cat: "Studio & Process",
    title: "Detailed Mood Board Sessions",
    desc: "One-on-one spatial layout reviews matching detailed digital prints to real-life physical timber samples.",
    img: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=800&q=80",
  },
];

export default async function GalleryPage({ params }: PageProps) {
  const resolvedParams = await params;
  const { slug } = resolvedParams;

  const data = await readSourceConfig(slug, 'template4');
  if (!data) return notFound();

  return (
    <div className="text-stone-900 bg-stone-50 min-h-screen pb-32 selection:bg-stone-200">
      
      {/* HEADER HERO */}
      <section className="relative pt-36 pb-16 px-6 max-w-6xl mx-auto text-center z-10 space-y-16">
        <div className="space-y-6 max-w-4xl mx-auto">
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-stone-500">— EDITORIAL PORTFOLIO</p>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-light text-stone-900 leading-tight">
            Our Work &amp; Space
          </h1>
          <p className="text-base md:text-lg text-stone-600 font-light max-w-2xl mx-auto leading-relaxed">
            Explore the spatial designs we have developed and the clean physical library where our projects begin.
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

        {/* Interactive Gallery */}
        <div className="max-w-5xl mx-auto text-left">
          <GalleryGrid items={PORTFOLIO} />
        </div>
      </section>

    </div>
  );
}
