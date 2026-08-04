'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';

interface ClientHeaderProps {
  studioName: string;
  basePath: string;
  city: string;
}

export default function ClientHeader({ studioName, basePath, city }: ClientHeaderProps) {
  const [open, setOpen] = useState(false);

  const words = (studioName || 'Design Studio').split(' ');
  const first = words.slice(0, -1).join(' ') || words[0];
  const last = words.length > 1 ? words[words.length - 1] : '';

  const links = [
    { href: basePath, label: 'Home' },
    { href: `${basePath}/about`, label: 'The Atelier' },
    { href: `${basePath}/services`, label: 'Services' },
    { href: `${basePath}/gallery`, label: 'Homes' },
    { href: `${basePath}/contact`, label: 'Visit' },
  ];

  return (
    <header className="sticky top-0 z-[200] bg-[#f5f1e8]/95 backdrop-blur-[14px] border-b border-[#221c14]/14">
      <div className="max-w-[1240px] mx-auto px-[30px] flex items-center justify-between py-[17px]">
        <Link href={basePath} className="flex flex-col leading-[1.05] min-w-0 mr-3" onClick={() => setOpen(false)}>
          <b className="font-[family-name:var(--font-cormorant)] text-[20px] sm:text-[28px] font-semibold tracking-[0.06em] truncate max-w-[62vw] sm:max-w-none">
            {first} {last && <span className="text-[#a4532f] italic">{last}</span>}
          </b>
          <small className="text-[9.5px] tracking-[0.48em] uppercase text-[#7a6f60]">
            Curated Home Interiors
          </small>
        </Link>

        <nav className="hidden lg:flex gap-8 text-[13.5px] font-medium tracking-[0.08em] uppercase">
          {links.map((link) => (
            <Link key={link.label} href={link.href} className="text-[#7a6f60] hover:text-[#a4532f] transition-colors duration-200">
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <Link
            href={`${basePath}/contact`}
            className="hidden sm:inline-flex items-center justify-center bg-[#17130f] text-white px-[26px] py-[13px] text-[11.5px] font-semibold tracking-[0.14em] uppercase hover:bg-black hover:-translate-y-0.5 transition-all duration-300"
          >
            Book a Private Consultation
          </Link>
          <button
            className="lg:hidden text-[#221c14]"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="lg:hidden absolute top-full left-0 right-0 bg-[#fbf8f1] border-b border-[#221c14]/14 flex flex-col px-[30px] py-6 gap-4 text-[13.5px] font-medium tracking-[0.08em] uppercase">
          {links.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={() => setOpen(false)}
              className="text-[#7a6f60] hover:text-[#a4532f] transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href={`${basePath}/contact`}
            onClick={() => setOpen(false)}
            className="inline-flex items-center justify-center bg-[#17130f] text-white px-[26px] py-[13px] text-[11.5px] font-semibold tracking-[0.14em] uppercase mt-2"
          >
            Book a Private Consultation
          </Link>
        </nav>
      )}
    </header>
  );
}
