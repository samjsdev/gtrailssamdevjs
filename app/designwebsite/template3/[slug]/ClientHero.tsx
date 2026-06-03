'use client';

import { Fustat } from 'next/font/google';

const fustat = Fustat({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  style: ['normal'],
});

interface ClientHeroProps {
  clinic: any;
  business: any;
  basePath: string;
  heroImage?: string;
  media?: any;
}

export default function ClientHero({ clinic, business, basePath, heroImage, media }: ClientHeroProps) {
  const uniqueUserImages = Array.from(new Set([
    ...(media?.treatmentImages || []),
    ...(media?.clinicImages || []),
    ...(media?.otherImages || [])
  ].filter(Boolean)));

  const defaultProjects = [
    {
      title: "Luxury Skyline",
      location: clinic?.address?.city || "Chennai, India",
      year: "2025",
      image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&q=80&w=600",
      tag1: "RESIDENTIAL",
      tag2: "DESIGN"
    },
    {
      title: "Bohemian Rhapsody",
      location: clinic?.address?.city || "Chennai, India",
      year: "2025",
      image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&q=80&w=600",
      tag1: "RESIDENTIAL",
      tag2: "STYLING"
    },
    {
      title: "Vintage Glamour",
      location: clinic?.address?.city || "Chennai, India",
      year: "2025",
      image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=600",
      tag1: "RESIDENTIAL",
      tag2: "FABRICATION"
    },
    {
      title: "Living Innovation",
      location: clinic?.address?.city || "Chennai, India",
      year: "2025",
      image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=600",
      tag1: "RESIDENTIAL",
      tag2: "LAYOUT"
    }
  ];

  const projects = defaultProjects.map((proj, idx) => {
    return {
      ...proj,
      image: uniqueUserImages[idx % uniqueUserImages.length] || proj.image,
    };
  });

  return (
    <section className="relative overflow-hidden bg-white pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-8 w-full">
        {/* Top bar with Label and Headline */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
          <div className="space-y-4 max-w-2xl">
            <div className="flex items-center gap-2 text-slate-400 text-xs font-semibold uppercase tracking-widest">
              <span className="w-1.5 h-1.5 rounded-full bg-[#B48A66]" />
              OUR PROJECTS
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-slate-900 leading-tight">
              Creative <span className="text-[#B48A66]">Projects That</span><br />Define Our Style
            </h1>
          </div>
          <p className="text-slate-500 text-sm max-w-sm leading-relaxed font-light">
            Our portfolio showcases a diverse range of projects, from beautifully crafted residential spaces functional and stylish commercial interiors.
          </p>
        </div>

        {/* Projects Horizontal Slider/Grid */}
        <div className="flex gap-6 overflow-x-auto pb-8 scrollbar-none snap-x snap-mandatory">
          {projects.map((proj, idx) => (
            <div 
              key={idx} 
              className="min-w-[280px] sm:min-w-[340px] flex-shrink-0 snap-start group cursor-pointer"
            >
              <div className="relative aspect-[4/5] rounded-3xl overflow-hidden mb-4 bg-slate-100 shadow-sm border border-slate-100">
                <img 
                  src={proj.image} 
                  alt={proj.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                />
                
                {/* Floating Tags */}
                <div className="absolute top-4 left-4 flex gap-2">
                  <span className="px-3 py-1 bg-white/20 backdrop-blur-md text-[9px] font-bold text-white uppercase rounded-full tracking-wider">
                    {proj.tag1}
                  </span>
                  <span className="px-3 py-1 bg-white/20 backdrop-blur-md text-[9px] font-bold text-white uppercase rounded-full tracking-wider">
                    {proj.tag2}
                  </span>
                </div>

                {/* View Overlay on Hover */}
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-slate-900/80 backdrop-blur-xs flex items-center justify-center text-white text-xs font-semibold tracking-wider uppercase scale-75 group-hover:scale-100 transition-all duration-300 border border-white/10">
                    View
                  </div>
                </div>
              </div>

              {/* Title & Location details */}
              <div className="space-y-1 pl-2">
                <h3 className="text-lg font-semibold text-slate-900 group-hover:text-[#B48A66] transition-colors">
                  {proj.title}
                </h3>
                <div className="flex justify-between text-xs text-slate-400 font-light">
                  <span>{proj.location}</span>
                  <span>{proj.year}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
