import { readSourceConfig } from '@/lib/dataBuilder';
import { notFound } from 'next/navigation';
import { Playfair_Display, Lato } from 'next/font/google';
import Link from 'next/link';
import { 
  Sparkles, MoveRight, ArrowUpRight, CheckCircle2, 
  Users, Box, Compass, CreditCard, Award, Shield, 
  Home, Hammer 
} from 'lucide-react';

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

const lato = Lato({
  subsets: ['latin'],
  weight: ['300', '400', '700'],
  display: 'swap',
});

export default async function ServicesPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const { slug } = resolvedParams;
  const data = await readSourceConfig(slug, 'template6');
  if (!data) return notFound();

  const basePath = `/designwebsite/template6/${slug}`;

  return (
    <div className={`${lato.className} bg-[#1a1a1a] text-zinc-300 min-h-screen pb-32`}>
      
      {/* ── HERO SECTION ─────────────────────────────────────────────────── */}
      <section className="relative h-[80vh] overflow-hidden flex flex-col justify-end pb-24 px-6 bg-[#1a1a1a]">
        <div className="absolute inset-0 z-0">
          <img
            src="https://interior.growhigh.studio/images/styling_decor.png"
            alt="Interior services"
            className="absolute inset-0 w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a] via-black/50 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#1a1a1a]/80 to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto w-full">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-8 h-[1px] bg-[#c59b72]" />
            <span className="text-[10px] font-bold tracking-[0.35em] text-[#c59b72] uppercase">Design Excellence</span>
          </div>
          <h1 className={`${playfair.className} text-6xl md:text-7xl lg:text-8xl text-white leading-none font-light max-w-2xl`}>
            Our<br />
            <span className="italic text-zinc-400 font-light">Services</span>
          </h1>
          <p className="mt-8 text-zinc-400 font-light text-sm md:text-base leading-relaxed max-w-xl">
            Comprehensive interior design solutions delivered with precision, creativity, and care under one roof.
          </p>

          <div className="flex flex-wrap gap-3.5 pt-8">
            {["Residential", "Commercial", "Space Planning", "Custom Furniture", "Styling & Décor"].map((tag) => (
              <span 
                key={tag} 
                className="px-4 py-2 border border-white/10 text-xs font-semibold text-zinc-400 bg-white/5 hover:border-[#c59b72] hover:text-[#c59b72] transition-colors"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── 01 - FOUNDATIONAL SERVICES ────────────────────────────────────── */}
      <section className="py-28 px-6 bg-[#121212] border-b border-white/5 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="mb-20 space-y-4 relative">
            <span className={`${playfair.className} text-9xl font-black text-white/5 select-none absolute -z-10 -ml-8 -mt-20 tracking-wider`}>01</span>
            <div className="inline-flex items-center gap-4">
              <div className="w-12 h-[1px] bg-[#c59b72]"></div>
              <span className="text-[10px] font-bold tracking-[0.35em] text-[#c59b72] uppercase">Architecture Foundation</span>
            </div>
            <h2 className={`${playfair.className} text-4xl sm:text-5xl text-white font-light`}>
              Foundational <span className="italic text-zinc-400 font-light">Services</span>
            </h2>
            <p className="text-zinc-500 font-light text-sm max-w-xl leading-relaxed">
              The building blocks of every great interior—planning, materials, and lighting.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { 
                title: "Space Planning & Layout", 
                desc: "Optimize every square foot with intelligent layouts that enhance flow, light, and daily living.", 
                img: "https://images.unsplash.com/photo-1542889601-399c4f3a8402?auto=format&fit=crop&w=600&q=80", 
                subs: ["Floor Plan Design", "Furniture Layout", "Traffic Flow Optimization"],
                link: "https://interior.growhigh.studio/services/#space-planning"
              },
              { 
                title: "Material & Finish Selection", 
                desc: "Curated palettes of flooring, wall treatments, and hardware that define the character of your space.", 
                img: "https://interior.growhigh.studio/images/styling_decor.png", 
                subs: ["Flooring & Tiling", "Wall Finishes & Paint", "Hardware & Fixtures"],
                link: "https://interior.growhigh.studio/services/#materials"
              },
              { 
                title: "Lighting Design", 
                desc: "Layered lighting schemes that set the mood, enhance functionality, and showcase architectural details.", 
                img: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=600&q=80", 
                subs: ["Ambient & Task Lighting", "Accent & Decorative Fixtures", "Smart Lighting Integration"],
                link: "https://interior.growhigh.studio/services/#lighting"
              }
            ].map((srv, i) => (
              <div 
                key={i} 
                className="bg-[#1a1a1a] p-8 border border-white/5 hover:border-[#c59b72]/30 transition-all duration-500 group flex flex-col justify-between h-full relative"
              >
                <span className={`${playfair.className} absolute right-6 top-6 text-5xl font-black text-white/5 group-hover:text-[#c59b72]/10 transition-colors`}>
                  {`0${i + 1}`}
                </span>

                <div>
                  <div className="aspect-[4/3] overflow-hidden mb-8 relative bg-zinc-900 border border-white/5">
                    <div className="absolute inset-0 bg-[#c59b72]/10 opacity-0 group-hover:opacity-100 transition-opacity z-10 duration-500" />
                    <img 
                      src={srv.img} 
                      alt={srv.title} 
                      className="w-full h-full object-cover opacity-70 group-hover:opacity-100 group-hover:scale-105 transition-transform duration-700 ease-out" 
                    />
                  </div>
                  
                  <h3 className={`${playfair.className} text-2xl text-white mb-4 font-light group-hover:text-[#c59b72] transition-colors pr-12`}>
                    {srv.title}
                  </h3>
                  
                  <p className="text-zinc-500 text-sm leading-relaxed mb-8 font-light">
                    {srv.desc}
                  </p>
                </div>
                
                <div>
                  <div className="flex flex-wrap gap-2.5 pt-6 border-t border-white/5">
                    {srv.subs.map((sub, j) => (
                      <span 
                        key={j} 
                        className="inline-flex items-center gap-1.5 text-xs bg-white/5 text-zinc-400 border border-white/5 px-3 py-1.5 rounded-none font-light"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-[#c59b72]" />
                        {sub}
                      </span>
                    ))}
                  </div>
                  
                  <div className="mt-8 flex justify-end">
                    <a 
                      href={srv.link} 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-xs font-bold text-zinc-400 hover:text-white transition-colors tracking-wider uppercase group/btn"
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
      <section className="py-28 px-6 bg-[#1a1a1a] border-b border-white/5 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="mb-24 space-y-4 relative">
            <span className={`${playfair.className} text-9xl font-black text-white/5 select-none absolute -z-10 -ml-8 -mt-20 tracking-wider`}>02</span>
            <div className="inline-flex items-center gap-4">
              <div className="w-12 h-[1px] bg-[#c59b72]"></div>
              <span className="text-[10px] font-bold tracking-[0.35em] text-[#c59b72] uppercase">Turnkey Execution</span>
            </div>
            <h2 className={`${playfair.className} text-4xl sm:text-5xl text-white font-light`}>
              Transformations
            </h2>
            <p className="text-zinc-500 font-light text-sm max-w-xl leading-relaxed">
              Full-scale execution and turnkey design solutions that bring comfort and personal expression to your spaces.
            </p>
          </div>

          <div className="space-y-36">
            {[
              { 
                idx: "02.1",
                title: "Residential Design", 
                desc: "Transform your home into a sanctuary. We craft living spaces for all scales—from studio apartments to sprawling villas—with a focus on comfort, aesthetics, and personal expression.", 
                img: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=600&q=80", 
                subs: ["Living & Dining Rooms", "Bedrooms & Walk-in Closets", "Kitchens & Bathrooms"],
                isReverse: false
              },
              { 
                idx: "02.2",
                title: "Commercial Interiors", 
                desc: "Spaces that drive productivity and impress clients. We design offices, retail stores, and hospitality venues that align with your brand identity and operational needs.", 
                img: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=600&q=80", 
                subs: ["Office & Co-working Spaces", "Retail & Showroom Design", "Restaurant & Café Interiors"],
                isReverse: true
              },
              { 
                idx: "02.3",
                title: "Styling & Décor", 
                desc: "The finishing layer that brings your space to life. We source art, accessories, soft furnishings, and curated décor that add personality and warmth.", 
                img: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=600&q=80", 
                subs: ["Art Curation & Placement", "Soft Furnishing & Textiles", "Accessory & Object Styling"],
                isReverse: false
              }
            ].map((srv, i) => (
              <div 
                key={i} 
                className={`flex flex-col lg:flex-row items-center gap-12 lg:gap-20 ${srv.isReverse ? 'lg:flex-row-reverse' : ''}`}
              >
                {/* Image Container with Original Clean Grayscale Style */}
                <div className="w-full lg:w-1/2 relative group">
                  <div className="aspect-[4/3] overflow-hidden border border-white/10 bg-zinc-900 shadow-2xl">
                    <div className="absolute inset-0 bg-[#c59b72]/5 opacity-0 group-hover:opacity-100 transition-opacity z-10 duration-700" />
                    <img 
                      src={srv.img} 
                      alt={srv.title} 
                      className="w-full h-full object-cover opacity-70 group-hover:opacity-100 group-hover:scale-102 transition-transform duration-[1500ms] ease-out" 
                    />
                  </div>
                </div>

                {/* Typography Column */}
                <div className="w-full lg:w-1/2 space-y-6">
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-bold text-[#c59b72] tracking-[0.3em] uppercase font-mono">{srv.idx}</span>
                    <span className="h-[1px] w-8 bg-[#c59b72]/30" />
                    <span className="text-xs text-zinc-500 font-bold uppercase tracking-widest">Transformations</span>
                  </div>

                  <h3 className={`${playfair.className} text-3xl sm:text-4xl md:text-5xl text-white font-light leading-tight`}>
                    {srv.title}
                  </h3>

                  <p className="text-zinc-400 font-light leading-relaxed text-sm md:text-base">
                    {srv.desc}
                  </p>

                  <div className="grid sm:grid-cols-3 gap-3 pt-4">
                    {srv.subs.map((sub, j) => (
                      <div 
                        key={j} 
                        className="bg-[#121212] px-4 py-4 border border-white/5 flex flex-col justify-between h-24 hover:border-[#c59b72]/30 transition-colors"
                      >
                        <CheckCircle2 className="w-4 h-4 text-[#c59b72]" />
                        <span className="text-[11px] font-semibold text-white leading-tight font-sans">{sub}</span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-6">
                    <Link 
                      href={`${basePath}/contact`} 
                      className="inline-flex items-center justify-center gap-3 px-8 py-4 text-[10px] font-bold text-black bg-white hover:bg-zinc-200 uppercase tracking-widest transition-colors shadow-lg group/cta"
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
      <section className="py-28 px-6 bg-[#121212] border-b border-white/5 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="mb-24 space-y-4 relative">
            <span className={`${playfair.className} text-9xl font-black text-white/5 select-none absolute -z-10 -ml-8 -mt-20 tracking-wider`}>03</span>
            <div className="inline-flex items-center gap-4">
              <div className="w-12 h-[1px] bg-[#c59b72]"></div>
              <span className="text-[10px] font-bold tracking-[0.35em] text-[#c59b72] uppercase">Technical Execution</span>
            </div>
            <h2 className={`${playfair.className} text-4xl sm:text-5xl text-white font-light`}>
              Specialized <span className="italic text-zinc-400 font-light">Services</span>
            </h2>
            <p className="text-zinc-500 font-light text-sm max-w-xl leading-relaxed">
              Technical, structural, and custom joinery services delivered by master craftsmen.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {[
              { 
                title: "Full Home Renovation", 
                desc: "End-to-end renovation management from demolition to final styling. We coordinate contractors, timelines, and budgets.", 
                img: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=600&q=80", 
                subs: ["Structural Modifications", "Kitchen & Bathroom Overhauls", "Complete Interior Makeover"],
                link: "https://interior.growhigh.studio/services/#renovation"
              },
              { 
                title: "Custom Furniture & Joinery", 
                desc: "Bespoke furniture designed and crafted to fit your space perfectly. Handmade pieces with premium materials.", 
                img: "https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&w=600&q=80", 
                subs: ["Built-in Wardrobes & Storage", "Custom Tables & Seating", "Modular Kitchen Units"],
                link: "https://interior.growhigh.studio/services/#custom-furniture"
              }
            ].map((srv, i) => (
              <div 
                key={i} 
                className="group flex flex-col relative"
              >
                <div className="w-full aspect-[16/10] overflow-hidden border border-white/10 relative bg-zinc-900">
                  <div className="absolute inset-0 bg-[#c59b72]/10 opacity-0 group-hover:opacity-100 transition-opacity z-10 duration-700" />
                  <img 
                    src={srv.img} 
                    alt={srv.title} 
                    className="w-full h-full object-cover opacity-70 group-hover:opacity-100 group-hover:scale-[1.03] transition-transform duration-[1200ms] ease-out" 
                  />
                </div>

                <div className="bg-[#1a1a1a] border border-white/5 p-8 sm:p-10 shadow-2xl max-w-[90%] mx-auto -mt-16 sm:-mt-24 relative z-20 hover:border-[#c59b72]/30 transition-all duration-300 w-[95%]">
                  <h3 className={`${playfair.className} text-2xl sm:text-3xl text-white mb-4 font-light leading-snug`}>
                    {srv.title}
                  </h3>
                  
                  <p className="text-zinc-500 text-sm leading-relaxed mb-6 font-light">
                    {srv.desc}
                  </p>

                  <div className="flex flex-wrap gap-2 pt-6 border-t border-white/5">
                    {srv.subs.map((sub, j) => (
                      <span 
                        key={j} 
                        className="inline-flex items-center gap-1.5 text-xs bg-white/5 text-zinc-400 border border-white/5 px-3 py-1 rounded-none font-light"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-[#c59b72]" />
                        {sub}
                      </span>
                    ))}
                  </div>

                  <div className="mt-8 flex justify-end">
                    <a 
                      href={srv.link} 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-zinc-400 hover:text-white transition-colors tracking-wider uppercase group/link"
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
      <section className="bg-[#1a1a1a] relative py-28 px-6 z-10 border-b border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-20 space-y-4">
            <div className="inline-flex items-center justify-center gap-4">
              <div className="w-12 h-[1px] bg-[#c59b72]"></div>
              <span className="text-[10px] font-bold tracking-[0.35em] text-[#c59b72] uppercase">Our Commitment</span>
            </div>
            <h2 className={`${playfair.className} text-4xl md:text-5xl text-white font-light`}>
              The Luxe Interiors Studio <span className="italic text-zinc-400 font-light">Difference</span>
            </h2>
            <p className="text-zinc-500 font-light text-sm leading-relaxed max-w-sm mx-auto">
              We combine creativity, craftsmanship, and client care to deliver an exceptional design experience.
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
                className="bg-[#121212] p-8 border border-white/5 hover:border-[#c59b72]/45 transition-colors duration-500 group"
              >
                <div className="w-10 h-10 bg-white/5 border border-white/10 flex items-center justify-center text-[#c59b72] mb-6 group-hover:bg-[#c59b72] group-hover:text-black transition-colors duration-500">
                  <diff.icon className="w-4.5 h-4.5" />
                </div>
                <h3 className={`${playfair.className} text-xl text-white mb-2 font-light leading-tight group-hover:text-[#c59b72] transition-colors`}>{diff.title}</h3>
                <p className="text-xs text-zinc-500 leading-loose font-light group-hover:text-zinc-400 transition-colors">{diff.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── LUXE DESIGN BENTO ─────────────────────────────────────────────── */}
      <section className="bg-[#121212] py-28 px-6 border-b border-white/5">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="text-center space-y-6 max-w-2xl mx-auto">
            <div className="inline-flex items-center justify-center gap-4">
              <div className="w-12 h-[1px] bg-[#c59b72]"></div>
              <span className="text-[10px] font-bold tracking-[0.35em] text-[#c59b72] uppercase">Get The Highlights</span>
            </div>
            <h2 className={`${playfair.className} text-4xl sm:text-5xl text-white font-light`}>
              Explore Our Design <span className="italic text-zinc-400 font-light">Pillars</span>
            </h2>
            <p className="text-zinc-500 font-light text-sm leading-relaxed max-w-md mx-auto">
              Review the core pillars of Luxe Interiors Studio. High-end, tailored execution delivered directly to your home.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {[
              { tag: "Residential", title: "Residential Design", desc: "Luxury homes tailored to your lifestyle.", icon: Home },
              { tag: "Commercial", title: "Commercial Spaces", desc: "Offices and retail that elevate your brand.", icon: Compass },
              { tag: "Bespoke", title: "Custom Furniture", desc: "Bespoke pieces crafted for your space.", icon: Box },
              { tag: "Transform", title: "Renovation", desc: "Full-scale makeovers from concept to completion.", icon: Hammer }
            ].map((hl, hidx) => (
              <div 
                key={hidx} 
                className="bg-[#1a1a1a] p-6 border border-white/5 hover:border-[#c59b72]/40 hover:bg-[#121212] transition-all duration-300 flex flex-col justify-between h-56 group"
              >
                <div>
                  <div className="w-9 h-9 bg-white/5 border border-white/10 flex items-center justify-center text-[#c59b72] mb-6 group-hover:scale-105 group-hover:bg-[#c59b72]/15 transition-all duration-300">
                    <hl.icon className="w-4 h-4" />
                  </div>
                  
                  <span className="text-[9px] font-bold text-[#c59b72] uppercase tracking-widest bg-[#c59b72]/10 px-2.5 py-1">
                    {hl.tag}
                  </span>
                  
                  <h4 className={`${playfair.className} text-lg text-white font-light mt-4 mb-1`}>
                    {hl.title}
                  </h4>
                </div>
                
                <p className="text-xs text-zinc-500 font-light leading-relaxed pt-3 border-t border-white/5 group-hover:text-zinc-400 transition-colors">
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
