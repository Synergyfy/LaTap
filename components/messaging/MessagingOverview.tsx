'use client';

import React from 'react';
import Link from 'next/link';
import { useMessagingStore } from '@/lib/store/useMessagingStore';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Send, Users, Activity, BarChart2, MessageSquare } from 'lucide-react';

export default function MessagingOverview() {
    const { stats, campaigns } = useMessagingStore();

    // Mock data for the chart
    const data = [
        { name: 'Mon', sent: 400, delivered: 240 },
        { name: 'Tue', sent: 300, delivered: 139 },
        { name: 'Wed', sent: 200, delivered: 980 },
        { name: 'Thu', sent: 278, delivered: 390 },
        { name: 'Fri', sent: 189, delivered: 480 },
        { name: 'Sat', sent: 239, delivered: 380 },
        { name: 'Sun', sent: 349, delivered: 430 },
    ];

    return (
        <div className="space-y-6">
            <h2 className="text-xl font-display font-bold text-text-main">Performance Summary</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex items-center gap-4">
                    <div className="p-3 bg-blue-50 text-blue-600 rounded-lg">
                        <Send size={20} />
                    </div>
                    <div>
                        <p className="text-xs text-text-secondary font-bold uppercase tracking-wider">Total Sent</p>
                        <h3 className="text-2xl font-bold text-text-main">{stats.totalSent.toLocaleString()}</h3>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex items-center gap-4">
                    <div className="p-3 bg-green-50 text-green-600 rounded-lg">
                        <Activity size={20} />
                    </div>
                    <div>
                        <p className="text-xs text-text-secondary font-bold uppercase tracking-wider">Delivery Rate</p>
                        <h3 className="text-2xl font-bold text-text-main">{stats.deliveryRate}%</h3>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex items-center gap-4">
                    <div className="p-3 bg-purple-50 text-purple-600 rounded-lg">
                        <Users size={20} />
                    </div>
                    <div>
                        <p className="text-xs text-text-secondary font-bold uppercase tracking-wider">Acquisition</p>
                        <h3 className="text-2xl font-bold text-text-main">1,204</h3>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex items-center gap-4">
                    <div className="p-3 bg-orange-50 text-orange-600 rounded-lg">
                        <BarChart2 size={20} />
                    </div>
                    <div>
                        <p className="text-xs text-text-secondary font-bold uppercase tracking-wider">Response Rate</p>
                        <h3 className="text-2xl font-bold text-text-main">{stats.responseRate}%</h3>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Chart */}
                <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-gray-200 shadow-sm h-[400px]">
                    <h3 className="text-lg font-bold text-text-main mb-4">Traffic Overview</h3>
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={data}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#9CA3AF', fontSize: 12 }} dy={10} />
                            <YAxis axisLine={false} tickLine={false} tick={{ fill: '#9CA3AF', fontSize: 12 }} />
                            <Tooltip
                                contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #E5E7EB', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                                itemStyle={{ color: '#374151', fontSize: '12px', fontWeight: 'bold' }}
                            />
                            <Area type="monotone" dataKey="sent" stackId="1" stroke="#3B82F6" fill="#EFF6FF" strokeWidth={3} />
                            <Area type="monotone" dataKey="delivered" stackId="1" stroke="#10B981" fill="#ECFDF5" strokeWidth={3} />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>

                {/* Quick Actions */}
                <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col justify-between">
                    <div>
                        <h3 className="text-lg font-bold text-text-main mb-2">Quick Broadcast</h3>
                        <p className="text-sm text-text-secondary mb-6">Start a new campaign across any channel.</p>

                        <div className="space-y-4">
                            <Link href="/dashboard/messaging/whatsapp/new" className="block p-4 border border-gray-200 rounded-xl hover:border-green-500 hover:bg-green-50 transition-all group">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600 group-hover:bg-green-500 group-hover:text-white transition-colors">
                                        <MessageSquare size={18} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-text-main text-sm">WhatsApp Blast</h4>
                                        <p className="text-xs text-text-secondary">High open rates & engagement</p>
                                    </div>
                                </div>
                            </Link>

                            <Link href="/dashboard/messaging/sms/new" className="block p-4 border border-gray-200 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-all group">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 group-hover:bg-blue-500 group-hover:text-white transition-colors">
                                        <Send size={18} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-text-main text-sm">SMS Alert</h4>
                                        <p className="text-xs text-text-secondary">Instant delivery & reach</p>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    </div>

                    <div className="pt-6 border-t border-gray-100 mt-6">
                        <div className="flex justify-between items-center text-sm">
                            <span className="text-text-secondary font-medium">Recent Activity</span>
                            <Link href="/dashboard/messaging/history" className="text-primary font-bold hover:underline">View All</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
