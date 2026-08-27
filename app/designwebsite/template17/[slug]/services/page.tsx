import { Metadata } from 'next';
import ServicesClient from './ServicesClient';

export const metadata: Metadata = {
  title: 'Architectural Disciplines & Civil Engineering | Turnkey Estates',
  description: 'Comprehensive architectural services: Site Planning, 3D BIM Digital Twins, Structural Engineering, and Turnkey Civil Execution.',
  openGraph: {
    title: 'Architectural Disciplines & Services',
    description: 'Master architectural planning, STAAD civil blueprints, and turnkey construction.',
    images: ['/images/architecture/architectural-blueprint-draft.webp'],
  },
};

export default function ServicesPage() {
  return <ServicesClient />;
}
