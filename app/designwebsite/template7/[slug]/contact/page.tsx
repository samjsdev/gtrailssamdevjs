import { Metadata } from 'next';
import ContactClient from './ContactClient';

export const metadata: Metadata = {
  title: 'Contact Us - Lumina Interior | Book Your Consultation',
  description: 'Schedule your design consultation at Lumina Interior. Call us or book online for expert interior design advice.',
  openGraph: {
    title: 'Contact Lumina Interior',
    description: 'Book your consultation today.',
    images: ['/images/clinic1.webp'],
  },
};

export default function ContactPage() {
  return <ContactClient />;
}
