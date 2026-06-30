import { readSourceConfig } from '@/lib/dataBuilder';
import { notFound } from 'next/navigation';
import ContactClient from './ContactClient';

type PageProps = {
  params: Promise<{ slug: string }>;
};

export default async function ContactPage({ params }: PageProps) {
  const resolvedParams = await params;
  const { slug } = resolvedParams;

  const data = await readSourceConfig(slug, 'template8');
  if (!data) return notFound();

  return <ContactClient />;
}
