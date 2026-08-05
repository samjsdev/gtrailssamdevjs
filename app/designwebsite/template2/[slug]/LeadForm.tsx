'use client';

import { FormEvent, useState } from 'react';
import { Bricolage_Grotesque } from 'next/font/google';

const bricolage = Bricolage_Grotesque({ subsets: ['latin'], weight: ['700'] });

interface LeadFormProps {
  studioName: string;
  waPhone: string;
}

export default function LeadForm({ studioName, waPhone }: LeadFormProps) {
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const name = (form.elements.namedItem('name') as HTMLInputElement)?.value || '';
    const mobile = (form.elements.namedItem('mobile') as HTMLInputElement)?.value || '';
    const home = (form.elements.namedItem('home') as HTMLSelectElement)?.value || '';
    const text = `Hi ${studioName}, I'd like to book a design consultation.\nName: ${name}\nMobile: ${mobile}\nHome: ${home}`;
    window.open(`https://wa.me/${waPhone}?text=${encodeURIComponent(text)}`, '_blank');
    setSent(true);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-[20px] p-6 sm:p-7 shadow-[0_24px_60px_rgba(27,27,27,0.12)] border border-[#1b1b1b]/10"
    >
      <h3 className={`${bricolage.className} text-[20px] font-bold text-[#1b1b1b] mb-1`}>
        Book a design consultation
      </h3>
      <p className="text-[12.5px] text-[#6b6660] font-semibold mb-4">
        3D designs + itemised quote for your floor plan
      </p>

      <input
        name="name"
        type="text"
        placeholder="Your name"
        required
        aria-label="Your name"
        className="w-full border-[1.5px] border-[#1b1b1b]/10 rounded-[11px] px-4 py-3 text-[14px] font-semibold text-[#1b1b1b] outline-none mb-2.5 focus:border-[#0e5a43] transition-colors bg-white"
      />
      <input
        name="mobile"
        type="tel"
        placeholder="Mobile number"
        pattern="[0-9+ ]{10,14}"
        required
        aria-label="Mobile number"
        className="w-full border-[1.5px] border-[#1b1b1b]/10 rounded-[11px] px-4 py-3 text-[14px] font-semibold text-[#1b1b1b] outline-none mb-2.5 focus:border-[#0e5a43] transition-colors bg-white"
      />
      <select
        name="home"
        aria-label="Home type"
        className="w-full border-[1.5px] border-[#1b1b1b]/10 rounded-[11px] px-4 py-3 text-[14px] font-semibold text-[#1b1b1b] outline-none mb-2.5 focus:border-[#0e5a43] transition-colors bg-white appearance-none"
      >
        <option>2 BHK Apartment</option>
        <option>3 BHK Apartment</option>
        <option>4+ BHK / Villa</option>
        <option>Commercial Space</option>
        <option>Renovation</option>
      </select>

      <button
        type="submit"
        className="w-full mt-1 inline-flex items-center justify-center gap-2 bg-[#f2a007] text-[#1b1b1b] font-bold text-[14px] px-6 py-3.5 rounded-xl hover:bg-[#e09500] hover:-translate-y-0.5 hover:shadow-[0_14px_28px_rgba(242,160,7,0.35)] transition-all duration-300"
      >
        {sent ? "We'll Call You Shortly" : 'Book Consultation'}
      </button>
      <small className="block text-center mt-3 text-[11px] text-[#6b6660] font-semibold">
        No spam. A designer will call you back.
      </small>
    </form>
  );
}
