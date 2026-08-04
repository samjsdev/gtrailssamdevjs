import { readSourceConfig, getAllSlugs } from '@/lib/dataBuilder';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ReactNode } from 'react';
import { Home } from 'lucide-react';
import { cleanClinicName, cleanClinicDescription } from '@/lib/copyCleaner';
import { Bricolage_Grotesque, Plus_Jakarta_Sans } from 'next/font/google';
import ClientHeader from './ClientHeader';

const bricolage = Bricolage_Grotesque({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-bricolage',
});
const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-jakarta',
});

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

export default async function Template2Layout({ children, params }: LayoutProps) {
  const { slug } = await params;

  const data = await readSourceConfig(slug, 'template2');
  if (!data) return notFound();

  const { clinic, business } = data;
  const basePath = `/designwebsite/template2/${slug}`;

  const cleanName = cleanClinicName(clinic.name);
  const cleanDesc = cleanClinicDescription(clinic.description, clinic.name);
  const phone = clinic.contact?.phone || '';
  const address = clinic.address?.full || '';
  const city = clinic.address?.city || 'Chennai';
  const servicesList: string[] = business.services?.length ? business.services : [];

  const waPhone = phone.replace(/\D/g, '') || '919751396117';
  const waText = `Hi, I'm interested in a free design session with ${cleanName || 'your studio'}!`;
  const waLink = `https://wa.me/${waPhone}?text=${encodeURIComponent(waText)}`;

  return (
    <div className={`${jakarta.className} ${jakarta.variable} ${bricolage.variable} min-h-screen flex flex-col bg-white text-[#1b1b1b] selection:bg-[#f2a007] selection:text-[#1b1b1b] scroll-smooth antialiased`}>
      {/* Offer strip */}
      <div className="bg-[#0e5a43] text-white text-center text-[13px] font-semibold px-4 py-2.5 tracking-[0.02em]">
        <b className="text-[#f2a007]">Free design session</b> — 3D views + itemised quote for your floor plan.{' '}
        <Link href={`${basePath}/contact`} className="underline underline-offset-[3px] font-bold hover:text-[#f2a007] transition-colors">
          Claim now →
        </Link>
      </div>

      {/* Header */}
      <ClientHeader clinicName={cleanName} basePath={basePath} />

      <main className="grow">{children}</main>

      {/* Footer */}
      <footer className="bg-[#1b1b1b] text-white/65 px-6 pt-16 pb-8">
        <div className="max-w-[1240px] mx-auto">
          <div className="grid sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1.3fr] gap-10 pb-11 border-b border-white/10">
            <div>
              <Link href={basePath} className="flex items-center gap-3">
                <span className="w-[38px] h-[38px] rounded-xl bg-[#f2a007] grid place-items-center">
                  <Home className="w-[21px] h-[21px] text-[#1b1b1b]" strokeWidth={2.4} />
                </span>
                <span className="leading-tight">
                  <span className="font-[family-name:var(--font-bricolage)] block text-[21px] font-extrabold tracking-[-0.01em] text-white">
                    {cleanName || 'Design Studio'}
                  </span>
                  <span className="block text-[9px] font-semibold tracking-[0.3em] uppercase text-white/45">
                    Interiors · {city}
                  </span>
                </span>
              </Link>
              <p className="text-[13.5px] leading-[1.75] mt-4 max-w-[290px] font-medium">
                {cleanDesc || 'End-to-end home interiors with honest pricing and factory quality.'}
              </p>
            </div>

            <div>
              <h4 className="text-white text-[12px] font-extrabold tracking-[0.24em] uppercase mb-4.5">Explore</h4>
              <ul className="grid gap-2.5">
                <li><Link href={`${basePath}/gallery`} className="text-[14px] font-medium hover:text-[#f2a007] transition-colors">Design Gallery</Link></li>
                <li><Link href={`${basePath}/services`} className="text-[14px] font-medium hover:text-[#f2a007] transition-colors">Our Services</Link></li>
                <li><Link href={`${basePath}/about`} className="text-[14px] font-medium hover:text-[#f2a007] transition-colors">About Us</Link></li>
                <li><Link href={`${basePath}/contact`} className="text-[14px] font-medium hover:text-[#f2a007] transition-colors">Contact</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white text-[12px] font-extrabold tracking-[0.24em] uppercase mb-4.5">Services</h4>
              <ul className="grid gap-2.5">
                {(servicesList.length ? servicesList.slice(0, 4) : ['Living Room', 'Modular Kitchen', 'Master Bedroom', 'Full Home']).map((svc) => (
                  <li key={svc}>
                    <Link href={`${basePath}/services`} className="text-[14px] font-medium hover:text-[#f2a007] transition-colors">
                      {svc}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-white text-[12px] font-extrabold tracking-[0.24em] uppercase mb-4.5">Visit Us</h4>
              <address className="not-italic text-[14px] leading-[1.9] font-medium">
                <b className="text-white">{cleanName || 'Our Studio'}</b>
                <br />
                {address || `${city}, Tamil Nadu`}
                <br />
                {phone && (
                  <a href={`tel:${phone}`} className="hover:text-[#f2a007] transition-colors">
                    {phone}
                  </a>
                )}
              </address>
            </div>
          </div>

          <div className="flex flex-wrap justify-between gap-3 pt-6 text-[12px] font-semibold text-white/40">
            <span>© {new Date().getFullYear()} {cleanName || 'Studio'}. All rights reserved.</span>
            <span>Beautiful homes, on time &amp; on budget</span>
          </div>
        </div>
      </footer>

      {/* WhatsApp float */}
      <a
        href={waLink}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="fixed right-5 bottom-5 z-[90] flex items-center gap-2.5 bg-[#25d366] text-white font-extrabold text-[13.5px] pl-4 pr-5 py-3.5 rounded-full shadow-[0_16px_36px_rgba(37,211,102,0.45)] hover:-translate-y-1 transition-transform duration-300"
      >
        <svg viewBox="0 0 32 32" className="w-[22px] h-[22px] fill-white">
          <path d="M16 3C9.4 3 4 8.4 4 15c0 2.4.7 4.6 2 6.5L4 29l7.7-1.9c1.8 1 3.9 1.5 6 1.5h.3c6.6 0 12-5.4 12-12S22.6 3 16 3zm6.1 16.9c-.3.8-1.6 1.5-2.3 1.6-.6.1-1.4.2-4.4-.9-3.7-1.5-6.1-5.3-6.3-5.5-.2-.2-1.5-2-1.5-3.9s.9-2.7 1.3-3.1c.3-.4.7-.5 1-.5h.7c.2 0 .5-.1.8.6.3.8 1.1 2.7 1.2 2.9.1.2.2.4 0 .7-.1.3-.2.4-.4.7l-.6.7c-.2.2-.4.4-.2.8.2.4 1 1.6 2.1 2.6 1.4 1.3 2.6 1.7 3 1.8.4.2.6.1.8-.1.2-.2 1-1.1 1.2-1.5.3-.4.5-.3.9-.2.4.1 2.1 1 2.5 1.2.4.2.6.3.7.5.1.1.1.9-.2 1.7z" />
        </svg>
        Chat with us
      </a>
    </div>
  );
}
