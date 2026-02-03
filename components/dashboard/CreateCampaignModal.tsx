'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { X, Plus, Send, Calendar, Clock } from 'lucide-react';
import { Campaign } from '@/lib/store/mockDashboardStore';

interface CreateCampaignModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: any) => void;
    isLoading: boolean;
    initialData?: Campaign | null;
}

export default function CreateCampaignModal({ isOpen, onClose, onSubmit, isLoading, initialData }: CreateCampaignModalProps) {
    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        defaultValues: initialData ? {
            name: initialData.name,
            type: initialData.type,
            audience: initialData.audience,
            status: initialData.status,
        } : {
            type: 'WhatsApp',
            audience: 'All Customers',
            status: 'Active',
        }
    });

    const handleFormSubmit = (data: any) => {
        onSubmit(data);
        reset();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose}></div>
            <div className="relative w-full max-w-lg bg-white rounded-2xl p-8 shadow-2xl animate-in fade-in zoom-in duration-200">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h2 className="text-2xl font-display font-bold text-text-main">
                            {initialData ? 'Edit Campaign' : 'Create Campaign'}
                        </h2>
                        <p className="text-sm text-text-secondary">
                            {initialData ? 'Update your campaign details' : 'Reach your customers with targeted messaging'}
                        </p>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                        <X size={24} className="text-text-secondary" />
                    </button>
                </div>

                <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
                    <div>
                        <label className="block text-xs font-black uppercase tracking-widest text-text-secondary mb-2">Campaign Name</label>
                        <input
                            {...register('name', { required: 'Name is required' })}
                            placeholder="e.g. Weekend Flash Sale"
                            className="w-full h-12 px-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:bg-white transition-all font-bold text-sm"
                        />
                        {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name.message as string}</p>}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-black uppercase tracking-widest text-text-secondary mb-2">Channel</label>
                            <select
                                {...register('type')}
                                className="w-full h-12 px-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:bg-white transition-all font-bold text-sm"
                            >
                                <option value="WhatsApp">WhatsApp</option>
                                <option value="SMS">SMS</option>
                                <option value="Email">Email</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-xs font-black uppercase tracking-widest text-text-secondary mb-2">Status</label>
                            <select
                                {...register('status')}
                                className="w-full h-12 px-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:bg-white transition-all font-bold text-sm"
                            >
                                <option value="Active">Send Now (Active)</option>
                                <option value="Scheduled">Scheduled</option>
                                <option value="Draft">Draft</option>
                                <option value="Recurring">Recurring</option>
                            </select>
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs font-black uppercase tracking-widest text-text-secondary mb-2">Target Audience</label>
                        <select
                            {...register('audience')}
                            className="w-full h-12 px-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:bg-white transition-all font-bold text-sm"
                        >
                            <option value="All Customers">All Customers</option>
                            <option value="New Customers">New Customers Only</option>
                            <option value="Frequent Visitors">Frequent Visitors (3+ visits)</option>
                            <option value="Inactive Customers">Inactive (30+ days)</option>
                            <option value="VIP Members">VIP Members Only</option>
                        </select>
                    </div>

                    <div className="pt-4 flex gap-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 h-14 bg-gray-50 text-text-secondary font-bold rounded-xl hover:bg-gray-100 transition-all text-sm active:scale-95"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="flex-3 h-14 bg-primary text-white font-bold rounded-xl hover:bg-primary-hover transition-all shadow-lg shadow-primary/20 flex items-center justify-center gap-2 active:scale-95 disabled:opacity-50"
                        >
                            {isLoading ? (
                                <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                            ) : (
                                <>
                                    {initialData ? <Edit size={20} /> : <Plus size={20} />}
                                    {initialData ? 'Update Campaign' : 'Create Campaign'}
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

import { Edit } from 'lucide-react';
