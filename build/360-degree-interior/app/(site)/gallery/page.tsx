import { readSourceConfig } from '@/lib/sourceData';
import { notFound } from "next/navigation";
import GalleryGrid from "./GalleryGrid";
import ProjectsSection from "./ProjectsSection";
import { cleanClinicName } from "@/lib/copyCleaner";
import fs from 'fs';
import path from 'path';

export default async function GalleryPage({ params }: { params?: any }) {
  const slug = ''; // standalone: slug not needed for data loading

  const data = await readSourceConfig(undefined, 'template4');
  if (!data) return notFound();

  const { clinic, media } = data;
  const cleanName = cleanClinicName(clinic.name);

  // Load project images dynamically from public directory
  const projectRootDir = process.cwd();
  
  const medavakkamPath = path.join(projectRootDir, 'public', 'images', 'interiorimages', 'project-medavakkam');
  const taramaniPath = path.join(projectRootDir, 'public', 'images', 'interiorimages', 'ramaniyam-taramani');
  const interiorimagesPath = path.join(projectRootDir, 'public', 'images', 'interiorimages');

  let medavakkamImages: string[] = [];
  try {
    if (fs.existsSync(medavakkamPath)) {
      medavakkamImages = fs.readdirSync(medavakkamPath)
        .filter(file => /\.(png|jpe?g|webp|svg)$/i.test(file))
        .map(file => `/images/interiorimages/project-medavakkam/${file}`);
    }
  } catch (e) {
    console.error(e);
  }

  let taramaniImages: string[] = [];
  try {
    if (fs.existsSync(taramaniPath)) {
      taramaniImages = fs.readdirSync(taramaniPath)
        .filter(file => /\.(png|jpe?g|webp|svg)$/i.test(file))
        .map(file => `/images/interiorimages/ramaniyam-taramani/${file}`);
    }
  } catch (e) {
    console.error(e);
  }

  let cycleImages: string[] = [];
  try {
    if (fs.existsSync(interiorimagesPath)) {
      cycleImages = fs.readdirSync(interiorimagesPath)
        .filter(file => /^cycle\d+\.webp$/i.test(file))
        .map(file => `/images/interiorimages/${file}`);
    }
  } catch (e) {
    console.error(e);
  }

  const projectsData = [
    {
      id: "medavakkam",
      name: "Project - Medavakkam",
      category: "Residential" as const,
      description: "Bespoke residential interior work featuring customized storage, premium partitions, and kitchen modular installations.",
      images: medavakkamImages
    },
    {
      id: "taramani",
      name: "Ramaniyam Taramani",
      category: "Commercial" as const,
      description: "Premium execution in high-rise layouts, highlighting precise partition grids, materials, and elegant textures.",
      images: taramaniImages
    },
    {
      id: "process",
      name: "Studio & Process",
      category: "Studio & Process" as const,
      description: "Visual walkthrough of our design workflow, detailed engineering stages, and site coordination.",
      images: cycleImages
    }
  ];

  // Collect all images, deduplicate, and filter out broken/api paths
  const allImages = Array.from(new Set([
    ...(media.clinicImages || []),
    ...(media.otherImages || []),
  ].filter((img: string) => {
    if (!img) return false;
    // Remove /api/media paths (broken) and keep only local /images/ paths
    if (img.includes('/api/media')) return false;
    return true;
  })));

  const cats = ['Residential', 'Commercial', 'Studio & Process'];

  // One card per unique image — no repeats
  const GALLERY_ITEMS = allImages.map((imgUrl, i) => {
    const cat = cats[i % cats.length];
    const span: 'tall' | 'wide' | undefined =
      i % 7 === 0 ? 'wide' : i % 11 === 0 ? 'tall' : undefined;

    return {
      cat,
      title: `Project Space #${i + 1}`,
      desc: `Custom interior feature designed and coordinated for ${cleanName || 'our studio'}.`,
      img: imgUrl,
      span,
    };
  });

  return (
    <div className="text-stone-900 bg-stone-50 min-h-screen pb-32 selection:bg-stone-200">
      
      {/* HEADER HERO */}
      <section className="relative pt-36 pb-16 px-6 max-w-6xl mx-auto text-center z-10 space-y-16">
        <div className="space-y-6 max-w-4xl mx-auto">
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-stone-500">— EDITORIAL GALLERY</p>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-light text-stone-900 leading-tight">
            {clinic.name || "Our Work & Space"}
          </h1>
          <p className="text-base md:text-lg text-stone-600 font-light max-w-2xl mx-auto leading-relaxed">
            {clinic.description || "Explore the spatial designs we have developed and the clean physical library where our projects begin."}
          </p>

          {/* Minimal Stats Bar */}
          <div className="flex flex-wrap justify-center gap-x-12 gap-y-6 pt-8 max-w-2xl mx-auto">
            {[
              { val: `${allImages.length + medavakkamImages.length + taramaniImages.length + cycleImages.length}+`, tag: "PROJECT PHOTOS" },
              { val: "200+", tag: "STUDIOS DELIVERED" },
              { val: "10+", tag: "YEARS ARCHITECTURE" }
            ].map((stat, idx) => (
              <div key={idx} className="flex flex-col items-center">
                <span className="text-2xl md:text-3xl font-light text-stone-900">{stat.val}</span>
                <span className="text-[9px] font-bold text-stone-400 uppercase tracking-widest mt-1">
                  {stat.tag}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Fine Horizontal Divider Line */}
        <div className="flex items-center gap-6 max-w-5xl mx-auto opacity-80">
          <div className="h-px flex-1 bg-stone-200" />
          <span className="text-[9px] font-bold uppercase tracking-[0.25em] text-stone-400">
            PROJECTS
          </span>
          <div className="h-px flex-1 bg-stone-200" />
        </div>
      </section>

      {/* Featured Projects Grid Section */}
      <section className="max-w-5xl mx-auto text-left px-6 pb-20">
        <ProjectsSection projects={projectsData} />
      </section>

      {/* Divider for Gallery Archive */}
      <section className="max-w-5xl mx-auto px-6 py-6">
        <div className="flex items-center gap-6 opacity-80">
          <div className="h-px flex-1 bg-stone-200" />
          <span className="text-[9px] font-bold uppercase tracking-[0.25em] text-stone-400">
            GALLERY ARCHIVE
          </span>
          <div className="h-px flex-1 bg-stone-200" />
        </div>
      </section>

      {/* Interactive Gallery */}
      <section id="gallery-grid" className="max-w-5xl mx-auto text-left px-6">
        <GalleryGrid items={GALLERY_ITEMS} />
      </section>

    </div>
  );
}
