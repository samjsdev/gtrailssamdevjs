'use client';

import { CONTACT_LINKS } from '@/lib/contactLinks';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ArrowUpRight, ChevronDown, MapPin, Menu, MessageCircle, X } from 'lucide-react';
import BrandMark from '@/components/BrandMark';

interface ClientNavbarProps {
  slug?: string;
  clinicName?: string;
  phone: string;
  basePath: string;
}

const SERVICE_LINKS = [
  { label: 'Architectural Design', href: '/services/architectural-design' },
  { label: 'Residential Construction', href: '/services/residential-construction' },
  { label: 'Interior Design', href: '/services/interior-design' },
  { label: 'Turnkey Construction', href: '/services/turnkey-construction' },
];

const PACKAGE_LINKS = [
  { label: 'Design Packages', href: '/design-package' },
  { label: 'Construction Packages', href: '/construction-package' },
];

type DesktopMenu = 'services' | 'packages' | null;

function NavBrandLockup() {
  return (
    <>
      <span className="flex size-[50px] shrink-0 items-center justify-center border border-[#FB923C]/50 p-[3px] transition-colors duration-300 group-hover:border-[#FB923C] sm:size-[54px]">
        <BrandMark size={46} className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.04]" />
      </span>
      <span className="flex min-w-0 flex-col justify-center">
        <span className="brand-name whitespace-nowrap text-[20px] leading-none text-[#F6F1E9] min-[1200px]:text-[22px]">Murali Patharala</span>
        <span className="mt-[5px] flex items-center gap-2 whitespace-nowrap text-[18px] font-bold uppercase leading-none tracking-[0.04em] text-[#FB923C] min-[1200px]:text-[20px]">
          <span className="h-px w-4 bg-[#EA580C]" aria-hidden="true" />
          <span className="brand-name">&amp; Associates</span>
        </span>
      </span>
    </>
  );
}

export default function ClientNavbar({ phone, basePath }: ClientNavbarProps) {
  const pathname = usePathname();
  const navRef = useRef<HTMLElement>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [desktopMenu, setDesktopMenu] = useState<DesktopMenu>(null);

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
            <Link
              href={withBase('/construction-package')}
              className="group transition-colors hover:text-white"
              title="ARCH foundations Construction Packages"
            >
              <strong className="text-[#FB923C] group-hover:underline">
                <span className="brand-name">ARCH foundations</span>
              </strong>{' '}
              / Construction
            </Link>
          </div>
          <div className="flex items-center gap-5">
            <Link href={withBase('/contact#offices')} className="flex items-center gap-2 transition-colors hover:text-white">
              <MapPin size={12} aria-hidden="true" /> Anna Nagar East · Chennai
            </Link>
            <a href={`${CONTACT_LINKS.whatsapp}?text=${encodeURIComponent('Hi Murali Patharala & Associates, I would like to discuss my project.')}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-white transition-colors hover:text-[#FB923C]">
              <MessageCircle size={12} aria-hidden="true" /> WhatsApp the studio
            </a>
          </div>
        </div>
      </div>

      <nav ref={navRef} className="sticky top-0 z-50 border-b border-white/10 bg-[#111214]/[0.98] px-5 text-white shadow-[0_12px_40px_rgba(0,0,0,0.18)] backdrop-blur md:px-12">
        <div className="mx-auto flex h-[86px] max-w-[1500px] items-center justify-between gap-3 min-[1200px]:gap-5">
          <Link href={withBase('/')} aria-label="MPA home" className="group flex shrink-0 items-center gap-2.5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#FB923C] sm:gap-3">
            <NavBrandLockup />
          </Link>

          <ul className="hidden items-center gap-6 min-[1200px]:flex">
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
                <ul id="desktop-services-menu" className="absolute left-0 top-full w-72 border border-white/10 bg-[#151619] py-1 shadow-2xl">
                  <li><Link href={withBase('/services')} onClick={() => setDesktopMenu(null)} className="block border-b border-white/10 px-4 py-3 text-[12px] font-bold uppercase tracking-[0.08em] text-[#FB923C] transition-colors hover:bg-[#EA580C] hover:text-[#111214] focus-visible:bg-[#EA580C] focus-visible:text-[#111214] focus-visible:outline-none">All Services</Link></li>
                  {SERVICE_LINKS.map((service) => (
                    <li key={service.href}>
                      <Link href={withBase(service.href)} onClick={() => setDesktopMenu(null)} className="block px-4 py-3 text-[13px] font-semibold text-white/85 transition-colors hover:bg-[#EA580C] hover:text-[#111214] focus-visible:bg-[#EA580C] focus-visible:text-[#111214] focus-visible:outline-none">{service.label}</Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
            <li className="relative" onMouseEnter={() => setDesktopMenu('packages')} onMouseLeave={() => setDesktopMenu(null)}>
              <button type="button" aria-expanded={desktopMenu === 'packages'} onClick={() => setDesktopMenu(desktopMenu === 'packages' ? null : 'packages')} className={`${isActive('/design-package') || isActive('/construction-package') ? 'border-[#EA580C] text-[#FB923C]' : 'border-transparent text-white/78 hover:text-white'} inline-flex h-11 items-center gap-1.5 border-b-2 text-[13px] font-bold uppercase leading-none tracking-[0.12em] transition-colors`}>
                Packages <ChevronDown size={13} className={`transition-transform ${desktopMenu === 'packages' ? 'rotate-180' : ''}`} />
              </button>
              {desktopMenu === 'packages' && (
                <ul className="absolute left-0 top-full w-64 border border-white/10 bg-[#151619] py-1 shadow-2xl">
                  {PACKAGE_LINKS.map((item) => (
                    <li key={item.href}>
                      <Link href={withBase(item.href)} onClick={() => setDesktopMenu(null)} className="block px-4 py-3 text-[13px] font-semibold text-white/85 transition-colors hover:bg-[#EA580C] hover:text-[#111214] focus-visible:bg-[#EA580C] focus-visible:text-[#111214] focus-visible:outline-none">{item.label}</Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
            <li><Link href={withBase('/gallery')} className={primaryLinkClass('/gallery')}>Projects</Link></li>
            <li><Link href={withBase('/contact')} className={primaryLinkClass('/contact')}>Contact</Link></li>
          </ul>

          <div className="flex items-center gap-3">
            <Link href={withBase('/contact#enquiry')} className="hidden items-center gap-2 bg-[#EA580C] px-6 py-3.5 text-[11px] font-bold uppercase tracking-[0.14em] text-[#111214] transition-colors hover:bg-white sm:inline-flex">
              Start Your Project <ArrowUpRight size={14} />
            </Link>
            <button type="button" aria-label="Open navigation menu" aria-expanded={mobileOpen} aria-controls="mobile-navigation" onClick={() => setMobileOpen(true)} className="p-2 text-[#FB923C] hover:text-white min-[1200px]:hidden">
              <Menu size={27} />
            </button>
          </div>
        </div>
      </nav>

      {mobileOpen && (
        <div id="mobile-navigation" className="fixed inset-0 z-[100] overflow-y-auto bg-[#111214] text-white">
          <div className="flex min-h-full flex-col px-6 pb-8">
            <div className="flex h-[86px] items-center justify-between border-b border-white/10">
              <Link href={withBase('/')} onClick={() => setMobileOpen(false)} aria-label="MPA home" className="group flex items-center gap-2.5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#FB923C] sm:gap-3">
                <NavBrandLockup />
              </Link>
              <button type="button" aria-label="Close navigation menu" onClick={() => setMobileOpen(false)} className="p-2 text-[#FB923C] hover:text-white"><X size={28} /></button>
            </div>

            <div className="py-5">
              <Link href={withBase('/')} className="block border-b border-white/10 py-4 font-serif text-3xl">Home</Link>
              <Link href={withBase('/about')} className="block border-b border-white/10 py-4 font-serif text-3xl">About</Link>
              <details className="group border-b border-white/10">
                <summary className="flex cursor-pointer list-none items-center justify-between py-4 font-serif text-3xl">Services <ChevronDown className="transition-transform group-open:rotate-180" /></summary>
                <ul className="pb-4 pl-4">
                  <li><Link href={withBase('/services')} onClick={() => setMobileOpen(false)} className="block border-t border-white/10 py-3 text-base font-semibold text-[#FB923C]">All Services</Link></li>
                  {SERVICE_LINKS.map((service) => (
                    <li key={service.href}><Link href={withBase(service.href)} onClick={() => setMobileOpen(false)} className="block border-t border-white/10 py-3 text-base text-white/85">{service.label}</Link></li>
                  ))}
                </ul>
              </details>
              <details className="group border-b border-white/10">
                <summary className="flex cursor-pointer list-none items-center justify-between py-4 font-serif text-3xl">Packages <ChevronDown className="transition-transform group-open:rotate-180" /></summary>
                <ul className="pb-4 pl-4">
                  {PACKAGE_LINKS.map((item) => (
                    <li key={item.href}><Link href={withBase(item.href)} onClick={() => setMobileOpen(false)} className="block border-t border-white/10 py-3 text-base text-white/85">{item.label}</Link></li>
                  ))}
                </ul>
              </details>
              <Link href={withBase('/gallery')} className="block border-b border-white/10 py-4 font-serif text-3xl">Projects</Link>
              <Link href={withBase('/contact')} className="block border-b border-white/10 py-4 font-serif text-3xl">Contact</Link>
            </div>

            <div className="mt-auto space-y-3 border-t border-white/10 pt-6">
              <Link href={withBase('/contact#enquiry')} className="flex w-full items-center justify-between bg-[#EA580C] px-5 py-4 text-xs font-bold uppercase tracking-[0.16em] text-[#111214]">Start Your Project <ArrowUpRight size={16} /></Link>
              <a href={`${CONTACT_LINKS.whatsapp}?text=${encodeURIComponent('Hi Murali Patharala & Associates, I would like to discuss my home project.')}`} target="_blank" rel="noopener noreferrer" className="mpa-outline-cta mpa-outline-cta--dark flex w-full items-center justify-between">WhatsApp the studio <MessageCircle size={16} aria-hidden="true" /></a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
