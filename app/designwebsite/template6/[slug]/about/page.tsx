import { readSourceConfig } from '@/lib/dataBuilder';
import { notFound } from 'next/navigation';
import { Playfair_Display, Lato } from 'next/font/google';
import Link from 'next/link';
import { INTERIOR_HERO_IMAGES } from '@/lib/interiorContent';
import { 
  Smile, Layers, Compass, Scale, Monitor, 
  Leaf, Calendar, Home, Award, Shield, Sparkles 
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

export default async function AboutPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const { slug } = resolvedParams;
  const data = await readSourceConfig(slug, 'template6');
  if (!data) return notFound();

  const { clinic, doctor, doctor2, media } = data;
  const basePath = `/designwebsite/template6/${slug}`;

  const clinicName = clinic?.name || 'Luxe Interiors Studio';
  const leadName = doctor?.name || 'Arjun Mehta';
  const doctorImage = doctor?.images?.[0] || media?.otherImages?.[0] || 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=800&q=80';
  const secondaryImage = doctor2?.images?.[0] || media?.clinicImages?.[1] || media?.otherImages?.[1] || 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80';
  const studioImage = data.about?.heroImage || media?.clinicImages?.[2] || media?.clinicImages?.[0] || INTERIOR_HERO_IMAGES.about || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1200';

  const partnerName = doctor2?.name || 'Kavitha Rajan';
  const partnerRole = doctor2?.role || 'LEAD STYLIST';
  const partnerCredentials = doctor2?.credentials || 'B.Des, Interior Styling — NID | Certified Organic Material Consultant';
  const partnerBio = doctor2?.bio || 'Kavitha has over 6 years of experience, specializing in biophilic color composition, organic linen layerings, and curation of eco-responsible decorative assets that make residences feel warm and inviting.';
  const partnerQuote = doctor2?.quote || 'Organic textures tell physical stories. Our focus is to make those stories warm and enduring.';

  const leadBio = doctor?.bio || `${leadName} founded ${clinicName} in 2015. With over a decade of design experience, he oversees the architectural planning, timber sourcing, and custom furniture frameworks for every residential studio build.`;
  const leadCredentials = doctor?.credentials || 'M.Des, Interior Architecture — NID | B.Arch — Sir J.J. College';
  const leadQuote = doctor?.quote || 'A successful home should function cleanly while highlighting the natural warmth of timber and stone.';
  const leadSpecialization = doctor?.specialization || 'Spatial Planning, Luxury Residential architecture, Custom Carpentry Systems.';
  const visionText = data.about?.vision || 'We shape luxury residential spaces and commercial interiors with high-fidelity planning, selected organic materials, and transparent project operations.';

  return (
    <div className={`${lato.className} bg-[#1a1a1a] text-zinc-300 min-h-screen pb-32`}>
      
      {/* ── FULL-BLEED HERO ─────────────────────────────────────────────── */}
      <section className="relative h-[85vh] overflow-hidden">
        <img
          src={studioImage}
          alt="Studio interior"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/60 to-[#1a1a1a]" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />

        <div className="relative z-10 h-full max-w-7xl mx-auto px-6 flex flex-col justify-end pb-20">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-8 h-[1px] bg-[#c59b72]" />
            <span className="text-[10px] font-bold tracking-[0.35em] text-[#c59b72] uppercase">ESTABLISHED 2015</span>
          </div>
          <h1 className={`${playfair.className} text-5xl sm:text-6xl lg:text-7xl xl:text-8xl text-white leading-none font-light`}>
            About <span className="italic text-zinc-400 font-light">Our Studio</span><br />
            &amp; Vision
          </h1>
        </div>
      </section>

      {/* ── MISSION PARAGRAPH ────────────────────────────────────────────── */}
      <section id="mission-statement" className="max-w-7xl mx-auto px-6 py-28 border-b border-white/5 relative z-10">
        <div className="grid lg:grid-cols-12 gap-16 items-center">
          <div className="lg:col-span-4">
            <span className={`${playfair.className} text-[120px] leading-none text-white/5 font-bold select-none block -mt-8`}>01</span>
            <div className="flex items-center gap-3 mt-4">
              <div className="w-6 h-[1px] bg-zinc-600" />
              <span className="text-[10px] font-bold tracking-[0.3em] text-zinc-500 uppercase">Our Sincerity</span>
            </div>
          </div>
          <div className="lg:col-span-8">
            <p className="text-zinc-400 font-light leading-loose text-base md:text-lg">
              {visionText}
            </p>
          </div>
        </div>
      </section>

      {/* ── JOURNEY TIMELINE ─────────────────────────────────────────────── */}
      <section className="bg-[#121212] py-28 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-12 gap-16">
            <div className="lg:col-span-4 space-y-6">
              <span className={`${playfair.className} text-[120px] leading-none text-white/5 font-bold select-none block -mt-8`}>02</span>
              <div className="flex items-center gap-3">
                <div className="w-6 h-[1px] bg-[#c59b72]" />
                <span className="text-[10px] font-bold tracking-[0.3em] text-[#c59b72] uppercase">Our Journey</span>
              </div>
              <h2 className={`${playfair.className} text-4xl text-white font-light leading-tight`}>
                The Story <span className="italic text-zinc-400 font-light">So Far</span>
              </h2>
              <p className="text-zinc-500 font-light text-sm leading-relaxed">
                From a small boutique studio to an industry partner for premium turnkey renovations, our commitment to craft has never wavered.
              </p>
            </div>
            
            <div className="lg:col-span-8 space-y-4">
              {[
                { year: "2015", title: "Inception", desc: `${clinicName} was established to deliver luxury-grade interior architecture with a deep respect for natural materials and client lifestyle requirements.` },
                { year: "2018", title: "In-House 3D & Sourcing", desc: "Expanded our operations, adding a specialized 3D studio and partnering with premium carpenters to execute custom furniture details directly." },
                { year: "2021", title: "Green protocol Integration", desc: "Introduced smart planning software and committed to a rigorous biophilic design framework using low-VOC coatings and timber." },
                { year: "TODAY", title: "High-End Residential Leader", desc: "Managing comprehensive residential design and commercial renovations nationwide, recognized for timeless, warm minimal rooms." }
              ].map((milestone, i) => (
                <div key={i} className={`grid grid-cols-12 gap-8 py-10 ${i < 3 ? 'border-b border-white/5' : ''} group`}>
                  <div className="col-span-3 md:col-span-2">
                    <span className="font-mono text-sm text-[#c59b72] tracking-widest font-bold">{milestone.year}</span>
                  </div>
                  <div className="col-span-9 md:col-span-10 space-y-3">
                    <h3 className={`${playfair.className} text-xl text-white group-hover:text-[#c59b72] transition-colors`}>{milestone.title}</h3>
                    <p className="text-zinc-500 font-light text-sm leading-loose group-hover:text-zinc-400 transition-colors">{milestone.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── PHILOSOPHY PILLARS ────────────────────────────────────────────── */}
      <section className="py-28 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-20 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-6 h-[1px] bg-zinc-600" />
                <span className="text-[10px] font-bold tracking-[0.3em] text-zinc-500 uppercase">Our Philosophy</span>
              </div>
              <h2 className={`${playfair.className} text-4xl md:text-5xl text-white font-light`}>
                How We <span className="italic text-zinc-400 font-light">Design</span> Spaces
              </h2>
            </div>
            <p className="text-zinc-500 font-light text-sm max-w-md leading-loose">
              A comprehensive blueprint paradigm built on client empathy, tactile material sourcing, and operational integrity that protects your timeline and budget.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-0 border border-white/5">
            {[
              { num: "01", title: "Empathy", desc: "We study how your family circulates and lives, shaping storage and space planning around physical realities.", icon: Smile },
              { num: "02", title: "Tactile Materials", desc: "We curate natural stone, real timber, and organic linens that gain elegant character instead of wearing out.", icon: Layers },
              { num: "03", title: "Precision Blueprints", desc: "Step inside high-fidelity 3D modeling blocks to lock in costing parameters before starting any construction.", icon: Compass },
              { num: "04", title: "Strict Integrity", desc: "We maintain transparent project spreadsheets and clear communication lists for full client convenience.", icon: Scale }
            ].map((phil, i) => (
              <div 
                key={i} 
                className={`p-10 flex flex-col justify-between group hover:bg-[#121212] transition-all duration-500 border-white/5 ${
                  i < 3 ? 'lg:border-r' : ''
                } ${i < 2 ? 'md:border-b lg:border-b-0' : ''}`}
              >
                <div className="space-y-8 relative">
                  <span className={`${playfair.className} absolute -top-6 -right-6 text-7xl font-black text-white/5 group-hover:text-[#c59b72]/5 select-none pointer-events-none transition-colors font-fustat`}>{phil.num}</span>
                  <div className="w-10 h-10 bg-white/5 border border-white/10 flex items-center justify-center text-[#c59b72] group-hover:bg-[#c59b72] group-hover:text-black transition-colors duration-500 shadow-3xs">
                    <phil.icon className="w-4.5 h-4.5" />
                  </div>
                  <h3 className={`${playfair.className} text-xl text-white group-hover:text-[#c59b72] transition-colors`}>{phil.title}</h3>
                  <p className="text-zinc-500 font-light text-xs leading-loose pr-2">{phil.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TEAM LEADERS ─────────────────────────────────────────────────── */}
      <section className="py-28 bg-[#121212] border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-24 space-y-4">
            <div className="inline-flex items-center justify-center gap-4">
              <div className="w-12 h-[1px] bg-[#c59b72]"></div>
              <span className="text-[10px] font-bold tracking-[0.35em] text-[#c59b72] uppercase">Creative Vision</span>
            </div>
            <h2 className={`${playfair.className} text-4xl md:text-5xl text-white font-light`}>
              Meet The <span className="italic text-zinc-400 font-light">Design</span> Leaders
            </h2>
          </div>

          <div className="space-y-36">
            
            {/* Leader 1: Arjun Mehta */}
            <div className="grid lg:grid-cols-12 gap-16 items-center">
              <div className="lg:col-span-5 relative">
                <div className="aspect-[3/4] overflow-hidden border border-white/10">
                  <img 
                    src={doctorImage} 
                    alt={leadName} 
                    className="w-full h-full object-cover opacity-80 transition-all duration-1000" 
                  />
                </div>
                <div className="absolute -bottom-6 -right-6 lg:-right-10 bg-[#1a1a1a] border border-white/10 p-6 md:p-8 shadow-2xl">
                  <p className="text-[9px] font-bold tracking-[0.25em] text-[#c59b72] mb-1.5 uppercase">PRINCIPAL DESIGNER</p>
                  <h3 className={`${playfair.className} text-2xl text-white font-light`}>{leadName}</h3>
                </div>
              </div>
              
              <div className="lg:col-span-7 space-y-8 lg:pl-12">
                <div className="space-y-3">
                  <span className="text-[10px] font-bold tracking-[0.25em] text-zinc-500 uppercase block">FOUNDER & VISION LEAD</span>
                  <h3 className={`${playfair.className} text-4xl text-white font-light`}>{leadName}</h3>
                  <p className="text-zinc-500 text-sm font-light">{leadCredentials}</p>
                </div>
                
                <p className="text-zinc-400 font-light leading-loose text-sm md:text-base">
                  {leadBio}
                </p>

                <div className="grid sm:grid-cols-2 gap-8 pt-8 border-t border-white/10">
                  <div className="space-y-1">
                    <h4 className={`${playfair.className} text-lg text-white font-light`}>Expertise Core</h4>
                    <p className="text-zinc-500 text-xs font-light leading-relaxed">{leadSpecialization}</p>
                  </div>
                  <div className="space-y-1">
                    <h4 className={`${playfair.className} text-lg text-white font-light`}>Credentials</h4>
                    <p className="text-zinc-500 text-xs font-light leading-relaxed">{leadCredentials}</p>
                  </div>
                </div>

                <blockquote className={`${playfair.className} border-l border-[#c59b72] pl-6 italic text-zinc-400 text-lg font-light`}>
                  &ldquo;{leadQuote}&rdquo;
                </blockquote>
              </div>
            </div>

            {/* Leader 2: Kavitha Rajan */}
            <div className="grid lg:grid-cols-12 gap-16 items-center">
              <div className="lg:col-span-5 relative order-1 lg:order-2">
                <div className="aspect-[3/4] overflow-hidden border border-white/10">
                  <img 
                    src={secondaryImage} 
                    alt={partnerName} 
                    className="w-full h-full object-cover opacity-80 transition-all duration-1000" 
                  />
                </div>
                <div className="absolute -bottom-6 -left-6 lg:-left-10 bg-[#1a1a1a] border border-white/10 p-6 md:p-8 shadow-2xl">
                  <p className="text-[9px] font-bold tracking-[0.25em] text-[#c59b72] mb-1.5 uppercase">{partnerRole}</p>
                  <h3 className={`${playfair.className} text-2xl text-white font-light`}>{partnerName}</h3>
                </div>
              </div>
              
              <div className="lg:col-span-7 space-y-8 lg:pr-12 order-2 lg:order-1">
                <div className="space-y-3">
                  <span className="text-[10px] font-bold tracking-[0.25em] text-zinc-500 uppercase block">{partnerRole}</span>
                  <h3 className={`${playfair.className} text-4xl text-white font-light`}>{partnerName}</h3>
                  <p className="text-zinc-500 text-sm font-light">{partnerCredentials}</p>
                </div>
                
                <p className="text-zinc-400 font-light leading-loose text-sm md:text-base">
                  {partnerBio}
                </p>

                <div className="grid sm:grid-cols-2 gap-8 pt-8 border-t border-white/10">
                  <div className="space-y-1">
                    <h4 className={`${playfair.className} text-lg text-white font-light`}>Curation Focus</h4>
                    <p className="text-zinc-500 text-xs font-light leading-relaxed">Sustainable materials, biophilic room setups, color theory curation, fabric layer styles.</p>
                  </div>
                  <div className="space-y-1">
                    <h4 className={`${playfair.className} text-lg text-white font-light`}>Achievements</h4>
                    <p className="text-zinc-500 text-xs font-light leading-relaxed">NID B.Des Honors | Certified Organic Paint and Lacquer Assessor.</p>
                  </div>
                </div>

                <blockquote className={`${playfair.className} border-l border-[#c59b72] pl-6 italic text-zinc-400 text-lg font-light`}>
                  &ldquo;{partnerQuote}&rdquo;
                </blockquote>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── PROCESS & TECHNOLOGY ─────────────────────────────────────────── */}
      <section className="py-28 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-12 gap-16">
            <div className="lg:col-span-4 space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-6 h-[1px] bg-[#c59b72]" />
                <span className="text-[10px] font-bold tracking-[0.3em] text-[#c59b72] uppercase">Studio Metrics</span>
              </div>
              <h2 className={`${playfair.className} text-4xl text-white font-light leading-tight`}>
                Process &amp; <span className="italic text-zinc-400 font-light">Technology</span>
              </h2>
              <p className="text-zinc-500 font-light text-sm leading-relaxed">
                We leverage detailed digital project tools to ensure materials schedules are locked in and delivery checklists are met perfectly.
              </p>
            </div>
            
            <div className="lg:col-span-8 grid sm:grid-cols-2 gap-6">
               {[
                 { title: "3D & VR Visuals", desc: "Experience precise virtual room layouts, circulation lines, and real wood textures before starting modular execution.", icon: Monitor },
                 { title: "Material Protocol", desc: "We enforce strict sourcing benchmarks, choosing sustainable solid timbers, natural clay, and eco coatings.", icon: Leaf },
                 { title: "Unified Dashboard", desc: "Review real-time project updates, carpentry timelines, and materials schedules directly in your client interface.", icon: Calendar },
                 { title: "Smart Architecture", desc: "We integrate climate systems, structured audio setups, and custom lighting paths early in our structural layouts.", icon: Home }
               ].map((std, i) => (
                 <div key={i} className="bg-[#121212] p-8 border border-white/5 hover:border-[#c59b72]/30 transition-all duration-300 group">
                   <div className="w-10 h-10 bg-white/5 border border-white/10 flex items-center justify-center text-[#c59b72] mb-6 group-hover:bg-[#c59b72] group-hover:text-black transition-colors duration-500">
                     <std.icon className="w-4.5 h-4.5" />
                   </div>
                   <h3 className={`${playfair.className} text-xl text-white mb-3 font-light`}>{std.title}</h3>
                   <p className="text-zinc-500 font-light text-xs leading-loose">{std.desc}</p>
                 </div>
               ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── WHY TRUST US ─────────────────────────────────────────────────── */}
      <section className="py-28 bg-[#121212]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-20 text-center space-y-4">
             <div className="inline-flex items-center gap-4">
               <div className="w-12 h-[1px] bg-[#c59b72]"></div>
               <span className="text-[10px] font-bold tracking-[0.35em] text-[#c59b72] uppercase">Our Commitment</span>
             </div>
             <h2 className={`${playfair.className} text-4xl md:text-5xl text-white font-light`}>
               Why Clients Trust <span className="italic text-zinc-400 font-light">Our Team</span>
             </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-16 mt-8">
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
                    <span className="text-[#c59b72] font-mono text-xs opacity-50 group-hover:opacity-100 transition-opacity font-bold">{feature.num}</span>
                    <h3 className={`${playfair.className} font-light text-white text-xl group-hover:text-[#c59b72] transition-colors`}>{feature.title}</h3>
                  </div>
                  <div className="w-full h-[1px] bg-white/5 group-hover:bg-[#c59b72]/20 transition-colors" />
                  <p className="text-zinc-500 text-xs font-light leading-loose pr-4 group-hover:text-zinc-400 transition-colors">{feature.desc}</p>
                </div>
             ))}
          </div>
        </div>
      </section>

    </div>
  );
}
