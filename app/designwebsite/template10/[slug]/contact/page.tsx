import { readSourceConfig } from '@/lib/dataBuilder';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  MessageSquare,
  ShieldCheck,
  Building2,
  ArrowUpRight,
} from 'lucide-react';
import { cleanClinicName } from '@/lib/copyCleaner';
import { ARCHITECTURE_STOCK } from '@/lib/architectureContent';
import LeadForm from '../LeadForm';
import { Cinzel } from 'next/font/google';

const cinzel = Cinzel({ subsets: ['latin'], weight: ['600', '700', '800'] });

type PageProps = {
  params: Promise<{ slug: string }>;
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function Template10Contact({ params, searchParams }: PageProps) {
  const { slug } = await params;
  const sParams = searchParams ? await searchParams : {};
  const projectParam = typeof sParams?.project === 'string' ? sParams.project : undefined;
  const serviceParam = typeof sParams?.service === 'string' ? sParams.service : undefined;

  const defaultSelection = projectParam || serviceParam || 'Independent Luxury Villa';

  const data = await readSourceConfig(slug, 'template10');
  if (!data) return notFound();

  const { clinic } = data;
  const cleanName = cleanClinicName(clinic.name);
  const phone = clinic.contact?.phone || '+91 93103 59993';
  const address = clinic.address?.full || '74, G1, Sai Nagar, Chennai, Tamil Nadu';
  const mapEmbedUrl =
    clinic.mapEmbedUrl ||
    'https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d3000!2d80.1964698!3d13.0602586!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1';

  const waPhone = phone.replace(/\D/g, '') || '919310359993';
  const waUrl = `https://wa.me/${waPhone}?text=${encodeURIComponent(
    `Hello ${cleanName || 'Atelier'}, I would like to schedule an architectural consultation regarding our project.`
  )}`;

  return (
    <div className="bg-[#faf8f5]">
      {/* Header Banner */}
      <section className="py-20 sm:py-28 bg-[#111111] text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-25 pointer-events-none">
          <Image
            src={ARCHITECTURE_STOCK.studio[0]}
            alt="Atelier Headquarters"
            fill
            className="object-cover"
            priority
          />
        </div>

        <div className="relative z-10 max-w-[1360px] mx-auto px-5 sm:px-8 text-center flex flex-col items-center">
          <span className="text-[11px] tracking-[0.35em] uppercase font-bold text-[#c5a47e] mb-3">
            Atelier Headquarters & Consultations
          </span>
          <h1
            className={`${cinzel.className} text-[34px] sm:text-[48px] lg:text-[58px] font-bold text-white tracking-tight leading-tight max-w-4xl`}
          >
            Initiate a Private Commission
          </h1>
          <p className="mt-5 text-[15px] sm:text-[17px] text-[#cfcac2] max-w-2xl font-light leading-relaxed">
            Connect directly with our principal architects and engineering directors for confidential site evaluations and architectural commissions.
          </p>
        </div>
      </section>

      {/* Main Content Grid */}
      <section className="py-20 sm:py-28">
        <div className="max-w-[1360px] mx-auto px-5 sm:px-8">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Form Column */}
            <div className="lg:col-span-7">
              <LeadForm
                clinicName={cleanName}
                phone={phone}
                defaultProject={defaultSelection}
              />
            </div>

            {/* Studio Info Column */}
            <div className="lg:col-span-5 space-y-8">
              {/* Studio Details Card */}
              <div className="bg-[#f5f2ea] border border-[#141414]/10 p-7 sm:p-9 shadow-sm">
                <span className="text-[10.5px] tracking-[0.25em] uppercase font-bold text-[#b89568] block mb-2">
                  Headquarters & Practice
                </span>
                <h3 className={`${cinzel.className} text-[22px] font-bold text-[#141414]`}>
                  {cleanName || 'Architectural Atelier'}
                </h3>

                <div className="mt-6 space-y-4 text-[13.5px] text-[#5a544c]">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-4 h-4 text-[#b89568] shrink-0 mt-1" />
                    <div>
                      <div className="font-semibold text-[#141414]">Studio Address</div>
                      <div className="mt-0.5 leading-relaxed">{address}</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Phone className="w-4 h-4 text-[#b89568] shrink-0 mt-1" />
                    <div>
                      <div className="font-semibold text-[#141414]">Telephone Consultation</div>
                      <a href={`tel:${phone}`} className="mt-0.5 block hover:text-[#b89568] transition-colors">
                        {phone}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Clock className="w-4 h-4 text-[#b89568] shrink-0 mt-1" />
                    <div>
                      <div className="font-semibold text-[#141414]">Consultation Hours</div>
                      <div className="mt-0.5">Monday – Saturday: 9:30 AM – 7:30 PM</div>
                      <div className="text-[11.5px] text-[#7a746d]">By Confirmed Appointment Only</div>
                    </div>
                  </div>
                </div>

                {/* Direct WhatsApp Concierge */}
                <div className="mt-8 pt-6 border-t border-[#141414]/10">
                  <a
                    href={waUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 bg-[#141414] text-[#faf8f5] py-3.5 text-[11px] tracking-[0.22em] uppercase font-bold hover:bg-[#c5a47e] hover:text-[#141414] transition-colors"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>WhatsApp Atelier Concierge</span>
                  </a>
                </div>
              </div>

              {/* Dedicated Channels */}
              <div className="bg-[#faf8f5] border border-[#141414]/10 p-7">
                <span className="text-[10px] tracking-[0.25em] uppercase font-bold text-[#b89568] block mb-3">
                  Direct Inquiries Directory
                </span>
                <div className="space-y-3 text-[12.5px] divide-y divide-[#141414]/10">
                  <div className="pt-2">
                    <div className="font-bold text-[#141414]">New Commissions & Feasibility</div>
                    <div className="text-[#7a746d]">commissions@{slug}.inquiry.studio</div>
                  </div>
                  <div className="pt-2">
                    <div className="font-bold text-[#141414]">Media & Architectural Publications</div>
                    <div className="text-[#7a746d]">press@{slug}.inquiry.studio</div>
                  </div>
                  <div className="pt-2">
                    <div className="font-bold text-[#141414]">Contractor & Material Vendors</div>
                    <div className="text-[#7a746d]">procurement@{slug}.inquiry.studio</div>
                  </div>
                </div>
              </div>

              {/* Map Embed */}
              <div className="border border-[#141414]/15 overflow-hidden shadow-sm aspect-[16/9] w-full">
                <iframe
                  src={mapEmbedUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Studio Location"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
