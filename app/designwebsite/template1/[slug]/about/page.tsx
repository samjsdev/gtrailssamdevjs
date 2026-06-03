import { readSourceConfig } from '@/lib/dataBuilder';
import { notFound } from 'next/navigation';
import { 
  Monitor, Leaf, CalendarIcon, Home, 
  Award, Compass, Eye, Layers, Smile, Scale, Star,
  Shield, Sparkles, CheckCircle2, ArrowUpRight, Plus, Minus,
  ChevronRight, Ruler, Palette, Hammer
} from 'lucide-react';
import { cleanClinicName, cleanClinicDescription } from '@/lib/copyCleaner';

type PageProps = {
  params: Promise<{ slug: string }>;
};

export default async function AboutPage({ params }: PageProps) {
  const resolvedParams = await params;
  const { slug } = resolvedParams;
  const basePath = `/designwebsite/template1/${slug}`;

  const data = await readSourceConfig(slug, 'template1');
  if (!data) return notFound();

  const { clinic, doctor, media } = data;
  
  const cleanName = cleanClinicName(clinic.name);
  const cleanDesc = cleanClinicDescription(clinic.description, clinic.name);
  
  const founderName = doctor.name || 'Arjun Mehta';
  const founderImage = media.otherImages?.[0] || 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=800&q=80';
  const secondaryImage = media.otherImages?.[1] || 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80';

  // Dynamic overrides from data config
  const visionQuote = data.about?.vision || 'We shape luxury residential spaces and commercial interiors with high-fidelity spatial planning, sustainable material curation, and strict operational integrity.';
  const aboutHeroImage = data.about?.heroImage || media.clinicImages?.[1] || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1200';
  
  const founderBio = data.doctor?.bio || `${founderName} founded ${cleanName || 'our studio'} in 2015. With over a decade of design experience, he oversees the architectural planning, timber sourcing, and custom furniture frameworks for every residential studio build.`;
  
  const partnerName = data.doctor2?.name || 'Kavitha Rajan';
  const partnerRole = data.doctor2?.role || 'ASSOCIATE PARTNER';
  const partnerCredentials = data.doctor2?.credentials || 'B.Des, Interior Styling — NID | Certified Organic Material Consultant';
  const partnerBio = data.doctor2?.bio || 'Kavitha has over 6 years of experience, specializing in biophilic color composition, organic linen layerings, and curation of eco-responsible decorative assets that make residences feel warm and inviting.';

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
      <section className="relative pt-32 pb-12 z-10 max-w-[90rem] mx-auto px-4 sm:px-8 md:px-16 lg:px-24">
        <div className="grid lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-[#0A0A0A]"></span>
              <span className="text-[11px] font-bold text-[#0A0A0A] tracking-[0.25em] uppercase">OUR HERITAGE</span>
            </div>
            
            <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl font-light tracking-tight leading-[1.05] text-[#0A0A0A]">
              About <span className="italic font-normal text-[#0A0A0A]/70 inline-block relative">Our Studio<span className="absolute bottom-2 left-0 w-full h-1 bg-[#C1FF72] -z-10"></span></span> &amp; Vision
            </h1>
          </div>
          
          <div className="lg:col-span-5 space-y-6 lg:pt-10">
            <p className="text-lg md:text-xl text-[#0A0A0A]/70 font-normal leading-relaxed border-l-2 border-[#C1FF72] pl-6 italic">
              &ldquo;{visionQuote}&rdquo;
            </p>
          </div>
        </div>

        {/* Hero Image */}
        <div className="relative max-w-7xl mx-auto mt-8 sm:mt-16 group">
          <div className="absolute -inset-4 border border-[#0A0A0A]/10 rounded-[2.5rem] transform rotate-1 -z-10 group-hover:rotate-0 transition-transform duration-700 hidden sm:block"></div>
          <div className="relative aspect-[16/10] md:aspect-[21/9] rounded-[1.5rem] sm:rounded-[2.5rem] overflow-hidden border border-[#0A0A0A]/10 bg-white shadow-2xl">
            <img
              src={aboutHeroImage}
              alt="Modern studio architectural layout"
              className="w-full h-full object-cover transition-transform duration-[2000ms]"
            />
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="max-w-[90rem] mx-auto px-8 md:px-16 lg:px-24 relative z-10">
        <div className="h-px bg-[#0A0A0A]/10 w-full" />
      </div>

      {/* ─── TEAM — Side-by-side balanced cards ─── */}
      <section className="max-w-[90rem] mx-auto px-8 md:px-16 lg:px-24 relative z-10 space-y-16">
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <div className="flex items-center justify-center gap-2 text-[#0A0A0A]/70 text-[11px] font-bold uppercase tracking-widest">
            <span className="w-1.5 h-1.5 rounded-full bg-[#0A0A0A]" />
            CREATIVE LEADERSHIP
          </div>
          <h2 className="font-serif text-4xl sm:text-5xl font-light text-[#0A0A0A] tracking-tight">
            Meet Our <span className="italic font-normal text-[#0A0A0A]/70">Design Leaders</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-12 lg:gap-16">
          {/* Team Member 1 */}
          <div className="bg-white rounded-[2.5rem] border border-[#0A0A0A]/10 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 group">
            {/* Portrait */}
            <div className="relative aspect-[4/5] overflow-hidden">
              <img 
                src={founderImage} 
                alt={founderName} 
                className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/50 via-transparent to-transparent"></div>
              <div className="absolute bottom-6 left-6 right-6">
                <p className="text-[11px] font-bold tracking-[0.2em] text-[#C1FF72] mb-1.5 uppercase">PRINCIPAL ARCHITECT</p>
                <h3 className="font-serif text-2xl text-white font-normal tracking-wide">{founderName}</h3>
              </div>
            </div>
            
            {/* Bio */}
            <div className="p-8 lg:p-10 space-y-5">
              <div className="space-y-1.5">
                <span className="text-[11px] font-bold tracking-[0.2em] text-[#0A0A0A]/60 uppercase">FOUNDER & VISION LEAD</span>
                <p className="text-[14px] font-bold text-[#0A0A0A]">M.Des, Interior Architecture — NID | B.Arch — Sir J.J. College</p>
              </div>
              
              <p className="text-[15px] text-[#0A0A0A]/70 font-normal leading-relaxed">
                {founderBio}
              </p>

              <div className="grid grid-cols-2 gap-6 pt-5 border-t border-[#0A0A0A]/10">
                <div className="space-y-1.5">
                  <h4 className="font-serif text-base font-bold text-[#0A0A0A]">Expertise Core</h4>
                  <p className="text-[14px] text-[#0A0A0A]/70 leading-relaxed">Spatial Planning, Luxury Residential architecture, Custom Carpentry Systems.</p>
                </div>
                <div className="space-y-1.5">
                  <h4 className="font-serif text-base font-bold text-[#0A0A0A]">Credentials</h4>
                  <p className="text-[14px] text-[#0A0A0A]/70 leading-relaxed">M.Des, National Institute of Design | B.Arch, Sir J.J. College.</p>
                </div>
              </div>

              <blockquote className="border-l-2 border-[#C1FF72] pl-5 italic text-[#0A0A0A]/70 text-base font-serif mt-4">
                &ldquo;A successful home should function cleanly while highlighting the natural warmth of timber and stone.&rdquo;
              </blockquote>
            </div>
          </div>

          {/* Team Member 2 */}
          <div className="bg-white rounded-[2.5rem] border border-[#0A0A0A]/10 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 group">
            {/* Portrait */}
            <div className="relative aspect-[4/5] overflow-hidden">
              <img 
                src={secondaryImage} 
                alt={partnerName} 
                className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/50 via-transparent to-transparent"></div>
              <div className="absolute bottom-6 left-6 right-6">
                <p className="text-[11px] font-bold tracking-[0.2em] text-[#C1FF72] mb-1.5 uppercase">{partnerRole}</p>
                <h3 className="font-serif text-2xl text-white font-normal tracking-wide">{partnerName}</h3>
              </div>
            </div>
            
            {/* Bio */}
            <div className="p-8 lg:p-10 space-y-5">
              <div className="space-y-1.5">
                <span className="text-[11px] font-bold tracking-[0.2em] text-[#0A0A0A]/60 uppercase">CO-DEVELOPER & STYLIST</span>
                <p className="text-[14px] font-bold text-[#0A0A0A]">{partnerCredentials}</p>
              </div>
              
              <p className="text-[15px] text-[#0A0A0A]/70 font-normal leading-relaxed">
                {partnerBio}
              </p>

              <div className="grid grid-cols-2 gap-6 pt-5 border-t border-[#0A0A0A]/10">
                <div className="space-y-1.5">
                  <h4 className="font-serif text-base font-bold text-[#0A0A0A]">Curation Focus</h4>
                  <p className="text-[14px] text-[#0A0A0A]/70 leading-relaxed">Sustainable materials, biophilic room setups, color theory curation, fabric layer styles.</p>
                </div>
                <div className="space-y-1.5">
                  <h4 className="font-serif text-base font-bold text-[#0A0A0A]">Achievements</h4>
                  <p className="text-[14px] text-[#0A0A0A]/70 leading-relaxed">NID B.Des Honors | Certified Organic Paint and Lacquer Assessor.</p>
                </div>
              </div>

              <blockquote className="border-l-2 border-[#C1FF72] pl-5 italic text-[#0A0A0A]/70 text-base font-serif mt-4">
                &ldquo;Organic textures tell physical stories. Our focus is to make those stories warm, inviting, and enduring.&rdquo;
              </blockquote>
            </div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="max-w-[90rem] mx-auto px-8 md:px-16 lg:px-24 relative z-10">
        <div className="h-px bg-[#0A0A0A]/10 w-full" />
      </div>

      {/* ─── PROCESS & TECHNOLOGY ─── */}
      <section className="max-w-[90rem] mx-auto px-8 md:px-16 lg:px-24 relative z-10 space-y-16">
        <div className="grid lg:grid-cols-12 gap-8 items-end">
          <div className="lg:col-span-6 space-y-4">
            <div className="inline-flex items-center gap-3">
              <span className="text-[11px] font-bold text-[#0A0A0A]/70 tracking-[0.25em] uppercase font-mono">03 / BLUEPRINT PROCESS</span>
            </div>
            <h2 className="font-serif text-4xl sm:text-5xl font-light text-[#0A0A0A] tracking-tight">
              Process &amp; <span className="italic font-normal text-[#0A0A0A]/70">Technology</span>
            </h2>
          </div>
          <div className="lg:col-span-6">
            <p className="text-[15px] md:text-base text-[#0A0A0A]/70 leading-relaxed">
              We leverage detailed digital project tools to ensure material schedules are locked in and delivery checklists are met perfectly.
            </p>
          </div>
        </div>
        
        <div className="grid sm:grid-cols-2 gap-8 relative z-10">
          {[
            { title: "3D & VR Visuals", desc: "Experience precise virtual room layouts, circulation lines, and real wood textures before starting modular execution.", icon: Monitor },
            { title: "Material Sourcing Protocol", desc: "We enforce strict sourcing benchmarks, choosing sustainable solid timbers, natural clay, and eco coatings.", icon: Leaf },
            { title: "Unified Dashboard", desc: "Review real-time project updates, carpentry timelines, and material schedules directly in your client interface.", icon: CalendarIcon },
            { title: "Smart Architecture", desc: "We integrate climate systems, structured audio setups, and custom lighting paths early in our structural layouts.", icon: Home }
          ].map((std, i) => (
            <div key={i} className="bg-white p-8 rounded-[2.5rem] border border-[#0A0A0A]/10 hover:border-[#0A0A0A]/25 shadow-sm hover:shadow-xl transition-all duration-300 group text-left flex gap-6 items-start">
              <div className="w-14 h-14 bg-[#FCFAF6] border border-[#0A0A0A]/10 rounded-2xl flex items-center justify-center text-[#0A0A0A] group-hover:bg-[#C1FF72] transition-colors duration-500 shrink-0 shadow-sm">
                <std.icon className="w-6 h-6" />
              </div>
              <div className="space-y-2">
                <h3 className="font-serif text-xl font-bold text-[#0A0A0A] tracking-wide">{std.title}</h3>
                <p className="text-[15px] text-[#0A0A0A]/70 leading-relaxed font-normal">{std.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── TIMELINE ─── */}
      <section className="py-28 bg-[#FCFAF6] border-t border-b border-[#0A0A0A]/10 relative z-10 overflow-hidden">
        <div className="max-w-[90rem] mx-auto px-8 md:px-16 lg:px-24">
          <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
            {/* Left sticky column */}
            <div className="lg:w-1/3 space-y-6 lg:sticky lg:top-36 self-start text-left">
              <div className="inline-flex items-center gap-3">
                <span className="text-[11px] font-bold tracking-[0.25em] uppercase text-[#0A0A0A]/70 font-mono">04 / TIMELINE MILESTONES</span>
              </div>
              <h2 className="font-serif text-4xl md:text-5xl font-light text-[#0A0A0A] tracking-tight">
                Our Journey &amp; <br />
                <span className="italic font-normal text-[#0A0A0A]/70">Evolution</span>
              </h2>
              <p className="text-[15px] md:text-base text-[#0A0A0A]/70 leading-relaxed">
                From a small boutique studio to an industry partner for premium turnkey renovations, our commitment to craft has never wavered.
              </p>
            </div>
            
            {/* Right timeline column */}
            <div className="lg:w-2/3 relative border-l-2 border-[#0A0A0A]/10 ml-4 md:ml-0 space-y-16 py-4">
              {[
                { year: "2015", title: "Practice Launch", desc: `${cleanName || 'Luxe Interiors Studio'} was established to deliver luxury-grade interior architecture with a deep respect for natural materials and client lifestyle requirements.` },
                { year: "2018", title: "Bespoke Cabinetry & 3D Studio", desc: "Expanded our operations, adding a specialized 3D studio and partnering with premium carpenters to execute custom furniture details directly." },
                { year: "2021", title: "Biophilic Sourcing Protocol", desc: "Introduced smart planning software and committed to a rigorous biophilic design framework using low-VOC coatings and timber." },
                { year: "TODAY", title: "Holistic Turnkey Delivery", desc: "Managing comprehensive residential design and commercial renovations nationwide, recognized for timeless, warm minimal rooms." }
              ].map((milestone, i) => (
                <div key={i} className="relative pl-10 md:pl-16 group text-left">
                  {/* Node */}
                  <div className="absolute w-4 h-4 bg-white border-[3px] border-[#0A0A0A] rounded-full -left-[9px] top-1.5 group-hover:bg-[#C1FF72] group-hover:scale-125 transition-all duration-500 shadow-sm" />
                  <span className="text-[#0A0A0A]/50 font-serif font-light italic text-2xl block mb-2">{milestone.year}</span>
                  <h3 className="font-serif text-2xl font-normal text-[#0A0A0A] mb-3 group-hover:text-[#0A0A0A]/70 transition-colors">{milestone.title}</h3>
                  <p className="text-[15px] text-[#0A0A0A]/70 leading-relaxed font-normal">{milestone.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── WHY TRUST US ─── */}
      <section className="max-w-[90rem] mx-auto px-8 md:px-16 lg:px-24 relative z-10 space-y-16">
        <div className="text-center max-w-2xl mx-auto space-y-4">
           <div className="flex items-center justify-center gap-2 text-[#0A0A0A]/70 text-[11px] font-bold uppercase tracking-widest">
             <span className="w-1.5 h-1.5 rounded-full bg-[#0A0A0A]" />
             STUDIO SINCERITY
           </div>
           <h2 className="font-serif text-4xl sm:text-5xl font-light text-[#0A0A0A] tracking-tight">
             Why Clients Trust <span className="italic font-normal text-[#0A0A0A]/70">Our Team</span>
           </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-14 mt-8 text-left">
           {[
             { num: "01", title: "Multidisciplinary Coordination", desc: "Architects, custom carpenters, and interior stylists coordinate seamlessly under a single strategic design brief." },
             { num: "02", title: "Full Turnkey Operations", desc: "We manage design, procurement, municipal permissions, and masonry works from first sketch through final handover." },
             { num: "03", title: "Bespoke Space Audits", desc: "We design custom joinery and spatial layouts entirely customized around your family's daily routine." },
             { num: "04", title: "Operational Sincerity", desc: "We deliver full line-by-line materials lists and transparent carpenter pricing. No unexpected markup lists." },
             { num: "05", title: "Reliable Subcontracting", desc: "We maintain ongoing relationships with high-end artisans and certified installers for execution security." },
             { num: "06", title: "Physical Handover Pack", desc: "We provide physical maintenance guides, material codes, paint references, and appliance contracts at project close." }
           ].map((feature, i) => (
             <div key={i} className="group cursor-default space-y-4">
                <div className="flex items-center gap-4">
                  <span className="text-[#0A0A0A]/30 font-serif text-xl italic font-bold">{feature.num}</span>
                  <h3 className="font-serif font-normal text-[#0A0A0A] text-xl group-hover:text-[#0A0A0A]/70 transition-colors tracking-wide">{feature.title}</h3>
                </div>
                <div className="w-full h-px bg-[#0A0A0A]/10 group-hover:bg-[#C1FF72] transition-colors" />
                <p className="text-[15px] text-[#0A0A0A]/70 leading-relaxed font-normal pr-4">{feature.desc}</p>
             </div>
           ))}
        </div>
      </section>

    </div>
  );
}
