'use client';

import React from 'react';
import PageHeader from '@/components/dashboard/PageHeader';
import { Plus, Search, Filter, MoreVertical, MessageSquare } from 'lucide-react';
import { motion } from 'framer-motion';

const SMS_TEMPLATES = [
    { id: 'sms1', name: 'Welcome Offer', category: 'Marketing', status: 'Approved', content: 'Welcome to VemTap! Use code WELCOME10 for 10% off your next visit.' },
    { id: 'sms2', name: 'Table Ready', category: 'Utility', status: 'Approved', content: 'Hi {name}, your table is now ready! See you at the entrance.' },
    { id: 'sms3', name: 'Review Request', category: 'Marketing', status: 'Approved', content: 'How was your experience today? Rate us here: {link}' },
];

export default function SMSTemplatesPage() {
    return (
        <div className="p-4 md:p-8 space-y-8">
            <div className="flex items-center justify-between">
                <PageHeader
                    title="SMS Templates"
                    description="Quick-send templates for your SMS campaigns."
                />
                <button className="h-12 px-6 bg-primary text-white font-bold rounded-xl flex items-center gap-2 shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all">
                    <Plus size={18} />
                    New Template
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {SMS_TEMPLATES.map((tpl, i) => (
                    <motion.div
                        key={tpl.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm hover:shadow-md transition-all group"
                    >
                        <div className="flex items-center justify-between mb-4">
                            <span className="px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-slate-50 text-slate-600">
                                {tpl.category}
                            </span>
                            <button className="p-1 text-gray-400 hover:text-text-main">
                                <MoreVertical size={16} />
                            </button>
                        </div>
                        <h4 className="font-bold text-text-main mb-2">{tpl.name}</h4>
                        <div className="p-4 bg-gray-50 rounded-xl border border-gray-100 text-xs text-text-secondary leading-relaxed font-medium">
                            {tpl.content}
                        </div>
                        <div className="mt-4 flex items-center justify-between">
                            <span className="text-[10px] font-black text-gray-400 uppercase tracking-tighter">{tpl.content.length} characters</span>
                            <button className="text-xs font-bold text-primary hover:underline">Preview</button>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
