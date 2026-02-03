'use client';

import React from 'react';
import AdminSidebar from '@/components/admin/AdminSidebar';

export default function AdminActiveDevicesPage() {
    return (
        <AdminSidebar>
            <div className="p-8">
                <div className="mb-8">
                    <h1 className="text-2xl font-display font-black text-text-main tracking-tight">Active Devices</h1>
                    <p className="text-sm text-gray-500 font-medium">Monitoring currently deployed NFC hardware</p>
                </div>

                <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center">
                    <div className="size-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
                        <span className="material-icons-round text-3xl text-green-500">cellular_reporting</span>
                    </div>
                    <p className="text-gray-500">All systems operational.</p>
                </div>
            </div>
        </AdminSidebar>
    );
}
