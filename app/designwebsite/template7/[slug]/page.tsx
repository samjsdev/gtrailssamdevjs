import { readSourceConfig } from '@/lib/dataBuilder';
import { notFound } from 'next/navigation';
import HomeClient from './HomeClient';

export default async function Home({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const { slug } = resolvedParams;

  const data = await readSourceConfig(slug, 'template7');
  if (!data) return notFound();

  return <HomeClient data={data} />;
}
