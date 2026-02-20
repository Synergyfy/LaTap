'use client';

import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, MapPin, Building2, Check, Plus, Layers, X, Save } from 'lucide-react';
import { useBusinessStore } from '@/store/useBusinessStore';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';

export default function BranchSwitcher() {
    const { branches, activeBranchId, setActiveBranch, getActiveBranch, addBranch } = useBusinessStore();
    const [isOpen, setIsOpen] = useState(false);
    const [isCreating, setIsCreating] = useState(false);
    const [newBranchName, setNewBranchName] = useState('');
    const [newBranchAddress, setNewBranchAddress] = useState('');
    const dropdownRef = useRef<HTMLDivElement>(null);
    const activeBranch = getActiveBranch();

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
                setIsCreating(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleCreateBranch = () => {
        if (!newBranchName.trim()) {
            toast.error('Branch name is required');
            return;
        }
        addBranch({
            name: newBranchName.trim(),
            address: newBranchAddress.trim() || 'Address not set',
        });
        toast.success(`"${newBranchName}" branch created`);
        setNewBranchName('');
        setNewBranchAddress('');
        setIsCreating(false);
    };

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={() => { setIsOpen(!isOpen); setIsCreating(false); }}
                className="flex items-center gap-3 px-3 py-2 rounded-xl border border-gray-100 bg-gray-50/50 hover:bg-white hover:border-primary/20 transition-all duration-200 group"
            >
                <div className="size-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                    <Building2 size={18} />
                </div>
                <div className="text-left hidden sm:block">
                    <p className="text-[10px] font-black text-primary uppercase tracking-widest leading-none mb-1">
                        Active Branch
                    </p>
                    <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-text-main truncate max-w-[120px]">
                            {activeBranchId === 'all' ? 'All Branches' : (activeBranch?.name || 'Head Office')}
                        </span>
                        <ChevronDown
                            size={14}
                            className={`text-text-secondary transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                        />
                    </div>
                </div>
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        className="absolute top-full left-0 mt-2 w-72 bg-white rounded-2xl shadow-xl border border-gray-100 p-2 z-50 overflow-hidden"
                    >
                        {!isCreating ? (
                            <>
                                <div className="px-3 py-2 mb-1">
                                    <p className="text-[10px] font-black text-text-secondary uppercase tracking-widest">
                                        Switch Branch
                                    </p>
                                </div>

                                <div className="space-y-1">
                                    {/* All Branches Option */}
                                    <button
                                        onClick={() => { setActiveBranch('all'); setIsOpen(false); }}
                                        className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all duration-200 ${activeBranchId === 'all'
                                            ? 'bg-slate-900 text-white shadow-lg shadow-slate-900/20'
                                            : 'hover:bg-gray-50 text-text-main font-bold'
                                            }`}
                                    >
                                        <div className={`size-8 rounded-lg flex items-center justify-center ${activeBranchId === 'all' ? 'bg-white/20' : 'bg-gray-100 text-text-secondary'}`}>
                                            <Layers size={16} />
                                        </div>
                                        <div className="text-left flex-1 min-w-0">
                                            <p className={`text-sm font-bold truncate ${activeBranchId === 'all' ? 'text-white' : 'text-text-main'}`}>
                                                All Branches
                                            </p>
                                            <p className={`text-[10px] truncate ${activeBranchId === 'all' ? 'text-white/80' : 'text-text-secondary'}`}>
                                                Combined analytics & data
                                            </p>
                                        </div>
                                        {activeBranchId === 'all' && (
                                            <Check size={16} className="text-white shrink-0" />
                                        )}
                                    </button>

                                    {branches.map((branch) => (
                                        <button
                                            key={branch.id}
                                            onClick={() => { setActiveBranch(branch.id); setIsOpen(false); }}
                                            className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all duration-200 ${activeBranchId === branch.id
                                                ? 'bg-primary text-white shadow-lg shadow-primary/20'
                                                : 'hover:bg-gray-50 text-text-main'
                                                }`}
                                        >
                                            <div className={`size-8 rounded-lg flex items-center justify-center ${activeBranchId === branch.id ? 'bg-white/20' : 'bg-gray-100 text-text-secondary'}`}>
                                                <MapPin size={16} />
                                            </div>
                                            <div className="text-left flex-1 min-w-0">
                                                <p className={`text-sm font-bold truncate ${activeBranchId === branch.id ? 'text-white' : 'text-text-main'}`}>
                                                    {branch.name}
                                                </p>
                                                <p className={`text-[10px] truncate ${activeBranchId === branch.id ? 'text-white/80' : 'text-text-secondary'}`}>
                                                    {branch.address}
                                                </p>
                                            </div>
                                            {activeBranchId === branch.id && (
                                                <Check size={16} className="text-white shrink-0" />
                                            )}
                                        </button>
                                    ))}
                                </div>

                                <div className="mt-2 pt-2 border-t border-gray-100">
                                    <button
                                        onClick={() => setIsCreating(true)}
                                        className="w-full flex items-center gap-3 p-3 rounded-xl text-primary hover:bg-primary/5 transition-all duration-200"
                                    >
                                        <div className="size-8 rounded-lg bg-primary/10 flex items-center justify-center">
                                            <Plus size={18} />
                                        </div>
                                        <span className="text-sm font-bold">Add New Branch</span>
                                    </button>
                                </div>
                            </>
                        ) : (
                            /* Create Branch Form */
                            <div className="p-3 space-y-3">
                                <div className="flex items-center justify-between mb-1">
                                    <p className="text-[10px] font-black text-text-secondary uppercase tracking-widest">New Branch</p>
                                    <button
                                        onClick={() => setIsCreating(false)}
                                        className="size-6 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors"
                                    >
                                        <X size={14} className="text-text-secondary" />
                                    </button>
                                </div>
                                <input
                                    type="text"
                                    placeholder="Branch name *"
                                    value={newBranchName}
                                    onChange={(e) => setNewBranchName(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && handleCreateBranch()}
                                    autoFocus
                                    className="w-full h-10 bg-gray-50 border border-gray-200 rounded-xl px-3 text-sm font-bold focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                                />
                                <input
                                    type="text"
                                    placeholder="Address (optional)"
                                    value={newBranchAddress}
                                    onChange={(e) => setNewBranchAddress(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && handleCreateBranch()}
                                    className="w-full h-10 bg-gray-50 border border-gray-200 rounded-xl px-3 text-sm font-bold focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                                />
                                <div className="flex gap-2 pt-1">
                                    <button
                                        onClick={() => setIsCreating(false)}
                                        className="flex-1 h-9 bg-gray-50 text-text-secondary font-bold text-xs rounded-xl hover:bg-gray-100 border border-gray-200 transition-all"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={handleCreateBranch}
                                        className="flex-1 h-9 bg-primary text-white font-bold text-xs rounded-xl shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-1.5"
                                    >
                                        <Save size={13} />
                                        Create
                                    </button>
                                </div>
                            </div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
