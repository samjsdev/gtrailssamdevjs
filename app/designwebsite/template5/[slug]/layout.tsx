import { ReactNode } from 'react';
import Link from 'next/link';
import { Oswald, Space_Grotesk } from 'next/font/google';
import { readSourceConfig, getAllSlugs } from '@/lib/dataBuilder';
import { cleanClinicName, cleanClinicDescription } from '@/lib/copyCleaner';
import { notFound } from 'next/navigation';
import ClientNavbar from './ClientNavbar';
import { 
  Phone, Mail, MapPin, ShieldCheck, Compass, Building, Award, 
  Clock, ArrowRight, Layers, FileCheck, CheckCircle2, HardHat 
} from 'lucide-react';

const oswald = Oswald({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-oswald',
  display: 'swap',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-space-grotesk',
  display: 'swap',
});

export async function generateStaticParams() {
  const slugs = await getAllSlugs();
  return slugs.map((slug) => ({ slug }));
}

interface LayoutProps {
  children: ReactNode;
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const { slug } = resolvedParams;
  const data = await readSourceConfig(slug, 'template5');

  if (!data || !data.clinic) {
    return {
      title: 'Architectural Design, Residential Construction & Luxury Interiors',
      description: 'Integrated Architectural BIM Modeling, Turnkey Civil Construction, and Bespoke Interior Execution.',
    };
  }

  const clinicName = cleanClinicName(data.clinic.name);
  const clinicTagline = data.clinic.tagline || 'Integrated Architectural Design, Civil Construction & Luxury Interiors';
  const clinicDescription = cleanClinicDescription(data.clinic.description, data.clinic.name);

  return {
    title: `${clinicName} | Architecture & Residential Construction Firm`,
    description: `${clinicTagline}. ${clinicDescription.slice(0, 160)}...`,
  };
}

export default async function Template5Layout({ children, params }: LayoutProps) {
  const resolvedParams = await params;
  const { slug } = resolvedParams;
  const data = await readSourceConfig(slug, 'template5');

  if (!data || !data.clinic) {
    notFound();
  }

  const clinicName = cleanClinicName(data.clinic.name);
  const clinicPhone = data.clinic.contact?.phone || '+91 81100 00384';
  const clinicEmail = data.clinic.contact?.email || 'contact@architecturalfirm.com';
  const clinicAddress = data.clinic.address?.full || 'Engineering Design Studio & Site Operations Center';
  const clinicTagline = data.clinic.tagline || 'A Turnkey Architecture, Residential Construction & Interior Enterprise';
  const clinicDescription = cleanClinicDescription(data.clinic.description, data.clinic.name);

  const basePath = `/designwebsite/template5/${slug}`;

  return (
    <div className={`${oswald.variable} ${spaceGrotesk.variable} min-h-screen bg-[#F8F7F4] text-[#1E2322] flex flex-col font-sans selection:bg-[#C85A32] selection:text-white antialiased`}>
      {/* ─── Architectural Sticky Navbar ─── */}
      <ClientNavbar
        slug={slug}
        clinicName={clinicName}
        phone={clinicPhone}
        basePath={basePath}
      />

      {/* ─── Main Dynamic Children Content ─── */}
      <main className="flex-1 w-full">
        {children}
      </main>

      {/* ─── Refined Architectural Footer ─── */}
      <footer className="bg-[#181C1B] text-[#F8F7F4] border-t border-[#2D3331]">
        {/* Top Highlight Banner */}
        <div className="bg-[#141716] border-b border-[#2D3331] py-8 px-4 sm:px-8">
          <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-[#C85A32] text-white flex items-center justify-center font-bold text-xl rounded-sm shadow-sm border border-[#C85A32]/50">
                <HardHat className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-lg sm:text-xl font-bold uppercase text-white tracking-wide">
                  PLANNING TO BUILD YOUR DREAM RESIDENCE?
                </h4>
                <p className="text-xs font-mono text-[#C49B45] tracking-wider uppercase">
                  SCHEDULE AN IN-DEPTH SPATIAL & STRUCTURAL SITE CONSULTATION
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <a
                href={`tel:${clinicPhone.replace(/[^0-9+]/g, '')}`}
                className="px-6 py-3.5 bg-[#C85A32] hover:bg-[#B34D28] text-white font-semibold text-xs uppercase tracking-widest rounded-sm border border-transparent shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all flex items-center gap-2"
              >
                <Phone className="w-4 h-4" />
                <span>DIRECT LINE: {clinicPhone}</span>
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
                <div className="w-10 h-10 bg-[#C85A32] text-white font-bold text-lg flex items-center justify-center rounded-sm">
                  {clinicName.charAt(0).toUpperCase()}
                </div>
                <div className="flex flex-col">
                  <span className="text-lg font-bold uppercase tracking-tight text-white">
                    {clinicName}
                  </span>
                  <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#C49B45]">
                    ARCHITECTS &bull; BUILDERS &bull; INTERIORS
                  </span>
                </div>
              </div>
              <p className="text-xs text-stone-300/80 leading-relaxed font-sans">
                {clinicDescription.slice(0, 190)}...
              </p>
              <div className="pt-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#141716] text-[#C49B45] text-[10px] font-mono font-bold uppercase tracking-widest border border-[#C49B45]/30 rounded-sm">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#C85A32]" />
                  10-YEAR STRUCTURAL GUARANTEE
                </span>
              </div>
            </div>

            {/* Column 2: 3 Core Pillars */}
            <div className="space-y-3">
              <h4 className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-[#C49B45] border-b border-[#2D3331] pb-2">
                OUR THREE CORE DISCIPLINES
              </h4>
              <ul className="space-y-2 text-xs font-mono text-stone-300/80">
                <li className="flex items-center gap-2 hover:text-[#C85A32] transition-colors">
                  <span className="text-[#C85A32]">&rarr;</span>
                  <Link href={`${basePath}/services`}>Architectural 3D BIM & Scheme Plans</Link>
                </li>
                <li className="flex items-center gap-2 hover:text-[#C85A32] transition-colors">
                  <span className="text-[#C85A32]">&rarr;</span>
                  <Link href={`${basePath}/services`}>Turnkey Residential Civil Construction</Link>
                </li>
                <li className="flex items-center gap-2 hover:text-[#C85A32] transition-colors">
                  <span className="text-[#C85A32]">&rarr;</span>
                  <Link href={`${basePath}/services`}>Bespoke Luxury Interior Fitouts</Link>
                </li>
                <li className="flex items-center gap-2 hover:text-[#C85A32] transition-colors">
                  <span className="text-[#C85A32]">&rarr;</span>
                  <Link href={`${basePath}/services`}>Structural Engineering & Soil Audits</Link>
                </li>
                <li className="flex items-center gap-2 hover:text-[#C85A32] transition-colors">
                  <span className="text-[#C85A32]">&rarr;</span>
                  <Link href={`${basePath}/services`}>Building Sanctions & Approvals</Link>
                </li>
              </ul>
            </div>

            {/* Column 3: Quick Direct Navigation */}
            <div className="space-y-3">
              <h4 className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-[#C49B45] border-b border-[#2D3331] pb-2">
                ESTIMATION & PORTFOLIO
              </h4>
              <ul className="space-y-2 text-xs font-mono text-stone-300/80">
                <li className="flex items-center gap-2 hover:text-[#C85A32] transition-colors">
                  <span className="text-[#C85A32]">&rarr;</span>
                  <Link href={`${basePath}#cost-calculator`}>Construction Cost Calculator</Link>
                </li>
                <li className="flex items-center gap-2 hover:text-[#C85A32] transition-colors">
                  <span className="text-[#C85A32]">&rarr;</span>
                  <Link href={`${basePath}#packages`}>Standard, Premium & Luxury Packages</Link>
                </li>
                <li className="flex items-center gap-2 hover:text-[#C85A32] transition-colors">
                  <span className="text-[#C85A32]">&rarr;</span>
                  <Link href={`${basePath}/gallery`}>Completed Villa Projects Showcase</Link>
                </li>
                <li className="flex items-center gap-2 hover:text-[#C85A32] transition-colors">
                  <span className="text-[#C85A32]">&rarr;</span>
                  <Link href={`${basePath}/about`}>Chief Architect & Engineering Leadership</Link>
                </li>
                <li className="flex items-center gap-2 hover:text-[#C85A32] transition-colors">
                  <span className="text-[#C85A32]">&rarr;</span>
                  <Link href={`${basePath}/contact`}>Book Technical Site Inspection</Link>
                </li>
              </ul>
            </div>

            {/* Column 4: Contact & Office Coordinates */}
            <div className="space-y-3">
              <h4 className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-[#C49B45] border-b border-[#2D3331] pb-2">
                HEAD OFFICE & COORDINATES
              </h4>
              <div className="space-y-3 text-xs text-stone-300/85 font-mono">
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-[#C85A32] shrink-0 mt-0.5" />
                  <span className="leading-tight">{clinicAddress}</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Phone className="w-4 h-4 text-[#C85A32] shrink-0" />
                  <a href={`tel:${clinicPhone.replace(/[^0-9+]/g, '')}`} className="hover:text-[#C85A32] transition-colors">
                    {clinicPhone}
                  </a>
                </div>
                <div className="flex items-center gap-2.5">
                  <Mail className="w-4 h-4 text-[#C85A32] shrink-0" />
                  <a href={`mailto:${clinicEmail}`} className="hover:text-[#C85A32] transition-colors">
                    {clinicEmail}
                  </a>
                </div>
                <div className="flex items-center gap-2.5 text-[#C49B45] text-[11px]">
                  <Clock className="w-4 h-4 shrink-0" />
                  <span>MON - SAT: 09:00 AM - 07:30 PM</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Embedded Google Maps Location */}
        <div className="max-w-7xl mx-auto px-4 sm:px-8 pb-12">
          <div className="w-full h-64 sm:h-80 border border-[#2D3331] overflow-hidden rounded-sm bg-[#141716] relative shadow-sm">
            <iframe
              title="Studio Engineering Center Location"
              src={`https://www.google.com/maps?q=${encodeURIComponent(clinicAddress || 'Chennai, Tamil Nadu, India')}&output=embed`}
              width="100%"
              height="100%"
              style={{ border: 0, filter: 'contrast(1.05) grayscale(0.2)' }}
              allowFullScreen={false}
              loading="lazy"
            />
            <div className="absolute top-3 left-3 bg-[#181C1B]/95 backdrop-blur-sm text-white px-3.5 py-1.5 border border-[#2D3331] text-[11px] font-mono font-medium flex items-center gap-2 rounded-sm shadow-sm">
              <MapPin className="w-3.5 h-3.5 text-[#C85A32]" />
              <span>OFFICIAL CORPORATE & SITE ENGINEERING LOCATION</span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-8 pb-12 pt-4">
          <div className="border-t border-[#2D3331] pt-6 flex flex-wrap items-center justify-between gap-4 text-[11px] font-mono text-stone-400">
            <div>
              &copy; {new Date().getFullYear()} {clinicName}. ALL RIGHTS RESERVED. ARCHITECTURE, CIVIL CONSTRUCTION & INTERIORS.
            </div>
            <div className="flex items-center gap-4 text-[#C49B45]">
              <span>STANDARDS: IS 456 &bull; NBC 2016</span>
              <span>&bull;</span>
              <span>100% FIXED-COST CONTRACTS</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
