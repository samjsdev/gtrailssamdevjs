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
      <div className="w-full max-w-[calc(100%-1rem)] sm:max-w-md lg:w-fit transition-all duration-300">
        <div className={`flex flex-col bg-white/70 backdrop-blur-xl shadow-[0_12px_40px_rgba(0,0,0,0.06)] border border-white/60 overflow-hidden transition-all duration-300 ${
          isOpen ? 'rounded-[24px]' : 'rounded-full'
        }`}>
          <div className="flex items-center justify-between gap-4 md:gap-8 px-4 md:px-6 py-2.5 w-full">
            <Link href={basePath} className="flex items-center gap-3 leading-none group shrink-0">
              <div className="relative w-9 h-9 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-2xs group-hover:scale-102 transition-transform duration-300">
                <Image
                  src={INTERIOR_HERO_IMAGES.home}
                  alt="Interior design studio"
                  fill
                  sizes="36px"
                  className="object-cover"
                />
              </div>
              <h1 className="font-fustat text-base md:text-lg font-bold tracking-tight text-slate-900">
                {clinic.name || 'Studio Name'}
              </h1>
            </Link>
            
            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-8 text-[13px] font-medium text-slate-500">
              <Link href={`${basePath}`} className="hover:text-[#0084FF] transition-colors relative py-1">Home</Link>
              <Link href={`${basePath}/about`} className="hover:text-[#0084FF] transition-colors relative py-1">About</Link>
              <Link href={`${basePath}/services`} className="hover:text-[#0084FF] transition-colors relative py-1">Services</Link>
              <Link href={`${basePath}/gallery`} className="hover:text-[#0084FF] transition-colors relative py-1">Gallery</Link>
              <Link href={`${basePath}/contact`} className="hover:text-[#0084FF] transition-colors relative py-1">Contact</Link>
            </nav>

            {/* Desktop Action & Mobile Toggle */}
            <div className="flex items-center gap-3">
              <Link
                href={`${basePath}/contact`}
                className="hidden md:inline-flex items-center gap-2 rounded-full bg-slate-900 px-5 py-2 text-[12px] font-semibold text-white border border-slate-800 hover:bg-[#0084FF] hover:border-[#0084FF] transition-all shadow-xs hover:scale-[1.02] active:scale-[0.98] shrink-0"
              >
                Book Consultation
                <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-white/20">
                  <ArrowUpRight className="h-3 w-3 text-white" />
                </span>
              </Link>

              <button
                onClick={() => setIsOpen(!isOpen)}
                className="lg:hidden text-slate-900 hover:text-[#0084FF] transition-colors p-1.5 focus:outline-none shrink-0"
                aria-label="Toggle menu"
              >
                {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          <div className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            isOpen ? 'max-h-[300px] border-t border-slate-100 opacity-100' : 'max-h-0 opacity-0 pointer-events-none'
          }`}>
            <nav className="flex flex-col gap-3 px-6 py-5 text-[13px] font-medium text-slate-500">
              <Link href={`${basePath}`} onClick={() => setIsOpen(false)} className="hover:text-[#0084FF] transition-colors py-1">Home</Link>
              <Link href={`${basePath}/about`} onClick={() => setIsOpen(false)} className="hover:text-[#0084FF] transition-colors py-1">About</Link>
              <Link href={`${basePath}/services`} onClick={() => setIsOpen(false)} className="hover:text-[#0084FF] transition-colors py-1">Services</Link>
              <Link href={`${basePath}/gallery`} onClick={() => setIsOpen(false)} className="hover:text-[#0084FF] transition-colors py-1">Gallery</Link>
              <Link href={`${basePath}/contact`} onClick={() => setIsOpen(false)} className="hover:text-[#0084FF] transition-colors py-1">Contact</Link>
              <Link
                href={`${basePath}/contact`}
                onClick={() => setIsOpen(false)}
                className="md:hidden inline-flex items-center justify-center gap-2 rounded-full bg-slate-900 px-5 py-2 text-[12px] font-semibold text-white border border-slate-800 hover:bg-[#0084FF] hover:border-[#0084FF] transition-all shadow-xs mt-2"
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
