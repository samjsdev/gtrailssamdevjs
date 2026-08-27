import { readSourceConfig } from '@/lib/sourceData';
import { cleanClinicName, cleanClinicDescription } from '@/lib/copyCleaner';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import ConsultationForm from '../ConsultationForm';
import { 
  Building, Phone, Mail, MapPin, Clock, ShieldCheck, 
  HardHat, CheckCircle2, HelpCircle, ArrowRight 
} from 'lucide-react';

interface PageProps {
  params?: any;
}

export default async function Template5ContactPage({ params }: PageProps) {
  const slug = ''; // standalone: slug not needed for data loading
  const data = await readSourceConfig(undefined, 'template5');

  if (!data || !data.clinic) {
    notFound();
  }

  const clinicName = cleanClinicName(data.clinic.name);
  const clinicPhone = data.clinic.contact?.phone || '+91 81100 00384';
  const clinicEmail = data.clinic.contact?.email || 'contact@architecturalfirm.com';
  const clinicAddress = data.clinic.address?.full || 'Engineering Center & Corporate Operations Office';

  const basePath = ``;

  const faqs = [
    {
      q: 'How does your 10-Year Comprehensive Structural Guarantee work?',
      a: 'We provide a legally registered 10-year warranty agreement covering the sub-structure, RCC columns, beams, and slab integrity against structural settlements or defects. Our civil construction uses certified Fe550D TMT steel and Grade-53 concrete with strict mix designs and curing.',
    },
    {
      q: 'Is the Zero Cost Escalation Guarantee fixed in the formal contract?',
      a: 'Yes. Once the architectural 2D/3D scheme, structural drawing, and Bill of Quantities (BOQ) are finalized, your project cost is 100% locked. We absorb any interim market price fluctuations in raw steel or cement.',
    },
    {
      q: 'Can I commission you for Architectural Design only without civil construction?',
      a: 'Absolutely. Our studio provides standalone architectural design packages (2D plans, 3D photorealistic elevations, MEP schematics, and structural drawings). If you later choose us for turnkey construction, the entire architectural design fee is 100% rebated.',
    },
    {
      q: 'How are the construction milestone payments structured?',
      a: 'Payments are linked strictly to 7 verifiable physical stages (Plinth completion, Ground slab, First slab, Brickwork, MEP/Plastering, Flooring, Final Handover). You inspect and approve each stage before releasing the next tranche.',
    },
    {
      q: 'Do you manage CMDA / DTCP municipal plan sanctions and utility connections?',
      a: 'Yes. Our dedicated liaison team handles all municipal drawings, statutory approvals, building permits, and temporary construction utility connections end-to-end.',
    },
  ];

  return (
    <div className="w-full bg-[#F4F3EE] text-[#252A29]">
      {/* ─── Hero Banner Section ─── */}
      <section id="contact-hero" className="relative py-20 sm:py-28 bg-[#FFFFFF] border-b-4 border-[#252A29]">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#E94B26] text-[#F4F3EE] text-xs font-mono font-bold uppercase tracking-[0.2em] border border-[#111111] shadow-[2px_2px_0px_#111111]">
              <HardHat className="w-3.5 h-3.5" />
              <span>CONSULTATION & SITE SURVEY</span>
            </div>
            <h1 className="text-4xl sm:text-6xl font-black uppercase text-[#252A29] tracking-tight leading-[0.95]">
              GET IN TOUCH WITH OUR <span className="text-[#E94B26]">ENGINEERING STUDIO</span>
            </h1>
            <p className="text-sm sm:text-base font-bold uppercase tracking-wider text-[#C8A84E]">
              {clinicName} &bull; SCHEDULE A TECHNICAL INSPECTION
            </p>
          </div>
        </div>
      </section>

      {/* ─── Contact Form & Coordinates Section ─── */}
      <section className="py-24 px-4 sm:px-8 bg-[#F4F3EE] border-b-4 border-[#252A29]">
        <div className="max-w-7xl mx-auto space-y-16">
          {/* Coordinates Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-mono">
            <div className="bg-[#FFFFFF] p-6 border-4 border-[#252A29] shadow-[6px_6px_0px_#252A29] space-y-3">
              <div className="w-10 h-10 bg-[#E94B26] text-[#F4F3EE] flex items-center justify-center border border-[#111111]">
                <Phone className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#C8A84E] block">
                DIRECT TELEPHONE
              </span>
              <a href={`tel:${clinicPhone.replace(/[^0-9+]/g, '')}`} className="text-base font-black text-[#252A29] block hover:text-[#E94B26]">
                {clinicPhone}
              </a>
              <span className="text-[11px] text-[#252A29]/70 block font-sans">
                Mon - Sat: 09:00 AM - 07:30 PM
              </span>
            </div>

            <div className="bg-[#FFFFFF] p-6 border-4 border-[#252A29] shadow-[6px_6px_0px_#252A29] space-y-3">
              <div className="w-10 h-10 bg-[#252A29] text-[#F4F3EE] flex items-center justify-center border border-[#111111]">
                <Mail className="w-5 h-5 text-[#C8A84E]" />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#C8A84E] block">
                OFFICIAL INQUIRIES
              </span>
              <a href={`mailto:${clinicEmail}`} className="text-base font-black text-[#252A29] block hover:text-[#E94B26] truncate">
                {clinicEmail}
              </a>
              <span className="text-[11px] text-[#252A29]/70 block font-sans">
                Response within 2 business hours
              </span>
            </div>

            <div className="bg-[#FFFFFF] p-6 border-4 border-[#252A29] shadow-[6px_6px_0px_#252A29] space-y-3">
              <div className="w-10 h-10 bg-[#252A29] text-[#F4F3EE] flex items-center justify-center border border-[#111111]">
                <MapPin className="w-5 h-5 text-[#E94B26]" />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#C8A84E] block">
                HEAD OFFICE & STUDIO
              </span>
              <p className="text-xs text-[#252A29] font-bold leading-relaxed">
                {clinicAddress}
              </p>
            </div>
          </div>

          {/* Consultation Form Component */}
          <ConsultationForm clinicName={clinicName} phone={clinicPhone} />
        </div>
      </section>

      {/* ─── Frequently Asked Questions (FAQs) ─── */}
      <section className="py-24 px-4 sm:px-8 bg-[#FFFFFF] border-b-4 border-[#252A29]">
        <div className="max-w-5xl mx-auto space-y-12">
          <div className="text-center space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#F4F3EE] text-[#C8A84E] text-xs font-mono font-bold uppercase tracking-[0.25em] border border-[#252A29]">
              <HelpCircle className="w-3.5 h-3.5 text-[#E94B26]" />
              <span>TRANSPARENT CLARIFICATIONS</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black uppercase text-[#252A29] tracking-tight">
              FREQUENTLY ASKED QUESTIONS
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="bg-[#F4F3EE] p-6 border-2 border-[#252A29] shadow-[4px_4px_0px_#252A29] space-y-2"
              >
                <div className="flex items-start gap-3">
                  <span className="font-mono text-sm font-black text-[#E94B26] mt-0.5">0{idx + 1}.</span>
                  <h4 className="text-base font-black uppercase text-[#252A29] tracking-tight">
                    {faq.q}
                  </h4>
                </div>
                <p className="text-xs sm:text-sm text-[#252A29]/80 font-sans leading-relaxed pl-7">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
