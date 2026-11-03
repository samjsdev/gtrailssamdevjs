import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import styles from './ArchFoundationSpotlight.module.css';

export default function ArchFoundationSpotlight() {
  return (
    <section className={styles.section} aria-labelledby="mpa-build-heading">
      <div className={styles.container}>
        <div data-motion-reveal className={styles.copy}>
          <div className={styles.brandLead}>
            <Link href="/construction-package" aria-label="ARCH foundations Construction Packages">
              <Image
                src="/murali-patharala-associates-assets/brand_identity/WhatsApp Image 2026-09-23 at 16.52.36.webp"
                alt="ARCH foundations logo"
                width={124}
                height={124}
                className={styles.brandLogo}
              />
            </Link>
            <p className={styles.eyebrow}>Design to handover</p>
          </div>
          <h2 id="mpa-build-heading">
            Designed by MPA.<br />
            <em>
              Built by{' '}
              <Link href="/construction-package" className="hover:underline text-inherit" title="View Construction Packages">
                <span className="brand-name">ARCH foundations</span>
              </Link>.
            </em>
          </h2>
          <p className={styles.lead}>
            MPA provides architectural and interior design consultancy.{' '}
            <Link href="/construction-package" className="hover:underline text-inherit font-semibold" title="View Construction Packages">
              <span className="brand-name">ARCH foundations</span>
            </Link>{' '}
            complements that work with construction, property development, project management and site supervision.
          </p>
          <div className={styles.actions}>
            <Link href="/construction-package" className={styles.primary}>
              Construction Packages <ArrowUpRight size={17} aria-hidden="true" />
            </Link>
            <Link href="/services/residential-construction" className={styles.secondary}>
              How we build
            </Link>
          </div>
        </div>

        <div data-motion-reveal className={styles.visual}>
          <Image
            src="/images/architecture/structural-construction-frame.webp"
            alt="Construction work at the structural stage"
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
