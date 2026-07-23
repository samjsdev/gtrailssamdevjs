import { Metadata } from 'next';
import ContactClient from './ContactClient';

export const metadata: Metadata = {
  title: 'Contact Us - Misi Associates | Chennai, Madurai & Ramanathapuram',
  description: 'Get in touch with Misi Associates. Offices in Chennai, Madurai, and Ramanathapuram. Call +91 82200 27117 or enquiry online.',
  openGraph: {
    title: 'Contact Misi Associates',
    description: 'Call +91 82200 27117 for architectural, construction, and interior consultations.',
    images: ['/asset/portfolio/pdf-gallery-20.png'],
  },
};

export default function ContactPage() {
  return <ContactClient />;
}
