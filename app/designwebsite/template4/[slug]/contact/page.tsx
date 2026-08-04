import { readSourceConfig } from '@/lib/dataBuilder';
import { notFound } from 'next/navigation';
import { MapPin, Phone, Clock, Check } from 'lucide-react';
import { cleanClinicName } from '@/lib/copyCleaner';
import { INTERIOR_FAQS } from '@/lib/interiorContent';
import Reveal from '../Reveal';
import VisitForm from '../VisitForm';

type PageProps = { params: Promise<{ slug: string }> };

export default async function Template4Contact({ params }: PageProps) {
  const { slug } = await params;

  const data = await readSourceConfig(slug, 'template4');
  if (!data) return notFound();

  const { clinic, media } = data;
  const cleanName = cleanClinicName(clinic.name);
  const city = clinic.address?.city || 'Chennai';
  const phone = clinic.contact?.phone || '';
  const address = clinic.address?.full || `${city}, Tamil Nadu`;
  const waPhone = phone.replace(/\D/g, '') || '919751396117';
  const mapQuery = encodeURIComponent(address || `${cleanName} ${city}`);

  const visitImage =
    media.clinicImages?.[0] ||
    media.otherImages?.[0] ||
    '/images/stock/68b39046.webp';

  return (
    <div>
      {/* VISIT + FORM */}
      <section className="py-[clamp(64px,7vw,96px)]">
        <div className="max-w-[1240px] mx-auto px-[30px]">
          <Reveal className="mb-[52px]">
            <div className="flex items-center gap-3 text-[11.5px] font-semibold tracking-[0.3em] uppercase text-[#a4532f] before:content-[''] before:w-8 before:h-px before:bg-[#a4532f]">
              By appointment
            </div>
            <h1 className="font-[family-name:var(--font-cormorant)] text-[clamp(34px,4.6vw,56px)] font-semibold leading-[1.12] mt-4 mb-3.5 max-w-[760px]">
              Feel the materials. <em className="italic text-[#a4532f]">Meet your designer.</em>
            </h1>
            <p className="text-[#7a6f60] text-[16px] font-light max-w-[620px]">
              Sit with a designer from {cleanName || 'our studio'} for an unhurried hour — walk through materials, budgets
              and your floor plan. By appointment only, never a queue.
            </p>
          </Reveal>

          <Reveal>
            <div className="grid lg:grid-cols-[1.1fr_0.9fr] bg-[#17130f] text-white overflow-hidden">
              <div className="min-h-[300px] lg:min-h-[480px]">
                <img
                  src={visitImage}
                  alt={`Inside the ${cleanName || 'design'} studio`}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="px-8 py-12 lg:px-[58px] lg:py-16 flex flex-col justify-center">
                <div className="flex items-center gap-3 text-[11.5px] font-semibold tracking-[0.3em] uppercase text-[#d9c49a] before:content-[''] before:w-8 before:h-px before:bg-[#d9c49a]">
                  Step into the studio
                </div>
                <h2 className="font-[family-name:var(--font-cormorant)] text-[clamp(28px,3.4vw,40px)] font-semibold leading-[1.12] my-4">
                  Request your <em className="italic text-[#d9c49a]">appointment</em>
                </h2>
                <ul className="flex flex-col gap-3 mb-8">
                  {[
                    'A dedicated hour with a designer',
                    'Material samples you can touch and compare',
                    'Honest budgets, itemised on the spot',
                    'Zero cost, zero obligation',
                  ].map((li) => (
                    <li key={li} className="flex gap-3 text-[14px] text-white/88 font-light">
                      <Check className="w-[17px] h-[17px] text-[#b08d4f] shrink-0 mt-[3px]" strokeWidth={2.2} />
                      {li}
                    </li>
                  ))}
                </ul>
                <VisitForm studioName={cleanName || 'the studio'} waPhone={waPhone} />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* DETAILS + MAP */}
      <section className="pb-[clamp(48px,6vw,80px)]">
        <div className="max-w-[1240px] mx-auto px-[30px] grid lg:grid-cols-[0.9fr_1.1fr] gap-[22px] items-stretch">
          <Reveal>
            <div className="bg-[#fbf8f1] border border-[#221c14]/14 p-9 sm:p-11 h-full flex flex-col justify-center gap-7">
              <div className="flex gap-4 items-start">
                <span className="w-[46px] h-[46px] rounded-full bg-[#f5f1e8] grid place-items-center text-[#a4532f] shrink-0">
                  <MapPin className="w-5 h-5" strokeWidth={1.8} />
                </span>
                <div>
                  <h3 className="font-[family-name:var(--font-cormorant)] text-[22px] font-semibold mb-1">The Studio</h3>
                  <p className="text-[14.5px] text-[#7a6f60] font-light leading-[1.7]">{address}</p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <span className="w-[46px] h-[46px] rounded-full bg-[#f5f1e8] grid place-items-center text-[#a4532f] shrink-0">
                  <Clock className="w-5 h-5" strokeWidth={1.8} />
                </span>
                <div>
                  <h3 className="font-[family-name:var(--font-cormorant)] text-[22px] font-semibold mb-1">Hours</h3>
                  <p className="text-[14.5px] text-[#7a6f60] font-light leading-[1.7]">
                    Open Mon–Sat, 10 AM – 7 PM
                    <br />
                    Sundays by prior appointment
                  </p>
                </div>
              </div>
              {phone && (
                <div className="flex gap-4 items-start">
                  <span className="w-[46px] h-[46px] rounded-full bg-[#f5f1e8] grid place-items-center text-[#a4532f] shrink-0">
                    <Phone className="w-5 h-5" strokeWidth={1.8} />
                  </span>
                  <div>
                    <h3 className="font-[family-name:var(--font-cormorant)] text-[22px] font-semibold mb-1">Prefer to talk first?</h3>
                    <p className="text-[14.5px] text-[#7a6f60] font-light leading-[1.7] mb-3">
                      A designer will call you at a time you choose.
                    </p>
                    <a
                      href={`tel:${phone}`}
                      className="inline-flex items-center justify-center bg-[#17130f] text-white px-[26px] py-[13px] text-[11.5px] font-semibold tracking-[0.14em] uppercase hover:bg-black transition-colors duration-300"
                    >
                      Call {phone}
                    </a>
                  </div>
                </div>
              )}
            </div>
          </Reveal>
          <Reveal delay={120}>
            <div className="h-full min-h-[380px] border border-[#221c14]/14 overflow-hidden">
              <iframe
                title={`Map showing location of ${cleanName || 'our studio'}`}
                src={clinic.mapEmbedUrl || `https://www.google.com/maps?q=${mapQuery}&output=embed`}
                className="w-full h-full min-h-[380px] border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 bg-[#fbf8f1]">
        <div className="max-w-[1240px] mx-auto px-[30px] grid lg:grid-cols-[0.8fr_1.2fr] gap-[52px] lg:gap-[70px] items-start">
          <Reveal>
            <div className="flex items-center gap-3 text-[11.5px] font-semibold tracking-[0.3em] uppercase text-[#a4532f] before:content-[''] before:w-8 before:h-px before:bg-[#a4532f]">
              Questions, answered
            </div>
            <h2 className="font-[family-name:var(--font-cormorant)] text-[clamp(30px,4vw,46px)] font-semibold leading-[1.12] mt-4 mb-4">
              Everything worth <em className="italic text-[#a4532f]">asking</em>
            </h2>
            <p className="text-[#7a6f60] text-[15.5px] font-light max-w-[420px]">
              If your question isn&apos;t here, ask it on WhatsApp — a designer, not a bot, will answer.
            </p>
          </Reveal>
          <Reveal delay={120}>
            <div className="border-t border-[#221c14]/14">
              {INTERIOR_FAQS.map((faq) => (
                <details key={faq.q} className="group border-b border-[#221c14]/14 px-1 py-5">
                  <summary className="font-[family-name:var(--font-cormorant)] text-[22px] font-semibold cursor-pointer list-none flex justify-between items-center gap-4 [&::-webkit-details-marker]:hidden">
                    {faq.q}
                    <span className="font-[family-name:var(--font-outfit)] text-[24px] font-light text-[#a4532f] transition-transform duration-250 group-open:rotate-45">
                      +
                    </span>
                  </summary>
                  <p className="text-[#7a6f60] text-[14.5px] font-light pt-3.5 leading-[1.75]">{faq.a}</p>
                </details>
              ))}
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
