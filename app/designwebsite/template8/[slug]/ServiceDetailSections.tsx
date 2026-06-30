'use client';

import Image from 'next/image';
import { 
  Sofa, 
  Ruler, 
  Palette, 
  Home,
  Building2,
  Lightbulb
} from 'lucide-react';
import { useTemplateData } from './context/TemplateContext';

export default function ServiceDetailSections() {
  const { data } = useTemplateData();
  const detailData = data?.services?.sections?.[1] || {};

  const defaultImages = [
    '/images/stock/9e00b08a.webp',
    '/images/stock/d2a373a2.webp',
    '/images/stock/aefc4b99.webp',
    '/images/stock/342f7398.webp',
    '/images/stock/7401dc43.webp',
    '/images/stock/22a7ca48.webp'
  ];

  const getImg = (i: number) => data?.media?.servicesList?.[i] || detailData.image_sources?.[i] || defaultImages[i];

  const services = [
    {
      icon: <Home className="w-10 h-10" />,
      title: detailData.headings?.[0] || 'Residential Design',
      desc: detailData.text?.[0] || 'Complete interior design solutions for homes, creating warm, personalized living spaces. We focus on transforming every room—from the grand foyer to the private bedroom sanctuary—into a cohesive narrative that reflects your unique lifestyle.',
      image: getImg(0)
    },
    {
      icon: <Building2 className="w-10 h-10" />,
      title: detailData.headings?.[1] || 'Commercial Spaces',
      desc: detailData.text?.[1] || 'Functional and inspiring designs for offices, retail stores, and boutique environments. Our commercial designs balance striking aesthetics with operational efficiency, ensuring your physical space elevates your brand identity and enhances employee productivity.',
      image: getImg(1)
    },
    {
      icon: <Ruler className="w-10 h-10" />,
      title: detailData.headings?.[2] || 'Space Planning',
      desc: detailData.text?.[2] || 'Optimized floor plans that maximize flow, comfort, and functionality in any given area. We analyze structural constraints and traffic patterns to produce intelligent layouts that make spaces feel infinitely larger and vastly more intuitive to navigate.',
      image: getImg(2)
    },
    {
      icon: <Sofa className="w-10 h-10" />,
      title: detailData.headings?.[3] || 'Custom Furniture',
      desc: detailData.text?.[3] || 'Bespoke furniture design crafted perfectly for your space, aesthetic, and daily use. Collaborating with master craftsmen, we design and produce unique, heirloom-quality pieces—from expansive dining tables to precisely engineered built-in cabinetry.',
      image: getImg(3)
    },
    {
      icon: <Palette className="w-10 h-10" />,
      title: detailData.headings?.[4] || 'Material Selection',
      desc: detailData.text?.[4] || 'Curating the perfect palette of paints, wall coverings, sustainable woods, and fabrics. We guide you through our extensive library of premium, globally sourced materials to build a tactile foundation that defines the atmosphere of your space.',
      image: getImg(4)
    },
    {
      icon: <Lightbulb className="w-10 h-10" />,
      title: detailData.headings?.[5] || 'Styling & Decor',
      desc: detailData.text?.[5] || 'The final layer of polish—selecting art, lighting, and accessories to complete your vision. This crucial phase turns a beautiful house into a lived-in home through the careful placement of curated objects, ambient lighting, and rich textural layers.',
      image: getImg(5)
    }
  ];

  return (
    <section className="py-32 bg-white px-4 md:px-8 border-t border-gray-100">
      <div className="max-w-7xl mx-auto flex flex-col gap-24 md:gap-40">
        {services.map((svc, index) => {
          const isEven = index % 2 === 0;
          return (
            <div key={index} className={`flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-12 lg:gap-24 group`}>
              
              {/* Image Side */}
              <div data-gsap="reveal" className="w-full md:w-1/2 relative">
                <div className="relative w-full aspect-[4/3] rounded-[40px] overflow-hidden shadow-2xl z-10">
                  <Image 
                    src={svc.image} 
                    alt={svc.title} 
                    fill 
                    className="object-cover transition-transform duration-1000 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-[#2b347b]/10 mix-blend-multiply group-hover:bg-transparent transition duration-700"></div>
                </div>
                {/* Decorative Element */}
                <div className={`absolute z-0 w-full h-full border-2 border-[#2b347b]/10 rounded-[40px] top-6 ${isEven ? '-right-6' : '-left-6'} transition-all duration-700 group-hover:top-8 group-hover:${isEven ? '-right-8' : '-left-8'}`}></div>
              </div>

              {/* Content Side */}
              <div data-gsap="reveal" className="w-full md:w-1/2 flex flex-col items-start text-left md:px-8">
                <div className="w-20 h-20 rounded-3xl bg-[#f8f9fa] border border-gray-100 flex items-center justify-center text-[#2b347b] mb-8 shadow-sm group-hover:scale-110 transition-transform duration-500">
                  {svc.icon}
                </div>
                
                <h3 className="text-3xl md:text-5xl font-bold text-[#1A1D27] mb-6 tracking-tight leading-tight">
                  {svc.title}
                </h3>
                
                <p className="text-gray-500 text-lg leading-relaxed mb-8">
                  {svc.desc}
                </p>
                
                <div className="h-[2px] w-12 bg-[#2b347b] group-hover:w-24 transition-all duration-500"></div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
