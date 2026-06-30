import Image from 'next/image';
import { useTemplateData } from './context/TemplateContext';

export default function WorkCycleSection({ sourcePage = 'about', sectionIndex = 4 }: { sourcePage?: 'about' | 'services', sectionIndex?: number }) {
  const { data } = useTemplateData();
  const cycleData = data?.[sourcePage]?.sections?.[sectionIndex] || {};

  const mainSubHeading = cycleData.text?.[0] || 'Our Chronicle';
  const mainHeading = cycleData.headings?.[0] || 'The Work Cycle';

  const defaultImages = [
    '/images/stock/c093e1b3.webp',
    '/images/stock/d2cd7311.webp',
    '/images/stock/68b39046.webp',
    '/images/stock/ddc829e8.webp',
    '/images/stock/75c40d2b.webp',
    '/images/stock/463ea892.webp'
  ];

  const getImg = (i: number) => data?.media?.workCycle?.[i] || cycleData.image_sources?.[i] || defaultImages[i];

  const workCycle = [
    { title: cycleData.headings?.[1] || "Client Meeting", desc: cycleData.text?.[2] || "We begin by deeply understanding your vision, lifestyle, and the unique potential of your space.", img: getImg(0), phase: cycleData.text?.[1] || 'Phase 01' },
    { title: cycleData.headings?.[2] || "Concept Design", desc: cycleData.text?.[4] || "Translating ideas into comprehensive mood boards, spatial layouts, and photorealistic 3D renders.", img: getImg(1), phase: cycleData.text?.[3] || 'Phase 02' },
    { title: cycleData.headings?.[3] || "Visualize Design", desc: cycleData.text?.[6] || "Hand-selecting premium finishes, bespoke furnishings, and exquisite textures to elevate the design.", img: getImg(2), phase: cycleData.text?.[5] || 'Phase 03' },
    { title: cycleData.headings?.[4] || "Estimation & Agreement", desc: cycleData.text?.[8] || "Developing rigorous timelines, technical drawings, and resource allocations for flawless execution.", img: getImg(3), phase: cycleData.text?.[7] || 'Phase 04' },
    { title: cycleData.headings?.[5] || "Project Implementation", desc: cycleData.text?.[10] || "Our master craftsmen and project managers bring the vision to life with uncompromising precision.", img: getImg(4), phase: cycleData.text?.[9] || 'Phase 05' },
    { title: cycleData.headings?.[6] || "Completion & Handover", desc: cycleData.text?.[12] || "The final layer of polish—staging your space to perfection before welcoming you to your new sanctuary.", img: getImg(5), phase: cycleData.text?.[11] || 'Phase 06' },
  ];

  return (
    <section className="py-24 bg-[#f8f9fa] px-4 md:px-8 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 md:mb-24">
          <p data-gsap="reveal" className="text-sm font-bold uppercase tracking-[0.3em] text-[#2b347b] mb-4">{mainSubHeading}</p>
          <h2 data-gsap="reveal" className="text-4xl md:text-5xl font-light text-[#1A1D27] mb-8 tracking-tight">{mainHeading}</h2>
          <div data-gsap="reveal" className="w-24 h-[2px] bg-[#2b347b] mx-auto opacity-20"></div>
        </div>
        
        <div data-gsap="stagger-container" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-20 gap-x-12 mt-12">
          {workCycle.map((step, index) => (
            <div key={index} data-gsap="stagger-item" className="relative group flex flex-col">
              
              {/* Huge Background Number */}
              <div className="absolute -top-10 -left-6 text-[140px] font-bold text-[#1A1D27]/5 select-none leading-none z-0 transition-transform duration-700 group-hover:-translate-y-4">
                0{index + 1}
              </div>
              
              {/* Image */}
              <div className="relative z-10 w-full aspect-[4/3] overflow-hidden rounded-tr-[60px] rounded-bl-[60px] shadow-2xl transition-all duration-500 group-hover:shadow-3xl">
                <Image 
                  src={step.img} 
                  alt={step.title} 
                  fill 
                  className="object-cover transition-transform duration-1000 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-[#2b347b]/20 mix-blend-multiply group-hover:bg-transparent transition duration-700"></div>
              </div>
              
              {/* Floating Content Block */}
              <div className="relative z-20 px-6 -mt-16">
                <div className="bg-white/90 backdrop-blur-xl p-8 rounded-3xl shadow-lg border border-white group-hover:-translate-y-3 transition-transform duration-500">
                  <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#2b347b] mb-3 block">{step.phase}</span>
                  <h3 className="text-xl font-bold text-[#1A1D27] mb-3 leading-tight">{step.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">
                    {step.desc}
                  </p>
                  <div className="mt-6 h-[2px] w-12 bg-[#2b347b] transition-all duration-500 group-hover:w-24"></div>
                </div>
              </div>

            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
