'use client';

import React from 'react';
import { StepForm } from '@/components/visitor/StepForm';
import { useCustomerFlowStore } from '@/store/useCustomerFlowStore';

export default function NewUserPreview() {
    const { storeName, logoUrl } = useCustomerFlowStore();

    return (
        <div className="min-h-[80vh] flex items-center justify-center p-4 bg-gray-50/50 rounded-[3rem] border-4 border-dashed border-gray-100">
            <div className="w-full max-w-md">
                <div className="mb-8 text-center text-text-secondary">
                    <p className="text-xs font-black uppercase tracking-widest bg-white inline-block px-4 py-1.5 rounded-full border border-gray-100 shadow-sm">
                        Live Preview Mode: New User
                    </p>
                </div>

                <StepForm
                    storeName={storeName || "Your Store"}
                    logoUrl={logoUrl}
                    onBack={() => alert('Back clicked')}
                    onSubmit={(data) => alert('Form submitted: ' + JSON.stringify(data))}
                />

                <div className="mt-8 bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
                    <h4 className="text-sm font-black text-slate-900 uppercase tracking-tight mb-4 flex items-center gap-2">
                        <span className="size-2 bg-primary rounded-full animate-pulse" />
                        Preview Controls
                    </h4>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Flow Type</label>
                            <p className="text-sm font-bold text-slate-700">First-time Visitor</p>
                        </div>
                        <div className="space-y-1">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</label>
                            <p className="text-sm font-bold text-emerald-500">Unidentified</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
