import { ReactNode } from 'react';
import Link from 'next/link';
import { readSourceConfig } from '@/lib/sourceData';
import { notFound } from 'next/navigation';
import ClientNavbar from './ClientNavbar';

interface LayoutProps {
  children: ReactNode;
  params?: any;
}

export default async function SiteLayout({ children, params }: LayoutProps) {
  const data = await readSourceConfig(undefined, 'template5');

  if (!data || !data.clinic) {
    notFound();
  }

  const phone = '09841098490';
  const displayPhone = '+91 98410 98490';
  const rawDigits = phone.replace(/\D/g, '');
  const cleanPhone = rawDigits.startsWith('91') ? rawDigits : `91${rawDigits.replace(/^0+/, '')}`;

  const address = 'W115A, 3rd Ave, Annanagar East, Chennai, Tamil Nadu 600040';
  const mapUrl = data.clinic.mapEmbedUrl || 'https://maps.google.com/maps?q=murali%20patharala%20%26%20associates%20(%20mpa)%20W115A%2C%203rd%20Ave%2C%20Annanagar%20East%2C%20Chennai%2C%20Tamil%20Nadu%20600040&output=embed';

  return (
    <div className="min-h-screen font-sans antialiased text-[#111111] selection:bg-[#EA580C] selection:text-white border-x-4 border-[#111111] max-w-[1600px] mx-auto bg-[#FAFAFA] flex flex-col">
      {/* ── Sticky Nav ── */}
      <ClientNavbar
        clinicName="Murali Patharala Associates"
        phone={displayPhone}
        basePath=""
      />

      {/* ── Page Content ── */}
      <main className="flex-1 w-full bg-[#FAFAFA]">
        {children}
      </main>

      {/* ── FOOTER (Bold sign-board style) ── */}
      <footer id="contact-footer" className="bg-[#111111] text-white border-t-4 border-[#111111]">
        {/* Pre-footer Call to Action */}
        <div className="p-8 md:p-16 border-b-4 border-[#262626] bg-[#111111] text-white text-center">
          <h2
            className="text-3xl md:text-5xl font-bold font-serif mb-6 text-[#EA580C] tracking-tight"
            style={{ fontFamily: "'Lora', serif" }}
          >
            Ready to Build Your Legacy?
          </h2>
          <p className="text-base md:text-lg text-[#757575] mb-8 max-w-xl mx-auto font-medium leading-relaxed">
            Book a complimentary architectural consultation. Let us analyze your plot, vision, and budget with fixed-price transparency.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/#quick-estimate"
              className="inline-block px-10 py-4 bg-[#EA580C] text-[#111111] font-bold uppercase tracking-widest text-xs hover:bg-white transition-colors"
            >
              Get Quick Estimate
            </Link>
            <a
              href={`https://wa.me/${cleanPhone}?text=${encodeURIComponent('Hi Murali Patharala Associates (MPA), I would like to schedule a consultation.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-8 py-4 border-2 border-[#EA580C] text-[#EA580C] font-bold uppercase tracking-widest text-xs hover:bg-[#EA580C] hover:text-[#111111] transition-colors"
            >
              WhatsApp Us
            </a>
          </div>
        </div>

        {/* Multi-Column Signboard Footer Grid */}
        <div className="p-8 md:p-16 pb-8">
          <div className="grid md:grid-cols-4 gap-12 border-b-2 border-[#262626] pb-12 mb-8">
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 bg-[#EA580C] flex items-center justify-center shrink-0">
                  <div className="w-2.5 h-2.5 bg-[#111111]"></div>
                </div>
                <div className="flex flex-col">
                  <span
                    className="text-2xl sm:text-3xl font-bold tracking-tight uppercase text-[#EA580C]"
                    style={{ fontFamily: "'Lora', serif" }}
                  >
                    MPA
                  </span>
                  <span className="text-[10px] font-bold tracking-[0.2em] text-white/70 uppercase">
                    Murali Patharala Associates
                  </span>
                </div>
              </div>
              <p className="text-sm md:text-base text-white/80 max-w-md mb-8 leading-relaxed font-medium">
                Chennai’s premier architectural consulting and turnkey residential construction firm. Serving Anna Nagar and Chennai with fixed prices, zero delays, and absolute transparency since 1998.
              </p>

              <div className="bg-[#181818] border border-[#2A2A2A] inline-flex flex-col px-6 py-4">
                <span className="text-xs uppercase tracking-widest text-[#757575] mb-1 font-bold">Studio Direct Line</span>
                <a
                  href={`tel:${displayPhone}`}
                  className="text-xl font-bold uppercase tracking-widest text-[#EA580C] hover:text-white transition-colors"
                >
                  {displayPhone}
                </a>
              </div>
            </div>

            <div>
              <h5 className="text-xs font-bold uppercase tracking-widest text-[#EA580C] mb-6">Navigation</h5>
              <ul className="space-y-3">
                {[
                  { label: 'Turnkey Services', href: '/services' },
                  { label: 'Fixed Packages', href: '/#packages' },
                  { label: 'Project Portfolio', href: '/gallery' },
                  { label: '5-Step Process', href: '/#process' },
                  { label: 'About The Firm', href: '/about' },
                  { label: 'Contact Studio', href: '/contact' },
                ].map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-xs font-bold uppercase tracking-wider text-white/80 hover:text-[#EA580C] transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h5 className="text-xs font-bold uppercase tracking-widest text-[#EA580C] mb-6">Headquarters</h5>
              <p className="text-xs md:text-sm font-medium leading-relaxed text-white/80">
                W115A, 3rd Ave, Annanagar East,<br />
                Chennai, Tamil Nadu 600040
              </p>
              <div className="mt-4 space-y-2">
                <p className="text-[11px] text-[#757575] font-bold uppercase tracking-wider">
                  Mon – Sat: 9:30 AM – 7:30 PM
                </p>
                <a
                  href="https://maps.google.com/?q=murali+patharala+associates+Annanagar+East+Chennai"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block text-xs font-bold uppercase tracking-widest border-b border-[#EA580C] text-[#EA580C] hover:text-white hover:border-white transition-all pb-0.5"
                >
                  View on Google Maps →
                </a>
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center text-[11px] font-bold uppercase tracking-widest text-[#757575] gap-4">
            <p>© {new Date().getFullYear()} Murali Patharala Associates (MPA). All rights reserved.</p>
            <div className="flex gap-6">
              <span className="text-white/60">Architectural Consultants &amp; Turnkey Builders</span>
              <span>•</span>
              <span className="text-[#EA580C]">Chennai, India</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
