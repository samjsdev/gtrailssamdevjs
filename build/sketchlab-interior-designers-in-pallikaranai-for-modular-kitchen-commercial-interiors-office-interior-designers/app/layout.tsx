import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'SKETCHLAB — Interior Design Studio',
  description: 'Welcome to SKETCHLAB | Interior Designers in Pallikaranai for Modular Kitchen, Commercial Interiors, Office Interior Designers... We create refined, functional interiors tailored to your lifestyle, budget, and space.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
