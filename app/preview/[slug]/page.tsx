'use client';

import { use, useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  Loader2, Eye, Check, ExternalLink, Globe, Layout, 
  Sparkles, AlertCircle, ArrowLeft, ArrowRight, ShieldCheck 
} from 'lucide-react';

const TEMPLATES = [
  { 
    id: 'template1', 
    name: 'Modern Studio', 
    description: 'Editorial, high-contrast layout with elegant serif headings. Tailored for premium residential interiors.', 
    color: 'from-amber-500/20 to-orange-600/20',
    accentColor: '#C1FF72',
    tag: 'Editorial & Elegant'
  },
  { 
    id: 'template2', 
    name: 'Calm Home', 
    description: 'Warm, airy presentation with sophisticated spacing. Best for approachable and organic interior design studios.', 
    color: 'from-emerald-500/20 to-teal-600/20',
    accentColor: '#10B981',
    tag: 'Warm & Organic'
  },
  { 
    id: 'template3', 
    name: 'Luxe Interiors', 
    description: 'Minimalist, high-end theme featuring large, immersive imagery for premium luxury portfolios.', 
    color: 'from-blue-500/20 to-indigo-600/20',
    accentColor: '#3B82F6',
    tag: 'Minimal & Luxury'
  },
  { 
    id: 'template4', 
    name: 'Precision Studio', 
    description: 'Bold, grid-based layouts and structured frameworks. Ideal for design-build teams and turnkey contractors.', 
    color: 'from-purple-500/20 to-pink-600/20',
    accentColor: '#A855F7',
    tag: 'Technical & Bold'
  },
  { 
    id: 'template6', 
    name: 'Neo-Brutalist Flow', 
    description: 'Flat shadows, vintage highlights, and bold borders. Perfect for avant-garde design agencies.', 
    color: 'from-rose-500/20 to-red-600/20',
    accentColor: '#F43F5E',
    tag: 'Avant-Garde'
  },
  { 
    id: 'template10', 
    name: 'Urban Industrial', 
    description: 'Raw grids, steel frames, and concrete textures. Tailored for industrial loft designs and rustic decors.', 
    color: 'from-gray-500/20 to-slate-700/20',
    accentColor: '#475569',
    tag: 'Industrial & Raw'
  },
];

export default function PreviewPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params);
  const { slug } = resolvedParams;
  const router = useRouter();

  const [selectedTemplateId, setSelectedTemplateId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [publishing, setPublishing] = useState(false);
  const [publishProgress, setPublishProgress] = useState<string>('');
  const [publishError, setPublishError] = useState<string>('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [clinicName, setClinicName] = useState<string>('');

  useEffect(() => {
    async function loadConfig() {
      try {
        const res = await fetch(`/api/data?slug=${slug}`);
        if (res.ok) {
          const data = await res.json();
          setClinicName(data.clinic?.name || slug);
          if (data.selected_template) {
            setSelectedTemplateId(data.selected_template);
          }
        }
      } catch (err) {
        console.error('Failed to load clinic configuration', err);
      } finally {
        setLoading(false);
      }
    }
    loadConfig();
  }, [slug]);

  const handlePublish = async (templateId: string) => {
    setPublishing(true);
    setPublishError('');
    setIsSuccess(false);

    // Mock progress steps for good user experience
    const progressSteps = [
      'Registering selected layout preferences...',
      'Compiling production bundles and media optimization...',
      'Packaging static HTML files and structural maps...',
      'Uploading website assets to Appwrite Storage CDN...',
    ];

    let stepIndex = 0;
    setPublishProgress(progressSteps[0]);

    const progressInterval = setInterval(() => {
      if (stepIndex < progressSteps.length - 1) {
        stepIndex++;
        setPublishProgress(progressSteps[stepIndex]);
      }
    }, 4500); // cycle through steps during build

    try {
      const res = await fetch('/api/publish', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slug, templateId })
      });

      clearInterval(progressInterval);

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.error || 'Failed to compile and publish website');
      }

      setSelectedTemplateId(templateId);
      setIsSuccess(true);
    } catch (err: any) {
      clearInterval(progressInterval);
      setPublishError(err.message || 'An error occurred during build/deployment.');
    } finally {
      setPublishing(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-8">
        <Loader2 className="animate-spin text-blue-500 h-10 w-10 mb-4" />
        <p className="text-gray-500 font-medium">Fetching design configuration...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 font-sans pb-24">
      {/* Header Bar */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Link href={`/private/admin/edit/${slug}`} className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div>
              <h1 className="font-bold text-xl text-gray-900">{clinicName || 'Studio Manager'}</h1>
              <p className="text-xs text-gray-500 font-mono">slug: {slug}</p>
            </div>
          </div>
          <Link href="/private/admin/dashboard" className="text-sm font-semibold text-gray-600 hover:text-gray-900 transition-colors">
            All Sites
          </Link>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-6 mt-12">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" /> 6 Themes Generated Dynamically
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
            Choose &amp; Publish Website Design
          </h2>
          <p className="text-gray-500 text-base leading-relaxed">
            Preview each layout dynamically loaded with your scraped business details. Once you find the perfect match, click <strong>Publish</strong> to package it as a fast static site.
          </p>
        </div>

        {/* Templates Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {TEMPLATES.map((tpl) => {
            const isCurrent = selectedTemplateId === tpl.id;
            const previewUrl = `/designwebsite/${tpl.id}/${slug}`;

            return (
              <div 
                key={tpl.id}
                className={`bg-white rounded-2xl border transition-all overflow-hidden flex flex-col group relative ${
                  isCurrent 
                    ? 'border-blue-500 shadow-lg ring-2 ring-blue-500/20' 
                    : 'border-gray-200 hover:border-gray-300 hover:shadow-md'
                }`}
              >
                {/* Visual Header Mock */}
                <div className={`h-44 bg-gradient-to-br ${tpl.color} relative overflow-hidden flex items-center justify-center p-6 border-b border-gray-100`}>
                  <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm px-2.5 py-0.5 rounded-full font-bold text-[10px] uppercase text-gray-600 tracking-wider shadow-sm">
                    {tpl.tag}
                  </div>
                  
                  {isCurrent && (
                    <div className="absolute top-3 right-3 bg-blue-600 text-white px-2.5 py-0.5 rounded-full font-bold text-[10px] uppercase tracking-wider shadow-md flex items-center gap-1">
                      <Check className="w-3 h-3" /> Live
                    </div>
                  )}

                  <div className="space-y-2 text-center">
                    <span className="text-[11px] font-mono text-gray-500 tracking-wider block">THEME DESIGN</span>
                    <h3 className="font-serif text-2xl font-bold text-gray-800 leading-tight">{tpl.name}</h3>
                  </div>
                </div>

                {/* Content Box */}
                <div className="p-6 flex-1 flex flex-col justify-between gap-6">
                  <div className="space-y-2">
                    <h4 className="font-bold text-gray-900 text-md">{tpl.name}</h4>
                    <p className="text-gray-600 text-sm leading-relaxed">{tpl.description}</p>
                  </div>

                  <div className="space-y-3 pt-4 border-t border-gray-50">
                    <a
                      href={previewUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-gray-50 text-gray-700 font-semibold text-sm rounded-xl border border-gray-200 hover:bg-gray-100 transition-colors"
                    >
                      <Eye className="w-4 h-4 text-gray-400" /> Preview Layout
                    </a>
                    
                    <button
                      onClick={() => handlePublish(tpl.id)}
                      disabled={publishing}
                      className={`w-full py-2.5 px-4 rounded-xl text-sm font-bold tracking-wide transition-all flex items-center justify-center gap-2 ${
                        isCurrent
                          ? 'bg-blue-50 text-blue-600 border border-blue-100 cursor-default'
                          : 'bg-blue-600 text-white hover:bg-blue-700 shadow-sm'
                      }`}
                    >
                      {isCurrent ? (
                        <>
                          <Check className="w-4 h-4" /> Already Published
                        </>
                      ) : (
                        <>
                          <Globe className="w-4 h-4" /> Confirm &amp; Publish
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </main>

      {/* Progress / Loading Screen Modal Overlay */}
      {publishing && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center z-50 p-6">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl border border-gray-100 text-center space-y-6 animate-in fade-in zoom-in-95 duration-200">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-50 text-blue-500 rounded-full relative">
              <Loader2 className="w-8 h-8 animate-spin" />
            </div>
            
            <div className="space-y-2">
              <h3 className="font-bold text-xl text-gray-900">Compiling Static Assets</h3>
              <p className="text-gray-500 text-sm">Please hold on. We are generating your production website bundle.</p>
            </div>

            <div className="bg-gray-50 border rounded-xl p-4 font-mono text-xs text-gray-600 leading-normal text-left flex items-start gap-3">
              <Loader2 className="w-3.5 h-3.5 animate-spin text-gray-400 shrink-0 mt-0.5" />
              <span>{publishProgress}</span>
            </div>
            
            <p className="text-[10px] text-gray-400">This takes about 20-30 seconds depending on Next.js build optimization.</p>
          </div>
        </div>
      )}

      {/* Success Modal Overlay */}
      {isSuccess && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center z-50 p-6">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl border border-gray-100 text-center space-y-6 animate-in fade-in zoom-in-95 duration-200">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-50 text-green-500 rounded-full border border-green-100">
              <ShieldCheck className="w-8 h-8" />
            </div>
            
            <div className="space-y-2">
              <h3 className="font-bold text-2xl text-gray-900">Website is Live!</h3>
              <p className="text-gray-500 text-sm">
                Your data has been successfully packaged into the production template and is now published.
              </p>
            </div>

            <div className="bg-green-50/50 border border-green-100 rounded-xl p-4 space-y-1.5 text-center">
              <span className="text-[10px] font-bold text-green-700 tracking-widest uppercase">LIVE URL ADDRESS</span>
              <a 
                href={`/website/${slug}`} 
                target="_blank" 
                rel="noopener noreferrer"
                className="block text-blue-600 hover:text-blue-800 font-semibold text-sm underline truncate"
              >
                /website/{slug}
              </a>
            </div>

            <div className="flex flex-col gap-2 pt-2">
              <a
                href={`/website/${slug}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm rounded-xl transition-all shadow-md"
              >
                Visit Live Site <ArrowRight className="w-4 h-4" />
              </a>

              <div className="flex gap-2">
                <button
                  onClick={() => setIsSuccess(false)}
                  className="flex-1 py-2.5 px-4 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold text-xs rounded-xl transition-colors border"
                >
                  Configure More
                </button>
                <Link
                  href="/private/admin/dashboard"
                  className="flex-1 py-2.5 px-4 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold text-xs rounded-xl transition-colors border flex items-center justify-center"
                >
                  Dashboard
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Error Banner */}
      {publishError && (
        <div className="max-w-4xl mx-auto px-6 mt-8">
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex gap-3 text-sm text-red-700 items-start">
            <AlertCircle className="w-5 h-5 shrink-0 text-red-500 mt-0.5" />
            <div>
              <h4 className="font-bold text-red-900 mb-1">Publication Failed</h4>
              <p>{publishError}</p>
              <button 
                onClick={() => setPublishError('')}
                className="mt-3 text-xs font-bold text-red-800 hover:underline"
              >
                Dismiss
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
