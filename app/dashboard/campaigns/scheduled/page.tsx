'use client';

import React, { useState } from 'react';
import PageHeader from '@/components/dashboard/PageHeader';
import DataTable, { Column } from '@/components/dashboard/DataTable';
import EmptyState from '@/components/dashboard/EmptyState';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { Edit, XCircle } from 'lucide-react';

interface ScheduledMessage {
    id: string;
    name: string;
    type: string;
    audience: string;
    scheduledFor: string;
    status: string;
}

export default function ScheduledMessagesPage() {
    const router = useRouter();
    const [messages, setMessages] = useState<ScheduledMessage[]>([
        { id: '1', name: 'Weekend Coffee Special', type: 'WhatsApp', audience: 'All Customers', scheduledFor: 'Oct 12, 2024 - 10:00 AM', status: 'Scheduled' },
        { id: '2', name: 'Monday Morning Motivation', type: 'SMS', audience: 'Returning Customers', scheduledFor: 'Oct 14, 2024 - 08:30 AM', status: 'Scheduled' },
        { id: '3', name: 'Monthly Royalty Points Update', type: 'WhatsApp', audience: 'All Customers', scheduledFor: 'Nov 01, 2024 - 09:00 AM', status: 'Recurring' },
    ]);

    const handleCalendarView = () => {
        toast.success('Calendar view coming soon!');
        // TODO: Navigate to calendar view page
        // router.push('/dashboard/campaigns/calendar');
    };

    const handleEdit = (messageId: string) => {
        toast.success('Editing message...');
        // TODO: Open edit modal or navigate to edit page
        console.log('Edit message:', messageId);
    };

    const handleStop = (messageId: string) => {
        const message = messages.find(m => m.id === messageId);
        if (message) {
            setMessages(messages.filter(m => m.id !== messageId));
            toast.success(`Stopped "${message.name}"`);
        }
    };

    const columns: Column<ScheduledMessage>[] = [
        {
            header: 'Message Name',
            accessor: (item: ScheduledMessage) => (
                <div>
                    <p className="font-bold text-text-main">{item.name}</p>
                    <p className="text-xs text-text-secondary">{item.audience}</p>
                </div>
            )
        },
        {
            header: 'Channel',
            accessor: (item: ScheduledMessage) => (
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
            accessor: (item: ScheduledMessage) => (
                <span className={`inline-flex px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${item.status === 'Scheduled' ? 'bg-blue-100 text-blue-700' : 'bg-purple-100 text-purple-700'
                    }`}>
                    {item.status}
                </span>
            )
        },
        {
            header: 'Actions',
            accessor: (item: ScheduledMessage) => (
                <div className="flex items-center gap-2">
                    <button
                        onClick={() => handleStop(item.id)}
                        className="p-1.5 text-text-secondary hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Stop Message"
                    >
                        <XCircle size={18} />
                    </button>
                    <button
                        onClick={() => handleEdit(item.id)}
                        className="p-1.5 text-text-secondary hover:text-primary hover:bg-primary/5 rounded-lg transition-colors"
                        title="Edit Message"
                    >
                        <Edit size={18} />
                    </button>
                </div>
            )
        }
    ];

    return (
        <div className="p-8">
            <PageHeader
                title="Scheduled Messages"
                description="View and manage your upcoming marketing messages"
                actions={
                    <button
                        onClick={handleCalendarView}
                        className="flex items-center gap-2 px-4 py-2.5 bg-primary text-white font-bold rounded-lg hover:bg-primary-hover transition-all text-sm shadow-md shadow-primary/20"
                    >
                        <span className="material-icons-round text-lg">calendar_month</span>
                        Calendar View
                    </button>
                }
            />

            <DataTable
                columns={columns}
                data={messages}
                emptyState={
                    <EmptyState
                        icon="event_busy"
                        title="No scheduled messages"
                        description="You don't have any upcoming messages. Keep your audience engaged by scheduling regular updates."
                        action={{
                            label: "Create Message",
                            onClick: () => router.push('/dashboard/campaigns/new'),
                            icon: "add"
                        }}
                    />
                }
            />
        </div>
    );
}
