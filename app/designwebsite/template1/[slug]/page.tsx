import { readSourceConfig } from '@/lib/dataBuilder';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import {
  ShieldCheck, FileText, Clock, BadgeCheck, CheckCircle2,
  Sparkles, Layers, Hammer, Compass, Award, ArrowRight
} from 'lucide-react';
import { cleanClinicName, cleanClinicDescription } from '@/lib/copyCleaner';
import {
  DEFAULT_INTERIOR_REVIEWS,
  DEFAULT_INTERIOR_SERVICES,
  DEFAULT_INTERIOR_HIGHLIGHTS,
  getInteriorServiceSummary,
  getServiceImage,
  previewMedia,
} from '@/lib/interiorContent';
import Reveal from './Reveal';
import LeadForm from './LeadForm';
import FAQAccordion, { FAQItem } from './FAQAccordion';
import HeroStats, { HeroStat } from './HeroStats';
import CountUp from '@/components/CountUp';

type PageProps = {
  params: Promise<{ slug: string }>;
};

const SERVICE_FALLBACK_IMAGES = [
  '/images/stock/68b39046.webp',
  '/images/stock/a0e0726f.webp',
  '/images/stock/dc1759ad.webp',
  '/images/stock/f23e9dc6.webp',
];

const PORTFOLIO_FALLBACK_IMAGES = [
  '/images/stock/615f9d34.webp',
  '/images/stock/6dcb103c.webp',
  '/images/stock/a151a9e5.webp',
  '/images/stock/bf333360.webp',
  '/images/stock/84fea9c5.webp',
  '/images/stock/284d6d29.webp',
];

const PROCESS_STEPS = [
  {
    title: 'Design Consultation & Spatial Audit',
    desc: 'Meet a principal designer at the studio or your home. We listen first — your morning routines, storage needs, aesthetic preferences, and budget.',
  },
  {
    title: 'Photoreal 3D Views & Transparent BOQ',
    desc: 'Cinematic 3D views of every room paired with an itemised bill of quantities. Iterate until the design feels unmistakably yours.',
  },
  {
    title: 'Factory Craft & On-Site Precision',
    desc: 'Automated CNC manufacturing and civil site works proceed in parallel with weekly milestone photos and zero hidden contractor delays.',
  },
  {
    title: 'White-Glove Installation & Styling',
    desc: 'Rapid dust-free installation, 140-point quality audit, deep-clean styling, and complete keys handover with our 10-year warranty document.',
  },
];

const DESIGN_PILLARS = [
  {
    icon: Compass,
    title: 'Proportion & Natural Light',
    desc: 'Architectural alignments that capture morning sun and create effortless flow between living, dining, and private family spaces.',
  },
  {
    icon: Hammer,
    title: 'Heritage & Contemporary Joinery',
    desc: 'Clean mitred corners, fluted details, and concealed handles engineered for effortless daily tactile delight.',
  },
  {
    icon: Layers,
    title: 'Invisible Storage Architecture',
    desc: 'Full-height seamless wardrobes, hydraulic shoe pull-outs, and appliance garages that swallow clutter whole.',
  },
  {
    icon: Sparkles,
    title: 'Sensory Material Composition',
    desc: 'Tactile textured linens, brushed warm metallics, natural veneers, and soothing biophilic palettes that calm the mind.',
  },
];

export default async function Template1Home({ params }: PageProps) {
  const { slug } = await params;
  const basePath = `/designwebsite/template1/${slug}`;

  const data = await readSourceConfig(slug, 'template1');
  if (!data) return notFound();

  const { clinic, doctor, business } = data;

  const media = previewMedia(data.media);

  const cleanName = cleanClinicName(clinic.name);
  const cleanDesc = cleanClinicDescription(clinic.description, clinic.name);
  const city = clinic.address?.city || 'Chennai';
  const phone = clinic.contact?.phone || '';
  const waPhone = phone.replace(/\D/g, '') || '919751396117';

  const heroImage =
    media.clinicImages?.[0] ||
    '/images/stock/36e83915.webp';
  const aboutImage =
    media.clinicImages?.[1] ||
    '/images/stock/90879216.webp';
  const whyImage =
    media.otherImages?.[2] ||
    '/images/stock/34bba44b.webp';
  const ctaImage =
    media.otherImages?.[3] ||
    '/images/stock/7617327a.webp';

  const servicesList: string[] = business.services?.length ? business.services : DEFAULT_INTERIOR_SERVICES;
  const highlights: string[] = business.highlights?.length ? business.highlights : DEFAULT_INTERIOR_HIGHLIGHTS;
  const reviews = data.reviews?.length ? data.reviews : DEFAULT_INTERIOR_REVIEWS;
  const rating = business.rating || '4.9';
  const experienceYears = doctor?.experience?.replace(/\D/g, '') || '5';

  const ratingNum = parseFloat(business.rating) || 4.9;
  const experienceYearsNum = parseInt(doctor?.experience?.replace(/\D/g, '') || '5', 10) || 5;
  const servicesCountNum = servicesList.length || 6;
  const reviewCountNum = parseInt(String(business.reviewCount || '100').replace(/\D/g, ''), 10) || 100;

  const heroStats: HeroStat[] = [
    { value: ratingNum, decimals: 1, suffix: '★', label: 'Google Rating' },
    { value: experienceYearsNum, decimals: 0, suffix: '+ yrs', label: 'Of Craftsmanship' },
    { value: servicesCountNum, decimals: 0, suffix: '+', label: 'Design Disciplines' },
    { value: reviewCountNum, decimals: 0, suffix: '+', label: 'Delivered Residences' },
  ];

  const portfolioImages = [
    ...(media.treatmentImages || []),
    ...(media.clinicImages || []).slice(2),
    ...(media.otherImages || []).slice(6),
  ].filter(Boolean);
  const gallery = portfolioImages.length >= 6 ? portfolioImages.slice(0, 6) : PORTFOLIO_FALLBACK_IMAGES;

  const previewServices = servicesList.slice(0, 4).map((svc: string, idx: number) => ({
    title: svc,
    desc: getInteriorServiceSummary(svc).split('. ')[0] + '.',
    img:
      getServiceImage(svc, media) ||
      media.treatmentImages?.[idx] ||
      SERVICE_FALLBACK_IMAGES[idx % SERVICE_FALLBACK_IMAGES.length],
  }));

  const whyChecks = [
    { icon: ShieldCheck, title: highlights[0] || 'Personalized design concepts', desc: 'Every project starts from your daily lifestyle rituals — never a copy-paste catalogue look.' },
    { icon: FileText, title: highlights[1] || 'Material and finish guidance', desc: 'Curated palettes, BWP marine plywood, and honest advisory on materials engineered to endure.' },
    { icon: Clock, title: highlights[2] || 'Transparent project planning', desc: 'Itemised BOQ quotes and a strict 45-day handover schedule you can hold us accountable to.' },
    { icon: BadgeCheck, title: highlights[3] || 'End-to-end execution support', desc: 'One accountable interior design team from the first sketch to final turnkey styling.' },
  ];

  const homeFaqs: FAQItem[] = [
    {
      q: `How does the design consultation with ${cleanName || 'your studio'} work?`,
      a: `Our initial 45-minute consultation is completely free. We review your floor plan, discuss your family's routines, design aesthetic preferences, and budget goals, and present you with spatial concepts and ballpark cost estimates.`,
      tag: 'Consultation',
    },
    {
      q: 'What is the typical turnaround timeline for a full home interior?',
      a: `Most 2BHK and 3BHK residential projects are completed and handed over within 45 working days following 3D design approval and milestone signoff. Custom villa architecture and structural modifications range from 60 to 75 days.`,
      tag: 'Timelines',
    },
    {
      q: 'Do you provide a formal warranty on woodwork and modular hardware?',
      a: `Yes. We provide an unconditional 10-year structural warranty on all factory-pressed BWP marine plywood woodwork, and up to a lifetime functional warranty on German hardware fittings from Blum and Häfele.`,
      tag: 'Warranty',
    },
    {
      q: 'Can we customize materials, veneers, and color palettes?',
      a: `Absolutely. You can select from over 300+ curated laminates, anti-fingerprint acrylics, PU polishes, natural veneers, and quartz countertops in our studio material library under your designer's guidance.`,
      tag: 'Customization',
    },
    {
      q: 'How do you ensure zero budget overruns during execution?',
      a: `Every line item is clearly specified in our itemised Bill of Quantities (BOQ) before work begins. Once approved, your project price is frozen with our 0% Cost Escalation Guarantee.`,
      tag: 'Budget Guarantee',
    },
  ];

  return (
    <div>
      {/* HERO */}
      <section id="hero" className="relative min-h-[calc(100vh-116px)] flex flex-col justify-end text-white !p-0">
        <div className="absolute inset-0">
          <img src={heroImage} alt={`${cleanName || 'Studio'} signature interior`} className="w-full h-full object-cover" fetchPriority="high" />
          <div className="absolute inset-0 bg-[linear-gradient(78deg,rgba(24,18,12,0.88)_0%,rgba(24,18,12,0.58)_42%,rgba(24,18,12,0.18)_72%),linear-gradient(0deg,rgba(24,18,12,0.7)_0%,transparent_30%)]" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-7 pt-28 w-full">
          <span className="inline-flex items-center gap-3.5 text-[12.5px] tracking-[0.38em] uppercase text-[#c9ab7c] mb-6 before:content-[''] before:w-[52px] before:h-px before:bg-[#c9ab7c]">
            Interior Architecture &amp; Turnkey Design — {city}
          </span>
          <h1 className="font-[family-name:var(--font-marcellus)] text-[clamp(42px,5.8vw,82px)] leading-[1.06] max-w-[780px]">
            {clinic.tagline || 'Uncompromising Quality In Every Detail'}
          </h1>
          <p className="mt-6 mb-9 max-w-[580px] text-[17px] font-light leading-[1.75] text-white/85">
            {cleanDesc || `A full-service residential interior design and turnkey execution studio in ${city}. We exclusively use first-quality products to ensure generational durability.`}
          </p>
          <div className="flex flex-wrap gap-4 mb-16">
            <Link
              href={`${basePath}/contact`}
              className="inline-flex items-center gap-2 bg-[#a58150] text-white px-5 py-3 sm:px-6 sm:py-3.5 text-[10.5px] sm:text-[11.5px] tracking-[0.2em] uppercase font-medium border border-[#a58150] hover:bg-[#211a13] hover:border-[#211a13] transition-colors duration-300"
            >
              Reach Us
            </Link>
            <Link
              href={`${basePath}/gallery`}
              className="inline-flex items-center gap-2 bg-transparent text-white px-5 py-3 sm:px-6 sm:py-3.5 text-[10.5px] sm:text-[11.5px] tracking-[0.2em] uppercase font-medium border border-white/50 hover:border-white hover:bg-white/10 transition-colors duration-300"
            >
              Projects
            </Link>
          </div>
        </div>

        {/* STATS BAR */}
        <HeroStats stats={heroStats} />
      </section>

      {/* TRUST ASSURANCE RIBBON */}
      <section className="bg-[#1b150f] text-[#c9ab7c] py-5 px-6 border-b border-[#a58150]/20">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-around items-center gap-6 text-[12px] tracking-[0.2em] uppercase font-medium">
          <span className="flex items-center gap-2.5">
            <Award className="w-4 h-4 text-[#a58150]" /> 10-Year Structural Warranty
          </span>
          <span className="flex items-center gap-2.5">
            <Clock className="w-4 h-4 text-[#a58150]" /> 45-Day Handover Guarantee
          </span>
          <span className="flex items-center gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-[#a58150]" /> 140+ Point Quality Audit
          </span>
          <span className="flex items-center gap-2.5">
            <ShieldCheck className="w-4 h-4 text-[#a58150]" /> 0% Cost Overrun Guarantee
          </span>
        </div>
      </section>

      {/* ABOUT STUDIO */}
      <section id="about" className="py-[clamp(84px,9vw,130px)] px-6 lg:px-7">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-[1.05fr_0.95fr] gap-[clamp(44px,6vw,90px)] items-center">
          <Reveal>
            <div className="relative before:content-[''] before:absolute before:-left-4 before:-top-4 before:right-14 before:bottom-14 before:border before:border-[#a58150]">
              <div className="overflow-hidden aspect-[4/4.7] group">
                <img
                  src={aboutImage}
                  alt={`Inside the ${cleanName || 'design'} studio`}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(.19,1,.22,1)] group-hover:scale-[1.04]"
                />
              </div>
              <div className="absolute -right-2 sm:-right-4 bottom-11 bg-[#211a13] text-white px-8 py-7 shadow-[0_30px_60px_rgba(33,26,19,0.3)]">
                <b className="font-[family-name:var(--font-marcellus)] font-normal text-[44px] text-[#c9ab7c] block leading-none">
                  <CountUp value={experienceYears} suffix="+" />
                </b>
                <span className="text-[11px] tracking-[0.3em] uppercase text-white/65">Years in {city}</span>
              </div>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <span className="flex items-center gap-3.5 text-[12px] tracking-[0.38em] uppercase text-[#a58150] mb-4 before:content-[''] before:w-10 before:h-px before:bg-[#a58150]">
              The Studio
            </span>
            <h2 className="font-[family-name:var(--font-marcellus)] text-[clamp(32px,3.8vw,52px)] leading-[1.12] mb-6">
              A design house rooted in{' '}
              <em className="not-italic font-light italic text-[#a58150]">the way you live</em>
            </h2>
            <p className="text-[#7d7264] leading-[1.85] font-light mb-4.5 text-[15.5px]">
              {cleanDesc || 'We believe extraordinary homes are created not through imported catalogues, but by listening deeply to the unique rituals and routines of the families that inhabit them.'}
            </p>
            <p className="text-[#7d7264] leading-[1.85] font-light text-[15.5px]">
              Led by {doctor?.name || 'our principal design team'} — {doctor?.specialization || 'Interior Architecture & Turnkey Execution'} — we design
              spaces around real lives: ergonomic kitchens built for passionate cooking, silent joinery with storage that conceals clutter, and light-filled living rooms made for memorable family gatherings.
            </p>
            <div className="grid sm:grid-cols-2 gap-x-8 gap-y-5 my-8">
              {highlights.slice(0, 4).map((h) => (
                <div key={h} className="border-t border-[#211a13]/10 pt-4">
                  <b className="font-[family-name:var(--font-marcellus)] font-normal text-[17px] block mb-1.5">{h}</b>
                  <span className="text-[13px] text-[#7d7264] font-light">Customized and executed to millimeter precision.</span>
                </div>
              ))}
            </div>
            <Link
              href={`${basePath}/about`}
              className="inline-flex items-center gap-2 bg-transparent text-[#211a13] px-5 py-3 sm:px-6 sm:py-3.5 text-[10.5px] sm:text-[11.5px] tracking-[0.2em] uppercase font-medium border border-[#211a13] hover:bg-[#211a13] hover:text-white transition-colors duration-300"
            >
              Our Story
            </Link>
          </Reveal>
        </div>
      </section>

      {/* DESIGN PILLARS */}
      <section className="py-[clamp(84px,9vw,120px)] px-6 lg:px-7 bg-[#211a13] text-white">
        <div className="max-w-7xl mx-auto">
          <Reveal className="text-center max-w-3xl mx-auto mb-[clamp(44px,5vw,72px)]">
            <span className="inline-flex items-center gap-3.5 text-[12px] tracking-[0.38em] uppercase text-[#c9ab7c] mb-4 before:content-[''] before:w-10 before:h-px before:bg-[#c9ab7c] after:content-[''] after:w-10 after:h-px after:bg-[#c9ab7c]">
              Architectural Standard
            </span>
            <h2 className="font-[family-name:var(--font-marcellus)] text-[clamp(34px,4.2vw,56px)] leading-[1.1] mb-5">
              The four pillars of <em className="not-italic italic font-light text-[#c9ab7c]">exceptional spaces</em>
            </h2>
            <p className="text-white/70 font-light text-[15.5px] leading-relaxed">
              Every drawing and joint that leaves our studio adheres to strict spatial principles to ensure long-term comfort, beauty, and durability.
            </p>
          </Reveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {DESIGN_PILLARS.map((pillar, idx) => {
              const Icon = pillar.icon;
              return (
                <Reveal key={pillar.title} delay={idx * 80}>
                  <div className="bg-[#2c231a] border border-[#a58150]/20 p-8 h-full flex flex-col justify-between transition-all duration-300 hover:border-[#a58150] hover:-translate-y-1">
                    <div>
                      <span className="w-12 h-12 border border-[#a58150] grid place-items-center mb-6 text-[#c9ab7c]">
                        <Icon className="w-5 h-5" strokeWidth={1.8} />
                      </span>
                      <h3 className="font-[family-name:var(--font-marcellus)] font-normal text-[20px] mb-3 text-white">
                        {pillar.title}
                      </h3>
                      <p className="text-[13.5px] font-light text-white/70 leading-[1.7]">
                        {pillar.desc}
                      </p>
                    </div>
                    <span className="font-[family-name:var(--font-marcellus)] text-[14px] text-[#a58150] mt-6 block">
                      0{idx + 1}
                    </span>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="py-[clamp(84px,9vw,130px)] px-6 lg:px-7 bg-[#fdfbf6] border-y border-[#211a13]/10">
        <div className="max-w-7xl mx-auto">
          <Reveal className="flex flex-wrap justify-between items-end gap-10 mb-[clamp(44px,5vw,68px)]">
            <div>
              <span className="flex items-center gap-3.5 text-[12px] tracking-[0.38em] uppercase text-[#a58150] mb-4 before:content-[''] before:w-10 before:h-px before:bg-[#a58150]">
                Disciplines &amp; Scope
              </span>
              <h2 className="font-[family-name:var(--font-marcellus)] text-[clamp(34px,4.2vw,58px)] leading-[1.1]">
                End-to-end <em className="not-italic italic font-light text-[#a58150]">turnkey execution</em>
              </h2>
            </div>
            <p className="max-w-[440px] text-[#7d7264] leading-[1.8] text-[15.5px] font-light">
              From architectural space planning to bespoke joinery, civil transformations, false ceilings, and decor styling — managed under a single contract.
            </p>
          </Reveal>

          <Reveal className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {previewServices.map((svc, idx) => (
              <Link key={svc.title} href={`${basePath}/services`} className="group relative overflow-hidden aspect-[3/4] flex items-end text-white">
                <img
                  src={svc.img}
                  alt={svc.title}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 ease-[cubic-bezier(.19,1,.22,1)] group-hover:scale-[1.07]"
                />
                <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(24,18,12,0.9)_0%,rgba(24,18,12,0.32)_45%,rgba(24,18,12,0.06)_70%)]" />
                <div className="relative z-10 p-6">
                  <small className="text-[10.5px] tracking-[0.3em] uppercase text-[#c9ab7c] block mb-2.5">
                    0{idx + 1} — Service
                  </small>
                  <h3 className="font-[family-name:var(--font-marcellus)] font-normal text-[22px] mb-2.5">{svc.title}</h3>
                  <p className="text-[13px] font-light text-white/85 leading-[1.6] max-h-0 opacity-0 overflow-hidden transition-all duration-500 group-hover:max-h-[120px] group-hover:opacity-100 group-hover:mb-1">
                    {svc.desc}
                  </p>
                </div>
              </Link>
            ))}
          </Reveal>

          <Reveal className="text-center mt-12">
            <Link
              href={`${basePath}/services`}
              className="inline-flex items-center gap-3 text-[12.5px] tracking-[0.2em] uppercase font-medium text-[#211a13] border-b border-[#a58150] pb-1.5 hover:text-[#a58150] transition-colors"
            >
              Explore Full Service Specifications &rarr;
            </Link>
          </Reveal>
        </div>
      </section>

      {/* INTERACTIVE SCOPE ESTIMATOR */}
      <section className="bg-[#1b150f] py-[clamp(84px,9vw,130px)] px-6 lg:px-7 text-white border-y border-[#211a13]/10">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-10">
            <Reveal className="max-w-3xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="h-px w-10 bg-[#c9ab7c]"></div>
                <span className="text-[12px] font-black uppercase tracking-[0.38em] text-[#c9ab7c]">Premium Materials</span>
              </div>
              <h2 className="font-[family-name:var(--font-marcellus)] text-[clamp(34px,4.2vw,56px)] leading-[1.1]">
                Uncompromising Quality <br className="hidden md:block"/> In Every Detail
              </h2>
            </Reveal>
            <Reveal delay={0.1} className="max-w-sm flex flex-col items-start gap-6">
              <p className="text-[15.5px] font-light leading-[1.85] text-white/70 border-l border-[#c9ab7c]/30 pl-6">
                For all the spaces we design and execute, we exclusively use premium, certified materials and hardware to ensure generational durability and timeless elegance.
              </p>
            </Reveal>
          </div>
          <Reveal delay={0.2} className="mt-16 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 border-l border-t border-[#c9ab7c]/10">
            {[
              { name: "CenturyPly" },
              { name: "Asian Paints" },
              { name: "Hettich" },
              { name: "Hafele" },
              { name: "Saint-Gobain" },
              { name: "Legrand" },
              { name: "Godrej Locks" },
              { name: "Kohler" },
              { name: "Kajaria" },
              { name: "Premium Assured" }
            ].map((brand) => (
              <div key={brand.name} className="flex flex-col items-center justify-center p-6 sm:p-8 border-r border-b border-[#c9ab7c]/10 min-h-[150px] sm:min-h-[200px] h-full transition-all duration-500 hover:bg-[#211a13] hover:-translate-y-1 relative group">
                <ShieldCheck className="h-8 w-8 text-[#c9ab7c] mb-3 opacity-80 group-hover:scale-110 transition-transform duration-500" />
                <p className="text-[11px] font-black uppercase tracking-[0.1em] text-white/80 group-hover:text-white transition-colors duration-500 text-center">
                  {brand.name}
                </p>
                <p className="mt-1 text-[9px] font-bold uppercase tracking-[0.2em] text-[#c9ab7c]/60">Guaranteed</p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* PORTFOLIO */}
      <section id="work" className="py-[clamp(84px,9vw,130px)] px-6 lg:px-7 bg-[#fdfbf6] border-y border-[#211a13]/10">
        <div className="max-w-7xl mx-auto">
          <Reveal className="flex flex-wrap justify-between items-end gap-10 mb-[clamp(44px,5vw,68px)]">
            <div>
              <span className="flex items-center gap-3.5 text-[12px] tracking-[0.38em] uppercase text-[#a58150] mb-4 before:content-[''] before:w-10 before:h-px before:bg-[#a58150]">
                Selected Work
              </span>
              <h2 className="font-[family-name:var(--font-marcellus)] text-[clamp(34px,4.2vw,58px)] leading-[1.1]">
                Completed residences across <em className="not-italic italic font-light text-[#a58150]">{city}</em>
              </h2>
            </div>
            <p className="max-w-[430px] text-[#7d7264] leading-[1.8] text-[15.5px] font-light">
              Every photograph is a real delivered home. Discover how we balance craftsmanship with livability.
            </p>
          </Reveal>

          <div className="grid grid-cols-12 gap-5">
            {gallery.map((img, idx) => {
              const spans = ['col-span-12 md:col-span-7 aspect-[16/10.5]', 'col-span-12 md:col-span-5 aspect-[4/3.36]', 'col-span-12 md:col-span-5 aspect-[4/3.36]', 'col-span-12 md:col-span-7 aspect-[16/10.5]', 'col-span-12 md:col-span-6 aspect-[16/10]', 'col-span-12 md:col-span-6 aspect-[16/10]'];
              return (
                <Reveal key={idx} className={spans[idx % 6]} delay={(idx % 3) * 80}>
                  <Link href={`${basePath}/gallery`} className="group relative overflow-hidden flex items-end text-white w-full h-full">
                    <img
                      src={img}
                      alt={`${cleanName || 'Studio'} project ${idx + 1}`}
                      loading="lazy"
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 ease-[cubic-bezier(.19,1,.22,1)] group-hover:scale-[1.06]"
                    />
                    <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(24,18,12,0.85)_0%,transparent_46%)]" />
                    <div className="relative z-10 flex justify-between items-end w-full px-6 py-6">
                      <div>
                        <span className="text-[11px] tracking-[0.24em] uppercase text-[#c9ab7c]">{city}</span>
                        <b className="font-[family-name:var(--font-marcellus)] font-normal text-[20px] block">Project Residence {String(idx + 1).padStart(2, '0')}</b>
                      </div>
                      <span className="font-[family-name:var(--font-marcellus)] text-[15px] text-white/55">/ 0{idx + 1}</span>
                    </div>
                  </Link>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section id="process" className="py-[clamp(84px,9vw,130px)] px-6 lg:px-7 bg-[#211a13] text-white">
        <div className="max-w-7xl mx-auto">
          <Reveal className="flex flex-wrap justify-between items-end gap-10 mb-[clamp(44px,5vw,68px)]">
            <div>
              <span className="flex items-center gap-3.5 text-[12px] tracking-[0.38em] uppercase text-[#c9ab7c] mb-4 before:content-[''] before:w-10 before:h-px before:bg-[#c9ab7c]">
                The Journey
              </span>
              <h2 className="font-[family-name:var(--font-marcellus)] text-[clamp(34px,4.2vw,58px)] leading-[1.1]">
                From first sketch to <em className="not-italic italic font-light text-[#c9ab7c]">housewarming</em>
              </h2>
            </div>
            <p className="max-w-[430px] text-white/60 leading-[1.8] text-[15.5px] font-light">
              A structured milestone-driven roadmap — complete transparency with zero contractor chasing.
            </p>
          </Reveal>

          <Reveal className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-[#f6f1e8]/15 border border-[#f6f1e8]/15">
            {PROCESS_STEPS.map((step, idx) => (
              <div key={step.title} className="bg-[#211a13] hover:bg-[#2c231a] transition-colors duration-400 px-7 py-9">
                <span
                  className="font-[family-name:var(--font-marcellus)] text-[52px] block mb-5 text-transparent"
                  style={{ WebkitTextStroke: '1px #a58150' }}
                >
                  0{idx + 1}
                </span>
                <h3 className="font-[family-name:var(--font-marcellus)] font-normal text-[21px] mb-3">{step.title}</h3>
                <p className="text-[13.5px] font-light text-white/65 leading-[1.7]">{step.desc}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* WHY US */}
      <section id="why" className="py-[clamp(84px,9vw,130px)] px-6 lg:px-7">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-[0.95fr_1.05fr] gap-[clamp(44px,6vw,90px)] items-center">
          <Reveal className="relative overflow-hidden aspect-[4/4.4]">
            <img src={whyImage} alt="Design and material planning" loading="lazy" className="w-full h-full object-cover" />
          </Reveal>

          <Reveal delay={120}>
            <span className="flex items-center gap-3.5 text-[12px] tracking-[0.38em] uppercase text-[#a58150] mb-4 before:content-[''] before:w-10 before:h-px before:bg-[#a58150]">
              Why {cleanName || 'us'}
            </span>
            <h2 className="font-[family-name:var(--font-marcellus)] text-[clamp(32px,3.8vw,52px)] leading-[1.12] mb-6">
              The reassurance of a <em className="not-italic italic font-light text-[#a58150]">serious design house</em>
            </h2>
            <p className="text-[#7d7264] leading-[1.85] font-light text-[15.5px] mb-7">
              Interior projects traditionally go wrong in the friction between architects, carpenters, and civil contractors. We eliminated the confusion by housing spatial design, precision joinery manufacturing, and site supervision under one roof.
            </p>
            <div>
              {whyChecks.map((check, idx) => {
                const Icon = check.icon;
                return (
                  <div key={idx} className={`flex gap-5 py-5 border-b border-[#211a13]/10 items-start ${idx === 0 ? 'border-t' : ''}`}>
                    <span className="w-10 h-10 shrink-0 border border-[#a58150] grid place-items-center">
                      <Icon className="w-[18px] h-[18px] text-[#a58150]" strokeWidth={1.8} />
                    </span>
                    <div>
                      <b className="font-[family-name:var(--font-marcellus)] font-normal text-[17px] block mb-1">{check.title}</b>
                      <span className="text-[13.5px] text-[#7d7264] font-light leading-[1.6]">{check.desc}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </Reveal>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section id="reviews" className="py-[clamp(84px,9vw,130px)] px-6 lg:px-7 bg-[#fdfbf6] border-y border-[#211a13]/10">
        <div className="max-w-7xl mx-auto">
          <Reveal className="flex flex-wrap justify-between items-end gap-10 mb-[clamp(44px,5vw,68px)]">
            <div>
              <span className="flex items-center gap-3.5 text-[12px] tracking-[0.38em] uppercase text-[#a58150] mb-4 before:content-[''] before:w-10 before:h-px before:bg-[#a58150]">
                Client Stories
              </span>
              <h2 className="font-[family-name:var(--font-marcellus)] text-[clamp(34px,4.2vw,58px)] leading-[1.1]">
                Loved by homeowners <em className="not-italic italic font-light text-[#a58150]">across {city}</em>
              </h2>
            </div>
            <p className="max-w-[430px] text-[#7d7264] leading-[1.8] text-[15.5px] font-light">
              {rating} average on Google — the reputation we guard most carefully.
            </p>
          </Reveal>

          <Reveal className="grid md:grid-cols-3 gap-6">
            {reviews.slice(0, 3).map((review: any, i: number) => (
              <div
                key={i}
                className="bg-[#f6f1e8] border border-[#211a13]/10 px-8 py-9 flex flex-col gap-5 transition-all duration-300 hover:border-[#a58150] hover:-translate-y-1.5"
              >
                <span className="text-[#a58150] tracking-[5px] text-[14px]">
                  {'★'.repeat(Math.max(1, Math.min(5, parseInt(String(review.rating)) || 5)))}
                </span>
                <blockquote className="font-[family-name:var(--font-marcellus)] text-[17.5px] leading-[1.65] flex-1">
                  &ldquo;{review.text}&rdquo;
                </blockquote>
                <div className="flex items-center gap-3.5 border-t border-[#211a13]/10 pt-5">
                  <span className="w-[46px] h-[46px] rounded-full bg-[#211a13] text-[#c9ab7c] grid place-items-center font-[family-name:var(--font-marcellus)] text-[18px]">
                    {(review.author || 'C').charAt(0)}
                  </span>
                  <div>
                    <b className="block text-[14.5px] font-medium">{review.author || 'Homeowner'}</b>
                    <span className="text-[12px] text-[#7d7264] tracking-[0.08em]">Verified Homeowner · {city}</span>
                  </div>
                </div>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* HOME FAQ */}
      <section id="faqs" className="py-[clamp(84px,9vw,130px)] px-6 lg:px-7">
        <div className="max-w-4xl mx-auto">
          <Reveal className="text-center mb-12">
            <span className="inline-flex items-center gap-3.5 text-[12px] tracking-[0.38em] uppercase text-[#a58150] mb-4 before:content-[''] before:w-10 before:h-px before:bg-[#a58150] after:content-[''] after:w-10 after:h-px after:bg-[#a58150]">
              Frequently Asked Questions
            </span>
            <h2 className="font-[family-name:var(--font-marcellus)] text-[clamp(32px,3.8vw,52px)] leading-[1.12] mb-4">
              Everything you need to know <em className="not-italic italic font-light text-[#a58150]">before starting</em>
            </h2>
            <p className="text-[#7d7264] font-light text-[15.5px]">
              Clear answers on pricing, timelines, material specifications, and design workflows.
            </p>
          </Reveal>

          <Reveal>
            <FAQAccordion items={homeFaqs} />
          </Reveal>
        </div>
      </section>

      {/* PROJECT ESTIMATE (FINAL SECTION) */}
      <section id="estimator" className="relative py-[clamp(84px,9vw,130px)] px-6 lg:px-7 text-white overflow-hidden">
        <div className="absolute inset-0">
          <img src={ctaImage} alt="" loading="lazy" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(24,18,12,0.95)_0%,rgba(24,18,12,0.85)_55%,rgba(24,18,12,0.55)_100%)]" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto grid lg:grid-cols-[1.05fr_0.95fr] gap-[clamp(44px,6vw,90px)] items-center">
          <Reveal>
            <span className="flex items-center gap-3.5 text-[12px] tracking-[0.38em] uppercase text-[#c9ab7c] mb-4 before:content-[''] before:w-10 before:h-px before:bg-[#c9ab7c]">
              PROJECT ESTIMATE
            </span>
            <h2 className="font-[family-name:var(--font-marcellus)] text-[clamp(34px,4.4vw,58px)] leading-[1.1] mb-5">
              Transparent Pricing,<br />
              <em className="not-italic italic font-light text-[#c9ab7c]">No Hidden Costs</em>
            </h2>
            <p className="text-white/80 font-light leading-[1.8] max-w-[500px] mb-7">
              Fill out the brief form to receive a detailed, line-item quotation for your dream home. Our design-build experts will get back to you with a clear cost breakdown based on your plot size and requirements.
            </p>

            <div className="mt-8 grid gap-6 sm:grid-cols-2 border-t border-white/15 pt-8">
              <div>
                <h3 className="text-[17px] font-medium text-[#c9ab7c] mb-2">01 / Share Details</h3>
                <p className="text-[14px] text-white/70 font-light leading-[1.6]">
                  Tell us about your floor plan, location, and lifestyle requirements.
                </p>
              </div>
              <div>
                <h3 className="text-[17px] font-medium text-[#c9ab7c] mb-2">02 / Get Estimate</h3>
                <p className="text-[14px] text-white/70 font-light leading-[1.6]">
                  Receive a transparent quotation covering turnkey execution and interiors.
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <LeadForm studioName={cleanName || 'the studio'} waPhone={waPhone} phoneDisplay={phone} />
          </Reveal>
        </div>
      </section>
    </div>
  );
}
