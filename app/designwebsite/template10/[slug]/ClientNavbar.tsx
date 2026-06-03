'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Archivo_Black } from 'next/font/google';
import { Menu, X } from 'lucide-react';

const archivo = Archivo_Black({
  subsets: ['latin'],
  weight: ['400'],
  display: 'swap',
});

interface ClientNavbarProps {
  clinicName: string;
  basePath: string;
}

export default function ClientNavbar({ clinicName, basePath }: ClientNavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      // Shrunk state trigger
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Scroll progress percentage calculation
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight > 0) {
        setScrollProgress((window.scrollY / docHeight) * 100);
      }
    };

    window.addEventListener('scroll', handleScroll);
    // Initial run
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`sticky top-0 z-40 w-full transition-all duration-500 ease-in-out border-b ${
        isScrolled || isOpen
          ? 'bg-[#141517]/95 backdrop-blur-md border-[#E07A5F]/20 shadow-2xl py-4' 
          : 'bg-[#1E2022] border-white/10 py-7'
      }`}
    >
      <div className="max-w-7xl mx-auto px-8 flex flex-col relative">
        <div className="flex justify-between items-center w-full">
          {/* Title Brand with coordinates label */}
          <div className="flex flex-col justify-center">
            <Link href={basePath} className="flex items-center gap-2 group">
              <h1 className={`${archivo.className} text-base md:text-xl tracking-tight text-white uppercase transition-colors group-hover:text-[#E07A5F]`}>
                {clinicName || 'Loft Studio'}
              </h1>
            </Link>
            <span className="hidden md:inline text-[8px] font-mono tracking-widest text-[#E07A5F]/60 uppercase mt-0.5">
              [SYS_VOL_10.9]
            </span>
          </div>
          
          {/* Nav Links */}
          <nav className="hidden lg:flex items-center gap-8 font-bold text-xs uppercase tracking-widest text-slate-400">
            <Link href={`${basePath}`} className="hover:text-white transition-colors py-2 relative group">
              Home
              <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#E07A5F] transition-all group-hover:w-full" />
            </Link>
            <Link href={`${basePath}/about`} className="hover:text-white transition-colors py-2 relative group">
              About Us
              <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#E07A5F] transition-all group-hover:w-full" />
            </Link>
            <Link href={`${basePath}/services`} className="hover:text-white transition-colors py-2 relative group">
              Services
              <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#E07A5F] transition-all group-hover:w-full" />
            </Link>
            <Link href={`${basePath}/gallery`} className="hover:text-white transition-colors py-2 relative group">
              Gallery
              <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#E07A5F] transition-all group-hover:w-full" />
            </Link>
            <Link href={`${basePath}/contact`} className="hover:text-white transition-colors py-2 relative group">
              Contact
              <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#E07A5F] transition-all group-hover:w-full" />
            </Link>
          </nav>

          {/* CTA & Mobile Toggle */}
          <div className="flex items-center gap-4">
            <Link 
              href={`${basePath}/contact`} 
              className="hidden sm:flex items-center bg-[#E07A5F] text-white px-5 py-2.5 rounded-none font-bold uppercase tracking-wider text-xs hover:bg-[#C9644A] transition-all duration-300 shadow-[4px_4px_0px_rgba(255,255,255,0.1)] active:translate-y-0.5 active:shadow-[2px_2px_0px_rgba(255,255,255,0.1)]"
            >
               Consultation
            </Link>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden text-white hover:text-[#E07A5F] transition-colors p-1.5 focus:outline-none"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Nav Links */}
        <div className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-80 opacity-100 mt-5 border-t border-white/10 pt-5' : 'max-h-0 opacity-0 pointer-events-none'
        }`}>
          <nav className="flex flex-col gap-4 font-bold text-xs uppercase tracking-widest text-slate-400">
            <Link href={`${basePath}`} onClick={() => setIsOpen(false)} className="hover:text-white transition-colors py-1">
              Home
            </Link>
            <Link href={`${basePath}/about`} onClick={() => setIsOpen(false)} className="hover:text-white transition-colors py-1">
              About Us
            </Link>
            <Link href={`${basePath}/services`} onClick={() => setIsOpen(false)} className="hover:text-white transition-colors py-1">
              Services
            </Link>
            <Link href={`${basePath}/gallery`} onClick={() => setIsOpen(false)} className="hover:text-white transition-colors py-1">
              Gallery
            </Link>
            <Link href={`${basePath}/contact`} onClick={() => setIsOpen(false)} className="hover:text-white transition-colors py-1">
              Contact
            </Link>
            <Link 
              href={`${basePath}/contact`} 
              onClick={() => setIsOpen(false)}
              className="sm:hidden flex items-center justify-center bg-[#E07A5F] text-white px-5 py-2.5 rounded-none font-bold uppercase tracking-wider text-xs hover:bg-[#C9644A] transition-all duration-300 mt-2"
            >
               Consultation
            </Link>
          </nav>
        </div>
      </div>

      {/* Rust Orange Scroll Progress Indicator */}
      <div className="absolute bottom-0 left-0 w-full h-[2px] bg-white/5">
        <div 
          className="h-full bg-[#E07A5F] transition-all duration-100 ease-out origin-left"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>
    </header>
  );
}
