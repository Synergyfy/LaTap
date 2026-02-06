'use client';

import React, { useState } from 'react';
import DashboardSidebar from '@/components/dashboard/DashboardSidebar';
import PageHeader from '@/components/dashboard/PageHeader';
import StatsCard from '@/components/dashboard/StatsCard';
import ChartCard from '@/components/dashboard/ChartCard';
import DataTable, { Column } from '@/components/dashboard/DataTable';
import CreateRewardModal from '@/components/dashboard/CreateRewardModal';
import PreviewRewardModal from '@/components/dashboard/PreviewRewardModal';
import DeleteConfirmationModal from '@/components/dashboard/DeleteConfirmationModal';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { dashboardApi } from '@/lib/api/dashboard';
import { Reward } from '@/lib/store/mockDashboardStore';
import toast from 'react-hot-toast';
import { Gift, DollarSign, Award, Star, Plus, Settings, Trash2, X, HelpCircle, ArrowRight, MessageSquare, CheckCircle2, Eye } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function LoyaltyOverviewPage() {
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [editingReward, setEditingReward] = useState<Reward | null>(null);
    const [previewReward, setPreviewReward] = useState<Reward | null>(null);
    const [deleteRewardId, setDeleteRewardId] = useState<string | null>(null);
    const [showRulesModal, setShowRulesModal] = useState(false);
    const queryClient = useQueryClient();

    const { data, isLoading } = useQuery({
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

    const updateRewardMutation = useMutation({
        mutationFn: dashboardApi.updateReward,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['dashboard'] });
            setIsCreateModalOpen(false);
            setEditingReward(null);
            toast.success('Reward updated successfully');
        }
    });

    const deleteRewardMutation = useMutation({
        mutationFn: dashboardApi.deleteReward,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['dashboard'] });
            setDeleteRewardId(null);
            toast.success('Reward deleted');
        }
    });

    const toggleMutation = useMutation({
        mutationFn: ({ id, active }: { id: string, active: boolean }) =>
            dashboardApi.updateReward({ id, updates: { active } }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['dashboard'] });
            toast.success('Reward status updated');
        }
    });

    const handleCreateReward = (formData: Omit<Reward, 'id' | 'active'>) => {
        if (editingReward) {
            updateRewardMutation.mutate({ id: editingReward.id, updates: formData });
        } else {
            const newReward: Reward = {
                id: Math.random().toString(36).substr(2, 9),
                ...formData,
                active: true
            };
            createRewardMutation.mutate(newReward);
        }
    };

    const confirmDeleteReward = () => {
        if (deleteRewardId) {
            deleteRewardMutation.mutate(deleteRewardId);
        }
    }

    const loyaltyStats = [
        { label: 'Active members', value: '1,284', icon: Gift, color: 'blue', trend: { value: '+8%', isUp: true } },
        { label: 'Points issued', value: '45.2k', icon: DollarSign, color: 'green', trend: { value: '+12%', isUp: true } },
        { label: 'Redemptions', value: '312', icon: Award, color: 'purple', trend: { value: '+5%', isUp: true } },
        { label: 'Avg points/user', value: '352', icon: Star, color: 'yellow', trend: { value: '+15%', isUp: true } },
    ];

    interface Member {
        id: string;
        name: string;
        points: number;
        visits: number;
        level: string;
    }

    const topMembers: Member[] = [
        { id: '1', name: 'Bisi Adebowale', points: 1250, visits: 24, level: 'Platinum' },
        { id: '2', name: 'Alex Johnson', points: 840, visits: 12, level: 'Gold' },
        { id: '3', name: 'Sarah Williams', points: 720, visits: 15, level: 'Gold' },
        { id: '4', name: 'David Okafor', points: 410, visits: 8, level: 'Silver' },
    ];

    const columns: Column<Member>[] = [
        {
            header: 'Member',
            accessor: (item: Member) => (
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xs">
                        {item.name.split(' ').map((n: string) => n[0]).join('')}
                    </div>
                    <span className="font-bold text-text-main">{item.name}</span>
                </div>
            )
        },
        { header: 'Total visits', accessor: (item: Member) => <span className="font-bold">{item.visits}</span> },
        { header: 'Visit Count', accessor: 'visits' },
        {
            header: 'Tier level',
            accessor: (item: Member) => (
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${item.level === 'Platinum' ? 'bg-indigo-100 text-indigo-700' :
                    item.level === 'Gold' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-slate-100 text-slate-700'
                    }`}>
                    {item.level}
                </span>
            )
        },
    ];

    return (
        <DashboardSidebar>
            <div className="p-8">
                <PageHeader
                    title="Loyalty program"
                    description="Monitor customer rewards and engagement metrics"
                    actions={
                        <div className="flex gap-3">
                            <button
                                onClick={() => setShowRulesModal(true)}
                                className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 text-text-main font-bold rounded-xl hover:bg-gray-50 transition-all text-sm shadow-sm"
                            >
                                <Settings size={18} />
                                Loyalty rules
                            </button>
                            <button
                                onClick={() => {
                                    setEditingReward(null);
                                    setIsCreateModalOpen(true);
                                }}
                                className="flex items-center gap-2 px-4 py-2.5 bg-primary text-white font-bold rounded-xl hover:bg-primary-hover transition-all text-sm shadow-md shadow-primary/20"
                            >
                                <Plus size={18} />
                                New reward
                            </button>
                        </div>
                    }
                />

                <CreateRewardModal
                    isOpen={isCreateModalOpen}
                    initialData={editingReward}
                    onClose={() => {
                        setIsCreateModalOpen(false);
                        setEditingReward(null);
                    }}
                    onSubmit={handleCreateReward}
                    isLoading={createRewardMutation.isPending || updateRewardMutation.isPending}
                />

                <PreviewRewardModal
                    isOpen={!!previewReward}
                    onClose={() => setPreviewReward(null)}
                    rewardTitle={previewReward?.title || 'Reward'}
                    businessName={data?.businessName || 'Your Business'}
                />

                <DeleteConfirmationModal
                    isOpen={!!deleteRewardId}
                    onClose={() => setDeleteRewardId(null)}
                    onConfirm={confirmDeleteReward}
                    title="Delete Reward?"
                    description="This action cannot be undone. Customers will no longer be able to earn or redeem this reward."
                    isLoading={deleteRewardMutation.isPending}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {loyaltyStats.map((stat, index) => (
                        <StatsCard key={index} {...stat as any} />
                    ))}
                </div>

                {/* Active Rewards Section */}
                <div className="mb-8">
                    <h2 className="text-xl font-display font-bold text-text-main mb-4">Active rewards</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {data?.rewards.map((reward: Reward) => (
                            <div key={reward.id} className="bg-white rounded-xl p-6 border border-gray-200 flex flex-col justify-between hover:shadow-lg transition-all group">
                                <div onClick={() => setPreviewReward(reward)} className="cursor-pointer">
                                    <div className="flex items-start justify-between mb-4">
                                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${reward.active ? 'bg-purple-50 text-purple-600' : 'bg-gray-50 text-gray-400'} group-hover:scale-110 transition-transform`}>
                                            <Gift size={24} />
                                        </div>
                                        <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                                            <button
                                                onClick={() => toggleMutation.mutate({ id: reward.id, active: !reward.active })}
                                                className={`px-2 py-1 rounded-md text-[10px] font-bold transition-colors ${reward.active ? 'bg-green-50 text-green-600 hover:bg-green-100' : 'bg-gray-100 text-gray-400 hover:bg-gray-200'}`}
                                            >
                                                {reward.active ? 'Active' : 'Inactive'}
                                            </button>
                                            <button
                                                onClick={() => setDeleteRewardId(reward.id)}
                                                className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-500 transition-colors"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </div>
                                    <h3 className={`font-bold text-lg mb-1 ${reward.active ? 'text-text-main' : 'text-gray-400'}`}>{reward.title}</h3>
                                    <p className="text-sm text-text-secondary mb-4 line-clamp-2">{reward.description}</p>

                                    <div className="flex items-center gap-2 text-xs font-bold text-primary mb-2 opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0">
                                        <Eye size={14} />
                                        Click card to preview
                                    </div>
                                </div>
                                <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                                    <div className={`flex items-center gap-1.5 ${reward.active ? 'text-orange-500' : 'text-gray-400'}`}>
                                        <Star size={16} />
                                        <span className="text-sm font-bold">{reward.points} visits</span>
                                    </div>
                                    <button
                                        onClick={() => {
                                            setEditingReward(reward);
                                            setIsCreateModalOpen(true);
                                        }}
                                        className="text-sm font-bold text-primary hover:underline transition-all"
                                    >
                                        Edit details
                                    </button>
                                </div>
                            </div>
                        ))}
                        {(!data?.rewards || data.rewards.length === 0) && (
                            <div className="col-span-full py-12 flex flex-col items-center justify-center bg-gray-50 rounded-xl border-2 border-dashed border-gray-200">
                                <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                                    <Gift className="text-gray-400" size={32} />
                                </div>
                                <p className="text-text-secondary font-medium mb-4">No active rewards found</p>
                                <button
                                    onClick={() => setIsCreateModalOpen(true)}
                                    className="text-primary font-bold text-sm hover:underline"
                                >
                                    Create your first reward
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
                    <div className="lg:col-span-2">
                        <ChartCard title="Redemption Trends" subtitle="Daily reward usage over time">
                            <div className="h-64 flex items-end justify-between px-4 pb-4">
                                {[12, 18, 25, 40, 30, 45, 60, 55, 30, 25, 40, 50, 45, 80, 55, 40, 35, 60, 75, 90, 85, 100, 95, 80, 70, 60, 50, 40, 30, 20].map((v, i) => (
                                    <div key={i} className="flex-1 bg-primary/20 rounded-t-sm hover:bg-primary transition-all group relative cursor-pointer" style={{ height: `${v}%` }}>
                                        <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-[10px] font-bold py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-20">
                                            {Math.floor(v * 0.5)} redeems
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </ChartCard>
                    </div>

                    <ChartCard title="Tier Distribution" subtitle="Customer base segment breakdown">
                        <div className="h-full flex flex-col justify-center space-y-6">
                            {[
                                { name: 'Platinum', count: '156', p: '12%', color: 'bg-indigo-500' },
                                { name: 'Gold', count: '412', p: '32%', color: 'bg-yellow-500' },
                                { name: 'Silver', count: '716', p: '56%', color: 'bg-slate-400' },
                            ].map((tier, i) => (
                                <div key={i} className="space-y-2">
                                    <div className="flex justify-between text-xs font-bold">
                                        <span className="text-text-main">{tier.name}</span>
                                        <span className="text-text-secondary">{tier.count} ({tier.p})</span>
                                    </div>
                                    <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                                        <div className={`h-full ${tier.color} rounded-full`} style={{ width: tier.p }}></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </ChartCard>
                </div>

                <DataTable
                    columns={columns}
                    data={topMembers}
                    onRowClick={(item) => console.log('Member clicked:', item)}
                />

                {/* Rules Modal */}
                <AnimatePresence>
                    {showRulesModal && (
                        <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="absolute inset-0 bg-text-main/80 backdrop-blur-xl"
                                onClick={() => setShowRulesModal(false)}
                            />
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                                className="relative w-full max-w-2xl bg-white rounded-2xl overflow-hidden shadow-2xl"
                            >
                                <div className="p-10">
                                    <div className="flex justify-between items-start mb-10">
                                        <div className="flex items-center gap-4">
                                            <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                                                <HelpCircle size={28} />
                                            </div>
                                            <div>
                                                <h2 className="text-2xl font-display font-bold text-text-main">Loyalty system guide</h2>
                                                <p className="text-sm font-medium text-text-secondary">How your reward logic works for customers</p>
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => setShowRulesModal(false)}
                                            className="p-3 hover:bg-gray-100 rounded-full transition-colors text-text-secondary"
                                        >
                                            <X size={24} />
                                        </button>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
                                        <div className="p-6 bg-gray-50 rounded-xl border border-gray-100">
                                            <div className="flex items-center gap-3 mb-4 text-primary">
                                                <ArrowRight size={20} />
                                                <h4 className="font-bold text-sm text-text-main">Visit threshold</h4>
                                            </div>
                                            <p className="text-xs text-text-secondary font-medium leading-relaxed">
                                                The milestone a customer must reach to unlock a reward. For example, if set to <strong>5</strong>, their 5th check-in will trigger the reward screen.
                                            </p>
                                        </div>

                                        <div className="p-6 bg-gray-50 rounded-xl border border-gray-100">
                                            <div className="flex items-center gap-3 mb-4 text-orange-600">
                                                <Gift size={20} />
                                                <h4 className="font-bold text-sm text-text-main">Digital redemption</h4>
                                            </div>
                                            <p className="text-xs text-text-secondary font-medium leading-relaxed">
                                                When a user reaches the threshold, they see your <strong>reward message</strong>. They must show this screen to your staff to claim it physically.
                                            </p>
                                        </div>

                                        <div className="p-6 bg-gray-50 rounded-xl border border-gray-100">
                                            <div className="flex items-center gap-3 mb-4 text-blue-600">
                                                <MessageSquare size={20} />
                                                <h4 className="font-bold text-sm text-text-main">Dynamic tokens</h4>
                                            </div>
                                            <p className="text-xs text-text-secondary font-medium leading-relaxed">
                                                Personalize messages with <code className="text-primary font-bold">{"{name}"}</code>, <code className="text-primary font-bold">{"{visits}"}</code> (total visits), or <code className="text-primary font-bold">{"{remaining}"}</code>.
                                            </p>
                                        </div>

                                        <div className="p-6 bg-gray-50 rounded-xl border border-gray-100">
                                            <div className="flex items-center gap-3 mb-4 text-green-600">
                                                <CheckCircle2 size={20} />
                                                <h4 className="font-bold text-sm text-text-main">Automatic reset</h4>
                                            </div>
                                            <p className="text-xs text-text-secondary font-medium leading-relaxed">
                                                After a customer successfully redeems their reward, their visit count subtracts the threshold and starts building toward the next one.
                                            </p>
                                        </div>
                                    </div>

                                    <button
                                        onClick={() => setShowRulesModal(false)}
                                        className="w-full h-16 bg-primary text-white font-bold rounded-xl hover:bg-primary-hover shadow-xl shadow-primary/20 transition-all flex items-center justify-center"
                                    >
                                        Got it, proceed
                                    </button>
                                </div>
                            </motion.div>
                        </div>
                    )}
                </AnimatePresence>
            </div>
        </DashboardSidebar>
    );
}
