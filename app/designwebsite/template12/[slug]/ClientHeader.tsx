'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X, Home } from 'lucide-react';
import { Bricolage_Grotesque } from 'next/font/google';

const bricolage = Bricolage_Grotesque({ subsets: ['latin'], weight: ['600', '700', '800'] });

interface ClientHeaderProps {
  clinicName: string;
  basePath: string;
}

const NAV_ITEMS = [
  { label: 'Home', href: '' },
  { label: 'About', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'Portfolio', href: '/gallery' },
  { label: 'Contact', href: '/contact' },
];

export default function ClientHeader({ clinicName, basePath }: ClientHeaderProps) {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-[#1b1b1b]/10">
      <div className="max-w-[1240px] mx-auto px-6 h-[74px] flex items-center justify-between">
        {/* Brand */}
        <Link href={basePath} className="flex items-center gap-3 group min-w-0 mr-3" onClick={() => setOpen(false)}>
          <span className="w-[38px] h-[38px] shrink-0 rounded-xl bg-[#f2a007] grid place-items-center group-hover:bg-[#0e5a43] transition-colors duration-300">
            <Home className="w-[21px] h-[21px] text-[#1b1b1b] group-hover:text-white transition-colors duration-300" strokeWidth={2.4} />
          </span>
          <span className="leading-tight min-w-0">
            <span className={`${bricolage.className} block text-[16px] sm:text-[21px] font-extrabold tracking-[-0.01em] text-[#1b1b1b] truncate max-w-[48vw] sm:max-w-none`}>
              {clinicName || 'Design Studio'}
            </span>
            <span className="block text-[9px] font-semibold tracking-[0.3em] uppercase text-[#6b6660]">
              Architecture · Construction
            </span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-7">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.label}
              href={`${basePath}${item.href}`}
              className="text-[14px] font-semibold text-[#6b6660] hover:text-[#0e5a43] transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Right */}
        <div className="flex items-center gap-4">
          <Link
            href={`${basePath}/contact`}
            className="hidden sm:inline-flex items-center justify-center gap-2 bg-[#f2a007] text-[#1b1b1b] font-bold text-[14px] px-6 py-3.5 rounded-xl hover:bg-[#e09500] hover:-translate-y-0.5 hover:shadow-[0_14px_28px_rgba(242,160,7,0.35)] transition-all duration-300"
          >
            Book Consultation
          </Link>
          <button
            onClick={() => setOpen(!open)}
            aria-label="Toggle navigation menu"
            className="lg:hidden w-10 h-10 rounded-xl border border-[#1b1b1b]/10 grid place-items-center text-[#1b1b1b] hover:border-[#0e5a43] hover:text-[#0e5a43] transition-colors"
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-500 border-t border-[#1b1b1b]/5 bg-white ${
          open ? 'max-h-[420px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <nav className="flex flex-col px-6 py-5 gap-1">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.label}
              href={`${basePath}${item.href}`}
              onClick={() => setOpen(false)}
              className="py-3 text-[14px] font-bold text-[#1b1b1b] border-b border-[#1b1b1b]/5 hover:text-[#0e5a43] transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
