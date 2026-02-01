'use client';

import React, { useState } from 'react';
import DashboardSidebar from '@/components/dashboard/DashboardSidebar';
import PageHeader from '@/components/dashboard/PageHeader';
import StatsCard from '@/components/dashboard/StatsCard';
import DataTable, { Column } from '@/components/dashboard/DataTable';
import EmptyState from '@/components/dashboard/EmptyState';

interface Visitor {
    id: string;
    name: string;
    email: string;
    phone: string;
    visits: number;
    lastVisit: string;
    status: string;
}

export default function AllVisitorsPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [filterStatus, setFilterStatus] = useState('all');

    const visitors = [
        { id: '1', name: 'Alex Johnson', email: 'alex.j@example.com', phone: '+234 801 234 5678', visits: 12, lastVisit: '2 hours ago', status: 'Active' },
        { id: '2', name: 'Sarah Williams', email: 'sarah.w@example.com', phone: '+234 802 345 6789', visits: 5, lastVisit: '5 hours ago', status: 'Active' },
        { id: '3', name: 'Michael Chen', email: 'm.chen@example.com', phone: '+234 803 456 7890', visits: 1, lastVisit: '1 day ago', status: 'New' },
        { id: '4', name: 'Bisi Adebowale', email: 'bisi.a@example.com', phone: '+234 804 567 8901', visits: 24, lastVisit: '3 hours ago', status: 'VIP' },
        { id: '5', name: 'David Okafor', email: 'd.okafor@example.com', phone: '+234 805 678 9012', visits: 8, lastVisit: '2 days ago', status: 'Returning' },
        { id: '6', name: 'Faith Amadi', email: 'f.amadi@example.com', phone: '+234 806 789 0123', visits: 3, lastVisit: '4 days ago', status: 'Inactive' },
    ];

    const stats = [
        { label: 'Total Visitors', value: '2,847', icon: 'people', color: 'blue', trend: { value: '+12%', isUp: true } },
        { label: 'New This Month', value: '412', icon: 'person_add', color: 'green', trend: { value: '+5%', isUp: true } },
        { label: 'Avg. Frequency', value: '3.2', icon: 'repeat', color: 'purple', trend: { value: '-2%', isUp: false } },
        { label: 'VIP Guests', value: '84', icon: 'stars', color: 'yellow', trend: { value: '+8%', isUp: true } },
    ];

    const columns: Column<Visitor>[] = [
        {
            header: 'Visitor',
            accessor: (item: Visitor) => (
                <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xs">
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
        {
            header: 'Total Visits',
            accessor: (item: Visitor) => (
                <span className="font-bold text-text-main">{item.visits}</span>
            )
        },
        { header: 'Last Visit', accessor: 'lastVisit' },
        {
            header: 'Status',
            accessor: (item: Visitor) => (
                <span className={`inline-flex px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${item.status === 'VIP' ? 'bg-yellow-100 text-yellow-700' :
                    item.status === 'New' ? 'bg-green-100 text-green-700' :
                        item.status === 'Active' ? 'bg-blue-100 text-blue-700' :
                            item.status === 'Returning' ? 'bg-purple-100 text-purple-700' :
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
                        <span className="material-icons-round text-lg">edit</span>
                    </button>
                    <button className="p-1.5 text-text-secondary hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                        <span className="material-icons-round text-lg">delete</span>
                    </button>
                    <button className="p-1.5 text-text-secondary hover:text-text-main hover:bg-gray-100 rounded-lg transition-colors">
                        <span className="material-icons-round text-lg">more_vert</span>
                    </button>
                </div>
            )
        }
    ];

    return (
        <DashboardSidebar>
            <div className="p-8">
                <PageHeader
                    title="All Visitors"
                    description="View and manage your entire customer database"
                    actions={
                        <div className="flex items-center gap-3">
                            <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 text-text-main font-bold rounded-xl hover:bg-gray-50 transition-all text-sm shadow-sm">
                                <span className="material-icons-round text-lg">file_download</span>
                                Export CSV
                            </button>
                            <button className="flex items-center gap-2 px-4 py-2.5 bg-primary text-white font-bold rounded-xl hover:bg-primary-hover transition-all text-sm shadow-md shadow-primary/20">
                                <span className="material-icons-round text-lg">person_add</span>
                                Add Visitor
                            </button>
                        </div>
                    }
                />

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {stats.map((stat, index) => (
                        <StatsCard key={index} {...stat as any} />
                    ))}
                </div>

                <div className="bg-white rounded-xl p-6 border border-gray-200 mb-6 flex flex-col md:flex-row gap-4">
                    <div className="flex-1 relative">
                        <span className="material-icons-round absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg">search</span>
                        <input
                            type="text"
                            placeholder="Search by name, email, or phone..."
                            className="w-full h-12 bg-gray-50 border border-gray-200 rounded-xl pl-12 pr-5 font-medium outline-none focus:ring-2 focus:ring-primary/20 focus:bg-white transition-all text-sm"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <div className="flex gap-3">
                        <select
                            className="h-12 px-4 bg-gray-50 border border-gray-200 rounded-xl text-sm font-bold text-text-main outline-none focus:ring-2 focus:ring-primary/20"
                            value={filterStatus}
                            onChange={(e) => setFilterStatus(e.target.value)}
                        >
                            <option value="all">All Status</option>
                            <option value="active">Active</option>
                            <option value="new">New</option>
                            <option value="vip">VIP</option>
                            <option value="inactive">Inactive</option>
                        </select>
                        <button className="h-12 px-6 bg-gray-50 border border-gray-200 text-text-main font-bold rounded-xl hover:bg-gray-100 transition-all text-sm">
                            More Filters
                        </button>
                    </div>
                </div>

                <DataTable
                    columns={columns}
                    data={visitors}
                    onRowClick={(visitor) => console.log('Clicked visitor:', visitor)}
                    emptyState={
                        <EmptyState
                            icon="people"
                            title="No visitors found"
                            description="Start collecting visitor data by placing your NFC devices at your business location."
                            action={{
                                label: "Add Visitor",
                                onClick: () => console.log('Add visitor clicked'),
                                icon: "person_add"
                            }}
                        />
                    }
                />

                <div className="mt-6 flex items-center justify-between px-2">
                    <p className="text-sm text-text-secondary font-medium">Showing 1 to 6 of 2,847 visitors</p>
                    <div className="flex gap-2">
                        <button className="px-4 py-2 bg-white border border-gray-200 text-text-secondary font-bold rounded-lg text-xs hover:bg-gray-50 disabled:opacity-50">Previous</button>
                        <div className="flex gap-1">
                            {[1, 2, 3, '...', 475].map((page, i) => (
                                <button key={i} className={`size-8 flex items-center justify-center font-bold text-xs rounded-lg transition-all ${page === 1 ? 'bg-primary text-white' : 'text-text-secondary hover:bg-gray-100'}`}>
                                    {page}
                                </button>
                            ))}
                        </div>
                        <button className="px-4 py-2 bg-white border border-gray-200 text-text-secondary font-bold rounded-lg text-xs hover:bg-gray-50">Next</button>
                    </div>
                </div>
            </div>
        </DashboardSidebar>
    );
}
