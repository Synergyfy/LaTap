'use client';

import React from 'react';
import PageHeader from '@/components/dashboard/PageHeader';
import StatsCard from '@/components/dashboard/StatsCard';
import ChartCard from '@/components/dashboard/ChartCard';
import DataTable from '@/components/dashboard/DataTable';

export default function FootfallReportsPage() {
    const stats = [
        { label: 'Total Footfall', value: '45.2k', icon: 'trending_up', color: 'blue' },
        { label: 'Busiest Day', value: 'Saturday', icon: 'calendar_today', color: 'green' },
        { label: 'Peak Hour', value: '7:00 PM', icon: 'schedule', color: 'purple' },
        { label: 'Devices Active', icon: 'nfc', value: '18/20', color: 'yellow' },
    ];

    const hourlyData = [
        { hour: '8am', count: 12 }, { hour: '9am', count: 25 }, { hour: '10am', count: 45 }, { hour: '11am', count: 38 },
        { hour: '12pm', count: 72 }, { hour: '1pm', count: 85 }, { hour: '2pm', count: 68 }, { hour: '3pm', count: 54 },
        { hour: '4pm', count: 62 }, { hour: '5pm', count: 88 }, { hour: '6pm', count: 124 }, { hour: '7pm', count: 156 },
        { hour: '8pm', count: 142 }, { hour: '9pm', count: 98 }, { hour: '10pm', count: 65 }, { hour: '11pm', count: 32 },
    ];

    return (
        <div className="p-8">
            <PageHeader
                title="Footfall Analysis"
                description="Detailed tracking of physical visits and traffic patterns"
                actions={
                    <button className="flex items-center gap-2 px-4 py-2.5 bg-primary text-white font-bold rounded-xl hover:bg-primary-hover transition-all text-sm shadow-md shadow-primary/20">
                        <span className="material-icons-round text-lg">file_download</span>
                        Download Report
                    </button>
                }
            />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {stats.map((stat, index) => (
                    <StatsCard key={index} {...stat as any} />
                ))}
            </div>

            <ChartCard title="Hourly Footfall" subtitle="Today's traffic distributed by hour">
                <div className="h-64 flex items-end justify-between px-2 pb-2 mt-4">
                    {hourlyData.map((d, i) => (
                        <div key={i} className="flex flex-col items-center gap-3 w-full group relative">
                            <div
                                className="w-4/5 bg-primary/20 rounded-t-sm hover:bg-primary transition-all cursor-pointer"
                                style={{ height: `${(d.count / 160) * 100}%` }}
                            >
                                <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-[10px] font-bold py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-20">
                                    {d.count} visits
                                </div>
                            </div>
                            <span className="text-[10px] font-bold text-text-secondary uppercase transform -rotate-45">{d.hour}</span>
                        </div>
                    ))}
                </div>
            </ChartCard>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
                <ChartCard title="Traffic by Entrance" subtitle="Comparison of entry points">
                    <div className="space-y-6">
                        {[
                            { name: 'Main Gate', percentage: '45%', count: '2,842', color: 'bg-blue-500' },
                            { name: 'Side Entrance', percentage: '28%', count: '1,540', color: 'bg-green-500' },
                            { name: 'Parking Lot', percentage: '20%', count: '1,241', color: 'bg-purple-500' },
                            { name: 'Loading Dock', percentage: '7%', count: '312', color: 'bg-yellow-500' },
                        ].map((item, i) => (
                            <div key={i} className="space-y-2">
                                <div className="flex justify-between text-xs font-bold">
                                    <div className="flex items-center gap-2">
                                        <div className={`size-3 ${item.color} rounded-full`}></div>
                                        <span className="text-text-main">{item.name}</span>
                                    </div>
                                    <span className="text-text-secondary">{item.count} ({item.percentage})</span>
                                </div>
                                <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden">
                                    <div className={`h-full ${item.color} rounded-full`} style={{ width: item.percentage }}></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </ChartCard>

                <ChartCard title="Visit Duration" subtitle="Average time spent by customers">
                    <div className="h-full flex flex-col justify-center gap-8">
                        <div className="flex items-center justify-between p-6 bg-gray-50 rounded-2xl border border-gray-100">
                            <div className="flex items-center gap-4">
                                <div className="size-12 rounded-xl bg-white border border-gray-200 flex items-center justify-center">
                                    <span className="material-icons-round text-primary">timer</span>
                                </div>
                                <div>
                                    <p className="text-[10px] font-black uppercase tracking-widest text-text-secondary">Average Stay</p>
                                    <p className="text-2xl font-display font-bold text-text-main">45 Minutes</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="text-xs font-bold text-green-600">+12%</p>
                                <p className="text-[10px] text-text-secondary uppercase">vs last week</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-3 gap-4">
                            {[
                                { label: 'Short', time: '< 15m', p: '24%' },
                                { label: 'Medium', time: '15-60m', p: '58%' },
                                { label: 'Long', time: '> 60m', p: '18%' },
                            ].map((s, i) => (
                                <div key={i} className="p-4 bg-white border border-gray-100 rounded-xl text-center">
                                    <p className="text-[10px] font-black uppercase tracking-widest text-text-secondary mb-1">{s.label}</p>
                                    <p className="font-bold text-text-main text-sm">{s.p}</p>
                                    <p className="text-[10px] text-text-secondary">{s.time}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </ChartCard>
            </div>
        </div>
    );
}
