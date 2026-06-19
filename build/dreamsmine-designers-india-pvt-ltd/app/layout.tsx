import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Dreamsmine Designers India Pvt Ltd — Interior Design Studio',
  description: 'Welcome to Dreamsmine Designers India Pvt Ltd. We create refined, functional interiors tailored to your lifestyle, budget, and space.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
