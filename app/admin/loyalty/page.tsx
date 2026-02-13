"use client";

import React from 'react';
import AdminSidebar from '@/components/admin/AdminSidebar';
import PageHeader from '@/components/dashboard/PageHeader';
import {
    Building2, Users, Star, AlertTriangle,
    TrendingUp, ArrowUpRight, ArrowDownRight,
    ShieldAlert, Activity, PieChart
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

const GLOBAL_STATS = [
    { label: 'Total Issuers', value: '452', change: 15.2, icon: Building2, trend: 'up' },
    { label: 'Active Members', value: '124,802', change: 24.5, icon: Users, trend: 'up' },
    { label: 'Points in Circulation', value: '8.4M', change: 8.2, icon: Star, trend: 'up' },
    { label: 'Fraud Alerts', value: '12', change: -45.0, icon: ShieldAlert, trend: 'down' },
];

export default function AdminLoyaltyPage() {
    return (
        <AdminSidebar>
            <div className="p-8 space-y-10">
                <div className="mb-8">
                    <h1 className="text-3xl font-display font-bold text-text-main mb-2 uppercase italic tracking-tighter">System Loyalty Control</h1>
                    <p className="text-text-secondary uppercase text-[10px] tracking-widest font-black">Platform-Wide Reward Ecosystem Monitoring</p>
                </div>

                {/* Global Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {GLOBAL_STATS.map((stat, index) => (
                        <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.3, delay: index * 0.1 }}
                            className="p-6 bg-white border border-slate-200 shadow-sm hover:shadow-md transition-all group relative overflow-hidden"
                        >
                            <div className="flex items-center justify-between mb-4 relative z-10">
                                <div className="w-10 h-10 bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                                    <stat.icon className="w-5 h-5" />
                                </div>
                                <div className={cn(
                                    "flex items-center gap-1 text-[10px] font-black uppercase tracking-widest px-2 py-0.5 border",
                                    stat.trend === 'up' ? "bg-emerald-50 text-emerald-600 border-emerald-100" : "bg-rose-50 text-rose-600 border-rose-100"
                                )}>
                                    {stat.trend === 'up' ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                                    {Math.abs(stat.change)}%
                                </div>
                            </div>
                            <p className="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em] mb-1 relative z-10">{stat.label}</p>
                            <h4 className="text-2xl font-display font-black text-slate-900 group-hover:text-primary transition-colors relative z-10">{stat.value}</h4>

                            <div className="absolute -bottom-4 -right-4 w-16 h-16 bg-slate-50 rounded-full opacity-50 group-hover:bg-primary/5 transition-colors" />
                        </motion.div>
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    {/* System Activity Chart Placeholder */}
                    <div className="lg:col-span-8 bg-white border border-slate-200 p-8 shadow-sm">
                        <div className="flex items-center justify-between mb-10">
                            <div>
                                <h3 className="text-lg font-bold text-slate-900 uppercase tracking-tight italic">Platform Trajectory</h3>
                                <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest">Aggregate point issuance vs redemptions (Last 90 days)</p>
                            </div>
                            <div className="flex items-center gap-6">
                                <div className="flex items-center gap-2">
                                    <span className="w-2.5 h-2.5 bg-primary" />
                                    <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">Issuance</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="w-2.5 h-2.5 bg-slate-200" />
                                    <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">Liquidations</span>
                                </div>
                            </div>
                        </div>

                        <div className="h-[350px] w-full bg-slate-50/50 flex flex-col items-center justify-center border-2 border-dashed border-slate-100 relative group overflow-hidden">
                            <Activity className="w-16 h-16 text-slate-200 transition-transform group-hover:scale-110" />
                            <p className="text-[10px] font-black uppercase tracking-widest text-slate-300 mt-4">Cross-Core Data Stream Active...</p>
                            <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                    </div>

                    {/* Alerts & Critical Status */}
                    <div className="lg:col-span-4 space-y-6">
                        <div className="bg-slate-900 p-8 text-white shadow-xl relative overflow-hidden">
                            <div className="relative z-10">
                                <div className="flex items-center gap-3 mb-8">
                                    <ShieldAlert className="w-5 h-5 text-rose-500" />
                                    <h3 className="text-lg font-bold italic tracking-tight uppercase">Security Pulse</h3>
                                </div>

                                <div className="space-y-4">
                                    {[
                                        { msg: 'Abnormal check-in velocity detected at BISTRO_001', type: 'risk' },
                                        { msg: 'Point inflation threshold exceeded in sector: RETAIL', type: 'warn' },
                                        { msg: '3 duplicate redemption codes invalidated by Core', type: 'info' },
                                    ].map((alert, i) => (
                                        <div key={i} className="p-3 bg-white/5 border-l-2 border-white/10 flex gap-3 items-start">
                                            <div className={cn(
                                                "w-1.5 h-1.5 rounded-full mt-1.5",
                                                alert.type === 'risk' ? "bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.5)]" :
                                                    alert.type === 'warn' ? "bg-yellow-500" : "bg-blue-400"
                                            )} />
                                            <p className="text-[10px] font-medium text-white/60 leading-relaxed uppercase tracking-wide">{alert.msg}</p>
                                        </div>
                                    ))}
                                </div>

                                <button className="w-full h-12 mt-8 bg-white/5 border border-white/10 text-[10px] font-black uppercase tracking-widest hover:bg-white/10 transition-all">
                                    Audit Fraud Logs
                                </button>
                            </div>
                            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 blur-3xl -translate-y-16 translate-x-16" />
                        </div>

                        <div className="bg-white border border-slate-200 p-8 shadow-sm">
                            <div className="flex items-center gap-3 mb-8">
                                <PieChart className="w-5 h-5 text-primary" />
                                <h3 className="text-lg font-bold text-slate-900 tracking-tight uppercase italic">Sector Split</h3>
                            </div>

                            <div className="space-y-4">
                                {[
                                    { label: 'Hospitality', value: 42 },
                                    { label: 'Retail', value: 35 },
                                    { label: 'Entertainment', value: 15 },
                                    { label: 'Corporate', value: 8 },
                                ].map((sector) => (
                                    <div key={sector.label} className="space-y-1.5">
                                        <div className="flex justify-between text-[10px] font-black uppercase tracking-widest">
                                            <span className="text-slate-400">{sector.label}</span>
                                            <span className="text-slate-900">{sector.value}%</span>
                                        </div>
                                        <div className="h-1 bg-slate-100 rounded-full overflow-hidden">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                animate={{ width: `${sector.value}%` }}
                                                className="h-full bg-primary"
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AdminSidebar>
    );
}
