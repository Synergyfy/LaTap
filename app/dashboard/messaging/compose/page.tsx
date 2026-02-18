'use client';

import React, { useState } from 'react';
import MessagingLayout from '@/components/messaging/MessagingLayout';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, Phone, Mail, Send, Target, Clock, Sparkles, AlertCircle, ChevronRight, CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { notify } from '@/lib/notify';

type Channel = 'WHATSAPP' | 'SMS' | 'EMAIL';

interface CampaignType {
    id: string;
    title: string;
    description: string;
    icon: any;
    color: string;
}

export default function ComposeMessagePage() {
    const [selectedChannel, setSelectedChannel] = useState<Channel>('WHATSAPP');
    const [step, setStep] = useState(1);
    const [message, setMessage] = useState('');
    const [isSending, setIsSending] = useState(false);

    const channels = [
        { id: 'WHATSAPP', name: 'WhatsApp', icon: MessageSquare, color: 'bg-green-500', cost: '15 Points' },
        { id: 'SMS', name: 'SMS', icon: Phone, color: 'bg-blue-500', cost: '10 Points' },
        { id: 'EMAIL', name: 'Email', icon: Mail, color: 'bg-purple-500', cost: '5 Points' },
    ];

    const handleSend = () => {
        setIsSending(true);
        setTimeout(() => {
            setIsSending(false);
            notify.success('Broadcast initiated successfully!');
            setStep(3);
        }, 2000);
    };

    return (
        <MessagingLayout>
            <div className="max-w-4xl mx-auto py-8">
                {/* Stepper */}
                <div className="flex items-center justify-between mb-12 relative px-4">
                    <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gray-100 -translate-y-1/2 -z-10" />
                    {[1, 2, 3].map((s) => (
                        <div
                            key={s}
                            className={cn(
                                "size-10 rounded-full flex items-center justify-center font-bold text-sm transition-all border-4",
                                step >= s ? "bg-primary text-white border-white ring-4 ring-primary/10 shadow-lg" : "bg-white text-gray-300 border-gray-50"
                            )}
                        >
                            {step > s ? <CheckCircle2 size={20} /> : s}
                        </div>
                    ))}
                </div>

                <AnimatePresence mode="wait">
                    {step === 1 && (
                        <motion.div
                            key="step1"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="space-y-8"
                        >
                            <div className="text-center space-y-2">
                                <h2 className="text-3xl font-display font-black text-slate-900">Choose Your Channel</h2>
                                <p className="text-slate-500">Pick the best way to reach your customers today</p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {channels.map((channel) => (
                                    <button
                                        key={channel.id}
                                        onClick={() => setSelectedChannel(channel.id as Channel)}
                                        className={cn(
                                            "p-8 rounded-[2.5rem] border-2 transition-all group relative overflow-hidden",
                                            selectedChannel === channel.id
                                                ? "border-primary bg-primary/5 shadow-2xl shadow-primary/10 -translate-y-1"
                                                : "border-gray-100 bg-white hover:border-gray-200"
                                        )}
                                    >
                                        <div className={cn(
                                            "size-16 rounded-3xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110",
                                            channel.color,
                                            "text-white shadow-xl"
                                        )}>
                                            <channel.icon size={32} />
                                        </div>
                                        <h3 className="text-xl font-black text-slate-900 mb-2">{channel.name}</h3>
                                        <p className="text-sm text-slate-500 font-medium">Starting at <span className="font-bold text-primary">{channel.cost}</span>/msg</p>

                                        {selectedChannel === channel.id && (
                                            <div className="absolute top-4 right-4 size-6 bg-primary rounded-full flex items-center justify-center text-white">
                                                <CheckCircle2 size={16} />
                                            </div>
                                        )}
                                    </button>
                                ))}
                            </div>

                            <button
                                onClick={() => setStep(2)}
                                className="w-full py-4 bg-slate-900 text-white font-black rounded-3xl shadow-2xl shadow-slate-900/20 hover:bg-black transition-all flex items-center justify-center gap-3 group"
                            >
                                Continue to Compose
                                <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
                            </button>
                        </motion.div>
                    )}

                    {step === 2 && (
                        <motion.div
                            key="step2"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="space-y-8"
                        >
                            <div className="flex items-center justify-between">
                                <button onClick={() => setStep(1)} className="text-sm font-bold text-slate-400 hover:text-slate-600">← Back to Channels</button>
                                <div className="flex items-center gap-2 px-3 py-1 bg-primary/10 rounded-full text-[10px] font-black uppercase text-primary tracking-widest">
                                    {selectedChannel} Campaign
                                </div>
                            </div>

                            <div className="space-y-6 bg-white p-8 rounded-[3rem] border border-slate-100 shadow-xl">
                                <div className="space-y-4">
                                    <label className="text-sm font-black text-slate-900 uppercase tracking-widest ml-1">Your Message</label>
                                    <div className="relative">
                                        <textarea
                                            value={message}
                                            onChange={(e) => setMessage(e.target.value)}
                                            placeholder="Write your message here... use {name} for personalization"
                                            className="w-full h-48 p-6 bg-slate-50 border-2 border-transparent focus:border-primary/20 focus:bg-white rounded-4xl outline-none transition-all resize-none text-slate-700 font-medium"
                                        />
                                        <button className="absolute bottom-4 right-4 p-2 bg-white border border-slate-200 rounded-xl text-primary hover:bg-slate-50 transition-all flex items-center gap-2 shadow-lg">
                                            <Sparkles size={16} />
                                            <span className="text-[10px] font-black uppercase">AI Enhance</span>
                                        </button>
                                    </div>
                                    <div className="flex justify-between items-center px-2">
                                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{message.length} Characters</p>
                                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Est. Cost: <span className="text-primary">{
                                            selectedChannel === 'WHATSAPP' ? '15' : selectedChannel === 'SMS' ? '10' : '5'
                                        } Points/recipient</span></p>
                                    </div>
                                </div>

                                <button
                                    onClick={handleSend}
                                    disabled={!message || isSending}
                                    className={cn(
                                        "w-full py-5 rounded-4xl font-black text-white transition-all shadow-2xl flex items-center justify-center gap-3",
                                        !message || isSending ? "bg-slate-200 cursor-not-allowed" : "bg-primary hover:bg-primary-hover shadow-primary/20"
                                    )}
                                >
                                    {isSending ? "Initiating..." : "Launch Broadcast"}
                                    {!isSending && <Send size={20} />}
                                </button>
                            </div>
                        </motion.div>
                    )}

                    {step === 3 && (
                        <motion.div
                            key="step3"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="bg-white p-12 rounded-3xl text-center border-2 border-primary/10 shadow-3xl space-y-8"
                        >
                            <div className="size-24 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto shadow-inner">
                                <CheckCircle2 size={48} />
                            </div>
                            <div className="space-y-2">
                                <h2 className="text-3xl font-display font-black text-slate-900">Broadcast Launched!</h2>
                                <p className="text-slate-500 font-medium">Your message is being delivered to <span className="text-primary font-bold">128 customers</span>.</p>
                            </div>
                            <div className="pt-8">
                                <button
                                    onClick={() => setStep(1)}
                                    className="px-12 py-4 bg-slate-900 text-white font-black rounded-3xl hover:bg-black transition-all shadow-xl shadow-slate-900/20"
                                >
                                    Done
                                </button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </MessagingLayout>
    );
}
