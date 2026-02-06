'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import DashboardSidebar from '@/components/dashboard/DashboardSidebar';
import PageHeader from '@/components/dashboard/PageHeader';
import StatsCard from '@/components/dashboard/StatsCard';
import ChartCard from '@/components/dashboard/ChartCard';
import { Plus } from 'lucide-react';

export default function CampaignTemplatesPage() {
    const router = useRouter();

    const templates = [
        { id: '1', title: 'Welcome Message', category: 'Onboarding', type: 'Any', textColor: 'blue' },
        { id: '2', title: 'Weekend Promo', category: 'Marketing', type: 'WhatsApp', textColor: 'green' },
        { id: '3', title: 'Dormant User Re-engagement', category: 'Retention', type: 'SMS', textColor: 'purple' },
        { id: '4', title: 'Happy Birthday Reward', category: 'Special', type: 'Any', textColor: 'yellow' },
        { id: '5', title: 'New Product Launch', category: 'Marketing', type: 'WhatsApp', textColor: 'green' },
        { id: '6', title: 'Flash Sale Alert', category: 'Marketing', type: 'SMS', textColor: 'red' },
    ];

    const handleUseTemplate = (templateId: string) => {
        router.push(`/dashboard/campaigns?create=true&template=${templateId}`);
    };

    return (
        <DashboardSidebar>
            <div className="p-8">
                <PageHeader
                    title="Message Templates"
                    description="Quick-start your campaigns with pre-built message formats"
                    actions={
                        <button
                            onClick={() => router.push('/dashboard/campaigns?create=true')}
                            className="flex items-center gap-2 px-4 py-2.5 bg-primary text-white font-bold rounded-xl hover:bg-primary-hover transition-all text-sm shadow-md shadow-primary/20"
                        >
                            <Plus size={18} />
                            Create Template
                        </button>
                    }
                />

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {templates.map((template) => (
                        <div key={template.id} className="bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-lg transition-all group">
                            <div className="p-6">
                                <div className="flex items-start justify-between mb-4">
                                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center bg-gray-50 text-text-secondary group-hover:bg-primary/10 group-hover:text-primary transition-colors`}>
                                        <span className="material-icons-round text-xl">description</span>
                                    </div>
                                    <span className="px-2 py-1 bg-gray-50 text-[10px] font-black uppercase tracking-wider text-text-secondary rounded">
                                        {template.category}
                                    </span>
                                </div>
                                <h3 className="text-lg font-display font-bold text-text-main mb-2 tracking-tight">{template.title}</h3>
                                <p className="text-xs text-text-secondary leading-relaxed line-clamp-2 italic mb-4">
                                    "Hello {'{name}'}! We're excited to have you at {'{business}'}. As a welcome gift, here's a..."
                                </p>
                                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                                    <div className="flex items-center gap-1.5">
                                        <span className="material-icons-round text-sm text-gray-400">devices</span>
                                        <span className="text-[10px] font-bold text-text-secondary uppercase tracking-widest">{template.type}</span>
                                    </div>
                                    <button
                                        onClick={() => handleUseTemplate(template.id)}
                                        className="text-primary text-xs font-bold hover:underline flex items-center gap-1"
                                    >
                                        Use This
                                        <span className="material-icons-round text-sm">arrow_forward</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}

                    <button
                        onClick={() => router.push('/dashboard/campaigns?create=true')}
                        className="bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200 p-6 flex flex-col items-center justify-center text-center hover:bg-gray-100 hover:border-primary/30 transition-all group"
                    >
                        <div className="size-12 rounded-full bg-white flex items-center justify-center mb-4 shadow-sm group-hover:scale-110 transition-transform">
                            <Plus size={24} className="text-gray-400 group-hover:text-primary" />
                        </div>
                        <h3 className="font-bold text-text-main mb-1">Custom Template</h3>
                        <p className="text-xs text-text-secondary">Build from scratch</p>
                    </button>
                </div>
            </div>
        </DashboardSidebar>
    );
}
