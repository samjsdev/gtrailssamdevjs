import { readSourceConfig } from '@/lib/dataBuilder';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Check, ShieldCheck, ArrowRight, Home, CheckCircle2 } from 'lucide-react';
import { cleanClinicName, cleanClinicDescription } from '@/lib/copyCleaner';
import {
  DEFAULT_INTERIOR_REVIEWS,
  DEFAULT_INTERIOR_SERVICES,
  DEFAULT_INTERIOR_HIGHLIGHTS,
  getInteriorServiceData,
  previewMedia,
} from '@/lib/interiorContent';
import Reveal from './Reveal';
import LeadForm from './LeadForm';
import FAQAccordion, { FAQItem } from './FAQAccordion';

type PageProps = { params: Promise<{ slug: string }> };

const ROOM_FALLBACK_IMAGES = [
  '/images/stock/68b39046.webp',
  '/images/stock/a0e0726f.webp',
  '/images/stock/dc1759ad.webp',
  '/images/stock/f23e9dc6.webp',
  '/images/stock/615f9d34.webp',
  '/images/stock/6dcb103c.webp',
];

const STEPS = [
  { pct: 'Step 01', title: 'Meet Your Designer', desc: 'A dedicated consultation at our studio, your home or online. Walk out with a clear design direction and ballpark estimate for your floor plan.' },
  { pct: 'Step 02', title: '3D Views & Frozen Price', desc: 'Approve photorealistic 3D room renders and an itemised quote. Your price and completion timeline are frozen with zero surprise escalations.' },
  { pct: 'Step 03', title: 'Factory Build & Daily Photos', desc: 'Precision CNC woodwork and civil site prep run in parallel. You receive weekly photo diaries on WhatsApp — zero contractor chasing.' },
  { pct: 'Step 04', title: 'Install & Move In', desc: 'Dust-free installation, 140-point quality audit, deep clean, and a formal key walkthrough backed by our 10-year warranty.' },
];

const BRAND_PARTNERS = [
  { name: 'CenturyPly / Greenlam', role: 'Calibrated BWP Marine Plywood' },
  { name: 'Blum & Häfele', role: 'German Soft-Close Engineered Hardware' },
  { name: 'Saint-Gobain', role: 'Toughened Fluted & Clear Glass Partitions' },
  { name: 'Asian Paints Royale', role: 'Non-Toxic Low-VOC Luxury Wall Finishes' },
];

const PROJECT_STORY_COPY = [
  {
    label: 'Kitchen & Dining',
    title: 'A kitchen that keeps up with real life',
    desc: 'A durable, easy-to-reach cooking zone with room for busy mornings, family meals, and the everyday things that should not live on the counter.',
  },
  {
    label: 'Living & Entertaining',
    title: 'A living room that welcomes everyone in',
    desc: 'Layered storage, considered lighting, and comfortable seating make the room feel composed for guests without becoming precious for the family.',
  },
  {
    label: 'Bedrooms & Storage',
    title: 'Private rooms with less visual noise',
    desc: 'Thoughtful wardrobes, study corners, and lighting placement create calm spaces that work just as hard behind closed doors.',
  },
];

export default async function Template2Home({ params }: PageProps) {
  const { slug } = await params;
  const basePath = `/designwebsite/template2/${slug}`;

  const data = await readSourceConfig(slug, 'template2');
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
    '/images/stock/a151a9e5.webp';
  const whyImage =
    media.clinicImages?.[1] ||
    '/images/stock/bf333360.webp';
  const servicesList: string[] = business.services?.length ? business.services : DEFAULT_INTERIOR_SERVICES;
  const highlights: string[] = business.highlights?.length ? business.highlights : DEFAULT_INTERIOR_HIGHLIGHTS;
  const reviews = data.reviews?.length ? data.reviews : DEFAULT_INTERIOR_REVIEWS;
  const rating = business.rating || '4.8';
  const experienceYears = doctor?.experience?.replace(/\D/g, '') || '5';

  const rooms = servicesList.slice(0, 6).map((svc: string, idx: number) => {
    const detail = getInteriorServiceData(svc);
    return {
      title: svc,
      sub: detail?.tagline || 'Personalised to your floor plan and budget',
      img: media.treatmentImages?.[idx] || media.otherImages?.[6 + idx] || ROOM_FALLBACK_IMAGES[idx % ROOM_FALLBACK_IMAGES.length],
      tag: idx === 0 ? 'Most Loved' : idx === 1 ? 'Trending' : idx === 2 ? 'Bestseller' : null,
    };
  });

  const projectImages = [
    ...(media.treatmentImages || []).slice(0, 3),
    ...(media.clinicImages || []).slice(1, 3),
    ...(media.otherImages || []).slice(6, 8),
  ].filter(Boolean);
  const projectStories = PROJECT_STORY_COPY.map((story, idx) => ({
    ...story,
    img: projectImages[idx] || ROOM_FALLBACK_IMAGES[(idx + 3) % ROOM_FALLBACK_IMAGES.length],
  }));

  const homeFaqs: FAQItem[] = [
    {
      q: `What makes ${cleanName || 'our studio'} different from local carpenters?`,
      a: 'We combine professional interior architects with factory-precision CNC machinery. This guarantees exact millimeter joins, zero on-site cutting mess, guaranteed 45-day handovers, and an unconditional 10-year warranty.',
      tag: 'Why Us',
    },
    {
      q: 'How does the free interior consultation work?',
      a: 'In a 45-minute consultation, our interior designers review your floor plan, understand your lifestyle and budget, and share customized layout concepts along with a transparent cost breakdown.',
      tag: 'Consultation',
    },
    {
      q: 'Are your quotations fixed or will the price increase during execution?',
      a: 'Our quotations are completely itemised and transparent. Once you sign off on the 3D drawings and BOQ, your project price is frozen — we guarantee 0% cost escalations.',
      tag: 'Pricing',
    },
    {
      q: 'What warranty do you provide on home woodwork?',
      a: 'We provide an unconditional 10-year warranty on all BWP marine plywood woodwork, and up to a lifetime functional warranty on German hardware from Blum and Häfele.',
      tag: 'Warranty',
    },
    {
      q: 'Can you work around our target move-in date?',
      a: 'Yes. We build strict milestone calendars into our contract and provide weekly photo updates on WhatsApp so you always know the exact handover date.',
      tag: 'Timeline',
    },
  ];

  return (
    <div>
      {/* HERO */}
      <section id="hero" className="bg-[#faf7f1] overflow-hidden">
        <div className="max-w-[1240px] mx-auto px-6 py-[clamp(44px,6vw,80px)] grid lg:grid-cols-[1.02fr_0.98fr] gap-[clamp(34px,5vw,64px)] items-center">
          <div>
            <p className="font-[family-name:var(--font-bricolage)] font-bold text-[clamp(22px,2.4vw,28px)] text-[#0e5a43] mb-4 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#f2a007]" />
              {cleanName || 'Design Studio'} · {city}
            </p>
            <h1 className="font-[family-name:var(--font-bricolage)] font-bold text-[clamp(38px,4.8vw,62px)] leading-[1.05] tracking-[-0.02em]">
              {clinic.tagline || (
                <>Uncompromising Quality In Every Detail in {city}</>
              )}
            </h1>
            <p className="mt-5 mb-8 max-w-[520px] text-[#6b6660] text-[16.5px] leading-[1.7] font-medium">
              {cleanDesc || `We exclusively use ISI-certified, premium materials to ensure generational durability. From 3D space planning to factory-precision modular joinery and flawless handover.`}
            </p>
            <div className="flex flex-wrap gap-3.5 items-center">
              <Link
                href={`${basePath}/contact`}
                className="inline-flex items-center justify-center gap-2 bg-[#0e5a43] text-white font-bold text-[14px] px-6.5 py-3.5 rounded-xl hover:bg-[#0a4232] hover:-translate-y-0.5 hover:shadow-[0_14px_28px_rgba(14,90,67,0.28)] transition-all duration-300"
              >
                Get a Free Estimate
              </Link>
              <Link
                href={`${basePath}/gallery`}
                className="inline-flex items-center justify-center gap-2 bg-transparent text-[#1b1b1b] font-bold text-[14px] px-6.5 py-3.5 rounded-xl border-[1.5px] border-[#1b1b1b] hover:bg-[#1b1b1b] hover:text-white transition-all duration-300"
              >
                Browse Real Homes
              </Link>
            </div>
            <p className="mt-5 text-[12.5px] text-[#6b6660] font-semibold flex items-center gap-2">
              <span className="text-[#f2a007] tracking-[2px]">★★★★★</span>
              {rating} rated by homeowners on Google · {experienceYears}+ years in {city}
            </p>
          </div>

          <div className="relative">
            <div className="absolute -top-4 right-2 sm:-right-3 z-10 bg-white border border-[#1b1b1b]/10 rounded-2xl px-5 py-3.5 shadow-[0_24px_60px_rgba(27,27,27,0.12)] flex items-center gap-3">
              <span className="w-10 h-10 rounded-xl bg-[#fdeecb] grid place-items-center">
                <Home className="w-5 h-5 text-[#f2a007]" strokeWidth={2} />
              </span>
              <span>
                <b className="font-[family-name:var(--font-bricolage)] text-[17px] block leading-tight">{experienceYears}+ years</b>
                <span className="text-[11px] text-[#6b6660] font-bold">designing in {city}</span>
              </span>
            </div>
            <div className="rounded-[26px] overflow-hidden aspect-[4/3.5] shadow-[0_24px_60px_rgba(27,27,27,0.12)]">
              <img src={heroImage} alt={`${cleanName || 'Studio'} interior`} className="w-full h-full object-cover" fetchPriority="high" />
            </div>
            <div className="mt-5 border-t border-[#1b1b1b]/12 pt-5">
              <p className="text-[11px] font-extrabold tracking-[0.2em] uppercase text-[#0e5a43] mb-3.5">
                The {cleanName || 'Studio'} Guarantee
              </p>
              <ul className="grid sm:grid-cols-3 gap-2.5">
                {[
                  '45-Day Handover Guarantee',
                  '10-Year Material Warranty',
                  '0% Cost Overrun Lock',
                ].map((item) => (
                  <li key={item} className="flex gap-2 items-center text-[12.5px] font-bold text-[#1b1b1b] bg-white/80 border border-[#1b1b1b]/8 rounded-xl px-3 py-2">
                    <Check className="w-4 h-4 text-[#0e5a43] shrink-0" strokeWidth={2.4} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* BRAND PARTNERS & MATERIALS */}
      <section className="bg-white py-8 border-y border-[#1b1b1b]/10 px-6">
        <div className="max-w-[1240px] mx-auto">
          <p className="text-center text-[11px] font-extrabold tracking-[0.2em] uppercase text-[#6b6660] mb-6">
            Engineered with Certified Brand Partners
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {BRAND_PARTNERS.map((partner) => (
              <div key={partner.name} className="bg-[#faf7f1] border border-[#1b1b1b]/8 rounded-xl p-4 text-center">
                <b className="font-[family-name:var(--font-bricolage)] text-[15px] text-[#1b1b1b] block">{partner.name}</b>
                <span className="text-[11px] text-[#6b6660] font-medium block mt-0.5">{partner.role}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ROOM BY ROOM DESIGN */}
      <section id="services" className="px-6 py-[clamp(72px,8vw,110px)] bg-[#faf7f1]">
        <div className="max-w-[1240px] mx-auto">
          <Reveal className="flex flex-wrap justify-between items-end gap-6 mb-12">
            <div>
              <span className="inline-flex items-center gap-2.5 text-[12px] font-extrabold tracking-[0.28em] uppercase text-[#0e5a43] mb-3 before:content-[''] before:w-7 before:h-[2.5px] before:rounded-full before:bg-[#f2a007]">
                Room-by-Room Design
              </span>
              <h2 className="font-[family-name:var(--font-bricolage)] font-bold text-[clamp(28px,3.8vw,48px)] leading-[1.08] tracking-[-0.02em]">
                Explore spaces designed for <mark className="bg-[linear-gradient(transparent_62%,#fdeecb_62%)] text-[#0e5a43] px-0.5">everyday life</mark>
              </h2>
            </div>
            <Link
              href={`${basePath}/services`}
              className="inline-flex items-center gap-2 font-extrabold text-[14px] text-[#0e5a43] border-b-[2.5px] border-[#f2a007] pb-1 hover:gap-3.5 transition-all"
            >
              See All Turnkey Services <ArrowRight className="w-4 h-4" strokeWidth={2.4} />
            </Link>
          </Reveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {rooms.map((room, idx) => (
              <Reveal key={room.title} delay={idx * 70}>
                <Link
                  href={`${basePath}/services`}
                  className="group block bg-white border border-[#1b1b1b]/10 rounded-[22px] overflow-hidden transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_24px_60px_rgba(27,27,27,0.12)]"
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    {room.tag && (
                      <span className="absolute top-3.5 left-3.5 z-10 bg-[#0e5a43] text-white text-[10.5px] font-extrabold tracking-wider uppercase px-3 py-1 rounded-full shadow-md">
                        {room.tag}
                      </span>
                    )}
                    <img
                      src={room.img}
                      alt={room.title}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.06]"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="font-[family-name:var(--font-bricolage)] font-bold text-[20px] text-[#1b1b1b] group-hover:text-[#0e5a43] transition-colors mb-1.5">
                      {room.title}
                    </h3>
                    <p className="text-[13.5px] text-[#6b6660] font-medium leading-relaxed">{room.sub}</p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* PREMIUM MATERIALS */}
      <section className="bg-[#1b1b1b] py-[clamp(72px,8vw,110px)] px-6 text-white border-y border-[#1b1b1b]/10">
        <div className="max-w-[1240px] mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-10">
            <Reveal className="max-w-3xl">
              <span className="inline-flex items-center gap-2.5 text-[12px] font-extrabold tracking-[0.28em] uppercase text-[#f2a007] mb-3 before:content-[''] before:w-7 before:h-[2.5px] before:rounded-full before:bg-[#f2a007] after:content-[''] after:w-7 after:h-[2.5px] after:rounded-full after:bg-[#f2a007]">
                Premium Materials
              </span>
              <h2 className="font-[family-name:var(--font-bricolage)] font-bold text-[clamp(32px,4vw,56px)] leading-[1.05] tracking-[-0.02em]">
                Uncompromising Quality <br className="hidden md:block"/> In Every Detail
              </h2>
            </Reveal>
            <Reveal delay={0.1} className="max-w-sm flex flex-col items-start gap-6">
              <p className="text-[15px] font-medium leading-[1.7] text-white/70 border-l-[2px] border-[#f2a007]/50 pl-5">
                For all the spaces we design and execute, we exclusively use premium, certified materials and hardware to ensure generational durability and timeless elegance.
              </p>
            </Reveal>
          </div>
          <Reveal delay={0.2} className="mt-14 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 border-l border-t border-white/10 bg-[#141414] rounded-2xl overflow-hidden shadow-2xl">
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
              <div key={brand.name} className="flex flex-col items-center justify-center p-6 border-r border-b border-white/10 min-h-[160px] h-full transition-all duration-300 hover:bg-[#1b1b1b] group">
                <ShieldCheck className="h-7 w-7 text-[#f2a007] mb-3 opacity-90 group-hover:scale-110 transition-transform duration-300" />
                <p className="text-[11.5px] font-extrabold uppercase tracking-[0.1em] text-white/90 group-hover:text-white transition-colors duration-300 text-center">
                  {brand.name}
                </p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* PROJECT STORIES */}
      <section id="projects" className="px-6 py-[clamp(72px,8vw,110px)] bg-white border-y border-[#1b1b1b]/10">
        <div className="max-w-[1240px] mx-auto">
          <Reveal className="flex flex-wrap justify-between items-end gap-6 mb-12">
            <div className="max-w-[650px]">
              <span className="inline-flex items-center gap-2.5 text-[12px] font-extrabold tracking-[0.28em] uppercase text-[#0e5a43] mb-3 before:content-[''] before:w-7 before:h-[2.5px] before:rounded-full before:bg-[#f2a007]">
                Real Homes, Real Routines
              </span>
              <h2 className="font-[family-name:var(--font-bricolage)] font-bold text-[clamp(28px,3.8vw,48px)] leading-[1.08] tracking-[-0.02em]">
                Designed for how a home is <mark className="bg-[linear-gradient(transparent_62%,#fdeecb_62%)] text-[#0e5a43] px-0.5">actually lived in</mark>
              </h2>
            </div>
            <Link
              href={`${basePath}/gallery`}
              className="inline-flex items-center gap-2 font-extrabold text-[14px] text-[#0e5a43] border-b-[2.5px] border-[#f2a007] pb-1 hover:gap-3.5 transition-all"
            >
              View More Completed Homes <ArrowRight className="w-4 h-4" strokeWidth={2.4} />
            </Link>
          </Reveal>

          <div className="grid lg:grid-cols-3 gap-6">
            {projectStories.map((story, idx) => (
              <Reveal key={story.title} delay={idx * 90}>
                <article className="group h-full bg-[#faf7f1] border border-[#1b1b1b]/10 rounded-[22px] overflow-hidden transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_24px_60px_rgba(27,27,27,0.1)]">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img src={story.img} alt={story.title} loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.06]" />
                    <span className="absolute left-4 bottom-4 bg-white/95 text-[#0e5a43] rounded-full px-3 py-1.5 text-[10.5px] font-extrabold tracking-wider uppercase shadow-sm">
                      {story.label}
                    </span>
                  </div>
                  <div className="p-6">
                    <h3 className="font-[family-name:var(--font-bricolage)] font-bold text-[21px] leading-[1.12] text-[#1b1b1b] mb-3">{story.title}</h3>
                    <p className="text-[13.5px] text-[#6b6660] font-medium leading-[1.7]">{story.desc}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ESTIMATOR */}
      <section id="estimator" className="px-6 py-[clamp(72px,8vw,110px)] bg-white border-b border-[#1b1b1b]/10">
        <div className="max-w-[1240px] mx-auto">
          <div className="grid lg:grid-cols-[1fr_1fr] gap-12 lg:gap-20 items-center">
            <Reveal className="max-w-2xl">
              <span className="inline-flex items-center gap-2.5 text-[12px] font-extrabold tracking-[0.28em] uppercase text-[#0e5a43] mb-3 before:content-[''] before:w-7 before:h-[2.5px] before:rounded-full before:bg-[#f2a007] after:content-[''] after:w-7 after:h-[2.5px] after:rounded-full after:bg-[#f2a007]">
                PROJECT ESTIMATE
              </span>
              <h2 className="font-[family-name:var(--font-bricolage)] font-bold text-[clamp(28px,3.8vw,48px)] leading-[1.08] tracking-[-0.02em] mb-4">
                Transparent Pricing,<br/>No Hidden Costs
              </h2>
              <p className="text-[#6b6660] text-[16px] leading-[1.7] font-medium mb-8">
                Fill out the brief form to receive a detailed, line-item quotation for your dream home. Our design-build experts will get back to you with a clear cost breakdown based on your floor plan and requirements.
              </p>
              <div className="grid sm:grid-cols-2 gap-6 pt-8 border-t border-[#1b1b1b]/10">
                <div>
                  <h3 className="text-[17px] font-bold text-[#1b1b1b] mb-1.5">01 / Share Details</h3>
                  <p className="text-[14px] text-[#6b6660] font-medium leading-[1.6]">Tell us about your floor plan, location, and lifestyle requirements.</p>
                </div>
                <div>
                  <h3 className="text-[17px] font-bold text-[#1b1b1b] mb-1.5">02 / Get Estimate</h3>
                  <p className="text-[14px] text-[#6b6660] font-medium leading-[1.6]">Receive a transparent quotation covering turnkey execution and interiors.</p>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.2} className="w-full flex justify-center border border-[#1b1b1b]/10 bg-[#faf7f1] p-3 md:p-6 rounded-[32px] shadow-[0_12px_40px_rgba(27,27,27,0.06)] relative">
              <div className="w-full max-w-[640px] bg-white rounded-2xl shadow-sm border border-[#1b1b1b]/10 p-8 flex flex-col justify-center">
                <h3 className="text-2xl font-bold mb-6 text-[#1b1b1b]">Request Estimate</h3>
                <form className="space-y-4" >
                  <input type="text" placeholder="Name" required className="w-full p-3 border border-gray-200 rounded-xl outline-none focus:border-[#a58150] transition-colors" />
                  <input type="email" placeholder="Email" required className="w-full p-3 border border-gray-200 rounded-xl outline-none focus:border-[#a58150] transition-colors" />
                  <input type="tel" placeholder="Phone" required className="w-full p-3 border border-gray-200 rounded-xl outline-none focus:border-[#a58150] transition-colors" />
                  <textarea placeholder="Tell us about your requirements" required className="w-full p-3 border border-gray-200 rounded-xl outline-none focus:border-[#a58150] h-32 transition-colors"></textarea>
                  <button type="submit" className="w-full bg-[#1b1b1b] text-white py-3 rounded-xl uppercase tracking-wide text-sm font-semibold hover:bg-[#333] transition-colors">Submit Request</button>
                </form>
              </div>
            </Reveal>

          </div>
        </div>
      </section>

      {/* 4-STEP PROCESS */}
      <section id="process" className="px-6 py-[clamp(72px,8vw,110px)] bg-[#faf7f1]">
        <div className="max-w-[1240px] mx-auto">
          <Reveal className="text-center max-w-2xl mx-auto mb-14">
            <span className="inline-flex items-center gap-2.5 text-[12px] font-extrabold tracking-[0.28em] uppercase text-[#0e5a43] mb-3 before:content-[''] before:w-7 before:h-[2.5px] before:rounded-full before:bg-[#f2a007] after:content-[''] after:w-7 after:h-[2.5px] after:rounded-full after:bg-[#f2a007]">
              Stress-Free Workflow
            </span>
            <h2 className="font-[family-name:var(--font-bricolage)] font-bold text-[clamp(28px,3.8vw,48px)] leading-[1.08] tracking-[-0.02em] mb-3">
              How your dream home gets built
            </h2>
            <p className="text-[#6b6660] text-[15px] font-medium">
              We eliminated the headaches by organizing every step into a clear timeline.
            </p>
          </Reveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {STEPS.map((step, idx) => (
              <Reveal key={step.pct} delay={idx * 80}>
                <div className="bg-white border border-[#1b1b1b]/10 rounded-[22px] p-7 h-full flex flex-col justify-between transition-all duration-300 hover:shadow-[0_20px_50px_rgba(27,27,27,0.08)]">
                  <div>
                    <span className="font-[family-name:var(--font-bricolage)] font-extrabold text-[24px] text-[#f2a007] block mb-4">
                      {step.pct}
                    </span>
                    <h3 className="font-[family-name:var(--font-bricolage)] font-bold text-[19px] text-[#1b1b1b] mb-2.5">
                      {step.title}
                    </h3>
                    <p className="text-[13.5px] text-[#6b6660] font-medium leading-[1.65]">
                      {step.desc}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* WHY US */}
      <section id="why" className="px-6 py-[clamp(72px,8vw,110px)] bg-white">
        <div className="max-w-[1240px] mx-auto grid lg:grid-cols-2 gap-[clamp(40px,5vw,72px)] items-center">
          <Reveal className="relative">
            <div className="rounded-[26px] overflow-hidden aspect-[4/3.6] shadow-[0_24px_60px_rgba(27,27,27,0.12)]">
              <img src={whyImage} alt={`Why choose ${cleanName || 'our studio'}`} loading="lazy" className="w-full h-full object-cover" />
            </div>
            <div className="absolute left-5 bottom-5 bg-white rounded-2xl px-5.5 py-4 shadow-[0_24px_60px_rgba(27,27,27,0.12)]">
              <b className="font-[family-name:var(--font-bricolage)] text-[22px] text-[#0e5a43] block leading-none">140+ Points</b>
              <span className="text-[11px] font-extrabold tracking-[0.1em] uppercase text-[#6b6660]">Quality Inspected</span>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <span className="inline-flex items-center gap-2.5 text-[12px] font-extrabold tracking-[0.28em] uppercase text-[#0e5a43] mb-3.5 before:content-[''] before:w-7 before:h-[2.5px] before:rounded-full before:bg-[#f2a007]">
              Why Homeowners Trust Us
            </span>
            <h2 className="font-[family-name:var(--font-bricolage)] font-bold text-[clamp(28px,3.6vw,46px)] leading-[1.08] tracking-[-0.02em] mb-4.5">
              The reliability of a <mark className="bg-[linear-gradient(transparent_62%,#fdeecb_62%)] text-[#0e5a43] px-0.5">modern design house</mark>
            </h2>
            <p className="text-[#6b6660] font-medium leading-[1.75] text-[15.5px] mb-7">
              {cleanDesc || `We removed contractor middleman friction by owning spatial design, factory joinery production, and site management in ${city}.`}
            </p>

            <div className="grid gap-3.5">
              {highlights.slice(0, 4).map((h) => (
                <div key={h} className="flex gap-3 items-start bg-[#faf7f1] border border-[#1b1b1b]/8 rounded-xl p-4">
                  <CheckCircle2 className="w-5 h-5 text-[#0e5a43] shrink-0 mt-0.5" strokeWidth={2.4} />
                  <div>
                    <b className="font-[family-name:var(--font-bricolage)] text-[16px] text-[#1b1b1b] block">{h}</b>
                    <span className="text-[13px] text-[#6b6660] font-medium">Fully engineered with 10-year warranty documentation.</span>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* REVIEWS */}
      <section id="reviews" className="px-6 py-[clamp(72px,8vw,110px)] bg-[#faf7f1] border-y border-[#1b1b1b]/10">
        <div className="max-w-[1240px] mx-auto">
          <Reveal className="text-center max-w-2xl mx-auto mb-14">
            <span className="inline-flex items-center gap-2.5 text-[12px] font-extrabold tracking-[0.28em] uppercase text-[#0e5a43] mb-3 before:content-[''] before:w-7 before:h-[2.5px] before:rounded-full before:bg-[#f2a007] after:content-[''] after:w-7 after:h-[2.5px] after:rounded-full after:bg-[#f2a007]">
              Homeowner Reviews
            </span>
            <h2 className="font-[family-name:var(--font-bricolage)] font-bold text-[clamp(28px,3.8vw,48px)] leading-[1.08] tracking-[-0.02em] mb-3">
              Rated {rating}★ on Google across {city}
            </h2>
            <p className="text-[#6b6660] text-[15px] font-medium">
              Real reviews from real homeowners who trusted us with their living spaces.
            </p>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-6">
            {reviews.slice(0, 3).map((r: any, idx: number) => (
              <Reveal key={idx} delay={idx * 80}>
                <div className="bg-white border border-[#1b1b1b]/10 rounded-[22px] p-7 h-full flex flex-col justify-between shadow-[0_12px_28px_rgba(27,27,27,0.04)]">
                  <div>
                    <div className="text-[#f2a007] text-[15px] tracking-widest mb-3">★★★★★</div>
                    <blockquote className="text-[#1b1b1b] text-[15.5px] font-medium leading-[1.65] mb-6">
                      &ldquo;{r.text}&rdquo;
                    </blockquote>
                  </div>
                  <div className="border-t border-[#1b1b1b]/10 pt-4 flex items-center gap-3">
                    <span className="w-10 h-10 rounded-full bg-[#0e5a43] text-white font-bold grid place-items-center">
                      {(r.author || 'C').charAt(0)}
                    </span>
                    <div>
                      <b className="font-[family-name:var(--font-bricolage)] text-[15px] text-[#1b1b1b] block">{r.author || 'Happy Homeowner'}</b>
                      <span className="text-[11.5px] text-[#6b6660] font-semibold">Verified Homeowner · {city}</span>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="px-6 py-[clamp(72px,8vw,110px)] bg-white">
        <div className="max-w-[900px] mx-auto">
          <Reveal className="text-center mb-12">
            <span className="inline-flex items-center gap-2.5 text-[12px] font-extrabold tracking-[0.28em] uppercase text-[#0e5a43] mb-3 before:content-[''] before:w-7 before:h-[2.5px] before:rounded-full before:bg-[#f2a007] after:content-[''] after:w-7 after:h-[2.5px] after:rounded-full after:bg-[#f2a007]">
              Got Questions?
            </span>
            <h2 className="font-[family-name:var(--font-bricolage)] font-bold text-[clamp(28px,3.8vw,46px)] leading-[1.08] tracking-[-0.02em] mb-3">
              Frequently asked questions
            </h2>
            <p className="text-[#6b6660] text-[15px] font-medium">
              Everything you need to know about pricing, warranties, and timelines.
            </p>
          </Reveal>

          <Reveal>
            <FAQAccordion items={homeFaqs} />
          </Reveal>
        </div>
      </section>

      {/* LEAD CTA */}
      <section id="consult" className="px-6 py-[clamp(72px,8vw,110px)] bg-[#0e5a43] text-white">
        <div className="max-w-[1240px] mx-auto grid lg:grid-cols-[1.1fr_0.9fr] gap-[clamp(36px,5vw,64px)] items-center">
          <Reveal>
            <span className="inline-flex items-center gap-2.5 bg-white/10 rounded-full px-4 py-1.5 text-[11px] font-extrabold tracking-widest uppercase text-[#f2a007] mb-5">
              Free 45-Min Session
            </span>
            <h2 className="font-[family-name:var(--font-bricolage)] font-bold text-[clamp(32px,4.4vw,56px)] leading-[1.08] tracking-[-0.02em] mb-4">
              Let&rsquo;s talk about your <mark className="bg-transparent text-[#f2a007]">dream home</mark>
            </h2>
            <p className="text-white/80 text-[16px] leading-[1.7] font-medium max-w-[500px] mb-8">
              Sit with a senior interior designer in {city}. We&rsquo;ll review your floor plan, provide 3D design direction, and share an exact cost estimate with zero obligation.
            </p>
            <div className="grid grid-cols-3 gap-3 max-w-[450px]">
              {[
                { v: '₹0', l: 'Consultation Fee' },
                { v: '45 Days', l: 'Handover Guarantee' },
                { v: '10 Yrs', l: 'Material Warranty' },
              ].map((b) => (
                <div key={b.l} className="bg-white/10 rounded-xl p-3.5 text-center">
                  <b className="font-[family-name:var(--font-bricolage)] text-[20px] text-[#f2a007] block">{b.v}</b>
                  <span className="text-[10.5px] uppercase tracking-wider text-white/70 font-semibold">{b.l}</span>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={120} className="bg-white text-[#1b1b1b] rounded-[24px] p-7 sm:p-9 shadow-[0_24px_60px_rgba(0,0,0,0.25)]">
            <LeadForm studioName={cleanName || 'the studio'} waPhone={waPhone} />
          </Reveal>
        </div>
      </section>
    </div>
  );
}
