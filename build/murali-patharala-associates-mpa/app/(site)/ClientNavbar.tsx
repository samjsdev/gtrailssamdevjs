'use client';

import { CONTACT_LINKS } from '@/lib/contactLinks';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { ArrowUpRight, ChevronDown, Menu, MessageCircle, X } from 'lucide-react';
import BrandMark from '@/components/BrandMark';
import styles from './ClientNavbar.module.css';

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

function NavBrandLockup({ brand = 'mpa' }: { brand?: 'mpa' | 'arch' }) {
  const isArch = brand === 'arch';
  return (
    <>
      <span className={styles.logo}>
        {isArch ? (
          <Image
            src="/murali-patharala-associates-assets/brand_identity/WhatsApp Image 2026-09-23 at 16.52.36.webp"
            alt=""
            width={800}
            height={799}
            sizes="(max-width: 767px) 50px, (max-width: 1023px) 56px, 68px"
            loading="eager"
            className="h-full w-full object-contain"
          />
        ) : (
          <BrandMark size={76} className="h-full w-full object-contain" />
        )}
      </span>
      <span className={styles.wordmark}>
        <span className={styles.name}>{isArch ? 'Arch foundations' : 'murali patharala & associates'}</span>
        <span className={styles.subtext}>{isArch ? 'construction & developers' : 'architecture & interior design'}</span>
      </span>
    </>
  );
}

export default function ClientNavbar({ phone, basePath }: ClientNavbarProps) {
  const pathname = usePathname();
  const navRef = useRef<HTMLElement>(null);
  const menuCloseTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [desktopMenu, setDesktopMenu] = useState<DesktopMenu>(null);

  const cancelMenuClose = () => {
    if (menuCloseTimer.current !== null) {
      clearTimeout(menuCloseTimer.current);
      menuCloseTimer.current = null;
    }
  };

  const openDesktopMenu = (menu: Exclude<DesktopMenu, null>) => {
    cancelMenuClose();
    setDesktopMenu(menu);
  };

  const scheduleMenuClose = (menu: Exclude<DesktopMenu, null>) => {
    cancelMenuClose();
    // Give the pointer time to move from the trigger into the submenu.
    menuCloseTimer.current = setTimeout(() => {
      setDesktopMenu((current) => current === menu ? null : current);
      menuCloseTimer.current = null;
    }, 180);
  };

  const toggleDesktopMenu = (menu: Exclude<DesktopMenu, null>) => {
    cancelMenuClose();
    setDesktopMenu((current) => current === menu ? null : menu);
  };

  const withBase = (href: string) => `${basePath}${href}` || '/';
  const isActive = (href: string) => href === '/' ? pathname === withBase('/') : pathname.startsWith(withBase(href));

  useEffect(() => {
    cancelMenuClose();
    setMobileOpen(false);
    setDesktopMenu(null);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  useEffect(() => {
    const handlePointerDown = (event: PointerEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        cancelMenuClose();
        setDesktopMenu(null);
      }
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        cancelMenuClose();
        setDesktopMenu(null);
        setMobileOpen(false);
      }
    };
    document.addEventListener('pointerdown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      cancelMenuClose();
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
      <nav ref={navRef} aria-label="Primary navigation" className="sticky top-0 z-50 border-b border-white/10 bg-[#111214]/[0.98] px-3 text-white shadow-[0_12px_40px_rgba(0,0,0,0.18)] backdrop-blur sm:px-6 min-[1200px]:px-8">
        <div className={styles.headerInner}>
          <div className={styles.identityRow}>
            <Link href={withBase('/')} aria-label="MPA home" className={styles.brand}>
              <NavBrandLockup />
            </Link>

            <Link href={withBase('/construction-package')} aria-label="ARCH foundations construction packages" className={`${styles.brand} ${styles.arch}`}>
              <NavBrandLockup brand="arch" />
            </Link>
          </div>

          <div className={styles.navigationRow}>
            <ul className={styles.desktopLinks}>
              <li><Link href={withBase('/')} className={primaryLinkClass('/')}>Home</Link></li>
              <li><Link href={withBase('/about')} className={primaryLinkClass('/about')}>About</Link></li>
              <li
                className="relative"
                onPointerEnter={(event) => { if (event.pointerType !== 'touch') openDesktopMenu('services'); }}
                onPointerLeave={() => scheduleMenuClose('services')}
                onBlur={(event) => {
                  if (!event.currentTarget.contains(event.relatedTarget as Node) && !event.currentTarget.matches(':hover')) scheduleMenuClose('services');
                }}
              >
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
                    onClick={() => toggleDesktopMenu('services')}
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
              <li
                className="relative"
                onPointerEnter={(event) => { if (event.pointerType !== 'touch') openDesktopMenu('packages'); }}
                onPointerLeave={() => scheduleMenuClose('packages')}
                onBlur={(event) => {
                  if (!event.currentTarget.contains(event.relatedTarget as Node) && !event.currentTarget.matches(':hover')) scheduleMenuClose('packages');
                }}
              >
                <button type="button" aria-expanded={desktopMenu === 'packages'} aria-controls="desktop-packages-menu" onClick={() => toggleDesktopMenu('packages')} className={`${isActive('/design-package') || isActive('/construction-package') ? 'border-[#EA580C] text-[#FB923C]' : 'border-transparent text-white/78 hover:text-white'} inline-flex h-11 items-center gap-1.5 border-b-2 text-[13px] font-bold uppercase leading-none tracking-[0.12em] transition-colors`}>
                  Packages <ChevronDown size={13} className={`transition-transform ${desktopMenu === 'packages' ? 'rotate-180' : ''}`} />
                </button>
                {desktopMenu === 'packages' && (
                  <ul id="desktop-packages-menu" className="absolute left-0 top-full w-64 border border-white/10 bg-[#151619] py-1 shadow-2xl">
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

            <div className={styles.mobileNavigation}>
              <div className={styles.quickLinks}>
                <Link href={withBase('/')}>Home</Link>
                <Link href={withBase('/gallery')}>Projects</Link>
                <Link href={withBase('/contact')}>Contact</Link>
              </div>
              <button type="button" aria-label="Open navigation menu" aria-expanded={mobileOpen} aria-controls="mobile-navigation" onClick={() => setMobileOpen(true)} className={styles.menuButton}>
                <span className="flex items-center gap-2"><span className="text-[10px] font-bold uppercase tracking-[0.16em]">Menu</span><Menu size={24} /></span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {mobileOpen && (
        <div id="mobile-navigation" className="fixed inset-0 z-[100] overflow-y-auto bg-[#111214] text-white">
          <div className="flex min-h-full flex-col px-6 pb-8">
            <div className="flex h-[86px] items-center justify-between border-b border-white/10">
              <Link href={withBase('/')} onClick={() => setMobileOpen(false)} aria-label="MPA home" className={`${styles.brand} ${styles.menuBrand}`}>
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
