'use client';

import { FormEvent, useState } from 'react';

interface LeadFormProps {
  studioName: string;
  waPhone: string;
  city: string;
}

export default function LeadForm({ studioName, waPhone, city }: LeadFormProps) {
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const name = (form.elements.namedItem('name') as HTMLInputElement)?.value || '';
    const mobile = (form.elements.namedItem('mobile') as HTMLInputElement)?.value || '';
    const home = (form.elements.namedItem('home') as HTMLSelectElement)?.value || '';
    const locality = (form.elements.namedItem('locality') as HTMLInputElement)?.value || '';
    const text = `Hi ${studioName}, I'd like to book a design consultation.\nName: ${name}\nMobile: ${mobile}\nHome: ${home}\nLocality: ${locality}`;
    window.open(`https://wa.me/${waPhone}?text=${encodeURIComponent(text)}`, '_blank');
    setSent(true);
  };

  return (
    <div className="bg-white text-[#241f1a] rounded-[20px] px-7 py-8 shadow-[0_34px_70px_-20px_rgba(0,0,0,0.5)] w-full">
      <span className="inline-block bg-[#fdeae5] text-[#d8442c] text-[11.5px] font-extrabold tracking-[0.1em] uppercase px-3.5 py-1.5 rounded-full mb-3.5">
        Limited slots this month
      </span>
      <h3 className="text-[23px] font-extrabold mb-1.5 leading-tight">Book a design consultation</h3>
      <p className="text-[13.5px] text-[#6d6259] mb-5">
        Includes home visit, 3D designs &amp; itemised quote.
      </p>

      <form onSubmit={handleSubmit}>
        <input
          name="name"
          type="text"
          placeholder="Your name"
          required
          aria-label="Your name"
          className="w-full px-4 py-3 border-[1.5px] border-[#241f1a]/10 rounded-[10px] text-[14.5px] mb-3 bg-white outline-none focus:border-[#d8442c] transition-colors"
        />
        <input
          name="mobile"
          type="tel"
          placeholder="Phone number"
          pattern="[0-9+ ]{10,14}"
          required
          aria-label="Phone number"
          className="w-full px-4 py-3 border-[1.5px] border-[#241f1a]/10 rounded-[10px] text-[14.5px] mb-3 bg-white outline-none focus:border-[#d8442c] transition-colors"
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
          <select
            name="home"
            required
            aria-label="Home type"
            className="w-full px-4 py-3 border-[1.5px] border-[#241f1a]/10 rounded-[10px] text-[14.5px] bg-white outline-none focus:border-[#d8442c] transition-colors appearance-none"
          >
            <option value="" disabled>Home type</option>
            <option>1BHK</option>
            <option>2BHK</option>
            <option>3BHK</option>
            <option>4BHK / Villa</option>
            <option>Renovation</option>
          </select>
          <input
            name="locality"
            type="text"
            placeholder={`Locality in ${city}`}
            aria-label="Locality"
            className="w-full px-4 py-3 border-[1.5px] border-[#241f1a]/10 rounded-[10px] text-[14.5px] bg-white outline-none focus:border-[#d8442c] transition-colors"
          />
        </div>
        <button
          type="submit"
          className="w-full inline-flex items-center justify-center gap-2 bg-[#d8442c] text-white font-extrabold text-[15px] px-7 py-3.5 rounded-xl hover:bg-[#b93320] hover:-translate-y-0.5 hover:shadow-[0_12px_26px_rgba(216,68,44,0.3)] transition-all duration-250"
        >
          {sent ? "Booked! We'll call you soon ✓" : 'Request a Callback →'}
        </button>
      </form>
      <p className="text-[11.5px] text-[#6d6259] text-center mt-3">
        A designer (not a call centre) calls within working hours.
      </p>
    </div>
  );
}
