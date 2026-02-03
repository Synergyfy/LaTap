'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { Reward } from '@/lib/store/mockDashboardStore';
import { X, Plus } from 'lucide-react';

interface CreateRewardModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: Omit<Reward, 'id' | 'active'>) => void;
    isLoading: boolean;
}

interface RewardFormData {
    title: string;
    points: number;
    description: string;
}

export default function CreateRewardModal({ isOpen, onClose, onSubmit, isLoading }: CreateRewardModalProps) {
    const { register, handleSubmit, reset, formState: { errors } } = useForm<RewardFormData>();

    const handleFormSubmit = (data: RewardFormData) => {
        onSubmit(data);
        reset();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose}></div>
            <div className="relative w-full max-w-md bg-white rounded-2xl p-8 shadow-xl animate-in fade-in zoom-in duration-200">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h2 className="text-xl font-display font-bold text-text-main">Create New Reward</h2>
                        <p className="text-sm text-text-secondary">Set up a new loyalty reward</p>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                        <X className="text-text-secondary" size={20} />
                    </button>
                </div>

                <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
                    <div>
                        <label className="block text-xs font-bold text-text-secondary uppercase tracking-wider mb-1.5">
                            Reward Title
                        </label>
                        <input
                            {...register('title', { required: 'Title is required' })}
                            placeholder="e.g. Free Coffee"
                            className="w-full h-11 px-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:bg-white transition-all text-sm font-medium"
                        />
                        {errors.title && <span className="text-xs text-red-500 mt-1">{errors.title.message}</span>}
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-text-secondary uppercase tracking-wider mb-1.5">
                            Points Required
                        </label>
                        <input
                            type="number"
                            {...register('points', { required: 'Points are required', min: 1 })}
                            placeholder="e.g. 100"
                            className="w-full h-11 px-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:bg-white transition-all text-sm font-medium"
                        />
                         {errors.points && <span className="text-xs text-red-500 mt-1">{errors.points.message}</span>}
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-text-secondary uppercase tracking-wider mb-1.5">
                            Description
                        </label>
                        <textarea
                             {...register('description', { required: 'Description is required' })}
                            placeholder="Describe what the customer gets..."
                            rows={3}
                            className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:bg-white transition-all text-sm font-medium resize-none"
                        ></textarea>
                         {errors.description && <span className="text-xs text-red-500 mt-1">{errors.description.message}</span>}
                    </div>

                    <div className="pt-4 flex gap-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 h-12 flex items-center justify-center font-bold text-text-secondary bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors text-sm"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="flex-1 h-12 flex items-center justify-center gap-2 font-bold text-white bg-primary hover:bg-primary-hover rounded-xl transition-colors text-sm shadow-lg shadow-primary/25 disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {isLoading ? (
                                <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                            ) : (
                                <>
                                    <Plus size={18} />
                                    Create Reward
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
