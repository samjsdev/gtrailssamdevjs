'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  Phone, HardHat, Compass, Menu, X, ArrowRight, 
  ShieldCheck, Calculator, Building, Clock, ChevronRight
} from 'lucide-react';

interface ClientNavbarProps {
  slug: string;
  clinicName: string;
  phone: string;
  basePath: string;
}

export default function ClientNavbar({
  slug,
  clinicName,
  phone,
  basePath,
}: ClientNavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'HOME', href: basePath },
    { label: 'SERVICES', href: `${basePath}/services` },
    { label: 'CALCULATOR', href: `${basePath}#cost-calculator` },
    { label: 'PACKAGES', href: `${basePath}#packages` },
    { label: 'GALLERY', href: `${basePath}/gallery` },
    { label: 'ABOUT', href: `${basePath}/about` },
    { label: 'CONTACT', href: `${basePath}/contact` },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-[#F4F3EE] border-b-2 border-[#252A29] shadow-[0_4px_0px_#252A29]">
      {/* ─── Top Utility Strip ─── */}
      <div className="bg-[#252A29] text-[#F4F3EE] text-[11px] font-mono py-1.5 px-4 sm:px-8 border-b border-[#111111]">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-4">
            <span className="inline-flex items-center gap-1.5 text-[#C8A84E] font-bold">
              <ShieldCheck className="w-3.5 h-3.5 text-[#E94B26]" />
              <span className="tracking-wider">IS 456 &bull; NBC 2016 COMPLIANT CIVIL CONTRACTORS</span>
            </span>
            <span className="hidden md:inline-block text-[#F4F3EE]/40">|</span>
            <span className="hidden md:inline-flex items-center gap-1 text-[#F4F3EE]/80">
              <Clock className="w-3 h-3 text-[#C8A84E]" />
              <span>MON - SAT: 09:00 AM - 07:30 PM</span>
            </span>
          </div>

          <div className="flex items-center gap-6">
            <span className="hidden sm:inline-block text-[#C8A84E] font-bold tracking-widest text-[10px] uppercase">
              10-YEAR STRUCTURAL GUARANTEE
            </span>
            <a
              href={`tel:${phone.replace(/[^0-9+]/g, '')}`}
              className="inline-flex items-center gap-1.5 text-[#F4F3EE] font-bold hover:text-[#E94B26] transition-colors"
            >
              <Phone className="w-3 h-3 text-[#E94B26]" />
              <span>DIRECT: {phone}</span>
            </a>
          </div>
        </div>
      </div>

      {/* ─── Main Architectural Navbar ─── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-3.5 flex items-center justify-between gap-4">
        {/* Brand Name with Heavy Condensed Styling */}
        <Link href={basePath} className="flex items-center gap-3 group">
          <div className="w-10 h-10 bg-[#E94B26] text-[#F4F3EE] flex items-center justify-center font-black text-xl border-2 border-[#111111] shadow-[2px_2px_0px_#111111] group-hover:translate-x-[1px] group-hover:translate-y-[1px] transition-transform">
            <Building className="w-5 h-5" />
          </div>
          <div className="flex flex-col">
            <span className="text-xl sm:text-2xl font-black uppercase tracking-tight text-[#252A29] leading-none">
              {clinicName}
            </span>
            <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#E94B26] mt-0.5">
              ARCHITECTS &bull; BUILDERS &bull; INTERIORS
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 font-mono text-xs font-bold">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="px-3 py-2 text-[#252A29] hover:text-[#E94B26] hover:bg-[#252A29]/5 border border-transparent hover:border-[#252A29]/20 transition-all uppercase tracking-wider"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Action Button & Mobile Toggle */}
        <div className="flex items-center gap-3">
          <Link
            href={`${basePath}#consultation-form`}
            className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 bg-[#E94B26] text-[#F4F3EE] font-black text-xs uppercase tracking-widest border-2 border-[#111111] shadow-[3px_3px_0px_#111111] hover:shadow-[1px_1px_0px_#111111] hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
          >
            <HardHat className="w-4 h-4" />
            <span>BOOK CONSULTATION</span>
          </Link>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-[#252A29] bg-[#FFFFFF] border-2 border-[#252A29] shadow-[2px_2px_0px_#252A29] hover:bg-[#F4F3EE] transition-colors"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* ─── Mobile Drawer ─── */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#F4F3EE] border-t-2 border-[#252A29] px-4 py-6 space-y-4 shadow-xl">
          <div className="grid grid-cols-1 gap-2 font-mono text-sm font-bold">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between px-4 py-3 bg-[#FFFFFF] text-[#252A29] border border-[#252A29] hover:border-[#E94B26] hover:bg-[#E94B26] hover:text-[#F4F3EE] transition-all uppercase tracking-wider"
              >
                <span>{link.label}</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            ))}
          </div>

          <div className="pt-2">
            <Link
              href={`${basePath}#consultation-form`}
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 py-3.5 bg-[#E94B26] text-[#F4F3EE] font-black text-xs uppercase tracking-widest border-2 border-[#111111] shadow-[3px_3px_0px_#111111]"
            >
              <HardHat className="w-4 h-4" />
              <span>REQUEST SITE SURVEY</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
