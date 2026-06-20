'use client';

import { useState } from 'react';
import Link from 'next/link';
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
  { label: 'Works', href: '/gallery' },
  { label: 'Contact', href: '/contact' },
];

export default function ClientHeader({ clinicName, basePath, phone }: ClientHeaderProps) {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--line)] bg-[rgba(244,240,231,0.92)] backdrop-blur-xl">
      <div className="site-grid grid min-h-[72px] grid-cols-[1fr_auto] items-center gap-4 py-3 lg:grid-cols-[1fr_auto_auto]">
        <Link href={basePath || '/'} onClick={() => setOpen(false)} className="min-w-0 border-l-4 border-[var(--ink)] pl-3">
          <span className="block truncate text-sm font-black uppercase tracking-[0.18em] md:text-base">{clinicName}</span>
          <span className="block text-[0.62rem] font-black uppercase tracking-[0.22em] text-[var(--steel)]">
            Architecture / Civil / Interiors
          </span>
        </Link>

        <nav className="hidden items-center border-x border-[var(--line)] lg:flex">
          {links.map((link) => (
            <Link
              key={link.label}
              href={`${basePath}${link.href}`}
              className="border-r border-[var(--line)] px-5 py-4 text-[0.68rem] font-black uppercase tracking-[0.2em] text-black/62 transition last:border-r-0 hover:bg-[var(--ink)] hover:text-white"
            >
              {link.label}
            </Link>
          ))}
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

      <div className={`overflow-hidden border-t border-[var(--line)] bg-[var(--paper)] transition-[max-height,opacity] duration-300 lg:hidden ${open ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="site-grid grid gap-2 py-3">
          {links.map((link) => (
            <Link
              key={link.label}
              href={`${basePath}${link.href}`}
              onClick={() => setOpen(false)}
              className="border border-[var(--line)] bg-[var(--white)] px-4 py-4 text-sm font-black uppercase tracking-[0.12em]"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
}
