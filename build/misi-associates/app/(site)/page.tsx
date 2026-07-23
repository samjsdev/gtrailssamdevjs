import { readSourceConfig } from '@/lib/sourceData';
import { notFound } from 'next/navigation';
import HomeClient from './HomeClient';

export default async function Home({ params }: { params?: any }) {
  const slug = ''; // standalone: slug not needed for data loading

  const data = await readSourceConfig(undefined, 'template7');
  if (!data) return notFound();

  return <HomeClient data={data} />;
}
