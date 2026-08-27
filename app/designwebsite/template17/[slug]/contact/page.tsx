import { Metadata } from 'next';
import ContactClient from './ContactClient';

export const metadata: Metadata = {
  title: 'Contact Us - Architectural Atelier | Book Your Consultation',
  description: 'Schedule your architectural consultation with our Chennai atelier. Call us or book online for expert design and construction advice.',
  openGraph: {
    title: 'Contact Architectural Atelier',
    description: 'Book your architectural consultation today.',
    images: ['/images/architecture/atelier-design-studio.webp'],
  },
};

export default function ContactPage() {
  return <ContactClient />;
}
