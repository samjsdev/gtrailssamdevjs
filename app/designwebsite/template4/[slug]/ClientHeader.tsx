'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';

interface ClientHeaderProps {
  clinic: any;
  basePath: string;
}

export default function ClientHeader({ clinic, basePath }: ClientHeaderProps) {
  const [isOpen, setIsOpen] = useState(false);

  const waphone = clinic.contact?.phone?.replace(/\D/g, "") || "919751396117";
  const watext = `Hi, I'm interested in booking a design consultation at ${clinic.name || "your studio"}!`;
  const walink = `https://wa.me/${waphone}?text=${encodeURIComponent(watext)}`;

  return (
    <header className="sticky top-6 z-50 flex justify-center px-4 w-full">
      <div className="w-full max-w-5xl transition-all duration-300">
        <div className={`flex flex-col bg-white/80 backdrop-blur-md border border-stone-200/50 shadow-[0_8px_30px_rgb(0,0,0,0.04)] text-stone-900 transition-all duration-300 overflow-hidden ${
          isOpen ? 'rounded-[24px]' : 'rounded-full'
        }`}>
          <div className="flex items-center justify-between px-6 py-3.5 w-full">
            <Link href={basePath} className="text-lg md:text-xl font-semibold tracking-widest uppercase text-stone-900 hover:opacity-85 transition-opacity shrink-0">
              {clinic.name || "Studio"}
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex gap-8 text-[11px] uppercase tracking-[0.25em] font-medium text-stone-500">
              <Link href={`${basePath}`} className="hover:text-stone-900 transition-colors">Home</Link>
              <Link href={`${basePath}/about`} className="hover:text-stone-900 transition-colors">About</Link>
              <Link href={`${basePath}/services`} className="hover:text-stone-900 transition-colors">Services</Link>
              <Link href={`${basePath}/gallery`} className="hover:text-stone-900 transition-colors">Portfolio</Link>
              <Link href={`${basePath}/contact`} className="hover:text-stone-900 transition-colors">Contact</Link>
            </nav>

            {/* Desktop Action & Mobile Toggle */}
            <div className="flex items-center gap-4">
              <a 
                href={walink} 
                target="_blank" 
                rel="noreferrer"
                className="hidden sm:inline-flex items-center border border-stone-900 px-5 py-2 text-[10px] uppercase tracking-widest font-bold bg-stone-900 text-white hover:bg-transparent hover:text-stone-900 transition-colors rounded-full shrink-0"
              >
                Consult
              </a>
              
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="md:hidden text-stone-900 hover:opacity-75 transition-opacity p-1 focus:outline-none"
                aria-label="Toggle menu"
              >
                {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Mobile Nav Drawer */}
          <div className={`md:hidden transition-all duration-300 ease-in-out overflow-hidden ${
            isOpen ? 'max-h-64 border-t border-stone-100 opacity-100' : 'max-h-0 opacity-0 pointer-events-none'
          }`}>
            <nav className="flex flex-col gap-4 px-6 py-5 text-[11px] uppercase tracking-[0.25em] font-medium text-stone-500">
              <Link href={`${basePath}`} onClick={() => setIsOpen(false)} className="hover:text-stone-900 transition-colors">Home</Link>
              <Link href={`${basePath}/about`} onClick={() => setIsOpen(false)} className="hover:text-stone-900 transition-colors">About</Link>
              <Link href={`${basePath}/services`} onClick={() => setIsOpen(false)} className="hover:text-stone-900 transition-colors">Services</Link>
              <Link href={`${basePath}/gallery`} onClick={() => setIsOpen(false)} className="hover:text-stone-900 transition-colors">Portfolio</Link>
              <Link href={`${basePath}/contact`} onClick={() => setIsOpen(false)} className="hover:text-stone-900 transition-colors">Contact</Link>
              <a 
                href={walink} 
                target="_blank" 
                rel="noreferrer"
                onClick={() => setIsOpen(false)}
                className="sm:hidden inline-flex items-center justify-center border border-stone-900 px-5 py-2 text-[10px] uppercase tracking-widest font-bold bg-stone-900 text-white rounded-full mt-2"
              >
                Consult
              </a>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}
