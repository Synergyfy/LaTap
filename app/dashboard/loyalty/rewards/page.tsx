"use client";

import React, { useEffect } from 'react';
import DashboardSidebar from '@/components/dashboard/DashboardSidebar';
import PageHeader from '@/components/dashboard/PageHeader';
import { RewardManager } from '@/components/loyalty/admin/RewardManager';
import { useLoyaltyStore } from '@/store/loyaltyStore';
import { Reward } from '@/types/loyalty';

export default function RewardManagementPage() {
    const { availableRewards, fetchRewards, createReward, updateReward, isLoading } = useLoyaltyStore();

    // Business ID is hardcoded for demo
    const businessId = 'bistro_001';

    useEffect(() => {
        fetchRewards(businessId);
    }, []);

    const handleCreate = async (reward: Partial<Reward>) => {
        await createReward(businessId, reward);
    };

    const handleUpdate = async (id: string, updates: Partial<Reward>) => {
        await updateReward(businessId, id, updates);
    };

    return (
        <DashboardSidebar>
            <div className="p-8 space-y-8">
                <PageHeader
                    title="Reward Catalog"
                    description="Create and manage what your customers can redeem"
                />

                {isLoading && availableRewards.length === 0 ? (
                    <div className="flex items-center justify-center p-24">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                    </div>
                ) : (
                    <RewardManager
                        rewards={availableRewards}
                        onCreate={handleCreate}
                        onUpdate={handleUpdate}
                    />
                )}
            </div>
        </DashboardSidebar>
    );
}
