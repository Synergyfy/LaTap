'use client';

import React from 'react';
import PageHeader from '@/components/dashboard/PageHeader';
import { useMessagingStore } from '@/lib/store/useMessagingStore';
import { MessageSquare, Plus, Search, Filter, MoreVertical, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const WHATSAPP_TEMPLATES = [
    { id: 'wa1', name: 'Order Confirmation', category: 'Utility', status: 'Approved', content: 'Hi {name}, your order #{order_id} has been confirmed!' },
    { id: 'wa2', name: 'Flash Sale Alert', category: 'Marketing', status: 'Pending', content: 'Hey {name}, our 50% off sale starts in 1 hour! Don\'t miss out.' },
    { id: 'wa3', name: 'OTP Verification', category: 'Authentication', status: 'Approved', content: 'Your VemTap verification code is {code}.' },
];

export default function WhatsAppTemplatesPage() {
    return (
        <div className="p-4 md:p-8 space-y-8">
            <div className="flex items-center justify-between">
                <PageHeader
                    title="WhatsApp Templates"
                    description="Manage your pre-approved Meta message templates."
                />
                <button className="h-12 px-6 bg-primary text-white font-bold rounded-xl flex items-center gap-2 shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all">
                    <Plus size={18} />
                    Create Template
                </button>
            </div>

            <div className="flex items-center gap-4 bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
                <div className="flex-1 relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input
                        type="text"
                        placeholder="Search templates..."
                        className="w-full h-12 pl-12 pr-4 bg-gray-50 border border-transparent rounded-xl focus:bg-white focus:border-primary/20 outline-none transition-all text-sm font-medium"
                    />
                </div>
                <button className="h-12 px-4 bg-gray-50 text-text-secondary rounded-xl hover:bg-gray-100 transition-all">
                    <Filter size={18} />
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {WHATSAPP_TEMPLATES.map((tpl, i) => (
                    <motion.div
                        key={tpl.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm hover:shadow-md transition-all group"
                    >
                        <div className="flex items-center justify-between mb-4">
                            <span className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${tpl.category === 'Marketing' ? 'bg-orange-50 text-orange-600' :
                                    tpl.category === 'Utility' ? 'bg-blue-50 text-blue-600' :
                                        'bg-purple-50 text-purple-600'
                                }`}>
                                {tpl.category}
                            </span>
                            <div className="flex items-center gap-2">
                                <span className={`text-[9px] font-black uppercase ${tpl.status === 'Approved' ? 'text-green-500' : 'text-amber-500'
                                    }`}>
                                    {tpl.status}
                                </span>
                                <button className="p-1 text-gray-400 hover:text-text-main">
                                    <MoreVertical size={16} />
                                </button>
                            </div>
                        </div>
                        <h4 className="font-bold text-text-main mb-2">{tpl.name}</h4>
                        <div className="p-4 bg-gray-50 rounded-xl border border-gray-100 text-xs text-text-secondary leading-relaxed font-medium">
                            {tpl.content}
                        </div>
                        <div className="mt-4 flex items-center justify-between">
                            <span className="text-[10px] font-black text-gray-400 uppercase tracking-tighter">ID: {tpl.id}</span>
                            <button className="text-xs font-bold text-primary hover:underline">Edit Code</button>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
