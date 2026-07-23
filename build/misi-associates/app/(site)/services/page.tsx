import { Metadata } from 'next';
import ServicesClient from './ServicesClient';

export const metadata: Metadata = {
  title: 'Our Services - Misi Associates | Construction, Architecture, Interior Design & Project Management',
  description: 'Comprehensive solutions from execution to completion: Construction, Architecture, Interior Designs, Project Management, and Turnkey Execution.',
  openGraph: {
    title: 'Our Services - Misi Associates',
    description: 'Architecture, Civil Construction, Interior Design, and Project Management Services.',
    images: ['/asset/portfolio/pdf-gallery-8.png'],
  },
};

export default function ServicesPage() {
  return <ServicesClient />;
}
