'use client';

import { use } from 'react';
import Link from 'next/link';

export default function PreviewPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params);
  const { slug } = resolvedParams;

  const templates = [
    { id: '1', name: 'Modern Studio', description: 'Editorial, high-contrast layout for premium residential interiors.', href: `/designwebsite/template1/${slug}` },
    { id: '2', name: 'Calm Home', description: 'Warm, airy presentation for approachable interior studios.', href: `/designwebsite/template2/${slug}` },
    { id: '3', name: 'Luxe Interiors', description: 'Elegant, polished theme for high-end design portfolios.', href: `/designwebsite/template3/${slug}` },
    { id: '4', name: 'Precision Studio', description: 'Bold, systems-led theme for turnkey execution teams.', href: `/designwebsite/template4/${slug}` },
    { id: '5', name: 'Organic Earthy', description: 'Clay tones and warm wood colors reflecting indoor nature.', href: `/designwebsite/template5/${slug}` },
    { id: '6', name: 'Neo-Brutalist', description: 'Bold thick borders and flat offset shadows with vintage highlights.', href: `/designwebsite/template6/${slug}` },
    { id: '7', name: 'Mid-Century Modern', description: 'Retro-inspired palette (teak wood & mustard yellow) with clean lines.', href: `/designwebsite/template7/${slug}` },
    { id: '8', name: 'Minimalist Glass', description: 'Subtle backdrop blurs and semi-transparent frosted containers.', href: `/designwebsite/template8/${slug}` },
    { id: '9', name: 'Coastal Serene', description: 'Ocean breeze blue accents and light sandy oak textures.', href: `/designwebsite/template9/${slug}` },
    { id: '10', name: 'Urban Industrial', description: 'Brick red accents, steel gray layouts, and heavy raw frames.', href: `/designwebsite/template10/${slug}` },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-8">
      <div className="w-full max-w-4xl bg-white p-8 rounded-xl shadow-lg border border-gray-100">
        <h1 className="text-3xl font-bold text-gray-800 text-center mb-8">Website Generated Successfully!</h1>
        <p className="text-gray-500 text-center mb-12">Your data for <strong>{slug}</strong> has been bound to 10 distinct interior templates. Click below to preview them.</p>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {templates.map((tpl) => (
            <Link
              key={tpl.id}
              href={tpl.href}
              className="group block"
              target="_blank"
            >
              <div className="border border-gray-200 rounded-xl overflow-hidden hover:border-blue-500 hover:shadow-md transition-all bg-gray-50">
                <div className="h-40 bg-linear-to-br from-blue-100 to-white flex items-center justify-center">
                  <span className="text-xl font-semibold text-gray-700">Template {tpl.id}</span>
                </div>
                <div className="p-4 bg-white">
                  <h3 className="font-bold text-lg mb-1 group-hover:text-blue-600">{tpl.name}</h3>
                  <p className="text-sm text-gray-600">{tpl.description}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
        
        <div className="mt-12 text-center text-sm text-gray-400">
          * Links open in a new tab. Output serves as a live preview.
        </div>
      </div>
    </div>
  );
}
