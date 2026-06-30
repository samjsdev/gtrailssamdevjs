'use client';

import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

import { useTemplateData } from './context/TemplateContext';

export default function TeamSection({ doctor, media }: { doctor?: any; media?: any } = {}) {
  const { data } = useTemplateData();
  const highlightData = data?.home?.sections?.[5] || {};

  const mainHeading = highlightData.headings?.[0] || 'Our Highlight\nDesigns';
  const mainText = highlightData.text?.[0] || 'Explore our most stunning interior design projects, showcasing our versatility and attention to detail across various styles.';

  const defaultImages = [
    'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=2000&q=80',
    'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=2000&q=80',
    'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=2000&q=80',
    'https://images.unsplash.com/photo-1542889601-399c4f3a8402?auto=format&fit=crop&w=2000&q=80'
  ];

  const getImg = (i: number) => data?.media?.highlightDesigns?.[i] || highlightData.image_sources?.[i] || defaultImages[i];

  const highlights = [
    { title: highlightData.headings?.[1] || 'Modern Living', category: highlightData.text?.[1] || 'Residential', image: getImg(0) },
    { title: highlightData.headings?.[2] || 'Classic Elegance', category: highlightData.text?.[2] || 'Luxury', image: getImg(1) },
    { title: highlightData.headings?.[3] || 'Bohemian Chic', category: highlightData.text?.[3] || 'Studio', image: getImg(2) },
    { title: highlightData.headings?.[4] || 'Industrial Space', category: highlightData.text?.[4] || 'Commercial', image: getImg(3) },
  ];

  return (
    <section className="px-4 md:px-8 py-20 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-end mb-12">
        <div className="max-w-md">
          <h2 data-gsap="reveal" className="text-4xl md:text-5xl font-bold text-[#1A1D27] leading-tight mb-4 whitespace-pre-line">
            {mainHeading}
          </h2>
        </div>
        <div data-gsap="reveal" className="max-w-md text-sm text-gray-500 pb-2">
          {mainText}
        </div>
      </div>

      <div data-gsap="stagger-container" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {highlights.map((highlight, idx) => (
          <div key={idx} data-gsap="stagger-item" className="group relative rounded-3xl overflow-hidden cursor-pointer">
            <div className="w-full aspect-[3/4] relative">
              <Image 
                src={highlight.image} 
                alt={highlight.title} 
                fill 
                className="object-cover transition duration-500 group-hover:scale-105"
              />
              {/* Gradient overlay for text legibility */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#1A1D27]/80 via-[#1A1D27]/20 to-transparent"></div>
            </div>
            
            <div className="absolute bottom-0 left-0 right-0 p-6 flex justify-between items-end transform translate-y-2 group-hover:translate-y-0 transition-transform">
              <div>
                <h3 className="text-white font-bold text-lg">{highlight.title}</h3>
                <p className="text-gray-300 text-sm">{highlight.category}</p>
              </div>
              
              <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                <button className="bg-[#2b347b] hover:bg-[#1a2155] text-white p-2 rounded-full transition">
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
