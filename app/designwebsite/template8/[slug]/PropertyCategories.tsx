'use client';

import Image from 'next/image';

const categories = [
  {
    title: 'Modern Minimalist',
    image: '/images/stock/d6c16cd8.webp',
  },
  {
    title: 'Classic Elegance',
    image: '/images/stock/a7b4cc83.webp',
  },
  {
    title: 'Bohemian Chic',
    image: '/images/stock/8ce16a71.webp',
  },
  {
    title: 'Industrial Urban',
    image: '/images/stock/de20674b.webp',
  }
];

export default function PropertyCategories() {
  return (
    <section className="px-4 md:px-8 max-w-7xl mx-auto relative z-20 -mt-16 mb-24">
      <div data-gsap="stagger-container" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {categories.map((cat, idx) => (
          <div 
            key={idx} 
            data-gsap="stagger-item"
            className="bg-white rounded-3xl p-3 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition flex flex-col items-center group cursor-pointer"
          >
            <div className="w-full h-32 relative rounded-2xl overflow-hidden mb-4">
              <Image 
                src={cat.image} 
                alt={cat.title} 
                fill 
                className="object-cover group-hover:scale-105 transition duration-500"
              />
            </div>
            <h3 className="text-[#1A1D27] font-semibold text-sm mb-2">{cat.title}</h3>
          </div>
        ))}
      </div>
    </section>
  );
}
