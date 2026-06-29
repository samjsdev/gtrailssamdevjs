'use client';

import { 
  Sofa, 
  Ruler, 
  Palette, 
  ArrowRight,
  Home,
  Building2,
  Lightbulb
} from 'lucide-react';

import Image from 'next/image';
import { useTemplateData } from './context/TemplateContext';

export default function ServicesSection() {
  const { data } = useTemplateData();
  const svcData = data?.home?.sections?.[2] || {};

  const mainHeading = svcData.headings?.[0] || 'Our Core Services';
  const mainText = svcData.text?.[0] || 'A comprehensive suite of interior design solutions, from foundational planning to the final decorative touches.';
  const btnText = svcData.text?.[7] || 'Explore Portfolio';

  const defaultImages = [
    'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&q=80&w=800'
  ];

  const getImg = (i: number) => data?.media?.coreServices?.[i] || svcData.image_sources?.[i] || defaultImages[i];

  const services = [
    {
      icon: <Home className="w-8 h-8" />,
      title: svcData.headings?.[1] || 'Residential Design',
      desc: svcData.text?.[1] || 'Complete interior design solutions for homes, creating warm, personalized living spaces.',
      bg: 'bg-[#2b347b]',
      text: 'text-white',
      iconColor: 'text-white',
      image: getImg(0)
    },
    {
      icon: <Building2 className="w-8 h-8" />,
      title: svcData.headings?.[2] || 'Commercial Spaces',
      desc: svcData.text?.[2] || 'Functional and inspiring designs for offices, retail stores, and boutique environments.',
      bg: 'bg-[#f0f2f6]',
      text: 'text-[#1A1D27]',
      iconColor: 'text-[#2b347b]',
      image: getImg(1)
    },
    {
      icon: <Ruler className="w-8 h-8" />,
      title: svcData.headings?.[3] || 'Space Planning',
      desc: svcData.text?.[3] || 'Optimized floor plans that maximize flow, comfort, and functionality in any given area.',
      bg: 'bg-[#f0f2f6]',
      text: 'text-[#1A1D27]',
      iconColor: 'text-[#2b347b]',
      image: getImg(2)
    },
    {
      icon: <Sofa className="w-8 h-8" />,
      title: svcData.headings?.[4] || 'Custom Furniture',
      desc: svcData.text?.[4] || 'Bespoke furniture design crafted perfectly for your space, aesthetic, and daily use.',
      bg: 'bg-[#f0f2f6]',
      text: 'text-[#1A1D27]',
      iconColor: 'text-[#2b347b]',
      image: getImg(3)
    },
    {
      icon: <Palette className="w-8 h-8" />,
      title: svcData.headings?.[5] || 'Material Selection',
      desc: svcData.text?.[5] || 'Curating the perfect palette of paints, wall coverings, sustainable woods, and fabrics.',
      bg: 'bg-[#f0f2f6]',
      text: 'text-[#1A1D27]',
      iconColor: 'text-[#2b347b]',
      image: getImg(4)
    },
    {
      icon: <Lightbulb className="w-8 h-8" />,
      title: svcData.headings?.[6] || 'Styling & Decor',
      desc: svcData.text?.[6] || 'The final layer of polish—selecting art, lighting, and accessories to complete your vision.',
      bg: 'bg-[#f0f2f6]',
      text: 'text-[#1A1D27]',
      iconColor: 'text-[#2b347b]',
      image: getImg(5)
    }
  ];

  return (
    <section className="px-4 md:px-8 py-20 max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <h2 data-gsap="reveal" className="text-4xl font-bold text-[#1A1D27] mb-4">{mainHeading}</h2>
        <p data-gsap="reveal" className="text-gray-500 max-w-md mx-auto text-sm">
          {mainText}
        </p>
      </div>

      <div data-gsap="stagger-container" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((svc, idx) => (
          <div 
            key={idx} 
            data-gsap="stagger-item"
            className={`${svc.bg} ${svc.text} rounded-[32px] overflow-hidden flex flex-col transition-all duration-300 hover:-translate-y-2 hover:shadow-xl cursor-pointer`}
          >
            <div className="relative w-full h-48 md:h-56">
              <Image src={svc.image} alt={svc.title} fill className="object-cover" />
            </div>
            <div className="p-8 flex items-start gap-6">
              <div className={`${svc.iconColor}`}>
                {svc.icon}
              </div>
              <div>
                <h3 className="font-bold text-lg mb-2">{svc.title}</h3>
                <p className={`text-sm ${idx === 0 ? 'opacity-80' : 'text-gray-500'} leading-relaxed`}>
                  {svc.desc}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 flex justify-center lg:justify-end">
        <button className="bg-[#2b347b] text-white px-8 py-3 rounded-full font-medium flex items-center gap-2 hover:bg-opacity-90 transition shadow-md hover:shadow-lg">
          {btnText} <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </section>
  );
}
