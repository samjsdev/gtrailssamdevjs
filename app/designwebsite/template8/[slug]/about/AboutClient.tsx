'use client';

import Image from 'next/image';
import AboutSection from '../AboutSection';
import TestimonialsSection from '../TestimonialsSection';
import CTASection from '../CTASection';
import PhilosophySection from '../PhilosophySection';
import WorkCycleSection from '../WorkCycleSection';
import { useTemplateData } from '../context/TemplateContext';

export default function AboutClient() {
  const { data } = useTemplateData();
  const { clinic, business, media, reviews } = data || {};
  const aboutData = data?.about?.sections?.[0] || {};

  const heroImage = data?.media?.aboutHero?.[0] || aboutData.image_sources?.[0] || media?.heroImage || '/images/stock/6dcb103c.webp';

  const heroHeading = aboutData.headings?.[0] || 'About Us';
  const heroText = aboutData.text?.[0] || business?.tagline || 'Crafting spaces that inspire and elevate everyday living.';

  const journeyData = data?.about?.sections?.[2] || {};
  
  const defaultTimeline = [
    { year: "2015", title: "Inception & Ethos", desc: "From a small boutique laboratory of carpenters to an award-winning turnkey architecture agency, our commitment to natural materials remains constant." },
    { year: "2018", title: "Sourcing & Joinery", desc: "Formed a proprietary material sourcing network, ensuring clean access to sustainable veneers and high-end carpenters." },
    { year: "2021", title: "Biophilic Sourcing", desc: "Committed to absolute biophilic integrity, implementing non-toxic coatings, certified organic linen layers, and natural clay plasters." },
    { year: "PRESENT", title: "Sought-After Residential Leader", desc: "Crafting customized high-end living spaces and boutique business environments nationwide, known for quiet warmth and tactile luxury." }
  ];

  const timeline = [
    { year: journeyData.text?.[2] || defaultTimeline[0].year, title: journeyData.headings?.[1] || defaultTimeline[0].title, desc: journeyData.text?.[3] || defaultTimeline[0].desc },
    { year: journeyData.text?.[4] || defaultTimeline[1].year, title: journeyData.headings?.[2] || defaultTimeline[1].title, desc: journeyData.text?.[5] || defaultTimeline[1].desc },
    { year: journeyData.text?.[6] || defaultTimeline[2].year, title: journeyData.headings?.[3] || defaultTimeline[2].title, desc: journeyData.text?.[7] || defaultTimeline[2].desc },
    { year: journeyData.text?.[8] || defaultTimeline[3].year, title: journeyData.headings?.[4] || defaultTimeline[3].title, desc: journeyData.text?.[9] || defaultTimeline[3].desc },
  ];

  const journeyTitle = journeyData.headings?.[0] || 'The Journey';
  const journeySubTitle = journeyData.text?.[0] || '— OUR CHRONICLE';
  const journeyDesc = journeyData.text?.[1] || defaultTimeline[0].desc;

  return (
    <div className="w-full">
      {/* About Hero */}
      <section className="relative w-full h-[500px] md:h-[600px] flex items-center justify-center overflow-hidden -mt-32 pt-32">
        <Image 
          src={heroImage} 
          alt={heroHeading} 
          fill 
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/60"></div>
        <div className="relative z-10 text-center px-4 md:px-12 py-10 md:py-16 backdrop-blur-md bg-white/10 border border-white/20 rounded-[40px] shadow-2xl max-w-3xl mx-4 transform transition hover:scale-[1.02] duration-500">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white tracking-tight">{heroHeading}</h1>
          <p className="text-lg md:text-2xl text-white/90 font-light max-w-2xl mx-auto leading-relaxed">
            {heroText}
          </p>
        </div>
      </section>

      {/* Main Content using existing AboutSection */}
      <div className="py-12 bg-white">
        <AboutSection sourcePage="about" />
      </div>

      {/* The Journey Timeline */}
      <section className="bg-white py-24 px-4 md:px-8 border-t border-gray-100">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-24">
            <p className="text-sm font-bold uppercase tracking-[0.3em] text-[#2b347b] mb-4">{journeySubTitle}</p>
            <h2 className="text-4xl md:text-5xl font-light text-[#1A1D27] mb-6 tracking-tight">{journeyTitle}</h2>
            <p className="text-gray-500 text-lg leading-relaxed max-w-2xl mx-auto">
              {journeyDesc}
            </p>
          </div>

          <div className="relative border-l-2 border-[#2b347b]/20 ml-4 md:ml-0 md:border-l-0">
            {/* Desktop Center Line */}
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-[2px] bg-[#2b347b]/20 -translate-x-1/2"></div>
            
            <div className="flex flex-col gap-16 md:gap-24">
              {timeline.map((item, index) => {
                const isEven = index % 2 === 0;
                return (
                  <div key={index} className={`relative flex flex-col md:flex-row items-start md:items-center ${isEven ? 'md:flex-row-reverse' : ''} group`}>
                    
                    {/* Timeline Node */}
                    <div className="absolute -left-[25px] md:left-1/2 top-0 md:top-1/2 w-12 h-12 bg-white border-4 border-[#2b347b] rounded-full transform md:-translate-x-1/2 md:-translate-y-1/2 flex items-center justify-center shadow-lg z-10 transition-transform duration-500 group-hover:scale-125">
                      <div className="w-3 h-3 bg-[#2b347b] rounded-full transition-colors duration-500 group-hover:bg-[#1A1D27]"></div>
                    </div>

                    {/* Content Box */}
                    <div className={`w-full md:w-1/2 pl-12 md:pl-0 ${isEven ? 'md:pr-16 text-left md:text-right' : 'md:pl-16 text-left'}`}>
                      <span className="text-[#2b347b] font-bold tracking-widest text-lg mb-2 block">{item.year}</span>
                      <h3 className="text-2xl font-bold text-[#1A1D27] mb-4">{item.title}</h3>
                      <p className="text-gray-500 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>

                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Our Process / Philosophy */}
      <PhilosophySection sourcePage="about" sectionIndex={3} />

      {/* Work Cycle */}
      <div className="border-t border-gray-100">
        <WorkCycleSection sourcePage="about" sectionIndex={4} />
      </div>

      {/* Reviews & CTA */}
      <TestimonialsSection sourcePage="about" sectionIndex={5} />
      <CTASection clinic={clinic} sourcePage="about" sectionIndex={6} />
    </div>
  );
}
