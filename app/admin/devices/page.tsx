'use client';

import React, { useState } from 'react';
import AdminSidebar from '@/components/admin/AdminSidebar';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { dashboardApi } from '@/lib/api/dashboard';
import { Device } from '@/lib/store/mockDashboardStore';
import toast from 'react-hot-toast';
import { Plus, Search, Filter, Download, MoreVertical, Trash2, Cpu } from 'lucide-react';

export default function AdminDevicesPage() {
    const queryClient = useQueryClient();
    const [searchQuery, setSearchQuery] = useState('');
    const [filterStatus, setFilterStatus] = useState('all');
    const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);

    // Fetch Devices from store
    const { data: storeData, isLoading } = useQuery({
        queryKey: ['dashboard'],
        queryFn: dashboardApi.fetchDashboardData,
    });

    const devices = storeData?.devices || [];

    const addDeviceMutation = useMutation({
        mutationFn: dashboardApi.addDevice,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['dashboard'] });
            setIsRegisterModalOpen(false);
            toast.success('Device registered successfully');
        }
    });

    const deleteDeviceMutation = useMutation({
        mutationFn: dashboardApi.deleteDevice,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['dashboard'] });
            toast.success('Device removed');
        }
    });

    const handleRegisterDevice = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const deviceData = {
            id: formData.get('id') as string,
            type: formData.get('type') as any,
            assignedTo: formData.get('assignedTo') as string || 'Unassigned',
        };

        if (devices.some(d => d.id === deviceData.id)) {
            toast.error('Device ID already exists');
            return;
        }

        addDeviceMutation.mutate(deviceData);
    };

    const handleDeleteDevice = (id: string) => {
        if (confirm(`Are you sure you want to remove device ${id}?`)) {
            deleteDeviceMutation.mutate(id);
        }
    };

    const stats = [
        { label: 'Total Devices', value: devices.length.toLocaleString(), icon: 'nfc', color: 'blue' },
        { label: 'Active Devices', value: devices.filter(d => d.status === 'active').length.toLocaleString(), icon: 'check_circle', color: 'green' },
        { label: 'Unassigned', value: devices.filter(d => d.assignedTo === 'Unassigned').length.toLocaleString(), icon: 'inventory_2', color: 'orange' },
        { label: 'Low Battery', value: '0', icon: 'battery_alert', color: 'red' },
    ];

    const filteredDevices = devices.filter(device => {
        const matchesSearch = device.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
            device.assignedTo.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStatus = filterStatus === 'all' || device.status === filterStatus;
        return matchesSearch && matchesStatus;
    });

    return (
        <AdminSidebar>
            <div className="p-8">
                {/* Page Header */}
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-3xl font-display font-bold text-text-main mb-2">Device Management</h1>
                        <p className="text-text-secondary font-medium">Control and provision NFC hardware devices</p>
                    </div>
                    <button
                        onClick={() => setIsRegisterModalOpen(true)}
                        className="px-6 py-3 bg-primary text-white font-bold rounded-xl hover:bg-primary-hover transition-all flex items-center gap-2 shadow-lg shadow-primary/20 active:scale-95"
                    >
                        <Plus size={18} />
                        Register Device
                    </button>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {stats.map((stat, index) => (
                        <div key={index} className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
                            <div className="flex items-center gap-4">
                                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${stat.color === 'green' ? 'bg-green-50' :
                                        stat.color === 'orange' ? 'bg-orange-50' :
                                            stat.color === 'red' ? 'bg-red-50' :
                                                'bg-blue-50'
                                    }`}>
                                    <span className={`material-icons-round text-xl ${stat.color === 'green' ? 'text-green-600' :
                                            stat.color === 'orange' ? 'text-orange-600' :
                                                stat.color === 'red' ? 'text-red-600' :
                                                    'text-blue-600'
                                        }`}>{stat.icon}</span>
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
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                            <input
                                type="text"
                                placeholder="Search by Device ID or assigned business..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full h-12 pl-10 pr-4 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:bg-white transition-all"
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
                                <option value="inactive">Inactive</option>
                            </select>
                            <button className="h-12 px-6 bg-white border border-gray-200 text-text-main font-bold rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2">
                                <Download size={18} />
                                Export
                            </button>
                        </div>
                    </div>
                </div>

                {/* Devices Table */}
                <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50 border-b border-gray-200">
                                <tr>
                                    <th className="text-left py-4 px-6 text-xs font-black uppercase tracking-wider text-text-secondary">Device ID</th>
                                    <th className="text-left py-4 px-6 text-xs font-black uppercase tracking-wider text-text-secondary">Type</th>
                                    <th className="text-left py-4 px-6 text-xs font-black uppercase tracking-wider text-text-secondary">Assigned To</th>
                                    <th className="text-left py-4 px-6 text-xs font-black uppercase tracking-wider text-text-secondary">Last Active</th>
                                    <th className="text-left py-4 px-6 text-xs font-black uppercase tracking-wider text-text-secondary">Status</th>
                                    <th className="text-right py-4 px-6 text-xs font-black uppercase tracking-wider text-text-secondary">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {isLoading ? (
                                    <tr>
                                        <td colSpan={6} className="py-12 text-center">
                                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
                                        </td>
                                    </tr>
                                ) : filteredDevices.length === 0 ? (
                                    <tr>
                                        <td colSpan={6} className="py-12 text-center text-text-secondary font-medium">
                                            No devices found matching your criteria.
                                        </td>
                                    </tr>
                                ) : (
                                    filteredDevices.map((device) => (
                                        <tr key={device.id} className="hover:bg-gray-50 transition-colors group">
                                            <td className="py-4 px-6">
                                                <div className="flex items-center gap-3">
                                                    <div className="p-2 bg-gray-100 rounded-lg group-hover:bg-primary/10 transition-colors">
                                                        <Cpu className="text-gray-400 group-hover:text-primary" size={16} />
                                                    </div>
                                                    <span className="font-bold text-sm text-text-main font-mono">{device.id}</span>
                                                </div>
                                            </td>
                                            <td className="py-4 px-6">
                                                <span className="text-sm font-bold text-text-secondary bg-gray-100 px-2.5 py-1 rounded-md">
                                                    {device.type}
                                                </span>
                                            </td>
                                            <td className="py-4 px-6">
                                                {device.assignedTo === 'Unassigned' ? (
                                                    <span className="text-sm text-gray-400 font-medium italic">Unassigned</span>
                                                ) : (
                                                    <div className="flex items-center gap-2">
                                                        <span className="material-icons-round text-primary text-sm">store</span>
                                                        <span className="text-sm font-bold text-text-main">{device.assignedTo}</span>
                                                    </div>
                                                )}
                                            </td>
                                            <td className="py-4 px-6 text-sm text-text-secondary font-medium">{device.lastActive}</td>
                                            <td className="py-4 px-6">
                                                <span className={`inline-flex px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${device.status === 'active' ? 'bg-green-50 text-green-600' : 'bg-gray-100 text-gray-500'
                                                    }`}>
                                                    {device.status}
                                                </span>
                                            </td>
                                            <td className="py-4 px-6 text-right">
                                                <button
                                                    onClick={() => handleDeleteDevice(device.id)}
                                                    className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                                                >
                                                    <Trash2 size={18} />
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Register Modal */}
            {isRegisterModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setIsRegisterModalOpen(false)}></div>
                    <div className="relative w-full max-w-md bg-white rounded-2xl p-8 shadow-2xl animate-in fade-in zoom-in duration-200">
                        <div className="flex items-center justify-between mb-6">
                            <div>
                                <h2 className="text-2xl font-display font-bold text-text-main">Register NFC Device</h2>
                                <p className="text-sm text-text-secondary">Add a new hardware piece to the platform</p>
                            </div>
                            <button onClick={() => setIsRegisterModalOpen(false)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                                <Plus size={24} className="rotate-45 text-text-secondary" />
                            </button>
                        </div>

                        <form onSubmit={handleRegisterDevice} className="space-y-4">
                            <div>
                                <label className="block text-xs font-black uppercase tracking-widest text-text-secondary mb-2">Device Serial ID</label>
                                <input
                                    name="id"
                                    required
                                    placeholder="e.g. NFC-XXXX-XXXX"
                                    className="w-full h-12 px-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:bg-white transition-all font-mono text-sm"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-black uppercase tracking-widest text-text-secondary mb-2">Device Type</label>
                                <select
                                    name="type"
                                    className="w-full h-12 px-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:bg-white transition-all font-bold text-sm"
                                >
                                    <option value="Card">NFC Card</option>
                                    <option value="Sticker">NFC Sticker</option>
                                    <option value="Fob">Key Fob</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-xs font-black uppercase tracking-widest text-text-secondary mb-2">Assign to Business (Optional)</label>
                                <input
                                    name="assignedTo"
                                    placeholder="e.g. Green Terrace Cafe"
                                    className="w-full h-12 px-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:bg-white transition-all font-bold text-sm"
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={addDeviceMutation.isPending}
                                className="w-full h-14 bg-primary text-white font-bold rounded-xl hover:bg-primary-hover transition-all shadow-lg shadow-primary/20 flex items-center justify-center gap-2 mt-6 active:scale-95 disabled:opacity-50"
                            >
                                {addDeviceMutation.isPending ? (
                                    <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                ) : (
                                    <>
                                        <Cpu size={20} />
                                        Complete Registration
                                    </>
                                )}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </AdminSidebar>
    );
}
