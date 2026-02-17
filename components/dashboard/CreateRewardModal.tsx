
import React from 'react';
import { useForm } from 'react-hook-form';
import { Reward } from '@/lib/store/mockDashboardStore';
import { X, Plus, Info } from 'lucide-react';
import Tooltip from '@/components/ui/Tooltip';

interface CreateRewardModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: Omit<Reward, 'id' | 'active'>) => void;
    isLoading: boolean;
    initialData?: Reward | null;
}

interface RewardFormData {
    title: string;
    points: number;
    description: string;
}

import Modal from '@/components/ui/Modal';

export default function CreateRewardModal({ isOpen, onClose, onSubmit, isLoading, initialData }: CreateRewardModalProps) {
    const { register, handleSubmit, reset, formState: { errors } } = useForm<RewardFormData>();

    // Reset form when initialData changes
    React.useEffect(() => {
        if (isOpen) {
            reset(initialData ? {
                title: initialData.title,
                points: initialData.points,
                description: initialData.description,
            } : {
                title: '',
                points: 0,
                description: '',
            });
        }
    }, [isOpen, initialData, reset]);

    const handleFormSubmit = (data: RewardFormData) => {
        onSubmit(data);
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title={initialData ? 'Edit Reward' : 'Create New Reward'}
            description={initialData ? 'Update the details of your loyalty reward' : 'Set up a new loyalty reward for your customers'}
            size="md"
        >
            <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
                <div className="space-y-2">
                    <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">
                        Reward title
                        <Tooltip content="The name of the reward visible to customers." side="right">
                            <Info size={12} className="text-slate-400 hover:text-primary transition-colors cursor-help" />
                        </Tooltip>
                    </label>
                    <input
                        {...register('title', { required: 'Title is required' })}
                        placeholder="e.g. Free Coffee"
                        className="w-full h-12 px-4 bg-slate-50 border border-slate-100 rounded-xl focus:outline-none focus:ring-4 focus:ring-primary/5 focus:bg-white transition-all text-sm font-bold"
                    />
                    {errors.title && <span className="text-xs text-red-500 mt-1 ml-1 font-bold">{errors.title.message}</span>}
                </div>

                <div className="space-y-2">
                    <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">
                        Visits threshold
                        <Tooltip content="Number of visits required to unlock this reward." side="right">
                            <Info size={12} className="text-slate-400 hover:text-primary transition-colors cursor-help" />
                        </Tooltip>
                    </label>
                    <input
                        type="number"
                        {...register('points', { required: 'Visit threshold is required', min: 1 })}
                        placeholder="e.g. 5"
                        className="w-full h-12 px-4 bg-slate-50 border border-slate-100 rounded-xl focus:outline-none focus:ring-4 focus:ring-primary/5 focus:bg-white transition-all text-sm font-bold"
                    />
                    {errors.points && <span className="text-xs text-red-500 mt-1 ml-1 font-bold">{errors.points.message}</span>}
                </div>

                <div className="space-y-2">
                    <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">
                        Description
                        <Tooltip content="Brief explanation of the reward." side="right">
                            <Info size={12} className="text-slate-400 hover:text-primary transition-colors cursor-help" />
                        </Tooltip>
                    </label>
                    <textarea
                        {...register('description', { required: 'Description is required' })}
                        placeholder="Describe what the customer gets..."
                        rows={3}
                        className="w-full p-4 bg-slate-50 border border-slate-100 rounded-xl focus:outline-none focus:ring-4 focus:ring-primary/5 focus:bg-white transition-all text-sm font-bold resize-none"
                    ></textarea>
                    {errors.description && <span className="text-xs text-red-500 mt-1 ml-1 font-bold">{errors.description.message}</span>}
                </div>

                <div className="pt-4 flex gap-3">
                    <button
                        type="button"
                        onClick={onClose}
                        className="flex-1 h-12 flex items-center justify-center font-bold text-slate-500 bg-slate-50 hover:bg-slate-100 rounded-xl transition-colors text-sm active:scale-95"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="flex-[1.5] h-12 flex items-center justify-center gap-2 font-bold text-white bg-primary hover:bg-primary-hover rounded-xl transition-all text-sm shadow-xl shadow-primary/20 disabled:opacity-70 disabled:cursor-not-allowed active:scale-95"
                    >
                        {isLoading ? (
                            <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                        ) : (
                            <>
                                {!initialData && <Plus size={18} />}
                                {initialData ? 'Update Reward' : 'Create Reward'}
                            </>
                        )}
                    </button>
                </div>
            </form>
        </Modal>
    );
}
