import { ReactNode } from 'react';
import Link from 'next/link';
import { readSourceConfig } from '@/lib/sourceData';
import { cleanClinicName, cleanClinicDescription } from '@/lib/copyCleaner';
import { notFound } from 'next/navigation';
import ClientNavbar from './ClientNavbar';
import FloatingActions from './FloatingActions';
import { 
  Phone, Mail, MapPin, ShieldCheck, Compass, Building2, Award, 
  Clock, ArrowRight, Sparkles, CheckCircle2, MessageSquare
} from 'lucide-react';

interface LayoutProps {
  children: ReactNode;
  params?: any;
}

export async function generateMetadata({ params }: { params?: any }) {
  return {
    title: 'ARCH Foundations & Murali Patharala Associates (MPA) | Architects & Builders Chennai',
    description: 'Architecture & Interior Design Consultants | Builders, Constructions & Property Developers. 28+ years of residential construction and architectural design excellence in Chennai since 1998.',
  };
}

export default async function Template5Layout({ children, params }: LayoutProps) {
  const slug = '';
  const data = await readSourceConfig(undefined, 'template5');

  if (!data || !data.clinic) {
    notFound();
  }

  const clinicPhone = '98410 98490';
  const clinicEmail = 'archfoundations.mpa@gmail.com';
  const clinicAddress = 'W115A, 3rd Ave, Annanagar East, Chennai, Tamil Nadu 600040';
  const basePath = '';

  const cleanPhone = `91${clinicPhone.replace(/\D/g, '')}`;

  return (
    <div className="min-h-screen bg-[#FAF9F7] text-[#1A1B1A] flex flex-col font-sans selection:bg-[#E64D16] selection:text-white antialiased">
      {/* ─── Architectural Sticky Navbar ─── */}
      <ClientNavbar
        slug={slug}
        clinicName="Murali Patharala & Associates"
        phone="+91 98410 98490"
        basePath={basePath}
      />

      {/* ─── Main Dynamic Page Content ─── */}
      <main className="flex-1 w-full">
        {children}
      </main>

      {/* ─── Floating WhatsApp / Call Actions (deejos-style) ─── */}
      <FloatingActions />

      {/* ─── Architectural Agency Footer (Deep Charcoal with Orange & Gold Accents) ─── */}
      <footer className="bg-[#1A1B1A] text-[#E4E4E7] border-t border-stone-800">
        {/* Top Callout Strip (Deejos-style consultation callout) */}
        <div className="border-b border-stone-800/80 py-12 px-4 sm:px-8 bg-gradient-to-r from-[#242624] via-[#2D2F2D] to-[#242624]">
          <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-8">
            <div className="space-y-2 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-stone-700/60 rounded-full text-xs font-semibold text-[#E64D16] tracking-wider uppercase">
                <Sparkles className="w-3.5 h-3.5 text-[#E64D16]" />
                <span>Begin Your Construction &amp; Architecture Journey</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-tight">
                Ready to build or design your dream home in <span className="text-[#E64D16]">Chennai?</span>
              </h3>
              <p className="text-xs sm:text-sm text-stone-400 font-light leading-relaxed">
                Connect directly with our senior architects and structural engineers for a complimentary plot feasibility inspection, 2D floor planning, and itemized construction quote.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <a
                href={`tel:+919841098490`}
                className="px-7 py-3.5 bg-[#E64D16] hover:bg-[#C93F0F] text-white font-bold text-xs uppercase tracking-widest rounded-md shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all flex items-center gap-2.5"
              >
                <Phone className="w-4 h-4" />
                <span>Call Studio: 98410 98490</span>
              </a>
              <Link
                href={`${basePath}#consultation-form`}
                className="px-7 py-3.5 bg-white/10 hover:bg-white/15 text-white font-semibold text-xs uppercase tracking-widest rounded-md border border-stone-700 hover:border-stone-500 transition-all flex items-center gap-2"
              >
                <span>Get A Free Quote</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#E6C673]" />
              </Link>
            </div>
          </div>
        </div>

        {/* Multi-Column Grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12">
            {/* Column 1: Brand & Firm Profile (5 cols) */}
            <div className="lg:col-span-5 space-y-6">
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-md bg-[#242624] flex flex-col items-center justify-center shadow-md border border-stone-700 relative overflow-hidden">
                  <span className="font-serif font-black text-xl leading-none text-[#E64D16] tracking-tighter">M</span>
                  <span className="text-[7px] font-extrabold tracking-[0.2em] text-[#B8934B] uppercase mt-0.5">MPA</span>
                  <span className="absolute bottom-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#E64D16] to-[#B8934B]" />
                </div>
                <div>
                  <span className="text-lg sm:text-xl font-bold tracking-tight text-white block">
                    ARCH foundations
                  </span>
                  <span className="text-xs text-stone-300 font-medium block">
                    murali patharala &amp; associates (mpa)
                  </span>
                  <span className="text-[10px] tracking-widest uppercase text-[#C9A25C] font-bold">
                    Since 1998 &bull; Architects &amp; Builders
                  </span>
                </div>
              </div>

              <p className="text-xs text-stone-300 font-light leading-relaxed max-w-md">
                A premier integrated architecture and construction firm in Chennai. From CMDA-compliant 3D elevations and structural engineering to turnkey civil construction and luxury modular interiors, we build with unwavering precision and zero budget escalations.
              </p>

              <div className="flex flex-wrap gap-2.5 pt-1">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/5 border border-stone-800 rounded-lg text-[11px] text-[#C9A25C] font-medium">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#E64D16]" />
                  <span>10-Year Structural Guarantee</span>
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/5 border border-stone-800 rounded-lg text-[11px] text-stone-300 font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#E64D16]" />
                  <span>400+ Quality Checklist</span>
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/5 border border-stone-800 rounded-lg text-[11px] text-stone-300 font-medium">
                  <Building2 className="w-3.5 h-3.5 text-[#C9A25C]" />
                  <span>Dedicated Site Engineer</span>
                </span>
              </div>
            </div>

            {/* Column 2: 3 Core Pillars & Links (3 cols) */}
            <div className="lg:col-span-3 space-y-4">
              <h4 className="text-xs uppercase tracking-[0.25em] text-[#C9A25C] font-bold border-b border-stone-800 pb-2.5">
                Our Services
              </h4>
              <ul className="space-y-2.5 text-xs text-stone-300 font-light">
                <li>
                  <Link href={`${basePath}/services#architecture`} className="hover:text-[#E64D16] hover:translate-x-1 inline-flex items-center gap-2 transition-all">
                    <span className="text-[#E64D16] text-xs">&#9656;</span>
                    <span>Architectural 3D Elevations &amp; Plans</span>
                  </Link>
                </li>
                <li>
                  <Link href={`${basePath}/services#construction`} className="hover:text-[#E64D16] hover:translate-x-1 inline-flex items-center gap-2 transition-all">
                    <span className="text-[#E64D16] text-xs">&#9656;</span>
                    <span>Turnkey Residential Construction</span>
                  </Link>
                </li>
                <li>
                  <Link href={`${basePath}/services#interiors`} className="hover:text-[#E64D16] hover:translate-x-1 inline-flex items-center gap-2 transition-all">
                    <span className="text-[#E64D16] text-xs">&#9656;</span>
                    <span>Modular Kitchens &amp; Luxury Interiors</span>
                  </Link>
                </li>
                <li>
                  <Link href={`${basePath}#packages`} className="hover:text-[#E64D16] hover:translate-x-1 inline-flex items-center gap-2 transition-all">
                    <span className="text-[#E64D16] text-xs">&#9656;</span>
                    <span>Home Construction Packages (2026)</span>
                  </Link>
                </li>
                <li>
                  <Link href={`${basePath}#cost-calculator`} className="hover:text-[#E64D16] hover:translate-x-1 inline-flex items-center gap-2 transition-all">
                    <span className="text-[#E64D16] text-xs">&#9656;</span>
                    <span>Construction Cost Calculator</span>
                  </Link>
                </li>
                <li>
                  <Link href={`${basePath}/gallery`} className="hover:text-[#E64D16] hover:translate-x-1 inline-flex items-center gap-2 transition-all">
                    <span className="text-[#E64D16] text-xs">&#9656;</span>
                    <span>Completed Sites &amp; 3D Designs</span>
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 3: Studio Coordinates & Hours (4 cols) */}
            <div className="lg:col-span-4 space-y-4">
              <h4 className="text-xs uppercase tracking-[0.25em] text-[#C9A25C] font-bold border-b border-stone-800 pb-2.5">
                Chennai Studio Coordinates
              </h4>
              <div className="space-y-3 text-xs text-stone-300 font-light">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-[#E64D16] shrink-0 mt-0.5" />
                  <span className="leading-relaxed font-normal">
                    {clinicAddress}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-[#E64D16] shrink-0" />
                  <a href="tel:+919841098490" className="hover:text-white font-semibold transition-colors text-[#E64D16]">
                    +91 98410 98490
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-[#E64D16] shrink-0" />
                  <a href={`mailto:${clinicEmail}`} className="hover:text-white transition-colors truncate">
                    {clinicEmail}
                  </a>
                </div>
                <div className="flex items-center gap-3 text-[#C9A25C] text-[11px] pt-1">
                  <Clock className="w-4 h-4 shrink-0 text-[#C9A25C]" />
                  <span>Mon &ndash; Sat: 09:30 AM &ndash; 07:30 PM (Consultation by Appointment)</span>
                </div>
              </div>

              <div className="pt-2">
                <a
                  href={`https://wa.me/${cleanPhone}?text=${encodeURIComponent('Hi ARCH Foundations & Murali Patharala Associates, I would like to book a site survey.')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-700/80 hover:bg-emerald-600 text-white rounded-lg text-xs font-semibold transition-colors"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>WhatsApp Direct Connect</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Embedded Google Maps Location */}
        <div className="max-w-7xl mx-auto px-4 sm:px-8 pb-12">
          <div className="w-full h-60 sm:h-64 border border-stone-800 overflow-hidden rounded-md bg-[#141514] relative shadow-lg">
            <iframe
              title="ARCH Foundations & Murali Patharala Associates Studio Location"
              src="https://maps.google.com/maps?q=murali%20patharala%20%26%20associates%20(%20mpa)%20murali%20patharala%20%26%20associates(mpa%20W115A%2C%203rd%20Ave%2C%20Annanagar%20East%2C%20Chennai%2C%20Tamil%20Nadu%20600040&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0, filter: 'contrast(1.05) grayscale(0.15)' }}
              allowFullScreen={false}
              loading="lazy"
            />
            <div className="absolute top-3 left-3 bg-[#1A1B1A]/95 backdrop-blur-md text-white px-3.5 py-1.5 border border-stone-700 text-xs font-medium flex items-center gap-2 rounded-lg shadow-md">
              <MapPin className="w-3.5 h-3.5 text-[#E64D16]" />
              <span>Studio &amp; Office: Anna Nagar East, Chennai</span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-8 pb-10 pt-2">
          <div className="border-t border-stone-800 pt-6 flex flex-wrap items-center justify-between gap-4 text-xs text-stone-400 font-light">
            <div>
              &copy; {new Date().getFullYear()}{' '}ARCH Foundations &amp; Murali Patharala Associates (MPA). All rights reserved.
            </div>
            <div className="flex items-center gap-3 text-[#C9A25C] text-[11px] tracking-wider uppercase font-semibold">
              <span>Anna Nagar East, Chennai</span>
              <span>&bull;</span>
              <span>Since 1998</span>
              <span>&bull;</span>
              <span>100% Fixed Price</span>
              <span>&bull;</span>
              <span>10-Year Warranty</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
