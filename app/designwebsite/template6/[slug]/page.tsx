import { readSourceConfig } from '@/lib/dataBuilder';
import { notFound } from 'next/navigation';
import { Playfair_Display, Lato } from 'next/font/google';
import ClientHero from './ClientHero';
import {
  DEFAULT_INTERIOR_REVIEWS,
  DEFAULT_INTERIOR_SERVICES,
  INTERIOR_HERO_IMAGES,
  getInteriorServiceSummary,
  getInteriorServiceData,
} from '@/lib/interiorContent';

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

const lato = Lato({
  subsets: ['latin'],
  weight: ['300', '400', '700'],
  display: 'swap',
});

type PageProps = {
  params: Promise<{ slug: string }>;
};

export default async function DesignStudioHome({ params }: PageProps) {
  const resolvedParams = await params;
  const { slug } = resolvedParams;
  const basePath = `/designwebsite/template6/${slug}`;

  const data = await readSourceConfig(slug);
  if (!data) return notFound();

  const { clinic, doctor, business, media } = data;
  const heroImage = media?.clinicImages?.[0] || INTERIOR_HERO_IMAGES.home;
  const doctorImage = doctor?.images?.[0] || media?.otherImages?.[0] || INTERIOR_HERO_IMAGES.designer;

  const servicesList = business?.services?.length
    ? business.services
    : DEFAULT_INTERIOR_SERVICES;

  return (
    <div className="bg-[#1a1a1a] text-zinc-300">
      <ClientHero clinic={clinic} business={business} basePath={basePath} heroImage={heroImage} />

      {/* PHILOSOPHY / ABOUT */}
      <section id="about" className="py-24 md:py-32 px-6 bg-[#1a1a1a] border-b border-white/5">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-4">
              <div className="w-12 h-[1px] bg-zinc-600"></div>
              <span className="text-[10px] font-bold tracking-[0.3em] text-zinc-500 uppercase">
                Our Vision
              </span>
            </div>
            <h2 className={`${playfair.className} text-4xl md:text-5xl text-white leading-tight`}>
              Design is the silent ambassador of your brand.
            </h2>
            <p className="text-zinc-400 font-light leading-relaxed text-sm md:text-base">
              At {clinic.name || "our studio"}, we believe every space has a story waiting to be told. Our approach is deeply personal—stripping away the unnecessary to reveal the essential beauty of your environment. We focus on natural light, rich textures, and meaningful form.
            </p>
            <div className="pt-8 border-t border-white/10">
              <h3 className={`${playfair.className} text-xl text-white mb-2`}>{doctor?.name || "Lead Designer"}</h3>
              <p className="text-xs tracking-[0.1em] text-zinc-500 uppercase">{doctor?.specialization || "Principal Architect"}</p>
            </div>
          </div>
          <div className="relative">
            <div className="aspect-[3/4] overflow-hidden w-full max-w-md mx-auto">
              <img
                src={doctorImage}
                alt={doctor?.name || "Lead Designer"}
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000"
              />
            </div>
            <div className="absolute -bottom-8 -right-8 w-48 h-48 bg-[#222] border border-white/10 hidden md:flex items-center justify-center p-8 text-center text-xs tracking-widest leading-loose text-zinc-400">
              EST. <br />2024
            </div>
          </div>
        </div>
      </section>

      {/* EXPERTISE / SERVICES */}
      <section id="services" className="py-24 md:py-32 px-6 bg-[#121212]">
        <div className="max-w-7xl mx-auto">
          <div className="mb-20">
            <div className="inline-flex items-center gap-4 mb-4">
              <div className="w-12 h-[1px] bg-zinc-600"></div>
              <span className="text-[10px] font-bold tracking-[0.3em] text-zinc-500 uppercase">
                Expertise
              </span>
            </div>
            <h2 className={`${playfair.className} text-4xl md:text-5xl text-white`}>
              Curated Services
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-16">
            {servicesList.map((svc: string, i: number) => {
              const svcData = getInteriorServiceData(svc);
              const serviceImage = svcData?.image || INTERIOR_HERO_IMAGES.services;
              return (
                <div key={i} className="group border-t border-white/10 pt-8">
                  <div className="aspect-[4/3] overflow-hidden mb-8">
                    <img
                      src={serviceImage}
                      alt={svc}
                      className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                    />
                  </div>
                  <h3 className={`${playfair.className} text-2xl text-white mb-4`}>{svc}</h3>
                  <p className="text-zinc-500 font-light text-sm leading-relaxed mb-6">
                    {svcData?.description || getInteriorServiceSummary(svc)}
                  </p>
                  <a href="#contact" className="text-[10px] font-bold tracking-[0.2em] uppercase text-zinc-400 group-hover:text-white transition-colors border-b border-transparent group-hover:border-white pb-1">
                    Discover More
                  </a>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
