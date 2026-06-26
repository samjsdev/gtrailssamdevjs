"use client";

import dynamic from 'next/dynamic';
import Hero from './components/Hero/Hero';
import LazySection from './components/LazySection';

// Standard imports for text-heavy sections (Better for SEO & Stability)
import AboutSection from './components/AboutSection/AboutSection';
import WhyChooseUs from './components/WhyChooseUs/WhyChooseUs';
import StatsGrid from './components/StatsGrid/StatsGrid';
import TestimonialsSection from './components/TestimonialsSection/TestimonialsSection';
import CTASection from './components/CTASection/CTASection';

// Only Lazy Load the HEAVY visual components (3D, Video, Carousel)
const TreatmentShowcase = dynamic(
  () => import('./components/TreatmentShowcase/TreatmentShowcase'),
  { 
    ssr: false,
    loading: () => <div className="h-[650px] md:h-[850px] w-full bg-gray-50 animate-pulse rounded-3xl" />
  }
);

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
      
      {/* Text sections load normally to prevent "blank site" feel */}
      <AboutSection data={data} />
      
      {/* Heavy sections mount only when close to viewport */}
      <LazySection minHeight="800px" threshold={0.05} rootMargin="0px 0px 250px 0px">
        <TreatmentShowcase data={data} />
      </LazySection>

      <LazySection minHeight="700px" threshold={0.05} rootMargin="0px 0px 250px 0px">
        <HighlightsCarousel data={data} />
      </LazySection>
      <WhyChooseUs data={data} />
      <StatsGrid data={data} />
      <TestimonialsSection data={data} />
    </div>
  );
}
