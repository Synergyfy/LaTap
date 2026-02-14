'use client';

import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { dashboardApi } from '@/lib/api/dashboard';
import Link from 'next/link';
import {
    ArrowLeft, BarChart2, MousePointer2,
    Send, CheckCircle2, TrendingUp, Users,
    Clock, MessageSquare, Mail, Smartphone
} from 'lucide-react';
import ChartCard from '@/components/dashboard/ChartCard';
import StatsCard from '@/components/dashboard/StatsCard';

export default function CampaignStatsPage() {
    const params = useParams();
    const router = useRouter();
    const campaignId = params.id as string;

    const { data, isLoading } = useQuery({
        queryKey: ['dashboard'],
        queryFn: dashboardApi.fetchDashboardData,
    });

    const campaign = data?.campaigns?.find((c: any) => c.id === campaignId);

    if (isLoading) {
        return (
            <div className="p-8 flex items-center justify-center min-h-[60vh]">
                <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
            </div>
        );
    }

    if (!campaign) {
        return (
            <div className="p-8 flex flex-col items-center justify-center min-h-[60vh] text-center">
                <div className="w-20 h-20 rounded-4xl bg-gray-50 flex items-center justify-center text-gray-400 mb-6">
                    <BarChart2 size={40} />
                </div>
                <h2 className="text-2xl font-display font-bold text-text-main mb-2">Campaign Not Found</h2>
                <p className="text-text-secondary mb-8">The campaign analytics you're looking for aren't available.</p>
                <Link href="/dashboard/campaigns" className="px-6 py-3 bg-primary text-white font-bold rounded-xl hover:bg-primary-hover transition-colors">
                    Back to Campaigns
                </Link>
            </div>
        );
    }

    const getChannelIcon = (type: string) => {
        switch (type) {
            case 'WhatsApp': return MessageSquare;
            case 'Email': return Mail;
            case 'SMS': return Smartphone;
            default: return Send;
        }
    };

    const ChannelIcon = getChannelIcon(campaign.type);

    return (
        <div className="p-4 lg:p-10 max-w-7xl mx-auto space-y-10">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="flex items-center gap-5">
                    <button
                        onClick={() => router.back()}
                        className="w-12 h-12 rounded-2xl bg-white border border-gray-100 flex items-center justify-center text-text-secondary hover:text-primary transition-all shadow-sm hover:shadow-md"
                    >
                        <ArrowLeft size={24} />
                    </button>
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <span className={`w-2 h-2 rounded-full ${campaign.status === 'Active' ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]' : 'bg-gray-300'}`}></span>
                            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-text-secondary leading-none">Campaign Analytics</span>
                        </div>
                        <h1 className="text-3xl font-display font-bold text-text-main tracking-tight">{campaign.name}</h1>
                    </div>
                </div>

                <div className="flex items-center gap-3 p-2 bg-white rounded-2xl border border-gray-100 shadow-sm">
                    <div className="px-4 py-2 border-r border-gray-100">
                        <p className="text-[10px] font-black uppercase text-gray-400 mb-1">Channel</p>
                        <div className="flex items-center gap-2">
                            <ChannelIcon size={14} className="text-primary" />
                            <p className="text-sm font-bold text-text-main">{campaign.type}</p>
                        </div>
                    </div>
                    <div className="px-4 py-2">
                        <p className="text-[10px] font-black uppercase text-gray-400 mb-1">Audience</p>
                        <p className="text-sm font-bold text-text-main">{campaign.audience}</p>
                    </div>
                </div>
            </div>

            {/* Top Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatsCard
                    label="Total Recipients"
                    value={campaign.sent.toLocaleString()}
                    icon={Users}
                    color="blue"
                />
                <StatsCard
                    label="Delivery Rate"
                    value={`${campaign.deliveryRate}%`}
                    icon={CheckCircle2}
                    color="green"
                    trend={{ value: '+2.1%', isUp: true }}
                />
                <StatsCard
                    label="Total Clicks"
                    value={(campaign.clicks || 0).toLocaleString()}
                    icon={MousePointer2}
                    color="purple"
                    trend={{ value: `${campaign.ctr}% CTR`, isUp: true }}
                />
                <StatsCard
                    label="Est. Conversions"
                    value={Math.floor(campaign.clicks * 0.15).toLocaleString()}
                    icon={TrendingUp}
                    color="yellow"
                    trend={{ value: '15% Conv.', isUp: true }}
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Performance Chart */}
                <div className="lg:col-span-2 space-y-8">
                    <ChartCard title="Engagement Timeline" subtitle="Sends vs Clicks over the last 24 hours">
                        <div className="h-64 flex items-end justify-between gap-2 px-4">
                            {[20, 35, 65, 45, 30, 85, 40, 25, 55, 70, 90, 60].map((val, i) => (
                                <div key={i} className="flex-1 flex flex-col items-center gap-1 group">
                                    <div className="w-full flex flex-col gap-0.5 items-end justify-end h-full">
                                        {/* Clicks */}
                                        <div
                                            className="w-full bg-primary rounded-t-sm group-hover:bg-primary/80 transition-all"
                                            style={{ height: `${val * 0.3}%` }}
                                        />
                                        {/* Sends */}
                                        <div
                                            className="w-full bg-primary/20 rounded-t-sm group-hover:bg-primary/30 transition-all"
                                            style={{ height: `${val}%` }}
                                        />
                                    </div>
                                    <span className="text-[8px] font-bold text-text-secondary uppercase">{i * 2}h</span>
                                </div>
                            ))}
                        </div>
                        <div className="mt-6 flex items-center justify-center gap-6">
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 bg-primary/20 rounded-sm"></div>
                                <span className="text-xs font-bold text-text-secondary">Messages Sent</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 bg-primary rounded-sm"></div>
                                <span className="text-xs font-bold text-text-secondary">Direct Clicks</span>
                            </div>
                        </div>
                    </ChartCard>

                    <div className="bg-white rounded-4xl p-8 border border-gray-100 shadow-sm">
                        <h3 className="text-lg font-bold text-text-main mb-6">Audience Engagement Analysis</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                            <div className="space-y-6">
                                <div>
                                    <div className="flex justify-between mb-2">
                                        <p className="text-xs font-black uppercase text-text-secondary">Returning Customers</p>
                                        <p className="text-xs font-bold text-primary">65%</p>
                                    </div>
                                    <div className="w-full h-2 bg-gray-50 rounded-full overflow-hidden">
                                        <div className="h-full bg-primary" style={{ width: '65%' }}></div>
                                    </div>
                                </div>
                                <div>
                                    <div className="flex justify-between mb-2">
                                        <p className="text-xs font-black uppercase text-text-secondary">New Customers</p>
                                        <p className="text-xs font-bold text-blue-500">35%</p>
                                    </div>
                                    <div className="w-full h-2 bg-gray-50 rounded-full overflow-hidden">
                                        <div className="h-full bg-blue-500" style={{ width: '35%' }}></div>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-primary/5 rounded-3xl p-6 border border-primary/10">
                                <div className="flex items-center gap-3 mb-3">
                                    <Clock className="text-primary" size={20} />
                                    <h4 className="font-bold text-text-main text-sm">Optimal Send Time</h4>
                                </div>
                                <p className="text-xs text-text-secondary leading-relaxed font-medium">
                                    Based on previous engagement, your optimal send time for <span className="text-primary font-bold">{campaign.type}</span> to <span className="text-text-main font-bold">{campaign.audience}</span> is between <span className="text-text-main font-bold">12:00 PM and 2:00 PM</span>.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Insights & Recommendations */}
                <div className="space-y-8">
                    <div className="bg-white rounded-4xl p-8 border border-gray-100 shadow-sm">
                        <h3 className="text-lg font-bold text-text-main mb-6">Performance Insights</h3>
                        <div className="space-y-6">
                            {[
                                { label: 'Link Click-Through', val: campaign.ctr, color: 'primary', icon: MousePointer2 },
                                { label: 'Message Delivery', val: campaign.deliveryRate, color: 'emerald-500', icon: CheckCircle2 },
                                { label: 'Unsubscribe Rate', val: 0.8, color: 'rose-500', icon: Users },
                            ].map((insight, i) => (
                                <div key={i} className="group">
                                    <div className="flex items-center justify-between mb-2">
                                        <div className="flex items-center gap-2">
                                            <insight.icon size={14} className={`text-${insight.color}`} />
                                            <span className="text-xs font-bold text-text-main">{insight.label}</span>
                                        </div>
                                        <span className="text-xs font-bold text-text-main">{insight.val}%</span>
                                    </div>
                                    <div className="w-full h-1.5 bg-gray-50 rounded-full overflow-hidden">
                                        <div
                                            className={`h-full bg-primary transition-all duration-1000`}
                                            style={{ width: `${insight.val}%` }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-text-main rounded-4xl p-8 text-white relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full translate-x-10 -translate-y-10 blur-3xl"></div>
                        <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                            <span className="material-icons-round text-primary">auto_awesome</span>
                            Campaign AI Tip
                        </h3>
                        <p className="text-sm text-white/70 leading-relaxed font-medium mb-4">
                            Your <span className="text-white font-bold">{campaign.type}</span> campaign is seeing high engagement from local residents.
                        </p>
                        <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
                            <p className="text-[11px] text-white/90 italic font-medium leading-relaxed">
                                "Consider adding a 'Limited Time' countdown to your next message to boost CTR by an estimated 8%."
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
