"use client";

import { useState, useCallback } from "react";

type Project = {
  id: string;
  name: string;
  category: string;
  description: string;
  images: string[];
};

type ProjectsSectionProps = {
  projects: Project[];
};

export default function ProjectsSection({ projects }: ProjectsSectionProps) {
  const [activeProject, setActiveProject] = useState<string | null>(null);
  const [activeImageIdx, setActiveImageIdx] = useState<number>(0);

  // Filter out any metadata or dummy entries, keep only Medavakkam and Taramani
  const mainProjects = projects.filter(p => p.id === "medavakkam" || p.id === "taramani");

  const openProjectPopup = useCallback((projectId: string) => {
    setActiveProject(projectId);
    setActiveImageIdx(0);
  }, []);

  const closeProjectPopup = useCallback(() => {
    setActiveProject(null);
  }, []);

  const currentProject = mainProjects.find(p => p.id === activeProject);
  const currentImages = currentProject ? currentProject.images : [];

  const goNext = useCallback(() => {
    if (currentImages.length === 0) return;
    setActiveImageIdx((prev) => (prev + 1) % currentImages.length);
  }, [currentImages.length]);

  const goPrev = useCallback(() => {
    if (currentImages.length === 0) return;
    setActiveImageIdx((prev) => (prev - 1 + currentImages.length) % currentImages.length);
  }, [currentImages.length]);

  return (
    <div className="space-y-8">
      {/* 2 PROJECTS CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {mainProjects.map((project) => {
          const coverImage = project.images[0] || "/images/placeholder.jpg";
          return (
            <div
              key={project.id}
              onClick={() => openProjectPopup(project.id)}
              className="group relative cursor-pointer overflow-hidden border border-stone-200 bg-white transition-all duration-500 hover:border-stone-400 hover:shadow-xl flex flex-col"
            >
              {/* Image Container */}
              <div className="relative aspect-[16/10] overflow-hidden bg-stone-100 border-b border-stone-150">
                <img
                  src={coverImage}
                  alt={project.name}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                
                {/* Visual Count Badge */}
                <div className="absolute top-4 right-4 bg-stone-900/80 backdrop-blur-md px-3 py-1 text-[9px] font-bold text-white uppercase tracking-widest border border-white/10">
                  {project.images.length} Photos
                </div>
              </div>

              {/* Text Description */}
              <div className="p-6 space-y-3 flex-1 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] font-bold uppercase tracking-widest text-stone-400">
                      {project.category}
                    </span>
                  </div>
                  <h3 className="text-lg font-light text-stone-900 tracking-wide group-hover:text-stone-700 transition-colors">
                    {project.name}
                  </h3>
                  <p className="text-xs text-stone-500 font-light leading-relaxed">
                    {project.description}
                  </p>
                </div>
                
                {/* Call-to-action */}
                <div className="pt-4 flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-stone-900 group-hover:translate-x-1 transition-transform">
                  Explore Project
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="w-3.5 h-3.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* FULLSCREEN POPUP GALLERY MODAL */}
      {currentProject && currentImages.length > 0 && (
        <div
          className="fixed inset-0 z-[100] flex flex-col bg-black/95 backdrop-blur-sm cursor-default"
          onClick={closeProjectPopup}
        >
          {/* Top Bar inside modal */}
          <div className="w-full flex items-center justify-between px-6 py-4 border-b border-white/10 z-10 bg-black/40 backdrop-blur-md" onClick={(e) => e.stopPropagation()}>
            <div className="space-y-1">
              <h4 className="text-white text-base font-light tracking-wide">{currentProject.name}</h4>
              <p className="text-white/40 text-[9px] font-bold uppercase tracking-widest">
                {currentProject.category} — Photo {activeImageIdx + 1} of {currentImages.length}
              </p>
            </div>
            
            {/* Close Button */}
            <button
              onClick={closeProjectPopup}
              className="text-white/60 hover:text-white text-xs uppercase tracking-widest font-bold flex items-center gap-2 border border-white/20 rounded-full px-4 py-2 hover:bg-white/5 transition-colors"
            >
              Close
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Main Modal Display Area */}
          <div className="flex-1 relative flex items-center justify-center p-4 md:p-8" onClick={closeProjectPopup}>
            
            {/* Prev Navigation Button */}
            <button
              onClick={(e) => { e.stopPropagation(); goPrev(); }}
              className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 text-white/50 hover:text-white border border-white/20 rounded-full w-12 h-12 flex items-center justify-center hover:bg-white/10 transition-colors z-20"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
              </svg>
            </button>

            {/* Image display */}
            <div className="max-w-4xl max-h-[70vh] flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
              <img
                src={currentImages[activeImageIdx]}
                alt={`${currentProject.name} Slider Photo ${activeImageIdx + 1}`}
                className="max-w-full max-h-[70vh] object-contain shadow-2xl border border-white/10"
              />
            </div>

            {/* Next Navigation Button */}
            <button
              onClick={(e) => { e.stopPropagation(); goNext(); }}
              className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 text-white/50 hover:text-white border border-white/20 rounded-full w-12 h-12 flex items-center justify-center hover:bg-white/10 transition-colors z-20"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </button>
          </div>

          {/* Bottom Thumbnails Strip */}
          <div 
            className="w-full py-4 border-t border-white/10 overflow-x-auto bg-black/60 flex justify-center gap-2 px-6"
            onClick={(e) => e.stopPropagation()}
          >
            {currentImages.map((imgSrc, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImageIdx(idx)}
                className={`relative w-16 h-12 flex-shrink-0 border overflow-hidden transition-all duration-300 ${
                  activeImageIdx === idx ? "border-white scale-105" : "border-white/20 opacity-50 hover:opacity-100"
                }`}
              >
                <img src={imgSrc} alt="thumbnail" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
