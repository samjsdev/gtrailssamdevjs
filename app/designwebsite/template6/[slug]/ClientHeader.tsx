'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Playfair_Display, Lato } from 'next/font/google';

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const lato = Lato({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  display: "swap",
});

interface ClientHeaderProps {
  clinic: any;
  basePath: string;
}

export default function ClientHeader({ clinic, basePath }: ClientHeaderProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const waphone = clinic.contact?.phone?.replace(/\D/g, "") || "919751396117";
  const watext = `Hi, I'm interested in booking a design consultation at ${clinic.name || "your studio"}!`;
  const walink = `https://wa.me/${waphone}?text=${encodeURIComponent(watext)}`;

  return (
    <header 
      className={`fixed top-0 w-full z-50 px-6 transition-all duration-500 ease-in-out ${
        scrolled 
          ? 'py-5 bg-[#1a1a1a]/95 border-b border-white/10 backdrop-blur-md shadow-2xl' 
          : 'py-8 bg-gradient-to-b from-black/60 to-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link href={basePath} className="flex flex-col">
          <span className={`${playfair.className} text-2xl md:text-3xl font-medium tracking-wide text-white uppercase transition-all duration-500`}>
            {clinic.name || "Studio"}
          </span>
        </Link>
        
        <nav className="hidden md:flex items-center gap-8 text-[11px] uppercase tracking-[0.25em] text-zinc-300 font-bold">
          <Link href={`${basePath}`} className="hover:text-white transition-colors">Home</Link>
          <Link href={`${basePath}/about`} className="hover:text-white transition-colors">About</Link>
          <Link href={`${basePath}/services`} className="hover:text-white transition-colors">Services</Link>
          <Link href={`${basePath}/gallery`} className="hover:text-white transition-colors">Gallery</Link>
          <Link href={`${basePath}/contact`} className="hover:text-white transition-colors">Contact</Link>
        </nav>

        <a
          href={walink}
          target="_blank"
          rel="noreferrer"
          className="border border-zinc-500 px-6 py-2.5 text-[11px] uppercase tracking-[0.2em] text-white hover:bg-white hover:text-black transition-all"
        >
          Inquire
        </a>
      </div>
    </header>
  );
}
