import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import styles from './ArchFoundationSpotlight.module.css';

export default function ArchFoundationSpotlight() {
  return (
    <section className={styles.section} aria-labelledby="mpa-build-heading">
      <div className={styles.container}>
        <div data-motion-reveal className={styles.copy}>
          <p className={styles.eyebrow}>Design to handover</p>
          <h2 id="mpa-build-heading">
            Designed by MPA.<br />
            <em>Built by ARCH Foundation.</em>
          </h2>
          <p className={styles.lead}>
            You plan your home with MPA. On site, ARCH Foundation — our construction team — builds exactly that. One responsibility from first sketch to handover.
          </p>
          <div className={styles.actions}>
            <Link href="/services/architectural-design" className={styles.primary}>
              Explore architectural design <ArrowUpRight size={17} aria-hidden="true" />
            </Link>
            <Link href="/services/residential-construction" className={styles.secondary}>
              How we build
            </Link>
          </div>
        </div>

        <div data-motion-reveal className={styles.visual}>
          <Image
            src="/images/architecture/structural-construction-frame.webp"
            alt="MPA construction team building a home to approved drawings"
            fill
            sizes="(max-width: 900px) 100vw, 52vw"
            className={styles.image}
          />
          <div className={styles.caption}>
            <span>On site</span>
            <strong>Built to MPA drawings</strong>
          </div>
        </div>
      </div>
    </section>
  );
}
