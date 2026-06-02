'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X, Phone } from 'lucide-react';

interface ClientHeaderProps {
  clinicName: string;
  basePath: string;
  phone: string;
}

export default function ClientHeader({ clinicName, basePath, phone }: ClientHeaderProps) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <>
      <header className="sticky top-0 z-40 bg-[#FCFAF6]/95 backdrop-blur-md border-b border-[#0A0A0A]/5 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-8 h-24 flex justify-between items-center relative">
          <Link href={basePath} className="leading-none group z-50">
            <h1 className="text-xl font-extrabold tracking-widest text-[#0A0A0A] uppercase transition-all group-hover:text-[#0A0A0A]/70 flex items-center gap-2">
              <span>{clinicName || 'Studio Name'}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#C1FF72] animate-pulse"></span>
            </h1>
          </Link>
          
          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-10 font-bold text-[11px] uppercase tracking-[0.25em]">
            <Link href={basePath} className="text-[#0A0A0A]/70 hover:text-[#0A0A0A] transition-colors relative py-2 after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-0 after:h-[1.5px] hover:after:w-4 after:bg-[#C1FF72] after:transition-all">Home</Link>
            <Link href={`${basePath}/services`} className="text-[#0A0A0A]/70 hover:text-[#0A0A0A] transition-colors relative py-2 after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-0 after:h-[1.5px] hover:after:w-4 after:bg-[#C1FF72] after:transition-all">Services</Link>
            <Link href={`${basePath}/about`} className="text-[#0A0A0A]/70 hover:text-[#0A0A0A] transition-colors relative py-2 after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-0 after:h-[1.5px] hover:after:w-4 after:bg-[#C1FF72] after:transition-all">About Us</Link>
            <Link href={`${basePath}/gallery`} className="text-[#0A0A0A]/70 hover:text-[#0A0A0A] transition-colors relative py-2 after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-0 after:h-[1.5px] hover:after:w-4 after:bg-[#C1FF72] after:transition-all">Gallery</Link>
            <Link href={`${basePath}/contact`} className="text-[#0A0A0A]/70 hover:text-[#0A0A0A] transition-colors relative py-2 after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-0 after:h-[1.5px] hover:after:w-4 after:bg-[#C1FF72] after:transition-all">Contact</Link>
          </nav>

          <div className="flex items-center gap-4">
            {/* Desktop CTA Button */}
            <Link href={`${basePath}/contact`} className="hidden md:flex items-center gap-2 bg-[#0A0A0A] text-[#FCFAF6] px-8 py-3.5 rounded-full font-bold text-[11px] tracking-[0.2em] uppercase hover:bg-transparent hover:text-[#0A0A0A] transition-all duration-500 shadow-sm border border-[#0A0A0A]">
              Book Consultation
            </Link>

            {/* Mobile Hamburger toggle */}
            <button
              onClick={toggleMenu}
              aria-label="Toggle Navigation Menu"
              className="lg:hidden w-11 h-11 rounded-full bg-[#0A0A0A] text-[#FCFAF6] flex items-center justify-center hover:bg-[#C1FF72] hover:text-[#0A0A0A] transition-all duration-300 active:scale-95 focus:outline-none z-50 border border-[#0A0A0A]"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Panel */}
        <div 
          className={`lg:hidden absolute top-24 left-0 right-0 bg-[#FCFAF6]/98 backdrop-blur-md border-b border-[#0A0A0A]/5 px-8 py-8 shadow-2xl transition-all duration-500 ease-in-out origin-top z-40 overflow-hidden ${
            isOpen ? 'opacity-100 scale-100 pointer-events-auto' : 'opacity-0 scale-95 pointer-events-none'
          }`}
        >
          <nav className="flex flex-col gap-6 text-left font-bold text-xs uppercase tracking-[0.2em] py-4">
            <Link href={basePath} onClick={closeMenu} className="py-2 hover:text-[#C1FF72] hover:translate-x-1 transition-all border-b border-[#0A0A0A]/5 text-[#0A0A0A]">Home</Link>
            <Link href={`${basePath}/services`} onClick={closeMenu} className="py-2 hover:text-[#C1FF72] hover:translate-x-1 transition-all border-b border-[#0A0A0A]/5 text-[#0A0A0A]">Our Services</Link>
            <Link href={`${basePath}/about`} onClick={closeMenu} className="py-2 hover:text-[#C1FF72] hover:translate-x-1 transition-all border-b border-[#0A0A0A]/5 text-[#0A0A0A]">About Us</Link>
            <Link href={`${basePath}/gallery`} onClick={closeMenu} className="py-2 hover:text-[#C1FF72] hover:translate-x-1 transition-all border-b border-[#0A0A0A]/5 text-[#0A0A0A]">Portfolio Gallery</Link>
            <Link href={`${basePath}/contact`} onClick={closeMenu} className="py-2 hover:text-[#C1FF72] hover:translate-x-1 transition-all border-b border-[#0A0A0A]/5 text-[#0A0A0A]">Contact Us</Link>
          </nav>

          <div className="flex flex-col gap-4 mt-6 pt-6 border-t border-[#0A0A0A]/5">
            {phone && (
              <a 
                href={`tel:${phone}`} 
                onClick={closeMenu} 
                className="flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-wider py-3 rounded-full bg-[#0A0A0A]/5 border border-[#0A0A0A]/10 hover:bg-[#C1FF72] hover:text-[#0A0A0A] hover:border-[#C1FF72] transition-all duration-300 text-[#0A0A0A]"
              >
                <Phone className="w-3.5 h-3.5" /> Call Studio
              </a>
            )}
            <Link 
              href={`${basePath}/contact`} 
              onClick={closeMenu} 
              className="flex items-center justify-center gap-2 bg-[#0A0A0A] text-[#FCFAF6] py-3.5 rounded-full font-bold uppercase tracking-widest text-[10px] hover:bg-[#C1FF72] hover:text-[#0A0A0A] border border-[#0A0A0A] transition-all duration-300 shadow-sm"
            >
              Book Consultation
            </Link>
          </div>
        </div>
      </header>
    </>
  );
}
