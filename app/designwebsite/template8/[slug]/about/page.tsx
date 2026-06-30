import { readSourceConfig } from '@/lib/dataBuilder';
import { notFound } from 'next/navigation';
import AboutClient from './AboutClient';

type PageProps = {
  params: Promise<{ slug: string }>;
};

export default async function AboutPage({ params }: PageProps) {
  const resolvedParams = await params;
  const { slug } = resolvedParams;

  const data = await readSourceConfig(slug, 'template8');
  if (!data) return notFound();

  return <AboutClient />;
}
