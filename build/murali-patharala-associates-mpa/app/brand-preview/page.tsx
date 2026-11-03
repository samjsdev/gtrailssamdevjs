import BrandText from '@/components/BrandText';
import type { Metadata } from 'next';
import Image from 'next/image';
import { ArrowDownRight, ArrowUpRight, DraftingCompass, FileText, HardHat, Layers3 } from 'lucide-react';
import { siteAssets } from '@/lib/siteAssets';
import styles from './preview.module.css';

const mpaLogo = '/murali-patharala-associates-assets/brand_identity/WhatsApp Image 2026-09-23 at 16.52.36 (1).webp';
const archLogo = '/murali-patharala-associates-assets/brand_identity/WhatsApp Image 2026-09-23 at 16.52.36.webp';

export const metadata: Metadata = {
  title: 'Brand and copy preview',
  description: 'A private visual preview of the supplied MPA and ARCH logos with profile-based website copy.',
  robots: { index: false, follow: false },
};

const services = [
  {
    number: '01',
    title: 'Architectural design',
    detail: 'Site studies, concepts, floor plans, elevations and design development shaped around the brief.',
    icon: DraftingCompass,
  },
  {
    number: '02',
    title: 'Working drawings',
    detail: 'Coordinated construction documents and specifications that help carry design intent to site.',
    icon: FileText,
  },
  {
    number: '03',
    title: 'Interior design',
    detail: 'Spaces that balance daily use, material character and a considered sense of place.',
    icon: Layers3,
  },
  {
    number: '04',
    title: 'Construction',
    detail: 'Civil works, project management and turnkey delivery through ARCH foundations.',
    icon: HardHat,
  },
];

export default function BrandPreviewPage() {
  return (
    <main className={styles.page}>
      <div className={styles.previewBar}>
        <span>MPA / visual study</span>
        <span>Logo and profile copy preview</span>
        <span>September 2026</span>
      </div>

      <header className={styles.header}>
        <div className={styles.headerBrand}>
          <div className={styles.croppedMark}>
            <Image src={mpaLogo} alt="" fill sizes="60px" priority className={styles.croppedImage} />
          </div>
          <div className={styles.headerWordmark}>
            <strong className="brand-name">murali patharala</strong>
            <span className="brand-name">&amp; associates</span>
          </div>
        </div>
        <nav className={styles.nav} aria-label="Preview navigation">
          <span>Studio</span><span>Expertise</span><span>Selected work</span>
        </nav>
        <span className={styles.headerAction}>Discuss a project <ArrowUpRight size={15} aria-hidden="true" /></span>
      </header>

      <section className={styles.hero}>
        <div className={styles.heroCopy}>
          <div className={styles.eyebrow}><span className={styles.line} /> Architecture &amp; interior design · Chennai since 1998</div>
          <h1>Rooted in place.<br /><em>Designed for life.</em></h1>
          <p>
            <span className="brand-name">Murali Patharala &amp; Associates</span> brings thoughtful planning and a clear design process
            to homes, workplaces and shared spaces. Each project begins with the people who will use it.
          </p>
          <div className={styles.heroFoot}>
            <span>Ar. Murali Patharala <small>Founder and architect</small></span>
            <ArrowDownRight size={28} strokeWidth={1.2} aria-hidden="true" />
          </div>
        </div>
        <div className={styles.heroVisual}>
          <Image
            src={siteAssets.exteriors.whiteDuplex}
            alt="Contemporary residential elevation from the MPA project archive"
            fill
            priority
            loading="eager"
            sizes="(max-width: 900px) 100vw, 52vw"
            className={styles.heroImage}
          />
          <div className={styles.imageCaption}><span>Selected residential elevation</span><span>MPA archive / 01</span></div>
        </div>
      </section>

      <section className={styles.identitySection}>
        <div className={styles.sectionLead}>
          <span className={styles.overline}>01 / The identities</span>
          <h2>Two practices.<br /><em>One connected process.</em></h2>
          <p>The source logos shown here are the files supplied with the company profile.</p>
        </div>
        <div className={styles.identityGrid}>
          <article className={styles.identityCard}>
            <div className={styles.logoStage}>
              <Image src={mpaLogo} alt="Murali Patharala and Associates supplied logo" width={602} height={800} sizes="(max-width: 700px) 190px, 220px" className={styles.mpaFullLogo} />
            </div>
            <div className={styles.identityCopy}>
              <span>Established 1998</span>
              <h3><span className="brand-name">Murali Patharala &amp; Associates</span></h3>
              <p>Architecture and interior design, from early feasibility to detailed drawings and site coordination.</p>
            </div>
          </article>
          <article className={styles.identityCard}>
            <div className={styles.logoStage}>
              <Image src={archLogo} alt="ARCH foundations supplied logo" width={800} height={799} sizes="(max-width: 700px) 190px, 220px" className={styles.archFullLogo} />
            </div>
            <div className={styles.identityCopy}>
              <span>Established 2005</span>
              <h3><span className="brand-name">ARCH foundations</span></h3>
              <p>Construction, property development, civil works and turnkey project delivery.</p>
            </div>
          </article>
        </div>
      </section>

      <section className={styles.aboutSection}>
        <div className={styles.aboutLabel}>02 / Studio introduction</div>
        <div>
          <h2>Design that respects tradition<br />and responds to today.</h2>
          <div className={styles.aboutColumns}>
            <p>
              Founded in Chennai in 1998, <span className="brand-name">Murali Patharala &amp; Associates</span> works across residential,
              commercial and institutional design. The studio considers the practical needs of each
              space alongside its form, setting and character.
            </p>
            <p>
              Led by Ar. Murali Patharala, the practice develops projects from site analysis and concept
              design through coordinated drawings and construction administration. <span className="brand-name">ARCH foundations</span>
              provides a connected route into civil construction and project delivery.
            </p>
          </div>
        </div>
      </section>

      <section className={styles.servicesSection}>
        <div className={styles.servicesHeading}>
          <span className={styles.overline}>03 / What the studio does</span>
          <h2>From an idea<br /><em>to a place in use.</em></h2>
          <p>A sample services section, written from the supplied company profile.</p>
        </div>
        <div className={styles.serviceGrid}>
          {services.map(({ number, title, detail, icon: Icon }) => (
            <article className={styles.serviceCard} key={number}>
              <div className={styles.serviceTop}><span>{number}</span><Icon size={27} strokeWidth={1.35} aria-hidden="true" /></div>
              <h3>{title}</h3>
              <p><BrandText>{detail}</BrandText></p>
              <ArrowUpRight size={19} aria-hidden="true" />
            </article>
          ))}
        </div>
      </section>

      <footer className={styles.footer}>
        <span>MPA / Brand preview</span>
        <p>Visual study using supplied logos and profile copy. Preview page only.</p>
        <span>Chennai · India</span>
      </footer>
    </main>
  );
}
