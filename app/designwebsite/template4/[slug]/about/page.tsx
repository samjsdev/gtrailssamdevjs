import { readSourceConfig } from '@/lib/dataBuilder';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Clock, Users, Heart, ShieldCheck, ArrowRight } from 'lucide-react';
import { cleanClinicName, cleanClinicDescription } from '@/lib/copyCleaner';
import { DEFAULT_INTERIOR_HIGHLIGHTS,
  previewMedia,
} from '@/lib/interiorContent';
import Reveal from '../Reveal';

type PageProps = { params: Promise<{ slug: string }> };

export default async function Template4About({ params }: PageProps) {
  const { slug } = await params;
  const basePath = `/designwebsite/template4/${slug}`;

  const data = await readSourceConfig(slug, 'template4');
  if (!data) return notFound();

  const { clinic, business, doctor } = data;

  const media = previewMedia(data.media);
  const cleanName = cleanClinicName(clinic.name);
  const cleanDesc = cleanClinicDescription(clinic.description, clinic.name);
  const city = clinic.address?.city || 'Chennai';
  const rating = business.rating || '4.9';
  const reviewCount = business.reviewCount || '';
  const experienceYears = doctor?.experience?.replace(/\D/g, '') || '5';
  const highlights: string[] = business.highlights?.length ? business.highlights : DEFAULT_INTERIOR_HIGHLIGHTS;

  const founderName = data.overrides?.doctorName || doctor?.name || `${cleanName} Design Team`;
  const founderImage =
    data.overrides?.doctorImages?.[0] ||
    doctor?.images?.[0] ||
    '/images/stock/68b39046.webp';

  const storyImage =
    media.clinicImages?.[0] ||
    '/images/stock/a0e0726f.webp';

  const values = [
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

  return (
    <div>
      {/* HERO / STORY */}
      <section className="py-24">
        <div className="max-w-[1240px] mx-auto px-[30px] grid lg:grid-cols-2 gap-[52px] lg:gap-[70px] items-center">
          <Reveal>
            <div className="flex items-center gap-3 text-[11.5px] font-semibold tracking-[0.3em] uppercase text-[#a4532f] before:content-[''] before:w-8 before:h-px before:bg-[#a4532f]">
              The studio
            </div>
            <h1 className="font-[family-name:var(--font-cormorant)] text-[clamp(34px,4.6vw,56px)] font-semibold leading-[1.12] mt-4 mb-4">
              A quiet obsession with <em className="italic text-[#a4532f]">homes done right</em>
            </h1>
            <p className="text-[#7a6f60] text-[16px] font-light mb-4 max-w-[540px]">
              {cleanDesc ||
                `${cleanName || 'Our studio'} is a boutique interior practice in ${city}. We believe great design is not imported taste — it is deep listening, translated into space.`}
            </p>
            <p className="text-[#7a6f60] text-[16px] font-light mb-8 max-w-[540px]">
              Every home we deliver is personally reviewed before handover — one signature, one standard. That is why most of
              our new clients arrive through an old client&apos;s dinner table.
            </p>
            <div className="flex flex-col sm:flex-row border-y border-[#221c14]/14">
              {[
                { b: `${rating}★`, s: 'Google rating' },
                { b: `${experienceYears}+ yrs`, s: 'Of practice' },
                { b: reviewCount ? `${reviewCount}+` : '100%', s: reviewCount ? 'Reviews' : 'Itemised quotes' },
              ].map((stat, idx) => (
                <div
                  key={stat.s}
                  className={`flex-1 py-4 sm:px-4.5 ${idx === 0 ? 'sm:pl-0' : 'border-t sm:border-t-0 sm:border-l border-[#221c14]/14'}`}
                >
                  <b className="font-[family-name:var(--font-cormorant)] text-[26px] font-semibold block">{stat.b}</b>
                  <span className="text-[11px] tracking-[0.14em] uppercase text-[#7a6f60]">{stat.s}</span>
                </div>
              ))}
            </div>
          </Reveal>
          <Reveal delay={130}>
            <div className="relative">
              <div className="absolute -top-4 right-4 bottom-4 -left-4 border border-[#b08d4f]" />
              <img
                src={storyImage}
                alt={`Interiors by ${cleanName || 'our studio'}`}
                className="relative z-[1] w-full aspect-[4/4.4] object-cover"
              />
              <div className="absolute z-[2] -bottom-[18px] left-8 bg-[#17130f] text-white px-7 py-5">
                <b className="font-[family-name:var(--font-cormorant)] text-[34px] text-[#d9c49a] block leading-none">
                  {experienceYears}+
                </b>
                <span className="text-[10.5px] tracking-[0.2em] uppercase text-white/65">Years of craft</span>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* VALUES */}
      <section className="py-24 bg-[#fbf8f1]">
        <div className="max-w-[1240px] mx-auto px-[30px]">
          <Reveal className="text-center mb-[52px]">
            <div className="inline-flex items-center gap-3 text-[11.5px] font-semibold tracking-[0.3em] uppercase text-[#a4532f] before:content-[''] before:w-8 before:h-px before:bg-[#a4532f]">
              What we design for
            </div>
            <h2 className="font-[family-name:var(--font-cormorant)] text-[clamp(30px,4vw,46px)] font-semibold leading-[1.12] mt-4">
              Life first, <em className="italic text-[#a4532f]">then walls</em>
            </h2>
          </Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-[22px]">
            {values.map((item, idx) => {
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

      {/* FOUNDER */}
      <section className="py-24">
        <div className="max-w-[1240px] mx-auto px-[30px] grid lg:grid-cols-[0.9fr_1.1fr] gap-[52px] lg:gap-[70px] items-center">
          <Reveal>
            <div className="relative">
              <img
                src={founderImage}
                alt={`${founderName}, leading the studio`}
                className="w-full aspect-[4/4.6] object-cover object-top"
              />
              <div className="absolute bottom-7 -left-3 sm:-left-7 bg-[#17130f] text-white px-[30px] py-[22px]">
                <b className="font-[family-name:var(--font-cormorant)] text-[34px] text-[#d9c49a] block leading-none">
                  {reviewCount ? `${reviewCount}+` : `${experienceYears}+`}
                </b>
                <span className="text-[10.5px] tracking-[0.2em] uppercase text-white/65">
                  {reviewCount ? 'Happy families' : 'Years & counting'}
                </span>
              </div>
            </div>
          </Reveal>
          <Reveal delay={130}>
            <div className="flex items-center gap-3 text-[11.5px] font-semibold tracking-[0.3em] uppercase text-[#a4532f] before:content-[''] before:w-8 before:h-px before:bg-[#a4532f]">
              The people behind it
            </div>
            <blockquote className="font-[family-name:var(--font-cormorant)] italic text-[clamp(24px,2.8vw,32px)] leading-[1.4] my-6">
              &ldquo;A home should hold your life the way a well-tailored garment holds the body — invisibly, perfectly,
              yours.&rdquo;
            </blockquote>
            <p className="text-[#7a6f60] text-[15.5px] font-light mb-4.5 max-w-[540px]">
              {doctor?.specialization
                ? `Specialising in ${doctor.specialization.toLowerCase()}, our team leads every project from first sketch to final styling.`
                : 'Our team leads every project from first sketch to final styling — design, execution and handover under one accountable roof.'}
            </p>
            <p className="text-[#7a6f60] text-[15.5px] font-light mb-6 max-w-[540px]">
              Every home is still personally reviewed before handover — one signature, one standard.
            </p>
            <div className="font-[family-name:var(--font-cormorant)] italic text-[26px] text-[#a4532f]">
              {founderName}
              <small className="block not-italic font-[family-name:var(--font-outfit)] text-[11.5px] tracking-[0.18em] uppercase text-[#7a6f60] mt-1.5">
                {doctor?.specialization || 'Design & Execution Lead'}
              </small>
            </div>
          </Reveal>
        </div>
      </section>

      {/* HIGHLIGHTS */}
      <section className="py-24 bg-[#17130f] text-white">
        <div className="max-w-[1240px] mx-auto px-[30px]">
          <Reveal className="text-center mb-[52px]">
            <div className="inline-flex items-center gap-3 text-[11.5px] font-semibold tracking-[0.3em] uppercase text-[#d9c49a] before:content-[''] before:w-8 before:h-px before:bg-[#d9c49a]">
              Why families choose us
            </div>
            <h2 className="font-[family-name:var(--font-cormorant)] text-[clamp(30px,4vw,46px)] font-semibold leading-[1.12] mt-4 text-white">
              The promises we <em className="italic text-[#d9c49a]">keep</em>
            </h2>
          </Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-[22px]">
            {highlights.slice(0, 6).map((highlight, idx) => (
              <Reveal key={highlight} delay={idx * 60}>
                <div className="border border-white/15 p-8 h-full hover:border-[#b08d4f] transition-colors duration-300">
                  <span className="font-[family-name:var(--font-cormorant)] italic text-[40px] text-[#d9c49a] block leading-none mb-4">
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                  <p className="text-[15px] font-light text-white/85">{highlight}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal className="text-center mt-12">
            <Link
              href={`${basePath}/contact`}
              className="inline-flex items-center justify-center gap-2.5 px-8 py-4 text-[13px] font-semibold tracking-[0.14em] uppercase bg-[#b08d4f] text-[#17130f] hover:bg-[#c5a266] hover:-translate-y-0.5 hover:shadow-[0_14px_28px_rgba(176,141,79,0.3)] transition-all duration-300"
            >
              Book a Private Consultation
              <ArrowRight className="w-4 h-4" strokeWidth={2.2} />
            </Link>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
