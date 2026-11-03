'use client';

import BeforeAfter from './BeforeAfter';
import styles from './DesignDevelopmentCards.module.css';

const studies = [
  {
    id: '2',
    title: 'Layered facade',
    description: 'White volumes, textured stone and patterned balcony screens.',
    aspectRatio: '1100 / 752',
    variant: 'horizontal',
  },
  {
    id: '3',
    title: 'Sculpted elevation',
    description: 'A distinctive facade with curved balconies and a decorative feature.',
    aspectRatio: '1100 / 752',
    variant: 'horizontal',
  },
  {
    id: '1',
    title: 'Stone & timber',
    description: 'Vertical stone cladding, timber screens and recessed balconies.',
    aspectRatio: '879 / 1100',
    variant: 'vertical',
  },
] as const;

function DesignCard({ study }: { study: (typeof studies)[number] }) {
  const isVertical = study.variant === 'vertical';

  return (
    <article className={`${styles.card} ${isVertical ? styles.cardVertical : styles.cardHorizontal}`}>
      <header className={styles.cardHeading}>
        <span className={styles.number}>0{study.id}</span>
        <h3>{study.title}</h3>
      </header>
      <BeforeAfter
        beforeImage={`/images/2D TO 3D/option-${study.id}-sketch.webp`}
        afterImage={`/images/2D TO 3D/option-${study.id}-render.webp`}
        title={study.title}
        aspectRatio={study.aspectRatio}
      />
      <p className={styles.caption}>{study.description}</p>
    </article>
  );
}

export default function DesignDevelopmentCards() {
  return (
    <div data-motion-group className={styles.grid}>
      {studies.map(study => (
        <DesignCard key={study.id} study={study} />
      ))}
    </div>
  );
}
