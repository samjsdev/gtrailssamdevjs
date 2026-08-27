'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';

const testimonials = [
  {
    text: 'ARCH Foundations & Murali Patharala Associates built our independent villa in Anna Nagar East from scratch. Having both architecture and civil engineering under one roof meant zero confusion. The dedicated site engineer was present daily and we delivered two weeks ahead of schedule!',
    author: 'Dr. R. Ramanathan',
    role: 'Homeowner — 4,200 Sq.Ft Villa',
    location: 'Anna Nagar East, Chennai',
  },
  {
    text: 'We compared several builders before choosing MPA. Their 100% fixed-price contract was honored to the last rupee — absolutely zero cost escalation despite steel price fluctuations. The 3D elevation matches the actual built villa one hundred percent.',
    author: 'K. Senthil Kumar & Priya',
    role: 'Homeowners — Contemporary Duplex',
    location: 'ECR, Chennai',
  },
  {
    text: 'Since 1998 they have built an incredible reputation in Chennai. From CMDA plan sanctions to our Italian marble flooring and modular kitchen woodwork, the craftsmanship and transparent weekly photo updates made building our dream home stress-free.',
    author: 'V. Sundararajan',
    role: 'Homeowner — Turnkey Residence & Interiors',
    location: 'Kilpauk, Chennai',
  },
  {
    text: 'The modular kitchen and wardrobe finish is factory-perfect. Blum hardware, flawless acrylic shutters, and the false ceiling lighting plan came out exactly as rendered in the 3D design. Handover was on the promised date.',
    author: 'Mrs. Lakshmi Narayanan',
    role: 'Apartment Interior Project',
    location: 'Mogappair West, Chennai',
  },
];

export default function TestimonialCarousel() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setIndex((i) => (i + 1) % testimonials.length), 7000);
    return () => clearInterval(t);
  }, []);

  const go = (dir: number) =>
    setIndex((i) => (i + dir + testimonials.length) % testimonials.length);

  const t = testimonials[index];

  return (
    <div className="relative max-w-4xl mx-auto">
      <div className="relative bg-white border border-stone-200 rounded-lg shadow-lg p-8 sm:p-12 overflow-hidden">
        <div className="absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b from-[#E64D16] to-[#B8934B]" />
        <Quote className="absolute top-6 right-8 w-16 h-16 text-orange-100" />

        <div key={index} className="mpa-fade space-y-6">
          <div className="flex items-center gap-1 text-[#E64D16]">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-[#E64D16]" />
            ))}
          </div>
          <p className="text-sm sm:text-base text-stone-700 leading-relaxed italic font-normal min-h-[96px] sm:min-h-[72px]">
            &ldquo;{t.text}&rdquo;
          </p>
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#E64D16] to-[#A6340C] text-white font-bold flex items-center justify-center text-lg shadow-md">
              {t.author.charAt(0)}
            </div>
            <div>
              <h4 className="text-sm font-bold text-stone-900">{t.author}</h4>
              <div className="text-[11px] text-stone-500">
                {t.role} &bull; {t.location}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-center gap-4">
        <button
          onClick={() => go(-1)}
          aria-label="Previous testimonial"
          className="w-10 h-10 rounded-full border border-stone-300 bg-white text-stone-600 hover:bg-[#E64D16] hover:text-white hover:border-[#E64D16] flex items-center justify-center transition-all"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        <div className="flex items-center gap-2">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              aria-label={`Testimonial ${i + 1}`}
              className={`h-2 rounded-full transition-all ${
                i === index ? 'w-7 bg-[#E64D16]' : 'w-2 bg-stone-300 hover:bg-stone-400'
              }`}
            />
          ))}
        </div>
        <button
          onClick={() => go(1)}
          aria-label="Next testimonial"
          className="w-10 h-10 rounded-full border border-stone-300 bg-white text-stone-600 hover:bg-[#E64D16] hover:text-white hover:border-[#E64D16] flex items-center justify-center transition-all"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
