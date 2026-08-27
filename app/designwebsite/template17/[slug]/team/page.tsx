import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Our Team - Architectural Atelier',
  description: 'Meet the licensed architects, structural engineers, and project leads at our Chennai atelier.',
};

export default function Team() {
  return (
    <div className="min-h-screen py-32 px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Design & Engineering Team</h1>
        <p className="text-[var(--muted)]">Meet our architects and engineers soon...</p>
      </div>
    </div>
  );
}
