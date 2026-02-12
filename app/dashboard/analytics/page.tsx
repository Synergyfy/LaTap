'use client';

import React from 'react';
import DashboardSidebar from '@/components/dashboard/DashboardSidebar';
import PageHeader from '@/components/dashboard/PageHeader';
import StatsCard from '@/components/dashboard/StatsCard';
import ChartCard from '@/components/dashboard/ChartCard';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/useAuthStore';
import { useQuery } from '@tanstack/react-query';
import { dashboardApi } from '@/lib/api/dashboard';

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

    const stats = [
        { label: 'Total Visits', value: '12,847', icon: 'visibility', color: 'blue', trend: { value: '+18%', isUp: true } },
        { label: 'Unique Visitors', value: '4,124', icon: 'people', color: 'green', trend: { value: '+24%', isUp: true } },
        { label: 'Return Rate', value: '72%', icon: 'loop', color: 'purple', trend: { value: '+5%', isUp: true } },
        { label: 'Avg. Stay Time', value: '45m', icon: 'timer', color: 'yellow', trend: { value: '+12%', isUp: true } },
    ];

    return (
        <DashboardSidebar>
            <div className="p-4 md:p-8">
                <PageHeader
                    title="Analytics Overview"
                    description="Deep dive into your business traffic and customer behavior"
                    actions={
                        <div className="flex gap-2">
                            <select className="h-11 px-4 bg-white border border-gray-200 rounded-xl text-sm font-bold text-text-main outline-none focus:ring-2 focus:ring-primary/20">
                                <option>Last 30 Days</option>
                                <option>Last 7 Days</option>
                                <option>Last Year</option>
                                <option>Custom Range</option>
                            </select>
                            <button className="flex items-center gap-2 px-4 py-2.5 bg-primary text-white font-bold rounded-xl hover:bg-primary-hover transition-all text-sm shadow-md shadow-primary/20">
                                <span className="material-icons-round text-lg">file_download</span>
                                Export All
                            </button>
                        </div>
                    }
                />

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {stats.map((stat, index) => (
                        <StatsCard key={index} {...stat as any} />
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                    <ChartCard title="Visitor Growth" subtitle="Daily traffic over the last 30 days">
                        <div className="h-64 flex items-end gap-2 px-4 pb-4">
                            {[40, 65, 45, 80, 55, 90, 70, 85, 60, 95, 75, 100, 80, 85, 70, 90, 65, 80, 55, 75, 85, 90, 70, 85, 100, 90, 80, 95, 85, 100].map((v, i) => (
                                <div key={i} className="flex-1 bg-primary/20 rounded-t-sm hover:bg-primary transition-all group relative cursor-pointer" style={{ height: `${v}%` }}>
                                    <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-[10px] font-bold py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-20">
                                        {Math.floor(v * 2.5)} visits
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="flex justify-between px-4 mt-2 border-t border-gray-100 pt-3">
                            <span className="text-[10px] font-bold text-text-secondary uppercase">Oct 1</span>
                            <span className="text-[10px] font-bold text-text-secondary uppercase">Oct 15</span>
                            <span className="text-[10px] font-bold text-text-secondary uppercase">Oct 30</span>
                        </div>
                    </ChartCard>

                    <ChartCard title="Visitor Types" subtitle="New vs Returning distribution">
                        <div className="h-64 flex flex-col items-center justify-center">
                            <div className="relative size-48">
                                <svg className="size-full" viewBox="0 0 36 36">
                                    <path className="stroke-gray-100 fill-none" strokeWidth="3" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                                    <path className="stroke-primary fill-none" strokeWidth="3" strokeDasharray="72, 100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                                </svg>
                                <div className="absolute inset-0 flex flex-col items-center justify-center">
                                    <p className="text-3xl font-display font-bold text-text-main">72%</p>
                                    <p className="text-[10px] font-bold text-text-secondary uppercase tracking-widest">Returning</p>
                                </div>
                            </div>
                            <div className="mt-8 flex gap-8">
                                <div className="flex items-center gap-2">
                                    <div className="size-3 bg-primary rounded-full"></div>
                                    <span className="text-xs font-bold text-text-main">Returning (72%)</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="size-3 bg-gray-100 border border-gray-200 rounded-full"></div>
                                    <span className="text-xs font-bold text-text-main">New (28%)</span>
                                </div>
                            </div>
                        </div>
                    </ChartCard>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <ChartCard title="Top Devices" subtitle="Best performing NFC points">
                        <div className="space-y-4">
                            {[
                                { name: 'Main Entrance', count: '4,842', color: 'bg-blue-500' },
                                { name: 'Outdoor Lounge', count: '3,124', color: 'bg-green-500' },
                                { name: 'Table 1-10', count: '2,841', color: 'bg-purple-500' },
                                { name: 'Bar Area', count: '1,540', color: 'bg-yellow-500' },
                            ].map((device, i) => (
                                <div key={i} className="space-y-1.5">
                                    <div className="flex justify-between text-xs font-bold">
                                        <span className="text-text-main">{device.name}</span>
                                        <span className="text-text-secondary">{device.count} taps</span>
                                    </div>
                                    <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                                        <div className={`h-full ${device.color} rounded-full`} style={{ width: `${(parseInt(device.count.replace(',', '')) / 5000) * 100}%` }}></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </ChartCard>

                    <div className="lg:col-span-2">
                        <ChartCard title="Busiest Days" subtitle="Visitor patterns per day of week">
                            <div className="h-64 flex items-end justify-between px-4 pb-4">
                                {[
                                    { day: 'MON', v: 45 },
                                    { day: 'TUE', v: 52 },
                                    { day: 'WED', v: 48 },
                                    { day: 'THU', v: 65 },
                                    { day: 'FRI', v: 85 },
                                    { day: 'SAT', v: 100 },
                                    { day: 'SUN', v: 92 },
                                ].map((d, i) => (
                                    <div key={i} className="flex flex-col items-center gap-3 w-12">
                                        <div className="w-full bg-primary/20 rounded-lg hover:bg-primary transition-all group relative cursor-pointer" style={{ height: `${d.v * 1.8}px` }}>
                                            <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-[10px] font-bold py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                                                {d.v * 10} visitors
                                            </div>
                                        </div>
                                        <span className="text-[10px] font-black tracking-widest text-text-secondary uppercase">{d.day}</span>
                                    </div>
                                ))}
                            </div>
                        </ChartCard>
                    </div>
                </div>
            </div>
        </DashboardSidebar>
    );
}
