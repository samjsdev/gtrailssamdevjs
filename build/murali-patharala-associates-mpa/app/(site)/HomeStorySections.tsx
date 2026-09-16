import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Check, Compass, HardHat, Layers3, ShieldCheck } from 'lucide-react';
import BeforeAfter from './BeforeAfter';
import styles from './HomeStorySections.module.css';

interface Pillar {
  num: string;
  category: string;
  title: string;
  highlight: string;
  specs: string[];
}

const visuals = [
  { src: 'architect-studio-model', alt: 'Residential model and drawings on an architectural studio desk' },
  { src: 'site-engineer-audit', alt: 'Civil engineer conducting structural quality audit on TMT rebar reinforcement' },
  { src: 'cmda-sanction-drafting', alt: 'Itemized BOQ specifications and CMDA municipal sanction drawings' },
  { src: 'geometric-villa-elevation', alt: 'Climate-responsive 3D facade elevation with solar shading' },
  { src: 'turnkey-key-handover', alt: 'Celebratory key handover milestone ceremony with happy homeowners' },
  { src: 'staad-structural-engineering', alt: 'Engineers tracking structural progress and technical project logs' },
];

const stages = [
  { title: 'Spatial planning', text: 'Circulation, daylight and Vastu alignment.', Icon: Compass },
  { title: 'Engineering', text: 'Structure and services resolved before site work.', Icon: Layers3 },
  { title: 'Site execution', text: 'Supervised construction with documented quality checks.', Icon: HardHat },
];

export default function HomeStorySections({ pillars, phone }: { pillars: Pillar[]; phone: string }) {
  return (
    <>
      <section id="transformations" className={styles.transformation}>
        <div className={styles.container}>
          <header data-motion-reveal className={styles.heading}>
            <div>
              <p className={styles.eyebrow}>Real transformation</p>
              <h2>From the first sketch.<br /><em>To the finished home.</em></h2>
            </div>
            <div className={styles.intro}>
              <p>Thoughtful planning, precise engineering and care on site. See how each decision takes shape in the completed project.</p>
              <Link href="/contact" className={styles.textLink}>Discuss your plot <ArrowRight size={17} aria-hidden="true" /></Link>
            </div>
          </header>

          <div data-motion-reveal className={styles.comparison}>
            <BeforeAfter
              beforeImage="/images/architecture/villa-plan-sketch.webp"
              afterImage="/images/architecture/villa-after-finished.webp"
              caption="Drag slider to compare drawing and completed project"
            />
          </div>

          <div data-motion-group className={styles.stages}>
            {stages.map(({ title, text, Icon }) => (
              <div key={title} className={styles.stage}>
                <div className={styles.iconTile}><Icon size={23} strokeWidth={1.5} aria-hidden="true" /></div>
                <div><h3>{title}</h3><p>{text}</p></div>
              </div>
            ))}
          </div>
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
              <p>One team for your home, from design to handover. Clear specifications, accountable engineers and a commitment that lasts beyond completion.</p>
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
                <div className={styles.pillarFooter}>{pillar.highlight}</div>
              </article>
            ))}
          </div>

          <div data-motion-reveal className={styles.assurance}>
            <div className={styles.warrantyIcon}><ShieldCheck size={40} strokeWidth={1.4} aria-hidden="true" /></div>
            <div className={styles.assuranceCopy}>
              <p className={styles.eyebrow}>Built for lasting peace of mind</p>
              <h3>10-year structural warranty.</h3>
              <p>425+ documented quality inspections, from soil analysis to concrete testing. Backed by full-time site supervision and a legally binding structural warranty.</p>
            </div>
            <a href={`https://wa.me/${phone}?text=${encodeURIComponent('Hi Murali Patharala & Associates, I would like to schedule a free site consultation.')}`} target="_blank" rel="noopener noreferrer" className={styles.button}>Consult senior architect <ArrowRight size={18} aria-hidden="true" /></a>
          </div>
        </div>
      </section>
    </>
  );
}
