import React from 'react';
import { Metadata } from 'next';
import GalleryClient from './GalleryClient';

export const metadata: Metadata = {
  title: 'Project Gallery - Lumina Interior | Real Design Transformations',
  description: 'View our project gallery showcasing real interior design transformations including living rooms, kitchens, bedrooms, and commercial spaces.',
  openGraph: {
    title: 'Project Gallery - Lumina Interior',
    description: 'Real space transformations and design excellence.',
    images: ['/images/clinic1.webp'],
  },
};

export default function GalleryPage() {
    return <GalleryClient />;
}
