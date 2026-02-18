'use client';

import React, { useState } from 'react';
import PageHeader from '@/components/dashboard/PageHeader';
import { useMessagingStore } from '@/lib/store/useMessagingStore';
import { Mail, Users, FileText, Layout, Send, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { notify } from '@/lib/notify';

export default function EmailSendPage() {
    const { templates, addBroadcast } = useMessagingStore();
    const [selectedTemplate, setSelectedTemplate] = useState('');
    const [subject, setSubject] = useState('');

    const emailTemplates = templates.filter(t => t.channel === 'Email' || t.channel === 'Any');

    const handleSend = () => {
        if (!selectedTemplate || !subject) {
            notify.error('Please fill in both subject and template');
            return;
        }

        addBroadcast({
            id: `broad-${Date.now()}`,
            name: subject,
            channel: 'Email',
            audienceSize: 4500,
            sent: 0,
            delivered: 0,
            status: 'Scheduled',
            timestamp: Date.now()
        });

        notify.success('Email campaign scheduled successfully!');
    };

    return (
        <div className="p-4 md:p-8 space-y-8 max-w-5xl mx-auto">
            <PageHeader
                title="Create Email Campaign"
                description="Design and send beautiful email newsletters to your subscriber list."
            />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white rounded-[2.5rem] border border-gray-100 p-8 shadow-sm space-y-6">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-slate-700 uppercase tracking-widest">Email Subject</label>
                            <input
                                type="text"
                                value={subject}
                                onChange={(e) => setSubject(e.target.value)}
                                placeholder="What's your email about?"
                                className="w-full h-14 px-4 bg-gray-50 border border-transparent rounded-2xl font-bold text-sm focus:bg-white focus:border-primary/20 outline-none transition-all"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-slate-700 uppercase tracking-widest">Select Template</label>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {emailTemplates.map(tpl => (
                                    <button
                                        key={tpl.id}
                                        onClick={() => setSelectedTemplate(tpl.id)}
                                        className={`p-4 rounded-2xl border-2 transition-all text-left ${selectedTemplate === tpl.id
                                                ? 'border-primary bg-primary/5'
                                                : 'border-slate-100 bg-white hover:border-slate-200'
                                            }`}
                                    >
                                        <Layout size={20} className={selectedTemplate === tpl.id ? 'text-primary' : 'text-slate-400'} />
                                        <p className="font-bold text-text-main mt-3 text-sm">{tpl.name}</p>
                                        <p className="text-[10px] text-text-secondary mt-1">{tpl.category}</p>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="bg-white rounded-[2.5rem] border border-gray-100 p-8 shadow-sm">
                        <h3 className="text-lg font-display font-black text-text-main uppercase mb-6">Campaign Summary</h3>
                        <div className="space-y-4">
                            <div className="flex justify-between py-2 border-b border-gray-50 text-xs">
                                <span className="text-text-secondary font-medium">Recipients</span>
                                <span className="font-black text-text-main">4,500 users</span>
                            </div>
                            <div className="flex justify-between py-2 border-b border-gray-50 text-xs">
                                <span className="text-text-secondary font-medium">Estimated Cost</span>
                                <span className="font-black text-primary">1,200 Points</span>
                            </div>
                        </div>

                        <button
                            onClick={handleSend}
                            className="w-full h-14 bg-primary text-white font-black uppercase tracking-widest text-xs rounded-2xl shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3 mt-8"
                        >
                            <Send size={18} />
                            Send Campaign
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
