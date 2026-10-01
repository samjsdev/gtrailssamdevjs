import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import 'lenis/dist/lenis.css';
import { STUDIO } from '@/lib/clientProfile';

const bauhaus93 = localFont({
  src: '../public/fonts/bauhaus-93.woff',
  variable: '--font-bauhaus-93',
  weight: '400',
  style: 'normal',
  display: 'swap',
  adjustFontFallback: false,
});

const tahoma = localFont({
  src: '../public/fonts/tahoma.woff',
  variable: '--font-tahoma',
  weight: '400',
  style: 'normal',
  display: 'swap',
  adjustFontFallback: false,
});

export const metadata: Metadata = {
  metadataBase: new URL('https://muralipatharalaassociates.com'),
  title: {
    default: 'Murali Patharala & Associates (MPA) | Architecture, Construction & Interiors Chennai',
    template: '%s | Murali Patharala & Associates',
  },
  description:
    'Architecture and interior design for residential, commercial and institutional projects. Established in Chennai in 1998, with construction and property development by ARCH foundations.',
  keywords: [
    'architectural design chennai',
    'residential architecture anna nagar',
    'house construction chennai',
    'arch foundation construction',
    'turnkey house contractors chennai',
    'luxury interior design chennai',
    'commercial architecture chennai',
    'institutional architecture chennai',
    '3d exterior elevations chennai',
    'murali patharala associates',
    'murali patharala architect',
    'civil engineering contractors chennai',
    'independent villa construction chennai',
    'custom furniture joinery chennai',
  ],
  authors: [
    { name: 'Ar. Murali Patharala, Principal Architect' },
    { name: 'ARCH foundations Civil Engineering' },
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
      'Bespoke architectural planning, turnkey residential construction by ARCH foundations, and luxury interior design in Chennai with 28+ years of design-build excellence.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Murali Patharala & Associates - Architecture, Construction & Interiors',
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Murali Patharala & Associates (MPA) | Architecture, Construction & Interiors',
    description:
      'Premier architectural design, engineered home construction with ARCH foundations, and luxury interior design in Chennai.',
    images: ['/og-image.png'],
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
      { url: '/favicon.ico?v=mpa-3d', sizes: '16x16 32x32 48x48', type: 'image/x-icon' },
      { url: '/favicon-16x16.png?v=mpa-3d', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png?v=mpa-3d', sizes: '32x32', type: 'image/png' },
      { url: '/icon.png?v=mpa-3d', sizes: '192x192', type: 'image/png' },
    ],
    shortcut: ['/favicon.ico?v=mpa-3d'],
    apple: [{ url: '/apple-icon.png?v=mpa-3d', sizes: '180x180', type: 'image/png' }],
  },
  manifest: '/site.webmanifest',
  alternates: {
    canonical: '/',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  '@id': 'https://muralipatharalaassociates.com/#organization',
  name: STUDIO.name,
  url: 'https://muralipatharalaassociates.com',
  logo: 'https://muralipatharalaassociates.com/mpa-3d-logo.webp',
  description: 'Architecture and interior design consultancy for residential, commercial and institutional projects.',
  foundingDate: STUDIO.founded,
  telephone: STUDIO.phone,
  contactPoint: [STUDIO.phone, STUDIO.alternatePhone].map(telephone => ({'@type': 'ContactPoint', telephone, contactType: 'Project enquiries'})),
  address: {'@type': 'PostalAddress', streetAddress: 'W115A, AL Complex, 3rd Avenue, W Block, Anna Nagar East', addressLocality: 'Chennai', addressRegion: 'Tamil Nadu', postalCode: '600040', addressCountry: 'IN'},
  founder: {'@type': 'Person', name: STUDIO.founder, jobTitle: 'Architect and Founder', alumniOf: {'@type': 'CollegeOrUniversity', name: STUDIO.education}},
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${bauhaus93.variable} ${tahoma.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className="font-sans bg-surface-cream text-[#111111] antialiased selection:bg-[#EA580C] selection:text-white"
      >
        {children}
      </body>
    </html>
  );
}
