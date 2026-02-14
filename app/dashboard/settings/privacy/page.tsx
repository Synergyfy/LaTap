'use client';

import React from 'react';
import PageHeader from '@/components/dashboard/PageHeader';

export default function PrivacySettingsPage() {
    return (
        <div className="p-8 max-w-4xl mx-auto">
            <PageHeader
                title="Privacy & Data Control"
                description="Manage how your customer data is stored and used"
                actions={
                    <button className="flex items-center gap-2 px-6 py-2.5 bg-primary text-white font-bold rounded-xl hover:bg-primary-hover transition-all text-sm shadow-md shadow-primary/20">
                        Save Changes
                    </button>
                }
            />

            <div className="space-y-8">
                {/* Data Retention */}
                <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
                    <div className="px-8 py-6 border-b border-gray-100 bg-gray-50/50">
                        <h3 className="font-display font-bold text-text-main">Data Retention Policy</h3>
                    </div>
                    <div className="p-8 space-y-6">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-text-secondary ml-1">Automatically Delete Customer Data After</label>
                            <select className="w-full h-11 bg-gray-50 border border-gray-100 rounded-xl px-4 text-sm font-medium focus:bg-white focus:ring-2 focus:ring-primary/20 transition-all outline-none">
                                <option>Never (Retain indefinitely)</option>
                                <option>6 Months of inactivity</option>
                                <option>1 Year of inactivity</option>
                                <option>2 Years of inactivity</option>
                            </select>
                            <p className="text-[10px] text-text-secondary mt-2 px-1 italic">Note: Loyalty members are excluded from automatic deletion to preserve their points.</p>
                        </div>
                    </div>
                </div>

                {/* Consent Management */}
                <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
                    <div className="px-8 py-6 border-b border-gray-100 bg-gray-50/50">
                        <h3 className="font-display font-bold text-text-main">Visitor Consent</h3>
                    </div>
                    <div className="p-8 space-y-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <h4 className="font-bold text-text-main text-sm">Mandatory Opt-in</h4>
                                <p className="text-xs text-text-secondary mt-1">Visitors must explicitly agree to terms before their tap is recorded</p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input type="checkbox" defaultChecked className="sr-only peer" />
                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                            </label>
                        </div>

                        <hr className="border-gray-100" />

                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-text-secondary ml-1">Custom Privacy Footer</label>
                            <textarea placeholder="e.g. By tapping, you agree to our Terms of Service and Privacy Policy..." rows={3} className="w-full bg-gray-50 border border-gray-100 rounded-xl p-4 text-sm font-medium focus:bg-white focus:ring-2 focus:ring-primary/20 transition-all outline-none resize-none" />
                        </div>
                    </div>
                </div>

                {/* Data Actions */}
                <div className="p-8 bg-red-50 border border-red-100 rounded-2xl">
                    <h4 className="font-display font-bold text-red-900 mb-2">Danger Zone</h4>
                    <p className="text-sm text-red-800 font-medium mb-6 leading-relaxed">
                        These actions are permanent and cannot be undone. Always export your data before proceeding with bulk deletions.
                    </p>
                    <div className="flex gap-4">
                        <button className="px-6 py-2.5 bg-white border border-red-200 text-red-600 font-bold rounded-xl hover:bg-red-50 transition-all text-sm">
                            Export All Data
                        </button>
                        <button className="px-6 py-2.5 bg-red-600 text-white font-bold rounded-xl hover:bg-red-700 transition-all text-sm shadow-md shadow-red-200">
                            Wipe Customer Records
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
