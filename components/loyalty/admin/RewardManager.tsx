"use client";

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Trash2, Edit2, Gift, Ticket, Tag, Clock, Save, X, Eye, ImageIcon, Upload, Image as ImageIcon2 } from 'lucide-react';
import { Reward, RewardType } from '@/types/loyalty';
import { cn } from '@/lib/utils';
import { notify } from '@/lib/notify';

interface RewardManagerProps {
    rewards: Reward[];
    onCreate: (reward: Partial<Reward>) => Promise<void>;
    onUpdate: (id: string, updates: Partial<Reward>) => Promise<void>;
    onDelete?: (id: string) => Promise<void>;
    className?: string;
}

const REWARD_TYPE_ICONS: Record<RewardType, any> = {
    discount: Tag,
    free_item: Gift,
    service: Ticket,
    cashback: Tag,
    gift: Gift
};

export const RewardManager: React.FC<RewardManagerProps> = ({ rewards, onCreate, onUpdate, className }) => {
    const [isAdding, setIsAdding] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [formData, setFormData] = useState<Partial<Reward>>({
        name: '',
        description: '',
        rewardType: 'free_item',
        pointCost: 100,
        validityDays: 30,
        isActive: true,
        imageUrl: '' // New field for Section 11 of PRD
    });

    const resetForm = () => {
        setFormData({
            name: '',
            description: '',
            rewardType: 'free_item',
            pointCost: 100,
            validityDays: 30,
            isActive: true,
            imageUrl: ''
        });
        setIsAdding(false);
        setEditingId(null);
    };

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            // In a real app, you'd upload to Supabase/S3 here. 
            // For mock/development, we use a Local Preview URL.
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData(prev => ({ ...prev, imageUrl: reader.result as string }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleEdit = (reward: Reward) => {
        setFormData(reward);
        setEditingId(reward.id);
        setIsAdding(true);
    };

    const handleSubmit = async () => {
        if (!formData.name || !formData.pointCost) {
            notify.error('Please fill in all required fields');
            return;
        }

        try {
            if (editingId) {
                await onUpdate(editingId, formData);
                notify.success('Reward updated successfully');
            } else {
                await onCreate(formData);
                notify.success('Reward created successfully');
            }
            resetForm();
        } catch (error) {
            notify.error('Failed to save reward');
        }
    };

    return (
        <div className={cn("space-y-8", className)}>
            {/* Header & Add Button */}
            <div className="flex items-center justify-between">
                <div>
                    <h3 className="text-xl font-display font-black text-slate-900">Reward Catalog</h3>
                    <p className="text-sm text-slate-500 font-medium">Manage the rewards available to your customers</p>
                </div>
                <button
                    onClick={() => setIsAdding(true)}
                    className="bg-primary text-white px-6 py-3 font-black text-xs uppercase tracking-widest shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all flex items-center gap-2"
                >
                    <Plus className="w-4 h-4" />
                    Create New Reward
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Rewards List */}
                {/* Rewards List Update snippet */}
                <div className="lg:col-span-7 space-y-4">
                    {rewards.length === 0 ? (
                        <div className="py-20 bg-slate-50 border border-dashed border-slate-200 text-center">
                            <Gift className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                            <p className="text-slate-500 font-bold italic">No rewards created yet.</p>
                        </div>
                    ) : (
                        rewards.map((reward) => {
                            const Icon = REWARD_TYPE_ICONS[reward.rewardType];
                            return (
                                <motion.div
                                    layout
                                    key={reward.id}
                                    className={cn(
                                        "p-4 bg-white border transition-all flex items-center justify-between group hover:shadow-md hover:border-primary/20",
                                        reward.isActive ? "border-slate-200" : "border-slate-100 opacity-60"
                                    )}
                                >
                                    <div className="flex items-center gap-5">
                                        {/* THE NEW IMAGE SHAPE */}
                                        <div className="relative w-16 h-16 shrink-0 bg-slate-100 border border-slate-200 overflow-hidden">
                                            {reward.imageUrl ? (
                                                <img
                                                    src={reward.imageUrl}
                                                    alt={reward.name}
                                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                                />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center">
                                                    <Icon className="w-6 h-6 text-slate-300" />
                                                </div>
                                            )}
                                            {/* Small Status Badge on Image */}
                                            {!reward.isActive && (
                                                <div className="absolute inset-0 bg-slate-900/60 flex items-center justify-center">
                                                    <span className="text-[8px] font-black text-white uppercase tracking-tighter">Inactive</span>
                                                </div>
                                            )}
                                        </div>

                                        <div>
                                            <h4 className="font-bold text-slate-900 text-sm uppercase tracking-tight">{reward.name}</h4>
                                            <div className="flex items-center gap-3 mt-1.5">
                                                <div className="flex items-center gap-1">
                                                    <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                                                    <span className="text-[10px] font-black text-slate-900 uppercase tracking-widest">{reward.pointCost} Pts</span>
                                                </div>
                                                <span className="w-1 h-1 rounded-full bg-slate-200" />
                                                <span className="text-[10px] font-medium text-slate-400 capitalize">{reward.rewardType.replace('_', ' ')}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={() => handleEdit(reward)}
                                            className="p-2 text-slate-400 hover:text-primary hover:bg-primary/5 transition-all"
                                        >
                                            <Edit2 className="w-4 h-4" />
                                        </button>
                                        <button className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-all">
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </motion.div>
                            );
                        })
                    )}
                </div>
                {/* Form Modal/Sidepanel */}
                <div className="lg:col-span-5">
                    <AnimatePresence mode="wait">
                        {isAdding ? (
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                                className="bg-slate-900 p-8 text-white relative shadow-2xl overflow-y-auto max-h-[85vh] scrollbar-hide"
                            >
                                <button
                                    onClick={resetForm}
                                    className="absolute top-4 right-4 p-1 hover:bg-white/10 rounded-full"
                                >
                                    <X className="w-5 h-5" />
                                </button>

                                <div className="flex items-center gap-3 mb-8">
                                    <div className="w-10 h-10 bg-primary flex items-center justify-center">
                                        <Gift className="w-5 h-5 text-white" />
                                    </div>
                                    <h3 className="text-xl font-bold italic tracking-tight uppercase">
                                        {editingId ? 'Edit Reward' : 'New Creation'}
                                    </h3>
                                </div>

                                <div className="space-y-6">
                                    {/* Image Upload Section */}
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-white/40 uppercase tracking-[0.2em]">Reward Cover Image</label>
                                        <div
                                            onClick={() => fileInputRef.current?.click()}
                                            className="group relative w-full h-40 bg-white/5 border-2 border-dashed border-white/10 hover:border-primary/50 transition-all cursor-pointer flex flex-col items-center justify-center gap-2 overflow-hidden"
                                        >
                                            {formData.imageUrl ? (
                                                <>
                                                    <img src={formData.imageUrl} alt="Preview" className="w-full h-full object-cover opacity-60 group-hover:opacity-40 transition-opacity" />
                                                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                                        <Upload className="w-6 h-6 text-white" />
                                                    </div>
                                                </>
                                            ) : (
                                                <>
                                                    <ImageIcon2 className="w-8 h-8 text-white/20 group-hover:text-primary/50" />
                                                    <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Click to upload</span>
                                                </>
                                            )}
                                        </div>
                                        <input
                                            type="file"
                                            ref={fileInputRef}
                                            onChange={handleImageUpload}
                                            accept="image/*"
                                            className="hidden"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-white/40 uppercase tracking-[0.2em]">Reward Name</label>
                                        <input
                                            type="text"
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            className="w-full bg-white/5 border border-white/10 h-12 px-4 font-bold outline-none focus:border-primary transition-all text-sm"
                                            placeholder="e.g. Free Nigerian Coffee"
                                        />
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black text-white/40 uppercase tracking-[0.2em]">Category</label>
                                            <select
                                                value={formData.rewardType}
                                                onChange={(e) => setFormData({ ...formData, rewardType: e.target.value as RewardType })}
                                                className="w-full bg-white/5 border border-white/10 h-12 px-4 font-bold outline-none focus:border-primary transition-all capitalize text-xs"
                                            >
                                                {['discount', 'free_item', 'service', 'cashback', 'gift'].map(t => (
                                                    <option key={t} value={t} className="bg-slate-900 text-white">{t.replace('_', ' ')}</option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black text-white/40 uppercase tracking-[0.2em]">Point Cost</label>
                                            <input
                                                type="number"
                                                value={formData.pointCost}
                                                onChange={(e) => setFormData({ ...formData, pointCost: Number(e.target.value) })}
                                                className="w-full bg-white/5 border border-white/10 h-12 px-4 font-bold outline-none focus:border-primary transition-all text-sm"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-white/40 uppercase tracking-[0.2em]">Full Description</label>
                                        <textarea
                                            value={formData.description}
                                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                            className="w-full bg-white/5 border border-white/10 p-4 font-medium text-sm outline-none focus:border-primary transition-all min-h-[80px]"
                                            placeholder="Explain what the customer gets..."
                                        />
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black text-white/40 uppercase tracking-[0.2em]">Validity (Days)</label>
                                            <div className="relative">
                                                <Clock className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 w-4 h-4" />
                                                <input
                                                    type="number"
                                                    value={formData.validityDays}
                                                    onChange={(e) => setFormData({ ...formData, validityDays: Number(e.target.value) })}
                                                    className="w-full bg-white/5 border border-white/10 h-12 pl-12 pr-4 font-bold outline-none focus:border-primary transition-all text-sm"
                                                />
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black text-white/40 uppercase tracking-[0.2em]">Status</label>
                                            <div className="flex items-center gap-4 h-12">
                                                <label className="flex items-center gap-2 cursor-pointer transition-all hover:text-primary">
                                                    <input
                                                        type="checkbox"
                                                        checked={formData.isActive}
                                                        onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                                                        className="w-4 h-4 accent-primary"
                                                    />
                                                    <span className="text-xs font-bold uppercase tracking-widest">Live</span>
                                                </label>
                                            </div>
                                        </div>
                                    </div>

                                    <button
                                        onClick={handleSubmit}
                                        className="w-full bg-primary text-white h-14 font-black uppercase tracking-[0.2em] shadow-xl shadow-primary/40 hover:bg-primary/90 transition-all flex items-center justify-center gap-2 mt-4"
                                    >
                                        <Save className="w-5 h-5" />
                                        {editingId ? 'Update Reward' : 'Generate Reward'}
                                    </button>
                                </div>
                            </motion.div>
                        ) : (
                            <div className="bg-slate-50 border border-slate-200 border-dashed p-10 text-center space-y-4">
                                <div className="w-16 h-16 bg-white border border-slate-100 flex items-center justify-center mx-auto shadow-sm">
                                    <Eye className="w-8 h-8 text-slate-300" />
                                </div>
                                <h4 className="text-sm font-bold text-slate-900 uppercase tracking-widest italic leading-relaxed">
                                    Select a reward to edit <br /> or create a new one to begin.
                                </h4>
                            </div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
};