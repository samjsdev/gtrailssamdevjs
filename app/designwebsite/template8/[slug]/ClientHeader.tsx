'use client';

import Link from 'next/link';
import { Phone } from 'lucide-react';
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

  const links = [
    { name: 'Home', href: basePath },
    { name: 'About', href: `${basePath}/about` },
    { name: 'Service', href: `${basePath}/services` },
    { name: 'Property', href: `${basePath}/property` },
    { name: 'Contact', href: `${basePath}/contact` },
  ];

  const phone = clinic.contact?.phone || '+880 1819 427 078';

  return (
    <header className="w-full bg-white px-6 md:px-12 py-4 flex items-center justify-between sticky top-0 z-50 shadow-sm rounded-b-3xl max-w-7xl mx-auto mt-4">
      {/* Navigation Links */}
      <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
        {links.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.name}
              href={link.href}
              className={`transition-colors hover:text-[#2b347b] ${
                isActive ? 'text-[#2b347b] font-semibold' : 'text-gray-600'
              }`}
            >
              {link.name}
            </Link>
          );
        })}
      </nav>

      {/* Logo */}
      <div className="flex items-center gap-2 absolute left-1/2 -translate-x-1/2">
        {/* Simple waves logo placeholder */}
        <div className="w-8 h-8 rounded-full bg-[#2b347b] flex items-center justify-center text-white font-bold text-xs">
          Logo
        </div>
        <span className="font-bold text-[#2b347b] text-lg tracking-tight">
          {cleanName || 'Logo'}
        </span>
      </div>

      {/* Contact CTA */}
      <div className="hidden md:flex">
        <a
          href={`tel:${phone.replace(/\D/g, '')}`}
          className="flex items-center gap-2 bg-[#2b347b] text-white px-5 py-2.5 rounded-full text-sm font-medium hover:bg-opacity-90 transition"
        >
          <Phone className="w-4 h-4" />
          <span>{phone}</span>
        </a>
      </div>

      {/* Mobile Menu Toggle (Placeholder) */}
      <button className="md:hidden p-2 text-[#2b347b]">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
      </button>
    </header>
  );
}
