'use client';

import React from 'react';
import AdminSidebar from '@/components/admin/AdminSidebar';

export default function AdminPendingBusinessesPage() {
    return (
        <AdminSidebar>
            <div className="p-8">
                <div className="mb-8">
                    <h1 className="text-2xl font-display font-black text-text-main tracking-tight">Pending Approvals</h1>
                    <p className="text-sm text-gray-500 font-medium">Review and verify new business registrations</p>
                </div>

                <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center">
                    <div className="size-20 bg-orange-50 rounded-full flex items-center justify-center mx-auto mb-6">
                        <span className="material-icons-round text-3xl text-orange-400">pending_actions</span>
                    </div>
                    <h2 className="text-xl font-bold text-text-main mb-2">Queue is clear!</h2>
                    <p className="text-sm text-gray-500 max-w-sm mx-auto">
                        There are no businesses currently waiting for approval.
                    </p>
                </div>
            </div>
        </AdminSidebar>
    );
}
