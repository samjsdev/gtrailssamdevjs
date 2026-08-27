import type { Metadata } from 'next';
import { Playfair_Display, Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  style: ['normal', 'italic'],
  variable: '--font-playfair',
  display: 'swap',
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'ARCH Foundations & Murali Patharala Associates (MPA) | Architects & Builders Chennai',
  description: 'Architecture & Interior Design Consultants | Builders, Constructions & Property Developers. Serving Chennai with 28+ years of trust since 1998.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${playfair.variable} ${plusJakarta.variable}`}>
      <body className="font-sans antialiased bg-[#FAF9F7] text-[#1A1B1A] selection:bg-[#E64D16] selection:text-white">
        {children}
      </body>
    </html>
  );
}
