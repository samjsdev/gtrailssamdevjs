import { readSourceConfig, getAllSlugs } from '@/lib/dataBuilder';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ReactNode } from 'react';
import { ArrowRight, Phone, MessageSquare } from 'lucide-react';
import { cleanClinicName } from '@/lib/copyCleaner';
import { Montserrat, Plus_Jakarta_Sans } from 'next/font/google';
import ClientHeader from './ClientHeader';
import FloatingTalkButton from './FloatingTalkButton';
import SmoothScroll from './SmoothScroll';

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-heading',
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-body',
});

export const dynamic = 'force-static';

export async function generateStaticParams() {
  const slugs = await getAllSlugs();
  return slugs.map((slug) => ({ slug }));
}

type LayoutProps = {
  children: ReactNode;
  params: Promise<{ slug: string }>;
};

export default async function Template10Layout({ children, params }: LayoutProps) {
  const { slug } = await params;

  const data = await readSourceConfig(slug, 'template10');
  if (!data) return notFound();

  const { clinic } = data;
  const basePath = `/designwebsite/template10/${slug}`;

  const cleanName = cleanClinicName(clinic.name);
  const city = clinic.address?.city || 'Chennai';
  const phone = clinic.contact?.phone || '+91 93103 59993';
  const address =
    clinic.address?.full || 'G-178, Sector 44, Opposite Amity University, Noida (NCR) / Anna Nagar, Chennai';

  const waPhone = phone.replace(/\D/g, '') || '919310359993';
  const waUrl = `https://wa.me/${waPhone}?text=${encodeURIComponent(
    `Hello, I would like to enquire with ${cleanName || 'Aparna Kaushik Design Group'}.`
  )}`;

  return (
    <SmoothScroll>
      <div
        className={`${plusJakarta.className} ${montserrat.variable} ${plusJakarta.variable} min-h-screen flex flex-col bg-white text-black selection:bg-black selection:text-white antialiased`}
      >
        {/* Fixed 3-Column Luxury Header */}
        <ClientHeader clinicName={cleanName} basePath={basePath} />

        {/* Main Content */}
        <main className="grow">{children}</main>

        {/* Floating Let's Talk Button */}
        <FloatingTalkButton basePath={basePath} />

      {/* Footer Exactly Modeled on aparnakaushik.com */}
      <footer className="bg-[#ffffff] text-black border-t border-[#e5e5e5] pt-16 pb-12 px-6 sm:px-12">
        <div className="max-w-[1440px] mx-auto">
          {/* Main Footer Columns */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-16 border-b border-[#e5e5e5]">
            {/* 1. Newsletter: SUBSCRIBE TO OUR LIST */}
            <div className="lg:col-span-3">
              <p className={`${montserrat.className} text-[11px] tracking-[0.25em] uppercase font-semibold text-black mb-4`}>
                Subscribe to our list
              </p>
              <form action="#" className="relative flex items-center max-w-xs">
                <input
                  type="email"
                  placeholder="email address"
                  className="w-full bg-transparent border-b border-black py-2 pr-8 text-[13px] placeholder:text-[#888888] focus:outline-none focus:border-black transition-colors"
                />
                <button
                  type="submit"
                  aria-label="Submit newsletter"
                  className="absolute right-0 hover:translate-x-1 transition-transform"
                >
                  <ArrowRight className="w-4 h-4 text-black" />
                </button>
              </form>
            </div>

            {/* 2. COMPANY Navigation */}
            <div className="lg:col-span-2">
              <p className={`${montserrat.className} text-[11px] tracking-[0.25em] uppercase font-semibold text-black mb-4`}>
                Company
              </p>
              <ul className="space-y-2.5 text-[13px] text-[#555555]">
                <li>
                  <Link href={`${basePath}/about`} className="hover:text-black transition-colors">
                    Brand Story
                  </Link>
                </li>
                <li>
                  <Link href={`${basePath}/about`} className="hover:text-black transition-colors">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href={`${basePath}/contact`} className="hover:text-black transition-colors">
                    Career
                  </Link>
                </li>
                <li>
                  <Link href={`${basePath}/contact`} className="hover:text-black transition-colors">
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>

            {/* 3. EXPLORE Navigation */}
            <div className="lg:col-span-2">
              <p className={`${montserrat.className} text-[11px] tracking-[0.25em] uppercase font-semibold text-black mb-4`}>
                Explore
              </p>
              <ul className="space-y-2.5 text-[13px] text-[#555555]">
                <li>
                  <Link href={`${basePath}/services`} className="hover:text-black transition-colors">
                    Services
                  </Link>
                </li>
                <li>
                  <Link href={`${basePath}/gallery`} className="hover:text-black transition-colors">
                    Projects
                  </Link>
                </li>
                <li>
                  <Link href={`${basePath}/services`} className="hover:text-black transition-colors">
                    Architecture & Turnkey Civil
                  </Link>
                </li>
                <li>
                  <Link href={`${basePath}/gallery`} className="hover:text-black transition-colors">
                    Media & Publications
                  </Link>
                </li>
              </ul>
            </div>

            {/* 4. HEADQUARTERS */}
            <div className="lg:col-span-2">
              <p className={`${montserrat.className} text-[11px] tracking-[0.25em] uppercase font-semibold text-black mb-4`}>
                Headquarter
              </p>
              <p className="text-[12.5px] text-[#555555] leading-relaxed">
                {address}
              </p>
              <div className="mt-3 text-[12.5px] text-black font-medium">
                <span className="text-[#888888]">PHONE: </span>
                <a href={`tel:${phone}`} className="hover:underline">
                  {phone}
                </a>
              </div>
              <div className="mt-2">
                <a
                  href={waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-[12px] font-semibold text-black hover:text-[#7d3333] transition-colors"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-green-600" />
                  <span>Chat on WhatsApp</span>
                </a>
              </div>
            </div>

            {/* 5. DIRECT ENQUIRIES DIRECTORY */}
            <div className="lg:col-span-3">
              <p className={`${montserrat.className} text-[11px] tracking-[0.25em] uppercase font-semibold text-black mb-4`}>
                Direct Enquiries
              </p>
              <div className="space-y-3 text-[12px]">
                <div>
                  <span className="block text-[10px] tracking-[0.15em] uppercase font-semibold text-[#888888]">
                    Client Enquiries
                  </span>
                  <a href={`mailto:enquiries@${slug}.com`} className="text-black hover:underline">
                    enquiries@{slug}.com
                  </a>
                </div>
                <div>
                  <span className="block text-[10px] tracking-[0.15em] uppercase font-semibold text-[#888888]">
                    Media Enquiries
                  </span>
                  <a href={`mailto:media@${slug}.com`} className="text-black hover:underline">
                    media@{slug}.com
                  </a>
                </div>
                <div>
                  <span className="block text-[10px] tracking-[0.15em] uppercase font-semibold text-[#888888]">
                    Vendor Enquiries
                  </span>
                  <a href={`mailto:operations@${slug}.com`} className="text-black hover:underline">
                    operations@{slug}.com
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Confidentiality Notice & Legal */}
          <div className="pt-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-[11px] text-[#777777]">
            <p className="max-w-3xl leading-relaxed">
              Projects displayed are bound by confidentiality agreements. Project names and select details have been altered to protect the privacy and identity of our clients.
            </p>
            <div className="flex items-center gap-4 shrink-0">
              <span>© {new Date().getFullYear()} {cleanName || 'Aparna Kaushik'}. ALL RIGHTS RESERVED.</span>
              <Link href={`${basePath}/contact`} className="hover:text-black uppercase">
                Privacy Policy
              </Link>
            </div>
          </div>
        </div>
      </footer>
      </div>
    </SmoothScroll>
  );
}
