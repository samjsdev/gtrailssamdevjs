'use client';

import { ArrowRight } from 'lucide-react';
import { useTemplateData } from './context/TemplateContext';

export default function CTASection({ clinic, sourcePage = 'home', sectionIndex = 6 }: { clinic?: any, sourcePage?: 'home' | 'about' | 'services', sectionIndex?: number }) {
  const { data } = useTemplateData();
  const ctaData = data?.[sourcePage]?.sections?.[sectionIndex] || {};
  
  const mainHeading = ctaData.headings?.[0] || 'Ready to Transform Your Space?';
  const mainText = ctaData.text?.[0] || 'Whether you are renovating a single room or building a new home, our expert designers are ready to guide you through every step of the process.';
  const btnText1 = ctaData.text?.[1] || 'Contact Us Now';
  const btnText2 = ctaData.text?.[2] || 'View Portfolio';

  const phone = clinic?.contact?.phone || '+880 1819 427 078';
  const cleanPhone = phone.replace(/\D/g, '');

  return (
    <section className="px-4 md:px-8 mb-20 max-w-7xl mx-auto mt-20">
      <div className="bg-[#2b347b] rounded-[40px] overflow-hidden relative shadow-xl">
        {/* Abstract Background Pattern / Blur */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/5 rounded-full blur-3xl transform translate-x-1/3 -translate-y-1/3"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-indigo-500/10 rounded-full blur-3xl transform -translate-x-1/4 translate-y-1/4"></div>

        <div className="relative z-10 px-6 py-20 md:py-24 flex flex-col items-center text-center">
          <h2 data-gsap="reveal" className="text-4xl md:text-5xl font-bold text-white mb-6 whitespace-pre-line">
            {mainHeading}
          </h2>
          <p data-gsap="reveal" className="text-indigo-100 max-w-2xl text-lg mb-10">
            {mainText}
          </p>
          
          <div data-gsap="reveal" className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto justify-center">
            <a 
              href={`tel:${cleanPhone}`}
              className="bg-white text-[#2b347b] px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-50 transition shadow-lg flex items-center justify-center gap-2"
            >
              {btnText1}
            </a>
            <button className="bg-transparent border border-white/30 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white/10 transition flex items-center justify-center gap-2">
              {btnText2} <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
