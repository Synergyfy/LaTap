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

    const handleSave = () => {
        useCustomerFlowStore.setState({ engagementSettings: localSettings });
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* ... other items ... */}
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
    );
}
