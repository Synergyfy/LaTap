'use client';

import React, { useState } from 'react';
import DashboardSidebar from '@/components/dashboard/DashboardSidebar';
import PageHeader from '@/components/dashboard/PageHeader';
import DataTable, { Column } from '@/components/dashboard/DataTable';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { dashboardApi } from '@/lib/api/dashboard';
import { Staff } from '@/lib/store/mockDashboardStore';
import toast from 'react-hot-toast';
import { UserPlus, Shield, Edit3, Trash2, X, Check } from 'lucide-react';

export default function StaffManagementPage() {
    const queryClient = useQueryClient();
    const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
    const [editingStaff, setEditingStaff] = useState<Staff | null>(null);

    // Fetch Staff from store
    const { data: storeData, isLoading } = useQuery({
        queryKey: ['dashboard'],
        queryFn: dashboardApi.fetchDashboardData,
    });

    const staffMembers = storeData?.staffMembers || [];

    const addStaffMutation = useMutation({
        mutationFn: dashboardApi.addStaff,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['dashboard'] });
            setIsInviteModalOpen(false);
            toast.success('Staff member invited successfully');
        }
    });

    const updateStaffMutation = useMutation({
        mutationFn: dashboardApi.updateStaffMember,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['dashboard'] });
            setEditingStaff(null);
            toast.success('Staff role updated');
        }
    });

    const deleteStaffMutation = useMutation({
        mutationFn: dashboardApi.deleteStaff,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['dashboard'] });
            toast.success('Staff member removed');
        }
    });

    const handleInviteStaff = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const staffData = {
            name: formData.get('name') as string,
            email: formData.get('email') as string,
            role: formData.get('role') as any,
        };
        addStaffMutation.mutate(staffData);
    };

    const handleUpdateRole = (id: string, role: string) => {
        updateStaffMutation.mutate({ id, updates: { role: role as any } });
    };

    const handleDelete = (id: string, name: string) => {
        if (confirm(`Are you sure you want to remove ${name}?`)) {
            deleteStaffMutation.mutate(id);
        }
    };

    const columns: Column<Staff>[] = [
        {
            header: 'Staff Member',
            accessor: (item: Staff) => (
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xs uppercase border border-primary/20">
                        {item.name.split(' ').map((n: string) => n[0]).join('')}
                    </div>
                    <div>
                        <p className="font-bold text-text-main leading-none mb-1">{item.name}</p>
                        <p className="text-xs text-text-secondary font-medium">{item.email}</p>
                    </div>
                </div>
            )
        },
        {
            header: 'Role',
            accessor: (item: Staff) => (
                <div className="flex items-center gap-2">
                    <Shield size={14} className={item.role === 'Owner' ? 'text-primary' : 'text-gray-400'} />
                    <span className={`px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider ${item.role === 'Owner' ? 'bg-primary/10 text-primary' :
                            item.role === 'Manager' ? 'bg-blue-50 text-blue-600' :
                                'bg-gray-100 text-gray-700'
                        }`}>
                        {item.role}
                    </span>
                </div>
            )
        },
        {
            header: 'Status',
            accessor: (item: Staff) => (
                <div className="flex items-center gap-2">
                    <div className={`size-1.5 rounded-full ${item.status === 'Active' ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                    <span className="text-sm font-bold text-text-main">{item.status}</span>
                </div>
            )
        },
        {
            header: 'Last Active',
            accessor: (item: Staff) => <span className="text-sm text-text-secondary font-medium">{item.lastActive}</span>
        },
        {
            header: 'Actions',
            accessor: (item: Staff) => (
                <div className="flex items-center gap-2">
                    <button
                        onClick={() => setEditingStaff(item)}
                        className="p-2 text-text-secondary hover:text-primary hover:bg-primary/5 rounded-lg transition-all"
                        title="Change Role"
                    >
                        <Edit3 size={18} />
                    </button>
                    <button
                        onClick={() => handleDelete(item.id, item.name)}
                        className="p-2 text-text-secondary hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                        title="Remove Staff"
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
                    title="Staff Management"
                    description="Invite and manage your team members and their permissions"
                    actions={
                        <button
                            onClick={() => setIsInviteModalOpen(true)}
                            className="flex items-center gap-2 px-6 py-3 bg-primary text-white font-bold rounded-xl hover:bg-primary-hover transition-all text-sm shadow-lg shadow-primary/20 active:scale-95"
                        >
                            <UserPlus size={18} />
                            Invite Staff
                        </button>
                    }
                />

                <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
                    {isLoading ? (
                        <div className="p-20 flex justify-center">
                            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary"></div>
                        </div>
                    ) : (
                        <DataTable columns={columns} data={staffMembers} />
                    )}
                </div>

                <div className="mt-8 bg-linear-to-r from-primary/5 to-transparent border border-primary/10 rounded-2xl p-6">
                    <div className="flex gap-4">
                        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                            <Shield className="text-primary" size={24} />
                        </div>
                        <div>
                            <h4 className="font-display font-bold text-text-main mb-2 text-lg">Permissions Overview</h4>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="space-y-1">
                                    <p className="text-sm font-black text-primary uppercase tracking-tighter">Business Owner</p>
                                    <p className="text-xs text-text-secondary leading-relaxed font-medium">Full administrative access, billing, and settings control.</p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-sm font-black text-blue-600 uppercase tracking-tighter">Store Manager</p>
                                    <p className="text-xs text-text-secondary leading-relaxed font-medium">Manage visitors, issue rewards, and view detailed analytics.</p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-sm font-black text-gray-600 uppercase tracking-tighter">Staff Member</p>
                                    <p className="text-xs text-text-secondary leading-relaxed font-medium">Restricted to visitor check-ins and basic loyalty actions.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Invite Modal */}
            {isInviteModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setIsInviteModalOpen(false)}></div>
                    <div className="relative w-full max-w-md bg-white rounded-2xl p-8 shadow-2xl animate-in fade-in zoom-in duration-200">
                        <div className="flex items-center justify-between mb-6">
                            <div>
                                <h2 className="text-2xl font-display font-bold text-text-main">Invite Staff Member</h2>
                                <p className="text-sm text-text-secondary">Add a new teammate to your business</p>
                            </div>
                            <button onClick={() => setIsInviteModalOpen(false)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                                <X size={24} className="text-text-secondary" />
                            </button>
                        </div>
                        <form onSubmit={handleInviteStaff} className="space-y-4">
                            <div>
                                <label className="block text-xs font-black uppercase tracking-widest text-text-secondary mb-2">Full Name</label>
                                <input name="name" required className="w-full h-12 px-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:bg-white transition-all font-bold text-sm" placeholder="e.g. John Doe" />
                            </div>
                            <div>
                                <label className="block text-xs font-black uppercase tracking-widest text-text-secondary mb-2">Email Address</label>
                                <input name="email" type="email" required className="w-full h-12 px-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:bg-white transition-all font-bold text-sm" placeholder="john@example.com" />
                            </div>
                            <div>
                                <label className="block text-xs font-black uppercase tracking-widest text-text-secondary mb-2">Assign Role</label>
                                <select name="role" className="w-full h-12 px-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:bg-white transition-all font-bold text-sm">
                                    <option value="Staff">Staff Member</option>
                                    <option value="Manager">Store Manager</option>
                                    <option value="Owner">Business Owner</option>
                                </select>
                            </div>
                            <button disabled={addStaffMutation.isPending} className="w-full h-14 bg-primary text-white font-bold rounded-xl hover:bg-primary-hover transition-all shadow-lg shadow-primary/20 flex items-center justify-center gap-2 mt-6 active:scale-95 disabled:opacity-50">
                                {addStaffMutation.isPending ? (<div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>) : (<><UserPlus size={20} />Send Invitation</>)}
                            </button>
                        </form>
                    </div>
                </div>
            )}

            {/* Edit Role Modal */}
            {editingStaff && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setEditingStaff(null)}></div>
                    <div className="relative w-full max-w-sm bg-white rounded-2xl p-8 shadow-2xl animate-in fade-in zoom-in duration-200">
                        <h2 className="text-xl font-display font-bold text-text-main mb-2 text-center">Update Role</h2>
                        <p className="text-sm text-text-secondary text-center mb-6">Changing role for <span className="font-bold text-text-main">{editingStaff.name}</span></p>

                        <div className="space-y-3">
                            {['Staff', 'Manager', 'Owner'].map((role) => (
                                <button
                                    key={role}
                                    onClick={() => handleUpdateRole(editingStaff.id, role)}
                                    className={`w-full flex items-center justify-between p-4 rounded-xl border-2 transition-all group ${editingStaff.role === role ? 'border-primary bg-primary/5' : 'border-gray-100 hover:border-primary/30'
                                        }`}
                                >
                                    <div className="text-left">
                                        <p className={`font-bold text-sm ${editingStaff.role === role ? 'text-primary' : 'text-text-main'}`}>{role}</p>
                                        <p className="text-[10px] text-text-secondary font-medium">
                                            {role === 'Owner' ? 'Unlimited access' : role === 'Manager' ? 'Operations & Analytics' : 'Check-ins only'}
                                        </p>
                                    </div>
                                    {editingStaff.role === role && <Check size={18} className="text-primary" />}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </DashboardSidebar>
    );
}
