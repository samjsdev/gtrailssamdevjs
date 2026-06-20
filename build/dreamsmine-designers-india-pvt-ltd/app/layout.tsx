import type { Metadata } from 'next';
import { Jost } from 'next/font/google';
import './globals.css';

const jost = Jost({
  subsets: ['latin'],
  variable: '--font-jost',
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Dreamsmine Designers India Pvt Ltd | Architecture, Construction & Interiors',
  description: 'Premium Chennai architecture, civil construction, exterior elevations, Vastu planning, and turnkey interiors by ISO 9001 certified Dreamsmine Designers India Pvt Ltd.',
  openGraph: {
    title: 'Dreamsmine Designers India Pvt Ltd',
    description: 'Design-led residential construction, exterior elevations, Vastu planning, and premium interiors in Chennai.',
    url: 'https://www.dreamsminedesigners.com',
    siteName: 'Dreamsmine Designers',
    locale: 'en_IN',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={jost.variable}>
      <body>{children}</body>
    </html>
  );
}
