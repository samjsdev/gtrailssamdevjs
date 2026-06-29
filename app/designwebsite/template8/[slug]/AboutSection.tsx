'use client';

import Image from 'next/image';

import { useTemplateData } from './context/TemplateContext';

export default function AboutSection({ sourcePage = 'home', business, media }: { sourcePage?: 'home' | 'about', business?: any, media?: any }) {
  const { data } = useTemplateData();
  const aboutData = data?.[sourcePage]?.sections?.[1] || {};

  const defaultImage = 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=2000';
  const customImage = data?.media?.aboutStats?.[0] || aboutData.image_sources?.[0] || defaultImage;

  const mainHeading = aboutData.headings?.[0] || "Your Trusted Interior Design Partners";
  const mainText = aboutData.text?.[0] || "We specialize in crafting beautiful, functional spaces tailored precisely to your lifestyle. Let us bring your vision to life through thoughtful design and seamless execution.";

  const stats = [
    { value: aboutData.headings?.[1] || '30+', label: aboutData.text?.[1] || 'Satisfied Customer', bg: 'bg-white', text: 'text-[#1A1D27]' },
    { value: aboutData.headings?.[2] || '5k+', label: aboutData.text?.[2] || 'Award wining', bg: 'bg-[#2b347b]', text: 'text-white' },
    { value: aboutData.headings?.[3] || '07+', label: aboutData.text?.[3] || 'Years of Experience', bg: 'bg-[#f0f2f5]', text: 'text-[#1A1D27]' },
    { value: aboutData.headings?.[4] || '33+', label: aboutData.text?.[4] || 'Projects Delivered', bg: 'bg-white', text: 'text-[#1A1D27]' },
  ];

  return (
    <section className="px-4 md:px-8 py-16 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        
        {/* Left Column - Stats */}
        <div>
          <h2 data-gsap="reveal" className="text-4xl md:text-5xl font-bold text-[#1A1D27] leading-tight mb-4 whitespace-pre-line">
            {mainHeading}
          </h2>
          <p data-gsap="reveal" className="text-gray-500 mb-12 max-w-md text-sm leading-relaxed">
            {mainText}
          </p>

          <div data-gsap="stagger-container" className="grid grid-cols-2 gap-4">
            {stats.map((stat, idx) => (
              <div 
                key={idx} 
                data-gsap="stagger-item"
                className={`${stat.bg} ${stat.text} p-6 rounded-3xl flex flex-col justify-center shadow-sm ${idx === 3 || idx === 0 ? 'border border-gray-100' : ''} aspect-square md:aspect-auto md:h-40`}
              >
                <h3 className="text-4xl font-bold mb-2">{stat.value}</h3>
                <p className="text-sm opacity-80">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column - Single Image */}
        <div data-gsap="reveal" className="relative h-[500px] w-full rounded-3xl overflow-hidden shadow-lg">
          <Image src={customImage} alt="Interior Design Setup" fill className="object-cover" />
        </div>

      </div>
    </section>
  );
}
