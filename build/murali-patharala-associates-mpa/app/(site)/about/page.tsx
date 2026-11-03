import BrandText from '@/components/BrandText';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import ArchitecturalDiagramBg from '@/components/ArchitecturalDiagramBg';
import { STUDIO } from '@/lib/clientProfile';
import { siteAssets } from '@/lib/siteAssets';
import ClientPortfolio from '../ClientPortfolio';
import styles from './AboutPage.module.css';
import timelineStyles from './EvolutionTimeline.module.css';

export const metadata: Metadata = {
  title: 'About the Practice & Ar. Murali Patharala',
  description: 'Founded in Chennai in 1998, Murali Patharala & Associates provides architecture and interior design for residential, commercial and institutional projects. Led by Ar. Murali Patharala, B.Arch., AIIA, CoA CA/99/24904.',
  alternates: { canonical: '/about/' },
};

const history = [
  { year: '1992–97', title: 'Architectural education', text: 'Bachelor of Architecture at the School of Architecture and Planning, Anna University, Chennai.' },
  { year: '1998', title: 'Murali Patharala & Associates', text: 'The architectural and interior design consultancy was established in Chennai.' },
  { year: '1999', title: 'Professional registration', text: 'Ar. Murali Patharala registered with the Council of Architecture, India · CA/99/24904.' },
  { year: '2005', title: 'ARCH foundations', text: 'Construction and property development expertise joined the architectural practice.' },
];

const selectedWork = [
  { number: '01', category: 'Residential architecture', title: 'Exterior studies', image: siteAssets.exteriors.duskVilla, alt: 'Residential exterior design from the MPA project archive' },
  { number: '02', category: 'Interior design', title: 'Spaces for daily life', image: siteAssets.interiors.livingRoom, alt: 'Contemporary living room design from the MPA project archive' },
  { number: '03', category: 'Completed interiors', title: 'Details made real', image: siteAssets.interiors.completedLiving, alt: 'Completed residential living space from the MPA project archive' },
];

export default function AboutPage() {
  return <div className="bg-surface-cream text-[#111111]">
    <section className="relative overflow-hidden bg-[#121418] px-6 py-20 text-white md:px-12 md:py-28">
      <Image src="/images/architecture/architectural-blueprint-draft.webp" alt="" fill priority sizes="100vw" className="object-cover opacity-50" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#121418]/90 to-[#121418]/50" />
      <div className="relative mx-auto max-w-7xl">
        <p className="mb-6 text-xs font-bold uppercase tracking-[0.2em] text-[#FB923C]">Chennai / Established 1998</p>
        <h1 className="max-w-3xl font-serif text-4xl font-bold leading-[1.08] sm:text-6xl lg:text-7xl">Architecture rooted<br /><em className="font-normal text-[#FB923C]">in people and place.</em></h1>
        <p className="mt-8 max-w-2xl text-base leading-relaxed text-white/85 md:text-lg"><span className="brand-name">Murali Patharala &amp; Associates</span> brings aesthetics and functionality together for residential, commercial and institutional spaces. <span className="brand-name">ARCH foundations</span> complements the design practice with construction and property development.</p>
        <div className="mt-10 flex flex-wrap gap-3"><Link href="/services" className="mpa-outline-cta mpa-outline-cta--dark">Explore our services</Link><Link href="/contact" className="mpa-outline-cta mpa-outline-cta--dark">Speak with the studio</Link></div>
      </div>
    </section>

    <section className={styles.studioSection} aria-labelledby="studio-title">
      <div className={styles.inner}>
        <div className={styles.sectionMarker}><span>Inside the practice</span><span>Anna Nagar East / Chennai</span></div>
        <div className={styles.studioGrid}>
          <div className={styles.studioGallery}>
            <div className={styles.officePhoto}>
              <Image src="/images/mpa-anna-nagar-office.webp" alt="Entrance to the MPA and ARCH foundations studio in Anna Nagar East" fill sizes="(max-width: 900px) 100vw, 52vw" className={styles.photoCover} />
            </div>
            <div className={styles.signPhoto}>
              <Image src="/murali-patharala-associates-assets/brand_identity/WhatsApp Image 2026-09-23 at 16.52.36 (2).webp" alt="Murali Patharala & Associates office sign" fill sizes="(max-width: 900px) 40vw, 18vw" className={styles.photoCover} />
            </div>
          </div>
          <div className={styles.studioStory}>
            <p className={styles.eyebrow}>The Chennai studio</p>
            <h2 id="studio-title" className={styles.studioTitle}>A place to begin.<br /><em>A practice to carry it through.</em></h2>
            <p><span className="brand-name">Murali Patharala &amp; Associates</span> brings architecture, interiors and construction together at its Anna Nagar East studio, from the first brief to decisions on site.</p>
            <div className={styles.studioAddress}>
              <span>Visit the studio</span>
              <address>{STUDIO.address}</address>
            </div>
            <Link href="/contact" className="mpa-outline-cta">Contact the studio</Link>
          </div>
        </div>
      </div>
    </section>

    <section className={timelineStyles.section} aria-labelledby="journey-title">
      <ArchitecturalDiagramBg variant="elevation" theme="light" opacity={0.15} showGrid={false} showCornerMarks={false} />
      <div className={timelineStyles.inner}>
        <header className={timelineStyles.header}>
          <p className={timelineStyles.eyebrow}>Our evolution</p>
          <h2 id="journey-title">The MPA journey</h2>
          <p>From architectural education to an established design practice and a connected construction team.</p>
        </header>
        <div className={timelineStyles.timeline} data-evolution-timeline>
          <div className={timelineStyles.track} data-evolution-track aria-hidden="true" />
          <div className={timelineStyles.progress} data-evolution-progress aria-hidden="true" />
          {history.map((item, index) => <article key={item.year} className={`${timelineStyles.step} ${index % 2 === 0 ? timelineStyles.left : timelineStyles.right}`} data-evolution-step>
            <div className={timelineStyles.content}>
              <span className={timelineStyles.year}>{item.year}</span>
              <h3><BrandText>{item.title}</BrandText></h3>
              <p><BrandText>{item.text}</BrandText></p>
            </div>
            <div className={timelineStyles.node} data-evolution-node aria-hidden="true"><span>{item.year}</span></div>
          </article>)}
        </div>
      </div>
    </section>

    <section className={styles.founderSection} aria-labelledby="founder-title">
      <div className={styles.inner}>
        <div className={styles.sectionMarker}><span>01 / The architect</span><span>Architecture &amp; interiors</span></div>
        <div className={styles.founderGrid}>
          <div>
            <p className={styles.eyebrow}>Founder / Architecture &amp; interiors</p>
            <h2 id="founder-title" className={styles.founderName}>{STUDIO.founder}</h2>
            <p className={styles.qualification}>{STUDIO.qualification}</p>
            <p className={styles.founderCopy}>Founder of <span className="brand-name">Murali Patharala &amp; Associates</span> and <span className="brand-name">ARCH foundations</span>, Ar. Murali Patharala brings architectural design and project execution into a connected practice. His work places the user’s experience alongside form, function and the cultural character of a place.</p>
          </div>
          <dl className={styles.credentials}>
            <div className={styles.credential}><dt>Education</dt><dd>Bachelor of Architecture (B.Arch.)<br />{STUDIO.education}<br />{STUDIO.educationYears}</dd></div>
            <div className={styles.credential}><dt>Professional registration</dt><dd>Council of Architecture, India<br /><strong>{STUDIO.registration}</strong></dd></div>
          </dl>
        </div>
      </div>
    </section>

    <section className={styles.archSection} aria-labelledby="arch-title">
      <div className={styles.inner}>
        <div className={`${styles.sectionMarker} ${styles.sectionMarkerWarm}`}><span>02 / The builder</span><span>Established 2005</span></div>
        <div className={styles.archGrid}>
          <div>
            <p className={styles.eyebrow}>Established 2005 / Construction &amp; promoters</p>
            <h2 id="arch-title" className={`${styles.archName} brand-name`}>ARCH<br /><em>foundations</em></h2>
          </div>
          <div className={styles.archBody}>
            <p><span className="brand-name">ARCH foundations</span> handles construction and property development for homes, workplaces and institutions, coordinating engineering, site supervision and turnkey delivery.</p>
            <Link href="/services/turnkey-construction" className="mpa-outline-cta mpa-outline-cta--accent">Explore project delivery</Link>
          </div>
        </div>
        <div className={styles.archVisuals}>
          <div className={styles.archProjectPhoto}>
            <Image src="/images/architecture/structural-construction-frame.webp" alt="Engineered concrete structure under construction" fill sizes="(max-width: 700px) 100vw, 72vw" className={styles.photoCover} />
          </div>
          <div className={styles.archLogoPanel}>
            <Image src="/murali-patharala-associates-assets/brand_identity/WhatsApp Image 2026-09-23 at 16.52.36.webp" alt="ARCH foundations logo" width={800} height={799} sizes="(max-width: 700px) 60vw, 24vw" className={styles.archLogo} />
          </div>
        </div>
        <blockquote className={styles.archQuote}>Build with purpose. <em>Deliver with pride.</em> Endure with excellence.</blockquote>
      </div>
    </section>

    <section className="bg-surface-oat px-6 py-20 md:px-12 md:py-28">
      <div className="mx-auto max-w-7xl">
        <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-[#C2410C]">Our philosophy</p>
        <div className="grid gap-8 lg:grid-cols-2">
          <h2 className="font-serif text-3xl font-bold leading-tight md:text-5xl">Respect tradition.<br /><em className="font-normal text-[#C2410C]">Respond to today.</em></h2>
          <div className="space-y-5 text-base leading-relaxed text-[#55534E]"><p>Our approach respects tradition, embraces modernity and prioritises the user’s experience. Each project is a dialogue between form, function and feeling.</p><p>From serene homes to dynamic workplaces and public spaces, we seek designs that honour cultural roots while supporting contemporary aspirations. Innovation, user-centred planning and lasting elegance guide the work.</p></div>
        </div>
      </div>
    </section>
    <section className={styles.workSection} aria-labelledby="work-title">
      <div className={styles.inner}>
        <div className={styles.workHeading}>
          <div>
            <p className={styles.eyebrow}>From the project library</p>
            <h2 id="work-title">Ideas in drawings.<br /><em>Places in use.</em></h2>
          </div>
          <p>Architecture, interior design and completed spaces are all part of the same conversation: how a place looks, works and feels over time.</p>
        </div>
        <div className={styles.workGrid}>
          {selectedWork.map((work) => <figure key={work.number} className={styles.workCard}>
            <div className={styles.workImage}><Image src={work.image} alt={work.alt} fill sizes="(max-width: 700px) 100vw, (max-width: 1024px) 50vw, 33vw" className={styles.photoCover} /></div>
            <figcaption><h3>{work.title}</h3></figcaption>
          </figure>)}
        </div>
        <div className={styles.workFooter}><Link href="/gallery" className="mpa-outline-cta">Explore the project gallery</Link></div>
      </div>
    </section>
    <ClientPortfolio />
    <section className="bg-surface-sand px-6 py-16 text-center text-[#302A20] md:px-12 md:py-24"><h2 className="font-serif text-3xl font-bold md:text-4xl">A home, a workplace, a public space.</h2><p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-ink-muted">Tell us about the place you want to create and the people it will serve.</p><div className="mt-8 flex flex-wrap justify-center gap-3"><Link href="/contact" className="mpa-outline-cta mpa-outline-cta--accent">Discuss your project</Link><Link href="/gallery" className="mpa-outline-cta mpa-outline-cta--accent">View our work</Link></div></section>
  </div>;
}
