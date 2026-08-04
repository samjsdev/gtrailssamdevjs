import { readSourceConfig } from '@/lib/dataBuilder';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Check, Clock, ShieldCheck, CreditCard, BadgeCheck, ArrowRight, Home } from 'lucide-react';
import { cleanClinicName, cleanClinicDescription } from '@/lib/copyCleaner';
import {
  DEFAULT_INTERIOR_REVIEWS,
  DEFAULT_INTERIOR_SERVICES,
  DEFAULT_INTERIOR_HIGHLIGHTS,
  INTERIOR_FAQS,
  getInteriorServiceData,
} from '@/lib/interiorContent';
import Reveal from './Reveal';
import LeadForm from './LeadForm';

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
  { pct: 'Step 1', title: 'Meet Your Designer', desc: 'A free session at the studio, your home or online. Walk out with a design direction and a ballpark for your floor plan.' },
  { pct: 'Step 2', title: 'Lock Your Design', desc: 'Happy with the plan? Approve the 3D designs and itemised quote — your price and timeline are frozen at booking.' },
  { pct: 'Step 3', title: 'We Build & Track', desc: 'Production and site work run in parallel while you get regular photo updates. No chasing, no surprises.' },
  { pct: 'Step 4', title: 'Install & Move In', desc: 'Installation, quality checks, deep-clean and a walkthrough — then the keys are yours, as promised.' },
];

export default async function Template2Home({ params }: PageProps) {
  const { slug } = await params;
  const basePath = `/designwebsite/template2/${slug}`;

  const data = await readSourceConfig(slug, 'template2');
  if (!data) return notFound();

  const { clinic, doctor, business, media } = data;

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
  const ctaImage =
    media.otherImages?.[3] ||
    '/images/stock/84fea9c5.webp';

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

  const avatarColors = ['bg-[#0e5a43] text-white', 'bg-[#f2a007] text-[#1b1b1b]', 'bg-[#8a5a2b] text-white'];

  return (
    <div>
      {/* HERO */}
      <section id="hero" className="bg-[#faf7f1] overflow-hidden">
        <div className="max-w-[1240px] mx-auto px-6 py-[clamp(44px,6vw,80px)] grid lg:grid-cols-[1.02fr_0.98fr] gap-[clamp(34px,5vw,64px)] items-center">
          <div>
            <span className="inline-flex items-center gap-2.5 bg-white border border-[#1b1b1b]/10 rounded-full px-4.5 py-2 text-[12px] font-bold tracking-[0.14em] uppercase text-[#0e5a43] mb-6 before:content-[''] before:w-2 before:h-2 before:rounded-full before:bg-[#f2a007]">
              End-to-End Home Interiors
            </span>
            <h1 className="font-[family-name:var(--font-bricolage)] font-bold text-[clamp(38px,4.8vw,62px)] leading-[1.05] tracking-[-0.02em]">
              {clinic.tagline || (
                <>Beautiful home interiors in {city}, on time &amp; on budget</>
              )}
            </h1>
            <p className="mt-5 mb-7 max-w-[500px] text-[#6b6660] text-[16.5px] leading-[1.7] font-medium">
              {cleanDesc}
            </p>
            <div className="grid gap-3 mb-8">
              {highlights.slice(0, 3).map((point) => (
                <div key={point} className="flex gap-3 items-center font-semibold text-[14.5px]">
                  <Check className="w-5 h-5 text-[#0e5a43] shrink-0" strokeWidth={2.2} />
                  {point}
                </div>
              ))}
            </div>
            <div className="flex flex-wrap gap-3.5 items-center">
              <Link
                href={`${basePath}/contact`}
                className="inline-flex items-center justify-center gap-2 bg-[#0e5a43] text-white font-bold text-[14px] px-6.5 py-3.5 rounded-xl hover:bg-[#0a4232] hover:-translate-y-0.5 hover:shadow-[0_14px_28px_rgba(14,90,67,0.28)] transition-all duration-300"
              >
                Get Free Estimate
              </Link>
              <Link
                href={`${basePath}/gallery`}
                className="inline-flex items-center justify-center gap-2 bg-transparent text-[#1b1b1b] font-bold text-[14px] px-6.5 py-3.5 rounded-xl border-[1.5px] border-[#1b1b1b] hover:bg-[#1b1b1b] hover:text-white transition-all duration-300"
              >
                Browse Designs
              </Link>
            </div>
            <p className="mt-5 text-[12.5px] text-[#6b6660] font-semibold flex items-center gap-2">
              <span className="text-[#f2a007] tracking-[2px]">★★★★★</span>
              {rating} rated by homeowners on Google
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
              <img src={heroImage} alt={`Interior designed by ${cleanName || 'our studio'}`} className="w-full h-full object-cover" fetchPriority="high" />
            </div>
            <div className="lg:absolute lg:-left-8 lg:-bottom-7 lg:w-[min(360px,88%)] mt-5 lg:mt-0">
              <LeadForm studioName={cleanName || 'the studio'} waPhone={waPhone} />
            </div>
          </div>
        </div>
      </section>

      {/* TRUST BAR */}
      <section id="trust" className="bg-[#1b1b1b] text-white !p-0">
        <div className="max-w-[1240px] mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: Clock, title: 'On-Time Delivery', sub: 'Milestone-tracked schedule' },
            { icon: ShieldCheck, title: 'Quality Materials', sub: 'Branded hardware only' },
            { icon: CreditCard, title: 'Honest Pricing', sub: 'Itemised, frozen at booking' },
            { icon: BadgeCheck, title: 'Quality Checks', sub: 'Before every handover' },
          ].map((cell, i) => {
            const Icon = cell.icon;
            return (
              <div key={i} className={`px-6 py-8 flex gap-4 items-center border-white/10 ${i > 0 ? 'sm:border-l max-sm:border-t' : ''}`}>
                <span className="w-[46px] h-[46px] shrink-0 rounded-[14px] bg-white/10 grid place-items-center">
                  <Icon className="w-[22px] h-[22px] text-[#f2a007]" strokeWidth={2} />
                </span>
                <span>
                  <b className="font-[family-name:var(--font-bricolage)] font-bold text-[17px] block leading-tight">{cell.title}</b>
                  <span className="text-[12px] text-white/60 font-semibold">{cell.sub}</span>
                </span>
              </div>
            );
          })}
        </div>
      </section>

      {/* ROOMS / DESIGNS */}
      <section id="rooms" className="px-6 py-[clamp(72px,8vw,110px)] bg-white">
        <div className="max-w-[1240px] mx-auto">
          <Reveal className="flex flex-wrap justify-between items-end gap-8 mb-[clamp(38px,4.5vw,60px)]">
            <div>
              <span className="inline-flex items-center gap-2.5 text-[12px] font-extrabold tracking-[0.28em] uppercase text-[#0e5a43] mb-3.5 before:content-[''] before:w-7 before:h-[2.5px] before:rounded-full before:bg-[#f2a007]">
                What we design
              </span>
              <h2 className="font-[family-name:var(--font-bricolage)] font-bold text-[clamp(30px,3.8vw,50px)] leading-[1.08] tracking-[-0.02em]">
                Designs for <mark className="bg-[linear-gradient(transparent_62%,#fdeecb_62%)] text-[#0e5a43] px-0.5">every room</mark>
              </h2>
            </div>
            <p className="max-w-[400px] text-[#6b6660] font-medium leading-[1.7] text-[15px]">
              Curated looks our designers personalise to your floor plan, your style and your budget.
            </p>
            <Link href={`${basePath}/services`} className="font-extrabold text-[14px] text-[#0e5a43] inline-flex items-center gap-2 border-b-[2.5px] border-[#f2a007] pb-1 hover:gap-3.5 transition-all whitespace-nowrap">
              Explore services →
            </Link>
          </Reveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {rooms.map((room, idx) => (
              <Reveal key={room.title} delay={(idx % 3) * 60}>
                <Link
                  href={`${basePath}/gallery`}
                  className="group block border border-[#1b1b1b]/10 rounded-[22px] overflow-hidden bg-white transition-all duration-350 hover:-translate-y-2 hover:shadow-[0_24px_60px_rgba(27,27,27,0.12)] hover:border-transparent"
                >
                  <div className="relative aspect-[16/11] overflow-hidden">
                    {room.tag && (
                      <span className="absolute top-3.5 left-3.5 z-10 bg-white/95 rounded-full px-3.5 py-1.5 text-[11px] font-extrabold tracking-[0.1em] uppercase text-[#0e5a43]">
                        {room.tag}
                      </span>
                    )}
                    <img
                      src={room.img}
                      alt={room.title}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-800 ease-[cubic-bezier(.19,1,.22,1)] group-hover:scale-[1.06]"
                    />
                  </div>
                  <div className="px-5.5 py-5 flex justify-between items-center gap-3">
                    <div>
                      <h3 className="font-[family-name:var(--font-bricolage)] font-bold text-[19px] mb-1">{room.title}</h3>
                      <span className="text-[12.5px] text-[#6b6660] font-semibold">{room.sub}</span>
                    </div>
                    <span className="w-11 h-11 shrink-0 rounded-full border-[1.5px] border-[#1b1b1b]/10 grid place-items-center transition-all duration-300 group-hover:bg-[#0e5a43] group-hover:border-[#0e5a43]">
                      <ArrowRight className="w-[17px] h-[17px] text-[#1b1b1b] transition-all duration-300 group-hover:text-white group-hover:-rotate-45" strokeWidth={2.2} />
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section id="process" className="px-6 py-[clamp(72px,8vw,110px)] bg-white border-t border-[#1b1b1b]/5">
        <div className="max-w-[1240px] mx-auto">
          <Reveal className="flex flex-wrap justify-between items-end gap-8 mb-[clamp(38px,4.5vw,60px)]">
            <div>
              <span className="inline-flex items-center gap-2.5 text-[12px] font-extrabold tracking-[0.28em] uppercase text-[#0e5a43] mb-3.5 before:content-[''] before:w-7 before:h-[2.5px] before:rounded-full before:bg-[#f2a007]">
                How it works
              </span>
              <h2 className="font-[family-name:var(--font-bricolage)] font-bold text-[clamp(30px,3.8vw,50px)] leading-[1.08] tracking-[-0.02em]">
                Your dream home in <mark className="bg-[linear-gradient(transparent_62%,#fdeecb_62%)] text-[#0e5a43] px-0.5">4 simple steps</mark>
              </h2>
            </div>
            <p className="max-w-[400px] text-[#6b6660] font-medium leading-[1.7] text-[15px]">
              Clear milestones tied to real progress — you always know what happens next.
            </p>
          </Reveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {STEPS.map((step, idx) => (
              <Reveal key={step.title} delay={idx * 60}>
                <div className="relative border border-[#1b1b1b]/10 rounded-[22px] px-6.5 py-7 bg-[#faf7f1] transition-colors duration-300 hover:border-[#0e5a43] hover:bg-white h-full">
                  <span className="inline-block bg-[#fdeecb] text-[#1b1b1b] text-[11px] font-extrabold tracking-[0.14em] uppercase rounded-full px-3.5 py-1.5 mb-5">
                    {step.pct}
                  </span>
                  <h3 className="font-[family-name:var(--font-bricolage)] font-bold text-[20px] mb-2.5">{step.title}</h3>
                  <p className="text-[13.5px] text-[#6b6660] font-medium leading-[1.65]">{step.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* WHY US */}
      <section id="why" className="px-6 py-[clamp(72px,8vw,110px)] bg-[#faf7f1]">
        <div className="max-w-[1240px] mx-auto grid lg:grid-cols-[0.95fr_1.05fr] gap-[clamp(40px,5vw,72px)] items-center">
          <Reveal className="relative">
            <div className="rounded-[26px] overflow-hidden aspect-[4/3.9] shadow-[0_24px_60px_rgba(27,27,27,0.12)]">
              <img src={whyImage} alt={`Completed home by ${cleanName || 'our studio'}`} loading="lazy" className="w-full h-full object-cover" />
            </div>
            <div className="absolute left-5 bottom-5 bg-white rounded-2xl px-5.5 py-4 shadow-[0_24px_60px_rgba(27,27,27,0.12)]">
              <b className="font-[family-name:var(--font-bricolage)] text-[24px] block leading-none">{rating}★</b>
              <span className="text-[11px] font-extrabold tracking-[0.12em] uppercase text-[#6b6660]">Google rating</span>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <span className="inline-flex items-center gap-2.5 text-[12px] font-extrabold tracking-[0.28em] uppercase text-[#0e5a43] mb-3.5 before:content-[''] before:w-7 before:h-[2.5px] before:rounded-full before:bg-[#f2a007]">
              Why {cleanName || 'us'}
            </span>
            <h2 className="font-[family-name:var(--font-bricolage)] font-bold text-[clamp(30px,3.8vw,48px)] leading-[1.08] tracking-[-0.02em] mb-4.5">
              The no-drama way to do <mark className="bg-[linear-gradient(transparent_62%,#fdeecb_62%)] text-[#0e5a43] px-0.5">home interiors</mark>
            </h2>
            <p className="text-[#6b6660] font-medium leading-[1.75] text-[15.5px] mb-6.5">
              Carpenters who vanish, budgets that balloon, timelines that slip — we built {cleanName || 'this studio'} to fix exactly that. One accountable team, from design to handover.
            </p>
            <div className="grid sm:grid-cols-2 gap-3.5 mb-8">
              {highlights.slice(0, 6).map((tick) => (
                <div key={tick} className="flex gap-3 items-start bg-white border border-[#1b1b1b]/10 rounded-[14px] px-4 py-3.5">
                  <Check className="w-5 h-5 text-[#0e5a43] shrink-0 mt-px" strokeWidth={2.2} />
                  <b className="text-[13.5px]">{tick}</b>
                </div>
              ))}
            </div>
            <Link
              href={`${basePath}/contact`}
              className="inline-flex items-center justify-center gap-2 bg-[#0e5a43] text-white font-bold text-[14px] px-6.5 py-3.5 rounded-xl hover:bg-[#0a4232] hover:-translate-y-0.5 hover:shadow-[0_14px_28px_rgba(14,90,67,0.28)] transition-all duration-300"
            >
              Talk to a Designer — Free
            </Link>
          </Reveal>
        </div>
      </section>

      {/* REVIEWS */}
      <section id="reviews" className="px-6 py-[clamp(72px,8vw,110px)] bg-white">
        <div className="max-w-[1240px] mx-auto">
          <Reveal className="mb-[clamp(38px,4.5vw,60px)]">
            <span className="inline-flex items-center gap-2.5 text-[12px] font-extrabold tracking-[0.28em] uppercase text-[#0e5a43] mb-3.5 before:content-[''] before:w-7 before:h-[2.5px] before:rounded-full before:bg-[#f2a007]">
              Homeowner reviews
            </span>
            <h2 className="font-[family-name:var(--font-bricolage)] font-bold text-[clamp(30px,3.8vw,50px)] leading-[1.08] tracking-[-0.02em]">
              Happy homes <mark className="bg-[linear-gradient(transparent_62%,#fdeecb_62%)] text-[#0e5a43] px-0.5">and counting</mark>
            </h2>
          </Reveal>

          <Reveal className="grid md:grid-cols-3 gap-5.5">
            {reviews.slice(0, 3).map((review: any, i: number) => (
              <div
                key={i}
                className="border border-[#1b1b1b]/10 rounded-[22px] px-7 py-7 bg-white flex flex-col gap-4.5 transition-all duration-300 hover:shadow-[0_24px_60px_rgba(27,27,27,0.12)] hover:-translate-y-1.5"
              >
                <span className="text-[#f2a007] text-[14px] tracking-[3px]">
                  {'★'.repeat(Math.max(1, Math.min(5, parseInt(String(review.rating)) || 5)))}
                </span>
                <blockquote className="text-[15px] font-medium leading-[1.7] text-[#1b1b1b] flex-1">
                  &ldquo;{review.text}&rdquo;
                </blockquote>
                <div className="flex items-center gap-3 border-t border-[#1b1b1b]/10 pt-4.5">
                  <span className={`w-11 h-11 rounded-full grid place-items-center font-extrabold text-[16px] ${avatarColors[i % avatarColors.length]}`}>
                    {(review.author || 'C').charAt(0)}
                  </span>
                  <div>
                    <b className="text-[14px] block">{review.author || 'Happy Client'}</b>
                    <span className="text-[12px] text-[#6b6660] font-semibold">Verified Google Review</span>
                  </div>
                </div>
              </div>
            ))}
          </Reveal>

          <Reveal className="mt-8 flex justify-center">
            <div className="flex items-center gap-3 border border-[#1b1b1b]/10 rounded-full px-6.5 py-3 bg-[#faf7f1]">
              <b className="font-[family-name:var(--font-bricolage)] text-[19px]">{rating}</b>
              <span className="text-[#f2a007] tracking-[2px]">★★★★★</span>
              <span className="text-[12.5px] text-[#6b6660] font-semibold">rated on Google</span>
            </div>
          </Reveal>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="px-6 py-[clamp(72px,8vw,110px)] bg-[#faf7f1]">
        <div className="max-w-[820px] mx-auto">
          <Reveal>
            <h2 className="font-[family-name:var(--font-bricolage)] font-bold text-[clamp(30px,3.6vw,46px)] tracking-[-0.02em] text-center mb-10">
              Questions? Answered.
            </h2>
          </Reveal>
          <Reveal>
            {INTERIOR_FAQS.map((faq, idx) => (
              <details
                key={idx}
                open={idx === 0}
                className="group bg-white border border-[#1b1b1b]/10 rounded-2xl mb-3 overflow-hidden open:border-[#0e5a43] transition-colors duration-300"
              >
                <summary className="cursor-pointer list-none px-6.5 py-5.5 font-bold text-[15.5px] flex justify-between items-center gap-4 [&::-webkit-details-marker]:hidden">
                  {faq.q}
                  <span className="font-[family-name:var(--font-bricolage)] text-[24px] font-semibold text-[#0e5a43] transition-transform duration-300 group-open:rotate-45 shrink-0">+</span>
                </summary>
                <p className="px-6.5 pb-6 text-[#6b6660] text-[14.5px] font-medium leading-[1.75]">{faq.a}</p>
              </details>
            ))}
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <section id="cta" className="relative px-6 py-[clamp(72px,8vw,110px)] text-white overflow-hidden">
        <img src={ctaImage} alt="" loading="lazy" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-[linear-gradient(100deg,rgba(10,66,50,0.96)_0%,rgba(10,66,50,0.86)_55%,rgba(10,66,50,0.55)_100%)]" />
        <Reveal className="relative z-10 max-w-[760px] mx-auto text-center">
          <span className="inline-flex items-center justify-center gap-2.5 text-[12px] font-extrabold tracking-[0.28em] uppercase text-[#f2a007] mb-4">
            Limited slots this month
          </span>
          <h2 className="font-[family-name:var(--font-bricolage)] font-bold text-[clamp(32px,4.4vw,56px)] leading-[1.08] tracking-[-0.02em] mb-4.5">
            Your dream home is <mark className="bg-transparent text-[#f2a007]">one free session away</mark>
          </h2>
          <p className="text-white/80 font-medium text-[16px] leading-[1.7] max-w-[540px] mx-auto mb-8">
            Designs, 3D views and an exact quote for your floor plan — free, with zero obligation.
          </p>
          <div className="flex flex-wrap gap-3.5 justify-center">
            <Link
              href={`${basePath}/contact`}
              className="inline-flex items-center justify-center gap-2 bg-[#f2a007] text-[#1b1b1b] font-bold text-[15px] px-9 py-4.5 rounded-[14px] hover:bg-[#e09500] hover:-translate-y-0.5 hover:shadow-[0_14px_28px_rgba(242,160,7,0.35)] transition-all duration-300"
            >
              Book My Free Session
            </Link>
            {phone && (
              <a
                href={`tel:${phone}`}
                className="inline-flex items-center justify-center gap-2 bg-transparent border-[1.5px] border-white/55 text-white font-bold text-[15px] px-9 py-4.5 rounded-[14px] hover:bg-white/10 transition-all duration-300"
              >
                Call {phone}
              </a>
            )}
          </div>
        </Reveal>
      </section>
    </div>
  );
}
