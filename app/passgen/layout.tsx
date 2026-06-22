import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'PassGen – Secure Password Vault Desktop App',
    description: 'PassGen is a secure desktop application for generating strong passwords and storing them encrypted in the cloud. Built by a freelance full stack developer.',
    keywords: [
        'PassGen',
        'password generator',
        'password vault app',
        'secure password manager',
        'desktop password app',
        'Electron password app',
        'Windows password vault',
        'encrypted password storage',
        'freelance desktop app developer',
        'mDeploy',
        'Jalal Nasser',
    ],
    alternates: {
        canonical: '/passgen',
    },
    openGraph: {
        title: 'PassGen – Secure Password Vault Desktop App',
        description: 'Generate strong passwords and store them securely in an encrypted cloud vault. Available on Windows.',
        url: 'https://mdeploy.dev/passgen',
        siteName: 'mDeploy',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'PassGen – Secure Password Vault Desktop App',
        description: 'Generate strong passwords and store them securely in an encrypted cloud vault.',
        creator: '@jalalnasser',
    },
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}
