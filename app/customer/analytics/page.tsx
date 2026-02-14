'use client';

import React from 'react';
import { Coffee, Dumbbell, Smartphone, History, Star, PiggyBank } from 'lucide-react';

export default function CustomerAnalyticsPage() {
    return (
        <div className="max-w-6xl mx-auto space-y-8">
            <div>
                <h1 className="text-3xl font-display font-bold text-text-main">Your Analytics</h1>
                <p className="text-text-secondary mt-2">Detailed breakdown of your activity and rewards</p>
            </div>

            {/* Stats Grid with Trends */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                    { label: 'Total Visits', value: '42', icon: History, color: 'blue', trend: { value: '+12%', isUp: true, label: 'vs last month' } },
                    { label: 'Reward Points', value: '1,250', icon: Star, color: 'primary', trend: { value: '+350', isUp: true, label: 'this month' } },
                    { label: 'Net Savings', value: '₦15,000', icon: PiggyBank, color: 'green', trend: { value: '+₦3,500', isUp: true, label: 'this month' } },
                ].map((stat, index) => {
                    const IconComponent = stat.icon;
                    return (
                        <div key={index} className="bg-white p-6 rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-all group">
                            <div className="flex items-start justify-between mb-4">
                                <div className={`w-12 h-12 rounded-lg flex items-center justify-center transition-colors ${stat.color === 'blue' ? 'bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white' :
                                    stat.color === 'primary' ? 'bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white' :
                                        'bg-green-50 text-green-600 group-hover:bg-green-600 group-hover:text-white'
                                    }`}>
                                    <IconComponent size={24} />
                                </div>
                                {stat.trend && (
                                    <div className={`flex flex-col items-end`}>
                                        <span className={`text-xs font-bold ${stat.trend.isUp ? 'text-green-600' : 'text-red-600'}`}>
                                            {stat.trend.value}
                                        </span>
                                        <span className="text-[9px] text-text-secondary font-medium">{stat.trend.label}</span>
                                    </div>
                                )}
                            </div>
                            <p className="text-[10px] font-black uppercase text-text-secondary tracking-[0.15em] mb-1">{stat.label}</p>
                            <p className="text-3xl font-display font-bold text-text-main">{stat.value}</p>
                        </div>
                    );
                })}
            </div>

            {/* Analytics Dashboard */}
            <div className="bg-white p-8 rounded-lg border border-gray-100 shadow-sm">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h3 className="font-display font-bold text-xl text-text-main">Detailed Breakdown</h3>
                        <p className="text-xs text-text-secondary font-medium mt-1">Track your progress over time</p>
                    </div>
                    <select className="px-4 py-2 bg-gray-50 border border-gray-100 rounded-lg text-xs font-bold text-text-main focus:outline-none focus:ring-2 focus:ring-primary/20">
                        <option>Last 30 Days</option>
                        <option>Last 90 Days</option>
                        <option>This Year</option>
                        <option>All Time</option>
                    </select>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Visit Trends */}
                    <div>
                        <h4 className="text-sm font-bold text-text-main mb-4 flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-primary"></div>
                            Visit Trends
                        </h4>
                        <div className="space-y-3">
                            {[
                                { month: 'January', visits: 8, max: 15 },
                                { month: 'February', visits: 12, max: 15 },
                                { month: 'March', visits: 15, max: 15 },
                                { month: 'April', visits: 7, max: 15 },
                            ].map((item) => (
                                <div key={item.month}>
                                    <div className="flex items-center justify-between mb-1">
                                        <span className="text-xs font-bold text-text-secondary">{item.month}</span>
                                        <span className="text-xs font-black text-primary">{item.visits} visits</span>
                                    </div>
                                    <div className="w-full bg-gray-100 rounded-full h-2">
                                        <div
                                            className="bg-primary h-full rounded-full transition-all"
                                            style={{ width: `${(item.visits / item.max) * 100}%` }}
                                        ></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Points Breakdown */}
                    <div>
                        <h4 className="text-sm font-bold text-text-main mb-4 flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-green-500"></div>
                            Points Earned by Category
                        </h4>
                        <div className="space-y-3">
                            {[
                                { category: 'Food & Dining', points: 650, color: 'bg-orange-500', percentage: 52 },
                                { category: 'Fitness & Wellness', points: 300, color: 'bg-blue-500', percentage: 24 },
                                { category: 'Shopping', points: 200, color: 'bg-purple-500', percentage: 16 },
                                { category: 'Entertainment', points: 100, color: 'bg-pink-500', percentage: 8 },
                            ].map((item) => (
                                <div key={item.category}>
                                    <div className="flex items-center justify-between mb-1">
                                        <span className="text-xs font-bold text-text-secondary">{item.category}</span>
                                        <span className="text-xs font-black text-text-main">{item.points} pts</span>
                                    </div>
                                    <div className="w-full bg-gray-100 rounded-full h-2">
                                        <div
                                            className={`${item.color} h-full rounded-full transition-all`}
                                            style={{ width: `${item.percentage}%` }}
                                        ></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Top Venues */}
                    <div>
                        <h4 className="text-sm font-bold text-text-main mb-4 flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                            Most Visited Venues
                        </h4>
                        <div className="space-y-3">
                            {[
                                { name: 'Green Terrace Cafe', visits: 18, icon: Coffee },
                                { name: 'Fitness Center', visits: 12, icon: Dumbbell },
                                { name: 'NextGen Tech Store', visits: 8, icon: Smartphone },
                            ].map((venue) => {
                                const VenueIcon = venue.icon;
                                return (
                                    <div key={venue.name} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                                        <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center text-text-secondary">
                                            <VenueIcon size={18} />
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-xs font-bold text-text-main">{venue.name}</p>
                                            <p className="text-[10px] text-text-secondary font-medium">{venue.visits} visits</p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Savings Breakdown */}
                    <div>
                        <h4 className="text-sm font-bold text-text-main mb-4 flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-green-500"></div>
                            Savings Breakdown
                        </h4>
                        <div className="space-y-3">
                            <div className="p-4 bg-green-50 rounded-lg border border-green-100">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-xs font-bold text-green-900">Total Saved</span>
                                    <span className="text-2xl font-display font-bold text-green-600">₦15,000</span>
                                </div>
                                <div className="text-[10px] text-green-700 font-medium">Through rewards & discounts</div>
                            </div>
                            {[
                                { type: 'Reward Redemptions', amount: '₦8,500' },
                                { type: 'Member Discounts', amount: '₦4,200' },
                                { type: 'Bonus Offers', amount: '₦2,300' },
                            ].map((item) => (
                                <div key={item.type} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                    <span className="text-xs font-bold text-text-secondary">{item.type}</span>
                                    <span className="text-sm font-black text-text-main">{item.amount}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
