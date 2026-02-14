'use client';

import React, { useState } from 'react';

export default function AdminAnalyticsPage() {
    const [dateRange, setDateRange] = useState('30days');

    const stats = [
        { label: 'Total Taps', value: '1.2M', change: '+12%', trend: 'up', icon: 'nfc' },
        { label: 'Unique Visitors', value: '850K', change: '+8%', trend: 'up', icon: 'people' },
        { label: 'Avg. Retention', value: '45%', change: '+2%', trend: 'up', icon: 'repeat' },
        { label: 'Platform Revenue', value: '₦125M', change: '+15%', trend: 'up', icon: 'attach_money' },
    ];

    const monthlyData = [
        { month: 'Jan', value: 65 },
        { month: 'Feb', value: 72 },
        { month: 'Mar', value: 85 },
        { month: 'Apr', value: 82 },
        { month: 'May', value: 90 },
        { month: 'Jun', value: 98 },
        { month: 'Jul', value: 112 },
        { month: 'Aug', value: 125 },
        { month: 'Sep', value: 138 },
        { month: 'Oct', value: 142 },
        { month: 'Nov', value: 155 },
        { month: 'Dec', value: 170 },
    ];

    const topBusinesses = [
        { name: 'Green Terrace Cafe', taps: '45,231', visitors: '12,500', growth: '+12%' },
        { name: 'Tech Hub Lagos', taps: '38,120', visitors: '8,900', growth: '+25%' },
        { name: 'Fitness Center', taps: '22,400', visitors: '5,600', growth: '+8%' },
        { name: 'Club 54', taps: '18,900', visitors: '4,200', growth: '+15%' },
        { name: 'Mega Plaza', taps: '15,600', visitors: '12,100', growth: '+5%' },
    ];

    return (
        <div className="p-8">
            {/* Page Header */}
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-display font-bold text-text-main mb-2">Platform Analytics</h1>
                    <p className="text-text-secondary font-medium">Holistic view of platform growth and engagement</p>
                </div>
                <select
                    value={dateRange}
                    onChange={(e) => setDateRange(e.target.value)}
                    className="px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm font-bold text-text-main focus:outline-none focus:ring-2 focus:ring-primary/20"
                >
                    <option value="7days">Last 7 Days</option>
                    <option value="30days">Last 30 Days</option>
                    <option value="90days">Last 3 Months</option>
                    <option value="1year">Last Year</option>
                </select>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {stats.map((stat, index) => (
                    <div key={index} className="bg-white rounded-xl p-6 border border-gray-200">
                        <div className="flex items-center justify-between mb-4">
                            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                                <span className="material-icons-round text-primary">{stat.icon}</span>
                            </div>
                            <span className={`flex items-center text-xs font-bold ${stat.trend === 'up' ? 'text-green-600 bg-green-50' : 'text-red-600 bg-red-50'} px-2 py-1 rounded-full`}>
                                {stat.trend === 'up' ? '↑' : '↓'} {stat.change}
                            </span>
                        </div>
                        <p className="text-sm text-text-secondary font-medium mb-1">{stat.label}</p>
                        <p className="text-3xl font-display font-bold text-text-main">{stat.value}</p>
                    </div>
                ))}
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Growth Chart */}
                <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 p-6">
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="text-lg font-bold text-text-main">Monthly Taps Growth</h2>
                        <button className="text-primary text-sm font-bold hover:underline">View Report</button>
                    </div>

                    <div className="h-64 flex items-end justify-between gap-2">
                        {monthlyData.map((data, index) => (
                            <div key={index} className="flex-1 flex flex-col items-center gap-2 group">
                                <div
                                    className="w-full bg-primary/10 rounded-t-lg group-hover:bg-primary/20 transition-all relative overflow-hidden"
                                    style={{ height: `${(data.value / 200) * 100}%` }}
                                >
                                    <div className="absolute bottom-0 w-full bg-primary/30 h-0 group-hover:h-full transition-all duration-500"></div>
                                </div>
                                <span className="text-xs text-text-secondary font-medium">{data.month}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Top Businesses */}
                <div className="bg-white rounded-xl border border-gray-200 p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-lg font-bold text-text-main">Top Performers</h2>
                    </div>
                    <div className="space-y-6">
                        {topBusinesses.map((biz, index) => (
                            <div key={index} className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-xs font-bold text-gray-500">
                                        {index + 1}
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-text-main">{biz.name}</p>
                                        <p className="text-xs text-text-secondary">{biz.taps} taps</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-sm font-bold text-green-600">{biz.growth}</p>
                                    <p className="text-xs text-text-secondary">this month</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <button className="w-full mt-6 py-2 text-primary font-bold text-sm hover:bg-primary/5 rounded-lg transition-colors">
                        View All Leaders
                    </button>
                </div>
            </div>
        </div>
    );
}
