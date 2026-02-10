import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Software Solutions | Merchant Dashboard & CRM',
    description: 'The all-in-one management platform for NFC-powered businesses. Automated retention, customer analytics, and loyalty management.',
};

export default function SoftwareLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
