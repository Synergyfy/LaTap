'use client';

import React from 'react';
import CustomerSidebar from '@/components/customer/CustomerSidebar';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { dashboardApi } from '@/lib/api/dashboard';
import { Notification } from '@/lib/store/mockDashboardStore';
import { Bell, CheckCircle2, Info, AlertTriangle, Clock, Trash2, ArrowLeft } from 'lucide-react';
import toast from 'react-hot-toast';
import Link from 'next/link';

export default function CustomerNotificationsPage() {
    const queryClient = useQueryClient();
    const { data, isLoading } = useQuery({
        queryKey: ['dashboard'],
        queryFn: dashboardApi.fetchDashboardData,
    });

    const notifications = data?.notifications || [];

    const readMutation = useMutation({
        mutationFn: dashboardApi.markNotificationRead,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['dashboard'] });
        }
    });

    const readAllMutation = useMutation({
        mutationFn: dashboardApi.markAllNotificationsRead,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['dashboard'] });
            toast.success('All notifications marked as read');
        }
    });

    const getIcon = (type: string) => {
        switch (type) {
            case 'success': return <CheckCircle2 className="text-green-500" size={20} />;
            case 'warning': return <AlertTriangle className="text-orange-500" size={20} />;
            case 'info': return <Info className="text-blue-500" size={20} />;
            default: return <Bell className="text-gray-500" size={20} />;
        }
    };

    return (
        <CustomerSidebar>
            <div className="max-w-4xl mx-auto">
                <div className="flex items-center gap-4 mb-8">
                    <Link
                        href="/customer/dashboard"
                        className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center text-text-secondary hover:text-primary hover:border-primary/30 transition-all shadow-sm"
                    >
                        <ArrowLeft size={20} />
                    </Link>
                    <div>
                        <h1 className="text-2xl font-display font-bold text-text-main">Your Notifications</h1>
                        <p className="text-sm text-text-secondary font-medium">Keep track of your rewards, visits, and special offers.</p>
                    </div>
                </div>

                <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
                    <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
                        <span className="text-xs font-bold text-text-secondary uppercase tracking-wider">All Alerts</span>
                        <button
                            onClick={() => readAllMutation.mutate()}
                            disabled={notifications.length === 0}
                            className="text-xs font-bold text-primary hover:underline disabled:opacity-50"
                        >
                            Mark all as read
                        </button>
                    </div>

                    {isLoading ? (
                        <div className="p-20 flex flex-col items-center justify-center gap-4">
                            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary"></div>
                            <p className="text-sm text-text-secondary font-medium">Loading your alerts...</p>
                        </div>
                    ) : notifications.length === 0 ? (
                        <div className="p-20 flex flex-col items-center justify-center text-center">
                            <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                                <Bell className="text-gray-300" size={32} />
                            </div>
                            <h3 className="text-lg font-bold text-text-main mb-1">Stay tuned!</h3>
                            <p className="text-sm text-text-secondary max-w-xs mx-auto">
                                You don't have any notifications at the moment. We'll let you know when you earn new rewards!
                            </p>
                        </div>
                    ) : (
                        <div className="divide-y divide-gray-100">
                            {notifications.map((note: Notification) => (
                                <div
                                    key={note.id}
                                    onClick={() => !note.read && readMutation.mutate(note.id)}
                                    className={`p-6 flex items-start gap-4 hover:bg-gray-50 transition-colors cursor-pointer ${!note.read ? 'bg-primary/5' : ''}`}
                                >
                                    <div className="mt-1">{getIcon(note.type)}</div>
                                    <div className="flex-1">
                                        <div className="flex items-center justify-between gap-4 mb-1">
                                            <h4 className={`text-sm ${!note.read ? 'font-bold text-text-main' : 'text-text-secondary'}`}>
                                                {note.title}
                                            </h4>
                                            <span className="text-[10px] text-text-secondary font-medium whitespace-nowrap">
                                                {new Date(note.timestamp).toLocaleDateString()}
                                            </span>
                                        </div>
                                        <p className="text-sm text-text-secondary leading-relaxed">
                                            {note.message}
                                        </p>
                                    </div>
                                    {!note.read && (
                                        <div className="mt-2 w-2 h-2 rounded-full bg-primary ring-4 ring-primary/10"></div>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </CustomerSidebar>
    );
}
