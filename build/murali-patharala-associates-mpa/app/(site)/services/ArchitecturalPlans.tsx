'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, ChevronLeft, ChevronRight, Expand, Pause, Play, X } from 'lucide-react';
import Modal from '@/components/Modal';
import styles from './ThreeDimensionalPlans.module.css';
import viewerStyles from './ArchitecturalPlans.module.css';

const directory = '/images/2d%20plan/';
const drawings = [
  {
    title: 'Ground floor plan',
    discipline: 'Space & circulation',
    description: 'Living spaces, landscaped edges and everyday movement, considered together.',
    image: 'ground-floor',
    details: ['Room layouts & furniture', 'Landscape & open spaces', 'Movement & circulation'],
    width: 1459,
    height: 978,
    original: 'GROUND FLOOR PLAN ( OPTION 2 )_page-0001.jpg',
    alt: 'Residential ground floor drawing showing furnished rooms, a landscaped lawn and circulation',
  },
  {
    title: 'First floor plan',
    discipline: 'Rooms & relationships',
    description: 'Private rooms, shared spaces and open areas resolved through a detailed floor layout.',
    image: 'first-floor',
    details: ['Private & shared spaces', 'Staircase & connections', 'Dimensions & room relationships'],
    width: 3891,
    height: 2934,
    original: '2 FIRST FLOOR PLAN 19.10.2021_page-0001.jpg',
    alt: 'Dimensioned first floor architectural drawing showing bedrooms, terraces and a central staircase',
  },
  {
    title: 'Building elevation',
    discipline: 'Form & proportion',
    description: 'The building’s character takes shape through its facade, openings and proportions.',
    image: 'elevation',
    details: ['Facade proportions', 'Openings & balconies', 'Entrance & building character'],
    width: 2685,
    height: 2015,
    original: 'approval plan - elevation_page-0001.jpg',
    alt: 'Architectural elevation drawing showing a multi-storey facade, balconies and entrance',
  },
  {
    title: 'Electrical layout',
    discipline: 'Services & coordination',
    description: 'Lighting and electrical points coordinated with the way each room will be used.',
    image: 'electrical',
    details: ['Lighting & electrical points', 'Switches & wiring routes', 'Coordination with room layouts'],
    width: 2033,
    height: 1064,
    original: 'GROUND FLOOR ELECRICAL LAYOUT_page-0001.jpg',
    alt: 'Ground floor electrical drawing showing lighting points, switches and wiring routes',
  },
];

export default function ArchitecturalPlans() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);

  const active = drawings[activeIndex];
  const sheetNumber = String(activeIndex + 1).padStart(2, '0');
  const totalSheets = String(drawings.length).padStart(2, '0');
  const originalUrl = `${directory}${encodeURIComponent(active.original)}`;

  useEffect(() => {
    if (!isPlaying || expanded) return;

    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % drawings.length);
    }, 2300);

    return () => clearInterval(timer);
  }, [isPlaying, expanded]);

  const handleSelect = (index: number) => {
    setActiveIndex(index);
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveIndex((prev) => (prev === 0 ? drawings.length - 1 : prev - 1));
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveIndex((prev) => (prev === drawings.length - 1 ? 0 : prev + 1));
  };

  return (
    <section id="architectural-plans" aria-labelledby="architectural-plans-title" className={`${styles.section} ${styles.mirrored}`}>
      <div className={styles.container}>
        <div className={styles.topline}>
          <p><span aria-hidden="true" /> Architectural drawings</p>
          <span>MPA / Selected drawings</span>
        </div>
        <header className={styles.heading}>
          <p>A closer look at the plans behind the spaces. From room layouts and circulation to elevations and electrical coordination, every line has a purpose.</p>
          <h2 id="architectural-plans-title">2D Plans</h2>
        </header>

        <div className={styles.showcase}>
          <div
            key={activeIndex}
            className={`${styles.details} ${styles.detailsAnimated}`}
            aria-live="polite"
            aria-atomic="true"
          >
            <div className={styles.viewNumber}>
              <span>Studio drawing</span>
              <span>{sheetNumber} / {totalSheets}</span>
            </div>
            <p className={styles.category}>{active.discipline}</p>
            <h3>{active.title}</h3>
            <p className={styles.description}>{active.description}</p>
            <ul>
              {active.details.map((detail) => (
                <li key={detail}>
                  <span aria-hidden="true" />
                  {detail}
                </li>
              ))}
            </ul>
            <span className={styles.note}>A thoughtful foundation for every space.</span>
          </div>

          <div className={styles.preview}>
            <div
              className={styles.sliderViewport}
              role="button"
              tabIndex={0}
              aria-label={`Enlarge ${active.title.toLowerCase()}`}
              onClick={() => setExpanded(true)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setExpanded(true);
                }
              }}
            >
              <div
                className={styles.sliderTrack}
                style={{ transform: `translateX(-${activeIndex * 100}%)` }}
              >
                {drawings.map((drawing) => (
                  <div key={drawing.image} className={styles.slideItem}>
                    <Image
                      src={`${directory}optimized/${drawing.image}.webp`}
                      alt={drawing.alt}
                      fill
                      sizes="(max-width: 900px) calc(100vw - 48px), (max-width: 1440px) 65vw, 850px"
                      className={styles.render}
                      priority
                      loading="eager"
                    />
                  </div>
                ))}
              </div>
              <span className={styles.expand}>
                <Expand size={15} aria-hidden="true" /> View full drawing
              </span>
            </div>

            <button
              type="button"
              aria-label="Previous drawing"
              onClick={handlePrev}
              className={`${styles.navBtn} ${styles.navBtnPrev}`}
            >
              <ChevronLeft size={22} aria-hidden="true" />
            </button>
            <button
              type="button"
              aria-label="Next drawing"
              onClick={handleNext}
              className={`${styles.navBtn} ${styles.navBtnNext}`}
            >
              <ChevronRight size={22} aria-hidden="true" />
            </button>

            <button
              type="button"
              aria-label={isPlaying ? 'Pause auto-slide' : 'Play auto-slide'}
              onClick={(e) => {
                e.stopPropagation();
                setIsPlaying((prev) => !prev);
              }}
              className={styles.playPauseBtn}
            >
              {isPlaying ? <Pause size={13} aria-hidden="true" /> : <Play size={13} aria-hidden="true" />}
              <span>{isPlaying ? 'Pause' : 'Play'}</span>
            </button>
          </div>
        </div>

        <nav aria-label="Choose a studio drawing" data-motion-group className={styles.choices}>
          {drawings.map((drawing, index) => (
            <button
              key={drawing.image}
              type="button"
              aria-pressed={index === activeIndex}
              className={`${styles.choice} ${index === activeIndex ? styles.active : ''}`}
              onClick={() => handleSelect(index)}
            >
              <span className={styles.thumbnail}>
                <Image
                  src={`${directory}optimized/${drawing.image}-thumb.webp`}
                  alt=""
                  fill
                  sizes="(max-width: 900px) 40vw, 280px"
                  className={styles.thumbImage}
                />
                <span className={styles.thumbNumber}>{String(index + 1).padStart(2, '0')}</span>
              </span>
              <span className={styles.choiceLabel}>
                {drawing.title}
                <ArrowUpRight size={15} aria-hidden="true" />
              </span>
            </button>
          ))}
        </nav>

        <div className={styles.bottomline}>
          <p>Thoughtful layouts. Clear documentation.</p>
          <Link href="/contact#enquiry" className="mpa-outline-cta">Discuss your floor plan <ArrowUpRight size={16} aria-hidden="true" /></Link>
        </div>
      </div>

      {expanded && (
        <Modal wide label={`${active.title} — full drawing`} onClose={() => setExpanded(false)}>
          <div className={viewerStyles.viewerHeader}>
            <div><span>Studio drawing / {sheetNumber}</span><h3>{active.title}</h3></div>
            <button type="button" onClick={() => setExpanded(false)} aria-label="Close drawing" className={viewerStyles.close}><X size={22} aria-hidden="true" /></button>
          </div>
          <div className={viewerStyles.fullDrawing}><Image src={originalUrl} alt={active.alt} width={active.width} height={active.height} sizes="(max-width: 960px) 100vw, 960px" className={viewerStyles.originalImage} /></div>
          <div className={viewerStyles.viewerFooter}><p>{active.discipline}</p><a href={originalUrl} target="_blank" rel="noopener noreferrer">Open original drawing <ArrowUpRight size={15} aria-hidden="true" /></a></div>
        </Modal>
      )}
    </section>
  );
}
