"use client";

import React, { useEffect } from 'react';
import PageHeader from '@/components/dashboard/PageHeader';
import { LoyaltySettings } from '@/components/loyalty/admin/LoyaltySettings';
import { useLoyaltyStore } from '@/store/loyaltyStore';
import { LoyaltyRule } from '@/types/loyalty';

export default function LoyaltySettingsPage() {
    const { rules, fetchRules, updateRules, isLoading } = useLoyaltyStore();

    // Business ID is hardcoded for demo
    const businessId = 'bistro_001';

    useEffect(() => {
        fetchRules(businessId);
    }, []);

    const handleSave = async (updates: Partial<LoyaltyRule>) => {
        await updateRules(businessId, updates);
    };

    return (
        <div className="p-8 space-y-8">
            <PageHeader
                title="Program Settings"
                description="Configure how your loyalty program operates"
            />

            {isLoading && !rules ? (
                <div className="flex items-center justify-center p-24">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                </div>
            ) : rules ? (
                <LoyaltySettings
                    rules={rules}
                    onSave={handleSave}
                />
            ) : null}
        </div>
    );
}
