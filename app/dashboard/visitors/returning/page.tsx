'use client';

import React, { useState } from 'react';
import DashboardSidebar from '@/components/dashboard/DashboardSidebar';
import PageHeader from '@/components/dashboard/PageHeader';
import StatsCard from '@/components/dashboard/StatsCard';
import DataTable, { Column } from '@/components/dashboard/DataTable';
import EmptyState from '@/components/dashboard/EmptyState';
import CreateRewardModal from '@/components/dashboard/CreateRewardModal';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { dashboardApi } from '@/lib/api/dashboard';
import { Reward } from '@/lib/store/mockDashboardStore';
import toast from 'react-hot-toast';
import { Repeat, Users, Star, AlertTriangle, Gift, Award } from 'lucide-react';

interface ReturningVisitor {
    id: string;
    name: string;
    email: string;
    phone: string;
    totalVisits: number;
    frequency: string;
    lastVisit: string;
    status: string;
}

export default function ReturningVisitorsPage() {
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const queryClient = useQueryClient();

    const { data } = useQuery({
        queryKey: ['dashboard'],
        queryFn: dashboardApi.fetchDashboardData,
    });

    const createRewardMutation = useMutation({
        mutationFn: dashboardApi.createReward,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['dashboard'] });
            setIsCreateModalOpen(false);
            toast.success('Reward created successfully');
        }
    });

    const handleCreateReward = (rewardData: Omit<Reward, 'id' | 'active'>) => {
        const newReward: Reward = {
            id: Math.random().toString(36).substr(2, 9),
            ...rewardData,
            active: true
        };
        createRewardMutation.mutate(newReward);
    };

    const handleRewardVisitor = (visitor: ReturningVisitor) => {
        toast.success(`Reward sent to ${visitor.name}!`);
        console.log('Rewarding visitor:', visitor);
    };

    const returningVisitors: ReturningVisitor[] = [
        { id: '1', name: 'Bisi Adebowale', email: 'bisi.a@example.com', phone: '+234 804 567 8901', totalVisits: 24, frequency: 'Weekly', lastVisit: '3 hours ago', status: 'VIP' },
        { id: '2', name: 'Alex Johnson', email: 'alex.j@example.com', phone: '+234 801 234 5678', totalVisits: 12, frequency: 'Bi-weekly', lastVisit: '2 hours ago', status: 'Active' },
        { id: '3', name: 'David Okafor', email: 'd.okafor@example.com', phone: '+234 805 678 9012', totalVisits: 8, frequency: 'Monthly', lastVisit: '2 days ago', status: 'Returning' },
        { id: '4', name: 'Sarah Williams', email: 'sarah.w@example.com', phone: '+234 802 345 6789', totalVisits: 5, frequency: 'Monthly', lastVisit: '5 hours ago', status: 'Active' },
    ];

    const stats = [
        { label: 'Returning Rate', value: '74%', icon: Repeat, color: 'blue' as const, trend: { value: '+4%', isUp: true } },
        { label: 'Repeat Customers', value: '1,842', icon: Users, color: 'green' as const, trend: { value: '+12%', isUp: true } },
        { label: 'VIP Members', value: '156', icon: Star, color: 'yellow' as const, trend: { value: '+8%', isUp: true } },
        { label: 'Churn Risk', value: '12', icon: AlertTriangle, color: 'red' as const, trend: { value: '-2', isUp: true } },
    ];

    const columns: Column<ReturningVisitor>[] = [
        {
            header: 'Visitor',
            accessor: (item: ReturningVisitor) => (
                <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 font-bold text-xs border border-blue-100">
                        {item.name.split(' ').map((n: string) => n[0]).join('')}
                    </div>
                    <div>
                        <p className="font-bold text-text-main">{item.name}</p>
                        <p className="text-xs text-text-secondary">{item.email}</p>
                    </div>
                </div>
            )
        },
        { header: 'Visit Count', accessor: (item: ReturningVisitor) => <span className="font-bold">{item.totalVisits}</span> },
        { header: 'Frequency', accessor: 'frequency' },
        { header: 'Last Visit', accessor: 'lastVisit' },
        {
            header: 'Level',
            accessor: (item: ReturningVisitor) => (
                <span className={`inline-flex px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${item.status === 'VIP' ? 'bg-yellow-100 text-yellow-700' :
                    item.status === 'Returning' ? 'bg-purple-100 text-purple-700' :
                        'bg-blue-100 text-blue-700'
                    }`}>
                    {item.status}
                </span>
            )
        },
        {
            header: 'Actions',
            accessor: (item: ReturningVisitor) => (
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        handleRewardVisitor(item);
                    }}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-primary text-white text-[10px] font-black uppercase tracking-wider rounded-lg hover:bg-primary-hover transition-colors"
                >
                    <Award size={14} />
                    Reward
                </button>
            )
        }
    ];

    return (
        <DashboardSidebar>
            <div className="p-8">
                <PageHeader
                    title="Returning Visitors"
                    description="Monitor loyalty and reward your repeat customers"
                    actions={
                        <button
                            onClick={() => setIsCreateModalOpen(true)}
                            className="flex items-center gap-2 px-4 py-2.5 bg-primary text-white font-bold rounded-xl hover:bg-primary-hover transition-all text-sm shadow-md shadow-primary/20"
                        >
                            <Gift size={18} />
                            Create Reward
                        </button>
                    }
                />

                <CreateRewardModal
                    isOpen={isCreateModalOpen}
                    onClose={() => setIsCreateModalOpen(false)}
                    onSubmit={handleCreateReward}
                    isLoading={createRewardMutation.isPending}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {stats.map((stat, index) => (
                        <StatsCard key={index} {...stat} />
                    ))}
                </div>

                <DataTable
                    columns={columns}
                    data={returningVisitors}
                    onRowClick={(visitor) => console.log('Clicked visitor:', visitor)}
                    emptyState={
                        <EmptyState
                            icon="loop"
                            title="No returning visitors yet"
                            description="Focus on your welcome campaigns to encourage customers to return to your business."
                        />
                    }
                />
            </div>
        </DashboardSidebar>
    );
}
