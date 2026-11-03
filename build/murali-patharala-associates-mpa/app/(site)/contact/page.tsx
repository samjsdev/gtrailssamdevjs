import BrandText from '@/components/BrandText';
import EnquiryForm from '@/components/EnquiryForm';
import { CONTACT_LINKS } from '@/lib/contactLinks';
import type { Metadata } from 'next';
import { readSourceConfig } from '@/lib/sourceData';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import OfficeLocations from '../OfficeLocations';
import { STUDIO } from '@/lib/clientProfile';
import { ArrowUpRight, MapPin, Phone } from 'lucide-react';
import { FacebookIcon, InstagramIcon, WhatsAppIcon } from '@/components/SocialLinks';

export const metadata: Metadata = {
  title: 'Contact Architectural Studio Anna Nagar | MPA Chennai',
  description:
    'Schedule an architectural consultation, site survey, or luxury interior review at our Anna Nagar East studio in Chennai. Call +91 98410 98490.',
  keywords: [
    'contact architects chennai',
    'anna nagar architecture office',
    'book architectural consultation chennai',
    'construction quotation chennai',
    'interior designer consultation anna nagar',
  ],
  alternates: {
    canonical: '/contact/',
  },
  openGraph: {
    title: 'Contact Murali Patharala & Associates | Anna Nagar East, Chennai',
    description:
      'Visit our design studio or reach our architects directly at +91 98410 98490 for custom drawings, construction estimates, or interior consultations.',
    url: 'https://muralipatharalaassociates.com/contact/',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Contact Murali Patharala & Associates',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact Studio | Murali Patharala & Associates Chennai',
    description:
      'Schedule your architectural consultation or site visit in Chennai. Call +91 98410 98490.',
    images: ['/og-image.png'],
  },
};

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
    "q": "What types of projects do you work on?",
    "a": "MPA provides architecture and interior design for residential, commercial and institutional projects. ARCH foundations provides construction, civil works, property development and turnkey delivery."
  },
  {
    "q": "What should I bring to the first discussion?",
    "a": "Share your site location, available drawings or dimensions, intended use, priorities and approximate budget. These help the studio understand the brief."
  },
  {
    "q": "Can you assist with tenders and contractor selection?",
    "a": "Yes. The consultancy services include tender documentation, bid evaluation, contractor selection and contract finalisation."
  },
  {
    "q": "Do you provide technical and approval coordination?",
    "a": "Services include structural and MEP coordination, fire-safety documentation, generator and AC load calculations, and liaison for CMDA, DTCP, permits and NOCs according to the project requirements."
  },
  {
    "q": "How are fees, specifications and timelines agreed?",
    "a": "The team reviews your requirements before preparing a written proposal. That proposal defines the services, deliverables, fees, responsibilities and programme for the commission."
  },
  {
    "q": "Do you provide support after construction?",
    "a": "Post-occupancy evaluation can assess building performance and user satisfaction after handover. Discuss the required scope with the studio."
  }
];

  return (
    <div className="mpa-inner w-full bg-surface-cream text-[#111111]">
      {/* ── Dedicated Full-Bleed Architectural Hero Banner ── */}
      <section className="relative overflow-hidden border-b-4 border-[#111111] bg-[#121418] text-white pt-32 pb-20 md:pt-40 md:pb-28 px-6 md:px-12">
        {/* Authentic Studio Workspace Background */}
        <Image
          src="/images/architecture/architectural-blueprint-draft.webp"
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
              Studio &amp; Project Enquiries
            </span>
            <span className="text-xs font-bold uppercase tracking-widest text-white/70">
              Anna Nagar East • Chennai
            </span>
          </div>

          <div className="space-y-4">
            <h1
              className="text-4xl sm:text-6xl md:text-7xl font-bold font-serif leading-[1.05] tracking-tight text-white"
              style={{ fontFamily: "var(--font-content)" }}
            >
              Your project begins <br />
              <em className="text-[#EA580C] not-italic">with a conversation.</em>
            </h1>
            <p className="text-base sm:text-xl text-white/80 max-w-3xl font-medium leading-relaxed">
              Bring your site information, drawings or initial ideas. Discuss architecture, interior design, construction or property development with our Chennai studio.
            </p>
          </div>

          {/* Studio Credentials Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 py-4 border-y border-white/15 text-xs">
            <div className="space-y-1">
              <span className="text-white/50 uppercase tracking-widest font-semibold block text-[10px]">Head Studio Address</span>
              <p className="text-white font-bold text-sm">Anna Nagar East, Chennai</p>
              <p className="text-white/70 text-[11px]">W115A, AL Complex, 3rd Avenue, W Block</p>
            </div>
            <div className="space-y-1">
              <span className="text-white/50 uppercase tracking-widest font-semibold block text-[10px]">Direct Studio Hotline</span>
              <a href={`tel:${displayPhone}`} className="text-[#EA580C] font-bold text-sm hover:underline block">
                {displayPhone}
              </a>
              <a href="tel:+918778104969" className="block text-white/70 text-[11px] hover:text-white">+91 87781 04969</a>
            </div>
            <div className="space-y-1">
              <span className="text-white/50 uppercase tracking-widest font-semibold block text-[10px]">WhatsApp &amp; Social</span>
              <a
                href={CONTACT_LINKS.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#25D366] font-bold text-sm hover:underline block"
              >
                {CONTACT_LINKS.whatsappPhone}
              </a>
              <div className="flex items-center gap-2 text-white/75 text-[11px]">
                <a href={CONTACT_LINKS.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-[#EA580C] underline underline-offset-2">Instagram</a>
                <span>•</span>
                <a href={CONTACT_LINKS.facebook} target="_blank" rel="noopener noreferrer" className="hover:text-[#EA580C] underline underline-offset-2">Facebook</a>
              </div>
            </div>
            <div className="space-y-1">
              <span className="text-white/50 uppercase tracking-widest font-semibold block text-[10px]">Turnkey Delivery</span>
              <p className="text-white font-bold text-sm">MPA + <span className="brand-name">ARCH foundations</span></p>
              <p className="text-white/70 text-[11px]">Integrated Design &amp; Civil Build</p>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
            <a
              href={`${CONTACT_LINKS.whatsapp}?text=${encodeURIComponent('Hi Murali Patharala & Associates (MPA), I would like to schedule an architectural consultation for my project.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto text-center px-6 py-3 bg-[#EA580C] text-[#111111] font-bold uppercase tracking-wider text-xs hover:bg-white transition-colors"
            >
              WhatsApp the studio (+91 877 810 4969)
            </a>
            <a
              href="#contact-address"
              className="w-full sm:w-auto text-center px-6 py-3 border border-white/40 text-white font-bold uppercase tracking-wider text-xs hover:bg-white hover:text-[#111111] transition-colors"
            >
              Contact Address &amp; Channels ↓
            </a>
          </div>
        </div>
      </section>

      {/* ── Dedicated Contact Address & Social Channels Section ── */}
      <section id="contact-address" className="scroll-mt-24 border-b-4 border-[#111111] bg-surface-cream px-6 py-16 md:px-12 md:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 text-center md:text-left">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#C2410C]">Direct Reach</p>
            <h2
              className="mt-2 font-serif text-3xl font-bold tracking-tight text-[#111111] sm:text-4xl md:text-5xl"
              style={{ fontFamily: 'var(--font-content)' }}
            >
              Contact Address &amp; Channels
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[#55534E]">
              Visit our central studio in Anna Nagar East, connect instantly on WhatsApp Web, or follow our ongoing site execution across Instagram and Facebook.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {/* 1. Contact Address */}
            <div className="flex flex-col justify-between border border-[#111111]/20 bg-surface-sand p-6 transition-all hover:border-[#C2410C]">
              <div>
                <div className="mb-4 inline-flex size-10 items-center justify-center rounded-full bg-[#111111] text-[#FB923C]">
                  <MapPin size={20} aria-hidden="true" />
                </div>
                <span className="block text-[10px] font-bold uppercase tracking-[0.18em] text-[#C2410C]">Contact Address</span>
                <h3 className="mt-1 font-serif text-xl font-bold text-[#111111]">Head Studio</h3>
                <p className="mt-3 text-xs font-medium leading-relaxed text-[#302A20]">
                  {STUDIO.address}
                </p>
              </div>
              <div className="mt-6 border-t border-[#111111]/15 pt-4">
                <a
                  href="https://maps.google.com/?q=murali+patharala+%26+associates+W115A+AL+Complex+Anna+Nagar+East+Chennai"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C2410C] hover:underline"
                >
                  Open in Google Maps <ArrowUpRight size={14} aria-hidden="true" />
                </a>
              </div>
            </div>

            {/* 2. WhatsApp Web */}
            <div className="flex flex-col justify-between border border-[#111111]/20 bg-surface-sand p-6 transition-all hover:border-[#25D366]">
              <div>
                <div className="mb-4 inline-flex size-10 items-center justify-center rounded-full bg-[#25D366] text-white">
                  <WhatsAppIcon size={20} className="text-white" aria-hidden="true" />
                </div>
                <span className="block text-[10px] font-bold uppercase tracking-[0.18em] text-[#25D366]">WhatsApp Web &amp; Mobile</span>
                <h3 className="mt-1 font-serif text-xl font-bold text-[#111111]">+91 877 810 4969</h3>
                <p className="mt-3 text-xs font-medium leading-relaxed text-[#55534E]">
                  Share site sketches, ask fee estimates, or start a direct conversation with our architects and site engineers.
                </p>
              </div>
              <div className="mt-6 border-t border-[#111111]/15 pt-4">
                <a
                  href={`${CONTACT_LINKS.whatsapp}?text=${encodeURIComponent('Hi Murali Patharala & Associates (MPA), I am reaching out from your website.')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#25D366] hover:underline"
                >
                  Chat on WhatsApp Web <ArrowUpRight size={14} aria-hidden="true" />
                </a>
              </div>
            </div>

            {/* 3. Instagram */}
            <div className="flex flex-col justify-between border border-[#111111]/20 bg-surface-sand p-6 transition-all hover:border-[#E1306C]">
              <div>
                <div className="mb-4 inline-flex size-10 items-center justify-center rounded-full bg-[#E1306C] text-white">
                  <InstagramIcon size={20} className="text-white" aria-hidden="true" />
                </div>
                <span className="block text-[10px] font-bold uppercase tracking-[0.18em] text-[#E1306C]">Instagram</span>
                <h3 className="mt-1 font-serif text-xl font-bold text-[#111111]">@mpaarchitects</h3>
                <p className="mt-3 text-xs font-medium leading-relaxed text-[#55534E]">
                  Follow our daily project reels, material selections, on-site concrete pours, and completed villa walkthroughs.
                </p>
              </div>
              <div className="mt-6 border-t border-[#111111]/15 pt-4">
                <a
                  href={CONTACT_LINKS.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#E1306C] hover:underline"
                >
                  Follow on Instagram <ArrowUpRight size={14} aria-hidden="true" />
                </a>
              </div>
            </div>

            {/* 4. Facebook */}
            <div className="flex flex-col justify-between border border-[#111111]/20 bg-surface-sand p-6 transition-all hover:border-[#1877F2]">
              <div>
                <div className="mb-4 inline-flex size-10 items-center justify-center rounded-full bg-[#1877F2] text-white">
                  <FacebookIcon size={20} className="text-white" aria-hidden="true" />
                </div>
                <span className="block text-[10px] font-bold uppercase tracking-[0.18em] text-[#1877F2]">Facebook</span>
                <h3 className="mt-1 font-serif text-xl font-bold text-[#111111]">MPA Official</h3>
                <p className="mt-3 text-xs font-medium leading-relaxed text-[#55534E]">
                  Connect with our community, view client reviews, architectural portfolio updates, and milestone announcements.
                </p>
              </div>
              <div className="mt-6 border-t border-[#111111]/15 pt-4">
                <a
                  href={CONTACT_LINKS.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1877F2] hover:underline"
                >
                  Visit Facebook Page <ArrowUpRight size={14} aria-hidden="true" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Multi-city office network ── */}
      <OfficeLocations phone={displayPhone} />

      {/* ── Contact Form Section ── */}
      <section id="enquiry" className="relative scroll-mt-28 py-20 md:py-28 px-6 md:px-12 border-b-4 border-[#111111] bg-surface-sand text-[#302A20] overflow-hidden">
        <div className="relative z-10 max-w-4xl mx-auto space-y-12">
          <div className="text-center">
            <p className="text-xs font-bold tracking-[0.2em] uppercase text-[#703015] mb-3">GET A QUOTE</p>
            <h2
              className="text-3xl sm:text-4xl font-bold font-serif text-[#302A20]"
              style={{ fontFamily: "var(--font-content)" }}
            >
              Request a Consultation
            </h2>
            <p className="text-sm text-ink-muted mt-2">
              Share your project location and requirements. We’ll help you plan the next step.
            </p>
          </div>

          <EnquiryForm />
        </div>
      </section>

      {/* ── Project enquiry questions ── */}
      <section className="py-20 md:py-28 px-6 md:px-12 border-b-4 border-[#111111] bg-surface-cream">
        <div className="max-w-4xl mx-auto space-y-12">
          <div className="text-center">
            <p className="text-xs font-bold tracking-[0.2em] uppercase text-[#703015] mb-3">HAVE QUESTIONS?</p>
            <h2
              className="text-3xl sm:text-4xl font-bold font-serif text-[#111111]"
              style={{ fontFamily: "var(--font-content)" }}
            >
              Frequently Asked Questions
            </h2>
            <p className="text-sm text-[#666666] mt-2">
              Answers to common questions about our consultancy, construction services and project proposals.
            </p>
          </div>

          <div className="mpa-faq">
            {faqs.map((faq, idx) => (
              <details key={idx}>
                <summary>{faq.q}</summary>
                <p><BrandText>{faq.a}</BrandText></p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
