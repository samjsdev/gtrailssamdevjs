import { Metadata } from 'next';
import AboutClient from './AboutClient';

export const metadata: Metadata = {
  title: 'About Our Architecture & Construction Practice in Chennai',
  description: 'Learn about our architectural practice. We design and build modern luxury villas, independent homes, and commercial establishments with fixed budgets and a 10-year warranty.',
  openGraph: {
    title: 'About Our Architecture & Construction Practice',
    description: 'Our journey to becoming a trusted architectural design and turnkey construction firm in Chennai.',
    images: ['/images/architecture/architectural-atelier-studio.webp'],
  },
};

export default function AboutPage() {
  return <AboutClient />;
}
