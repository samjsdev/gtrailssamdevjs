import { readSourceConfig } from '@/lib/sourceData';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import PageIntro from '@/components/PageIntro';
import { SERVICE_DETAILS } from '@/lib/serviceDetails';
import { ArrowRight, ArrowUpRight, CheckCircle2, Layers, ShieldCheck, Sparkles, FileText } from 'lucide-react';

interface PageProps {
  params?: any;
}

const DETAILED_SERVICES = [
  {
    num: '01',
    id: 'architecture',
    title: "Architectural Design: Design It First, Know What It Costs",
    badge: 'Murali Patharala &amp; Associates &bull; Custom Vastu-Compliant Plans',
    desc: "Understand your requirements, create custom 2D floor plans, photorealistic 3D elevations, structural and MEP drawings, and prepare a detailed construction estimate before you build.",
    deliverables: [
      'Custom 2D floor plans shaped to your land dimensions and family requirements',
      'Photorealistic 3D exterior elevations and spatial layout visualization',
      'Structural column-beam framing and foundation engineering drawings',
      'Coordinated electrical conduit and plumbing schematic working sets',
      '100% Vastu-compliant room orientations with optimal sunlight and ventilation',
      'CMDA / GCC municipal sanction drawings compliant with local bylaws',
      'Detailed built-up area statement with floor-by-floor breakdown',
      'Comprehensive itemized construction cost estimate (BOQ) before building',
    ],
    image: '/images/architecture/architectural-blueprint-draft.webp',
    detailLink: '/services/architectural-design',
    packageLink: '/design-package',
    packageLabel: 'Design Packages',
    portfolioLink: '/gallery',
    portfolioLabel: 'View Elevations',
  },
  {
    num: '02',
    id: 'construction',
    title: 'Residential Construction by Experts: High Quality at Reasonable Price',
    badge: 'ARCH Foundation &bull; Branded Materials &bull; On-Time Delivery',
    desc: 'ARCH Foundation builds residential homes professionally using branded materials (Tata Steel, UltraTech Cement), an experienced in-house engineering team, transparent project management, and on-time delivery.',
    deliverables: [
      'Engineered RCC framed structure built strictly to structural drawings',
      'Branded Tata Tiscon / JSW 550D TMT steel and UltraTech / Ramco cement',
      'Transparent milestone scheduling with regular construction progress updates',
      'Multi-layer waterproofing for all terrace slabs, balconies, and wet areas',
      'Concealed plumbing with Ashirvad / Astral lines and branded CP fittings',
      'Concealed fire-resistant electrical wiring and modular switch distribution',
      'Vitrified tile flooring, granite steps, and premium emulsion wall painting',
      'As-built drawings, fixture documentation, and ready-to-live key handover',
    ],
    image: '/images/architecture/structural-construction-frame.webp',
    detailLink: '/services/residential-construction',
    packageLink: '/construction-package',
    packageLabel: 'Build Packages',
    portfolioLink: '/gallery',
    portfolioLabel: 'View Projects',
  },
  {
    num: '03',
    id: 'interiors',
    title: 'End-to-End Home Interior Solutions: Signature Luxury Interiors',
    badge: 'Murali Patharala &amp; Associates &bull; 100% Customized Solutions',
    desc: 'Transforming spaces with expertise and dedication. Complete home interior solutions from modular kitchens and wardrobes to false ceilings, lighting, and custom joinery tailored to your lifestyle.',
    deliverables: [
      'Ergonomic modular kitchens with tandem drawers, pullouts, and stone countertops',
      'Floor-to-ceiling customized wardrobes with integrated lofts and dressing units',
      'Designer Gyproc false ceilings with layered ambient and warm LED cove lighting',
      'Custom living room TV entertainment units and decorative fluted wall paneling',
      'Dining room crockery display units and custom breakfast counters',
      'Sacred pooja mandir units and entryway foyer shoe console storage',
      'Study workstations and home office desks with cable management',
      'Factory precision fabrication, clean on-site installation, and handover',
    ],
    image: '/images/architecture/interior-double-height.webp',
    detailLink: '/services/interior-design',
    packageLink: '/design-package',
    packageLabel: 'Interior Packages',
    portfolioLink: '/gallery',
    portfolioLabel: 'View Interiors',
  },
  {
    num: '04',
    id: 'turnkey',
    title: 'One-Stop Solution: End-to-End Design + Construction + Interior',
    badge: 'MPA &amp; ARCH Foundation &bull; Design to Handover Under One Roof',
    desc: 'Get your dream home designed and constructed under one roof. Architectural design, residential construction, and interior design delivered seamlessly by one expert team — zero contractor hassles.',
    deliverables: [
      'End-to-end design and execution under a single point of accountability',
      'Custom architectural floor plans, 3D elevations, and municipal permits',
      'Full residential civil construction using certified branded materials',
      'Complete custom home interior joinery, false ceilings, and lighting',
      'Transparent package specifications with detailed, itemized pricing',
      'Direct internal coordination between architects, engineers, and carpenters',
      'Regular milestone construction progress updates for complete peace of mind',
      'Deep-cleaned residence delivered on time, ready for your housewarming',
    ],
    image: '/images/architecture/tropical-modern-villa.webp',
    detailLink: '/services/turnkey-construction',
    packageLink: '/construction-package',
    packageLabel: 'Turnkey Packages',
    portfolioLink: '/design-package',
    portfolioLabel: 'Design Packages',
  },
];

export default async function ServicesPage({ params }: PageProps) {
  const data = await readSourceConfig(undefined, 'template5');

  if (!data || !data.clinic) {
    notFound();
  }

  const phone = '09841098490';
  const displayPhone = '+91 98410 98490';
  const rawDigits = phone.replace(/\D/g, '');
  const cleanPhone = rawDigits.startsWith('91') ? rawDigits : `91${rawDigits.replace(/^0+/, '')}`;

  return (
    <div className="mpa-inner w-full bg-[#FAFAFA] text-[#111111]">
      {/* ── Breadcrumb Navigation ── */}
      <div className="bg-[#111214] px-6 py-3 md:px-12 border-b border-white/10">
        <nav aria-label="Breadcrumb" className="max-w-7xl mx-auto flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-white/60">
          <Link href="/" className="hover:text-[#EA580C] transition-colors">Home</Link>
          <span>/</span>
          <span className="text-[#EA580C]">All Capabilities &amp; Services</span>
        </nav>
      </div>

      {/* ── Hero Banner ── */}
      <PageIntro
        eyebrow="Start with where you are today"
        title="Choose the right path."
        accent="Know what comes next."
        description="Whether you have only a plot, completed drawings, a home ready for interiors, or need one coordinated team from design to handover—start with the service that matches your project today."
        bgImage="/images/architecture/architectural-blueprint-draft.webp"
      />

      {/* ── Detailed Services Rows ── */}
      <div className="divide-y-4 divide-[#111111] bg-white">
        {DETAILED_SERVICES.map((s, idx) => (
          <section id={s.id} key={s.num} className="relative scroll-mt-[110px] py-16 md:py-24 px-6 md:px-12">
            <div className="max-w-6xl mx-auto grid md:grid-cols-12 gap-12 items-center">
              {/* Text Specs */}
              <div className={`md:col-span-7 space-y-6 ${idx % 2 === 1 ? 'md:order-2' : ''}`}>
                <div className="flex items-center gap-3">
                  <span
                    className="text-4xl font-bold font-serif text-[#EA580C]"
                    style={{ fontFamily: "'Lora', serif" }}
                  >
                    {s.num}
                  </span>
                  <span 
                    className="text-[11px] font-bold tracking-widest uppercase bg-[#111111] text-white px-3 py-1"
                    dangerouslySetInnerHTML={{ __html: s.badge }}
                  />
                </div>

                <h2
                  className="text-2xl sm:text-3xl md:text-4xl font-bold font-serif text-[#111111] tracking-tight leading-tight"
                  style={{ fontFamily: "'Lora', serif" }}
                >
                  <Link href={s.detailLink} className="transition-colors hover:text-[#C2410C]">
                    {s.title}
                  </Link>
                </h2>

                <p className="text-sm sm:text-base text-[#666666] leading-relaxed font-medium">
                  {s.desc}
                </p>

                {/* Primary & Secondary Interlinks */}
                <div className="flex flex-wrap items-center gap-2.5 pt-1">
                  <Link
                    href={s.detailLink}
                    className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#111111] text-white text-[11px] font-bold uppercase tracking-wider hover:bg-[#EA580C] hover:text-[#111111] transition-colors"
                  >
                    <span>Read Guide</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                  <Link
                    href={s.packageLink}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 border border-[#111111]/30 text-[#111111] text-[11px] font-bold uppercase tracking-wider hover:border-[#EA580C] hover:text-[#EA580C] transition-colors"
                  >
                    <span>{s.packageLabel}</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                  <Link
                    href={s.portfolioLink}
                    className="inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-[#666666] hover:text-[#EA580C] transition-colors px-2 py-2"
                  >
                    <span>{s.portfolioLabel}</span>
                    <ArrowUpRight className="w-3 h-3" />
                  </Link>
                </div>

                <div className="pt-4 border-t-2 border-[#E0E0E0]">
                  <h4 className="text-xs font-bold uppercase tracking-widest text-[#111111] mb-4">
                    What this service covers for you:
                  </h4>
                  <ul className="grid sm:grid-cols-2 gap-3 text-xs sm:text-sm font-medium text-[#222222]">
                    {s.deliverables.map((item, dIdx) => (
                      <li key={dIdx} className="flex items-start gap-2">
                        <span className="text-[#EA580C] font-bold shrink-0">■</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Visual Frame */}
              <div className={`md:col-span-5 ${idx % 2 === 1 ? 'md:order-1' : ''}`}>
                <Link href={s.detailLink} aria-label={`View ${s.title} details`} className="relative block aspect-[4/3] border-4 border-[#111111] bg-[#181818] overflow-hidden shadow-xl group">
                  <Image
                    src={s.image}
                    alt={s.title}
                    fill
                    className="object-cover grayscale-[0.15] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                    sizes="(max-width: 768px) 100vw, 40vw"
                  />
                  <div className="absolute inset-0 bg-[#EA580C] mix-blend-overlay opacity-15 pointer-events-none" />
                  <span className="absolute bottom-4 right-4 grid h-11 w-11 place-items-center bg-[#EA580C] text-lg font-bold text-[#111111] transition-transform group-hover:-translate-y-1" aria-hidden="true">↗</span>
                </Link>
              </div>
            </div>
          </section>
        ))}
      </div>

      {/* ── Individual Service Guides Grid ── */}
      <section className="relative overflow-hidden border-b border-[#111111]/15 bg-[#E9E3DA] px-6 py-20 md:px-12 md:py-28">
        <div className="relative z-10 mx-auto max-w-7xl">
          <div data-motion-reveal className="mb-12 grid items-end gap-8 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <p className="mb-4 text-xs font-bold uppercase tracking-[0.22em] text-[#C2410C]">Deep-dive guides</p>
              <h2 className="font-serif text-4xl font-bold leading-[1.04] tracking-[-0.04em] text-[#111111] md:text-6xl">
                Find the service that fits<br />
                <em className="font-normal text-[#C2410C]">your project today.</em>
              </h2>
            </div>
            <p className="text-sm font-medium leading-relaxed text-[#5E5B55] lg:col-span-4 lg:col-start-9">
              Each guide speaks plainly: who it is for, what we handle, how the work feels week by week, what you take home — and the one sensible next step.
            </p>
          </div>
          <div data-motion-group className="grid border-l border-t border-[#111111]/20 md:grid-cols-2 lg:grid-cols-4">
            {SERVICE_DETAILS.map((service) => (
              <Link
                key={service.slug}
                href={`/services/${service.slug}`}
                className="group flex min-h-72 flex-col justify-between border-b border-r border-[#111111]/20 bg-[#F7F4EE]/90 p-7 transition-colors hover:bg-[#111111] md:p-8"
              >
                <span className="flex items-center justify-between font-mono text-[10px] font-bold tracking-[0.18em] text-[#C2410C] group-hover:text-[#FB923C]">
                  {service.number} / 04 <span className="text-lg transition-transform group-hover:translate-x-1" aria-hidden="true">&rarr;</span>
                </span>
                <span>
                  <span className="mb-3 block text-[9px] font-bold uppercase tracking-[0.15em] text-[#77736C] group-hover:text-white/45">{service.eyebrow}</span>
                  <span className="mb-4 block text-[9px] font-bold uppercase tracking-[0.14em] text-[#C2410C] group-hover:text-[#FB923C]">{service.ownership.label} / {service.ownership.company}</span>
                  <span className="block font-serif text-2xl font-bold leading-tight text-[#111111] group-hover:text-white">{service.title}<br /><em className="font-normal text-[#C2410C] group-hover:text-[#FB923C]">{service.accent}</em></span>
                  <span className="mt-4 line-clamp-3 block text-xs font-medium leading-relaxed text-[#66635D] group-hover:text-white/55">{service.summary}</span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. Compare Packages & Pricing Bridge ── */}
      <section id="package-comparison" className="py-20 md:py-28 px-6 md:px-12 bg-white border-b-4 border-[#111111]">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <p className="text-xs font-bold tracking-[0.25em] uppercase text-[#EA580C]">
              TRANSPARENT ESTIMATION &amp; SCOPE
            </p>
            <h2
              className="text-3xl sm:text-5xl font-bold font-serif text-[#111111] tracking-tight"
              style={{ fontFamily: "'Lora', serif" }}
            >
              Compare Packages &amp; Pricing
            </h2>
            <p className="text-sm sm:text-base text-[#55534E] font-medium leading-relaxed">
              Whether you need drawing sets before breaking ground or fixed-price civil construction with branded materials—our structured packages provide complete clarity.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Card 1: Design Packages */}
            <div className="p-8 sm:p-10 border-2 border-[#111111] bg-[#FAFAF8] flex flex-col justify-between space-y-6 hover:border-[#EA580C] hover:shadow-xl transition-all">
              <div className="space-y-4">
                <span className="inline-block px-3 py-1 bg-[#111111] text-[#EA580C] text-[10px] font-bold uppercase tracking-widest">
                  Murali Patharala &amp; Associates (MPA)
                </span>
                <h3 className="text-2xl sm:text-3xl font-bold font-serif text-[#111111]" style={{ fontFamily: "'Lora', serif" }}>
                  Architectural Design Packages
                </h3>
                <p className="text-xs sm:text-sm text-[#55534E] leading-relaxed font-medium">
                  Concept space planning, Vastu compliance, photorealistic 3D elevations, structural RCC framing sets, and CMDA sanction documentation before you begin construction.
                </p>
                <ul className="space-y-2 pt-2 text-xs font-semibold text-[#222222]">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#EA580C] shrink-0" />
                    <span>2D Floor Plans &amp; Furniture Layouts</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#EA580C] shrink-0" />
                    <span>Photorealistic 3D BIM Exterior Elevations</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#EA580C] shrink-0" />
                    <span>Structural Column-Beam Framing &amp; Soil Foundation</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#EA580C] shrink-0" />
                    <span>Itemized Bill of Quantities (BOQ) Cost Estimate</span>
                  </li>
                </ul>
              </div>

              <div className="pt-6 border-t border-[#111111]/10 flex flex-wrap items-center justify-between gap-3">
                <Link
                  href="/design-package"
                  className="px-4 py-2.5 bg-[#EA580C] text-[#111111] font-bold uppercase tracking-wider text-[11px] hover:bg-[#111111] hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <span>Compare Design Packages</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
                <Link
                  href="/services/architectural-design"
                  className="text-xs font-bold uppercase tracking-wider text-[#757575] hover:text-[#EA580C]"
                >
                  Design Process Guide &rarr;
                </Link>
              </div>
            </div>

            {/* Card 2: Construction Packages */}
            <div className="p-8 sm:p-10 border-2 border-[#111111] bg-[#FAFAF8] flex flex-col justify-between space-y-6 hover:border-[#EA580C] hover:shadow-xl transition-all">
              <div className="space-y-4">
                <span className="inline-block px-3 py-1 bg-[#EA580C] text-[#111111] text-[10px] font-bold uppercase tracking-widest">
                  ARCH Foundation
                </span>
                <h3 className="text-2xl sm:text-3xl font-bold font-serif text-[#111111]" style={{ fontFamily: "'Lora', serif" }}>
                  Fixed-Price Construction Packages
                </h3>
                <p className="text-xs sm:text-sm text-[#55534E] leading-relaxed font-medium">
                  Turnkey civil construction with primary Tata Tiscon steel, UltraTech 53-grade cement, 425+ quality control audits, and a legally frozen rate per square foot.
                </p>
                <ul className="space-y-2 pt-2 text-xs font-semibold text-[#222222]">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#EA580C] shrink-0" />
                    <span>Classic, Premium &amp; Supreme Package Standards</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#EA580C] shrink-0" />
                    <span>100% Fixed-Price Contract — Zero Material Escalation</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#EA580C] shrink-0" />
                    <span>Dedicated Daily Site Engineer &amp; 425+ QC Audits</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#EA580C] shrink-0" />
                    <span>10-Year Structural Warranty Certificate</span>
                  </li>
                </ul>
              </div>

              <div className="pt-6 border-t border-[#111111]/10 flex flex-wrap items-center justify-between gap-3">
                <Link
                  href="/construction-package"
                  className="px-4 py-2.5 bg-[#111111] text-white font-bold uppercase tracking-wider text-[11px] hover:bg-[#EA580C] hover:text-[#111111] transition-colors flex items-center gap-1.5"
                >
                  <span>Compare Construction Packages</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
                <Link
                  href="/services/residential-construction"
                  className="text-xs font-bold uppercase tracking-wider text-[#757575] hover:text-[#EA580C]"
                >
                  Construction Standards &rarr;
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Signature Luxury Interiors ── */}
      <section className="relative border-b-4 border-[#111111] bg-[#121418] text-white overflow-hidden p-8 md:p-16">
        <div className="max-w-5xl mx-auto space-y-6">
          <div className="inline-block px-3 py-1 bg-[#EA580C]/20 border border-[#EA580C] text-[#EA580C] text-[11px] font-bold uppercase tracking-widest">
            Signature Luxury Interiors &bull; End-to-End Solutions
          </div>
          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-bold font-serif text-white tracking-tight leading-tight"
            style={{ fontFamily: "'Lora', serif" }}
          >
            Your Dream Home Isn&apos;t a &lsquo;One-Size-Fits-All&rsquo; Scenario.
          </h2>
          <p className="text-white/80 text-sm sm:text-base leading-relaxed font-medium">
            At Murali Patharala & Associates (MPA), we curate bespoke architectural living environments. Every millwork joint, fabric texture, lighting channel, and material finish is tailored to your family&apos;s specific daily rhythm, ceiling height, and floor plan.
          </p>

          {/* Scope of Interior Elements Grid */}
          <div className="pt-4">
            <p className="text-xs font-bold uppercase tracking-widest text-[#EA580C] mb-4">
              Comprehensive In-House Interior Capabilities:
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                'Modular Kitchen',
                'Storage & Wardrobes',
                'False Ceiling & Lights',
                'TV Units & Wall Paneling',
                'Crockery & Bar Units',
                'Study & Home Office',
                'Pooja Units',
                'Shoe Racks & Foyers',
              ].map((srv, idx) => (
                <div key={idx} className="p-3 bg-[#1F1F1F] border border-[#333333] flex items-center gap-2">
                  <span className="text-[#EA580C] text-xs font-bold">✔</span>
                  <span className="text-xs font-semibold text-white/90">{srv}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-6 flex flex-wrap items-center gap-3">
            <Link
              href="/services/interior-design"
              className="px-4 py-2.5 bg-[#EA580C] text-[#111111] font-bold text-[11px] uppercase tracking-wider hover:bg-white transition-colors inline-flex items-center gap-1.5"
            >
              <span>Interior Design Guide</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <Link
              href="/gallery"
              className="px-4 py-2.5 border border-white/30 text-white font-bold text-[11px] uppercase tracking-wider hover:bg-white hover:text-[#111111] transition-colors inline-flex items-center gap-1.5"
            >
              <span>Inspect Finished Interiors</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>
 
      {/* ── Pre-Footer CTA ── */}
      <section className="relative py-16 md:py-24 px-6 md:px-12 bg-[#121418] text-white text-center overflow-hidden">
        {/* Background Architectural Elevation */}
        <Image
          src="/images/architecture/geometric-villa-elevation.webp"
          alt=""
          fill
          sizes="100vw"
          className="object-cover opacity-85 pointer-events-none select-none"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#121418]/90 via-[#121418]/60 to-[#121418]/30 pointer-events-none" />
        <div className="relative z-10 max-w-3xl mx-auto space-y-6">
          <p className="text-xs font-bold tracking-[0.2em] uppercase text-[#EA580C]">
            Ready to Build Your Dream Home?
          </p>
          <h2
            className="text-3xl sm:text-5xl font-bold font-serif tracking-tight drop-shadow-md"
            style={{ fontFamily: "'Lora', serif" }}
          >
            Get a Detailed Itemized BOQ for Your Plot
          </h2>
          <p className="text-sm sm:text-base text-white/70 font-medium leading-relaxed">
            Every material brand, specification grade, and timeline milestone transparently laid out in black and white with our 100% price freeze guarantee.
          </p>
          <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/construction-package#packages"
              className="px-5 py-3 bg-[#EA580C] text-[#111111] font-bold uppercase tracking-wider text-[11px] hover:bg-white transition-colors inline-flex items-center gap-2"
            >
              <span>Compare Construction Packages</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <Link
              href="/design-package"
              className="px-5 py-3 border border-white/40 text-white font-bold uppercase tracking-wider text-[11px] hover:bg-white hover:text-[#111111] transition-colors inline-flex items-center gap-2"
            >
              <span>Compare Design Packages</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
            <a
              href={`https://wa.me/${cleanPhone}?text=${encodeURIComponent('Hi Murali Patharala & Associates and ARCH Foundation, I would like to schedule a site feasibility consultation for my plot.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3 border border-[#EA580C] text-[#EA580C] font-bold uppercase tracking-wider text-[11px] hover:bg-[#EA580C] hover:text-[#111111] transition-colors inline-flex items-center gap-2"
            >
              <span>WhatsApp Studio</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
