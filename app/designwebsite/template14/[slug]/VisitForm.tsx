'use client';

import { FormEvent, useState } from 'react';
import { Send, CheckCircle2 } from 'lucide-react';

interface VisitFormProps {
  studioName: string;
  waPhone: string;
  dark?: boolean;
}

export default function VisitForm({ studioName, waPhone, dark = false }: VisitFormProps) {
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const name = (form.elements.namedItem('name') as HTMLInputElement)?.value || '';
    const mobile = (form.elements.namedItem('mobile') as HTMLInputElement)?.value || '';
    const slot = (form.elements.namedItem('slot') as HTMLSelectElement)?.value || '';
    const home = (form.elements.namedItem('home') as HTMLSelectElement)?.value || '';
    const text = `Hello ${studioName}, I would like to book a private architectural & construction consultation in Chennai.\n\n• Name: ${name}\n• Phone: ${mobile}\n• Preferred Slot: ${slot}\n• Project Scope: ${home}`;
    window.open(`https://wa.me/${waPhone}?text=${encodeURIComponent(text)}`, '_blank');
    setSent(true);
  };

  const fieldCls = dark
    ? 'w-full px-4 py-3.5 bg-white/10 border border-white/20 text-white placeholder:text-white/60 text-[14px] rounded-none outline-none focus:border-[#d9c49a] transition-all'
    : 'w-full px-4 py-3.5 bg-[#fbf8f1] border border-[#221c14]/16 text-[#17130f] placeholder:text-[#7a6f60] text-[14px] rounded-none outline-none focus:border-[#a4532f] focus:bg-white transition-all';

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div>
        <h3 className={`font-[family-name:var(--font-cormorant)] text-[26px] font-semibold mb-1 ${dark ? 'text-white' : 'text-[#17130f]'}`}>
          Reserve Atelier Consultation
        </h3>
        <p className={`text-[13px] font-light ${dark ? 'text-white/70' : 'text-[#7a6f60]'}`}>
          Direct dispatch to our principal architects & civil engineers
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        <div>
          <label className={`block text-[10.5px] uppercase tracking-wider font-semibold mb-1.5 ${dark ? 'text-white/70' : 'text-[#7a6f60]'}`}>
            Your Name *
          </label>
          <input
            name="name"
            type="text"
            placeholder="e.g. Senthil Kumar"
            required
            aria-label="Your name"
            className={fieldCls}
          />
        </div>

        <div>
          <label className={`block text-[10.5px] uppercase tracking-wider font-semibold mb-1.5 ${dark ? 'text-white/70' : 'text-[#7a6f60]'}`}>
            Phone / WhatsApp *
          </label>
          <input
            name="mobile"
            type="tel"
            placeholder="e.g. +91 98400 12345"
            pattern="[0-9+ ]{10,15}"
            required
            aria-label="Phone number"
            className={fieldCls}
          />
        </div>

        <div>
          <label className={`block text-[10.5px] uppercase tracking-wider font-semibold mb-1.5 ${dark ? 'text-white/70' : 'text-[#7a6f60]'}`}>
            Preferred Time *
          </label>
          <select
            name="slot"
            required
            defaultValue=""
            aria-label="Preferred slot"
            className={`${fieldCls} appearance-none [&>option]:text-[#17130f]`}
          >
            <option value="" disabled>Select meeting time</option>
            <option>Weekday · Morning (10 AM - 1 PM)</option>
            <option>Weekday · Evening (4 PM - 7 PM)</option>
            <option>Saturday · Full Day</option>
            <option>Sunday · Morning By Appointment</option>
          </select>
        </div>

        <div>
          <label className={`block text-[10.5px] uppercase tracking-wider font-semibold mb-1.5 ${dark ? 'text-white/70' : 'text-[#7a6f60]'}`}>
            Project Typology *
          </label>
          <select
            name="home"
            required
            defaultValue=""
            aria-label="Project scope"
            className={`${fieldCls} appearance-none [&>option]:text-[#17130f]`}
          >
            <option value="" disabled>Select project scope</option>
            <option>Turnkey Luxury Villa Construction</option>
            <option>Independent Residential House (G+1/G+2)</option>
            <option>Commercial Building &amp; Clinics</option>
            <option>Architectural Concept, Vaastu &amp; 3D BIM</option>
            <option>CMDA / GCC Sanction Drawings</option>
          </select>
        </div>
      </div>

      <button
        type="submit"
        disabled={sent}
        className={`w-full mt-2 inline-flex items-center justify-center gap-2.5 px-7 py-4 text-[11.5px] font-semibold tracking-[0.18em] uppercase transition-all duration-300 ${
          sent
            ? 'bg-[#1e9e5a] text-white cursor-default'
            : dark
            ? 'bg-[#d9c49a] text-[#17130f] hover:bg-[#ebd8b3] shadow-lg'
            : 'bg-[#a4532f] text-white hover:bg-[#854021] shadow-lg hover:-translate-y-0.5'
        }`}
      >
        {sent ? (
          <>
            <CheckCircle2 className="w-4 h-4" />
            <span>Consultation Requested — We Will Confirm Today</span>
          </>
        ) : (
          <>
            <span>Request Private Studio Meeting</span>
            <Send className="w-3.5 h-3.5" />
          </>
        )}
      </button>
    </form>
  );
}
