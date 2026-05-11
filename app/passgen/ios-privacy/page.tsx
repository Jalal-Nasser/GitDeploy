import React from 'react';
import Link from 'next/link';

export const metadata = {
  title: 'PassGen IOS Privacy Policy | mDeploy',
  description: 'Privacy Policy for PassGen Vault',
};

export default function PassGenIOSPrivacy() {
  return (
    <main className="min-h-screen pt-32 pb-20 bg-transparent text-foreground selection:bg-purple-900/50">
      <div className="container mx-auto px-4 md:px-6 max-w-4xl">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-8">Privacy Policy for PassGen Vault</h1>
        <p className="text-slate-400 mb-8">Last updated: April 2, 2026</p>

        <div className="prose prose-invert prose-purple max-w-none text-slate-300">
          <p>
            PassGen Vault ("PassGen", "we", "our", or "us") is a password manager and secure vault application for iPhone. This Privacy Policy explains what data may be processed when you use the PassGen Vault mobile application.
          </p>

          <h2 className="text-2xl font-bold text-white mt-12 mb-4">1. Data We Process</h2>
          <p>PassGen Vault is designed to function primarily as a local encrypted vault on the user's device.</p>
          <p className="mt-4">Depending on the features you choose to use, the app may process:</p>
          <ul className="list-disc pl-6 space-y-2 mt-4">
            <li>Email address, when you sign in with Apple or Google</li>
            <li>User ID, for authentication and account-linked functionality</li>
            <li>Purchase and subscription status, through RevenueCat and Apple In-App Purchases</li>
            <li>Encrypted vault content, if cloud sync or backup features are enabled</li>
            <li>Google Drive account access, if Google Drive is selected for cloud sync or backup</li>
            <li>Camera access, only when scanning 2FA QR codes</li>
            <li>Face ID or device authentication, only for securely unlocking the vault on device</li>
          </ul>

          <h2 className="text-2xl font-bold text-white mt-12 mb-4">2. How We Use Data</h2>
          <p>We use data solely to provide app functionality, including:</p>
          <ul className="list-disc pl-6 space-y-2 mt-4">
            <li>Authenticating user accounts</li>
            <li>Enabling optional cloud-linked features</li>
            <li>Managing subscriptions and premium access</li>
            <li>Syncing or restoring encrypted vault backups when cloud features are enabled</li>
            <li>Scanning 2FA setup QR codes</li>
            <li>Unlocking the app securely using Face ID or device authentication</li>
          </ul>

          <h2 className="text-2xl font-bold text-white mt-12 mb-4">3. Local Vault Storage</h2>
          <p>
            Vault data is intended to remain encrypted. Local vault data is stored on your device. If you choose to enable cloud sync or backup features, encrypted vault data may be transmitted to your selected cloud provider.
          </p>

          <h2 className="text-2xl font-bold text-white mt-12 mb-4">4. Third-Party Services</h2>
          <p>Depending on the features you use, PassGen Vault may integrate with the following third-party services:</p>
          <ul className="list-disc pl-6 space-y-2 mt-4">
            <li>Apple Sign In</li>
            <li>Google Sign-In</li>
            <li>Supabase</li>
            <li>RevenueCat</li>
            <li>Google Drive</li>
            <li>Apple iCloud</li>
          </ul>
          <p className="mt-4">These services may process authentication, subscription, account, or storage-related information as required to provide their functionality.</p>

          <h2 className="text-2xl font-bold text-white mt-12 mb-4">5. Tracking and Advertising</h2>
          <p>PassGen Vault does not use personal data for third-party advertising or cross-app tracking.</p>

          <h2 className="text-2xl font-bold text-white mt-12 mb-4">6. Data Sharing</h2>
          <p>We do not sell your personal data. Data is only shared with service providers or platforms required to deliver the features you actively use.</p>

          <h2 className="text-2xl font-bold text-white mt-12 mb-4">7. Data Retention</h2>
          <p>Account-related data may be retained as necessary to support authentication, subscription status, and backend functionality. Encrypted vault backups stored with cloud providers remain subject to the storage choices you make.</p>

          <h2 className="text-2xl font-bold text-white mt-12 mb-4">8. Your Choices</h2>
          <p>You may:</p>
          <ul className="list-disc pl-6 space-y-2 mt-4">
            <li>Use the local vault without signing in</li>
            <li>Disconnect your linked account</li>
            <li>Disable cloud sync</li>
            <li>Remove the app and local data from your device</li>
            <li>Manage or cancel subscriptions through Apple</li>
            <li>Request permanent account deletion from within the app settings</li>
          </ul>
          <p className="mt-4">Account deletion removes associated account data from backend systems, subject to legal or operational retention requirements.</p>

          <h2 className="text-2xl font-bold text-white mt-12 mb-4">9. Contact</h2>
          <p>
            If you have questions regarding this Privacy Policy, contact: <a href="mailto:jalal@mdeploy.dev" className="text-purple-400 hover:text-purple-300">jalal@mdeploy.dev</a>
          </p>
        </div>
        
        <div className="mt-12 pt-8 border-t border-slate-800">
            <Link href="/" className="text-purple-400 hover:text-purple-300">&larr; Back to Home</Link>
        </div>
      </div>
    </main>
  );
}
