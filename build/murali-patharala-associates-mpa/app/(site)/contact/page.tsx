import { readSourceConfig } from '@/lib/sourceData';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import OfficeLocations from '../OfficeLocations';

interface PageProps {
  params?: any;
}

export default async function ContactPage({ params }: PageProps) {
  const data = await readSourceConfig(undefined, 'template5');

  if (!data || !data.clinic) {
    notFound();
  }

  const displayPhone = '+91 98410 98490';

  const faqs = [
    {
      q: 'What are the types of Home Interior Services you provide?',
      a: 'We provide End-to-End Luxury Home Interior Services, including Modular Kitchens, false ceilings, architectural lighting solutions, custom-designed walk-in wardrobes, furnishings & decor, wall paneling & painting, Bedroom Interiors, Living Room Interiors, Pooja units, home automation, and upholsteries. We ensure a seamless experience through proper space planning, concept development, and 3D visualization.',
    },
    {
      q: 'What is included in your 10-Year Structural Warranty & Maintenance?',
      a: 'We provide a legally binding 10-year structural certificate covering foundation, RCC columns, beams, roof slabs, and load-bearing masonry against structural settlement or cracks. We strictly utilize primary TMT steel (Tata Tiscon / JSW) and 53-grade certified cement. For interiors, we provide 5 years warranty on 100% BWR Marine Plywood (IS:710) against borer and termites, plus a 2-year maintenance service on all fittings and moving hardware.',
    },
    {
      q: 'How does the 100% Fixed-Price Contract and Zero Cost Escalation Guarantee work?',
      a: 'Before breaking ground, our civil engineers prepare an exhaustive, line-by-line Bill of Quantities (BOQ) covering every bag of cement, ton of steel, plumbing conduit, tile, and fixture. Once signed, your price per square foot is 100% frozen. We absorb all market material inflation so you never pay a single rupee extra for the agreed scope.',
    },
    {
      q: 'How do you monitor site quality and prevent construction delays?',
      a: 'We assign a dedicated, full-time Site Engineer to your project every single day. Every phase undergoes 425+ documented quality checks—including soil bearing capacity, concrete compressive cube testing, slump tests, and curing logs. You receive regular weekly milestone updates with verified photo and video documentation.',
    },
    {
      q: 'What are the different architectural & interior design themes you specialize in?',
      a: 'We specialize in a variety of design languages tailored to Chennai microclimates: Luxury Contemporary (sleek, modern aesthetics with subtle sophistication), Traditional Chettinad (rich South Indian heritage with intricate wood detailing), Minimalist (clean lines and uncluttered open spaces), and Scandinavian (organic woods with abundant natural daylight).',
    },
    {
      q: "What is the step-by-step booking and consultation process?",
      a: "1. Initial Contact: Fill out the enquiry form or call our studio directly. 2. Consultation Call: Our senior architectural expert reviews your plot size, requirements, and budget. 3. Studio Visit & Site Inspection: Meet at our Anna Nagar East studio to review 3D models and material samples, followed by a laser plot assessment. 4. Itemized BOQ & Contract: We provide a transparent quotation with line-by-line material specifications and freeze the price. 5. Construction Kick-Off: A dedicated site engineer is assigned and construction begins.",
    },
  ];

  return (
    <div className="mpa-inner w-full bg-[#FAFAFA] text-[#111111]">
      {/* ── Dedicated Full-Bleed Architectural Hero Banner ── */}
      <section className="relative overflow-hidden border-b-4 border-[#111111] bg-[#121418] text-white pt-32 pb-20 md:pt-40 md:pb-28 px-6 md:px-12">
        {/* Authentic Studio Workspace Background */}
        <Image
          src="/images/architecture/atelier-design-studio.webp"
          alt="Architectural studio workspace with drawing boards, blueprints, and models"
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-85 pointer-events-none select-none"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#121418]/95 via-[#121418]/70 to-[#121418]/25 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#121418]/70 via-transparent to-transparent pointer-events-none" />

        <div className="relative z-10 max-w-5xl mx-auto space-y-8">
          <div className="flex flex-wrap items-center gap-3">
            <span className="px-3 py-1 bg-[#EA580C] text-[#111111] text-[11px] font-bold uppercase tracking-[0.2em]">
              Regional Studios &amp; Consultations
            </span>
            <span className="text-xs font-bold uppercase tracking-widest text-white/70">
              Chennai • Coimbatore • Bangalore • Pondicherry
            </span>
          </div>

          <div className="space-y-4">
            <h1
              className="text-4xl sm:text-6xl md:text-7xl font-bold font-serif leading-[1.05] tracking-tight text-white"
              style={{ fontFamily: "'Lora', serif" }}
            >
              Your home begins <br />
              <em className="text-[#EA580C] not-italic">with a conversation.</em>
            </h1>
            <p className="text-base sm:text-xl text-white/80 max-w-3xl font-medium leading-relaxed">
              Bring your plot dimensions, structural concepts, or sketch ideas. Meet our licensed architects and senior civil engineers for an honest feasibility review, soil insights, and a 100% frozen price per square foot.
            </p>
          </div>

          {/* Studio Credentials Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 py-4 border-y border-white/15 text-xs">
            <div className="space-y-1">
              <span className="text-white/50 uppercase tracking-widest font-semibold block text-[10px]">Head Studio</span>
              <p className="text-white font-bold text-sm">Anna Nagar East, Chennai</p>
              <p className="text-white/70 text-[11px]">W-Block, Near Roundtana</p>
            </div>
            <div className="space-y-1">
              <span className="text-white/50 uppercase tracking-widest font-semibold block text-[10px]">Direct Studio Hotline</span>
              <a href={`tel:${displayPhone}`} className="text-[#EA580C] font-bold text-sm hover:underline block">
                {displayPhone}
              </a>
              <p className="text-white/70 text-[11px]">Mon – Sat: 9:30 AM – 7:30 PM</p>
            </div>
            <div className="space-y-1">
              <span className="text-white/50 uppercase tracking-widest font-semibold block text-[10px]">Turnkey Delivery</span>
              <p className="text-white font-bold text-sm">MPA + ARCH Foundation</p>
              <p className="text-white/70 text-[11px]">Integrated Design &amp; Civil Build</p>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
            <a
              href={`https://wa.me/919841098490?text=${encodeURIComponent('Hi Murali Patharala & Associates (MPA), I would like to schedule an architectural consultation for my residential project.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto text-center px-6 py-3 bg-[#EA580C] text-[#111111] font-bold uppercase tracking-wider text-xs hover:bg-white transition-colors"
            >
              WhatsApp Senior Engineer
            </a>
            <a
              href="#enquiry"
              className="w-full sm:w-auto text-center px-6 py-3 border border-white/40 text-white font-bold uppercase tracking-wider text-xs hover:bg-white hover:text-[#111111] transition-colors"
            >
              Schedule Consultation ↓
            </a>
          </div>
        </div>
      </section>

      {/* ── Multi-city office network ── */}
      <OfficeLocations phone={displayPhone} />

      {/* ── Contact Form Section ── */}
      <section id="enquiry" className="relative scroll-mt-28 py-20 md:py-28 px-6 md:px-12 border-b-4 border-[#111111] bg-[#121418] text-white overflow-hidden">
        {/* Background architectural studio image */}
        <Image
          src="/images/architecture/architect-studio-model.webp"
          alt=""
          fill
          sizes="100vw"
          className="object-cover opacity-85 pointer-events-none select-none"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#121418]/90 via-[#121418]/60 to-[#121418]/30 pointer-events-none" />
        <div className="relative z-10 max-w-4xl mx-auto space-y-12">
          <div className="text-center">
            <p className="text-xs font-bold tracking-[0.2em] uppercase text-[#EA580C] mb-3">GET A QUOTE</p>
            <h2
              className="text-3xl sm:text-4xl font-bold font-serif text-white"
              style={{ fontFamily: "'Lora', serif" }}
            >
              Request a Free Consultation
            </h2>
            <p className="text-sm text-white/70 mt-2">
              Tell us where your project stands today. The right MPA or ARCH Foundation team will review it and get back to you within 24 hours.
            </p>
          </div>

          <div className="bg-[#FAFAFA] border border-[#D8D2C8] overflow-hidden flex justify-center">
            <iframe 
              src="https://docs.google.com/forms/d/e/1FAIpQLScTETlX3b5-sJb-jsJXL1hG0vRR0iGfsYOLWnXoUmaMLJVf_A/viewform?embedded=true" 
              width="100%" 
              height="1080"
              frameBorder={0} 
              marginHeight={0} 
              marginWidth={0}
              className="w-full max-w-[640px] bg-transparent mx-auto"
              title="Contact Form"
            >
              Loading…
            </iframe>
          </div>
          <p className="text-center text-sm text-white/70">
            Prefer a separate window?{' '}
            <a className="text-[#FB923C] underline underline-offset-4" href="https://docs.google.com/forms/d/e/1FAIpQLScTETlX3b5-sJb-jsJXL1hG0vRR0iGfsYOLWnXoUmaMLJVf_A/viewform" target="_blank" rel="noopener noreferrer">Open the enquiry form ↗</a>
          </p>
        </div>
      </section>

      {/* ── Architectural FAQ Section (Adapted from Deejos) ── */}
      <section className="py-20 md:py-28 px-6 md:px-12 border-b-4 border-[#111111] bg-[#FAFAFA]">
        <div className="max-w-4xl mx-auto space-y-12">
          <div className="text-center">
            <p className="text-xs font-bold tracking-[0.2em] uppercase text-[#EA580C] mb-3">HAVE QUESTIONS?</p>
            <h2
              className="text-3xl sm:text-4xl font-bold font-serif text-[#111111]"
              style={{ fontFamily: "'Lora', serif" }}
            >
              Frequently Asked Questions
            </h2>
            <p className="text-sm text-[#666666] mt-2">
              Here are answers to the most common questions from homeowners planning to build in Chennai.
            </p>
          </div>

          <div className="mpa-faq">
            {faqs.map((faq, idx) => (
              <details key={idx}>
                <summary>{faq.q}</summary>
                <p>{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
