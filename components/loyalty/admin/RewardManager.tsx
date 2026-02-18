"use client";

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Trash2, Edit2, Gift, Ticket, Tag, Clock, Save, X, Eye, ImageIcon, Upload, Image as ImageIcon2, HelpCircle } from 'lucide-react';
import { Reward, RewardType } from '@/types/loyalty';
import { cn } from '@/lib/utils';
import { notify } from '@/lib/notify';
import Tooltip from '@/components/ui/Tooltip';

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
                    className="bg-primary text-white px-6 py-3 font-black text-xs uppercase tracking-widest shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all flex items-center gap-2 rounded-2xl"
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
                            <p className="text-slate-500 font-bold ">No rewards created yet.</p>
                        </div>
                    ) : (
                        rewards.map((reward) => {
                            const Icon = REWARD_TYPE_ICONS[reward.rewardType];
                            return (
                                <motion.div
                                    layout
                                    key={reward.id}
                                    className={cn(
                                        "p-4 bg-white border transition-all flex items-center justify-between group hover:shadow-md hover:border-primary/20 rounded-2xl",
                                        reward.isActive ? "border-slate-200" : "border-slate-100 opacity-60"
                                    )}
                                >
                                    <div className="flex items-center gap-5">
                                        {/* THE NEW IMAGE SHAPE */}
                                        <div className="relative w-16 h-16 shrink-0 bg-slate-100 border border-slate-200 overflow-hidden rounded-xl">
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
                                                <div className="absolute inset-0 bg-white/60 flex items-center justify-center">
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
                                className="bg-white p-8 text-slate-900 relative shadow-2xl overflow-y-auto max-h-[90vh] scrollbar-hide rounded-2xl border border-slate-200"
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
                                    <h3 className="text-xl font-bold tracking-tight uppercase text-slate-900">
                                        {editingId ? 'Edit Reward' : 'New Creation'}
                                    </h3>
                                </div>

                                <div className="space-y-6">
                                    {/* Image Upload Section */}
                                    <div className="space-y-2">
                                        <div className="flex items-center gap-2">
                                            <label className="text-[10px] font-black text-slate-700 uppercase tracking-[0.2em]">Reward Cover Image</label>
                                            <Tooltip content="Upload an attractive image (e.g. 500x500px) to showcase this reward to customers. High quality images increase redemption rates.">
                                                <HelpCircle size={12} className="text-primary cursor-help" />
                                            </Tooltip>
                                        </div>
                                        <div
                                            onClick={() => fileInputRef.current?.click()}
                                            className="group relative w-full h-40 bg-white border-2 border-dashed border-slate-300 hover:border-primary transition-all cursor-pointer flex flex-col items-center justify-center gap-2 overflow-hidden rounded-2xl shadow-sm"
                                        >
                                            {formData.imageUrl ? (
                                                <>
                                                    <img src={formData.imageUrl} alt="Preview" className="w-full h-full object-cover opacity-80 group-hover:opacity-60 transition-opacity" />
                                                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/20">
                                                        <Upload className="w-8 h-8 text-white drop-shadow-md" />
                                                    </div>
                                                </>
                                            ) : (
                                                <>
                                                    <div className="size-12 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                                                        <ImageIcon2 className="w-6 h-6 text-slate-400 group-hover:text-primary" />
                                                    </div>
                                                    <div className="text-center">
                                                        <span className="text-[11px] font-black text-slate-800 uppercase tracking-widest block mb-1">Click to upload</span>
                                                        <span className="text-[10px] font-medium text-slate-400">PNG or JPG (Max. 2MB)</span>
                                                    </div>
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
                                        <div className="flex items-center gap-2">
                                            <label className="text-[10px] font-black text-slate-700 uppercase tracking-[0.2em]">Reward Name</label>
                                            <Tooltip content="Give your reward a catchy name that customers will love.">
                                                <HelpCircle size={12} className="text-primary cursor-help" />
                                            </Tooltip>
                                        </div>
                                        <input
                                            type="text"
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            className="w-full bg-white border border-slate-300 h-12 px-4 font-bold outline-none focus:border-primary focus:ring-4 focus:ring-primary/5 transition-all text-sm rounded-xl text-slate-900 shadow-sm"
                                            placeholder="e.g. Free Nigerian Coffee"
                                        />
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black text-slate-700 uppercase tracking-[0.2em]">Category</label>
                                            <select
                                                value={formData.rewardType}
                                                onChange={(e) => setFormData({ ...formData, rewardType: e.target.value as RewardType })}
                                                className="w-full bg-white border border-slate-300 h-12 px-4 font-bold outline-none focus:border-primary focus:ring-4 focus:ring-primary/5 transition-all capitalize text-xs rounded-xl text-slate-900 shadow-sm"
                                            >
                                                {['discount', 'free_item', 'service', 'cashback', 'gift'].map(t => (
                                                    <option key={t} value={t} className="bg-white text-slate-900">{t.replace('_', ' ')}</option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="space-y-2">
                                            <div className="flex items-center gap-2">
                                                <label className="text-[10px] font-black text-slate-700 uppercase tracking-[0.2em]">Point Cost</label>
                                                <Tooltip content="The number of points a customer must spend to redeem this reward.">
                                                    <HelpCircle size={12} className="text-primary cursor-help" />
                                                </Tooltip>
                                            </div>
                                            <input
                                                type="number"
                                                value={formData.pointCost}
                                                onChange={(e) => setFormData({ ...formData, pointCost: Number(e.target.value) })}
                                                className="w-full bg-white border border-slate-300 h-12 px-4 font-bold outline-none focus:border-primary focus:ring-4 focus:ring-primary/5 transition-all text-sm rounded-xl text-slate-900 shadow-sm"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <div className="flex items-center gap-2">
                                            <label className="text-[10px] font-black text-slate-700 uppercase tracking-[0.2em]">Full Description</label>
                                            <Tooltip content="Provide more details about the reward, terms, and conditions.">
                                                <HelpCircle size={12} className="text-primary cursor-help" />
                                            </Tooltip>
                                        </div>
                                        <textarea
                                            value={formData.description}
                                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                            className="w-full bg-white border border-slate-300 p-4 font-medium text-sm outline-none focus:border-primary focus:ring-4 focus:ring-primary/5 transition-all min-h-[100px] rounded-xl text-slate-900 shadow-sm"
                                            placeholder="Explain what the customer gets..."
                                        />
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <div className="flex items-center gap-2">
                                                <label className="text-[10px] font-black text-slate-700 uppercase tracking-[0.2em]">Validity (Days)</label>
                                                <Tooltip content="How many days the reward coupon remains valid after a customer redeems it.">
                                                    <HelpCircle size={12} className="text-primary cursor-help" />
                                                </Tooltip>
                                            </div>
                                            <div className="relative">
                                                <Clock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                                                <input
                                                    type="number"
                                                    value={formData.validityDays}
                                                    onChange={(e) => setFormData({ ...formData, validityDays: Number(e.target.value) })}
                                                    className="w-full bg-white border border-slate-300 h-12 pl-12 pr-4 font-bold outline-none focus:border-primary focus:ring-4 focus:ring-primary/5 transition-all text-sm rounded-xl text-slate-900 shadow-sm"
                                                />
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black text-slate-700 uppercase tracking-[0.2em]">Status</label>
                                            <div className="flex items-center gap-4 h-12">
                                                <label className="flex items-center gap-2 cursor-pointer transition-all hover:text-primary text-slate-800">
                                                    <input
                                                        type="checkbox"
                                                        checked={formData.isActive}
                                                        onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                                                        className="w-4 h-4 accent-primary rounded-lg"
                                                    />
                                                    <span className="text-xs font-bold uppercase tracking-widest">Mark as Live</span>
                                                </label>
                                            </div>
                                        </div>
                                    </div>

                                    <button
                                        onClick={handleSubmit}
                                        className="w-full bg-primary text-white h-14 font-black uppercase tracking-[0.2em] shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2 mt-4 rounded-2xl"
                                    >
                                        <Save className="w-5 h-5" />
                                        {editingId ? 'Save Changes' : 'Publish Reward'}
                                    </button>
                                </div>
                            </motion.div>
                        ) : (
                            <div className="bg-slate-50 border border-slate-200 border-dashed p-10 text-center space-y-4 rounded-2xl">
                                <div className="w-16 h-16 bg-white border border-slate-100 flex items-center justify-center mx-auto shadow-sm rounded-2xl">
                                    <Eye className="w-8 h-8 text-slate-300" />
                                </div>
                                <h4 className="text-sm font-bold text-slate-900 uppercase tracking-widest  leading-relaxed">
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