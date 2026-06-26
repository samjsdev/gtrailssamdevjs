'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useTemplateData } from '../../context/TemplateContext';

export default function Navbar() {
  const { data, basePath } = useTemplateData();
  const navbarData = data.navbar || {};
  const [isFloating, setIsFloating] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsFloating(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
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
        className={`tw-nav fixed left-1/2 top-0 z-[1000] flex w-[calc(100%-1.5rem)] md:w-[calc(100%-3rem)] max-w-[1400px] -translate-x-1/2 items-center justify-between rounded-full bg-transparent px-6 py-4 md:px-10 md:py-5 text-sm font-medium transition-all duration-400
        ${isFloating ? 'tw-nav--floating top-2 w-auto! max-w-fit! min-w-[95%] md:min-w-[1000px] gap-4 md:gap-16 px-6! md:px-12! py-3! md:py-3.5!' : ''}`}
        style={isFloating ? {
          boxShadow: '0 8px 32px var(--glow-2), 0 0 20px var(--glow), 0 0 40px var(--glow-2), 0 0 0 1px var(--border)',
          background: 'rgba(var(--bg-rgb), 0.8)'
        } : {}}
      >
        <Link
          href={`${basePath}`}
          className="flex items-center gap-2 whitespace-nowrap text-lg md:text-2xl font-serif font-semibold tracking-tight transition-all duration-300 z-[1001]"
          style={{ color: 'var(--accent-2)' }}
        >
          <div className="relative w-8 h-8 md:w-10 md:h-10 flex items-center justify-center bg-blue-600 rounded-xl shadow-lg shadow-blue-600/20">
             <span className="text-white font-bold text-lg md:text-xl">{(data?.clinic?.name || navbarData?.logo?.text || "W")[0]}</span>
          </div>
          <span className="text-xl md:text-2xl font-bold">{data?.clinic?.name || navbarData?.logo?.text || "Studio"}</span>
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden list-none items-center gap-10 text-sm font-normal md:flex text-slate-900 dark:text-white">
          {navbarData?.links?.map((link: any, index: number) => {
            const href = `${basePath}${link.href === '/' ? '' : link.href}`;
            const isActive = pathname === href || (link.href !== '/' && pathname?.startsWith(href));
            const isHomePage = pathname === basePath || pathname === `${basePath}/`;
            const inactiveClass = (isFloating || !isHomePage) ? 'text-[var(--text)] hover:text-[var(--accent-2)]' : 'text-white hover:text-[var(--accent-2)]';
            return (
            <li key={index} className={`cursor-pointer whitespace-nowrap transition-all duration-200 hover:opacity-70 ${isActive ? 'text-[var(--accent-2)]' : inactiveClass}`}>
              <Link href={href}>{link.label}</Link>
            </li>
          )})}
        </ul>

        <div className="hidden md:flex items-center gap-2 md:gap-4">
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
          className="flex md:hidden flex-col justify-center items-center w-10 h-10 gap-1.5 z-[1001] cursor-pointer"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          <span
            className={`w-6 h-0.5 bg-[var(--text)] transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`}
          />
          <span
            className={`w-6 h-0.5 bg-[var(--text)] transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`}
          />
          <span
            className={`w-6 h-0.5 bg-[var(--text)] transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}
          />
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-[999] bg-[var(--bg)] flex flex-col items-center justify-center transition-all duration-500 md:hidden ${isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
      >
        <ul className="flex flex-col items-center gap-8 text-2xl font-light text-slate-900 dark:text-white">
          {navbarData?.links?.map((link: any, index: number) => {
            const href = `${basePath}${link.href === '/' ? '' : link.href}`;
            const isActive = pathname === href || (link.href !== '/' && pathname?.startsWith(href));
            return (
            <li key={index} onClick={() => setIsMenuOpen(false)}>
              <Link href={href} className={`transition-colors ${isActive ? 'text-[var(--accent-2)]' : 'text-[var(--text)] hover:text-[var(--accent-2)]'}`}>
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
