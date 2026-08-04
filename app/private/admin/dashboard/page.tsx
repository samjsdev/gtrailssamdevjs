import { listLocalSites } from '@/lib/dataBuilder';
import DashboardClient from './DashboardClient';

export const dynamic = 'force-dynamic';

export default async function Dashboard() {
  // Few essential clients — all served from data/{slug}/source.json
  const sites = await listLocalSites();

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Essential Lead Sites</h1>
        <p className="text-gray-500 mt-2 text-lg">
          {sites.length} client{sites.length === 1 ? '' : 's'} from local JSON
        </p>
      </div>

      <DashboardClient initialSites={sites} />
    </div>
  );
}
