'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Wallet, CreditCard, Star, ShieldCheck, Zap } from 'lucide-react';
import { useMessagingStore } from '@/lib/store/useMessagingStore';
import { notify } from '@/lib/notify';

interface TopUpModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const POINT_PACKS = [
    { points: 1000, price: 'NGN 5,000', popular: false, icon: Zap },
    { points: 5000, price: 'NGN 20,000', popular: true, bonus: '500 Bonus Points', icon: Star },
    { points: 10000, price: 'NGN 35,000', popular: false, bonus: '1,500 Bonus Points', icon: ShieldCheck },
];

export default function TopUpModal({ isOpen, onClose }: TopUpModalProps) {
    const { addRecharge } = useMessagingStore();
    const [selectedPack, setSelectedPack] = useState(1);

    const handlePurchase = () => {
        const pack = POINT_PACKS[selectedPack];
        const totalPoints = pack.points + (pack.bonus ? parseInt(pack.bonus.replace(',', '')) : 0);
        addRecharge(totalPoints);
        notify.success(`Successfully added ${totalPoints.toLocaleString()} points to your wallet!`);
        onClose();
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
                    />
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="relative w-full max-w-xl bg-white rounded-[2.5rem] shadow-2xl overflow-hidden"
                    >
                        <div className="p-8 border-b border-gray-100 bg-gray-50/50 flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="size-12 bg-primary flex items-center justify-center rounded-2xl shadow-lg shadow-primary/20">
                                    <Wallet className="text-white" size={24} />
                                </div>
                                <div>
                                    <h3 className="text-xl font-display font-black text-text-main uppercase tracking-tight leading-none mb-1">Top-up Points</h3>
                                    <p className="text-[10px] text-text-secondary font-medium uppercase tracking-[0.2em]">Purchase messaging credits</p>
                                </div>
                            </div>
                            <button
                                onClick={onClose}
                                className="size-10 bg-white border border-gray-100 rounded-xl flex items-center justify-center hover:bg-gray-50 transition-all shadow-sm"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        <div className="p-8 space-y-6">
                            <p className="text-sm text-text-secondary text-center max-w-sm mx-auto">
                                Points can be used across WhatsApp, SMS, and Email channels. Higher packs include bonus points.
                            </p>

                            <div className="grid grid-cols-1 gap-4">
                                {POINT_PACKS.map((pack, i) => (
                                    <button
                                        key={i}
                                        onClick={() => setSelectedPack(i)}
                                        className={`relative p-5 rounded-2xl border-2 transition-all flex items-center justify-between text-left ${selectedPack === i
                                                ? 'border-primary bg-primary/5'
                                                : 'border-slate-100 bg-white hover:border-slate-200'
                                            }`}
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className={`size-10 rounded-xl flex items-center justify-center ${selectedPack === i ? 'bg-primary text-white' : 'bg-slate-50 text-slate-400'
                                                }`}>
                                                <pack.icon size={20} />
                                            </div>
                                            <div>
                                                <div className="flex items-center gap-2">
                                                    <span className="text-lg font-black text-text-main">{pack.points.toLocaleString()} Points</span>
                                                    {pack.popular && (
                                                        <span className="text-[8px] font-black uppercase px-2 py-0.5 bg-primary text-white rounded-full">Best Value</span>
                                                    )}
                                                </div>
                                                <span className="text-xs font-bold text-text-secondary">{pack.price}</span>
                                            </div>
                                        </div>
                                        {pack.bonus && (
                                            <div className="text-right">
                                                <span className="text-[10px] font-black text-primary uppercase block">{pack.bonus}</span>
                                            </div>
                                        )}
                                    </button>
                                ))}
                            </div>

                            <button
                                onClick={handlePurchase}
                                className="w-full h-14 bg-primary text-white font-black uppercase tracking-widest text-xs rounded-2xl shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3 mt-4"
                            >
                                <CreditCard size={18} />
                                Purchase Points
                            </button>

                            <p className="text-[10px] text-text-secondary text-center uppercase tracking-tighter">
                                Secure payment powered by Paystack & Flutterwave
                            </p>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
