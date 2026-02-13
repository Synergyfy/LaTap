"use client";

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, TrendingUp, X, CheckCircle, ArrowUpRight } from 'lucide-react';
import confetti from 'canvas-confetti';
import { cn } from '@/lib/utils';

interface EarnPointsModalProps {
    isOpen: boolean;
    onClose: () => void;
    pointsEarned: number;
    newBalance: number;
    message: string;
    breakdown?: {
        visitPoints?: number;
        spendingPoints?: number;
        bonusPoints?: number;
    };
    nextRewardPoints?: number;
}

export const EarnPointsModal: React.FC<EarnPointsModalProps> = ({
    isOpen,
    onClose,
    pointsEarned,
    newBalance,
    message,
    breakdown,
    nextRewardPoints
}) => {
    const [displayPoints, setDisplayPoints] = useState(0);

    useEffect(() => {
        if (isOpen) {
            // Confetti effect
            const duration = 3 * 1000;
            const animationEnd = Date.now() + duration;
            const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 9999 };

            const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

            const interval: any = setInterval(function () {
                const timeLeft = animationEnd - Date.now();

                if (timeLeft <= 0) {
                    return clearInterval(interval);
                }

                const particleCount = 50 * (timeLeft / duration);
                confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
                confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
            }, 250);

            // Points counter animation
            let start = 0;
            const end = pointsEarned;
            const time = 1000;
            const step = (time / end);
            const counter = setInterval(() => {
                start += 1;
                setDisplayPoints(start);
                if (start >= end) clearInterval(counter);
            }, step);

            return () => {
                clearInterval(interval);
                clearInterval(counter);
            };
        }
    }, [isOpen, pointsEarned]);

    const progress = nextRewardPoints ? (newBalance / nextRewardPoints) * 100 : 0;

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-100 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="relative bg-white w-full max-w-md overflow-hidden shadow-2xl border border-slate-100 p-8 text-center"
                    >
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 p-1 text-slate-400 hover:text-slate-600 transition-colors"
                        >
                            <X className="w-5 h-5" />
                        </button>

                        <motion.div
                            initial={{ rotate: -15, scale: 0 }}
                            animate={{ rotate: 0, scale: 1 }}
                            transition={{ type: "spring", damping: 12, delay: 0.2 }}
                            className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 relative"
                        >
                            <CheckCircle className="w-10 h-10 text-primary" />
                            <motion.div
                                animate={{ scale: [1, 1.2, 1] }}
                                transition={{ repeat: Infinity, duration: 2 }}
                                className="absolute inset-0 rounded-full bg-primary/5 -z-10"
                            />
                        </motion.div>

                        <h2 className="text-3xl font-display font-black text-slate-900 mb-2 leading-tight">
                            Awesome Work!
                        </h2>
                        <p className="text-slate-500 font-medium mb-8">
                            {message}
                        </p>

                        <div className="bg-slate-50 p-8 border border-slate-100 mb-8 relative group">
                            <div className="absolute top-0 left-0 w-full h-1 bg-primary/10" />
                            <div className="flex flex-col items-center">
                                <p className="text-[10px] font-black uppercase text-slate-400 tracking-[0.3em] mb-2">Points Earned</p>
                                <div className="flex items-center gap-3">
                                    <Sparkles className="w-6 h-6 text-amber-500 animate-pulse" />
                                    <span className="text-6xl font-display font-black text-primary leading-none">
                                        +{displayPoints}
                                    </span>
                                    <Sparkles className="w-6 h-6 text-amber-500 animate-pulse" />
                                </div>
                            </div>

                            {breakdown && (
                                <div className="mt-6 pt-6 border-t border-slate-100 grid grid-cols-2 gap-4">
                                    {breakdown.visitPoints && (
                                        <div className="text-left">
                                            <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Visit Bonus</p>
                                            <p className="font-bold text-slate-700">+{breakdown.visitPoints} pts</p>
                                        </div>
                                    )}
                                    {breakdown.spendingPoints && (
                                        <div className="text-left">
                                            <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Spending Reward</p>
                                            <p className="font-bold text-slate-700">+{breakdown.spendingPoints} pts</p>
                                        </div>
                                    )}
                                    {breakdown.bonusPoints && (
                                        <div className="text-left col-span-2 bg-amber-50 p-2 border border-amber-100">
                                            <p className="text-[9px] font-bold text-amber-600 uppercase tracking-wider">Special Bonus</p>
                                            <p className="font-bold text-amber-700">+{breakdown.bonusPoints} pts</p>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>

                        <div className="space-y-4">
                            <div className="flex justify-between items-center text-xs font-black uppercase tracking-widest text-slate-400">
                                <div className="flex items-center gap-2">
                                    <TrendingUp className="w-4 h-4 text-emerald-500" />
                                    <span>New Balance: {newBalance.toLocaleString()} pts</span>
                                </div>
                            </div>

                            {nextRewardPoints && (
                                <div className="space-y-2">
                                    <div className="w-full h-2 bg-slate-100 rounded-none overflow-hidden">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: `${progress}%` }}
                                            transition={{ duration: 1, delay: 0.5 }}
                                            className="h-full bg-emerald-500"
                                        />
                                    </div>
                                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider text-right">
                                        {(nextRewardPoints - newBalance).toLocaleString()} pts to next reward
                                    </p>
                                </div>
                            )}
                        </div>

                        <button
                            onClick={onClose}
                            className="w-full mt-10 h-14 bg-primary text-white font-black text-sm uppercase tracking-[0.2em] shadow-xl shadow-primary/20 hover:bg-primary/90 transition-all hover:-translate-y-0.5"
                        >
                            Continue Tapping
                        </button>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};
