import React from 'react';
import Link from 'next/link';

export const metadata = {
  title: 'Privacy Policy | mDeploy',
  description: 'Privacy Policy for mDeploy',
};

export default function PrivacyPolicy() {
  return (
    <main className="min-h-screen pt-32 pb-20 bg-transparent text-foreground selection:bg-purple-900/50">
      <div className="container mx-auto px-4 md:px-6 max-w-4xl">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-8">Privacy Policy</h1>
        <p className="text-slate-400 mb-8">Last Updated: April 2026</p>

        <div className="prose prose-invert prose-purple max-w-none text-slate-300">
          <p>
            At mDeploy, we are committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website, use our software deployment services, or interact with our applications.
          </p>
          
          <h2 className="text-2xl font-bold text-white mt-12 mb-4">1. Information We Collect</h2>
          <p>We may collect information about you in a variety of ways. The information we may collect includes:</p>
          <ul className="list-disc pl-6 space-y-2 mt-4">
            <li><strong>Personal Data:</strong> Personally identifiable information, such as your name, shipping address, email address, and telephone number, and demographic information that you voluntarily give to us when you register for our services.</li>
            <li><strong>Derivative Data:</strong> Information our servers automatically collect when you access our services, such as your IP address, your browser type, your operating system, your access times, and the pages you have viewed directly before and after accessing the Site.</li>
          </ul>

          <h2 className="text-2xl font-bold text-white mt-12 mb-4">2. Use of Your Information</h2>
          <p>Having accurate information about you permits us to provide you with a smooth, efficient, and customized experience. Specifically, we may use information collected about you to:</p>
          <ul className="list-disc pl-6 space-y-2 mt-4">
            <li>Create and manage your account.</li>
            <li>Deliver our shipping software and deployment services.</li>
            <li>Email you regarding your account or order.</li>
            <li>Fulfill and manage purchases, orders, payments, and other transactions related to the Site.</li>
            <li>Improve our services and applications.</li>
          </ul>

          <h2 className="text-2xl font-bold text-white mt-12 mb-4">3. Disclosure of Your Information</h2>
          <p>We may share information we have collected about you in certain situations. Your information may be disclosed as follows:</p>
          <ul className="list-disc pl-6 space-y-2 mt-4">
            <li><strong>By Law or to Protect Rights:</strong> If we believe the release of information about you is necessary to respond to legal process, to investigate or remedy potential violations of our policies, or to protect the rights, property, and safety of others.</li>
            <li><strong>Third-Party Service Providers:</strong> We may share your information with third parties that perform services for us or on our behalf, including payment processing, data analysis, email delivery, hosting services, customer service, and marketing assistance.</li>
          </ul>

          <h2 className="text-2xl font-bold text-white mt-12 mb-4">4. Security of Your Information</h2>
          <p>
            We use administrative, technical, and physical security measures to help protect your personal information. While we have taken reasonable steps to secure the personal information you provide to us, please be aware that despite our efforts, no security measures are perfect or impenetrable, and no method of data transmission can be guaranteed against any interception or other type of misuse.
          </p>

          <h2 className="text-2xl font-bold text-white mt-12 mb-4">5. Contact Us</h2>
          <p>
            If you have questions or comments about this Privacy Policy, please contact us at: <a href="mailto:hello@mdeploy.dev" className="text-purple-400 hover:text-purple-300">hello@mdeploy.dev</a>
          </p>
        </div>
        
        <div className="mt-12 pt-8 border-t border-slate-800">
            <Link href="/" className="text-purple-400 hover:text-purple-300">&larr; Back to Home</Link>
        </div>
      </div>
    </main>
  );
}
