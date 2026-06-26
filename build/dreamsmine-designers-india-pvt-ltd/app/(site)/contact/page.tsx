import { readSourceConfig } from '@/lib/sourceData';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Mail, MapPin, Phone, MessageSquare } from 'lucide-react';
import { cleanClinicName } from '@/lib/copyCleaner';

type PageProps = {
  params?: Promise<{ slug?: string }>;
};

export default async function ContactPage({ params }: PageProps) {
  const resolvedParams = params ? await params : {};
  const data = await readSourceConfig(resolvedParams.slug, 'template1');
  if (!data) return notFound();

  const { clinic, business } = data;
  const cleanName = cleanClinicName(clinic.name);
  
  const phone1 = clinic.contact?.phone || '+91 766 00046';
  const phone2 = clinic.contact?.phone2 || '+91 766 00047';
  const landline = clinic.contact?.landline || '044-3569 9281';
  
  const email1 = clinic.contact?.email || 'info@dreamsminedesigners.com';
  const email2 = clinic.contact?.email2 || 'dreamsminedesigners2021@gmail.com';
  
  const waPhone = phone1.replace(/\D/g, '') || '9176600046';
  const waLink = `https://wa.me/${waPhone}?text=${encodeURIComponent(`Hi ${cleanName}, I want to discuss a home design and construction project.`)}`;

  return (
    <div className="bg-[var(--paper)] min-h-screen pb-16 md:pb-24">
      {/* Hero Section */}
      <section className="pt-8 pb-12">
        <div className="site-grid">
          <div className="bg-[var(--white)] rounded-3xl border border-[var(--line-strong)] shadow-sm p-8 md:p-16 text-center max-w-4xl mx-auto">
            <span className="inline-block bg-[var(--safety)] text-black px-4 py-2 text-xs font-black uppercase tracking-[0.2em] rounded-full mb-6">PROJECT BRIEF</span>
            <h1 className="text-[2.75rem] font-black uppercase leading-[0.86] tracking-[-0.065em] sm:text-6xl md:text-7xl mb-6">
              Start with scope, site and budget clarity.
            </h1>
            <p className="text-xl font-medium text-black/68 leading-8 max-w-2xl mx-auto">
              Tell us what you want to build, renovate or visualize. Share the plot status, desired square footage, Vastu expectations, timeline and interior scope so the first conversation is useful.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="site-grid">
          <div className="grid gap-6 lg:grid-cols-[0.82fr_1.18fr] items-start">
            
            <aside className="grid content-start gap-4">
              <div className="bg-[var(--white)] rounded-3xl border border-[var(--line-strong)] p-8 shadow-sm flex flex-col gap-8">
                
                {/* Phone Numbers */}
                <div className="flex gap-4">
                  <div className="h-12 w-12 rounded-full bg-[var(--paper)] flex items-center justify-center shrink-0">
                    <Phone className="h-5 w-5 text-[var(--oxide)]" />
                  </div>
                  <div>
                    <p className="text-[0.65rem] font-black uppercase tracking-[0.15em] text-[var(--oxide)] mb-2">CALL DIRECTLY</p>
                    <div className="flex flex-col gap-1">
                      <a href={`tel:${phone1}`} className="text-lg font-black uppercase tracking-[-0.02em] hover:text-[var(--oxide)] transition-colors">{phone1}</a>
                      <a href={`tel:${phone2}`} className="text-lg font-black uppercase tracking-[-0.02em] hover:text-[var(--oxide)] transition-colors">{phone2}</a>
                      <a href={`tel:${landline}`} className="text-lg font-black uppercase tracking-[-0.02em] hover:text-[var(--oxide)] transition-colors">{landline}</a>
                    </div>
                  </div>
                </div>

                {/* Emails */}
                <div className="flex gap-4 border-t border-[var(--line-strong)] pt-6">
                  <div className="h-12 w-12 rounded-full bg-[var(--paper)] flex items-center justify-center shrink-0">
                    <Mail className="h-5 w-5 text-[var(--oxide)]" />
                  </div>
                  <div>
                    <p className="text-[0.65rem] font-black uppercase tracking-[0.15em] text-[var(--oxide)] mb-2">EMAIL BRIEF</p>
                    <div className="flex flex-col gap-1">
                      <a href={`mailto:${email1}`} className="text-base font-bold text-black/80 hover:text-[var(--oxide)] transition-colors">{email1}</a>
                      <a href={`mailto:${email2}`} className="text-base font-bold text-black/80 hover:text-[var(--oxide)] transition-colors">{email2}</a>
                    </div>
                  </div>
                </div>

                {/* Location */}
                <div className="flex gap-4 border-t border-[var(--line-strong)] pt-6">
                  <div className="h-12 w-12 rounded-full bg-[var(--paper)] flex items-center justify-center shrink-0">
                    <MapPin className="h-5 w-5 text-[var(--oxide)]" />
                  </div>
                  <div>
                    <p className="text-[0.65rem] font-black uppercase tracking-[0.15em] text-[var(--oxide)] mb-2">STUDIO LOCATION</p>
                    <p className="text-base font-medium leading-7 text-black/80">{clinic.address?.full}</p>
                  </div>
                </div>

              </div>

              <div className="bg-[var(--ink)] p-8 rounded-3xl shadow-xl text-[var(--white)] text-center">
                <p className="inline-block bg-[var(--safety)] text-black px-3 py-1 text-[0.65rem] font-black uppercase tracking-[0.15em] rounded-full mb-4">BUILD RATE SIGNAL</p>
                <p className="text-4xl sm:text-5xl font-black uppercase tracking-[-0.05em] mb-4">Rs.{business.pricePerSqft || '2200'} <span className="text-2xl">/ sqft</span></p>
                <p className="text-sm font-medium leading-6 text-white/62 border-t border-white/20 pt-4">Use this as a starting reference. Final estimates depend on site, scope and specification.</p>
              </div>
            </aside>

            <div className="bg-[var(--white)] rounded-3xl border border-[var(--line-strong)] shadow-sm p-6 sm:p-10">
              <div className="grid gap-6 border-b border-[var(--line-strong)] pb-8 lg:grid-cols-[0.5fr_1fr] mb-8">
                <div>
                  <span className="eyebrow">CONSULTATION FORM</span>
                  <h2 className="mt-4 text-4xl font-black uppercase leading-[0.9] tracking-[-0.055em]">Send a structured project brief.</h2>
                </div>
                <div className="flex flex-col justify-end">
                  <p className="text-lg font-medium text-black/68">
                    Fill out the form below to receive an instant free quotation. Direct WhatsApp and phone actions are also active for immediate enquiry.
                  </p>
                </div>
              </div>

              <div className="flex justify-center w-full bg-[var(--paper)] py-6 rounded-2xl border border-[var(--line)]">
                <iframe src="https://docs.google.com/forms/d/e/1FAIpQLSdsYUIz-6IWzBpZXEpOIrAiVt1iiD8lRr3Gto5o7zjz0Ubq8Q/viewform?embedded=true" width="640" height="826" frameBorder="0" marginHeight={0} marginWidth={0} className="w-full max-w-[640px]">Loading…</iframe>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WhatsApp Fast Action */}
      <section className="py-12">
        <div className="site-grid">
          <div className="bg-[var(--oxide)] rounded-3xl p-8 md:p-16 text-white flex flex-col md:flex-row items-center justify-between gap-8 shadow-xl">
            <div className="max-w-xl">
              <span className="inline-block bg-white/20 text-white px-4 py-2 text-xs font-black uppercase tracking-[0.2em] rounded-full mb-6">FAST ACTION</span>
              <h2 className="text-4xl sm:text-5xl font-black uppercase tracking-[-0.05em] leading-[0.9] mb-4">Need a quick response?</h2>
              <p className="text-lg font-medium text-white/80">
                WhatsApp is the fastest route for first project scoping. Send your plot size, location and desired services. The team can then guide the next consultation step.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 shrink-0 w-full md:w-auto">
              <a href={waLink} target="_blank" rel="noreferrer" className="bg-[var(--white)] text-[var(--oxide)] hover:bg-[var(--paper)] transition-colors px-8 py-4 rounded-xl font-bold text-center flex items-center justify-center gap-2">
                <MessageSquare className="h-5 w-5" />
                WhatsApp Details
              </a>
              <Link href={`tel:${phone1}`} className="bg-transparent border-2 border-white/30 hover:border-white text-white transition-colors px-8 py-4 rounded-xl font-bold text-center">
                Call Now
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
