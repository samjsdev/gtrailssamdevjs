'use client';

import { useState } from 'react';
import Link from 'next/link';

interface ClientNavbarProps {
  slug?: string;
  clinicName?: string;
  phone: string;
  basePath: string;
}

export default function ClientNavbar({
  phone,
  basePath,
}: ClientNavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const rawDigits = phone.replace(/\D/g, '');
  const cleanPhone = rawDigits.startsWith('91') ? rawDigits : `91${rawDigits.replace(/^0+/, '')}`;

  const navLinks = [
    { label: 'Services', href: `${basePath}/services` },
    { label: 'Packages', href: `${basePath}#packages` },
    { label: 'Projects', href: `${basePath}/gallery` },
    { label: 'Process', href: `${basePath}#process` },
    { label: 'About', href: `${basePath}/about` },
    { label: 'Contact', href: `${basePath}/contact` },
  ];

  return (
    <>
      {/* ── Top Utility Info Strip ── */}
      <div className="bg-[#181818] text-white/70 text-[11px] font-bold tracking-widest uppercase px-6 md:px-12 py-2 border-b border-[#2A2A2A] flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-3 flex-wrap">
          <span className="text-[#EA580C] flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 bg-[#EA580C] rounded-full animate-pulse" />
            SINCE 1998
          </span>
          <span className="text-white/30 hidden sm:inline">•</span>
          <span className="text-white/80 hidden sm:inline">28+ YEARS OF ARCHITECTURAL & TURNKEY TRUST</span>
          <span className="text-white/30 hidden md:inline">•</span>
          <span className="text-white/60 hidden md:inline">ANNA NAGAR EAST, CHENNAI</span>
        </div>
        <div className="flex items-center gap-4">
          <a
            href={`tel:${phone}`}
            className="text-white hover:text-[#EA580C] transition-colors"
          >
            DIRECT LINE: <span className="text-[#EA580C]">{phone}</span>
          </a>
          <a
            href={`https://wa.me/${cleanPhone}?text=${encodeURIComponent('Hi Murali Patharala Associates (MPA), I would like to enquire about turnkey construction and architecture.')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-block px-2.5 py-0.5 bg-[#EA580C] text-[#111111] hover:bg-white transition-colors text-[10px]"
          >
            WHATSAPP
          </a>
        </div>
      </div>

      {/* ── Main Sticky Navigation ── */}
      <nav className="sticky top-0 z-50 bg-[#111111] text-white border-b-4 border-[#111111] px-6 md:px-12 py-4 flex items-center justify-between">
        <Link href={basePath || '/'} className="flex items-center gap-3 group">
          <div className="w-7 h-7 bg-[#EA580C] flex items-center justify-center shrink-0">
            <div className="w-2.5 h-2.5 bg-[#111111]"></div>
          </div>
          <div className="flex flex-col">
            <span
              className="text-xl sm:text-2xl font-bold tracking-tight uppercase text-[#EA580C] leading-none"
              style={{ fontFamily: "'Lora', serif" }}
            >
              MPA
            </span>
            <span className="text-[9px] font-bold tracking-[0.25em] text-white/80 uppercase mt-0.5">
              Murali Patharala Associates
            </span>
          </div>
        </Link>

        {/* Desktop Nav Links */}
        <ul className="hidden lg:flex gap-8 items-center">
          {navLinks.map((link) => (
            <li key={link.label}>
              <Link
                href={link.href}
                className="text-xs font-bold uppercase tracking-widest text-[#EA580C] hover:text-white transition-colors"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Action Button */}
        <div className="hidden sm:flex items-center gap-4">
          <Link
            href={`${basePath}#quick-estimate`}
            className="px-6 py-3 bg-[#EA580C] text-[#111111] text-xs font-bold uppercase tracking-widest hover:bg-white transition-colors"
          >
            Get Estimate
          </Link>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          aria-label="Toggle navigation menu"
          className="lg:hidden text-[#EA580C] hover:text-white transition-colors p-1"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? (
            <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </nav>

      {/* Mobile Drawer Menu */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 bg-[#111111] text-[#EA580C] flex flex-col pt-24 px-6 pb-8 overflow-y-auto">
          <div className="space-y-1 divide-y divide-[#262626]">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="block py-4 text-xl font-bold uppercase tracking-wide hover:text-white transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="mt-8 pt-8 border-t border-[#262626] space-y-4">
            <Link
              href={`${basePath}#quick-estimate`}
              onClick={() => setMobileOpen(false)}
              className="block w-full py-4 text-center bg-[#EA580C] text-[#111111] font-bold uppercase tracking-widest hover:bg-white transition-colors"
            >
              Get Instant Estimate
            </Link>
            <a
              href={`tel:${phone}`}
              className="block w-full py-3 text-center border-2 border-[#EA580C] text-[#EA580C] font-bold uppercase tracking-widest hover:bg-[#EA580C] hover:text-[#111111] transition-colors"
            >
              Call {phone}
            </a>
          </div>
        </div>
      )}
    </>
  );
}
