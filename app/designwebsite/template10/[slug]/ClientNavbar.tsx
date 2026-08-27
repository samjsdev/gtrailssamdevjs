'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Phone, Menu, X, ArrowRight, ShieldCheck, Compass, Calculator, HardHat } from 'lucide-react';

interface ClientNavbarProps {
  slug: string;
  clinicName: string;
  phone: string;
  basePath: string;
}

export default function ClientNavbar({ slug, clinicName, phone, basePath }: ClientNavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'HOME', href: `${basePath}` },
    { label: 'ABOUT FIRM', href: `${basePath}/about` },
    { label: 'CORE SERVICES', href: `${basePath}/services` },
    { label: 'PACKAGES', href: `${basePath}#packages` },
    { label: 'PROJECTS & SITES', href: `${basePath}/gallery` },
    { label: 'CONTACT', href: `${basePath}/contact` },
  ];

  return (
    <header className={`sticky top-0 z-50 w-full transition-all duration-300 ${
      scrolled ? 'bg-[#252A29]/95 backdrop-blur-md shadow-2xl border-b border-[#C8A84E]/30' : 'bg-[#252A29] border-b-2 border-[#111111]'
    }`}>
      {/* Top Architectural Utility Bar */}
      <div className="bg-[#1A1E1D] border-b border-[#252A29] text-[#F4F3EE] py-2 px-4 sm:px-8 text-[11px] font-mono tracking-wider">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-[#C8A84E] font-bold uppercase tracking-widest">
              <Compass className="w-3.5 h-3.5" />
              ARCHITECTURAL DESIGN &bull; RESIDENTIAL CIVIL CONSTRUCTION &bull; INTERIORS
            </span>
            <span className="hidden lg:inline-block text-[#F4F3EE]/30">|</span>
            <span className="hidden lg:inline-flex items-center gap-1 text-[#F4F3EE]/75 text-[11px]">
              <ShieldCheck className="w-3.5 h-3.5 text-[#E94B26]" />
              LICENSED STRUCTURAL ENGINEERS & ARCHITECTS
            </span>
          </div>

          <div className="flex items-center gap-6">
            <span className="hidden sm:inline-block text-[#C8A84E]/90 font-bold">
              ESTABLISHED PRACTICE &bull; 100% FIXED-COST CONTRACTS
            </span>
            <a
              href={`tel:${phone.replace(/[^0-9+]/g, '')}`}
              className="flex items-center gap-1.5 text-[#F4F3EE] hover:text-[#E94B26] font-black tracking-widest text-[11px] transition-colors"
            >
              <Phone className="w-3 h-3 text-[#E94B26]" />
              <span>HOTLINE: {phone}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Architectural Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 h-20 sm:h-22 flex items-center justify-between">
        {/* Brand Logo & Monogram */}
        <Link href={basePath} className="flex items-center gap-3.5 group">
          <div className="w-12 h-12 bg-[#E94B26] text-[#F4F3EE] font-black text-2xl flex items-center justify-center border-2 border-[#111111] shadow-[4px_4px_0px_#111111] group-hover:translate-x-0.5 group-hover:translate-y-0.5 transition-transform">
            {clinicName.charAt(0).toUpperCase()}
          </div>
          <div className="flex flex-col">
            <span className="text-xl sm:text-2xl font-black tracking-tight text-[#F4F3EE] uppercase leading-none group-hover:text-[#E94B26] transition-colors">
              {clinicName}
            </span>
            <span className="text-[10px] uppercase font-bold tracking-[0.28em] text-[#C8A84E] mt-1.5 flex items-center gap-1.5">
              <span>ARCHITECTS & BUILDERS</span>
              <span className="w-1.5 h-1.5 bg-[#E94B26] inline-block"></span>
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-7">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-xs font-black tracking-[0.2em] text-[#F4F3EE]/90 hover:text-[#E94B26] uppercase transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-[#E94B26] hover:after:w-full after:transition-all"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Action Buttons */}
        <div className="hidden lg:flex items-center gap-3.5">
          <Link
            href={`${basePath}#cost-calculator`}
            className="flex items-center gap-2 px-4 py-2.5 bg-[#1A1E1D] text-[#F4F3EE] text-xs font-bold uppercase tracking-wider border border-[#C8A84E]/50 hover:border-[#C8A84E] hover:bg-[#252A29] transition-all shadow-[2px_2px_0px_#111111]"
          >
            <Calculator className="w-3.5 h-3.5 text-[#C8A84E]" />
            <span>COST CALCULATOR</span>
          </Link>
          <Link
            href={`${basePath}/contact`}
            className="flex items-center gap-2 px-5 py-2.5 bg-[#E94B26] text-[#F4F3EE] text-xs font-black uppercase tracking-[0.16em] border border-[#111111] shadow-[4px_4px_0px_#111111] hover:shadow-[1px_1px_0px_#111111] hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
          >
            <span>GET FREE BOQ</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2.5 bg-[#1A1E1D] text-[#F4F3EE] border-2 border-[#C8A84E]/60 focus:outline-none shadow-[2px_2px_0px_#111111]"
          aria-label="Toggle Menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6 text-[#E94B26]" /> : <Menu className="w-6 h-6 text-[#F4F3EE]" />}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#1A1E1D] border-b-4 border-[#E94B26] px-6 py-6 space-y-4 animate-in slide-in-from-top-4 duration-200 shadow-2xl">
          <nav className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-xs font-black tracking-widest text-[#F4F3EE] hover:text-[#E94B26] py-3 border-b border-[#252A29] flex items-center justify-between"
              >
                <span>{link.label}</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#C8A84E]" />
              </Link>
            ))}
          </nav>
          <div className="pt-3 flex flex-col gap-3">
            <Link
              href={`${basePath}#cost-calculator`}
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 py-3 bg-[#252A29] text-[#F4F3EE] text-xs font-bold uppercase tracking-wider border border-[#C8A84E]"
            >
              <Calculator className="w-4 h-4 text-[#C8A84E]" />
              <span>CALCULATE CONSTRUCTION COST</span>
            </Link>
            <Link
              href={`${basePath}/contact`}
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 py-3.5 bg-[#E94B26] text-[#F4F3EE] text-xs font-black uppercase tracking-widest border border-[#111111] shadow-[4px_4px_0px_#111111]"
            >
              <span>REQUEST TECHNICAL SITE VISIT</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
