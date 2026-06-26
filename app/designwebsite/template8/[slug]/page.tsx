import { readSourceConfig } from '@/lib/dataBuilder';
import { notFound } from 'next/navigation';
import HeroSection from './HeroSection';
import PropertyCategories from './PropertyCategories';
import AboutSection from './AboutSection';
import ServicesSection from './ServicesSection';
import PropertiesSection from './PropertiesSection';
import TestimonialsSection from './TestimonialsSection';
import TeamSection from './TeamSection';
import CTASection from './CTASection';

type PageProps = {
  params: Promise<{ slug: string }>;
};

export default async function Template8Home({ params }: PageProps) {
  const resolvedParams = await params;
  const { slug } = resolvedParams;

  const data = await readSourceConfig(slug, 'template8');
  if (!data) return notFound();

  const { clinic, business, media, doctor, reviews } = data;

  return (
    <>
      <HeroSection clinic={clinic} media={media} />
      <PropertyCategories />
      <AboutSection business={business} media={media} />
      <ServicesSection />
      <PropertiesSection />
      <TestimonialsSection reviews={reviews} />
      <TeamSection doctor={doctor} media={media} />
      <CTASection clinic={clinic} />
    </>
  );
}
