'use client';

import React from 'react';
import PageHeader from '@/components/dashboard/PageHeader';
import { Plus, Search, Mail, FileText, Image as ImageIcon } from 'lucide-react';
import { motion } from 'framer-motion';

const EMAIL_TEMPLATES = [
    { id: 'em1', name: 'Monthly Newsletter', type: 'Rich HTML', lastUsed: '2 days ago', thumbnail: '📧' },
    { id: 'em2', name: 'Customer Appreciation', type: 'Standard', lastUsed: '5 days ago', thumbnail: '🎁' },
    { id: 'em3', name: 'Abandoned Cart', type: 'Automation', lastUsed: 'Never', thumbnail: '🛒' },
];

export default function EmailTemplatesPage() {
    return (
        <div className="p-4 md:p-8 space-y-8">
            <div className="flex items-center justify-between">
                <PageHeader
                    title="Email Designer"
                    description="Create and manage your email marketing templates."
                />
                <button className="h-12 px-6 bg-primary text-white font-bold rounded-xl flex items-center gap-2 shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all">
                    <Plus size={18} />
                    Design New Email
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {EMAIL_TEMPLATES.map((tpl, i) => (
                    <motion.div
                        key={tpl.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-md transition-all group"
                    >
                        <div className="h-40 bg-slate-50 flex items-center justify-center text-4xl border-b border-gray-100">
                            {tpl.thumbnail}
                        </div>
                        <div className="p-6">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest">{tpl.type}</span>
                                <span className="text-[10px] text-text-secondary font-medium italic">Used {tpl.lastUsed}</span>
                            </div>
                            <h4 className="font-bold text-text-main mb-4">{tpl.name}</h4>
                            <div className="flex gap-2">
                                <button className="flex-1 py-2 bg-gray-50 text-text-main text-xs font-bold rounded-lg hover:bg-gray-100 transition-all border border-gray-200">
                                    Preview
                                </button>
                                <button className="flex-1 py-2 bg-primary/5 text-primary text-xs font-bold rounded-lg hover:bg-primary/10 transition-all border border-primary/20">
                                    Edit Layout
                                </button>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
