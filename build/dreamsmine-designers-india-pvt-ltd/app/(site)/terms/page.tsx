import { Scale } from 'lucide-react';
import Link from 'next/link';

export const metadata = {
  title: 'Terms of Service | Dreamsmine Designers India Pvt Ltd',
  description: 'Terms and conditions for using the Dreamsmine Designers India Pvt Ltd website and services.',
};

export default function TermsPage() {
  return (
    <div className="bg-[var(--paper)] py-20 md:py-32">
      <div className="site-grid max-w-4xl mx-auto">
        <div className="mb-12">
          <Link href="/" className="text-sm font-bold uppercase tracking-[0.15em] text-[var(--oxide)] hover:text-[var(--ink)] transition-colors mb-8 inline-block">
            &larr; Back to Home
          </Link>
          <h1 className="text-4xl sm:text-5xl font-black uppercase tracking-[-0.04em] leading-[0.9] flex items-center gap-4">
            <Scale className="h-10 w-10 text-[var(--oxide)] hidden sm:block" />
            Terms of Service
          </h1>
          <p className="mt-6 text-sm text-black/50 font-bold uppercase tracking-[0.1em]">Last Updated: June 2026</p>
        </div>

        <div className="prose prose-lg prose-headings:font-black prose-headings:uppercase prose-headings:tracking-[-0.02em] prose-h2:text-2xl prose-a:text-[var(--oxide)] max-w-none text-black/70">
          <h2>1. Terms</h2>
          <p>
            By accessing this Website, accessible from our domain, you are agreeing to be bound by these Website Terms and Conditions of Use and agree that you are responsible for the agreement with any applicable local laws. If you disagree with any of these terms, you are prohibited from accessing this site.
          </p>

          <h2>2. Use License</h2>
          <p>
            Permission is granted to temporarily download one copy of the materials on Dreamsmine Designers India Pvt Ltd's Website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
          </p>
          <ul>
            <li>modify or copy the materials;</li>
            <li>use the materials for any commercial purpose or for any public display;</li>
            <li>attempt to reverse engineer any software contained on the Website;</li>
            <li>remove any copyright or other proprietary notations from the materials; or</li>
            <li>transfer the materials to another person or "mirror" the materials on any other server.</li>
          </ul>

          <h2>3. Disclaimer</h2>
          <p>
            All the materials on Dreamsmine Designers India Pvt Ltd's Website are provided "as is". We make no warranties, may it be expressed or implied, therefore negates all other warranties. Furthermore, we do not make any representations concerning the accuracy or reliability of the use of the materials on its Website or otherwise relating to such materials or any sites linked to this Website.
          </p>

          <h2>4. Limitations</h2>
          <p>
            Dreamsmine Designers India Pvt Ltd or its suppliers will not be hold accountable for any damages that will arise with the use or inability to use the materials on our Website, even if we or an authorize representative of this Website has been notified, orally or written, of the possibility of such damage.
          </p>

          <h2>5. Revisions and Errata</h2>
          <p>
            The materials appearing on our Website may include technical, typographical, or photographic errors. We will not promise that any of the materials in this Website are accurate, complete, or current. We may change the materials contained on its Website at any time without notice.
          </p>

          <h2>6. Governing Law</h2>
          <p>
            Any claim related to Dreamsmine Designers India Pvt Ltd's Website shall be governed by the laws of India without regards to its conflict of law provisions. Jurisdiction for any disputes will be within the courts of Chennai, Tamil Nadu.
          </p>
        </div>
      </div>
    </div>
  );
}
