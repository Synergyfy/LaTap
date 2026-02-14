'use client';

import React, { useState } from 'react';

export default function AdminPendingBusinessesPage() {
    const [searchQuery, setSearchQuery] = useState('');

    const pendingBusinesses = [
        {
            id: 1,
            name: 'Urban Eats Bistro',
            owner: 'Michael Chen',
            email: 'michael@urbaneats.com',
            type: 'Restaurant',
            submitted: '2 hours ago',
            documents: ['Business License', 'ID Card']
        },
        {
            id: 2,
            name: 'Swift Logistics',
            owner: 'Amara Nwachukwu',
            email: 'amara@swiftlogistics.ng',
            type: 'Logistics',
            submitted: '5 hours ago',
            documents: ['CAC Certificate', 'Utility Bill']
        },
        {
            id: 3,
            name: 'Glitz & Glamour Salon',
            owner: 'Jessica Doe',
            email: 'jess@glitz.com',
            type: 'Beauty & Wellness',
            submitted: '1 day ago',
            documents: ['Business License']
        },
        {
            id: 4,
            name: 'NextGen Tech Store',
            owner: 'David Johnson',
            email: 'dave@nextgen.com',
            type: 'Retail',
            submitted: '1 day ago',
            documents: ['CAC Certificate', 'Tax Clearance']
        },
    ];

    return (
        <div className="p-8">
            {/* Page Header */}
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-display font-bold text-text-main mb-2">Pending Approvals</h1>
                    <p className="text-text-secondary font-medium">Review and verify new business registrations</p>
                </div>
            </div>

            {/* Queue Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white rounded-xl p-6 border border-gray-200">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-orange-50 flex items-center justify-center">
                            <span className="material-icons-round text-xl text-orange-600">pending_actions</span>
                        </div>
                        <div>
                            <p className="text-xs font-bold uppercase tracking-wider text-text-secondary mb-1">In Queue</p>
                            <p className="text-2xl font-display font-bold text-text-main">4 Requests</p>
                        </div>
                    </div>
                </div>
                <div className="bg-white rounded-xl p-6 border border-gray-200">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center">
                            <span className="material-icons-round text-xl text-blue-600">access_time</span>
                        </div>
                        <div>
                            <p className="text-xs font-bold uppercase tracking-wider text-text-secondary mb-1">Avg. Wait Time</p>
                            <p className="text-2xl font-display font-bold text-text-main">3.5 Hours</p>
                        </div>
                    </div>
                </div>
                <div className="bg-white rounded-xl p-6 border border-gray-200">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center">
                            <span className="material-icons-round text-xl text-green-600">check_circle</span>
                        </div>
                        <div>
                            <p className="text-xs font-bold uppercase tracking-wider text-text-secondary mb-1">Approved Today</p>
                            <p className="text-2xl font-display font-bold text-text-main">12 Businesses</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Search */}
            <div className="bg-white rounded-xl p-6 border border-gray-200 mb-6">
                <div className="relative">
                    <span className="material-icons-round absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg">
                        search
                    </span>
                    <input
                        type="text"
                        placeholder="Search pending applications..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full h-12 pl-10 pr-4 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:bg-white transition-all"
                    />
                </div>
            </div>

            {/* Applications List */}
            <div className="space-y-4">
                {pendingBusinesses.map((biz) => (
                    <div key={biz.id} className="bg-white rounded-xl border border-gray-200 p-6 flex flex-col md:flex-row items-center justify-between gap-6 hover:shadow-md transition-shadow">
                        <div className="flex items-center gap-4 flex-1">
                            <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                                <span className="material-icons-round text-primary text-xl">store</span>
                            </div>
                            <div>
                                <h3 className="font-bold text-lg text-text-main">{biz.name}</h3>
                                <div className="flex items-center gap-2 text-sm text-text-secondary mb-1">
                                    <span className="font-medium text-text-main">{biz.owner}</span>
                                    <span>•</span>
                                    <span>{biz.email}</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className="text-xs font-bold text-text-secondary bg-gray-100 px-2 py-1 rounded">
                                        {biz.type}
                                    </span>
                                    <span className="text-xs text-orange-600 font-bold bg-orange-50 px-2 py-1 rounded flex items-center gap-1">
                                        <span className="material-icons-round text-[10px]">schedule</span>
                                        Submitted {biz.submitted}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col items-end gap-2">
                            <p className="text-xs font-bold text-text-secondary mb-1">Required Documents</p>
                            <div className="flex gap-2">
                                {biz.documents.map((doc, idx) => (
                                    <span key={idx} className="flex items-center gap-1 text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded font-bold border border-blue-100 cursor-pointer hover:bg-blue-100">
                                        <span className="material-icons-round text-[10px]">description</span>
                                        {doc}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div className="flex items-center gap-2 pt-4 md:pt-0 border-t md:border-t-0 border-gray-100 w-full md:w-auto mt-4 md:mt-0 justify-end">
                            <button className="px-4 py-2 border border-red-200 text-red-600 font-bold rounded-lg text-sm hover:bg-red-50 transition-colors">
                                Reject
                            </button>
                            <button className="px-6 py-2 bg-primary text-white font-bold rounded-lg text-sm hover:bg-primary-hover transition-colors shadow-lg shadow-primary/20">
                                Approve Application
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
