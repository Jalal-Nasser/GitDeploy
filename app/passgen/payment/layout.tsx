import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'PassGen – Complete Your Purchase',
    description: 'Secure checkout for your PassGen subscription.',
    alternates: {
        canonical: '/passgen/payment',
    },
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}
