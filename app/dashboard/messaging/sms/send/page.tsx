'use client';

import React, { useState } from 'react';
import PageHeader from '@/components/dashboard/PageHeader';
import { useMessagingStore } from '@/lib/store/useMessagingStore';
import { Send, Users, FileText, Smartphone, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { notify } from '@/lib/notify';

export default function SMSSendPage() {
    const { templates, addBroadcast } = useMessagingStore();
    const [selectedTemplate, setSelectedTemplate] = useState('');
    const [audience, setAudience] = useState('All Customers');

    const smsTemplates = templates.filter(t => t.channel === 'SMS' || t.channel === 'Any');

    const handleSend = () => {
        if (!selectedTemplate) {
            notify.error('Please select a template first');
            return;
        }

        addBroadcast({
            id: `broad-${Date.now()}`,
            name: templates.find(t => t.id === selectedTemplate)?.name || 'SMS Broadcast',
            channel: 'SMS',
            audienceSize: 1540,
            sent: 0,
            delivered: 0,
            status: 'Scheduled',
            timestamp: Date.now()
        });

        notify.success('SMS broadcast scheduled successfully!');
    };

    return (
        <div className="p-4 md:p-8 space-y-8 max-w-4xl mx-auto">
            <PageHeader
                title="Launch SMS Campaign"
                description="Send targeted text messages to your customers worldwide."
            />

            <div className="bg-white rounded-[2.5rem] border border-gray-100 p-8 shadow-sm space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                        <div>
                            <label className="text-[10px] font-black text-slate-700 uppercase tracking-widest block mb-2">Target Audience</label>
                            <div className="relative">
                                <Users className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                <select
                                    value={audience}
                                    onChange={(e) => setAudience(e.target.value)}
                                    className="w-full h-14 pl-12 pr-4 bg-gray-50 border border-transparent rounded-2xl font-bold text-sm focus:bg-white focus:border-primary/20 outline-none transition-all"
                                >
                                    <option>All Mobile Users (1,540)</option>
                                    <option>Local Customers (840)</option>
                                    <option>International (700)</option>
                                </select>
                            </div>
                        </div>

                        <div>
                            <label className="text-[10px] font-black text-slate-700 uppercase tracking-widest block mb-2">Template</label>
                            <div className="relative">
                                <FileText className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                <select
                                    value={selectedTemplate}
                                    onChange={(e) => setSelectedTemplate(e.target.value)}
                                    className="w-full h-14 pl-12 pr-4 bg-gray-50 border border-transparent rounded-2xl font-bold text-sm focus:bg-white focus:border-primary/20 outline-none transition-all"
                                >
                                    <option value="">Choose an SMS Template</option>
                                    {smsTemplates.map(tpl => (
                                        <option key={tpl.id} value={tpl.id}>{tpl.name}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="relative group">
                        <div className="absolute inset-0 bg-primary/5 rounded-3xl border border-dashed border-primary/20 flex flex-col p-6">
                            <label className="text-[10px] font-black text-primary uppercase tracking-widest mb-4">Device Preview</label>
                            {selectedTemplate ? (
                                <div className="bg-white p-4 rounded-2xl shadow-sm border-x border-b border-gray-100 flex-1 relative overflow-hidden max-w-[240px] mx-auto border-t-20 border-t-slate-900 rounded-t-3xl">
                                    <div className="p-3 bg-slate-100 rounded-2xl text-[10px] text-text-main leading-relaxed relative">
                                        {templates.find(t => t.id === selectedTemplate)?.content}
                                        <div className="absolute -left-2 top-2 w-0 h-0 border-t-8 border-t-transparent border-r-10 border-r-slate-100 border-b-8 border-b-transparent" />
                                    </div>
                                    <p className="text-[8px] text-slate-400 text-center mt-4 uppercase font-black">SMS Message</p>
                                </div>
                            ) : (
                                <div className="flex-1 flex flex-col items-center justify-center text-center text-gray-400">
                                    <AlertCircle size={32} className="mb-2 opacity-20" />
                                    <p className="text-xs font-bold">Preview will appear <br /> once template is selected</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="pt-8 border-t border-gray-50 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <span className="text-[10px] font-black text-text-secondary uppercase">Balance Cost:</span>
                        <span className="text-sm font-black text-text-main">350 Points</span>
                    </div>
                    <button
                        onClick={handleSend}
                        className="h-14 px-8 bg-primary text-white font-black uppercase tracking-widest text-xs rounded-2xl shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all flex items-center gap-3"
                    >
                        <Send size={18} />
                        Deliver SMS
                    </button>
                </div>
            </div>
        </div>
    );
}
