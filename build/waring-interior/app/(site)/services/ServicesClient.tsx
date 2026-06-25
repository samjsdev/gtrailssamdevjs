"use client";

import { useState } from "react";

type ServiceItem = {
  title: string;
  tagline: string;
  description: string;
  benefits: string[];
  process: string[];
  image: string;
};

export default function ServicesClient({ servicesList }: { servicesList: ServiceItem[] }) {
  const [lightboxImg, setLightboxImg] = useState<string | null>(null);

  return (
    <>
      <div className="max-w-6xl mx-auto px-6 space-y-32">
        {/* Dynamic Services List */}
        <div className="space-y-32">
          {servicesList.map((srv, idx) => (
            <div
              key={idx}
              className={`flex flex-col lg:flex-row items-stretch gap-12 lg:gap-16 ${
                idx % 2 === 1 ? "lg:flex-row-reverse" : ""
              }`}
            >
              {/* Image Container */}
              <div
                id={`service-image-zoom-${idx}`}
                role="button"
                aria-label={`Zoom in on ${srv.title} project image`}
                className="w-full lg:w-1/2 aspect-[4/3] border border-stone-250 overflow-hidden relative group cursor-zoom-in bg-stone-100 flex-shrink-0"
                onClick={() => setLightboxImg(srv.image)}
              >
                <img
                  src={srv.image}
                  alt={srv.title}
                  className="w-full h-full object-cover transform group-hover:scale-103 transition-transform duration-[1500ms]"
                />
              </div>

              {/* Text Details Container */}
              <div className="w-full lg:w-1/2 flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] font-bold text-stone-500 font-mono uppercase tracking-wider">
                      0{idx + 1}
                    </span>
                    <span className="h-px w-6 bg-stone-300" />
                    <span className="text-[10px] text-stone-400 font-bold uppercase tracking-widest leading-none">
                      {srv.tagline}
                    </span>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-light text-stone-900 leading-snug">
                    {srv.title}
                  </h2>
                  <p className="text-stone-500 font-light text-sm leading-relaxed">
                    {srv.description}
                  </p>
                </div>

                <div className="space-y-6 pt-4 border-t border-stone-200/60">
                  {/* Highlights/Benefits */}
                  {srv.benefits.length > 0 && (
                    <div>
                      <h3 className="text-[9px] font-bold text-stone-400 uppercase tracking-widest mb-3">
                        Key Highlights
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2">
                        {srv.benefits.map((feat, fidx) => (
                          <div key={fidx} className="flex items-center gap-2 text-xs text-stone-700 font-light">
                            <span className="w-1.5 h-1.5 rounded-full bg-stone-400 flex-shrink-0" />
                            <span>{feat}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Execution Process */}
                  {srv.process.length > 0 && (
                    <div>
                      <h3 className="text-[9px] font-bold text-stone-400 uppercase tracking-widest mb-3">
                        Design & Delivery Process
                      </h3>
                      <ol className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3">
                        {srv.process.map((step, sidx) => (
                          <li key={sidx} className="text-xs text-stone-600 font-light flex gap-2">
                            <span className="font-mono text-stone-400 font-bold">.{sidx + 1}</span>
                            <span>{step}</span>
                          </li>
                        ))}
                      </ol>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* THE STUDIO METRICS */}
        <section className="bg-stone-900 text-stone-100 p-8 md:p-16 lg:p-20 border border-stone-850 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-bl-full pointer-events-none" />
          <div className="relative z-10 max-w-5xl mx-auto space-y-16">
            <div className="text-center max-w-2xl mx-auto space-y-4">
              <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-stone-500">— WHY CHOOSE US</p>
              <h2 className="text-3xl md:text-5xl font-light text-stone-100 leading-tight">The Design Difference</h2>
              <p className="text-stone-400 font-light text-sm">
                We bridge the gap between creative visual architecture and practical, on-site carpentry parameters.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { title: "Team Synergy", desc: "Our architects, joinery technicians, and biophilic stylists work under a unified client brief." },
                { title: "Healthy Timbers", desc: "We source certified timber and non-toxic coatings, protecting both the environment and indoor air quality." },
                { title: "Ergonomics", desc: "Every layout is custom scaled around real daily movements and anatomical clearances." },
                { title: "Clear cost reports", desc: "We establish upfront materials spreadsheets with no hidden markups or sudden cost hikes." },
                { title: "Artisanal Execution", desc: "We coordinate with highly qualified regional master carpenters and trusted installers." },
                { title: "Handover folder", desc: "We provide maintenance directories, color references, hardware keys, and appliances contracts." }
              ].map((diff, idx) => (
                <div key={idx} className="border border-stone-800 p-6 space-y-4 hover:border-stone-500 transition-colors bg-stone-950">
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-stone-200">{diff.title}</h3>
                  <p className="text-xs text-stone-400 font-light leading-relaxed">{diff.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>

      {/* LIGHTBOX MODAL */}
      {lightboxImg && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-sm p-4 animate-fade-in cursor-zoom-out"
          onClick={() => setLightboxImg(null)}
        >
          <button
            id="service-lightbox-close"
            onClick={() => setLightboxImg(null)}
            className="absolute top-6 right-6 text-white/60 hover:text-white text-xs uppercase tracking-widest font-bold flex items-center gap-2 border border-white/20 rounded-full px-4 py-2 hover:bg-white/5 transition-colors"
          >
            Close
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <div className="max-w-5xl max-h-[85vh] overflow-hidden relative" onClick={(e) => e.stopPropagation()}>
            <img
              src={lightboxImg}
              alt="Zoomed workspace"
              className="max-w-full max-h-[80vh] object-contain mx-auto shadow-2xl border border-white/10"
            />
          </div>
        </div>
      )}
    </>
  );
}
