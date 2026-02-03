'use client';

import React from 'react';
import AdminSidebar from '@/components/admin/AdminSidebar';

export default function AdminSubscriptionsPage() {
    return (
        <AdminSidebar>
            <div className="p-8">
                <div className="mb-8">
                    <h1 className="text-2xl font-display font-black text-text-main tracking-tight">Financial & Subscriptions</h1>
                    <p className="text-sm text-gray-500 font-medium">Monitor revenue and manage business plans</p>
                </div>

                <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center">
                    <div className="size-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
                        <span className="material-icons-round text-3xl text-gray-300">credit_card</span>
                    </div>
                    <h2 className="text-xl font-bold text-text-main mb-2">Billing module pending</h2>
                    <p className="text-sm text-gray-500 max-w-sm mx-auto">
                        Transaction history, subscription tiers, and payout management will be available here.
                    </p>
                </div>
            </div>
        </AdminSidebar>
    );
}
