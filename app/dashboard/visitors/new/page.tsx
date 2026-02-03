'use client';

import React, { useState } from 'react';
import DashboardSidebar from '@/components/dashboard/DashboardSidebar';
import PageHeader from '@/components/dashboard/PageHeader';
import StatsCard from '@/components/dashboard/StatsCard';
import DataTable, { Column } from '@/components/dashboard/DataTable';
import EmptyState from '@/components/dashboard/EmptyState';
import { UserPlus, Calendar, TrendingUp, Timer, Send, Hand } from 'lucide-react';
import toast from 'react-hot-toast';

interface NewVisitor {
    id: string;
    name: string;
    email: string;
    phone: string;
    joined: string;
    source: string;
    status: string;
}

export default function NewVisitorsPage() {
    const [newVisitors, setNewVisitors] = useState<NewVisitor[]>([
        { id: '1', name: 'James Wilson', email: 'j.wilson@example.com', phone: '+234 810 123 4567', joined: '1 hour ago', source: 'Front Desk NFC', status: 'New' },
        { id: '2', name: 'Amaka Eze', email: 'amaka.e@example.com', phone: '+234 811 234 5678', joined: '3 hours ago', source: 'Table 4 NFC', status: 'New' },
        { id: '3', name: 'Robert Smith', email: 'r.smith@example.com', phone: '+234 812 345 6789', joined: 'Yesterday', source: 'Entrance NFC', status: 'New' },
        { id: '4', name: 'Chioma Okeke', email: 'chioma.o@example.com', phone: '+234 813 456 7890', joined: '2 days ago', source: 'Bar NFC', status: 'New' },
    ]);

    const stats = [
        { label: 'New Today', value: '18', icon: UserPlus, color: 'green' as const, trend: { value: '+20%', isUp: true } },
        { label: 'New This Week', value: '124', icon: Calendar, color: 'blue' as const, trend: { value: '+15%', isUp: true } },
        { label: 'Conversion Rate', value: '68%', icon: TrendingUp, color: 'purple' as const, trend: { value: '+2%', isUp: true } },
        { label: 'Wait Time', value: '2m', icon: Timer, color: 'yellow' as const, trend: { value: '-30s', isUp: true } },
    ];

    const handleWelcomeVisitor = (visitor: NewVisitor) => {
        toast.success(`Welcome message sent to ${visitor.name}!`);
        console.log('Sending welcome to:', visitor);
    };

    const handleSendWelcomeCampaign = () => {
        if (newVisitors.length === 0) {
            toast.error('No new visitors to send welcome campaign to');
            return;
        }
        toast.success(`Welcome campaign sent to ${newVisitors.length} new visitors!`);
        console.log('Sending welcome campaign to:', newVisitors);
    };

    const columns: Column<NewVisitor>[] = [
        {
            header: 'Visitor',
            accessor: (item: NewVisitor) => (
                <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-green-50 flex items-center justify-center text-green-600 font-bold text-xs border border-green-100">
                        {item.name.split(' ').map((n: string) => n[0]).join('')}
                    </div>
                    <div>
                        <p className="font-bold text-text-main">{item.name}</p>
                        <p className="text-xs text-text-secondary">{item.email}</p>
                    </div>
                </div>
            )
        },
        { header: 'Phone Number', accessor: 'phone' },
        { header: 'Joined', accessor: 'joined' },
        { header: 'Source Device', accessor: 'source' },
        {
            header: 'Status',
            accessor: () => (
                <span className="inline-flex px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-green-100 text-green-700">
                    NEW
                </span>
            )
        },
        {
            header: 'Actions',
            accessor: (item: NewVisitor) => (
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        handleWelcomeVisitor(item);
                    }}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-primary text-white text-[10px] font-black uppercase tracking-wider rounded-lg hover:bg-primary-hover transition-colors"
                >
                    <Hand size={14} />
                    Welcome
                </button>
            )
        }
    ];

    return (
        <DashboardSidebar>
            <div className="p-8">
                <PageHeader
                    title="New Visitors"
                    description="Identify and welcome your first-time customers"
                    actions={
                        <button
                            onClick={handleSendWelcomeCampaign}
                            className="flex items-center gap-2 px-4 py-2.5 bg-primary text-white font-bold rounded-xl hover:bg-primary-hover transition-all text-sm shadow-md shadow-primary/20"
                        >
                            <Send size={18} />
                            Send Welcome Campaign
                        </button>
                    }
                />

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {stats.map((stat, index) => (
                        <StatsCard key={index} {...stat} />
                    ))}
                </div>

                <DataTable
                    columns={columns}
                    data={newVisitors}
                    onRowClick={(visitor) => console.log('Clicked visitor:', visitor)}
                    emptyState={
                        <EmptyState
                            icon="person_add"
                            title="No new visitors today"
                            description="All visitors today are returning customers. That's great for loyalty!"
                        />
                    }
                />
            </div>
        </DashboardSidebar>
    );
}
