import { Metadata } from 'next';
import ServicesClient from './ServicesClient';

export const metadata: Metadata = {
  title: 'Design Services - Lumina Interior | Residential, Commercial & More',
  description: 'Comprehensive interior design services: Space Planning, Full Renovations, Custom Furniture, and Smart Home Integration.',
  openGraph: {
    title: 'Our Services - Lumina Interior',
    description: 'Expert design services including Residential, Commercial, and Sustainable Design.',
    images: ['/images/aestheticcrown.webp'],
  },
};

export default function ServicesPage() {
  return <ServicesClient />;
}
