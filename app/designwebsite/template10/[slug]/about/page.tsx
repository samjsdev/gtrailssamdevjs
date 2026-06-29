import { readSourceConfig } from '@/lib/dataBuilder';
import { notFound } from 'next/navigation';
import { Archivo_Black, Inter } from 'next/font/google';
import Link from 'next/link';
import { 
  Smile, Layers, Compass, Scale, Monitor, 
  Leaf, Calendar, Home, Award, Shield, Hammer, Ruler, Palette
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

export default async function AboutPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const { slug } = resolvedParams;
  const data = await readSourceConfig(slug, 'template10');
  if (!data) return notFound();

  const { clinic, doctor, media } = data;
  const basePath = `/designwebsite/template10/${slug}`;

  const clinicName = clinic?.name || 'Loft Studio';
  const leadName = doctor?.name || 'Arjun Mehta';
  const doctorImage = media?.otherImages?.[0] || 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=2000&q=80';
  const secondaryImage = media?.otherImages?.[1] || 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=2000&q=80';
  const aboutHeroImage = media?.clinicImages?.[1] || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2000&q=80';

  const visionQuote = data.about?.vision || 'We shape raw architectural volumes with industrial steel frames, biophilic zoning layouts, and transparent carpenter coordination for total operational honesty.';
  const founderBio = data.doctor?.bio || `${leadName} founded ${clinicName} in 2015. With over a decade of design experience, he oversees the architectural planning, timber sourcing, and custom furniture frameworks for every residential studio build.`;
  
  const partnerName = data.doctor2?.name || 'Kavitha Rajan';
  const partnerRole = data.doctor2?.role || 'LEAD STYLIST';
  const partnerCredentials = data.doctor2?.credentials || 'B.Des, Interior Styling — NID | Certified Organic Material Consultant';
  const partnerBio = data.doctor2?.bio || 'Kavitha has over 6 years of experience, specializing in biophilic color composition, organic linen layerings, and curation of eco-responsible decorative assets that make residences feel warm and inviting.';

  return (
    <div className={`${inter.className} bg-[#1E2022] text-[#F4F1DE] min-h-screen pb-32 selection:bg-[#E07A5F] selection:text-white`}>
      
      {/* ── HERO BANNER ─────────────────────────────────────────────────── */}
      <section className="relative min-h-[50vh] flex flex-col justify-end pb-16 px-8 border-b-2 border-[#E07A5F] bg-[#141517]">
        <div className="absolute inset-0 z-0 opacity-20">
          <img
            src={aboutHeroImage}
            alt="Raw warehouse skeleton"
            className="w-full h-full object-cover grayscale"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#141517] to-transparent"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto w-full space-y-4">
          <span className="text-xs font-bold text-[#E07A5F] tracking-[0.25em] uppercase bg-white/5 border border-white/10 px-3 py-1">
            ESTABLISHED 2015
          </span>
          <h1 className={`${archivo.className} text-4xl sm:text-5xl lg:text-7xl text-white uppercase leading-[1.05]`}>
            Meet The <br />
            <span className="text-[#E07A5F]">Fabricators</span>
          </h1>
        </div>
      </section>

      {/* ── MISSION CALLOUT ──────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-8 py-24 border-b border-white/5">
        <div className="grid lg:grid-cols-12 gap-16 items-center">
          <div className="lg:col-span-4">
            <span className="text-xs font-bold text-[#E07A5F] tracking-[0.2em] uppercase bg-white/5 border border-white/10 px-3 py-1">
              OUR PARAMETERS
            </span>
          </div>
          <div className="lg:col-span-8">
            <p className="text-xl text-slate-300 font-light leading-relaxed">
              {visionQuote}
            </p>
          </div>
        </div>
      </section>

      {/* ── CHRONOLOGY TIMELINE ─────────────────────────────────────────── */}
      <section className="bg-[#141517] py-24 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-8">
          <div className="grid lg:grid-cols-12 gap-16">
            <div className="lg:col-span-4 space-y-6">
              <span className="text-xs font-bold text-[#E07A5F] tracking-[0.2em] uppercase bg-white/5 border border-white/10 px-3 py-1 block w-fit">
                CHRONOLOGY LOG
              </span>
              <h2 className={`${archivo.className} text-3xl md:text-4xl text-white uppercase`}>
                Timeline <br />
                <span className="text-[#E07A5F]">Of Shells</span>
              </h2>
              <p className="text-slate-400 font-light text-sm leading-relaxed max-w-sm">
                From a small welding garage to an industry lead in turnkey concrete lofts, we follow strict build parameters.
              </p>
            </div>
            
            <div className="lg:col-span-8 space-y-4">
              {[
                { year: "2015", title: "Raw Inception", desc: `${clinicName} was founded in a small metal fabrication garage. We committed early to exposed masonry structures, black steel columns, and timber carpentry.` },
                { year: "2018", title: "Timber & Slab Sourcing", desc: "Expanded operations by partnering directly with local stone quarries and timber yards to source heavy planks and custom concrete aggregate directly." },
                { year: "2021", title: "Biophilic Conduit Setup", desc: "Introduced smart zoning layouts and committed to biophilic systems including organic low-VOC concrete sealants and internal steel air channels." },
                { year: "TODAY", title: "Industrial Turnkey Leaders", desc: "Supervising comprehensive residential renovations and boutique workspace conversions nationwide, recognized for warm, structural homes." }
              ].map((milestone, i) => (
                <div key={i} className={`grid grid-cols-12 gap-8 py-8 ${i < 3 ? 'border-b border-white/5' : ''} group`}>
                  <div className="col-span-3 md:col-span-2">
                    <span className={`${archivo.className} text-lg text-[#E07A5F] tracking-wider block`}>{milestone.year}</span>
                  </div>
                  <div className="col-span-9 md:col-span-10 space-y-2">
                    <h3 className={`${archivo.className} text-base text-white uppercase`}>{milestone.title}</h3>
                    <p className="text-slate-400 font-light text-sm leading-relaxed">{milestone.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── ZONING PILLARS (PHILOSOPHY) ──────────────────────────────────── */}
      <section className="py-24 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-8">
          <div className="mb-20 flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div className="space-y-4">
              <span className="text-xs font-bold text-[#E07A5F] tracking-[0.2em] uppercase bg-white/5 border border-white/10 px-3 py-1">
                ZONING PILLARS
              </span>
              <h2 className={`${archivo.className} text-3xl md:text-5xl text-white uppercase`}>
                How We <span className="text-[#E07A5F]">ZONING</span> Shells
              </h2>
            </div>
            <p className="text-slate-400 font-light text-sm max-w-sm leading-relaxed">
              We apply modular concrete guidelines, layout boundaries, and full pricing spreadsheets to every project shell.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { num: "01", title: "Empathy", desc: "We study how your family circulates and lives, shaping storage and space planning around physical realities.", icon: Smile },
              { num: "02", title: "Tactile Materials", desc: "We curate natural stone, real timber, and organic linens that gain elegant character instead of wearing out.", icon: Layers },
              { num: "03", title: "Precision Blueprints", desc: "Step inside high-fidelity 3D modeling blocks to lock in costing parameters before starting any construction.", icon: Compass },
              { num: "04", title: "Strict Integrity", desc: "We maintain transparent project spreadsheets and clear communication lists for full client convenience.", icon: Scale }
            ].map((phil, i) => (
              <div 
                key={i} 
                className="bg-[#141517] p-8 border border-white/10 flex flex-col justify-between group hover:border-[#E07A5F] transition-all duration-300"
              >
                <div className="space-y-6">
                  <div className="w-10 h-10 bg-white/5 border border-white/10 flex items-center justify-center text-[#E07A5F] group-hover:bg-[#E07A5F] group-hover:text-white transition-colors duration-300">
                    <phil.icon className="w-4 h-4" />
                  </div>
                  <h3 className={`${archivo.className} text-base text-white uppercase`}>{phil.title}</h3>
                  <p className="text-slate-400 font-light text-xs leading-relaxed">{phil.desc}</p>
                </div>
                <div className="mt-8 text-xs font-mono text-[#E07A5F] font-bold">PILLAR {phil.num}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TEAM LEADERS ─────────────────────────────────────────────────── */}
      <section className="py-24 bg-[#141517] border-b border-white/10">
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center mb-24 space-y-4">
            <span className="text-xs font-bold text-[#E07A5F] tracking-[0.25em] uppercase bg-white/5 border border-white/10 px-3 py-1">
              STUDIO FABRICATORS
            </span>
            <h2 className={`${archivo.className} text-3xl md:text-5xl text-white uppercase`}>
              The Design <span className="text-[#E07A5F]">Directors</span>
            </h2>
          </div>

          <div className="space-y-36">
            
            {/* Leader 1: Arjun Mehta */}
            <div className="grid lg:grid-cols-12 gap-16 items-center">
              <div className="lg:col-span-5 relative border border-white/10 p-2 bg-[#1E2022]">
                <img 
                  src={doctorImage} 
                  alt={leadName} 
                  className="w-full aspect-[3/4] object-cover grayscale opacity-90 hover:grayscale-0 transition-all duration-700" 
                />
                <div className="absolute -bottom-6 -right-4 bg-[#E07A5F] text-white p-6 border border-white/10 shadow-2xl">
                  <p className="text-[9px] font-bold tracking-[0.2em] text-white mb-1 uppercase">PRINCIPAL DESIGNER</p>
                  <h3 className={`${archivo.className} text-lg text-white`}>{leadName}</h3>
                </div>
              </div>
              
              <div className="lg:col-span-7 space-y-6 lg:pl-12">
                <div className="space-y-2">
                  <span className="text-xs font-bold text-[#E07A5F] tracking-[0.2em] uppercase">FOUNDER & VISION LEAD</span>
                  <h3 className={`${archivo.className} text-3xl text-white uppercase`}>{leadName}</h3>
                  <p className="text-slate-400 text-xs font-light font-mono">M.Des, Interior Architecture — NID | B.Arch — Sir J.J. College</p>
                </div>
                
                <p className="text-slate-300 font-light leading-relaxed text-sm">
                  {founderBio}
                </p>

                <div className="grid sm:grid-cols-2 gap-6 pt-6 border-t border-white/10">
                  <div className="space-y-1">
                    <h4 className={`${archivo.className} text-sm text-white uppercase`}>Expertise Core</h4>
                    <p className="text-slate-400 text-xs font-light">Spatial Planning, Luxury Residential architecture, Custom Carpentry Systems.</p>
                  </div>
                  <div className="space-y-1">
                    <h4 className={`${archivo.className} text-sm text-white uppercase`}>Credentials</h4>
                    <p className="text-slate-400 text-xs font-light">M.Des, National Institute of Design | B.Arch, Sir J.J. College.</p>
                  </div>
                </div>

                <blockquote className="border-l-4 border-[#E07A5F] pl-6 italic text-slate-300 text-base font-light">
                  &ldquo;A successful home should function cleanly while highlighting the natural warmth of timber and stone.&rdquo;
                </blockquote>
              </div>
            </div>

            {/* Leader 2: Kavitha Rajan */}
            <div className="grid lg:grid-cols-12 gap-16 items-center">
              <div className="lg:col-span-5 relative order-1 lg:order-2 border border-white/10 p-2 bg-[#1E2022]">
                <img 
                  src={secondaryImage} 
                  alt={partnerName} 
                  className="w-full aspect-[3/4] object-cover grayscale opacity-90 hover:grayscale-0 transition-all duration-700" 
                />
                <div className="absolute -bottom-6 -left-4 bg-[#E07A5F] text-white p-6 border border-white/10 shadow-2xl">
                  <p className="text-[9px] font-bold tracking-[0.2em] text-white mb-1 uppercase">{partnerRole}</p>
                  <h3 className={`${archivo.className} text-lg text-white`}>{partnerName}</h3>
                </div>
              </div>
              
              <div className="lg:col-span-7 space-y-6 lg:pr-12 order-2 lg:order-1">
                <div className="space-y-2">
                  <span className="text-xs font-bold text-[#E07A5F] tracking-[0.2em] uppercase">ASSOCIATE & CO-DEVELOPER</span>
                  <h3 className={`${archivo.className} text-3xl text-white uppercase`}>{partnerName}</h3>
                  <p className="text-slate-400 text-xs font-light font-mono">{partnerCredentials}</p>
                </div>
                
                <p className="text-slate-300 font-light leading-relaxed text-sm">
                  {partnerBio}
                </p>

                <div className="grid sm:grid-cols-2 gap-6 pt-6 border-t border-white/10">
                  <div className="space-y-1">
                    <h4 className={`${archivo.className} text-sm text-white uppercase`}>Curation Focus</h4>
                    <p className="text-slate-400 text-xs font-light">Sustainable materials, biophilic room setups, color theory curation, fabric layer styles.</p>
                  </div>
                  <div className="space-y-1">
                    <h4 className={`${archivo.className} text-sm text-white uppercase`}>Achievements</h4>
                    <p className="text-slate-400 text-xs font-light">NID B.Des Honors | Certified Organic Paint and Lacquer Assessor.</p>
                  </div>
                </div>

                <blockquote className="border-l-4 border-[#E07A5F] pl-6 italic text-slate-300 text-base font-light">
                  &ldquo;Organic textures tell physical stories. Our focus is to make those stories warm and enduring.&rdquo;
                </blockquote>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── PROCESS & TECHNOLOGY ─────────────────────────────────────────── */}
      <section className="py-24 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-8">
          <div className="grid lg:grid-cols-12 gap-16">
            <div className="lg:col-span-4 space-y-6">
              <span className="text-xs font-bold text-[#E07A5F] tracking-[0.2em] uppercase bg-white/5 border border-white/10 px-3 py-1 block w-fit">
                STUDIO METRICS
              </span>
              <h2 className={`${archivo.className} text-3xl text-white uppercase leading-tight`}>
                Process &amp; <br />
                <span className="text-[#E07A5F]">Technology</span>
              </h2>
              <p className="text-slate-400 font-light text-sm leading-relaxed">
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
                 <div key={i} className="bg-[#141517] p-8 border border-white/10 hover:border-[#E07A5F] transition-all duration-300 group">
                   <div className="w-10 h-10 bg-white/5 border border-white/10 flex items-center justify-center text-[#E07A5F] mb-6 group-hover:bg-[#E07A5F] group-hover:text-white transition-colors duration-300">
                     <std.icon className="w-4.5 h-4.5" />
                   </div>
                   <h3 className={`${archivo.className} text-base text-white uppercase mb-3`}>{std.title}</h3>
                   <p className="text-slate-400 font-light text-xs leading-relaxed">{std.desc}</p>
                 </div>
               ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── WHY TRUST US ─────────────────────────────────────────────────── */}
      <section className="py-24 bg-[#141517]">
        <div className="max-w-7xl mx-auto px-8">
          <div className="mb-20 text-center space-y-4">
             <span className="text-xs font-bold text-[#E07A5F] tracking-[0.25em] uppercase bg-white/5 border border-white/10 px-3 py-1">
               METRIC TRUST
             </span>
             <h2 className={`${archivo.className} text-3xl md:text-5xl text-white uppercase`}>
               Why Loft Owners <span className="text-[#E07A5F]">Trust Us</span>
             </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-16 mt-8">
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
                    <span className="text-[#E07A5F] font-mono text-xs opacity-50 group-hover:opacity-100 transition-opacity font-bold">{feature.num}</span>
                    <h3 className={`${archivo.className} text-base text-white uppercase`}>{feature.title}</h3>
                  </div>
                  <div className="w-full h-[1px] bg-white/10 group-hover:bg-[#E07A5F]/35 transition-colors" />
                  <p className="text-slate-400 text-xs font-light leading-relaxed pr-4">{feature.desc}</p>
                </div>
             ))}
          </div>
        </div>
      </section>

    </div>
  );
}
