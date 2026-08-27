import React from 'react';
import { Metadata } from 'next';
import GalleryClient from './GalleryClient';

export const metadata: Metadata = {
  title: 'Completed Projects Portfolio | Modern Villas & Homes in Chennai',
  description: 'View our portfolio of completed residential and commercial projects across Chennai — modern villas, independent houses, and commercial establishments.',
  openGraph: {
    title: 'Completed Projects Portfolio | Architectural Construction',
    description: 'Delivered Chennai homes, modern villas, and commercial establishments.',
    images: ['/images/architecture/hero-villa-twilight.webp'],
  },
};

export default function GalleryPage() {
    return <GalleryClient />;
}
