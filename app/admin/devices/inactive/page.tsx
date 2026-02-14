'use client';

import React from 'react';
export default function AdminInactiveDevicesPage() {
    return (
        <>
            <div className="p-8">
                <div className="mb-8">
                    <h1 className="text-2xl font-display font-black text-text-main tracking-tight">Inactive Inventory</h1>
                    <p className="text-sm text-gray-500 font-medium">Provision storage and unlinked hardware</p>
                </div>

                <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center">
                    <div className="size-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
                        <span className="material-icons-round text-3xl text-gray-300">inventory_2</span>
                    </div>
                    <p className="text-gray-500">Inventory tracking module pending.</p>
                </div>
            </div>
        </>
    );
}
