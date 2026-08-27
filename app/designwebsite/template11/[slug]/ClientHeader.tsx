'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { Marcellus } from 'next/font/google';

const marcellus = Marcellus({ subsets: ['latin'], weight: '400' });

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
  const initial = (clinicName || 'S').charAt(0).toUpperCase();

  return (
    <header className="sticky top-0 z-50 bg-[#fdfbf6]/95 backdrop-blur-md border-b border-[#211a13]/10">
      <div className="max-w-7xl mx-auto px-6 lg:px-7 h-[78px] flex items-center justify-between">
        {/* Brand */}
        <Link href={basePath} className="flex items-center gap-3 group min-w-0 mr-3" onClick={() => setOpen(false)}>
          <span className={`${marcellus.className} w-[42px] h-[42px] shrink-0 border-[1.5px] border-[#a58150] grid place-items-center text-[22px] text-[#a58150] group-hover:bg-[#a58150] group-hover:text-white transition-colors duration-300`}>
            {initial}
          </span>
          <span className="leading-none min-w-0">
            <span className={`${marcellus.className} block text-[17px] sm:text-[22px] tracking-[0.06em] text-[#211a13] truncate max-w-[48vw] sm:max-w-none`}>
              {clinicName || 'Architects & Builders'}
            </span>
            <span className="block mt-1 text-[9px] tracking-[0.42em] uppercase text-[#7d7264] font-medium">
              Architects · Builders
            </span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-8">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.label}
              href={`${basePath}${item.href}`}
              className="relative text-[13px] tracking-[0.18em] uppercase text-[#211a13] py-1.5 after:absolute after:left-0 after:bottom-0 after:h-[1.5px] after:w-0 after:bg-[#a58150] after:transition-all after:duration-300 hover:after:w-full"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Right */}
        <div className="flex items-center gap-4">
          <Link
            href={`${basePath}/contact`}
            className="hidden sm:inline-flex items-center gap-3 bg-[#211a13] text-white px-6 py-3.5 text-[12px] tracking-[0.2em] uppercase font-medium border border-[#211a13] hover:bg-[#a58150] hover:border-[#a58150] transition-colors duration-300"
          >
            Free Consultation
          </Link>
          <button
            onClick={() => setOpen(!open)}
            aria-label="Toggle navigation menu"
            className="lg:hidden w-10 h-10 grid place-items-center border border-[#211a13]/15 text-[#211a13] hover:border-[#a58150] hover:text-[#a58150] transition-colors"
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-500 border-t border-[#211a13]/10 bg-[#fdfbf6] ${
          open ? 'max-h-[420px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <nav className="flex flex-col px-6 py-6 gap-1">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.label}
              href={`${basePath}${item.href}`}
              onClick={() => setOpen(false)}
              className="py-3 text-[13px] tracking-[0.18em] uppercase text-[#211a13] border-b border-[#211a13]/5 hover:text-[#a58150] transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
