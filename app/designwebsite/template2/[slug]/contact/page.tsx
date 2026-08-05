import { readSourceConfig } from '@/lib/dataBuilder';
import { notFound } from 'next/navigation';
import { MapPin, Phone, Clock, MessageCircle } from 'lucide-react';
import { cleanClinicName } from '@/lib/copyCleaner';
import { INTERIOR_FAQS } from '@/lib/interiorContent';
import Reveal from '../Reveal';
import LeadForm from '../LeadForm';

type PageProps = { params: Promise<{ slug: string }> };

export default async function Template2Contact({ params }: PageProps) {
  const { slug } = await params;

  const data = await readSourceConfig(slug, 'template2');
  if (!data) return notFound();

  const { clinic } = data;
  const cleanName = cleanClinicName(clinic.name);
  const city = clinic.address?.city || 'Chennai';
  const phone = clinic.contact?.phone || '';
  const address = clinic.address?.full || '';
  const waPhone = phone.replace(/\D/g, '') || '919751396117';
  const waLink = `https://wa.me/${waPhone}?text=${encodeURIComponent(
    `Hi, I'm interested in a design consultation with ${cleanName || 'your studio'}!`
  )}`;

  const mapUrl =
    clinic.mapEmbedUrl ||
    `https://maps.google.com/maps?q=${encodeURIComponent((cleanName || '') + ' ' + address)}&output=embed`;

  const cards = [
    { icon: MapPin, title: 'Visit the Studio', body: address || `${city}, Tamil Nadu`, href: null },
    ...(phone ? [{ icon: Phone, title: 'Call Us', body: phone, href: `tel:${phone}` }] : []),
    { icon: MessageCircle, title: 'WhatsApp', body: 'Usually replies in minutes', href: waLink },
    { icon: Clock, title: 'Open Hours', body: 'Mon – Sat, 10 AM – 7 PM', href: null },
  ];

  return (
    <div>
      {/* PAGE HERO + FORM */}
      <section id="contact-hero" className="bg-[#faf7f1] px-6 py-[clamp(60px,7vw,96px)]">
        <div className="max-w-[1240px] mx-auto grid lg:grid-cols-[1.05fr_0.95fr] gap-[clamp(36px,5vw,64px)] items-start">
          <Reveal>
            <span className="inline-flex items-center gap-2.5 bg-white border border-[#1b1b1b]/10 rounded-full px-4.5 py-2 text-[12px] font-bold tracking-[0.14em] uppercase text-[#0e5a43] mb-6 before:content-[''] before:w-2 before:h-2 before:rounded-full before:bg-[#f2a007]">
              Design consultation
            </span>
            <h1 className="font-[family-name:var(--font-bricolage)] font-bold text-[clamp(34px,4.6vw,58px)] leading-[1.06] tracking-[-0.02em]">
              Your dream home is <mark className="bg-[linear-gradient(transparent_62%,#fdeecb_62%)] text-[#0e5a43] px-0.5">one conversation away</mark>
            </h1>
            <p className="mt-5 max-w-[520px] text-[#6b6660] text-[16.5px] leading-[1.7] font-medium mb-8">
              Designs, 3D views and an exact quote for your floor plan. A designer (not a call centre) will reach out.
            </p>

            <div className="grid sm:grid-cols-2 gap-4">
              {cards.map((card) => {
                const Icon = card.icon;
                const inner = (
                  <div className="flex gap-4 items-start bg-white border border-[#1b1b1b]/10 rounded-[18px] px-5 py-4.5 h-full transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_60px_rgba(27,27,27,0.10)]">
                    <span className="w-11 h-11 shrink-0 rounded-[13px] bg-[#fdeecb] grid place-items-center">
                      <Icon className="w-5 h-5 text-[#f2a007]" strokeWidth={2} />
                    </span>
                    <span>
                      <b className="font-[family-name:var(--font-bricolage)] font-bold text-[16px] block mb-0.5">{card.title}</b>
                      <span className="text-[13px] text-[#6b6660] font-semibold leading-snug">{card.body}</span>
                    </span>
                  </div>
                );
                return card.href ? (
                  <a key={card.title} href={card.href} target={card.href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer">
                    {inner}
                  </a>
                ) : (
                  <div key={card.title}>{inner}</div>
                );
              })}
            </div>
          </Reveal>

          <Reveal delay={120} className="lg:sticky lg:top-28">
            <LeadForm studioName={cleanName || 'the studio'} waPhone={waPhone} />
          </Reveal>
        </div>
      </section>

      {/* MAP */}
      <section id="map" className="px-6 py-[clamp(56px,6vw,88px)] bg-white">
        <div className="max-w-[1240px] mx-auto">
          <Reveal>
            <div className="rounded-[26px] overflow-hidden border border-[#1b1b1b]/10 shadow-[0_24px_60px_rgba(27,27,27,0.08)]">
              <iframe
                src={mapUrl}
                width="100%"
                height="420"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title={`Location of ${cleanName || 'our studio'}`}
                className="w-full block"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="px-6 py-[clamp(64px,7vw,96px)] bg-[#faf7f1]">
        <div className="max-w-[820px] mx-auto">
          <Reveal>
            <h2 className="font-[family-name:var(--font-bricolage)] font-bold text-[clamp(28px,3.6vw,46px)] tracking-[-0.02em] text-center mb-10">
              Before you ask
            </h2>
          </Reveal>
          <Reveal>
            {INTERIOR_FAQS.map((faq, idx) => (
              <details
                key={idx}
                open={idx === 0}
                className="group bg-white border border-[#1b1b1b]/10 rounded-2xl mb-3 overflow-hidden open:border-[#0e5a43] transition-colors duration-300"
              >
                <summary className="cursor-pointer list-none px-6.5 py-5.5 font-bold text-[15.5px] flex justify-between items-center gap-4 [&::-webkit-details-marker]:hidden">
                  {faq.q}
                  <span className="font-[family-name:var(--font-bricolage)] text-[24px] font-semibold text-[#0e5a43] transition-transform duration-300 group-open:rotate-45 shrink-0">+</span>
                </summary>
                <p className="px-6.5 pb-6 text-[#6b6660] text-[14.5px] font-medium leading-[1.75]">{faq.a}</p>
              </details>
            ))}
          </Reveal>
        </div>
      </section>
    </div>
  );
}
