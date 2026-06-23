'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, Phone, X } from 'lucide-react';

type ClientHeaderProps = {
  clinicName: string;
  basePath: string;
  phone: string;
};

const links = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/services' },
  { label: 'About Us', href: '/about' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Contact', href: '/contact' },
];

export default function ClientHeader({ clinicName, basePath, phone }: ClientHeaderProps) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--line)] bg-[rgba(244,240,231,0.92)] backdrop-blur-xl">
      <div className="site-grid grid min-h-[72px] grid-cols-[1fr_auto] items-center gap-4 py-3 lg:grid-cols-[1fr_auto_auto]">
        <Link href={basePath || '/'} onClick={() => setOpen(false)} className="flex items-center min-w-0 gap-3">
          <Image src="/dreamslogo.webp" alt={clinicName} width={56} height={56} className="h-14 w-auto object-contain" unoptimized />
          <div className="block min-w-0">
            <span className="block truncate text-xs font-black uppercase tracking-[0.15em] sm:text-sm sm:tracking-[0.18em] md:text-base">Dreamsmine Designers</span>
            <span className="block truncate text-[0.55rem] font-black uppercase tracking-[0.15em] text-[var(--steel)] sm:text-[0.62rem] sm:tracking-[0.22em]">
              Architecture / Civil / Interiors
            </span>
          </div>
        </Link>

        <nav className="hidden items-center border-x border-[var(--line)] lg:flex">
          {links.map((link) => {
            const isActive = pathname === `${basePath}${link.href}` || (link.href !== '/' && pathname?.startsWith(`${basePath}${link.href}`));
            return (
              <Link
                key={link.label}
                href={`${basePath}${link.href}`}
                className={`border-r border-[var(--line)] px-5 py-4 text-[0.68rem] font-black uppercase tracking-[0.2em] transition last:border-r-0 ${
                  isActive 
                    ? 'text-[var(--oxide)] bg-black/5' 
                    : 'text-black/62 hover:text-[var(--ink)] hover:bg-black/5'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          {phone ? (
            <a href={`tel:${phone}`} className="btn-line">
              <Phone className="h-4 w-4" />
              Call
            </a>
          ) : null}
          <Link href={`${basePath}/contact`} className="btn-solid">
            Start Brief
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          className="grid h-11 w-11 place-items-center border border-[var(--line-strong)] bg-[var(--white)] lg:hidden"
          aria-expanded={open}
          aria-label="Toggle navigation"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <div className={`absolute w-full left-0 top-full overflow-hidden bg-[var(--paper)] transition-all duration-300 ease-in-out lg:hidden shadow-xl ${open ? 'max-h-[500px] opacity-100 border-b border-[var(--line)]' : 'max-h-0 opacity-0 border-transparent pointer-events-none'}`}>
        <div className="site-grid grid gap-2 py-3">
          {links.map((link) => {
            const isActive = pathname === `${basePath}${link.href}` || (link.href !== '/' && pathname?.startsWith(`${basePath}${link.href}`));
            return (
              <Link
                key={link.label}
                href={`${basePath}${link.href}`}
                onClick={() => setOpen(false)}
                className={`border border-[var(--line)] px-4 py-4 text-sm font-black uppercase tracking-[0.12em] transition-colors ${
                  isActive
                    ? 'text-[var(--oxide)] bg-black/5 border-l-4 border-l-[var(--safety)]'
                    : 'text-black/62 bg-[var(--white)] hover:text-[var(--ink)] hover:bg-[var(--paper)]'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>
      </div>
    </header>
  );
}
