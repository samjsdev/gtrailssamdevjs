'use client';

import { useState } from 'react';
import { Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function DeleteSiteButton({ slug, siteName }: { slug: string, siteName: string }) {
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    if (!confirm(`Are you sure you want to delete ${siteName}? This cannot be undone.`)) {
      return;
    }

    setIsDeleting(true);
    try {
      const res = await fetch(`/api/data?slug=${slug}`, { method: 'DELETE' });
      if (res.ok) {
        router.refresh(); // Refresh the server component to update the list
      } else {
        alert('Failed to delete site');
        setIsDeleting(false);
      }
    } catch (error) {
      console.error(error);
      alert('An error occurred while deleting');
      setIsDeleting(false);
    }
  };

  return (
    <button
      onClick={handleDelete}
      disabled={isDeleting}
      className={`p-2 bg-red-50 text-red-600 rounded-md border border-red-100 hover:bg-red-100 transition-colors flex items-center justify-center ${isDeleting ? 'opacity-50 cursor-not-allowed' : ''}`}
      title="Delete Site"
    >
      <Trash2 className="w-4 h-4" />
    </button>
  );
}
