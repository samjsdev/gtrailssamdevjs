import { Shield } from 'lucide-react';
import Link from 'next/link';

export const metadata = {
  title: 'Privacy Policy | Dreamsmine Designers India Pvt Ltd',
  description: 'Privacy Policy and data protection guidelines for Dreamsmine Designers India Pvt Ltd.',
};

export default function PrivacyPage() {
  return (
    <div className="bg-[var(--paper)] py-20 md:py-32">
      <div className="site-grid max-w-4xl mx-auto">
        <div className="mb-12">
          <Link href="/" className="text-sm font-bold uppercase tracking-[0.15em] text-[var(--oxide)] hover:text-[var(--ink)] transition-colors mb-8 inline-block">
            &larr; Back to Home
          </Link>
          <h1 className="text-4xl sm:text-5xl font-black uppercase tracking-[-0.04em] leading-[0.9] flex items-center gap-4">
            <Shield className="h-10 w-10 text-[var(--oxide)] hidden sm:block" />
            Privacy Policy
          </h1>
          <p className="mt-6 text-sm text-black/50 font-bold uppercase tracking-[0.1em]">Last Updated: June 2026</p>
        </div>

        <div className="prose prose-lg prose-headings:font-black prose-headings:uppercase prose-headings:tracking-[-0.02em] prose-h2:text-2xl prose-a:text-[var(--oxide)] max-w-none text-black/70">
          <h2>1. Introduction</h2>
          <p>
            Welcome to Dreamsmine Designers India Pvt Ltd ("Company", "we", "our", "us"). We respect your privacy and are committed to protecting your personal data. This privacy policy will inform you as to how we look after your personal data when you visit our website (regardless of where you visit it from) and tell you about your privacy rights and how the law protects you.
          </p>

          <h2>2. The Data We Collect About You</h2>
          <p>
            Personal data, or personal information, means any information about an individual from which that person can be identified. We may collect, use, store and transfer different kinds of personal data about you which we have grouped together as follows:
          </p>
          <ul>
            <li><strong>Identity Data</strong> includes first name, last name, username or similar identifier.</li>
            <li><strong>Contact Data</strong> includes billing address, delivery address, email address and telephone numbers.</li>
            <li><strong>Technical Data</strong> includes internet protocol (IP) address, browser type and version, time zone setting and location, browser plug-in types and versions, operating system and platform, and other technology on the devices you use to access this website.</li>
            <li><strong>Usage Data</strong> includes information about how you use our website, products and services.</li>
          </ul>

          <h2>3. How We Use Your Personal Data</h2>
          <p>
            We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:
          </p>
          <ul>
            <li>Where we need to perform the contract we are about to enter into or have entered into with you (e.g., providing construction and interior design services).</li>
            <li>Where it is necessary for our legitimate interests (or those of a third party) and your interests and fundamental rights do not override those interests.</li>
            <li>Where we need to comply with a legal obligation.</li>
          </ul>

          <h2>4. Data Security</h2>
          <p>
            We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used or accessed in an unauthorised way, altered or disclosed. In addition, we limit access to your personal data to those employees, agents, contractors and other third parties who have a business need to know.
          </p>

          <h2>5. Contact Details</h2>
          <p>
            If you have any questions about this privacy policy or our privacy practices, please contact us using the contact information provided on our website.
          </p>
        </div>
      </div>
    </div>
  );
}
