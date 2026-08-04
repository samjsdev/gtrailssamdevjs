import { readSourceConfig } from '@/lib/dataBuilder';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Clock, Users, Heart, ShieldCheck, ArrowRight, Check } from 'lucide-react';
import { cleanClinicName, cleanClinicDescription } from '@/lib/copyCleaner';
import { DEFAULT_INTERIOR_REVIEWS } from '@/lib/interiorContent';
import Reveal from './Reveal';
import SeriesScroll, { SeriesTheme } from './SeriesScroll';
import TestimonialRotator, { Testimonial } from './TestimonialRotator';
import VisitForm from './VisitForm';

type PageProps = { params: Promise<{ slug: string }> };

const THEME_IMAGES = [
  '/images/stock/68b39046.webp',
  '/images/stock/a0e0726f.webp',
  '/images/stock/dc1759ad.webp',
  '/images/stock/f23e9dc6.webp',
  '/images/stock/615f9d34.webp',
];

const THEMES = [
  { name: 'Lyrical Luxury', desc: 'Warm cove light, velvet & brass — quiet opulence' },
  { name: 'Modern Zen', desc: 'Bare essentials, breathing room, morning light' },
  { name: 'European Reverie', desc: 'Panelled walls, antique mirrors, Parisian restraint' },
  { name: 'Chettinad Contemporary', desc: 'Heritage wood & athangudi soul, modern lines' },
  { name: 'Coastal Calm', desc: 'Rattan, indigo & sea-breeze ease for coastal homes' },
];

export default async function Template4Home({ params }: PageProps) {
  const { slug } = await params;
  const basePath = `/designwebsite/template4/${slug}`;

  const data = await readSourceConfig(slug, 'template4');
  if (!data) return notFound();

  const { clinic, business, doctor, media } = data;
  const cleanName = cleanClinicName(clinic.name);
  const cleanDesc = cleanClinicDescription(clinic.description, clinic.name);
  const city = clinic.address?.city || 'Chennai';
  const phone = clinic.contact?.phone || '';
  const rating = business.rating || '4.9';
  const reviewCount = business.reviewCount || '';
  const experienceYears = doctor?.experience?.replace(/\D/g, '') || '5';
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
    detail: `Home interiors · ${city}`,
  }));

  const philosophy = [
    {
      icon: Clock,
      title: 'Daily Rhythms',
      desc: 'Morning light in the pooja corner, evening calm in the reading nook — spaces tuned to the hours of your day.',
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
    { title: 'Say Hello', desc: 'A quiet conversation over coffee — about you, your rituals, your home.' },
    { title: 'Dream Together', desc: 'Mood boards and theme explorations tailored to your taste and budget.' },
    { title: 'See It Alive', desc: 'Layouts, materials and cinematic 3D walkthroughs of every room.' },
    { title: 'Trust the Craft', desc: 'Master carpenters, weekly photo diaries and a dedicated project manager.' },
    { title: 'Move In, Smiling', desc: 'A styled, deep-cleaned, ready home — and a care plan for years.' },
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
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(23,19,15,0.35)_0%,rgba(23,19,15,0.15)_45%,rgba(23,19,15,0.88)_100%)]" />
        </div>
        <div className="relative w-full max-w-[1240px] mx-auto px-[30px] pt-[120px] pb-16">
          <div className="flex items-center gap-3 text-[11.5px] font-semibold tracking-[0.3em] uppercase text-[#d9c49a] before:content-[''] before:w-8 before:h-px before:bg-[#d9c49a]">
            Bespoke interiors · {city}
          </div>
          <h1 className="font-[family-name:var(--font-cormorant)] text-[clamp(42px,6vw,76px)] font-semibold leading-[1.12] max-w-[720px] mt-[22px] mb-5">
            Homes that feel
            <br />
            like <em className="italic text-[#d9c49a]">you.</em>
          </h1>
          <p className="text-[17px] font-light text-white/85 max-w-[520px] mb-9">
            {cleanDesc ||
              'Design that begins with how you live — your mornings, your rituals, your people — translated into rooms of rare beauty and rare comfort.'}
          </p>
          <div className="flex gap-4 flex-wrap mb-14">
            <Link
              href={`${basePath}/contact`}
              className="inline-flex items-center justify-center gap-2.5 px-8 py-4 text-[13px] font-semibold tracking-[0.14em] uppercase bg-[#b08d4f] text-[#17130f] hover:bg-[#c5a266] hover:-translate-y-0.5 hover:shadow-[0_14px_28px_rgba(176,141,79,0.3)] transition-all duration-300"
            >
              Book a Private Consultation
            </Link>
            <Link
              href={`${basePath}/services`}
              className="inline-flex items-center justify-center gap-2.5 px-8 py-4 text-[13px] font-semibold tracking-[0.14em] uppercase border border-white/50 text-white hover:bg-white/12 transition-all duration-300"
            >
              Explore Our Work
            </Link>
          </div>
          <div className="border-t border-white/25 pt-[26px] flex flex-wrap">
            {[
              { b: `${rating}★`, s: 'Google rating' },
              { b: `${experienceYears}+ yrs`, s: 'Of quiet craft' },
              { b: reviewCount ? `${reviewCount}+` : '100%', s: reviewCount ? 'Happy reviews' : 'Itemised quotes' },
              { b: '1', s: 'Standard of craft' },
            ].map((stat) => (
              <div key={stat.s} className="flex-1 min-w-[150px] pr-7">
                <b className="font-[family-name:var(--font-cormorant)] text-[34px] font-semibold text-[#d9c49a] block leading-[1.1]">
                  {stat.b}
                </b>
                <span className="text-[11.5px] tracking-[0.16em] uppercase text-white/65">{stat.s}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PHILOSOPHY */}
      <section className="py-24 bg-[#fbf8f1]" id="philosophy">
        <div className="max-w-[1240px] mx-auto px-[30px]">
          <Reveal className="text-center mb-[52px]">
            <div className="inline-flex items-center gap-3 text-[11.5px] font-semibold tracking-[0.3em] uppercase text-[#a4532f] before:content-[''] before:w-8 before:h-px before:bg-[#a4532f]">
              The LifeDesign philosophy
            </div>
            <h2 className="font-[family-name:var(--font-cormorant)] text-[clamp(30px,4vw,46px)] font-semibold leading-[1.12] mt-4 mb-3.5">
              We design around <em className="italic text-[#a4532f]">your life</em>, not just your walls
            </h2>
            <p className="text-[#7a6f60] text-[16px] max-w-[620px] mx-auto font-light">
              Every home begins with a long conversation about routines, relationships and rituals — then the drawings begin.
            </p>
          </Reveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-[22px]">
            {philosophy.map((item, idx) => {
              const Icon = item.icon;
              return (
                <Reveal key={item.title} delay={idx * 70}>
                  <div className="group bg-[#fbf8f1] border border-[#221c14]/14 p-9 h-full transition-all duration-[350ms] hover:bg-[#17130f] hover:text-white hover:-translate-y-1.5">
                    <span className="w-[50px] h-[50px] rounded-full bg-[#f5f1e8] grid place-items-center mb-5 text-[#a4532f] transition-all duration-[350ms] group-hover:bg-[#b08d4f] group-hover:text-[#17130f]">
                      <Icon className="w-[22px] h-[22px]" strokeWidth={1.8} />
                    </span>
                    <h3 className="font-[family-name:var(--font-cormorant)] text-[23px] font-semibold mb-2.5">{item.title}</h3>
                    <p className="text-[14px] text-[#7a6f60] font-light leading-[1.65] transition-colors duration-[350ms] group-hover:text-white/70">
                      {item.desc}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ATELIER SERIES */}
      <section className="py-24" id="series">
        <div className="max-w-[1240px] mx-auto px-[30px]">
          <Reveal>
            <div className="flex items-center gap-3 text-[11.5px] font-semibold tracking-[0.3em] uppercase text-[#a4532f] before:content-[''] before:w-8 before:h-px before:bg-[#a4532f]">
              The Signature Series
            </div>
            <h2 className="font-[family-name:var(--font-cormorant)] text-[clamp(30px,4vw,46px)] font-semibold leading-[1.12] mt-4 mb-8">
              Five worlds, <em className="italic text-[#a4532f]">curated for you</em>
            </h2>
            <SeriesScroll themes={themes} collection="The Signature Series" />
          </Reveal>
        </div>
      </section>

      {/* TRANSFORMATIONS */}
      <section className="py-24 bg-[#fbf8f1]" id="homes">
        <div className="max-w-[1240px] mx-auto px-[30px]">
          <Reveal className="text-center mb-[52px]">
            <div className="inline-flex items-center gap-3 text-[11.5px] font-semibold tracking-[0.3em] uppercase text-[#a4532f] before:content-[''] before:w-8 before:h-px before:bg-[#a4532f]">
              Transformations that tell a story
            </div>
            <h2 className="font-[family-name:var(--font-cormorant)] text-[clamp(30px,4vw,46px)] font-semibold leading-[1.12] mt-4">
              Real homes. Real families. <em className="italic text-[#a4532f]">Real magic.</em>
            </h2>
          </Reveal>

          <div className="flex flex-col gap-[90px]">
            {transformations.map((item, idx) => (
              <Reveal key={item.title}>
                <div className="grid lg:grid-cols-2 gap-[52px] lg:gap-[70px] items-center">
                  <div className={`relative ${idx % 2 === 1 ? 'lg:order-2' : ''}`}>
                    <div
                      className={`absolute border border-[#b08d4f] ${
                        idx % 2 === 1 ? '-top-4 -right-4 bottom-4 left-4' : '-top-4 right-4 bottom-4 -left-4'
                      }`}
                    />
                    <img src={item.img} alt={item.title} loading="lazy" className="relative z-[1] w-full aspect-[4/3.1] object-cover" />
                    <div className="absolute z-[2] -bottom-[18px] left-8 bg-[#17130f] text-white px-6 py-3.5 text-[11px] tracking-[0.18em] uppercase">
                      {item.tag.split('·')[0]}· <b className="text-[#d9c49a]">{item.tag.split('·')[1]}</b>
                    </div>
                  </div>
                  <div className={idx % 2 === 1 ? 'lg:order-1' : ''}>
                    <span className="font-[family-name:var(--font-cormorant)] italic text-[20px] text-[#a4532f]">{item.quote}</span>
                    <h3 className="font-[family-name:var(--font-cormorant)] text-[clamp(28px,3.4vw,40px)] font-semibold leading-[1.12] mt-2.5 mb-3.5">
                      {item.title}
                    </h3>
                    <p className="text-[#7a6f60] text-[15.5px] font-light mb-6">{item.desc}</p>
                    <div className="flex flex-col sm:flex-row border-y border-[#221c14]/14 mb-7">
                      {item.specs.map((spec, sIdx) => (
                        <div
                          key={spec.s}
                          className={`flex-1 py-4 sm:px-4.5 ${sIdx === 0 ? 'sm:pl-0' : 'border-t sm:border-t-0 sm:border-l border-[#221c14]/14'}`}
                        >
                          <b className="font-[family-name:var(--font-cormorant)] text-[22px] font-semibold block">{spec.b}</b>
                          <span className="text-[11px] tracking-[0.14em] uppercase text-[#7a6f60]">{spec.s}</span>
                        </div>
                      ))}
                    </div>
                    <Link
                      href={`${basePath}/gallery`}
                      className="group inline-flex items-center gap-2.5 text-[12.5px] font-semibold tracking-[0.18em] uppercase text-[#a4532f]"
                    >
                      View more homes
                      <ArrowRight className="w-4 h-4 transition-transform duration-250 group-hover:translate-x-1.5" strokeWidth={2.2} />
                    </Link>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* NUMBERS */}
      <div className="bg-[#17130f] text-white py-[76px]">
        <div className="max-w-[1240px] mx-auto px-[30px] grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-10 text-center">
          {[
            { b: `${rating}★`, s: 'Google rating' },
            { b: reviewCount ? `${reviewCount}+` : '100+', s: 'Happy families' },
            { b: `${experienceYears}`, s: 'Years of practice' },
            { b: '45', s: 'Day guarantee' },
            { b: '10 yr', s: 'Warranty' },
          ].map((num, idx) => (
            <Reveal key={num.s} delay={idx * 60}>
              <b className="font-[family-name:var(--font-cormorant)] text-[clamp(36px,4.4vw,52px)] font-semibold text-[#d9c49a] block leading-[1.05]">
                {num.b}
              </b>
              <span className="text-[11px] tracking-[0.2em] uppercase text-white/60">{num.s}</span>
            </Reveal>
          ))}
        </div>
      </div>

      {/* JOURNEY */}
      <section className="py-24">
        <div className="max-w-[1240px] mx-auto px-[30px]">
          <Reveal className="text-center mb-[52px]">
            <div className="inline-flex items-center gap-3 text-[11.5px] font-semibold tracking-[0.3em] uppercase text-[#a4532f] before:content-[''] before:w-8 before:h-px before:bg-[#a4532f]">
              How your home comes together
            </div>
            <h2 className="font-[family-name:var(--font-cormorant)] text-[clamp(30px,4vw,46px)] font-semibold leading-[1.12] mt-4">
              A guided journey, <em className="italic text-[#a4532f]">never a process</em>
            </h2>
          </Reveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-5">
            {journey.map((step, idx) => (
              <Reveal key={step.title} delay={idx * 60}>
                <div className={`p-8 h-full transition-colors duration-300 hover:bg-[#fbf8f1] ${idx > 0 ? 'lg:border-l lg:border-[#221c14]/14' : ''}`}>
                  <span className="font-[family-name:var(--font-cormorant)] italic text-[46px] text-[#d9c49a] block leading-none mb-4.5">
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                  <h3 className="font-[family-name:var(--font-cormorant)] text-[22px] font-semibold mb-2.5">{step.title}</h3>
                  <p className="text-[13.5px] text-[#7a6f60] font-light leading-[1.6]">{step.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-24 bg-[#fbf8f1]">
        <div className="max-w-[1240px] mx-auto px-[30px]">
          <Reveal className="text-center mb-8">
            <div className="inline-flex items-center gap-3 text-[11.5px] font-semibold tracking-[0.3em] uppercase text-[#a4532f] before:content-[''] before:w-8 before:h-px before:bg-[#a4532f]">
              Stories from our homeowners
            </div>
            <h2 className="font-[family-name:var(--font-cormorant)] text-[clamp(30px,4vw,46px)] font-semibold leading-[1.12] mt-4">
              In their <em className="italic text-[#a4532f]">own words</em>
            </h2>
          </Reveal>
          <Reveal>
            <TestimonialRotator items={testimonials} />
          </Reveal>
        </div>
      </section>

      {/* VISIT / CTA */}
      <section className="py-24" id="visit">
        <div className="max-w-[1240px] mx-auto px-[30px]">
          <Reveal>
            <div className="grid lg:grid-cols-[1.1fr_0.9fr] bg-[#17130f] text-white overflow-hidden">
              <div className="min-h-[300px] lg:min-h-[480px]">
                <img
                  src={
                    media.clinicImages?.[1] ||
                    media.otherImages?.[0] ||
                    '/images/stock/84fea9c5.webp'
                  }
                  alt={`Inside the ${cleanName || 'design'} studio`}
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="px-8 py-12 lg:px-[58px] lg:py-16 flex flex-col justify-center">
                <div className="flex items-center gap-3 text-[11.5px] font-semibold tracking-[0.3em] uppercase text-[#d9c49a] before:content-[''] before:w-8 before:h-px before:bg-[#d9c49a]">
                  Step into the studio
                </div>
                <h2 className="font-[family-name:var(--font-cormorant)] text-[clamp(30px,3.6vw,44px)] font-semibold leading-[1.12] my-4">
                  Feel the materials.
                  <br />
                  <em className="italic text-[#d9c49a]">Meet your designer.</em>
                </h2>
                <p className="text-white/75 text-[15px] font-light mb-7 max-w-[460px]">
                  Walk through real material samples and sit with a designer for an unhurried hour. By appointment — never a queue.
                </p>
                <ul className="flex flex-col gap-3 mb-9">
                  {[
                    'Full-scale kitchen & wardrobe references',
                    'Material library with hundreds of finishes',
                    '3D walkthroughs of your own floor plan',
                    'Transparent, itemised quotes on the spot',
                  ].map((li) => (
                    <li key={li} className="flex gap-3 text-[14px] text-white/88 font-light">
                      <Check className="w-[17px] h-[17px] text-[#b08d4f] shrink-0 mt-[3px]" strokeWidth={2.2} />
                      {li}
                    </li>
                  ))}
                </ul>
                <VisitForm studioName={cleanName || 'the studio'} waPhone={waPhone} />
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
