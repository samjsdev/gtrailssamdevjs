'use client';

import { FormEvent, useState } from 'react';
import { Marcellus } from 'next/font/google';

const marcellus = Marcellus({ subsets: ['latin'], weight: '400' });

interface LeadFormProps {
  studioName: string;
  waPhone: string;
  phoneDisplay: string;
}

export default function LeadForm({ studioName, waPhone, phoneDisplay }: LeadFormProps) {
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const name = (form.elements.namedItem('name') as HTMLInputElement)?.value || '';
    const mobile = (form.elements.namedItem('mobile') as HTMLInputElement)?.value || '';
    const property = (form.elements.namedItem('property') as HTMLSelectElement)?.value || '';
    const text = `Hi ${studioName}, I'd like a free design consultation.\nName: ${name}\nMobile: ${mobile}\nProperty: ${property}`;
    window.open(`https://wa.me/${waPhone}?text=${encodeURIComponent(text)}`, '_blank');
    setSent(true);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-[#fdfbf6] text-[#211a13] p-9 sm:p-10 shadow-[0_40px_90px_rgba(0,0,0,0.4)]"
    >
      <h3 className={`${marcellus.className} text-[26px] mb-2`}>Request a callback</h3>
      <p className="text-[13.5px] text-[#7d7264] font-light mb-4">
        Our design team will reach out within one working day.
      </p>

      <label htmlFor="t1-name" className="block text-[11px] tracking-[0.22em] uppercase text-[#7d7264] mt-4 mb-2">
        Your name
      </label>
      <input
        id="t1-name"
        name="name"
        type="text"
        placeholder="e.g. Priya Raman"
        required
        className="w-full border-0 border-b-[1.5px] border-[#211a13]/15 bg-transparent px-0.5 py-2.5 text-[15px] outline-none focus:border-[#a58150] transition-colors rounded-none"
      />

      <label htmlFor="t1-mobile" className="block text-[11px] tracking-[0.22em] uppercase text-[#7d7264] mt-5 mb-2">
        Mobile number
      </label>
      <input
        id="t1-mobile"
        name="mobile"
        type="tel"
        placeholder="+91"
        pattern="[0-9+ ]{10,14}"
        required
        className="w-full border-0 border-b-[1.5px] border-[#211a13]/15 bg-transparent px-0.5 py-2.5 text-[15px] outline-none focus:border-[#a58150] transition-colors rounded-none"
      />

      <label htmlFor="t1-property" className="block text-[11px] tracking-[0.22em] uppercase text-[#7d7264] mt-5 mb-2">
        Property type
      </label>
      <select
        id="t1-property"
        name="property"
        className="w-full border-0 border-b-[1.5px] border-[#211a13]/15 bg-transparent px-0.5 py-2.5 text-[15px] outline-none focus:border-[#a58150] transition-colors appearance-none rounded-none"
      >
        <option>Apartment — 2 BHK</option>
        <option>Apartment — 3 BHK</option>
        <option>Apartment — 4+ BHK</option>
        <option>Independent Villa</option>
        <option>Commercial Space</option>
        <option>Renovation of existing home</option>
      </select>

      <button
        type="submit"
        className="w-full mt-8 inline-flex items-center justify-center gap-3 bg-[#a58150] text-white py-4 text-[12.5px] tracking-[0.2em] uppercase font-medium border border-[#a58150] hover:bg-[#211a13] hover:border-[#211a13] transition-colors duration-300"
      >
        {sent ? 'Request Received — We\u2019ll Call You' : 'Get My Free Consultation'}
      </button>

      {phoneDisplay && (
        <small className="block text-center mt-4 text-[11.5px] text-[#7d7264] font-light">
          Prefer to talk? Call <b className="text-[#a58150] font-medium">{phoneDisplay}</b> or WhatsApp us anytime.
        </small>
      )}
    </form>
  );
}
