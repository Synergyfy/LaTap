'use client';

import React from 'react';
import PageHeader from '@/components/dashboard/PageHeader';
import { useMessagingStore } from '@/lib/store/useMessagingStore';
import { MessageSquare, Phone, Mail, LayoutDashboard, Wallet, CreditCard, Send, CheckCircle, Clock, Smartphone } from 'lucide-react';
import { motion } from 'framer-motion';

export default function WhatsAppOverviewPage() {
    const { wallet, stats } = useMessagingStore();

    const channelStats = [
        { label: 'Messages Sent', value: '842', icon: Send, color: 'text-blue-600', bg: 'bg-blue-50' },
        { label: 'Delivered', value: '98%', icon: CheckCircle, color: 'text-green-600', bg: 'bg-green-50' },
        { label: 'Avg. Response', value: '12m', icon: Clock, color: 'text-purple-600', bg: 'bg-purple-50' },
    ];

    return (
        <div className="p-4 md:p-8 space-y-8">
            <PageHeader
                title="WhatsApp Channel"
                description="Manage your WhatsApp Business communications and campaign performance."
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
                        <h3 className="text-xl font-display font-black text-text-main">Connection Status</h3>
                        <p className="text-sm text-text-secondary">Your WhatsApp Business API integration is active.</p>
                    </div>
                    <div className="flex items-center gap-2 px-4 py-2 bg-green-50 text-green-700 rounded-full border border-green-100">
                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                        <span className="text-[10px] font-black uppercase tracking-wider">Connected</span>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                        <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100 italic text-sm text-text-secondary">
                            "Perfect for sending automated confirmation messages and marketing broadcasts to your WhatsApp audience."
                        </div>
                        <div className="flex gap-4">
                            <button className="flex-1 h-12 bg-primary text-white font-bold rounded-xl hover:bg-primary-hover transition-all">
                                Send Broadcast
                            </button>
                            <button className="flex-1 h-12 bg-gray-100 text-text-main font-bold rounded-xl hover:bg-gray-200 transition-all">
                                View Templates
                            </button>
                        </div>
                    </div>
                    <div className="relative">
                        <div className="absolute inset-0 bg-primary/5 rounded-2xl border border-dashed border-primary/20 flex flex-col items-center justify-center p-6 text-center">
                            <Smartphone className="text-primary mb-3" size={32} />
                            <h4 className="font-bold text-text-main">Verified Display Name</h4>
                            <p className="text-xs text-text-secondary mt-1">VemTap Official</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
