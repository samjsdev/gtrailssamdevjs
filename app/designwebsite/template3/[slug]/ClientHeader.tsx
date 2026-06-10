'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { INTERIOR_HERO_IMAGES } from '@/lib/interiorContent';

interface ClientHeaderProps {
  clinic: any;
  basePath: string;
}

export default function ClientHeader({ clinic, basePath }: ClientHeaderProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-6 z-50 flex justify-center px-4 md:px-6 transition-all duration-300 w-full">
      <div className="w-full max-w-5xl lg:max-w-6xl transition-all duration-300">
        <div className={`flex flex-col bg-white/80 backdrop-blur-xl shadow-[0_12px_40px_rgba(0,0,0,0.06)] border border-white/60 overflow-hidden transition-all duration-300 ${
          isOpen ? 'rounded-[32px]' : 'rounded-full'
        }`}>
          <div className="flex items-center justify-between gap-4 md:gap-8 px-6 md:px-8 py-3.5 w-full">
            <Link href={basePath} className="flex items-center gap-3.5 leading-none group shrink-0">
              <div className="relative w-10 h-10 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-2xs group-hover:scale-105 transition-transform duration-300">
                <Image
                  src={INTERIOR_HERO_IMAGES.home}
                  alt="Interior design studio"
                  fill
                  sizes="40px"
                  className="object-cover"
                />
              </div>
              <h1 className="font-fustat text-lg md:text-xl font-bold tracking-tight text-slate-900">
                {clinic.name || 'Studio Name'}
              </h1>
            </Link>
            
            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-8 text-[14px] font-semibold text-slate-600">
              <Link href={`${basePath}`} className="hover:text-[#B48A66] transition-colors relative py-1">Home</Link>
              <Link href={`${basePath}/about`} className="hover:text-[#B48A66] transition-colors relative py-1">About</Link>
              <Link href={`${basePath}/services`} className="hover:text-[#B48A66] transition-colors relative py-1">Services</Link>
              <Link href={`${basePath}/gallery`} className="hover:text-[#B48A66] transition-colors relative py-1">Gallery</Link>
              <Link href={`${basePath}/contact`} className="hover:text-[#B48A66] transition-colors relative py-1">Contact</Link>
            </nav>

            {/* Desktop Action & Mobile Toggle */}
            <div className="flex items-center gap-4">
              <Link
                href={`${basePath}/contact`}
                className="hidden md:inline-flex items-center gap-2 rounded-full bg-slate-900 px-6 py-2.5 text-[13px] font-bold uppercase tracking-wider text-white border border-slate-800 hover:bg-[#B48A66] hover:border-[#B48A66] transition-all shadow-xs hover:scale-[1.02] active:scale-[0.98] shrink-0"
              >
                Book Consultation
                <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-white/20">
                  <ArrowUpRight className="h-3 w-3 text-white" />
                </span>
              </Link>

              <button
                onClick={() => setIsOpen(!isOpen)}
                className="lg:hidden text-slate-900 hover:text-[#B48A66] transition-colors p-2 focus:outline-none shrink-0"
                aria-label="Toggle menu"
              >
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          <div className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            isOpen ? 'max-h-[320px] border-t border-slate-100 opacity-100' : 'max-h-0 opacity-0 pointer-events-none'
          }`}>
            <nav className="flex flex-col gap-4 px-8 py-6 text-sm font-semibold text-slate-600">
              <Link href={`${basePath}`} onClick={() => setIsOpen(false)} className="hover:text-[#B48A66] transition-colors py-1">Home</Link>
              <Link href={`${basePath}/about`} onClick={() => setIsOpen(false)} className="hover:text-[#B48A66] transition-colors py-1">About</Link>
              <Link href={`${basePath}/services`} onClick={() => setIsOpen(false)} className="hover:text-[#B48A66] transition-colors py-1">Services</Link>
              <Link href={`${basePath}/gallery`} onClick={() => setIsOpen(false)} className="hover:text-[#B48A66] transition-colors py-1">Gallery</Link>
              <Link href={`${basePath}/contact`} onClick={() => setIsOpen(false)} className="hover:text-[#B48A66] transition-colors py-1">Contact</Link>
              <Link
                href={`${basePath}/contact`}
                onClick={() => setIsOpen(false)}
                className="md:hidden inline-flex items-center justify-center gap-2 rounded-full bg-slate-900 px-6 py-2.5 text-[13px] font-bold uppercase tracking-wider text-white border border-slate-800 hover:bg-[#B48A66] hover:border-[#B48A66] transition-all shadow-xs mt-2"
              >
                Book Consultation
                <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-white/20">
                  <ArrowUpRight className="h-3 w-3 text-white" />
                </span>
              </Link>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}
