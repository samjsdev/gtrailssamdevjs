'use client';

import { useState } from 'react';
import { ArrowUpRight, CalendarDays, MapPin, Phone } from 'lucide-react';
import { OFFICE_LOCATIONS } from '@/lib/offices';

interface OfficeLocationsProps {
  phone: string;
}

export default function OfficeLocations({ phone }: OfficeLocationsProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeOffice = OFFICE_LOCATIONS[activeIndex];
  const rawDigits = phone.replace(/\D/g, '');
  const cleanPhone = rawDigits.startsWith('91') ? rawDigits : `91${rawDigits.replace(/^0+/, '')}`;
  const message = encodeURIComponent(
    `Hi Murali Patharala & Associates (MPA), I would like to book a consultation with your ${activeOffice.city} office.`
  );

  const selectOffice = (index: number) => {
    const total = OFFICE_LOCATIONS.length;
    const next = (index + total) % total;
    setActiveIndex(next);
    document.getElementById(`office-tab-${OFFICE_LOCATIONS[next].code}`)?.focus();
  };

  return (
    <section id="offices" className="relative overflow-hidden border-b border-[#111111]/15 bg-[#E9E3DA] px-6 py-20 md:px-12 md:py-28">
      <div className="relative z-10 mx-auto max-w-7xl">
        <header data-motion-reveal className="mb-10 grid items-end gap-8 lg:grid-cols-12 md:mb-14">
          <div className="lg:col-span-7">
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.24em] text-[#C2410C]">The MPA office network</p>
            <h2 className="font-serif text-4xl font-bold leading-[1.03] tracking-[-0.04em] text-[#111111] md:text-6xl">
              Four cities.<br />
              <em className="font-normal text-[#C2410C]">One exacting standard.</em>
            </h2>
          </div>
          <div className="lg:col-span-4 lg:col-start-9 lg:border-l lg:border-[#111111]/20 lg:pl-8">
            <p className="text-sm font-medium leading-relaxed text-[#55534E] md:text-base">
              Meet our architecture and construction team closer to your site. Select a city to view its regional office and schedule a consultation.
            </p>
          </div>
        </header>

        <div data-motion-group className="grid grid-cols-2 gap-3 md:gap-4 lg:grid-cols-4" role="tablist" aria-label="Choose an MPA office">
          {OFFICE_LOCATIONS.map((office, index) => {
            const isActive = index === activeIndex;

            return (
              <button
                key={office.city}
                id={`office-tab-${office.code}`}
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-controls="office-panel"
                tabIndex={isActive ? 0 : -1}
                onClick={() => setActiveIndex(index)}
                onKeyDown={(event) => {
                  if (event.key === 'ArrowRight') selectOffice(index + 1);
                  if (event.key === 'ArrowLeft') selectOffice(index - 1);
                }}
                className={`group relative overflow-hidden rounded-md border p-5 text-left transition-all duration-300 md:p-6 ${
                  isActive
                    ? 'border-[#111111] bg-white shadow-[0_18px_45px_rgba(17,17,17,0.12)]'
                    : 'border-[#111111]/15 bg-[#F5F1EB]/80 text-[#111111] hover:-translate-y-0.5 hover:border-[#111111]/35 hover:bg-white hover:shadow-[0_14px_35px_rgba(17,17,17,0.10)]'
                }`}
              >
                <span className={`absolute inset-x-0 top-0 h-[3px] bg-[#EA580C] transition-transform duration-300 ${isActive ? 'scale-x-100' : 'scale-x-0'}`} aria-hidden="true" />
                <span className="mb-5 flex items-center justify-between font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-[#77736C]">
                  {String(index + 1).padStart(2, '0')} / 04 · {office.code}
                  <span className={`h-2 w-2 rounded-full ${isActive ? 'bg-[#EA580C]' : 'border border-[#111111]/35'}`} aria-hidden="true" />
                </span>
                <span className="block font-serif text-lg font-bold text-[#111111] md:text-2xl">{office.city}</span>
                <span className="mt-1 block text-[9px] font-bold uppercase tracking-[0.17em] text-[#77736C]">{office.state}</span>
              </button>
            );
          })}
        </div>

        <div
          id="office-panel"
          role="tabpanel"
          aria-labelledby={`office-tab-${activeOffice.code}`}
          data-motion-reveal
          className="mt-4 grid overflow-hidden rounded-lg border border-[#111111]/15 bg-white shadow-[0_24px_60px_rgba(44,35,25,0.10)] md:mt-5 lg:grid-cols-12"
        >
          <div className="flex flex-col justify-between p-7 sm:p-10 lg:col-span-5 lg:p-12">
            <div>
              <div className="mb-10 flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.2em] text-[#C2410C]">
                <MapPin size={15} strokeWidth={1.8} aria-hidden="true" />
                Our office @ {activeOffice.city}
              </div>
              <p className="mb-3 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-[#77736C]">{activeOffice.type}</p>
              <h3 className="max-w-md font-serif text-4xl font-bold leading-[1.06] tracking-[-0.035em] text-[#111111] md:text-5xl">
                {activeOffice.city}<br />
                <em className="font-normal text-[#C2410C]">studio.</em>
              </h3>
              <p className="mt-7 max-w-sm text-base font-semibold leading-relaxed text-[#111111]">{activeOffice.address}</p>
              {activeIndex !== 0 && (
                <p className="mt-2 text-[11px] font-bold uppercase tracking-[0.14em] text-[#77736C]">Visits by prior appointment</p>
              )}
              <p className="mt-6 max-w-md border-t border-[#111111]/15 pt-6 text-sm leading-relaxed text-[#55534E]">{activeOffice.coverage}</p>
            </div>

            <div className="mt-10 grid gap-3 sm:grid-cols-2">
              <a
                href={`https://wa.me/${cleanPhone}?text=${message}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-md bg-[#EA580C] px-5 py-4 text-[10px] font-bold uppercase tracking-[0.16em] text-[#111111] transition-colors hover:bg-[#111111] hover:text-white"
              >
                <CalendarDays size={15} aria-hidden="true" /> Book a visit
              </a>
              <a
                href={`tel:${phone}`}
                className="inline-flex items-center justify-center gap-2 rounded-md border border-[#111111]/25 px-5 py-4 text-[10px] font-bold uppercase tracking-[0.16em] text-[#111111] transition-colors hover:border-[#111111] hover:bg-[#111111] hover:text-white"
              >
                <Phone size={15} aria-hidden="true" /> Call the studio
              </a>
            </div>
          </div>

          <div className="relative min-h-[420px] overflow-hidden border-t border-[#111111]/15 bg-[#D7D2C9] lg:col-span-7 lg:min-h-full lg:border-l lg:border-t-0">
            <iframe
              key={activeOffice.city}
              src={activeOffice.mapEmbedUrl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title={`Map of the MPA ${activeOffice.city} office region`}
              className="absolute inset-0 h-full w-full grayscale-[0.25] contrast-[1.06]"
            />
            <a
              href={activeOffice.mapSearchUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group absolute bottom-5 left-5 right-5 flex items-center justify-between rounded-md border border-white/15 bg-[#111111]/95 p-5 text-white shadow-2xl backdrop-blur-sm transition-colors hover:bg-[#EA580C] hover:text-[#111111] sm:bottom-7 sm:left-7 sm:right-7"
            >
              <span>
                <span className="block text-[9px] font-bold uppercase tracking-[0.18em] text-[#FB923C] group-hover:text-current">Office region</span>
                <span className="mt-1 block font-serif text-lg font-bold">{activeOffice.city}, {activeOffice.state}</span>
              </span>
              <span className="flex h-11 w-11 items-center justify-center rounded-md border border-current/30" aria-hidden="true">
                <ArrowUpRight size={20} aria-hidden="true" />
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
