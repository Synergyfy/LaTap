'use client';

import React from 'react';
import DashboardSidebar from '@/components/dashboard/DashboardSidebar';
import PageHeader from '@/components/dashboard/PageHeader';
import DataTable, { Column } from '@/components/dashboard/DataTable';

interface StaffMember {
    id: string;
    name: string;
    email: string;
    role: string;
    status: string;
    lastActive: string;
}


export default function StaffManagementPage() {
    const staff = [
        { id: '1', name: 'John Manager', email: 'john@greenterrace.com', role: 'Business Owner', status: 'Active', lastActive: 'Now' },
        { id: '2', name: 'Sarah Supervisor', email: 'sarah.s@example.com', role: 'Store Manager', status: 'Active', lastActive: '2h ago' },
        { id: '3', name: 'Michael Cashier', email: 'mike.c@example.com', role: 'Staff Member', status: 'Active', lastActive: '1d ago' },
        { id: '4', name: 'Waitress Chioma', email: 'chioma.w@example.com', role: 'Staff Member', status: 'Inactive', lastActive: '1 week ago' },
    ];

    const columns: Column<StaffMember>[] = [
        {
            header: 'Staff Member',
            accessor: (item: StaffMember) => (
                <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center text-text-secondary font-bold text-xs uppercase">
                        {item.name.split(' ').map((n: string) => n[0]).join('')}
                    </div>
                    <div>
                        <p className="font-bold text-text-main">{item.name}</p>
                        <p className="text-xs text-text-secondary">{item.email}</p>
                    </div>
                </div>
            )
        },
        {
            header: 'Role',
            accessor: (item: StaffMember) => (
                <span className={`px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider ${item.role === 'Business Owner' ? 'bg-primary/10 text-primary' : 'bg-gray-100 text-gray-700'
                    }`}>
                    {item.role}
                </span>
            )
        },
        {
            header: 'Status',
            accessor: (item: StaffMember) => (
                <div className="flex items-center gap-2">
                    <div className={`size-1.5 rounded-full ${item.status === 'Active' ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                    <span className="text-sm font-medium">{item.status}</span>
                </div>
            )
        },
        { header: 'Last Active', accessor: (item: StaffMember) => item.lastActive },
        {
            header: 'Actions',
            accessor: () => (
                <div className="flex items-center gap-2">
                    <button className="p-1.5 text-text-secondary hover:text-primary transition-colors">
                        <span className="material-icons-round text-lg">edit</span>
                    </button>
                    <button className="p-1.5 text-text-secondary hover:text-red-500 transition-colors">
                        <span className="material-icons-round text-lg">delete</span>
                    </button>
                </div>
            )
        }
    ];

    return (
        <DashboardSidebar>
            <div className="p-8">
                <PageHeader
                    title="Staff Management"
                    description="Invite and manage your team members and their permissions"
                    actions={
                        <button className="flex items-center gap-2 px-4 py-2.5 bg-primary text-white font-bold rounded-xl hover:bg-primary-hover transition-all text-sm shadow-md shadow-primary/20">
                            <span className="material-icons-round text-lg">person_add</span>
                            Invite Staff
                        </button>
                    }
                />

                <DataTable columns={columns} data={staff} />

                <div className="mt-8 bg-blue-50 border border-blue-100 rounded-2xl p-6">
                    <h4 className="font-display font-bold text-blue-900 mb-2">Permissions Overview</h4>
                    <p className="text-sm text-blue-800 leading-relaxed font-medium">
                        **Store Managers** can view analytics and manage visitors but cannot access billing settings.
                        **Staff Members** can only view visitor check-ins and send loyalty points.
                    </p>
                </div>
            </div>
        </DashboardSidebar>
    );
}
