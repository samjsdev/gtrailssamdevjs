import { readSourceConfig } from '@/lib/dataBuilder';
import { notFound } from 'next/navigation';
import { 
  ArrowRight, CheckCircle2, Sparkles, Compass, 
  Palette, Hammer, Award, Shield, Users, 
  Sparkle, Box, CreditCard, MoveRight, ChevronRight, 
  ArrowUpRight, Home, Activity, Layers
} from 'lucide-react';
import { cleanClinicName } from '@/lib/copyCleaner';

type PageProps = {
  params: Promise<{ slug: string }>;
};

export default async function ServicesPage({ params }: PageProps) {
  const resolvedParams = await params;
  const { slug } = resolvedParams;
  const basePath = `/designwebsite/template1/${slug}`;

  const data = await readSourceConfig(slug, 'template1');
  if (!data) return notFound();

  const { business, clinic, media } = data;
  const cleanName = cleanClinicName(clinic.name);

  return (
    <div className="font-sans text-[#0A0A0A] bg-[#FCFAF6] min-h-screen selection:bg-[#C1FF72] selection:text-[#0A0A0A] scroll-smooth pb-32 space-y-28 text-left relative overflow-hidden">
      
      {/* Structural Architectural Grid Lines */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute left-[6%] top-0 w-px h-full bg-[#0A0A0A]/5"></div>
        <div className="absolute right-[6%] top-0 w-px h-full bg-[#0A0A0A]/5"></div>
        <div className="absolute left-[33%] top-0 w-px h-full bg-[#0A0A0A]/[0.02] hidden lg:block"></div>
        <div className="absolute left-[66%] top-0 w-px h-full bg-[#0A0A0A]/[0.02] hidden lg:block"></div>
      </div>

      {/* ─── HERO ─── */}
      <section className="relative pt-32 pb-12 z-10 max-w-[90rem] mx-auto px-8 md:px-16 lg:px-24">
        <div className="grid lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-[#0A0A0A]"></span>
              <span className="text-[11px] font-bold text-[#0A0A0A] tracking-[0.25em] uppercase">STUDIO PORTFOLIO</span>
            </div>
            
            <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl font-light tracking-tight leading-[1.05] text-[#0A0A0A]">
              Interior services &amp; <br />
              <span className="italic font-normal text-[#0A0A0A]/70 inline-block relative">
                turnkey delivery
                <span className="absolute bottom-2 left-0 w-full h-1 bg-[#C1FF72] -z-10"></span>
              </span>
            </h1>
          </div>
          
          <div className="lg:col-span-5 space-y-6 lg:pt-10">
            <p className="text-lg md:text-xl text-[#0A0A0A]/70 font-normal leading-relaxed">
              We deliver comprehensive interior design solutions with architectural precision, structural integrity, and curated organic materials under a single design brief.
            </p>
            <div className="flex flex-wrap gap-2.5">
              {["Residential", "Commercial", "Space Planning", "Custom Furniture", "Styling & Décor"].map((tag) => (
                <span 
                  key={tag} 
                  className="px-4 py-2 rounded-full border border-[#0A0A0A]/15 text-[13px] font-bold text-[#0A0A0A] bg-white shadow-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="max-w-[90rem] mx-auto px-8 md:px-16 lg:px-24 relative z-10">
        <div className="h-px bg-[#0A0A0A]/10 w-full" />
      </div>

      {/* ─── 01 — FOUNDATIONAL SERVICES ─── */}
      <section className="max-w-[90rem] mx-auto px-8 md:px-16 lg:px-24 relative z-10 space-y-16">
        <div className="grid lg:grid-cols-12 gap-8 items-end">
          <div className="lg:col-span-6 space-y-4">
            <div className="inline-flex items-center gap-3">
              <span className="text-[11px] font-bold text-[#0A0A0A]/70 tracking-[0.25em] uppercase font-mono">01 / CORE ELEMENTS</span>
            </div>
            <h2 className="font-serif text-4xl sm:text-5xl font-light text-[#0A0A0A] tracking-tight">
              Foundational <span className="italic font-normal text-[#0A0A0A]/70">Services</span>
            </h2>
          </div>
          <div className="lg:col-span-6">
            <p className="text-[15px] md:text-base text-[#0A0A0A]/70 leading-relaxed">
              The essential planning and sourcing frameworks required to optimize every square foot of your interior before civil site execution begins.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
          {[
            { 
              title: "Space Planning & Layout", 
              desc: "Optimize every square foot with intelligent layouts that enhance flow, natural light, and daily living.", 
              img: media?.otherImages?.[6] || "https://images.unsplash.com/photo-1542889601-399c4f3a8402?auto=format&fit=crop&w=800&q=80", 
              subs: ["Floor Plan Design", "Furniture Layout", "Traffic Flow Audit"],
            },
            { 
              title: "Material & Finish Selection", 
              desc: "Curated palettes of durable flooring, tactile wall finishes, and solid hardware that define the character of your space.", 
              img: media?.otherImages?.[7] || "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80", 
              subs: ["Flooring & Tiling", "Wall Finishes & Paint", "Hardware & Fixtures"],
            },
            { 
              title: "Lighting Design", 
              desc: "Layered lighting schemes that set the mood, enhance task functionality, and showcase custom joinery details.", 
              img: media?.otherImages?.[8] || "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80", 
              subs: ["Ambient & Task Lighting", "Accent & Custom Fixtures", "Smart Integration"],
            }
          ].map((srv, i) => (
            <div key={i} className="bg-white p-8 lg:p-10 rounded-[2.5rem] border border-[#0A0A0A]/10 hover:border-[#0A0A0A]/25 hover:shadow-xl transition-all duration-500 flex flex-col group min-h-[520px] justify-between shadow-sm relative overflow-hidden">
              <div className="space-y-6">
                {/* Image */}
                <div className="aspect-[4/3] overflow-hidden rounded-[1.8rem] bg-[#FCFAF6] border border-[#0A0A0A]/5 relative shadow-inner">
                  <img 
                    src={srv.img} 
                    alt={srv.title} 
                    className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-103" 
                    loading="lazy" 
                  />
                  <span className="absolute right-5 top-5 font-serif text-3xl font-light italic text-white drop-shadow-md z-10 select-none">
                    {`0${i + 1}`}
                  </span>
                </div>
                
                <div className="space-y-3">
                  <h3 className="font-serif text-2xl font-normal tracking-wide text-[#0A0A0A]">{srv.title}</h3>
                  <p className="text-[15px] text-[#0A0A0A]/70 leading-relaxed font-normal">
                    {srv.desc}
                  </p>
                </div>
              </div>

              <div className="border-t border-[#0A0A0A]/10 pt-6 mt-6">
                <div className="flex flex-wrap gap-2 mb-6">
                  {srv.subs.map((sub, j) => (
                    <span 
                      key={j} 
                      className="inline-flex items-center gap-1.5 text-[13px] bg-[#FCFAF6] text-[#0A0A0A]/80 border border-[#0A0A0A]/10 px-3.5 py-1.5 rounded-full font-semibold"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-[#C1FF72]" />
                      {sub}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── 02 — TRANSFORMATIONS & STYLING (Clean Grid, No Alternating) ─── */}
      <section className="max-w-[90rem] mx-auto px-8 md:px-16 lg:px-24 relative z-10 space-y-16">
        <div className="grid lg:grid-cols-12 gap-8 items-end">
          <div className="lg:col-span-6 space-y-4">
            <div className="inline-flex items-center gap-3">
              <span className="text-[11px] font-bold text-[#0A0A0A]/70 tracking-[0.25em] uppercase font-mono">02 / INTERIOR SCALES</span>
            </div>
            <h2 className="font-serif text-4xl sm:text-5xl font-light text-[#0A0A0A] tracking-tight">
              Transformations &amp; <span className="italic font-normal text-[#0A0A0A]/70">Styling</span>
            </h2>
          </div>
          <div className="lg:col-span-6">
            <p className="text-[15px] md:text-base text-[#0A0A0A]/70 leading-relaxed">
              Full-scale spatial transformations crafted for residential luxury and commercial performance, complete with tailored interior art styling.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
          {[
            { 
              title: "Residential Design", 
              desc: "Transform your home into a sanctuary. We craft living spaces for all scales—from studio apartments to sprawling villas—with a focus on comfort, timeless aesthetics, and personal expression.", 
              img: media?.otherImages?.[9] || "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=800&q=80", 
              subs: ["Living & Dining Rooms", "Bedrooms & Walk-in Closets", "Kitchens & Bathrooms"],
            },
            { 
              title: "Commercial Interiors", 
              desc: "Spaces that drive productivity and impress clients. We design offices, retail stores, and hospitality venues that align perfectly with your brand identity and operational needs.", 
              img: media?.otherImages?.[10] || "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80", 
              subs: ["Office & Co-working Spaces", "Retail & Showroom Design", "Restaurant & Café Interiors"],
            },
            { 
              title: "Styling & Décor", 
              desc: "The finishing layer that brings your space to life. We source custom art, textiles, accessories, and curated organic objects that add warmth, depth, and character to every room.", 
              img: media?.otherImages?.[11] || "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80", 
              subs: ["Art Curation & Placement", "Soft Furnishing & Textiles", "Accessory & Object Curation"],
            }
          ].map((srv, i) => (
            <div key={i} className="bg-white rounded-[2.5rem] border border-[#0A0A0A]/10 hover:border-[#0A0A0A]/25 hover:shadow-xl transition-all duration-500 flex flex-col group shadow-sm overflow-hidden">
              {/* Full-width image */}
              <div className="relative aspect-[4/3] overflow-hidden">
                <img 
                  src={srv.img} 
                  alt={srv.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[1200ms]" 
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/30 via-transparent to-transparent opacity-60 group-hover:opacity-20 transition-opacity duration-500"></div>
                <span className="absolute top-6 left-6 font-serif text-2xl font-light italic text-white/80 select-none">
                  {`0${i + 1}`}
                </span>
                {/* Floating CTA button */}
                <div className="absolute top-6 right-6 w-10 h-10 bg-[#FCFAF6] rounded-full flex items-center justify-center transform scale-0 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-300 shadow-xl border border-[#0A0A0A]/5">
                  <ArrowUpRight className="w-4 h-4 text-[#0A0A0A]" />
                </div>
              </div>

              {/* Content */}
              <div className="p-8 lg:p-10 flex flex-col grow justify-between">
                <div className="space-y-4">
                  <h3 className="font-serif text-2xl lg:text-3xl font-normal tracking-wide text-[#0A0A0A]">{srv.title}</h3>
                  <p className="text-[15px] text-[#0A0A0A]/70 font-normal leading-relaxed">
                    {srv.desc}
                  </p>
                </div>

                {/* Sub-features as clean checklist */}
                <div className="border-t border-[#0A0A0A]/10 pt-6 mt-8 space-y-3">
                  {srv.subs.map((sub, j) => (
                    <div key={j} className="flex items-center gap-3">
                      <CheckCircle2 className="w-4.5 h-4.5 text-[#0A0A0A]/50 shrink-0" />
                      <span className="text-[14px] font-semibold text-[#0A0A0A]/70">{sub}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── 03 — SPECIALIZED EXECUTION ─── */}
      <section className="max-w-[90rem] mx-auto px-8 md:px-16 lg:px-24 relative z-10 space-y-16">
        <div className="grid lg:grid-cols-12 gap-8 items-end">
          <div className="lg:col-span-6 space-y-4">
            <div className="inline-flex items-center gap-3">
              <span className="text-[11px] font-bold text-[#0A0A0A]/70 tracking-[0.25em] uppercase font-mono">03 / FABRICATIONS</span>
            </div>
            <h2 className="font-serif text-4xl sm:text-5xl font-light text-[#0A0A0A] tracking-tight">
              Specialized <span className="italic font-normal text-[#0A0A0A]/70">Execution</span>
            </h2>
          </div>
          <div className="lg:col-span-6">
            <p className="text-[15px] md:text-base text-[#0A0A0A]/70 leading-relaxed">
              Demanding civil changes and customized joinery details completed by dedicated timber carpenters and verified engineers.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {[
            { 
              title: "Full Home Renovation", 
              desc: "Complete civil renovation management from safe site demolitions to visual handover. We strictly coordinate subcontractor timetables, materials deliveries, and structural blueprints.", 
              img: media?.otherImages?.[12] || "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=800&q=80", 
              subs: ["Structural Demolitions", "Bathroom Overhauls", "Full Masonry Coordination"],
            },
            { 
              title: "Custom Furniture & Joinery", 
              desc: "Bespoke wardrobes, TV cabinetry, and kitchen storage systems detailed entirely around your measurements. Fabricated with verified boiling water proof plywood, durable hardware, and fine wood veneer finishes.", 
              img: media?.otherImages?.[13] || "https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&w=800&q=80", 
              subs: ["Bespoke Wardrobe Units", "Custom Dining Tables", "Premium Cabinetry Details"],
            }
          ].map((srv, i) => (
            <div key={i} className="group flex flex-col justify-between bg-white rounded-[2.5rem] border border-[#0A0A0A]/10 hover:border-[#0A0A0A]/25 p-6 md:p-8 hover:shadow-xl transition-all duration-500 shadow-sm min-h-[580px]">
              <div className="space-y-6">
                <div className="w-full aspect-[16/10] rounded-[1.8rem] overflow-hidden border border-[#0A0A0A]/10 shadow-inner">
                  <img 
                    src={srv.img} 
                    alt={srv.title} 
                    className="w-full h-full object-cover transition-transform duration-[1200ms] group-hover:scale-105" 
                  />
                </div>

                <div className="space-y-3">
                  <h3 className="font-serif text-2xl font-normal text-[#0A0A0A] tracking-wide">{srv.title}</h3>
                  <p className="text-[15px] text-[#0A0A0A]/70 leading-relaxed font-normal">{srv.desc}</p>
                </div>
              </div>

              <div className="border-t border-[#0A0A0A]/10 pt-6 mt-6">
                <div className="flex flex-wrap gap-2.5 mb-6">
                  {srv.subs.map((sub, j) => (
                    <span 
                      key={j} 
                      className="inline-flex items-center gap-1.5 text-[13px] bg-[#FCFAF6] text-[#0A0A0A]/80 border border-[#0A0A0A]/10 px-3.5 py-1.5 rounded-full font-semibold"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-[#C1FF72]" />
                      {sub}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── THE STUDIO DIFFERENCE ─── */}
      <section className="py-28 bg-white border-t border-b border-[#0A0A0A]/10 relative z-10 overflow-hidden">
        <div className="max-w-[90rem] mx-auto px-8 md:px-16 lg:px-24 space-y-16">
          <div className="text-center max-w-2xl mx-auto space-y-4">
            <div className="flex items-center justify-center gap-2 text-[#0A0A0A]/70 text-[11px] font-bold uppercase tracking-widest">
              <span className="w-1.5 h-1.5 rounded-full bg-[#0A0A0A]" />
              STUDIO OPERATIONS
            </div>
            <h2 className="font-serif text-4xl sm:text-5xl font-light text-[#0A0A0A] tracking-tight">
              The {cleanName || 'Design'} Studio <span className="italic font-normal text-[#0A0A0A]/70">Difference</span>
            </h2>
            <p className="text-[15px] md:text-base text-[#0A0A0A]/70 leading-relaxed font-normal">
              We coordinate verified materials procurement, robust site checkups, and transparent line-item pricing lists to safeguard your investment.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Multidisciplinary Team",
                desc: "Certified architects, interior spatial planners, and furniture styling leaders align under one brief.",
                icon: Users
              },
              {
                title: "Premium Materials Sourcing",
                desc: "Certified boiling water proof marine timber, robust hardware, and natural hard stone selected directly.",
                icon: Box
              },
              {
                title: "Personalized Space Audits",
                desc: "Spatial structures, traffic flow configurations, and wardrobes mapped around actual daily routines.",
                icon: Compass
              },
              {
                title: "Transparent Line-item Costing",
                desc: "Comprehensive spreadsheet specifications and verified timber procurement lists approved early.",
                icon: CreditCard
              },
              {
                title: "Timeless Quality Checks",
                desc: "Every carpentry modular cabinet and masonry line audited strictly before handover walkthroughs.",
                icon: Award
              },
              {
                title: "Active Site Reporting",
                desc: "Ongoing coordinate sheets and weekly digital reports detailing fabrication statuses sent directly to you.",
                icon: Shield
              }
            ].map((diff, index) => (
              <div 
                key={index} 
                className="bg-[#FCFAF6] p-8 rounded-[2rem] border border-[#0A0A0A]/10 hover:border-[#0A0A0A]/25 hover:bg-white hover:shadow-xl transition-all duration-500 group flex flex-col justify-between min-h-[240px]"
              >
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-xl bg-white border border-[#0A0A0A]/10 flex items-center justify-center text-[#0A0A0A] group-hover:bg-[#C1FF72] transition-colors duration-300">
                    <diff.icon className="w-5 h-5 text-[#0A0A0A]" />
                  </div>
                  <h3 className="font-serif text-xl font-normal text-[#0A0A0A] tracking-wide">{diff.title}</h3>
                  <p className="text-[15px] text-[#0A0A0A]/70 leading-relaxed font-normal">{diff.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
