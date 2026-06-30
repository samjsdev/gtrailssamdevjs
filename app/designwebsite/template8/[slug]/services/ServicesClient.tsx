'use client';

import Image from 'next/image';
import CTASection from '../CTASection';
import PhilosophySection from '../PhilosophySection';
import WorkCycleSection from '../WorkCycleSection';
import ServiceDetailSections from '../ServiceDetailSections';
import { useTemplateData } from '../context/TemplateContext';

export default function ServicesClient() {
  const { data } = useTemplateData();
  const { clinic } = data || {};
  
  const svcData = data?.services?.sections?.[0] || {};
  const heroImage = data?.media?.servicesHero?.[0] || svcData.image_sources?.[0] || 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&q=80&w=2560';

  const heroSub = svcData.text?.[0] || 'Expertise';
  const heroHeading = svcData.headings?.[0] || 'Our Services';
  const heroDesc = svcData.text?.[1] || 'Tailored interior design solutions crafted to elevate your living and working environments.';

  const partnerData = data?.services?.sections?.[4] || {};
  const partnerHeading = partnerData.headings?.[0] || 'Why Partner With Us';

  const benefits = [
    { title: partnerData.headings?.[1] || 'Bespoke Designs', desc: partnerData.text?.[0] || 'Every project is uniquely tailored to your personal aesthetic and functional needs.', icon: '✨' },
    { title: partnerData.headings?.[2] || 'Sustainable Materials', desc: partnerData.text?.[1] || 'We prioritize eco-friendly, ethically sourced materials without compromising luxury.', icon: '🌿' },
    { title: partnerData.headings?.[3] || 'On-Time Delivery', desc: partnerData.text?.[2] || 'Rigorous project management ensures your sanctuary is ready exactly when promised.', icon: '⏱️' },
    { title: partnerData.headings?.[4] || 'Award-Winning', desc: partnerData.text?.[3] || 'Recognized globally for our meticulous attention to detail and innovative concepts.', icon: '🏆' },
  ];

  return (
    <div className="w-full bg-[#f8f9fa]">
      {/* Services Hero */}
      <section className="relative w-full h-[50vh] min-h-[400px] md:h-[500px] flex items-center justify-center overflow-hidden -mt-[80px] md:-mt-[104px] pt-[80px] md:pt-[104px]">
        <Image 
          src={heroImage} 
          alt={heroHeading} 
          fill 
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60"></div>
        <div className="relative z-10 text-center px-6 md:px-12 py-8 md:py-16 backdrop-blur-sm bg-white/5 border border-white/10 rounded-[32px] md:rounded-[40px] shadow-2xl max-w-3xl w-[calc(100%-2rem)] md:w-auto mx-auto mt-4 md:mt-0">
          <p className="text-xs md:text-sm font-bold uppercase tracking-[0.3em] text-white/80 mb-3 md:mb-4">{heroSub}</p>
          <h1 className="text-4xl md:text-6xl font-bold mb-4 md:mb-6 text-white tracking-tight leading-tight">{heroHeading}</h1>
          <p className="text-base md:text-xl text-white/90 font-light max-w-2xl mx-auto leading-relaxed">
            {heroDesc}
          </p>
        </div>
      </section>

      {/* Detailed Mini Sections */}
      <ServiceDetailSections />

      <PhilosophySection sourcePage="services" sectionIndex={2} />
      
      <div className="border-t border-gray-100">
        <WorkCycleSection sourcePage="services" sectionIndex={3} />
      </div>

      {/* Why Choose Us */}
      <section className="py-24 bg-white px-4 md:px-8 border-t border-gray-100">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-light text-[#1A1D27] mb-6">{partnerHeading}</h2>
            <div className="w-16 h-1 bg-[#2b347b] mx-auto opacity-30"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((b, i) => (
              <div key={i} className="p-8 rounded-3xl bg-[#f8f9fa] border border-gray-100 hover:shadow-lg transition duration-500 hover:-translate-y-2">
                <div className="w-12 h-12 bg-[#2b347b]/10 rounded-2xl flex items-center justify-center mb-6 text-2xl">{b.icon}</div>
                <h3 className="text-xl font-bold text-[#1A1D27] mb-3">{b.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <CTASection clinic={clinic} sourcePage="services" sectionIndex={5} />
    </div>
  );
}
