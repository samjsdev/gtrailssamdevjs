import React from 'react';
import { Metadata } from 'next';
import GalleryClient from './GalleryClient';

export const metadata: Metadata = {
  title: 'Portfolio & Gallery - Misi Associates | Architectural & Interior Projects',
  description: 'Explore our portfolio of over 450+ successful projects including residential buildings, interior designs, kitchens, mosques, and commercial spaces.',
  openGraph: {
    title: 'Project Gallery - Misi Associates',
    description: 'Explore 450+ completed projects across Chennai, Madurai, and Ramanathapuram.',
    images: ['/asset/portfolio/pdf-gallery-15.png'],
  },
};

export default function GalleryPage() {
    return <GalleryClient />;
}
