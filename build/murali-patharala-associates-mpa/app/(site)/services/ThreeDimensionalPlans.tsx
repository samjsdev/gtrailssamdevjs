'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, ChevronLeft, ChevronRight, Expand, Pause, Play, X } from 'lucide-react';
import Modal from '@/components/Modal';
import viewerStyles from './ArchitecturalPlans.module.css';
import styles from './ThreeDimensionalPlans.module.css';

const views = [
  {
    title: 'Ayanambakkam Villa',
    category: 'Exterior / Contemporary Villa',
    image: 'ayanambakkam-villa',
    original: '/images/3d-plans/ayanambakkam-villa-full.webp',
    width: 5717,
    height: 3911,
    alt: '3D exterior render of Ayanambakkam contemporary villa with illuminated terraces and warm exterior lighting',
    description: 'Modern tri-level residence with cantilevered balconies, ambient warm cove lighting, and natural wood and stone textures.',
    details: ['Cantilevered balconies & pergola', 'Warm cove & facade accent lighting', 'Lush landscaping & boundary integration'],
  },
  {
    title: 'JP House Residence',
    category: 'Exterior / Modern Geometric',
    image: 'jp-house-residence',
    original: '/images/3d-plans/jp-house-residence-full.webp',
    width: 4964,
    height: 3511,
    alt: '3D visualization of JP House Residence showing modern angular facade and glass balconies',
    description: 'Sleek geometric massing featuring double-height corner glazing, warm wooden soffits, and integrated perimeter illumination.',
    details: ['Double-height corner glass facade', 'Wood-paneled cantilevered eaves', 'Balanced volumes & perimeter greenery'],
  },
  {
    title: 'Twilight Residence',
    category: 'Exterior / Evening Atmosphere',
    image: 'twilight-residence',
    original: '/images/3d-plans/twilight-residence-full.webp',
    width: 5708,
    height: 3901,
    alt: 'Dusk 3D architectural render of Twilight Residence with illuminated stair core and warm terrace lights',
    description: 'Dramatic dusk lighting study showcasing illuminated stair core, textured slate cladding, and landscaped entrance forecourt.',
    details: ['Vertical glass stairwell illumination', 'Textured stone & slate facade accents', 'Dusk lighting & landscape ambiance'],
  },
  {
    title: 'Sree Aksharaa Enclave',
    category: 'Exterior / Duplex Residence',
    image: 'aksharaa-enclave',
    original: '/images/3d-plans/aksharaa-enclave-full.webp',
    width: 5708,
    height: 3901,
    alt: '3D architectural rendering of Sree Aksharaa Enclave modern multi-level family home',
    description: 'Richly articulated multi-level home featuring timber composite battens, glass balustrades, and structured carport pergola.',
    details: ['Timber composite architectural louvers', 'Covered carport with pergola framing', 'Terrace sit-out & glass balustrades'],
  },
];

export default function ThreeDimensionalPlans() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);

  const active = views[activeIndex];
  const number = String(activeIndex + 1).padStart(2, '0');
  const totalViews = String(views.length).padStart(2, '0');

  useEffect(() => {
    if (!isPlaying || expanded) return;

    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % views.length);
    }, 2300);

    return () => clearInterval(timer);
  }, [isPlaying, expanded]);

  const handleSelect = (index: number) => {
    setActiveIndex(index);
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveIndex((prev) => (prev === 0 ? views.length - 1 : prev - 1));
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveIndex((prev) => (prev === views.length - 1 ? 0 : prev + 1));
  };

  return (
    <section id="3d-plans" aria-labelledby="3d-plans-title" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.topline}>
          <p><span aria-hidden="true" /> Architectural visualisations</p>
          <span>MPA / Authentic 3D Renders</span>
        </div>
        <header className={styles.heading}>
          <h2 id="3d-plans-title">3D Plans</h2>
          <p>Explore form, materials and light before construction begins. Authentic client elevations and exterior visualizations bring every project into perspective.</p>
        </header>

        <div className={styles.showcase}>
          <div className={styles.preview}>
            <div
              className={styles.sliderViewport}
              role="button"
              tabIndex={0}
              aria-label={`Enlarge 3D view: ${active.title}`}
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
                {views.map((view) => (
                  <div key={view.image} className={styles.slideItem}>
                    <Image
                      src={`/images/3d-plans/${view.image}.webp`}
                      alt={view.alt}
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
                <Expand size={15} aria-hidden="true" /> View full image
              </span>
            </div>

            <button
              type="button"
              aria-label="Previous 3D view"
              onClick={handlePrev}
              className={`${styles.navBtn} ${styles.navBtnPrev}`}
            >
              <ChevronLeft size={22} aria-hidden="true" />
            </button>
            <button
              type="button"
              aria-label="Next 3D view"
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

          <div
            key={activeIndex}
            className={`${styles.details} ${styles.detailsAnimated}`}
            aria-live="polite"
            aria-atomic="true"
          >
            <div className={styles.viewNumber}>
              <span>Visualisation</span>
              <span>{number} / {totalViews}</span>
            </div>
            <p className={styles.category}>{active.category}</p>
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
            <span className={styles.note}>A clearer spatial vision before groundbreaking.</span>
          </div>
        </div>

        <nav aria-label="Choose a 3D view" data-motion-group className={styles.choices}>
          {views.map((view, index) => (
            <button
              key={view.image}
              type="button"
              aria-pressed={index === activeIndex}
              className={`${styles.choice} ${index === activeIndex ? styles.active : ''}`}
              onClick={() => handleSelect(index)}
            >
              <span className={styles.thumbnail}>
                <Image
                  src={`/images/3d-plans/${view.image}-thumb.webp`}
                  alt=""
                  fill
                  sizes="(max-width: 900px) 40vw, 280px"
                  className={styles.thumbImage}
                />
                <span className={styles.thumbNumber}>{String(index + 1).padStart(2, '0')}</span>
              </span>
              <span className={styles.choiceLabel}>
                {view.title}
                <ArrowUpRight size={15} aria-hidden="true" />
              </span>
            </button>
          ))}
        </nav>

        <div className={styles.bottomline}>
          <p>From precise drawings to a spatial vision.</p>
          <Link href="/contact#enquiry" className="mpa-outline-cta mpa-outline-cta--accent">
            Discuss your design <ArrowUpRight size={16} aria-hidden="true" />
          </Link>
        </div>
      </div>

      {expanded && (
        <Modal wide label={`${active.title} — 3D visualisation`} onClose={() => setExpanded(false)}>
          <div className={viewerStyles.viewerHeader}>
            <div>
              <span>3D visualisation / {number}</span>
              <h3>{active.title}</h3>
            </div>
            <button
              type="button"
              aria-label="Close 3D view"
              onClick={() => setExpanded(false)}
              className={viewerStyles.close}
            >
              <X size={22} aria-hidden="true" />
            </button>
          </div>
          <div className={viewerStyles.fullDrawing}>
            <Image
              src={`/images/3d-plans/${active.image}.webp`}
              alt={active.alt}
              width={active.width}
              height={active.height}
              sizes="(max-width: 960px) 100vw, 960px"
              className={viewerStyles.originalImage}
            />
          </div>
          <div className={viewerStyles.viewerFooter}>
            <p>{active.category}</p>
            <a href={active.original} target="_blank" rel="noopener noreferrer">
              Open full-resolution render <ArrowUpRight size={15} aria-hidden="true" />
            </a>
          </div>
        </Modal>
      )}
    </section>
  );
}
