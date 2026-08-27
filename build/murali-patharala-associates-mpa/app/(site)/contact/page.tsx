import { readSourceConfig } from '@/lib/sourceData';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import ConsultationForm from '../ConsultationForm';
import {
  Building2, Phone, Mail, MapPin, Clock, ShieldCheck,
  CheckCircle2, HelpCircle, ArrowRight, Compass,
  MessageSquare, Sparkles
} from 'lucide-react';

interface PageProps {
  params?: any;
}

export default async function ContactPage({ params }: PageProps) {
  const data = await readSourceConfig(undefined, 'template5');

  if (!data || !data.clinic) {
    notFound();
  }

  const clinicPhone = '98410 98490';
  const clinicEmail = 'archfoundations.mpa@gmail.com';
  const clinicAddress = 'W115A, 3rd Ave, Annanagar East, Chennai, Tamil Nadu 600040';
  const cleanPhone = `91${clinicPhone.replace(/\D/g, '')}`;

  const faqs = [
    {
      q: 'What is included in the 10-Year Structural Guarantee?',
      a: 'We provide a legally binding 10-year structural certificate that covers the foundation, RCC columns, beams, roof slabs, and load-bearing masonry against structural settlement, micro-cracking, or concrete delamination. We strictly use certified 53-grade cement and primary TMT steel (Tata Tiscon / JSW).',
    },
    {
      q: 'How does the Zero Cost Escalation & Fixed-Price Guarantee work?',
      a: 'Before construction begins, our civil engineers prepare an exhaustive, itemized Bill of Quantities (BOQ) covering every bag of cement, ton of steel, plumbing pipe, and tile. Once signed, your price per square foot is 100% frozen. We absorb any market price increases.',
    },
    {
      q: 'Do you provide CMDA and DTCP plan approvals in Chennai?',
      a: 'Yes. Our in-house architectural team handles the entire statutory sanction process with CMDA, Greater Chennai Corporation (GCC), and DTCP, ensuring full adherence to setback norms, FSI calculations, and Vastu principles.',
    },
    {
      q: 'Can we hire you for Architecture or Interiors only?',
      a: 'Yes, absolutely. While 80% of our clients choose our end-to-end Turnkey Construction package (from foundation to interiors), we also accept standalone Architectural 3D Elevation & Planning commissions, as well as Luxury Interior Joinery projects.',
    },
    {
      q: 'How do you monitor construction quality without a mobile app?',
      a: 'We believe real engineering happens on-site, not on a phone screen. We assign a dedicated, full-time Civil Engineer to your site every single day. You receive structured weekly high-definition photo and video milestone progress reports via WhatsApp and email, with live compressive cube test certificates.',
    },
  ];

  return (
    <div className="w-full bg-[#FAF9F7] text-[#1A1B1A] font-sans">
      {/* ─── Hero Banner Section ─── */}
      <section id="contact-hero" className="relative py-20 sm:py-28 bg-[#1A1B1A] text-white overflow-hidden">
        <Image
          src="/images/clinicImages-3.jpg"
          alt="MPA studio building in Anna Nagar East"
          fill
          className="object-cover opacity-55"
          sizes="100vw"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1A1B1A]/75 via-[#1A1B1A]/35 to-transparent" />
        <div className="max-w-7xl mx-auto px-4 sm:px-8 relative">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-[#E64D16]/20 border border-[#E64D16]/50 rounded-full text-xs font-bold text-[#E6C673] tracking-wide uppercase backdrop-blur-sm">
              <Compass className="w-3.5 h-3.5" />
              <span>Studio Coordinates &bull; Anna Nagar East, Chennai</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-serif font-bold tracking-tight leading-tight">
              Connect with Our <span className="text-[#E64D16]">Engineers &amp; Architects</span>
            </h1>
            <p className="text-sm sm:text-base text-stone-200 font-normal leading-relaxed">
              Schedule an on-site plot inspection anywhere in Chennai or visit our studio in Anna Nagar East.
            </p>
          </div>
        </div>
      </section>

      {/* ─── Contact Form & Coordinates Section ─── */}
      <section className="py-20 sm:py-24 px-4 sm:px-8 bg-[#FAF9F7] border-b border-stone-200">
        <div className="max-w-7xl mx-auto space-y-16">
          {/* Coordinates Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-7 border border-stone-200 rounded-lg shadow-xs hover:border-[#E64D16] transition-all space-y-3">
              <div className="w-12 h-12 rounded-md bg-orange-100 text-[#E64D16] flex items-center justify-center shadow-xs">
                <Phone className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-stone-900">Direct Telephone</h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                Speak directly with our senior site engineers and estimators.
              </p>
              <div className="pt-2">
                <a
                  href={`tel:+919841098490`}
                  className="text-sm font-bold text-[#E64D16] hover:underline"
                >
                  +91 98410 98490
                </a>
              </div>
            </div>

            <div className="bg-white p-7 border border-stone-200 rounded-lg shadow-xs hover:border-[#E64D16] transition-all space-y-3">
              <div className="w-12 h-12 rounded-md bg-orange-100 text-[#E64D16] flex items-center justify-center shadow-xs">
                <MapPin className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-stone-900">Anna Nagar Studio</h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                {clinicAddress}
              </p>
              <div className="pt-2 text-xs font-semibold text-stone-700">
                Mon &ndash; Sat: 9:30 AM &ndash; 7:30 PM
              </div>
            </div>

            <div className="bg-white p-7 border border-stone-200 rounded-lg shadow-xs hover:border-[#E64D16] transition-all space-y-3">
              <div className="w-12 h-12 rounded-md bg-emerald-100 text-emerald-700 flex items-center justify-center shadow-xs">
                <MessageSquare className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-stone-900">WhatsApp Instant Connect</h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                Send your plot dimensions, location, or drawings directly.
              </p>
              <div className="pt-2">
                <a
                  href={`https://wa.me/${cleanPhone}?text=${encodeURIComponent('Hi ARCH Foundations & Murali Patharala Associates, I would like to schedule a plot consultation in Chennai.')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 hover:underline"
                >
                  <span>Chat on WhatsApp &rarr;</span>
                </a>
              </div>
            </div>
          </div>

          {/* Form */}
          <ConsultationForm phone={clinicPhone} />
        </div>
      </section>

      {/* ─── Frequently Asked Questions ─── */}
      <section className="py-20 sm:py-24 px-4 sm:px-8 bg-white border-b border-stone-200">
        <div className="max-w-4xl mx-auto space-y-12">
          <div className="text-center space-y-3">
            <div className="inline-block px-3.5 py-1 bg-orange-50 text-[#E64D16] text-xs font-bold uppercase tracking-wider rounded-lg border border-orange-200">
              Clear Answers
            </div>
            <h2 className="text-3xl font-serif font-bold text-stone-900 tracking-tight">
              Frequently Asked Questions
            </h2>
            <p className="text-xs sm:text-sm text-stone-600">
              Everything you need to know about our turnkey home construction and architectural services in Chennai.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div key={idx} className="p-6 bg-[#FAF9F7] border border-stone-200 rounded-md space-y-2">
                <h3 className="text-sm font-bold text-stone-900 flex items-start gap-2">
                  <span className="text-[#E64D16] text-base font-black">Q.</span>
                  <span>{faq.q}</span>
                </h3>
                <p className="text-xs text-stone-600 leading-relaxed pl-6">
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
