import { readSourceConfig } from '@/lib/dataBuilder';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import {
  Check, Users, Target, HeartHandshake, Sparkles,
  ShieldCheck, Clock, CheckCircle2, Award, ArrowRight
} from 'lucide-react';
import {
  cleanClinicName,
  cleanArchitectureTagline,
  cleanArchitectureDescription,
  cleanArchitectureServices,
  cleanArchitectureHighlights,
  cleanArchitectureSpecialization,
} from '@/lib/copyCleaner';
import {
  DEFAULT_ARCHITECTURE_HIGHLIGHTS,
  DEFAULT_ARCHITECTURE_SERVICES,
  previewMedia,
} from '@/lib/architectureContent';
import Reveal from '../Reveal';
import PageNarrative from '../PageNarrative';
import CountUp from '@/components/CountUp';

type PageProps = { params: Promise<{ slug: string }> };

export default async function Template12About({ params }: PageProps) {
  const { slug } = await params;
  const basePath = `/designwebsite/template12/${slug}`;

  const data = await readSourceConfig(slug, 'template12');
  if (!data) return notFound();

  const { clinic, doctor, business } = data;

  const media = previewMedia(data.media);
  const cleanName = cleanClinicName(clinic.name);
  const city = clinic.address?.city || 'Chennai';
  const cleanDesc = cleanArchitectureDescription(clinic.description, clinic.name, city);
  const cleanTagline = cleanArchitectureTagline(clinic.tagline);
  const rating = business.rating || '4.9';
  const experienceYears = doctor?.experience?.replace(/\D/g, '') || '12';
  const servicesList = cleanArchitectureServices(business.services, DEFAULT_ARCHITECTURE_SERVICES);
  const servicesCount = servicesList.length;
  const highlights: string[] = cleanArchitectureHighlights(business.highlights, DEFAULT_ARCHITECTURE_HIGHLIGHTS);
  const doctorSpecialization = cleanArchitectureSpecialization(doctor?.specialization);

  const storyImage =
    media.clinicImages?.[1] ||
    '/images/architecture/architectural-atelier-studio.webp';
  const teamImage =
    media.otherImages?.[0] ||
    '/images/architecture/principal-architect.webp';

  const PILLARS = [
    { icon: Target, title: 'Smart Natural Ventilation', desc: 'Every home is designed for cross-ventilation and sunlight to keep rooms bright and naturally cool during hot Chennai summers.' },
    { icon: HeartHandshake, title: 'Single-Point Accountability', desc: 'Licensed architects, structural engineers, and site supervisors work under one team with direct client communication.' },
    { icon: Sparkles, title: 'Top-Grade Certified Materials', desc: 'Tata Tiscon Fe550D steel, UltraTech Grade-53 cement, and quality river/M-sand clearly itemised in your contract.' },
    { icon: Users, title: '100% CMDA Approval Track', desc: 'Every drawing strictly adheres to Chennai building setback rules, road width ratios, and rainwater harvesting laws.' },
  ];

  const MILESTONES = [
    {
      period: 'Founding',
      title: 'Practice Founded',
      desc: `Started in ${city} with a commitment to modern villa design, practical floor plans, and honest pricing.`,
    },
    {
      period: 'Expansion',
      title: '3D & Structural Division',
      desc: 'Integrated 3D elevation modeling, structural safety calculations, and municipal plan sanction liaison under one roof.',
    },
    {
      period: 'Turnkey',
      title: 'Turnkey Construction Wing',
      desc: 'Expanded into complete house construction with fixed budgets, daily engineer supervision, and milestone delivery.',
    },
    {
      period: 'Today',
      title: '150+ Homes Delivered',
      desc: `Trusted across ${city} with a ${rating}★ rating for modern villas, residential houses, and commercial establishments backed by a 10-year warranty.`,
    },
  ];

  return (
    <div>
      {/* PAGE HERO */}
      <section id="about-hero" className="bg-[#faf7f1] px-6 py-[clamp(60px,7vw,96px)]">
        <div className="max-w-[1240px] mx-auto">
          <Reveal>
            <span className="inline-flex items-center gap-2.5 bg-white border border-[#1b1b1b]/10 rounded-full px-4.5 py-2 text-[12px] font-bold tracking-[0.14em] uppercase text-[#0e5a43] mb-6 before:content-[''] before:w-2 before:h-2 before:rounded-full before:bg-[#f2a007]">
              About Our Practice
            </span>
            <h1 className="font-[family-name:var(--font-bricolage)] font-bold text-[clamp(34px,4.6vw,58px)] leading-[1.06] tracking-[-0.02em] max-w-[780px]">
              Meet <mark className="bg-[linear-gradient(transparent_62%,#fdeecb_62%)] text-[#0e5a43] px-0.5">{cleanName || 'our practice'}</mark> — {city}&rsquo;s sustainable architecture team
            </h1>
            <p className="mt-5 max-w-[580px] text-[#6b6660] text-[16.5px] leading-[1.7] font-medium">
              {cleanDesc || `We design and construct enduring residential architecture across ${city}. Guided by spatial passion, engineering precision, and total pricing transparency.`}
            </p>
          </Reveal>
        </div>
      </section>

      {/* STORY + STATS */}
      <section id="story" className="px-6 py-[clamp(72px,8vw,110px)] bg-white">
        <div className="max-w-[1240px] mx-auto grid lg:grid-cols-2 gap-[clamp(40px,5vw,72px)] items-center">
          <Reveal className="relative">
            <div className="rounded-[26px] overflow-hidden aspect-[4/3.6] shadow-[0_24px_60px_rgba(27,27,27,0.12)]">
              <img src={storyImage} alt={`${cleanName || 'Our'} completed architecture`} loading="lazy" className="w-full h-full object-cover" />
            </div>
            <div className="absolute left-5 bottom-5 bg-white rounded-2xl px-5.5 py-4 shadow-[0_24px_60px_rgba(27,27,27,0.12)]">
              <b className="font-[family-name:var(--font-bricolage)] text-[24px] text-[#0e5a43] block leading-none">
                <CountUp value={experienceYears} suffix="+ yrs" />
              </b>
              <span className="text-[11px] font-extrabold tracking-[0.12em] uppercase text-[#6b6660]">of landmark villas</span>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <span className="inline-flex items-center gap-2.5 text-[12px] font-extrabold tracking-[0.28em] uppercase text-[#0e5a43] mb-3.5 before:content-[''] before:w-7 before:h-[2.5px] before:rounded-full before:bg-[#f2a007]">
              Our Philosophy
            </span>
            <h2 className="font-[family-name:var(--font-bricolage)] font-bold text-[clamp(28px,3.6vw,46px)] leading-[1.08] tracking-[-0.02em] mb-4.5">
              {cleanTagline}
            </h2>
            <p className="text-[#6b6660] font-medium leading-[1.75] text-[15.5px] mb-4">
              We started with a clear observation: villa construction in {city} was either artistically inspired or structurally disciplined — rarely both. Clients were caught between unorganized local contractors who caused endless cost creep and remote design consultants without site presence.
            </p>
            <p className="text-[#6b6660] font-medium leading-[1.75] text-[15.5px] mb-7">
              So we built {cleanName || 'our practice'}, where thoughtful architectural design and civil engineering rigor live under one roof. Led by {doctor?.name || 'our Principal Architect & Senior Civil Engineers'} ({doctorSpecialization}), every project receives dedicated oversight from soil testing to keys handover.
            </p>

            <div className="grid grid-cols-3 gap-4">
              {[
                { value: `${rating}★`, label: 'Google rating' },
                { value: `${experienceYears}+`, label: 'Years experience' },
                { value: `${servicesCount}+`, label: 'Disciplines' },
              ].map((stat) => (
                <div key={stat.label} className="bg-[#faf7f1] border border-[#1b1b1b]/10 rounded-2xl px-4 py-5 text-center">
                  <b className="font-[family-name:var(--font-bricolage)] font-bold text-[clamp(20px,2.4vw,28px)] text-[#0e5a43] block">
                    <CountUp value={stat.value} />
                  </b>
                  <span className="text-[11px] font-extrabold tracking-[0.1em] uppercase text-[#6b6660]">{stat.label}</span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* MILESTONES */}
      <section className="px-6 py-[clamp(72px,8vw,110px)] bg-[#faf7f1] border-y border-[#1b1b1b]/10">
        <div className="max-w-[1240px] mx-auto">
          <Reveal className="text-center max-w-2xl mx-auto mb-14">
            <span className="inline-flex items-center gap-2.5 text-[12px] font-extrabold tracking-[0.28em] uppercase text-[#0e5a43] mb-3 before:content-[''] before:w-7 before:h-[2.5px] before:rounded-full before:bg-[#f2a007] after:content-[''] after:w-7 after:h-[2.5px] after:rounded-full after:bg-[#f2a007]">
              Our Journey
            </span>
            <h2 className="font-[family-name:var(--font-bricolage)] font-bold text-[clamp(28px,3.8vw,48px)] leading-[1.08] tracking-[-0.02em] mb-3">
              Milestones that shaped our studio
            </h2>
            <p className="text-[#6b6660] text-[15px] font-medium">
              How we grew into one of {city}&rsquo;s most trusted architecture and civil construction teams.
            </p>
          </Reveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {MILESTONES.map((m, idx) => (
              <Reveal key={m.title} delay={idx * 80}>
                <div className="bg-white border border-[#1b1b1b]/10 rounded-2xl p-7 h-full flex flex-col justify-between shadow-[0_10px_24px_rgba(27,27,27,0.04)]">
                  <div>
                    <span className="text-[11px] font-extrabold tracking-widest uppercase text-[#f2a007] bg-[#faf7f1] border border-[#1b1b1b]/10 px-3 py-1 rounded-full inline-block mb-4">
                      {m.period}
                    </span>
                    <h3 className="font-[family-name:var(--font-bricolage)] font-bold text-[19px] text-[#1b1b1b] mb-2">
                      {m.title}
                    </h3>
                    <p className="text-[13.5px] text-[#6b6660] font-medium leading-[1.65]">
                      {m.desc}
                    </p>
                  </div>
                  <span className="font-[family-name:var(--font-bricolage)] text-[14px] text-[#0e5a43] font-bold mt-5 block">
                    Phase 0{idx + 1}
                  </span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* PILLARS */}
      <section id="pillars" className="px-6 py-[clamp(72px,8vw,110px)] bg-white">
        <div className="max-w-[1240px] mx-auto">
          <Reveal className="text-center max-w-2xl mx-auto mb-14">
            <span className="inline-flex items-center gap-2.5 text-[12px] font-extrabold tracking-[0.28em] uppercase text-[#0e5a43] mb-3 before:content-[''] before:w-7 before:h-[2.5px] before:rounded-full before:bg-[#f2a007] after:content-[''] after:w-7 after:h-[2.5px] after:rounded-full after:bg-[#f2a007]">
              What We Stand For
            </span>
            <h2 className="font-[family-name:var(--font-bricolage)] font-bold text-[clamp(28px,3.8vw,48px)] leading-[1.08] tracking-[-0.02em] mb-3">
              The four pillars of our practice
            </h2>
            <p className="text-[#6b6660] text-[15px] font-medium">
              Principles we hold ourselves accountable to on every single residential build.
            </p>
          </Reveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {PILLARS.map((p, idx) => {
              const Icon = p.icon;
              return (
                <Reveal key={p.title} delay={idx * 80}>
                  <div className="bg-[#faf7f1] border border-[#1b1b1b]/10 rounded-[22px] p-7 h-full flex flex-col justify-between transition-all duration-300 hover:shadow-[0_16px_36px_rgba(27,27,27,0.08)]">
                    <div>
                      <span className="w-12 h-12 rounded-xl bg-white border border-[#1b1b1b]/10 grid place-items-center mb-5 text-[#0e5a43]">
                        <Icon className="w-5 h-5" strokeWidth={2.2} />
                      </span>
                      <h3 className="font-[family-name:var(--font-bricolage)] font-bold text-[19px] text-[#1b1b1b] mb-2.5">
                        {p.title}
                      </h3>
                      <p className="text-[13.5px] text-[#6b6660] font-medium leading-[1.65]">
                        {p.desc}
                      </p>
                    </div>
                    <span className="font-[family-name:var(--font-bricolage)] text-[14px] text-[#0e5a43] font-bold mt-5 block">
                      0{idx + 1}
                    </span>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* LEADERSHIP */}
      <section id="team" className="px-6 py-[clamp(72px,8vw,110px)] bg-[#faf7f1] border-t border-[#1b1b1b]/10">
        <div className="max-w-[1240px] mx-auto grid lg:grid-cols-2 gap-[clamp(40px,5vw,72px)] items-center">
          <Reveal className="relative">
            <div className="rounded-[26px] overflow-hidden aspect-[4/3.6] shadow-[0_24px_60px_rgba(27,27,27,0.12)]">
              <img src={teamImage} alt={doctor?.name || 'Principal Designer'} loading="lazy" className="w-full h-full object-cover" />
            </div>
          </Reveal>

          <Reveal delay={120}>
            <span className="inline-flex items-center gap-2.5 text-[12px] font-extrabold tracking-[0.28em] uppercase text-[#0e5a43] mb-3 before:content-[''] before:w-7 before:h-[2.5px] before:rounded-full before:bg-[#f2a007]">
              Studio Leadership
            </span>
            <h2 className="font-[family-name:var(--font-bricolage)] font-bold text-[clamp(28px,3.6vw,46px)] leading-[1.08] tracking-[-0.02em] mb-2">
              {doctor?.name || 'Principal Designer'}
            </h2>
            <p className="text-[14px] font-extrabold text-[#0e5a43] uppercase tracking-wider mb-5">
              {doctor?.credentials || 'Design Director & Turnkey Lead'}
            </p>
            <p className="text-[#6b6660] font-medium leading-[1.75] text-[15.5px] mb-6">
              {doctor?.bio || `With over ${experienceYears}+ years of hands-on architectural and civil experience in ${city}, leading residential projects that balance aesthetics with real-world engineering practicality.`}
            </p>
            <div className="grid grid-cols-2 gap-4 border-t border-[#1b1b1b]/10 pt-5 mb-7">
              <div>
                <b className="font-[family-name:var(--font-bricolage)] text-[24px] text-[#0e5a43] block">
                  <CountUp value={experienceYears} suffix="+ Yrs" />
                </b>
                <span className="text-[11px] font-extrabold tracking-wider uppercase text-[#6b6660]">Experience</span>
              </div>
              <div>
                <b className="font-[family-name:var(--font-bricolage)] text-[24px] text-[#0e5a43] block">
                  <CountUp value="10-Year" />
                </b>
                <span className="text-[11px] font-extrabold tracking-wider uppercase text-[#6b6660]">Warranty</span>
              </div>
            </div>
            <Link
              href={`${basePath}/contact`}
              className="inline-flex items-center justify-center gap-2 bg-[#0e5a43] text-white font-bold text-[14px] px-7 py-4 rounded-xl hover:bg-[#0a4232] transition-colors"
            >
              Book Studio Consultation <ArrowRight className="w-4 h-4" />
            </Link>
          </Reveal>
        </div>
      </section>

      <PageNarrative page="about" studioName={cleanName} city={city} />

      {/* CTA */}
      <section className="px-6 py-[clamp(64px,7vw,96px)] bg-[#0e5a43] text-white text-center">
        <Reveal className="max-w-[760px] mx-auto">
          <h2 className="font-[family-name:var(--font-bricolage)] font-bold text-[clamp(28px,3.8vw,48px)] leading-[1.08] tracking-[-0.02em] mb-4">
            Let&rsquo;s create your home together
          </h2>
          <p className="text-white/80 font-medium text-[16px] leading-[1.7] mb-8">
            Tell us about your home floor plan — we&rsquo;ll map the right design direction in one free session.
          </p>
          <Link
            href={`${basePath}/contact`}
            className="inline-flex items-center justify-center gap-2 bg-[#f2a007] text-[#1b1b1b] font-bold text-[15px] px-9 py-4.5 rounded-[14px] hover:bg-[#e09500] transition-colors"
          >
            Book Free Consultation
          </Link>
        </Reveal>
      </section>
    </div>
  );
}
