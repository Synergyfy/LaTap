'use client';

import React, { useState } from 'react';
import AdminSidebar from '@/components/admin/AdminSidebar';
import Modal from '@/components/ui/Modal';
import { notify } from '@/lib/notify';

export default function AdminBusinessesPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [filterStatus, setFilterStatus] = useState('all');
    const [filterPlan, setFilterPlan] = useState('all');
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [selectedBusiness, setSelectedBusiness] = useState<any>(null);

    const [businesses, setBusinesses] = useState([
        { id: 1, name: 'Green Terrace Cafe', owner: 'John Smith', email: 'john@greenterrace.com', phone: '+234 802 345 6789', plan: 'Premium', devices: 5, visitors: 2847, status: 'active', joined: '2024-01-15' },
        { id: 2, name: 'Tech Hub Lagos', owner: 'Sarah Johnson', email: 'sarah@techhub.ng', phone: '+234 803 456 7890', plan: 'Enterprise', devices: 12, visitors: 8921, status: 'active', joined: '2024-01-10' },
        { id: 3, name: 'Fashion Boutique', owner: 'Mike Williams', email: 'mike@fashion.com', phone: '+234 804 567 8901', plan: 'Basic', devices: 2, visitors: 456, status: 'pending', joined: '2024-02-01' },
        { id: 4, name: 'Fitness Center', owner: 'Emily Davis', email: 'emily@fitness.ng', phone: '+234 805 678 9012', plan: 'Premium', devices: 8, visitors: 3421, status: 'active', joined: '2024-01-20' },
        { id: 5, name: 'Restaurant 360', owner: 'David Brown', email: 'david@restaurant360.com', phone: '+234 806 789 0123', plan: 'Basic', devices: 3, visitors: 1234, status: 'suspended', joined: '2023-12-05' },
        { id: 6, name: 'Beauty Spa', owner: 'Lisa Anderson', email: 'lisa@beautyspa.ng', phone: '+234 807 890 1234', plan: 'Free', devices: 1, visitors: 89, status: 'active', joined: '2024-01-28' },
    ]);

    const stats = [
        { label: 'Total Businesses', value: businesses.length.toString(), icon: 'store', color: 'blue' },
        { label: 'Active', value: businesses.filter(b => b.status === 'active').length.toString(), icon: 'check_circle', color: 'green' },
        { label: 'Pending Approval', value: businesses.filter(b => b.status === 'pending').length.toString(), icon: 'pending', color: 'yellow' },
        { label: 'Suspended', value: businesses.filter(b => b.status === 'suspended').length.toString(), icon: 'block', color: 'red' },
    ];

    const handleDelete = (id: number) => {
        const business = businesses.find(b => b.id === id);
        setBusinesses(businesses.filter(b => b.id !== id));
        notify.success(`${business?.name} has been removed from the platform.`);
    };

    const handleToggleStatus = (id: number) => {
        setBusinesses(businesses.map(b => {
            if (b.id === id) {
                const newStatus = b.status === 'suspended' ? 'active' : 'suspended';
                notify.success(`Business ${newStatus === 'active' ? 'activated' : 'suspended'} successfully`);
                return { ...b, status: newStatus };
            }
            return b;
        }));
    };

    const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const businessData = {
            name: formData.get('name') as string,
            plan: formData.get('plan') as string,
            owner: formData.get('owner') as string,
            email: formData.get('email') as string,
            status: selectedBusiness?.status || 'active',
            joined: selectedBusiness?.joined || new Date().toISOString().split('T')[0],
            devices: selectedBusiness?.devices || 0,
            visitors: selectedBusiness?.visitors || 0
        };

        if (selectedBusiness) {
            setBusinesses(businesses.map(b => b.id === selectedBusiness.id ? { ...b, ...businessData } : b));
            notify.success('Business details updated successfully');
        } else {
            const newId = businesses.length > 0 ? Math.max(...businesses.map(b => b.id)) + 1 : 1;
            setBusinesses([{ id: newId, ...businessData }, ...businesses]);
            notify.success('New business registered successfully');
        }
        setIsAddModalOpen(false);
        setSelectedBusiness(null);
    };

    const filteredBusinesses = businesses.filter(b => {
        const matchesSearch = b.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            b.owner.toLowerCase().includes(searchQuery.toLowerCase()) ||
            b.email.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStatus = filterStatus === 'all' || b.status === filterStatus;
        const matchesPlan = filterPlan === 'all' || b.plan.toLowerCase() === filterPlan.toLowerCase();
        return matchesSearch && matchesStatus && matchesPlan;
    });

    return (
        <AdminSidebar>
            <div className="p-8">
                {/* Page Header */}
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-3xl font-display font-bold text-text-main mb-2">Businesses Management</h1>
                        <p className="text-text-secondary font-medium">Manage all registered businesses on the platform</p>
                    </div>
                    <button
                        onClick={() => { setSelectedBusiness(null); setIsAddModalOpen(true); }}
                        className="px-6 py-3 bg-primary text-white font-bold rounded-xl hover:bg-primary-hover transition-all flex items-center gap-2 shadow-lg shadow-primary/20 active:scale-95"
                    >
                        <span className="material-icons-round">add</span>
                        Add Business
                    </button>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {stats.map((stat, index) => (
                        <div key={index} className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
                            <div className="flex items-center gap-4">
                                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${stat.color === 'green' ? 'bg-green-50 text-green-600' :
                                    stat.color === 'yellow' ? 'bg-yellow-50 text-yellow-600' :
                                        stat.color === 'red' ? 'bg-red-50 text-red-600' :
                                            'bg-primary/10 text-primary'
                                    }`}>
                                    <span className="material-icons-round text-xl">{stat.icon}</span>
                                </div>
                                <div>
                                    <p className="text-xs font-bold uppercase tracking-wider text-text-secondary mb-1">{stat.label}</p>
                                    <p className="text-2xl font-display font-bold text-text-main">{stat.value}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Filters and Search */}
                <div className="bg-white rounded-xl p-6 border border-gray-200 mb-6 shadow-sm">
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="flex-1 relative">
                            <span className="material-icons-round absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg">
                                search
                            </span>
                            <input
                                type="text"
                                placeholder="Search by business name, owner, or email..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full h-12 pl-10 pr-4 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:bg-white transition-all shadow-inner"
                            />
                        </div>
                        <div className="flex gap-2">
                            <select
                                value={filterStatus}
                                onChange={(e) => setFilterStatus(e.target.value)}
                                className="h-12 px-4 bg-gray-50 border border-gray-200 rounded-lg text-sm font-bold focus:outline-none focus:ring-2 focus:ring-primary/20"
                            >
                                <option value="all">All Status</option>
                                <option value="active">Active</option>
                                <option value="pending">Pending</option>
                                <option value="suspended">Suspended</option>
                            </select>
                            <select
                                value={filterPlan}
                                onChange={(e) => setFilterPlan(e.target.value)}
                                className="h-12 px-4 bg-gray-50 border border-gray-200 rounded-lg text-sm font-bold focus:outline-none focus:ring-2 focus:ring-primary/20"
                            >
                                <option value="all">All Plans</option>
                                <option value="free">Free</option>
                                <option value="basic">Basic</option>
                                <option value="premium">Premium</option>
                                <option value="enterprise">Enterprise</option>
                            </select>
                            <button
                                onClick={() => notify.info('Exporting business data...')}
                                className="h-12 px-6 bg-white border border-gray-200 text-text-main font-bold rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2"
                            >
                                <span className="material-icons-round text-lg">file_download</span>
                                Export
                            </button>
                        </div>
                    </div>
                </div>

                {/* Businesses Table */}
                <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50 border-b border-gray-200">
                                <tr>
                                    <th className="text-left py-4 px-6 text-xs font-black uppercase tracking-wider text-text-secondary">
                                        <input type="checkbox" className="rounded accent-primary" />
                                    </th>
                                    <th className="text-left py-4 px-6 text-xs font-black uppercase tracking-wider text-text-secondary">Business</th>
                                    <th className="text-left py-4 px-6 text-xs font-black uppercase tracking-wider text-text-secondary">Owner</th>
                                    <th className="text-left py-4 px-6 text-xs font-black uppercase tracking-wider text-text-secondary">Plan</th>
                                    <th className="text-left py-4 px-6 text-xs font-black uppercase tracking-wider text-text-secondary">Devices</th>
                                    <th className="text-left py-4 px-6 text-xs font-black uppercase tracking-wider text-text-secondary">Visitors</th>
                                    <th className="text-left py-4 px-6 text-xs font-black uppercase tracking-wider text-text-secondary">Status</th>
                                    <th className="text-left py-4 px-6 text-xs font-black uppercase tracking-wider text-text-secondary">Joined</th>
                                    <th className="text-right py-4 px-6 text-xs font-black uppercase tracking-wider text-text-secondary">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {filteredBusinesses.length === 0 ? (
                                    <tr>
                                        <td colSpan={9} className="py-12 text-center text-text-secondary font-medium">
                                            No businesses found matching your criteria.
                                        </td>
                                    </tr>
                                ) : (
                                    filteredBusinesses.map((business) => (
                                        <tr key={business.id} className="hover:bg-gray-50 transition-colors group">
                                            <td className="py-4 px-6">
                                                <input type="checkbox" className="rounded accent-primary" />
                                            </td>
                                            <td className="py-4 px-6">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary transition-colors">
                                                        <span className="material-icons-round text-primary text-sm group-hover:text-white">store</span>
                                                    </div>
                                                    <span className="font-bold text-sm text-text-main">{business.name}</span>
                                                </div>
                                            </td>
                                            <td className="py-4 px-6">
                                                <div className="text-sm">
                                                    <p className="font-bold text-text-main">{business.owner}</p>
                                                    <p className="text-text-secondary text-xs font-medium">{business.email}</p>
                                                </div>
                                            </td>
                                            <td className="py-4 px-6">
                                                <span className={`inline-flex px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${business.plan === 'Enterprise' ? 'bg-purple-50 text-purple-600' :
                                                    business.plan === 'Premium' ? 'bg-blue-50 text-blue-600' :
                                                        business.plan === 'Basic' ? 'bg-green-50 text-green-600' :
                                                            'bg-gray-100 text-gray-500'
                                                    }`}>
                                                    {business.plan}
                                                </span>
                                            </td>
                                            <td className="py-4 px-6 font-bold text-sm text-text-main">{business.devices}</td>
                                            <td className="py-4 px-6 font-bold text-sm text-text-main">{business.visitors.toLocaleString()}</td>
                                            <td className="py-4 px-6">
                                                <span className={`inline-flex px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${business.status === 'active' ? 'bg-green-50 text-green-600' :
                                                    business.status === 'pending' ? 'bg-yellow-50 text-yellow-600' :
                                                        'bg-red-50 text-red-600'
                                                    }`}>
                                                    {business.status}
                                                </span>
                                            </td>
                                            <td className="py-4 px-6 text-sm text-text-secondary font-bold">{business.joined}</td>
                                            <td className="py-4 px-6 text-right">
                                                <div className="flex items-center justify-end gap-1">
                                                    <button
                                                        onClick={() => {
                                                            setSelectedBusiness(business);
                                                            setIsAddModalOpen(true);
                                                        }}
                                                        className="p-2 text-gray-400 hover:text-primary hover:bg-primary/5 rounded-lg transition-all"
                                                        title="Edit"
                                                    >
                                                        <span className="material-icons-round text-lg">edit</span>
                                                    </button>
                                                    <button
                                                        onClick={() => handleToggleStatus(business.id)}
                                                        className={`p-2 rounded-lg transition-all ${business.status === 'suspended'
                                                            ? 'text-green-500 hover:bg-green-50'
                                                            : 'text-orange-500 hover:bg-orange-50'
                                                            }`}
                                                        title={business.status === 'suspended' ? 'Activate' : 'Suspend'}
                                                    >
                                                        <span className="material-icons-round text-lg">
                                                            {business.status === 'suspended' ? 'check_circle' : 'block'}
                                                        </span>
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(business.id)}
                                                        className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                                                        title="Delete"
                                                    >
                                                        <span className="material-icons-round text-lg">delete</span>
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    <div className="flex items-center justify-between px-6 py-4 border-t border-gray-100 bg-gray-50/50">
                        <p className="text-xs text-text-secondary font-black uppercase tracking-widest">
                            Showing {filteredBusinesses.length} of {businesses.length} businesses
                        </p>
                        <div className="flex gap-2">
                            <button className="px-4 py-2 border border-gray-200 rounded-lg text-xs font-black uppercase tracking-widest text-text-secondary hover:bg-white transition-all disabled:opacity-50">
                                Previous
                            </button>
                            <button className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-xs font-black uppercase tracking-widest text-text-main hover:border-primary/50 transition-all">
                                Next
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Add/Edit Business Modal */}
            <Modal
                isOpen={isAddModalOpen}
                onClose={() => { setIsAddModalOpen(false); setSelectedBusiness(null); }}
                title={selectedBusiness ? 'Update Business' : 'Register New Venue'}
                description={selectedBusiness ? 'Modify account credentials and access' : 'Enter the details of the new business partner'}
                size="lg"
            >
                <form onSubmit={handleFormSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 ml-1">Business Name</label>
                            <input
                                name="name"
                                defaultValue={selectedBusiness?.name}
                                required
                                className="w-full h-12 px-4 bg-slate-50 border border-slate-100 rounded-xl focus:outline-none focus:ring-4 focus:ring-primary/5 focus:bg-white transition-all font-bold text-sm"
                                placeholder="e.g. Skyline Lounge"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 ml-1">Licensing Plan</label>
                            <select
                                name="plan"
                                defaultValue={selectedBusiness?.plan}
                                className="w-full h-12 px-4 bg-slate-50 border border-slate-100 rounded-xl focus:outline-none focus:ring-4 focus:ring-primary/5 focus:bg-white transition-all font-bold text-sm appearance-none cursor-pointer"
                            >
                                <option value="Free">Free Tier</option>
                                <option value="Basic">Basic Plan</option>
                                <option value="Premium">Premium Account</option>
                                <option value="Enterprise">Enterprise License</option>
                            </select>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 ml-1">Business Owner Name</label>
                        <input
                            name="owner"
                            defaultValue={selectedBusiness?.owner}
                            required
                            className="w-full h-12 px-4 bg-slate-50 border border-slate-100 rounded-xl focus:outline-none focus:ring-4 focus:ring-primary/5 focus:bg-white transition-all font-bold text-sm"
                            placeholder="Full legal name"
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 ml-1">Primary Email Address</label>
                            <input
                                name="email"
                                defaultValue={selectedBusiness?.email}
                                type="email"
                                required
                                className="w-full h-12 px-4 bg-slate-50 border border-slate-100 rounded-xl focus:outline-none focus:ring-4 focus:ring-primary/5 focus:bg-white transition-all font-bold text-sm"
                                placeholder="billing@business.com"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 ml-1">Phone Number</label>
                            <input
                                name="phone"
                                defaultValue={selectedBusiness?.phone || '+234 '}
                                type="tel"
                                required
                                className="w-full h-12 px-4 bg-slate-50 border border-slate-100 rounded-xl focus:outline-none focus:ring-4 focus:ring-primary/5 focus:bg-white transition-all font-bold text-sm"
                                placeholder="+234 800 000 0000"
                            />
                        </div>
                    </div>

                    <div className="pt-4 flex gap-4">
                        <button
                            type="button"
                            onClick={() => { setIsAddModalOpen(false); setSelectedBusiness(null); }}
                            className="flex-1 h-14 bg-slate-50 text-slate-500 font-bold rounded-2xl hover:bg-slate-100 transition-all text-sm active:scale-95"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="flex-2 h-14 bg-primary text-white font-bold rounded-2xl hover:bg-primary-hover transition-all shadow-xl shadow-primary/20 flex items-center justify-center gap-3 active:scale-95"
                        >
                            {selectedBusiness ? 'Update Business' : 'Launch Venue'}
                        </button>
                    </div>
                </form>
            </Modal>
        </AdminSidebar>
    );
}
