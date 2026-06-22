import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'PassGen Pricing – Plans & Features',
    description: 'Compare PassGen plans and choose the right tier for your password security needs.',
    alternates: {
        canonical: '/passgen/pricing',
    },
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}
