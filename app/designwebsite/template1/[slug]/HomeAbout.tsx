'use client';

import { ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { cleanClinicDescription, cleanClinicName } from '@/lib/copyCleaner';

type HomeAboutProps = {
  basePath: string;
  clinic: any;
  doctor: any;
  doctorImage: string;
  homeAbout?: any;
};

export default function HomeAbout({ basePath, clinic, doctor, doctorImage, homeAbout }: HomeAboutProps) {
  const cleanName = cleanClinicName(clinic.name);
  const cleanDesc = cleanClinicDescription(clinic.description, clinic.name);

  const items = [
    {
      title: homeAbout?.item1?.title || 'Spatial Planning',
      desc: homeAbout?.item1?.desc || 'We optimize flow and human circulation, ensuring every square foot serves a distinct structural and functional purpose.'
    },
    {
      title: homeAbout?.item2?.title || 'Material Honesty',
      desc: homeAbout?.item2?.desc || 'Curated natural materials, subtle rich textures, and enduring bespoke finishes that stand the test of time and age gracefully.'
    },
    {
      title: homeAbout?.item3?.title || 'Seamless Execution',
      desc: homeAbout?.item3?.desc || 'From concept blueprints and material curation to site coordination and final staging reveal, we handle every detail with absolute precision.'
    }
  ];

  return (
    <section id="about" className="relative overflow-hidden bg-[#FCFAF6] py-28 lg:py-36 selection:bg-[#C1FF72] selection:text-[#0A0A0A]">
      {/* Structural visual design lines */}
      <div className="absolute left-[5%] top-0 w-px h-full bg-[#0A0A0A]/5 pointer-events-none z-0"></div>
      
      <div className="relative z-10 mx-auto w-full max-w-[90rem] px-8">
        <div className="flex flex-col lg:flex-row gap-20 lg:gap-28 items-center">

          {/* Left Column: Image Section with Multi-layered Frames */}
          <div className="w-full lg:w-1/2 relative group">
            {/* Elegant backdrop frames - thin neutral offsets */}
            <div className="absolute -inset-4 border border-[#0A0A0A]/10 rounded-[2.5rem] transform -rotate-3 transition-transform duration-700 group-hover:rotate-0"></div>
            <div className="absolute -inset-2 border border-[#0A0A0A]/5 rounded-[2.5rem] transform rotate-1 z-0"></div>

            <div className="relative aspect-[3/4] overflow-hidden rounded-[2.5rem] border-4 border-[#FCFAF6] z-10 shadow-2xl">
              <img
                src={doctorImage}
                alt={doctor.name || 'Lead Designer'}
                className="w-full h-full object-cover transition-transform duration-[1200ms] group-hover:scale-105"
              />
              {/* Overlay with subtle styling branding */}
              <div className="absolute inset-0 bg-[#0A0A0A]/10 transition-colors duration-700 group-hover:bg-[#0A0A0A]/5"></div>

              <div className="absolute bottom-6 left-6 right-6 bg-[#FCFAF6]/95 backdrop-blur-md p-6 rounded-[1.5rem] shadow-xl border border-[#0A0A0A]/5 transform translate-y-2 opacity-95 transition-all duration-500 group-hover:translate-y-0">
                <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#0A0A0A]/50 mb-1">Lead Creative Partner</p>
                <h3 className="font-serif text-lg md:text-xl font-semibold text-[#0A0A0A] tracking-wide">{doctor.name || 'Principal Designer'}</h3>
                <p className="text-[13px] font-medium text-[#0A0A0A]/60 mt-0.5">{doctor.experience || 'Crafting Spaces for 10+ Years'}</p>
              </div>
            </div>
          </div>

          {/* Right Column: Copy-refined Editorial Section */}
          <div className="w-full lg:w-1/2 space-y-12 text-left z-10">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-3">
                <div className="w-8 h-px bg-[#0A0A0A]"></div>
                <span className="text-[11px] font-bold tracking-[0.25em] uppercase text-[#0A0A0A]/70">Our Narrative</span>
              </div>

              <h2 className="font-serif text-5xl lg:text-7xl font-light tracking-tight leading-[1.05] text-[#0A0A0A]">
                Crafting Spaces <br />
                <span className="italic font-normal text-[#0A0A0A]/60">with Character</span>
                <span className="text-[#C1FF72]">.</span>
              </h2>

              <p className="text-base md:text-lg text-[#0A0A0A]/70 font-normal leading-relaxed border-l-2 border-[#0A0A0A]/15 pl-6">
                {cleanDesc}
              </p>
            </div>

            {/* List with custom styling trigger hover states */}
            <div className="space-y-8 pl-4 border-l border-[#0A0A0A]/5 transition-colors">
              {items.map((disc, idx) => (
                <div key={idx} className="relative group/item pl-6 py-1 hover:translate-x-1 transition-transform duration-300">
                  <div className="absolute -left-[21px] top-2.5 w-1.5 h-1.5 rounded-full bg-[#0A0A0A]/10 group-hover/item:bg-[#C1FF72] transition-colors border border-[#FCFAF6]"></div>
                  <h4 className="text-base font-bold text-[#0A0A0A] mb-1.5 flex items-center gap-2">
                    <span>{disc.title}</span>
                  </h4>
                  <p className="text-[15px] font-normal leading-relaxed text-[#0A0A0A]/70 max-w-md">{disc.desc}</p>
                </div>
              ))}
            </div>

            <Link
              href={`${basePath}/about`}
              className="group inline-flex items-center gap-4 text-[#0A0A0A] font-bold tracking-[0.15em] uppercase text-[11px] hover:text-[#0A0A0A]/70 transition-colors"
            >
              <span className="border-b border-[#0A0A0A]/20 hover:border-[#0A0A0A] pb-1 transition-colors">Discover Our Story</span>
              <span className="w-9 h-9 rounded-full border border-[#0A0A0A] group-hover:bg-[#C1FF72] group-hover:border-[#C1FF72] flex items-center justify-center transition-all duration-300">
                <ChevronRight className="w-3.5 h-3.5 text-[#0A0A0A]" />
              </span>
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
}
