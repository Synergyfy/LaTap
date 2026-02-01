'use client';

import React from 'react';
import DashboardSidebar from '@/components/dashboard/DashboardSidebar';
import PageHeader from '@/components/dashboard/PageHeader';
import DataTable, { Column } from '@/components/dashboard/DataTable';
import EmptyState from '@/components/dashboard/EmptyState';

interface ScheduledCampaign {
    id: string;
    name: string;
    type: string;
    audience: string;
    scheduledFor: string;
    status: string;
}

export default function ScheduledCampaignsPage() {
    const campaigns = [
        { id: '1', name: 'Weekend Coffee Special', type: 'WhatsApp', audience: 'All Customers', scheduledFor: 'Oct 12, 2024 - 10:00 AM', status: 'Scheduled' },
        { id: '2', name: 'Monday Morning Motivation', type: 'SMS', audience: 'Returning Customers', scheduledFor: 'Oct 14, 2024 - 08:30 AM', status: 'Scheduled' },
        { id: '3', name: 'Monthly Royalty Points Update', type: 'WhatsApp', audience: 'All Customers', scheduledFor: 'Nov 01, 2024 - 09:00 AM', status: 'Recurring' },
    ];

    const columns: Column<ScheduledCampaign>[] = [
        {
            header: 'Campaign Name',
            accessor: (item: ScheduledCampaign) => (
                <div>
                    <p className="font-bold text-text-main">{item.name}</p>
                    <p className="text-xs text-text-secondary">{item.audience}</p>
                </div>
            )
        },
        {
            header: 'Channel',
            accessor: (item: ScheduledCampaign) => (
                <div className="flex items-center gap-2">
                    <span className="material-icons-round text-lg text-text-secondary">
                        {item.type === 'WhatsApp' ? 'chat' : 'textsms'}
                    </span>
                    <span className="text-sm font-medium">{item.type}</span>
                </div>
            )
        },
        { header: 'Scheduled For', accessor: 'scheduledFor' },
        {
            header: 'Status',
            accessor: (item: ScheduledCampaign) => (
                <span className={`inline-flex px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${item.status === 'Scheduled' ? 'bg-blue-100 text-blue-700' : 'bg-purple-100 text-purple-700'
                    }`}>
                    {item.status}
                </span>
            )
        },
        {
            header: 'Actions',
            accessor: () => (
                <div className="flex items-center gap-2">
                    <button className="p-1.5 text-text-secondary hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                        <span className="material-icons-round text-lg">cancel</span>
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
                    title="Scheduled Campaigns"
                    description="View and manage your upcoming marketing messages"
                    actions={
                        <button className="flex items-center gap-2 px-4 py-2.5 bg-primary text-white font-bold rounded-xl hover:bg-primary-hover transition-all text-sm shadow-md shadow-primary/20">
                            <span className="material-icons-round text-lg">calendar_month</span>
                            Calendar View
                        </button>
                    }
                />

                <DataTable
                    columns={columns}
                    data={campaigns}
                    emptyState={
                        <EmptyState
                            icon="event_busy"
                            title="No scheduled campaigns"
                            description="You don't have any upcoming messages. Keep your audience engaged by scheduling regular updates."
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
