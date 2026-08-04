import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { Sidebar } from '@/components/Sidebar';
import {
  ADMIN_COOKIE,
  hasValidAdminCookie,
  isAdminPasswordConfigured,
} from '@/lib/adminAuth';

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  // Dashboard, edit, intake — always private.
  if (!isAdminPasswordConfigured()) {
    redirect('/private/login?next=/private/admin/dashboard');
  }

  const cookieStore = await cookies();
  const session = cookieStore.get(ADMIN_COOKIE)?.value;
  if (!(await hasValidAdminCookie(session))) {
    redirect('/private/login?next=/private/admin/dashboard');
  }

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden text-gray-900 font-sans">
      <Sidebar />
      <main className="flex-1 overflow-auto h-full relative">
        {children}
      </main>
    </div>
  );
}
