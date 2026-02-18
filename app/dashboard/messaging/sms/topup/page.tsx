'use client';

import React, { useState } from 'react';
import PageHeader from '@/components/dashboard/PageHeader';
import { useMessagingStore } from '@/lib/store/useMessagingStore';
import { Wallet, Plus, ShieldCheck } from 'lucide-react';
import TopUpModal from '@/components/messaging/TopUpModal';

export default function SMSTopUpPage() {
    const { wallet } = useMessagingStore();
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <div className="p-4 md:p-8 space-y-8 max-w-4xl mx-auto">
            <PageHeader
                title="SMS Wallet"
                description="Purchase points to reach customers via SMS globally."
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white rounded-[2.5rem] border border-gray-100 p-8 shadow-sm">
                    <p className="text-[10px] font-black text-text-secondary uppercase tracking-[0.2em] mb-2">Current Balance</p>
                    <p className="text-4xl font-display font-black text-text-main mb-8">
                        {wallet.credits.toLocaleString()} <span className="text-lg text-primary">Pts</span>
                    </p>
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="w-full h-14 bg-primary text-white font-black uppercase tracking-widest text-xs rounded-2xl shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3"
                    >
                        <Plus size={18} />
                        Purchase Points
                    </button>
                </div>

                <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white">
                    <ShieldCheck className="text-emerald-400 mb-4" size={32} />
                    <h4 className="font-bold text-lg mb-2 text-white">Carrier Pricing</h4>
                    <p className="text-xs text-slate-400 leading-relaxed mb-6">We use local routes for maximum delivery. SMS costs vary by region but are fixed in points.</p>
                    <button className="text-xs font-bold text-emerald-400 hover:underline">View Rate Card</button>
                </div>
            </div>

            <TopUpModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </div>
    );
}
