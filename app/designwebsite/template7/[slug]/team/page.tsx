import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Our Team - Lumina Interior Design Specialists',
  description: 'Meet the expert design team at Lumina Interior. Experienced specialists in Residential, Commercial, and Sustainable Design.',
};

export default function Team() {
  return (
    <div className="min-h-screen py-32 px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Role & Team</h1>
        <p className="text-[var(--muted)]">Meet our specialists soon...</p>
      </div>
    </div>
  );
}
