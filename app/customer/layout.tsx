'use client';

import React from 'react';
import CustomerSidebar from '@/components/customer/CustomerSidebar';

export default function CustomerLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <CustomerSidebar>
            {children}
        </CustomerSidebar>
    );
}
