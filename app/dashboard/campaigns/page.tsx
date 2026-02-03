'use client';

import React, { useState } from 'react';
import DashboardSidebar from '@/components/dashboard/DashboardSidebar';
import PageHeader from '@/components/dashboard/PageHeader';
import StatsCard from '@/components/dashboard/StatsCard';
import DataTable, { Column } from '@/components/dashboard/DataTable';
import EmptyState from '@/components/dashboard/EmptyState';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { dashboardApi } from '@/lib/api/dashboard';
import { Campaign } from '@/lib/store/mockDashboardStore';
import toast from 'react-hot-toast';
import { BarChart, Send, Eye, Edit, Trash2, Plus, FileText } from 'lucide-react';

export default function AllCampaignsPage() {
    const queryClient = useQueryClient();
    const { data, isLoading } = useQuery({
        queryKey: ['dashboard'],
        queryFn: dashboardApi.fetchDashboardData,
    });

    const campaigns = data?.campaigns || [];
    const stats_data = data?.stats;

    const deleteMutation = useMutation({
        mutationFn: dashboardApi.deleteCampaign,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['dashboard'] });
            toast.success('Campaign deleted successfully');
        }
    });

    const createMutation = useMutation({
        mutationFn: dashboardApi.createCampaign,
        onSuccess: (newCampaign) => {
            queryClient.invalidateQueries({ queryKey: ['dashboard'] });
            toast.success(`Campaign "${newCampaign.name}" created!`);
        }
    });

    const handleCreateCampaign = () => {
        const name = prompt('Enter campaign name:');
        if (!name) return;

        const type = prompt('Enter channel (WhatsApp, SMS, Email):', 'WhatsApp') as any;
        if (!['WhatsApp', 'SMS', 'Email'].includes(type)) {
            toast.error('Invalid channel');
            return;
        }

        createMutation.mutate({
            name,
            type,
            audience: 'All Customers',
            status: 'Active'
        });
    };

    const handleDelete = (id: string, name: string) => {
        if (confirm(`Are you sure you want to delete "${name}"?`)) {
            deleteMutation.mutate(id);
        }
    };

    const stats = [
        { label: 'Total Sent', value: campaigns.reduce((acc: number, c: Campaign) => acc + c.sent, 0).toLocaleString(), icon: 'send', color: 'blue', trend: { value: '+15%', isUp: true } },
        { label: 'Avg. Delivery', value: '94%', icon: 'visibility', color: 'green', trend: { value: '+2%', isUp: true } },
        { label: 'Total Clicks', value: campaigns.reduce((acc: number, c: Campaign) => acc + c.clicks, 0).toLocaleString(), icon: 'touch_app', color: 'purple', trend: { value: '+1.5%', isUp: true } },
        { label: 'Active Campaigns', value: campaigns.filter((c: Campaign) => c.status === 'Active').length.toString(), icon: 'campaign', color: 'yellow', trend: { value: '0', isUp: true } },
    ];

    const columns: Column<Campaign>[] = [
        {
            header: 'Campaign Name',
            accessor: (item: Campaign) => (
                <div>
                    <p className="font-bold text-text-main">{item.name}</p>
                    <p className="text-xs text-text-secondary">{item.audience}</p>
                </div>
            )
        },
        {
            header: 'Channel',
            accessor: (item: Campaign) => (
                <div className="flex items-center gap-2">
                    <span className="material-icons-round text-lg text-text-secondary">
                        {item.type === 'WhatsApp' ? 'chat' : item.type === 'SMS' ? 'textsms' : 'email'}
                    </span>
                    <span className="text-sm font-medium">{item.type}</span>
                </div>
            )
        },
        { header: 'Sent', accessor: 'sent' },
        { header: 'Delivery', accessor: 'delivered' },
        {
            header: 'Status',
            accessor: (item: Campaign) => (
                <span className={`inline-flex px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${item.status === 'Active' ? 'bg-green-100 text-green-700' :
                    item.status === 'Scheduled' ? 'bg-blue-100 text-blue-700' :
                        item.status === 'Recurring' ? 'bg-purple-100 text-purple-700' :
                            'bg-gray-100 text-gray-700'
                    }`}>
                    {item.status}
                </span>
            )
        },
        {
            header: 'Actions',
            accessor: (item: Campaign) => (
                <div className="flex items-center gap-2">
                    <button
                        className="p-1.5 text-text-secondary hover:text-primary hover:bg-primary/5 rounded-lg transition-colors"
                        onClick={() => toast(`Analytics for ${item.name} coming soon`)}
                    >
                        <BarChart size={18} />
                    </button>
                    <button
                        className="p-1.5 text-text-secondary hover:text-text-main hover:bg-gray-100 rounded-lg transition-colors"
                        onClick={() => toast(`Edit functionality for ${item.name} coming soon`)}
                    >
                        <Edit size={18} />
                    </button>
                    <button
                        className="p-1.5 text-text-secondary hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                        onClick={() => handleDelete(item.id, item.name)}
                    >
                        <Trash2 size={18} />
                    </button>
                </div>
            )
        }
    ];

    return (
        <DashboardSidebar>
            <div className="p-8">
                <PageHeader
                    title="Campaigns"
                    description="Reach your customers with targeted messaging"
                    actions={
                        <div className="flex gap-3">
                            <button
                                onClick={() => toast('Templates coming soon')}
                                className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 text-text-main font-bold rounded-xl hover:bg-gray-50 transition-all text-sm"
                            >
                                <FileText size={18} />
                                Templates
                            </button>
                            <button
                                onClick={handleCreateCampaign}
                                className="flex items-center gap-2 px-4 py-2.5 bg-primary text-white font-bold rounded-xl hover:bg-primary-hover transition-all text-sm shadow-md shadow-primary/20"
                            >
                                <Plus size={18} />
                                Create Campaign
                            </button>
                        </div>
                    }
                />

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {stats.map((stat, index) => (
                        <StatsCard key={index} {...stat as any} />
                    ))}
                </div>

                {isLoading ? (
                    <div className="flex items-center justify-center p-20">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                    </div>
                ) : (
                    <DataTable
                        columns={columns}
                        data={campaigns}
                        emptyState={
                            <EmptyState
                                icon="campaign"
                                title="No campaigns yet"
                                description="Start your first marketing campaign to drive repeat visits and increase revenue."
                                action={{
                                    label: "Create Campaign",
                                    onClick: handleCreateCampaign,
                                    icon: "add"
                                }}
                            />
                        }
                    />
                )}
            </div>
        </DashboardSidebar>
    );
}
