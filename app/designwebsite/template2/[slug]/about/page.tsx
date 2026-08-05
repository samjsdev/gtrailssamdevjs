import { readSourceConfig } from '@/lib/dataBuilder';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Check, Users, Target, HeartHandshake, Sparkles } from 'lucide-react';
import { cleanClinicName, cleanClinicDescription } from '@/lib/copyCleaner';
import { DEFAULT_INTERIOR_HIGHLIGHTS, DEFAULT_INTERIOR_SERVICES,
  previewMedia,
} from '@/lib/interiorContent';
import Reveal from '../Reveal';

type PageProps = { params: Promise<{ slug: string }> };

export default async function Template2About({ params }: PageProps) {
  const { slug } = await params;
  const basePath = `/designwebsite/template2/${slug}`;

  const data = await readSourceConfig(slug, 'template2');
  if (!data) return notFound();

  const { clinic, doctor, business } = data;

  const media = previewMedia(data.media);
  const cleanName = cleanClinicName(clinic.name);
  const cleanDesc = cleanClinicDescription(clinic.description, clinic.name);
  const city = clinic.address?.city || 'Chennai';
  const rating = business.rating || '4.8';
  const experienceYears = doctor?.experience?.replace(/\D/g, '') || '5';
  const servicesCount = business.services?.length || DEFAULT_INTERIOR_SERVICES.length;
  const highlights: string[] = business.highlights?.length ? business.highlights : DEFAULT_INTERIOR_HIGHLIGHTS;

  const storyImage =
    media.clinicImages?.[1] ||
    '/images/stock/68b39046.webp';
  const teamImage =
    media.otherImages?.[0] ||
    '/images/stock/a0e0726f.webp';

  const PILLARS = [
    { icon: Target, title: 'Design-first thinking', desc: 'Every project starts with your routines and floor plan — never a copy-paste catalogue look.' },
    { icon: HeartHandshake, title: 'One accountable team', desc: 'A single point of contact owns your project from the first sketch to the final handover.' },
    { icon: Sparkles, title: 'Honest materials', desc: 'Branded hardware and finishes we would put in our own homes, itemised in every quote.' },
    { icon: Users, title: 'Family-friendly process', desc: 'Clear timelines, regular photo updates, and decisions explained in plain language.' },
  ];

  return (
    <div>
      {/* PAGE HERO */}
      <section id="about-hero" className="bg-[#faf7f1] px-6 py-[clamp(60px,7vw,96px)]">
        <div className="max-w-[1240px] mx-auto">
          <Reveal>
            <span className="inline-flex items-center gap-2.5 bg-white border border-[#1b1b1b]/10 rounded-full px-4.5 py-2 text-[12px] font-bold tracking-[0.14em] uppercase text-[#0e5a43] mb-6 before:content-[''] before:w-2 before:h-2 before:rounded-full before:bg-[#f2a007]">
              About the studio
            </span>
            <h1 className="font-[family-name:var(--font-bricolage)] font-bold text-[clamp(34px,4.6vw,58px)] leading-[1.06] tracking-[-0.02em] max-w-[760px]">
              Meet <mark className="bg-[linear-gradient(transparent_62%,#fdeecb_62%)] text-[#0e5a43] px-0.5">{cleanName || 'the studio'}</mark> — {city}&rsquo;s friendly interiors team
            </h1>
            <p className="mt-5 max-w-[560px] text-[#6b6660] text-[16.5px] leading-[1.7] font-medium">{cleanDesc}</p>
          </Reveal>
        </div>
      </section>

      {/* STORY + STATS */}
      <section id="story" className="px-6 py-[clamp(72px,8vw,110px)] bg-white">
        <div className="max-w-[1240px] mx-auto grid lg:grid-cols-2 gap-[clamp(40px,5vw,72px)] items-center">
          <Reveal className="relative">
            <div className="rounded-[26px] overflow-hidden aspect-[4/3.6] shadow-[0_24px_60px_rgba(27,27,27,0.12)]">
              <img src={storyImage} alt={`${cleanName || 'Studio'} project`} loading="lazy" className="w-full h-full object-cover" />
            </div>
            <div className="absolute left-5 bottom-5 bg-white rounded-2xl px-5.5 py-4 shadow-[0_24px_60px_rgba(27,27,27,0.12)]">
              <b className="font-[family-name:var(--font-bricolage)] text-[24px] block leading-none">{experienceYears}+ yrs</b>
              <span className="text-[11px] font-extrabold tracking-[0.12em] uppercase text-[#6b6660]">of happy homes</span>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <span className="inline-flex items-center gap-2.5 text-[12px] font-extrabold tracking-[0.28em] uppercase text-[#0e5a43] mb-3.5 before:content-[''] before:w-7 before:h-[2.5px] before:rounded-full before:bg-[#f2a007]">
              Our story
            </span>
            <h2 className="font-[family-name:var(--font-bricolage)] font-bold text-[clamp(28px,3.6vw,46px)] leading-[1.08] tracking-[-0.02em] mb-4.5">
              {clinic.tagline || 'Thoughtful interiors for everyday living'}
            </h2>
            <p className="text-[#6b6660] font-medium leading-[1.75] text-[15.5px] mb-4">
              We started with a simple frustration: home interiors in {city} were either beautiful or reliable — rarely both. So we built a studio where design taste and site discipline live under one roof.
            </p>
            <p className="text-[#6b6660] font-medium leading-[1.75] text-[15.5px] mb-7">
              Led by {doctor?.name || 'our design team'} ({doctor?.specialization || 'Interior Design & Turnkey Execution'}), every project gets a designer who listens and a team that shows up.
            </p>

            <div className="grid grid-cols-3 gap-4">
              {[
                { value: `${rating}★`, label: 'Google rating' },
                { value: `${experienceYears}+`, label: 'Years experience' },
                { value: `${servicesCount}+`, label: 'Services offered' },
              ].map((stat) => (
                <div key={stat.label} className="bg-[#faf7f1] border border-[#1b1b1b]/10 rounded-2xl px-4 py-5 text-center">
                  <b className="font-[family-name:var(--font-bricolage)] font-bold text-[clamp(20px,2.4vw,28px)] block">{stat.value}</b>
                  <span className="text-[11px] font-extrabold tracking-[0.1em] uppercase text-[#6b6660]">{stat.label}</span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* PILLARS */}
      <section id="pillars" className="px-6 py-[clamp(72px,8vw,110px)] bg-[#faf7f1]">
        <div className="max-w-[1240px] mx-auto">
          <Reveal className="text-center mb-[clamp(38px,4.5vw,60px)]">
            <span className="inline-flex items-center justify-center gap-2.5 text-[12px] font-extrabold tracking-[0.28em] uppercase text-[#0e5a43] mb-3.5">
              How we work
            </span>
            <h2 className="font-[family-name:var(--font-bricolage)] font-bold text-[clamp(30px,3.8vw,50px)] leading-[1.08] tracking-[-0.02em]">
              Built on <mark className="bg-[linear-gradient(transparent_62%,#fdeecb_62%)] text-[#0e5a43] px-0.5">four promises</mark>
            </h2>
          </Reveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {PILLARS.map((pillar, idx) => {
              const Icon = pillar.icon;
              return (
                <Reveal key={pillar.title} delay={idx * 60}>
                  <div className="bg-white border border-[#1b1b1b]/10 rounded-[22px] px-6.5 py-7 h-full transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_24px_60px_rgba(27,27,27,0.12)]">
                    <span className="w-[46px] h-[46px] rounded-[13px] bg-[#fdeecb] grid place-items-center mb-4.5">
                      <Icon className="w-[21px] h-[21px] text-[#f2a007]" strokeWidth={2} />
                    </span>
                    <h3 className="font-[family-name:var(--font-bricolage)] font-bold text-[17.5px] mb-2">{pillar.title}</h3>
                    <p className="text-[13.5px] text-[#6b6660] font-medium leading-[1.6]">{pillar.desc}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* TEAM */}
      <section id="team" className="px-6 py-[clamp(72px,8vw,110px)] bg-white">
        <div className="max-w-[1240px] mx-auto grid lg:grid-cols-[0.9fr_1.1fr] gap-[clamp(40px,5vw,72px)] items-center">
          <Reveal>
            <div className="rounded-[26px] overflow-hidden aspect-[4/3.9] shadow-[0_24px_60px_rgba(27,27,27,0.12)]">
              <img src={teamImage} alt={doctor?.name || 'Design team'} loading="lazy" className="w-full h-full object-cover" />
            </div>
          </Reveal>

          <Reveal delay={120}>
            <span className="inline-flex items-center gap-2.5 text-[12px] font-extrabold tracking-[0.28em] uppercase text-[#0e5a43] mb-3.5 before:content-[''] before:w-7 before:h-[2.5px] before:rounded-full before:bg-[#f2a007]">
              The people behind the work
            </span>
            <h2 className="font-[family-name:var(--font-bricolage)] font-bold text-[clamp(28px,3.6vw,46px)] leading-[1.08] tracking-[-0.02em] mb-2.5">
              {doctor?.name || 'Our Design Team'}
            </h2>
            <p className="text-[14px] font-extrabold text-[#0e5a43] mb-5">
              {doctor?.specialization || 'Interior Design & Turnkey Execution'} · {doctor?.experience || '5+ years'}
            </p>
            <p className="text-[#6b6660] font-medium leading-[1.75] text-[15.5px] mb-6.5">
              &ldquo;Every family has a rhythm. Our job is to make the home dance to it.&rdquo; Every project is personally reviewed before handover — one signature, one standard.
            </p>
            <div className="grid gap-3 mb-8">
              {highlights.slice(0, 4).map((h) => (
                <div key={h} className="flex gap-3 items-center font-semibold text-[14.5px]">
                  <Check className="w-5 h-5 text-[#0e5a43] shrink-0" strokeWidth={2.2} />
                  {h}
                </div>
              ))}
            </div>
            <Link
              href={`${basePath}/contact`}
              className="inline-flex items-center justify-center gap-2 bg-[#0e5a43] text-white font-bold text-[14px] px-6.5 py-3.5 rounded-xl hover:bg-[#0a4232] hover:-translate-y-0.5 hover:shadow-[0_14px_28px_rgba(14,90,67,0.28)] transition-all duration-300"
            >
              Meet Us — Book a Consultation
            </Link>
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <section id="about-cta" className="px-6 py-[clamp(64px,7vw,96px)] bg-[#0e5a43] text-white">
        <Reveal className="max-w-[760px] mx-auto text-center">
          <h2 className="font-[family-name:var(--font-bricolage)] font-bold text-[clamp(28px,3.8vw,48px)] leading-[1.08] tracking-[-0.02em] mb-4">
            Let&rsquo;s design your home <mark className="bg-transparent text-[#f2a007]">together</mark>
          </h2>
          <p className="text-white/80 font-medium text-[16px] leading-[1.7] mb-8">
            See our work, then sit with a designer — friendly and genuinely useful.
          </p>
          <div className="flex flex-wrap gap-3.5 justify-center">
            <Link
              href={`${basePath}/gallery`}
              className="inline-flex items-center justify-center gap-2 bg-transparent border-[1.5px] border-white/55 text-white font-bold text-[14px] px-7 py-4 rounded-[14px] hover:bg-white/10 transition-all duration-300"
            >
              Browse Designs
            </Link>
            <Link
              href={`${basePath}/contact`}
              className="inline-flex items-center justify-center gap-2 bg-[#f2a007] text-[#1b1b1b] font-bold text-[14px] px-7 py-4 rounded-[14px] hover:bg-[#e09500] hover:-translate-y-0.5 hover:shadow-[0_14px_28px_rgba(242,160,7,0.35)] transition-all duration-300"
            >
              Book Consultation
            </Link>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
