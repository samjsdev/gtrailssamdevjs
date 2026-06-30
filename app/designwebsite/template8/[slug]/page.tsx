import { readSourceConfig } from '@/lib/dataBuilder';
import { notFound } from 'next/navigation';
import HomeClient from './HomeClient';

type PageProps = {
  params: Promise<{ slug: string }>;
};

export default async function Template8Home({ params }: PageProps) {
  const resolvedParams = await params;
  const { slug } = resolvedParams;

  const data = await readSourceConfig(slug, 'template8');
  if (!data) return notFound();

  return <HomeClient />;
}
