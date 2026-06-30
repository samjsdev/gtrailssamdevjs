'use client';

import Image from 'next/image';
import { Sofa, ChefHat, BedDouble, ArrowRight } from 'lucide-react';
import { useTemplateData } from './context/TemplateContext';

export default function PropertiesSection() {
  const { data } = useTemplateData();
  const projData = data?.home?.sections?.[3] || {};

  const mainHeading = projData.headings?.[0] || 'Discover Our Recent\nProjects';
  const mainText = projData.text?.[0] || 'Browse through our curated portfolio of residential and commercial interiors. Each project is a testament to our commitment to quality and style.';

  const defaultImages = [
    '/images/stock/b6986c5a.webp',
    '/images/stock/a7b4cc83.webp',
    '/images/stock/0d97766b.webp',
    '/images/stock/507b5184.webp'
  ];

  const getImg = (i: number) => data?.media?.recentProjects?.[i] || projData.image_sources?.[i] || defaultImages[i];

  const projects = [
    {
      title: projData.headings?.[1] || 'Luxury Penthouse Living',
      location: projData.text?.[1] || 'Marine Drive, Downtown',
      price: projData.text?.[2] || 'Completed 2023',
      living: 1,
      dining: 1,
      bedrooms: 3,
      image: getImg(0)
    },
    {
      title: projData.headings?.[2] || 'Modern Loft Kitchen',
      location: projData.text?.[3] || 'Arts District, Westside',
      price: projData.text?.[4] || 'Completed 2024',
      living: 1,
      dining: 1,
      bedrooms: 2,
      image: getImg(1)
    },
    {
      title: projData.headings?.[3] || 'Minimalist Master Suite',
      location: projData.text?.[5] || 'Suburban Retreat',
      price: projData.text?.[2] || 'Completed 2023',
      living: 1,
      dining: 0,
      bedrooms: 1,
      image: getImg(2)
    },
    {
      title: projData.text?.[6] || 'More Projects',
      isExplore: true,
      image: getImg(3)
    }
  ];

  return (
    <section className="px-4 md:px-8 py-16 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 md:gap-0 mb-12">
        <div className="max-w-md">
          <h2 data-gsap="reveal" className="text-4xl md:text-5xl font-bold text-[#1A1D27] leading-tight mb-4 whitespace-pre-line">
            {mainHeading}
          </h2>
        </div>
        <div data-gsap="reveal" className="max-w-md text-sm text-gray-500 pb-2">
          {mainText}
        </div>
      </div>

      <div data-gsap="stagger-container" className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((proj, idx) => (
          <div 
            key={idx} 
            data-gsap="stagger-item"
            className="group relative rounded-[40px] overflow-hidden h-[350px] shadow-sm hover:shadow-lg transition cursor-pointer"
          >
            {/* Background Image */}
            <Image 
              src={proj.image} 
              alt={proj.title || 'Project'} 
              fill 
              className="object-cover group-hover:scale-105 transition duration-700"
            />
            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition duration-500"></div>

            {!proj.isExplore ? (
              <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-sm p-5 rounded-3xl flex justify-between items-end shadow-md">
                <div>
                  <h3 className="font-bold text-[#1A1D27] text-lg mb-1">{proj.title}</h3>
                  <div className="text-gray-500 text-xs mb-3">
                    {proj.location}
                  </div>
                  <div className="text-[#2b347b] font-semibold text-sm">
                    {proj.price}
                  </div>
                </div>
                <div className="flex items-center gap-3 text-gray-400 text-sm">
                  <div className="flex items-center gap-1" title="Living Area">
                    <Sofa className="w-4 h-4" /> {proj.living}
                  </div>
                  <div className="flex items-center gap-1" title="Kitchen/Dining">
                    <ChefHat className="w-4 h-4" /> {proj.dining}
                  </div>
                  <div className="flex items-center gap-1" title="Bedrooms">
                    <BedDouble className="w-4 h-4" /> {proj.bedrooms}
                  </div>
                </div>
              </div>
            ) : (
              <>
                <div className="absolute inset-0 flex items-center justify-center bg-[#2b347b]/40 mix-blend-multiply"></div>
                <div className="absolute inset-0 flex items-center justify-center z-10">
                  <span className="bg-white text-[#1A1D27] px-8 py-4 rounded-full font-bold shadow-xl flex items-center gap-2 hover:scale-105 transition">
                    {proj.title} <ArrowRight className="w-5 h-5" />
                  </span>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
