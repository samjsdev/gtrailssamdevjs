import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: '360 Degree Interior — Interior Design Studio',
  description: 'Welcome to 360 Degree Interior. We create refined, functional interiors tailored to your lifestyle, budget, and space.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
