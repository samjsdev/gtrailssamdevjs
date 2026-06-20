'use client';

import { useState, useMemo } from 'react';
import Image from 'next/image';
import { 
  Search, Filter, Folder, Image as ImageIcon, Video, 
  Sparkles, Copy, Check, X, Maximize2, ExternalLink,
  Layers, CheckCircle2, Palette, ShieldCheck, Tag
} from 'lucide-react';

type ScannedFile = {
  path: string;
  name: string;
  folder: string;
  size: number;
};

type Asset = {
  path: string;
  category: string;
  quality: 'high' | 'medium' | 'low';
  recommendedUse: string;
};

interface AssetAuditClientProps {
  files: ScannedFile[];
  inventory: Asset[];
}

export default function AssetAuditClient({ files, inventory }: AssetAuditClientProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFolder, setSelectedFolder] = useState('all');
  const [activeTab, setActiveTab] = useState<'gallery' | 'analysis' | 'inventory'>('gallery');
  const [copied, setCopied] = useState(false);
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);
  const [lightboxVideo, setLightboxVideo] = useState<string | null>(null);

  // Group files by folder
  const folders = useMemo(() => {
    const counts: Record<string, number> = { all: files.length };
    files.forEach(file => {
      counts[file.folder] = (counts[file.folder] || 0) + 1;
    });
    return Object.entries(counts).map(([name, count]) => ({ name, count }));
  }, [files]);

  // Filter files
  const filteredFiles = useMemo(() => {
    return files.filter(file => {
      const matchesSearch = file.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            file.path.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesFolder = selectedFolder === 'all' || file.folder === selectedFolder;
      return matchesSearch && matchesFolder;
    });
  }, [files, searchTerm, selectedFolder]);

  // Handle Copy of Inventory
  const handleCopyInventory = () => {
    const formattedCode = `type Asset = {
  path: string;
  category: string;
  quality: "high" | "medium" | "low";
  recommendedUse: string;
};

export const assetInventory: Asset[] = ${JSON.stringify(inventory, null, 2)};`;

    navigator.clipboard.writeText(formattedCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Helper to format file size
  const formatSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  // Find asset meta info from inventory
  const getAssetMeta = (filePath: string): Asset | undefined => {
    return inventory.find(item => item.path === filePath);
  };

  // Get Visual Type Icon
  const isVideo = (name: string) => name.endsWith('.mp4');

  return (
    <div className="min-h-screen bg-[#0A0D14] text-[#E4E6EB] font-sans antialiased pb-20">
      {/* Background Decorative Blobs */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[#D4A03C]/5 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute top-[40vh] right-1/4 w-[600px] h-[600px] bg-[#8B1A1A]/5 rounded-full blur-[150px] pointer-events-none"></div>

      {/* Header Panel */}
      <header className="border-b border-white/5 bg-[#0D111A]/80 backdrop-blur-md sticky top-0 z-40 px-8 py-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <div className="flex items-center gap-3 text-[#D4A03C] font-bold text-xs uppercase tracking-[0.25em] mb-2">
              <Sparkles className="w-4 h-4 animate-pulse" />
              Creative Studio Dashboard
            </div>
            <h1 className="text-3xl font-sans font-light text-white tracking-tight leading-none">
              Dreamsmine <span className="italic font-normal text-[#D4A03C]">Asset Discovery</span>
            </h1>
          </div>

          {/* Navigation Tabs */}
          <div className="flex bg-white/5 border border-white/10 rounded-xl p-1.5 gap-2 w-full md:w-auto">
            <button 
              onClick={() => setActiveTab('gallery')}
              className={`flex-1 md:flex-none px-5 py-2.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all duration-300 ${activeTab === 'gallery' ? 'bg-[#D4A03C] text-[#0A0D14] shadow-lg shadow-[#D4A03C]/20' : 'text-white/60 hover:text-white hover:bg-white/5'}`}
            >
              Gallery Audit
            </button>
            <button 
              onClick={() => setActiveTab('analysis')}
              className={`flex-1 md:flex-none px-5 py-2.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all duration-300 ${activeTab === 'analysis' ? 'bg-[#D4A03C] text-[#0A0D14] shadow-lg shadow-[#D4A03C]/20' : 'text-white/60 hover:text-white hover:bg-white/5'}`}
            >
              UX Analysis
            </button>
            <button 
              onClick={() => setActiveTab('inventory')}
              className={`flex-1 md:flex-none px-5 py-2.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all duration-300 ${activeTab === 'inventory' ? 'bg-[#D4A03C] text-[#0A0D14] shadow-lg shadow-[#D4A03C]/20' : 'text-white/60 hover:text-white hover:bg-white/5'}`}
            >
              Asset Inventory TS
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-8 mt-12 relative z-10">

        {/* GALLERY AUDIT TAB */}
        {activeTab === 'gallery' && (
          <div className="space-y-8 animate-fade-in">
            {/* Quick Stats Banner */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { label: 'Total Scanned Files', value: files.length, sub: 'All Media Assets' },
                { label: 'Exterior Elevations', value: files.filter(f => f.folder === 'exterior-elevations').length, sub: 'Renders & Handover Photos' },
                { label: 'Interior Promos', value: files.filter(f => f.folder === 'interior-promos').length, sub: 'Interiors & Kitchens' },
                { label: 'Premium Villas', value: files.filter(f => f.folder === 'premium-villas').length, sub: 'Villa Showcases' }
              ].map((stat, i) => (
                <div key={i} className="bg-[#0F1420] border border-white/5 rounded-2xl p-5 hover:border-[#D4A03C]/25 transition-all duration-300">
                  <p className="text-[11px] font-bold text-white/50 uppercase tracking-widest">{stat.label}</p>
                  <p className="text-3xl font-sans font-semibold text-white mt-2">{stat.value}</p>
                  <p className="text-xs text-white/40 mt-1">{stat.sub}</p>
                </div>
              ))}
            </div>

            {/* Controls panel */}
            <div className="bg-[#0F1420] border border-white/5 rounded-2xl p-6 flex flex-col md:flex-row justify-between items-center gap-6">
              {/* Search */}
              <div className="relative w-full md:w-96">
                <Search className="absolute left-4 top-3.5 w-4 h-4 text-white/30" />
                <input 
                  type="text" 
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  placeholder="Search filename or path..." 
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#D4A03C] transition-all"
                />
              </div>

              {/* Folder Tabs */}
              <div className="flex flex-wrap gap-2 w-full md:w-auto justify-start md:justify-end">
                {folders.map(folder => (
                  <button 
                    key={folder.name}
                    onClick={() => setSelectedFolder(folder.name)}
                    className={`px-4 py-2.5 rounded-lg text-xs font-semibold tracking-wide border transition-all ${
                      selectedFolder === folder.name 
                        ? 'bg-white/10 text-white border-[#D4A03C]' 
                        : 'bg-transparent text-white/50 border-white/5 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {folder.name === 'all' ? 'All Folders' : folder.name}
                    <span className="ml-2 px-1.5 py-0.5 rounded bg-white/5 text-[10px] text-white/40">{folder.count}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Results Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredFiles.map((file, i) => {
                const meta = getAssetMeta(file.path);
                const fileIsVideo = isVideo(file.name);
                
                return (
                  <div key={i} className="group bg-[#0F1420] border border-white/5 rounded-2xl overflow-hidden shadow-xl hover:border-white/10 transition-all duration-300 flex flex-col">
                    {/* Media Container */}
                    <div className="relative aspect-video w-full overflow-hidden bg-black flex items-center justify-center group-hover:scale-[1.02] transition-transform duration-500">
                      {fileIsVideo ? (
                        <div className="relative w-full h-full">
                          <video 
                            src={file.path} 
                            muted 
                            loop 
                            playsInline 
                            autoPlay 
                            className="w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 transition-all duration-500"
                          />
                          <div className="absolute top-2 right-2 bg-black/60 rounded-lg p-1.5 border border-white/10">
                            <Video className="w-3.5 h-3.5 text-[#D4A03C]" />
                          </div>
                        </div>
                      ) : (
                        <div className="relative w-full h-full">
                          <Image 
                            src={file.path} 
                            alt={file.name} 
                            fill
                            sizes="(max-width: 768px) 100vw, 300px"
                            className="object-cover grayscale-[30%] group-hover:grayscale-0 transition-all duration-500"
                            unoptimized
                          />
                          <div className="absolute top-2 right-2 bg-black/60 rounded-lg p-1.5 border border-white/10">
                            <ImageIcon className="w-3.5 h-3.5 text-[#D4A03C]" />
                          </div>
                        </div>
                      )}
                      
                      {/* Hover Overlay Controls */}
                      <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                        <button 
                          onClick={() => fileIsVideo ? setLightboxVideo(file.path) : setLightboxImage(file.path)}
                          className="w-10 h-10 rounded-full bg-white/10 hover:bg-[#D4A03C] hover:text-[#0A0D14] flex items-center justify-center transition-all duration-300 text-white"
                          title="Open Fullscreen"
                        >
                          <Maximize2 className="w-4 h-4" />
                        </button>
                        <a 
                          href={file.path} 
                          target="_blank" 
                          rel="noreferrer"
                          className="w-10 h-10 rounded-full bg-white/10 hover:bg-[#D4A03C] hover:text-[#0A0D14] flex items-center justify-center transition-all duration-300 text-white"
                          title="Open in new window"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      </div>
                    </div>

                    {/* Meta info */}
                    <div className="p-5 flex-grow flex flex-col justify-between text-left">
                      <div className="space-y-2">
                        {/* Folder tag */}
                        <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded bg-white/5 border border-white/10 text-[10px] font-semibold text-[#D4A03C] uppercase tracking-wider">
                          <Folder className="w-3 h-3" />
                          {file.folder}
                        </span>
                        
                        {/* Name and Path */}
                        <h4 className="text-sm font-bold text-white tracking-wide truncate" title={file.name}>
                          {file.name}
                        </h4>
                        <p className="text-[10px] text-white/40 break-all font-mono">
                          {file.path}
                        </p>
                      </div>

                      <div className="mt-4 pt-4 border-t border-white/5 flex flex-col gap-2.5">
                        <div className="flex justify-between items-center text-[11px]">
                          <span className="text-white/40">File Size:</span>
                          <span className="font-semibold text-white/70">{formatSize(file.size)}</span>
                        </div>

                        {/* Inventory specifications */}
                        {meta && (
                          <div className="space-y-2 mt-1">
                            <div className="flex items-center gap-1.5">
                              <Tag className="w-3 h-3 text-[#D4A03C]/70" />
                              <span className="text-[10px] text-[#D4A03C] font-medium leading-none">
                                {meta.category}
                              </span>
                            </div>
                            <div className="flex justify-between items-center text-[10px] bg-white/[0.02] border border-white/5 rounded p-1.5">
                              <span className="text-white/40">Quality:</span>
                              <span className={`font-bold uppercase tracking-wider text-[9px] px-1.5 py-0.5 rounded ${
                                meta.quality === 'high' ? 'bg-[#8B1A1A]/30 text-[#FF5D5D]' :
                                meta.quality === 'medium' ? 'bg-[#D4A03C]/20 text-[#EFC473]' :
                                'bg-white/10 text-white/60'
                              }`}>
                                {meta.quality}
                              </span>
                            </div>
                            <p className="text-[10px] text-white/50 leading-normal italic">
                              Recommended use: {meta.recommendedUse}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {filteredFiles.length === 0 && (
              <div className="text-center py-20 bg-[#0F1420] border border-white/5 rounded-2xl">
                <ImageIcon className="w-12 h-12 mx-auto text-white/20 mb-4" />
                <h4 className="text-lg font-bold text-white">No assets matched your filter</h4>
                <p className="text-sm text-white/40 mt-1">Try tweaking your search keywords or folder tabs.</p>
              </div>
            )}
          </div>
        )}

        {/* ANALYSIS TAB */}
        {activeTab === 'analysis' && (
          <div className="space-y-12 animate-fade-in text-left">
            {/* Visual Brand Insights */}
            <div className="bg-[#0F1420] border border-white/5 rounded-3xl p-8 md:p-10 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-48 h-48 bg-[#D4A03C]/10 rounded-full blur-3xl pointer-events-none"></div>
              
              <h3 className="text-2xl font-sans text-white tracking-wide flex items-center gap-3">
                <Palette className="text-[#D4A03C] w-6 h-6" />
                Brand Color Palette & Styling Guidelines
              </h3>
              <p className="text-sm text-white/60 mt-2 max-w-3xl">
                Extracted from the brand guidelines and premium visuals. These hex codes and rules must dictate the layout, text, borders, and image styling overlays across all pages.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mt-8">
                {[
                  { name: 'Dark Navy Blue', hex: '#101820', role: 'Primary background, solid text, premium footer blocks, major branding headers.', rgb: '16, 24, 32' },
                  { name: 'Warm Accent Gold', hex: '#D4A03C', role: 'Gold badges, highlights, CTA accents, button gradients, active states, premium borders.', rgb: '212, 160, 60' },
                  { name: 'Structural Crimson', hex: '#8B1A1A', role: 'Secondary accent for civil engineering icons, architectural highlights, trust highlights.', rgb: '139, 26, 26' },
                  { name: 'Warm Cream / Off-White', hex: '#FCFAF6', role: 'Main content panels, section splits, lighter cards, and clean typography backdrop.', rgb: '252, 250, 246' }
                ].map((color, i) => (
                  <div key={i} className="bg-[#0A0D14] border border-white/5 rounded-2xl p-5 space-y-4">
                    <div className="h-20 w-full rounded-xl shadow-inner border border-white/10" style={{ backgroundColor: color.hex }}></div>
                    <div>
                      <h4 className="font-bold text-white">{color.name}</h4>
                      <p className="text-xs text-[#D4A03C] font-mono mt-0.5">{color.hex}</p>
                      <p className="text-[11px] text-white/50 leading-relaxed mt-2">{color.role}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Core Service Categories */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Service categories */}
              <div className="bg-[#0F1420] border border-white/5 rounded-3xl p-8">
                <h3 className="text-xl font-sans text-white tracking-wide flex items-center gap-3">
                  <Layers className="text-[#D4A03C] w-5.5 h-5.5" />
                  Service Categories Discovery
                </h3>
                <p className="text-xs text-white/50 mt-1">Identified service pillars based on image analysis and template config.</p>
                
                <ul className="space-y-4 mt-6">
                  {[
                    { title: 'Turnkey Residential Construction', desc: 'Premium individual villa and duplex building construction, complete with 100% Vastu planning, anti-termite, water tanks, and top-tier masonry.' },
                    { title: 'Modern Exterior Elevation Renders', desc: 'Expert 3D CAD/rendering services supplying cutting-edge contemporary building elevations before construction begins.' },
                    { title: 'Premium Modular Interior Design', desc: 'Sleek living room wardrobes, master bedroom layouts, TV wall panels, and false ceilings using luxury materials and Asian Paints finishes.' },
                    { title: 'Modular Kitchen Engineering', desc: 'Ergonomic layouts maximizing kitchen storage, smooth hinges, custom baskets, chimney spaces, and granite counters.' },
                    { title: 'Vastu Compliant 2D & 3D Planning', desc: 'Traditional structural orientation principles integrated with modern architecture to enhance light, air flow, and prosperity.' }
                  ].map((srv, i) => (
                    <li key={i} className="flex gap-4 p-4 rounded-xl hover:bg-white/[0.02] transition-colors">
                      <div className="w-2.5 h-2.5 rounded-full bg-[#D4A03C] mt-1.5 shrink-0"></div>
                      <div>
                        <h4 className="text-sm font-bold text-white tracking-wide">{srv.title}</h4>
                        <p className="text-xs text-white/60 leading-relaxed mt-1">{srv.desc}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Project categories & Walkthrough structures */}
              <div className="bg-[#0F1420] border border-white/5 rounded-3xl p-8">
                <h3 className="text-xl font-sans text-white tracking-wide flex items-center gap-3">
                  <ShieldCheck className="text-[#D4A03C] w-5.5 h-5.5" />
                  Technical Craft & Trust Signals
                </h3>
                <p className="text-xs text-white/50 mt-1">Trust pillars found embedded in copy, brand headers, and project clips.</p>

                <ul className="space-y-4 mt-6">
                  {[
                    { title: 'ISO 9001 Certified Developer', desc: 'Dreamsmine operates under international quality standards ensuring strict material testing (like ARS 550D structural steel) and flawless execution.' },
                    { title: '10-Year Material Warranty', desc: 'Reflects absolute durability. Showcasing materials from premium providers like KAG Tiles, Orbit Cables, and Parryware sanitary fittings.' },
                    { title: '1-Year Maintenance Cover', desc: 'A dedicated one-year support coverage post-handover to ensure full settlement adjustments are handled professionally.' },
                    { title: 'Real Site Walkthrough Videos', desc: 'Four full-scale walkthrough videos showing engineering progress (concrete layers, structural frame layouts, partition walls), establishing ultimate transparency.' },
                    { title: 'Vastu Shastra Assurance', desc: '100% compliant designs following cosmic directions for doors, kitchen placements, bedrooms, and water outlets.' }
                  ].map((item, i) => (
                    <li key={i} className="flex gap-4 p-4 rounded-xl hover:bg-white/[0.02] transition-colors">
                      <div className="w-6 h-6 rounded-full bg-[#8B1A1A]/35 text-[#FF5D5D] flex items-center justify-center text-xs font-bold mt-0.5 shrink-0">
                        {i + 1}
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-white tracking-wide">{item.title}</h4>
                        <p className="text-xs text-white/60 leading-relaxed mt-1">{item.desc}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Aesthetics and Visual guidelines */}
            <div className="bg-[#0F1420] border border-white/5 rounded-3xl p-8 relative overflow-hidden">
              <h3 className="text-xl font-sans text-white tracking-wide flex items-center gap-3">
                <Sparkles className="text-[#D4A03C] w-5.5 h-5.5" />
                Visual Guidelines for the Redesign
              </h3>
              <p className="text-xs text-white/50 mt-1">Key stylistic choices that define the architectural and interior designer aesthetic.</p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                {[
                  { title: 'Clean Geometric Grid Lines', desc: 'Incorporate delicate, light gray mesh background grids (like a CAD blueprint layout) representing technical craftsmanship and architectural precision.' },
                  { title: 'Curated Typography Hierarchy', desc: 'Use Jost exclusively with strict uppercase hierarchy, compact labels, and sharp modular spacing.' },
                  { title: 'Contrast Slider Interactivity', desc: 'Utilize smooth fade-in motion effects and overlay sliders to contrast rendering concepts with actual structural completion, showcasing technical capabilities.' }
                ].map((guide, i) => (
                  <div key={i} className="bg-white/[0.02] border border-white/5 rounded-2xl p-5 hover:border-[#D4A03C]/20 transition-all duration-300">
                    <h4 className="font-bold text-[#D4A03C] text-sm uppercase tracking-wider">{guide.title}</h4>
                    <p className="text-xs text-white/60 leading-relaxed mt-2">{guide.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ASSET INVENTORY TS TAB */}
        {activeTab === 'inventory' && (
          <div className="space-y-6 animate-fade-in text-left">
            <div className="bg-[#0F1420] border border-white/5 rounded-3xl p-8">
              <div className="flex justify-between items-center flex-wrap gap-4 mb-6">
                <div>
                  <h3 className="text-xl font-sans text-white tracking-wide">Asset Inventory TypeScript Array</h3>
                  <p className="text-xs text-white/50 mt-1">Copy and paste this typed list straight into your Next.js project config files.</p>
                </div>
                <button
                  onClick={handleCopyInventory}
                  className="flex items-center gap-2 px-4 py-2 bg-[#D4A03C] text-[#0A0D14] hover:bg-[#D4A03C]/80 active:scale-95 transition-all text-xs font-bold rounded-lg uppercase tracking-wider shadow-lg shadow-[#D4A03C]/20"
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      Copy TypeScript Code
                    </>
                  )}
                </button>
              </div>

              {/* Code display window */}
              <div className="relative rounded-2xl overflow-hidden bg-[#070A10] border border-white/5 text-xs text-[#E4E6EB] max-h-[60vh] overflow-y-auto p-6 font-mono leading-relaxed">
                <pre>{`type Asset = {
  path: string;
  category: string;
  quality: "high" | "medium" | "low";
  recommendedUse: string;
};

export const assetInventory: Asset[] = [
${inventory.map(item => `  {
    path: "${item.path}",
    category: "${item.category}",
    quality: "${item.quality}",
    recommendedUse: "${item.recommendedUse}"
  }`).join(',\n')}
];`}</pre>
              </div>
            </div>
          </div>
        )}

      </main>

      {/* LIGHTBOX FOR IMAGES */}
      {lightboxImage && (
        <div 
          className="fixed inset-0 bg-black/95 backdrop-blur-md z-50 flex items-center justify-center p-8 animate-fade-in"
          onClick={() => setLightboxImage(null)}
        >
          <button 
            className="absolute top-6 right-6 w-12 h-12 bg-white/5 hover:bg-white/10 text-white rounded-full flex items-center justify-center transition-all border border-white/10"
            onClick={() => setLightboxImage(null)}
          >
            <X className="w-5 h-5" />
          </button>
          
          <div 
            className="relative max-w-5xl max-h-[80vh] w-full h-full flex items-center justify-center"
            onClick={e => e.stopPropagation()}
          >
            <Image 
              src={lightboxImage} 
              alt="Lightbox view" 
              fill
              className="object-contain rounded-xl"
              unoptimized
            />
          </div>
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-black/60 border border-white/10 px-5 py-2.5 rounded-full text-xs text-white/70 font-mono tracking-wide">
            {lightboxImage}
          </div>
        </div>
      )}

      {/* LIGHTBOX FOR VIDEOS */}
      {lightboxVideo && (
        <div 
          className="fixed inset-0 bg-black/95 backdrop-blur-md z-50 flex items-center justify-center p-8 animate-fade-in"
          onClick={() => setLightboxVideo(null)}
        >
          <button 
            className="absolute top-6 right-6 w-12 h-12 bg-white/5 hover:bg-white/10 text-white rounded-full flex items-center justify-center transition-all border border-white/10"
            onClick={() => setLightboxVideo(null)}
          >
            <X className="w-5 h-5" />
          </button>
          
          <div 
            className="relative max-w-5xl max-h-[85vh] w-full h-full flex items-center justify-center"
            onClick={e => e.stopPropagation()}
          >
            <video 
              src={lightboxVideo} 
              controls 
              autoPlay 
              className="max-w-full max-h-full rounded-xl"
            />
          </div>
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-black/60 border border-white/10 px-5 py-2.5 rounded-full text-xs text-white/70 font-mono tracking-wide">
            {lightboxVideo}
          </div>
        </div>
      )}
    </div>
  );
}
