'use client';

import { ArrowUpRight } from 'lucide-react';

type FeatureItem = {
  num: string;
  title: string;
  desc: string;
  img: string;
};

type WhyChooseUsProps = {
  basePath: string;
  data?: any;
};

export default function WhyChooseUs({ basePath, data }: WhyChooseUsProps) {
  const philosophyTitle = data?.philosophy?.title || 'Designing Beyond the Surface';
  const philosophyDescription = data?.philosophy?.description || 
    'We believe that beautifully designed spaces should not just look impressive—they must fundamentally improve how you live, work, and feel every single day.';

  const features: FeatureItem[] = [
    {
      num: "01",
      title: data?.philosophy?.feature1?.title || "Spatial Planning",
      desc: data?.philosophy?.feature1?.desc || "We prioritize natural light, structural flow, and proportions before adding finishes, ensuring the fundamental structure of the room is correct.",
      img: data?.philosophy?.feature1?.img || data?.media?.otherImages?.[2] || "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80&w=800",
    },
    {
      num: "02",
      title: data?.philosophy?.feature2?.title || "Material Sourcing",
      desc: data?.philosophy?.feature2?.desc || "We select authentic materials that age gracefully—natural woods, textured stones, and patinated metals that tell a visual story.",
      img: data?.philosophy?.feature2?.img || data?.media?.otherImages?.[3] || "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?auto=format&fit=crop&q=80&w=800",
    },
    {
      num: "03",
      title: data?.philosophy?.feature3?.title || "Bespoke Details",
      desc: data?.philosophy?.feature3?.desc || "It’s the subtle shadow gaps, flush baseboards, and customized joinery that elevate a space from standard to exceptional.",
      img: data?.philosophy?.feature3?.img || data?.media?.otherImages?.[4] || "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&q=80&w=800",
    },
    {
      num: "04",
      title: data?.philosophy?.feature4?.title || "Turnkey Execution",
      desc: data?.philosophy?.feature4?.desc || "Our rigorous project management ensures design integrity is maintained from the first concept sketch to the final styling reveal.",
      img: data?.philosophy?.feature4?.img || data?.media?.otherImages?.[5] || "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&q=80&w=800",
    }
  ];

  return (
    <section className="py-28 lg:py-36 bg-[#0A0A0A] text-white selection:bg-[#C1FF72] selection:text-[#0A0A0A] relative overflow-hidden">
      {/* Subtle grid lines */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#FCFAF6_1px,transparent_1px),linear-gradient(to_bottom,#FCFAF6_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-[0.02]"></div>
 
      <div className="max-w-[90rem] mx-auto px-8 w-full relative z-10">

        {/* Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-24">
          <div className="inline-flex items-center gap-3 mb-8">
            <div className="w-8 h-px bg-[#C1FF72]/30"></div>
            <span className="text-[11px] font-bold tracking-[0.25em] uppercase text-[#C1FF72]">Our Philosophy</span>
            <div className="w-8 h-px bg-[#C1FF72]/30"></div>
          </div>

          <h2 className="font-serif text-5xl md:text-6xl lg:text-7xl font-light tracking-tight leading-[1.05] mb-8">
            {philosophyTitle}
            <span className="text-[#C1FF72]">.</span>
          </h2>
          <p className="text-[15px] md:text-base text-white/60 font-normal leading-relaxed max-w-2xl">
            {philosophyDescription}
          </p>
        </div>

        {/* Feature Grid (Editorial Asymmetry) */}
        <div className="grid md:grid-cols-2 gap-x-16 gap-y-20 lg:gap-y-28">
          {features.map((feat, idx) => (
            <div key={idx} className="group relative flex flex-col text-left">
              <div className="flex gap-4 mb-4 items-center">
                <span className="font-serif text-sm italic text-[#C1FF72]">{feat.num}</span>
                <h3 className="font-serif text-2xl lg:text-3xl font-normal tracking-wide text-white leading-snug">{feat.title}</h3>
              </div>
              
              <div className="pl-10 space-y-8">
                <p className="text-[15px] text-white/60 font-normal leading-relaxed mb-4 max-w-md group-hover:text-white/80 transition-colors">
                  {feat.desc}
                </p>

                <div className="relative aspect-[4/3] w-full max-w-full overflow-hidden rounded-[2rem] border border-white/5 shadow-2xl">
                  {/* Glowing lime border trigger on card hover */}
                  <div className="absolute inset-0 bg-[#C1FF72]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 mix-blend-overlay"></div>
                  
                  <img
                    src={feat.img}
                    alt={feat.title}
                    className="w-full h-full object-cover origin-bottom scale-105 group-hover:scale-100 transition-transform duration-[1200ms] grayscale-[30%] group-hover:grayscale-0"
                  />
                  <div className="absolute bottom-4 right-4 z-20 w-9 h-9 bg-[#FCFAF6] rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 -translate-y-2 group-hover:translate-y-0 transition-all duration-300 shadow-xl">
                    <ArrowUpRight className="w-3.5 h-3.5 text-[#0A0A0A]" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
