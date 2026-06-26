'use client';

import Image from 'next/image';
import { Sofa, ChefHat, BedDouble } from 'lucide-react';

export default function PropertiesSection() {
  const projects = [
    {
      title: 'Luxury Penthouse Living',
      location: 'Marine Drive, Downtown',
      price: 'Completed 2023',
      living: 1,
      dining: 1,
      bedrooms: 3,
      image: 'https://images.unsplash.com/photo-1600210491892-03d54c0aaf87?auto=format&fit=crop&q=80&w=800'
    },
    {
      title: 'Modern Loft Kitchen',
      location: 'Arts District, Westside',
      price: 'Completed 2024',
      living: 1,
      dining: 1,
      bedrooms: 2,
      image: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&q=80&w=800'
    },
    {
      title: 'Minimalist Master Suite',
      location: 'Suburban Retreat',
      price: 'Completed 2023',
      living: 1,
      dining: 0,
      bedrooms: 1,
      image: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&q=80&w=800'
    },
    {
      title: 'Explore Portfolio',
      isExplore: true,
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=800'
    }
  ];

  return (
    <section className="px-4 md:px-8 py-16 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-end mb-12">
        <div className="max-w-md">
          <h2 className="text-4xl md:text-5xl font-bold text-[#1A1D27] leading-tight mb-4">
            Discover Our Recent<br />Projects
          </h2>
        </div>
        <div className="max-w-md text-sm text-gray-500 pb-2">
          Browse through our curated portfolio of residential and commercial interiors. Each project is a testament to our commitment to quality and style.
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((proj, idx) => (
          <div 
            key={idx} 
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
              <div className="absolute inset-0 flex items-center justify-center bg-[#2b347b]/40 mix-blend-multiply">
                 <div className="z-30 bg-[#2b347b] w-28 h-28 rounded-full flex items-center justify-center text-white border-4 border-white shadow-xl cursor-pointer hover:scale-110 transition absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <span className="text-sm font-semibold tracking-widest uppercase rotate-45 text-center px-2">Portfolio</span>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
