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

// Device-style Preview Component
function PhonePreview({ channel, content }: { channel: MessageChannel, content: string }) {
    return (
        <div className="relative w-[280px] h-[480px] bg-slate-900 rounded-[3rem] border-8 border-slate-800 shadow-2xl overflow-hidden">
            {/* Notch */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-slate-800 rounded-b-2xl z-10" />

            {/* Screen Content */}
            <div className={`w-full h-full pt-10 px-4 flex flex-col ${channel === 'WhatsApp' ? 'bg-[#E5DDD5]' : channel === 'Email' ? 'bg-white' : 'bg-white'}`}>
                {/* App Header */}
                <div className={`flex items-center gap-3 p-3 rounded-2xl mb-4 ${channel === 'WhatsApp' ? 'bg-[#075E54] text-white' : 'bg-gray-50 border border-gray-100 text-text-main'}`}>
                    <div className="size-8 rounded-full bg-gray-300 shrink-0" />
                    <div className="flex-1">
                        <p className="text-[10px] font-bold leading-none">{channel === 'Email' ? 'VemTap Support' : 'VemTap'}</p>
                        <p className="text-[8px] opacity-70 leading-none mt-1">{channel === 'WhatsApp' ? 'online' : channel === 'SMS' ? 'Now' : 'support@vemtap.com'}</p>
                    </div>
                </div>

                {/* Message Bubble */}
                {channel === 'Email' ? (
                    <div className="flex-1 overflow-auto">
                        <p className="text-[10px] font-black text-text-main mb-2">Special Offer Just for You!</p>
                        <div className="p-4 bg-white border border-gray-100 rounded-xl text-[10px] text-text-secondary leading-relaxed">
                            {content || 'Your email content will appear here...'}
                        </div>
                    </div>
                ) : (
                    <div className={`max-w-[85%] p-3 rounded-2xl text-[10px] relative shadow-sm ${channel === 'WhatsApp'
                        ? 'bg-white self-start rounded-tl-none'
                        : 'bg-primary text-white self-start rounded-bl-none'
                        }`}>
                        <p className="leading-relaxed">{content || 'Your message will appear here...'}</p>
                        <p className={`text-[8px] mt-1 text-right ${channel === 'WhatsApp' ? 'text-gray-400' : 'text-primary-foreground/70'}`}>
                            12:45 PM
                        </p>

                        {/* Tail for WhatsApp */}
                        {channel === 'WhatsApp' && (
                            <div className="absolute top-0 -left-1.5 w-3 h-3 bg-white clip-path-whatsapp-tail" />
                        )}
                    </div>
                )}
            </div>

            <style jsx>{`
                .clip-path-whatsapp-tail {
                    clip-path: polygon(100% 0, 0 0, 100% 100%);
                }
            `}</style>
        </div>
    );
}

export default function MessageBuilder({ defaultChannel = 'SMS' }: MessageBuilderProps) {
    const router = useRouter();
    const { templates, wallets } = useMessagingStore();
    const [channel, setChannel] = useState<MessageChannel>(defaultChannel);
    const wallet = wallets[channel];
    const [step, setStep] = useState(1);

    // Form State
    const [messageName, setMessageName] = useState('');
    const [audience, setAudience] = useState('all');
    const [selectedTemplate, setSelectedTemplate] = useState<string>('');
    const [templateCategory, setTemplateCategory] = useState('All');
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
                    <label className="block text-xs font-bold uppercase text-text-secondary mb-3">Target Audience</label>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        {[
                            { id: 'all', label: 'All Contacts', sub: '(1,240)', icon: Users },
                            { id: 'new', label: 'New Visitors', sub: '(340)', icon: Smartphone },
                            { id: 'vip', label: 'VIP Members', sub: '(150)', icon: CheckCircle }
                        ].map(opt => (
                            <button
                                key={opt.id}
                                onClick={() => setAudience(opt.id)}
                                className={`p-4 rounded-2xl border-2 transition-all text-left ${audience === opt.id
                                    ? 'border-primary bg-primary/5'
                                    : 'border-gray-100 bg-white hover:border-gray-200'
                                    }`}
                            >
                                <div className="flex items-center justify-between mb-1">
                                    <span className="font-bold text-sm text-text-main">{opt.label}</span>
                                    {audience === opt.id && <div className="size-4 bg-primary rounded-full flex items-center justify-center">
                                        <div className="size-1.5 bg-white rounded-full" />
                                    </div>}
                                </div>
                                <p className="text-[10px] text-text-secondary font-medium uppercase tracking-tighter">{opt.sub}</p>
                            </button>
                        ))}
                    </div>
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
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-[10px] font-black uppercase text-text-secondary mb-2 tracking-widest ml-1">Category</label>
                        <select
                            className="w-full h-12 px-4 bg-gray-50 border border-gray-200 rounded-xl font-bold text-sm outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                            value={templateCategory}
                            onChange={(e) => {
                                setTemplateCategory(e.target.value);
                                setSelectedTemplate('');
                            }}
                        >
                            <option value="All">All Categories</option>
                            <option value="Marketing">Marketing</option>
                            <option value="Utility">Utility</option>
                            <option value="Auth">Auth</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-[10px] font-black uppercase text-text-secondary mb-2 tracking-widest ml-1">Template</label>
                        <select
                            className="w-full h-12 px-4 bg-gray-50 border border-gray-200 rounded-xl font-bold text-sm outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                            value={selectedTemplate}
                            onChange={(e) => {
                                const tplId = e.target.value;
                                setSelectedTemplate(tplId);
                                if (tplId) {
                                    const tpl = templates.find(t => t.id === tplId);
                                    if (tpl) setCustomContent(tpl.content);
                                }
                            }}
                        >
                            <option value="">Write Custom Message...</option>
                            {templates
                                .filter(t => (t.channel === channel || t.channel === 'Any') && (templateCategory === 'All' || t.category === templateCategory))
                                .map(t => (
                                    <option key={t.id} value={t.id}>{t.name}</option>
                                ))}
                        </select>
                    </div>
                </div>

                <div>
                    <label className="block text-[10px] font-black uppercase text-text-secondary mb-2 tracking-widest ml-1">Message Content</label>
                    <div className="relative">
                        <textarea
                            className="w-full h-40 p-4 bg-gray-50 border border-gray-200 rounded-2xl resize-none focus:outline-none focus:ring-2 focus:ring-primary/10 font-medium text-sm transition-all"
                            placeholder="Type your message here..."
                            value={customContent}
                            onChange={(e) => setCustomContent(e.target.value)}
                        />
                        <div className="absolute bottom-4 left-4 flex gap-2">
                            {['{Name}', '{BusinessName}', '{Points}'].map(variable => (
                                <button
                                    key={variable}
                                    onClick={() => setCustomContent(prev => prev + variable)}
                                    className="px-2 py-1 bg-white border border-gray-200 rounded-lg text-[10px] font-bold text-primary hover:bg-gray-50 transition-colors shadow-sm"
                                >
                                    + {variable}
                                </button>
                            ))}
                        </div>
                    </div>
                    <p className="text-[10px] text-text-secondary mt-2 text-right font-medium uppercase tracking-tighter">
                        Characters: <span className="text-primary font-black">{customContent.length}</span>
                    </p>
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
                    <label className="text-[10px] font-black uppercase text-text-secondary block mb-3 ml-1 tracking-widest">Message Preview</label>
                    <div className="flex justify-center">
                        <PhonePreview channel={channel} content={customContent} />
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
