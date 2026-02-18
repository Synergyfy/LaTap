'use client';

import React from 'react';
import PageHeader from '@/components/dashboard/PageHeader';
import { useMessagingStore } from '@/lib/store/useMessagingStore';
import { Phone, Send, CheckCircle, Clock, Smartphone } from 'lucide-react';
import { motion } from 'framer-motion';

export default function SMSOverviewPage() {
    const { stats } = useMessagingStore();

    const channelStats = [
        { label: 'SMS Sent', value: '2,415', icon: Send, color: 'text-blue-600', bg: 'bg-blue-50' },
        { label: 'Delivery Rate', value: '94%', icon: CheckCircle, color: 'text-green-600', bg: 'bg-green-50' },
        { label: 'Carrier Reach', value: '100%', icon: Smartphone, color: 'text-orange-600', bg: 'bg-orange-50' },
    ];

    return (
        <div className="p-4 md:p-8 space-y-8">
            <PageHeader
                title="SMS Channel"
                description="Reach your customers directly on their mobile phones via high-delivery SMS."
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {channelStats.map((stat, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="p-6 bg-white rounded-2xl border border-gray-100 shadow-sm"
                    >
                        <div className={`p-3 rounded-xl w-fit mb-4 ${stat.bg} ${stat.color}`}>
                            <stat.icon size={24} />
                        </div>
                        <p className="text-sm font-bold text-text-secondary uppercase tracking-wider">{stat.label}</p>
                        <p className="text-3xl font-display font-black text-text-main mt-1">{stat.value}</p>
                    </motion.div>
                ))}
            </div>

            <div className="bg-white rounded-[2.5rem] border border-gray-100 p-8 shadow-sm">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h3 className="text-xl font-display font-black text-text-main">SMS Gateway</h3>
                        <p className="text-sm text-text-secondary">Using Tier-1 Global SMS Carriers for maximum reliability.</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                        <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100 italic text-sm text-text-secondary">
                            "Direct, fast, and effective. Use SMS for time-sensitive offers and verification codes."
                        </div>
                        <div className="flex gap-4">
                            <button className="flex-1 h-12 bg-primary text-white font-bold rounded-xl hover:bg-primary-hover transition-all">
                                New Campaign
                            </button>
                            <button className="flex-1 h-12 bg-gray-100 text-text-main font-bold rounded-xl hover:bg-gray-200 transition-all">
                                Top Up Points
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
