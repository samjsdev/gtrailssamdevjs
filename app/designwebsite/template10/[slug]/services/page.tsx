import { readSourceConfig } from '@/lib/dataBuilder';
import { notFound } from 'next/navigation';
import { Archivo_Black, Inter } from 'next/font/google';
import Link from 'next/link';
import { 
  Sparkles, MoveRight, ArrowUpRight, CheckCircle2, 
  Users, Box, Compass, CreditCard, Award, Shield, 
  Home, Hammer, Activity 
} from 'lucide-react';

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

export default async function ServicesPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const { slug } = resolvedParams;
  const data = await readSourceConfig(slug, 'template10');
  if (!data) return notFound();
  const { media, clinic } = data;

  const basePath = `/designwebsite/template10/${slug}`;

  return (
    <div className={`${inter.className} bg-[#1E2022] text-[#F4F1DE] min-h-screen pb-32 selection:bg-[#E07A5F] selection:text-white`}>
      
      {/* ── HERO BANNER ─────────────────────────────────────────────────── */}
      <section className="relative min-h-[50vh] flex flex-col justify-end pb-16 px-8 border-b-2 border-[#E07A5F] bg-[#141517]">
        <div className="absolute inset-0 z-0 opacity-20">
          <img
            src={media?.otherImages?.[11] || "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=2000&q=80"}
            alt="Drafting tables in loft"
            className="w-full h-full object-cover grayscale"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#141517] to-transparent"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto w-full space-y-4">
          <span className="text-xs font-bold text-[#E07A5F] tracking-[0.25em] uppercase bg-white/5 border border-white/10 px-3 py-1">
            {clinic.name || 'PRODUCTION CATALOG'}
          </span>
          <h1 className={`${archivo.className} text-4xl sm:text-5xl lg:text-7xl text-white uppercase leading-[1.05]`}>
            {clinic.tagline || <>Our Loft <br /><span className="text-[#E07A5F]">Services</span></>}
          </h1>
        </div>
      </section>

      {/* ── 01 - FOUNDATIONAL SERVICES ────────────────────────────────────── */}
      <section className="py-24 px-8 bg-[#141517] border-b border-white/5 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="mb-20 space-y-4 relative">
            <span className={`${archivo.className} text-9xl font-black text-white/5 select-none absolute -z-10 -ml-8 -mt-20 tracking-wider`}>01</span>
            <div className="inline-flex items-center gap-4">
              <div className="w-12 h-[1px] bg-[#E07A5F]"></div>
              <span className="text-[10px] font-bold tracking-[0.2em] text-[#E07A5F] uppercase">Architecture Foundation</span>
            </div>
            <h2 className={`${archivo.className} text-3xl sm:text-4xl text-white uppercase`}>
              Foundational <span className="text-[#E07A5F]">Services</span>
            </h2>
            <p className="text-slate-400 font-light text-sm max-w-xl leading-relaxed">
              The building blocks of every great loft interior—planning, materials, and lighting.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { 
                title: "Space Zoning & Layout", 
                desc: "Optimize every square foot with intelligent layouts that enhance flow, light, and daily living.", 
                img: media?.otherImages?.[6] || "https://images.unsplash.com/photo-1542889601-399c4f3a8402?auto=format&fit=crop&w=2000&q=80", 
                subs: ["Floor Plan Design", "Furniture Layout", "Traffic Flow Optimization"],
                link: "#"
              },
              { 
                title: "Material & Finish Selection", 
                desc: "Curated palettes of flooring, wall treatments, and hardware that define the character of your space.", 
                img: media?.otherImages?.[7] || "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=2000&q=80", 
                subs: ["Flooring & Tiling", "Wall Finishes & Paint", "Hardware & Fixtures"],
                link: "#"
              },
              { 
                title: "Lighting Design", 
                desc: "Layered lighting schemes that set the mood, enhance functionality, and showcase architectural details.", 
                img: media?.otherImages?.[8] || "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=2000&q=80", 
                subs: ["Ambient & Task Lighting", "Accent & Decorative Fixtures", "Smart Lighting Integration"],
                link: "#"
              }
            ].map((srv, i) => (
              <div 
                key={i} 
                className="bg-[#1E2022] p-8 border border-white/10 hover:border-[#E07A5F] transition-all duration-300 group flex flex-col justify-between h-full relative"
              >
                <div>
                  <div className="aspect-[4/3] overflow-hidden mb-8 border border-white/10 relative bg-[#141517]">
                    <img 
                      src={srv.img} 
                      alt={srv.title} 
                      className="w-full h-full object-cover grayscale opacity-70 group-hover:scale-102 group-hover:opacity-100 transition-all duration-700 ease-out" 
                    />
                  </div>
                  
                  <h3 className={`${archivo.className} text-xl text-white uppercase mb-4 group-hover:text-[#E07A5F] transition-colors pr-12`}>
                    {srv.title}
                  </h3>
                  
                  <p className="text-slate-400 text-sm leading-relaxed mb-8 font-light">
                    {srv.desc}
                  </p>
                </div>
                
                <div>
                  <div className="flex flex-wrap gap-2.5 pt-6 border-t border-white/10">
                    {srv.subs.map((sub, j) => (
                      <span 
                        key={j} 
                        className="inline-flex items-center gap-1.5 text-xs bg-[#141517] text-slate-300 border border-white/10 px-3 py-1.5 rounded-none font-light"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-[#E07A5F]" />
                        {sub}
                      </span>
                    ))}
                  </div>
                  
                  <div className="mt-8 flex justify-end">
                    <a 
                      href={srv.link} 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-xs font-bold text-slate-300 hover:text-white transition-colors tracking-wider uppercase group/btn"
                    >
                      <span>Explore Layouts</span>
                      <MoveRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1 duration-300" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 02 - TRANSFORMATIONS ──────────────────────────────────────────── */}
      <section className="py-24 px-8 bg-[#1E2022] border-b border-white/5 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="mb-24 space-y-4 relative">
            <span className={`${archivo.className} text-9xl font-black text-white/5 select-none absolute -z-10 -ml-8 -mt-20 tracking-wider`}>02</span>
            <div className="inline-flex items-center gap-4">
              <div className="w-12 h-[1px] bg-[#E07A5F]"></div>
              <span className="text-[10px] font-bold tracking-[0.2em] text-[#E07A5F] uppercase">Turnkey Execution</span>
            </div>
            <h2 className={`${archivo.className} text-3xl sm:text-4xl text-white uppercase`}>
              Transformations
            </h2>
            <p className="text-slate-400 font-light text-sm max-w-xl leading-relaxed">
              Full-scale execution and turnkey design solutions that bring comfort and personal expression to your spaces.
            </p>
          </div>

          <div className="space-y-36">
            {[
              { 
                idx: "02.1",
                title: "Residential Design", 
                desc: "Transform your home into a sanctuary. We craft living spaces for all scales—from studio lofts to sprawling estates—with a focus on comfort, raw finishes, and spatial expression.", 
                img: media?.otherImages?.[9] || "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=2000&q=80", 
                subs: ["Living & Dining Rooms", "Bedrooms & Walk-in Closets", "Kitchens & Bathrooms"],
                isReverse: false
              },
              { 
                idx: "02.2",
                title: "Commercial Interiors", 
                desc: "Spaces that drive productivity and impress clients. We design offices, retail stores, and hospitality venues that align with your industrial brand identity and operational needs.", 
                img: media?.otherImages?.[10] || "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=2000&q=80", 
                subs: ["Office & Co-working Spaces", "Retail & Showroom Design", "Restaurant & Café Interiors"],
                isReverse: true
              },
              { 
                idx: "02.3",
                title: "Styling & Décor", 
                desc: "The finishing layer that brings your space to life. We source industrial lighting, raw wood details, soft textured linen, and curated lofts décor.", 
                img: media?.otherImages?.[11] || "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=2000&q=80", 
                subs: ["Art Curation & Placement", "Soft Furnishing & Textiles", "Accessory & Object Styling"],
                isReverse: false
              }
            ].map((srv, i) => (
              <div 
                key={i} 
                className={`flex flex-col lg:flex-row items-center gap-12 lg:gap-20 ${srv.isReverse ? 'lg:flex-row-reverse' : ''}`}
              >
                {/* Image Container with Original Clean Grayscale Style */}
                <div className="w-full lg:w-1/2 relative group border border-white/10 p-2 bg-[#141517]">
                  <div className="aspect-[4/3] overflow-hidden bg-zinc-900 shadow-2xl">
                    <img 
                      src={srv.img} 
                      alt={srv.title} 
                      className="w-full h-full object-cover grayscale opacity-70 group-hover:opacity-100 group-hover:scale-102 transition-transform duration-[1500ms] ease-out" 
                    />
                  </div>
                </div>

                {/* Typography Column */}
                <div className="w-full lg:w-1/2 space-y-6">
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-bold text-[#E07A5F] tracking-[0.3em] uppercase font-mono">{srv.idx}</span>
                    <span className="h-[1px] w-8 bg-[#E07A5F]/30" />
                    <span className="text-xs text-slate-500 font-bold uppercase tracking-widest">Transformations</span>
                  </div>

                  <h3 className={`${archivo.className} text-3xl sm:text-4xl text-white uppercase`}>
                    {srv.title}
                  </h3>

                  <p className="text-slate-400 font-light leading-relaxed text-sm md:text-base">
                    {srv.desc}
                  </p>

                  <div className="grid sm:grid-cols-3 gap-3 pt-4">
                    {srv.subs.map((sub, j) => (
                      <div 
                        key={j} 
                        className="bg-[#141517] px-4 py-4 border border-white/10 flex flex-col justify-between h-24 hover:border-[#E07A5F] transition-colors"
                      >
                        <CheckCircle2 className="w-4 h-4 text-[#E07A5F]" />
                        <span className="text-[11px] font-semibold text-white leading-tight font-sans uppercase tracking-wider">{sub}</span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-6">
                    <Link 
                      href={`${basePath}/contact`} 
                      className="inline-flex items-center justify-center gap-3 px-8 py-4 text-xs font-bold text-white bg-[#E07A5F] hover:bg-[#C9644A] uppercase tracking-widest transition-colors shadow-lg group/cta"
                    >
                      <span>Book Design Consultation</span>
                      <ArrowUpRight className="w-4 h-4 transition-transform group-hover/cta:-translate-y-0.5 group-hover/cta:translate-x-0.5 duration-300" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 03 - SPECIALIZED SERVICES ─────────────────────────────────────── */}
      <section className="py-24 px-8 bg-[#141517] border-b border-white/5 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="mb-24 space-y-4 relative">
            <span className={`${archivo.className} text-9xl font-black text-white/5 select-none absolute -z-10 -ml-8 -mt-20 tracking-wider`}>03</span>
            <div className="inline-flex items-center gap-4">
              <div className="w-12 h-[1px] bg-[#E07A5F]"></div>
              <span className="text-[10px] font-bold tracking-[0.2em] text-[#E07A5F] uppercase">Technical Execution</span>
            </div>
            <h2 className={`${archivo.className} text-3xl sm:text-4xl text-white uppercase`}>
              Specialized <span className="text-[#E07A5F]">Services</span>
            </h2>
            <p className="text-slate-400 font-light text-sm max-w-xl leading-relaxed">
              Technical, structural, and custom joinery services delivered by master craftsmen.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {[
              { 
                title: "Full Loft Renovation", 
                desc: "End-to-end renovation management from demolition to final styling. We coordinate contractors, timelines, and budgets.", 
                img: media?.otherImages?.[12] || "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=2000&q=80", 
                subs: ["Structural Modifications", "Kitchen & Bathroom Overhauls", "Complete Interior Makeover"],
                link: "#"
              },
              { 
                title: "Custom Steel & Millwork", 
                desc: "Bespoke furniture designed and crafted to fit your space perfectly. Handmade pieces with steel profiling.", 
                img: media?.otherImages?.[13] || "https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&w=2000&q=80", 
                subs: ["Built-in Wardrobes & Storage", "Custom Tables & Seating", "Modular Kitchen Units"],
                link: "#"
              }
            ].map((srv, i) => (
              <div 
                key={i} 
                className="group flex flex-col relative"
              >
                <div className="w-full aspect-[16/10] overflow-hidden border border-white/10 p-2 bg-[#1E2022] relative">
                  <img 
                    src={srv.img} 
                    alt={srv.title} 
                    className="w-full h-full object-cover grayscale opacity-70 group-hover:scale-[1.03] transition-transform duration-[1200ms] ease-out" 
                  />
                </div>

                <div className="bg-[#1E2022] border border-white/10 p-8 sm:p-10 shadow-2xl max-w-[90%] mx-auto -mt-16 sm:-mt-24 relative z-20 hover:border-[#E07A5F] transition-all duration-300 w-[95%]">
                  <h3 className={`${archivo.className} text-xl sm:text-2xl text-white uppercase mb-4 leading-snug`}>
                    {srv.title}
                  </h3>
                  
                  <p className="text-slate-400 text-sm leading-relaxed mb-6 font-light">
                    {srv.desc}
                  </p>

                  <div className="flex flex-wrap gap-2 pt-6 border-t border-white/10">
                    {srv.subs.map((sub, j) => (
                      <span 
                        key={j} 
                        className="inline-flex items-center gap-1.5 text-xs bg-[#141517] text-slate-300 border border-white/10 px-3 py-1 rounded-none font-light"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-[#E07A5F]" />
                        {sub}
                      </span>
                    ))}
                  </div>

                  <div className="mt-8 flex justify-end">
                    <a 
                      href={srv.link} 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-300 hover:text-white transition-colors tracking-wider uppercase group/link"
                    >
                      <span>Explore Technicals</span>
                      <MoveRight className="w-4 h-4 transition-transform group-hover/link:translate-x-1 duration-300" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── THE LUXE DIFFERENCE ────────────────────────────────────────────── */}
      <section className="bg-[#1E2022] relative py-24 px-8 z-10 border-b border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-20 space-y-4">
            <div className="inline-flex items-center justify-center gap-4">
              <div className="w-12 h-[1px] bg-[#E07A5F]"></div>
              <span className="text-[10px] font-bold tracking-[0.2em] text-[#E07A5F] uppercase">Our Sincerity</span>
            </div>
            <h2 className={`${archivo.className} text-3xl md:text-5xl text-white uppercase`}>
              The Studio Loft <span className="text-[#E07A5F]">Difference</span>
            </h2>
            <p className="text-slate-400 font-light text-sm leading-relaxed max-w-sm mx-auto">
              We combine raw textures, welding craftsmanship, and budget honesty to deliver structural shells.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Multidisciplinary Team",
                desc: "Architects, interior designers, and stylists collaborate for holistic design solutions.",
                icon: Users
              },
              {
                title: "Premium Materials",
                desc: "Sourced from trusted vendors—sustainable, durable, and aesthetically curated.",
                icon: Box
              },
              {
                title: "Personalized Approach",
                desc: "Tailored design plans that respect your taste, budget, and lifestyle.",
                icon: Compass
              },
              {
                title: "Transparent Pricing",
                desc: "Clear, upfront cost breakdowns with no hidden charges or surprises.",
                icon: CreditCard
              },
              {
                title: "Trusted Portfolio",
                desc: "A legacy of beautiful spaces and lasting client relationships.",
                icon: Award
              },
              {
                title: "Studio & Site Access",
                desc: "Visit our studio or we come to you—flexible consultations at your convenience.",
                icon: Shield
              }
            ].map((diff, index) => (
              <div 
                key={index} 
                className="bg-[#141517] p-8 border border-white/10 hover:border-[#E07A5F] transition-colors duration-500 group"
              >
                <div className="w-10 h-10 bg-white/5 border border-white/10 flex items-center justify-center text-[#E07A5F] mb-6 group-hover:bg-[#E07A5F] group-hover:text-white transition-colors duration-500">
                  <diff.icon className="w-4.5 h-4.5" />
                </div>
                <h3 className={`${archivo.className} text-base text-white uppercase mb-2 group-hover:text-[#E07A5F] transition-colors`}>{diff.title}</h3>
                <p className="text-xs text-slate-400 leading-loose font-light">{diff.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── DESIGN BENTO PILLARS ─────────────────────────────────────────── */}
      <section className="bg-[#141517] py-24 px-8">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="text-center space-y-6 max-w-2xl mx-auto">
            <div className="inline-flex items-center justify-center gap-4">
              <div className="w-12 h-[1px] bg-[#E07A5F]"></div>
              <span className="text-[10px] font-bold tracking-[0.2em] text-[#E07A5F] uppercase">Drafting Pillars</span>
            </div>
            <h2 className={`${archivo.className} text-3xl sm:text-5xl text-white uppercase`}>
              Explore Our Loft <span className="text-[#E07A5F]">Pillars</span>
            </h2>
            <p className="text-slate-400 font-light text-sm leading-relaxed max-w-md mx-auto">
              Review the core metrics of Luxe Interiors Studio. Industrial, structural, and turnkey spaces.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {[
              { tag: "Residential", title: "Residential Lofts", desc: "Luxury homes tailored to your lifestyle.", icon: Home },
              { tag: "Commercial", title: "Corporate Shells", desc: "Offices and retail that elevate your brand.", icon: Compass },
              { tag: "Bespoke", title: "Custom Welds", desc: "Bespoke pieces crafted for your space.", icon: Box },
              { tag: "Transform", title: "Masonry Shells", desc: "Full-scale makeovers from concept to completion.", icon: Hammer }
            ].map((hl, hidx) => (
              <div 
                key={hidx} 
                className="bg-[#1E2022] p-6 border border-white/10 hover:border-[#E07A5F] hover:bg-[#141517] transition-all duration-300 flex flex-col justify-between h-56 group"
              >
                <div>
                  <div className="w-9 h-9 bg-white/5 border border-white/10 flex items-center justify-center text-[#E07A5F] mb-6 group-hover:scale-105 group-hover:bg-[#E07A5F] group-hover:text-white transition-all duration-300">
                    <hl.icon className="w-4 h-4" />
                  </div>
                  
                  <span className="text-[9px] font-bold text-white uppercase tracking-widest bg-[#E07A5F] px-2.5 py-1">
                    {hl.tag}
                  </span>
                  
                  <h4 className={`${archivo.className} text-base text-white uppercase mt-4 mb-1`}>
                    {hl.title}
                  </h4>
                </div>
                
                <p className="text-xs text-slate-400 font-light leading-relaxed pt-3 border-t border-white/10">
                  {hl.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
