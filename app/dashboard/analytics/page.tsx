'use client';

import React from 'react';
import DashboardSidebar from '@/components/dashboard/DashboardSidebar';
import PageHeader from '@/components/dashboard/PageHeader';
import {
    BarChart3, TrendingUp, Users, Clock, Calendar,
    ArrowUpRight, ArrowDownRight, MousePointer2,
    MessageSquare, Star, Zap, Share2, Download
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/useAuthStore';
import { useQuery } from '@tanstack/react-query';
import { dashboardApi } from '@/lib/api/dashboard';

const STATS = [
    { label: 'Total Visits', value: '12,842', trend: '+14%', isUp: true, icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'New Customers', value: '4,120', trend: '+22%', isUp: true, icon: Zap, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { label: 'Avg. Stay Time', value: '42m', trend: '-2%', isUp: false, icon: Clock, color: 'text-purple-600', bg: 'bg-purple-50' },
    { label: 'Repeat Rate', value: '68%', trend: '+5%', isUp: true, icon: TrendingUp, color: 'text-amber-600', bg: 'bg-amber-50' },
];

const PEAK_TIMES = [
    { hour: '9am', value: 30 },
    { hour: '11am', value: 45 },
    { hour: '1pm', value: 85 },
    { hour: '3pm', value: 60 },
    { hour: '5pm', value: 95 },
    { hour: '7pm', value: 75 },
    { hour: '9pm', value: 40 },
];

export default function AnalyticsDashboardPage() {
    const router = useRouter();
    const { user } = useAuthStore();

    const { isLoading } = useQuery({
        queryKey: ['dashboard'],
        queryFn: dashboardApi.fetchDashboardData,
    });

    // Protection: Only Owners and Managers can view analytics
    React.useEffect(() => {
        if (!isLoading && user && user.role === 'staff') {
            router.push('/dashboard');
        }
    }, [user, isLoading, router]);

    return (
        <DashboardSidebar>
            <div className="p-4 md:p-8">
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-10">
                    <PageHeader
                        title="Business Analytics"
                        description="Deep dive into your customer behavior and engagement performance"
                    />
                    <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1 bg-white p-1 rounded-xl border border-gray-100 shadow-sm">
                            <button className="px-4 py-2 text-[10px] font-black uppercase tracking-widest text-primary bg-primary/5 rounded-lg transition-all">7D</button>
                            <button className="px-4 py-2 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-slate-600 rounded-lg transition-all">30D</button>
                            <button className="px-4 py-2 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-slate-600 rounded-lg transition-all">90D</button>
                        </div>
                        <button className="flex items-center gap-2 px-4 py-2.5 bg-slate-900 text-white font-black uppercase tracking-widest text-[10px] rounded-xl hover:bg-slate-800 transition-all shadow-lg shadow-slate-900/10">
                            <Download size={14} />
                            Export
                        </button>
                    </div>
                </div>

                {/* Main Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                    {STATS.map((stat, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-all group"
                        >
                            <div className="flex items-start justify-between mb-4">
                                <div className={`size-12 rounded-2xl ${stat.bg} ${stat.color} flex items-center justify-center transition-transform group-hover:scale-110`}>
                                    <stat.icon size={24} />
                                </div>
                                <div className={`flex items-center gap-1 text-[10px] font-black px-2 py-1 rounded-full ${stat.isUp ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'}`}>
                                    {stat.isUp ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                                    {stat.trend}
                                </div>
                            </div>
                            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-1">{stat.label}</p>
                            <h3 className="text-3xl font-black italic tracking-tight text-slate-900">{stat.value}</h3>
                        </motion.div>
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Hourly Traffic Chart */}
                    <div className="lg:col-span-2 bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm relative overflow-hidden">
                        <div className="relative z-10">
                            <h4 className="text-xl font-black italic mb-2 tracking-tight">Peak Traffic Times</h4>
                            <p className="text-sm text-slate-400 font-medium mb-12">Identify your busiest hours to optimize staffing</p>

                            <div className="flex items-end justify-between gap-4 h-64">
                                {PEAK_TIMES.map((t, i) => (
                                    <div key={i} className="flex-1 flex flex-col items-center gap-4 group">
                                        <div className="w-full relative">
                                            <motion.div
                                                initial={{ height: 0 }}
                                                animate={{ height: `${t.value}%` }}
                                                className="w-full bg-slate-900 rounded-2xl relative overflow-hidden group-hover:bg-primary transition-colors cursor-pointer"
                                            >
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                                            </motion.div>
                                            {t.value > 80 && (
                                                <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-primary text-white text-[8px] font-black py-1 px-2 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity uppercase tracking-widest shadow-lg">Peak Hour</div>
                                            )}
                                        </div>
                                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">{t.hour}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Engagement Metrics */}
                    <div className="space-y-6">
                        <div className="bg-slate-900 p-8 rounded-[2.5rem] text-white relative overflow-hidden">
                            <Star className="absolute -right-6 -top-6 size-40 text-white/5 rotate-12" />
                            <h4 className="text-xl font-black italic mb-6 tracking-tight relative z-10">Engagement Quality</h4>
                            <div className="space-y-6 relative z-10">
                                <div>
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-xs font-bold text-white/60">Survey Completion</span>
                                        <span className="text-sm font-black">78%</span>
                                    </div>
                                    <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                                        <div className="h-full bg-primary w-[78%] rounded-full" />
                                    </div>
                                </div>
                                <div>
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-xs font-bold text-white/60">Review Conversion</span>
                                        <span className="text-sm font-black">12.4%</span>
                                    </div>
                                    <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                                        <div className="h-full bg-amber-400 w-[12.4%] rounded-full" />
                                    </div>
                                </div>
                                <div>
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-xs font-bold text-white/60">Social Follows</span>
                                        <span className="text-sm font-black">42/day</span>
                                    </div>
                                    <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                                        <div className="h-full bg-blue-400 w-[60%] rounded-full" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
                            <h4 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 mb-6">Top Performers</h4>
                            <div className="space-y-4">
                                {[
                                    { label: 'Review Collection', icon: Share2, color: 'text-blue-500' },
                                    { label: 'Customer Survey #1', icon: MessageSquare, color: 'text-purple-500' },
                                    { label: 'NFC Tap Points', icon: MousePointer2, color: 'text-amber-500' }
                                ].map((item, i) => (
                                    <div key={i} className="flex items-center justify-between group cursor-pointer">
                                        <div className="flex items-center gap-3">
                                            <div className="size-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-primary/5 group-hover:text-primary transition-all">
                                                <item.icon size={18} />
                                            </div>
                                            <span className="text-xs font-bold text-slate-600 group-hover:text-slate-900 transition-all">{item.label}</span>
                                        </div>
                                        <ArrowUpRight size={14} className="text-slate-300 group-hover:text-primary transition-all" />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </DashboardSidebar>
    );
}
