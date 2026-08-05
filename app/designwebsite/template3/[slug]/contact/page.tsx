import { readSourceConfig } from '@/lib/dataBuilder';
import { notFound } from 'next/navigation';
import { MapPin, Phone, Clock, MessageCircle, Star } from 'lucide-react';
import { cleanClinicName } from '@/lib/copyCleaner';
import { INTERIOR_FAQS } from '@/lib/interiorContent';
import Reveal from '../Reveal';
import LeadForm from '../LeadForm';

type PageProps = { params: Promise<{ slug: string }> };

export default async function Template3Contact({ params }: PageProps) {
  const { slug } = await params;

  const data = await readSourceConfig(slug, 'template3');
  if (!data) return notFound();

  const { clinic, business } = data;
  const cleanName = cleanClinicName(clinic.name);
  const city = clinic.address?.city || 'Chennai';
  const phone = clinic.contact?.phone || '';
  const whatsapp = phone;
  const fullAddress = clinic.address?.full || `${city}`;
  const hours = 'Mon–Sun · 9:30 AM – 8:00 PM';
  const rating = business.rating || 4.9;
  const reviewCount = business.reviewCount || 40;
  const faqs = INTERIOR_FAQS;
  const waPhone = (whatsapp || '').replace(/[^0-9]/g, '');

  const mapQuery = encodeURIComponent(fullAddress || `${cleanName} ${city}`);

  const contactCards = [
    { icon: MapPin, label: 'Visit our studio', value: fullAddress },
    ...(phone ? [{ icon: Phone, label: 'Call us', value: phone, href: `tel:${phone.replace(/\s/g, '')}` }] : []),
    { icon: Clock, label: 'Working hours', value: hours },
    ...(whatsapp
      ? [
          {
            icon: MessageCircle,
            label: 'WhatsApp',
            value: 'Chat with a designer now',
            href: `https://wa.me/${whatsapp.replace(/[^0-9]/g, '')}`,
          },
        ]
      : []),
  ];

  return (
    <div>
      {/* HERO + FORM */}
      <section id="contact-hero" className="px-7 py-[clamp(56px,7vw,88px)]">
        <div className="max-w-[1220px] mx-auto grid lg:grid-cols-[1.05fr_0.95fr] gap-11 lg:gap-16 items-start">
          <Reveal>
            <div className="flex items-center gap-2.5 text-[12px] font-extrabold tracking-[0.22em] uppercase text-[#d8442c] before:content-[''] before:w-6 before:h-[2.5px] before:rounded before:bg-[#d8442c]">
              Let&apos;s talk about your home
            </div>
            <h1 className="text-[clamp(32px,4.6vw,54px)] font-extrabold mt-3.5 tracking-[-0.02em] leading-[1.12]">
              Start with a{' '}
              <span className="font-[family-name:var(--font-newsreader)] italic font-medium text-[#d8442c]">
                design consultation
              </span>
            </h1>
            <p className="mt-4.5 max-w-[560px] text-[#6d6259] text-[16px]">
              Tell us about your home and budget. A designer from {cleanName || 'our studio'} will call you back within a
              few working hours.
            </p>

            <div className="mt-7 inline-flex items-center gap-3 bg-white border border-[#241f1a]/10 rounded-2xl px-5 py-3.5 shadow-[0_14px_30px_-16px_rgba(29,23,19,0.25)]">
              <span className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-[#f4b942] text-[#f4b942]" />
                ))}
              </span>
              <span className="text-[13.5px] font-extrabold">
                {rating} rated · {reviewCount}+ Google reviews
              </span>
            </div>

            <div className="mt-8 grid sm:grid-cols-2 gap-4">
              {contactCards.map((card) => {
                const Icon = card.icon;
                const inner = (
                  <>
                    <span className="w-11 h-11 rounded-xl bg-[#d8442c]/10 text-[#d8442c] grid place-items-center shrink-0">
                      <Icon className="w-5 h-5" strokeWidth={2.2} />
                    </span>
                    <span>
                      <b className="block text-[13px] uppercase tracking-[0.1em] text-[#6d6259] font-extrabold mb-1">
                        {card.label}
                      </b>
                      <span className="text-[14px] font-bold leading-snug">{card.value}</span>
                    </span>
                  </>
                );
                const cls =
                  'flex gap-3.5 items-start bg-white border border-[#241f1a]/8 rounded-2xl p-4.5 transition-all duration-250 hover:-translate-y-0.5 hover:shadow-[0_16px_32px_-18px_rgba(29,23,19,0.3)]';
                return 'href' in card && card.href ? (
                  <a key={card.label} href={card.href} target={card.href.startsWith('http') ? '_blank' : undefined} className={cls}>
                    {inner}
                  </a>
                ) : (
                  <div key={card.label} className={cls}>
                    {inner}
                  </div>
                );
              })}
            </div>
          </Reveal>

          <Reveal delay={130}>
            <LeadForm studioName={cleanName || 'the studio'} waPhone={waPhone} city={city} />
          </Reveal>
        </div>
      </section>

      {/* MAP */}
      <section id="map" className="px-7 pb-[clamp(48px,6vw,72px)]">
        <div className="max-w-[1220px] mx-auto">
          <Reveal>
            <div className="rounded-[20px] overflow-hidden border border-[#241f1a]/10 shadow-[0_24px_50px_-24px_rgba(29,23,19,0.35)]">
              <iframe
                title={`Map showing location of ${cleanName || 'our studio'}`}
                src={clinic.mapEmbedUrl || `https://www.google.com/maps?q=${mapQuery}&output=embed`}
                className="w-full h-[380px] border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="px-7 py-[clamp(56px,7vw,88px)] bg-white">
        <div className="max-w-[860px] mx-auto">
          <Reveal>
            <div className="text-center mb-10">
              <div className="inline-flex items-center gap-2.5 text-[12px] font-extrabold tracking-[0.22em] uppercase text-[#d8442c]">
                Common questions
              </div>
              <h2 className="text-[clamp(26px,3.6vw,42px)] font-extrabold mt-3 tracking-[-0.02em]">
                Before you{' '}
                <span className="font-[family-name:var(--font-newsreader)] italic font-medium text-[#d8442c]">reach out</span>
              </h2>
            </div>
          </Reveal>
          <div className="grid gap-3.5">
            {faqs.map((faq, idx) => (
              <Reveal key={faq.q} delay={idx * 60}>
                <details className="group bg-[#fbf7f2] border border-[#241f1a]/8 rounded-2xl overflow-hidden">
                  <summary className="flex justify-between items-center gap-4 cursor-pointer list-none px-5.5 py-4.5 text-[15px] font-extrabold [&::-webkit-details-marker]:hidden">
                    {faq.q}
                    <span className="w-7 h-7 shrink-0 rounded-full border border-[#241f1a]/15 grid place-items-center text-[15px] font-bold transition-transform duration-250 group-open:rotate-45 group-open:bg-[#d8442c] group-open:border-[#d8442c] group-open:text-white">
                      +
                    </span>
                  </summary>
                  <p className="px-5.5 pb-5 text-[14px] text-[#6d6259] leading-[1.7] -mt-1">{faq.a}</p>
                </details>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
