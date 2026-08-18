import { readSourceConfig } from '@/lib/dataBuilder';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowRight, ClipboardCheck, ShieldCheck, Check, X, Clock, Sparkles, Layers } from 'lucide-react';
import { cleanClinicName, cleanClinicDescription } from '@/lib/copyCleaner';
import {
  DEFAULT_INTERIOR_REVIEWS,
  DEFAULT_INTERIOR_SERVICES,
  getInteriorServiceData,
  previewMedia,
} from '@/lib/interiorContent';
import Reveal from './Reveal';
import LeadForm from './LeadForm';
import BeforeAfter from './BeforeAfter';
import FAQAccordion, { FAQItem } from './FAQAccordion';
import HeroStats, { HeroStat } from './HeroStats';
import CountUp from '@/components/CountUp';

type PageProps = { params: Promise<{ slug: string }> };

const OFFERING_FALLBACK_IMAGES = [
  '/images/stock/68b39046.webp',
  '/images/stock/a0e0726f.webp',
  '/images/stock/dc1759ad.webp',
  '/images/stock/f23e9dc6.webp',
  '/images/stock/615f9d34.webp',
];

const PROJECT_FALLBACK_IMAGES = [
  '/images/stock/6dcb103c.webp',
  '/images/stock/a151a9e5.webp',
  '/images/stock/bf333360.webp',
  '/images/stock/84fea9c5.webp',
  '/images/stock/284d6d29.webp',
  '/images/stock/36e83915.webp',
];

const PROCESS = [
  { num: 1, title: 'Say Hello', desc: 'Book a free consultation — at our design studio, your residence, or online.' },
  { num: 2, title: 'Spatial Mapping', desc: 'Your interior designer maps your daily routines, storage needs, and budget over tea.' },
  { num: 3, title: '3D Views & BOQ', desc: 'Photorealistic 3D designs and an itemised quote, revised until you are 100% satisfied.' },
  { num: 4, title: 'Factory Production', desc: 'Precision CNC automated woodworking while on-site civil prep runs in parallel.' },
  { num: 5, title: 'White-Glove Install', desc: 'Dust-free modular installation, 140-point quality audit, and deep-clean styling.' },
  { num: 6, title: 'Handover & Warranty', desc: 'Key handover with a 10-year structural warranty certificate and dedicated post-care support.' },
];

const COMPARISON_POINTS = [
  { feature: 'Quotation Pricing', studio: '100% Itemised BOQ with 0% Cost Overrun Lock', contractor: 'Vague estimates with frequent mid-project cost spikes' },
  { feature: 'Delivery Timeline', studio: 'Guaranteed 45-Day Handover with penalty clause', contractor: 'Unpredictable delays extending 3 to 6 months' },
  { feature: 'Woodwork Quality', studio: 'Calibrated BWP Marine Ply with CNC factory edging', contractor: 'Manual on-site cuts with jagged edges and glue fumes' },
  { feature: 'Hardware & Fittings', studio: 'Certified Blum & Häfele with up to lifetime warranty', contractor: 'Unbranded local fittings that loosen in 12 months' },
  { feature: 'Design Support', studio: 'Photoreal 3D walkthroughs & dedicated architect', contractor: 'Basic sketches on paper with zero visual clarity' },
];

const CONSULTATION_OUTPUTS = [
  {
    icon: ClipboardCheck,
    number: '01',
    title: 'A sharper brief',
    desc: 'We turn loose ideas into practical priorities: who uses each room, what needs to be stored, and where the budget should work hardest.',
  },
  {
    icon: Layers,
    number: '02',
    title: 'A clearer layout direction',
    desc: 'You can see the opportunities in your floor plan before committing to cabinetry, electrical points, or expensive civil changes.',
  },
  {
    icon: Sparkles,
    number: '03',
    title: 'A finish language that feels like you',
    desc: 'We align colours, textures, lighting mood, and reference images into one consistent point of view for your future home.',
  },
];

export default async function Template3Home({ params }: PageProps) {
  const { slug } = await params;
  const basePath = `/designwebsite/template3/${slug}`;

  const data = await readSourceConfig(slug, 'template3');
  if (!data) return notFound();

  const { clinic, business, doctor } = data;

  const media = previewMedia(data.media);

  const cleanName = cleanClinicName(clinic.name);
  const cleanDesc = cleanClinicDescription(clinic.description, clinic.name);
  const city = clinic.address?.city || 'Chennai';
  const phone = clinic.contact?.phone || '';
  const waPhone = phone.replace(/\D/g, '') || '919751396117';
  const rating = business.rating || '4.9';
  const reviewCount = parseInt(String(business.reviewCount || '').replace(/\D/g, ''), 10) || 50;
  const experienceYears = doctor?.experience?.replace(/\D/g, '') || '6';
  const servicesCount = (business.services?.length ? business.services : DEFAULT_INTERIOR_SERVICES).length || 6;

  const heroImage =
    media.clinicImages?.[0] ||
    '/images/stock/90879216.webp';
  const baImage =
    media.treatmentImages?.[0] ||
    media.clinicImages?.[1] ||
    '/images/stock/284d6d29.webp';

  const servicesList: string[] = business.services?.length ? business.services : DEFAULT_INTERIOR_SERVICES;
  const reviews = data.reviews?.length ? data.reviews : DEFAULT_INTERIOR_REVIEWS;

  const offerings = servicesList.slice(0, 5).map((svc: string, idx: number) => {
    const detail = getInteriorServiceData(svc);
    return {
      title: svc,
      sub: detail?.tagline || 'Designed and built around your home',
      img: media.treatmentImages?.[idx] || media.otherImages?.[6 + idx] || OFFERING_FALLBACK_IMAGES[idx % OFFERING_FALLBACK_IMAGES.length],
    };
  });

  const projectImages = [
    ...(media.treatmentImages || []).slice(2),
    ...(media.clinicImages || []).slice(1),
    ...(media.otherImages || []).slice(6),
  ].filter(Boolean);
  const projects = (projectImages.length >= 6 ? projectImages.slice(0, 6) : PROJECT_FALLBACK_IMAGES).map(
    (img: string, idx: number) => ({
      img,
      tag: ['Contemporary', 'Scandinavian', 'Minimal', 'Modern', 'Luxe', 'Classic'][idx % 6],
      title: `Project Residence ${String(idx + 1).padStart(2, '0')}`,
      sub: `${city} · Turnkey interiors by ${cleanName || 'our studio'}`,
    })
  );

  const homeFaqs: FAQItem[] = [
    {
      q: `How does ${cleanName || 'your studio'} ensure on-time delivery?`,
      a: 'We manufacture modular components using automated factory machinery while site prep takes place. This parallel workflow enables us to guarantee 45-day handovers with zero contractor delays.',
      tag: 'Turnkey Delivery',
    },
    {
      q: 'Can we visit your design studio and touch material samples?',
      a: `Yes! Our design studio in ${city} features complete material libraries including acrylics, natural veneers, quartz slabs, acoustic fluted panels, and German hardware mechanisms.`,
      tag: 'Studio Visit',
    },
    {
      q: 'What is included in your 10-year warranty?',
      a: 'Our 10-year structural warranty covers termite damage, delamination, and bending on all calibrated BWP marine plywood woodwork. Hardware mechanisms carry their respective manufacturer warranties.',
      tag: 'Warranty',
    },
    {
      q: 'How does the free design consultation work?',
      a: 'You meet with a senior designer for 45 minutes to review your floor plan, explore style moodboards, and receive an instant transparent cost estimate.',
      tag: 'Consultation',
    },
  ];

  const heroStats: HeroStat[] = [
    {
      value: rating,
      decimals: 1,
      suffix: '★',
      label: 'Google Rating',
      sublabel: `${reviewCount}+ verified reviews`,
      icon: 'star',
    },
    {
      value: experienceYears,
      suffix: '+ Yrs',
      label: 'Turnkey Craft',
      sublabel: `Residential in ${city}`,
      icon: 'award',
    },
    {
      value: servicesCount,
      suffix: '+',
      label: 'Design Disciplines',
      sublabel: 'Modular & Turnkey',
      icon: 'layers',
    },
    {
      value: Math.max(reviewCount, 50),
      suffix: '+',
      label: 'Delivered Homes',
      sublabel: '100% On-Time Handover',
      icon: 'shield',
    },
  ];

  return (
    <div>
      {/* HERO */}
      <section id="hero" className="relative min-h-[92vh] flex items-end text-white overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroImage} alt={`${cleanName || 'Studio'} interior`} className="w-full h-full object-cover" fetchPriority="high" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(20,14,10,0.38)_0%,rgba(20,14,10,0.6)_45%,rgba(20,14,10,0.94)_100%)]" />
        </div>

        <div className="relative max-w-[1220px] mx-auto px-7 w-full pt-[120px] pb-[70px] lg:pb-[90px]">
          <div className="grid lg:grid-cols-[1.15fr_0.85fr] gap-12 lg:gap-16 items-end">
            <Reveal>
              <p className="font-[family-name:var(--font-newsreader)] italic text-[clamp(28px,3.5vw,40px)] text-[#f4b942] leading-none mb-4">
                {cleanName || 'Design Studio'} · {city}
              </p>
              <h1 className="text-[clamp(40px,5.6vw,68px)] font-extrabold leading-[1.08] tracking-[-0.02em] max-w-[660px]">
                {clinic.tagline ? (
                  clinic.tagline
                ) : (
                  <>
                    Uncompromising Quality{' '}
                    <span className="font-[family-name:var(--font-newsreader)] italic font-medium text-[#f4b942]">In Every Detail.</span>
                  </>
                )}
              </h1>
              <p className="mt-5 text-[17px] text-white/85 max-w-[500px] leading-relaxed">
                {cleanDesc || `We exclusively use ISI-certified, premium materials to ensure generational durability. From 3D space planning to factory-precision modular joinery and flawless handover in ${city}.`}
              </p>
              <div className="mt-8 flex flex-wrap gap-3.5">
                <Link
                  href={`${basePath}/contact`}
                  className="inline-flex items-center gap-2 bg-[#d8442c] text-white font-extrabold text-[15px] px-7 py-3.5 rounded-xl hover:bg-[#b93320] hover:-translate-y-0.5 transition-all duration-250 shadow-lg"
                >
                  Book Free Consultation
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href={`${basePath}/gallery`}
                  className="inline-flex items-center gap-2 bg-white/10 text-white font-extrabold text-[15px] px-7 py-3.5 rounded-xl border border-white/20 hover:bg-white/20 transition-all duration-250"
                >
                  View Delivered Homes
                </Link>
              </div>
            </Reveal>

            <Reveal delay={120}>
              <div className="bg-white/10 backdrop-blur-md border border-white/15 rounded-2xl p-6 sm:p-7">
                <div className="flex items-center gap-3 mb-4">
                  <span className="w-10 h-10 rounded-full bg-[#f4b942] text-[#1d1713] font-extrabold grid place-items-center text-[16px]">
                    ★
                  </span>
                  <div>
                    <b className="text-[17px] font-extrabold block text-white">
                      <CountUp value={rating} decimals={1} /> Google Rating
                    </b>
                    <span className="text-[12px] text-white/70">
                      <CountUp value={reviewCount} suffix="+" /> happy homeowners in {city}
                    </span>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 border-t border-white/15 pt-4 text-[13px] text-white/85">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-[#f4b942]" /> 45-Day Handover
                  </div>
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-[#f4b942]" /> 10-Year Warranty
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

          {/* DEDICATED HERO NUMBERS SECTION */}
          <div className="mt-12 lg:mt-16">
            <HeroStats stats={heroStats} />
          </div>
        </div>
      </section>

      {/* BEFORE & AFTER SHOWCASE */}
      <section className="py-[clamp(64px,7vw,96px)] px-7 bg-[#fbf7f2]">
        <div className="max-w-[1220px] mx-auto grid lg:grid-cols-2 gap-11 lg:gap-14 items-center">
          <Reveal>
            <div className="flex items-center gap-2.5 text-[12px] font-extrabold tracking-[0.22em] uppercase text-[#d8442c] before:content-[''] before:w-6 before:h-[2.5px] before:rounded before:bg-[#d8442c]">
              Real Transformation
            </div>
            <h2 className="text-[clamp(28px,3.6vw,44px)] font-extrabold mt-3.5 mb-4 tracking-[-0.02em]">
              From raw builder flat to a <span className="font-[family-name:var(--font-newsreader)] italic font-medium text-[#d8442c]">finished sanctuary</span>
            </h2>
            <p className="text-[#6d6259] text-[15.5px] leading-relaxed mb-6">
              See how our spatial planning, acoustic wood panelling, and integrated false ceiling transform an empty concrete box into a warm, luminous home.
            </p>
            <div className="grid grid-cols-2 gap-4 mb-7">
              <div className="bg-white border border-[#241f1a]/8 rounded-xl p-4">
                <b className="text-[18px] font-extrabold text-[#d8442c] block">
                  <CountUp value="45 Days" />
                </b>
                <span className="text-[12px] text-[#6d6259] font-semibold">Total Turnaround</span>
              </div>
              <div className="bg-white border border-[#241f1a]/8 rounded-xl p-4">
                <b className="text-[18px] font-extrabold text-[#d8442c] block">
                  <CountUp value="100%" />
                </b>
                <span className="text-[12px] text-[#6d6259] font-semibold">BWP Marine Ply</span>
              </div>
            </div>
            <Link
              href={`${basePath}/contact`}
              className="inline-flex items-center gap-2 text-[13px] font-extrabold tracking-wider uppercase text-[#d8442c] border-b-2 border-[#d8442c] pb-1 hover:gap-3 transition-all"
            >
              Get a transformation quote for your flat <ArrowRight className="w-4 h-4" />
            </Link>
          </Reveal>

          <Reveal delay={120}>
            <BeforeAfter image={baImage} caption="Drag slider to compare raw vs styled interior" />
          </Reveal>
        </div>
      </section>

      {/* CONSULTATION OUTPUTS */}
      <section className="px-7 py-[clamp(64px,7vw,96px)] bg-white border-y border-[#241f1a]/10">
        <div className="max-w-[1220px] mx-auto grid lg:grid-cols-[0.78fr_1.22fr] gap-10 lg:gap-16 items-start">
          <Reveal className="lg:sticky lg:top-28">
            <div className="flex items-center gap-2.5 text-[12px] font-extrabold tracking-[0.22em] uppercase text-[#d8442c] before:content-[''] before:w-6 before:h-[2.5px] before:rounded before:bg-[#d8442c]">
              Before the First Drawing
            </div>
            <h2 className="text-[clamp(28px,3.8vw,46px)] font-extrabold mt-3.5 mb-4 tracking-[-0.02em] leading-[1.08]">
              Bring the floor plan. Leave with <span className="font-[family-name:var(--font-newsreader)] italic font-medium text-[#d8442c]">real direction.</span>
            </h2>
            <p className="text-[#6d6259] text-[15.5px] leading-relaxed max-w-[430px] mb-7">
              A good consultation is more than a style conversation. It gives your decisions an order, so you can move forward with less guesswork and fewer costly revisions.
            </p>
            <Link
              href={`${basePath}/contact`}
              className="inline-flex items-center gap-2 text-[13px] font-extrabold tracking-wider uppercase text-[#d8442c] border-b-2 border-[#d8442c] pb-1 hover:gap-3 transition-all"
            >
              Book Your Planning Session <ArrowRight className="w-4 h-4" />
            </Link>
          </Reveal>

          <div className="grid gap-4">
            {CONSULTATION_OUTPUTS.map((item, idx) => {
              const Icon = item.icon;
              return (
                <Reveal key={item.number} delay={idx * 90}>
                  <article className="grid sm:grid-cols-[66px_1fr] gap-5 bg-[#fbf7f2] border border-[#241f1a]/10 rounded-2xl p-6 sm:p-7 transition-all duration-300 hover:border-[#d8442c]/35 hover:shadow-[0_16px_38px_rgba(36,31,26,0.07)]">
                    <span className="w-14 h-14 bg-white border border-[#d8442c]/25 rounded-xl grid place-items-center text-[#d8442c]">
                      <Icon className="w-5 h-5" strokeWidth={2} />
                    </span>
                    <div>
                      <span className="text-[10.5px] font-extrabold tracking-[0.2em] uppercase text-[#d8442c]">Consultation output {item.number}</span>
                      <h3 className="text-[21px] font-extrabold text-[#1d1713] mt-1.5 mb-2">{item.title}</h3>
                      <p className="text-[13.5px] text-[#6d6259] font-medium leading-[1.7]">{item.desc}</p>
                    </div>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* OFFERINGS */}
      <section id="services" className="px-7 py-[clamp(64px,7vw,96px)] bg-white border-y border-[#241f1a]/10">
        <div className="max-w-[1220px] mx-auto">
          <Reveal className="flex flex-wrap justify-between items-end gap-6 mb-12">
            <div>
              <div className="flex items-center gap-2.5 text-[12px] font-extrabold tracking-[0.22em] uppercase text-[#d8442c] before:content-[''] before:w-6 before:h-[2.5px] before:rounded before:bg-[#d8442c]">
                Turnkey Disciplines
              </div>
              <h2 className="text-[clamp(28px,3.8vw,46px)] font-extrabold mt-3.5 tracking-[-0.02em]">
                What we build for you
              </h2>
            </div>
            <Link
              href={`${basePath}/services`}
              className="text-[13px] font-extrabold tracking-[0.16em] uppercase text-[#d8442c] hover:underline"
            >
              Explore all offerings &rarr;
            </Link>
          </Reveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {offerings.map((off, idx) => (
              <Reveal key={off.title} delay={idx * 70}>
                <Link
                  href={`${basePath}/services`}
                  className="group block bg-[#fbf7f2] border border-[#241f1a]/10 rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_20px_40px_rgba(29,23,19,0.1)]"
                >
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={off.img}
                      alt={off.title}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-[20px] font-extrabold text-[#1d1713] mb-1 group-hover:text-[#d8442c] transition-colors">
                      {off.title}
                    </h3>
                    <p className="text-[13.5px] text-[#6d6259] font-medium leading-relaxed">{off.sub}</p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* TURNKEY STUDIO VS LOCAL CONTRACTOR COMPARISON */}
      <section className="px-7 py-[clamp(64px,7vw,96px)] bg-[#fbf7f2]">
        <div className="max-w-[1220px] mx-auto">
          <Reveal className="text-center max-w-2xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2.5 text-[12px] font-extrabold tracking-[0.22em] uppercase text-[#d8442c] mb-3 before:content-[''] before:w-6 before:h-[2.5px] before:rounded before:bg-[#d8442c] after:content-[''] after:w-6 after:h-[2.5px] after:rounded after:bg-[#d8442c]">
              Why Choose an Organized Studio
            </div>
            <h2 className="text-[clamp(28px,3.8vw,46px)] font-extrabold tracking-[-0.02em]">
              {cleanName || 'Our Studio'} vs. Local Contractors
            </h2>
            <p className="text-[#6d6259] text-[15px] mt-2 font-medium">
              See why homeowners switch to our factory-precision delivery model.
            </p>
          </Reveal>

          <Reveal>
            <div className="bg-white border border-[#241f1a]/10 rounded-2xl overflow-hidden shadow-sm">
              <div className="grid grid-cols-12 bg-[#1d1713] text-white p-4.5 sm:p-5 text-[13px] font-extrabold tracking-wider uppercase">
                <div className="col-span-4 sm:col-span-3">Feature</div>
                <div className="col-span-4 sm:col-span-5 text-[#f4b942]">{cleanName || 'Our Studio'}</div>
                <div className="col-span-4 sm:col-span-4 text-white/60">Local Carpenter</div>
              </div>
              <div className="divide-y divide-[#241f1a]/8">
                {COMPARISON_POINTS.map((pt) => (
                  <div key={pt.feature} className="grid grid-cols-12 p-4.5 sm:p-5 items-center text-[13.5px]">
                    <div className="col-span-4 sm:col-span-3 font-extrabold text-[#1d1713]">{pt.feature}</div>
                    <div className="col-span-4 sm:col-span-5 font-bold text-[#d8442c] flex items-center gap-2">
                      <Check className="w-4 h-4 shrink-0 text-[#d8442c]" strokeWidth={2.4} />
                      <span>{pt.studio}</span>
                    </div>
                    <div className="col-span-4 sm:col-span-4 text-[#6d6259] flex items-center gap-2">
                      <X className="w-4 h-4 shrink-0 text-red-400" strokeWidth={2.4} />
                      <span>{pt.contractor}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* PREMIUM MATERIALS */}
      <section className="bg-[#1d1713] py-[clamp(64px,7vw,96px)] px-7 text-white border-y border-[#241f1a]/10">
        <div className="max-w-[1220px] mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-10">
            <Reveal className="max-w-3xl">
              <div className="inline-flex items-center gap-2.5 text-[12px] font-extrabold tracking-[0.22em] uppercase text-[#f4b942] mb-3 before:content-[''] before:w-6 before:h-[2.5px] before:rounded before:bg-[#f4b942] after:content-[''] after:w-6 after:h-[2.5px] after:rounded after:bg-[#f4b942]">
                Premium Materials
              </div>
              <h2 className="text-[clamp(32px,4vw,56px)] font-extrabold tracking-[-0.02em] leading-[1.05]">
                Uncompromising Quality <br className="hidden md:block"/> In Every Detail
              </h2>
            </Reveal>
            <Reveal delay={0.1} className="max-w-sm flex flex-col items-start gap-6">
              <p className="text-[16px] font-medium leading-[1.7] text-white/70 border-l-[3px] border-[#f4b942] pl-5">
                For all the spaces we design and execute, we exclusively use premium, certified materials and hardware to ensure generational durability and timeless elegance.
              </p>
            </Reveal>
          </div>
          <Reveal delay={0.2} className="mt-14 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 border-l border-t border-white/10">
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
              <div key={brand.name} className="flex flex-col items-center justify-center p-6 border-r border-b border-white/10 min-h-[160px] h-full transition-all duration-300 hover:bg-[#2a221b] group">
                <ShieldCheck className="h-7 w-7 text-[#f4b942] mb-3 opacity-90 group-hover:scale-110 transition-transform duration-300" />
                <p className="text-[11.5px] font-extrabold uppercase tracking-[0.1em] text-white/90 group-hover:text-white transition-colors duration-300 text-center">
                  {brand.name}
                </p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* ESTIMATOR */}
      <section id="estimator" className="px-7 py-[clamp(64px,7vw,96px)] bg-white border-b border-[#241f1a]/10">
        <div className="max-w-[1220px] mx-auto">
          <div className="grid lg:grid-cols-[1fr_1fr] gap-12 lg:gap-20 items-center">
            <Reveal className="max-w-2xl">
              <div className="inline-flex items-center gap-2.5 text-[12px] font-extrabold tracking-[0.22em] uppercase text-[#d8442c] mb-3 before:content-[''] before:w-6 before:h-[2.5px] before:rounded before:bg-[#d8442c] after:content-[''] after:w-6 after:h-[2.5px] after:rounded after:bg-[#d8442c]">
                PROJECT ESTIMATE
              </div>
              <h2 className="text-[clamp(28px,3.8vw,46px)] font-extrabold tracking-[-0.02em] leading-[1.08] mb-4">
                Transparent Pricing,<br/>No Hidden Costs
              </h2>
              <p className="text-[#59524a] text-[16px] leading-[1.7] font-medium mb-8">
                Fill out the brief form to receive a detailed, line-item quotation for your dream home. Our design-build experts will get back to you with a clear cost breakdown based on your floor plan and requirements.
              </p>
              <div className="grid sm:grid-cols-2 gap-6 pt-8 border-t border-[#241f1a]/10">
                <div>
                  <h3 className="text-[17px] font-bold text-[#1d1713] mb-1.5">01 / Share Details</h3>
                  <p className="text-[15px] text-[#59524a] font-medium leading-[1.6]">Tell us about your floor plan, location, and lifestyle requirements.</p>
                </div>
                <div>
                  <h3 className="text-[17px] font-bold text-[#1d1713] mb-1.5">02 / Get Estimate</h3>
                  <p className="text-[15px] text-[#59524a] font-medium leading-[1.6]">Receive a transparent quotation covering turnkey execution and interiors.</p>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.2} className="w-full flex justify-center border border-[#241f1a]/10 bg-[#fbf7f2] p-3 md:p-6 rounded-3xl relative">
              <div className="w-full max-w-[640px] bg-white rounded-xl shadow-sm border border-gray-100 p-8 flex flex-col justify-center">
                <h3 className="text-2xl font-bold mb-6 text-[#1d1713]">Request Estimate</h3>
                <form className="space-y-4" >
                  <input type="text" placeholder="Name" required className="w-full p-3 border border-gray-200 rounded-md outline-none focus:border-[#d8442c] transition-colors" />
                  <input type="email" placeholder="Email" required className="w-full p-3 border border-gray-200 rounded-md outline-none focus:border-[#d8442c] transition-colors" />
                  <input type="tel" placeholder="Phone" required className="w-full p-3 border border-gray-200 rounded-md outline-none focus:border-[#d8442c] transition-colors" />
                  <textarea placeholder="Tell us about your requirements" required className="w-full p-3 border border-gray-200 rounded-md outline-none focus:border-[#d8442c] h-32 transition-colors"></textarea>
                  <button type="submit" className="w-full bg-[#d8442c] text-white py-3 rounded-md uppercase tracking-wide text-sm font-semibold hover:bg-[#b93a25] transition-colors">Submit Request</button>
                </form>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 6-STEP PROCESS */}
      <section id="process" className="px-7 py-[clamp(64px,7vw,96px)] bg-[#fbf7f2]">
        <div className="max-w-[1220px] mx-auto">
          <Reveal className="text-center max-w-2xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2.5 text-[12px] font-extrabold tracking-[0.22em] uppercase text-[#d8442c] mb-3 before:content-[''] before:w-6 before:h-[2.5px] before:rounded before:bg-[#d8442c] after:content-[''] after:w-6 after:h-[2.5px] after:rounded after:bg-[#d8442c]">
              6-Step Blueprint
            </div>
            <h2 className="text-[clamp(28px,3.8vw,46px)] font-extrabold tracking-[-0.02em]">
              From first sketch to happy housewarming
            </h2>
          </Reveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {PROCESS.map((p) => (
              <Reveal key={p.num} delay={p.num * 60}>
                <div className="bg-white border border-[#241f1a]/10 rounded-2xl p-7 h-full flex flex-col justify-between shadow-[0_10px_24px_rgba(29,23,19,0.04)]">
                  <div>
                    <span className="w-10 h-10 rounded-xl bg-[#d8442c] text-white font-extrabold text-[16px] grid place-items-center mb-4">
                      {p.num}
                    </span>
                    <h3 className="text-[19px] font-extrabold text-[#1d1713] mb-2">{p.title}</h3>
                    <p className="text-[13.5px] text-[#6d6259] font-medium leading-[1.65]">{p.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* DELIVERED HOMES GALLERY */}
      <section id="projects" className="px-7 py-[clamp(64px,7vw,96px)] bg-white border-y border-[#241f1a]/10">
        <div className="max-w-[1220px] mx-auto">
          <Reveal className="flex flex-wrap justify-between items-end gap-6 mb-12">
            <div>
              <div className="flex items-center gap-2.5 text-[12px] font-extrabold tracking-[0.22em] uppercase text-[#d8442c] before:content-[''] before:w-6 before:h-[2.5px] before:rounded before:bg-[#d8442c]">
                Delivered Projects
              </div>
              <h2 className="text-[clamp(28px,3.8vw,46px)] font-extrabold mt-3.5 tracking-[-0.02em]">
                Homes delivered across {city}
              </h2>
            </div>
            <Link href={`${basePath}/gallery`} className="text-[13px] font-extrabold tracking-[0.16em] uppercase text-[#d8442c] hover:underline">
              View full gallery &rarr;
            </Link>
          </Reveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((proj, idx) => (
              <Reveal key={proj.title} delay={idx * 70}>
                <Link
                  href={`${basePath}/gallery`}
                  className="group block bg-[#fbf7f2] border border-[#241f1a]/10 rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_20px_40px_rgba(29,23,19,0.1)]"
                >
                  <div className="aspect-[4/3] overflow-hidden">
                    <img src={proj.img} alt={proj.title} loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  </div>
                  <div className="p-6">
                    <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#d8442c] block mb-1">
                      {proj.tag}
                    </span>
                    <h3 className="text-[19px] font-extrabold text-[#1d1713] mb-1">{proj.title}</h3>
                    <p className="text-[13px] text-[#6d6259] font-medium">{proj.sub}</p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section id="reviews" className="px-7 py-[clamp(64px,7vw,96px)] bg-[#fbf7f2]">
        <div className="max-w-[1220px] mx-auto">
          <Reveal className="text-center max-w-2xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2.5 text-[12px] font-extrabold tracking-[0.22em] uppercase text-[#d8442c] mb-3 before:content-[''] before:w-6 before:h-[2.5px] before:rounded before:bg-[#d8442c] after:content-[''] after:w-6 after:h-[2.5px] after:rounded after:bg-[#d8442c]">
              Homeowner Stories
            </div>
            <h2 className="text-[clamp(28px,3.8vw,46px)] font-extrabold tracking-[-0.02em]">
              Rated {rating}★ on Google in {city}
            </h2>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-6">
            {reviews.slice(0, 3).map((r: any, idx: number) => (
              <Reveal key={idx} delay={idx * 80}>
                <div className="bg-white border border-[#241f1a]/10 rounded-2xl p-7 h-full flex flex-col justify-between shadow-[0_10px_24px_rgba(29,23,19,0.04)]">
                  <div>
                    <div className="flex gap-1 text-[#f4b942] mb-3 text-[14px]">★★★★★</div>
                    <blockquote className="text-[#1d1713] text-[15px] font-medium leading-[1.65] mb-6">
                      &ldquo;{r.text}&rdquo;
                    </blockquote>
                  </div>
                  <div className="border-t border-[#241f1a]/10 pt-4 flex items-center gap-3">
                    <span className="w-10 h-10 rounded-full bg-[#1d1713] text-[#f4b942] font-extrabold grid place-items-center">
                      {(r.author || 'C').charAt(0)}
                    </span>
                    <div>
                      <b className="text-[14.5px] font-extrabold text-[#1d1713] block">{r.author || 'Homeowner'}</b>
                      <span className="text-[11.5px] text-[#6d6259] font-semibold">{city} Residence</span>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ ACCORDION */}
      <section id="faq" className="px-7 py-[clamp(64px,7vw,96px)] bg-white border-t border-[#241f1a]/10">
        <div className="max-w-[900px] mx-auto">
          <Reveal className="text-center mb-12">
            <div className="inline-flex items-center gap-2.5 text-[12px] font-extrabold tracking-[0.22em] uppercase text-[#d8442c] mb-3 before:content-[''] before:w-6 before:h-[2.5px] before:rounded before:bg-[#d8442c] after:content-[''] after:w-6 after:h-[2.5px] after:rounded after:bg-[#d8442c]">
              Questions Answered
            </div>
            <h2 className="text-[clamp(28px,3.8vw,46px)] font-extrabold tracking-[-0.02em]">
              Frequently asked questions
            </h2>
          </Reveal>

          <Reveal>
            <FAQAccordion items={homeFaqs} />
          </Reveal>
        </div>
      </section>

      {/* CTA / LEAD FORM */}
      <section id="consult" className="px-7 py-[clamp(72px,8vw,110px)] bg-[#1d1713] text-white">
        <div className="max-w-[1220px] mx-auto grid lg:grid-cols-[1.1fr_0.9fr] gap-12 lg:gap-16 items-center">
          <Reveal>
            <div className="flex items-center gap-2.5 text-[12px] font-extrabold tracking-[0.22em] uppercase text-[#f4b942] before:content-[''] before:w-6 before:h-[2.5px] before:rounded before:bg-[#f4b942]">
              Free Consultation
            </div>
            <h2 className="text-[clamp(32px,4.4vw,56px)] font-extrabold mt-3.5 mb-4 leading-[1.08]">
              Ready to build your <span className="font-[family-name:var(--font-newsreader)] italic font-medium text-[#f4b942]">dream home?</span>
            </h2>
            <p className="text-white/80 text-[16px] leading-relaxed max-w-[500px] mb-8">
              Sit down with our interior architects. We&rsquo;ll review your floor plan, give 3D direction, and quote an exact itemised estimate for your {city} property.
            </p>
            <div className="grid grid-cols-3 gap-3 max-w-[460px]">
              {[
                { v: '45 Days', l: 'Handover Guarantee' },
                { v: '10 Yrs', l: 'Structural Warranty' },
                { v: '₹0', l: 'Consultation Fee' },
              ].map((b) => (
                <div key={b.l} className="bg-white/10 rounded-xl p-3.5 text-center">
                  <b className="text-[20px] font-extrabold text-[#f4b942] block">
                    <CountUp value={b.v} />
                  </b>
                  <span className="text-[10.5px] uppercase tracking-wider text-white/70 font-bold">{b.l}</span>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={120} className="bg-white text-[#1d1713] rounded-2xl p-7 sm:p-9 shadow-2xl">
            <LeadForm studioName={cleanName || 'the studio'} waPhone={waPhone} city={city} />
          </Reveal>
        </div>
      </section>
    </div>
  );
}
