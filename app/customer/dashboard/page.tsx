'use client';

import React, { useState, useEffect } from 'react';
import CustomerSidebar from '@/components/customer/CustomerSidebar';
import Modal from '@/components/ui/Modal';
import Link from 'next/link';
import {
    History, Star, PiggyBank, Coffee, Smartphone, Dumbbell,
    QrCode, Scan, X, ExternalLink, ArrowRight, ChevronRight
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/useAuthStore';
import { notify } from '@/lib/notify';

export default function CustomerDashboardPage() {
    const { user, isAuthenticated } = useAuthStore();
    const router = useRouter();
    const [showIdModal, setShowIdModal] = useState(false);

    useEffect(() => {
        if (!isAuthenticated || user?.role !== 'customer') {
            router.push('/login');
        }
    }, [isAuthenticated, user, router]);

    if (!isAuthenticated || user?.role !== 'customer') {
        return null;
    }

    const stats = [
        { label: 'Total Visits', value: '42', icon: History, color: 'blue' },
        { label: 'Reward Points', value: '1,250', icon: Star, color: 'primary' },
        { label: 'Net Savings', value: '₦15,000', icon: PiggyBank, color: 'green' },
    ];

    const recentVisits = [
        { id: 1, place: 'Green Terrace Cafe', date: 'Today, 10:30 AM', points: '+50', icon: Coffee },
        { id: 2, place: 'NextGen Tech Store', date: 'Yesterday, 4:15 PM', points: '+120', icon: Smartphone },
        { id: 3, place: 'Fitness Center', date: 'Feb 1, 9:00 AM', points: '+30', icon: Dumbbell },
        { id: 4, place: 'Green Terrace Cafe', date: 'Jan 28, 11:00 AM', points: '+50', icon: Coffee },
    ];

    const handleRedeem = (reward: string, points: number) => {
        if (points > 1250) {
            notify.error(`Insufficient points to redeem ${reward}`);
            return;
        }
        notify.success(`Success! Your reward voucher for ${reward} is now active.`);
    };

    return (
        <CustomerSidebar>
            <div className="max-w-7xl mx-auto space-y-8 pb-12">

                {/* ID Card / Quick Scan - Hero Section */}
                <div className="bg-linear-to-br from-primary via-blue-600 to-indigo-700 rounded-lg p-8 md:p-12 text-white relative overflow-hidden shadow-2xl shadow-primary/30 group">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full translate-x-32 -translate-y-32 blur-3xl group-hover:scale-110 transition-transform duration-700"></div>
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/20 rounded-full -translate-x-20 translate-y-20 blur-2xl"></div>

                    <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-10">
                        <div className="text-center md:text-left flex-1">
                            <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/20 rounded-full text-[10px] font-black uppercase tracking-widest mb-4 backdrop-blur-md border border-white/10">
                                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                                Member ID: EC-{user?.id || '2847'}
                            </span>
                            <h1 className="text-4xl md:text-5xl font-display font-bold mb-4 tracking-tight leading-tight">
                                Welcome back, <br />
                                {user?.name?.split(' ')[0] || 'Customer'}!
                            </h1>
                            <p className="text-blue-50 text-base md:text-lg max-w-lg mb-8 font-medium leading-relaxed opacity-90">
                                Visit participating venues and tap your phone at the EntryConnect terminal to earn rewards instantly.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                                <button
                                    onClick={() => setShowIdModal(true)}
                                    className="bg-white text-primary px-8 py-4 rounded-lg font-black text-sm shadow-xl hover:shadow-2xl hover:-translate-y-0.5 transition-all active:scale-95 flex items-center justify-center gap-3"
                                >
                                    <Scan size={20} />
                                    Show My Digital ID
                                </button>
                                <Link
                                    href="/customer/rewards"
                                    className="bg-primary-hover/30 text-white border border-white/20 px-8 py-4 rounded-lg font-black text-sm backdrop-blur-sm hover:bg-white/10 transition-all flex items-center justify-center gap-2"
                                >
                                    Browse Perks
                                    <ArrowRight size={18} />
                                </Link>
                            </div>
                        </div>
                        <div
                            onClick={() => setShowIdModal(true)}
                            className="bg-white p-8 rounded-lg shadow-2xl transform hover:scale-105 transition-all duration-500 cursor-pointer"
                        >
                            <div className="relative">
                                <QrCode size={160} className="text-text-main" />
                                <div className="absolute inset-0 flex items-center justify-center bg-white/0 hover:bg-white/5 transition-colors"></div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[
                        { label: 'Total Visits', value: '42', icon: History, color: 'blue' },
                        { label: 'Reward Points', value: '1,250', icon: Star, color: 'primary' },
                        { label: 'Net Savings', value: '₦15,000', icon: PiggyBank, color: 'green' },
                    ].map((stat, index) => {
                        const IconComponent = stat.icon;
                        return (
                            <div key={index} className="bg-white p-6 rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-all group">
                                <div className="flex items-center gap-4">
                                    <div className={`w-14 h-14 rounded-lg flex items-center justify-center transition-colors ${stat.color === 'blue' ? 'bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white' :
                                        stat.color === 'primary' ? 'bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white' :
                                            'bg-green-50 text-green-600 group-hover:bg-green-600 group-hover:text-white'
                                        }`}>
                                        <IconComponent size={24} />
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-[10px] font-black uppercase text-text-secondary tracking-[0.15em] mb-1">{stat.label}</p>
                                        <p className="text-2xl font-display font-bold text-text-main">{stat.value}</p>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                    {/* Recent Activity */}
                    <div className="lg:col-span-3 bg-white p-8 rounded-lg border border-gray-100 shadow-sm">
                        <div className="flex items-center justify-between mb-8">
                            <div>
                                <h3 className="font-display font-bold text-xl text-text-main">Recent Activity</h3>
                                <p className="text-xs text-text-secondary font-medium mt-1">Your check-in history across Lagos</p>
                            </div>
                            <Link href="/customer/history" className="px-4 py-2 bg-gray-50 text-xs font-black uppercase tracking-widest text-primary hover:bg-primary/5 rounded-lg transition-all">View All</Link>
                        </div>
                        <div className="space-y-2">
                            {recentVisits.map((visit) => {
                                const IconComponent = visit.icon;
                                return (
                                    <div key={visit.id} className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg transition-all cursor-pointer group border border-transparent hover:border-gray-100">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 rounded-lg bg-gray-50 flex items-center justify-center text-text-secondary group-hover:bg-white group-hover:shadow-sm transition-all">
                                                <IconComponent size={20} />
                                            </div>
                                            <div>
                                                <p className="font-bold text-sm text-text-main group-hover:text-primary transition-colors">{visit.place}</p>
                                                <div className="flex items-center gap-2 mt-0.5">
                                                    <span className="text-[10px] text-text-secondary font-bold uppercase tracking-widest">{visit.date}</span>
                                                    <span className="size-1 rounded-full bg-gray-300"></span>
                                                    <span className="text-[10px] text-primary font-bold">Verified Check-in</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <span className="font-black text-xs text-green-600 bg-green-50 px-3 py-1.5 rounded-lg border border-green-100">{visit.points} pts</span>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Featured Rewards */}
                    <div className="lg:col-span-2 bg-white p-8 rounded-lg border border-gray-100 shadow-sm">
                        <div className="flex items-center justify-between mb-8">
                            <div>
                                <h3 className="font-display font-bold text-xl text-text-main">Unlocked Rewards</h3>
                                <p className="text-xs text-text-secondary font-medium mt-1">Ready for redemption</p>
                            </div>
                        </div>
                        <div className="space-y-6">
                            {/* Reward 1 - In Progress */}
                            <div className="p-5 rounded-lg bg-gray-50/50 border border-gray-100 relative group overflow-hidden">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-orange-100/50 rounded-full translate-x-16 -translate-y-16 blur-2xl group-hover:scale-150 transition-transform"></div>
                                <div className="relative z-10">
                                    <div className="flex items-center gap-4 mb-4">
                                        <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center shrink-0 text-orange-600">
                                            <Coffee size={24} />
                                        </div>
                                        <div className="flex-1">
                                            <h4 className="font-bold text-sm text-text-main">Free Cappuccino</h4>
                                            <p className="text-xs text-text-secondary font-medium">Green Terrace Cafe</p>
                                        </div>
                                        <span className="text-xs font-black text-primary">500 pts</span>
                                    </div>
                                    <div className="space-y-2">
                                        <div className="w-full bg-gray-200/50 rounded-full h-2 overflow-hidden">
                                            <div className="bg-primary h-full rounded-full w-[70%]" />
                                        </div>
                                        <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-text-secondary">
                                            <span>70% Earned</span>
                                            <span>350 / 500 pts</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Reward 2 - Goal Reached */}
                            <div className="p-5 rounded-lg bg-white border-2 border-primary/20 shadow-lg shadow-primary/5 relative group overflow-hidden">
                                <div className="absolute inset-0 bg-primary/5 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                                <div className="relative z-10">
                                    <div className="flex items-center gap-4 mb-4">
                                        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center shrink-0 text-blue-600 animate-bounce transition-all">
                                            <Dumbbell size={24} />
                                        </div>
                                        <div className="flex-1">
                                            <h4 className="font-bold text-sm text-text-main">1 Free Gym Session</h4>
                                            <p className="text-xs text-text-secondary font-medium">Fitness Center</p>
                                        </div>
                                        <div className="flex flex-col items-end">
                                            <span className="text-xs font-black text-primary">1,000 pts</span>
                                            <span className="text-[9px] bg-green-500 text-white px-1.5 py-0.5 rounded uppercase font-black tracking-tighter mt-1">Goal Reached</span>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => handleRedeem('Free Gym Session', 1000)}
                                        className="w-full h-11 bg-primary text-white rounded-lg text-xs font-black uppercase tracking-widest hover:bg-primary-hover shadow-lg shadow-primary/20 transition-all active:scale-95 flex items-center justify-center gap-2"
                                    >
                                        Claim Reward Now
                                        <Star size={14} fill="currentColor" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* My ID Modal */}
            <Modal
                isOpen={showIdModal}
                onClose={() => setShowIdModal(false)}
                size="sm"
            >
                <div className="text-center mb-8">
                    <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4 border-4 border-white shadow-xl">
                        <span className="text-2xl font-black text-primary uppercase">{user?.name?.substring(0, 2) || 'JD'}</span>
                    </div>
                    <h2 className="text-2xl font-display font-bold text-slate-900">{user?.name || 'Customer'}</h2>
                    <p className="text-sm text-slate-500 font-medium mt-1">EntryConnect Member since 2024</p>
                </div>

                <div className="bg-slate-50 rounded-4xl p-8 mb-8 border border-slate-100 text-center relative group">
                    <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-4xl"></div>
                    <QrCode size={180} className="mx-auto text-slate-900 relative z-10" />
                    <p className="mt-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Scan at Terminal</p>
                </div>

                <div className="flex gap-4 mb-8">
                    <button className="flex-1 h-14 bg-slate-100 text-slate-600 font-bold rounded-2xl hover:bg-slate-200 transition-all text-[10px] uppercase tracking-widest active:scale-95">
                        Apple Wallet
                    </button>
                    <button className="flex-1 h-14 bg-primary text-white font-bold rounded-2xl hover:bg-primary-hover transition-all text-[10px] uppercase tracking-widest shadow-xl shadow-primary/20 active:scale-95">
                        G-Pay
                    </button>
                </div>

                <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
                    <div className="text-left">
                        <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Points Balance</p>
                        <p className="text-lg font-display font-bold text-primary">1,250 pts</p>
                    </div>
                    <div className="text-right">
                        <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Membership</p>
                        <p className="text-lg font-display font-bold text-slate-900 group hover:text-primary transition-colors cursor-pointer flex items-center gap-1">
                            Gold <ExternalLink size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                        </p>
                    </div>
                </div>
            </Modal>
        </CustomerSidebar>
    );
}

