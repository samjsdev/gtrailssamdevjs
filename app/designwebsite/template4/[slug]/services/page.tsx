import { readSourceConfig } from "@/lib/dataBuilder";
import { notFound } from "next/navigation";
import { INTERIOR_HERO_IMAGES } from "@/lib/interiorContent";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export default async function ServicesPage({ params }: PageProps) {
  const resolvedParams = await params;
  const { slug } = resolvedParams;

  const data = await readSourceConfig(slug, 'template4');
  if (!data) return notFound();

  return (
    <div className="text-stone-900 bg-stone-50 min-h-screen pb-32 selection:bg-stone-200">
      
      {/* HEADER HERO */}
      <section className="relative pt-36 pb-20 px-6 max-w-6xl mx-auto text-center z-10">
        <div className="space-y-6 max-w-4xl mx-auto">
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-stone-500">— DESIGN CAPABILITIES</p>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-light text-stone-900 leading-tight">
            Our Services
          </h1>
          <p className="text-base md:text-lg text-stone-600 font-light max-w-2xl mx-auto leading-relaxed">
            From spatial analysis to artisanal turnarounds, we implement tailored spatial structures with absolute precision, material sincerity, and transparent budgets.
          </p>
        </div>
      </section>

      {/* CORE WRAPPER */}
      <div className="max-w-6xl mx-auto px-6 space-y-32">
        
        {/* 01 - FOUNDATIONAL SERVICES */}
        <section className="space-y-12">
          <div className="border-b border-stone-250 pb-8 relative">
            <span className="text-8xl font-black text-stone-200/40 select-none absolute -z-10 -top-12 -left-6">01</span>
            <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-stone-500 relative z-10">THE PROTOCOLS</p>
            <h2 className="text-3xl md:text-4xl font-light text-stone-900 leading-tight relative z-10">
              Foundational Services
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { 
                title: "Space Planning & Circulations", 
                desc: "We analyze daylight paths, entry thresholds, and family movements to shape practical layouts that maximize light.",
                img: INTERIOR_HERO_IMAGES.guides,
                features: ["Flow Optimization", "Circulation Audits", "Ergonomic Layouts"]
              },
              { 
                title: "Material & Finish Curation", 
                desc: "Selecting timber veneers, raw stoneworks, and non-toxic clay plasters that develop graceful age-worn character.",
                img: INTERIOR_HERO_IMAGES.about,
                features: ["Solid Timber Selection", "Healthy Coatings", "Curated Palette Mapping"]
              },
              { 
                title: "Architectural Lighting Layouts", 
                desc: "Layering ceiling pathways, task points, and accent highlight lines to create quiet evening moods.",
                img: INTERIOR_HERO_IMAGES.services,
                features: ["Circadian Pathways", "Task-Focused Points", "Sconce & Highlight Curation"]
              }
            ].map((srv, idx) => (
              <div key={idx} className="bg-white border border-stone-200 p-6 flex flex-col justify-between hover:border-stone-900 transition-colors duration-500 group">
                <div className="space-y-6">
                  <div className="aspect-[4/3] w-full overflow-hidden border border-stone-150">
                    <img 
                      src={srv.img} 
                      alt={srv.title} 
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                  <h3 className="text-lg font-medium text-stone-900">{srv.title}</h3>
                  <p className="text-stone-500 font-light text-xs leading-relaxed">{srv.desc}</p>
                </div>
                <div className="pt-6 mt-6 border-t border-stone-100 flex flex-wrap gap-2">
                  {srv.features.map((feat, fidx) => (
                    <span key={fidx} className="text-[9px] font-bold uppercase tracking-wider bg-stone-100 text-stone-600 px-2 py-1">
                      {feat}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 02 - ALTERNATING TRANSFORMATIONS */}
        <section className="space-y-24">
          <div className="border-b border-stone-250 pb-8 relative">
            <span className="text-8xl font-black text-stone-200/40 select-none absolute -z-10 -top-12 -left-6">02</span>
            <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-stone-500 relative z-10">THE OUTCOMES</p>
            <h2 className="text-3xl md:text-4xl font-light text-stone-900 leading-tight relative z-10">
              Transformations
            </h2>
          </div>

          <div className="space-y-32">
            {[
              { 
                num: "02.1",
                title: "Residential Interior Curation", 
                desc: "We shape complete customized residential environments—from spatial layouts through materials sourcing, biophilic layerings, custom cupboards, and final decor. Our focus is a quiet luxury made for everyday life.", 
                img: INTERIOR_HERO_IMAGES.home,
                points: ["Custom Bedroom Retractions", "Modular Kitchen Worktriangles", "Tactile Living Salons"]
              },
              { 
                num: "02.2",
                title: "Commercial & Business Salons", 
                desc: "Sleek, tactile offices, showrooms, retail lounges, and cafes that reinforce brand principles while supporting workers and customers ergonomically.", 
                img: INTERIOR_HERO_IMAGES.designer,
                points: ["Circulation-Friendly Offices", "Quiet Acoustic Lounges", "Highly Durable Sourcing"]
              },
              { 
                num: "02.3",
                title: "Artisanal Styling & Accessories", 
                desc: "Curating raw textures, organic canvases, handwoven soft linens, and bespoke lighting coordinates that bring space together and complete the tactile design vision.", 
                img: INTERIOR_HERO_IMAGES.gallery,
                points: ["Custom Textile Layering", "Art Curation & Mounting", "Restrained Display Styling"]
              }
            ].map((srv, idx) => (
              <div key={idx} className={`flex flex-col lg:flex-row items-center gap-12 lg:gap-16 ${idx % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
                <div className="w-full lg:w-1/2 aspect-[4/3] border border-stone-250 overflow-hidden relative group">
                  <img 
                    src={srv.img} 
                    alt={srv.title} 
                    className="w-full h-full object-cover transform group-hover:scale-103 transition-transform duration-[1500ms]"
                  />
                </div>
                <div className="w-full lg:w-1/2 space-y-6">
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] font-bold text-stone-500 font-mono uppercase tracking-wider">{srv.num}</span>
                    <span className="h-px w-6 bg-stone-300" />
                    <span className="text-[10px] text-stone-400 font-bold uppercase tracking-widest">Outcome Curation</span>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-light text-stone-900 leading-snug">{srv.title}</h3>
                  <p className="text-stone-500 font-light text-sm leading-relaxed">{srv.desc}</p>
                  <div className="grid sm:grid-cols-3 gap-3 pt-2">
                    {srv.points.map((pt, pidx) => (
                      <div key={pidx} className="border border-stone-200 p-4 bg-white space-y-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-stone-900" />
                        <p className="text-[10px] font-bold text-stone-850 uppercase tracking-wider leading-tight">{pt}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 03 - SPECIALIZED TECHNICAL WORKS */}
        <section className="space-y-12">
          <div className="border-b border-stone-250 pb-8 relative">
            <span className="text-8xl font-black text-stone-200/40 select-none absolute -z-10 -top-12 -left-6">03</span>
            <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-stone-500 relative z-10">THE CRAFTS</p>
            <h2 className="text-3xl md:text-4xl font-light text-stone-900 leading-tight relative z-10">
              Specialized Services
            </h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {[
              { 
                title: "Complete Home Snagging & Turnkey Renovation", 
                desc: "We lead residential makeovers from demolition layouts, framing permissions, electrical coordinates, and plaster installations through ultimate styling handover.", 
                img: INTERIOR_HERO_IMAGES.home,
                features: ["Masonry & Structural Framing", "Comprehensive Snag Checks", "Plumbing & Sockets Layout"]
              },
              { 
                title: "Artisanal Wardrobes & Custom Carpentry", 
                desc: "We map out, model, and craft bespoke wall-to-wall cabinetry, dining sideboards, TV units, and study layouts utilizing sustainable solid timber matrices.", 
                img: INTERIOR_HERO_IMAGES.contact,
                features: ["Integrated Slat Wardrobes", "Custom Slat Details", "Modular Vanity Cabs"]
              }
            ].map((srv, idx) => (
              <div key={idx} className="group flex flex-col justify-between border border-stone-200 bg-white p-6 hover:border-stone-900 transition-all duration-300">
                <div className="space-y-6">
                  <div className="aspect-[16/10] w-full overflow-hidden border border-stone-150">
                    <img 
                      src={srv.img} 
                      alt={srv.title} 
                      className="w-full h-full object-cover transform group-hover:scale-[1.02] transition-transform duration-1000"
                    />
                  </div>
                  <h3 className="text-xl font-medium text-stone-900">{srv.title}</h3>
                  <p className="text-stone-500 font-light text-xs leading-relaxed">{srv.desc}</p>
                </div>
                <div className="pt-6 mt-6 border-t border-stone-100 flex flex-wrap gap-2">
                  {srv.features.map((feat, fidx) => (
                    <span key={fidx} className="text-[9px] font-bold uppercase tracking-wider bg-stone-50 text-stone-600 border border-stone-150 px-2 py-1">
                      {feat}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* THE STUDIO METRICS */}
        <section className="bg-stone-900 text-stone-100 p-8 md:p-16 lg:p-20 border border-stone-850 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-bl-full pointer-events-none" />
          <div className="relative z-10 max-w-5xl mx-auto space-y-16">
            <div className="text-center max-w-2xl mx-auto space-y-4">
              <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-stone-500">— WHY CHOOSE US</p>
              <h2 className="text-3xl md:text-5xl font-light text-stone-100 leading-tight">The Design Difference</h2>
              <p className="text-stone-400 font-light text-sm">
                We bridge the gap between creative visual architecture and practical, on-site carpentry parameters.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { title: "Team Synergy", desc: "Our architects, joinery technicians, and biophilic stylists work under a unified client brief." },
                { title: "Healthy Timbers", desc: "We source certified timber and non-toxic coatings, protecting both the environment and indoor air quality." },
                { title: "Ergonomics", desc: "Every layout is custom scaled around real daily movements and anatomical clearances." },
                { title: "Clear cost reports", desc: "We establish upfront materials spreadsheets with no hidden markups or sudden cost hikes." },
                { title: "Artisanal Execution", desc: "We coordinate with highly qualified regional master carpenters and trusted installers." },
                { title: "Handover folder", desc: "We provide maintenance directories, color references, hardware keys, and appliances contracts." }
              ].map((diff, idx) => (
                <div key={idx} className="border border-stone-800 p-6 space-y-4 hover:border-stone-500 transition-colors bg-stone-950">
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-stone-200">{diff.title}</h3>
                  <p className="text-xs text-stone-400 font-light leading-relaxed">{diff.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
