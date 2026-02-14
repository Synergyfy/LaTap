'use client';

import React from 'react';
import PageHeader from '@/components/dashboard/PageHeader';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { dashboardApi } from '@/lib/api/dashboard';
import { Notification } from '@/lib/store/mockDashboardStore';
import { Bell, CheckCircle2, Info, AlertTriangle, Clock, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';

export default function NotificationsPage() {
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

    const clearAllMutation = useMutation({
        mutationFn: dashboardApi.clearNotifications,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['dashboard'] });
            toast.success('Notification history cleared');
        }
    });

    const approveMutation = useMutation({
        mutationFn: dashboardApi.approveRedemption,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['dashboard'] });
            toast.success('Redemption approved!');
        }
    });

    const declineMutation = useMutation({
        mutationFn: dashboardApi.declineRedemption,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['dashboard'] });
            toast.success('Redemption declined');
        }
    });

    const redemptionRequests = data?.redemptionRequests || [];
    const pendingRedemptions = redemptionRequests.filter((r: any) => r.status === 'pending');

    const getIcon = (type: string) => {
        switch (type) {
            case 'success': return <CheckCircle2 className="text-green-500" size={20} />;
            case 'warning': return <AlertTriangle className="text-orange-500" size={20} />;
            case 'info': return <Info className="text-blue-500" size={20} />;
            default: return <Bell className="text-gray-500" size={20} />;
        }
    };

    return (
        <div className="p-8">
            <PageHeader
                title="Notifications"
                description="Stay updated with your business activity and platform alerts"
                actions={
                    <div className="flex gap-3">
                        <button
                            onClick={() => readAllMutation.mutate()}
                            disabled={notifications.length === 0}
                            className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 text-text-main font-bold rounded-xl hover:bg-gray-50 transition-all text-xs disabled:opacity-50"
                        >
                            <CheckCircle2 size={16} />
                            Mark All Read
                        </button>
                        <button
                            onClick={() => {
                                if (confirm('Are you sure you want to clear your notification history?')) {
                                    clearAllMutation.mutate();
                                }
                            }}
                            disabled={notifications.length === 0}
                            className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 font-bold rounded-xl hover:bg-red-100 transition-all text-xs disabled:opacity-50"
                        >
                            <Trash2 size={16} />
                            Clear History
                        </button>
                    </div>
                }
            />

            {pendingRedemptions.length > 0 && (
                <div className="mb-8">
                    <div className="flex items-center gap-2 mb-4">
                        <span className="material-symbols-outlined text-primary">redeem</span>
                        <h2 className="text-lg font-bold text-text-main tracking-tight">Pending Redemptions</h2>
                        <span className="px-2 py-0.5 bg-primary/10 text-primary text-[10px] font-black rounded-full uppercase">Action Required</span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {pendingRedemptions.map((req: any) => (
                            <div key={req.id} className="bg-white p-6 rounded-2xl border border-primary/20 shadow-sm flex flex-col justify-between">
                                <div>
                                    <div className="flex justify-between items-start mb-4">
                                        <div className="size-10 bg-primary/5 rounded-xl flex items-center justify-center text-primary">
                                            <span className="material-symbols-outlined">person</span>
                                        </div>
                                        <span className="text-[10px] font-medium text-text-secondary">{new Date(req.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                                    </div>
                                    <h3 className="font-bold text-text-main mb-1">{req.visitorName}</h3>
                                    <p className="text-xs text-text-secondary font-medium mb-4">Wants to redeem: <span className="text-primary font-bold">{req.rewardTitle}</span></p>
                                </div>
                                <div className="flex gap-2 pt-4 border-t border-gray-50">
                                    <button
                                        onClick={() => approveMutation.mutate(req.id)}
                                        className="flex-1 h-10 bg-primary text-white text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-primary-hover transition-all"
                                    >
                                        Approve
                                    </button>
                                    <button
                                        onClick={() => declineMutation.mutate(req.id)}
                                        className="px-4 h-10 bg-gray-50 text-gray-500 text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-gray-100 transition-all border border-gray-100"
                                    >
                                        Decline
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
                {isLoading ? (
                    <div className="p-20 flex flex-col items-center justify-center gap-4">
                        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary"></div>
                        <p className="text-sm text-text-secondary font-medium">Loading notifications...</p>
                    </div>
                ) : notifications.length === 0 ? (
                    <div className="p-20 flex flex-col items-center justify-center text-center">
                        <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                            <Bell className="text-gray-300" size={32} />
                        </div>
                        <h3 className="text-lg font-bold text-text-main mb-1">No notifications yet</h3>
                        <p className="text-sm text-text-secondary max-w-xs">
                            When you have new activity or alerts, they will appear here.
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
                                        <div className="flex items-center gap-1.5 text-[10px] text-text-secondary font-medium">
                                            <Clock size={12} />
                                            {new Date(note.timestamp).toLocaleDateString()} at {new Date(note.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                        </div>
                                    </div>
                                    <p className="text-sm text-text-secondary max-w-2xl leading-relaxed">
                                        {note.message}
                                    </p>
                                    {!note.read && (
                                        <button
                                            className="mt-3 text-xs font-bold text-primary hover:underline flex items-center gap-1"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                readMutation.mutate(note.id);
                                            }}
                                        >
                                            Mark as read
                                        </button>
                                    )}
                                </div>
                                {!note.read && (
                                    <div className="mt-1.5 w-2 h-2 rounded-full bg-primary shadow-sm shadow-primary/40"></div>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
