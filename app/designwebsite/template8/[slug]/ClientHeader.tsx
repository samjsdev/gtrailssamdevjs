'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Phone, Menu, X } from 'lucide-react';
import { usePathname } from 'next/navigation';

export default function ClientHeader({
  clinic,
  cleanName,
  basePath,
}: {
  clinic: any;
  cleanName: string;
  basePath: string;
}) {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const links = [
    { name: 'Home', href: basePath },
    { name: 'About', href: `${basePath}/about` },
    { name: 'Services', href: `${basePath}/services` },
    { name: 'Gallery', href: `${basePath}/gallery` },
    { name: 'Contact', href: `${basePath}/contact` },
  ];

  const phone = clinic.contact?.phone || '+880 1819 427 078';

  return (
    <>
      <header className="w-full bg-white px-6 md:px-12 py-4 flex items-center justify-between sticky top-4 z-[60] shadow-sm rounded-[32px] max-w-7xl mx-auto mt-4 border border-gray-100">
        
        {/* Logo (Left) */}
        <Link href={basePath} className="flex items-center gap-2 relative z-50" onClick={() => setIsMobileMenuOpen(false)}>
          <div className="w-8 h-8 rounded-full bg-[#2b347b] flex items-center justify-center text-white font-bold text-xs shadow-md">
            {(cleanName || 'Logo').charAt(0).toUpperCase()}
          </div>
          <span className="font-bold text-[#2b347b] text-lg tracking-tight hidden sm:block">
            {cleanName || 'Logo'}
          </span>
        </Link>

        {/* Navigation Links (Center - Desktop) */}
        <nav className="hidden lg:flex items-center gap-8 text-sm font-medium absolute left-1/2 -translate-x-1/2">
          {links.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`transition-colors hover:text-[#2b347b] ${
                  isActive ? 'text-[#2b347b] font-bold' : 'text-gray-500'
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* Contact CTA (Right - Desktop) */}
        <div className="hidden md:flex items-center gap-4">
          <a
            href={`tel:${phone.replace(/\D/g, '')}`}
            className="flex items-center gap-2 bg-[#2b347b] text-white px-6 py-2.5 rounded-full text-sm font-medium hover:bg-opacity-90 transition shadow-md hover:shadow-lg"
          >
            <Phone className="w-4 h-4" />
            <span>{phone}</span>
          </a>
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          className="lg:hidden p-2 text-[#2b347b] relative z-50 bg-[#f8f9fa] rounded-full"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </header>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-white/95 backdrop-blur-md flex flex-col pt-32 px-6 pb-8 animate-in fade-in duration-300 lg:hidden">
          <nav className="flex flex-col gap-8 text-2xl font-light text-center mt-12">
            {links.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`transition-colors ${
                    isActive ? 'text-[#2b347b] font-bold' : 'text-gray-500 hover:text-[#2b347b]'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>
          
          <div className="mt-auto flex justify-center">
            <a
              href={`tel:${phone.replace(/\D/g, '')}`}
              className="flex items-center justify-center gap-2 bg-[#2b347b] text-white px-8 py-4 rounded-full text-lg font-medium w-full shadow-lg"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <Phone className="w-5 h-5" />
              <span>Call Us Now</span>
            </a>
          </div>
        </div>
      )}
    </>
  );
}
