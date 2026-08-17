import { readSourceConfig } from '@/lib/dataBuilder';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Clock, Users, Heart, ShieldCheck, ArrowRight, Sparkles, Compass, Layers } from 'lucide-react';
import { cleanClinicName, cleanClinicDescription } from '@/lib/copyCleaner';
import { DEFAULT_INTERIOR_REVIEWS,
  previewMedia,
} from '@/lib/interiorContent';
import Reveal from './Reveal';
import SeriesScroll, { SeriesTheme } from './SeriesScroll';
import TestimonialRotator, { Testimonial } from './TestimonialRotator';
import VisitForm from './VisitForm';
import FAQAccordion, { FAQItem } from './FAQAccordion';

type PageProps = { params: Promise<{ slug: string }> };

const THEME_IMAGES = [
  '/images/stock/68b39046.webp',
  '/images/stock/a0e0726f.webp',
  '/images/stock/dc1759ad.webp',
  '/images/stock/f23e9dc6.webp',
  '/images/stock/615f9d34.webp',
];

const THEMES = [
  { name: 'Lyrical Luxury', desc: 'Warm cove light, velvet & brushed brass — quiet timeless opulence' },
  { name: 'Modern Zen', desc: 'Bare architectural essentials, breathing room, morning light trajectory' },
  { name: 'European Reverie', desc: 'Panelled walls, antique mirrors, Parisian restraint and chevron timber' },
  { name: 'Chettinad Contemporary', desc: 'Heritage wood joinery & Athangudi soul translated into modern lines' },
  { name: 'Coastal Calm', desc: 'Natural rattan, textured indigo & sea-breeze ease for coastal residences' },
];

const TACTILE_MATERIALS = [
  {
    title: 'Smoked Oak & Teak Veneers',
    desc: 'Hand-selected natural timber veneers with non-toxic open-pore PU polish that accentuates natural wood grain.',
  },
  {
    title: 'Bookmatched Italian Marble',
    desc: 'Precision-cut Statuario and Grey William marble slabs for seamless television feature walls and vanities.',
  },
  {
    title: 'Fluted Acoustic Panelling',
    desc: 'Concealed storage doors disguised as architectural wall slats, reducing sound reverberation in open spaces.',
  },
  {
    title: 'Champagne Brushed Metallics',
    desc: 'PVD-coated brass handles, kitchen profile channels, and pendant light accents that resist oxidation.',
  },
];

const ATELIER_VISIT = [
  {
    icon: Compass,
    number: '01',
    title: 'Read the residence',
    desc: 'We begin with your plan, light, routines, and the moments you want each room to hold — from unhurried mornings to a full house at dinner.',
  },
  {
    icon: Layers,
    number: '02',
    title: 'Set a visual language',
    desc: 'We edit references into a cohesive material and mood direction, so the home has a point of view without becoming a showroom.',
  },
  {
    icon: Sparkles,
    number: '03',
    title: 'Shape the next move',
    desc: 'You leave with a thoughtful sense of scope, priorities, and the questions worth answering before work begins.',
  },
];

export default async function Template4Home({ params }: PageProps) {
  const { slug } = await params;
  const basePath = `/designwebsite/template4/${slug}`;

  const data = await readSourceConfig(slug, 'template4');
  if (!data) return notFound();

  const { clinic } = data;

  const media = previewMedia(data.media);
  const cleanName = cleanClinicName(clinic.name);
  const cleanDesc = cleanClinicDescription(clinic.description, clinic.name);
  const city = clinic.address?.city || 'Chennai';
  const phone = clinic.contact?.phone || '';
  const waPhone = phone.replace(/\D/g, '') || '919751396117';

  const heroImage =
    media.clinicImages?.[0] ||
    '/images/stock/6dcb103c.webp';

  const themes: SeriesTheme[] = THEMES.map((theme, idx) => ({
    ...theme,
    img: media.treatmentImages?.[idx] || THEME_IMAGES[idx],
  }));

  const reviewsSource = data.reviews?.length ? data.reviews : DEFAULT_INTERIOR_REVIEWS;
  const testimonials: Testimonial[] = reviewsSource.slice(0, 3).map((review: any) => ({
    text: review.text || review.review || '',
    author: review.author || review.name || 'A happy homeowner',
    detail: `Private Residence · ${city}`,
  }));

  const philosophy = [
    {
      icon: Clock,
      title: 'Daily Rhythms',
      desc: 'Morning light in the breakfast corner, evening calm in the reading nook — spaces tuned to the hours of your day.',
    },
    {
      icon: Users,
      title: 'Family-First',
      desc: 'Proportions, seating heights and gathering spaces shaped around how your family actually comes together.',
    },
    {
      icon: Heart,
      title: 'Pet-Friendly',
      desc: 'Scratch-proof finishes, washable fabrics and window perches — beautiful rooms that survive paws and play.',
    },
    {
      icon: ShieldCheck,
      title: 'Senior-Safe',
      desc: 'Step-free thresholds, grab-rail-ready baths and clear sightlines — dignity and ease for parents and grandparents.',
    },
  ];

  const transformations = [
    {
      quote: '"It finally feels like us."',
      title: 'A Family Apartment, Reimagined',
      desc: 'A bare builder-finish apartment became a layered, light-filled family home — pooja niche at sunrise, a homework counter that seats three, and storage that swallowed a decade of clutter.',
      specs: [
        { b: '3BHK', s: 'Configuration' },
        { b: '9 weeks', s: 'Timeline' },
        { b: 'Modern Zen', s: 'Theme' },
        { b: city, s: 'Location' },
      ],
      img: media.treatmentImages?.[0] || '/images/stock/a151a9e5.webp',
      tag: 'Completed · 9 weeks',
    },
    {
      quote: '"Guests never want to leave the kitchen."',
      title: 'A Villa Around Its Kitchen',
      desc: 'A 20-year-old villa, reimagined around a showpiece kitchen — handmade tiles, a generous island and a herb wall that gets the morning sun. Heritage bones, contemporary heart.',
      specs: [
        { b: '4BHK Villa', s: 'Configuration' },
        { b: '14 weeks', s: 'Timeline' },
        { b: 'Chettinad', s: 'Theme' },
        { b: city, s: 'Location' },
      ],
      img: media.treatmentImages?.[1] || '/images/stock/bf333360.webp',
      tag: 'Completed · 14 weeks',
    },
  ];

  const journey = [
    { title: 'Say Hello', desc: 'A quiet conversation over coffee — about your routines, taste, and aspirations.' },
    { title: 'Dream Together', desc: 'Curated moodboards and bespoke theme explorations tailored to your floor plan.' },
    { title: 'See It Alive', desc: 'Cinematic 3D walkthroughs, lighting schemes, and exact itemised material specifications.' },
    { title: 'Trust the Craft', desc: 'Factory precision joinery, master carpenters, weekly photo diaries and zero site friction.' },
    { title: 'Move In, Smiling', desc: 'A styled, deep-cleaned, turnkey home backed by a 10-year warranty certificate.' },
  ];

  const homeFaqs: FAQItem[] = [
    {
      q: `How is ${cleanName || 'our atelier'} different from commercial interior firms?`,
      a: 'We limit our active commissions each month so our principal designer personally oversees every joinery drawing, material selection, and site milestone.',
      tag: 'Atelier Approach',
    },
    {
      q: 'Can we experience physical material samples before commissioning?',
      a: `Yes. During your studio visit in ${city}, you will review natural veneers, imported marble slabs, tactile linen fabrics, and acoustic wood slats in our private library.`,
      tag: 'Materials Library',
    },
    {
      q: 'What is your warranty and post-handover commitment?',
      a: 'We provide an unconditional 10-year structural warranty on all woodwork, accompanied by complimentary care inspections at 6 and 12 months after move-in.',
      tag: '10-Year Warranty',
    },
    {
      q: 'How are budgets and scope managed?',
      a: 'Every project receives an exhaustive line-item Bill of Quantities. Once approved, the budget is locked with zero mid-project escalations.',
      tag: 'Price Guarantee',
    },
  ];

  return (
    <div>
      {/* HERO */}
      <section className="relative min-h-[94vh] flex items-end text-white overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt={`Elegant interiors designed by ${cleanName || 'our studio'}`}
            className="w-full h-full object-cover animate-[t4zoom_22s_ease-in-out_infinite_alternate]"
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(23,19,15,0.35)_0%,rgba(23,19,15,0.18)_45%,rgba(23,19,15,0.92)_100%)]" />
        </div>
        <div className="relative w-full max-w-[1240px] mx-auto px-[30px] pt-[120px] pb-16">
          <div className="flex items-center gap-3 text-[11.5px] font-semibold tracking-[0.3em] uppercase text-[#d9c49a] before:content-[''] before:w-8 before:h-px before:bg-[#d9c49a]">
            Interior Atelier · {city}
          </div>
          <h1 className="font-[family-name:var(--font-cormorant)] text-[clamp(44px,6.2vw,86px)] font-light leading-[1.02] mt-4 mb-5 max-w-[820px]">
            {clinic.tagline || (
              <>
                Intimately designed for <em className="italic text-[#d9c49a]">the life you live</em>
              </>
            )}
          </h1>
          <p className="text-white/85 text-[17px] font-light max-w-[560px] leading-relaxed mb-9">
            {cleanDesc || `A bespoke interior design practice in ${city}. We craft private residences with quiet luxury, tailored storage, and natural material palettes.`}
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              href={`${basePath}/contact`}
              className="inline-flex items-center gap-2.5 bg-[#a4532f] text-white text-[12.5px] font-semibold tracking-[0.18em] uppercase px-8 py-4 transition-all duration-300 hover:bg-[#854021] hover:-translate-y-0.5"
            >
              Request Private Consultation
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href={`${basePath}/gallery`}
              className="inline-flex items-center gap-2.5 bg-transparent text-white text-[12.5px] font-semibold tracking-[0.18em] uppercase px-8 py-4 border border-white/40 transition-all duration-300 hover:bg-white/10"
            >
              Curated Residences
            </Link>
          </div>
        </div>
      </section>

      {/* ATELIER VISIT */}
      <section className="py-24 bg-white border-b border-[#221c14]/12">
        <div className="max-w-[1240px] mx-auto px-[30px] grid lg:grid-cols-[0.82fr_1.18fr] gap-12 lg:gap-20 items-start">
          <Reveal className="lg:sticky lg:top-28">
            <div className="flex items-center gap-3 text-[11.5px] font-semibold tracking-[0.3em] uppercase text-[#a4532f] before:content-[''] before:w-8 before:h-px before:bg-[#a4532f]">
              Your First Visit
            </div>
            <h2 className="font-[family-name:var(--font-cormorant)] text-[clamp(34px,4.5vw,54px)] font-semibold leading-[1.04] mt-3.5 mb-4">
              A conversation before the <em className="italic text-[#a4532f]">commitment</em>
            </h2>
            <p className="text-[#7a6f60] text-[15.5px] font-light leading-[1.8] max-w-[440px] mb-8">
              The best homes begin with attentive listening. Bring a floor plan, a few images you return to, and the honest details of how your household moves through the day.
            </p>
            <Link
              href={`${basePath}/contact`}
              className="inline-flex items-center gap-2 text-[12px] font-semibold tracking-widest uppercase text-[#a4532f] border-b border-[#a4532f] pb-0.5 hover:gap-3 transition-all"
            >
              Arrange a Studio Visit <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </Reveal>

          <div className="grid gap-4">
            {ATELIER_VISIT.map((item, idx) => {
              const Icon = item.icon;
              return (
                <Reveal key={item.number} delay={idx * 90}>
                  <article className="grid sm:grid-cols-[78px_1fr_auto] gap-5 sm:items-center bg-[#fbf8f1] border border-[#221c14]/12 p-6 sm:p-7 transition-all duration-300 hover:border-[#a4532f]/45 hover:shadow-[0_16px_38px_rgba(23,19,15,0.06)]">
                    <span className="w-14 h-14 rounded-full bg-white border border-[#a4532f]/22 text-[#a4532f] grid place-items-center">
                      <Icon className="w-5 h-5" strokeWidth={1.7} />
                    </span>
                    <div>
                      <span className="text-[10.5px] font-semibold tracking-[0.22em] uppercase text-[#a4532f]">Chapter {item.number}</span>
                      <h3 className="font-[family-name:var(--font-cormorant)] text-[25px] font-semibold text-[#17130f] mt-1 mb-1.5">{item.title}</h3>
                      <p className="text-[13.5px] text-[#7a6f60] font-light leading-[1.7]">{item.desc}</p>
                    </div>
                    <span className="hidden sm:block font-[family-name:var(--font-cormorant)] text-[30px] text-[#a4532f]/55">/{item.number}</span>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* SERIES THEMES */}
      <section className="py-24 bg-[#fbf8f1] border-b border-[#221c14]/12">
        <div className="max-w-[1240px] mx-auto px-[30px]">
          <Reveal className="flex flex-wrap justify-between items-end gap-6 mb-12">
            <div>
              <div className="flex items-center gap-3 text-[11.5px] font-semibold tracking-[0.3em] uppercase text-[#a4532f] before:content-[''] before:w-8 before:h-px before:bg-[#a4532f]">
                Design Series
              </div>
              <h2 className="font-[family-name:var(--font-cormorant)] text-[clamp(32px,4.5vw,52px)] font-semibold leading-[1.08] mt-3">
                Five distinct <em className="italic text-[#a4532f]">living narratives</em>
              </h2>
            </div>
            <p className="text-[#7a6f60] text-[15px] font-light max-w-[420px]">
              Every home starts from an architectural dialogue — here are five themes we frequently tailor for {city} residences.
            </p>
          </Reveal>

          <Reveal>
            <SeriesScroll themes={themes} collection={basePath} />
          </Reveal>
        </div>
      </section>

      {/* TACTILE MATERIALS ATELIER */}
      <section className="py-24 bg-[#17130f] text-white">
        <div className="max-w-[1240px] mx-auto px-[30px]">
          <Reveal className="text-center max-w-2xl mx-auto mb-16">
            <div className="inline-flex items-center gap-3 text-[11.5px] font-semibold tracking-[0.3em] uppercase text-[#d9c49a] before:content-[''] before:w-8 before:h-px before:bg-[#d9c49a] after:content-[''] after:w-8 after:h-px after:bg-[#d9c49a]">
              The Material Palette
            </div>
            <h2 className="font-[family-name:var(--font-cormorant)] text-[clamp(32px,4.5vw,52px)] font-light leading-[1.08] mt-3 mb-4">
              Tactile luxury, <em className="italic text-[#d9c49a]">honestly sourced</em>
            </h2>
            <p className="text-white/70 font-light text-[15.5px]">
              We select materials that age with grace. Smoked timber, honed marble, and brushed brass that feel rich to the touch.
            </p>
          </Reveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {TACTILE_MATERIALS.map((mat, idx) => (
              <Reveal key={mat.title} delay={idx * 80}>
                <div className="bg-[#221c16] border border-[#b08d4f]/25 p-8 h-full flex flex-col justify-between hover:border-[#d9c49a] transition-colors">
                  <div>
                    <span className="font-[family-name:var(--font-cormorant)] text-[22px] text-[#d9c49a] block mb-3">
                      0{idx + 1}
                    </span>
                    <h3 className="font-[family-name:var(--font-cormorant)] text-[22px] text-white font-semibold mb-2.5">
                      {mat.title}
                    </h3>
                    <p className="text-[13.5px] font-light text-white/70 leading-[1.7]">
                      {mat.desc}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* PHILOSOPHY */}
      <section className="py-24 bg-white">
        <div className="max-w-[1240px] mx-auto px-[30px]">
          <Reveal className="text-center max-w-2xl mx-auto mb-16">
            <div className="inline-flex items-center gap-3 text-[11.5px] font-semibold tracking-[0.3em] uppercase text-[#a4532f] before:content-[''] before:w-8 before:h-px before:bg-[#a4532f] after:content-[''] after:w-8 after:h-px after:bg-[#a4532f]">
              Spatial Ethos
            </div>
            <h2 className="font-[family-name:var(--font-cormorant)] text-[clamp(32px,4.5vw,52px)] font-semibold leading-[1.08] mt-3 mb-4">
              Homes tuned to <em className="italic text-[#a4532f]">how you live</em>
            </h2>
          </Reveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {philosophy.map((item, idx) => {
              const Icon = item.icon;
              return (
                <Reveal key={item.title} delay={idx * 80}>
                  <div className="bg-[#fbf8f1] border border-[#221c14]/12 p-8 h-full flex flex-col justify-between">
                    <div>
                      <span className="w-12 h-12 rounded-full bg-[#f5f1e8] grid place-items-center mb-5 text-[#a4532f]">
                        <Icon className="w-5 h-5" strokeWidth={1.8} />
                      </span>
                      <h3 className="font-[family-name:var(--font-cormorant)] text-[22px] font-semibold mb-2.5">{item.title}</h3>
                      <p className="text-[13.5px] text-[#7a6f60] font-light leading-[1.65]">{item.desc}</p>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* TRANSFORMATIONS */}
      <section className="py-24 bg-[#fbf8f1] border-y border-[#221c14]/12">
        <div className="max-w-[1240px] mx-auto px-[30px]">
          <Reveal className="mb-14">
            <div className="flex items-center gap-3 text-[11.5px] font-semibold tracking-[0.3em] uppercase text-[#a4532f] before:content-[''] before:w-8 before:h-px before:bg-[#a4532f]">
              Completed Commissions
            </div>
            <h2 className="font-[family-name:var(--font-cormorant)] text-[clamp(32px,4.5vw,52px)] font-semibold leading-[1.08] mt-3">
              Stories from our delivered residences
            </h2>
          </Reveal>

          <div className="grid lg:grid-cols-2 gap-10">
            {transformations.map((t, idx) => (
              <Reveal key={t.title} delay={idx * 100}>
                <div className="bg-white border border-[#221c14]/12 overflow-hidden flex flex-col justify-between h-full shadow-[0_16px_40px_rgba(23,19,15,0.06)]">
                  <div className="aspect-[16/10] overflow-hidden relative">
                    <span className="absolute top-4 left-4 z-10 bg-[#17130f] text-[#d9c49a] text-[10.5px] tracking-wider uppercase px-3 py-1 font-semibold">
                      {t.tag}
                    </span>
                    <img src={t.img} alt={t.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="p-8">
                    <blockquote className="font-[family-name:var(--font-cormorant)] italic text-[22px] text-[#a4532f] mb-2">
                      {t.quote}
                    </blockquote>
                    <h3 className="font-[family-name:var(--font-cormorant)] text-[24px] font-semibold text-[#17130f] mb-3">
                      {t.title}
                    </h3>
                    <p className="text-[14px] text-[#7a6f60] font-light leading-[1.7] mb-6">
                      {t.desc}
                    </p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-0 border-t border-[#221c14]/10 pt-4 mb-6">
                      {t.specs.map((sp) => (
                        <div key={sp.s}>
                          <b className="font-[family-name:var(--font-cormorant)] text-[17px] font-semibold block">{sp.b}</b>
                          <span className="text-[10px] tracking-wider uppercase text-[#7a6f60]">{sp.s}</span>
                        </div>
                      ))}
                    </div>
                    <Link
                      href={`${basePath}/contact`}
                      className="inline-flex items-center gap-2 text-[12px] font-semibold tracking-widest uppercase text-[#a4532f] border-b border-[#a4532f] pb-0.5"
                    >
                      Enquire for your home <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 5-STEP JOURNEY */}
      <section className="py-24 bg-[#17130f] text-white">
        <div className="max-w-[1240px] mx-auto px-[30px]">
          <Reveal className="mb-14 text-center max-w-xl mx-auto">
            <div className="inline-flex items-center gap-3 text-[11.5px] font-semibold tracking-[0.3em] uppercase text-[#d9c49a] before:content-[''] before:w-8 before:h-px before:bg-[#d9c49a] after:content-[''] after:w-8 after:h-px after:bg-[#d9c49a]">
              The Process
            </div>
            <h2 className="font-[family-name:var(--font-cormorant)] text-[clamp(32px,4.5vw,52px)] font-light leading-[1.08] mt-3">
              The five movements of our craft
            </h2>
          </Reveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-5">
            {journey.map((j, idx) => (
              <Reveal key={j.title} delay={idx * 70}>
                <div className="bg-[#221c16] border border-[#b08d4f]/25 p-7 h-full flex flex-col justify-between">
                  <div>
                    <span className="font-[family-name:var(--font-cormorant)] text-[26px] text-[#d9c49a] block mb-3">
                      0{idx + 1}
                    </span>
                    <h3 className="font-[family-name:var(--font-cormorant)] text-[20px] font-semibold text-white mb-2">
                      {j.title}
                    </h3>
                    <p className="text-[13px] font-light text-white/70 leading-[1.65]">{j.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-24 bg-white">
        <div className="max-w-[1240px] mx-auto px-[30px]">
          <Reveal className="mb-12 text-center max-w-xl mx-auto">
            <div className="inline-flex items-center gap-3 text-[11.5px] font-semibold tracking-[0.3em] uppercase text-[#a4532f] before:content-[''] before:w-8 before:h-px before:bg-[#a4532f] after:content-[''] after:w-8 after:h-px after:bg-[#a4532f]">
              Voices
            </div>
            <h2 className="font-[family-name:var(--font-cormorant)] text-[clamp(32px,4.5vw,52px)] font-semibold leading-[1.08] mt-3">
              Kind words from our patrons
            </h2>
          </Reveal>

          <Reveal>
            <TestimonialRotator items={testimonials} />
          </Reveal>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 bg-[#fbf8f1] border-t border-[#221c14]/12">
        <div className="max-w-[860px] mx-auto px-[30px]">
          <Reveal className="text-center mb-12">
            <div className="inline-flex items-center gap-3 text-[11.5px] font-semibold tracking-[0.3em] uppercase text-[#a4532f] before:content-[''] before:w-8 before:h-px before:bg-[#a4532f] after:content-[''] after:w-8 after:h-px after:bg-[#a4532f]">
              Good Inquiries
            </div>
            <h2 className="font-[family-name:var(--font-cormorant)] text-[clamp(30px,4vw,48px)] font-semibold leading-[1.08] mt-3">
              Questions before embarking
            </h2>
          </Reveal>

          <Reveal>
            <FAQAccordion items={homeFaqs} />
          </Reveal>
        </div>
      </section>

      {/* APPOINTMENT FORM */}
      <section id="appointment" className="py-24 bg-[#17130f] text-white">
        <div className="max-w-[1240px] mx-auto px-[30px] grid lg:grid-cols-[1.1fr_0.9fr] gap-12 lg:gap-16 items-center">
          <Reveal>
            <div className="flex items-center gap-3 text-[11.5px] font-semibold tracking-[0.3em] uppercase text-[#d9c49a] before:content-[''] before:w-8 before:h-px before:bg-[#d9c49a]">
              Private Consultation
            </div>
            <h2 className="font-[family-name:var(--font-cormorant)] text-[clamp(34px,4.8vw,58px)] font-light leading-[1.08] mt-4 mb-4">
              Begin your residence with a <em className="italic text-[#d9c49a]">quiet conversation</em>
            </h2>
            <p className="text-white/80 text-[16px] font-light leading-relaxed max-w-[500px] mb-8">
              A private 45-minute studio meeting with our principal architect — spatial layout audit, material moodboards, and a clear itemised budget for your {city} property.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-[450px]">
              {[
                { v: '1-on-1', l: 'With Architect' },
                { v: '10 Yrs', l: 'Craft Warranty' },
                { v: '₹0', l: 'Consultation Fee' },
              ].map((b) => (
                <div key={b.l} className="bg-white/10 p-3.5 text-center">
                  <b className="font-[family-name:var(--font-cormorant)] text-[22px] text-[#d9c49a] block">{b.v}</b>
                  <span className="text-[10px] uppercase tracking-wider text-white/70 font-semibold">{b.l}</span>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={120} className="bg-white text-[#17130f] p-8 sm:p-10 shadow-2xl">
            <VisitForm studioName={cleanName || 'the studio'} waPhone={waPhone} />
          </Reveal>
        </div>
      </section>
    </div>
  );
}
