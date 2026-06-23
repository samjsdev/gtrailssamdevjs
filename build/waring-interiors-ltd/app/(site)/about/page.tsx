import { readSourceConfig } from '@/lib/sourceData';
import { notFound } from "next/navigation";
import { INTERIOR_HERO_IMAGES } from "@/lib/interiorContent";

type PageProps = {
  params?: any;
};

export default async function AboutPage({ params }: PageProps) {
  const slug = ''; // standalone: slug not needed for data loading

  const data = await readSourceConfig(undefined, 'template4');
  if (!data) return notFound();

  const { clinic, doctor, media } = data;
  const principalImage = doctor?.images?.[0] || media?.otherImages?.[0] || INTERIOR_HERO_IMAGES.designer;
  const secondaryImage = media?.clinicImages?.[1] || media?.treatmentImages?.[1] || media?.otherImages?.[1] || INTERIOR_HERO_IMAGES.about;

  // Dynamic overrides from data config
  const visionQuote = data.about?.vision || 'We curate luxury residential spaces and commercial interiors with high-fidelity spatial planning, sustainable organic timber sourcing, and transparent billing operations.';
  const aboutHeroImage = data.about?.heroImage || media?.clinicImages?.[2] || media?.clinicImages?.[0] || INTERIOR_HERO_IMAGES.home;

  const founderName = doctor?.name || 'Arjun Mehta';
  const founderRole = doctor?.role || 'FOUNDER & ARCHITECTURAL LEAD';
  const founderCredentials = doctor?.credentials || 'M.Des, Interior Architecture | B.Arch, Sir J.J. College';
  const founderBio = doctor?.bio || 'With over a decade of hands-on experience, he oversees the master structural scoping, custom joinery modules, and carpentry execution protocols for our residential projects. He believes a home should highlight the innate warmth of stone and timber.';
  const founderQuote = doctor?.quote || 'A successful home should function cleanly while highlighting the natural warmth of timber and stone.';

  const partnerName = data.doctor2?.name || 'Kavitha Rajan';
  const partnerRole = data.doctor2?.role || 'CO-FOUNDER & STYLING LEAD';
  const partnerCredentials = data.doctor2?.credentials || 'B.Des, Interior Styling — NID | Certified Organic Material Consultant';
  const partnerBio = data.doctor2?.bio || 'Specializing in biophilic texture layerings, material curation, and warm minimalist aesthetics, Kavitha sources sustainable furnishings, eco-responsible fabrics, and curated styling items that make our spaces feel comfortable and organic.';
  const partnerQuote = data.doctor2?.quote || 'Organic textures tell physical stories. Our focus is to make those stories warm and enduring.';

  return (
    <div className="text-stone-900 bg-stone-50 min-h-screen pb-32 selection:bg-stone-200">
      
      {/* HEADER HERO */}
      <section className="relative pt-36 pb-20 px-6 max-w-6xl mx-auto text-center z-10">
        <div className="space-y-6 max-w-4xl mx-auto">
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-stone-500">— ESTABLISHED 2015</p>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-light text-stone-900 leading-tight">
            Our Studio &amp; Vision
          </h1>
          <p className="text-base md:text-lg text-stone-600 font-light max-w-2xl mx-auto leading-relaxed">
            {visionQuote}
          </p>
        </div>

        {/* Panoramic Editorial Space Photo */}
        <div className="relative w-full max-w-5xl mx-auto mt-16 overflow-hidden border border-stone-250 aspect-[21/9]">
          <img
            src={aboutHeroImage}
            alt="Minimal modern architectural design studio workspace"
            className="w-full h-full object-cover object-center transform hover:scale-[1.01] transition-transform duration-[2000ms]"
          />
        </div>
      </section>

      {/* CORE WRAPPER */}
      <div className="max-w-6xl mx-auto px-6 space-y-32 mt-16">
        
        {/* THE JOURNEY TIMELINE */}
        <section className="bg-white border border-stone-200/80 p-8 md:p-16 lg:p-20 relative overflow-hidden" data-gsap="timeline-track">
          <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 relative z-10">
            {/* Sticky info block */}
            <div className="lg:w-1/3 space-y-6 lg:sticky lg:top-36 self-start">
              <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-stone-500">— OUR CHRONICLE</p>
              <h2 className="text-3xl md:text-4xl font-light text-stone-900 leading-tight">
                The Journey
              </h2>
              <p className="text-sm text-stone-500 font-light leading-relaxed">
                From a small boutique laboratory of carpenters to an award-winning turnkey architecture agency, our commitment to natural materials remains constant.
              </p>
            </div>
            
            {/* Timeline track */}
            <div className="lg:w-2/3 relative border-l border-stone-200 pl-8 space-y-16">
              <div className="absolute left-[-1px] top-0 w-[2px] h-full bg-stone-900 origin-top" data-gsap="timeline-progress" style={{ transform: 'scaleY(0)' }}></div>
              {[
                { year: "2015", title: "Inception & Ethos", desc: `${clinic.name || "Our Studio"} was founded to provide premium architectural interiors that leverage biophilic principles and showcase high-end solid woods.` },
                { year: "2018", title: "Sourcing & Joinery", desc: "Formed a proprietary material sourcing network, ensuring clean access to sustainable veneers and high-end carpenters." },
                { year: "2021", title: "Biophilic Sourcing", desc: "Committed to absolute biophilic integrity, implementing non-toxic coatings, certified organic linen layers, and natural clay plasters." },
                { year: "PRESENT", title: "Sought-After Residential Leader", desc: "Crafting customized high-end living spaces and boutique business environments nationwide, known for quiet warmth and tactile luxury." }
              ].map((milestone, idx) => (
                <div key={idx} className="relative group space-y-2" data-gsap="timeline-node">
                  {/* Timeline bullet node */}
                  <div className="absolute w-3 h-3 bg-stone-50 border border-stone-900 rounded-full -left-[38px] top-1.5 group-hover:bg-stone-900 group-hover:scale-125 transition-all duration-300 timeline-bullet" />
                  <div className="timeline-content space-y-2">
                    <span className="text-stone-400 font-bold text-sm tracking-widest">{milestone.year}</span>
                    <h3 className="text-xl font-medium text-stone-900">{milestone.title}</h3>
                    <p className="text-sm text-stone-500 font-light leading-relaxed max-w-lg">{milestone.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CORE PHILOSOPHY */}
        <section className="space-y-12">
          <div className="flex flex-col md:flex-row gap-6 md:gap-16 items-center md:items-end border-b border-stone-250 pb-8 text-center md:text-left">
            <div className="flex-1 space-y-4">
              <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-stone-500">— THE WAY WE THINK</p>
              <h2 className="text-3xl md:text-5xl font-light text-stone-900 leading-tight">Design Principles</h2>
            </div>
            <p className="text-stone-500 max-w-md font-light text-sm leading-relaxed">
              We approach spaces with clinical precision and artistic sensitivity, ensuring every corner balances spatial flow, light, and natural textures.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6" data-gsap="stagger-container">
            {[
              { num: "01", title: "Spatial Flow", desc: "We map the exact daily routines of your family to optimize layout circulation and maximize daylight paths." },
              { num: "02", title: "Tactility", desc: "We select real solid timbers, raw sandstones, and organic linens that develop elegant character over time." },
              { num: "03", title: "Precision Models", desc: "We build premium 3D virtual blueprints, allowing you to walk through every space and finalize cost sheets before building." },
              { num: "04", title: "Honest Curation", desc: "We protect your timeline with direct carpenter scheduling, line-by-line item reports, and transparent communication." }
            ].map((principle, idx) => (
              <div key={idx} className="bg-white border border-stone-200 p-8 space-y-6 flex flex-col justify-between hover:border-stone-900 transition-colors duration-500 group relative overflow-hidden" data-gsap="stagger-item">
                <span className="absolute -top-4 -right-4 text-6xl font-black text-stone-100 select-none pointer-events-none group-hover:text-stone-200/50 transition-colors">{principle.num}</span>
                <div className="space-y-4 relative z-10">
                  <h3 className="text-lg font-medium text-stone-900">{principle.title}</h3>
                  <p className="text-stone-500 font-light text-xs leading-relaxed">{principle.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* DESIGN LEADERS */}
        <section className="space-y-16 py-8">
          <div className="text-center max-w-2xl mx-auto space-y-4">
            <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-stone-500">— CREATIVE CONTEXT</p>
            <h2 className="text-3xl md:text-5xl font-light text-stone-900 leading-tight">Meet The Founders</h2>
          </div>

          <div className="space-y-32">
            {/* Principal Designer (Arjun Mehta) */}
            <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
              <div className="lg:col-span-5 relative aspect-[3/4] overflow-hidden border border-stone-250" data-gsap="parallax-container">
                <img
                  src={principalImage}
                  alt={founderName}
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                  data-gsap="parallax-img"
                />
              </div>
              <div className="lg:col-span-7 space-y-6">
                <div className="space-y-2">
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-stone-400">{founderRole}</p>
                  <h3 className="text-3xl font-light text-stone-900">{founderName}</h3>
                  <p className="text-stone-500 text-xs font-light">{founderCredentials}</p>
                </div>
                <p className="text-stone-600 font-light leading-relaxed text-sm">
                  {founderBio}
                </p>
                <div className="border-l border-stone-900 pl-6 italic text-stone-500 text-base font-light">
                  &ldquo;{founderQuote}&rdquo;
                </div>
              </div>
            </div>

            {/* Associate Stylist (Kavitha Rajan) */}
            <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
              <div className="lg:col-span-5 lg:order-2 relative aspect-[3/4] overflow-hidden border border-stone-250" data-gsap="parallax-container">
                <img
                  src={secondaryImage}
                  alt={partnerName}
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                  data-gsap="parallax-img"
                />
              </div>
              <div className="lg:col-span-7 lg:order-1 space-y-6">
                <div className="space-y-2">
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-stone-400">{partnerRole}</p>
                  <h3 className="text-3xl font-light text-stone-900">{partnerName}</h3>
                  <p className="text-stone-500 text-xs font-light">{partnerCredentials}</p>
                </div>
                <p className="text-stone-600 font-light leading-relaxed text-sm">
                  {partnerBio}
                </p>
                <div className="border-l border-stone-900 pl-6 italic text-stone-500 text-base font-light">
                  &ldquo;{partnerQuote}&rdquo;
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* PROCESS & TECHNOLOGY */}
        <section className="bg-stone-900 text-stone-100 p-8 md:p-16 lg:p-20 border border-stone-850 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-bl-full pointer-events-none" />
          <div className="relative z-10 max-w-5xl mx-auto flex flex-col lg:flex-row gap-16">
            <div className="lg:w-1/3 space-y-6 lg:sticky lg:top-36 self-start">
              <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-stone-500">— PROCESS PROTOCOLS</p>
              <h2 className="text-3xl md:text-4xl font-light text-stone-100 leading-tight">
                Technology &amp; Standards
              </h2>
              <p className="text-stone-400 font-light text-xs leading-relaxed">
                We use high-fidelity digital coordination maps to make sure our cabinetry parameters, sourcing checklists, and layout alignments are executed cleanly.
              </p>
            </div>
            
            <div className="lg:w-2/3 grid sm:grid-cols-2 gap-6 relative z-10" data-gsap="stagger-container">
              {[
                { title: "Virtual 3D Walkthroughs", desc: "Test out circulation clearings, furniture dimensions, and solid wood textures in photo-realistic spatial blocks." },
                { title: "Material Standards", desc: "We restrict our curations to certified timber boards, organic textiles, and natural, VOC-free plasters." },
                { title: "Dashboard Coordination", desc: "Review real-time budget updates, item delivery timelines, and cabinetry schedules directly in your project tracker." },
                { title: "Smart Integration", desc: "We layout sockets, audio pipelines, climate pathways, and specialized task lighting plans early in our structural blueprints." }
              ].map((std, idx) => (
                <div key={idx} className="bg-stone-950 p-8 border border-stone-800 hover:border-stone-500 transition-colors space-y-4" data-gsap="stagger-item">
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-stone-200">{std.title}</h3>
                  <p className="text-xs text-stone-400 font-light leading-relaxed">{std.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* WHY TRUST US */}
        <section className="py-8">
          <div className="text-center mb-20 max-w-2xl mx-auto space-y-4">
            <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-stone-500">— TRUST CERTIFICATION</p>
            <h2 className="text-3xl md:text-5xl font-light text-stone-900 leading-tight">Why Clients Trust Our Team</h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16 text-left" data-gsap="stagger-container">
            {[
              { num: "01", title: "Integrated Synergy", desc: "Architectural designers, custom joinery technicians, and biophilic stylists coordinate on a single master layout." },
              { num: "02", title: "Absolute Turnkey", desc: "We handle material acquisitions, electrical mappings, cabinetry fittings, and snag clearances from discovery to final staging." },
              { num: "03", title: "Tailored Audits", desc: "We design furniture frames and cabinet depths customized around your anatomical clearances and storage routines." },
              { num: "04", title: "Honest Billing", desc: "We outline honest billing spreadsheets, listing real timber costs, hardware fees, and carpenter hours. No hidden markups." },
              { num: "05", title: "Certified Craftsmen", desc: "We work with regional master carpenters, trusted mason blocks, and certified installers to ensure reliable execution." },
              { num: "06", title: "Detailed Handover Folders", desc: "We deliver physical material codes, paint references, hardware keys, appliance contracts, and clean upkeep manuals." }
            ].map((feature, idx) => (
              <div key={idx} className="group space-y-4" data-gsap="stagger-item">
                <div className="flex items-center gap-4">
                  <span className="text-stone-400 font-bold text-xs tracking-widest">{feature.num}</span>
                  <h3 className="text-lg font-medium text-stone-900 group-hover:text-stone-700 transition-colors">{feature.title}</h3>
                </div>
                <div className="w-full h-px bg-stone-200" />
                <p className="text-xs text-stone-500 font-light leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}
