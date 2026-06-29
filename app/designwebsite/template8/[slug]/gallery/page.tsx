import { readSourceConfig } from '@/lib/dataBuilder';
import { notFound } from 'next/navigation';
import GalleryClient from './GalleryClient';

type PageProps = {
  params: Promise<{ slug: string }>;
};

export default async function GalleryPage({ params }: PageProps) {
  const resolvedParams = await params;
  const { slug } = resolvedParams;

  const data = await readSourceConfig(slug, 'template8');
  if (!data) return notFound();

  return <GalleryClient />;
}
