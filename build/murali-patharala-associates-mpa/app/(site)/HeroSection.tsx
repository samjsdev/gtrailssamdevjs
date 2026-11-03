'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, Layers, Play, Pause, ArrowUpRight } from 'lucide-react';
import { siteAssets } from '@/lib/siteAssets';
import styles from './HeroSection.module.css';

interface HeroSectionProps {
  phone: string;
}

interface VillaSlide {
  image: string;
  title: string;
  description: string;
}

const VILLA_SLIDES: VillaSlide[] = [
  {
    image: siteAssets.exteriors.duskVilla,
    title: 'Contemporary villa at dusk',
    description: 'Exterior design visualization',
  },
  {
    image: siteAssets.exteriors.whiteDuplex,
    title: 'White contemporary duplex',
    description: 'Residential facade visualization',
  },
  {
    image: siteAssets.exteriors.timberVilla,
    title: 'Timber accent residence',
    description: 'Exterior design visualization',
  },
  {
    image: siteAssets.exteriors.geometricFacade,
    title: 'Geometric facade residence',
    description: 'Architectural elevation visualization',
  },
  {
    image: siteAssets.exteriors.urbanResidence,
    title: 'Urban corner residence',
    description: 'Architectural elevation visualization',
  },
  {
    image: siteAssets.exteriors.whiteResidence,
    title: 'White modern residence',
    description: 'Residential facade visualization',
  },
];

export default function HeroSection({ phone }: HeroSectionProps) {
  const [current, setCurrent] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    setIsPlaying(!preference.matches);
    const onChange = () => setIsPlaying(!preference.matches);
    preference.addEventListener('change', onChange);
    return () => preference.removeEventListener('change', onChange);
  }, []);

  useEffect(() => {
    if (!isPlaying) return;
    const timer = setInterval(() => setCurrent(index => (index + 1) % VILLA_SLIDES.length), 2600);
    return () => clearInterval(timer);
  }, [isPlaying, current]);

  const changeSlide = (direction: number) => {
    setCurrent(index => (index + direction + VILLA_SLIDES.length) % VILLA_SLIDES.length);
  };
  const activeSlide = VILLA_SLIDES[current];

  return (
    <section id="home" className={styles.hero} aria-label="Architecture by Murali Patharala and Associates with construction by ARCH foundations">
      <div className={styles.scene}>
        {VILLA_SLIDES.map((slide, index) => (
          <div key={slide.image} className={`${styles.slide} ${index === current ? styles.active : ''}`} aria-hidden={index !== current}>
            <Image
              src={slide.image}
              alt={slide.title}
              fill
              priority={index === 0}
              loading={index === 0 ? 'eager' : 'lazy'}
              sizes="100vw"
              className={styles.photo}
            />
          </div>
        ))}
        <div className={styles.scrim} aria-hidden="true" />
        <div className={styles.topline}>
          <span className={styles.disciplines}>Architecture <i /> Construction <i /> Interiors</span>
          <span className={styles.established}>Chennai, India <span> / </span> Since 1998</span>
        </div>

        <div className={styles.headline}>
          <p className={styles.eyebrow}><span /> Spaces for a lifetime</p>
          <h1>Thoughtfully designed.<br /><em>Beautifully built.</em></h1>
          <p className={styles.intro}>Architecture, construction and interiors.<br />For homes, workplaces and communities.</p>
          <div className={styles.heroActions}>
            <Link className={styles.primaryAction} href="/contact#enquiry">Start Your Project <ArrowUpRight size={17} aria-hidden="true" /></Link>
            <Link className="mpa-outline-cta mpa-outline-cta--dark" href="/construction-package">Explore packages <ArrowUpRight size={17} aria-hidden="true" /></Link>
          </div>
        </div>

        <div className={styles.projectBar}>
          <div className={styles.projectInfo}>
            <Layers size={14} aria-hidden="true" />
            <span>{activeSlide.title}</span>
            <span className={styles.projectSize}>{activeSlide.description}</span>
          </div>
          <div className={styles.controls}>
            <span className={styles.counter}><strong>{String(current + 1).padStart(2, '0')}</strong> / {String(VILLA_SLIDES.length).padStart(2, '0')}</span>
            <button type="button" aria-label="Previous Villa Slide" onClick={() => changeSlide(-1)}><ChevronLeft size={18} /></button>
            <button type="button" aria-label={isPlaying ? 'Pause slideshow' : 'Play slideshow'} aria-pressed={isPlaying} onClick={() => setIsPlaying(value => !value)}>{isPlaying ? <Pause size={15} /> : <Play size={15} />}</button>
            <button type="button" aria-label="Next Villa Slide" onClick={() => changeSlide(1)}><ChevronRight size={18} /></button>
          </div>
        </div>
      </div>

    </section>
  );
}
