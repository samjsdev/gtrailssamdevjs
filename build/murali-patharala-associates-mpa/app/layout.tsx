import type { Metadata } from 'next';
import { Lora, Work_Sans } from 'next/font/google';
import './globals.css';

const lora = Lora({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-lora',
  display: 'swap',
});

const workSans = Work_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-work-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Murali Patharala Associates (MPA) | Turnkey Construction & Architectural Design Chennai',
  description: 'Turnkey Construction, Architecture & Interior Design in Chennai. Fixed-price contracts, zero delays, and 28+ years of structural excellence in Anna Nagar.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${lora.variable} ${workSans.variable}`}>
      <body
        className={`${lora.variable} ${workSans.variable} font-sans bg-[#FAFAFA] text-[#111111] antialiased selection:bg-[#EA580C] selection:text-white`}
      >
        {children}
      </body>
    </html>
  );
}
