'use client';

import React, { useState } from 'react';
import { notify } from '@/lib/notify';
import {
    Tag, Plus, Trash2, Edit3, Save, X,
    Zap, Shield, Globe, Crown, CheckCircle2, Package, Box, Cpu, Palette
} from 'lucide-react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchPricingPlans, updatePricingPlan, addPricingPlan, deletePricingPlan } from '@/lib/api/pricing';
import { fetchHardwarePricing, updateHardwarePrice } from '@/lib/api/hardware-pricing';
import { PricingPlan, HardwareOption } from '@/types/pricing';

export default function AdminPricingPage() {
    const queryClient = useQueryClient();
    const [activeTab, setActiveTab] = useState<'plans' | 'hardware'>('plans');
    const [editingPlan, setEditingPlan] = useState<PricingPlan | null>(null);

    // Queries
    const { data: plans = [], isLoading: plansLoading } = useQuery({
        queryKey: ['subscription-plans'],
        queryFn: fetchPricingPlans
    });

    const { data: hardware = [], isLoading: hardwareLoading } = useQuery({
        queryKey: ['hardware-pricing'],
        queryFn: fetchHardwarePricing
    });

    // Mutations
    const updateMutation = useMutation({
        mutationFn: updatePricingPlan,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['subscription-plans'] });
            setEditingPlan(null);
            notify.success('Pricing plan updated successfully');
        }
    });

    const addMutation = useMutation({
        mutationFn: addPricingPlan,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['subscription-plans'] });
            notify.success('New plan added successfully');
        }
    });

    const deleteMutation = useMutation({
        mutationFn: deletePricingPlan,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['subscription-plans'] });
            notify.success('Plan deleted successfully');
        }
    });

    const updateHardwareMutation = useMutation({
        mutationFn: ({ id, price }: { id: string, price: number }) => updateHardwarePrice(id, price),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['hardware-pricing'] });
            notify.success('Hardware price updated');
        }
    });

    const handleSave = () => {
        if (editingPlan) {
            updateMutation.mutate(editingPlan);
        }
    };

    const handleAddPlan = () => {
        addMutation.mutate({
            name: 'New Plan',
            price: '₦0',
            period: '/mo',
            description: 'New plan description',
            features: ['Feature 1'],
            buttonText: 'Get Started',
            color: 'slate',
            visitorLimit: 100,
            tagLimit: 1
        });
    };

    const handleDelete = (id: string) => {
        if (confirm('Are you sure you want to delete this plan?')) {
            deleteMutation.mutate(id);
        }
    };

    return (
        <>
            <div className="max-w-6xl mx-auto">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
                    <div>
                        <div className="flex items-center gap-3 text-primary mb-2">
                            <Tag size={20} />
                            <span className="text-xs font-black uppercase tracking-widest">Pricing Management</span>
                        </div>
                        <h1 className="text-4xl font-display font-bold text-text-main">
                            {activeTab === 'plans' ? 'Subscription Plans' : 'Hardware Pricing'}
                        </h1>
                    </div>
                    {activeTab === 'plans' && (
                        <button
                            onClick={handleAddPlan}
                            className="h-12 px-6 bg-primary text-white rounded-xl font-bold text-sm shadow-lg shadow-primary/20 hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
                        >
                            <Plus size={18} /> Add New Plan
                        </button>
                    )}
                </div>

                {/* Tab Switcher */}
                <div className="flex items-center gap-4 mb-12 border-b border-gray-100 pb-px">
                    <button
                        onClick={() => setActiveTab('plans')}
                        className={`px-6 py-4 text-sm font-bold transition-all relative ${activeTab === 'plans' ? 'text-primary' : 'text-slate-400 hover:text-slate-600'}`}
                    >
                        Subscription Plans
                        {activeTab === 'plans' && <div className="absolute bottom-0 left-0 right-0 h-1 bg-primary rounded-t-full" />}
                    </button>
                    <button
                        onClick={() => setActiveTab('hardware')}
                        className={`px-6 py-4 text-sm font-bold transition-all relative ${activeTab === 'hardware' ? 'text-primary' : 'text-slate-400 hover:text-slate-600'}`}
                    >
                        Hardware Products
                        {activeTab === 'hardware' && <div className="absolute bottom-0 left-0 right-0 h-1 bg-primary rounded-t-full" />}
                    </button>
                </div>

                {(plansLoading || hardwareLoading) ? (
                    <div className="flex items-center justify-center py-20">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                    </div>
                ) : activeTab === 'plans' ? (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {plans.map((plan: PricingPlan) => (
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
                                                {plan.isPopular && <Crown size={24} />}
                                                {!plan.isPopular && plan.id !== 'free' && plan.id !== 'basic' && <Shield size={24} />}
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
                                            <button
                                                onClick={() => handleDelete(plan.id)}
                                                className="p-2.5 hover:bg-red-50 rounded-lg text-slate-400 hover:text-red-500 transition-all"
                                            >
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
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {hardware.map((item: HardwareOption) => (
                            <div key={item.id} className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
                                <div className="flex items-start justify-between mb-6">
                                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${item.color === 'blue' ? 'bg-blue-50 text-blue-600' :
                                        item.color === 'green' ? 'bg-green-50 text-green-600' :
                                            item.color === 'orange' ? 'bg-orange-50 text-orange-600' :
                                                item.color === 'purple' ? 'bg-purple-50 text-purple-600' :
                                                    'bg-gray-50 text-gray-600'
                                        }`}>
                                        {(() => {
                                            const IconMap: any = { Cpu, Zap, Shield, Palette };
                                            const Icon = IconMap[item.icon] || Box;
                                            return <Icon size={24} />;
                                        })()}
                                    </div>
                                    <div className="text-right">
                                        <span className="text-[10px] font-black uppercase tracking-widest text-text-secondary">Current Net Margin</span>
                                        <p className="text-lg font-bold text-green-600">+{((item.price - item.cost) / item.price * 100).toFixed(0)}%</p>
                                    </div>
                                </div>

                                <h3 className="text-lg font-bold text-text-main mb-1">{item.name}</h3>
                                <p className="text-xs text-text-secondary font-bold uppercase tracking-widest mb-6">Stock: {item.stock} Units</p>

                                <div className="space-y-4">
                                    <div>
                                        <label className="text-[10px] font-black uppercase tracking-widest text-text-secondary block mb-1.5 ml-1">Retail Price (₦)</label>
                                        <div className="relative">
                                            <input
                                                type="number"
                                                value={item.price}
                                                onChange={(e) => updateHardwareMutation.mutate({ id: item.id, price: parseInt(e.target.value) })}
                                                className="w-full h-11 pl-4 pr-12 bg-gray-50 border border-gray-200 rounded-xl font-bold text-sm focus:ring-2 focus:ring-primary/20 focus:outline-none focus:bg-white transition-all"
                                            />
                                            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-text-secondary">NGN</span>
                                        </div>
                                    </div>
                                    <div className="flex gap-4">
                                        <div className="flex-1">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-text-secondary block mb-1.5 ml-1">Unit Cost</label>
                                            <p className="h-11 flex items-center px-4 bg-gray-100 border border-gray-200 rounded-xl font-bold text-sm text-text-secondary">
                                                ₦{item.cost?.toLocaleString()}
                                            </p>
                                        </div>
                                        <div className="flex-1">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-text-secondary block mb-1.5 ml-1">Profit</label>
                                            <p className="h-11 flex items-center px-4 bg-green-50 border border-green-100 rounded-xl font-bold text-sm text-green-600">
                                                ₦{(item.price - item.cost)?.toLocaleString()}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Edit Modal / Slide-over (Plans Only) */}
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

                                <div className="grid grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-text-secondary ml-1">Visitor Limit</label>
                                        <input
                                            type="number"
                                            value={editingPlan.visitorLimit === Infinity ? 999999 : editingPlan.visitorLimit}
                                            onChange={(e) => setEditingPlan({ ...editingPlan, visitorLimit: parseInt(e.target.value) })}
                                            className="w-full h-12 px-4 bg-gray-50 border border-gray-200 rounded-xl font-bold text-sm focus:ring-2 focus:ring-primary/20 outline-none"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-text-secondary ml-1">Tag Limit</label>
                                        <input
                                            type="number"
                                            value={editingPlan.tagLimit === Infinity ? 999 : editingPlan.tagLimit}
                                            onChange={(e) => setEditingPlan({ ...editingPlan, tagLimit: parseInt(e.target.value) })}
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
                                        <button
                                            onClick={() => setEditingPlan({ ...editingPlan, features: [...editingPlan.features, 'New Feature'] })}
                                            className="text-[10px] font-bold text-primary flex items-center gap-1 hover:underline"
                                        >
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
                                                <button
                                                    onClick={() => {
                                                        const newFeatures = editingPlan.features.filter((_, idx) => idx !== i);
                                                        setEditingPlan({ ...editingPlan, features: newFeatures });
                                                    }}
                                                    className="p-2 hover:bg-red-50 text-slate-300 hover:text-red-500 rounded-lg transition-all"
                                                >
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
        </>
    );
}
