import { readSourceConfig } from '@/lib/sourceData';
import { cleanClinicName, cleanClinicDescription } from '@/lib/copyCleaner';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Building, Compass, ShieldCheck, Award, HardHat, 
  CheckCircle2, Ruler, ArrowRight, Phone, Users, FileCheck,
  Check, Layers, Sparkles, Hammer
} from 'lucide-react';

interface PageProps {
  params?: any;
}

export default async function Template5AboutPage({ params }: PageProps) {
  const slug = ''; // standalone: slug not needed for data loading
  const data = await readSourceConfig(undefined, 'template5');

  if (!data || !data.clinic) {
    notFound();
  }

  const clinicName = cleanClinicName(data.clinic.name);
  const clinicTagline = data.clinic.tagline || 'Leading the Frontier of Integrated Architecture & Civil Construction';
  const clinicDescription = cleanClinicDescription(data.clinic.description, data.clinic.name);
  const clinicPhone = data.clinic.contact?.phone || '+91 81100 00384';

  const doctorName = data.doctor?.name || 'Chief Architect & Senior Civil Associates';
  const doctorExperience = data.doctor?.experience || '18+ Years';
  const doctorSpecialization = data.doctor?.specialization || 'Principal Architect & Civil Project In-Charge';

  const highlightsList: string[] = (data.business?.highlights && data.business.highlights.length > 0)
    ? (data.business.highlights as string[])
    : [
        'Over 850+ Luxury Homes & Residential Villas Delivered On-Time',
        '10-Year Comprehensive Structural Warranty on All Civil Work',
        'Guaranteed Zero Cost Escalation with Itemised Milestone Billing',
        'Dedicated Senior Project Manager Assigned to Every Individual Site',
        'Lab-Certified Fe550D TMT Structural Steel & Tested Grade-53 Concrete',
        '425-Point Comprehensive Quality Assurance Audit Framework'
      ];

  const media = data.media || {};
  const studioImage = media.clinicImages?.[1] || 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80';
  const principalImage = media.otherImages?.[0] || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80';

  const basePath = ``;

  return (
    <div className="w-full bg-[#F4F3EE] text-[#252A29]">
      {/* ─── Hero Banner Section ─── */}
      <section id="about-hero" className="relative py-20 sm:py-28 bg-[#FFFFFF] border-b-4 border-[#252A29]">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#E94B26] text-[#F4F3EE] text-xs font-mono font-bold uppercase tracking-[0.2em] border border-[#111111] shadow-[2px_2px_0px_#111111]">
              <HardHat className="w-3.5 h-3.5" />
              <span>ABOUT OUR ARCHITECTURAL & CIVIL ENTERPRISE</span>
            </div>
            <h1 className="text-4xl sm:text-6xl font-black uppercase text-[#252A29] tracking-tight leading-[0.95]">
              INTEGRATED DESIGN RIGOR & <span className="text-[#E94B26]">UNCOMPROMISED CIVIL MASTERY</span>
            </h1>
            <p className="text-sm sm:text-base font-bold uppercase tracking-wider text-[#C8A84E]">
              {clinicName} &bull; {clinicTagline}
            </p>
          </div>
        </div>
      </section>

      {/* ─── About Narrative Section ─── */}
      <section id="about-narrative" className="py-24 px-4 sm:px-8 bg-[#F4F3EE] border-b-4 border-[#252A29]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-block px-3.5 py-1 bg-[#252A29] text-[#C8A84E] text-xs font-mono font-bold uppercase tracking-[0.25em] border border-[#111111]">
                OUR HERITAGE & MISSION
              </div>
              <h2 className="text-3xl sm:text-4xl font-black uppercase text-[#252A29] tracking-tight">
                BRIDGING VISIONARY ARCHITECTURE AND CIVIL EXECUTION
              </h2>
              <div className="text-xs sm:text-sm text-[#252A29]/85 leading-relaxed font-sans space-y-4">
                <p>{clinicDescription}</p>
                <p>
                  Established as an engineering-first construction and architectural firm, we eliminate the friction between conceptual blueprints and on-site civil reality. By uniting Council of Architecture (COA) licensed designers, structural engineers, quantity surveyors, and seasoned site supervisors under one roof, we guarantee absolute material integrity, zero budgetary inflation, and lifelong structural stability.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-4 border-t-2 border-[#252A29] font-mono text-xs">
                <div className="bg-[#FFFFFF] p-4 border-2 border-[#252A29] shadow-[3px_3px_0px_#252A29]">
                  <span className="text-3xl font-black text-[#E94B26] block">100%</span>
                  <span className="text-[#252A29] uppercase text-[10px] font-bold">IN-HOUSE ENGINEERING</span>
                </div>
                <div className="bg-[#FFFFFF] p-4 border-2 border-[#252A29] shadow-[3px_3px_0px_#252A29]">
                  <span className="text-3xl font-black text-[#252A29] block">425+</span>
                  <span className="text-[#C8A84E] uppercase text-[10px] font-bold">QUALITY AUDIT POINTS</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="relative h-96 sm:h-[450px] w-full border-4 border-[#252A29] shadow-[8px_8px_0px_#252A29] bg-[#111111]">
                <Image
                  src={studioImage}
                  alt="Architecture and Civil Engineering Studio"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 600px"
                />
                <div className="absolute bottom-4 left-4 bg-[#E94B26] text-[#F4F3EE] text-xs font-mono font-bold uppercase tracking-widest px-4 py-2 border border-[#111111]">
                  IN-HOUSE BIM & CIVIL PLANNING LAB
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Leadership & Credentials Section ─── */}
      <section id="leadership" className="py-24 px-4 sm:px-8 bg-[#FFFFFF] border-b-4 border-[#252A29]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center bg-[#F4F3EE] p-8 sm:p-12 border-4 border-[#252A29] shadow-[8px_8px_0px_#252A29]">
            <div className="lg:col-span-4 relative h-80 sm:h-96 w-full border-2 border-[#252A29]">
              <Image
                src={principalImage}
                alt={doctorName}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 400px"
              />
              <div className="absolute bottom-3 left-3 bg-[#E94B26] text-[#F4F3EE] text-xs font-mono font-bold uppercase tracking-widest px-3 py-1 border border-[#111111]">
                PRINCIPAL IN CHARGE
              </div>
            </div>

            <div className="lg:col-span-8 space-y-4">
              <div className="inline-block px-3.5 py-1 bg-[#252A29] text-[#C8A84E] text-xs font-mono font-bold uppercase tracking-[0.25em] border border-[#111111]">
                MEET THE LEADERSHIP
              </div>
              <h3 className="text-3xl sm:text-4xl font-black uppercase text-[#252A29] tracking-tight">
                {doctorName}
              </h3>
              <p className="text-xs font-mono text-[#E94B26] uppercase tracking-wider font-bold">
                {doctorSpecialization} &bull; {doctorExperience} OF PROVEN CIVIL MASTERY
              </p>
              <p className="text-xs sm:text-sm text-[#252A29]/85 leading-relaxed font-sans pt-2">
                Under visionary leadership, our multidisciplinary team of architects, structural draftsmen, site supervisors, and quality surveyors execute residential projects with mathematical precision. We ensure your construction journey is entirely transparent, structured, and joyful.
              </p>
              
              <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono text-[#252A29]">
                <div className="flex items-center gap-2 font-bold">
                  <CheckCircle2 className="w-4 h-4 text-[#E94B26]" />
                  <span>Licensed Council of Architecture (COA)</span>
                </div>
                <div className="flex items-center gap-2 font-bold">
                  <CheckCircle2 className="w-4 h-4 text-[#E94B26]" />
                  <span>IS 456 Structural Concrete Certified</span>
                </div>
                <div className="flex items-center gap-2 font-bold">
                  <CheckCircle2 className="w-4 h-4 text-[#E94B26]" />
                  <span>National Building Code (NBC) 2016 Compliant</span>
                </div>
                <div className="flex items-center gap-2 font-bold">
                  <CheckCircle2 className="w-4 h-4 text-[#E94B26]" />
                  <span>Milestone-Linked Escrow Protection</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Highlights Section ─── */}
      <section id="about-highlights" className="py-24 px-4 sm:px-8 bg-[#F4F3EE] border-b-4 border-[#252A29]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <div className="inline-block px-3.5 py-1 bg-[#252A29] text-[#C8A84E] text-xs font-mono font-bold uppercase tracking-[0.25em] border border-[#111111]">
              STANDARDS WE UPHOLD
            </div>
            <h2 className="text-3xl sm:text-5xl font-black uppercase text-[#252A29] tracking-tight">
              KEY CIVIL & ARCHITECTURAL HIGHLIGHTS
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {highlightsList.map((highlight, idx) => (
              <div
                key={idx}
                className="bg-[#FFFFFF] p-6 border-2 border-[#252A29] hover:border-[#E94B26] transition-colors shadow-[4px_4px_0px_#252A29] flex flex-col justify-between"
              >
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#E94B26] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[10px] font-mono text-[#C8A84E] uppercase tracking-wider block font-bold mb-1">
                      ASSURANCE #{idx + 1}
                    </span>
                    <p className="text-xs font-bold text-[#252A29] leading-relaxed">
                      {highlight}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <Link
              href={`${basePath}/contact`}
              className="inline-flex items-center gap-2.5 px-8 py-4 bg-[#E94B26] text-[#F4F3EE] font-black text-xs uppercase tracking-widest border border-[#111111] shadow-[6px_6px_0px_#111111] hover:shadow-[2px_2px_0px_#111111] hover:translate-x-1 hover:translate-y-1 transition-all"
            >
              <span>DISCUSS YOUR PROJECT WITH AN ARCHITECT</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
