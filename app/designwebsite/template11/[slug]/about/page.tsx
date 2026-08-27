import { readSourceConfig } from '@/lib/dataBuilder';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import {
  Check, Award, ShieldCheck, Hammer, Layers,
  Sparkles, Compass, Users, CheckCircle2
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

export default async function Template11About({ params }: PageProps) {
  const { slug } = await params;
  const basePath = `/designwebsite/template11/${slug}`;

  const data = await readSourceConfig(slug, 'template11');
  if (!data) return notFound();

  const { clinic, doctor, business } = data;

  const media = previewMedia(data.media);
  const cleanName = cleanClinicName(clinic.name);
  const city = clinic.address?.city || 'Chennai';
  const cleanDesc = cleanArchitectureDescription(clinic.description, clinic.name, city);
  const cleanTagline = cleanArchitectureTagline(clinic.tagline, 'Sculpted Architecture for Generational Living');
  const rating = business.rating || '4.9';
  const experienceYears = doctor?.experience?.replace(/\D/g, '') || '14';
  const servicesList = cleanArchitectureServices(business.services, DEFAULT_ARCHITECTURE_SERVICES);
  const servicesCount = servicesList.length || DEFAULT_ARCHITECTURE_SERVICES.length;
  const highlights = cleanArchitectureHighlights(business.highlights, DEFAULT_ARCHITECTURE_HIGHLIGHTS);
  const doctorSpecialization = cleanArchitectureSpecialization(doctor?.specialization, 'Principal Architect & Senior Civil Engineer');

  const storyImage =
    media.clinicImages?.[1] ||
    '/images/architecture/architectural-atelier-studio.webp';
  const designerImage =
    media.otherImages?.[0] ||
    '/images/architecture/principal-architect.webp';
  const craftImage =
    media.otherImages?.[4] ||
    '/images/architecture/staad-structural-engineering.webp';

  const TIMELINE = [
    {
      year: 'Founding Year',
      title: 'Architectural Practice Founded',
      desc: `Founded in ${city} by registered architects dedicated to modern villa design, functional residential layouts, and quality construction.`,
    },
    {
      year: `${experienceYears > 4 ? 'Year 4' : 'Expansion'}`,
      title: '3D Design & Plan Sanction Division',
      desc: 'Added complete in-house 3D visualization, municipal plan sanction approvals (CMDA/DTCP), and structural engineering.',
    },
    {
      year: 'Milestone',
      title: 'Turnkey Construction Division',
      desc: 'Launched complete turnkey civil construction services, providing clients with fixed budgets, tested materials, and daily site supervision.',
    },
    {
      year: 'Present Day',
      title: '150+ Projects Delivered',
      desc: `Recognized across ${city} for modern luxury villas, independent residential homes, and commercial buildings with a 10-year warranty.`,
    },
  ];

  const QUALITY_STANDARDS = [
    {
      title: '100% Primary Tata Tiscon Fe550D Steel',
      desc: 'Sourced directly from primary manufacturers (Tata / JSW) with manufacturer test certificates for maximum earthquake safety.',
    },
    {
      title: 'UltraTech & ACC Grade-53 Cement',
      desc: 'Computerized ready-mix concrete with lab cube compression tests conducted on every foundation and roof slab pour.',
    },
    {
      title: 'Weather-Proof Heat-Resistant Terraces',
      desc: 'Multi-layer waterproofing and white cool-roof terrace tiles that reflect solar heat and protect top-floor bedrooms.',
    },
    {
      title: '300-Point Quality Inspection Before Handover',
      desc: 'Every electrical point, plumbing line, door frame, and tile alignment is inspected thoroughly before handing over keys.',
    },
  ];

  return (
    <div>
      {/* PAGE HERO */}
      <section id="about-hero" className="bg-[#211a13] text-white px-6 lg:px-7 py-[clamp(70px,8vw,110px)]">
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <span className="flex items-center gap-3.5 text-[12px] tracking-[0.38em] uppercase text-[#c9ab7c] mb-5 before:content-[''] before:w-10 before:h-px before:bg-[#c9ab7c]">
              The Practice
            </span>
            <h1 className="font-[family-name:var(--font-marcellus)] text-[clamp(38px,5vw,68px)] leading-[1.08] max-w-[800px]">
              {cleanName || 'An architecture & construction practice'} —{' '}
              <em className="not-italic italic font-light text-[#c9ab7c]">crafted in {city}</em>
            </h1>
            <p className="mt-6 max-w-[620px] text-[16.5px] font-light leading-[1.75] text-white/80">
              {cleanDesc}
            </p>
          </Reveal>
        </div>
      </section>

      {/* STORY */}
      <section id="story" className="py-[clamp(84px,9vw,130px)] px-6 lg:px-7">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-[1.05fr_0.95fr] gap-[clamp(44px,6vw,90px)] items-center">
          <Reveal>
            <div className="relative before:content-[''] before:absolute before:-left-4 before:-top-4 before:right-14 before:bottom-14 before:border before:border-[#a58150]">
              <div className="overflow-hidden aspect-[4/4.7]">
                <img src={storyImage} alt={`${cleanName || 'Our'} completed architectural project`} loading="lazy" className="w-full h-full object-cover" />
              </div>
              <div className="absolute -right-2 sm:-right-4 bottom-11 bg-[#211a13] text-white px-8 py-7 shadow-[0_30px_60px_rgba(33,26,19,0.3)]">
                <b className="font-[family-name:var(--font-marcellus)] font-normal text-[44px] text-[#c9ab7c] block leading-none">
                  <CountUp value={experienceYears} suffix="+" />
                </b>
                <span className="text-[11px] tracking-[0.3em] uppercase text-white/65">Years of Craft</span>
              </div>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <span className="flex items-center gap-3.5 text-[12px] tracking-[0.38em] uppercase text-[#a58150] mb-4 before:content-[''] before:w-10 before:h-px before:bg-[#a58150]">
              Our Story &amp; Ethos
            </span>
            <h2 className="font-[family-name:var(--font-marcellus)] text-[clamp(32px,3.8vw,52px)] leading-[1.12] mb-6">
              Homes shaped by <em className="not-italic italic font-light text-[#a58150]">listening first</em>
            </h2>
            <p className="text-[#7d7264] leading-[1.85] font-light text-[15.5px] mb-4.5">
              {cleanTagline} — that is the guiding principle behind every line we draw. We believe great buildings are never about transient trends; they are an empathetic translation of daily routines into balanced, enduring architecture.
            </p>
            <p className="text-[#7d7264] leading-[1.85] font-light text-[15.5px] mb-8">
              From luxury coastal villas along ECR to independent residential homes and commercial complexes across {city}, our practice balances practical layouts with lasting construction: structural RCC frames engineered to IS codes, rooms that stay naturally bright and cool, and materials that stand up to decades of Chennai weather.
            </p>

            <div className="grid grid-cols-3 border-t border-b border-[#211a13]/10">
              {[
                { value: `${rating}★`, label: 'Google Rating' },
                { value: `${experienceYears}+`, label: 'Years Experience' },
                { value: `${servicesCount}+`, label: 'Design Disciplines' },
              ].map((stat, i) => (
                <div key={stat.label} className={`py-5 px-5 border-l border-[#211a13]/10 ${i === 0 ? 'border-l-0 pl-0' : ''}`}>
                  <b className="font-[family-name:var(--font-marcellus)] font-normal text-[clamp(24px,2.4vw,34px)] block">
                    <CountUp value={stat.value} />
                  </b>
                  <span className="text-[10.5px] tracking-[0.2em] uppercase text-[#7d7264]">{stat.label}</span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* CHRONOLOGY / TIMELINE */}
      <section className="py-[clamp(84px,9vw,130px)] px-6 lg:px-7 bg-[#211a13] text-white">
        <div className="max-w-7xl mx-auto">
          <Reveal className="mb-14">
            <span className="flex items-center gap-3.5 text-[12px] tracking-[0.38em] uppercase text-[#c9ab7c] mb-4 before:content-[''] before:w-10 before:h-px before:bg-[#c9ab7c]">
              Practice Evolution
            </span>
            <h2 className="font-[family-name:var(--font-marcellus)] text-[clamp(32px,3.8vw,52px)] leading-[1.12]">
              Milestones of <em className="not-italic italic font-light text-[#c9ab7c]">architectural practice</em>
            </h2>
          </Reveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {TIMELINE.map((item, idx) => (
              <Reveal key={item.title} delay={idx * 80}>
                <div className="bg-[#2c231a] border border-[#a58150]/25 p-8 h-full flex flex-col justify-between hover:border-[#a58150] transition-colors">
                  <div>
                    <span className="text-[12px] tracking-[0.25em] uppercase text-[#c9ab7c] font-medium block mb-3">
                      {item.year}
                    </span>
                    <h3 className="font-[family-name:var(--font-marcellus)] font-normal text-[20px] text-white mb-3 leading-snug">
                      {item.title}
                    </h3>
                    <p className="text-[13.5px] font-light text-white/70 leading-[1.7]">
                      {item.desc}
                    </p>
                  </div>
                  <span className="font-[family-name:var(--font-marcellus)] text-[14px] text-[#a58150] mt-6 block">
                    Phase 0{idx + 1}
                  </span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* VALUES & PHILOSOPHY */}
      <section id="values" className="py-[clamp(84px,9vw,130px)] px-6 lg:px-7 bg-[#fdfbf6] border-y border-[#211a13]/10">
        <div className="max-w-7xl mx-auto">
          <Reveal className="text-center max-w-3xl mx-auto mb-[clamp(44px,5vw,68px)]">
            <span className="inline-flex items-center gap-3.5 text-[12px] tracking-[0.38em] uppercase text-[#a58150] mb-4 before:content-[''] before:w-10 before:h-px before:bg-[#a58150] after:content-[''] after:w-10 after:h-px after:bg-[#a58150]">
              What We Stand For
            </span>
            <h2 className="font-[family-name:var(--font-marcellus)] text-[clamp(34px,4.2vw,58px)] leading-[1.1] mb-4">
              The values behind <em className="not-italic italic font-light text-[#a58150]">every detail</em>
            </h2>
            <p className="text-[#7d7264] font-light text-[15.5px]">
              We take pride in transparent pricing, architectural integrity, and on-time handovers.
            </p>
          </Reveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {highlights.slice(0, 4).map((h, idx) => {
              const VALUE_NOTES = [
                'Every project begins from scratch with your lifestyle rituals — never a copy-paste template.',
                'Branded materials with honest advisory on steel, cement, and finishes engineered to last decades.',
                'Itemised BOQ quotes with frozen prices — no hidden surprises or mid-project price spikes.',
                'One accountable architect and project lead from the initial sketch to final handover.',
              ];
              return (
                <Reveal key={h} delay={idx * 80}>
                  <div className="border border-[#211a13]/10 bg-[#f6f1e8] px-7 py-9 h-full hover:border-[#a58150] transition-colors duration-300">
                    <span
                      className="font-[family-name:var(--font-marcellus)] text-[46px] block mb-5 text-transparent"
                      style={{ WebkitTextStroke: '1px #a58150' }}
                    >
                      0{idx + 1}
                    </span>
                    <h3 className="font-[family-name:var(--font-marcellus)] font-normal text-[20px] mb-3 leading-snug">{h}</h3>
                    <p className="text-[13.5px] font-light text-[#7d7264] leading-[1.7]">{VALUE_NOTES[idx % VALUE_NOTES.length]}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* QUALITY & MATERIALS STANDARDS */}
      <section className="py-[clamp(84px,9vw,130px)] px-6 lg:px-7">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-[0.9fr_1.1fr] gap-[clamp(44px,6vw,90px)] items-center">
          <Reveal className="relative overflow-hidden aspect-[4/4.6]">
            <img src={craftImage} alt="Structural engineering and material standards" loading="lazy" className="w-full h-full object-cover" />
          </Reveal>

          <Reveal delay={120}>
            <span className="flex items-center gap-3.5 text-[12px] tracking-[0.38em] uppercase text-[#a58150] mb-4 before:content-[''] before:w-10 before:h-px before:bg-[#a58150]">
              Engineering &amp; Standards
            </span>
            <h2 className="font-[family-name:var(--font-marcellus)] text-[clamp(32px,3.8vw,52px)] leading-[1.12] mb-6">
              Structural precision backed by a <em className="not-italic italic font-light text-[#a58150]">10-year warranty</em>
            </h2>
            <p className="text-[#7d7264] leading-[1.85] font-light text-[15.5px] mb-8">
              We hold our construction to rigorous engineering standards. Every RCC frame, steel member, and glazing system is built to withstand decades of tropical climate, monsoon cycles, and coastal humidity.
            </p>

            <div className="grid sm:grid-cols-2 gap-6">
              {QUALITY_STANDARDS.map((std) => (
                <div key={std.title} className="border-t border-[#211a13]/10 pt-4">
                  <div className="flex items-center gap-2 mb-1.5">
                    <CheckCircle2 className="w-4 h-4 text-[#a58150] shrink-0" />
                    <b className="font-[family-name:var(--font-marcellus)] text-[16px]">{std.title}</b>
                  </div>
                  <p className="text-[13px] text-[#7d7264] font-light leading-[1.65]">{std.desc}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* PRINCIPAL DESIGNER & LEADERSHIP */}
      <section id="designer" className="py-[clamp(84px,9vw,130px)] px-6 lg:px-7 bg-[#211a13] text-white">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-[0.9fr_1.1fr] gap-[clamp(44px,6vw,90px)] items-center">
          <Reveal className="relative overflow-hidden aspect-[4/4.6]">
            <img src={designerImage} alt={doctor?.name || 'Principal designer'} loading="lazy" className="w-full h-full object-cover" />
          </Reveal>

          <Reveal delay={120}>
            <span className="flex items-center gap-3.5 text-[12px] tracking-[0.38em] uppercase text-[#c9ab7c] mb-4 before:content-[''] before:w-10 before:h-px before:bg-[#c9ab7c]">
              Leadership
            </span>
            <h2 className="font-[family-name:var(--font-marcellus)] text-[clamp(32px,3.8vw,52px)] leading-[1.12] mb-3">
              {doctor?.name || 'Principal Designer'}
            </h2>
            <p className="text-[14.5px] text-[#c9ab7c] tracking-[0.1em] uppercase mb-6 font-medium">
              {doctorSpecialization}
            </p>
            <p className="text-white/75 leading-[1.85] font-light text-[15.5px] mb-6">
              {doctor?.bio || `With over ${experienceYears}+ years across residential and turnkey construction projects, our team is dedicated to building homes that stay strong, cool, and comfortable for generations.`}
            </p>
            <div className="grid grid-cols-2 gap-4 border-t border-[#f6f1e8]/15 pt-6 mb-8">
              <div>
                <b className="font-[family-name:var(--font-marcellus)] text-[28px] text-[#c9ab7c] block">{experienceYears}+ Years</b>
                <span className="text-[11px] tracking-[0.2em] uppercase text-white/60">Design Experience</span>
              </div>
              <div>
                <b className="font-[family-name:var(--font-marcellus)] text-[28px] text-[#c9ab7c] block">100%</b>
                <span className="text-[11px] tracking-[0.2em] uppercase text-white/60">Punctual Handover</span>
              </div>
            </div>
            <Link
              href={`${basePath}/contact`}
              className="inline-flex items-center gap-2 bg-[#a58150] text-white px-5 py-3 sm:px-6 sm:py-3.5 text-[10.5px] sm:text-[11.5px] tracking-[0.2em] uppercase font-medium border border-[#a58150] hover:bg-white hover:text-[#211a13] hover:border-white transition-colors duration-300"
            >
              Contact Us
            </Link>
          </Reveal>
        </div>
      </section>

      <PageNarrative page="about" studioName={cleanName} city={city} />

      {/* CTA */}
      <section id="about-cta" className="bg-[#f6f1e8] px-6 lg:px-7 py-[clamp(70px,8vw,100px)] text-center">
        <div className="max-w-3xl mx-auto">
          <Reveal>
            <h2 className="font-[family-name:var(--font-marcellus)] text-[clamp(30px,3.8vw,50px)] leading-[1.12] mb-5">
              Ready to plan your <em className="not-italic italic font-light text-[#a58150]">next project?</em>
            </h2>
            <p className="text-[#7d7264] font-light leading-[1.8] mb-8 text-[16px]">
              Meet our architects for a free 60-minute plot consultation for your villa, residential home, or commercial building in {city}.
            </p>
            <Link
              href={`${basePath}/contact`}
              className="inline-flex items-center gap-2 bg-[#211a13] text-white px-5 py-3 sm:px-6 sm:py-3.5 text-[10.5px] sm:text-[11.5px] tracking-[0.2em] uppercase font-medium border border-[#211a13] hover:bg-[#a58150] hover:border-[#a58150] transition-colors duration-300"
            >
              Contact Us
            </Link>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
