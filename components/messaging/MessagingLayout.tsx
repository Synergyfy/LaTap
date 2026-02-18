'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useMessagingStore } from '@/lib/store/useMessagingStore';
import { MessageSquare, Phone, Mail, LayoutDashboard, Wallet, CreditCard } from 'lucide-react';

interface MessagingLayoutProps {
    children: React.ReactNode;
}

export default function MessagingLayout({ children }: MessagingLayoutProps) {
    const pathname = usePathname();
    const { wallet } = useMessagingStore();

    const tabs = [
        { name: 'Overview', href: '/dashboard/messaging', icon: LayoutDashboard, exact: true },
        { name: 'WhatsApp', href: '/dashboard/messaging/whatsapp', icon: MessageSquare, exact: false },
        { name: 'SMS', href: '/dashboard/messaging/sms', icon: Phone, exact: false },
        { name: 'Email', href: '/dashboard/messaging/email', icon: Mail, exact: false },
    ];

    const isActive = (tab: typeof tabs[0]) => {
        if (tab.exact) return pathname === tab.href;
        return pathname.startsWith(tab.href);
    };

    return (
        <div className="h-full flex flex-col bg-gray-50">
            {/* Header / Stats Bar */}
            <div className="bg-white border-b border-gray-200 px-8 py-4 flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-display font-bold text-text-main">Messaging Center</h1>
                    <p className="text-text-secondary text-sm">Manage all your communication channels in one place</p>
                </div>

                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-3 px-4 py-2 bg-gray-50 rounded-xl border border-gray-100">
                        <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                            <Wallet size={18} />
                        </div>
                        <div>
                            <p className="text-xs text-text-secondary font-bold uppercase tracking-wider">Wallet Balance</p>
                            <p className="text-lg font-mono font-bold text-text-main">
                                {wallet.credits.toFixed(2)} <span className="text-xs text-gray-400">{wallet.currency}</span>
                            </p>
                        </div>
                    </div>
                    <button className="px-4 py-2 bg-primary text-white font-bold rounded-xl hover:bg-primary-hover transition-all flex items-center gap-2 shadow-lg shadow-primary/20 active:scale-95">
                        <CreditCard size={18} />
                        Top Up
                    </button>
                </div>
            </div>

            {/* Navigation Tabs */}
            <div className="bg-white border-b border-gray-200 px-8 flex gap-8">
                {tabs.map((tab) => {
                    const active = isActive(tab);
                    const Icon = tab.icon;
                    return (
                        <Link
                            key={tab.name}
                            href={tab.href}
                            className={`
                                flex items-center gap-2 py-4 border-b-2 transition-all text-sm font-bold
                                ${active
                                    ? 'border-primary text-primary'
                                    : 'border-transparent text-text-secondary hover:text-text-main hover:border-gray-300'}
                            `}
                        >
                            <Icon size={18} />
                            {tab.name}
                        </Link>
                    )
                })}
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-y-auto p-6 relative">
                <div className="h-full w-full max-w-7xl mx-auto">
                    {children}
                </div>
            </div>
        </div>
    );
}
