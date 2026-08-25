'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Phone, Menu, X, ArrowRight, Shield, Compass, Calculator } from 'lucide-react';

interface ClientNavbarProps {
  slug: string;
  clinicName: string;
  phone: string;
  basePath: string;
}

export default function ClientNavbar({ slug, clinicName, phone, basePath }: ClientNavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'HOME', href: `${basePath}` },
    { label: 'ABOUT US', href: `${basePath}/about` },
    { label: 'SERVICES & PILLARS', href: `${basePath}/services` },
    { label: 'PROJECTS & SITES', href: `${basePath}/gallery` },
    { label: 'CONTACT', href: `${basePath}/contact` },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-[#111111] border-b-2 border-[#252A29]">
      {/* Top Industrial Utility Bar */}
      <div className="bg-[#181B1A] border-b border-[#252A29] text-[#F4F3EE] text-xs font-mono py-1.5 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-[#C8A84E] font-bold tracking-widest text-[11px] uppercase">
              <Compass className="w-3.5 h-3.5" />
              ARCHITECTURAL DESIGN &bull; CIVIL CONSTRUCTION &bull; INTERIORS
            </span>
            <span className="hidden md:inline-block text-[#F4F3EE]/40">|</span>
            <span className="hidden md:inline-flex items-center gap-1 text-[#F4F3EE]/70 text-[11px] tracking-wider">
              <Shield className="w-3 h-3 text-[#E94B26]" />
              GOVT. REGISTERED CIVIL ENGINEERS & ARCHITECTS
            </span>
          </div>

          <div className="flex items-center gap-6">
            <a
              href={`tel:${phone.replace(/[^0-9+]/g, '')}`}
              className="flex items-center gap-1.5 text-[#F4F3EE] hover:text-[#E94B26] transition-colors font-bold tracking-wider text-[11px]"
            >
              <Phone className="w-3 h-3 text-[#E94B26]" />
              <span>DIRECT HOTLINE: {phone}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Heavy Industrial Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo & Name */}
        <Link href={basePath} className="flex items-center gap-3 group">
          <div className="w-11 h-11 bg-[#E94B26] text-[#F4F3EE] font-black text-xl flex items-center justify-center border border-[#111111] shadow-[3px_3px_0px_#C8A84E] group-hover:translate-x-0.5 group-hover:translate-y-0.5 transition-transform">
            {clinicName.charAt(0).toUpperCase()}
          </div>
          <div className="flex flex-col">
            <span className="text-xl sm:text-2xl font-black tracking-tight text-[#F4F3EE] uppercase leading-none group-hover:text-[#E94B26] transition-colors">
              {clinicName}
            </span>
            <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-[#C8A84E] mt-1">
              ARCHITECTS & BUILDERS
            </span>
          </div>
        </Link>

        {/* Desktop Nav Links */}
        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-xs font-black tracking-[0.18em] text-[#F4F3EE]/85 hover:text-[#E94B26] uppercase transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-[#E94B26] hover:after:w-full after:transition-all"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Desktop CTA Action Button */}
        <div className="hidden lg:flex items-center gap-4">
          <Link
            href={`${basePath}#cost-calculator`}
            className="flex items-center gap-2 px-3.5 py-2.5 bg-[#252A29] text-[#F4F3EE] text-xs font-bold uppercase tracking-wider border border-[#C8A84E]/40 hover:border-[#C8A84E] hover:bg-[#2e3433] transition-all"
          >
            <Calculator className="w-3.5 h-3.5 text-[#C8A84E]" />
            <span>COST CALCULATOR</span>
          </Link>
          <Link
            href={`${basePath}/contact`}
            className="flex items-center gap-2 px-5 py-2.5 bg-[#E94B26] text-[#F4F3EE] text-xs font-black uppercase tracking-[0.15em] border border-[#111111] shadow-[4px_4px_0px_#111111] hover:shadow-[1px_1px_0px_#111111] hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
          >
            <span>GET FREE QUOTE</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2.5 bg-[#252A29] text-[#F4F3EE] border border-[#C8A84E]/50 focus:outline-none"
          aria-label="Toggle Navigation Menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6 text-[#E94B26]" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#181B1A] border-b-4 border-[#E94B26] px-6 py-6 space-y-4">
          <nav className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-black tracking-widest text-[#F4F3EE] hover:text-[#E94B26] py-2 border-b border-[#252A29]"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="pt-2 flex flex-col gap-3">
            <Link
              href={`${basePath}#cost-calculator`}
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 py-3 bg-[#252A29] text-[#F4F3EE] text-xs font-bold uppercase tracking-wider border border-[#C8A84E]"
            >
              <Calculator className="w-4 h-4 text-[#C8A84E]" />
              <span>ESTIMATE COST</span>
            </Link>
            <Link
              href={`${basePath}/contact`}
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 py-3 bg-[#E94B26] text-[#F4F3EE] text-xs font-black uppercase tracking-widest border border-[#111111] shadow-[3px_3px_0px_#000000]"
            >
              <span>GET FREE QUOTE</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
