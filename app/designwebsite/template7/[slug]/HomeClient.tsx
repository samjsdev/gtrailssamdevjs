"use client";

import dynamic from 'next/dynamic';
import Hero from './components/Hero/Hero';
import LazySection from './components/LazySection';

// Standard imports for text-heavy and interactive sections
import AboutSection from './components/AboutSection/AboutSection';
import TreatmentShowcase from './components/TreatmentShowcase/TreatmentShowcase';
import WhyChooseUs from './components/WhyChooseUs/WhyChooseUs';
import StatsGrid from './components/StatsGrid/StatsGrid';
import TestimonialsSection from './components/TestimonialsSection/TestimonialsSection';
import CTASection from './components/CTASection/CTASection';

const HighlightsCarousel = dynamic(
  () => import('./components/HighlightsCarousel/HighlightsCarousel'),
  { 
    ssr: false,
    loading: () => <div className="h-[600px] md:h-[800px] w-full bg-gray-50 animate-pulse" />
  }
);

export default function Home({ data }: { data?: any }) {
  return (
    <div className="min-h-screen">
      <Hero />
      
      {/* About and Services render with full SSR for immediate stability */}
      <AboutSection data={data} />
      <TreatmentShowcase data={data} />

      <LazySection minHeight="700px" threshold={0.05} rootMargin="0px 0px 250px 0px">
        <HighlightsCarousel data={data} />
      </LazySection>
      <WhyChooseUs data={data} />
      <StatsGrid data={data} />
      <CTASection data={data} />
    </div>
  );
}
