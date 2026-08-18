import { readSourceConfig } from '@/lib/dataBuilder';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Clock, Users, Heart, ShieldCheck, ArrowRight, Sparkles, Compass, Layers, Award } from 'lucide-react';
import { cleanClinicName, cleanClinicDescription } from '@/lib/copyCleaner';
import { DEFAULT_INTERIOR_HIGHLIGHTS,
  previewMedia,
} from '@/lib/interiorContent';
import Reveal from '../Reveal';
import PageNarrative from '../PageNarrative';
import CountUp from '@/components/CountUp';

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

  const milestones = [
    {
      era: 'Genesis',
      title: 'The Atelier Founded',
      desc: `Established in ${city} as an intimate interior architecture practice dedicated to quiet luxury and spatial restraint.`,
    },
    {
      era: 'Craft Guild',
      title: 'Bespoke Joinery Workshop',
      desc: 'Brought together master joiners and high-precision tooling to produce furniture-grade modular components.',
    },
    {
      era: 'Residences',
      title: 'Private Villa Commissions',
      desc: 'Completed landmark duplexes and coastal residences blending indigenous craftsmanship with modern lines.',
    },
    {
      era: 'Today',
      title: 'A Living Portfolio',
      desc: `Delivered over 100+ bespoke residences with a reputation for punctual handovers and lifelong patron relationships.`,
    },
  ];

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

  return (
    <div>
      {/* HERO / STORY */}
      <section className="py-24">
        <div className="max-w-[1240px] mx-auto px-[30px] grid lg:grid-cols-2 gap-[52px] lg:gap-[70px] items-center">
          <Reveal>
            <div className="flex items-center gap-3 text-[11.5px] font-semibold tracking-[0.3em] uppercase text-[#a4532f] before:content-[''] before:w-8 before:h-px before:bg-[#a4532f]">
              The Atelier
            </div>
            <h1 className="font-[family-name:var(--font-cormorant)] text-[clamp(36px,4.8vw,60px)] font-light leading-[1.08] mt-4 mb-4">
              A quiet obsession with <em className="italic text-[#a4532f]">homes done right</em>
            </h1>
            <p className="text-[#7a6f60] text-[16px] font-light mb-4 max-w-[540px] leading-relaxed">
              {cleanDesc ||
                `${cleanName || 'Our studio'} is an interior architecture practice in ${city}. We believe great design is never imported catalogue taste — it is deep listening, translated into space.`}
            </p>
            <p className="text-[#7a6f60] text-[16px] font-light mb-8 max-w-[540px] leading-relaxed">
              Every residence we deliver is personally reviewed by our principal designer before handover — one standard, one signature. That is why most of our new commissions arrive through a previous patron&rsquo;s dinner table.
            </p>
            <div className="flex flex-col sm:flex-row border-y border-[#221c14]/14">
              {[
                { b: `${rating}★`, s: 'Google rating' },
                { b: `${experienceYears}+ yrs`, s: 'Of practice' },
                { b: '10-Year', s: 'Craft Warranty' },
              ].map((stat, idx) => (
                <div
                  key={stat.s}
                  className={`flex-1 py-4 sm:px-4.5 ${idx === 0 ? 'sm:pl-0' : 'border-t sm:border-t-0 sm:border-l border-[#221c14]/14'}`}
                >
                  <b className="font-[family-name:var(--font-cormorant)] text-[26px] font-semibold block">
                    <CountUp value={stat.b} />
                  </b>
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
                  <CountUp value={experienceYears} suffix="+" />
                </b>
                <span className="text-[10.5px] tracking-[0.2em] uppercase text-white/65">Years of craft</span>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* MILESTONES */}
      <section className="py-24 bg-[#17130f] text-white">
        <div className="max-w-[1240px] mx-auto px-[30px]">
          <Reveal className="text-center max-w-xl mx-auto mb-16">
            <div className="inline-flex items-center gap-3 text-[11.5px] font-semibold tracking-[0.3em] uppercase text-[#d9c49a] before:content-[''] before:w-8 before:h-px before:bg-[#d9c49a] after:content-[''] after:w-8 after:h-px after:bg-[#d9c49a]">
              Chronology
            </div>
            <h2 className="font-[family-name:var(--font-cormorant)] text-[clamp(32px,4.5vw,52px)] font-light leading-[1.08] mt-3">
              The evolution of our practice
            </h2>
          </Reveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {milestones.map((m, idx) => (
              <Reveal key={m.title} delay={idx * 80}>
                <div className="bg-[#221c16] border border-[#b08d4f]/25 p-7 h-full flex flex-col justify-between">
                  <div>
                    <span className="text-[11px] font-semibold tracking-widest uppercase text-[#d9c49a] block mb-3">
                      {m.era}
                    </span>
                    <h3 className="font-[family-name:var(--font-cormorant)] text-[22px] font-semibold text-white mb-2.5">
                      {m.title}
                    </h3>
                    <p className="text-[13px] font-light text-white/70 leading-[1.65]">
                      {m.desc}
                    </p>
                  </div>
                  <span className="font-[family-name:var(--font-cormorant)] text-[14px] text-[#d9c49a] mt-5 block">
                    0{idx + 1}
                  </span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* VALUES */}
      <section className="py-24 bg-[#fbf8f1]">
        <div className="max-w-[1240px] mx-auto px-[30px]">
          <Reveal className="text-center mb-[52px]">
            <div className="inline-flex items-center gap-3 text-[11.5px] font-semibold tracking-[0.3em] uppercase text-[#a4532f] before:content-[''] before:w-8 before:h-px before:bg-[#a4532f]">
              What We Design For
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

      {/* LEADERSHIP */}
      <section className="py-24 bg-white border-t border-[#221c14]/12">
        <div className="max-w-[1240px] mx-auto px-[30px] grid lg:grid-cols-2 gap-[52px] lg:gap-[70px] items-center">
          <Reveal>
            <div className="relative">
              <div className="absolute -top-4 -left-4 bottom-4 right-4 border border-[#b08d4f]" />
              <img
                src={founderImage}
                alt={founderName}
                className="relative z-[1] w-full aspect-[4/4.2] object-cover"
              />
            </div>
          </Reveal>
          <Reveal delay={130}>
            <div className="flex items-center gap-3 text-[11.5px] font-semibold tracking-[0.3em] uppercase text-[#a4532f] before:content-[''] before:w-8 before:h-px before:bg-[#a4532f]">
              Creative Direction
            </div>
            <h2 className="font-[family-name:var(--font-cormorant)] text-[clamp(32px,4vw,50px)] font-light leading-[1.1] mt-3 mb-2">
              {founderName}
            </h2>
            <p className="text-[13px] font-semibold tracking-[0.18em] uppercase text-[#a4532f] mb-5">
              {doctor?.credentials || 'Principal Architect & Founder'}
            </p>
            <p className="text-[#7a6f60] text-[15.5px] font-light leading-relaxed mb-6">
              {doctor?.bio || `With over ${experienceYears}+ years of architectural practice in ${city}, leading a multidisciplinary atelier dedicated to thoughtful residences, bespoke joinery, and enduring material compositions.`}
            </p>
            <div className="grid grid-cols-2 gap-4 border-t border-[#221c14]/10 pt-5 mb-8">
              <div>
                <b className="font-[family-name:var(--font-cormorant)] text-[26px] block">
                  <CountUp value={experienceYears} suffix="+ Years" />
                </b>
                <span className="text-[11px] tracking-wider uppercase text-[#7a6f60]">Of Practice</span>
              </div>
              <div>
                <b className="font-[family-name:var(--font-cormorant)] text-[26px] block">
                  <CountUp value="10-Year" />
                </b>
                <span className="text-[11px] tracking-wider uppercase text-[#7a6f60]">Craft Warranty</span>
              </div>
            </div>
            <Link
              href={`${basePath}/contact`}
              className="inline-flex items-center gap-2.5 bg-[#17130f] text-white text-[12px] font-semibold tracking-[0.18em] uppercase px-7 py-3.5 hover:bg-[#a4532f] transition-colors"
            >
              Request Private Studio Session <ArrowRight className="w-4 h-4" />
            </Link>
          </Reveal>
        </div>
      </section>

      <PageNarrative page="about" studioName={cleanName} city={city} />

      {/* CTA */}
      <section className="py-24 bg-[#17130f] text-white text-center">
        <div className="max-w-[720px] mx-auto px-[30px]">
          <h2 className="font-[family-name:var(--font-cormorant)] text-[clamp(30px,4vw,48px)] font-light mb-4">
            Let&rsquo;s talk about your residence
          </h2>
          <p className="text-white/75 text-[16px] font-light mb-8">
            Tell us about your space — sit with our principal architect for an unhurried consultation.
          </p>
          <Link
            href={`${basePath}/contact`}
            className="inline-flex items-center gap-2 bg-[#a4532f] text-white text-[10.5px] sm:text-[11.5px] font-semibold tracking-[0.18em] uppercase px-5 py-3 sm:px-6 hover:bg-[#854021] transition-colors"
          >
            Contact Us
          </Link>
        </div>
      </section>
    </div>
  );
}
