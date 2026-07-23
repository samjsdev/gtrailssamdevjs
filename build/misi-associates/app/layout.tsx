import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://www.misiassociates.com'),
  title: 'Misi Associates — Architecture, Construction & Interior Design',
  description: 'Architecture, construction, interior design, project management, and turnkey execution across Chennai, Madurai, and Ramanathapuram.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
