'use client';

import MessagingLayout from '@/components/messaging/MessagingLayout';

export default function Layout({ children }: { children: React.ReactNode }) {
    return <MessagingLayout>{children}</MessagingLayout>;
}
