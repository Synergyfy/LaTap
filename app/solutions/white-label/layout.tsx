import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'White-Label Solutions | Partner Ecosystem',
    description: 'Build your own brand using ElizTap technology. Full sovereignty, custom branding, and dedicated infrastructure for agencies and resellers.',
};

export default function WhiteLabelLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
