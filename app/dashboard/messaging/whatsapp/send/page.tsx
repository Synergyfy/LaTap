'use client';

import React, { useState } from 'react';
import PageHeader from '@/components/dashboard/PageHeader';
import { useMessagingStore } from '@/lib/store/useMessagingStore';
import { MessageSquare, Users, Send, FileText, Smartphone, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { notify } from '@/lib/notify';

export default function WhatsAppSendPage() {
    const { templates, addBroadcast } = useMessagingStore();
    const [selectedTemplate, setSelectedTemplate] = useState('');
    const [audience, setAudience] = useState('All Customers');

    const whatsappTemplates = templates.filter(t => t.channel === 'WhatsApp' || t.channel === 'Any');

    const handleSend = () => {
        if (!selectedTemplate) {
            notify.error('Please select a template first');
            return;
        }

        addBroadcast({
            id: `broad-${Date.now()}`,
            name: templates.find(t => t.id === selectedTemplate)?.name || 'WhatsApp Broadcast',
            channel: 'WhatsApp',
            audienceSize: 842,
            sent: 0,
            delivered: 0,
            status: 'Scheduled',
            timestamp: Date.now()
        });

        notify.success('WhatsApp broadcast scheduled successfully!');
    };

    return (
        <div className="p-4 md:p-8 space-y-8 max-w-4xl mx-auto">
            <PageHeader
                title="Send WhatsApp Message"
                description="Broadcast a verified template to your audience."
            />

            <div className="bg-white rounded-[2.5rem] border border-gray-100 p-8 shadow-sm space-y-8">
                {/* Steps */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                        <div>
                            <label className="text-[10px] font-black text-slate-700 uppercase tracking-widest block mb-2">1. Select Audience</label>
                            <div className="relative">
                                <Users className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                <select
                                    value={audience}
                                    onChange={(e) => setAudience(e.target.value)}
                                    className="w-full h-14 pl-12 pr-4 bg-gray-50 border border-transparent rounded-2xl font-bold text-sm focus:bg-white focus:border-primary/20 outline-none transition-all"
                                >
                                    <option>All Customers (842)</option>
                                    <option>New Visitors (120)</option>
                                    <option>VIP Customers (45)</option>
                                    <option>Inactive (30 days) (215)</option>
                                </select>
                            </div>
                        </div>

                        <div>
                            <label className="text-[10px] font-black text-slate-700 uppercase tracking-widest block mb-2">2. Choose Template</label>
                            <div className="relative">
                                <FileText className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                <select
                                    value={selectedTemplate}
                                    onChange={(e) => setSelectedTemplate(e.target.value)}
                                    className="w-full h-14 pl-12 pr-4 bg-gray-50 border border-transparent rounded-2xl font-bold text-sm focus:bg-white focus:border-primary/20 outline-none transition-all"
                                >
                                    <option value="">Select a WhatsApp Template</option>
                                    {whatsappTemplates.map(tpl => (
                                        <option key={tpl.id} value={tpl.id}>{tpl.name}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="relative group">
                        <div className="absolute inset-0 bg-primary/5 rounded-3xl border border-dashed border-primary/20 flex flex-col p-6">
                            <label className="text-[10px] font-black text-primary uppercase tracking-widest mb-4">Live Preview</label>
                            {selectedTemplate ? (
                                <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex-1 relative overflow-hidden">
                                    <div className="flex items-center gap-2 mb-3">
                                        <div className="size-8 bg-green-500 rounded-full flex items-center justify-center">
                                            <Smartphone size={14} className="text-white" />
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-black text-text-main line-height-none">VemTap Official</p>
                                            <p className="text-[8px] text-text-secondary line-height-none">WhatsApp Business</p>
                                        </div>
                                    </div>
                                    <div className="p-3 bg-green-50 rounded-xl rounded-tl-none border border-green-100">
                                        <p className="text-[11px] text-text-main leading-relaxed">
                                            {templates.find(t => t.id === selectedTemplate)?.content}
                                        </p>
                                        <p className="text-[8px] text-text-secondary text-right mt-1">10:42 AM</p>
                                    </div>
                                </div>
                            ) : (
                                <div className="flex-1 flex flex-col items-center justify-center text-center text-gray-400">
                                    <AlertCircle size={32} className="mb-2 opacity-20" />
                                    <p className="text-xs font-bold">Select a template <br /> to see preview</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="pt-8 border-t border-gray-50 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <span className="text-[10px] font-black text-text-secondary uppercase">Estimated Cost:</span>
                        <span className="text-sm font-black text-text-main">185 Points</span>
                    </div>
                    <button
                        onClick={handleSend}
                        className="h-14 px-8 bg-primary text-white font-black uppercase tracking-widest text-xs rounded-2xl shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all flex items-center gap-3"
                    >
                        <Send size={18} />
                        Launch Broadcast
                    </button>
                </div>
            </div>
        </div>
    );
}
