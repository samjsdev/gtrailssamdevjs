import type { Metadata } from 'next';
import { Lora, Work_Sans } from 'next/font/google';
import './globals.css';
import 'lenis/dist/lenis.css';

const lora = Lora({
  subsets: ['latin'],
  variable: '--font-lora',
  display: 'swap',
});

const workSans = Work_Sans({
  subsets: ['latin'],
  variable: '--font-work-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://muralipatharalaassociates.com'),
  title: {
    default: 'Murali Patharala & Associates (MPA) | Architecture, Construction & Interiors Chennai',
    template: '%s | Murali Patharala & Associates',
  },
  description:
    'Murali Patharala & Associates (MPA) delivers bespoke architectural planning, turnkey residential construction by ARCH Foundation, and luxury bespoke interiors across Chennai, Anna Nagar, Coimbatore, Bangalore, and Pondicherry with 28+ years of excellence.',
  keywords: [
    'architectural design chennai',
    'residential architecture anna nagar',
    'house construction chennai',
    'arch foundation construction',
    'turnkey house contractors chennai',
    'luxury interior design chennai',
    'modular kitchen manufacturers chennai',
    'vastu compliant floor plans chennai',
    '3d exterior elevations chennai',
    'murali patharala associates',
    'ar s murali architect',
    'civil engineering contractors chennai',
    'independent villa construction chennai',
    'custom furniture joinery chennai',
  ],
  authors: [
    { name: 'Ar. S. Murali, Principal Architect' },
    { name: 'ARCH Foundation Civil Engineering' },
  ],
  creator: 'Murali Patharala & Associates',
  publisher: 'Murali Patharala & Associates',
  formatDetection: {
    email: false,
    address: true,
    telephone: true,
  },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://muralipatharalaassociates.com',
    siteName: 'Murali Patharala & Associates (MPA)',
    title: 'Murali Patharala & Associates (MPA) | Architecture, Construction & Interiors',
    description:
      'Bespoke architectural planning, turnkey residential construction by ARCH Foundation, and luxury interior design in Chennai with 28+ years of design-build excellence.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Murali Patharala & Associates - Architecture, Construction & Interiors',
        type: 'image/jpeg',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Murali Patharala & Associates (MPA) | Architecture, Construction & Interiors',
    description:
      'Premier architectural design, engineered home construction with ARCH Foundation, and luxury interior design in Chennai.',
    images: ['/og-image.jpg'],
    creator: '@mpa_architects',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/icon.png', sizes: '192x192', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    shortcut: ['/favicon.ico'],
  },
  manifest: '/site.webmanifest',
  alternates: {
    canonical: '/',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': ['ProfessionalService', 'GeneralContractor'],
  '@id': 'https://muralipatharalaassociates.com/#organization',
  name: 'Murali Patharala & Associates (MPA)',
  alternateName: ['MPA Architects', 'ARCH Foundation', 'Murali Patharala Associates'],
  url: 'https://muralipatharalaassociates.com',
  logo: 'https://muralipatharalaassociates.com/icon.png',
  image: 'https://muralipatharalaassociates.com/og-image.jpg',
  description:
    'Architecture and interior design practice by Ar. S. Murali, paired with residential construction delivered by ARCH Foundation across Chennai and regional offices.',
  telephone: '+91 98410 98490',
  priceRange: '₹₹₹',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'W115A, 3rd Ave, Annanagar East',
    addressLocality: 'Chennai',
    addressRegion: 'Tamil Nadu',
    postalCode: '600040',
    addressCountry: 'IN',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: '13.0878',
    longitude: '80.2206',
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      opens: '09:00',
      closes: '19:30',
    },
  ],
  areaServed: [
    { '@type': 'City', name: 'Chennai' },
    { '@type': 'AdministrativeArea', name: 'Anna Nagar' },
    { '@type': 'City', name: 'Coimbatore' },
    { '@type': 'City', name: 'Bangalore' },
    { '@type': 'City', name: 'Pondicherry' },
    { '@type': 'AdministrativeArea', name: 'Tamil Nadu' },
  ],
  founder: {
    '@type': 'Person',
    name: 'Ar. S. Murali',
    jobTitle: 'Principal Architect',
    alumniOf: 'School of Architecture',
  },
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'MPA Core Services',
    itemListElement: [
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Architectural Design & Space Planning',
          description:
            'Custom 2D floor plans, photorealistic 3D elevations, structural and MEP working drawings, and itemized construction cost estimates.',
          url: 'https://muralipatharalaassociates.com/services/architectural-design/',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Residential Civil Construction',
          description:
            'Turnkey home construction by ARCH Foundation with branded materials (Tata Tiscon 550D, UltraTech 53-Grade), 425+ quality checks, and 10-year structural warranty.',
          url: 'https://muralipatharalaassociates.com/services/residential-construction/',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Bespoke Luxury Interior Design',
          description:
            'End-to-end luxury interiors covering custom modular kitchens, wardrobes, false ceilings, architectural lighting, and joinery.',
          url: 'https://muralipatharalaassociates.com/services/interior-design/',
        },
      },
    ],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${lora.variable} ${workSans.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${lora.variable} ${workSans.variable} font-sans bg-[#FAFAFA] text-[#111111] antialiased selection:bg-[#EA580C] selection:text-white`}
      >
        {children}
      </body>
    </html>
  );
}
