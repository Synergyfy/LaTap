'use client';

import React from 'react';
import CustomerSidebar from '@/components/customer/CustomerSidebar';
import Notification from '@/components/ui/Notification';
import { notify } from '@/lib/notify';

export default function CustomerSettingsPage() {
    const handleSave = () => {
        notify.success('Profile updated successfully!');
    };

    return (
        <CustomerSidebar>
            <div className="max-w-2xl mx-auto space-y-8">
                <div>
                    <h1 className="text-2xl font-display font-bold text-text-main mb-2">Profile & Settings</h1>
                    <p className="text-text-secondary font-medium text-sm">Manage your account preferences</p>
                </div>

                {/* Profile Card */}
                <div className="bg-white rounded-2xl border border-gray-200 p-8">
                    <div className="flex items-center gap-6 mb-8">
                        <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center border-4 border-gray-50 shadow-sm relative">
                            <span className="material-icons-round text-4xl text-gray-400">person</span>
                            <button className="absolute bottom-0 right-0 p-1.5 bg-primary text-white rounded-full hover:bg-primary-hover shadow-sm">
                                <span className="material-icons-round text-sm">edit</span>
                            </button>
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-text-main">Daniel Customer</h2>
                            <p className="text-text-secondary text-sm">Member since Jan 2024</p>
                            <span className="inline-block mt-2 px-3 py-1 bg-yellow-50 text-yellow-700 text-xs font-bold rounded-full border border-yellow-100">
                                Gold Tier
                            </span>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-text-secondary">Full Name</label>
                                <input type="text" defaultValue="Daniel Customer" className="w-full h-10 px-4 border border-gray-200 rounded-lg text-sm bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all font-medium" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-text-secondary">Email Address</label>
                                <input type="email" defaultValue="customer@latap.com" className="w-full h-10 px-4 border border-gray-200 rounded-lg text-sm bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all font-medium" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-text-secondary">Phone Number</label>
                                <input type="tel" defaultValue="+234 801 234 5678" className="w-full h-10 px-4 border border-gray-200 rounded-lg text-sm bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all font-medium" />
                            </div>
                        </div>

                        <div className="pt-6 border-t border-gray-100">
                            <h3 className="font-bold text-text-main mb-4 text-sm">Notification Preferences</h3>
                            <div className="space-y-3">
                                <label className="flex items-center justify-between cursor-pointer">
                                    <span className="text-sm font-medium text-text-secondary">Email me about new rewards</span>
                                    <input type="checkbox" className="accent-primary w-4 h-4" defaultChecked />
                                </label>
                                <label className="flex items-center justify-between cursor-pointer">
                                    <span className="text-sm font-medium text-text-secondary">SMS notifications for activity</span>
                                    <input type="checkbox" className="accent-primary w-4 h-4" />
                                </label>
                            </div>
                        </div>

                        <div className="flex justify-end pt-4">
                            <button onClick={handleSave} className="px-6 py-2.5 bg-primary text-white font-bold text-sm rounded-xl hover:bg-primary-hover transition-colors shadow-lg shadow-primary/20">
                                Save Changes
                            </button>
                        </div>
                    </div>
                </div>

                <div className="bg-red-50 border border-red-100 rounded-xl p-6">
                    <h3 className="font-bold text-red-900 mb-2">Danger Zone</h3>
                    <p className="text-xs text-red-700/80 mb-4">Once you delete your account, there is no going back. All your points and rewards will be permanently lost.</p>
                    <button className="text-red-600 border border-red-200 px-4 py-2 rounded-lg text-xs font-bold hover:bg-red-100 transition-colors">
                        Delete Account
                    </button>
                </div>
            </div>
        </CustomerSidebar>
    );
}
