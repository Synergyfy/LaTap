'use client';

import React from 'react';
import PageHeader from '@/components/dashboard/PageHeader';
import { Settings, Shield, Globe, Terminal } from 'lucide-react';

export default function SMSSettingsPage() {
    return (
        <div className="p-4 md:p-8 space-y-8 max-w-4xl mx-auto">
            <PageHeader
                title="SMS Settings"
                description="Configure your Sender ID and global SMS routing preferences."
            />

            <div className="grid grid-cols-1 gap-6">
                <div className="bg-white rounded-[2.5rem] border border-gray-100 p-8 shadow-sm">
                    <div className="flex items-center gap-4 mb-8">
                        <div className="size-12 bg-slate-50 text-slate-600 rounded-2xl flex items-center justify-center">
                            <Terminal size={24} />
                        </div>
                        <div>
                            <h3 className="text-lg font-display font-black text-text-main uppercase tracking-tight">Sender ID Configuration</h3>
                            <p className="text-xs text-text-secondary">Custom names that appear on the customer's phone.</p>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-700 uppercase tracking-widest">Primary Sender ID</label>
                                <input
                                    type="text"
                                    placeholder="VemTap"
                                    className="w-full h-12 px-4 bg-gray-50 border border-gray-100 rounded-xl font-bold text-sm outline-none focus:bg-white focus:border-primary/20"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-700 uppercase tracking-widest">Global Routing</label>
                                <select className="w-full h-12 px-4 bg-gray-50 border border-gray-100 rounded-xl font-bold text-sm outline-none">
                                    <option>Optimized for Africa</option>
                                    <option>Global (Fastest)</option>
                                    <option>Cost Optimized</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
