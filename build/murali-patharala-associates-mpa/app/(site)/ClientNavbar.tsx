'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  Phone, Menu, X, ArrowRight, ShieldCheck, 
  Clock, Compass, Sparkles, ChevronRight, MessageSquare,
  Building, MapPin
} from 'lucide-react';

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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Home', href: basePath || '/' },
    { label: 'Services', href: `${basePath}/services` },
    { label: 'Packages', href: `${basePath}#packages` },
    { label: 'Cost Calculator', href: `${basePath}#cost-calculator` },
    { label: 'Why Us', href: `${basePath}#why-us` },
    { label: 'Projects', href: `${basePath}/gallery` },
    { label: 'About', href: `${basePath}/about` },
    { label: 'Contact', href: `${basePath}/contact` },
  ];

  const formattedPhone = phone.replace(/[^0-9+]/g, '');
  const rawDigits = phone.replace(/\D/g, '');
  const cleanPhone = rawDigits.startsWith('91') ? rawDigits : `91${rawDigits.replace(/^0+/, '')}`;

  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md border-b border-stone-200 shadow-xs transition-all">
      {/* ─── Top Utility Announcement Bar (charcoal with orange & gold) ─── */}
      <div className="bg-[#242624] text-stone-300 text-[11px] py-2 px-4 sm:px-8 border-b border-stone-700/60">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3 font-normal">
          <div className="flex items-center gap-3 sm:gap-4 flex-wrap">
            <span className="inline-flex items-center gap-1.5 text-[#E64D16] font-semibold tracking-wide">
              <span className="w-2 h-2 rounded-full bg-[#E64D16] animate-pulse" />
              <span>SINCE 1998</span>
            </span>
            <span className="text-stone-600 hidden sm:inline">&bull;</span>
            <span className="text-stone-300 hidden sm:inline">28+ Years of Architectural &amp; Turnkey Construction Trust</span>
            <span className="text-stone-600 hidden md:inline">&bull;</span>
            <span className="hidden md:inline-flex items-center gap-1 text-[#B8934B]">
              <MapPin className="w-3 h-3 text-[#E64D16]" />
              <span>Anna Nagar East, Chennai</span>
            </span>
          </div>

          <div className="flex items-center gap-5">
            <span className="hidden lg:inline-flex items-center gap-1.5 text-stone-300 text-[11px]">
              <Clock className="w-3 h-3 text-[#C9A25C]" />
              <span>Mon &ndash; Sat: 9:30 AM &ndash; 7:30 PM</span>
            </span>
            <a
              href={`tel:${formattedPhone}`}
              className="inline-flex items-center gap-1.5 text-white font-medium hover:text-[#E64D16] transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-[#E64D16]" />
              <span className="font-semibold">{phone}</span>
            </a>
            <a
              href={`https://wa.me/${cleanPhone}?text=${encodeURIComponent('Hi ARCH Foundations & Murali Patharala Associates, I would like to enquire about home construction & architectural design.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1 px-2.5 py-0.5 bg-emerald-700/80 hover:bg-emerald-600 text-white rounded text-[10px] font-medium transition-colors"
            >
              WhatsApp
            </a>
          </div>
        </div>
      </div>

      {/* ─── Main Navigation Bar ─── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-3 flex items-center justify-between gap-4">
        {/* Brand Logo & Name Board Aesthetic */}
        <Link href={basePath || '/'} className="flex items-center gap-3 group">
          {/* Name-board inspired badge: charcoal tile + orange M + gold strip */}
          <div className="w-12 h-12 rounded-md bg-[#242624] flex flex-col items-center justify-center shadow-md group-hover:scale-105 transition-all border border-stone-700 shrink-0 overflow-hidden relative">
            <span className="font-serif font-black text-xl leading-none text-[#E64D16] tracking-tighter">M</span>
            <span className="text-[7px] font-extrabold tracking-[0.2em] text-[#B8934B] uppercase mt-0.5">MPA</span>
            <span className="absolute bottom-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#E64D16] to-[#B8934B]" />
          </div>

          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="text-base sm:text-lg font-extrabold tracking-tight text-[#242624] group-hover:text-[#E64D16] transition-colors leading-tight">
                ARCH foundations
              </span>
              <span className="text-[9px] px-1.5 py-0.2 bg-[#B8934B]/15 text-[#7A5F2A] font-bold rounded border border-[#B8934B]/40 uppercase tracking-wide">
                Since 1998
              </span>
            </div>
            <span className="text-[11px] font-medium text-stone-600 tracking-tight leading-tight">
              murali patharala &amp; associates (mpa)
            </span>
            <span className="text-[9px] tracking-wider uppercase font-semibold text-[#E64D16] leading-none pt-0.5">
              Architects &bull; Builders &bull; Interior Consultants
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="px-3 py-2 text-xs font-semibold text-stone-700 hover:text-[#E64D16] hover:bg-orange-50/70 rounded-lg transition-all tracking-wide"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Action Button & Mobile Trigger */}
        <div className="flex items-center gap-3">
          <Link
            href={`${basePath}#consultation-form`}
            className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 bg-[#E64D16] hover:bg-[#C93F0F] text-white font-bold text-xs tracking-wider uppercase rounded-md shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all"
          >
            <span>Get A Free Quote</span>
            <ArrowRight className="w-3.5 h-3.5 text-white/90" />
          </Link>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-stone-800 bg-stone-100 border border-stone-200 rounded-md hover:bg-stone-200 transition-colors"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* ─── Mobile Navigation Drawer ─── */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-stone-200 px-4 py-6 space-y-4 shadow-xl animate-in slide-in-from-top-2 duration-200">
          <div className="p-3 bg-orange-50 border border-orange-100 rounded-md flex items-center justify-between">
            <div>
              <div className="text-xs font-bold text-stone-900">Murali Patharala &amp; Associates</div>
              <div className="text-[10px] text-[#E64D16] font-semibold">Architects &amp; Builders &bull; Anna Nagar East</div>
            </div>
            <a
              href={`tel:${formattedPhone}`}
              className="px-3 py-1.5 bg-[#E64D16] text-white text-xs font-bold rounded-lg shadow-xs"
            >
              Call Now
            </a>
          </div>

          <div className="grid grid-cols-1 gap-1 text-xs font-semibold">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between px-4 py-3 bg-stone-50 text-stone-800 rounded-md hover:bg-orange-50 hover:text-[#E64D16] transition-all"
              >
                <span>{link.label}</span>
                <ChevronRight className="w-4 h-4 text-stone-400" />
              </Link>
            ))}
          </div>

          <div className="pt-2 space-y-2">
            <Link
              href={`${basePath}#consultation-form`}
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 py-3.5 bg-[#E64D16] hover:bg-[#C93F0F] text-white font-bold text-xs tracking-wider uppercase rounded-md shadow-sm transition-all"
            >
              <span>Get Free Construction Quote</span>
              <ArrowRight className="w-4 h-4 text-white" />
            </Link>
            <a
              href={`https://wa.me/${cleanPhone}?text=${encodeURIComponent('Hi ARCH Foundations & Murali Patharala Associates, I would like to enquire about home construction & architectural design.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs tracking-wide rounded-md shadow-xs transition-all"
            >
              <MessageSquare className="w-4 h-4 text-white" />
              <span>Chat on WhatsApp (+91 {phone.slice(-10)})</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
