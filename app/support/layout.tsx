import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Support Center',
    description: 'Get help with VemTap. Technical setup, billing, data privacy, and developer API documentation to help you succeed.',
};

export default function SupportLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
