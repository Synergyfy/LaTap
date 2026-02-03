'use client';

import React, { useState } from 'react';
import { X } from 'lucide-react';
import { useForm } from 'react-hook-form';

interface AddVisitorModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: VisitorFormData) => void;
    isLoading?: boolean;
}

export interface VisitorFormData {
    name: string;
    email: string;
    phone: string;
    status: string;
}

export default function AddVisitorModal({ isOpen, onClose, onSubmit, isLoading }: AddVisitorModalProps) {
    const { register, handleSubmit, formState: { errors }, reset } = useForm<VisitorFormData>();

    const handleFormSubmit = (data: VisitorFormData) => {
        onSubmit(data);
        reset();
    };

    const handleClose = () => {
        reset();
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl max-w-md w-full shadow-2xl">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-200">
                    <h2 className="text-xl font-display font-bold text-text-main">Add New Visitor</h2>
                    <button
                        onClick={handleClose}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit(handleFormSubmit)} className="p-6 space-y-4">
                    {/* Name */}
                    <div>
                        <label className="block text-sm font-bold text-text-main mb-2">
                            Full Name *
                        </label>
                        <input
                            {...register('name', { required: 'Name is required' })}
                            type="text"
                            placeholder="Enter visitor's full name"
                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:bg-white transition-all"
                        />
                        {errors.name && (
                            <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
                        )}
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block text-sm font-bold text-text-main mb-2">
                            Email Address *
                        </label>
                        <input
                            {...register('email', {
                                required: 'Email is required',
                                pattern: {
                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                    message: 'Invalid email address'
                                }
                            })}
                            type="email"
                            placeholder="visitor@example.com"
                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:bg-white transition-all"
                        />
                        {errors.email && (
                            <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
                        )}
                    </div>

                    {/* Phone */}
                    <div>
                        <label className="block text-sm font-bold text-text-main mb-2">
                            Phone Number *
                        </label>
                        <input
                            {...register('phone', { required: 'Phone is required' })}
                            type="tel"
                            placeholder="+234 800 000 0000"
                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:bg-white transition-all"
                        />
                        {errors.phone && (
                            <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>
                        )}
                    </div>

                    {/* Status */}
                    <div>
                        <label className="block text-sm font-bold text-text-main mb-2">
                            Status *
                        </label>
                        <select
                            {...register('status', { required: 'Status is required' })}
                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:bg-white transition-all"
                        >
                            <option value="">Select status</option>
                            <option value="New">New</option>
                            <option value="Active">Active</option>
                            <option value="Returning">Returning</option>
                            <option value="VIP">VIP</option>
                            <option value="Inactive">Inactive</option>
                        </select>
                        {errors.status && (
                            <p className="text-red-500 text-xs mt-1">{errors.status.message}</p>
                        )}
                    </div>

                    {/* Actions */}
                    <div className="flex gap-3 pt-4">
                        <button
                            type="button"
                            onClick={handleClose}
                            className="flex-1 px-4 py-3 bg-gray-100 text-text-main font-bold rounded-lg hover:bg-gray-200 transition-colors text-sm"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="flex-1 px-4 py-3 bg-primary text-white font-bold rounded-lg hover:bg-primary-hover transition-colors text-sm disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            {isLoading ? (
                                <>
                                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                    Adding...
                                </>
                            ) : (
                                'Add Visitor'
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
