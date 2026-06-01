import { readSourceConfig } from '@/lib/dataBuilder';
import { notFound } from 'next/navigation';
import { Cormorant_Garamond } from 'next/font/google';
import { 
  Sparkles, CheckCircle2, ChevronRight, Compass, Box, Award, Shield, Users, Layers, ArrowUpRight
} from 'lucide-react';

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
});

export default async function ServicesPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const { slug } = resolvedParams;
  const data = await readSourceConfig(slug, 'template2');
  if (!data) return notFound();

  return (
    <div className="font-sans text-[#2A2421] bg-[#F7F4EF] min-h-screen pb-24 space-y-28">
      
      {/* Editorial Hero Section */}
      <section className="text-center space-y-6 max-w-4xl mx-auto pt-20 pb-8">
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#8E7056]/10 border border-[#8E7056]/20 text-[10px] font-bold uppercase tracking-widest text-[#8E7056]">
          <Sparkles className="w-3.5 h-3.5" />
          WHAT WE DELIVER
        </div>
        
        <h1 className={`${cormorant.className} text-5xl sm:text-6xl lg:text-7xl font-light tracking-wide leading-tight`}>
          Premium Modular Kitchens &amp; <span className="text-[#8E7056] italic">Turnkey Solutions</span>
        </h1>
        
        <p className="text-sm sm:text-base text-[#2A2421]/90 font-light max-w-xl mx-auto leading-relaxed">
          Streamlining spatial planning, modular kitchen fabrication, and end-to-end styling for premium homes and offices across Chennai.
        </p>
      </section>

      {/* CORE EXPERTISES: LUXURIOUS ROW-BASED LIST LAYOUT */}
      <section className="space-y-12 text-left">
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-[#8E7056] text-[10px] font-bold uppercase tracking-[0.2em]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#8E7056]" />
            OUR SPECIALTIES
          </div>
          <h2 className={`${cormorant.className} text-3xl sm:text-4xl md:text-5xl font-light tracking-wide text-[#2A2421]`}>
            Core Design &amp; <span className="text-[#8E7056] italic">Fabrication Specialties</span>
          </h2>
        </div>

        {/* Unique Row-based Editorial Layout instead of Card Grids */}
        <div className="divide-y divide-[#EAE3D8] border-t border-b border-[#EAE3D8] mt-8">
          {[
            {
              num: "01",
              title: "Space Planning & Layout Strategy",
              desc: "Optimizing traffic flows, lighting directions, and custom furniture footprints. We deliver high-fidelity spatial planning coordinates that lock in pricing parameters before manufacturing starts.",
              image: "https://images.unsplash.com/photo-1542889601-399c4f3a8402?auto=format&fit=crop&w=400&q=80",
              tags: ["Floor Plan Mapping", "Traffic Flow Curation", "3D Virtual Modeling"]
            },
            {
              num: "02",
              title: "Modular Kitchen & Wardrobe Engineering",
              desc: "Manufacturing precision modular kitchens, wardrobes, and customized storage layouts directly in our Chennai woodworking facility. Every single coordinate is inspected under strict quality controls.",
              image: "https://interior.growhigh.studio/images/custom_furniture.png",
              tags: ["BWP Marine Plywood", "Acrylic & Laminate Finishes", "Custom Storage Solutions"]
            },
            {
              num: "03",
              title: "Material Library & Styling Curation",
              desc: "Developing tactile material briefs with selected natural limestones, real quartz counters, organic textile layerings, and low-VOC details that give rooms lasting character.",
              image: "https://interior.growhigh.studio/images/styling_decor.png",
              tags: ["Natural Stones", "Durable Surfaces", "Low-VOC Curation"]
            },
            {
              num: "04",
              title: "Commercial & Office Interiors",
              desc: "Optimizing workspace layouts, conference rooms, ergonomic workstations, and collaborative spaces customized entirely for Chennai's modern corporate environments.",
              image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=400&q=80",
              tags: ["Ergonomic Workstations", "Collaborative Hubs", "Executive Suite Styling"]
            }
          ].map((item, idx) => (
            <div 
              key={idx} 
              className="py-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 group hover:bg-[#EAE3D8]/10 transition-colors duration-300 px-4 sm:px-6"
            >
              {/* Column 1: Serif Number */}
              <div className={`${cormorant.className} text-4xl sm:text-5xl font-light text-[#8E7056] lg:w-1/12`}>
                {item.num}
              </div>

              {/* Column 2: Title & Micro-Pills */}
              <div className="space-y-3 lg:w-3/12">
                <h3 className="text-base sm:text-lg font-bold text-[#2A2421] tracking-wide">
                  {item.title}
                </h3>
                <div className="flex flex-wrap gap-1.5">
                  {item.tags.map((tag, tIdx) => (
                    <span key={tIdx} className="px-2 py-0.5 bg-[#FAF8F5] border border-[#EAE3D8] text-[9px] text-[#2A2421]/80 rounded-full font-light">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Column 3: Description */}
              <div className="lg:w-4/12 text-xs sm:text-[13px] text-[#2A2421]/90 leading-relaxed font-light">
                {item.desc}
              </div>

              {/* Column 4: Staggered Portrait Thumbnail Image */}
              <div className="lg:w-2/12 flex justify-end w-full">
                <div className="w-full max-w-[160px] aspect-[4/3] rounded-2xl overflow-hidden border border-[#EAE3D8] shadow-xs relative">
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                  />
                  <div className="absolute inset-0 bg-[#8E7056]/5 group-hover:opacity-0 transition-opacity" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* HOSPITALITY CONTRACT SHOWCASE: ALL-INCLUSIVE CONTRACT SOLUTIONS */}
      <section className="bg-white rounded-[3rem] p-8 md:p-16 lg:p-20 border border-[#EAE3D8]/60 shadow-sm relative overflow-hidden text-left">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#8E7056]/5 rounded-bl-full blur-3xl pointer-events-none" />
        
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center relative z-10">
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center gap-2 text-[#8E7056] text-[10px] font-bold uppercase tracking-[0.2em]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#8E7056]" />
              TURNKEY HOME &amp; OFFICE CONTRACTS
            </div>
            <h2 className={`${cormorant.className} text-4xl sm:text-5xl font-light tracking-wide text-[#2A2421] leading-tight`}>
              Turnkey Modular Kitchens &amp; <span className="text-[#8E7056] italic">Home Interiors in Chennai</span>
            </h2>
            <p className="text-xs sm:text-sm text-[#2A2421]/90 leading-relaxed font-light">
              SKETCHLAB takes full ownership of premium modular kitchen fabrication and turnkey home transformations. We organize custom woodworking in our Chennai facility and coordinate seamless on-site installations across Velachery, Pallikaranai, and Tamil Nadu.
            </p>
            
            <div className="grid sm:grid-cols-2 gap-6 pt-4 border-t border-[#EAE3D8] text-xs">
              <div className="space-y-2">
                <h4 className="font-bold text-[#2A2421]">Turnkey Sourcing Contracts</h4>
                <p className="text-[#2A2421]/80 font-light leading-relaxed">Direct custom sourcing lists covering cabinetry, countertops, modular accessories, and built-in appliances.</p>
              </div>
              <div className="space-y-2">
                <h4 className="font-bold text-[#2A2421]">Logistical Supervision</h4>
                <p className="text-[#2A2421]/80 font-light leading-relaxed">Managing safe cargo transport, modular assembly, site installation, and final cleanup handovers.</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 flex justify-center w-full">
            <div className="w-full aspect-[4/5] rounded-[2.5rem] overflow-hidden shadow-sm border border-[#EAE3D8]/50">
              <img 
                src="https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=600&q=80" 
                alt="Bespoke modular kitchen layout" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* MATERIAL LIBRARY BENTO GRID */}
      <section className="space-y-12 text-left">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="flex items-center justify-center gap-2 text-[#8E7056] text-[10px] font-bold uppercase tracking-[0.2em]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#8E7056]" />
            MATERIAL CURATION
          </div>
          <h2 className={`${cormorant.className} text-3xl sm:text-4xl md:text-5xl font-light tracking-wide text-[#2A2421]`}>
            The Chennai <span className="text-[#8E7056] italic">Curation Library</span>
          </h2>
          <p className="text-xs sm:text-sm text-[#2A2421]/80 font-light leading-relaxed max-w-lg mx-auto">
            We focus exclusively on durable, premium materials that suit Chennai's tropical climate, ensuring beauty and longevity.
          </p>
        </div>

        {/* Custom Bento Material Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mt-8">
          {[
            {
              title: "Premium BWP Marine Plywood",
              desc: "Sustainably sourced boiling-water-proof plywood, ideal for modular kitchens and wet areas to ensure zero swelling or moisture damage.",
              img: "https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&w=400&q=80",
              span: "md:col-span-7"
            },
            {
              title: "Quartz & Granite Counters",
              desc: "Hard-wearing, scratch-resistant countertops selected for heavy-duty kitchen layouts and elegant premium dining tops.",
              img: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?auto=format&fit=crop&w=400&q=80",
              span: "md:col-span-5"
            },
            {
              title: "Eco-Friendly & Anti-Fungal Finishes",
              desc: "Low-VOC acrylics, anti-fingerprint laminates, and anti-fungal materials perfect for Chennai's humid coastal environment.",
              img: "https://interior.growhigh.studio/images/residential_design.png",
              span: "md:col-span-5"
            },
            {
              title: "Upholstery & Soft Furnishings",
              desc: "Woven custom curtains, premium fabrics, and acoustic panels that add luxury, warmth, and comfortable ventilation to Chennai homes.",
              img: "https://interior.growhigh.studio/images/styling_decor.png",
              span: "md:col-span-7"
            }
          ].map((mat, mIdx) => (
            <div 
              key={mIdx} 
              className={`${mat.span} bg-white rounded-[2rem] p-6 border border-[#EAE3D8]/60 flex flex-col md:flex-row items-center gap-6 shadow-xs hover:border-[#8E7056]/30 transition-colors duration-300`}
            >
              <div className="space-y-3 md:w-1/2">
                <h3 className="text-[14px] font-bold text-[#2A2421]">{mat.title}</h3>
                <p className="text-xs text-[#2A2421]/80 font-light leading-relaxed">{mat.desc}</p>
              </div>
              <div className="md:w-1/2 w-full aspect-[4/3] rounded-[1.25rem] overflow-hidden border border-[#EAE3D8]/50">
                <img src={mat.img} alt={mat.title} className="w-full h-full object-cover" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* DELIVERABLE PROCESS METRICS */}
      <section className="bg-[#2A2421] text-white rounded-[2.5rem] py-20 px-8 border border-white/5 relative overflow-hidden text-center">
        <div className="absolute top-0 left-0 w-96 h-96 bg-[#8E7056]/15 rounded-bl-full blur-[100px] pointer-events-none" />
        
        <div className="relative z-10 max-w-6xl mx-auto space-y-16">
          <div className="space-y-3 max-w-xl mx-auto">
            <span className="text-[9px] font-bold uppercase tracking-widest text-[#8E7056]">TURNKEY STANDARDS</span>
            <h2 className={`${cormorant.className} text-4xl font-light text-white`}>Operational Standards</h2>
            <p className="text-xs text-white/80 font-light leading-relaxed">Our workflow utilizes transparent project management to ensure client satisfaction across Chennai.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
            {[
              { title: "Virtual Spatial Models", desc: "Lock in modular profiles, sizing parameters, and cabinetry layout digitally.", icon: Layers },
              { title: "Itemized Costing Logs", desc: "Access explicit materials logs, pricing sheets, and custom hardware logs transparently.", icon: Box },
              { title: "Quality Inspections", desc: "Ensuring structural cabinetry and hardware checks are conducted prior to site delivery.", icon: Shield },
              { title: "Handover Guides", desc: "Detailed manuals explaining modular kitchen care, laminate cleaning, and warranty guidelines.", icon: Compass }
            ].map((p, i) => (
              <div key={i} className="p-6 bg-white/5 backdrop-blur-sm rounded-[2rem] border border-white/10 hover:bg-white/10 transition-colors duration-300 flex flex-col justify-between h-full group">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#8E7056] mb-6 group-hover:scale-105 transition-transform">
                    <p.icon className="w-4.5 h-4.5" />
                  </div>
                  <h4 className="font-bold text-white text-[14px] leading-tight mb-2">{p.title}</h4>
                </div>
                <p className="text-xs text-white/60 font-light leading-relaxed mt-4 pt-4 border-t border-white/5">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
