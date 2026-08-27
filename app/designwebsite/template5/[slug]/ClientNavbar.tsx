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
    <header className="sticky top-0 z-50 w-full bg-[#F8F7F4]/95 backdrop-blur-md border-b border-[#1E2322]/15">
      {/* ─── Top Utility Strip ─── */}
      <div className="bg-[#181C1B] text-stone-300 text-[11px] font-mono py-1.5 px-4 sm:px-8 border-b border-[#2D3331]">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-4">
            <span className="inline-flex items-center gap-1.5 text-[#C49B45] font-semibold">
              <ShieldCheck className="w-3.5 h-3.5 text-[#C85A32]" />
              <span className="tracking-wider">IS 456 &bull; NBC 2016 COMPLIANT CIVIL CONTRACTORS</span>
            </span>
            <span className="hidden md:inline-block text-stone-600">|</span>
            <span className="hidden md:inline-flex items-center gap-1 text-stone-400">
              <Clock className="w-3 h-3 text-[#C49B45]" />
              <span>MON - SAT: 09:00 AM - 07:30 PM</span>
            </span>
          </div>

          <div className="flex items-center gap-6">
            <span className="hidden sm:inline-block text-[#C49B45] font-medium tracking-widest text-[10px] uppercase">
              10-YEAR STRUCTURAL GUARANTEE
            </span>
            <a
              href={`tel:${phone.replace(/[^0-9+]/g, '')}`}
              className="inline-flex items-center gap-1.5 text-stone-200 font-medium hover:text-[#C85A32] transition-colors"
            >
              <Phone className="w-3 h-3 text-[#C85A32]" />
              <span>DIRECT: {phone}</span>
            </a>
          </div>
        </div>
      </div>

      {/* ─── Main Architectural Navbar ─── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-3 flex items-center justify-between gap-4">
        {/* Brand Name with Refined Architectural Styling */}
        <Link href={basePath} className="flex items-center gap-3 group">
          <div className="w-9 h-9 bg-[#C85A32] text-white flex items-center justify-center font-bold text-lg rounded-sm shadow-sm group-hover:bg-[#B34D28] transition-colors">
            <Building className="w-4 h-4" />
          </div>
          <div className="flex flex-col">
            <span className="text-lg sm:text-xl font-bold uppercase tracking-tight text-[#1E2322] leading-none">
              {clinicName}
            </span>
            <span className="text-[9px] font-mono font-bold uppercase tracking-[0.2em] text-[#C85A32] mt-0.5">
              ARCHITECTS &bull; BUILDERS &bull; INTERIORS
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 font-mono text-xs font-semibold">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="px-3 py-1.5 text-[#1E2322] hover:text-[#C85A32] hover:bg-[#1E2322]/5 rounded-sm transition-all uppercase tracking-wider"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Action Button & Mobile Toggle */}
        <div className="flex items-center gap-3">
          <Link
            href={`${basePath}#consultation-form`}
            className="hidden sm:inline-flex items-center gap-2 px-4 py-2 bg-[#C85A32] hover:bg-[#B34D28] text-white font-semibold text-xs uppercase tracking-widest rounded-sm shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all"
          >
            <HardHat className="w-3.5 h-3.5" />
            <span>BOOK CONSULTATION</span>
          </Link>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-[#1E2322] bg-white border border-[#1E2322]/20 rounded-sm hover:bg-stone-100 transition-colors"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* ─── Mobile Drawer ─── */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#F8F7F4] border-t border-[#1E2322]/15 px-4 py-6 space-y-4 shadow-lg animate-in slide-in-from-top-2 duration-200">
          <div className="grid grid-cols-1 gap-2 font-mono text-xs font-semibold">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between px-4 py-2.5 bg-white text-[#1E2322] border border-[#1E2322]/10 rounded-sm hover:border-[#C85A32] hover:bg-[#C85A32] hover:text-white transition-all uppercase tracking-wider"
              >
                <span>{link.label}</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            ))}
          </div>

          <div className="pt-2">
            <Link
              href={`${basePath}#consultation-form`}
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 py-3 bg-[#C85A32] hover:bg-[#B34D28] text-white font-semibold text-xs uppercase tracking-widest rounded-sm shadow-sm transition-all"
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
