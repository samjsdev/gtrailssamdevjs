import { readSourceConfig } from '@/lib/sourceData';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

interface PageProps {
  params?: any;
}

export default async function AboutPage({ params }: PageProps) {
  const data = await readSourceConfig(undefined, 'template5');

  if (!data || !data.clinic) {
    notFound();
  }

  const phone = '09841098490';
  const displayPhone = '+91 98410 98490';
  const rawDigits = phone.replace(/\D/g, '');
  const cleanPhone = rawDigits.startsWith('91') ? rawDigits : `91${rawDigits.replace(/^0+/, '')}`;

  const milestones = [
    {
      year: '1998',
      title: 'Foundation in Anna Nagar',
      desc: 'Established with an uncompromising commitment to transparent, fixed-price civil construction in Chennai.',
    },
    {
      year: '2006',
      title: 'Integrated Architectural Practice',
      desc: 'Formed Murali Patharala Associates (MPA) to combine structural engineering with avant-garde 3D elevations and spatial planning.',
    },
    {
      year: '2014',
      title: 'Dedicated Modular Joinery Unit',
      desc: 'Commissioned an in-house precision factory utilizing 100% BWR Marine Plywood for modular kitchens and architectural millwork.',
    },
    {
      year: '2026',
      title: '28+ Years & 850+ Residences',
      desc: 'Celebrating over 850 delivered homes across Chennai with 0% cost escalation and guaranteed delivery schedules.',
    },
  ];

  return (
    <div className="w-full bg-[#FAFAFA] text-[#111111]">
      {/* ── Hero Section ── */}
      <section className="relative py-20 md:py-28 bg-[#111111] text-white border-b-4 border-[#111111] px-6 md:px-12">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <p className="text-xs font-bold tracking-[0.25em] uppercase text-[#EA580C]">
            Firm Profile &amp; Legacy Since 1998
          </p>
          <h1
            className="text-4xl sm:text-5xl md:text-6xl font-bold font-serif leading-tight tracking-tight"
            style={{ fontFamily: "'Lora', serif" }}
          >
            28+ Years of Structural Discipline &amp; Architectural Integrity.
          </h1>
          <p className="text-base sm:text-lg text-white/75 font-medium max-w-2xl mx-auto leading-relaxed">
            Murali Patharala Associates (MPA) unites architectural brilliance, civil engineering, and bespoke turnkey execution under one roof in Anna Nagar, Chennai.
          </p>
        </div>
      </section>

      {/* ── Story / Origin Section ── */}
      <section className="py-20 md:py-28 px-6 md:px-12 border-b-4 border-[#111111] bg-white">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <span className="text-xs font-bold tracking-[0.2em] uppercase text-[#EA580C] block">
              The Firm&apos;s Origin
            </span>
            <h2
              className="text-3xl sm:text-4xl font-bold font-serif text-[#111111] leading-tight"
              style={{ fontFamily: "'Lora', serif" }}
            >
              Built to Eliminate Contractor Chaos and Price Overruns.
            </h2>
            <p className="text-sm sm:text-base text-[#757575] leading-relaxed font-medium">
              Since 1998, we have operated on a singular philosophy: every family deserves transparent contracts, verified materials, and punctual project completion without stress.
            </p>
            <p className="text-sm sm:text-base text-[#757575] leading-relaxed font-medium">
              Unlike broker-driven builder models, our senior architects and structural engineers work alongside full-time site supervisors. We do not subcontract your dream to lowest-bid third parties.
            </p>
            <div className="pt-4">
              <Link
                href="/contact"
                className="inline-block px-8 py-4 bg-[#EA580C] text-[#111111] font-bold uppercase tracking-widest text-xs hover:bg-[#111111] hover:text-white transition-colors"
              >
                Consult Our Principal Architect
              </Link>
            </div>
          </div>

          <div className="relative aspect-[4/3] border-4 border-[#111111] bg-[#181818] overflow-hidden shadow-xl">
            <Image
              src="/images/clinicImages-1.jpg"
              alt="Murali Patharala Associates Studio"
              fill
              className="object-cover grayscale-[0.2]"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-[#111111]/90 text-white border-t-2 border-[#EA580C]">
              <p className="text-xs font-bold uppercase tracking-wider">Anna Nagar East Studio</p>
              <p className="text-[11px] text-white/70">W115A, 3rd Ave, Chennai</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Chronological Milestones ── */}
      <section className="py-20 md:py-28 px-6 md:px-12 border-b-4 border-[#111111] bg-[#FAFAFA]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-xs font-bold tracking-[0.2em] uppercase text-[#EA580C] mb-3">Our History</p>
            <h2
              className="text-3xl sm:text-4xl font-bold font-serif text-[#111111]"
              style={{ fontFamily: "'Lora', serif" }}
            >
              Key Milestones of Trust
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {milestones.map((m, idx) => (
              <div key={idx} className="p-8 border-2 border-[#111111] bg-white flex flex-col justify-between">
                <div>
                  <span
                    className="text-4xl font-bold font-serif text-[#EA580C] block mb-4"
                    style={{ fontFamily: "'Lora', serif" }}
                  >
                    {m.year}
                  </span>
                  <h3 className="text-base font-bold uppercase tracking-wide mb-3 text-[#111111]">
                    {m.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#757575] leading-relaxed font-medium">
                    {m.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Pre-Footer Action ── */}
      <section className="py-16 md:py-20 px-6 md:px-12 bg-[#111111] text-white text-center">
        <h3
          className="text-2xl sm:text-4xl font-bold font-serif mb-4 text-[#EA580C]"
          style={{ fontFamily: "'Lora', serif" }}
        >
          Discuss Your Residential Plot in Chennai
        </h3>
        <p className="text-white/70 max-w-xl mx-auto mb-8 text-sm sm:text-base font-medium">
          Schedule an in-person discovery session at our Anna Nagar studio or arrange a site visit.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/contact"
            className="px-8 py-4 bg-[#EA580C] text-[#111111] font-bold uppercase tracking-widest text-xs hover:bg-white transition-colors"
          >
            Visit Studio
          </Link>
          <a
            href={`tel:${displayPhone}`}
            className="px-8 py-4 border-2 border-[#EA580C] text-[#EA580C] font-bold uppercase tracking-widest text-xs hover:bg-[#EA580C] hover:text-[#111111] transition-colors"
          >
            Call {displayPhone}
          </a>
        </div>
      </section>
    </div>
  );
}
