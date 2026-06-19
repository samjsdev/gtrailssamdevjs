import { readSourceConfig } from '@/lib/sourceData';
import { notFound } from 'next/navigation';
import { Cormorant_Garamond } from 'next/font/google';
import ClientHero from './ClientHero';
import Link from 'next/link';
import { Star, Plus, Minus, Check, Sparkles, Shield, Compass, ArrowUpRight, ChevronRight, Layers } from 'lucide-react';
import {
  DEFAULT_INTERIOR_SERVICES,
  INTERIOR_HERO_IMAGES,
  getInteriorServiceSummary,
  getInteriorServiceData,
  getServiceImage,
} from '@/lib/interiorContent';

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
});

type PageProps = {
  params?: any;
};

export default async function DesignStudioHome({ params }: PageProps) {
  const slug = ''; // standalone: slug not needed for data loading
  const basePath = ``;

  const data = await readSourceConfig(undefined, 'template2');
  if (!data) return notFound();

  const { clinic, business, doctor, media, philosophy, about } = data;

  const uniqueUserImages = [
    ...(media?.clinicImages || []),
    ...(media?.treatmentImages || []),
    ...(media?.otherImages || [])
  ].filter(Boolean);

  const projects = [
    {
      title: "Sage Green Modular Kitchen",
      location: "Pallikaranai, Chennai",
      year: "2025",
      image: "/images/otherImages-3.jpg",
      tag1: "RESIDENTIAL",
      tag2: "KITCHEN"
    },
    {
      title: "Living Room with Pooja Unit",
      location: "Velachery, Chennai",
      year: "2025",
      image: "/images/otherImages-1.jpg",
      tag1: "RESIDENTIAL",
      tag2: "LIVING ROOM"
    },
    {
      title: "Premium Wardrobe & Glass Display",
      location: "Adyar, Chennai",
      year: "2025",
      image: "/images/otherImages-2.jpg",
      tag1: "RESIDENTIAL",
      tag2: "BEDROOM"
    },
    {
      title: "Kids Bedroom with Leaf Art",
      location: "Nungambakkam, Chennai",
      year: "2025",
      image: "/images/otherImages-8.jpg",
      tag1: "RESIDENTIAL",
      tag2: "BEDROOM"
    },
    {
      title: "Navy Fluted TV Unit & Display",
      location: "Besant Nagar, Chennai",
      year: "2025",
      image: "/images/otherImages-42.jpg",
      tag1: "RESIDENTIAL",
      tag2: "LIVING ROOM"
    },
    {
      title: "Open Plan Office & Co-working",
      location: "Guindy, Chennai",
      year: "2025",
      image: "/images/otherImages-33.jpg",
      tag1: "COMMERCIAL",
      tag2: "OFFICE"
    }
  ];

  return (
    <div className="font-sans text-[#2A2421] bg-[#F7F4EF] min-h-screen selection:bg-[#8E7056] selection:text-white scroll-smooth space-y-24">
      {/* Hero & Profile Block */}
      <ClientHero clinic={clinic} business={business} basePath={basePath} doctor={doctor} media={media} />

      {/* DESIGN PHILOSOPHY SECTION */}
      <section id="about" className="py-12 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 select-none pointer-events-none z-0 opacity-[0.03]">
          <span className="font-extrabold text-[12vw] uppercase tracking-wider text-[#2A2421]">
            {clinic.name || 'SKETCHLAB'}
          </span>
        </div>

        <div className="relative z-10 max-w-5xl mx-auto text-center space-y-6">
          <div className="flex items-center justify-center gap-2 text-[#8E7056] text-[10px] font-bold uppercase tracking-[0.2em]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#8E7056]" />
            OUR DESIGN PHILOSOPHY
          </div>
          <h2 className={`${cormorant.className} text-3xl sm:text-4xl md:text-5xl font-light tracking-wide max-w-3xl mx-auto leading-tight`}>
            {philosophy?.title || <>Crafting Spaces That <span className="text-[#8E7056] italic">Inspire</span> &amp; Elevate Everyday Life</>}
          </h2>
          <p className="text-sm sm:text-base text-[#2A2421]/90 font-light leading-relaxed max-w-2xl mx-auto">
            {philosophy?.description || 'We believe that exceptional design is a perfect balance of form and function. With careful spatial planning, custom furniture styling, and premium materials, we create beautiful spaces that support your lifestyle.'}
          </p>
          <div className="pt-4">
            <Link href={`${basePath}/about`} className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#8E7056] hover:text-[#2A2421] transition-colors group">
              Learn More About Our Story <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>

        {/* Cinematic Architectural Render Overlay */}
        <div className="relative z-10 max-w-6xl mx-auto mt-12">
          <div className="w-full aspect-[4/3] sm:aspect-[16/9] md:aspect-[21/9] rounded-[2.5rem] overflow-hidden shadow-sm border border-[#EAE3D8]/60">
            <img
              src="/images/otherImages-4.jpg"
              alt="Pastel green arched living room interior"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* SERVICES PREVIEW SECTION */}
      <section id="services" className="py-16 bg-white rounded-[3rem] px-8 sm:px-12 lg:px-16 border border-[#EAE3D8]/50 shadow-sm">
        <div className="max-w-7xl mx-auto w-full">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-16">
            <div className="space-y-4 max-w-2xl">
              <div className="flex items-center gap-2 text-[#8E7056] text-[10px] font-bold uppercase tracking-[0.2em]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#8E7056]" />
                WHAT WE DO
              </div>
              <h2 className={`${cormorant.className} text-3xl sm:text-4xl md:text-5xl font-light tracking-wide`}>
                Comprehensive <span className="text-[#8E7056] italic">Design</span> Services
              </h2>
            </div>
            <Link 
              href={`${basePath}/services`} 
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#2A2421] hover:bg-[#8E7056] text-white text-[10px] font-bold uppercase tracking-widest rounded-full transition-colors duration-300 shadow-sm"
            >
              View All Services <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Residential Interior Design",
                desc: "Residential interior design brings layout, color, lighting, furniture, storage, and material choices into one cohesive plan. We translate your routines, taste, and budget into rooms that feel polished without losing comfort.",
                image: "/images/otherImages-22.jpg"
              },
              {
                title: "Modular Kitchen Design",
                desc: "A well-designed modular kitchen balances workflow, durable finishes, appliance planning, storage zones, and beautiful detailing. We plan every cabinet, counter, handle, light, and backsplash.",
                image: "/images/otherImages-10.jpg"
              },
              {
                title: "Commercial & Office Interiors",
                desc: "From open offices to training centers, we design functional workspaces with ergonomic layouts, custom cabinetry, and collaborative zones that boost productivity and impress clients.",
                image: "/images/otherImages-33.jpg"
              }
            ].map((svc, idx) => (
              <div key={idx} className="bg-[#FAF8F5]/60 rounded-[2rem] shadow-sm border border-[#EAE3D8]/60 hover:shadow-md hover:border-[#8E7056]/30 transition-all duration-300 group overflow-hidden flex flex-col">
                <div className="relative h-48 w-full overflow-hidden">
                  <div className="absolute inset-0 bg-[#8E7056]/20 mix-blend-multiply opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />
                  <img src={svc.image} alt={svc.title} className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500" />
                  <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/95 text-[#8E7056] flex items-center justify-center font-bold text-[11px] z-20 shadow-sm border border-[#EAE3D8]/60">
                    0{idx + 1}
                  </div>
                </div>
                <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold text-[#2A2421] mb-2 group-hover:text-[#8E7056] transition-colors">{svc.title}</h3>
                    <p className="text-xs sm:text-[13px] text-[#2A2421]/90 leading-relaxed font-light">{svc.desc}</p>
                  </div>
                  <div className="pt-2">
                    <Link href={`${basePath}/services`} className="text-[10px] font-bold uppercase tracking-wider text-[#8E7056] hover:text-[#2A2421] inline-flex items-center gap-1.5 transition-colors">
                      Learn More <ChevronIcon />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PORTFOLIO PREVIEW SECTION */}
      <section id="gallery" className="py-12">
        <div className="max-w-7xl mx-auto w-full">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
            <div className="space-y-4 max-w-2xl">
              <div className="flex items-center gap-2 text-[#8E7056] text-[10px] font-bold uppercase tracking-[0.2em]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#8E7056]" />
                OUR PORTFOLIO
              </div>
              <h2 className={`${cormorant.className} text-3xl sm:text-4xl md:text-5xl font-light tracking-wide leading-tight`}>
                Creative <span className="text-[#8E7056] italic">Projects That</span> Define Our Style
              </h2>
            </div>
            <Link 
              href={`${basePath}/gallery`} 
              className="inline-flex items-center gap-2 px-6 py-3 bg-white hover:bg-[#8E7056] border border-[#EAE3D8] hover:border-transparent text-[#2A2421] hover:text-white text-[10px] font-bold uppercase tracking-widest rounded-full transition-colors duration-300 shadow-xs"
            >
              Explore Full Gallery <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Projects Horizontal Slider */}
          <div className="flex gap-4 sm:gap-5 overflow-x-auto pb-6 scrollbar-none snap-x snap-mandatory">
            {projects.map((proj, idx) => (
              <div 
                key={idx} 
                className="w-[calc(100vw-4rem)] sm:w-[220px] md:w-[260px] lg:w-[280px] flex-shrink-0 snap-start group cursor-pointer"
              >
                <div className="relative aspect-[3/4] rounded-[1.25rem] sm:rounded-[1.5rem] overflow-hidden mb-3 bg-stone-100 shadow-sm border border-[#EAE3D8]/60">
                  <img 
                    src={proj.image} 
                    alt={proj.title} 
                    className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700" 
                  />
                  
                  {/* Floating Tags */}
                  <div className="absolute top-2.5 left-2.5 sm:top-3.5 sm:left-3.5 flex gap-1.5">
                    <span className="px-2 py-0.5 sm:px-2.5 sm:py-0.5 bg-white/30 backdrop-blur-md text-[7px] sm:text-[8px] font-bold text-[#2A2421] uppercase rounded-full tracking-wider border border-white/40">
                      {proj.tag1}
                    </span>
                  </div>

                  {/* View Overlay on Hover */}
                  <div className="absolute inset-0 bg-[#2A2421]/20 group-hover:bg-[#2A2421]/40 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/95 backdrop-blur-xs flex items-center justify-center text-[#2A2421] text-[8px] sm:text-[9px] font-bold tracking-wider uppercase scale-75 group-hover:scale-100 transition-all duration-300 shadow-sm">
                      View
                    </div>
                  </div>
                </div>

                <div className="space-y-0.5 pl-1">
                  <h3 className="text-[12px] sm:text-[13px] font-semibold text-[#2A2421] group-hover:text-[#8E7056] transition-colors leading-tight">
                    {proj.title}
                  </h3>
                  <div className="flex justify-between text-[9px] sm:text-[10px] text-[#2A2421]/75 font-light">
                    <span>{proj.location}</span>
                    <span>{proj.year}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US / BENTO GRID */}
      <section className="py-12 bg-white rounded-[3rem] px-8 sm:px-12 lg:px-16 border border-[#EAE3D8]/50 shadow-sm">
        <div className="max-w-7xl mx-auto w-full space-y-12">
          <div className="text-center space-y-3">
            <div className="flex items-center justify-center gap-2 text-[#8E7056] text-[10px] font-bold uppercase tracking-[0.2em]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#8E7056]" />
              LUXE BENEFITS
            </div>
            <h2 className={`${cormorant.className} text-3xl sm:text-4xl md:text-5xl font-light tracking-wide`}>
              Why Choose <span className="text-[#8E7056] italic">{clinic.name || 'SKETCHLAB'}</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {/* Bento Card 1 */}
            <div className="md:col-span-4 bg-[#EAE3D8]/40 rounded-[2rem] p-8 border border-[#EAE3D8]/60 flex flex-col justify-between hover:border-[#8E7056]/30 transition-all duration-300 group">
              <div className="space-y-4">
                <h4 className="text-[15px] font-bold uppercase tracking-wider text-[#2A2421]/75">01 / INTEGRATION</h4>
                <h3 className="text-[17px] font-semibold text-[#2A2421]">End-to-End Solutions</h3>
                <p className="text-xs text-[#2A2421]/90 font-light leading-relaxed">
                  We manage every single aspect of your interior and modular requirements, saving you invaluable hours and custom manufacturing concerns.
                </p>
              </div>
              <div className="pt-8 text-[#8E7056] group-hover:translate-x-1.5 transition-transform">
                <Compass className="w-6 h-6 stroke-[1.25]" />
              </div>
            </div>

            {/* Bento Card 2 */}
            <div className="md:col-span-4 bg-[#EAE3D8]/40 rounded-[2rem] p-8 border border-[#EAE3D8]/60 flex flex-col justify-between hover:border-[#8E7056]/30 transition-all duration-300 group">
              <div className="space-y-4">
                <h4 className="text-[15px] font-bold uppercase tracking-wider text-[#2A2421]/75">02 / CARE</h4>
                <h3 className="text-[17px] font-semibold text-[#2A2421]">After-Sales Support</h3>
                <p className="text-xs text-[#2A2421]/90 font-light leading-relaxed">
                  We are committed to providing solid coordination, reliable warranties, and custom support to resolve future space needs.
                </p>
              </div>
              <div className="pt-8 text-[#8E7056] group-hover:translate-x-1.5 transition-transform">
                <Shield className="w-6 h-6 stroke-[1.25]" />
              </div>
            </div>

            {/* Bento Card 3 */}
            <div className="md:col-span-4 md:row-span-2 bg-gradient-to-b from-[#3E3430] to-[#2A2421] text-white rounded-[2rem] p-8 sm:p-10 flex flex-col justify-between shadow-sm border border-black/5 hover:scale-[1.01] transition-transform duration-300">
              <div className="space-y-6">
                <span className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 backdrop-blur-md text-[8px] font-bold tracking-[0.2em] uppercase rounded-full border border-white/10">
                  EXCLUSIVE SELECTIONS
                </span>
                <h3 className={`${cormorant.className} text-3xl font-light tracking-wide leading-tight`}>
                  No Variety<br />Restrictions
                </h3>
                <p className="text-xs text-white/95 font-light leading-relaxed">
                  Unlike traditional single-factory providers, we coordinate with top-tier modular fabrication units and premium material brands across South India and Asia, supplying the broadest customized selections.
                </p>
              </div>

              <div className="pt-16 border-t border-white/10 mt-8">
                <div className="flex justify-between items-center text-[10px] font-bold tracking-widest uppercase">
                  <span>UNRESTRICTED CHOICES</span>
                  <ArrowUpRight className="w-4 h-4 text-[#FAF8F5]/80" />
                </div>
              </div>
            </div>

            {/* Bento Card 4 */}
            <div className="md:col-span-8 bg-[#FAF8F5]/50 border border-[#EAE3D8]/60 rounded-[2rem] p-8 flex flex-col sm:flex-row items-center gap-8 shadow-xs hover:border-[#8E7056]/30 transition-all duration-300">
              <div className="space-y-4 sm:w-1/2">
                <h4 className="text-[10px] font-bold uppercase tracking-wider text-[#8E7056]">03 / STANDARD</h4>
                <h3 className="text-lg font-semibold text-[#2A2421]">Superior Quality &amp; Curation</h3>
                <p className="text-xs text-[#2A2421]/90 font-light leading-relaxed">
                  Our direct custom manufacturing and key partnerships with leading hardware brands (Hettich, Blum, Hafele) give you access to precision cuts, flawless joinery, and rigid inspections.
                </p>
              </div>
              <div className="sm:w-1/2 w-full aspect-[16/9] rounded-[1.5rem] overflow-hidden border border-[#EAE3D8]/50">
                <img 
                  src="/images/otherImages-21.jpg" 
                  alt="Grey modular kitchen with premium finishes" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CLIENT TESTIMONIALS SECTION */}
      <section className="py-12 bg-white rounded-[3rem] px-8 sm:px-12 lg:px-16 border border-[#EAE3D8]/50 shadow-sm">
        <div className="max-w-7xl mx-auto w-full space-y-16">
          <div className="text-center max-w-2xl mx-auto space-y-4">
            <div className="flex items-center justify-center gap-2 text-[#8E7056] text-[10px] font-bold uppercase tracking-[0.2em]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#8E7056]" />
              CLIENT REVIEWS
            </div>
            <h2 className={`${cormorant.className} text-3xl sm:text-4xl md:text-5xl font-light tracking-wide`}>
              Hear From Our <span className="text-[#8E7056] italic">Happy</span> Clients
            </h2>
          </div>

          <div className="flex flex-wrap justify-center gap-8">
            {[
              {
                author: "Divya Sri",
                role: "Homeowner",
                rating: 5,
                text: "A big thank you to SketchLab Interiors for giving us the most beautiful interiors for our new home! From day one, the team patiently listened to our ideas, clarified every doubt, and ensured every detail was thoughtfully executed."
              },
              {
                author: "Ganesh Ashok",
                role: "Homeowner",
                rating: 5,
                text: "Well satisfied with SketchLab and team. All the best Sam and team. Keep rocking! 🎉🎉"
              },
              {
                author: "Nithya Thiagu",
                role: "Flat Owner",
                rating: 5,
                text: "We done our flat interiors with SketchLab 2 years back... it's good even now. We are satisfied with his job. Both Sam and Arun are understanding persons. My expectations were truly taken into account. Thanks! ❤️"
              },
              {
                author: "Vinod Bhaskar",
                role: "Local Guide",
                rating: 5,
                text: "I recently had the pleasure of working with Sam Joseph and his outstanding team at Sketch Lab for the interior designing and implementation of my home, and I must say, the experience was nothing short of exceptional! ❤️🙏"
              },
              {
                author: "Siva Shunmugam",
                role: "Homeowner",
                rating: 5,
                text: "This is my first interior work for my new home with Sam Joseph and Team Sketch Lab where we had little experience with huge expectations. They guided us beautifully throughout the process."
              },
              {
                author: "Anand S",
                role: "Local Guide",
                rating: 5,
                text: "I would share a 5.1 if Google would allow me! We recently got our interior done by Mr. Sam Joseph and his SKETCHLAB team. We did extensive research on Interior providers and finalized on Mr. Sam. Highly recommended! 🙏"
              },
              {
                author: "Mythili D",
                role: "Client",
                rating: 5,
                text: "Highly recommended SKETCH LAB for interiors. We are extremely happy with the team for the work. They completely understood our requirement from the beginning and accommodated all customisation to meet our expectation. Final Outcome was amazing. 🙏"
              },
              {
                author: "Helan Jo",
                role: "3BHK Homeowner",
                rating: 5,
                text: "We did interior for our 3bhk home. It was a smooth process from the start to end. SketchLAB guided us from the beginning and we learnt many things. Highly satisfied! ❤️"
              },
              {
                author: "Gowri Ganesan",
                role: "Local Guide",
                rating: 5,
                text: "I recently hired Sketch Lab for my new home. The project stayed on track with timeline and budget. Initial design phase was thorough and the designer listened to all our requirements and made efforts to incorporate them. Mine is a compact space but looks spacious now! ❤️"
              }
            ].map((review, idx) => (
              <div key={idx} className="w-full md:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.5rem)] max-w-lg bg-[#FAF8F5]/60 p-8 rounded-[2.25rem] shadow-xs border border-[#EAE3D8]/60 hover:border-[#8E7056]/30 transition-all duration-300 group flex flex-col justify-between">
                <div className="space-y-6">
                  <div className="flex gap-1 text-amber-500">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                  <blockquote className="text-[13px] font-light leading-relaxed text-[#2A2421]/90 italic">
                    &ldquo;{review.text}&rdquo;
                  </blockquote>
                </div>
                <div className="flex items-center gap-3 pt-6 mt-8 border-t border-[#EAE3D8]/60 w-full">
                  <div className="w-9 h-9 rounded-full bg-[#8E7056]/15 flex items-center justify-center text-[#8E7056] font-bold text-xs border border-[#8E7056]/20">
                    {review.author.charAt(0)}
                  </div>
                  <div>
                    <h4 className="text-[13px] font-bold text-[#2A2421] group-hover:text-[#8E7056] transition-colors">{review.author}</h4>
                    <p className="text-[8.5px] uppercase tracking-wider text-[#2A2421]/75 font-bold mt-0.5">{review.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PARTNERS LOGO STRIP */}
      <section className="py-12 border-y border-[#EAE3D8]/60 relative z-10">
        <div className="max-w-7xl mx-auto px-8 w-full space-y-8">
          <div className="flex items-center justify-center gap-4">
            <div className="h-px bg-[#EAE3D8] flex-1" />
            <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#2A2421]/70 text-center px-4">
              COLLABORATING WITH TOP BRANDS &amp; DEVELOPERS
            </span>
            <div className="h-px bg-[#EAE3D8] flex-1" />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center text-center font-bold text-[9.5px] tracking-widest text-[#2A2421]/75">
            <span className="hover:text-[#8E7056] transition-colors cursor-default">ARCHITECT REAL ESTATE</span>
            <span className="hover:text-[#8E7056] transition-colors cursor-default">TREND INTERIORS</span>
            <span className="hover:text-[#8E7056] transition-colors cursor-default">INTERIOR PREMIUM</span>
            <span className="hover:text-[#8E7056] transition-colors cursor-default">BUILDING CONSTRUCTION</span>
            <span className="hover:text-[#8E7056] transition-colors cursor-default">REAL ESTATE</span>
            <span className="hover:text-[#8E7056] transition-colors cursor-default">BUILDING CONSTRUCTION</span>
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="py-12 max-w-4xl mx-auto w-full space-y-12">
        <div className="text-center space-y-3">
          <div className="flex items-center justify-center gap-2 text-[#8E7056] text-[10px] font-bold uppercase tracking-[0.2em]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#8E7056]" />
            COMMON INQUIRIES
          </div>
          <h2 className={`${cormorant.className} text-3xl sm:text-4xl md:text-5xl font-light tracking-wide text-[#2A2421]`}>
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-4">
          {[
            { q: "How does the design process work from start to finish?", a: "We follow a structured 5-phase process: Discovery & Briefing, Concept Development, Design Strategy, Procurement & Production, and Final Assembly. Each stage has detailed milestones and client sign-offs before we proceed.", open: true },
            { q: "Do you work with existing furniture or only brand new coordinates?", a: "We work seamlessly with both. Our designers inspect what you have, making recommendations on pieces to retain, refresh, or relocate to ensure the final layout remains exceptionally curated.", open: false },
            { q: "What is your typical coordination pricing structure?", a: "We provide transparent scoping based on total space volume and styling complexity. Every project begins with a clear fixed design fee, and we produce fully detailed material logs before procurement.", open: false },
            { q: "Can your studio manage both private residential and commercial spaces?", a: "Yes, absolutely. Our studio has extensive experience delivering both custom high-end private residences (villa properties, skyline apartments) and boutique commercial interiors (receptions, co-working offices) in Chennai.", open: false },
            { q: "How long does a comprehensive styling project normally take?", a: "Typical residential scopes range from 6 to 12 weeks. High-end villa builds or massive corporate styling projects can take 3 to 6 months depending on customized manufacturing requirements.", open: false },
            { q: "Do you provide photorealistic spatial visualizations in advance?", a: "Yes. We create gorgeous photorealistic 3D mock-ups and complete material mood boards for every space coordinate, allowing you to walk through your future layout before a single element is placed.", open: false }
          ].map((faq, i) => (
            <details key={i} className="group bg-white rounded-[1.75rem] border border-[#EAE3D8]/60 overflow-hidden shadow-xs" open={faq.open}>
              <summary className="flex justify-between items-center font-bold text-[14.5px] tracking-wide cursor-pointer list-none p-6 text-[#2A2421] hover:text-[#8E7056] transition-colors">
                {faq.q}
                <span className="transition-transform duration-300 group-open:rotate-180 text-[#8E7056]">
                  <PlusIcon />
                </span>
              </summary>
              <div className="text-[13px] text-[#2A2421]/90 font-light border-t border-[#EAE3D8]/50 p-6 leading-relaxed bg-[#FAF8F5]/40">
                {faq.a}
              </div>
            </details>
          ))}
        </div>

        {/* WhatsApp Callout Card */}
        <div className="p-8 bg-[#2A2421] text-white rounded-[2rem] text-center space-y-4 relative overflow-hidden mt-8 border border-white/5 shadow-md">
           <div className="absolute top-0 right-0 w-32 h-32 bg-[#8E7056]/15 rounded-bl-full blur-2xl pointer-events-none" />
           <h3 className={`${cormorant.className} text-2.5xl font-light text-white`}>Have a specific custom inquiry?</h3>
           <p className="text-xs text-white/90 max-w-md mx-auto leading-relaxed">
             Get fast design advice. Message us directly on WhatsApp, and our principal coordination team will personally assist you.
           </p>
           {(() => {
             const waPhone = '919578784758';
             const waText = `Hi Sam, I'm interested in booking a consultation for my space!`;
             const waLink = `https://wa.me/${waPhone}?text=${encodeURIComponent(waText)}`;
             return (
               <a href={waLink} target="_blank" rel="noopener noreferrer" className="inline-block mt-4 bg-[#8E7056] text-white hover:bg-white hover:text-[#2A2421] px-8 py-3 rounded-full text-[10px] font-bold uppercase tracking-widest transition-colors duration-300 shadow-sm">
                 WhatsApp: +91 95787 84758
               </a>
             );
           })()}
        </div>
      </section>

      {/* FINAL CINEMATIC CALL TO ACTION SECTION */}
      <section className="py-12 pb-24 text-center space-y-12">
        <div className="space-y-4">
          <div className="flex items-center justify-center gap-2 text-[#8E7056] text-[10px] font-bold uppercase tracking-[0.2em]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#8E7056]" />
            360-DEGREE EXPERIENCE
          </div>
          <h2 className={`${cormorant.className} text-4xl sm:text-5xl md:text-6xl font-light tracking-wide text-[#2A2421]`}>
            Create An Even <span className="text-[#8E7056] italic">Greater</span> Experience
          </h2>
        </div>

        <div className="max-w-6xl mx-auto rounded-[2.5rem] overflow-hidden shadow-sm border border-[#EAE3D8]/50">
          <img
            src="/images/otherImages-7.jpg"
            alt="Curved TV unit with display shelf and Ganesha sculpture"
            className="w-full aspect-[16/9] object-cover hover:scale-[1.01] transition-transform duration-[2000ms]"
          />
        </div>
      </section>
    </div>
  );
}

// Micro-helper Lucide SVG replacement shapes for layout compactness
function ChevronIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="w-3 h-3">
      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
    </svg>
  );
}

function PlusIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-4 h-4 group-open:hidden">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
    </svg>
  );
}