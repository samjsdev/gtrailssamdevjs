"use client";

import HeroSection from './HeroSection';
import AboutSection from './AboutSection';
import ServicesSection from './ServicesSection';
import PropertiesSection from './PropertiesSection';
import TestimonialsSection from './TestimonialsSection';
import TeamSection from './TeamSection';
import CTASection from './CTASection';
import { useTemplateData } from './context/TemplateContext';

export default function HomeClient() {
  const { data } = useTemplateData();
  const { clinic, business, media, doctor, reviews } = data || {};

  return (
    <>
      <HeroSection clinic={clinic} media={media} />
      <AboutSection business={business} media={media} />
      <ServicesSection />
      <PropertiesSection />
      <TestimonialsSection reviews={reviews} />
      <TeamSection doctor={doctor} media={media} />
      <CTASection clinic={clinic} />
    </>
  );
}
