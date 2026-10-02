'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Play, Pause, ArrowRight, Sparkles } from 'lucide-react';
import ArchitecturalDiagramBg from '@/components/ArchitecturalDiagramBg';
import { siteAssets } from '@/lib/siteAssets';
import { getProjectImageTitle } from '@/lib/projectTitles';
import titleStyles from './ProjectTitle.module.css';

interface Project {
  img: string;
  title: string;
  tag: string;
}

const PROJECTS: Project[] = [
  {
    img: siteAssets.exteriors.whiteDuplex,
    title: 'Contemporary Duplex',
    tag: 'Exterior render',
  },
  {
    img: siteAssets.exteriors.duskVilla,
    title: 'Twilight Villa',
    tag: 'Exterior render',
  },
  {
    img: siteAssets.exteriors.geometricFacade,
    title: 'Geometric Residence',
    tag: 'Exterior render',
  },
  {
    img: siteAssets.exteriors.whiteResidence,
    title: 'White Modern Home',
    tag: 'Exterior render',
  },
  {
    img: siteAssets.exteriors.timberVilla,
    title: 'Timber Accent Villa',
    tag: 'Exterior render',
  },
  {
    img: siteAssets.exteriors.urbanResidence,
    title: 'Urban Corner Residence',
    tag: 'Exterior render',
  },
  {
    img: siteAssets.exteriors.courtyardHome,
    title: 'Garden Courtyard Home',
    tag: 'Exterior render',
  },
  {
    img: siteAssets.exteriors.orangeFacade,
    title: 'Vertical Facade Residence',
    tag: 'Exterior render',
  },
  {
    img: siteAssets.interiors.kitchenDining,
    title: 'Kitchen & Dining Interior',
    tag: 'Completed interior',
  },
  {
    img: siteAssets.interiors.livingRoom,
    title: 'Contemporary Living Interior',
    tag: 'Interior render',
  },
];

export default function ProjectCarousel() {
  const [isPaused, setIsPaused] = useState(false);

  // Duplicate for smooth seamless infinite continuous scrolling loop
  const displayProjects = [...PROJECTS, ...PROJECTS].map((project) => ({
    ...project,
    title: getProjectImageTitle(project.img, project.title),
  }));

  return (
    <section id="projects" className="relative border-b-4 border-[#111111] bg-surface-sand text-ink-muted overflow-hidden">
      <ArchitecturalDiagramBg variant="elevation" theme="light" opacity={0.28} watermarkText="ELEVATION ARCHIVES" />
      <div className="relative z-10">
        {/* Header Strip */}
        <div className="p-6 md:p-12 border-b-2 border-[#212121] flex flex-wrap justify-between items-end gap-6">
        <div>
          <p className="text-xs font-bold tracking-[0.2em] uppercase text-[#703015] mb-3 flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>PORTFOLIO</span>
          </p>
          <h2
            className="text-3xl md:text-5xl font-bold font-serif text-[#302A20] tracking-tight"
            style={{ fontFamily: "var(--font-content)" }}
          >
            Signature Residences
          </h2>
          <p className="text-xs md:text-sm text-ink-muted mt-2 font-medium max-w-xl">
            A selection of residential elevations, interiors and completed spaces from the MPA portfolio.
          </p>
        </div>

        {/* Right Controls & Link */}
        <div className="flex items-center gap-4">
          {/* Continuous Scroll Play / Pause Toggle */}
          <button
            type="button"
            onClick={() => setIsPaused((prev) => !prev)}
            className="px-3.5 py-2 border border-[#333333] hover:border-[#EA580C] hover:bg-[#EA580C] hover:text-[#111111] transition-colors text-xs font-bold uppercase tracking-wider flex items-center gap-2 text-ink-muted"
            aria-label={isPaused ? 'Resume continuous scroll' : 'Pause continuous scroll'}
            title={isPaused ? 'Resume continuous scroll' : 'Pause continuous scroll'}
          >
            {isPaused ? <Play className="w-3.5 h-3.5 fill-current text-[#703015]" /> : <Pause className="w-3.5 h-3.5 fill-current text-[#703015]" />}
            <span className="hidden sm:inline text-[11px]">
              {isPaused ? 'Resume Scroll' : 'Pause Scroll'}
            </span>
          </button>

          <Link
            href="/gallery"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#EA580C] text-[#111111] hover:bg-surface-cream text-xs font-bold uppercase tracking-widest transition-colors shadow-sm"
          >
            <span>View Full Gallery</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* Continuous portfolio strip */}
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes continuousPortfolioScroll {
            0% {
              transform: translate3d(0, 0, 0);
            }
            100% {
              transform: translate3d(-50%, 0, 0);
            }
          }
          .portfolio-continuous-track {
            display: flex !important;
            width: max-content !important;
            will-change: transform;
            animation: continuousPortfolioScroll 75s linear infinite !important;
          }
          .portfolio-continuous-track.is-paused {
            animation-play-state: paused !important;
          }
          .portfolio-continuous-track:hover,
          .portfolio-continuous-track:focus-within {
            animation-play-state: paused !important;
          }
          @media (prefers-reduced-motion: reduce) {
            .portfolio-continuous-track {
              animation-play-state: paused !important;
            }
          }
        `
      }} />

      {/* Infinite Continuous Scrolling Track */}
      <div className="relative py-8 md:py-10">
        <div className="overflow-hidden w-full">
          <div className={`portfolio-continuous-track ${isPaused ? 'is-paused' : ''}`}>
            {displayProjects.map((proj, i) => (
              <div
                key={`${proj.title}-${i}`}
                aria-hidden={i >= PROJECTS.length ? true : undefined}
                className="w-[300px] sm:w-[400px] md:w-[460px] lg:w-[500px] mx-3 md:mx-4 border border-[#5D5140]/20 bg-surface-cream shrink-0 select-none overflow-hidden"
              >
                <div className="aspect-[16/11] relative overflow-hidden bg-surface-linen">
                  <Image
                    src={proj.img}
                    alt={`${proj.title} — ${proj.tag}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 639px) 300px, (max-width: 767px) 400px, (max-width: 1023px) 460px, 500px"
                  />
                </div>
                <div className="border-t border-[#5D5140]/15 px-4 py-4 md:px-5">
                  <h3 className={`${titleStyles.title} text-[#302A20]`} title={proj.title}>
                    {proj.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </section>
);
}
