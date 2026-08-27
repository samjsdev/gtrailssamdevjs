import { readSourceConfig } from '@/lib/sourceData';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import HeroSection from './HeroSection';
import MarqueeBand from './MarqueeBand';
import ProjectCarousel from './ProjectCarousel';
import InteriorSwitcher from './InteriorSwitcher';
import CostEstimator from './CostEstimator';

interface PageProps {
  params?: any;
}

const STATS = [
  { value: '28+', label: 'Years Experience' },
  { value: '850+', label: 'Homes Delivered' },
  { value: '0%', label: 'Cost Escalation' },
  { value: '10 Yr', label: 'Structural Warranty' },
];

const SERVICES = [
  {
    icon: '01',
    title: 'Turnkey Construction',
    desc: '100% end-to-end execution. From soil testing and foundation to the final coat of paint, we manage all materials, labor, and compliance. Zero subcontractors.',
  },
  {
    icon: '02',
    title: 'Architectural Design',
    desc: 'In-house licensed architects craft custom floor plans and stunning 3D elevations perfectly tailored to your plot, maximizing space, light, and Vaastu harmony.',
  },
  {
    icon: '03',
    title: 'Interior Design',
    desc: 'Seamlessly integrated interiors. We plan lighting, plumbing, and false ceilings alongside structural work, delivering a cohesive, move-in-ready home.',
  },
  {
    icon: '04',
    title: 'Approvals & Liaison',
    desc: 'We handle all CMDA/civic body approvals, plan sanctions, and temporary electricity/water connections. Complete peace of mind before breaking ground.',
  },
];

const PACKAGES = [
  {
    name: 'Classic',
    tag: 'Essential Quality',
    price: '₹2,050',
    unit: '/ sq.ft',
    features: [
      'Custom 2D floor plans & structural drawings',
      'FE 550 Grade ISI TMT Steel (Kamachi / ARS)',
      '53-Grade PPC Cement (Coromandel / Chettinad)',
      '2x2 Vitrified Tiles (Somany / Kajaria)',
      'Teak wood main door frame + UPVC windows',
      'Basic modular kitchen & wardrobes',
      '5-year structural warranty',
    ],
    highlight: false,
  },
  {
    name: 'Premium',
    tag: 'Most Recommended',
    price: '₹2,450',
    unit: '/ sq.ft',
    features: [
      'Everything in Classic + 3D Elevation modeling',
      'Tata Tiscon / JSW Neosteel 550D TMT Steel',
      'UltraTech / Ramco Supergrade 53-Grade Cement',
      '4x2 Glazed Vitrified Tiles or Spanish Granite',
      'Soundproof Kommerling UPVC Windows',
      '100% Marine Plywood Modular Kitchen & Wardrobes',
      'False ceiling & concealed architectural lighting',
      '8-year structural warranty + 5-yr maintenance',
    ],
    highlight: true,
  },
  {
    name: 'Luxury',
    tag: 'Uncompromising Finish',
    price: '₹2,950+',
    unit: '/ sq.ft',
    features: [
      'Complete interior architecture integration',
      'Tata Tiscon 550D + Anti-seismic frame design',
      'Italian Marble (Bottochino / Statuario inlays)',
      'Grohe / Kohler Designer Collection Fixtures',
      'Schüco Heavy-duty Aluminium & Burma Teak doors',
      'Smart home automation & security cabling',
      'Dedicated site engineer & senior architect',
      '10-year comprehensive structural warranty',
    ],
    highlight: false,
  },
];

const WHY_US = [
  {
    num: 'I.',
    title: 'No Subcontractors',
    body: 'Our architects, civil engineers, and site supervisors are all full-time employees. We maintain absolute control over material quality and site timelines.',
  },
  {
    num: 'II.',
    title: 'Zero Cost Overruns',
    body: 'We operate on a strict fixed-price model. Once the itemized Bill of Quantities (BOQ) is signed, you will not pay a single rupee extra for the agreed scope.',
  },
  {
    num: 'III.',
    title: 'Guaranteed Timelines',
    body: 'Every project comes with a legally binding delivery schedule. We track progress weekly and enforce strict milestone delivery clauses.',
  },
  {
    num: 'IV.',
    title: '200+ Point QC Protocol',
    body: 'Quality is not left to chance. Every stage of construction undergoes documented, multi-tier quality checks by our independent audit team.',
  },
];

const PROCESS_STEPS = [
  {
    step: '01',
    title: 'Site Inspection & Brief',
    desc: "We evaluate your plot, understand your family's lifestyle, and lock down the overarching architectural vision and budget.",
  },
  {
    step: '02',
    title: 'Architecture & Approvals',
    desc: 'Our architects draft floor plans and 3D elevations. Once approved by you, we secure all necessary CMDA permits.',
  },
  {
    step: '03',
    title: 'BOQ & Contracts',
    desc: 'A highly detailed Bill of Quantities is generated. You sign a fixed-price contract with zero hidden clauses.',
  },
  {
    step: '04',
    title: 'Construction Phase',
    desc: 'Execution begins. You receive a dedicated WhatsApp group and weekly reports detailing progress and QC checks.',
  },
  {
    step: '05',
    title: 'Handover & Warranty',
    desc: 'Deep cleaning, final walkthrough, and handover of keys along with your 10-year structural warranty certificate.',
  },
];

const TESTIMONIALS = [
  {
    name: 'S. Rajagopalan',
    area: 'Anna Nagar East, Chennai',
    text: 'Murali Patharala Associates delivered exactly what they promised, on the exact date agreed in the contract. The 200-point QC checks meant I never had to worry while sitting in my office.',
  },
  {
    name: 'Priya & Balaji',
    area: 'Kilpauk, Chennai',
    text: 'The fixed-price contract is 100% genuine. We made custom tweaks to our kitchen finishes, but there were zero hidden civil structural surcharges. A truly stress-free turnkey experience.',
  },
  {
    name: 'Dr. K. Venkataraman',
    area: 'Boat Club Road, Chennai',
    text: 'Having in-house architects made all the difference. The transition from our blueprint discussions to the actual physical villa was seamless. Exceptional finishing quality.',
  },
];

export default async function HomePage({ params }: PageProps) {
  const data = await readSourceConfig(undefined, 'template5');

  if (!data || !data.clinic) {
    notFound();
  }

  const phone = '09841098490';
  const displayPhone = '+91 98410 98490';
  const rawDigits = phone.replace(/\D/g, '');
  const cleanPhone = rawDigits.startsWith('91') ? rawDigits : `91${rawDigits.replace(/^0+/, '')}`;

  return (
    <div className="w-full bg-[#FAFAFA] text-[#111111]">
      {/* 1. Hero Section (Split Screen with Quick Estimate Callback Form) */}
      <HeroSection phone={displayPhone} />

      {/* 2. Marquee Ribbon (Onyx Black Ticker) */}
      <MarqueeBand />

      {/* 3. The Manifesto */}
      <section className="py-20 md:py-32 px-6 md:px-12 border-b-4 border-[#111111] bg-white text-center">
        <div className="max-w-4xl mx-auto">
          <div className="w-12 h-1 bg-[#EA580C] mx-auto mb-8 sm:mb-10" />
          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-bold mb-8 leading-tight text-[#111111] tracking-tight"
            style={{ fontFamily: "'Lora', serif" }}
          >
            We Believe Building a Home Shouldn&apos;t Be a Nightmare of Escalating Costs and Broken Promises.
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-[#757575] leading-relaxed font-medium">
            The traditional construction industry is broken—riddled with subcontractors, hidden fees, and endless delays. Murali Patharala Associates was built to change that. We bring architecture, civil engineering, and interior execution under one roof in Anna Nagar, backed by unbreakable fixed-price contracts and ironclad delivery timelines.
          </p>
        </div>
      </section>

      {/* 4. Why Us / The Standard for Excellence */}
      <section id="why-us" className="border-b-4 border-[#111111]">
        <div className="grid md:grid-cols-2">
          {/* Left Stats Column */}
          <div className="p-8 md:p-16 border-b-4 md:border-b-0 md:border-r-4 border-[#111111] bg-[#FAFAFA] flex flex-col justify-between">
            <div>
              <p className="text-xs font-bold tracking-[0.2em] uppercase text-[#EA580C] mb-4">Firm Metrics</p>
              <h2
                className="text-4xl md:text-5xl font-bold mb-6 text-[#111111] tracking-tight leading-tight"
                style={{ fontFamily: "'Lora', serif" }}
              >
                The Standard<br />For Excellence.
              </h2>
              <p className="text-base sm:text-lg text-[#757575] mb-12 font-medium leading-relaxed">
                We do not rely on third-party contractors. By keeping design, engineering, and turnkey execution in-house, we guarantee absolute accountability across Chennai.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-8 gap-y-12 pt-6 border-t-2 border-[#E0E0E0]">
              {STATS.map((s) => (
                <div key={s.label}>
                  <p
                    className="text-4xl sm:text-5xl font-bold text-[#EA580C] mb-2 font-serif"
                    style={{ fontFamily: "'Lora', serif" }}
                  >
                    {s.value}
                  </p>
                  <p className="text-xs font-bold uppercase tracking-widest text-[#111111]">
                    {s.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Roman Numeral 2x2 Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 bg-white">
            {WHY_US.map((item, i) => (
              <div
                key={i}
                className={`p-8 md:p-12 border-[#111111] flex flex-col justify-start ${
                  i % 2 === 0 ? 'border-b-2 sm:border-r-2' : 'border-b-2'
                } ${i > 1 ? 'border-b-0' : ''}`}
              >
                <span
                  className="text-2xl sm:text-3xl font-serif text-[#EA580C] font-bold block mb-4"
                  style={{ fontFamily: "'Lora', serif" }}
                >
                  {item.num}
                </span>
                <h4 className="text-lg font-bold mb-3 uppercase tracking-wide text-[#111111]">
                  {item.title}
                </h4>
                <p className="text-sm text-[#757575] leading-relaxed font-medium">
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. End-to-End Capabilities (Services Grid) */}
      <section id="services" className="border-b-4 border-[#111111]">
        <div className="grid md:grid-cols-2 lg:grid-cols-4">
          <div className="col-span-full p-8 md:p-12 border-b-4 border-[#111111] bg-[#111111] text-white flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-xs font-bold tracking-[0.2em] uppercase text-[#EA580C] mb-2">Scope of Services</p>
              <h2
                className="text-3xl sm:text-4xl font-bold font-serif text-white tracking-tight"
                style={{ fontFamily: "'Lora', serif" }}
              >
                End-to-End Capabilities
              </h2>
            </div>
            <Link
              href="/services"
              className="text-xs font-bold uppercase tracking-widest text-[#EA580C] hover:text-white transition-colors"
            >
              Explore Detailed Service Specs →
            </Link>
          </div>

          {SERVICES.map((s, i) => (
            <div
              key={i}
              className={`p-8 md:p-10 border-[#111111] bg-[#FAFAFA] hover:bg-white transition-colors ${
                i < SERVICES.length - 1 ? 'border-b-2 md:border-b-0 md:border-r-2 lg:border-b-0' : ''
              }`}
            >
              <div
                className="text-4xl font-serif text-[#EA580C] font-bold mb-6"
                style={{ fontFamily: "'Lora', serif" }}
              >
                {s.icon}
              </div>
              <h3 className="text-lg font-bold uppercase tracking-wide mb-4 text-[#111111]">
                {s.title}
              </h3>
              <p className="text-sm text-[#757575] leading-relaxed font-medium">
                {s.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 6. Methodology (How We Build) */}
      <section id="process" className="py-20 md:py-28 border-b-4 border-[#111111] bg-white">
        <div className="px-6 md:px-12 max-w-7xl mx-auto">
          <div className="mb-16">
            <p className="text-xs font-bold tracking-[0.2em] uppercase text-[#EA580C] mb-4">Methodology</p>
            <h2
              className="text-3xl md:text-5xl font-bold font-serif mb-4 text-[#111111] tracking-tight"
              style={{ fontFamily: "'Lora', serif" }}
            >
              How We Build
            </h2>
            <p className="text-sm md:text-base text-[#757575] max-w-xl font-medium leading-relaxed">
              A disciplined 5-stage engineering roadmap guaranteeing structural integrity, fixed pricing, and timely key handover.
            </p>
          </div>

          <div className="grid md:grid-cols-5 gap-6">
            {PROCESS_STEPS.map((proc, i) => (
              <div key={i} className="relative pt-6">
                {i !== PROCESS_STEPS.length - 1 && (
                  <div className="hidden md:block absolute top-[1.35rem] left-[2.5rem] right-[-1rem] h-0.5 bg-[#E0E0E0]" />
                )}
                <div className="w-10 h-10 bg-[#111111] text-white flex items-center justify-center font-bold text-sm mb-6 relative z-10">
                  {proc.step}
                </div>
                <h4 className="font-bold uppercase tracking-wide mb-3 text-sm text-[#111111]">
                  {proc.title}
                </h4>
                <p className="text-xs sm:text-sm text-[#757575] leading-relaxed font-medium">
                  {proc.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Signature Residences (Dynamic Project Carousel) */}
      <ProjectCarousel />

      {/* 8. Fixed-Price Packages */}
      <section id="packages" className="border-b-4 border-[#111111] py-20 md:py-28 bg-[#FAFAFA]">
        <div className="px-6 md:px-12 max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-xs font-bold tracking-[0.2em] uppercase text-[#EA580C] mb-4">
              Transparent Pricing
            </p>
            <h2
              className="text-3xl md:text-5xl font-bold font-serif mb-4 text-[#111111] tracking-tight"
              style={{ fontFamily: "'Lora', serif" }}
            >
              Fixed-Price Contracts
            </h2>
            <p className="text-base text-[#757575] font-medium max-w-xl mx-auto">
              Detailed Bill of Quantities (BOQ). No hidden escalation. No surprise material surcharges.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-0 border-2 border-[#111111] shadow-2xl">
            {PACKAGES.map((pkg, i) => (
              <div
                key={i}
                className={`p-8 relative flex flex-col justify-between ${
                  i !== 2 ? 'border-b-2 md:border-b-0 md:border-r-2 border-[#111111]' : ''
                } ${pkg.highlight ? 'bg-[#111111] text-white' : 'bg-white text-[#111111]'}`}
              >
                {pkg.highlight && <div className="absolute top-0 left-0 right-0 h-2 bg-[#EA580C]" />}
                
                <div>
                  <p
                    className={`text-xs font-bold tracking-widest uppercase mb-6 ${
                      pkg.highlight ? 'text-[#EA580C]' : 'text-[#757575]'
                    }`}
                  >
                    {pkg.tag}
                  </p>
                  <h3
                    className="text-2xl sm:text-3xl font-bold font-serif mb-2"
                    style={{ fontFamily: "'Lora', serif" }}
                  >
                    {pkg.name}
                  </h3>
                  <div className="flex items-baseline gap-1 mb-8 pb-8 border-b border-current opacity-30">
                    <span
                      className={`text-4xl font-bold font-serif ${
                        pkg.highlight ? 'text-white' : 'text-[#EA580C]'
                      }`}
                      style={{ fontFamily: "'Lora', serif" }}
                    >
                      {pkg.price}
                    </span>
                    <span className="text-sm font-bold uppercase tracking-wider">{pkg.unit}</span>
                  </div>

                  <ul className="space-y-4 mb-10">
                    {pkg.features.map((f, idx) => (
                      <li key={idx} className="flex gap-3 text-sm font-medium">
                        <span className="text-[#EA580C] shrink-0">■</span>
                        <span className={pkg.highlight ? 'text-white/90' : 'text-[#111111]'}>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <a
                  href={`https://wa.me/${cleanPhone}?text=${encodeURIComponent(`Hi Murali Patharala Associates, I am interested in the ${pkg.name} package (${pkg.price} / sq.ft). Please share details.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-full py-4 text-xs font-bold uppercase tracking-widest text-center transition-colors block ${
                    pkg.highlight
                      ? 'bg-[#EA580C] text-white hover:bg-white hover:text-[#111111]'
                      : 'bg-[#FAFAFA] border-2 border-[#111111] hover:bg-[#111111] hover:text-white'
                  }`}
                >
                  Select Package
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. Client Proof / Testimonials */}
      <section className="py-20 md:py-28 border-b-4 border-[#111111] bg-white">
        <div className="px-6 md:px-12 max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div>
              <p className="text-xs font-bold tracking-[0.2em] uppercase text-[#EA580C] mb-4">
                Client Proof
              </p>
              <h2
                className="text-3xl md:text-5xl font-bold font-serif text-[#111111] tracking-tight"
                style={{ fontFamily: "'Lora', serif" }}
              >
                Don&apos;t Take Our Word For It.
              </h2>
            </div>
            <p className="text-[#757575] max-w-sm text-sm sm:text-base font-medium leading-relaxed">
              Hear directly from Chennai homeowners who trusted our 100% in-house turnkey approach.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t, i) => (
              <div key={i} className="p-8 border-2 border-[#111111] bg-[#FAFAFA] flex flex-col justify-between">
                <div>
                  <div className="flex gap-1 text-[#EA580C] mb-4 text-base">
                    <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
                  </div>
                  <p
                    className="text-sm sm:text-base font-medium leading-relaxed mb-6 font-serif italic text-[#111111]"
                    style={{ fontFamily: "'Lora', serif" }}
                  >
                    &ldquo;{t.text}&rdquo;
                  </p>
                </div>
                <div className="pt-4 border-t border-[#E0E0E0]">
                  <p className="text-xs font-bold uppercase tracking-widest text-[#111111]">{t.name}</p>
                  <p className="text-xs text-[#757575] uppercase mt-0.5">{t.area}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 10. Interior Architecture (Split Section with Tabbed Image Switcher) */}
      <InteriorSwitcher />

      {/* 11. Interactive Cost Estimator (Full-featured Calculator) */}
      <section id="cost-calculator" className="py-20 md:py-28 px-6 md:px-12 border-b-4 border-[#111111] bg-[#FAFAFA]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-xs font-bold tracking-[0.2em] uppercase text-[#EA580C] mb-3">
              Cost Engineering
            </p>
            <h2
              className="text-3xl md:text-5xl font-bold font-serif text-[#111111] tracking-tight"
              style={{ fontFamily: "'Lora', serif" }}
            >
              Calculate Your Investment
            </h2>
            <p className="text-sm md:text-base text-[#757575] max-w-xl mx-auto mt-2 font-medium leading-relaxed">
              Explore itemized estimates for turnkey residences, civil construction, and modular interior fit-outs in Chennai.
            </p>
          </div>
          <CostEstimator basePath="" />
        </div>
      </section>

      {/* 12. Design System & Architectural Standards */}
      <section id="design-system" className="py-20 md:py-24 border-b-4 border-[#111111] bg-[#FAFAFA]">
        <div className="px-6 md:px-12 max-w-7xl mx-auto">
          <div className="mb-16">
            <p className="text-xs font-bold tracking-[0.2em] uppercase text-[#EA580C] mb-4">Brand Identity &amp; Discipline</p>
            <h2
              className="text-3xl md:text-5xl font-bold font-serif mb-4 text-[#111111] tracking-tight"
              style={{ fontFamily: "'Lora', serif" }}
            >
              The Architecture of Quality
            </h2>
            <p className="text-[#757575] font-medium max-w-2xl leading-relaxed text-sm sm:text-base">
              A precise, high-contrast visual language built on deep onyx black, stark white, and safety orange. Engineered for structural clarity and unwavering trust since 1998.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 lg:gap-16">
            {/* Colors */}
            <div>
              <h3 className="text-xs sm:text-sm font-bold uppercase tracking-widest mb-6 border-b-2 border-[#111111] pb-3 text-[#111111]">
                Material Palette
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
                <div className="space-y-2">
                  <div className="h-20 sm:h-24 w-full bg-[#111111] border-2 border-[#111111]" />
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-[#111111]">Onyx Black</p>
                    <p className="text-[11px] text-[#757575] font-medium">#111111</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="h-20 sm:h-24 w-full bg-[#EA580C] border-2 border-[#111111]" />
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-[#111111]">Safety Orange</p>
                    <p className="text-[11px] text-[#757575] font-medium">#EA580C</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="h-20 sm:h-24 w-full bg-[#FAFAFA] border-2 border-[#111111]" />
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-[#111111]">Base White</p>
                    <p className="text-[11px] text-[#757575] font-medium">#FAFAFA</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="h-20 sm:h-24 w-full bg-[#757575] border-2 border-[#111111]" />
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-[#111111]">Concrete Gray</p>
                    <p className="text-[11px] text-[#757575] font-medium">#757575</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Typography */}
            <div>
              <h3 className="text-xs sm:text-sm font-bold uppercase tracking-widest mb-6 border-b-2 border-[#111111] pb-3 text-[#111111]">
                Typographic Hierarchy
              </h3>
              <div className="space-y-6">
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-[#EA580C] mb-2">Primary Heading (Lora)</p>
                  <p
                    className="text-3xl sm:text-4xl font-bold font-serif leading-tight text-[#111111]"
                    style={{ fontFamily: "'Lora', serif" }}
                  >
                    Uncompromising Quality.
                  </p>
                  <p className="text-xs text-[#757575] mt-1 uppercase tracking-widest font-bold">Serif • Bold • Architectural Titles</p>
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-[#EA580C] mb-2">Secondary Body (Work Sans)</p>
                  <p className="text-sm font-medium leading-relaxed text-[#111111]">
                    Structured, geometric, and highly legible. Used for all contract specifications, technical breakdowns, and interface controls.
                  </p>
                  <p className="text-xs text-[#757575] mt-1 uppercase tracking-widest font-bold">Sans-Serif • Medium • Body &amp; Data</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
