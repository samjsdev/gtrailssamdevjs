'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';

interface ClientHeaderProps {
  clinicName: string;
  basePath: string;
}

const NAV_ITEMS = [
  { label: 'Home', href: '' },
  { label: 'Offerings', href: '/services' },
  { label: 'Projects', href: '/gallery' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

export default function ClientHeader({ clinicName, basePath }: ClientHeaderProps) {
  const [open, setOpen] = useState(false);
  const initial = (clinicName || 'S').charAt(0).toUpperCase();
  const words = (clinicName || 'Design Studio').split(' ');
  const firstWord = words[0];
  const rest = words.slice(1).join(' ');

  return (
    <header className="sticky top-0 z-[200] bg-[#fbf7f2]/95 backdrop-blur-lg border-b border-[#241f1a]/10">
      <div className="max-w-[1220px] mx-auto px-7 flex items-center justify-between py-3.5">
        {/* Brand */}
        <Link href={basePath} className="flex items-center gap-2.5 text-[18px] sm:text-[22px] font-extrabold tracking-[-0.02em] min-w-0 mr-3" onClick={() => setOpen(false)}>
          <span className="w-[34px] h-[34px] shrink-0 rounded-[11px] bg-[#d8442c] text-white grid place-items-center text-[16px] font-extrabold">
            {initial}
          </span>
          <span className="truncate max-w-[48vw] sm:max-w-none">
            {firstWord}
            {rest && <span className="text-[#d8442c]"> {rest}</span>}
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-7">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.label}
              href={`${basePath}${item.href}`}
              className="text-[14.5px] font-bold text-[#6d6259] hover:text-[#d8442c] transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Right */}
        <div className="flex items-center gap-4">
          <Link
            href={`${basePath}/contact`}
            className="hidden sm:inline-flex items-center justify-center bg-[#d8442c] text-white font-extrabold text-[13.5px] px-5.5 py-3 rounded-xl hover:bg-[#b93320] hover:-translate-y-0.5 hover:shadow-[0_12px_26px_rgba(216,68,44,0.3)] transition-all duration-250"
          >
            Book Free Design Session
          </Link>
          <button
            onClick={() => setOpen(!open)}
            aria-label="Toggle navigation menu"
            className="lg:hidden w-10 h-10 rounded-xl border border-[#241f1a]/10 grid place-items-center text-[#241f1a] hover:border-[#d8442c] hover:text-[#d8442c] transition-colors"
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-500 bg-white border-t border-[#241f1a]/10 ${
          open ? 'max-h-[420px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <nav className="flex flex-col px-7 py-5 gap-1">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.label}
              href={`${basePath}${item.href}`}
              onClick={() => setOpen(false)}
              className="py-3 text-[14.5px] font-bold text-[#241f1a] border-b border-[#241f1a]/5 hover:text-[#d8442c] transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
