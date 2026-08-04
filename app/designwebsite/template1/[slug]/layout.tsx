import { readSourceConfig, getAllSlugs } from '@/lib/dataBuilder';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ReactNode } from 'react';
import { cleanClinicName, cleanClinicDescription } from '@/lib/copyCleaner';
import { Marcellus, Jost } from 'next/font/google';
import ClientHeader from './ClientHeader';

const marcellus = Marcellus({ subsets: ['latin'], weight: '400', variable: '--font-marcellus' });
const jost = Jost({ subsets: ['latin'], weight: ['300', '400', '500', '600'], variable: '--font-jost' });

// Pre-render from local JSON at build time for fast template previews on Vercel.
export const dynamic = 'force-static';

export async function generateStaticParams() {
  const slugs = await getAllSlugs();
  return slugs.map((slug) => ({ slug }));
}

type LayoutProps = {
  children: ReactNode;
  params: Promise<{ slug: string }>;
};

export default async function Template1Layout({ children, params }: LayoutProps) {
  const { slug } = await params;

  const data = await readSourceConfig(slug, 'template1');
  if (!data) return notFound();

  const { clinic, business } = data;
  const basePath = `/designwebsite/template1/${slug}`;

  const cleanName = cleanClinicName(clinic.name);
  const cleanDesc = cleanClinicDescription(clinic.description, clinic.name);
  const phone = clinic.contact?.phone || '';
  const address = clinic.address?.full || '';
  const city = clinic.address?.city || 'Chennai';
  const initial = (cleanName || 'S').charAt(0).toUpperCase();

  const servicesList: string[] = business.services?.length ? business.services : [];

  const waPhone = phone.replace(/\D/g, '') || '919751396117';
  const waText = `Hi, I'm interested in booking a design consultation at ${cleanName || 'your studio'}!`;
  const waLink = `https://wa.me/${waPhone}?text=${encodeURIComponent(waText)}`;

  return (
    <div className={`${jost.className} ${jost.variable} ${marcellus.variable} min-h-screen flex flex-col bg-[#f6f1e8] text-[#211a13] selection:bg-[#a58150] selection:text-white scroll-smooth antialiased`}>
      {/* Topbar */}
      <div className="bg-[#211a13] text-[#f6f1e8]/85 text-[12.5px] tracking-[0.06em]">
        <div className="max-w-7xl mx-auto px-6 lg:px-7 py-2.5 flex justify-between items-center gap-4">
          <div className="flex gap-6 min-w-0">
            {address && (
              <span className="truncate">
                <b className="text-white font-medium">Studio:</b> {address}
              </span>
            )}
            <span className="hidden md:inline shrink-0">
              <b className="text-white font-medium">Open:</b> Mon–Sat, 10 AM – 7 PM
            </span>
          </div>
          {phone && (
            <a href={`tel:${phone}`} className="text-[#c9ab7c] shrink-0 hover:text-white transition-colors">
              {phone}
            </a>
          )}
        </div>
      </div>

      {/* Header */}
      <ClientHeader clinicName={cleanName} basePath={basePath} />

      <main className="grow">{children}</main>

      {/* Footer */}
      <footer className="bg-[#211a13] text-[#f6f1e8]/70 px-6 lg:px-7 pt-16 pb-9">
        <div className="max-w-7xl mx-auto">
          <div className="grid sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr] gap-11 pb-12 border-b border-[#f6f1e8]/15">
            <div>
              <Link href={basePath} className="flex items-center gap-3.5">
                <span className="font-[family-name:var(--font-marcellus)] w-[42px] h-[42px] border-[1.5px] border-[#a58150] grid place-items-center text-[22px] text-[#a58150]">
                  {initial}
                </span>
                <span className="leading-none">
                  <span className="font-[family-name:var(--font-marcellus)] block text-[22px] tracking-[0.06em] text-white">
                    {cleanName || 'Design Studio'}
                  </span>
                  <span className="block mt-1 text-[9px] tracking-[0.42em] uppercase text-[#f6f1e8]/50">
                    Interiors · {city}
                  </span>
                </span>
              </Link>
              <p className="text-[13.5px] font-light leading-relaxed mt-4.5 max-w-[300px]">
                {cleanDesc || 'End-to-end interiors designed and built with an obsession for detail.'}
              </p>
            </div>

            <div>
              <h4 className="text-[12px] tracking-[0.3em] uppercase text-[#c9ab7c] mb-5 font-medium">Studio</h4>
              <ul className="grid gap-3">
                <li><Link href={`${basePath}/about`} className="text-[14px] font-light hover:text-[#c9ab7c] transition-colors">About Us</Link></li>
                <li><Link href={`${basePath}/gallery`} className="text-[14px] font-light hover:text-[#c9ab7c] transition-colors">Portfolio</Link></li>
                <li><Link href={`${basePath}/services`} className="text-[14px] font-light hover:text-[#c9ab7c] transition-colors">Our Services</Link></li>
                <li><Link href={`${basePath}/contact`} className="text-[14px] font-light hover:text-[#c9ab7c] transition-colors">Contact</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-[12px] tracking-[0.3em] uppercase text-[#c9ab7c] mb-5 font-medium">Services</h4>
              <ul className="grid gap-3">
                {(servicesList.length ? servicesList.slice(0, 4) : ['Full Home Interiors', 'Modular Kitchens', 'Bedrooms & Wardrobes', 'Renovation']).map((svc) => (
                  <li key={svc}>
                    <Link href={`${basePath}/services`} className="text-[14px] font-light hover:text-[#c9ab7c] transition-colors">
                      {svc}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-[12px] tracking-[0.3em] uppercase text-[#c9ab7c] mb-5 font-medium">Visit Us</h4>
              <address className="not-italic text-[14px] font-light leading-[1.9]">
                <b className="text-white font-medium">{cleanName || 'Our Studio'}</b>
                <br />
                {address || 'Chennai, Tamil Nadu'}
                <br />
                {phone && (
                  <a href={`tel:${phone}`} className="hover:text-[#c9ab7c] transition-colors">
                    {phone}
                  </a>
                )}
              </address>
            </div>
          </div>

          <div className="flex flex-wrap justify-between gap-3.5 pt-7 text-[12px] tracking-[0.08em] text-[#f6f1e8]/45">
            <span>© {new Date().getFullYear()} {cleanName || 'Studio'}. All rights reserved.</span>
            <span>Designed & built with craft in {city}</span>
          </div>
        </div>
      </footer>

      {/* WhatsApp float */}
      <a
        href={waLink}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="fixed right-5 bottom-5 z-[90] w-[58px] h-[58px] rounded-full bg-[#25d366] grid place-items-center shadow-[0_14px_34px_rgba(37,211,102,0.45)] hover:scale-110 transition-transform duration-300"
      >
        <svg viewBox="0 0 32 32" className="w-[30px] h-[30px] fill-white">
          <path d="M16 3C9.4 3 4 8.4 4 15c0 2.4.7 4.6 2 6.5L4 29l7.7-1.9c1.8 1 3.9 1.5 6 1.5h.3c6.6 0 12-5.4 12-12S22.6 3 16 3zm6.1 16.9c-.3.8-1.6 1.5-2.3 1.6-.6.1-1.4.2-4.4-.9-3.7-1.5-6.1-5.3-6.3-5.5-.2-.2-1.5-2-1.5-3.9s.9-2.7 1.3-3.1c.3-.4.7-.5 1-.5h.7c.2 0 .5-.1.8.6.3.8 1.1 2.7 1.2 2.9.1.2.2.4 0 .7-.1.3-.2.4-.4.7l-.6.7c-.2.2-.4.4-.2.8.2.4 1 1.6 2.1 2.6 1.4 1.3 2.6 1.7 3 1.8.4.2.6.1.8-.1.2-.2 1-1.1 1.2-1.5.3-.4.5-.3.9-.2.4.1 2.1 1 2.5 1.2.4.2.6.3.7.5.1.1.1.9-.2 1.7z" />
        </svg>
      </a>
    </div>
  );
}
