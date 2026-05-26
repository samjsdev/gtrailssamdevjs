import { readSourceConfig } from '@/lib/dataBuilder';
import { INTERIOR_HERO_IMAGES } from '@/lib/interiorContent';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowRight, Phone, Camera } from 'lucide-react';

export default async function GalleryPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const { slug } = resolvedParams;
  const basePath = `/designwebsite/template3/${slug}`;

  const data = await readSourceConfig(slug);
  if (!data) return notFound();

  const { clinic, media } = data;
  const clinicImages = media.clinicImages || [];

  const galleryCategories = [
    {
      title: 'Layered Living Rooms',
      subtitle: 'Texture & Lighting',
      description: 'Warm, welcoming living rooms shaped through furniture scale, layered lighting, soft furnishings, wall finishes, and storage that fits daily life.',
    },
    {
      title: 'Modular Kitchens',
      subtitle: 'Workflow & Storage',
      description: 'Kitchen projects planned around cooking habits, appliance zones, durable surfaces, task lighting, hardware, and easy everyday movement.',
    },
    {
      title: 'Bedroom Retreats',
      subtitle: 'Calm & Comfort',
      description: 'Bedroom makeovers focused on wardrobe planning, softer lighting, restful palettes, custom headboards, and practical bedside details.',
    },
    {
      title: 'Space Planning',
      subtitle: 'Layout Strategy',
      description: 'Layouts that improve circulation, define zones, reduce clutter, and help compact rooms feel more open and intentional.',
    },
    {
      title: 'Custom Furniture',
      subtitle: 'Built-In Detail',
      description: 'Wardrobes, TV units, study desks, consoles, and display systems designed around exact measurements and long-term use.',
    },
    {
      title: 'Studio Spaces',
      subtitle: 'Material Reviews',
      description: 'A look at consultation areas, material samples, finish boards, and the planning environment behind our design decisions.',
    },
  ];

  return (
    <div className="font-sans text-emerald-900 bg-gray-50 min-h-screen selection:bg-emerald-900 selection:text-white">
      {/* Page Hero Banner */}
      <section className="relative text-white py-24 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src={INTERIOR_HERO_IMAGES.gallery} alt="Interior design gallery" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-emerald-900/75"></div>
          <div className="absolute inset-0 bg-linear-to-t from-emerald-900 via-emerald-900/40 to-transparent"></div>
        </div>
        <div className="max-w-7xl mx-auto px-8 w-full relative z-10">
          <p className="text-gray-400 font-semibold tracking-[0.15em] uppercase text-xs mb-6">Project Gallery</p>
          <div className="flex flex-col mb-8">
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-normal text-gray-500 leading-none tracking-tighter">Explore the Spaces</h2>
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-normal text-white leading-none tracking-tighter -mt-1.5">For Yourself</h2>
          </div>
          <p className="text-xl text-gray-400 max-w-3xl font-light leading-relaxed">
            Browse real spaces shaped through planning, material selections, lighting, storage, and styling. Every room tells a story about how the client wants to live.
          </p>
        </div>
      </section>

      {/* Introduction Text */}
      <section className="py-20 bg-white border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-8 text-center space-y-6">
          <h3 className="text-2xl md:text-3xl font-normal text-emerald-900 tracking-tight">See How Thoughtful Interior Design Changes a Space</h3>
          <p className="text-gray-500 text-[16px] leading-relaxed font-light">
            Our gallery highlights the planning, material choices, lighting, and styling decisions that turn rooms into finished experiences. Each space balances function, comfort, and visual character.
          </p>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-24 lg:py-32 bg-gray-50">
        <div className="max-w-7xl mx-auto px-8 w-full">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {galleryCategories.map((category, idx) => (
              <div key={idx} className="bg-white rounded-3xl border border-gray-100 cursor-pointer group flex flex-col h-full hover:shadow-lg hover:border-gray-200 transition-all duration-300">
                {/* Image Placeholder */}
                <div className="aspect-4/3 bg-emerald-950 relative flex items-center justify-center overflow-hidden rounded-t-3xl border-b border-gray-100">
                  {clinicImages[idx] ? (
                    <img src={clinicImages[idx]} alt={category.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  ) : (
                    <div className="flex flex-col items-center gap-3 text-white opacity-70">
                      <Camera className="w-8 h-8" />
                      <span className="font-semibold text-[10px] uppercase tracking-[0.2em]">Project Detail</span>
                    </div>
                  )}
                  {/* Overlay on Hover */}
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-500"></div>
                </div>

                {/* Content */}
                <div className="p-8 grow flex flex-col">
                  <h4 className="font-medium text-emerald-900 text-xl mb-1">{category.title}</h4>
                  <p className="text-gray-400 font-semibold text-xs tracking-widest uppercase mb-4">{category.subtitle}</p>
                  <p className="text-gray-500 text-[14px] leading-relaxed font-light grow">{category.description}</p>
                  
                  <div className="mt-8 flex justify-between items-center pt-6 border-t border-gray-50">
                     <span className="text-xs font-semibold text-emerald-900 uppercase tracking-widest group-hover:text-gray-500 transition-colors">View Project</span>
                     <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-500 group-hover:bg-emerald-900 group-hover:text-white transition-all transform group-hover:translate-x-1">
                        <ArrowRight className="w-4 h-4" />
                     </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Studio Tour Section */}
      <section className="py-24 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-8 w-full">
          <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
            <div className="flex-1 space-y-8">
              <div className="space-y-4">
                <h3 className="text-gray-500 font-semibold tracking-[0.15em] uppercase text-xs">Virtual Tour</h3>
                <div className="flex flex-col">
                   <h4 className="text-4xl md:text-5xl lg:text-6xl font-normal text-gray-400 leading-none tracking-tighter">Take a Look</h4>
                   <h4 className="text-4xl md:text-5xl lg:text-6xl font-normal text-emerald-900 leading-none tracking-tighter -mt-1">Inside Studio Spaces</h4>
                </div>
              </div>

              <div className="space-y-6 text-gray-600 text-[16px] leading-relaxed font-light">
                <p>
                  Our studio is arranged for focused design conversations, material reviews, and practical project planning. From the moment you step through our doors, you will find a calm setting for exploring finishes, layouts, and ideas.
                </p>
                <p>
                  Behind the scenes, our team organizes drawings, finish boards, vendor coordination, and execution notes so every project moves from concept to handover with clarity.
                </p>
              </div>

              <div className="pt-4">
                <Link href={`${basePath}/contact-us`} className="inline-flex items-center gap-2 bg-gray-100 text-emerald-900 px-8 py-3.5 rounded-full font-medium hover:bg-gray-200 transition-colors text-sm">
                  Schedule a Visit <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            <div className="flex-1 w-full">
              <div className="grid grid-cols-2 gap-4">
                <div className="aspect-3/4 bg-gray-100 rounded-3xl overflow-hidden flex items-center justify-center">
                  {clinicImages[0] ? (
                    <img src={clinicImages[0]} alt="Interior studio" className="w-full h-full object-cover" />
                  ) : (
                    <div className="flex flex-col items-center gap-2 text-gray-400"><Camera className="w-6 h-6" /><span className="text-[10px] font-semibold uppercase tracking-widest">Studio</span></div>
                  )}
                </div>
                <div className="space-y-4">
                  <div className="aspect-square bg-gray-100 rounded-3xl overflow-hidden flex items-center justify-center">
                    {clinicImages[1] ? (
                      <img src={clinicImages[1]} alt="Project detail" className="w-full h-full object-cover" />
                    ) : (
                      <div className="flex flex-col items-center gap-2 text-gray-400"><Camera className="w-6 h-6" /><span className="text-[10px] font-semibold uppercase tracking-widest">Project</span></div>
                    )}
                  </div>
                  <div className="aspect-square bg-gray-100 rounded-3xl overflow-hidden flex items-center justify-center">
                    {clinicImages[2] ? (
                      <img src={clinicImages[2]} alt="Material detail" className="w-full h-full object-cover" />
                    ) : (
                      <div className="flex flex-col items-center gap-2 text-gray-400"><Camera className="w-6 h-6" /><span className="text-[10px] font-semibold uppercase tracking-widest">Materials</span></div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-emerald-900 py-24 lg:py-40 text-white">
        <div className="max-w-4xl mx-auto px-8 text-center w-full">
          <div className="flex flex-col mb-8">
            <h3 className="text-5xl md:text-6xl lg:text-7xl font-normal text-gray-500 leading-none tracking-tighter">Want Results</h3>
            <h3 className="text-5xl md:text-6xl lg:text-7xl font-normal text-white leading-none tracking-tighter -mt-1.5">Like These?</h3>
          </div>
          <p className="text-xl text-gray-400 font-light mb-12 max-w-2xl mx-auto">Every beautiful room starts with a focused consultation. Let our designers shape a practical plan for your space.</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href={`tel:${clinic.contact?.phone || ''}`} className="w-full sm:w-auto flex items-center justify-center gap-2 bg-white text-emerald-900 px-8 py-4 rounded-full font-medium hover:bg-gray-100 transition-colors text-sm tracking-wide">
              <Phone className="w-4 h-4" /> Book Consultation
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
