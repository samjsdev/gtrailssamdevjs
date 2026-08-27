import { readSourceConfig } from '@/lib/dataBuilder';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import {
  Check, Factory, ClipboardCheck, ShieldCheck, HeartHandshake,
  Clock, Award, Sparkles, CheckCircle2, ArrowRight
} from 'lucide-react';
import {
  cleanClinicName,
  cleanArchitectureTagline,
  cleanArchitectureDescription,
  cleanArchitectureServices,
  cleanArchitectureHighlights,
  cleanArchitectureSpecialization,
} from '@/lib/copyCleaner';
import { DEFAULT_ARCHITECTURE_HIGHLIGHTS, DEFAULT_ARCHITECTURE_SERVICES, previewMedia } from '@/lib/architectureContent';
import Reveal from '../Reveal';
import PageNarrative from '../PageNarrative';
import CountUp from '@/components/CountUp';

type PageProps = { params: Promise<{ slug: string }> };

export default async function Template13About({ params }: PageProps) {
  const { slug } = await params;
  const basePath = `/designwebsite/template13/${slug}`;

  const data = await readSourceConfig(slug, 'template13');
  if (!data) return notFound();

  const { clinic, doctor, business } = data;

  const media = previewMedia(data.media);
  const cleanName = cleanClinicName(clinic.name);
  const city = clinic.address?.city || 'Chennai';
  const cleanDesc = cleanArchitectureDescription(clinic.description, clinic.name, city);
  const cleanTagline = cleanArchitectureTagline(clinic.tagline);
  const rating = business.rating || '4.9';
  const experienceYears = doctor?.experience?.replace(/\D/g, '') || '14';
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
  const studioImage =
    media.otherImages?.[5] ||
    '/images/architecture/staad-structural-engineering.webp';

  const VALUES = [
    { icon: Factory, title: highlights[0] || 'Smart Natural Ventilation', desc: 'Every layout responds to plot sun angles, evening sea breezes, and natural daylight optimization.' },
    { icon: ClipboardCheck, title: highlights[1] || 'Certified Steel & Grade-53 Concrete', desc: '100% Primary Tata Tiscon Fe550D steel and Grade-53 ready-mix concrete with lab compression strength certificates.' },
    { icon: ShieldCheck, title: highlights[2] || 'Fixed Price Guarantee', desc: 'Itemised contractually locked quotation with zero mid-construction price increase.' },
    { icon: HeartHandshake, title: highlights[3] || 'Licensed Architectural Supervision', desc: 'Qualified architects and civil engineers directly inspect every stage of construction on site.' },
  ];

  const MILESTONES = [
    { period: 'Founding Year', title: 'Studio Founded', desc: `Founded in ${city} with a commitment to modern villa design, functional floor plans, and honest pricing.` },
    { period: 'Expansion', title: '3D Design & Plan Sanction', desc: 'Integrated 3D elevation modeling, structural safety calculations, and CMDA/DTCP municipal plan sanction approvals.' },
    { period: 'Turnkey', title: 'Turnkey Construction', desc: 'Expanded into complete house construction with fixed budgets, daily engineer supervision, and milestone delivery.' },
    { period: 'Today', title: '150+ Homes Handed Over', desc: `Delivered quality homes with a ${rating}★ rating and 10-year structural warranty certificates.` },
  ];

  return (
    <div>
      {/* HERO */}
      <section id="about-hero" className="px-7 py-[clamp(56px,7vw,88px)] bg-[#fbf7f2]">
        <div className="max-w-[1220px] mx-auto">
          <Reveal>
            <div className="flex items-center gap-2.5 text-[12px] font-extrabold tracking-[0.22em] uppercase text-[#d8442c] before:content-[''] before:w-6 before:h-[2.5px] before:rounded before:bg-[#d8442c]">
              About {cleanName || 'Our Atelier'}
            </div>
            <h1 className="text-[clamp(32px,4.6vw,54px)] font-extrabold mt-3.5 tracking-[-0.02em] max-w-[780px] leading-[1.12]">
              {cleanName || 'An atelier'} — {city}&rsquo;s licensed{' '}
              <span className="font-[family-name:var(--font-newsreader)] italic font-medium text-[#d8442c]">architectural &amp; civil build house</span>
            </h1>
            <p className="mt-4.5 max-w-[640px] text-[#6d6259] text-[16px]">
              {cleanDesc || `A dedicated team of licensed architects, structural engineers, and civil supervisors designing and delivering generational estates across ${city}.`}
            </p>
          </Reveal>
        </div>
      </section>

      {/* STORY + STATS */}
      <section id="story" className="px-7 py-[clamp(56px,7vw,88px)] bg-white">
        <div className="max-w-[1220px] mx-auto grid lg:grid-cols-2 gap-11 lg:gap-14 items-center">
          <Reveal>
            <div className="rounded-[20px] overflow-hidden aspect-[4/3.3] shadow-[0_30px_60px_-24px_rgba(29,23,19,0.4)]">
              <img src={storyImage} alt={`${cleanName || 'Studio'} completed project`} loading="lazy" className="w-full h-full object-cover" />
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div className="flex items-center gap-2.5 text-[12px] font-extrabold tracking-[0.22em] uppercase text-[#d8442c] before:content-[''] before:w-6 before:h-[2.5px] before:rounded before:bg-[#d8442c]">
              Our Story &amp; Vision
            </div>
            <h2 className="text-[clamp(26px,3.4vw,40px)] font-extrabold mt-3.5 mb-4 tracking-[-0.02em]">
              {clinic.tagline || 'Sculpted architecture for generational living'}
            </h2>
            <p className="text-[#6d6259] text-[15.5px] mb-4">
              We built this studio around one core belief: a home should be designed around the daily rituals of the people who live in it. That means listening before drawing, planning before quoting, and inspecting before handing over.
            </p>
            <p className="text-[#6d6259] text-[15.5px] mb-7">
              Led by {doctor?.name || 'our principal architect'} ({doctorSpecialization}), we execute projects across {city} — from compact apartment redevelopments to sprawling turnkey villas.
            </p>

            <div className="grid grid-cols-3 gap-4">
              {[
                { b: `${rating}★`, s: 'Google rating' },
                { b: `${experienceYears}+ yrs`, s: 'Experience' },
                { b: `${servicesCount}+`, s: 'Disciplines' },
              ].map((stat) => (
                <div key={stat.s} className="bg-[#fbf7f2] border border-[#241f1a]/10 rounded-2xl px-4 py-5 text-center">
                  <b className="text-[clamp(20px,2.4vw,27px)] font-extrabold text-[#d8442c] block">
                    <CountUp value={stat.b} />
                  </b>
                  <span className="text-[11.5px] text-[#6d6259] font-semibold tracking-[0.05em] uppercase">{stat.s}</span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* TIMELINE */}
      <section className="px-7 py-[clamp(56px,7vw,88px)] bg-[#fbf7f2] border-y border-[#241f1a]/10">
        <div className="max-w-[1220px] mx-auto">
          <Reveal className="mb-11">
            <div className="flex items-center gap-2.5 text-[12px] font-extrabold tracking-[0.22em] uppercase text-[#d8442c] before:content-[''] before:w-6 before:h-[2.5px] before:rounded before:bg-[#d8442c]">
              Studio Evolution
            </div>
            <h2 className="text-[clamp(26px,3.6vw,42px)] font-extrabold mt-3.5 tracking-[-0.02em]">
              Milestones of craft &amp; delivery
            </h2>
          </Reveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {MILESTONES.map((m, idx) => (
              <Reveal key={m.title} delay={idx * 80}>
                <div className="bg-white border border-[#241f1a]/10 rounded-2xl p-6.5 h-full flex flex-col justify-between shadow-sm">
                  <div>
                    <span className="text-[11px] font-extrabold tracking-wider uppercase text-[#d8442c] bg-[#d8442c]/10 px-3 py-1 rounded-full inline-block mb-3">
                      {m.period}
                    </span>
                    <h3 className="text-[18px] font-extrabold text-[#1d1713] mb-2">{m.title}</h3>
                    <p className="text-[13px] text-[#6d6259] font-medium leading-relaxed">{m.desc}</p>
                  </div>
                  <span className="text-[12px] font-extrabold text-[#d8442c] mt-4 block">
                    0{idx + 1}
                  </span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* VALUES */}
      <section id="values" className="px-7 py-[clamp(56px,7vw,88px)] bg-white">
        <div className="max-w-[1220px] mx-auto">
          <Reveal className="mb-11">
            <div className="flex items-center gap-2.5 text-[12px] font-extrabold tracking-[0.22em] uppercase text-[#d8442c] before:content-[''] before:w-6 before:h-[2.5px] before:rounded before:bg-[#d8442c]">
              What We Promise
            </div>
            <h2 className="text-[clamp(26px,3.6vw,42px)] font-extrabold mt-3.5 tracking-[-0.02em]">
              Built like a brand, priced like a local
            </h2>
          </Reveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {VALUES.map((v, idx) => {
              const Icon = v.icon;
              return (
                <Reveal key={v.title} delay={idx * 70}>
                  <div className="bg-[#fbf7f2] border border-[#241f1a]/10 rounded-2xl p-6.5 h-full flex flex-col justify-between">
                    <div>
                      <span className="w-11 h-11 rounded-xl bg-[#d8442c]/10 text-[#d8442c] grid place-items-center mb-4.5">
                        <Icon className="w-5 h-5" strokeWidth={2.2} />
                      </span>
                      <h3 className="text-[18px] font-extrabold text-[#1d1713] mb-2">{v.title}</h3>
                      <p className="text-[13.5px] text-[#6d6259] font-medium leading-relaxed">{v.desc}</p>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* LEADERSHIP */}
      <section id="team" className="px-7 py-[clamp(56px,7vw,88px)] bg-[#fbf7f2] border-t border-[#241f1a]/10">
        <div className="max-w-[1220px] mx-auto grid lg:grid-cols-2 gap-11 lg:gap-14 items-center">
          <Reveal>
            <div className="rounded-[20px] overflow-hidden aspect-[4/3.3] shadow-[0_30px_60px_-24px_rgba(29,23,19,0.4)]">
              <img src={teamImage} alt={doctor?.name || 'Principal Designer'} loading="lazy" className="w-full h-full object-cover" />
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div className="flex items-center gap-2.5 text-[12px] font-extrabold tracking-[0.22em] uppercase text-[#d8442c] before:content-[''] before:w-6 before:h-[2.5px] before:rounded before:bg-[#d8442c]">
              Studio Leadership
            </div>
            <h2 className="text-[clamp(26px,3.4vw,40px)] font-extrabold mt-3.5 mb-1.5 tracking-[-0.02em]">
              {doctor?.name || 'Principal Designer'}
            </h2>
            <p className="font-[family-name:var(--font-newsreader)] italic text-[#d8442c] text-[18px] mb-5">
              {doctor?.credentials || 'Principal Architect & Turnkey Lead'}
            </p>
            <p className="text-[#6d6259] text-[15px] leading-relaxed mb-6">
              {doctor?.bio || `With over ${experienceYears}+ years of hands-on architectural and turnkey execution experience across ${city}, overseeing design, procurement, and site quality control for every project.`}
            </p>
            <div className="grid grid-cols-2 gap-4 border-t border-[#241f1a]/10 pt-5 mb-7">
              <div>
                <b className="text-[24px] font-extrabold text-[#d8442c] block">
                  <CountUp value={experienceYears} suffix="+ Yrs" />
                </b>
                <span className="text-[12px] text-[#6d6259] font-semibold">Experience</span>
              </div>
              <div>
                <b className="text-[24px] font-extrabold text-[#d8442c] block">
                  <CountUp value="10-Year" />
                </b>
                <span className="text-[12px] text-[#6d6259] font-semibold">Warranty</span>
              </div>
            </div>
            <Link
              href={`${basePath}/contact`}
              className="inline-flex items-center gap-2 bg-[#d8442c] text-white font-extrabold text-[14px] px-7 py-3.5 rounded-xl hover:bg-[#b93320] transition-colors"
            >
              Book Studio Consultation <ArrowRight className="w-4 h-4" />
            </Link>
          </Reveal>
        </div>
      </section>

      <PageNarrative page="about" studioName={cleanName} city={city} />

      {/* CTA */}
      <section className="px-7 py-[clamp(56px,7vw,88px)] bg-[#1d1713] text-white text-center">
        <Reveal className="max-w-[720px] mx-auto">
          <h2 className="text-[clamp(28px,3.8vw,44px)] font-extrabold mb-4">
            Let&rsquo;s talk about your space
          </h2>
          <p className="text-white/80 text-[16px] mb-8">
            Tell us about your home floor plan — we&rsquo;ll map the right design direction in one free session.
          </p>
          <Link
            href={`${basePath}/contact`}
            className="inline-flex items-center gap-2 bg-[#d8442c] text-white font-extrabold text-[15px] px-8 py-4 rounded-xl hover:bg-[#b93320] transition-colors"
          >
            Book Free Consultation
          </Link>
        </Reveal>
      </section>
    </div>
  );
}
