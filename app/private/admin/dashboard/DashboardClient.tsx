'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ExternalLink, Edit, Search, ArrowUpDown } from 'lucide-react';
import DeleteSiteButton from '@/components/DeleteSiteButton';

interface Site {
  slug: string;
  name: string;
  rating: string;
  reviews: string;
  image: string;
  date: string;
  timestamp: number;
}

export default function DashboardClient({ initialSites }: { initialSites: Site[] }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('newest'); // 'newest', 'oldest', 'a-z', 'z-a'

  // Filter and sort sites
  const filteredSites = initialSites.filter(site => 
    site.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedSites = [...filteredSites].sort((a, b) => {
    if (sortBy === 'newest') return b.timestamp - a.timestamp;
    if (sortBy === 'oldest') return a.timestamp - b.timestamp;
    if (sortBy === 'a-z') return a.name.localeCompare(b.name);
    if (sortBy === 'z-a') return b.name.localeCompare(a.name);
    return 0;
  });

  if (initialSites.length === 0) {
    return (
      <div className="bg-white border text-center p-16 rounded-xl border-dashed border-gray-300">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-50 mb-4">
          <ExternalLink className="w-8 h-8 text-blue-500" />
        </div>
        <h3 className="text-xl font-bold text-gray-800 mb-2">No Studios Generated Yet</h3>
        <p className="text-gray-500 mb-6">Paste a Google Maps link to generate your first interior design website payload.</p>
        <Link href="/private/admin" className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium shadow-sm hover:bg-blue-700 transition">
          Create New Site
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Search and Sort Controls */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search sites by name..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
          />
        </div>
        <div className="flex items-center gap-2">
          <ArrowUpDown className="w-5 h-5 text-gray-500" />
          <select 
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2 bg-white focus:ring-2 focus:ring-blue-500 outline-none cursor-pointer"
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="a-z">Name (A-Z)</option>
            <option value="z-a">Name (Z-A)</option>
          </select>
        </div>
      </div>

      {sortedSites.length === 0 ? (
        <div className="bg-white border text-center p-12 rounded-xl border-dashed border-gray-300">
          <h3 className="text-lg font-bold text-gray-800 mb-2">No results found</h3>
          <p className="text-gray-500">We couldn't find any sites matching "{searchTerm}"</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedSites.map(site => (
            <div key={site.slug} className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-all group group-hover:border-blue-300 relative flex flex-col">
              <div className="h-48 overflow-hidden bg-gray-100 relative shrink-0">
                 <img src={site.image} alt={site.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                 <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 font-bold text-sm text-gray-800 rounded-full flex gap-1 shadow">
                   ⭐ {site.rating} <span className="opacity-50">({site.reviews})</span>
                 </div>
              </div>
              <div className="p-5 flex flex-col gap-4 flex-1">
                <div>
                  <h3 className="font-bold text-lg text-gray-900 truncate" title={site.name}>{site.name}</h3>
                  <p className="text-sm text-gray-500 font-medium">Added • {site.date}</p>
                </div>
                
                <div className="flex gap-2 w-full pt-4 border-t border-gray-50 mt-auto">
                   <Link href={`/private/admin/edit/${site.slug}`} className="flex-1 flex justify-center items-center py-2 px-3 bg-gray-50 text-gray-700 font-semibold text-sm rounded-md border border-gray-200 hover:bg-gray-100 transition-colors">
                     <Edit className="w-4 h-4 mr-2" /> Edit
                   </Link>
                   <Link href={`/preview/${site.slug}`} className="flex-1 flex justify-center items-center py-2 px-3 bg-blue-50 text-blue-700 font-semibold text-sm rounded-md border border-blue-100 hover:bg-blue-100 transition-colors">
                     <ExternalLink className="w-4 h-4 mr-2" /> Preview
                   </Link>
                   <DeleteSiteButton slug={site.slug} siteName={site.name} />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
