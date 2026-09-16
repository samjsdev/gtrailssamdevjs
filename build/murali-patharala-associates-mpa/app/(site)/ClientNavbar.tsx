'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ArrowUpRight, ChevronDown, MapPin, Menu, Phone, X } from 'lucide-react';

interface ClientNavbarProps {
  slug?: string;
  clinicName?: string;
  phone: string;
  basePath: string;
}

const SERVICE_LINKS = [
  {
    number: '01', label: 'Architectural Design', owner: 'By MPA',
    href: '/services/architectural-design',
    prompt: 'Turn your plot and requirements into a resolved home design.',
  },
  {
    number: '02', label: 'Residential Construction', owner: 'By ARCH Foundation',
    href: '/services/residential-construction',
    prompt: 'Build from clear specifications, stage checks and accountable delivery.',
  },
  {
    number: '03', label: 'Interior Design', owner: 'By MPA',
    href: '/services/interior-design',
    prompt: 'Shape practical, personal interiors around daily life.',
  },
  {
    number: '04', label: 'Turnkey Construction', owner: 'MPA × ARCH Foundation',
    href: '/services/turnkey-construction',
    prompt: 'Keep design and construction connected through one coordinated journey.',
  },
];

const PACKAGE_LINKS = [
  {
    label: 'Design Packages', owner: 'Murali Patharala & Associates', href: '/design-package',
    description: 'Compare the drawing and documentation levels before you begin.',
  },
  {
    label: 'Construction Packages', owner: 'ARCH Foundation', href: '/construction-package',
    description: 'Compare build specifications, materials and rates in full.',
  },
];

type DesktopMenu = 'services' | 'packages' | null;

export default function ClientNavbar({ phone, basePath }: ClientNavbarProps) {
  const pathname = usePathname();
  const navRef = useRef<HTMLElement>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [desktopMenu, setDesktopMenu] = useState<DesktopMenu>(null);

  const rawDigits = phone.replace(/\D/g, '');
  const cleanPhone = rawDigits.startsWith('91') ? rawDigits : `91${rawDigits.replace(/^0+/, '')}`;
  const withBase = (href: string) => `${basePath}${href}` || '/';
  const isActive = (href: string) => href === '/' ? pathname === withBase('/') : pathname.startsWith(withBase(href));

  useEffect(() => {
    setMobileOpen(false);
    setDesktopMenu(null);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  useEffect(() => {
    const handlePointerDown = (event: PointerEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) setDesktopMenu(null);
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setDesktopMenu(null);
        setMobileOpen(false);
      }
    };
    document.addEventListener('pointerdown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const primaryLinkClass = (href: string) =>
    `inline-flex h-11 items-center border-b-2 text-[13px] font-bold uppercase leading-none tracking-[0.12em] transition-colors ${
      isActive(href) ? 'border-[#EA580C] text-[#FB923C]' : 'border-transparent text-white/78 hover:text-white'
    }`;

  return (
    <>
      <div className="hidden border-b border-white/10 bg-[#0B0C0E] px-6 py-2 text-[9px] font-bold uppercase tracking-[0.17em] text-white/55 md:block md:px-12">
        <div className="mx-auto flex max-w-[1500px] items-center justify-between gap-5">
          <div className="flex items-center gap-5">
            <span><strong className="text-[#FB923C]">MPA</strong> / Architecture &amp; Interiors</span>
            <span className="h-3 w-px bg-white/15" />
            <span><strong className="text-[#FB923C]">ARCH Foundation</strong> / Construction</span>
          </div>
          <div className="flex items-center gap-5">
            <Link href={withBase('/contact#offices')} className="flex items-center gap-2 transition-colors hover:text-white">
              <MapPin size={12} aria-hidden="true" /> Chennai · Coimbatore · Bangalore · Pondicherry
            </Link>
            <a href={`tel:${phone}`} className="flex items-center gap-2 text-white transition-colors hover:text-[#FB923C]">
              <Phone size={12} aria-hidden="true" /> {phone}
            </a>
          </div>
        </div>
      </div>

      <nav ref={navRef} className="sticky top-0 z-50 border-b border-white/10 bg-[#111214]/[0.98] px-5 text-white shadow-[0_12px_40px_rgba(0,0,0,0.18)] backdrop-blur md:px-12">
        <div className="mx-auto flex h-[86px] max-w-[1500px] items-center justify-between gap-7">
          <Link href={withBase('/')} aria-label="MPA home" className="group flex shrink-0 items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center bg-[#EA580C] transition-transform group-hover:rotate-3">
              <span className="h-3.5 w-3.5 bg-[#111214]" />
            </span>
            <span className="flex flex-col">
              <span className="font-serif text-[28px] font-bold leading-none tracking-[-0.04em] text-[#FB923C]">MPA</span>
              <span className="mt-1 block text-[10px] font-bold uppercase tracking-[0.14em] text-white/68">Murali Patharala &amp; Associates</span>
            </span>
          </Link>

          <ul className="hidden items-center gap-7 xl:flex">
            <li><Link href={withBase('/')} className={primaryLinkClass('/')}>Home</Link></li>
            <li><Link href={withBase('/about')} className={primaryLinkClass('/about')}>About</Link></li>
            <li className="relative" onMouseEnter={() => setDesktopMenu('services')} onMouseLeave={() => setDesktopMenu(null)}>
              <div className={`flex h-11 items-center border-b-2 text-[13px] font-bold uppercase leading-none tracking-[0.12em] transition-colors ${
                isActive('/services') ? 'border-[#EA580C] text-[#FB923C]' : 'border-transparent text-white/78 hover:text-white'
              }`}>
                <Link href={withBase('/services')} className="flex h-full items-center pr-1" aria-label="View all services">
                  Services
                </Link>
                <button
                  type="button"
                  aria-label="Open services submenu"
                  aria-expanded={desktopMenu === 'services'}
                  aria-controls="desktop-services-menu"
                  onClick={() => setDesktopMenu(desktopMenu === 'services' ? null : 'services')}
                  className="flex h-full items-center px-1"
                >
                  <ChevronDown size={13} className={`transition-transform ${desktopMenu === 'services' ? 'rotate-180' : ''}`} />
                </button>
              </div>
              {desktopMenu === 'services' && (
                <div id="desktop-services-menu" className="absolute left-1/2 top-full w-[860px] -translate-x-1/2 pt-4">
                  <div className="border border-white/10 bg-[#151619] p-4 shadow-2xl">
                    <div className="flex items-center justify-between border-b border-white/10 px-4 pb-4 pt-1">
                      <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-white/45">Choose where your project is today</span>
                      <Link href={withBase('/services')} className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#FB923C] hover:text-white">All services overview <ArrowUpRight className="ml-1 inline" size={13} /></Link>
                    </div>
                    <div className="grid grid-cols-2">
                      {SERVICE_LINKS.map((service) => (
                        <Link key={service.href} href={withBase(service.href)} className="group min-h-44 border-b border-r border-white/10 p-6 transition-colors even:border-r-0 hover:bg-[#EA580C]">
                          <span className="flex items-center justify-between text-[11px] font-bold uppercase tracking-[0.16em] text-[#FB923C] group-hover:text-[#111214]">
                            {service.number} · {service.owner}<ArrowUpRight size={14} />
                          </span>
                          <strong className="mt-4 block font-serif text-2xl text-white group-hover:text-[#111214]">{service.label}</strong>
                          <span className="mt-3 block text-[13px] leading-relaxed text-white/52 group-hover:text-[#111214]/70">{service.prompt}</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </li>
            <li className="relative" onMouseEnter={() => setDesktopMenu('packages')} onMouseLeave={() => setDesktopMenu(null)}>
              <button type="button" aria-expanded={desktopMenu === 'packages'} onClick={() => setDesktopMenu(desktopMenu === 'packages' ? null : 'packages')} className={`${isActive('/design-package') || isActive('/construction-package') ? 'border-[#EA580C] text-[#FB923C]' : 'border-transparent text-white/78 hover:text-white'} inline-flex h-11 items-center gap-1.5 border-b-2 text-[13px] font-bold uppercase leading-none tracking-[0.12em] transition-colors`}>
                Packages <ChevronDown size={13} className={`transition-transform ${desktopMenu === 'packages' ? 'rotate-180' : ''}`} />
              </button>
              {desktopMenu === 'packages' && (
                <div className="absolute left-1/2 top-full w-[500px] -translate-x-1/2 pt-4">
                  <div className="border border-white/10 bg-[#151619] p-4 shadow-2xl">
                    {PACKAGE_LINKS.map((item) => (
                      <Link key={item.href} href={withBase(item.href)} className="group block border-b border-white/10 p-6 last:border-0 hover:bg-white/[0.04]">
                        <span className="flex items-center justify-between text-[11px] font-bold uppercase tracking-[0.16em] text-[#FB923C]">{item.owner}<ArrowUpRight size={16} /></span>
                        <strong className="mt-3 block font-serif text-2xl text-white group-hover:text-[#FB923C]">{item.label}</strong>
                        <span className="mt-3 block text-[13px] leading-relaxed text-white/52">{item.description}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </li>
            <li><Link href={withBase('/gallery')} className={primaryLinkClass('/gallery')}>Projects</Link></li>
            <li><Link href={withBase('/contact')} className={primaryLinkClass('/contact')}>Contact</Link></li>
          </ul>

          <div className="flex items-center gap-3">
            <Link href={withBase('/contact#enquiry')} className="hidden items-center gap-2 bg-[#EA580C] px-6 py-3.5 text-[11px] font-bold uppercase tracking-[0.14em] text-[#111214] transition-colors hover:bg-white sm:inline-flex">
              Start Your Project <ArrowUpRight size={14} />
            </Link>
            <button type="button" aria-label="Open navigation menu" aria-expanded={mobileOpen} aria-controls="mobile-navigation" onClick={() => setMobileOpen(true)} className="p-2 text-[#FB923C] hover:text-white xl:hidden">
              <Menu size={27} />
            </button>
          </div>
        </div>
      </nav>

      {mobileOpen && (
        <div id="mobile-navigation" className="fixed inset-0 z-[100] overflow-y-auto bg-[#111214] text-white">
          <div className="flex min-h-full flex-col px-6 pb-8">
            <div className="flex h-[86px] items-center justify-between border-b border-white/10">
              <span className="flex flex-col">
                <span className="font-serif text-3xl font-bold leading-none text-[#FB923C]">MPA</span>
                <span className="mt-1.5 text-[10px] font-bold uppercase tracking-[0.14em] text-white/60">Murali Patharala &amp; Associates</span>
              </span>
              <button type="button" aria-label="Close navigation menu" onClick={() => setMobileOpen(false)} className="p-2 text-[#FB923C] hover:text-white"><X size={28} /></button>
            </div>

            <div className="py-5">
              <Link href={withBase('/')} className="block border-b border-white/10 py-4 font-serif text-3xl">Home</Link>
              <Link href={withBase('/about')} className="block border-b border-white/10 py-4 font-serif text-3xl">About</Link>
              <details className="group border-b border-white/10">
                <summary className="flex cursor-pointer list-none items-center justify-between py-4 font-serif text-3xl">Services <ChevronDown className="transition-transform group-open:rotate-180" /></summary>
                <div className="pb-4">
                  <Link href={withBase('/services')} className="mb-2 flex items-center justify-between border border-[#FB923C]/35 px-3 py-3 text-[10px] font-bold uppercase tracking-[0.18em] text-[#FB923C]">All services overview <ArrowUpRight size={14} /></Link>
                  {SERVICE_LINKS.map((service) => (
                    <Link key={service.href} href={withBase(service.href)} className="grid grid-cols-[30px_1fr] border-t border-white/10 py-3.5">
                      <span className="font-mono text-[10px] text-[#FB923C]">{service.number}</span>
                      <span><strong className="block text-base">{service.label}</strong><small className="mt-1 block text-[10px] font-bold uppercase tracking-wider text-white/42">{service.owner}</small></span>
                    </Link>
                  ))}
                </div>
              </details>
              <details className="group border-b border-white/10">
                <summary className="flex cursor-pointer list-none items-center justify-between py-4 font-serif text-3xl">Packages <ChevronDown className="transition-transform group-open:rotate-180" /></summary>
                <div className="pb-4">
                  {PACKAGE_LINKS.map((item) => (
                    <Link key={item.href} href={withBase(item.href)} className="block border-t border-white/10 py-3.5">
                      <strong className="block text-base">{item.label}</strong><small className="mt-1 block text-[10px] font-bold uppercase tracking-wider text-white/42">{item.owner}</small>
                    </Link>
                  ))}
                </div>
              </details>
              <Link href={withBase('/gallery')} className="block border-b border-white/10 py-4 font-serif text-3xl">Projects</Link>
              <Link href={withBase('/contact')} className="block border-b border-white/10 py-4 font-serif text-3xl">Contact</Link>
            </div>

            <div className="mt-auto space-y-3 border-t border-white/10 pt-6">
              <Link href={withBase('/contact#enquiry')} className="flex w-full items-center justify-between bg-[#EA580C] px-5 py-4 text-xs font-bold uppercase tracking-[0.16em] text-[#111214]">Start Your Project <ArrowUpRight size={16} /></Link>
              <a href={`tel:${phone}`} className="flex w-full items-center justify-between border border-white/20 px-5 py-4 text-xs font-bold uppercase tracking-[0.14em] text-white">Call {phone}<Phone size={16} /></a>
              <a href={`https://wa.me/${cleanPhone}?text=${encodeURIComponent('Hi Murali Patharala & Associates, I would like to discuss my home project.')}`} target="_blank" rel="noopener noreferrer" className="block text-center text-[10px] font-bold uppercase tracking-[0.16em] text-[#FB923C]">Or continue on WhatsApp</a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
