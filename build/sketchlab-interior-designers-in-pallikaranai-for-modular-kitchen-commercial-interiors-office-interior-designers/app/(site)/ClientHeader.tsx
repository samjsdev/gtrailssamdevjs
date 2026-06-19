'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Sparkles, ArrowUpRight, Menu, X, Phone } from 'lucide-react';
import { Cormorant_Garamond } from 'next/font/google';

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
});

interface ClientHeaderProps {
  clinicName: string;
  basePath: string;
  phone: string;
}

export default function ClientHeader({ clinicName, basePath, phone }: ClientHeaderProps) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  const homeLink = basePath || '/';

  return (
    <>
      {/* Floating Capsule Header */}
      <header className="sticky top-4 z-40 px-4 sm:px-6 md:px-8 w-full mt-4">
        <div className="max-w-7xl mx-auto bg-white/95 backdrop-blur-md border border-[#EAE3D8]/80 rounded-full px-6 sm:px-8 py-3.5 flex justify-between items-center shadow-lg shadow-[#2A2421]/5 hover:shadow-xl transition-all duration-300 relative">
          <Link href={homeLink} className="flex items-center gap-3 leading-none group z-50">
            <div className="w-9 h-9 bg-[#8E7056]/10 rounded-full flex items-center justify-center text-[#8E7056] border border-[#8E7056]/20 group-hover:bg-[#8E7056] group-hover:text-white transition-all duration-300">
              <Sparkles className="w-4.5 h-4.5" />
            </div>
            <h1 className={`${cormorant.className} text-xl font-bold tracking-wide text-[#2A2421] group-hover:text-[#8E7056] transition-colors`}>
              {clinicName || 'SKETCHLAB'}
            </h1>
          </Link>
          
          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-8 font-semibold text-[10px] text-[#2A2421]/90 uppercase tracking-[0.2em]">
            <Link href={homeLink} className="hover:text-[#8E7056] transition-colors py-1 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-px after:bg-[#8E7056] hover:after:w-full after:transition-all after:duration-300">Home</Link>
            <Link href={`${basePath}/about`} className="hover:text-[#8E7056] transition-colors py-1 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-px after:bg-[#8E7056] hover:after:w-full after:transition-all after:duration-300">About</Link>
            <Link href={`${basePath}/services`} className="hover:text-[#8E7056] transition-colors py-1 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-px after:bg-[#8E7056] hover:after:w-full after:transition-all after:duration-300">Services</Link>
            <Link href={`${basePath}/gallery`} className="hover:text-[#8E7056] transition-colors py-1 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-px after:bg-[#8E7056] hover:after:w-full after:transition-all after:duration-300">Gallery</Link>
            <Link href={`${basePath}/contact`} className="hover:text-[#8E7056] transition-colors py-1 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-px after:bg-[#8E7056] hover:after:w-full after:transition-all after:duration-300">Contact</Link>
          </nav>
 
          <div className="flex items-center gap-3">
            {/* Desktop CTA Button */}
            <Link href={`${basePath}/contact`} className="hidden sm:flex items-center gap-2 bg-[#8E7056] hover:bg-[#2A2421] text-white px-5 sm:px-6 py-2.5 rounded-full font-bold uppercase tracking-widest text-[9px] transition-all duration-300 shadow-sm shadow-[#8E7056]/10 hover:scale-[1.03] active:scale-[0.97]">
              Get A Quote <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>

            {/* Mobile Hamburger toggle */}
            <button
              onClick={toggleMenu}
              aria-label="Toggle Navigation Menu"
              className="lg:hidden w-9 h-9 rounded-full bg-[#FAF8F5] text-[#2A2421] border border-[#EAE3D8] flex items-center justify-center hover:bg-[#8E7056] hover:text-white transition-all duration-300 active:scale-95 focus:outline-none"
            >
              {isOpen ? <X className="w-4.5 h-4.5" /> : <Menu className="w-4.5 h-4.5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer / Dropdown */}
        <div 
          className={`lg:hidden absolute top-20 left-4 right-4 bg-white/98 backdrop-blur-lg border border-[#EAE3D8]/80 rounded-[2rem] p-6 shadow-2xl transition-all duration-500 ease-in-out origin-top z-40 overflow-hidden ${
            isOpen ? 'opacity-100 scale-100 pointer-events-auto' : 'opacity-0 scale-95 pointer-events-none'
          }`}
        >
          <nav className="flex flex-col gap-5 text-center font-semibold text-xs text-[#2A2421]/90 uppercase tracking-[0.2em] py-4">
            <Link href={homeLink} onClick={closeMenu} className="py-2.5 border-b border-[#FAF8F5] hover:text-[#8E7056] hover:translate-x-1 transition-all">Home</Link>
            <Link href={`${basePath}/about`} onClick={closeMenu} className="py-2.5 border-b border-[#FAF8F5] hover:text-[#8E7056] hover:translate-x-1 transition-all">About Us</Link>
            <Link href={`${basePath}/services`} onClick={closeMenu} className="py-2.5 border-b border-[#FAF8F5] hover:text-[#8E7056] hover:translate-x-1 transition-all">Our Services</Link>
            <Link href={`${basePath}/gallery`} onClick={closeMenu} className="py-2.5 border-b border-[#FAF8F5] hover:text-[#8E7056] hover:translate-x-1 transition-all">Project Gallery</Link>
            <Link href={`${basePath}/contact`} onClick={closeMenu} className="py-2.5 border-b border-[#FAF8F5] hover:text-[#8E7056] hover:translate-x-1 transition-all">Contact Us</Link>
          </nav>

          <div className="flex flex-col gap-4 mt-6 pt-6 border-t border-[#EAE3D8]/50">
            {phone && (
              <a 
                href={`tel:${phone}`} 
                onClick={closeMenu} 
                className="flex items-center justify-center gap-2 text-xs font-bold text-[#8E7056] uppercase tracking-wider py-3 rounded-xl bg-[#8E7056]/5 border border-[#8E7056]/15 hover:bg-[#8E7056] hover:text-white transition-all duration-300"
              >
                <Phone className="w-3.5 h-3.5" /> Call Studio
              </a>
            )}
            <Link 
              href={`${basePath}/contact`} 
              onClick={closeMenu} 
              className="flex items-center justify-center gap-2 bg-[#8E7056] hover:bg-[#2A2421] text-white py-3.5 rounded-xl font-bold uppercase tracking-widest text-[10px] transition-all duration-300 shadow-sm"
            >
              Get A Quote <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </header>
    </>
  );
}
