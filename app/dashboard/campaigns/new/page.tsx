'use client';

import React, { useState } from 'react';
import PageHeader from '@/components/dashboard/PageHeader';
import { useRouter } from 'next/navigation';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { dashboardApi } from '@/lib/api/dashboard';
import { Check, Rocket, MessageSquare, Mail, Send, Calendar, Users, ArrowLeft, ArrowRight } from 'lucide-react';
import toast from 'react-hot-toast';
import PremiumFeatureWrapper from '@/components/dashboard/PremiumFeatureWrapper';

export default function NewCampaignPage() {
    const router = useRouter();
    const queryClient = useQueryClient();
    const [step, setStep] = useState(1);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        type: 'WhatsApp',
        audience: 'all',
        message: '',
        schedule: 'now'
    });

    const createMessageMutation = useMutation({
        mutationFn: dashboardApi.createCampaign,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['dashboard'] });
            toast.success('Bulk message sent successfully!');
            router.push('/dashboard/campaigns');
        },
        onError: () => {
            toast.error('Failed to send bulk message');
            setIsSubmitting(false);
        }
    });

    const steps = [
        { number: 1, title: 'Details', icon: MessageSquare },
        { number: 2, title: 'Audience', icon: Users },
        { number: 3, title: 'Message', icon: Mail },
        { number: 4, title: 'Schedule', icon: Calendar }
    ];

    const handleLaunch = () => {
        if (!formData.name || !formData.message) {
            toast.error('Please fill in all required fields');
            return;
        }
        setIsSubmitting(true);
        createMessageMutation.mutate({
            name: formData.name,
            type: formData.type,
            audience: formData.audience,
            content: formData.message,
            status: 'Active'
        });
    };

    return (
        <PremiumFeatureWrapper
            featureName="Automated Marketing"
            description="Send WhatsApp, SMS, and Email campaigns to your entire visitor base."
        >
            <div className="p-8 max-w-4xl mx-auto">
                <PageHeader
                    title="Create Bulk Message"
                    description="Send messages to multiple customers at once"
                    actions={
                        <button
                            onClick={() => router.back()}
                            className="flex items-center gap-2 px-4 py-2 text-text-secondary hover:text-text-main font-bold transition-colors"
                        >
                            <ArrowLeft size={18} />
                            Cancel
                        </button>
                    }
                />

                {/* Progress Steps */}
                <div className="flex items-center justify-between mb-12 relative px-4">
                    <div className="absolute top-5 left-10 right-10 h-0.5 bg-gray-100 z-0"></div>
                    {steps.map((s) => {
                        const Icon = s.icon;
                        const isActive = step >= s.number;
                        const isCompleted = step > s.number;
                        return (
                            <div key={s.number} className="relative z-10 flex flex-col items-center">
                                <div className={`size-10 rounded-full flex items-center justify-center font-bold text-sm transition-all border-2 ${isActive ? 'bg-primary text-white border-primary shadow-lg shadow-primary/20' : 'bg-white text-text-secondary border-gray-200'
                                    }`}>
                                    {isCompleted ? <Check size={18} /> : s.number}
                                </div>
                                <span className={`absolute -bottom-7 text-[10px] font-black uppercase tracking-widest whitespace-nowrap ${isActive ? 'text-primary' : 'text-text-secondary'
                                    }`}>
                                    {s.title}
                                </span>
                            </div>
                        );
                    })}
                </div>

                <div className="bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden">
                    <div className="p-8">
                        {step === 1 && (
                            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                <h3 className="text-xl font-display font-bold text-text-main">Message Details</h3>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-text-secondary ml-1">Message Name</label>
                                    <input
                                        type="text"
                                        placeholder="e.g. Weekend Coffee Special"
                                        className="w-full h-14 bg-gray-50 border border-gray-100 rounded-lg px-5 font-bold outline-none focus:ring-2 focus:ring-primary/20 focus:bg-white transition-all text-sm"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        autoFocus
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-text-secondary ml-1">Channel</label>
                                    <div className="grid grid-cols-3 gap-4">
                                        {[
                                            { id: 'WhatsApp', icon: MessageSquare, sub: 'High Open Rate' },
                                            { id: 'SMS', icon: Send, sub: 'Direct Reach' },
                                            { id: 'Email', icon: Mail, sub: 'Rich Content' }
                                        ].map((t) => (
                                            <button
                                                key={t.id}
                                                onClick={() => setFormData({ ...formData, type: t.id })}
                                                className={`flex flex-col items-start gap-4 p-5 rounded-lg border-2 transition-all text-left ${formData.type === t.id ? 'border-primary bg-primary/5 shadow-inner' : 'border-gray-50 hover:border-gray-200 bg-gray-50/50'
                                                    }`}
                                            >
                                                <div className={`p-2 rounded-lg ${formData.type === t.id ? 'bg-primary text-white' : 'bg-white text-text-secondary border border-gray-100'}`}>
                                                    <t.icon size={20} />
                                                </div>
                                                <div>
                                                    <p className="text-sm font-bold text-text-main">{t.id}</p>
                                                    <p className="text-[10px] text-text-secondary font-medium">{t.sub}</p>
                                                </div>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}

                        {step === 2 && (
                            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                <h3 className="text-xl font-display font-bold text-text-main">Select Audience</h3>
                                <div className="grid grid-cols-1 gap-3">
                                    {[
                                        { id: 'all', title: 'All Visitors', desc: 'Send to everyone in your database' },
                                        { id: 'new', title: 'New Visitors', desc: 'Target customers from the last 7 days' },
                                        { id: 'returning', title: 'Returning Customers', desc: 'Target your most loyal fans' },
                                        { id: 'vip', title: 'VIP Only', desc: 'Exclusive rewards for top spenders' }
                                    ].map((a) => (
                                        <button
                                            key={a.id}
                                            onClick={() => setFormData({ ...formData, audience: a.id })}
                                            className={`flex items-center gap-4 p-5 rounded-lg border-2 transition-all text-left ${formData.audience === a.id ? 'border-primary bg-primary/5 shadow-inner' : 'border-gray-50 hover:border-gray-200'
                                                }`}
                                        >
                                            <div className={`size-6 rounded-full border-2 flex items-center justify-center transition-all ${formData.audience === a.id ? 'border-primary bg-primary' : 'border-gray-200'
                                                }`}>
                                                {formData.audience === a.id && <Check size={14} className="text-white" />}
                                            </div>
                                            <div>
                                                <p className="text-sm font-bold text-text-main">{a.title}</p>
                                                <p className="text-xs text-text-secondary font-medium">{a.desc}</p>
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {step === 3 && (
                            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                <div className="flex items-center justify-between">
                                    <h3 className="text-xl font-display font-bold text-text-main">Compose Message</h3>
                                    <button className="text-primary text-xs font-bold flex items-center gap-1 hover:underline">
                                        Use Template
                                    </button>
                                </div>
                                <div className="space-y-2">
                                    <div className="flex justify-between items-center px-1">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-text-secondary">Message Body</label>
                                        <span className={`text-[10px] font-bold ${formData.message.length > 160 ? 'text-red-500' : 'text-text-secondary'}`}>
                                            {formData.message.length}/160
                                        </span>
                                    </div>
                                    <textarea
                                        rows={6}
                                        placeholder="Type your message here... Use {name} for personalization."
                                        className="w-full bg-gray-50 border border-gray-100 rounded-lg p-5 font-bold outline-none focus:ring-2 focus:ring-primary/20 focus:bg-white transition-all text-sm resize-none"
                                        value={formData.message}
                                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                    />
                                </div>
                                <div className="bg-gray-50 rounded-2xl p-5 border border-dashed border-gray-200">
                                    <p className="text-[10px] font-black uppercase tracking-widest text-text-secondary mb-3">Personalization Tokens</p>
                                    <div className="flex flex-wrap gap-2">
                                        {['{name}', '{business}', '{date}', '{points}'].map((v) => (
                                            <button
                                                key={v}
                                                onClick={() => setFormData({ ...formData, message: formData.message + v })}
                                                className="px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-xs font-bold text-primary hover:border-primary hover:bg-primary/5 transition-all"
                                            >
                                                {v}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}

                        {step === 4 && (
                            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                <div className="text-center">
                                    <div className="size-20 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-4 border-4 border-white shadow-xl">
                                        <Rocket size={40} />
                                    </div>
                                    <h3 className="text-2xl font-display font-bold text-text-main">Ready to Send?</h3>
                                    <p className="text-text-secondary text-sm">Review your message settings before sending</p>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="bg-gray-50 rounded-2xl p-5 border border-gray-100">
                                        <p className="text-[10px] font-black uppercase tracking-widest text-text-secondary mb-1">Target</p>
                                        <p className="text-sm font-bold text-text-main">{formData.audience.toUpperCase()}</p>
                                    </div>
                                    <div className="bg-gray-50 rounded-2xl p-5 border border-gray-100">
                                        <p className="text-[10px] font-black uppercase tracking-widest text-text-secondary mb-1">Channel</p>
                                        <p className="text-sm font-bold text-text-main">{formData.type}</p>
                                    </div>
                                </div>

                                <div className="bg-primary/5 rounded-2xl p-6 border border-primary/10">
                                    <p className="text-[10px] font-black uppercase tracking-widest text-primary mb-3">Message Preview</p>
                                    <p className="text-base font-medium text-text-main leading-relaxed italic">
                                        "{formData.message || '(No message content)'}"
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="bg-gray-50 px-8 py-5 flex items-center justify-between border-t border-gray-100">
                        <button
                            disabled={step === 1}
                            onClick={() => setStep(step - 1)}
                            className="flex items-center gap-2 px-6 py-3 text-text-secondary font-bold hover:text-text-main transition-all text-sm disabled:opacity-0"
                        >
                            <ArrowLeft size={18} />
                            Back
                        </button>
                        <button
                            onClick={() => step < 4 ? setStep(step + 1) : handleLaunch()}
                            disabled={isSubmitting || (step === 1 && !formData.name) || (step === 3 && !formData.message)}
                            className="flex items-center gap-2 px-10 py-3 bg-primary text-white font-bold rounded-lg hover:bg-primary-hover transition-all text-sm shadow-xl shadow-primary/20 active:scale-95 disabled:opacity-50"
                        >
                            {isSubmitting ? (
                                <div className="size-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                            ) : (
                                <>
                                    {step === 4 ? 'Send Message' : 'Continue'}
                                    <ArrowRight size={18} />
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </PremiumFeatureWrapper>
    );
}
