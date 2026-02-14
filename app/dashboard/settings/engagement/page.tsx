'use client';

import React, { useState } from 'react';
import DashboardSidebar from '@/components/dashboard/DashboardSidebar';
import PageHeader from '@/components/dashboard/PageHeader';
import { useCustomerFlowStore } from '@/store/useCustomerFlowStore';
import { toast } from 'react-hot-toast';
import { Star, Share2, MessageCircle, Trophy, Link as LinkIcon, Save, Smartphone } from 'lucide-react';

const Toggle = ({ active, onChange }: { active: boolean; onChange: (val: boolean) => void }) => (
    <button
        onClick={() => onChange(!active)}
        className={`${active ? 'bg-primary' : 'bg-gray-200'} relative inline-flex h-6 w-11 items-center rounded-full transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary/20`}
    >
        <span className={`${active ? 'translate-x-6' : 'translate-x-1'} inline-block h-4 w-4 transform rounded-full bg-white transition-transform shadow-sm`} />
    </button>
);

export default function EngagementSettingsPage() {
    const { engagementSettings } = useCustomerFlowStore();
    const [localSettings, setLocalSettings] = useState(engagementSettings);

    const { updateEngagementSettings } = useCustomerFlowStore();

    const handleSave = () => {
        updateEngagementSettings(localSettings);
        toast.success('Engagement settings updated successfully');
    };

    return (
        <div className="p-8">
            <PageHeader
                title="Engagement Settings"
                description="Configure how customers interact with your business after tapping"
            />

            <div className="bg-blue-50 border border-blue-100 rounded-2xl p-6 mb-8 mt-6">
                <div className="flex items-start gap-4">
                    <div className="size-10 bg-blue-500 text-white rounded-xl flex items-center justify-center shrink-0 shadow-lg shadow-blue-500/20">
                        <Smartphone size={20} />
                    </div>
                    <div>
                        <h4 className="font-bold text-blue-900 mb-1">Conversion Optimized</h4>
                        <p className="text-xs text-blue-700 leading-relaxed font-medium">
                            Your capture form is currently set to "High-Speed" mode (Name + Phone/Email).
                            Load times are under 800ms to ensure maximum conversion.
                        </p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Review Configuration */}
                <div className="bg-white rounded-[2.5rem] border border-gray-100 p-8 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between mb-8">
                        <div className="flex items-center gap-4">
                            <div className="size-12 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center shadow-inner">
                                <Star size={24} />
                            </div>
                            <div>
                                <h3 className="font-display font-bold text-text-main">Review Engine</h3>
                                <p className="text-[10px] font-black uppercase tracking-widest text-text-secondary">Capture 5-Star ratings</p>
                            </div>
                        </div>
                        <Toggle
                            active={localSettings.showReview}
                            onChange={(val) => setLocalSettings((prev: any) => ({ ...prev, showReview: val }))}
                        />
                    </div>

                    <div className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-text-secondary ml-1">Google Review / Trustpilot URL</label>
                            <div className="relative">
                                <LinkIcon size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                                <input
                                    type="url"
                                    placeholder="https://g.page/review/your-business"
                                    value={localSettings.reviewUrl}
                                    onChange={(e) => setLocalSettings((prev: any) => ({ ...prev, reviewUrl: e.target.value }))}
                                    className="w-full h-14 bg-gray-50 border border-gray-100 rounded-2xl pl-12 pr-4 text-sm font-bold focus:bg-white focus:ring-4 focus:ring-primary/10 transition-all outline-none"
                                />
                            </div>
                        </div>
                        <p className="text-[10px] text-text-secondary font-medium leading-relaxed italic px-1">
                            Tip: A direct link to your "Write a review" modal increases conversion by 40%.
                        </p>
                    </div>
                </div>

                {/* Social Growth */}
                <div className="bg-white rounded-[2.5rem] border border-gray-100 p-8 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between mb-8">
                        <div className="flex items-center gap-4">
                            <div className="size-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center shadow-inner">
                                <Share2 size={24} />
                            </div>
                            <div>
                                <h3 className="font-display font-bold text-text-main">Social Multipaint</h3>
                                <p className="text-[10px] font-black uppercase tracking-widest text-text-secondary">Grow your following</p>
                            </div>
                        </div>
                        <Toggle
                            active={localSettings.showSocial}
                            onChange={(val) => setLocalSettings((prev: any) => ({ ...prev, showSocial: val }))}
                        />
                    </div>

                    <div className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-text-secondary ml-1">Primary Social Link</label>
                            <div className="relative">
                                <MessageCircle size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="instagram.com/your-business"
                                    value={localSettings.socialUrl}
                                    onChange={(e) => setLocalSettings((prev: any) => ({ ...prev, socialUrl: e.target.value }))}
                                    className="w-full h-14 bg-gray-50 border border-gray-100 rounded-2xl pl-12 pr-4 text-sm font-bold focus:bg-white focus:ring-4 focus:ring-primary/10 transition-all outline-none"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Feedback System */}
                <div className="bg-white rounded-[2.5rem] border border-gray-100 p-8 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between mb-8">
                        <div className="flex items-center gap-4">
                            <div className="size-12 bg-purple-50 text-purple-600 rounded-2xl flex items-center justify-center shadow-inner">
                                <MessageCircle size={24} />
                            </div>
                            <div>
                                <h3 className="font-display font-bold text-text-main">Direct Feedback</h3>
                                <p className="text-[10px] font-black uppercase tracking-widest text-text-secondary">Capture private complaints</p>
                            </div>
                        </div>
                        <Toggle
                            active={localSettings.showFeedback}
                            onChange={(val) => setLocalSettings((prev: any) => ({ ...prev, showFeedback: val }))}
                        />
                    </div>
                    <p className="text-sm text-text-secondary font-medium leading-relaxed">
                        Enabled feedback allows customers to send private messages directly to your dashboard. High-friction issues are caught before they reach Google Reviews.
                    </p>
                </div>

                {/* Rewards Awareness */}
                <div className="bg-white rounded-[2.5rem] border border-gray-100 p-8 shadow-sm hover:shadow-md transition-shadow opacity-50 grayscale cursor-not-allowed">
                    <div className="flex items-center justify-between mb-8">
                        <div className="flex items-center gap-4">
                            <div className="size-12 bg-pink-50 text-pink-600 rounded-2xl flex items-center justify-center shadow-inner">
                                <Trophy size={24} />
                            </div>
                            <div>
                                <h3 className="font-display font-bold text-text-main">Reward Awareness</h3>
                                <p className="text-[10px] font-black uppercase tracking-widest text-text-secondary">Configure in Loyalty Settings</p>
                            </div>
                        </div>
                        <div className="px-3 py-1 bg-gray-100 rounded-full text-[9px] font-black uppercase tracking-tighter">Locked</div>
                    </div>
                    <p className="text-sm text-text-secondary font-medium leading-relaxed">
                        This tile is automatically managed via your Rewards catalog. To edit rewards, please visit the Loyalty section.
                    </p>
                </div>
            </div>

            {/* Action Button */}
            <div className="flex justify-end pt-12 border-t border-gray-100 mt-12">
                <button
                    onClick={handleSave}
                    className="h-14 px-10 bg-primary text-white font-black uppercase tracking-widest text-xs rounded-2xl shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all flex items-center gap-3"
                >
                    <Save size={18} />
                    Save Configuration
                </button>
            </div>
        </div>
    );
}
