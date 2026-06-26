import { Metadata } from 'next';
import AboutClient from './AboutClient';

export const metadata: Metadata = {
  title: 'About Us - Lumina Interior | Our Journey & Philosophy',
  description: 'Learn about Lumina Interior. We provide creative, full-service interior design with transparency and integrity.',
  openGraph: {
    title: 'About Lumina Interior',
    description: 'Our journey to becoming a leading interior design studio.',
    images: ['/images/ourjourney.webp'],
  },
};

export default function AboutPage() {
  return <AboutClient />;
}
