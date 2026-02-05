'use client';

import React, { useState } from 'react';
import AdminSidebar from '@/components/admin/AdminSidebar';
import { notify } from '@/lib/notify';

export default function AdminSettingsPage() {
    const [activeTab, setActiveTab] = useState('general');

    return (
        <AdminSidebar>
            <div className="p-8">
                {/* Page Header */}
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-3xl font-display font-bold text-text-main mb-2">System Settings</h1>
                        <p className="text-text-secondary font-medium">Configure global platform parameters and preferences</p>
                    </div>
                    <button
                        onClick={() => notify.success('System settings updated successfully')}
                        className="px-6 py-3 bg-primary text-white font-bold rounded-xl hover:bg-primary-hover transition-colors shadow-lg shadow-primary/20 active:scale-95"
                    >
                        Save Changes
                    </button>
                </div>

                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Settings Navigation */}
                    <div className="w-full lg:w-64 shrink-0">
                        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                            <nav className="flex flex-col">
                                {[
                                    { id: 'general', label: 'General', icon: 'tune' },
                                    { id: 'security', label: 'Security & Access', icon: 'security' },
                                    { id: 'payment', label: 'Payment Gateways', icon: 'payments' },
                                    { id: 'notifications', label: 'Notifications', icon: 'notifications' },
                                    { id: 'api', label: 'API & Integrations', icon: 'api' },
                                ].map((item) => (
                                    <button
                                        key={item.id}
                                        onClick={() => setActiveTab(item.id)}
                                        className={`flex items-center gap-3 px-4 py-3 text-sm font-bold transition-colors ${activeTab === item.id
                                            ? 'bg-primary/5 text-primary border-l-4 border-primary'
                                            : 'text-text-secondary hover:bg-gray-50 border-l-4 border-transparent'
                                            }`}
                                    >
                                        <span className="material-icons-round text-lg">{item.icon}</span>
                                        {item.label}
                                    </button>
                                ))}
                            </nav>
                        </div>
                    </div>

                    {/* Settings Content */}
                    <div className="flex-1">
                        {activeTab === 'general' && (
                            <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-6">
                                <h2 className="text-lg font-bold text-text-main border-b border-gray-100 pb-4">General Configuration</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-text-secondary">Platform Name</label>
                                        <input type="text" defaultValue="EntryConnect" className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-text-secondary">Support Email</label>
                                        <input type="email" defaultValue="support@entryconnect.com" className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-text-secondary">Default Currency</label>
                                        <select className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20">
                                            <option value="NGN">NGN (Nigerian Naira)</option>
                                            <option value="USD">USD (US Dollar)</option>
                                            <option value="GBP">GBP (British Pound)</option>
                                        </select>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-text-secondary">Timezone</label>
                                        <select className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20">
                                            <option value="Africa/Lagos">West Africa Time (Lagos)</option>
                                            <option value="UTC">UTC</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'security' && (
                            <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-6">
                                <h2 className="text-lg font-bold text-text-main border-b border-gray-100 pb-4">Security Settings</h2>
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between py-2">
                                        <div>
                                            <p className="font-bold text-text-main">Enforce 2FA for Admins</p>
                                            <p className="text-sm text-text-secondary">Require two-factor authentication for all administrative accounts</p>
                                        </div>
                                        <label className="relative inline-flex items-center cursor-pointer">
                                            <input type="checkbox" className="sr-only peer" defaultChecked />
                                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                                        </label>
                                    </div>
                                    <div className="flex items-center justify-between py-2">
                                        <div>
                                            <p className="font-bold text-text-main">Password Expiry</p>
                                            <p className="text-sm text-text-secondary">Force password reset every 90 days</p>
                                        </div>
                                        <label className="relative inline-flex items-center cursor-pointer">
                                            <input type="checkbox" className="sr-only peer" />
                                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                                        </label>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Placeholder for other tabs (could expand later if needed, but this is enough 'meat' for now) */}
                        {['payment', 'notifications', 'api'].includes(activeTab) && (
                            <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
                                <div className="size-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <span className="material-icons-round text-3xl text-gray-300">construction</span>
                                </div>
                                <h3 className="text-lg font-bold text-text-main mb-2">Coming Soon</h3>
                                <p className="text-sm text-gray-500">This configuration module is under development.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AdminSidebar>
    );
}
