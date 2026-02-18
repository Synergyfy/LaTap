import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Login to Dashboard',
    description: 'Access your merchant dashboard to manage visitors, loyalty programs, and automated marketing broadcasts.',
};

export default function LoginLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
