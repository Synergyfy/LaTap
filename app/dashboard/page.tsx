'use client';

import React, { useState } from 'react';
import DashboardSidebar from '@/components/dashboard/DashboardSidebar';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { dashboardApi } from '@/lib/api/dashboard';
import { Visitor } from '@/lib/store/mockDashboardStore';
import toast from 'react-hot-toast';
import {
    Users, UserPlus, Repeat, Calendar, TrendingUp, TrendingDown,
    ChevronDown, Trash, Send, Nfc, Download, Gift, ArrowRight, MessageSquare
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import Modal from '@/components/ui/Modal';
import SendMessageModal from '@/components/dashboard/SendMessageModal';
import VisitorDetailsModal from '@/components/dashboard/VisitorDetailsModal';
import PreviewRewardModal from '@/components/dashboard/PreviewRewardModal';

export default function DashboardPage() {
    const queryClient = useQueryClient();
    const router = useRouter();
    const [showClearModal, setShowClearModal] = useState(false);
    const [selectedVisitorForMsg, setSelectedVisitorForMsg] = useState<{ visitor: Visitor, type: 'welcome' | 'reward' } | null>(null);
    const [selectedVisitorForDetails, setSelectedVisitorForDetails] = useState<Visitor | null>(null);
    const [rewardPreviewVisitor, setRewardPreviewVisitor] = useState<Visitor | null>(null);

    // Fetch Dashboard Data
    const { data, isLoading } = useQuery({
        queryKey: ['dashboard'],
        queryFn: dashboardApi.fetchDashboardData,
    });

    // Mutation: Add Visitor (Simulates inbound traffic)
    const addVisitorMutation = useMutation({
        mutationFn: dashboardApi.addVisitor,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['dashboard'] });
            toast.success('New visitor check-in simulated!');
        },
    });

    // Mutation: Clear Dashboard
    const clearDashboardMutation = useMutation({
        mutationFn: dashboardApi.clearDashboard,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['dashboard'] });
            toast.success('Dashboard data cleared');
        },
    });

    const handleSimulateVisitor = () => {
        const isNew = Math.random() > 0.5;
        const newVisitor: Visitor = {
            id: Math.random().toString(36).substr(2, 9),
            name: isNew ? `New User ${Math.floor(Math.random() * 100)}` : `Returning User ${Math.floor(Math.random() * 100)}`,
            phone: `+234 ${Math.floor(Math.random() * 900) + 100} ${Math.floor(Math.random() * 9000) + 1000}`,
            time: 'Just now',
            timestamp: Date.now(),
            status: isNew ? 'new' : 'returning',
        };
        addVisitorMutation.mutate(newVisitor);
    };

    const handleClearDashboard = () => {
        setShowClearModal(true);
    };

    const confirmClear = () => {
        clearDashboardMutation.mutate();
        setShowClearModal(false);
    };

    const stats = [
        {
            label: 'Total Visitors',
            value: data?.stats.totalVisitors.toLocaleString() || '0',
            change: '+12.5%',
            trend: 'up',
            icon: Users,
            color: 'blue'
        },
        {
            label: 'New Visitors',
            value: data?.stats.newVisitors.toLocaleString() || '0',
            change: '+36.8%',
            trend: 'up',
            icon: UserPlus,
            color: 'green'
        },
        {
            label: 'Repeat Visitors',
            value: data?.stats.repeatVisitors.toLocaleString() || '0',
            change: '+8.2%',
            trend: 'up',
            icon: Repeat,
            color: 'purple'
        },
        {
            label: 'Today\'s Visits',
            value: data?.stats.todaysVisits.toLocaleString() || '0',
            change: '-2.4%',
            trend: 'down',
            icon: Calendar,
            color: 'orange'
        },
    ];

    const maxVisits = data ? Math.max(...data.activityData.map((d: any) => d.visits)) : 100;

    if (isLoading) {
        return (
            <DashboardSidebar>
                <div className="flex items-center justify-center p-8 h-screen">
                    <div className="animate-pulse flex flex-col items-center">
                        <div className="w-12 h-12 bg-gray-200 rounded-full mb-4"></div>
                        <div className="h-4 w-32 bg-gray-200 rounded"></div>
                    </div>
                </div>
            </DashboardSidebar>
        );
    }

    return (
        <DashboardSidebar>
            <div className="p-8">
                {/* Page Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
                    <div>
                        <h1 className="text-3xl font-display font-bold text-text-main mb-2">Dashboard Overview</h1>
                        <p className="text-text-secondary font-medium">Welcome back! Here's what's happening with your business today.</p>
                    </div>

                    <button
                        onClick={handleClearDashboard}
                        disabled={clearDashboardMutation.isPending}
                        className="flex items-center gap-2 px-4 py-2 text-xs font-bold text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors"
                    >
                        <Trash size={16} />
                        Reset Data
                    </button>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {stats.map((stat, index) => {
                        const IconComponent = stat.icon;
                        const TrendIcon = stat.trend === 'up' ? TrendingUp : TrendingDown;

                        return (
                            <div key={index} className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-shadow">
                                <div className="flex items-start justify-between mb-4">
                                    <div className={`w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center`}>
                                        <IconComponent className="text-primary" size={20} />
                                    </div>
                                    <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-bold ${stat.trend === 'up' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
                                        <TrendIcon size={12} />
                                        {stat.change}
                                    </div>
                                </div>
                                <p className="text-xs font-bold uppercase tracking-wider text-text-secondary mb-1">{stat.label}</p>
                                <p className="text-3xl font-display font-bold text-text-main">{stat.value}</p>
                                <p className="text-xs text-text-secondary mt-2">vs last month</p>
                            </div>
                        );
                    })}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Visitor Activity Chart */}
                    <div className="lg:col-span-2 bg-white rounded-xl p-6 border border-gray-200">
                        <div className="flex items-center justify-between mb-6">
                            <div>
                                <h2 className="text-xl font-display font-bold text-text-main mb-1">Visitor Activity</h2>
                                <p className="text-sm text-text-secondary">Today's hourly breakdown</p>
                            </div>
                            <button className="flex items-center gap-2 px-4 py-2 text-sm font-bold text-text-secondary hover:text-text-main hover:bg-gray-50 rounded-lg transition-colors">
                                <span>This Week</span>
                                <ChevronDown size={16} />
                            </button>
                        </div>

                        {/* Simple Bar Chart */}
                        <div className="flex items-end justify-between gap-3 h-64">
                            {data?.activityData.map((d: any, index: number) => (
                                <div key={index} className="flex-1 flex flex-col items-center gap-2">
                                    <div className="w-full bg-gray-100 rounded-t-lg relative" style={{ height: '100%' }}>
                                        <div
                                            className="absolute bottom-0 w-full bg-primary rounded-t-lg transition-all hover:bg-primary-hover cursor-pointer"
                                            style={{ height: `${(d.visits / maxVisits) * 100}%` }}
                                            title={`${d.visits} visits`}
                                        ></div>
                                    </div>
                                    <div className="text-center">
                                        <p className="text-xs font-bold text-text-main">{d.visits}</p>
                                        <p className="text-[10px] text-text-secondary">{d.hour}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="bg-white rounded-xl p-6 border border-gray-200">
                        <h2 className="text-xl font-display font-bold text-text-main mb-4">Quick Actions</h2>
                        <div className="space-y-3">
                            <button
                                onClick={handleSimulateVisitor}
                                disabled={addVisitorMutation.isPending}
                                className="w-full h-[68px] flex items-center justify-between p-4 bg-primary text-white rounded-xl hover:bg-primary-hover transition-all shadow-lg shadow-primary/20 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed group"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center">
                                        {addVisitorMutation.isPending ? (
                                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                        ) : (
                                            <UserPlus size={20} />
                                        )}
                                    </div>
                                    <div className="text-left">
                                        <p className="font-bold text-sm leading-none mb-1">Simulate Check-in</p>
                                        <p className="text-[10px] text-white/70 font-medium tracking-tight">Generate a test visit</p>
                                    </div>
                                </div>
                                <ArrowRight size={18} className="opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                            </button>

                            {[
                                { label: 'Manual Entry', desc: 'Add visitor manually', icon: UserPlus, route: '/dashboard/visitors/all', color: 'bg-orange-50 text-orange-600', hover: 'hover:border-orange-200' },
                                { label: 'New Message', desc: 'Reach your customers', icon: MessageSquare, route: '/dashboard/campaigns', color: 'bg-indigo-50 text-indigo-600', hover: 'hover:border-indigo-200' },
                                { label: 'Add Device', desc: 'Setup NFC terminal', icon: Nfc, route: '/dashboard/settings/devices', color: 'bg-blue-50 text-blue-600', hover: 'hover:border-blue-200' },
                                { label: 'Export Data', desc: 'Download CSV reports', icon: Download, route: '/dashboard/visitors/all', color: 'bg-green-50 text-green-600', hover: 'hover:border-green-200' }
                            ].map((action, i) => (
                                <button
                                    key={i}
                                    onClick={() => {
                                        if (action.label === 'Manual Entry') {
                                            // Just navigate, logic handled on page
                                        }
                                        router.push(action.route);
                                    }}
                                    className={`w-full flex items-center justify-between p-4 bg-white border border-gray-100 rounded-xl transition-all group ${action.hover}`}
                                >
                                    <div className="flex items-center gap-3">
                                        <div className={`w-10 h-10 rounded-lg ${action.color} flex items-center justify-center transition-colors`}>
                                            <action.icon size={20} />
                                        </div>
                                        <div className="text-left">
                                            <p className="font-bold text-sm text-text-main leading-none mb-1">{action.label}</p>
                                            <p className="text-[10px] text-text-secondary font-medium tracking-tight">{action.desc}</p>
                                        </div>
                                    </div>
                                    <ArrowRight size={18} className="text-gray-300 group-hover:text-primary transition-colors group-hover:translate-x-1" />
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Recent Visitors */}
                <div className="mt-6 bg-white rounded-xl p-6 border border-gray-200">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h2 className="text-xl font-display font-bold text-text-main mb-1">Recent Visitors</h2>
                            <p className="text-sm text-text-secondary">Latest customer check-ins</p>
                        </div>
                        <button
                            onClick={() => router.push('/dashboard/visitors/all')}
                            className="px-4 py-2 text-sm font-bold text-primary hover:bg-primary/5 rounded-lg transition-colors"
                        >
                            View All
                        </button>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-gray-200">
                                    <th className="text-left py-3 px-4 text-xs font-black uppercase tracking-wider text-text-secondary">Name</th>
                                    <th className="text-left py-3 px-4 text-xs font-black uppercase tracking-wider text-text-secondary">Phone</th>
                                    <th className="text-left py-3 px-4 text-xs font-black uppercase tracking-wider text-text-secondary">Time</th>
                                    <th className="text-left py-3 px-4 text-xs font-black uppercase tracking-wider text-text-secondary">Status</th>
                                    <th className="text-left py-3 px-4 text-xs font-black uppercase tracking-wider text-text-secondary">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data?.recentVisitors.slice(0, 5).map((visitor: Visitor, index: number) => (
                                    <tr
                                        key={visitor.id || index}
                                        className="border-b border-gray-100 hover:bg-gray-50 transition-colors cursor-pointer"
                                        onClick={() => setSelectedVisitorForDetails(visitor)}
                                    >
                                        <td className="py-4 px-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                                                    <Users className="text-primary" size={16} />
                                                </div>
                                                <span className="font-bold text-sm text-text-main">{visitor.name}</span>
                                            </div>
                                        </td>
                                        <td className="py-4 px-4 text-sm text-text-secondary font-medium">{visitor.phone}</td>
                                        <td className="py-4 px-4 text-sm text-text-secondary font-medium">{visitor.time}</td>
                                        <td className="py-4 px-4">
                                            <span className={`inline-flex px-3 py-1 rounded-full text-xs font-bold ${visitor.status === 'new'
                                                ? 'bg-green-50 text-green-600'
                                                : 'bg-blue-50 text-blue-600'
                                                }`}>
                                                {visitor.status === 'new' ? 'New' : 'Returning'}
                                            </span>
                                        </td>
                                        <td className="py-4 px-4">
                                            <div className="flex items-center gap-2">
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        setSelectedVisitorForMsg({
                                                            visitor,
                                                            type: visitor.status === 'new' ? 'welcome' : 'reward'
                                                        });
                                                    }}
                                                    className="flex items-center gap-1.5 px-3 py-1.5 bg-primary/10 text-primary text-[10px] font-black uppercase tracking-wider rounded-lg hover:bg-primary/20 transition-colors"
                                                >
                                                    <Send size={12} />
                                                    {visitor.status === 'new' ? 'Welcome' : 'Message'}
                                                </button>
                                                {visitor.status === 'returning' && (
                                                    <button
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            setRewardPreviewVisitor(visitor);
                                                        }}
                                                        className="flex items-center gap-1.5 px-3 py-1.5 bg-orange-500 text-white text-[10px] font-black uppercase tracking-wider rounded-lg hover:bg-orange-600 transition-colors shadow-lg shadow-orange-500/20"
                                                    >
                                                        <Gift size={12} />
                                                        Reward
                                                    </button>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                {data?.recentVisitors.length === 0 && (
                                    <tr>
                                        <td colSpan={5} className="py-8 text-center text-text-secondary font-medium">
                                            No recent visitors found. Click "Simulate Check-in" to add test data.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                <Modal
                    isOpen={showClearModal}
                    onClose={() => setShowClearModal(false)}
                    title="Clear Dashboard Data"
                    description="Are you sure you want to clear all dashboard data? This will reset all stats and visitor history."
                >
                    <div className="flex gap-3 py-4">
                        <button onClick={() => setShowClearModal(false)} className="flex-1 h-12 border border-gray-100 text-text-main font-bold rounded-xl hover:bg-gray-50 transition-all text-sm">
                            Cancel
                        </button>
                        <button onClick={confirmClear} className="flex-1 h-12 bg-red-500 text-white font-bold rounded-xl hover:bg-red-600 transition-all shadow-lg shadow-red-500/20 text-sm">
                            Clear Everything
                        </button>
                    </div>
                </Modal>

                <SendMessageModal
                    isOpen={!!selectedVisitorForMsg}
                    onClose={() => setSelectedVisitorForMsg(null)}
                    recipientName={selectedVisitorForMsg?.visitor.name || ''}
                    recipientPhone={selectedVisitorForMsg?.visitor.phone}
                    type={selectedVisitorForMsg?.type || 'welcome'}
                />

                <VisitorDetailsModal
                    isOpen={!!selectedVisitorForDetails}
                    onClose={() => setSelectedVisitorForDetails(null)}
                    visitor={selectedVisitorForDetails}
                />

                <PreviewRewardModal
                    isOpen={!!rewardPreviewVisitor}
                    onClose={() => setRewardPreviewVisitor(null)}
                    rewardTitle="Free Coffee or Pastry"
                    businessName={data?.businessName || 'Your Business'}
                />
            </div>
        </DashboardSidebar>
    );
}
