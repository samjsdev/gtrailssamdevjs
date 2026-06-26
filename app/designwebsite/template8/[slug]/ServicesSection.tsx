'use client';

import { 
  Sofa, 
  Ruler, 
  Hammer, 
  Palette, 
  ArrowRight
} from 'lucide-react';

export default function ServicesSection() {
  const services = [
    {
      icon: <Sofa className="w-8 h-8" />,
      title: 'Custom Furniture Design',
      desc: 'Bespoke pieces crafted to fit your space perfectly and reflect your personal style.',
      bg: 'bg-[#2b347b]',
      text: 'text-white',
      iconColor: 'text-white'
    },
    {
      icon: <Ruler className="w-8 h-8" />,
      title: 'Space Planning & Layouts',
      desc: 'Optimized floor plans that maximize functionality, flow, and comfort in every room.',
      bg: 'bg-[#f0f2f6]',
      text: 'text-[#1A1D27]',
      iconColor: 'text-[#2b347b]'
    },
    {
      icon: <Hammer className="w-8 h-8" />,
      title: 'Turnkey Execution',
      desc: 'End-to-end project management from initial demolition to final walkthrough.',
      bg: 'bg-[#f0f2f6]',
      text: 'text-[#1A1D27]',
      iconColor: 'text-[#2b347b]'
    },
    {
      icon: <Palette className="w-8 h-8" />,
      title: 'Styling & Decor',
      desc: 'Curating the perfect accessories, art, and textiles to complete your interior vision.',
      bg: 'bg-[#f0f2f6]',
      text: 'text-[#1A1D27]',
      iconColor: 'text-[#2b347b]'
    }
  ];

  return (
    <section className="px-4 md:px-8 py-20 max-w-5xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold text-[#1A1D27] mb-4">Our Services</h2>
        <p className="text-gray-500 max-w-md mx-auto text-sm">
          Comprehensive interior design services ranging from subtle styling updates to complete turnkey renovations.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {services.map((svc, idx) => (
          <div 
            key={idx} 
            className={`${svc.bg} ${svc.text} p-8 rounded-[32px] flex items-start gap-6 transition hover:scale-[1.02] cursor-pointer shadow-sm`}
          >
            <div className={`${svc.iconColor}`}>
              {svc.icon}
            </div>
            <div>
              <h3 className="font-bold text-lg mb-2">{svc.title}</h3>
              <p className={`text-sm ${idx === 0 ? 'opacity-80' : 'text-gray-500'}`}>
                {svc.desc}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 flex justify-end">
        <button className="bg-[#2b347b] text-white px-8 py-3 rounded-full font-medium flex items-center gap-2 hover:bg-opacity-90 transition">
          Explore <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </section>
  );
}
