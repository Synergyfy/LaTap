'use client';

import React from 'react';
import PageHeader from '@/components/dashboard/PageHeader';
import { Settings, Shield, Bell, Key, Layout } from 'lucide-react';
import { motion } from 'framer-motion';

export default function WhatsAppSettingsPage() {
    return (
        <div className="p-4 md:p-8 space-y-8 max-w-4xl mx-auto">
            <PageHeader
                title="WhatsApp Configuration"
                description="Manage your Meta Business credentials and message automation settings."
            />

            <div className="grid grid-cols-1 gap-6">
                <div className="bg-white rounded-[2.5rem] border border-gray-100 p-8 shadow-sm">
                    <div className="flex items-center gap-4 mb-8">
                        <div className="size-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center">
                            <Key size={24} />
                        </div>
                        <div>
                            <h3 className="text-lg font-display font-black text-text-main uppercase tracking-tight">API Credentials</h3>
                            <p className="text-xs text-text-secondary">Your Meta System User Token and Phone ID.</p>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-700 uppercase tracking-widest">Phone Number ID</label>
                                <input
                                    type="password"
                                    value="••••••••••••••••"
                                    readOnly
                                    className="w-full h-12 px-4 bg-gray-50 border border-gray-100 rounded-xl font-mono text-sm outline-none"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-700 uppercase tracking-widest">WABA Account ID</label>
                                <input
                                    type="password"
                                    value="••••••••••••••••"
                                    readOnly
                                    className="w-full h-12 px-4 bg-gray-50 border border-gray-100 rounded-xl font-mono text-sm outline-none"
                                />
                            </div>
                        </div>
                        <button className="text-xs font-bold text-primary hover:underline uppercase tracking-tight">Update Meta Integration</button>
                    </div>
                </div>

                <div className="bg-white rounded-[2.5rem] border border-gray-100 p-8 shadow-sm">
                    <div className="flex items-center gap-4 mb-8">
                        <div className="size-12 bg-purple-50 text-purple-600 rounded-2xl flex items-center justify-center">
                            <Shield size={24} />
                        </div>
                        <div>
                            <h3 className="text-lg font-display font-black text-text-main uppercase tracking-tight">Compliance & Privacy</h3>
                            <p className="text-xs text-text-secondary">Opt-in requirements and privacy settings.</p>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <label className="flex items-center gap-3 p-4 bg-gray-50 rounded-2xl cursor-pointer hover:bg-gray-100 transition-all border border-transparent hover:border-gray-200">
                            <input type="checkbox" defaultChecked className="size-5 accent-primary" />
                            <div>
                                <p className="text-sm font-bold text-text-main">Require double opt-in</p>
                                <p className="text-[10px] text-text-secondary">Automatically send a verification message to new subscribers.</p>
                            </div>
                        </label>
                        <label className="flex items-center gap-3 p-4 bg-gray-50 rounded-2xl cursor-pointer hover:bg-gray-100 transition-all border border-transparent hover:border-gray-200">
                            <input type="checkbox" defaultChecked className="size-5 accent-primary" />
                            <div>
                                <p className="text-sm font-bold text-text-main">Enable 'STOP' auto-reply</p>
                                <p className="text-[10px] text-text-secondary">Automatically unsubscribe users who reply with 'STOP'.</p>
                            </div>
                        </label>
                    </div>
                </div>
            </div>
        </div>
    );
}
