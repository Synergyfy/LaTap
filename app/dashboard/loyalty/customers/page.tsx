"use client";

import React, { useEffect, useState } from 'react';
import PageHeader from '@/components/dashboard/PageHeader';
import DataTable, { Column } from '@/components/dashboard/DataTable';
import { useLoyaltyStore } from '@/store/loyaltyStore';
import { LoyaltyProfile } from '@/types/loyalty';
import { User, Star, Trophy, Search, Filter } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function LoyaltyCustomersPage() {
    const { profiles, isLoading } = useLoyaltyStore();
    const [searchTerm, setSearchTerm] = useState('');

    // Business ID is hardcoded for demo
    const businessId = 'bistro_001';

    // For MVC, we might not have a "list all profiles" API yet,
    // so we'll simulate some data if the list is empty
    const customerList: LoyaltyProfile[] = Object.values(profiles).length > 0
        ? Object.values(profiles).filter(p => p.businessId === businessId)
        : [
            { id: '1', userId: 'user_001', businessId, currentPointsBalance: 1250, totalPointsEarned: 5000, pointsRedeemed: 3750, tierLevel: 'platinum', lastVisitDate: new Date().toISOString(), lastRewardedAt: null, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
            { id: '2', userId: 'user_002', businessId, currentPointsBalance: 450, totalPointsEarned: 800, pointsRedeemed: 350, tierLevel: 'silver', lastVisitDate: new Date().toISOString(), lastRewardedAt: null, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
            { id: '3', userId: 'user_003', businessId, currentPointsBalance: 2100, totalPointsEarned: 3500, pointsRedeemed: 1400, tierLevel: 'gold', lastVisitDate: new Date().toISOString(), lastRewardedAt: null, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
        ];

    const columns: Column<LoyaltyProfile>[] = [
        {
            header: 'Customer',
            accessor: (item: LoyaltyProfile) => (
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 font-bold text-xs border border-slate-200">
                        <User className="w-4 h-4" />
                    </div>
                    <div className="flex flex-col">
                        <span className="font-bold text-slate-900 uppercase"># {item.userId.substring(0, 8)}</span>
                        <span className="text-[10px] text-slate-400 font-black tracking-widest uppercase">Member ID</span>
                    </div>
                </div>
            )
        },
        {
            header: 'Tier Level',
            accessor: (item: LoyaltyProfile) => (
                <span className={cn(
                    "px-2 py-0.5 rounded-none text-[10px] font-black uppercase tracking-widest border",
                    item.tierLevel === 'platinum' ? 'bg-indigo-50 text-indigo-700 border-indigo-100' :
                        item.tierLevel === 'gold' ? 'bg-yellow-50 text-yellow-700 border-yellow-100' :
                            item.tierLevel === 'silver' ? 'bg-slate-50 text-slate-700 border-slate-200' :
                                'bg-orange-50 text-orange-700 border-orange-100'
                )}>
                    {item.tierLevel}
                </span>
            )
        },
        {
            header: 'Balance',
            accessor: (item: LoyaltyProfile) => (
                <div className="flex items-center gap-1.5 font-black text-slate-900">
                    <Star className="w-3.5 h-3.5 text-primary" />
                    {item.currentPointsBalance.toLocaleString()}
                </div>
            )
        },
        {
            header: 'Lifetime Earned',
            accessor: (item: LoyaltyProfile) => (
                <div className="flex items-center gap-1.5 font-bold text-slate-500">
                    <Trophy className="w-3.5 h-3.5 text-slate-300" />
                    {item.totalPointsEarned.toLocaleString()}
                </div>
            )
        },
        {
            header: 'Last Visit',
            accessor: (item: LoyaltyProfile) => (
                <span className="text-xs font-medium text-slate-500">
                    {new Date(item.lastVisitDate).toLocaleDateString()}
                </span>
            )
        },
    ];

    return (
        <div className="p-8 space-y-8">
            <PageHeader
                title="Member Directory"
                description="Manage and engage your loyal customer base"
            />

            <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-white p-4 border border-slate-200 shadow-sm">
                <div className="relative flex-1 w-full">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                        type="text"
                        placeholder="Search by User ID or Member ID..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full h-11 pl-11 pr-4 bg-slate-50 border border-slate-100 text-sm font-medium outline-none focus:border-primary transition-all"
                    />
                </div>
                <button className="flex items-center gap-2 px-6 h-11 border border-slate-200 text-xs font-black uppercase tracking-widest text-slate-600 hover:bg-slate-50 transition-all">
                    <Filter className="w-4 h-4" />
                    More Filters
                </button>
            </div>

            <div className="bg-white border border-slate-200 shadow-sm overflow-hidden">
                <DataTable
                    columns={columns}
                    data={customerList.filter(c => c.userId.toLowerCase().includes(searchTerm.toLowerCase()))}
                    onRowClick={(item) => console.log('Customer clicked:', item)}
                />
            </div>
        </div>
    );
}
