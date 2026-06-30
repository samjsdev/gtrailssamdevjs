'use client';

import { useTemplateData } from '../context/TemplateContext';
import CTASection from '../CTASection';
import GalleryGrid from '../GalleryGrid';

export default function GalleryClient() {
  const { data } = useTemplateData();
  const galleryData = data?.gallery?.sections?.[0] || {};

  const heroHeading = galleryData.headings?.[0] || 'Our Gallery';
  const heroBadge = galleryData.text?.[0] || 'Portfolio';
  const heroDesc = galleryData.text?.[1] || 'A curated selection of our finest interior transformations, where luxury meets functionality.';

  return (
    <div className="w-full bg-white">
      {/* Header */}
      <section className="pt-32 pb-16 px-4 md:px-8 max-w-7xl mx-auto text-center">
        <p className="text-sm font-bold uppercase tracking-[0.3em] text-[#2b347b] mb-4">{heroBadge}</p>
        <h1 className="text-5xl md:text-6xl font-light text-[#1A1D27] mb-6 tracking-tight">{heroHeading}</h1>
        <p className="text-gray-500 text-lg max-w-2xl mx-auto leading-relaxed">
          {heroDesc}
        </p>
      </section>

      {/* Uniform Grid & Lightbox */}
      <section className="px-4 md:px-8 pb-32 max-w-[1400px] mx-auto">
        <GalleryGrid />
      </section>

      <CTASection sourcePage="gallery" sectionIndex={2} />
    </div>
  );
}
