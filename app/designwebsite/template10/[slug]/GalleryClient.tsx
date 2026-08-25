'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Filter, Eye, X, Building, Compass, Sparkles, Hammer } from 'lucide-react';

interface ProjectItem {
  id: string;
  title: string;
  category: 'architecture' | 'construction' | 'interior';
  location: string;
  area: string;
  image: string;
  description: string;
  badge: string;
}

interface GalleryClientProps {
  projects: ProjectItem[];
}

export default function GalleryClient({ projects }: GalleryClientProps) {
  const [activeFilter, setActiveFilter] = useState<'all' | 'architecture' | 'construction' | 'interior'>('all');
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  const filtered = activeFilter === 'all' 
    ? projects 
    : projects.filter(p => p.category === activeFilter);

  return (
    <div>
      {/* Category Filter Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
        {[
          { id: 'all', label: 'ALL PORTFOLIO PROJECTS', icon: Filter },
          { id: 'architecture', label: 'ARCHITECTURAL ELEVATIONS', icon: Compass },
          { id: 'construction', label: 'RESIDENTIAL CONSTRUCTION', icon: Building },
          { id: 'interior', label: 'LUXURY INTERIORS', icon: Sparkles },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeFilter === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveFilter(tab.id as any)}
              className={`flex items-center gap-2 px-5 py-3 text-xs font-black uppercase tracking-wider transition-all border-2 ${
                isActive
                  ? 'bg-[#E94B26] text-[#F4F3EE] border-[#E94B26] shadow-[3px_3px_0px_#111111]'
                  : 'bg-[#252A29] text-[#F4F3EE]/80 border-[#252A29] hover:border-[#C8A84E]/70 hover:text-[#F4F3EE]'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Project Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((project) => (
          <div
            key={project.id}
            onClick={() => setSelectedProject(project)}
            className="group bg-[#181B1A] border-2 border-[#252A29] hover:border-[#E94B26] cursor-pointer transition-all shadow-[4px_4px_0px_#111111] hover:shadow-[6px_6px_0px_#E94B26] hover:-translate-y-1 overflow-hidden flex flex-col"
          >
            {/* Image Box */}
            <div className="relative h-64 w-full overflow-hidden bg-[#111111]">
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 768px) 100vw, 400px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#111111]/90 via-transparent to-transparent" />
              
              {/* Category Badge */}
              <div className="absolute top-3 left-3 bg-[#111111]/90 text-[#C8A84E] text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 border border-[#C8A84E]/40">
                {project.badge}
              </div>

              {/* View Overlay icon */}
              <div className="absolute bottom-3 right-3 w-9 h-9 bg-[#E94B26] text-[#F4F3EE] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <Eye className="w-4 h-4" />
              </div>
            </div>

            {/* Content info */}
            <div className="p-5 flex-1 flex flex-col justify-between">
              <div>
                <h4 className="text-lg font-black uppercase text-[#F4F3EE] tracking-tight group-hover:text-[#E94B26] transition-colors mb-2">
                  {project.title}
                </h4>
                <p className="text-xs text-[#F4F3EE]/70 font-mono line-clamp-2 leading-relaxed">
                  {project.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-[#252A29] flex items-center justify-between text-[11px] font-mono text-[#C8A84E]">
                <span>LOCATION: {project.location}</span>
                <span>{project.area}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 bg-[#111111]/90 backdrop-blur-sm flex items-center justify-center p-4 sm:p-8">
          <div className="bg-[#181B1A] border-4 border-[#E94B26] max-w-4xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-[12px_12px_0px_#000000] relative">
            <button
              type="button"
              onClick={() => setSelectedProject(null)}
              className="absolute top-4 right-4 p-2 bg-[#252A29] text-[#F4F3EE] hover:text-[#E94B26] border border-[#C8A84E]/40"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="relative h-80 sm:h-96 w-full mb-6 border-2 border-[#252A29]">
              <Image
                src={selectedProject.image}
                alt={selectedProject.title}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 800px"
              />
            </div>

            <div className="inline-block bg-[#E94B26] text-[#F4F3EE] text-xs font-black uppercase tracking-widest px-3 py-1 mb-2">
              {selectedProject.badge}
            </div>

            <h3 className="text-2xl sm:text-3xl font-black uppercase text-[#F4F3EE] tracking-tight mb-2">
              {selectedProject.title}
            </h3>

            <div className="flex flex-wrap gap-4 text-xs font-mono text-[#C8A84E] mb-4 pb-4 border-b border-[#252A29]">
              <span>PROJECT LOCATION: {selectedProject.location}</span>
              <span>•</span>
              <span>BUILT-UP AREA: {selectedProject.area}</span>
              <span>•</span>
              <span>STATUS: COMPLETED & DELIVERED</span>
            </div>

            <p className="text-sm text-[#F4F3EE]/80 leading-relaxed font-sans mb-6">
              {selectedProject.description}
            </p>

            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => setSelectedProject(null)}
                className="px-6 py-2.5 bg-[#252A29] text-[#F4F3EE] text-xs font-bold uppercase tracking-wider border border-[#C8A84E]"
              >
                CLOSE INSPECTION
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
