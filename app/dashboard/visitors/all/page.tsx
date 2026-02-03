'use client';

import React, { useState } from 'react';
import DashboardSidebar from '@/components/dashboard/DashboardSidebar';
import PageHeader from '@/components/dashboard/PageHeader';
import StatsCard from '@/components/dashboard/StatsCard';
import DataTable, { Column } from '@/components/dashboard/DataTable';
import EmptyState from '@/components/dashboard/EmptyState';
import AddVisitorModal, { VisitorFormData } from '@/components/dashboard/AddVisitorModal';
import { Users, UserPlus, Repeat, Star, Download, Search, Edit, Trash2, MoreVertical } from 'lucide-react';
import toast from 'react-hot-toast';

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
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [visitors, setVisitors] = useState<Visitor[]>([
        { id: '1', name: 'Alex Johnson', email: 'alex.j@example.com', phone: '+234 801 234 5678', visits: 12, lastVisit: '2 hours ago', status: 'Active' },
        { id: '2', name: 'Sarah Williams', email: 'sarah.w@example.com', phone: '+234 802 345 6789', visits: 5, lastVisit: '5 hours ago', status: 'Active' },
        { id: '3', name: 'Michael Chen', email: 'm.chen@example.com', phone: '+234 803 456 7890', visits: 1, lastVisit: '1 day ago', status: 'New' },
        { id: '4', name: 'Bisi Adebowale', email: 'bisi.a@example.com', phone: '+234 804 567 8901', visits: 24, lastVisit: '3 hours ago', status: 'VIP' },
        { id: '5', name: 'David Okafor', email: 'd.okafor@example.com', phone: '+234 805 678 9012', visits: 8, lastVisit: '2 days ago', status: 'Returning' },
        { id: '6', name: 'Faith Amadi', email: 'f.amadi@example.com', phone: '+234 806 789 0123', visits: 3, lastVisit: '4 days ago', status: 'Inactive' },
    ]);

    const handleAddVisitor = (data: VisitorFormData) => {
        setIsLoading(true);
        // Simulate API call
        setTimeout(() => {
            const newVisitor: Visitor = {
                id: Math.random().toString(36).substr(2, 9),
                name: data.name,
                email: data.email,
                phone: data.phone,
                visits: 1,
                lastVisit: 'Just now',
                status: data.status
            };
            setVisitors(prev => [newVisitor, ...prev]);
            setIsLoading(false);
            setIsAddModalOpen(false);
            toast.success(`${data.name} added successfully!`);
        }, 1000);
    };

    const handleExportCSV = () => {
        // Simulate CSV export
        const csvContent = [
            ['Name', 'Email', 'Phone', 'Visits', 'Last Visit', 'Status'],
            ...visitors.map(v => [v.name, v.email, v.phone, v.visits, v.lastVisit, v.status])
        ].map(row => row.join(',')).join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `visitors_${new Date().toISOString().split('T')[0]}.csv`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);

        toast.success('CSV exported successfully!');
    };

    const handleEditVisitor = (visitor: Visitor) => {
        // Simulate edit
        const newName = prompt('Enter new name:', visitor.name);
        if (newName && newName.trim()) {
            setVisitors(prev => prev.map(v =>
                v.id === visitor.id ? { ...v, name: newName.trim() } : v
            ));
            toast.success(`Updated ${visitor.name} to ${newName}`);
        }
    };

    const handleDeleteVisitor = (visitor: Visitor) => {
        if (confirm(`Are you sure you want to delete ${visitor.name}?`)) {
            setVisitors(prev => prev.filter(v => v.id !== visitor.id));
            toast.success(`Deleted ${visitor.name}`);
        }
    };

    const handleMoreActions = (visitor: Visitor) => {
        // Simulate sending message
        const action = confirm(`Send message to ${visitor.name}?`);
        if (action) {
            toast.success(`Message sent to ${visitor.name}!`);
            console.log('Sent message to:', visitor);
        }
    };

    const handleSendCampaign = () => {
        if (visitors.length === 0) {
            toast.error('No visitors to send campaign to');
            return;
        }

        const confirmed = confirm(`Send campaign to all ${visitors.length} visitors?`);
        if (confirmed) {
            toast.loading('Sending campaign...', { duration: 1000 });
            setTimeout(() => {
                toast.success(`Campaign sent to ${visitors.length} visitors!`);
            }, 1000);
        }
    };

    const stats = [
        { label: 'Total Visitors', value: visitors.length.toString(), icon: Users, color: 'blue' as const, trend: { value: '+12%', isUp: true } },
        { label: 'New This Month', value: visitors.filter(v => v.status === 'New').length.toString(), icon: UserPlus, color: 'green' as const, trend: { value: '+5%', isUp: true } },
        { label: 'Avg. Frequency', value: '3.2', icon: Repeat, color: 'purple' as const, trend: { value: '-2%', isUp: false } },
        { label: 'VIP Guests', value: visitors.filter(v => v.status === 'VIP').length.toString(), icon: Star, color: 'yellow' as const, trend: { value: '+8%', isUp: true } },
    ];

    // Filter visitors based on search and status
    const filteredVisitors = visitors.filter(visitor => {
        const matchesSearch = searchQuery === '' ||
            visitor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            visitor.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
            visitor.phone.includes(searchQuery);

        const matchesStatus = filterStatus === 'all' ||
            visitor.status.toLowerCase() === filterStatus.toLowerCase();

        return matchesSearch && matchesStatus;
    });

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
            accessor: (item: Visitor) => (
                <div className="flex items-center gap-2">
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            handleEditVisitor(item);
                        }}
                        className="p-1.5 text-text-secondary hover:text-primary hover:bg-primary/5 rounded-lg transition-colors"
                        title="Edit visitor"
                    >
                        <Edit size={18} />
                    </button>
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteVisitor(item);
                        }}
                        className="p-1.5 text-text-secondary hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Delete visitor"
                    >
                        <Trash2 size={18} />
                    </button>
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            handleMoreActions(item);
                        }}
                        className="p-1.5 text-text-secondary hover:text-text-main hover:bg-gray-100 rounded-lg transition-colors"
                        title="Send message"
                    >
                        <MoreVertical size={18} />
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
                            <button
                                onClick={handleExportCSV}
                                className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 text-text-main font-bold rounded-xl hover:bg-gray-50 transition-all text-sm shadow-sm"
                            >
                                <Download size={18} />
                                Export CSV
                            </button>
                            <button
                                onClick={() => setIsAddModalOpen(true)}
                                className="flex items-center gap-2 px-4 py-2.5 bg-primary text-white font-bold rounded-xl hover:bg-primary-hover transition-all text-sm shadow-md shadow-primary/20"
                            >
                                <UserPlus size={18} />
                                Add Visitor
                            </button>
                        </div>
                    }
                />

                <AddVisitorModal
                    isOpen={isAddModalOpen}
                    onClose={() => setIsAddModalOpen(false)}
                    onSubmit={handleAddVisitor}
                    isLoading={isLoading}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {stats.map((stat, index) => (
                        <StatsCard key={index} {...stat} />
                    ))}
                </div>

                <div className="bg-white rounded-xl p-6 border border-gray-200 mb-6 flex flex-col md:flex-row gap-4">
                    <div className="flex-1 relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
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
                        <button
                            onClick={handleSendCampaign}
                            className="h-12 px-6 bg-primary text-white font-bold rounded-xl hover:bg-primary-hover transition-all text-sm"
                        >
                            Send Campaign
                        </button>
                    </div>
                </div>

                <DataTable
                    columns={columns}
                    data={filteredVisitors}
                    onRowClick={(visitor) => {
                        console.log('Clicked visitor:', visitor);
                        toast(`Viewing ${visitor.name}'s profile`);
                    }}
                    emptyState={
                        <EmptyState
                            icon="people"
                            title={searchQuery || filterStatus !== 'all' ? "No visitors found" : "No visitors yet"}
                            description={searchQuery || filterStatus !== 'all'
                                ? "Try adjusting your search or filters"
                                : "Start collecting visitor data by placing your NFC devices at your business location."}
                            action={{
                                label: "Add Visitor",
                                onClick: () => setIsAddModalOpen(true),
                                icon: "person_add"
                            }}
                        />
                    }
                />

                <div className="mt-6 flex items-center justify-between px-2">
                    <p className="text-sm text-text-secondary font-medium">
                        Showing {filteredVisitors.length} of {visitors.length} visitors
                        {searchQuery && ` (filtered by "${searchQuery}")`}
                        {filterStatus !== 'all' && ` (status: ${filterStatus})`}
                    </p>
                </div>
            </div>
        </DashboardSidebar>
    );
}
