'use client';

import React, { useState } from 'react';
import DashboardSidebar from '@/components/dashboard/DashboardSidebar';
import PageHeader from '@/components/dashboard/PageHeader';
import { toast } from 'react-hot-toast';
import {
    Zap, Plus, Trash2, Play, Pause, ChevronRight,
    MessageSquare, Mail, Share2, Star, Timer, Users, Award
} from 'lucide-react';
import { Gift } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Rule {
    id: string;
    name: string;
    event: string;
    condition: string;
    action: string;
    active: boolean;
}

const EVENT_OPTIONS = [
    { id: 'first_tag', label: 'First-time Tag', icon: Users, desc: 'When a new customer taps' },
    { id: 'repeat_tag', label: 'Repeat Tag', icon: Zap, desc: 'When a returning customer taps' },
    { id: 'reward_earned', label: 'Reward Earned', icon: Award, desc: 'When loyalty threshold is reached' },
    { id: 'survey_completed', label: 'Survey Completed', icon: MessageSquare, desc: 'When a survey is submitted' },
];

const ACTION_OPTIONS = [
    { id: 'send_sms', label: 'Send SMS', icon: MessageSquare, color: 'bg-blue-500' },
    { id: 'send_whatsapp', label: 'Send WhatsApp', icon: MessageSquare, color: 'bg-emerald-500' },
    { id: 'send_email', label: 'Send Email', icon: Mail, color: 'bg-purple-500' },
    { id: 'push_review', label: 'Push Review Link', icon: Star, color: 'bg-amber-500' },
];

export default function AutomationsPage() {
    const [rules, setRules] = useState<Rule[]>([
        {
            id: '1',
            name: 'Welcome Series',
            event: 'first_tag',
            condition: 'any',
            action: 'send_whatsapp',
            active: true
        },
        {
            id: '2',
            name: 'Review Booster',
            event: 'repeat_tag',
            condition: 'frequency > 3',
            action: 'push_review',
            active: true
        }
    ]);

    const [isAdding, setIsAdding] = useState(false);
    const [newRule, setNewRule] = useState<Partial<Rule>>({
        event: 'first_tag',
        action: 'send_sms',
        condition: 'any',
        active: true
    });

    const addRule = () => {
        const rule: Rule = {
            id: Date.now().toString(),
            name: newRule.name || 'Untitled Rule',
            event: newRule.event || 'first_tag',
            condition: newRule.condition || 'any',
            action: newRule.action || 'send_sms',
            active: true
        };
        setRules([...rules, rule]);
        setIsAdding(false);
        toast.success('Automation rule created!');
    };

    const toggleRule = (id: string) => {
        setRules(rules.map(r => r.id === id ? { ...r, active: !r.active } : r));
    };

    const deleteRule = (id: string) => {
        setRules(rules.filter(r => r.id !== id));
        toast.success('Rule deleted');
    };

    return (
        <DashboardSidebar>
            <div className="p-8">
                <div className="flex justify-between items-start mb-8">
                    <PageHeader
                        title="Automation Rules"
                        description="Set up triggers to engage customers automatically without lifting a finger"
                    />
                    <button
                        onClick={() => setIsAdding(true)}
                        className="h-12 px-6 bg-primary text-white font-black uppercase tracking-widest text-xs rounded-xl shadow-lg shadow-primary/20 hover:scale-[1.02] transition-all flex items-center gap-2"
                    >
                        <Plus size={18} />
                        Create New Rule
                    </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Rules List */}
                    <div className="lg:col-span-2 space-y-4">
                        <AnimatePresence>
                            {rules.map((rule) => {
                                const eventInfo = EVENT_OPTIONS.find(e => e.id === rule.event);
                                const actionInfo = ACTION_OPTIONS.find(a => a.id === rule.action);

                                return (
                                    <motion.div
                                        key={rule.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        className={`bg-white rounded-2xl border ${rule.active ? 'border-gray-200 shadow-sm' : 'border-gray-100 opacity-60'} p-6 transition-all`}
                                    >
                                        <div className="flex items-center justify-between gap-6">
                                            <div className="flex items-center gap-6 flex-1">
                                                <div className={`size-12 rounded-2xl ${rule.active ? 'bg-primary/10 text-primary' : 'bg-gray-100 text-gray-400'} flex items-center justify-center shrink-0`}>
                                                    {eventInfo?.icon && <eventInfo.icon size={24} />}
                                                </div>
                                                <div className="flex-1">
                                                    <h3 className="font-bold text-slate-900 flex items-center gap-2">
                                                        {rule.name}
                                                        {!rule.active && <span className="text-[8px] font-black uppercase tracking-widest bg-gray-200 text-gray-500 px-2 py-0.5 rounded">Paused</span>}
                                                    </h3>
                                                    <div className="flex items-center gap-2 mt-1">
                                                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">If {eventInfo?.label}</span>
                                                        <ChevronRight size={12} className="text-slate-200" />
                                                        <span className={`text-[10px] font-black uppercase tracking-widest ${actionInfo?.color.replace('bg-', 'text-')}`}>Then {actionInfo?.label}</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-4">
                                                <button
                                                    onClick={() => toggleRule(rule.id)}
                                                    className={`size-10 rounded-xl flex items-center justify-center transition-all ${rule.active ? 'bg-amber-50 text-amber-500 hover:bg-amber-100' : 'bg-emerald-50 text-emerald-500 hover:bg-emerald-100'}`}
                                                >
                                                    {rule.active ? <Pause size={18} /> : <Play size={18} />}
                                                </button>
                                                <button
                                                    onClick={() => deleteRule(rule.id)}
                                                    className="size-10 rounded-xl bg-red-50 text-red-400 flex items-center justify-center hover:bg-red-100 transition-all"
                                                >
                                                    <Trash2 size={18} />
                                                </button>
                                            </div>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </AnimatePresence>

                        {rules.length === 0 && (
                            <div className="text-center py-20 bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200">
                                <Zap size={48} className="mx-auto text-slate-200 mb-4" />
                                <p className="text-sm font-bold text-slate-400">No automation rules yet</p>
                            </div>
                        )}
                    </div>

                    {/* Quick Stats / Guide */}
                    <div className="space-y-6">
                        <div className="bg-slate-900 rounded-3xl p-8 text-white relative overflow-hidden">
                            <Zap className="absolute -right-4 -top-4 size-32 text-white/5 rotate-12" />
                            <h4 className="text-lg font-black italic mb-4">Automation Success</h4>
                            <div className="space-y-4 relative z-10">
                                <div className="flex items-center justify-between">
                                    <span className="text-xs text-white/60 font-medium">Messages Sent</span>
                                    <span className="font-bold">1,284</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-xs text-white/60 font-medium">Review Clicks</span>
                                    <span className="font-bold">142</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-xs text-white/60 font-medium">Capture Rate</span>
                                    <span className="font-bold text-emerald-400">+12%</span>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-3xl border border-gray-200 p-8">
                            <h4 className="text-xs font-black uppercase tracking-widest text-slate-900 mb-4">Popular Recipes</h4>
                            <div className="space-y-3">
                                {[
                                    { label: 'Birthday Offer', icon: Gift },
                                    { label: 'Lost Customer Flow', icon: Timer },
                                    { label: 'VIP Welcome', icon: Star }
                                ].map((r, i) => (
                                    <button key={i} className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 transition-all text-left">
                                        <div className="size-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-500">
                                            <r.icon size={16} />
                                        </div>
                                        <span className="text-xs font-bold text-slate-600">{r.label}</span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Add Rule Modal */}
                <AnimatePresence>
                    {isAdding && (
                        <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
                                onClick={() => setIsAdding(false)}
                            />
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                                className="bg-white w-full max-w-xl rounded-[2.5rem] shadow-2xl relative z-10 overflow-hidden"
                            >
                                <div className="p-10">
                                    <h2 className="text-2xl font-black italic mb-8 tracking-tight">Create Automation</h2>

                                    <div className="space-y-8">
                                        {/* Rule Name */}
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Rule Name</label>
                                            <input
                                                type="text"
                                                placeholder="e.g. Happy Hour Special"
                                                className="w-full h-12 px-5 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:bg-white transition-all font-bold"
                                                onChange={(e) => setNewRule({ ...newRule, name: e.target.value })}
                                            />
                                        </div>

                                        {/* Trigger Event */}
                                        <div className="space-y-4">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">When this happens...</label>
                                            <div className="grid grid-cols-2 gap-3">
                                                {EVENT_OPTIONS.map((opt) => (
                                                    <button
                                                        key={opt.id}
                                                        onClick={() => setNewRule({ ...newRule, event: opt.id })}
                                                        className={`p-4 rounded-2xl border-2 text-left transition-all ${newRule.event === opt.id ? 'border-primary bg-primary/5' : 'border-slate-50 bg-slate-50/50 hover:bg-slate-50'}`}
                                                    >
                                                        <opt.icon size={20} className={newRule.event === opt.id ? 'text-primary' : 'text-slate-400'} />
                                                        <p className={`text-xs font-black uppercase tracking-widest mt-3 ${newRule.event === opt.id ? 'text-primary' : 'text-slate-600'}`}>{opt.label}</p>
                                                    </button>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Action */}
                                        <div className="space-y-4">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Do this action...</label>
                                            <div className="grid grid-cols-2 gap-3">
                                                {ACTION_OPTIONS.map((opt) => (
                                                    <button
                                                        key={opt.id}
                                                        onClick={() => setNewRule({ ...newRule, action: opt.id })}
                                                        className={`p-4 rounded-2xl border-2 text-left transition-all ${newRule.action === opt.id ? 'border-primary bg-primary/5' : 'border-slate-50 bg-slate-50/50 hover:bg-slate-50'}`}
                                                    >
                                                        <opt.icon size={20} className={newRule.action === opt.id ? 'text-primary' : 'text-slate-400'} />
                                                        <p className={`text-xs font-black uppercase tracking-widest mt-3 ${newRule.action === opt.id ? 'text-primary' : 'text-slate-600'}`}>{opt.label}</p>
                                                    </button>
                                                ))}
                                            </div>
                                        </div>

                                        <button
                                            onClick={addRule}
                                            className="w-full h-14 bg-primary text-white font-black uppercase tracking-widest text-sm rounded-2xl shadow-xl shadow-primary/20 hover:scale-[1.01] transition-all"
                                        >
                                            Activate Automation
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    )}
                </AnimatePresence>
            </div>
        </DashboardSidebar>
    );
}
