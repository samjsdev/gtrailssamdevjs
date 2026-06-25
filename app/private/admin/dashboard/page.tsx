import { databases } from '@/lib/appwrite';
import { Query } from 'appwrite';
import DashboardClient from './DashboardClient';

export const dynamic = 'force-dynamic';

export default async function Dashboard() {
  const sites: any[] = [];
  
  try {
    const response = await databases.listDocuments('gtrails', 'scraped_data', [
      Query.limit(5000),
      Query.orderDesc('$createdAt')
    ]);
    
    if (response?.documents) {
      for (const item of response.documents) {
        const json = item.source_data ? JSON.parse(item.source_data) : {};
        const createdAt = item.$createdAt || item.$updatedAt || json.meta?.generatedAt || Date.now();
        sites.push({
          slug: json.clinic?.slug || item.$id,
          name: item.name || json.clinic?.name || item.$id,
          rating: item.rating || json.business?.rating || 'N/A',
          reviews: item.review_count || json.business?.reviewCount || '0',
          image: json.media?.clinicImages?.[0] || 'https://via.placeholder.com/400x300?text=No+Image',
          date: new Date(createdAt).toLocaleDateString(),
          timestamp: new Date(createdAt).getTime()
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

      <DashboardClient initialSites={sites} />
    </div>
  );
}
