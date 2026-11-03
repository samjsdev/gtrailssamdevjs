import type { ReactNode } from 'react';
import Link from 'next/link';
import styles from './LegalPage.module.css';

export interface LegalSection {
  id: string;
  title: string;
  content: ReactNode;
}

interface LegalPageProps {
  title: string;
  eyebrow: string;
  introduction: string;
  sections: LegalSection[];
  companion: { href: string; label: string };
}

export default function LegalPage({ title, eyebrow, introduction, sections, companion }: LegalPageProps) {
  return (
    <div className="bg-surface-cream text-[#171817]">
      <header className={styles.hero}>
        <div className="relative z-10 mx-auto grid max-w-7xl gap-10 px-6 py-20 md:grid-cols-[minmax(0,1fr)_230px] md:items-end md:gap-16 md:px-12 md:py-24">
          <div className="max-w-3xl border-l-2 border-[#EA580C] pl-6 md:pl-9">
            <p className="mb-6 text-[11px] font-bold uppercase tracking-[0.2em] text-[#FB923C]">{eyebrow}</p>
            <h1 className="font-serif text-5xl font-semibold leading-[1.05] tracking-tight text-white sm:text-6xl md:text-7xl">{title}</h1>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/75 md:text-lg">{introduction}</p>
          </div>
          <div className="border-t border-white/25 pt-4 text-xs leading-relaxed text-white/70 md:border-t-0 md:border-l md:pl-6">
            <p className="text-[10px] font-bold uppercase tracking-[0.17em] text-[#FB923C]">Last updated</p>
            <p className="mt-2 text-sm font-semibold text-white">25 September 2026</p>
            <p className="mt-3"><span className="brand-name">Murali Patharala &amp; Associates</span><br />Chennai, India</p>
          </div>
        </div>
      </header>

      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-14 md:px-12 md:py-20 lg:grid-cols-[215px_minmax(0,1fr)] lg:gap-20">
        <aside className="lg:sticky lg:top-28 lg:self-start">
          <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.18em] text-[#C2410C]">On this page</p>
          <nav aria-label={`${title} sections`} className="grid grid-cols-2 gap-x-4 gap-y-3 text-xs text-[#55554F] sm:grid-cols-3 lg:grid-cols-1">
            {sections.map(({ id, title: sectionTitle }, index) => (
              <a key={id} href={`#${id}`} className="group flex items-start gap-2.5 leading-snug transition-colors hover:text-[#C2410C] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C2410C]">
                <span className="font-mono text-[10px] text-[#C2410C]">{String(index + 1).padStart(2, '0')}</span>
                <span>{sectionTitle}</span>
              </a>
            ))}
          </nav>
        </aside>

        <div className="min-w-0 border-t border-[#D9D3C8]">
          {sections.map(({ id, title: sectionTitle, content }, index) => (
            <section key={id} id={id} className={`scroll-mt-28 border-b border-[#D9D3C8] py-9 md:py-11 ${index % 2 ? 'bg-surface-cream' : 'bg-surface-oat'}`}>
              <div className="grid gap-4 md:grid-cols-[60px_minmax(0,1fr)] md:gap-6">
                <span className="pt-1 font-mono text-xs font-semibold text-[#C2410C]">/{String(index + 1).padStart(2, '0')}</span>
                <div>
                  <h2 className="mpa-heading-subtitle font-serif font-semibold text-[#171817]">{sectionTitle}</h2>
                  <div className={styles.prose}>{content}</div>
                </div>
              </div>
            </section>
          ))}

          <div className="mt-10 flex flex-wrap items-center justify-between gap-5 border border-[#D9D3C8] bg-surface-cream p-6 md:p-8">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.17em] text-[#C2410C]">Need clarification?</p>
              <p className="mt-2 font-serif text-xl font-semibold">Speak with our studio.</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link href="/contact" className="mpa-outline-cta">Contact us</Link>
              <Link href={companion.href} className="mpa-outline-cta">{companion.label}</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
