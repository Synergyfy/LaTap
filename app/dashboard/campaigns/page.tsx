'use client';

import React from 'react';
import DashboardSidebar from '@/components/dashboard/DashboardSidebar';
import PageHeader from '@/components/dashboard/PageHeader';
import StatsCard from '@/components/dashboard/StatsCard';
import DataTable, { Column } from '@/components/dashboard/DataTable';
import EmptyState from '@/components/dashboard/EmptyState';

interface Campaign {
    id: string;
    name: string;
    type: string;
    audience: string;
    status: string;
    sent: number;
    delivered: string;
    clicks: number;
}

export default function AllCampaignsPage() {
    const campaigns = [
        { id: '1', name: 'Weekend Coffee Special', type: 'WhatsApp', audience: 'All Customers', status: 'Active', sent: 1240, delivered: '98%', clicks: 156 },
        { id: '2', name: 'Welcome Message', type: 'SMS', audience: 'New Customers', status: 'Recurring', sent: 412, delivered: '95%', clicks: 84 },
        { id: '3', name: 'VIP Night Invitation', type: 'WhatsApp', audience: 'VIP Members', status: 'Scheduled', sent: 0, delivered: '0%', clicks: 0 },
        { id: '4', name: 'October Newsletter', type: 'Email', audience: 'Newsletter Subs', status: 'Completed', sent: 2840, delivered: '92%', clicks: 312 },
    ];

    const stats = [
        { label: 'Total Sent', value: '4,492', icon: 'send', color: 'blue', trend: { value: '+15%', isUp: true } },
        { label: 'Avg. Open Rate', value: '94%', icon: 'visibility', color: 'green', trend: { value: '+2%', isUp: true } },
        { label: 'Avg. CTR', value: '12%', icon: 'touch_app', color: 'purple', trend: { value: '+1.5%', isUp: true } },
        { label: 'Active Campaigns', value: '3', icon: 'campaign', color: 'yellow', trend: { value: '0', isUp: true } },
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
            accessor: () => (
                <div className="flex items-center gap-2">
                    <button className="p-1.5 text-text-secondary hover:text-primary hover:bg-primary/5 rounded-lg transition-colors">
                        <span className="material-icons-round text-lg">insights</span>
                    </button>
                    <button className="p-1.5 text-text-secondary hover:text-text-main hover:bg-gray-100 rounded-lg transition-colors">
                        <span className="material-icons-round text-lg">edit</span>
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
                            <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 text-text-main font-bold rounded-xl hover:bg-gray-50 transition-all text-sm">
                                <span className="material-icons-round text-lg">description</span>
                                Templates
                            </button>
                            <button className="flex items-center gap-2 px-4 py-2.5 bg-primary text-white font-bold rounded-xl hover:bg-primary-hover transition-all text-sm shadow-md shadow-primary/20">
                                <span className="material-icons-round text-lg">add</span>
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
                                onClick: () => console.log('Create campaign clicked'),
                                icon: "add"
                            }}
                        />
                    }
                />
            </div>
        </DashboardSidebar>
    );
}
