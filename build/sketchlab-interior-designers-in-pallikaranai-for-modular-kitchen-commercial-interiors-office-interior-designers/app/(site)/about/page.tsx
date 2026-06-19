import { readSourceConfig } from '@/lib/sourceData';
import { notFound } from 'next/navigation';
import { Cormorant_Garamond } from 'next/font/google';
import { 
  Smile, Layers, Compass, Scale, Monitor, Leaf, Calendar, Home, ArrowUpRight, ChevronRight, Award, Shield
} from 'lucide-react';

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
});

export default async function AboutPage({ params }: { params?: any }) {
  const slug = ''; // standalone: slug not needed for data loading
  const data = await readSourceConfig(undefined, 'template2');
  if (!data) return notFound();

  const clinicName = data?.clinic?.name || 'SKETCHLAB';
  const doctorName = 'Sam Joseph';

  const getValidImage = (url: string | undefined, fallback: string) => {
    if (!url || url.includes('/api/media')) return fallback;
    return url;
  };

  const doctorImage = '/images/otherImages-1.jpg'; // Living Room with Pooja Unit

  const collageImage = '/images/otherImages-34.jpg'; // Showroom Interior with Opening Sale

  return (
    <div className="font-sans text-[#2A2421] bg-[#F7F4EF] min-h-screen pb-24">
      {/* Editorial Hero Section */}
      <section className="relative pt-20 pb-8 text-center space-y-6 max-w-4xl mx-auto">
        <div className="flex items-center justify-center gap-2 text-[#8E7056] text-[10px] font-bold uppercase tracking-[0.2em]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#8E7056]" />
          ESTABLISHED 2015
        </div>
        
        <h1 className={`${cormorant.className} text-5xl sm:text-6xl lg:text-7xl font-light tracking-wide leading-tight text-[#2A2421]`}>
          Refined Chennai Heritage &amp; <span className="text-[#8E7056] italic">Turnkey Craft</span>
        </h1>
        
        <p className="text-sm sm:text-base text-[#2A2421]/90 font-light leading-relaxed max-w-2xl mx-auto">
          Delivering premium all-inclusive furnishing contracts for modular kitchens, modern residences, and premium commercial workspaces across Chennai.
        </p>
      </section>

      {/* LARGE PORTRAIT PROFILE IMAGE */}
      <section className="max-w-6xl mx-auto px-4 mt-6 md:mt-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 items-stretch">
          <div className="md:col-span-8 aspect-[4/3] sm:aspect-[16/10] rounded-[2.5rem] overflow-hidden border border-[#EAE3D8]/60 shadow-sm relative bg-white group">
            <img
              src="/images/otherImages-34.jpg"
              alt="SKETCHLAB Showroom Interior"
              className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-700"
            />
          </div>
          <div className="md:col-span-4 bg-[#8E7056] text-white p-8 sm:p-10 rounded-[2.5rem] shadow-xs flex flex-col justify-between">
            <div className="space-y-4">
              <span className="text-[9px] font-mono tracking-widest text-[#FAF8F5]/85 uppercase">OUR CHENNAI OFFICE</span>
              <blockquote className={`${cormorant.className} text-2.5xl font-light leading-snug text-white/95`}>
                &ldquo;We take full operational control of sourcing, modular fabrication, and structural carpentry details.&rdquo;
              </blockquote>
            </div>
            <p className="text-[11px] text-[#FAF8F5]/80 font-light mt-8 leading-relaxed">
              Visit our experience center in Pallikaranai, Chennai to touch and feel our custom material selections and premium modular systems.
            </p>
          </div>
        </div>
      </section>

      {/* CHENNAI HISTORY TIMELINE GRID */}
      <section className="bg-white rounded-[3rem] border border-[#EAE3D8]/50 p-8 md:p-16 relative overflow-hidden shadow-sm text-left mt-24 md:mt-28">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#8E7056]/5 rounded-bl-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 max-w-5xl mx-auto space-y-12">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-[#8E7056] text-[10px] font-bold uppercase tracking-[0.2em]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#8E7056]" />
              TIMELINE MILESTONES
            </div>
            <h2 className={`${cormorant.className} text-3xl sm:text-4xl md:text-5xl font-light tracking-wide text-[#2A2421]`}>
              Our Chennai <span className="text-[#8E7056] italic">Sourcing &amp; Design Journey</span>
            </h2>
          </div>

          {/* Clean 4-Column Grid Timeline instead of vertical matching checklist */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-6">
            {[
              { year: "2015", title: "Inception in Chennai", desc: `${clinicName} was structured in Chennai to design premium residential layouts using high-quality sustainable materials.` },
              { year: "2018", title: "Modular Manufacturing", desc: "Expanding operations with our state-of-the-art modular kitchen and woodworking facility in Chennai, perfecting customized carpentry." },
              { year: "2021", title: "Statewide Logistics", desc: "Structuring robust logistics across Tamil Nadu, ensuring timely material transit, strict cargo coordinates, and site staging." },
              { year: "TODAY", title: "Turnkey Leadership", desc: "Managing end-to-end interior design and turnkey execution across Chennai, combining functional planning with premium aesthetics." }
            ].map((milestone, idx) => (
              <div key={idx} className="space-y-4 p-6 bg-[#FAF8F5]/60 rounded-2xl border border-[#EAE3D8]/60 hover:bg-white transition-colors duration-300">
                <span className={`${cormorant.className} text-[#8E7056] text-3xl font-light block border-b border-[#EAE3D8]/60 pb-3`}>
                  {milestone.year}
                </span>
                <h4 className="text-[13.5px] font-bold text-[#2A2421]">{milestone.title}</h4>
                <p className="text-xs text-[#2A2421]/90 leading-relaxed font-light">{milestone.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DESIGN LEADERS SIDE-BY-SIDE PROFILES */}
      <section className="space-y-16 mt-24 md:mt-28">
        <div className="text-center space-y-3">
          <div className="flex items-center justify-center gap-2 text-[#8E7056] text-[10px] font-bold uppercase tracking-[0.2em]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#8E7056]" />
            STUDIO LEADERSHIP
          </div>
          <h2 className={`${cormorant.className} text-3xl sm:text-4xl md:text-5xl font-light tracking-wide text-[#2A2421]`}>
            The Creative <span className="text-[#8E7056] italic">Designers</span>
          </h2>
        </div>

        {/* Side-by-side asymmetric profiles */}
        <div className="max-w-3xl mx-auto text-left">
          {/* Leader 1 - Sam Joseph */}
          <div className="bg-white rounded-[2.5rem] border border-[#EAE3D8]/60 p-8 sm:p-10 flex flex-col justify-between gap-8 hover:border-[#8E7056]/30 transition-colors duration-300">
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row items-center gap-6">
                <div className="w-36 h-36 rounded-full overflow-hidden border-4 border-[#FAF8F5] shadow-xs shrink-0 aspect-square">
                  <img src={doctorImage} alt={doctorName} className="w-full h-full object-cover grayscale opacity-95 hover:grayscale-0 transition-all duration-[600ms]" />
                </div>
                <div className="space-y-1">
                  <span className="text-[9px] font-bold tracking-widest text-[#8E7056] uppercase">FOUNDER &amp; DESIGN DIRECTOR</span>
                  <h3 className={`${cormorant.className} text-2.5xl font-light text-[#2A2421]`}>{doctorName}</h3>
                </div>
              </div>

              <p className="text-xs sm:text-[13px] text-[#2A2421]/90 leading-relaxed font-light">
                Sam oversees the custom cabinetry modular layouts, structural stone curations, and logistics schedules for all residential and commercial contracts in Chennai.
              </p>
            </div>

            <div className="pt-6 border-t border-[#EAE3D8]/60 space-y-4">
              <blockquote className="italic text-[#2A2421]/90 text-[14px] font-serif leading-relaxed">
                &ldquo;Simplifying furnishing contracts requires tight manufacturing controls and deep respect for premium materials.&rdquo;
              </blockquote>
              <div className="flex gap-2">
                <span className="px-3 py-1 bg-[#FAF8F5] text-[9px] font-bold text-[#8E7056] uppercase tracking-wider rounded-full border border-[#EAE3D8]/60">SPATIAL MAPPING</span>
                <span className="px-3 py-1 bg-[#FAF8F5] text-[9px] font-bold text-[#8E7056] uppercase tracking-wider rounded-full border border-[#EAE3D8]/60">TIMBER CURATION</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* METRICS & STUDIO PARADIGMS */}
      <section className="bg-white rounded-[3rem] border border-[#EAE3D8]/50 p-8 md:p-16 relative overflow-hidden shadow-sm text-left mt-24 md:mt-28">
        <div className="flex flex-col lg:flex-row gap-16 relative z-10">
          <div className="lg:w-1/3 space-y-6 lg:sticky lg:top-36 self-start">
             <div className="flex items-center gap-2 text-[#8E7056] text-[10px] font-bold uppercase tracking-[0.2em]">
               <span className="w-1.5 h-1.5 rounded-full bg-[#8E7056]" />
               STUDIO STANDARDS
             </div>
             <h2 className={`${cormorant.className} text-3xl sm:text-4xl md:text-5xl font-light tracking-wide leading-tight text-[#2A2421]`}>
               Tactile Planning &amp; <span className="text-[#8E7056] italic">Precision Modular Tech</span>
             </h2>
             <p className="text-xs sm:text-sm text-[#2A2421]/90 font-light leading-relaxed">
               We leverage state-of-the-art fabrication and planning tools to ensure project deadlines are met flawlessly.
             </p>
          </div>
          
          <div className="lg:w-2/3 grid sm:grid-cols-2 gap-6 relative z-10">
             {[
               { title: "High-Fidelity 3D Mapping", desc: "Experience precise spatial plans and lifelike 3D renders prior to starting fabrication.", icon: Monitor },
               { title: "Material Library Audits", desc: "We curate premium laminates, high-grade acrylics, solid hardwoods, and eco-friendly finishes for your space.", icon: Leaf },
               { title: "Real-Time Project Tracking", desc: "Inspect production progress, modular fabrication stages, and delivery timelines transparently.", icon: Calendar },
               { title: "Functional Coordination", desc: "Integrating functional layouts, electrical plumbing routes, and acoustics early in our space layout.", icon: Home }
             ].map((std, i) => (
               <div key={i} className="bg-[#FAF8F5]/60 p-6 sm:p-8 rounded-[2rem] border border-[#EAE3D8]/50 hover:border-[#8E7056]/30 transition-all duration-300 group">
                 <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-[#8E7056] mb-6 border border-[#EAE3D8]/50 group-hover:bg-[#8E7056] group-hover:text-white transition-colors duration-300">
                   <std.icon className="w-4.5 h-4.5" />
                 </div>
                 <h3 className="text-[14px] font-bold mb-2 text-[#2A2421]">{std.title}</h3>
                 <p className="text-xs text-[#2A2421]/80 font-light leading-relaxed">{std.desc}</p>
               </div>
             ))}
          </div>
        </div>
      </section>

      {/* 3-IMAGE STUDIO SHOWCASE */}
      <section className="max-w-7xl mx-auto px-4 mt-24 md:mt-28">
        <div className="text-center space-y-3 mb-10">
          <div className="flex items-center justify-center gap-2 text-[#8E7056] text-[10px] font-bold uppercase tracking-[0.2em]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#8E7056]" />
            OUR WORKSPACES
          </div>
          <h2 className={`${cormorant.className} text-3xl sm:text-4xl md:text-5xl font-light tracking-wide text-[#2A2421]`}>
            A Glimpse Into Our <span className="text-[#8E7056] italic">World</span>
          </h2>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8 pb-12">
          <div className="aspect-[4/5] rounded-[2.5rem] overflow-hidden border border-[#EAE3D8]/60 shadow-sm relative group">
            <img src="/images/otherImages-31.jpg" alt="Studio Exterior" className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-700" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-8">
              <span className="text-white text-[11px] font-bold tracking-widest uppercase drop-shadow-md">Studio Exterior</span>
            </div>
          </div>
          <div className="aspect-[4/5] rounded-[2.5rem] overflow-hidden border border-[#EAE3D8]/60 shadow-sm relative group sm:translate-y-12">
            <img src="/images/otherImages-33.jpg" alt="Workspace" className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-700" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-8">
              <span className="text-white text-[11px] font-bold tracking-widest uppercase drop-shadow-md">Open Workspaces</span>
            </div>
          </div>
          <div className="aspect-[4/5] rounded-[2.5rem] overflow-hidden border border-[#EAE3D8]/60 shadow-sm relative group">
            <img src="/images/otherImages-13.jpg" alt="Studio Night View" className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-700" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-8">
              <span className="text-white text-[11px] font-bold tracking-widest uppercase drop-shadow-md">Night Ambiance</span>
            </div>
          </div>
        </div>
      </section>

      {/* WHY TRUST US SECTION */}
      <section className="text-center pt-8 space-y-12 mt-24 md:mt-32">
        <div className="space-y-3 max-w-2xl mx-auto">
           <div className="flex items-center justify-center gap-2 text-[#8E7056] text-[10px] font-bold uppercase tracking-[0.2em]">
             <span className="w-1.5 h-1.5 rounded-full bg-[#8E7056]" />
             OPERATIONAL INTEGRITY
           </div>
           <h2 className={`${cormorant.className} text-3xl sm:text-4xl md:text-5xl font-light tracking-wide text-[#2A2421]`}>
             Turnkey Transparency &amp; <span className="text-[#8E7056] italic">Execution Trust</span>
           </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12 mt-8 text-left">
           {[
             { num: "01", title: "Chennai Workshops", desc: "Bespoke modular kitchens and carpentry are executed directly in our Chennai facility under strict quality controls." },
             { num: "02", title: "Turnkey Pricing Logs", desc: "We deliver upfront line-by-line pricing logs with zero unexpected custom markups or hidden fees." },
             { num: "03", title: "Seamless Transit Care", desc: "Supervising safe transport and site logistics across Chennai and neighboring districts directly." },
             { num: "04", title: "Curated Vendor Network", desc: "Ongoing partnerships with premium material brands and hardware suppliers (Hettich, Blum, Hafele)." },
             { num: "05", title: "Detailed Care Handovers", desc: "Providing material references, surface care guidelines, paint codes, and warranty documents at project close." },
             { num: "06", title: "Flawless Assembly Handovers", desc: "Managing site assembly, custom structural installations, and detailed spatial handovers by certified technicians." }
           ].map((feature, i) => (
             <div key={i} className="group cursor-default space-y-4">
                <div className="flex items-center gap-4">
                  <span className="text-[#8E7056] font-semibold text-xs tracking-wider opacity-60 group-hover:opacity-100 transition-opacity">{feature.num}</span>
                  <h3 className="font-bold text-[#2A2421] text-[15px] group-hover:text-[#8E7056] transition-colors">{feature.title}</h3>
                </div>
                <div className="w-full h-px bg-[#EAE3D8] group-hover:bg-[#8E7056]/30 transition-colors" />
                <p className="text-xs text-[#2A2421]/85 font-light leading-relaxed pr-4">{feature.desc}</p>
             </div>
           ))}
        </div>
      </section>
    </div>
  );
}
