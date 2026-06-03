import { readSourceConfig } from '@/lib/dataBuilder';
import { notFound } from 'next/navigation';
import { 
  Monitor, Leaf, CalendarIcon, Home, ArrowRight, 
  Award, Compass, Eye, Layers, Smile, Scale, Star,
  Shield, Sparkles, CheckCircle2, ArrowUpRight, Plus, Minus
} from 'lucide-react';

export default async function AboutPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const { slug } = resolvedParams;
  const data = await readSourceConfig(slug, 'template3');
  if (!data) return notFound();

  const clinicName = data?.clinic?.name || 'Luxe Interiors Studio';
  const doctorName = data?.doctor?.name || 'Arjun Mehta';
  const doctorImage = data?.media?.otherImages?.[0] || 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=800&q=80';
  const secondaryImage = data?.media?.otherImages?.[1] || 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80';

  return (
    <div className="text-slate-900 bg-white min-h-screen pb-32 relative overflow-hidden selection:bg-[#B48A66] selection:text-white scroll-smooth">
      {/* Blueprint Grid Lines Overlay (Subtle) - Matches Template 3 Homepage */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:24px_24px] opacity-35 z-0" />

      {/* Giant Watermark Background Text - Matches Template 3 Homepage style */}
      <div className="absolute top-[18%] left-1/2 -translate-x-1/2 select-none pointer-events-none z-0">
        <span className="font-extrabold text-[12vw] sm:text-[14vw] md:text-[16vw] text-slate-100/70 uppercase tracking-widest font-fustat">
          CREATIVE
        </span>
      </div>

      {/* Hero Section */}
      <section className="relative pt-36 pb-20 overflow-hidden flex flex-col items-center min-h-[70vh] z-10">
        <div className="max-w-7xl mx-auto px-8 w-full relative z-10 text-center">
          <div className="space-y-6 max-w-4xl mx-auto">
            {/* Tagline Indicator - Matches Template 3 Section Indicator */}
            <div className="flex items-center justify-center gap-2 text-slate-400 text-xs font-semibold uppercase tracking-widest">
              <span className="w-1.5 h-1.5 rounded-full bg-[#B48A66]" />
              ESTABLISHED 2015
            </div>
            
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-slate-900 leading-[1.1] font-fustat">
              About <span className="text-[#B48A66]">Our Studio</span> &amp; Vision
            </h1>
            
            <p className="text-lg text-slate-500 font-light leading-relaxed max-w-2xl mx-auto">
              We shape luxury residential spaces and commercial interiors with high-fidelity planning, selected organic materials, and transparent project operations.
            </p>
          </div>

          {/* Modular Sleek Architectural Hero Image Box - Matches Template 3 Homepage Hero Picture Offset */}
          <div className="relative max-w-5xl mx-auto mt-16 px-4">
            <div className="absolute inset-0 bg-[#B48A66] rounded-3xl rotate-2 opacity-10"></div>
            <div className="relative aspect-[21/9] rounded-3xl overflow-hidden shadow-2xl border border-slate-100 bg-white">
              <img
                src={data?.media?.clinicImages?.[1] || data?.media?.otherImages?.[1] || "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1200"}
                alt="Modern studio architectural layout"
                className="w-full h-full object-cover hover:scale-102 transition-transform duration-[2000ms]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Main Page Content Block */}
      <div className="max-w-7xl mx-auto px-8 space-y-32 relative z-10 mt-16">

        {/* Our Journey Section (Timeline) */}
        <section className="bg-slate-50 rounded-[2.5rem] border border-slate-100 p-8 md:p-16 lg:p-20 relative overflow-hidden shadow-xs">
          <div className="absolute top-0 right-0 w-[50%] h-[50%] bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#B48A66]/5 via-transparent to-transparent pointer-events-none z-0" />
          
          <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 relative z-10">
            {/* Left sticky column */}
            <div className="lg:w-1/3 space-y-6 lg:sticky lg:top-36 self-start">
              <div className="flex items-center gap-2 text-slate-400 text-xs font-semibold uppercase tracking-widest">
                <span className="w-1.5 h-1.5 rounded-full bg-[#B48A66]" />
                OUR JOURNEY
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-slate-900 font-fustat">
                The Story <span className="text-[#B48A66]">So Far</span>
              </h2>
              <p className="text-base text-slate-500 font-light leading-relaxed">
                From a small boutique studio to an industry partner for premium turnkey renovations, our commitment to craft has never wavered.
              </p>
            </div>
            
            {/* Right timeline column */}
            <div className="lg:w-2/3 relative border-l border-slate-200 ml-4 md:ml-0 space-y-16 py-4">
              {[
                { year: "2015", title: "Inception", desc: `${clinicName} was established to deliver luxury-grade interior architecture with a deep respect for natural materials and client lifestyle requirements.` },
                { year: "2018", title: "In-House 3D & Sourcing", desc: "Expanded our operations, adding a specialized 3D studio and partnering with premium carpenters to execute custom furniture details directly." },
                { year: "2021", title: "Green protocol Integration", desc: "Introduced smart planning software and committed to a rigorous biophilic design framework using low-VOC coatings and timber." },
                { year: "TODAY", title: "High-End Residential Leader", desc: "Managing comprehensive residential design and commercial renovations nationwide, recognized for timeless, warm minimal rooms." }
              ].map((milestone, i) => (
                <div key={i} className="relative pl-10 md:pl-16 group">
                  {/* Glowing Node - Matches Timeline Bullet Aesthetic */}
                  <div className="absolute w-4 h-4 bg-white border-[3px] border-[#B48A66] rounded-full -left-[8.5px] top-1.5 group-hover:bg-[#B48A66] group-hover:scale-125 transition-all duration-500 shadow-sm" />
                  <span className="text-[#B48A66] font-mono font-bold text-lg tracking-wider mb-2 block">{milestone.year}</span>
                  <h3 className="text-2xl font-bold mb-3 text-slate-900 font-fustat group-hover:text-[#B48A66] transition-colors">{milestone.title}</h3>
                  <p className="text-slate-500 max-w-xl text-base font-light leading-relaxed group-hover:text-slate-600 transition-colors">{milestone.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Philosophy Section */}
        <section className="relative">
          <div className="flex flex-col md:flex-row gap-6 md:gap-16 items-end mb-16">
            <div className="flex-1 space-y-4">
              <div className="flex items-center gap-2 text-slate-400 text-xs font-semibold uppercase tracking-widest">
                <span className="w-1.5 h-1.5 rounded-full bg-[#B48A66]" />
                OUR PHILOSOPHY
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-slate-900 font-fustat">
                How We <span className="text-[#B48A66]">Design</span> Spaces
              </h2>
            </div>
            <p className="text-base text-slate-500 max-w-xl font-light leading-relaxed pb-2">
              A comprehensive blueprint paradigm built on client empathy, tactile material sourcing, and operational integrity that protects your timeline and budget.
            </p>
          </div>
          
          {/* Grid of philosophy cards - matches services block styling */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { num: "01", title: "Empathy", desc: "We study how your family circulates and lives, shaping storage and space planning around physical realities.", icon: Smile },
              { num: "02", title: "Tactile Materials", desc: "We currate natural stone, real timber, and organic linens that gain elegant character instead of wearing out.", icon: Layers },
              { num: "03", title: "Precision Blueprints", desc: "Step inside high-fidelity 3D modeling blocks to lock in costing parameters before starting any construction.", icon: Compass },
              { num: "04", title: "Strict Integrity", desc: "We maintain transparent project spreadsheets and clear communication lists for full client convenience.", icon: Scale }
            ].map((phil, i) => (
              <div key={i} className="bg-white rounded-3xl shadow-sm border border-slate-100 hover:shadow-md hover:border-[#B48A66]/30 transition-all duration-500 p-8 flex flex-col group relative overflow-hidden">
                {/* Accent watermark number */}
                <span className="absolute -top-4 -right-4 text-8xl font-black text-slate-50/70 group-hover:text-[#B48A66]/5 select-none pointer-events-none transition-colors duration-500 font-fustat">{phil.num}</span>
                
                <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-[#B48A66] mb-8 border border-slate-100 group-hover:bg-[#B48A66] group-hover:text-white transition-colors duration-500 relative z-10 shadow-3xs">
                  <phil.icon className="w-5 h-5" />
                </div>
                
                <h3 className="text-xl font-bold mb-3 text-slate-900 font-fustat group-hover:text-[#B48A66] transition-colors relative z-10">{phil.title}</h3>
                <p className="text-slate-500 font-light text-sm leading-relaxed relative z-10">{phil.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Team Section - Matches Arjun Mehta Layout from Homepage */}
        <section className="py-8">
          <div className="text-center mb-24 max-w-2xl mx-auto space-y-4">
            <div className="flex items-center justify-center gap-2 text-slate-400 text-xs font-semibold uppercase tracking-widest">
              <span className="w-1.5 h-1.5 rounded-full bg-[#B48A66]" />
              CREATIVE VISION
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-fustat text-slate-900 tracking-tight">
              Meet The <span className="text-[#B48A66]">Design</span> Leaders
            </h2>
          </div>
          
          <div className="space-y-36">
            
            {/* Arjun Mehta - exact layout matching homepage founder card */}
            <div className="grid lg:grid-cols-12 gap-16 items-center">
              <div className="lg:col-span-5 relative">
                <div className="w-full aspect-[3/4] rounded-[2.5rem] overflow-hidden shadow-2xl border border-slate-100 bg-slate-50">
                  <img 
                    src={doctorImage} 
                    alt={doctorName} 
                    className="w-full h-full object-cover grayscale opacity-90 hover:grayscale-0 transition-all duration-700" 
                  />
                </div>
                {/* Floating dark badge - exact copy from template 3 homepage */}
                <div className="absolute -bottom-6 -right-6 lg:-right-12 bg-slate-900 text-white p-6 md:p-8 rounded-3xl shadow-xl z-20 border border-slate-800">
                  <p className="text-xs font-bold tracking-[0.2em] text-[#B48A66] mb-2 uppercase">PRINCIPAL DESIGNER</p>
                  <h3 className="text-2xl font-bold font-fustat text-white">{doctorName}</h3>
                </div>
              </div>
              
              <div className="lg:col-span-7 space-y-8 lg:pl-12">
                <div className="space-y-3">
                  <span className="text-xs font-bold tracking-[0.2em] text-[#B48A66] uppercase">FOUNDER & VISION LEAD</span>
                  <h3 className="text-4xl font-bold tracking-tight text-slate-900 font-fustat">{doctorName}</h3>
                  <p className="text-slate-500 text-base font-light">M.Des, Interior Architecture — NID | B.Arch — Sir J.J. College</p>
                </div>
                
                <p className="text-lg text-slate-600 font-light leading-relaxed">
                  {doctorName} founded {clinicName} in 2015. With over a decade of design experience, he oversees the architectural planning, timber sourcing, and custom furniture frameworks for every residential studio build.
                </p>

                <div className="grid sm:grid-cols-2 gap-8 pt-8 border-t border-slate-200">
                  <div>
                    <h4 className="font-bold text-slate-900 mb-2 font-fustat">Expertise Core</h4>
                    <p className="text-slate-500 text-sm font-light">Spatial Planning, Luxury Residential architecture, Custom Carpentry Systems.</p>
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 mb-2 font-fustat">Credentials</h4>
                    <p className="text-slate-500 text-sm font-light">M.Des, National Institute of Design | B.Arch, Sir J.J. College.</p>
                  </div>
                </div>

                <blockquote className="border-l-2 border-[#B48A66] pl-6 italic text-slate-500 text-xl font-serif mt-6">
                  &ldquo;A successful home should function cleanly while highlighting the natural warmth of timber and stone.&rdquo;
                </blockquote>
              </div>
            </div>

            {/* Kavitha Rajan - matching alternating visual structure */}
            <div className="grid lg:grid-cols-12 gap-16 items-center">
              <div className="lg:col-span-5 relative order-1 lg:order-2">
                <div className="w-full aspect-[3/4] rounded-[2.5rem] overflow-hidden shadow-2xl border border-slate-100 bg-slate-50">
                  <img 
                    src={secondaryImage} 
                    alt="Kavitha Rajan" 
                    className="w-full h-full object-cover grayscale opacity-90 hover:grayscale-0 transition-all duration-700" 
                  />
                </div>
                {/* Floating dark badge */}
                <div className="absolute -bottom-6 -left-6 lg:-left-12 bg-slate-900 text-white p-6 md:p-8 rounded-3xl shadow-xl z-20 border border-slate-800">
                  <p className="text-xs font-bold tracking-[0.2em] text-[#B48A66] mb-2 uppercase">LEAD STYLIST</p>
                  <h3 className="text-2xl font-bold font-fustat text-white">Kavitha Rajan</h3>
                </div>
              </div>
              
              <div className="lg:col-span-7 space-y-8 lg:pr-12 order-2 lg:order-1">
                <div className="space-y-3">
                  <span className="text-xs font-bold tracking-[0.2em] text-[#B48A66] uppercase">ASSOCIATE & CO-DEVELOPER</span>
                  <h3 className="text-4xl font-bold tracking-tight text-slate-900 font-fustat">Kavitha Rajan</h3>
                  <p className="text-slate-500 text-base font-light">B.Des, Interior Styling — NID | Certified Organic Material Consultant</p>
                </div>
                
                <p className="text-lg text-slate-600 font-light leading-relaxed">
                  Kavitha has over 6 years of experience, specializing in biophilic color composition, organic linen layerings, and curation of eco-responsible decorative assets that make residences feel warm and inviting.
                </p>

                <div className="grid sm:grid-cols-2 gap-8 pt-8 border-t border-slate-200">
                  <div>
                    <h4 className="font-bold text-slate-900 mb-2 font-fustat">Curation Focus</h4>
                    <p className="text-slate-500 text-sm font-light">Sustainable materials, biophilic room setups, color theory curation, fabric layer styles.</p>
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 mb-2 font-fustat">Achievements</h4>
                    <p className="text-slate-500 text-sm font-light">NID B.Des Honors | Certified Organic Paint and Lacquer Assessor.</p>
                  </div>
                </div>

                <blockquote className="border-l-2 border-[#B48A66] pl-6 italic text-slate-500 text-xl font-serif mt-6">
                  &ldquo;Organic textures tell physical stories. Our focus is to make those stories warm and enduring.&rdquo;
                </blockquote>
              </div>
            </div>

          </div>
        </section>

        {/* Process Standards - Matches Services Grid Card Aesthetic */}
        <section className="bg-slate-50 rounded-[2.5rem] border border-slate-100 p-8 md:p-16 lg:p-20 relative overflow-hidden shadow-xs">
          <div className="absolute top-0 right-0 w-[50%] h-[50%] bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-slate-200/50 via-transparent to-transparent pointer-events-none z-0" />
          
          <div className="flex flex-col lg:flex-row gap-16 relative z-10">
            <div className="lg:w-1/3 space-y-6 lg:sticky lg:top-36 self-start">
               <div className="flex items-center gap-2 text-slate-400 text-xs font-semibold uppercase tracking-widest">
                 <span className="w-1.5 h-1.5 rounded-full bg-[#B48A66]" />
                 STUDIO METRICS
               </div>
               <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight font-fustat text-slate-900">
                 Process &amp; <span className="text-[#B48A66]">Technology</span>
               </h2>
               <p className="text-base text-slate-500 font-light leading-relaxed">
                 We leverage detailed digital project tools to ensure materials schedules are locked in and delivery checklists are met perfectly.
               </p>
            </div>
            
            <div className="lg:w-2/3 grid sm:grid-cols-2 gap-6 relative z-10">
               {[
                 { title: "3D & VR Visuals", desc: "Experience precise virtual room layouts, circulation lines, and real wood textures before starting modular execution.", icon: Monitor },
                 { title: "Material Protocol", desc: "We enforce strict sourcing benchmarks, choosing sustainable solid timbers, natural clay, and eco coatings.", icon: Leaf },
                 { title: "Unified Dashboard", desc: "Review real-time project updates, carpentry timelines, and materials schedules directly in your client interface.", icon: CalendarIcon },
                 { title: "Smart Architecture", desc: "We integrate climate systems, structured audio setups, and custom lighting paths early in our structural layouts.", icon: Home }
               ].map((std, i) => (
                 <div key={i} className="bg-white p-8 rounded-3xl border border-slate-100 hover:border-[#B48A66]/30 shadow-xs hover:shadow-md transition-all duration-300 group">
                   <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-[#B48A66] mb-6 border border-slate-100 group-hover:bg-[#B48A66] group-hover:text-white transition-colors duration-500">
                     <std.icon className="w-5 h-5" />
                   </div>
                   <h3 className="text-xl font-bold mb-3 text-slate-900 font-fustat">{std.title}</h3>
                   <p className="text-slate-500 font-light text-sm leading-relaxed">{std.desc}</p>
                 </div>
               ))}
            </div>
          </div>
        </section>

        {/* Why Trust Us Section - Matches FAQ details box structure */}
        <section className="text-center pt-8">
          <div className="mb-20 space-y-4 max-w-2xl mx-auto">
             <div className="flex items-center justify-center gap-2 text-slate-400 text-xs font-semibold uppercase tracking-widest">
               <span className="w-1.5 h-1.5 rounded-full bg-[#B48A66]" />
               OUR COMMITMENT
             </div>
             <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-fustat text-slate-900 tracking-tight">
               Why Clients Trust <span className="text-[#B48A66]">Our Team</span>
             </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16 mt-8 text-left">
             {[
               { num: "01", title: "Multidisciplinary", desc: "Architects, custom carpenters, and interior stylists coordinate seamlessly under a single strategic brief." },
               { num: "02", title: "Full Turnkey Ops", desc: "We manage design, procurement, municipal permissions, and masonry works from first sketch through final handover." },
               { num: "03", title: "Bespoke Space Audits", desc: "We design custom joinery and spatial layouts entirely customized around your daily routine." },
               { num: "04", title: "Operational Sincerity", desc: "We deliver full line-by-line materials lists and transparent carpenter pricing. No unexpected markup lists." },
               { num: "05", title: "Reliable Subcontracting", desc: "We maintain ongoing relationships with high-end artisans and certified installers for execution security." },
               { num: "06", title: "Physical Handover Pack", desc: "We provide physical maintenance guides, material codes, paint references, and appliance contracts at project close." }
             ].map((feature, i) => (
               <div key={i} className="group cursor-default space-y-4">
                  <div className="flex items-center gap-4">
                    <span className="text-[#B48A66] font-mono text-sm opacity-55 group-hover:opacity-100 transition-opacity font-bold">{feature.num}</span>
                    <h3 className="font-bold text-slate-900 text-xl font-fustat group-hover:text-[#B48A66] transition-colors">{feature.title}</h3>
                  </div>
                  <div className="w-full h-px bg-slate-200/80 group-hover:bg-[#B48A66]/30 transition-colors" />
                  <p className="text-slate-500 text-sm font-light leading-relaxed pr-4">{feature.desc}</p>
               </div>
             ))}
          </div>
        </section>

      </div>
    </div>
  );
}
