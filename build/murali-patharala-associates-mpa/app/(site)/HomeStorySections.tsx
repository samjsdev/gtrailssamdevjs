import BrandText from '@/components/BrandText';
import { CONTACT_LINKS } from '@/lib/contactLinks';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Check, ShieldCheck } from 'lucide-react';
import DesignDevelopmentCards from './DesignDevelopmentCards';
import styles from './HomeStorySections.module.css';

interface Pillar {
  num: string;
  category: string;
  title: string;
  highlight: string;
  specs: string[];
}

const visuals = [
  { src: 'architectural-blueprint-draft', alt: 'Residential model and drawings on an architectural studio desk' },
  { src: 'site-engineer-audit', alt: 'Civil engineer conducting structural quality audit on TMT rebar reinforcement' },
  { src: 'cmda-sanction-drafting', alt: 'Itemized BOQ specifications and CMDA municipal sanction drawings' },
  { src: 'geometric-villa-elevation', alt: 'Climate-responsive 3D facade elevation with solar shading' },
  { src: 'turnkey-key-handover', alt: 'Celebratory key handover milestone ceremony with happy homeowners' },
  { src: 'staad-structural-engineering', alt: 'Engineers tracking structural progress and technical project logs' },
];

export default function HomeStorySections({ pillars, phone }: { pillars: Pillar[]; phone: string }) {
  return (
    <>
      <section id="transformations" className={styles.transformation}>
        <div className={styles.container}>
          <header data-motion-reveal className={styles.heading}>
            <div>
              <p className={styles.eyebrow}>2D to 3D</p>
              <h2>From sketch.<br /><em>To implementation.</em></h2>
            </div>
            <div className={styles.intro}>
              <p>Explore three facade designs, from elevation sketches to 3D visualisations. Drag the divider to compare each design.</p>
              <Link href="/contact" className="mpa-outline-cta mt-4">Discuss your plot <ArrowRight size={17} aria-hidden="true" /></Link>
            </div>
          </header>

          <DesignDevelopmentCards />
        </div>
      </section>

      <section id="why-choose" className={styles.why}>
        <div className={styles.container}>
          <header data-motion-reveal className={styles.heading}>
            <div>
              <p className={styles.eyebrow}>Why choose MPA</p>
              <h2>Confidence in every detail.<br /><em>Care at every stage.</em></h2>
            </div>
            <div className={styles.intro}>
              <p>Architecture, technical coordination and construction support. Clear information helps carry the design intent through each stage.</p>
            </div>
          </header>

          <div data-motion-group className={styles.pillars}>
            {pillars.map((pillar, index) => (
              <article key={pillar.num} className={styles.pillar}>
                <div className={styles.pillarImage}>
                  <Image src={`/images/architecture/${visuals[index].src}.webp`} alt={visuals[index].alt} fill sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 33vw" className={styles.photo} />
                </div>
                <div className={styles.pillarBody}>
                  <p className={styles.category}>{pillar.category}</p>
                  <h3>{pillar.title}</h3>
                  <ul>{pillar.specs.map(spec => <li key={spec}><Check size={15} strokeWidth={2} aria-hidden="true" /><span>{spec}</span></li>)}</ul>
                </div>
                <div className={styles.pillarFooter}><BrandText>{pillar.highlight}</BrandText></div>
              </article>
            ))}
          </div>

          <div data-motion-reveal className={styles.assurance}>
            <div className={styles.warrantyIcon}><ShieldCheck size={40} strokeWidth={1.4} aria-hidden="true" /></div>
            <div className={styles.assuranceCopy}>
              <p className={styles.eyebrow}>Built for lasting peace of mind</p>
              <h3>Construction informed by design.</h3>
              <p>Working drawings, specifications, site supervision and quality checks help connect the architectural vision with its execution.</p>
            </div>
            <a href={`${CONTACT_LINKS.whatsapp}?text=${encodeURIComponent('Hi Murali Patharala & Associates, I would like to schedule a project consultation.')}`} target="_blank" rel="noopener noreferrer" className={styles.button}>Consult senior architect <ArrowRight size={18} aria-hidden="true" /></a>
          </div>
        </div>
      </section>
    </>
  );
}
