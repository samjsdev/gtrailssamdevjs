'use client';

import { CONTACT_LINKS } from '@/lib/contactLinks';
import { useState } from 'react';
import { ArrowUpRight, MapPin } from 'lucide-react';
import { OFFICE_LOCATIONS } from '@/lib/offices';
import { STUDIO } from '@/lib/clientProfile';
import SocialLinks from '@/components/SocialLinks';

export default function OfficeLocations({ phone }: { phone: string }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeOffice = OFFICE_LOCATIONS[activeIndex];
  const message = encodeURIComponent(`Hello MPA, I would like to discuss a project in ${activeOffice.city}.`);

  return (
    <section id="offices" className="scroll-mt-20 border-b border-[#111111]/15 bg-surface-oat px-6 py-20 md:px-12 md:py-28">
      <div className="mx-auto max-w-7xl">
        <header className="mb-9 grid items-end gap-6 lg:grid-cols-[1fr_330px] md:mb-12">
          <div>
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-[#C2410C]">Our locations</p>
            <h2 className="font-serif text-4xl font-bold leading-[1.08] tracking-[-0.04em] md:text-6xl">Four cities.<br /><em className="font-normal text-[#C2410C]">One conversation away.</em></h2>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-[#55534E] md:text-base">Start with your project location. Our Chennai studio coordinates enquiries and discussions across these regions.</p>
        </header>

        <div className="grid grid-cols-2 gap-3 md:grid-cols-4" aria-label="Choose a project location">
          {OFFICE_LOCATIONS.map((office, index) => (
            <button
              key={office.code}
              type="button"
              aria-pressed={index === activeIndex}
              onClick={() => setActiveIndex(index)}
              className={`group relative min-h-32 border p-4 text-left transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C2410C] md:p-6 ${index === activeIndex ? 'border-[#111111] bg-surface-cream' : 'border-[#111111]/20 bg-surface-cream hover:border-[#C2410C] hover:bg-surface-cream'}`}
            >
              <span className="mb-5 flex items-center justify-between text-[10px] font-bold uppercase tracking-[0.18em] text-[#77736C]">
                {String(index + 1).padStart(2, '0')} / {office.code}
                <span className={`h-2 w-2 rounded-full ${index === activeIndex ? 'bg-[#C2410C]' : 'border border-[#77736C]'}`} aria-hidden="true" />
              </span>
              <span className="block font-serif text-[17px] font-bold leading-tight sm:text-xl md:text-2xl">{office.city}</span>
              <span className="mt-1 block text-[10px] uppercase tracking-[0.1em] text-[#77736C]">{office.state}</span>
            </button>
          ))}
        </div>

        <div className="mt-4 grid overflow-hidden border border-[#111111]/15 bg-surface-cream lg:grid-cols-2">
          <div className="flex flex-col justify-between p-7 sm:p-10 lg:p-12">
            <div>
              <p className="mb-7 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.18em] text-[#C2410C]"><MapPin size={15} aria-hidden="true" /> {activeOffice.type}</p>
              <h3 className="font-serif text-4xl font-bold leading-tight md:text-5xl">{activeOffice.city}<br /><em className="font-normal text-[#C2410C]">{activeOffice.hasStudioAddress ? 'studio.' : 'projects.'}</em></h3>
              <div className="mt-7">
                <span className="text-[11px] uppercase tracking-[0.18em] font-bold text-[#C2410C] block mb-1">Contact Address</span>
                <p className="max-w-md text-base font-semibold leading-relaxed text-[#111111]">{activeOffice.address}</p>
              </div>

              <p className="mt-5 max-w-md border-t border-[#111111]/15 pt-5 text-sm leading-relaxed text-[#55534E]">{activeOffice.coverage}</p>

              <div className="mt-5 border-t border-[#111111]/15 pt-5">
                <span className="text-[11px] uppercase tracking-[0.18em] font-bold text-[#C2410C] block mb-2">Direct Phone &amp; Enquiries</span>
                <p className="text-sm font-semibold text-[#111111]">
                  <a href={`tel:${phone}`} className="hover:text-[#C2410C]">{phone}</a>
                  <span className="mx-2 text-[#77736C]">•</span>
                  <a href={STUDIO.alternatePhoneHref} className="hover:text-[#C2410C] text-[#55534E]">{STUDIO.alternatePhone}</a>
                </p>
              </div>

              <div className="mt-6 border-t border-[#111111]/15 pt-6">
                <span className="text-[11px] uppercase tracking-[0.18em] font-bold text-[#C2410C] block mb-3">WhatsApp, Facebook &amp; Instagram</span>
                <SocialLinks showLabels />
              </div>
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <a className="mpa-outline-cta mpa-outline-cta--accent" href={`${CONTACT_LINKS.whatsapp}?text=${message}`} target="_blank" rel="noopener noreferrer">Discuss on WhatsApp <ArrowUpRight size={15} aria-hidden="true" /></a>
            </div>
          </div>
          <div className="relative min-h-[350px] bg-surface-linen lg:min-h-full">
            <iframe key={activeOffice.code} src={activeOffice.mapEmbedUrl} title={`${activeOffice.city} ${activeOffice.hasStudioAddress ? 'studio' : 'region'} map`} loading="lazy" referrerPolicy="no-referrer-when-downgrade" className="absolute inset-0 h-full w-full border-0" />
            <a href={activeOffice.mapSearchUrl} target="_blank" rel="noopener noreferrer" className="mpa-outline-cta absolute bottom-5 left-5 bg-surface-cream">{activeOffice.hasStudioAddress ? 'Open studio map' : 'View city map'} <ArrowUpRight size={15} aria-hidden="true" /></a>
          </div>
        </div>
      </div>
    </section>
  );
}
