'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { Montserrat } from 'next/font/google';
import Reveal from './Reveal';

const montserrat = Montserrat({ subsets: ['latin'], weight: ['300', '400', '500', '600'] });

interface CuratedWorksProps {
  basePath: string;
}

const FEATURED_WORKS = [
  {
    id: 'project-oaklane',
    title: 'Project Oaklane',
    typology: 'Contemporary Seaside Residence',
    location: 'East Coast Road, Chennai',
    image: '/images/architecture/hero-villa-twilight.webp',
  },
  {
    id: 'estate-hyderabad',
    title: 'The Courtyard Estate',
    typology: 'Biophilic Water Sanctuary',
    location: 'Anna Nagar, Chennai',
    image: '/images/architecture/courtyard-water-residence.webp',
  },
  {
    id: 'project-stable-house',
    title: 'The Cantilever Pavilions',
    typology: 'Monolithic RCC Concrete Residence',
    location: 'Coimbatore, Tamil Nadu',
    image: '/images/architecture/cantilever-garden-overhang.webp',
  },
  {
    id: 'imperium-estate',
    title: 'The Monolithic Stone Villa',
    typology: 'Private Luxury Estate',
    location: 'Poes Garden, Chennai',
    image: '/images/architecture/monolithic-brutalist-facade.webp',
  },
  {
    id: 'gothic-villa',
    title: 'The Linear Duplex',
    typology: 'Double-Height Urban Residence',
    location: 'Adyar, Chennai',
    image: '/images/architecture/modern-villa-duplex.webp',
  },
];

export default function CuratedWorks({ basePath }: CuratedWorksProps) {
  return (
    <section className="py-24 bg-white text-black">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-12">
        {/* Section Heading modeled on hp_sec7 */}
        <div className="flex flex-col sm:flex-row items-baseline justify-between gap-6 mb-12 border-b border-black pb-8">
          <h2 className={`${montserrat.className} text-[36px] sm:text-[48px] uppercase font-light tracking-[0.06em] text-black`}>
            Featured Works
          </h2>
          <Link
            href={`${basePath}/gallery`}
            className="inline-flex items-center gap-2 text-[11px] tracking-[0.22em] uppercase font-semibold text-black hover:text-[#7d3333] transition-colors"
          >
            <span>View More Projects</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Asymmetrical Grid matching hp_sec7 */}
        <div className="space-y-10 sm:space-y-12">
          {/* Row 1: Dual Grid */}
          <div className="grid md:grid-cols-2 gap-8 sm:gap-10">
            {FEATURED_WORKS.slice(0, 2).map((work, idx) => (
              <Reveal key={work.id} direction="up" delay={idx * 120}>
                <Link
                  href={`${basePath}/gallery`}
                  className="group block overflow-hidden bg-[#fafafa]"
                >
                  <div className="relative aspect-[4/3] w-full overflow-hidden">
                    <Image
                      src={work.image}
                      alt={work.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <div className="pt-4 flex items-center justify-between">
                    <div>
                      <h3 className={`${montserrat.className} text-[18px] uppercase font-light tracking-[0.08em] text-black group-hover:text-[#7d3333] transition-colors`}>
                        {work.title}
                      </h3>
                      <p className="text-[12px] text-[#777777] mt-0.5">
                        {work.typology} · {work.location}
                      </p>
                    </div>
                    <ArrowUpRight className="w-4 h-4 text-black group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>

          {/* Row 2: Large Centerpiece Work */}
          {FEATURED_WORKS[2] && (
            <Reveal direction="scale" duration={1.0}>
              <Link
                href={`${basePath}/gallery`}
                className="group block overflow-hidden bg-[#fafafa]"
              >
                <div className="relative aspect-[16/9] w-full overflow-hidden">
                  <Image
                    src={FEATURED_WORKS[2].image}
                    alt={FEATURED_WORKS[2].title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    sizes="100vw"
                  />
                  <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <div className="pt-4 flex items-center justify-between">
                  <div>
                    <h3 className={`${montserrat.className} text-[20px] uppercase font-light tracking-[0.08em] text-black group-hover:text-[#7d3333] transition-colors`}>
                      {FEATURED_WORKS[2].title}
                    </h3>
                    <p className="text-[12.5px] text-[#777777] mt-0.5">
                      {FEATURED_WORKS[2].typology} · {FEATURED_WORKS[2].location}
                    </p>
                  </div>
                  <ArrowUpRight className="w-5 h-5 text-black group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </Link>
            </Reveal>
          )}

          {/* Row 3: Dual Grid */}
          <div className="grid md:grid-cols-2 gap-8 sm:gap-10">
            {FEATURED_WORKS.slice(3, 5).map((work, idx) => (
              <Reveal key={work.id} direction="up" delay={idx * 120}>
                <Link
                  href={`${basePath}/gallery`}
                  className="group block overflow-hidden bg-[#fafafa]"
                >
                  <div className="relative aspect-[4/3] w-full overflow-hidden">
                    <Image
                      src={work.image}
                      alt={work.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <div className="pt-4 flex items-center justify-between">
                    <div>
                      <h3 className={`${montserrat.className} text-[18px] uppercase font-light tracking-[0.08em] text-black group-hover:text-[#7d3333] transition-colors`}>
                        {work.title}
                      </h3>
                      <p className="text-[12px] text-[#777777] mt-0.5">
                        {work.typology} · {work.location}
                      </p>
                    </div>
                    <ArrowUpRight className="w-4 h-4 text-black group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>

        {/* View More Button at bottom */}
        <div className="mt-14 text-center">
          <Link
            href={`${basePath}/gallery`}
            className="inline-flex items-center gap-3 border border-black px-8 py-3.5 text-[11px] tracking-[0.24em] uppercase font-medium hover:bg-black hover:text-white transition-all duration-300"
          >
            <span>View More Projects</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
