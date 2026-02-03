'use client';

import React, { useEffect } from 'react';
import { X, Nfc, Trash2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { Device } from '@/lib/store/mockDashboardStore';

interface EditDeviceModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (id: string, updates: Partial<Device>) => void;
    onDelete: (id: string) => void;
    device: Device | null;
    isLoading?: boolean;
}

interface EditDeviceFormData {
    name: string;
    location: string;
    status: 'active' | 'inactive';
}

export default function EditDeviceModal({
    isOpen,
    onClose,
    onSubmit,
    onDelete,
    device,
    isLoading
}: EditDeviceModalProps) {
    const { register, handleSubmit, formState: { errors }, reset, watch } = useForm<EditDeviceFormData>();
    const currentStatus = watch('status');

    useEffect(() => {
        if (device) {
            reset({
                name: device.name,
                location: device.location,
                status: device.status
            });
        }
    }, [device, reset]);

    const handleFormSubmit = (data: EditDeviceFormData) => {
        if (device) {
            onSubmit(device.id, data);
        }
    };

    const handleClose = () => {
        onClose();
    };

    if (!isOpen || !device) return null;

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
                            <h2 className="text-xl font-display font-bold text-text-main">Configure</h2>
                            <p className="text-[10px] text-text-secondary font-black uppercase tracking-widest mt-0.5">{device.code}</p>
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
                    {/* Input Group: Name & Location */}
                    <div className="space-y-6">
                        <div>
                            <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-text-secondary mb-2.5 ml-1">
                                Display Name
                            </label>
                            <input
                                {...register('name', { required: 'Name is required' })}
                                type="text"
                                placeholder="e.g. Front Door"
                                className="w-full px-4 py-3 bg-gray-50/50 border border-gray-100 rounded-xl text-sm font-semibold focus:outline-none focus:ring-4 focus:ring-primary/5 focus:bg-white focus:border-primary/20 transition-all"
                            />
                            {errors.name && (
                                <p className="text-red-500 text-[9px] font-black mt-1.5 ml-1 uppercase tracking-tighter">{errors.name.message}</p>
                            )}
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
                                <p className="text-red-500 text-[9px] font-black mt-1.5 ml-1 uppercase tracking-tighter">{errors.location.message}</p>
                            )}
                        </div>
                    </div>

                    {/* Status Toggle */}
                    <div>
                        <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-text-secondary mb-3 ml-1">
                            Current Status
                        </label>
                        <div className="grid grid-cols-2 gap-3">
                            <label className={`
                                flex items-center justify-center gap-2 p-3 border rounded-xl cursor-pointer transition-all
                                ${currentStatus === 'active' ? 'border-emerald-200 bg-emerald-50 text-emerald-700' : 'border-gray-100 bg-gray-50/50 text-gray-400'}
                            `}>
                                <input {...register('status')} type="radio" value="active" className="hidden" />
                                <span className={`w-2 h-2 rounded-full ${currentStatus === 'active' ? 'bg-emerald-500' : 'bg-gray-300'}`}></span>
                                <span className="text-xs font-bold">Online</span>
                            </label>
                            <label className={`
                                flex items-center justify-center gap-2 p-3 border rounded-xl cursor-pointer transition-all
                                ${currentStatus === 'inactive' ? 'border-rose-200 bg-rose-50 text-rose-700' : 'border-gray-100 bg-gray-50/50 text-gray-400'}
                            `}>
                                <input {...register('status')} type="radio" value="inactive" className="hidden" />
                                <span className={`w-2 h-2 rounded-full ${currentStatus === 'inactive' ? 'bg-rose-500' : 'bg-gray-300'}`}></span>
                                <span className="text-xs font-bold">Offline</span>
                            </label>
                        </div>
                    </div>

                    {/* Compact Diagnostics */}
                    <div className="pt-6 border-t border-gray-50 grid grid-cols-2 gap-y-4 gap-x-8">
                        <div>
                            <p className="text-[9px] font-black uppercase tracking-widest text-text-secondary mb-1">Battery</p>
                            <div className="flex items-center gap-2">
                                <div className="h-1 flex-1 bg-gray-100 rounded-full overflow-hidden">
                                    <div
                                        className={`h-full transition-all ${device.batteryLevel < 20 ? 'bg-rose-500' : 'bg-emerald-500'}`}
                                        style={{ width: `${device.batteryLevel}%` }}
                                    ></div>
                                </div>
                                <span className="text-xs font-bold text-text-main tabular-nums">{device.batteryLevel}%</span>
                            </div>
                        </div>
                        <div>
                            <p className="text-[9px] font-black uppercase tracking-widest text-text-secondary mb-1">Activity</p>
                            <p className="text-xs font-bold text-text-main">{device.lastActive}</p>
                        </div>
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
                                    Apply Changes
                                    <span className="material-icons-round text-sm">auto_awesome</span>
                                </>
                            )}
                        </button>

                        <div className="flex items-center justify-between gap-4 px-1">
                            <button
                                type="button"
                                onClick={handleClose}
                                className="text-xs font-bold text-text-secondary hover:text-text-main transition-colors cursor-pointer"
                            >
                                Cancel
                            </button>
                            <button
                                type="button"
                                onClick={() => {
                                    if (confirm('Are you sure you want to remove this device? This cannot be undone.')) {
                                        onDelete(device.id);
                                    }
                                }}
                                className="text-xs font-bold text-rose-500 hover:text-rose-600 transition-colors cursor-pointer flex items-center gap-1.5"
                            >
                                <Trash2 size={12} />
                                Remove Tag
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}
