import React from 'react';
import Link from 'next/link';

export const metadata = {
  title: 'Terms of Service | mDeploy',
  description: 'Terms of Service for mDeploy',
};

export default function TermsOfService() {
  return (
    <main className="min-h-screen pt-32 pb-20 bg-transparent text-foreground selection:bg-purple-900/50">
      <div className="container mx-auto px-4 md:px-6 max-w-4xl">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-8">Terms of Service</h1>
        <p className="text-slate-400 mb-8">Last Updated: April 2026</p>

        <div className="prose prose-invert prose-purple max-w-none text-slate-300">
          <p>
            Welcome to mDeploy. These Terms of Service ("Terms") govern your use of the mDeploy website, shipping software, and deployment services (collectively, the "Services"). By using our Services, you agree to be bound by these Terms.
          </p>
          
          <h2 className="text-2xl font-bold text-white mt-12 mb-4">1. Acceptance of Terms</h2>
          <p>
            By accessing or using our shipping software, deployment tools, or related applications, you agree to be bound by these Terms and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this site and our services.
          </p>

          <h2 className="text-2xl font-bold text-white mt-12 mb-4">2. Use License</h2>
          <p>
            Permission is granted to temporarily download one copy of the materials (information or software) on mDeploy's website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
          </p>
          <ul className="list-disc pl-6 space-y-2 mt-4">
            <li>Modify or copy the materials;</li>
            <li>Use the materials for any commercial purpose, or for any public display (commercial or non-commercial);</li>
            <li>Attempt to decompile or reverse engineer any software contained on mDeploy's website;</li>
            <li>Remove any copyright or other proprietary notations from the materials; or</li>
            <li>Transfer the materials to another person or "mirror" the materials on any other server.</li>
          </ul>

          <h2 className="text-2xl font-bold text-white mt-12 mb-4">3. Disclaimer</h2>
          <p>
            The materials on mDeploy's website are provided on an 'as is' basis. mDeploy makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
          </p>

          <h2 className="text-2xl font-bold text-white mt-12 mb-4">4. Limitations</h2>
          <p>
            In no event shall mDeploy or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on mDeploy's website, even if mDeploy or a mDeploy authorized representative has been notified orally or in writing of the possibility of such damage.
          </p>

          <h2 className="text-2xl font-bold text-white mt-12 mb-4">5. Governing Law</h2>
          <p>
            These terms and conditions are governed by and construed in accordance with the laws of the jurisdiction in which mDeploy operates, and you irrevocably submit to the exclusive jurisdiction of the courts in that location.
          </p>

          <h2 className="text-2xl font-bold text-white mt-12 mb-4">6. Contact Us</h2>
          <p>
            If you have questions or comments about these Terms of Service, please contact us at: <a href="mailto:hello@mdeploy.dev" className="text-purple-400 hover:text-purple-300">hello@mdeploy.dev</a>
          </p>
        </div>
        
        <div className="mt-12 pt-8 border-t border-slate-800">
            <Link href="/" className="text-purple-400 hover:text-purple-300">&larr; Back to Home</Link>
        </div>
      </div>
    </main>
  );
}
