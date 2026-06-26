'use client';

import { ArrowRight } from 'lucide-react';

export default function CTASection({ clinic }: { clinic: any }) {
  const phone = clinic?.contact?.phone || '+880 1819 427 078';
  const cleanPhone = phone.replace(/\D/g, '');

  return (
    <section className="px-4 md:px-8 mb-20 max-w-7xl mx-auto mt-20">
      <div className="bg-[#2b347b] rounded-[40px] overflow-hidden relative shadow-xl">
        {/* Abstract Background Pattern / Blur */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/5 rounded-full blur-3xl transform translate-x-1/3 -translate-y-1/3"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-indigo-500/10 rounded-full blur-3xl transform -translate-x-1/4 translate-y-1/4"></div>

        <div className="relative z-10 px-6 py-20 md:py-24 flex flex-col items-center text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Transform Your Space?
          </h2>
          <p className="text-indigo-100 max-w-2xl text-lg mb-10">
            Whether you are renovating a single room or building a new home, our expert designers are ready to guide you through every step of the process.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto justify-center">
            <a 
              href={`tel:${cleanPhone}`}
              className="bg-white text-[#2b347b] px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-50 transition shadow-lg flex items-center justify-center gap-2"
            >
              Contact Us Now
            </a>
            <button className="bg-transparent border border-white/30 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white/10 transition flex items-center justify-center gap-2">
              View Portfolio <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
