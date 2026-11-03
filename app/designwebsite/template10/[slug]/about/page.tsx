import { readSourceConfig } from '@/lib/dataBuilder';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import {
  ShieldCheck,
  Building2,
  Compass,
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  Award,
  Layers,
  Sparkles,
} from 'lucide-react';
import {
  cleanClinicName,
  cleanArchitectureTagline,
  cleanArchitectureDescription,
} from '@/lib/copyCleaner';
import { ARCHITECTURE_STOCK } from '@/lib/architectureContent';
import Reveal from '../Reveal';
import { Cinzel, Cormorant_Garamond } from 'next/font/google';

const cinzel = Cinzel({ subsets: ['latin'], weight: ['600', '700', '800'] });
const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
});

type PageProps = { params: Promise<{ slug: string }> };

const MILESTONES = [
  {
    year: 'Chapter I',
    title: 'Foundational Ethos',
    desc: 'Established with the conviction that architecture should be an enduring expression of restraint, proportion, and structural honesty.',
  },
  {
    year: 'Chapter II',
    title: 'Monolithic Mastery',
    desc: 'Pioneered post-tensioned cantilevered slabs and tropical passive courtyards that naturally cool interior micro-climates by 3°–5°C.',
  },
  {
    year: 'Chapter III',
    title: 'Turnkey Civil Integration',
    desc: 'Integrated resident civil engineering supervision, IS-456 concrete testing labs, and 100% CMDA single-window statutory sanctions.',
  },
  {
    year: 'Chapter IV',
    title: 'A Global Architectural Footprint',
    desc: 'Over 300 ultra-luxury residences, coastal estates, and corporate landmarks delivered on time and strictly within budget.',
  },
];

export default async function Template10About({ params }: PageProps) {
  const { slug } = await params;
  const basePath = `/designwebsite/template10/${slug}`;

  const data = await readSourceConfig(slug, 'template10');
  if (!data) return notFound();

  const { clinic, doctor, business } = data;

  const cleanName = cleanClinicName(clinic.name);
  const city = clinic.address?.city || 'Chennai';
  const tagline = cleanArchitectureTagline(clinic.tagline);
  const doctorName = doctor?.name || 'Principal Architect';

  const studioImage = ARCHITECTURE_STOCK.about[0] || '/images/architecture/architectural-atelier-studio.webp';
  const principalImage = ARCHITECTURE_STOCK.people[0] || '/images/architecture/principal-architect.webp';
  const engineeringImage = ARCHITECTURE_STOCK.construction[1] || '/images/architecture/staad-structural-engineering.webp';

  return (
    <div className="bg-[#faf8f5]">
      {/* Header Banner */}
      <section className="py-20 sm:py-28 bg-[#111111] text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-30 pointer-events-none">
          <Image
            src={studioImage}
            alt="Atelier Studio"
            fill
            className="object-cover"
            priority
          />
        </div>

        <div className="relative z-10 max-w-[1360px] mx-auto px-5 sm:px-8 text-center flex flex-col items-center">
          <span className="text-[11px] tracking-[0.35em] uppercase font-bold text-[#c5a47e] mb-3">
            Atelier Monograph & Philosophy
          </span>
          <h1
            className={`${cinzel.className} text-[34px] sm:text-[48px] lg:text-[58px] font-bold text-white tracking-tight leading-tight max-w-4xl`}
          >
            The Art of Monumental Architecture
          </h1>
          <p className="mt-5 text-[15px] sm:text-[17px] text-[#cfcac2] max-w-2xl font-light leading-relaxed">
            {tagline ||
              'Designing and constructing ultra-luxury residences where clarity of purpose meets structural permanence.'}
          </p>
        </div>
      </section>

      {/* Brand Story Section */}
      <section className="py-20 sm:py-28">
        <div className="max-w-[1360px] mx-auto px-5 sm:px-8">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            <div className="lg:col-span-6">
              <Reveal>
                <span className="text-[11px] tracking-[0.32em] uppercase font-bold text-[#b89568]">
                  Our Philosophy
                </span>
                <blockquote
                  className={`${cormorant.className} mt-3 text-[30px] sm:text-[38px] lg:text-[44px] italic font-normal text-[#141414] leading-[1.2]`}
                >
                  &ldquo;A residence must evoke stillness. It is not merely inhabited — it is experienced.&rdquo;
                </blockquote>
              </Reveal>

              <Reveal delay={100}>
                <p className="mt-6 text-[15px] sm:text-[16px] text-[#5a544c] leading-relaxed">
                  Founded in {city}, {cleanName || 'our atelier'} operates at the convergence of architectural sculpture and disciplined civil contracting. We believe that true luxury does not rely on transient decor, but on monumental volumes, refined tactile stone, and intelligent climate shielding.
                </p>
                <p className="mt-4 text-[15px] sm:text-[16px] text-[#5a544c] leading-relaxed">
                  From deep soil load calculations on coastal terrains to high-grade Tata Tiscon Fe550D concrete framing, every detail is engineered to endure for generations without settling or structural fatigue.
                </p>
              </Reveal>

              <Reveal delay={200}>
                <div className="mt-8 space-y-3 pt-6 border-t border-[#141414]/10">
                  <div className="flex items-center gap-3 text-[14px] text-[#141414] font-semibold">
                    <CheckCircle2 className="w-4 h-4 text-[#c5a47e]" />
                    <span>Registered Practice with Council of Architecture (CoA)</span>
                  </div>
                  <div className="flex items-center gap-3 text-[14px] text-[#141414] font-semibold">
                    <CheckCircle2 className="w-4 h-4 text-[#c5a47e]" />
                    <span>100% CMDA & Greater Chennai Corporation Single-Window Sanctions</span>
                  </div>
                  <div className="flex items-center gap-3 text-[14px] text-[#141414] font-semibold">
                    <CheckCircle2 className="w-4 h-4 text-[#c5a47e]" />
                    <span>10-Year Comprehensive Structural Warranty on All Concrete Pours</span>
                  </div>
                </div>
              </Reveal>
            </div>

            <div className="lg:col-span-6">
              <Reveal delay={150}>
                <div className="relative aspect-[4/3] w-full overflow-hidden border border-[#141414]/15 shadow-xl">
                  <Image
                    src={studioImage}
                    alt="Atelier Drafting Studio"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* Principal Leadership Section */}
      <section className="py-20 sm:py-28 bg-[#f5f2ea] border-y border-[#141414]/10">
        <div className="max-w-[1360px] mx-auto px-5 sm:px-8">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5">
              <Reveal>
                <div className="relative aspect-[3/4] w-full max-w-sm mx-auto overflow-hidden border border-[#141414]/20 shadow-2xl bg-white">
                  <Image
                    src={principalImage}
                    alt={doctorName}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 400px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute bottom-5 left-5 right-5 text-white">
                    <div className="text-[10px] tracking-[0.2em] uppercase font-bold text-[#c5a47e]">
                      Principal Director
                    </div>
                    <div className={`${cinzel.className} text-[18px] font-bold mt-1`}>
                      {doctorName}
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>

            <div className="lg:col-span-7 flex flex-col justify-center">
              <Reveal>
                <span className="text-[11px] tracking-[0.32em] uppercase font-bold text-[#b89568]">
                  Atelier Leadership
                </span>
                <h2
                  className={`${cinzel.className} mt-2 text-[28px] sm:text-[38px] font-bold text-[#141414] leading-tight`}
                >
                  Principal Architect & Engineering Director
                </h2>
              </Reveal>

              <Reveal delay={150}>
                <p className="mt-5 text-[15px] sm:text-[16px] text-[#5a544c] leading-relaxed">
                  Steering the creative and technical trajectory of {cleanName || 'the atelier'}, our principal brings over 15 years of rigorous expertise in bespoke residential design, structural concrete dynamics, and climate-responsive tropical architecture.
                </p>
                <p className="mt-3.5 text-[15px] sm:text-[16px] text-[#5a544c] leading-relaxed">
                  Under this guidance, the practice has delivered landmark private villas, duplex estates, and boutique corporate headquarters, earning a reputation for unflinching architectural discipline and flawless execution.
                </p>
              </Reveal>

              <Reveal delay={250}>
                <div className="mt-8 grid sm:grid-cols-3 gap-4 pt-6 border-t border-[#141414]/10">
                  <div>
                    <div className="text-[10px] tracking-[0.2em] uppercase font-bold text-[#7a746d]">
                      Affiliation
                    </div>
                    <div className="text-[13px] font-bold text-[#141414] mt-1">
                      CoA & IIA Member
                    </div>
                  </div>
                  <div>
                    <div className="text-[10px] tracking-[0.2em] uppercase font-bold text-[#7a746d]">
                      Specialization
                    </div>
                    <div className="text-[13px] font-bold text-[#141414] mt-1">
                      Monolithic RCC Villas
                    </div>
                  </div>
                  <div>
                    <div className="text-[10px] tracking-[0.2em] uppercase font-bold text-[#7a746d]">
                      Track Record
                    </div>
                    <div className="text-[13px] font-bold text-[#141414] mt-1">
                      300+ Built Works
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* Practice Evolution / Milestones */}
      <section className="py-20 sm:py-28 bg-[#faf8f5]">
        <div className="max-w-[1360px] mx-auto px-5 sm:px-8">
          <div className="text-center mb-16">
            <span className="text-[11px] tracking-[0.32em] uppercase font-bold text-[#b89568]">
              Studio Evolution
            </span>
            <h2
              className={`${cinzel.className} mt-2.5 text-[28px] sm:text-[38px] font-bold text-[#141414] leading-tight`}
            >
              The Evolution of Our Atelier
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {MILESTONES.map((m) => (
              <div
                key={m.year}
                className="bg-[#f5f2ea] border border-[#141414]/10 p-7 flex flex-col justify-between"
              >
                <div>
                  <span className="text-[11px] tracking-[0.25em] uppercase font-extrabold text-[#c5a47e]">
                    {m.year}
                  </span>
                  <h3
                    className={`${cinzel.className} text-[18px] font-bold text-[#141414] mt-3 leading-snug`}
                  >
                    {m.title}
                  </h3>
                  <p className="mt-3 text-[13.5px] text-[#5a544c] leading-relaxed">
                    {m.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA Strip */}
      <section className="py-20 bg-[#111111] text-white">
        <div className="max-w-[1000px] mx-auto px-5 sm:px-8 text-center flex flex-col items-center">
          <h2
            className={`${cinzel.className} text-[28px] sm:text-[38px] font-bold text-white leading-tight`}
          >
            Commission an Architectural Masterpiece
          </h2>
          <p className="mt-4 text-[15px] text-[#cfcac2] max-w-xl">
            Schedule a private spatial briefing with our principal architects to review plot feasibility and structural potentials.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <Link
              href={`${basePath}/contact`}
              className="bg-[#c5a47e] text-[#111111] px-8 py-4 text-[11px] tracking-[0.22em] uppercase font-bold hover:bg-[#d9bb93] transition-colors"
            >
              Initiate Consultation
            </Link>
            <Link
              href={`${basePath}/services`}
              className="border border-white/25 text-white px-8 py-4 text-[11px] tracking-[0.22em] uppercase font-bold hover:bg-white/10 transition-colors"
            >
              Explore Disciplines
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
