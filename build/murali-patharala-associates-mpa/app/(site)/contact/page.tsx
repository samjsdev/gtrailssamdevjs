import { readSourceConfig } from '@/lib/sourceData';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

interface PageProps {
  params?: any;
}

export default async function ContactPage({ params }: PageProps) {
  const data = await readSourceConfig(undefined, 'template5');

  if (!data || !data.clinic) {
    notFound();
  }

  const phone = '09841098490';
  const displayPhone = '+91 98410 98490';
  const rawDigits = phone.replace(/\D/g, '');
  const cleanPhone = rawDigits.startsWith('91') ? rawDigits : `91${rawDigits.replace(/^0+/, '')}`;

  const address = 'W115A, 3rd Ave, Annanagar East, Chennai, Tamil Nadu 600040';
  const mapEmbedUrl = data.clinic.mapEmbedUrl || 'https://maps.google.com/maps?q=murali%20patharala%20%26%20associates%20(%20mpa)%20W115A%2C%203rd%20Ave%2C%20Annanagar%20East%2C%20Chennai%2C%20Tamil%20Nadu%20600040&output=embed';

  const faqs = [
    {
      q: 'What is included in your 10-Year Structural Guarantee?',
      a: 'We provide a legally binding 10-year structural certificate covering foundation, RCC columns, beams, roof slabs, and load-bearing masonry against structural settlement or cracks. We strictly utilize primary TMT steel (Tata Tiscon / JSW) and 53-grade certified cement.',
    },
    {
      q: 'How does the Zero Cost Escalation & Fixed-Price Guarantee work?',
      a: 'Before breaking ground, our civil engineers prepare an exhaustive Bill of Quantities (BOQ) covering every bag of cement, ton of steel, plumbing conduit, and tile. Once signed, your price per square foot is 100% frozen. We absorb all market material inflation.',
    },
    {
      q: 'Do you provide CMDA and Corporation plan approvals in Chennai?',
      a: 'Yes. Our in-house architectural team handles the entire statutory sanction process with CMDA and Greater Chennai Corporation, ensuring full compliance with setback regulations, FSI norms, and structural safety bylaws.',
    },
    {
      q: 'Can we hire you for Architectural Planning or Interiors only?',
      a: 'Yes. While over 80% of our clients select our full Turnkey Construction package (from soil testing to key handover), we also accept standalone Architectural 3D Elevation & Planning commissions, as well as Modular Interior Fit-outs.',
    },
    {
      q: 'How do you monitor daily construction quality on-site?',
      a: 'We assign a dedicated, full-time Civil Engineer to your site every single day. You receive weekly photo and video milestone progress reports via WhatsApp with live compressive cube test certificates and material verification slips.',
    },
  ];

  return (
    <div className="w-full bg-[#FAFAFA] text-[#111111]">
      {/* ── Hero Banner ── */}
      <section className="py-20 md:py-28 bg-[#111111] text-white border-b-4 border-[#111111] px-6 md:px-12 text-center">
        <div className="max-w-4xl mx-auto space-y-6">
          <p className="text-xs font-bold tracking-[0.25em] uppercase text-[#EA580C]">
            Direct Consultation
          </p>
          <h1
            className="text-4xl sm:text-5xl md:text-6xl font-bold font-serif leading-tight tracking-tight"
            style={{ fontFamily: "'Lora', serif" }}
          >
            Connect With Our Senior Architectural Team.
          </h1>
          <p className="text-base sm:text-lg text-white/75 font-medium max-w-2xl mx-auto leading-relaxed">
            Visit our studio in Anna Nagar East or schedule a free site feasibility inspection anywhere in Chennai.
          </p>
        </div>
      </section>

      {/* ── Studio Information & Map Grid ── */}
      <section className="py-20 md:py-28 px-6 md:px-12 border-b-4 border-[#111111] bg-white">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-stretch">
          {/* Studio Coordinates */}
          <div className="border-4 border-[#111111] p-8 md:p-12 bg-[#FAFAFA] flex flex-col justify-between space-y-8 shadow-xl">
            <div>
              <span className="text-xs font-bold tracking-[0.2em] uppercase text-[#EA580C] block mb-2">
                Office Location
              </span>
              <h2
                className="text-2xl sm:text-3xl font-bold font-serif text-[#111111] mb-6"
                style={{ fontFamily: "'Lora', serif" }}
              >
                Anna Nagar East Studio
              </h2>

              <div className="space-y-6 text-sm">
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-[#757575] mb-1">
                    Physical Address
                  </p>
                  <p className="text-base font-bold text-[#111111] leading-relaxed">
                    {address}
                  </p>
                </div>

                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-[#757575] mb-1">
                    Consultation Direct Line
                  </p>
                  <a
                    href={`tel:${displayPhone}`}
                    className="text-2xl font-bold font-serif text-[#EA580C] hover:text-[#111111] transition-colors block"
                    style={{ fontFamily: "'Lora', serif" }}
                  >
                    {displayPhone}
                  </a>
                </div>

                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-[#757575] mb-1">
                    Operating Hours
                  </p>
                  <p className="text-sm font-bold text-[#111111]">
                    Monday – Saturday: 9:30 AM – 7:30 PM
                  </p>
                  <p className="text-xs text-[#757575] mt-0.5">
                    Sunday: By Prior Appointment Only
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t-2 border-[#E0E0E0] flex flex-wrap gap-4">
              <a
                href={`https://wa.me/${cleanPhone}?text=${encodeURIComponent('Hi Murali Patharala Associates (MPA), I would like to book an in-person consultation.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3.5 bg-[#EA580C] text-[#111111] font-bold uppercase tracking-widest text-xs hover:bg-[#111111] hover:text-white transition-colors text-center flex-1"
              >
                WhatsApp Principal Architect
              </a>
              <a
                href={`tel:${displayPhone}`}
                className="px-6 py-3.5 border-2 border-[#111111] text-[#111111] font-bold uppercase tracking-widest text-xs hover:bg-[#111111] hover:text-white transition-colors text-center"
              >
                Call Studio
              </a>
            </div>
          </div>

          {/* Interactive Google Map Embed */}
          <div className="border-4 border-[#111111] bg-[#111111] min-h-[450px] relative overflow-hidden shadow-xl">
            <iframe
              src={mapEmbedUrl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Murali Patharala Associates Anna Nagar Location"
              className="absolute inset-0 w-full h-full grayscale-[0.3] contrast-[1.1]"
            />
            <div className="absolute bottom-4 left-4 right-4 bg-[#111111]/95 text-white p-4 border border-[#333333] flex items-center justify-between pointer-events-none">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-[#EA580C]">Murali Patharala Associates</p>
                <p className="text-[11px] text-white/70">W115A, 3rd Ave, Annanagar East</p>
              </div>
              <span className="text-xs text-[#EA580C] font-bold uppercase">Anna Nagar, Chennai</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Architectural FAQ Section ── */}
      <section className="py-20 md:py-28 px-6 md:px-12 border-b-4 border-[#111111] bg-[#FAFAFA]">
        <div className="max-w-4xl mx-auto space-y-12">
          <div className="text-center">
            <p className="text-xs font-bold tracking-[0.2em] uppercase text-[#EA580C] mb-3">FAQ</p>
            <h2
              className="text-3xl sm:text-4xl font-bold font-serif text-[#111111]"
              style={{ fontFamily: "'Lora', serif" }}
            >
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-6">
            {faqs.map((faq, idx) => (
              <div key={idx} className="p-8 border-2 border-[#111111] bg-white space-y-3">
                <h3
                  className="text-lg sm:text-xl font-bold font-serif text-[#111111]"
                  style={{ fontFamily: "'Lora', serif" }}
                >
                  {faq.q}
                </h3>
                <p className="text-sm text-[#757575] leading-relaxed font-medium">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
