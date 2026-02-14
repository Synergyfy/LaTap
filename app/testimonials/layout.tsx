import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Testimonials',
    description: 'See how businesses are transforming physical interactions into digital growth with VemTap. Real results, conversion boosts, and ROI increases.',
};

export default function TestimonialsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
