'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Plus } from 'lucide-react';
import { Montserrat } from 'next/font/google';
import { useLenis } from 'lenis/react';

const montserrat = Montserrat({ subsets: ['latin'], weight: ['300', '400', '500', '600'] });

interface ClientHeaderProps {
  clinicName: string;
  basePath: string;
}

const LEFT_NAV = [
  { label: 'Home', href: '' },
  { label: 'About Us', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'Projects', href: '/gallery' },
];

const RIGHT_NAV = [
  { label: 'Media', href: '/gallery' },
  { label: 'Contact', href: '/contact' },
];

export default function ClientHeader({ clinicName, basePath }: ClientHeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const initial = (clinicName || 'A').charAt(0).toUpperCase();

  const lenis = useLenis(({ scroll }) => {
    setScrolled(scroll > 40);
  });

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-black/5 py-4'
          : 'bg-gradient-to-b from-black/60 via-black/20 to-transparent py-6'
      }`}
    >
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 flex items-center justify-between">
        {/* Left Nav (Desktop) */}
        <nav className="hidden lg:flex items-center gap-7">
          {LEFT_NAV.map((item) => {
            const fullHref = `${basePath}${item.href}`;
            const isActive =
              item.href === ''
                ? pathname === basePath || pathname === `${basePath}/`
                : pathname === fullHref;

            return (
              <Link
                key={item.label}
                href={fullHref}
                className={`${montserrat.className} text-[11px] tracking-[0.24em] uppercase font-medium transition-colors ${
                  scrolled
                    ? isActive
                      ? 'text-black font-semibold'
                      : 'text-[#444444] hover:text-black'
                    : isActive
                    ? 'text-white font-semibold'
                    : 'text-white/85 hover:text-white'
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Center Monogram Logo (Aparna Kaushik style) */}
        <Link
          href={basePath}
          className="flex flex-col items-center group text-center select-none cursor-pointer"
          onClick={(e) => {
            setMobileOpen(false);
            if (pathname === basePath || pathname === `${basePath}/`) {
              e.preventDefault();
              lenis?.scrollTo(0, { duration: 1.2 });
            }
          }}
        >
          <span
            className={`${montserrat.className} text-[18px] sm:text-[21px] tracking-[0.28em] uppercase font-light transition-colors ${
              scrolled ? 'text-black' : 'text-white'
            }`}
          >
            {clinicName || 'Aparna Kaushik'}
          </span>
          <span
            className={`text-[8.5px] sm:text-[9px] tracking-[0.38em] uppercase transition-colors mt-0.5 ${
              scrolled ? 'text-[#777777]' : 'text-white/70'
            }`}
          >
            Architecture & Design
          </span>
        </Link>

        {/* Right Nav (Desktop) */}
        <div className="hidden lg:flex items-center gap-7">
          {RIGHT_NAV.map((item) => (
            <Link
              key={item.label}
              href={`${basePath}${item.href}`}
              className={`${montserrat.className} text-[11px] tracking-[0.24em] uppercase font-medium transition-colors ${
                scrolled ? 'text-[#444444] hover:text-black' : 'text-white/85 hover:text-white'
              }`}
            >
              {item.label}
            </Link>
          ))}

          {/* Let's Talk Button with Plus icon */}
          <Link
            href={`${basePath}/contact`}
            className={`inline-flex items-center gap-2 text-[10.5px] tracking-[0.2em] uppercase font-medium px-4 py-2 rounded-full transition-all duration-300 ${
              scrolled
                ? 'bg-[#141414] hover:bg-[#7d3333] text-white'
                : 'bg-white/90 hover:bg-white text-black'
            }`}
          >
            <span>Let&rsquo;s Talk</span>
            <span className="w-4 h-4 rounded-full bg-black/10 flex items-center justify-center">
              <Plus className="w-3 h-3" />
            </span>
          </Link>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="lg:hidden flex items-center gap-3">
          <Link
            href={`${basePath}/contact`}
            className={`text-[10px] tracking-[0.18em] uppercase font-medium px-3 py-1.5 rounded-full ${
              scrolled ? 'bg-black text-white' : 'bg-white text-black'
            }`}
          >
            Talk
          </Link>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle navigation"
            className={`p-2 transition-colors ${scrolled ? 'text-black' : 'text-white'}`}
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Slide-down Drawer */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-400 bg-white border-b border-black/10 ${
          mobileOpen ? 'max-h-[360px] opacity-100 py-6 px-8' : 'max-h-0 opacity-0 py-0 px-8'
        }`}
      >
        <nav className="flex flex-col gap-3">
          {[...LEFT_NAV, ...RIGHT_NAV].map((item) => (
            <Link
              key={item.label}
              href={`${basePath}${item.href}`}
              onClick={() => setMobileOpen(false)}
              className={`${montserrat.className} py-2 text-[12px] tracking-[0.25em] uppercase font-medium text-black border-b border-black/5 hover:text-[#7d3333] transition-colors`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
