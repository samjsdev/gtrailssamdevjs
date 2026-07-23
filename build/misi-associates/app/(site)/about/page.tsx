import { Metadata } from 'next';
import AboutClient from './AboutClient';

export const metadata: Metadata = {
  title: 'About Us - Misi Associates | Architecture, Construction & Interior Design',
  description: 'Learn about Misi Associates. Comprehensive solutions in architecture, construction, project management, and interior design across Chennai, Madurai, and Ramanathapuram.',
  openGraph: {
    title: 'About Misi Associates',
    description: '26 Years of Excellence in architecture, construction, and interior design.',
    images: ['/asset/portfolio/pdf-gallery-1.png'],
  },
};

export default function AboutPage() {
  return <AboutClient />;
}
