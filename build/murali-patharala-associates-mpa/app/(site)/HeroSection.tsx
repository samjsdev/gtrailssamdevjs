'use client';

import { useState } from 'react';
import Image from 'next/image';

interface HeroSectionProps {
  phone: string;
}

export default function HeroSection({ phone }: HeroSectionProps) {
  const [formData, setFormData] = useState({ name: '', phone: '', plotSize: '' });
  const [formSent, setFormSent] = useState(false);

  const rawDigits = phone.replace(/\D/g, '');
  const cleanPhone = rawDigits.startsWith('91') ? rawDigits : `91${rawDigits.replace(/^0+/, '')}`;

  function handleQuoteSubmit(e: React.FormEvent) {
    e.preventDefault();
    setFormSent(true);

    // Open WhatsApp with pre-filled lead details
    const text = `Hi Murali Patharala Associates (MPA),\nI would like an architectural estimate.\nName: ${formData.name}\nPhone: ${formData.phone}\nPlot/Space Size: ${formData.plotSize}`;
    const waUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(text)}`;
    window.open(waUrl, '_blank');

    setTimeout(() => {
      setFormSent(false);
      setFormData({ name: '', phone: '', plotSize: '' });
    }, 5000);
  }

  return (
    <section id="home" className="relative min-h-[88vh] flex items-stretch border-b-4 border-[#111111] bg-white">
      <div className="grid md:grid-cols-2 w-full">
        {/* Left Content */}
        <div className="px-6 md:px-12 lg:px-16 py-16 md:py-24 flex flex-col justify-center border-b-4 md:border-b-0 md:border-r-4 border-[#111111] bg-white">
          <div className="mb-6">
            <span className="text-xs font-bold tracking-[0.2em] uppercase text-[#EA580C] inline-block border-b-2 border-[#EA580C] pb-1">
              Chennai&apos;s Premier Turnkey Builder &amp; Architect
            </span>
          </div>

          <h1
            className="text-4xl sm:text-5xl lg:text-7xl font-bold leading-[1.06] tracking-tight mb-8 text-[#111111]"
            style={{ fontFamily: "'Lora', serif" }}
          >
            Zero Delays.<br />
            Zero Overruns.<br />
            <span className="text-[#EA580C]">100% Quality.</span>
          </h1>

          <p className="text-base sm:text-lg text-[#757575] mb-10 max-w-lg leading-relaxed font-medium">
            We design, build, and deliver custom residences with absolute transparency. In-house architects, fixed-price contracts, and uncompromising execution in Chennai since 1998.
          </p>

          {/* Quick Estimate Card */}
          <div id="quick-estimate" className="border-2 border-[#111111] p-6 sm:p-7 bg-[#FAFAFA] max-w-md shadow-sm">
            {formSent ? (
              <div className="text-center py-8">
                <span className="text-4xl block mb-2 text-[#EA580C]">✓</span>
                <span className="font-bold text-lg text-[#111111] block mb-1">Request Received</span>
                <span className="text-xs text-[#757575]">Our senior architect will call you within 2 hours.</span>
              </div>
            ) : (
              <form onSubmit={handleQuoteSubmit} className="space-y-4">
                <div className="flex items-center justify-between border-b-2 border-[#111111] pb-3 mb-4">
                  <h3 className="text-xs sm:text-sm font-bold uppercase tracking-widest text-[#111111]">
                    Quick Construction Estimate
                  </h3>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#EA580C] bg-[#EA580C]/10 px-2 py-0.5">
                    Free Feasibility
                  </span>
                </div>

                <div>
                  <input
                    required
                    type="text"
                    placeholder="Full Name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 bg-white border border-[#E0E0E0] text-sm text-[#111111] placeholder:text-[#757575] outline-none focus:border-[#EA580C] transition-colors"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    required
                    type="tel"
                    placeholder="Phone Number"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3 bg-white border border-[#E0E0E0] text-sm text-[#111111] placeholder:text-[#757575] outline-none focus:border-[#EA580C] transition-colors"
                  />
                  <select
                    required
                    value={formData.plotSize}
                    onChange={(e) => setFormData({ ...formData, plotSize: e.target.value })}
                    className="w-full px-4 py-3 bg-white border border-[#E0E0E0] text-sm text-[#111111] outline-none focus:border-[#EA580C] transition-colors"
                  >
                    <option value="" disabled>Plot / Built-up Size</option>
                    <option value="Under 1500 sqft">Under 1,500 sq.ft</option>
                    <option value="1500 - 3000 sqft">1,500 – 3,000 sq.ft</option>
                    <option value="3000 - 5000 sqft">3,000 – 5,000 sq.ft</option>
                    <option value="Above 5000 sqft">Above 5,000 sq.ft</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#EA580C] text-white py-4 text-xs font-bold uppercase tracking-widest hover:bg-[#111111] transition-colors mt-2"
                >
                  Request Callback &amp; BOQ
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Right Architectural Visual */}
        <div className="relative min-h-[450px] md:min-h-full bg-[#111111] overflow-hidden">
          <Image
            src="/images/hero-villa.jpg"
            alt="Murali Patharala Associates - Turnkey Architectural Project Chennai"
            fill
            priority
            className="object-cover grayscale-[0.2] hover:scale-105 transition-transform duration-1000"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          <div className="absolute inset-0 bg-[#EA580C] mix-blend-overlay opacity-20 pointer-events-none" />
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 bg-gradient-to-t from-[#111111] via-[#111111]/70 to-transparent text-white">
            <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#EA580C] block mb-1">
              Featured Residence
            </span>
            <p className="text-xl sm:text-2xl font-bold font-serif" style={{ fontFamily: "'Lora', serif" }}>
              The Anna Nagar Contemporary Villa
            </p>
            <p className="text-xs text-white/70 uppercase tracking-wider mt-1">
              4,600 sq.ft · Turnkey Execution &amp; Interior Architecture
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
