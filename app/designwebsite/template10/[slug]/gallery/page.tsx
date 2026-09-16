import { readSourceConfig } from '@/lib/dataBuilder';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { cleanClinicName } from '@/lib/copyCleaner';
import { ARCHITECTURE_STOCK } from '@/lib/architectureContent';
import CuratedWorks from '../CuratedWorks';
import { Cinzel } from 'next/font/google';

const cinzel = Cinzel({ subsets: ['latin'], weight: ['600', '700', '800'] });

type PageProps = { params: Promise<{ slug: string }> };

export default async function Template10Gallery({ params }: PageProps) {
  const { slug } = await params;
  const basePath = `/designwebsite/template10/${slug}`;

  const data = await readSourceConfig(slug, 'template10');
  if (!data) return notFound();

  const { clinic } = data;
  const cleanName = cleanClinicName(clinic.name);

  return (
    <div className="bg-[#faf8f5]">
      {/* Header Banner */}
      <section className="py-20 sm:py-28 bg-[#111111] text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-25 pointer-events-none">
          <Image
            src={ARCHITECTURE_STOCK.gallery[0]}
            alt="Gallery Monograph"
            fill
            className="object-cover"
            priority
          />
        </div>

        <div className="relative z-10 max-w-[1360px] mx-auto px-5 sm:px-8 text-center flex flex-col items-center">
          <span className="text-[11px] tracking-[0.35em] uppercase font-bold text-[#c5a47e] mb-3">
            Architectural Portfolio
          </span>
          <h1
            className={`${cinzel.className} text-[34px] sm:text-[48px] lg:text-[58px] font-bold text-white tracking-tight leading-tight max-w-4xl`}
          >
            Curated Architectural Archive
          </h1>
          <p className="mt-5 text-[15px] sm:text-[17px] text-[#cfcac2] max-w-2xl font-light leading-relaxed">
            Explore our built oeuvre across ultra-luxury coastal villas, private family estates, double-height interior atriums, and monolithic structural frames.
          </p>
        </div>
      </section>

      {/* Main Works Grid */}
      <CuratedWorks basePath={basePath} />

      {/* Additional Architectural Captures Strip */}
      <section className="py-20 sm:py-28 bg-[#f5f2ea] border-t border-[#141414]/10">
        <div className="max-w-[1360px] mx-auto px-5 sm:px-8">
          <div className="text-center mb-12">
            <span className="text-[11px] tracking-[0.32em] uppercase font-bold text-[#b89568]">
              Atelier Archive
            </span>
            <h2
              className={`${cinzel.className} mt-2.5 text-[26px] sm:text-[34px] font-bold text-[#141414] leading-tight`}
            >
              Materiality & Structural Vignettes
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {ARCHITECTURE_STOCK.gallery.slice(4, 12).map((img, idx) => (
              <div
                key={idx}
                className="relative aspect-square overflow-hidden border border-[#141414]/10 shadow-sm group bg-black/5"
              >
                <Image
                  src={img}
                  alt={`Architectural detail ${idx + 1}`}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                  sizes="(max-width: 768px) 50vw, 25vw"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-20 bg-[#111111] text-white">
        <div className="max-w-[1000px] mx-auto px-5 sm:px-8 text-center flex flex-col items-center">
          <h2
            className={`${cinzel.className} text-[28px] sm:text-[38px] font-bold text-white leading-tight`}
          >
            Envisioning a Similar Residence?
          </h2>
          <p className="mt-4 text-[15px] text-[#cfcac2] max-w-xl">
            Our atelier reviews new commissions by appointment. Schedule a confidential feasibility session.
          </p>
          <div className="mt-8">
            <Link
              href={`${basePath}/contact`}
              className="bg-[#c5a47e] text-[#111111] px-8 py-4 text-[11px] tracking-[0.22em] uppercase font-bold hover:bg-[#d9bb93] transition-colors shadow-lg"
            >
              Contact the Atelier
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
