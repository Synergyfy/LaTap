'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { MessageChannel, useMessagingStore } from '@/lib/store/useMessagingStore';
import { MessageSquare, Phone, Mail, LayoutDashboard, Wallet, CreditCard, Plus, Smartphone } from 'lucide-react';
import TopUpModal from './TopUpModal';

interface MessagingLayoutProps {
    children: React.ReactNode;
}

export default function MessagingLayout({ children }: MessagingLayoutProps) {
    const pathname = usePathname();
    const { wallets } = useMessagingStore();
    const [isTopUpOpen, setIsTopUpOpen] = useState(false);

    // Detect current channel from pathname
    const getCurrentChannel = (): MessageChannel | 'Global' => {
        if (pathname.includes('/whatsapp')) return 'WhatsApp';
        if (pathname.includes('/sms')) return 'SMS';
        if (pathname.includes('/email')) return 'Email';
        return 'Global';
    };

    const currentChannel = getCurrentChannel();
    // For Global or Journey, we show a default or total, but for specific channels we show their balance
    const activeWallet = currentChannel !== 'Global'
        ? wallets[currentChannel as MessageChannel]
        : { credits: 0, currency: 'POINTS' as const };

    const tabs: { name: string; href: string; icon: any; exact: boolean; channel?: MessageChannel | 'Global' }[] = [
        { name: 'Overview', href: '/dashboard/messaging', icon: LayoutDashboard, exact: true, channel: 'Global' },
        { name: 'WhatsApp', href: '/dashboard/messaging/whatsapp', icon: MessageSquare, exact: false, channel: 'WhatsApp' },
        { name: 'SMS', href: '/dashboard/messaging/sms', icon: Phone, exact: false, channel: 'SMS' },
        { name: 'Email', href: '/dashboard/messaging/email', icon: Mail, exact: false, channel: 'Email' },
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
                    <Link
                        href="/dashboard/messaging/compose"
                        className="px-6 py-2.5 bg-primary text-white font-bold rounded-xl hover:bg-primary-hover transition-all flex items-center gap-2 shadow-lg shadow-primary/20 active:scale-95 text-sm"
                    >
                        <Plus size={18} />
                        Compose Message
                    </Link>

                    <div className="h-8 w-px bg-gray-200 mx-2" />

                    <div className="flex items-center gap-3 px-4 py-2 bg-gray-50 rounded-xl border border-gray-100">
                        <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                            <Wallet size={18} />
                        </div>
                        <div>
                            <p className="text-[10px] text-text-secondary font-bold uppercase tracking-wider">
                                {currentChannel === 'Global' ? 'Select a Channel' : `${currentChannel} Credits`}
                            </p>
                            <p className="text-lg font-mono font-bold text-text-main leading-none">
                                {currentChannel === 'Global' ? '-' : activeWallet.credits.toLocaleString()} <span className="text-[10px] text-gray-400 uppercase tracking-widest">{activeWallet.currency}</span>
                            </p>
                        </div>
                    </div>
                    <button
                        onClick={() => setIsTopUpOpen(true)}
                        className="px-4 py-2 bg-primary text-white font-bold rounded-xl hover:bg-primary-hover transition-all flex items-center gap-2 shadow-lg shadow-primary/20 active:scale-95"
                    >
                        <Plus size={18} />
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

            <TopUpModal
                isOpen={isTopUpOpen}
                onClose={() => setIsTopUpOpen(false)}
                targetChannel={currentChannel === 'Global' ? 'WhatsApp' : currentChannel}
            />
        </div>
    );
}
