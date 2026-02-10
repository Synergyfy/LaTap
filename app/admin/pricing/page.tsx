'use client';

import React, { useState } from 'react';
import AdminSidebar from '@/components/admin/AdminSidebar';
import { notify } from '@/lib/notify';
import {
    Tag, DollarSign, Plus, Trash2, Edit3, Save, X, ChevronRight,
    Zap, Shield, Globe, Crown, Info, CheckCircle2
} from 'lucide-react';

interface PricingPlan {
    id: string;
    name: string;
    price: string;
    period: string;
    description: string;
    features: string[];
    isPopular?: boolean;
    buttonText: string;
    color: string;
}

export default function AdminPricingPage() {
    const [plans, setPlans] = useState<PricingPlan[]>([
        {
            id: 'free',
            name: 'Free',
            price: '₦0',
            period: '/month',
            description: 'Essential features for personal use and basic connectivity.',
            features: ['Up to 5 Digital Profiles', 'Standard QR Support', 'Basic Analytics', 'Community Support'],
            buttonText: 'Get Started',
            color: 'slate'
        },
        {
            id: 'basic',
            name: 'Basic',
            price: '₦5,000',
            period: '/month',
            description: 'Advanced identification for individuals and small teams.',
            features: ['Unlimited Digital Profiles', 'NFC Hardware Sync', 'Email Support', 'Advanced Analytics'],
            buttonText: 'Upgrade Now',
            color: 'primary'
        },
        {
            id: 'premium',
            name: 'Premium',
            price: '₦15,000',
            period: '/month',
            description: 'Comprehensive solutions for growing businesses and enterprises.',
            features: ['Everything in Basic', 'Team Management', 'Custom Domains', 'Priority 24/7 Support'],
            isPopular: true,
            buttonText: 'Go Premium',
            color: 'primary'
        },
        {
            id: 'white-label',
            name: 'White-Label',
            price: 'Custom',
            period: '',
            description: 'Full branding rights and administrative control for resellers.',
            features: ['Everything in Premium', 'Your Own Branding', 'Reseller Dashboard', 'Dedicated Account Manager'],
            buttonText: 'Contact Sales',
            color: 'slate'
        }
    ]);

    const [editingPlan, setEditingPlan] = useState<PricingPlan | null>(null);

    const handleSave = () => {
        if (editingPlan) {
            setPlans(plans.map(p => p.id === editingPlan.id ? editingPlan : p));
            setEditingPlan(null);
            notify.success('Pricing plan updated successfully');
        }
    };

    return (
        <div className="flex min-h-screen bg-gray-50/50">
            <AdminSidebar activePage="pricing">
                <main className="flex-1 p-8 md:p-12">
                    <div className="max-w-6xl mx-auto">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                            <div>
                                <div className="flex items-center gap-3 text-primary mb-2">
                                    <Tag size={20} />
                                    <span className="text-xs font-black uppercase tracking-widest">Pricing Management</span>
                                </div>
                                <h1 className="text-4xl font-display font-bold text-text-main">Subscription Plans</h1>
                            </div>
                            <button className="h-12 px-6 bg-primary text-white rounded-xl font-bold text-sm shadow-lg shadow-primary/20 hover:scale-105 active:scale-95 transition-all flex items-center gap-2">
                                <Plus size={18} /> Add New Plan
                            </button>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            {plans.map((plan) => (
                                <div
                                    key={plan.id}
                                    className={`bg-white rounded-2xl border-2 transition-all overflow-hidden ${editingPlan?.id === plan.id ? 'border-primary shadow-xl ring-4 ring-primary/5' : 'border-gray-100 hover:border-primary/20 hover:shadow-lg'}`}
                                >
                                    <div className="p-8">
                                        <div className="flex items-start justify-between mb-6">
                                            <div className="flex items-center gap-3">
                                                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${plan.isPopular ? 'bg-primary text-white' : 'bg-slate-100 text-slate-600'}`}>
                                                    {plan.id === 'free' && <Globe size={24} />}
                                                    {plan.id === 'basic' && <Zap size={24} />}
                                                    {plan.id === 'premium' && <Crown size={24} />}
                                                    {plan.id === 'white-label' && <Shield size={24} />}
                                                </div>
                                                <div>
                                                    <h3 className="font-bold text-text-main text-lg">{plan.name}</h3>
                                                    <p className="text-xs font-bold text-primary">{plan.isPopular ? 'Most Popular' : 'Tier Plan'}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <button
                                                    onClick={() => setEditingPlan(plan)}
                                                    className="p-2.5 hover:bg-slate-50 rounded-lg text-slate-400 hover:text-primary transition-all"
                                                >
                                                    <Edit3 size={18} />
                                                </button>
                                                <button className="p-2.5 hover:bg-red-50 rounded-lg text-slate-400 hover:text-red-500 transition-all">
                                                    <Trash2 size={18} />
                                                </button>
                                            </div>
                                        </div>

                                        <div className="space-y-6">
                                            <div className="flex items-baseline gap-1">
                                                <span className="text-3xl font-display font-black text-text-main">{plan.price}</span>
                                                <span className="text-sm font-bold text-text-secondary">{plan.period}</span>
                                            </div>

                                            <p className="text-sm text-text-secondary font-medium leading-relaxed">
                                                {plan.description}
                                            </p>

                                            <div className="pt-6 border-t border-gray-100">
                                                <h4 className="text-[10px] font-black uppercase tracking-widest text-text-secondary mb-4">Included Features</h4>
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-3 gap-x-6">
                                                    {plan.features.map((feature, i) => (
                                                        <div key={i} className="flex items-center gap-2 text-sm font-bold text-text-main">
                                                            <CheckCircle2 size={16} className="text-green-500 shrink-0" />
                                                            <span className="line-clamp-1">{feature}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Edit Modal / Slide-over (Simple version) */}
                        {editingPlan && (
                            <div className="fixed inset-0 z-100 flex items-center justify-end p-4">
                                <div className="absolute inset-0 bg-text-main/20 backdrop-blur-sm" onClick={() => setEditingPlan(null)} />
                                <div className="relative w-full max-w-xl bg-white h-full rounded-2xl shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
                                    <div className="p-8 border-b border-gray-100 flex items-center justify-between">
                                        <div>
                                            <h2 className="text-2xl font-bold text-text-main">Edit Plan</h2>
                                            <p className="text-sm text-text-secondary font-medium uppercase tracking-widest mt-1">Plan Configuration</p>
                                        </div>
                                        <button onClick={() => setEditingPlan(null)} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                                            <X size={24} />
                                        </button>
                                    </div>

                                    <div className="flex-1 overflow-y-auto p-8 space-y-8">
                                        <div className="grid grid-cols-2 gap-6">
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black uppercase tracking-widest text-text-secondary ml-1">Plan Name</label>
                                                <input
                                                    type="text"
                                                    value={editingPlan.name}
                                                    onChange={(e) => setEditingPlan({ ...editingPlan, name: e.target.value })}
                                                    className="w-full h-12 px-4 bg-gray-50 border border-gray-200 rounded-xl font-bold text-sm focus:ring-2 focus:ring-primary/20 outline-none"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black uppercase tracking-widest text-text-secondary ml-1">Price Label</label>
                                                <input
                                                    type="text"
                                                    value={editingPlan.price}
                                                    onChange={(e) => setEditingPlan({ ...editingPlan, price: e.target.value })}
                                                    className="w-full h-12 px-4 bg-gray-50 border border-gray-200 rounded-xl font-bold text-sm focus:ring-2 focus:ring-primary/20 outline-none"
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-text-secondary ml-1">Description</label>
                                            <textarea
                                                rows={3}
                                                value={editingPlan.description}
                                                onChange={(e) => setEditingPlan({ ...editingPlan, description: e.target.value })}
                                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl font-bold text-sm focus:ring-2 focus:ring-primary/20 outline-none resize-none"
                                            />
                                        </div>

                                        <div className="space-y-4">
                                            <div className="flex items-center justify-between">
                                                <label className="text-[10px] font-black uppercase tracking-widest text-text-secondary ml-1">Features List</label>
                                                <button className="text-[10px] font-bold text-primary flex items-center gap-1 hover:underline">
                                                    <Plus size={12} /> Add Feature
                                                </button>
                                            </div>
                                            <div className="space-y-3">
                                                {editingPlan.features.map((feature, i) => (
                                                    <div key={i} className="flex gap-3">
                                                        <input
                                                            type="text"
                                                            value={feature}
                                                            onChange={(e) => {
                                                                const newFeatures = [...editingPlan.features];
                                                                newFeatures[i] = e.target.value;
                                                                setEditingPlan({ ...editingPlan, features: newFeatures });
                                                            }}
                                                            className="flex-1 h-12 px-4 bg-gray-50 border border-gray-200 rounded-xl font-bold text-sm focus:ring-2 focus:ring-primary/20 outline-none"
                                                        />
                                                        <button className="p-2 hover:bg-red-50 text-slate-300 hover:text-red-500 rounded-lg transition-all">
                                                            <Trash2 size={20} />
                                                        </button>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="p-8 border-t border-gray-100 flex gap-4">
                                        <button
                                            onClick={() => setEditingPlan(null)}
                                            className="flex-1 h-14 border border-gray-200 rounded-xl font-bold text-sm hover:bg-gray-50 transition-all"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            onClick={handleSave}
                                            className="flex-2 h-14 bg-primary text-white rounded-xl font-bold text-sm shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                                        >
                                            <Save size={20} /> Save Changes
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </main>
            </AdminSidebar>
        </div>
    );
}
