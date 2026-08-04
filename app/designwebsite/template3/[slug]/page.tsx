import { readSourceConfig } from '@/lib/dataBuilder';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Check, ArrowRight, Factory, ClipboardCheck, ShieldCheck, CreditCard } from 'lucide-react';
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
import Estimator from './Estimator';

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
  { num: 1, title: 'Say hello', desc: 'Book a free session — at the studio, your home, or online.' },
  { num: 2, title: 'Dream together', desc: 'Your designer maps your lifestyle, taste and budget over chai.' },
  { num: 3, title: 'See it in 3D', desc: 'Photorealistic designs + itemised quote, revised till you smile.' },
  { num: 4, title: 'Build begins', desc: 'Precision production while site prep runs in parallel.' },
  { num: 5, title: 'Install & checks', desc: 'Careful installation, detailed inspection, deep clean.' },
  { num: 6, title: 'Move in, smile', desc: 'Keys, warranty support and a care team on call after handover.' },
];

export default async function Template3Home({ params }: PageProps) {
  const { slug } = await params;
  const basePath = `/designwebsite/template3/${slug}`;

  const data = await readSourceConfig(slug, 'template3');
  if (!data) return notFound();

  const { clinic, doctor, business, media } = data;

  const cleanName = cleanClinicName(clinic.name);
  const cleanDesc = cleanClinicDescription(clinic.description, clinic.name);
  const city = clinic.address?.city || 'Chennai';
  const phone = clinic.contact?.phone || '';
  const waPhone = phone.replace(/\D/g, '') || '919751396117';
  const rating = business.rating || '4.9';
  const reviewCount = business.reviewCount || '';
  const experienceYears = doctor?.experience?.replace(/\D/g, '') || '5';

  const heroImage =
    media.clinicImages?.[0] ||
    '/images/stock/90879216.webp';

  const servicesList: string[] = business.services?.length ? business.services : DEFAULT_INTERIOR_SERVICES;
  const highlights: string[] = business.highlights?.length ? business.highlights : DEFAULT_INTERIOR_HIGHLIGHTS;
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
      title: `Project ${String(idx + 1).padStart(2, '0')}`,
      sub: `${city} · Full home interiors`,
    })
  );

  const WHY_CARDS = [
    { icon: Factory, title: highlights[0] || 'Personalized design concepts', desc: 'Concepts built from your routines and floor plan — never a template look.' },
    { icon: ClipboardCheck, title: highlights[1] || 'Material and finish guidance', desc: 'Honest advice on ply, laminates, hardware and what actually lasts.' },
    { icon: ShieldCheck, title: highlights[2] || 'Transparent project planning', desc: 'Itemised quotes and week-by-week schedules, shared before work starts.' },
    { icon: CreditCard, title: highlights[3] || 'End-to-end execution support', desc: 'One accountable team from the first sketch to the final quality check.' },
  ];

  return (
    <div>
      {/* HERO */}
      <section id="hero" className="relative min-h-[92vh] flex items-center text-white">
        <div className="absolute inset-0 overflow-hidden">
          <img src={heroImage} alt={`Living room designed by ${cleanName || 'our studio'}`} className="w-full h-full object-cover" fetchPriority="high" />
          <div className="absolute inset-0 bg-[linear-gradient(95deg,rgba(20,14,10,0.9)_22%,rgba(20,14,10,0.45)_60%,rgba(20,14,10,0.35))]" />
        </div>

        <div className="relative max-w-[1220px] mx-auto px-7 w-full grid lg:grid-cols-[1.1fr_0.9fr] gap-12 lg:gap-14 items-center py-[70px] lg:py-[90px]">
          <Reveal>
            <div className="flex items-center gap-2.5 text-[12px] font-extrabold tracking-[0.22em] uppercase text-[#f4b942] before:content-[''] before:w-6 before:h-[2.5px] before:rounded before:bg-[#f4b942]">
              Full home interiors · {city}
            </div>
            <h1 className="text-[clamp(38px,5.4vw,62px)] font-extrabold leading-[1.15] tracking-[-0.02em] my-4.5">
              {clinic.tagline ? (
                clinic.tagline
              ) : (
                <>
                  Homes that feel
                  <br />
                  like <span className="font-[family-name:var(--font-newsreader)] italic font-medium text-[#f4b942]">you.</span>
                </>
              )}
            </h1>
            <p className="text-[17px] text-white/85 max-w-[520px] mb-7">{cleanDesc}</p>
            <div className="flex gap-3 flex-wrap mb-8">
              {highlights.slice(0, 4).map((chip) => (
                <span
                  key={chip}
                  className="flex items-center gap-2 bg-white/10 border border-white/20 backdrop-blur-md rounded-full px-4 py-2 text-[13px] font-bold"
                >
                  <Check className="w-3.5 h-3.5 text-[#f4b942]" strokeWidth={2.4} />
                  {chip}
                </span>
              ))}
            </div>
            <div className="flex items-center gap-3.5 text-[13.5px] font-semibold text-white/85">
              <span className="text-[#f4b942] tracking-[2px]">★★★★★</span>
              <span>
                Rated <b className="text-white">{rating}/5</b>
                {reviewCount ? ` by ${reviewCount}+ homeowners` : ' by homeowners'} in {city}
              </span>
            </div>
          </Reveal>

          <Reveal delay={140} className="lg:justify-self-end w-full max-w-[440px]">
            <LeadForm studioName={cleanName || 'the studio'} waPhone={waPhone} city={city} />
          </Reveal>
        </div>
      </section>

      {/* STATS BAR */}
      <section id="stats" className="bg-[#1d1713] text-white py-7 px-7 !border-0">
        <div className="max-w-[1220px] mx-auto grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-5 text-center">
          {[
            { b: `${rating}★`, s: 'Google rating' },
            { b: `${experienceYears}+ yrs`, s: `In ${city}` },
            { b: `${servicesList.length}+`, s: 'Services offered' },
            { b: '3D', s: 'Design previews' },
            { b: '1', s: 'Accountable team' },
            { b: '100%', s: 'Itemised quotes' },
          ].map((stat) => (
            <div key={stat.s}>
              <b className="text-[clamp(20px,2.4vw,27px)] font-extrabold text-[#f4b942] block">{stat.b}</b>
              <span className="text-[11.5px] opacity-75 font-semibold tracking-[0.05em] uppercase">{stat.s}</span>
            </div>
          ))}
        </div>
      </section>

      {/* OFFERINGS */}
      <section id="offerings" className="py-[clamp(64px,7vw,88px)] px-7">
        <div className="max-w-[1220px] mx-auto">
          <Reveal className="flex flex-wrap justify-between items-end gap-7 mb-11">
            <div>
              <div className="flex items-center gap-2.5 text-[12px] font-extrabold tracking-[0.22em] uppercase text-[#d8442c] before:content-[''] before:w-6 before:h-[2.5px] before:rounded before:bg-[#d8442c]">
                One-stop shop
              </div>
              <h2 className="text-[clamp(28px,3.8vw,44px)] font-extrabold mt-3.5 tracking-[-0.02em]">
                Everything your home needs, under one roof
              </h2>
            </div>
            <Link
              href={`${basePath}/contact`}
              className="inline-flex items-center justify-center bg-[#1d1713] text-white font-extrabold text-[15px] px-7 py-3.5 rounded-xl hover:bg-black hover:-translate-y-0.5 transition-all duration-250"
            >
              Start My Project
            </Link>
          </Reveal>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {offerings.map((offer, idx) => (
              <Reveal key={offer.title} delay={idx * 50} className={idx > 2 ? 'max-md:hidden' : ''}>
                <Link href={`${basePath}/services`} className="group relative block rounded-2xl overflow-hidden aspect-[3/4.1]">
                  <img
                    src={offer.img}
                    alt={offer.title}
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-600 group-hover:scale-[1.08]"
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(29,23,19,0.05)_40%,rgba(29,23,19,0.9))]" />
                  <div className="absolute bottom-0 left-0 right-0 p-5 z-[2] text-white">
                    <h3 className="text-[17px] font-extrabold mb-1">{offer.title}</h3>
                    <p className="text-[12px] text-white/80 leading-[1.45]">{offer.sub}</p>
                    <span className="mt-3 inline-flex items-center gap-1.5 text-[11.5px] font-extrabold tracking-[0.12em] uppercase text-[#f4b942]">
                      Explore
                      <ArrowRight className="w-3.5 h-3.5 transition-transform duration-250 group-hover:translate-x-1.5" strokeWidth={2.4} />
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ESTIMATOR */}
      <section id="estimator" className="py-[clamp(64px,7vw,88px)] px-7 bg-white">
        <div className="max-w-[1220px] mx-auto">
          <Reveal>
            <Estimator contactPath={`${basePath}/contact`} />
          </Reveal>
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects" className="py-[clamp(64px,7vw,88px)] px-7">
        <div className="max-w-[1220px] mx-auto">
          <Reveal className="flex flex-wrap justify-between items-end gap-7 mb-11">
            <div>
              <div className="flex items-center gap-2.5 text-[12px] font-extrabold tracking-[0.22em] uppercase text-[#d8442c] before:content-[''] before:w-6 before:h-[2.5px] before:rounded before:bg-[#d8442c]">
                Real homes, real {city}
              </div>
              <h2 className="text-[clamp(28px,3.8vw,44px)] font-extrabold mt-3.5 tracking-[-0.02em]">
                Dream homes, delivered
              </h2>
            </div>
            <Link
              href={`${basePath}/gallery`}
              className="inline-flex items-center justify-center bg-[#1d1713] text-white font-extrabold text-[15px] px-7 py-3.5 rounded-xl hover:bg-black hover:-translate-y-0.5 transition-all duration-250"
            >
              Yours Could Be Next
            </Link>
          </Reveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5.5">
            {projects.map((proj, idx) => (
              <Reveal key={idx} delay={(idx % 3) * 60}>
                <Link href={`${basePath}/gallery`} className="group relative block rounded-[18px] overflow-hidden aspect-[4/3.3]">
                  <img
                    src={proj.img}
                    alt={proj.title}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.07]"
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_40%,rgba(29,23,19,0.9))]" />
                  <span className="absolute top-3.5 left-3.5 z-[2] bg-white text-[#241f1a] text-[11px] font-extrabold px-3.5 py-1.5 rounded-full">
                    {proj.tag}
                  </span>
                  <div className="absolute bottom-0 left-0 right-0 p-5 z-[2] text-white">
                    <b className="text-[17px] block tracking-[-0.01em]">{proj.title}</b>
                    <span className="text-[12.5px] text-white/80">{proj.sub}</span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* WHY */}
      <section id="why" className="py-[clamp(64px,7vw,88px)] px-7 bg-white">
        <div className="max-w-[1220px] mx-auto">
          <Reveal className="mb-11">
            <div className="flex items-center gap-2.5 text-[12px] font-extrabold tracking-[0.22em] uppercase text-[#d8442c] before:content-[''] before:w-6 before:h-[2.5px] before:rounded before:bg-[#d8442c]">
              Why {cleanName || 'us'}
            </div>
            <h2 className="text-[clamp(28px,3.8vw,44px)] font-extrabold mt-3.5 tracking-[-0.02em]">
              Built like a brand, priced like a local
            </h2>
          </Reveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {WHY_CARDS.map((card, idx) => {
              const Icon = card.icon;
              return (
                <Reveal key={idx} delay={idx * 60}>
                  <div className="bg-white border border-[#241f1a]/10 rounded-[18px] px-6 py-7 h-full transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_22px_44px_-18px_rgba(29,23,19,0.18)]">
                    <span className="w-[46px] h-[46px] rounded-[13px] bg-[#fdeae5] text-[#d8442c] grid place-items-center mb-4">
                      <Icon className="w-[21px] h-[21px]" strokeWidth={2} />
                    </span>
                    <h3 className="text-[16.5px] font-extrabold mb-2 leading-snug">{card.title}</h3>
                    <p className="text-[13.5px] text-[#6d6259] leading-[1.6]">{card.desc}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section id="process" className="py-[clamp(64px,7vw,88px)] px-7">
        <div className="max-w-[1220px] mx-auto">
          <Reveal className="mb-11">
            <div className="flex items-center gap-2.5 text-[12px] font-extrabold tracking-[0.22em] uppercase text-[#d8442c] before:content-[''] before:w-6 before:h-[2.5px] before:rounded before:bg-[#d8442c]">
              From hello to move-in
            </div>
            <h2 className="text-[clamp(28px,3.8vw,44px)] font-extrabold mt-3.5 tracking-[-0.02em]">Six simple steps</h2>
          </Reveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
            {PROCESS.map((step, idx) => (
              <Reveal key={step.num} delay={idx * 50}>
                <div className={`px-4.5 py-6 h-full ${idx > 0 ? 'xl:border-l xl:border-[#241f1a]/10' : ''}`}>
                  <span className="w-[38px] h-[38px] rounded-full bg-[#d8442c] text-white grid place-items-center font-extrabold text-[14px] mb-4">
                    {step.num}
                  </span>
                  <h3 className="text-[15.5px] font-extrabold mb-2">{step.title}</h3>
                  <p className="text-[12.5px] text-[#6d6259] leading-[1.55]">{step.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section id="reviews" className="py-[clamp(64px,7vw,88px)] px-7 bg-white">
        <div className="max-w-[1220px] mx-auto">
          <Reveal className="text-center mb-11">
            <div className="flex items-center justify-center gap-2.5 text-[12px] font-extrabold tracking-[0.22em] uppercase text-[#d8442c]">
              Homeowner stories
            </div>
            <h2 className="text-[clamp(28px,3.8vw,44px)] font-extrabold mt-3.5 tracking-[-0.02em]">
              Why {city} keeps recommending us
            </h2>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-5.5">
            {reviews.slice(0, 3).map((review: any, i: number) => (
              <Reveal key={i} delay={i * 60}>
                <div className="bg-white border border-[#241f1a]/10 rounded-[18px] px-6.5 py-7 flex flex-col gap-4 h-full transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_22px_44px_-18px_rgba(29,23,19,0.18)]">
                  <div className="text-[#f4b942] tracking-[2px] text-[14px]">
                    {'★'.repeat(Math.max(1, Math.min(5, parseInt(String(review.rating)) || 5)))}
                  </div>
                  <p className="text-[14.5px] leading-[1.7] flex-1">&ldquo;{review.text}&rdquo;</p>
                  <div className="flex items-center gap-3 border-t border-[#241f1a]/10 pt-4">
                    <span className="w-11 h-11 rounded-full bg-[#1d1713] text-[#f4b942] grid place-items-center font-extrabold text-[15px]">
                      {(review.author || 'C').charAt(0)}
                    </span>
                    <div>
                      <b className="text-[14px] block">{review.author || 'Happy Client'}</b>
                      <span className="text-[12px] text-[#6d6259]">Verified Google review</span>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ + CTA */}
      <section id="faq" className="py-[clamp(64px,7vw,88px)] px-7">
        <div className="max-w-[1220px] mx-auto grid lg:grid-cols-2 gap-11 lg:gap-14 items-start">
          <Reveal>
            <div className="flex items-center gap-2.5 text-[12px] font-extrabold tracking-[0.22em] uppercase text-[#d8442c] before:content-[''] before:w-6 before:h-[2.5px] before:rounded before:bg-[#d8442c]">
              Good questions
            </div>
            <h2 className="text-[clamp(28px,3.8vw,44px)] font-extrabold mt-3.5 mb-6 tracking-[-0.02em]">Before you ask</h2>
            {INTERIOR_FAQS.map((faq, idx) => (
              <details key={idx} open={idx === 0} className={`group border-b border-[#241f1a]/10 px-1 py-4.5 ${idx === 0 ? 'border-t' : ''}`}>
                <summary className="text-[16px] font-extrabold cursor-pointer list-none flex justify-between items-center gap-4 tracking-[-0.01em] [&::-webkit-details-marker]:hidden">
                  {faq.q}
                  <span className="text-[24px] text-[#d8442c] font-normal transition-transform duration-250 group-open:rotate-45 shrink-0">+</span>
                </summary>
                <p className="text-[#6d6259] text-[14.5px] pt-3 leading-[1.7]">{faq.a}</p>
              </details>
            ))}
          </Reveal>

          <Reveal delay={120} className="lg:sticky lg:top-[120px]">
            <div className="bg-[linear-gradient(150deg,#d8442c,#b93320)] text-white rounded-3xl px-9 py-11">
              <h3 className="text-[27px] font-extrabold mb-3 leading-tight">Your dream home is one session away</h3>
              <p className="text-[14.5px] opacity-90 mb-6.5">
                Book a free design session this week — 3D designs + itemised quote for your floor plan, free.
              </p>
              <Link
                href={`${basePath}/contact`}
                className="block w-full text-center bg-white text-[#d8442c] font-extrabold text-[15px] px-7 py-3.5 rounded-xl mb-3 hover:-translate-y-0.5 hover:shadow-[0_12px_26px_rgba(0,0,0,0.2)] transition-all duration-250"
              >
                Book Free Design Session
              </Link>
              {phone && (
                <a href={`tel:${phone}`} className="block text-center font-extrabold text-[14.5px] hover:underline">
                  or call {phone} →
                </a>
              )}
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
