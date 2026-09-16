'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, MapPin, Play, Pause, ArrowUpRight, ArrowRight } from 'lucide-react';
import styles from './HeroSection.module.css';

interface HeroSectionProps {
  phone: string;
}

interface VillaSlide {
  image: string;
  tag: string;
  location: string;
  title: string;
  specs: string;
  shortSpecs: string;
}

const VILLA_SLIDES: VillaSlide[] = [
  {
    image: '/images/architecture/hero-villa-twilight.webp',
    tag: 'Completed Turnkey Villa',
    location: 'Boat Club Road',
    title: 'The Cantilever Twilight Villa',
    specs: '5,400 sq.ft • Turnkey Architectural & Civil Execution • G+2',
    shortSpecs: '5,400 sq.ft • G+2 Turnkey Residence',
  },
  {
    image: '/images/architecture/modern-villa-duplex.webp',
    tag: 'Bespoke Luxury Residence',
    location: 'Anna Nagar East',
    title: 'The Contemporary Duplex Villa',
    specs: '4,600 sq.ft • Monolithic Concrete & Teak Louvers • G+1',
    shortSpecs: '4,600 sq.ft • Contemporary Duplex',
  },
  {
    image: '/images/architecture/tropical-modern-villa.webp',
    tag: 'Tropical Modernist Landmark',
    location: 'Kilpauk',
    title: 'The Courtyard Atrium Villa',
    specs: '3,950 sq.ft • Double-Height Living & Private Garden • G+2',
    shortSpecs: '3,950 sq.ft • Courtyard Atrium Villa',
  },
  {
    image: '/images/architecture/luxury-modernist-estate.webp',
    tag: 'Signature Architectural Estate',
    location: 'Poes Garden',
    title: 'The Grand Modernist Estate',
    specs: '6,200 sq.ft • Primary TMT & Imported Marble Finishes • G+2',
    shortSpecs: '6,200 sq.ft • Signature Villa Estate',
  },
  {
    image: '/images/architecture/geometric-villa-elevation.webp',
    tag: 'Contemporary Coastal Villa',
    location: 'ECR Corridor',
    title: 'The Geometric Facade Villa',
    specs: '4,200 sq.ft • Climate-Responsive Shading & Glass Pavilion • G+1',
    shortSpecs: '4,200 sq.ft • Coastal Villa Pavilion',
  },
  {
    image: '/images/architecture/villa-after-finished.webp',
    tag: 'Executive Turnkey Home',
    location: 'Anna Nagar West',
    title: 'The Signature White Villa',
    specs: '4,500 sq.ft • In-House Supervision & 425+ QC Checks • G+2',
    shortSpecs: '4,500 sq.ft • Turnkey White Villa',
  },
];

export default function HeroSection({ phone }: HeroSectionProps) {
  const [current, setCurrent] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const rawDigits = phone.replace(/\D/g, '');
  const cleanPhone = rawDigits.startsWith('91') ? rawDigits : `91${rawDigits.replace(/^0+/, '')}`;

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
    <section id="home" className={styles.hero} aria-label="Architecture by Murali Patharala and Associates with construction by ARCH Foundation">
      <div className={styles.scene}>
        {VILLA_SLIDES.map((slide, index) => (
          <div key={slide.image} className={`${styles.slide} ${index === current ? styles.active : ''}`} aria-hidden={index !== current}>
            <Image
              src={slide.image}
              alt={`${slide.title}, ${slide.location}`}
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
          <p className={styles.intro}>Architecture, construction and interiors.<br />One accountable team. A home that is entirely yours.</p>
        </div>

        <div className={styles.projectBar}>
          <div className={styles.projectInfo}>
            <MapPin size={14} aria-hidden="true" />
            <span>{activeSlide.location}</span>
            <span className={styles.projectSize}>{activeSlide.shortSpecs}</span>
          </div>
          <div className={styles.controls}>
            <span className={styles.counter}><strong>{String(current + 1).padStart(2, '0')}</strong> / {String(VILLA_SLIDES.length).padStart(2, '0')}</span>
            <button type="button" aria-label="Previous Villa Slide" onClick={() => changeSlide(-1)}><ChevronLeft size={18} /></button>
            <button type="button" aria-label={isPlaying ? 'Pause slideshow' : 'Play slideshow'} aria-pressed={isPlaying} onClick={() => setIsPlaying(value => !value)}>{isPlaying ? <Pause size={15} /> : <Play size={15} />}</button>
            <button type="button" aria-label="Next Villa Slide" onClick={() => changeSlide(1)}><ChevronRight size={18} /></button>
          </div>
        </div>
      </div>

      <aside className={styles.projectCard} aria-label="Start your home project">
        <div className={styles.cardTop}><span>The MPA approach</span><ArrowUpRight size={23} aria-hidden="true" /></div>
        <h2>From the first sketch.<br /><em>To your front door.</em></h2>
        <p>Build with clarity. Fixed prices, in-house expertise and care in every detail.</p>
        <Link className={styles.primary} href="/construction-package">Explore packages <ArrowUpRight size={18} aria-hidden="true" /></Link>
        <a className={styles.secondary} href={`https://wa.me/${cleanPhone}?text=${encodeURIComponent('Hi ARCH Foundation, I would like to discuss a residential construction project in Chennai.')}`} target="_blank" rel="noopener noreferrer">Talk to our construction team <ArrowRight size={17} aria-hidden="true" /></a>
        <div className={styles.assurance}><span>✓ Fixed price</span><span>✓ 10-year warranty</span></div>
      </aside>
    </section>
  );
}
