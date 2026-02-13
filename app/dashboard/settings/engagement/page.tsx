'use client';

import React, { useState } from 'react';
import DashboardSidebar from '@/components/dashboard/DashboardSidebar';
import PageHeader from '@/components/dashboard/PageHeader';
import { useCustomerFlowStore } from '@/store/useCustomerFlowStore';
import { toast } from 'react-hot-toast';
import { Star, Share2, MessageCircle, Trophy, Link as LinkIcon, Save } from 'lucide-react';

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

    const handleSave = () => {
        useCustomerFlowStore.setState({ engagementSettings: localSettings });
        toast.success('Engagement settings updated successfully');
    };

    return (
        <DashboardSidebar>
            <div className="p-8">
                <PageHeader
                    title="Engagement Settings"
                    description="Configure how customers interact with your business after tapping"
                />

                <div className="max-w-4xl space-y-6">
                    {/* Capture Settings Optimization Note */}
                    <div className="bg-blue-50 border border-blue-100 rounded-2xl p-6 flex gap-4">
                        <div className="size-10 bg-blue-500 text-white rounded-xl flex items-center justify-center shrink-0">
                            <Star size={20} />
                        </div>
                        <div>
                            <h3 className="text-sm font-bold text-blue-900 mb-1">Performance Optimized</h3>
                            <p className="text-xs text-blue-700 leading-relaxed font-medium">
                                Your capture form is currently set to "High-Speed" mode (Name + Phone/Email).
                                Load times are under 800ms to ensure maximum conversion.
                            </p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Review Tile */}
                        <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-4">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="size-10 bg-amber-50 text-amber-500 rounded-xl flex items-center justify-center">
                                        <Star size={20} />
                                    </div>
                                    <h3 className="font-bold text-slate-900">Review Tile</h3>
                                </div>
                                <Toggle
                                    active={localSettings.showReview}
                                    onChange={(val: boolean) => setLocalSettings({ ...localSettings, showReview: val })}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Google Review URL</label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400 group-focus-within:text-primary transition-colors">
                                        <LinkIcon size={14} />
                                    </div>
                                    <input
                                        type="url"
                                        value={localSettings.reviewUrl}
                                        onChange={(e) => setLocalSettings({ ...localSettings, reviewUrl: e.target.value })}
                                        className="w-full h-10 pl-9 pr-4 bg-slate-50 border border-slate-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:bg-white transition-all text-xs font-medium"
                                        placeholder="https://g.page/r/your-id/review"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Social Tile */}
                        <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-4">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="size-10 bg-blue-50 text-blue-500 rounded-xl flex items-center justify-center">
                                        <Share2 size={20} />
                                    </div>
                                    <h3 className="font-bold text-slate-900">Social Tile</h3>
                                </div>
                                <Toggle
                                    active={localSettings.showSocial}
                                    onChange={(val: boolean) => setLocalSettings({ ...localSettings, showSocial: val })}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Instagram/Twitter URL</label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400 group-focus-within:text-primary transition-colors">
                                        <LinkIcon size={14} />
                                    </div>
                                    <input
                                        type="url"
                                        value={localSettings.socialUrl}
                                        onChange={(e) => setLocalSettings({ ...localSettings, socialUrl: e.target.value })}
                                        className="w-full h-10 pl-9 pr-4 bg-slate-50 border border-slate-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:bg-white transition-all text-xs font-medium"
                                        placeholder="https://instagram.com/your-id"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Survey Tile */}
                        <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-4">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="size-10 bg-purple-50 text-purple-500 rounded-xl flex items-center justify-center">
                                        <MessageCircle size={20} />
                                    </div>
                                    <h3 className="font-bold text-slate-900">Survey Tile</h3>
                                </div>
                                <Toggle
                                    active={localSettings.showFeedback}
                                    onChange={(val: boolean) => setLocalSettings({ ...localSettings, showFeedback: val })}
                                />
                            </div>
                            <p className="text-[10px] text-slate-500 font-medium leading-relaxed">
                                Collect quick feedback after capture. Configure questions in the <span className="text-primary font-bold cursor-pointer">Survey Builder</span>.
                            </p>
                        </div>

                        {/* Rewards Tile (Future) */}
                        <div className="bg-slate-50 rounded-2xl border border-dashed border-slate-200 p-6 opacity-60">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="size-10 bg-emerald-50 text-emerald-500 rounded-xl flex items-center justify-center">
                                        <Trophy size={20} />
                                    </div>
                                    <h3 className="font-bold text-slate-900">Loyalty Rewards</h3>
                                </div>
                                <span className="text-[8px] font-black uppercase tracking-widest bg-emerald-100 text-emerald-600 px-2 py-1 rounded">Coming Soon</span>
                            </div>
                        </div>
                    </div>

                    {/* Action Button */}
                    <div className="flex justify-end pt-4">
                        <button
                            onClick={handleSave}
                            className="h-12 px-8 bg-primary text-white font-black uppercase tracking-widest text-xs rounded-xl shadow-lg shadow-primary/20 hover:scale-[1.02] transition-all flex items-center gap-2"
                        >
                            <Save size={16} />
                            Save Configuration
                        </button>
                    </div>
                </div>
            </div>
        </DashboardSidebar>
    );
}
