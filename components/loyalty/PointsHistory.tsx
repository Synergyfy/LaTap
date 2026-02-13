"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Plus, Minus, Coffee, Star, Smartphone, Dumbbell, Gift, Ticket, Zap } from 'lucide-react';
import { PointTransaction } from '@/types/loyalty';
import { cn } from '@/lib/utils';

interface PointsHistoryProps {
    transactions: PointTransaction[];
    className?: string;
}

const TRANSACTION_ICONS: Record<string, any> = {
    'coffee': Coffee,
    'tech': Smartphone,
    'gym': Dumbbell,
    'visit': Zap,
    'reward': Gift,
    'redeem': Ticket,
    'default': Star
};

export const PointsHistory: React.FC<PointsHistoryProps> = ({ transactions, className }) => {
    return (
        <div className={cn("space-y-4", className)}>
            {transactions.length === 0 ? (
                <div className="text-center py-12 bg-slate-50 border border-dashed border-slate-200">
                    <p className="text-slate-400 text-sm">No recent activity found.</p>
                </div>
            ) : (
                transactions.map((transaction, index) => {
                    const isEarn = transaction.transactionType === 'earn' || transaction.transactionType === 'bonus' || transaction.transactionType === 'adjustment' && transaction.pointsAmount > 0;
                    const Icon = TRANSACTION_ICONS[transaction.metadata?.icon || (transaction.transactionType === 'redeem' ? 'redeem' : 'default')];

                    return (
                        <motion.div
                            key={transaction.id}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3, delay: index * 0.05 }}
                            className="group flex items-center justify-between p-4 bg-white border border-slate-100 hover:border-slate-200 hover:shadow-sm transition-all"
                        >
                            <div className="flex items-center gap-4">
                                <div className={cn(
                                    "w-12 h-12 flex items-center justify-center shrink-0",
                                    isEarn ? "bg-emerald-50 text-emerald-600" : "bg-rose-50 text-rose-600"
                                )}>
                                    <Icon className="w-6 h-6" />
                                </div>
                                <div>
                                    <h5 className="font-bold text-slate-900 group-hover:text-primary transition-colors text-sm">
                                        {transaction.reason}
                                    </h5>
                                    <div className="flex items-center gap-2 mt-1">
                                        <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                                            {new Date(transaction.createdAt).toLocaleDateString(undefined, {
                                                month: 'short',
                                                day: 'numeric',
                                                hour: '2-digit',
                                                minute: '2-digit'
                                            })}
                                        </span>
                                        {transaction.metadata?.verified && (
                                            <>
                                                <span className="w-1 h-1 rounded-full bg-slate-200" />
                                                <span className="text-[10px] text-primary font-black uppercase tracking-tighter italic">Verified</span>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="text-right">
                                <div className={cn(
                                    "inline-flex items-center gap-1 font-black text-sm px-3 py-1 border shadow-sm",
                                    isEarn ? "bg-emerald-50 text-emerald-700 border-emerald-100" : "bg-rose-50 text-rose-700 border-rose-100"
                                )}>
                                    {isEarn ? <Plus className="w-3 h-3" /> : <Minus className="w-3 h-3" />}
                                    {Math.abs(transaction.pointsAmount).toLocaleString()}
                                </div>
                                {transaction.transactionType === 'bonus' && (
                                    <p className="text-[9px] text-amber-500 font-black uppercase tracking-widest mt-1">Bonus Applied</p>
                                )}
                            </div>
                        </motion.div>
                    );
                })
            )}
        </div>
    );
};
