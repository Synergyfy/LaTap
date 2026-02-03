'use client';

import React from 'react';
import AdminSidebar from '@/components/admin/AdminSidebar';

export default function AdminUsersPage() {
    return (
        <AdminSidebar>
            <div className="p-8">
                <div className="mb-8 flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-display font-black text-text-main tracking-tight">User Management</h1>
                        <p className="text-sm text-gray-500 font-medium">Manage and monitor all platform users</p>
                    </div>
                </div>

                <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center">
                    <div className="size-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
                        <span className="material-icons-round text-3xl text-gray-300">people</span>
                    </div>
                    <h2 className="text-xl font-bold text-text-main mb-2">Users modules coming soon</h2>
                    <p className="text-sm text-gray-500 max-w-sm mx-auto">
                        This section is currently under development. Here you will be able to manage all registered users on the platform.
                    </p>
                </div>
            </div>
        </AdminSidebar>
    );
}
