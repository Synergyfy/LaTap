'use client';

import React from 'react';
import PageHeader from '@/components/dashboard/PageHeader';
import { Mail, Shield, Globe, Server } from 'lucide-react';

export default function EmailSettingsPage() {
    return (
        <div className="p-4 md:p-8 space-y-8 max-w-4xl mx-auto">
            <PageHeader
                title="Email Infrastructure"
                description="Manage your domain DNS records and SMTP certificates."
            />

            <div className="grid grid-cols-1 gap-6">
                <div className="bg-white rounded-[2.5rem] border border-gray-100 p-8 shadow-sm">
                    <div className="flex items-center gap-4 mb-8">
                        <div className="size-12 bg-purple-50 text-purple-600 rounded-2xl flex items-center justify-center">
                            <Server size={24} />
                        </div>
                        <div>
                            <h3 className="text-lg font-display font-black text-text-main uppercase tracking-tight">Domain Authentication</h3>
                            <p className="text-xs text-text-secondary">Verify your domain to improve inbox delivery.</p>
                        </div>
                    </div>

                    <div className="p-6 bg-amber-50 rounded-2xl border border-amber-100 mb-8">
                        <div className="flex gap-4">
                            <Shield className="text-amber-600 shrink-0" size={24} />
                            <div>
                                <p className="text-sm font-bold text-amber-900">SPF/DKIM Missing</p>
                                <p className="text-[11px] text-amber-700 mt-1">Please add the required DNS records to your domain to prevent emails from going to spam.</p>
                            </div>
                        </div>
                    </div>

                    <button className="h-12 px-6 bg-primary text-white font-bold rounded-xl text-xs uppercase tracking-widest">
                        Generate DNS Records
                    </button>
                </div>
            </div>
        </div>
    );
}
