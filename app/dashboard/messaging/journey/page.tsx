'use client';

import React from 'react';
import MessagingLayout from '@/components/messaging/MessagingLayout';
import { StepWelcomeBack } from '@/components/visitor/StepWelcomeBack';
import { StepFinalSuccess } from '@/components/visitor/StepFinalSuccess';
import { motion } from 'framer-motion';
import { Info, Play, MessageSquare, Bell, Star } from 'lucide-react';

export default function CustomerJourneyPage() {
    return (
        <MessagingLayout>
            <div className="space-y-8">
                {/* Header Section */}
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-xl font-display font-black text-slate-900">Customer Journey Preview</h2>
                        <p className="text-sm text-slate-500 font-medium">Preview how customers experience your automated messaging flows</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Welcome Back Flow */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            <div className="size-8 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center font-bold text-sm">1</div>
                            <h3 className="font-bold text-slate-800">Returning Customer Welcome</h3>
                        </div>
                        <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm relative group">
                            <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                                <div className="flex items-center gap-2">
                                    <Bell size={14} className="text-blue-500" />
                                    <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">Trigger: Check-in</span>
                                </div>
                                <button className="p-1 px-3 bg-white border border-slate-200 rounded-lg text-[10px] font-bold text-slate-600 hover:bg-slate-50 transition-colors flex items-center gap-1.5">
                                    <Play size={10} className="fill-slate-600" />
                                    Test Preview
                                </button>
                            </div>
                            <div className="p-8 scale-90 origin-top">
                                <StepWelcomeBack
                                    storeName="VemTap Coffee"
                                    userData={{ name: 'John Doe' }}
                                    visitCount={3}
                                    rewardVisitThreshold={5}
                                    hasRewardSetup={true}
                                    redemptionStatus="none"
                                    onRedeem={() => { }}
                                    onContinue={() => { }}
                                    onClear={() => { }}
                                />
                            </div>
                            <div className="absolute inset-x-0 bottom-0 p-4 bg-linear-to-t from-white via-white/80 to-transparent pt-20 flex justify-center">
                                <div className="bg-blue-600 text-white px-4 py-2 rounded-xl text-xs font-bold shadow-xl flex items-center gap-2">
                                    <MessageSquare size={14} />
                                    Sent via WhatsApp & SMS
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Final Success Flow */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            <div className="size-8 bg-green-50 text-green-600 rounded-lg flex items-center justify-center font-bold text-sm">2</div>
                            <h3 className="font-bold text-slate-800">Redemption Success</h3>
                        </div>
                        <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm relative group">
                            <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                                <div className="flex items-center gap-2">
                                    <Star size={14} className="text-yellow-500" />
                                    <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">Trigger: Point Used</span>
                                </div>
                                <button className="p-1 px-3 bg-white border border-slate-200 rounded-lg text-[10px] font-bold text-slate-600 hover:bg-slate-50 transition-colors flex items-center gap-1.5">
                                    <Play size={10} className="fill-slate-600" />
                                    Test Preview
                                </button>
                            </div>
                            <div className="p-8 scale-90 origin-top">
                                <StepFinalSuccess onFinish={() => { }} />
                            </div>
                            <div className="absolute inset-x-0 bottom-0 p-4 bg-linear-to-t from-white via-white/80 to-transparent pt-20 flex justify-center">
                                <div className="bg-green-600 text-white px-4 py-2 rounded-xl text-xs font-bold shadow-xl flex items-center gap-2">
                                    <MessageSquare size={14} />
                                    Sent via Email & SMS
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Automation Tip */}
                <div className="p-6 bg-blue-600 rounded-3xl text-white flex items-start gap-4">
                    <div className="p-3 bg-white/20 rounded-2xl shrink-0">
                        <Info size={24} />
                    </div>
                    <div>
                        <h4 className="text-lg font-black italic">Pro Tip: Automated Journeys boost retention by 40%!</h4>
                        <p className="text-blue-100 text-sm mt-1 max-w-2xl">
                            These messages are automatically triggered when your customers interact with your business.
                            You can customize the timing and logic in the <span className="font-bold underline cursor-pointer">Engagement Settings</span>.
                        </p>
                    </div>
                </div>
            </div>
        </MessagingLayout>
    );
}
