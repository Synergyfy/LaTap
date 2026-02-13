"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Save, RefreshCw, Info, AlertCircle, Settings2, Zap, DollarSign, Clock } from 'lucide-react';
import { LoyaltyRule, RuleType } from '@/types/loyalty';
import { cn } from '@/lib/utils';
import { notify } from '@/lib/notify';

interface LoyaltySettingsProps {
    rules: LoyaltyRule;
    onSave: (rules: Partial<LoyaltyRule>) => Promise<void>;
    className?: string;
}

export const LoyaltySettings: React.FC<LoyaltySettingsProps> = ({ rules, onSave, className }) => {
    const [formData, setFormData] = useState<Partial<LoyaltyRule>>(rules);
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        setFormData(rules);
    }, [rules]);

    const handleSave = async () => {
        setIsSaving(true);
        try {
            await onSave(formData);
            notify.success('Loyalty rules updated successfully');
        } catch (error) {
            notify.error('Failed to update loyalty rules');
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div className={cn("bg-white border border-slate-200 overflow-hidden", className)}>
            <div className="p-6 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <Settings2 className="w-5 h-5 text-primary" />
                    <div>
                        <h3 className="text-lg font-bold text-slate-900">Program Configuration</h3>
                        <p className="text-xs text-slate-500 font-medium">Define how your customers earn loyalty points</p>
                    </div>
                </div>
                <button
                    onClick={handleSave}
                    disabled={isSaving}
                    className="bg-primary text-white px-6 py-2.5 font-black text-xs uppercase tracking-widest shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all flex items-center gap-2"
                >
                    {isSaving ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
                    Save Rules
                </button>
            </div>

            <div className="p-8 space-y-10">
                {/* Core Rules Section */}
                <section className="space-y-6">
                    <div className="flex items-center gap-2 mb-4">
                        <span className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-black text-xs">01</span>
                        <h4 className="font-bold text-slate-900 uppercase tracking-widest text-sm">Earning Mechanism</h4>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {(['spending', 'visit', 'hybrid'] as RuleType[]).map((type) => (
                            <button
                                key={type}
                                onClick={() => setFormData({ ...formData, ruleType: type })}
                                className={cn(
                                    "p-5 border text-left transition-all relative overflow-hidden group",
                                    formData.ruleType === type
                                        ? "border-primary bg-primary/5 ring-1 ring-primary"
                                        : "border-slate-200 bg-white hover:bg-slate-50"
                                )}
                            >
                                <div className={cn(
                                    "w-10 h-10 rounded-none flex items-center justify-center mb-3 transition-colors",
                                    formData.ruleType === type ? "bg-primary text-white" : "bg-slate-100 text-slate-400 group-hover:bg-slate-200"
                                )}>
                                    {type === 'spending' ? <DollarSign className="w-5 h-5" /> : type === 'visit' ? <Zap className="w-5 h-5" /> : <Settings2 className="w-5 h-5" />}
                                </div>
                                <h5 className="font-bold text-slate-900 capitalize mb-1">{type} Based</h5>
                                <p className="text-xs text-slate-500 leading-relaxed capitalize">
                                    {type === 'spending' ? 'Points awarded per amount spent' : type === 'visit' ? 'Fixed points per checkout visit' : 'Combine both spending and visit points'}
                                </p>
                                {formData.ruleType === type && (
                                    <motion.div layoutId="active-rule" className="absolute top-2 right-2">
                                        <div className="w-2 h-2 rounded-full bg-primary shadow-sm" />
                                    </motion.div>
                                )}
                            </button>
                        ))}
                    </div>

                    <div className="p-6 bg-slate-50 border border-slate-100 space-y-6">
                        {(formData.ruleType === 'spending' || formData.ruleType === 'hybrid') && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Base Amount (₦)</label>
                                    <div className="relative">
                                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">₦</span>
                                        <input
                                            type="number"
                                            value={formData.spendingBaseAmount}
                                            onChange={(e) => setFormData({ ...formData, spendingBaseAmount: Number(e.target.value) })}
                                            className="w-full h-12 pl-8 pr-4 bg-white border border-slate-200 font-bold focus:border-primary outline-none transition-all"
                                            placeholder="1,000"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Points Awarded</label>
                                    <input
                                        type="number"
                                        value={formData.spendingBasePoints}
                                        onChange={(e) => setFormData({ ...formData, spendingBasePoints: Number(e.target.value) })}
                                        className="w-full h-12 px-4 bg-white border border-slate-200 font-bold focus:border-primary outline-none transition-all"
                                        placeholder="10"
                                    />
                                </div>
                            </div>
                        )}

                        {(formData.ruleType === 'visit' || formData.ruleType === 'hybrid') && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-slate-200">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Points Per Visit</label>
                                    <input
                                        type="number"
                                        value={formData.visitPoints}
                                        onChange={(e) => setFormData({ ...formData, visitPoints: Number(e.target.value) })}
                                        className="w-full h-12 px-4 bg-white border border-slate-200 font-bold focus:border-primary outline-none transition-all"
                                        placeholder="5"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest flex items-center gap-1.5">
                                        Visit Cooldown (Hours)
                                        <Info className="w-3 h-3 text-slate-300" />
                                    </label>
                                    <div className="relative">
                                        <Clock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                                        <input
                                            type="number"
                                            value={formData.visitCooldownHours}
                                            onChange={(e) => setFormData({ ...formData, visitCooldownHours: Number(e.target.value) })}
                                            className="w-full h-12 pl-12 pr-4 bg-white border border-slate-200 font-bold focus:border-primary outline-none transition-all"
                                            placeholder="24"
                                        />
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </section>

                {/* Bonuses Section */}
                <section className="space-y-6">
                    <div className="flex items-center gap-2 mb-4">
                        <span className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 font-black text-xs">02</span>
                        <h4 className="font-bold text-slate-900 uppercase tracking-widest text-sm">Engagement Bonuses</h4>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[
                            { label: 'First Visit', key: 'firstVisitBonus', icon: Zap },
                            { label: 'Birthday', key: 'birthdayBonus', icon: Clock },
                            { label: 'Referral', key: 'referralBonus', icon: RefreshCw }
                        ].map((bonus) => (
                            <div key={bonus.key} className="p-6 border border-slate-100 bg-slate-50 relative group">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-8 h-8 bg-white border border-slate-100 flex items-center justify-center text-slate-400">
                                        <bonus.icon className="w-4 h-4" />
                                    </div>
                                    <h5 className="font-bold text-xs uppercase tracking-wider text-slate-900">{bonus.label} Bonus</h5>
                                </div>
                                <div className="space-y-2">
                                    <input
                                        type="number"
                                        value={formData[bonus.key as keyof LoyaltyRule] as number}
                                        onChange={(e) => setFormData({ ...formData, [bonus.key]: Number(e.target.value) })}
                                        className="w-full h-10 px-4 bg-white border border-slate-200 font-bold text-sm focus:border-primary outline-none transition-all"
                                        placeholder="0"
                                    />
                                    <p className="text-[10px] text-slate-400 font-medium">Additional points for {bonus.label.toLowerCase()} events</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Global Security / Abuse Section */}
                <section className="space-y-6 pt-6 border-t border-slate-100">
                    <div className="bg-amber-50 border border-amber-100 p-6 flex items-start gap-4">
                        <div className="bg-amber-100 p-2 text-amber-600 rounded-none">
                            <AlertCircle className="w-5 h-5" />
                        </div>
                        <div>
                            <h4 className="font-bold text-amber-900 text-sm mb-1 uppercase tracking-tight">Abuse Prevention</h4>
                            <p className="text-xs text-amber-700 leading-relaxed mb-4">
                                Wait-time restrictions are enforced globally. Only one rewarded visit per 24 hours (or your custom cooldown) is allowed from the same device.
                            </p>
                            <div className="flex items-center gap-4">
                                <label className="flex items-center gap-2 cursor-pointer group">
                                    <input
                                        type="checkbox"
                                        checked={formData.isActive}
                                        onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                                        className="w-4 h-4 accent-primary"
                                    />
                                    <span className="text-xs font-bold text-amber-900 uppercase tracking-widest">Enable Loyalty Program</span>
                                </label>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};
