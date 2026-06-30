'use client';

import { useTemplateData } from './context/TemplateContext';

export default function PhilosophySection({ sourcePage = 'about', sectionIndex = 3 }: { sourcePage?: 'about' | 'services', sectionIndex?: number }) {
  const { data } = useTemplateData();
  const philData = data?.[sourcePage]?.sections?.[sectionIndex] || {};

  const mainHeading = philData.headings?.[0] || 'Our Design Philosophy';
  const mainText = philData.text?.[0] || 'A proven, seamless approach to transforming your vision into reality.';

  const steps = [
    { num: philData.text?.[1] || '01', title: philData.headings?.[1] || 'Listen & Understand', desc: philData.text?.[2] || 'We begin by deeply understanding your lifestyle, preferences, and vision to ensure the foundation of our design aligns perfectly with your needs.' },
    { num: philData.text?.[3] || '02', title: philData.headings?.[2] || 'Conceptualize', desc: philData.text?.[4] || 'Our creative team translates your vision into detailed concepts, mood boards, and layouts that bring the envisioned space to life before execution.' },
    { num: philData.text?.[5] || '03', title: philData.headings?.[3] || 'Execute & Deliver', desc: philData.text?.[6] || 'With meticulous attention to detail, we manage the entire execution process, ensuring a seamless journey from the blueprint to the final reveal.' }
  ];
  return (
    <section className="bg-[#1A1D27] py-32 px-4 md:px-8 relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#2b347b]/20 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#2b347b]/20 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10 text-center">
        <h2 data-gsap="reveal" className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">{mainHeading}</h2>
        <p data-gsap="reveal" className="text-white/60 max-w-2xl mx-auto mb-20 text-lg font-light">{mainText}</p>
        
        <div data-gsap="stagger-container" className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Step 1 */}
          <div data-gsap="stagger-item" className="relative p-10 rounded-[32px] bg-white/5 border border-white/10 backdrop-blur-md shadow-2xl hover:bg-white/10 transition-all duration-500 hover:-translate-y-3 group text-left overflow-hidden">
            <div className="absolute -right-4 -top-8 text-[150px] font-bold text-white/5 select-none transition-transform duration-500 group-hover:scale-110">{steps[0].num}</div>
            <div className="relative z-10">
              <div className="w-12 h-12 rounded-2xl bg-[#2b347b] text-white flex items-center justify-center text-xl font-bold mb-8 shadow-lg">1</div>
              <h3 className="text-2xl font-bold mb-4 text-white">{steps[0].title}</h3>
              <p className="text-white/70 text-sm leading-relaxed font-light">
                {steps[0].desc}
              </p>
            </div>
          </div>
          
          {/* Step 2 */}
          <div data-gsap="stagger-item" className="relative p-10 rounded-[32px] bg-white/5 border border-white/10 backdrop-blur-md shadow-2xl hover:bg-white/10 transition-all duration-500 hover:-translate-y-3 group text-left overflow-hidden md:mt-12">
            <div className="absolute -right-4 -top-8 text-[150px] font-bold text-white/5 select-none transition-transform duration-500 group-hover:scale-110">{steps[1].num}</div>
            <div className="relative z-10">
              <div className="w-12 h-12 rounded-2xl bg-[#2b347b] text-white flex items-center justify-center text-xl font-bold mb-8 shadow-lg">2</div>
              <h3 className="text-2xl font-bold mb-4 text-white">{steps[1].title}</h3>
              <p className="text-white/70 text-sm leading-relaxed font-light">
                {steps[1].desc}
              </p>
            </div>
          </div>
          
          {/* Step 3 */}
          <div data-gsap="stagger-item" className="relative p-10 rounded-[32px] bg-white/5 border border-white/10 backdrop-blur-md shadow-2xl hover:bg-white/10 transition-all duration-500 hover:-translate-y-3 group text-left overflow-hidden md:mt-24">
            <div className="absolute -right-4 -top-8 text-[150px] font-bold text-white/5 select-none transition-transform duration-500 group-hover:scale-110">{steps[2].num}</div>
            <div className="relative z-10">
              <div className="w-12 h-12 rounded-2xl bg-[#2b347b] text-white flex items-center justify-center text-xl font-bold mb-8 shadow-lg">3</div>
              <h3 className="text-2xl font-bold mb-4 text-white">{steps[2].title}</h3>
              <p className="text-white/70 text-sm leading-relaxed font-light">
                {steps[2].desc}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
