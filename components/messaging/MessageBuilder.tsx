'use client';

import React, { useState } from 'react';
import { useMessagingStore, Template, MessageChannel } from '@/lib/store/useMessagingStore';
import { messagingApi } from '@/lib/api/messaging';
import { Users, FileText, Send, CheckCircle, Smartphone, MessageSquare, Mail } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';

interface MessageBuilderProps {
    defaultChannel?: MessageChannel;
}

export default function MessageBuilder({ defaultChannel = 'SMS' }: MessageBuilderProps) {
    const router = useRouter();
    const { templates, wallet } = useMessagingStore();
    const [step, setStep] = useState(1);

    // Form State
    const [messageName, setMessageName] = useState('');
    const [channel, setChannel] = useState<MessageChannel>(defaultChannel);
    const [audience, setAudience] = useState('all');
    const [selectedTemplate, setSelectedTemplate] = useState<string>('');
    const [customContent, setCustomContent] = useState('');
    const [isSending, setIsSending] = useState(false);

    // Mock Audience count
    const getAudienceCount = () => {
        if (audience === 'all') return 1240;
        if (audience === 'vip') return 150;
        if (audience === 'new') return 340;
        return 0;
    };

    const count = getAudienceCount();
    const costPerMsg = channel === 'SMS' ? 2.5 : channel === 'WhatsApp' ? 4.0 : 0.5;
    const totalCost = count * costPerMsg;

    const handleSend = async () => {
        setIsSending(true);
        try {
            await messagingApi.sendBroadcast(
                messageName || 'Untitled Message',
                channel,
                count,
                selectedTemplate ? (templates.find(t => t.id === selectedTemplate)?.content || '') : customContent
            );
            toast.success('Message launched successfully!');
            router.push('/dashboard/messaging');
        } catch (error: any) {
            toast.error(error.message || 'Failed to send message');
        } finally {
            setIsSending(false);
        }
    };

    const renderStep1 = () => (
        <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
            <h3 className="text-lg font-bold text-text-main flex items-center gap-2">
                <span className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm border border-primary/20">1</span>
                Message Check
            </h3>

            <div className="space-y-4">
                <div>
                    <label className="block text-xs font-bold uppercase text-text-secondary mb-2">Message Name</label>
                    <input
                        className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl"
                        placeholder="e.g. Weekend Promo"
                        value={messageName}
                        onChange={(e) => setMessageName(e.target.value)}
                    />
                </div>

                <div>
                    <label className="block text-xs font-bold uppercase text-text-secondary mb-2">Select Broadcast Place</label>
                    <div className="grid grid-cols-3 gap-4">
                        {(['WhatsApp', 'SMS', 'Email'] as const).map((c) => (
                            <button
                                key={c}
                                onClick={() => setChannel(c)}
                                className={`p-4 rounded-xl border-2 flex flex-col items-center gap-2 transition-all ${channel === c ? 'border-primary bg-primary/5' : 'border-gray-100 hover:border-gray-200'}`}
                            >
                                {c === 'WhatsApp' ? <MessageSquare size={24} className="text-green-500" /> : c === 'SMS' ? <Smartphone size={24} className="text-blue-500" /> : <Mail size={24} className="text-purple-500" />}
                                <span className="font-bold text-sm">{c}</span>
                            </button>
                        ))}
                    </div>
                </div>

                <div>
                    <label className="block text-xs font-bold uppercase text-text-secondary mb-2">Target Audience</label>
                    <select
                        className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl"
                        value={audience}
                        onChange={(e) => setAudience(e.target.value)}
                    >
                        <option value="all">All Contacts ({1240})</option>
                        <option value="vip">VIP Members ({150})</option>
                        <option value="new">New Visitors (Last 30 days) ({340})</option>
                    </select>
                </div>
            </div>

            <div className="flex justify-end pt-4">
                <button onClick={() => setStep(2)} className="px-6 py-3 bg-primary text-white font-bold rounded-xl hover:bg-primary-hover shadow-lg shadow-primary/20">
                    Next: Compose
                </button>
            </div>
        </div>
    );

    const renderStep2 = () => (
        <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
            <h3 className="text-lg font-bold text-text-main flex items-center gap-2">
                <span className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm border border-primary/20">2</span>
                Compose Message
            </h3>

            <div className="space-y-4">
                <div>
                    <label className="block text-xs font-bold uppercase text-text-secondary mb-2">Template</label>
                    <select
                        className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl mb-2"
                        value={selectedTemplate}
                        onChange={(e) => setSelectedTemplate(e.target.value)}
                    >
                        <option value="">Write Custom Message...</option>
                        {templates.filter(t => t.channel === channel || t.channel === 'Any').map(t => (
                            <option key={t.id} value={t.id}>{t.name}</option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="block text-xs font-bold uppercase text-text-secondary mb-2">Message Content</label>
                    <textarea
                        className="w-full h-40 p-4 bg-gray-50 border border-gray-200 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-primary/10"
                        placeholder="Type your message here..."
                        value={selectedTemplate ? templates.find(t => t.id === selectedTemplate)?.content : customContent}
                        onChange={(e) => !selectedTemplate && setCustomContent(e.target.value)}
                        disabled={!!selectedTemplate}
                    />
                    <p className="text-xs text-text-secondary mt-2 text-right">Preview: {(selectedTemplate ? templates.find(t => t.id === selectedTemplate)?.content : customContent)?.length || 0} characters</p>
                </div>
            </div>

            <div className="flex justify-between pt-4">
                <button onClick={() => setStep(1)} className="px-6 py-3 text-text-secondary hover:text-text-main font-bold">Back</button>
                <button onClick={() => setStep(3)} className="px-6 py-3 bg-primary text-white font-bold rounded-xl hover:bg-primary-hover shadow-lg shadow-primary/20">
                    Next: Review
                </button>
            </div>
        </div>
    );

    const renderStep3 = () => (
        <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
            <div className="text-center py-6">
                <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle size={32} />
                </div>
                <h3 className="text-2xl font-display font-bold text-text-main">Ready to Send?</h3>
                <p className="text-text-secondary">Review your message details before launching.</p>
            </div>

            <div className="bg-gray-50 p-6 rounded-2xl border border-gray-200 space-y-4">
                <div className="flex justify-between items-center pb-4 border-b border-gray-200">
                    <span className="text-sm font-bold text-text-secondary">Message Name</span>
                    <span className="font-bold text-text-main">{messageName || 'Untitled'}</span>
                </div>
                <div className="flex justify-between items-center pb-4 border-b border-gray-200">
                    <span className="text-sm font-bold text-text-secondary">Audience Size</span>
                    <div className="flex items-center gap-2">
                        <Users size={16} className="text-primary" />
                        <span className="font-bold text-text-main">{count.toLocaleString()} Contacts</span>
                    </div>
                </div>
                <div className="flex justify-between items-center pb-4 border-b border-gray-200">
                    <span className="text-sm font-bold text-text-secondary">Estimated Cost</span>
                    <span className="font-mono font-bold text-text-main">{totalCost.toLocaleString()} {wallet.currency}</span>
                </div>
                <div className="pt-2">
                    <span className="text-xs font-bold uppercase text-text-secondary block mb-2">Message Preview</span>
                    <div className="bg-white p-4 rounded-xl border border-gray-200 text-sm italic text-gray-600">
                        "{selectedTemplate ? templates.find(t => t.id === selectedTemplate)?.content : customContent}"
                    </div>
                </div>
            </div>

            <div className="flex justify-between pt-4">
                <button onClick={() => setStep(2)} className="px-6 py-3 text-text-secondary hover:text-text-main font-bold">Back</button>
                <button
                    onClick={handleSend}
                    disabled={isSending || wallet.credits < totalCost}
                    className="px-8 py-3 bg-primary text-white font-bold rounded-xl hover:bg-primary-hover shadow-lg shadow-primary/20 flex items-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isSending ? (
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                        <Send size={18} />
                    )}
                    {wallet.credits < totalCost ? 'Insufficient Funds' : 'Launch Message'}
                </button>
            </div>
        </div>
    );

    return (
        <div className="max-w-2xl mx-auto py-8">
            {step === 1 && renderStep1()}
            {step === 2 && renderStep2()}
            {step === 3 && renderStep3()}
        </div>
    );
}
