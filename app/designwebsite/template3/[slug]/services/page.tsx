import { readSourceConfig } from '@/lib/dataBuilder';
import { notFound } from 'next/navigation';
import { 
  ArrowRight, CheckCircle2, Sparkles, Compass, 
  Palette, Hammer, Award, Shield, Users, 
  Sparkle, Box, CreditCard, MoveRight, ChevronRight, 
  Maximize2, ArrowUpRight, Home
} from 'lucide-react';
import { Fustat } from 'next/font/google';

const fustat = Fustat({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  style: ['normal'],
  display: 'swap',
});

export default async function ServicesPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const { slug } = resolvedParams;
  const data = await readSourceConfig(slug, 'template3');
  if (!data) return notFound();
  const { media } = data;
  const basePath = `/designwebsite/template3/${slug}`;

  return (
    <div className={`text-slate-900 min-h-screen pb-32 relative overflow-hidden bg-[#FAFAF9] ${fustat.className}`}>
      
      {/* Dynamic Ambient Background Elements & Architectural Lines */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-1/4 w-[40rem] h-[40rem] bg-[#B48A66]/5 rounded-full blur-[140px]" />
        <div className="absolute top-[35%] right-1/4 w-[35rem] h-[35rem] bg-amber-500/3 rounded-full blur-[120px]" />
        <div className="absolute bottom-[20%] left-10 w-[30rem] h-[30rem] bg-slate-200/60 rounded-full blur-[100px]" />
        
        {/* Subtle architectural overlay lines */}
        <div className="absolute top-0 left-1/3 w-px h-full bg-slate-200/30 -rotate-12 transform origin-top" />
        <div className="absolute top-0 right-1/4 w-px h-full bg-slate-200/20 -rotate-12 transform origin-top" />
        
        {/* Blueprint background grid */}
        <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:32px_32px] opacity-40" />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 space-y-40 relative z-10 pt-20">
        
        {/* HERO SECTION */}
        <section className="text-center space-y-8 max-w-4xl mx-auto pt-16">
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#B48A66]/10 border border-[#B48A66]/20 text-xs font-semibold uppercase tracking-widest text-[#B48A66]">
            <Sparkles className="w-3.5 h-3.5" />
            DESIGN EXCELLENCE
          </div>
          
          <h1 className="text-6xl sm:text-7xl lg:text-8xl font-bold tracking-tight text-slate-900 leading-[1.05] font-fustat">
            Our <span className="text-[#B48A66] italic font-normal">Services</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-slate-500 font-light max-w-2xl mx-auto leading-relaxed">
            Comprehensive interior design solutions delivered with precision, creativity, and care under one roof.
          </p>

          <div className="flex flex-wrap justify-center gap-3.5 pt-6 max-w-2xl mx-auto">
            {["Residential", "Commercial", "Space Planning", "Custom Furniture", "Styling & Décor"].map((tag, idx) => (
              <span 
                key={tag} 
                className="px-4 py-2 rounded-full border border-slate-200/80 text-sm font-medium text-slate-600 bg-white shadow-sm flex items-center gap-2 hover:border-[#B48A66] hover:text-[#B48A66] transition-all duration-300 hover:-translate-y-0.5"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#B48A66]" />
                {tag}
              </span>
            ))}
          </div>
        </section>

        {/* 01 - FOUNDATIONAL SERVICES (STAGGERED COLUMN GRID) */}
        <section className="relative">
          <div className="mb-20 space-y-4 relative z-10">
            <span className="text-9xl font-black text-slate-100/70 select-none absolute -z-10 -ml-12 -mt-20 tracking-wide font-fustat">01</span>
            <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-slate-900">
              Foundational <span className="text-[#B48A66]">Services</span>
            </h2>
            <p className="text-lg text-slate-500 font-light max-w-2xl leading-relaxed">
              The building blocks of every great interior—planning, materials, and lighting.
            </p>
          </div>

          {/* Staggered Vertical Card Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pt-8">
            {[
              { 
                title: "Space Planning & Layout", 
                desc: "Optimize every square foot with intelligent layouts that enhance flow, light, and daily living.", 
                img: media?.otherImages?.[6] || "https://images.unsplash.com/photo-1542889601-399c4f3a8402?auto=format&fit=crop&w=600&q=80", 
                subs: ["Floor Plan Design", "Furniture Layout", "Traffic Flow Optimization"],
                link: "#",
                offset: "lg:translate-y-0"
              },
              { 
                title: "Material & Finish Selection", 
                desc: "Curated palettes of flooring, wall treatments, and hardware that define the character of your space.", 
                img: media?.otherImages?.[7] || "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80", 
                subs: ["Flooring & Tiling", "Wall Finishes & Paint", "Hardware & Fixtures"],
                link: "#",
                offset: "lg:translate-y-12"
              },
              { 
                title: "Lighting Design", 
                desc: "Layered lighting schemes that set the mood, enhance functionality, and showcase architectural details.", 
                img: media?.otherImages?.[8] || "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=600&q=80", 
                subs: ["Ambient & Task Lighting", "Accent & Decorative Fixtures", "Smart Lighting Integration"],
                link: "#",
                offset: "lg:translate-y-6"
              }
            ].map((srv, i) => (
              <div 
                key={i} 
                className={`bg-white/80 backdrop-blur-md rounded-[2.5rem] p-8 border border-slate-200/50 shadow-sm hover:shadow-2xl hover:shadow-[#B48A66]/5 hover:border-[#B48A66]/30 transition-all duration-500 group flex flex-col justify-between h-full relative overflow-hidden ${srv.offset}`}
              >
                {/* Floating Serif Card Number Indicator */}
                <span className="absolute right-6 top-6 text-6xl font-black text-slate-100 font-fustat select-none transition-all duration-500 group-hover:text-[#B48A66]/10 group-hover:scale-110">
                  {i + 1 < 10 ? `0${i + 1}` : i + 1}
                </span>

                <div className="relative z-10">
                  {/* Visual Image container with offset frames */}
                  <div className="aspect-[4/3] rounded-3xl overflow-hidden mb-8 relative bg-slate-50 border border-slate-100/80 shadow-inner group-hover:shadow-md transition-shadow">
                    <div className="absolute inset-0 bg-[#B48A66]/10 mix-blend-multiply opacity-0 group-hover:opacity-100 transition-opacity z-10 duration-500" />
                    <img 
                      src={srv.img} 
                      alt={srv.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" 
                    />
                  </div>
                  
                  <h3 className="text-2xl font-bold mb-4 font-fustat text-slate-900 group-hover:text-[#B48A66] transition-colors duration-300 pr-12 leading-snug">
                    {srv.title}
                  </h3>
                  
                  <p className="text-slate-500 text-sm leading-relaxed mb-8 font-light">
                    {srv.desc}
                  </p>
                </div>
                
                <div className="relative z-10">
                  {/* Bullet Lists Styled as Editorial Micro-Pills */}
                  <div className="flex flex-wrap gap-2.5 pt-6 border-t border-slate-100">
                    {srv.subs.map((sub, j) => (
                      <span 
                        key={j} 
                        className="inline-flex items-center gap-1.5 text-xs bg-slate-50 text-slate-600 border border-slate-100 px-3 py-1.5 rounded-full font-light"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-[#B48A66]" />
                        {sub}
                      </span>
                    ))}
                  </div>
                  
                  <div className="mt-8 flex justify-end">
                    <a 
                      href={srv.link} 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-xs font-bold text-slate-900 hover:text-[#B48A66] transition-colors tracking-wider uppercase group/btn"
                    >
                      <span>Explore Layouts</span>
                      <MoveRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1 duration-300" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 02 - TRANSFORMATIONS (MAGAZINE ALTERNATING PORTFOLIO SPLITS) */}
        <section className="relative pt-12">
          <div className="mb-24 space-y-4 relative z-10">
            <span className="text-9xl font-black text-slate-100/70 select-none absolute -z-10 -ml-12 -mt-20 tracking-wide font-fustat">02</span>
            <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-slate-900">
              Transformations
            </h2>
            <p className="text-lg text-slate-500 font-light max-w-2xl leading-relaxed">
              Full-scale execution and turnkey design solutions that bring comfort and personal expression to your spaces.
            </p>
          </div>

          {/* Alternating splits to break uniform boring grid fatigue */}
          <div className="space-y-36">
            {[
              { 
                idx: "02.1",
                title: "Residential Design", 
                desc: "Transform your home into a sanctuary. We craft living spaces for all scales—from studio apartments to sprawling villas—with a focus on comfort, aesthetics, and personal expression.", 
                img: media?.otherImages?.[9] || "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=600&q=80", 
                subs: ["Living & Dining Rooms", "Bedrooms & Walk-in Closets", "Kitchens & Bathrooms"],
                link: `${basePath}/contact`,
                isReverse: false
              },
              { 
                idx: "02.2",
                title: "Commercial Interiors", 
                desc: "Spaces that drive productivity and impress clients. We design offices, retail stores, and hospitality venues that align with your brand identity and operational needs.", 
                img: media?.otherImages?.[10] || "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=600&q=80", 
                subs: ["Office & Co-working Spaces", "Retail & Showroom Design", "Restaurant & Café Interiors"],
                link: `${basePath}/contact`,
                isReverse: true
              },
              { 
                idx: "02.3",
                title: "Styling & Décor", 
                desc: "The finishing layer that brings your space to life. We source art, accessories, soft furnishings, and curated décor that add personality and warmth.", 
                img: media?.otherImages?.[11] || "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=600&q=80", 
                subs: ["Art Curation & Placement", "Soft Furnishing & Textiles", "Accessory & Object Styling"],
                link: `${basePath}/contact`,
                isReverse: false
              }
            ].map((srv, i) => (
              <div 
                key={i} 
                className={`flex flex-col lg:flex-row items-center gap-12 lg:gap-20 ${srv.isReverse ? 'lg:flex-row-reverse' : ''}`}
              >
                {/* Image Container with rotating accent highlight borders */}
                <div className="w-full lg:w-1/2 relative group">
                  <div className="absolute inset-0 bg-[#B48A66] rounded-[2.5rem] rotate-2 opacity-10 group-hover:rotate-3 transition-transform duration-500 ease-out" />
                  <div className="relative aspect-[4/3] rounded-[2.5rem] overflow-hidden shadow-xl border border-slate-100">
                    <div className="absolute inset-0 bg-[#B48A66]/5 mix-blend-multiply opacity-0 group-hover:opacity-100 transition-opacity z-10 duration-700" />
                    <img 
                      src={srv.img} 
                      alt={srv.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[1500ms] ease-out" 
                    />
                  </div>
                </div>

                {/* Typography Column */}
                <div className="w-full lg:w-1/2 space-y-6">
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-bold text-[#B48A66] tracking-[0.3em] uppercase font-mono">{srv.idx}</span>
                    <span className="h-px w-8 bg-[#B48A66]/30" />
                    <span className="text-xs text-slate-400 font-bold uppercase tracking-widest">Transformations</span>
                  </div>

                  <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-slate-900 font-fustat leading-tight">
                    {srv.title}
                  </h3>

                  <p className="text-slate-500 font-light leading-relaxed text-base sm:text-lg">
                    {srv.desc}
                  </p>

                  {/* Split checklist styled as premium micro-cards */}
                  <div className="grid sm:grid-cols-3 gap-3 pt-4">
                    {srv.subs.map((sub, j) => (
                      <div 
                        key={j} 
                        className="bg-white px-4 py-3.5 rounded-2xl border border-slate-200/60 shadow-sm flex flex-col justify-between"
                      >
                        <CheckCircle2 className="w-4.5 h-4.5 text-[#B48A66] mb-3" />
                        <span className="text-xs font-semibold text-slate-800 leading-tight">{sub}</span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-8">
                    <a 
                      href={srv.link} 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-3 px-8 py-4 text-xs font-bold text-white bg-slate-900 rounded-full hover:bg-[#B48A66] transition-colors uppercase tracking-widest shadow-lg hover:shadow-[#B48A66]/20 group/cta"
                    >
                      <span>Book Design Consultation</span>
                      <ArrowUpRight className="w-4 h-4 transition-transform group-hover/cta:-translate-y-0.5 group-hover/cta:translate-x-0.5 duration-300" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 03 - SPECIALIZED SERVICES (ARCHITECTURAL OVERLAPPING CARPS) */}
        <section className="relative">
          <div className="mb-24 space-y-4 relative z-10">
            <span className="text-9xl font-black text-slate-100/70 select-none absolute -z-10 -ml-12 -mt-20 tracking-wide font-fustat">03</span>
            <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-slate-900">
              Specialized <span className="text-[#B48A66]">Services</span>
            </h2>
            <p className="text-lg text-slate-500 font-light max-w-2xl leading-relaxed">
              Technical, structural, and custom joinery services delivered by master craftsmen.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {[
              { 
                title: "Full Home Renovation", 
                desc: "End-to-end renovation management from demolition to final styling. We coordinate contractors, timelines, and budgets.", 
                img: media?.otherImages?.[12] || "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=600&q=80", 
                subs: ["Structural Modifications", "Kitchen & Bathroom Overhauls", "Complete Interior Makeover"],
                link: "#"
              },
              { 
                title: "Custom Furniture & Joinery", 
                desc: "Bespoke furniture designed and crafted to fit your space perfectly. Handmade pieces with premium materials.", 
                img: media?.otherImages?.[13] || "https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&w=600&q=80", 
                subs: ["Built-in Wardrobes & Storage", "Custom Tables & Seating", "Modular Kitchen Units"],
                link: "#"
              }
            ].map((srv, i) => (
              <div 
                key={i} 
                className="group flex flex-col relative"
              >
                {/* Visual Image Anchor */}
                <div className="w-full aspect-[16/10] rounded-[2.5rem] overflow-hidden shadow-md relative bg-slate-100 border border-slate-200/50">
                  <div className="absolute inset-0 bg-[#B48A66]/10 mix-blend-multiply opacity-0 group-hover:opacity-100 transition-opacity z-10 duration-700" />
                  <img 
                      src={srv.img} 
                      alt={srv.title} 
                      className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-[1200ms] ease-out" 
                  />
                </div>

                {/* Overlapping Text Card - Architectural print-styling */}
                <div className="bg-white/90 backdrop-blur-md border border-slate-200/50 p-8 sm:p-10 rounded-[2rem] shadow-xl max-w-[90%] mx-auto -mt-16 sm:-mt-24 relative z-20 hover:border-[#B48A66]/30 transition-all duration-300 w-[95%]">
                  <h3 className="text-2xl sm:text-3xl font-bold mb-4 font-fustat text-slate-900 leading-snug">
                    {srv.title}
                  </h3>
                  
                  <p className="text-slate-500 text-sm leading-relaxed mb-6 font-light">
                    {srv.desc}
                  </p>

                  {/* Bullet pill tags */}
                  <div className="flex flex-wrap gap-2 pt-6 border-t border-slate-100">
                    {srv.subs.map((sub, j) => (
                      <span 
                        key={j} 
                        className="inline-flex items-center gap-1.5 text-xs bg-slate-50 text-slate-600 border border-slate-100 px-3 py-1 rounded-full font-light"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-[#B48A66]" />
                        {sub}
                      </span>
                    ))}
                  </div>

                  <div className="mt-8 flex justify-end">
                    <a 
                      href={srv.link} 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-900 hover:text-[#B48A66] transition-colors tracking-wider uppercase group/link"
                    >
                      <span>Explore Technicals</span>
                      <MoveRight className="w-4 h-4 transition-transform group-hover/link:translate-x-1 duration-300" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* THE LUXE DIFFERENCE SECTION (ELEGANT ROTATING GRID CARDS) */}
        <section className="bg-white relative py-24 rounded-[3rem] px-8 border border-slate-200/60 z-10 overflow-hidden shadow-md">
          {/* Subtle Inner Glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#B48A66]/5 rounded-bl-full blur-3xl z-0 pointer-events-none" />
          
          <div className="relative z-10 max-w-5xl mx-auto">
            <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
              <div className="flex items-center justify-center gap-2 text-slate-400 text-xs font-semibold uppercase tracking-widest">
                <span className="w-1.5 h-1.5 rounded-full bg-[#B48A66]" />
                OUR COMMITMENT
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-slate-900">
                The Luxe Interiors Studio <span className="text-[#B48A66]">Difference</span>
              </h2>
              <p className="text-slate-500 font-light leading-relaxed">
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
                  className="bg-[#FAFAF9] p-8 rounded-2xl border border-slate-100 hover:border-[#B48A66]/40 hover:bg-white hover:shadow-[0_20px_50px_rgba(180,138,102,0.06)] transition-all duration-500 group"
                >
                  <div className="w-12 h-12 rounded-xl bg-[#B48A66]/10 flex items-center justify-center text-[#B48A66] mb-6 group-hover:-rotate-6 group-hover:scale-110 transition-all duration-300">
                    <diff.icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2 font-fustat leading-tight">{diff.title}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed font-light">{diff.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* HIGH-CONTRAST DARK CTA CANVASES & VISIBLE HIGHLIGHT PILLARS */}
        <section className="bg-slate-900 text-white rounded-[3.5rem] py-24 px-8 relative overflow-hidden shadow-2xl z-10 border border-slate-800">
          {/* Subtle Radial Glows */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#B48A66]/10 rounded-bl-full blur-[100px] z-0 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-amber-500/5 rounded-tr-full blur-[90px] z-0 pointer-events-none" />
          
          <div className="relative z-10 max-w-6xl mx-auto space-y-16">
            <div className="text-center space-y-6 max-w-2xl mx-auto">
              <div className="inline-flex items-center gap-2.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-semibold uppercase tracking-widest text-[#B48A66]">
                <Sparkle className="w-3 h-3" />
                GET THE HIGHLIGHTS
              </div>
              <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-white font-fustat">
                Explore Our Design <span className="text-[#B48A66] italic font-normal">Pillars</span>
              </h2>
              <p className="text-slate-400 font-light leading-relaxed">
                Review the core pillars of Luxe Interiors Studio. High-end, tailored execution delivered directly to your home.
              </p>
            </div>

            {/* Redesigned: Fully visible, gorgeous bento-style highlights grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {[
                { tag: "Residential", title: "Residential Design", desc: "Luxury homes tailored to your lifestyle.", icon: Home },
                { tag: "Commercial", title: "Commercial Spaces", desc: "Offices and retail that elevate your brand.", icon: Compass },
                { tag: "Bespoke", title: "Custom Furniture", desc: "Bespoke pieces crafted for your space.", icon: Box },
                { tag: "Transform", title: "Renovation", desc: "Full-scale makeovers from concept to completion.", icon: Hammer }
              ].map((hl, hidx) => (
                <div 
                  key={hidx} 
                  className="bg-white/5 backdrop-blur-sm p-6 rounded-[2rem] border border-white/10 hover:border-[#B48A66]/40 hover:bg-white/10 transition-all duration-300 flex flex-col justify-between h-full group"
                >
                  <div>
                    {/* Glowing rounded icon border */}
                    <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#B48A66] mb-6 group-hover:scale-110 group-hover:bg-[#B48A66]/10 transition-all duration-300">
                      <hl.icon className="w-4.5 h-4.5" />
                    </div>
                    
                    <span className="text-[10px] font-bold text-[#B48A66] uppercase tracking-widest bg-[#B48A66]/15 px-2.5 py-1 rounded-full">
                      {hl.tag}
                    </span>
                    
                    <h4 className="font-bold text-white text-lg mt-4 mb-2 font-fustat leading-tight">
                      {hl.title}
                    </h4>
                  </div>
                  
                  <p className="text-xs text-slate-400 font-light leading-relaxed mt-2 pt-4 border-t border-white/5">
                    {hl.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
