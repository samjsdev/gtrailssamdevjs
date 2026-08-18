'use client';

import { FormEvent, useState } from 'react';

interface VisitFormProps {
  studioName: string;
  waPhone: string;
  dark?: boolean;
}

export default function VisitForm({ studioName, waPhone, dark = true }: VisitFormProps) {
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const name = (form.elements.namedItem('name') as HTMLInputElement)?.value || '';
    const mobile = (form.elements.namedItem('mobile') as HTMLInputElement)?.value || '';
    const slot = (form.elements.namedItem('slot') as HTMLSelectElement)?.value || '';
    const home = (form.elements.namedItem('home') as HTMLSelectElement)?.value || '';
    const text = `Hello ${studioName}, I'd like to book a private consultation.\nName: ${name}\nPhone: ${mobile}\nPreferred slot: ${slot}\nHome type: ${home}`;
    window.open(`https://wa.me/${waPhone}?text=${encodeURIComponent(text)}`, '_blank');
    setSent(true);
  };

  const fieldCls = dark
    ? 'px-4 py-3.5 bg-white/8 border border-white/22 text-white placeholder:text-white/50 text-[14px] outline-none focus:border-[#b08d4f] transition-colors'
    : 'px-4 py-3.5 bg-white border border-[#221c14]/14 text-[#221c14] placeholder:text-[#7a6f60] text-[14px] outline-none focus:border-[#b08d4f] transition-colors';

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      <input name="name" type="text" placeholder="Your name" required aria-label="Your name" className={fieldCls} />
      <input
        name="mobile"
        type="tel"
        placeholder="Phone number"
        pattern="[0-9+ ]{10,14}"
        required
        aria-label="Phone number"
        className={fieldCls}
      />
      <select name="slot" required defaultValue="" aria-label="Preferred slot" className={`${fieldCls} appearance-none [&>option]:text-[#221c14]`}>
        <option value="" disabled>Preferred slot</option>
        <option>Weekday · Morning</option>
        <option>Weekday · Evening</option>
        <option>Saturday</option>
        <option>Sunday</option>
      </select>
      <select name="home" required defaultValue="" aria-label="Home type" className={`${fieldCls} appearance-none [&>option]:text-[#221c14]`}>
        <option value="" disabled>Home type</option>
        <option>Apartment</option>
        <option>Villa / Independent</option>
        <option>Penthouse</option>
        <option>Renovation</option>
      </select>
      <button
        type="submit"
        disabled={sent}
        className={`col-span-full mt-1.5 inline-flex items-center justify-center gap-2.5 px-6 py-3 text-[12px] font-semibold tracking-[0.14em] uppercase transition-all duration-300 ${
          sent
            ? 'bg-[#1e9e5a] text-white cursor-default'
            : 'bg-[#b08d4f] text-[#17130f] hover:bg-[#c5a266] hover:-translate-y-0.5 hover:shadow-[0_14px_28px_rgba(176,141,79,0.3)]'
        }`}
      >
        {sent ? "Appointment requested — we'll confirm today ✓" : 'Request My Appointment'}
      </button>
    </form>
  );
}
