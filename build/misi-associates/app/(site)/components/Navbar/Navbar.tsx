'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTemplateData } from '../../context/TemplateContext';

export default function Navbar() {
  const { data, basePath } = useTemplateData();
  const navbarData = data.navbar || {};
  const [isFloating, setIsFloating] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const homeHref = basePath || '/';

  useEffect(() => {
    let animationFrame: number | null = null;

    const updateFloatingState = () => {
      const scrollPosition = window.scrollY;

      setIsFloating((current) => {
        if (!current && scrollPosition > 56) return true;
        if (current && scrollPosition < 12) return false;
        return current;
      });

      animationFrame = null;
    };

    const handleScroll = () => {
      if (animationFrame === null) {
        animationFrame = window.requestAnimationFrame(updateFloatingState);
      }
    };

    updateFloatingState();
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (animationFrame !== null) {
        window.cancelAnimationFrame(animationFrame);
      }
    };
  }, []);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMenuOpen]);

  return (
    <>
        <nav
        className={`fixed left-1/2 z-[1000] flex -translate-x-1/2 items-center justify-between bg-white text-sm font-medium transition-[top,width,max-width,border-radius,padding,box-shadow] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] will-change-[top,width,max-width,border-radius,padding,box-shadow] motion-reduce:transition-none
        ${isFloating
          ? 'top-2 w-[calc(100%-2.5rem)] max-w-[1180px] border border-slate-200/90 px-5 py-2 shadow-[0_10px_36px_rgba(15,23,42,0.16)] md:w-[calc(100%-4rem)] md:px-8 md:py-1.5 lg:px-10'
          : 'top-0 w-full max-w-[100vw] rounded-none border-x-0 border-b border-t-0 border-slate-200 px-5 py-2.5 shadow-sm md:px-8 md:py-2 lg:px-12'
        }`}
        style={{ borderRadius: isFloating ? 'clamp(14px, 1.25vw, 18px)' : '0px' }}
      >
        <Link
          href={homeHref}
          className="flex shrink-0 items-center gap-2 whitespace-nowrap text-lg md:text-2xl font-serif font-semibold tracking-tight transition-all duration-300 z-[1001]"
          style={{ color: 'var(--accent-2)' }}
        >
          {navbarData?.logo?.image ? (
            <div className="relative flex h-[2.6rem] shrink-0 items-center overflow-hidden sm:h-12 md:h-[3.6rem]">
              <img
                src={navbarData.logo.image}
                alt={data?.clinic?.name || 'Misi Associates'}
                width={2323}
                height={497}
                className="block h-full w-auto max-w-none object-contain"
              />
            </div>
          ) : (
            <>
              <div className="relative w-8 h-8 md:w-10 md:h-10 flex items-center justify-center bg-blue-600 rounded-xl">
                 <span className="text-white font-bold text-lg md:text-xl">{(data?.clinic?.name || navbarData?.logo?.text || "M")[0]}</span>
              </div>
              <span className="text-xl md:text-2xl font-bold">{data?.clinic?.name || navbarData?.logo?.text || "Misi Associates"}</span>
            </>
          )}
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden list-none items-center gap-6 text-sm font-medium lg:flex xl:gap-10">
          {navbarData?.links?.map((link: any, index: number) => {
            const href = link.href === '/' ? homeHref : `${basePath}${link.href}`;
            const isActive = pathname === href || (link.href !== '/' && pathname?.startsWith(href));
            const inactiveClass = 'text-slate-700 hover:text-[var(--accent-2)]';
            return (
            <li key={index} className={`cursor-pointer whitespace-nowrap transition-all duration-200 hover:opacity-70 ${isActive ? 'text-[var(--accent-2)]' : inactiveClass}`}>
              <Link href={href} aria-current={isActive ? 'page' : undefined}>{link.label}</Link>
            </li>
          )})}
        </ul>

        <div className="hidden shrink-0 items-center gap-2 lg:flex lg:gap-4">
          <Link
            href={`${basePath}${navbarData?.cta?.href || '/contact'}`}
            className="inline-flex items-center justify-center rounded-full border-0 px-4 py-2 md:px-8 md:py-3 text-[0.75rem] md:text-sm font-medium transition-all duration-300 cursor-pointer hover:scale-[1.02] whitespace-nowrap"
            style={{
              background: 'var(--accent-2)',
              color: 'var(--accent-contrast)',
              boxShadow: '0 4px 20px var(--glow-2), 0 0 30px var(--glow)'
            }}
          >
            {navbarData?.cta?.label || "Book Now"}
          </Link>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          className="flex lg:hidden flex-col justify-center items-center w-10 h-10 gap-1.5 z-[1001] cursor-pointer"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          <span
            className={`w-6 h-0.5 bg-slate-800 transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`}
          />
          <span
            className={`w-6 h-0.5 bg-slate-800 transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`}
          />
          <span
            className={`w-6 h-0.5 bg-slate-800 transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}
          />
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-[999] bg-[var(--bg)] flex flex-col items-center justify-center transition-all duration-500 lg:hidden ${isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
      >
        <ul className="flex flex-col items-center gap-8 text-2xl font-light text-slate-900 dark:text-white">
          {navbarData?.links?.map((link: any, index: number) => {
            const href = link.href === '/' ? homeHref : `${basePath}${link.href}`;
            const isActive = pathname === href || (link.href !== '/' && pathname?.startsWith(href));
            return (
            <li key={index} onClick={() => setIsMenuOpen(false)}>
              <Link href={href} aria-current={isActive ? 'page' : undefined} className={`transition-colors ${isActive ? 'text-[var(--accent-2)]' : 'text-[var(--text)] hover:text-[var(--accent-2)]'}`}>
                {link.label}
              </Link>
            </li>
          )})}
        </ul>

        <div className="mt-12 flex flex-col items-center gap-6">
          <Link
            href={`${basePath}${navbarData?.cta?.href || '/contact'}`}
            onClick={() => setIsMenuOpen(false)}
            className="inline-flex items-center justify-center rounded-full border-0 px-8 py-4 text-lg font-medium transition-all duration-300 cursor-pointer"
            style={{
              background: 'var(--accent-2)',
              color: 'var(--accent-contrast)',
              boxShadow: '0 4px 20px var(--glow-2), 0 0 30px var(--glow)'
            }}
          >
            {navbarData?.cta?.label || "Book Now"}
          </Link>
        </div>
      </div>
    </>
  );
}
