import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'PassGen Vault Developer',
    description: 'A secure and user-friendly desktop application for generating strong passwords and storing them encrypted in the cloud.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}
