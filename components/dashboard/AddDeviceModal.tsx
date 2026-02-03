'use client';

import React from 'react';
import { X, Nfc } from 'lucide-react';
import { useForm } from 'react-hook-form';

interface AddDeviceModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: DeviceFormData) => void;
    isLoading?: boolean;
}

export interface DeviceFormData {
    name: string;
    type: 'Card' | 'Sticker' | 'Fob';
    code: string;
    location: string;
}

export default function AddDeviceModal({ isOpen, onClose, onSubmit, isLoading }: AddDeviceModalProps) {
    const { register, handleSubmit, formState: { errors }, reset } = useForm<DeviceFormData>({
        defaultValues: {
            type: 'Card'
        }
    });

    const handleFormSubmit = (data: DeviceFormData) => {
        onSubmit(data);
        reset();
    };

    const handleClose = () => {
        reset();
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
            <div className="bg-white rounded-4xl max-w-sm w-full shadow-2xl overflow-hidden border border-gray-100">
                {/* Header */}
                <div className="flex items-center justify-between p-7 pb-5">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-2xl bg-primary/5 flex items-center justify-center text-primary">
                            <Nfc size={22} />
                        </div>
                        <div>
                            <h2 className="text-xl font-display font-bold text-text-main">Link Device</h2>
                            <p className="text-[10px] text-text-secondary font-black uppercase tracking-widest mt-0.5">Hardware Registration</p>
                        </div>
                    </div>
                    <button
                        onClick={handleClose}
                        className="p-2 hover:bg-gray-50 rounded-xl transition-colors cursor-pointer group"
                    >
                        <X size={18} className="text-gray-400 group-hover:text-text-main" />
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit(handleFormSubmit)} className="px-7 pb-7 space-y-7">
                    {/* Input Group */}
                    <div className="space-y-6">
                        <div>
                            <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-text-secondary mb-2.5 ml-1">
                                Tag Name
                            </label>
                            <input
                                {...register('name', { required: 'Name is required' })}
                                type="text"
                                placeholder="e.g. Front Door"
                                className="w-full px-4 py-3 bg-gray-50/50 border border-gray-100 rounded-xl text-sm font-semibold focus:outline-none focus:ring-4 focus:ring-primary/5 focus:bg-white focus:border-primary/20 transition-all"
                            />
                            {errors.name && (
                                <p className="text-red-500 text-[9px] font-black mt-1.5 ml-1 uppercase">{errors.name.message}</p>
                            )}
                        </div>

                        <div>
                            <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-text-secondary mb-2.5 ml-1">
                                Registration Code
                            </label>
                            <input
                                {...register('code', { required: 'Code is required' })}
                                type="text"
                                placeholder="NFC-000-00"
                                className="w-full px-4 py-3 bg-gray-50/50 border border-gray-100 rounded-xl text-sm font-semibold focus:outline-none focus:ring-4 focus:ring-primary/5 focus:bg-white focus:border-primary/20 transition-all uppercase"
                            />
                            {errors.code && (
                                <p className="text-red-500 text-[9px] font-black mt-1.5 ml-1 uppercase">{errors.code.message}</p>
                            )}
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-text-secondary mb-2.5 ml-1">
                                    Type
                                </label>
                                <select
                                    {...register('type', { required: 'Type is required' })}
                                    className="w-full px-4 py-3 bg-gray-50/50 border border-gray-100 rounded-xl text-xs font-bold focus:outline-none focus:ring-4 focus:ring-primary/5 focus:bg-white focus:border-primary/20 transition-all appearance-none cursor-pointer"
                                >
                                    <option value="Card">PVC Card</option>
                                    <option value="Sticker">Sticker</option>
                                    <option value="Fob">Key Fob</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-text-secondary mb-2.5 ml-1">
                                    Placement
                                </label>
                                <input
                                    {...register('location', { required: 'Location is required' })}
                                    type="text"
                                    placeholder="Main Hall"
                                    className="w-full px-4 py-3 bg-gray-50/50 border border-gray-100 rounded-xl text-sm font-semibold focus:outline-none focus:ring-4 focus:ring-primary/5 focus:bg-white focus:border-primary/20 transition-all"
                                />
                                {errors.location && (
                                    <p className="text-red-500 text-[9px] font-black mt-1.5 ml-1 uppercase">{errors.location.message}</p>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="p-4 bg-amber-50 rounded-2xl border border-amber-100/50 flex gap-3">
                        <span className="material-icons-round text-amber-600 text-sm mt-0.5 shrink-0">info</span>
                        <p className="text-[10px] text-amber-900 leading-relaxed font-semibold">
                            Ensure your physical tag is nearby. The code is usually found on the back of the device.
                        </p>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col gap-3 pt-4">
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full px-6 py-4 bg-primary text-white font-bold rounded-2xl hover:bg-primary-hover transition-all shadow-xl shadow-primary/20 text-sm disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer"
                        >
                            {isLoading ? (
                                <span className="material-icons-round animate-spin text-sm">refresh</span>
                            ) : (
                                <>
                                    Link Hardware
                                    <span className="material-icons-round text-sm">link</span>
                                </>
                            )}
                        </button>
                        <button
                            type="button"
                            onClick={handleClose}
                            className="w-full py-2 text-xs font-bold text-text-secondary hover:text-text-main transition-colors cursor-pointer"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
