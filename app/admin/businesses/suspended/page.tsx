'use client';

import React, { useState } from 'react';
import Notification from '@/components/ui/Notification';
import { notify } from '@/lib/notify';

export default function AdminSuspendedBusinessesPage() {
    const [searchQuery, setSearchQuery] = useState('');

    const suspendedBusinesses = [
        {
            id: 1,
            name: 'Restaurant 360',
            owner: 'David Brown',
            email: 'david@restaurant360.com',
            reason: 'Payment Default',
            suspendedDate: '2023-12-05',
            daysSuspended: 60,
            balance: '-₦15,000'
        },
        {
            id: 2,
            name: 'Night Owls Club',
            owner: 'Sarah Connor',
            email: 'sarah@nightowls.com',
            reason: 'Terms Violation',
            suspendedDate: '2024-01-20',
            daysSuspended: 14,
            balance: '₦0'
        },
        {
            id: 3,
            name: 'Quick Mart',
            owner: 'James Olayinka',
            email: 'james@quickmart.ng',
            reason: 'Fraudulent Activity',
            suspendedDate: '2024-02-01',
            daysSuspended: 2,
            balance: '₦50,000'
        },
    ];

    const handleReactivate = (name: string) => {
        // In a real app, this would make an API call
        notify.success(`${name} has been marked for reactivation.`);
    };

    return (
        <div className="p-8">
            {/* Page Header */}
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-display font-bold text-text-main mb-2">Suspended Businesses</h1>
                    <p className="text-text-secondary font-medium">Manage accounts with restricted access</p>
                </div>
            </div>

            {/* Warning Banner using Notification Component */}
            <Notification
                type="error"
                title="Action Required"
                message="These businesses are currently blocked from accessing the platform. Resolving their status will restore their access immediately."
                className="mb-8"
            />

            {/* Search */}
            <div className="bg-white rounded-xl p-6 border border-gray-200 mb-6">
                <div className="relative">
                    <span className="material-icons-round absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg">
                        search
                    </span>
                    <input
                        type="text"
                        placeholder="Search suspended businesses..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full h-12 pl-10 pr-4 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:bg-white transition-all"
                    />
                </div>
            </div>

            {/* Suspended List */}
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50 border-b border-gray-200">
                            <tr>
                                <th className="text-left py-4 px-6 text-xs font-black uppercase tracking-wider text-text-secondary">Business</th>
                                <th className="text-left py-4 px-6 text-xs font-black uppercase tracking-wider text-text-secondary">Owner</th>
                                <th className="text-left py-4 px-6 text-xs font-black uppercase tracking-wider text-text-secondary">Reason</th>
                                <th className="text-left py-4 px-6 text-xs font-black uppercase tracking-wider text-text-secondary">Outstanding Balance</th>
                                <th className="text-left py-4 px-6 text-xs font-black uppercase tracking-wider text-text-secondary">Suspended Since</th>
                                <th className="text-left py-4 px-6 text-xs font-black uppercase tracking-wider text-text-secondary">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {suspendedBusinesses.map((biz) => (
                                <tr key={biz.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                                    <td className="py-4 px-6">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center">
                                                <span className="material-icons-round text-red-500 text-sm">block</span>
                                            </div>
                                            <span className="font-bold text-sm text-text-main">{biz.name}</span>
                                        </div>
                                    </td>
                                    <td className="py-4 px-6">
                                        <div className="text-sm">
                                            <p className="font-medium text-text-main">{biz.owner}</p>
                                            <p className="text-text-secondary text-xs">{biz.email}</p>
                                        </div>
                                    </td>
                                    <td className="py-4 px-6">
                                        <span className="inline-flex px-3 py-1 rounded-full text-xs font-bold bg-red-100 text-red-700">
                                            {biz.reason}
                                        </span>
                                    </td>
                                    <td className="py-4 px-6 font-mono font-bold text-sm text-text-main">
                                        {biz.balance}
                                    </td>
                                    <td className="py-4 px-6">
                                        <p className="text-sm font-medium text-text-main">{biz.suspendedDate}</p>
                                        <p className="text-xs text-text-secondary">{biz.daysSuspended} days ago</p>
                                    </td>
                                    <td className="py-4 px-6">
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => handleReactivate(biz.name)}
                                                className="px-3 py-1.5 bg-green-50 text-green-600 font-bold rounded text-xs hover:bg-green-100 transition-colors"
                                            >
                                                Reactivate
                                            </button>
                                            <button className="px-3 py-1.5 text-text-secondary font-bold rounded text-xs hover:bg-gray-100 transition-colors border border-gray-200">
                                                View Case
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
