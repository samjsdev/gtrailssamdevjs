import { ReactNode } from 'react';
import Link from 'next/link';
import { readSourceConfig } from '@/lib/dataBuilder';
import { cleanClinicName, cleanClinicDescription } from '@/lib/copyCleaner';
import { notFound } from 'next/navigation';
import ClientNavbar from './ClientNavbar';
import { 
  Phone, Mail, MapPin, ShieldCheck, Compass, Building, Award, 
  Clock, ArrowRight, Layers, FileCheck, CheckCircle2 
} from 'lucide-react';

interface LayoutProps {
  children: ReactNode;
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const { slug } = resolvedParams;
  const data = await readSourceConfig(slug, 'template10');

  if (!data || !data.clinic) {
    return {
      title: 'Architectural & Residential Construction Experts',
      description: 'End-to-end Architectural Design, Turnkey Residential Construction, and Bespoke Interior Execution.',
    };
  }

  const clinicName = cleanClinicName(data.clinic.name);
  const clinicTagline = data.clinic.tagline || 'End-to-End Architectural Design & Residential Construction';
  const clinicDescription = cleanClinicDescription(data.clinic.description, data.clinic.name);

  return {
    title: `${clinicName} | Architectural Design & Residential Construction Firm`,
    description: `${clinicTagline}. ${clinicDescription.slice(0, 160)}...`,
  };
}

export default async function Template10Layout({ children, params }: LayoutProps) {
  const resolvedParams = await params;
  const { slug } = resolvedParams;
  const data = await readSourceConfig(slug, 'template10');

  if (!data || !data.clinic) {
    notFound();
  }

  const clinicName = cleanClinicName(data.clinic.name);
  const clinicPhone = data.clinic.contact?.phone || '+91 98400 12345';
  const clinicEmail = data.clinic.contact?.email || 'contact@architecturalconstruction.com';
  const clinicAddress = data.clinic.address?.full || 'Industrial Design Studio & Engineering Center, Prime City Road';
  const clinicTagline = data.clinic.tagline || 'A Turnkey Architecture & Residential Construction Enterprise';
  const clinicDescription = cleanClinicDescription(data.clinic.description, data.clinic.name);

  const basePath = `/designwebsite/template10/${slug}`;

  return (
    <div className="min-h-screen bg-[#111111] text-[#F4F3EE] flex flex-col font-sans selection:bg-[#E94B26] selection:text-[#F4F3EE] antialiased">
      {/* Heavy Industrial Navigation Header */}
      <ClientNavbar
        slug={slug}
        clinicName={clinicName}
        phone={clinicPhone}
        basePath={basePath}
      />

      {/* Main Content Area */}
      <main className="flex-1 w-full">
        {children}
      </main>

      {/* Industrial Architectural Footer */}
      <footer className="bg-[#111111] border-t-4 border-[#252A29] text-[#F4F3EE]">
        {/* Top Highlight Banner */}
        <div className="bg-[#181B1A] border-b-2 border-[#252A29] py-8 px-4 sm:px-8">
          <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-[#E94B26] text-[#F4F3EE] flex items-center justify-center font-black text-2xl border border-[#111111] shadow-[3px_3px_0px_#C8A84E]">
                <Building className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-lg sm:text-xl font-black uppercase text-[#F4F3EE] tracking-tight">
                  PLANNING TO BUILD YOUR DREAM RESIDENCE?
                </h4>
                <p className="text-xs font-mono text-[#C8A84E] tracking-wider">
                  SCHEDULE A COMPREHENSIVE ON-SITE SPATIAL & STRUCTURAL CONSULTATION
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <a
                href={`tel:${clinicPhone.replace(/[^0-9+]/g, '')}`}
                className="px-6 py-3.5 bg-[#E94B26] text-[#F4F3EE] font-black text-xs uppercase tracking-widest border border-[#111111] shadow-[4px_4px_0px_#111111] hover:shadow-[1px_1px_0px_#111111] hover:translate-x-[2px] hover:translate-y-[2px] transition-all flex items-center gap-2"
              >
                <Phone className="w-4 h-4" />
                <span>CALL DIRECT: {clinicPhone}</span>
              </a>
            </div>
          </div>
        </div>

        {/* Multi-Column Grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {/* Column 1: Brand & Firm Profile */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#E94B26] text-[#F4F3EE] font-black text-xl flex items-center justify-center border border-[#111111]">
                  {clinicName.charAt(0).toUpperCase()}
                </div>
                <div className="flex flex-col">
                  <span className="text-lg font-black uppercase tracking-tight text-[#F4F3EE]">
                    {clinicName}
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#C8A84E]">
                    ARCHITECTS & BUILDERS
                  </span>
                </div>
              </div>
              <p className="text-xs text-[#F4F3EE]/75 leading-relaxed font-sans">
                {clinicDescription.slice(0, 190)}...
              </p>
              <div className="pt-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#252A29] text-[#C8A84E] text-[10px] font-bold uppercase tracking-widest border border-[#C8A84E]/40">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#E94B26]" />
                  10-YEAR STRUCTURAL WARRANTY
                </span>
              </div>
            </div>

            {/* Column 2: 3 Core Pillars */}
            <div className="space-y-3">
              <h4 className="text-xs font-black uppercase tracking-[0.25em] text-[#C8A84E] border-b-2 border-[#252A29] pb-2">
                OUR THREE CORE PILLARS
              </h4>
              <ul className="space-y-2 text-xs font-mono text-[#F4F3EE]/80">
                <li className="flex items-center gap-2 hover:text-[#E94B26] transition-colors">
                  <span className="text-[#E94B26] font-bold">&gt;</span>
                  <Link href={`${basePath}/services`}>Architectural 3D BIM & Elevations</Link>
                </li>
                <li className="flex items-center gap-2 hover:text-[#E94B26] transition-colors">
                  <span className="text-[#E94B26] font-bold">&gt;</span>
                  <Link href={`${basePath}/services`}>Turnkey Residential Construction</Link>
                </li>
                <li className="flex items-center gap-2 hover:text-[#E94B26] transition-colors">
                  <span className="text-[#E94B26] font-bold">&gt;</span>
                  <Link href={`${basePath}/services`}>Bespoke Luxury Interior Fitouts</Link>
                </li>
                <li className="flex items-center gap-2 hover:text-[#E94B26] transition-colors">
                  <span className="text-[#E94B26] font-bold">&gt;</span>
                  <Link href={`${basePath}/services`}>Structural Engineering & Soil Audits</Link>
                </li>
                <li className="flex items-center gap-2 hover:text-[#E94B26] transition-colors">
                  <span className="text-[#E94B26] font-bold">&gt;</span>
                  <Link href={`${basePath}/services`}>Building Sanctions & Approvals</Link>
                </li>
              </ul>
            </div>

            {/* Column 3: Quick Direct Navigation */}
            <div className="space-y-3">
              <h4 className="text-xs font-black uppercase tracking-[0.25em] text-[#C8A84E] border-b-2 border-[#252A29] pb-2">
                PROJECTS & ESTIMATION
              </h4>
              <ul className="space-y-2 text-xs font-mono text-[#F4F3EE]/80">
                <li className="flex items-center gap-2 hover:text-[#E94B26] transition-colors">
                  <span className="text-[#E94B26] font-bold">&gt;</span>
                  <Link href={`${basePath}#cost-calculator`}>Construction Cost Calculator</Link>
                </li>
                <li className="flex items-center gap-2 hover:text-[#E94B26] transition-colors">
                  <span className="text-[#E94B26] font-bold">&gt;</span>
                  <Link href={`${basePath}#packages`}>Standard, Premium & Luxury Packages</Link>
                </li>
                <li className="flex items-center gap-2 hover:text-[#E94B26] transition-colors">
                  <span className="text-[#E94B26] font-bold">&gt;</span>
                  <Link href={`${basePath}/gallery`}>Completed Villa Projects Showcase</Link>
                </li>
                <li className="flex items-center gap-2 hover:text-[#E94B26] transition-colors">
                  <span className="text-[#E94B26] font-bold">&gt;</span>
                  <Link href={`${basePath}/about`}>Chief Architect & Engineering Team</Link>
                </li>
                <li className="flex items-center gap-2 hover:text-[#E94B26] transition-colors">
                  <span className="text-[#E94B26] font-bold">&gt;</span>
                  <Link href={`${basePath}/contact`}>Book Technical Site Inspection</Link>
                </li>
              </ul>
            </div>

            {/* Column 4: Contact & Office Coordinates */}
            <div className="space-y-3">
              <h4 className="text-xs font-black uppercase tracking-[0.25em] text-[#C8A84E] border-b-2 border-[#252A29] pb-2">
                HEAD OFFICE & COORDINATES
              </h4>
              <div className="space-y-3 text-xs text-[#F4F3EE]/85 font-mono">
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-[#E94B26] shrink-0 mt-0.5" />
                  <span className="leading-tight">{clinicAddress}</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Phone className="w-4 h-4 text-[#E94B26] shrink-0" />
                  <a href={`tel:${clinicPhone.replace(/[^0-9+]/g, '')}`} className="hover:text-[#E94B26]">
                    {clinicPhone}
                  </a>
                </div>
                <div className="flex items-center gap-2.5">
                  <Mail className="w-4 h-4 text-[#E94B26] shrink-0" />
                  <a href={`mailto:${clinicEmail}`} className="hover:text-[#E94B26]">
                    {clinicEmail}
                  </a>
                </div>
                <div className="flex items-center gap-2.5 text-[#C8A84E] text-[11px]">
                  <Clock className="w-4 h-4 shrink-0" />
                  <span>MON - SAT: 09:00 AM - 07:30 PM</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Embedded Google Maps Location */}
        <div className="max-w-7xl mx-auto px-4 sm:px-8 pt-12">
          <div className="w-full h-64 sm:h-80 border-2 border-[#111111] overflow-hidden shadow-[6px_6px_0px_#111111] bg-[#1A1E1D] relative">
            <iframe
              title="Studio Engineering Center Location"
              src={`https://www.google.com/maps?q=${encodeURIComponent(clinicAddress || 'Chennai, Tamil Nadu, India')}&output=embed`}
              width="100%"
              height="100%"
              style={{ border: 0, filter: 'grayscale(1) contrast(1.2) invert(0.9)' }}
              allowFullScreen={false}
              loading="lazy"
            />
            <div className="absolute top-3 left-3 bg-[#252A29]/95 text-[#F4F3EE] px-3.5 py-1.5 border border-[#C8A84E] text-[11px] font-mono font-bold flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-[#E94B26]" />
              <span>OFFICIAL CORPORATE & SITE ENGINEERING LOCATION</span>
            </div>
          </div>
        </div>

        {/* Bottom Hard Industrial Bar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-8 pb-12 pt-8">
          <div className="border-t-2 border-[#252A29] pt-6 flex flex-wrap items-center justify-between gap-4 text-[11px] font-mono text-[#F4F3EE]/60">
            <div>
              &copy; {new Date().getFullYear()} {clinicName}. ALL RIGHTS RESERVED. ARCHITECTURAL & RESIDENTIAL CIVIL ENTERPRISE.
            </div>
            <div className="flex items-center gap-4 text-[#C8A84E] font-bold">
              <span>STANDARDS: IS 456 &bull; NBC 2016</span>
              <span>•</span>
              <span>100% FIXED-COST CONTRACTS</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
