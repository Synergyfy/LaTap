import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'NFC Marketplace | Buy Custom Branded Tags & Cards',
    description: 'Shop premium NFC hardware. Custom-printed identity cards, smart stickers, and metal plates pre-configured for your VemTap dashboard.',
};

export default function MarketplaceLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
