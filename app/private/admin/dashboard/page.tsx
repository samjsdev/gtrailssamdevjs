import Link from 'next/link';
import { ExternalLink, Edit } from 'lucide-react';
import DeleteSiteButton from '@/components/DeleteSiteButton';
import { databases } from '@/lib/appwrite';

export const dynamic = 'force-dynamic';

export default async function Dashboard() {
  const sites: any[] = [];
  
  try {
    const response = await databases.listDocuments('gtrails', 'scraped_data');
    
    if (response?.documents) {
      for (const item of response.documents) {
        const json = item.source_data ? JSON.parse(item.source_data) : {};
        sites.push({
          slug: json.clinic?.slug || item.$id,
          name: item.name || json.clinic?.name || item.$id,
          rating: item.rating || json.business?.rating || 'N/A',
          reviews: item.review_count || json.business?.reviewCount || '0',
          image: json.media?.clinicImages?.[0] || 'https://via.placeholder.com/400x300?text=No+Image',
          date: new Date(item.$updatedAt || json.meta?.generatedAt || Date.now()).toLocaleDateString()
        });
      }
    }
  } catch (err: any) {
    console.error('Error fetching sites from Appwrite:', err.message || err);
  }

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">My Interior Sites</h1>
        <p className="text-gray-500 mt-2 text-lg">Manage and preview all generated interior design websites.</p>
      </div>

      {sites.length === 0 ? (
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
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sites.map(site => (
            <div key={site.slug} className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-all group group-hover:border-blue-300 relative">
              <div className="h-48 overflow-hidden bg-gray-100 relative">
                 <img src={site.image} alt={site.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                 <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 font-bold text-sm text-gray-800 rounded-full flex gap-1 shadow">
                   ⭐ {site.rating} <span className="opacity-50">({site.reviews})</span>
                 </div>
              </div>
              <div className="p-5 flex flex-col gap-4">
                <div>
                  <h3 className="font-bold text-lg text-gray-900 truncate" title={site.name}>{site.name}</h3>
                  <p className="text-sm text-gray-500 font-medium">Auto-generated • {site.date}</p>
                </div>
                
                <div className="flex gap-2 w-full pt-2 border-t border-gray-50 mt-auto">
                   <Link href={`/private/admin/edit/${site.slug}`} className="flex-1 flex justify-center items-center py-2 px-3 bg-gray-50 text-gray-700 font-semibold text-sm rounded-md border border-gray-200 hover:bg-gray-100 transition-colors">
                     <Edit className="w-4 h-4 mr-2" /> Edit Data
                   </Link>
                   <Link href={`/preview/${site.slug}`} className="flex-1 flex justify-center items-center py-2 px-3 bg-blue-50 text-blue-700 font-semibold text-sm rounded-md border border-blue-100 hover:bg-blue-100 transition-colors">
                     <ExternalLink className="w-4 h-4 mr-2" /> View Previews
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
