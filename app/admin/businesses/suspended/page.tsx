'use client';

import React from 'react';
import AdminSidebar from '@/components/admin/AdminSidebar';

export default function AdminSuspendedBusinessesPage() {
    return (
        <AdminSidebar>
            <div className="p-8">
                <div className="mb-8">
                    <h1 className="text-2xl font-display font-black text-text-main tracking-tight">Suspended Businesses</h1>
                    <p className="text-sm text-gray-500 font-medium">Manage accounts with restricted access</p>
                </div>

                <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center text-gray-400">
                    <span className="material-icons-round text-6xl mb-4">block</span>
                    <p className="font-bold">No suspended accounts found.</p>
                </div>
            </div>
        </AdminSidebar>
    );
}
