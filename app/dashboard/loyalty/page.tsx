"use client";

import React from 'react';
import DashboardSidebar from '@/components/dashboard/DashboardSidebar';
import PageHeader from '@/components/dashboard/PageHeader';
import { LoyaltyAnalytics } from '@/components/loyalty/admin/LoyaltyAnalytics';
import Link from 'next/link';
import {
    Settings, Gift, Users, ShieldCheck,
    ArrowRight, ExternalLink
} from 'lucide-react';
import { cn } from '@/lib/utils';

const QUICK_LINKS = [
    {
        title: 'Program Settings',
        description: 'Configure earning rules, base points, and cooldowns.',
        href: '/dashboard/loyalty/settings',
        icon: Settings,
        color: 'text-blue-600',
        bgColor: 'bg-blue-50'
    },
    {
        title: 'Reward Manager',
        description: 'Create and manage your business reward catalog.',
        href: '/dashboard/loyalty/rewards',
        icon: Gift,
        color: 'text-primary',
        bgColor: 'bg-primary/5'
    },
    {
        title: 'Member Directory',
        description: 'View customer balances and tier distributions.',
        href: '/dashboard/loyalty/customers',
        icon: Users,
        color: 'text-emerald-600',
        bgColor: 'bg-emerald-50'
    },
    {
        title: 'Terminal Verifier',
        description: 'Securely validate customer reward codes.',
        href: '/dashboard/loyalty/verify',
        icon: ShieldCheck,
        color: 'text-slate-900',
        bgColor: 'bg-slate-100'
    },
];

export default function LoyaltyOverviewPage() {
    return (
        <DashboardSidebar>
            <div className="p-8 space-y-10">
                <PageHeader
                    title="Loyalty Overview"
                    description="Monitor and manage your business loyalty ecosystem"
                />

                {/* Analytics Section */}
                <section className="space-y-6">
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-display font-black text-slate-900 uppercase tracking-tight">System Performance</h2>
                        <Link href="/dashboard/analytics" className="text-xs font-bold text-primary hover:underline flex items-center gap-1">
                            View Detailed Reports
                            <ExternalLink className="w-3 h-3" />
                        </Link>
                    </div>
                    <LoyaltyAnalytics />
                </section>

                {/* Management Quick Links */}
                <section className="space-y-6 pt-10 border-t border-slate-100">
                    <h2 className="text-xl font-display font-black text-slate-900 uppercase tracking-tight">Management Suite</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {QUICK_LINKS.map((link) => (
                            <Link
                                key={link.title}
                                href={link.href}
                                className="group p-6 bg-white border border-slate-200 hover:border-primary transition-all shadow-sm hover:shadow-md relative overflow-hidden"
                            >
                                <div className={cn("w-12 h-12 flex items-center justify-center mb-4 transition-colors", link.bgColor, link.color, "group-hover:bg-primary group-hover:text-white")}>
                                    <link.icon className="w-6 h-6" />
                                </div>
                                <h3 className="font-bold text-slate-900 mb-2 group-hover:text-primary transition-colors">{link.title}</h3>
                                <p className="text-xs text-slate-500 leading-relaxed mb-6">{link.description}</p>

                                <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-primary opacity-0 group-hover:opacity-100 transition-all transform translate-x-[-10px] group-hover:translate-x-0">
                                    Access Tool
                                    <ArrowRight className="w-3 h-3" />
                                </div>

                                {/* Background Decoration */}
                                <div className="absolute -bottom-4 -right-4 w-16 h-16 bg-slate-50 rounded-full opacity-50 group-hover:bg-primary/5 transition-colors" />
                            </Link>
                        ))}
                    </div>
                </section>
            </div>
        </DashboardSidebar>
    );
}
