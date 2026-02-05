'use client';

import React, { useState } from 'react';
import CustomerSidebar from '@/components/customer/CustomerSidebar';
import { notify } from '@/lib/notify';
import { Star, Gift, Search, Info, CheckCircle2, QrCode, X, Clock, MapPin } from 'lucide-react';

export default function CustomerRewardsPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedReward, setSelectedReward] = useState<any>(null);

    const myRewards = [
        { id: 1, title: 'Free Gym Session', business: 'Fitness Center', points: 1000, value: '₦5,000', image: 'fitness_center', color: 'bg-blue-100 text-blue-600', progress: 100, desc: 'One full day pass access to all gym facilities including swimming pool and sauna.' },
        { id: 2, title: 'Free Cappuccino', business: 'Green Terrace Cafe', points: 500, value: '₦2,500', image: 'local_cafe', color: 'bg-orange-100 text-orange-600', progress: 70, desc: 'Enjoy a premium medium-sized cappuccino with your choice of milk and one topping.' },
        { id: 3, title: 'Weekend Spa Retreat', business: 'Beauty Spa', points: 4500, value: '₦35,000', image: 'spa', color: 'bg-pink-100 text-pink-600', progress: 25, desc: 'A 2-hour rejuvenation package including full body massage and facial.' },
    ];

    const availableRewards = [
        { id: 4, title: '10% Off Next Purchase', business: 'NextGen Tech', points: 2000, value: 'Discount', image: 'devices', color: 'bg-indigo-100 text-indigo-600', desc: 'Get 10% off any electronics or accessories. Valid on items up to ₦500k.' },
        { id: 5, title: 'VIP Entry Ticket', business: 'Club 54', points: 5000, value: '₦15,000', image: 'nightlife', color: 'bg-purple-100 text-purple-600', desc: 'Skip the line and get a complimentary cocktail on entry to specific Saturday events.' },
        { id: 6, title: 'Movie Night for Two', business: 'Cinema Max', points: 1500, value: '₦8,000', image: 'movie', color: 'bg-red-100 text-red-600', desc: 'Two standard tickets for any regular showtime including large popcorn.' },
    ];

    const handleRedeem = (reward: any) => {
        notify.success(`Voucher generated for ${reward.title}. Check your email for details.`);
        setSelectedReward(null);
    };

    return (
        <CustomerSidebar>
            <div className="max-w-6xl mx-auto space-y-12 pb-20">

                {/* Hero Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                    <div>
                        <h1 className="text-3xl font-display font-bold text-text-main mb-2 tracking-tight">VIP Rewards Vault</h1>
                        <p className="text-text-secondary font-medium text-base">You have <span className="text-primary font-black">1,250 points</span> available to spend</p>
                    </div>
                    <div className="relative w-full md:w-80">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input
                            type="text"
                            placeholder="Search by venue or item..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full h-12 pl-12 pr-4 bg-white border border-gray-200 rounded-2xl text-sm font-bold focus:ring-4 focus:ring-primary/10 transition-all outline-none"
                        />
                    </div>
                </div>

                {/* Redeemable Now Section */}
                <section>
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="text-xl font-display font-bold text-text-main flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                                <Star className="text-primary" size={20} fill="currentColor" />
                            </div>
                            Ready to Redeem
                        </h2>
                        <button className="text-xs font-black uppercase tracking-widest text-primary hover:underline">View Progress Details</button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {myRewards.filter(r => r.progress >= 100).map((reward) => (
                            <div key={reward.id} className="bg-white rounded-[2.5rem] border-2 border-primary/20 p-8 flex flex-col hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 group relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full translate-x-16 -translate-y-16 group-hover:scale-150 transition-transform duration-700" />

                                <div className={`w-16 h-16 rounded-[1.25rem] flex items-center justify-center mb-6 shadow-lg ${reward.color}`}>
                                    <span className="material-icons-round text-3xl">{reward.image}</span>
                                </div>

                                <div className="flex-1">
                                    <h3 className="text-xl font-bold text-text-main mb-1 group-hover:text-primary transition-colors">{reward.title}</h3>
                                    <p className="text-sm text-text-secondary font-bold uppercase tracking-widest mb-4">{reward.business}</p>
                                    <p className="text-xs text-text-secondary font-medium leading-relaxed mb-8 line-clamp-2">{reward.desc}</p>
                                </div>

                                <div className="space-y-4">
                                    <div className="flex justify-between items-center text-xs font-black uppercase tracking-tighter">
                                        <span className="text-primary">{reward.points} Points Spent</span>
                                        <span className="text-green-600 flex items-center gap-1">
                                            <CheckCircle2 size={12} />
                                            Unlocked
                                        </span>
                                    </div>
                                    <button
                                        onClick={() => setSelectedReward(reward)}
                                        className="w-full h-14 bg-primary text-white text-sm font-black uppercase tracking-widest rounded-2xl hover:bg-primary-hover transition-all shadow-xl shadow-primary/25 active:scale-95 flex items-center justify-center gap-2"
                                    >
                                        Activate Voucher
                                        <Gift size={18} />
                                    </button>
                                </div>
                            </div>
                        ))}

                        {/* In Progress Rewards */}
                        {myRewards.filter(r => r.progress < 100).map((reward) => (
                            <div key={reward.id} className="bg-white rounded-[2.5rem] border border-gray-100 p-8 flex flex-col hover:border-primary/20 transition-all group">
                                <div className={`w-16 h-16 rounded-[1.25rem] bg-gray-50 text-gray-400 flex items-center justify-center mb-6 group-hover:text-primary transition-colors`}>
                                    <span className="material-icons-round text-3xl">{reward.image}</span>
                                </div>

                                <div className="flex-1">
                                    <h3 className="text-xl font-bold text-text-main mb-1">{reward.title}</h3>
                                    <p className="text-sm text-text-secondary font-bold uppercase tracking-widest mb-6">{reward.business}</p>
                                </div>

                                <div className="space-y-4">
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="text-xs font-black text-text-secondary uppercase tracking-widest">{reward.progress}% Earned</span>
                                        <span className="text-xs font-bold text-primary">{reward.points} pts Required</span>
                                    </div>
                                    <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                                        <div
                                            className="bg-primary h-full rounded-full transition-all duration-1000"
                                            style={{ width: `${reward.progress}%` }}
                                        />
                                    </div>
                                    <button className="w-full h-12 border-2 border-gray-100 text-text-secondary text-xs font-black uppercase tracking-widest rounded-2xl hover:bg-gray-50 transition-all">
                                        How to earn more
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Catalog Section */}
                <section>
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="text-xl font-display font-bold text-text-main">Global Offerings</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {availableRewards.map((reward) => (
                            <div
                                key={reward.id}
                                className="bg-white rounded-3xl border border-gray-100 p-6 transition-all hover:bg-gray-50 hover:shadow-xl hover:border-transparent group cursor-pointer"
                                onClick={() => setSelectedReward(reward)}
                            >
                                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110 duration-500 ${reward.color}`}>
                                    <span className="material-icons-round text-2xl">{reward.image}</span>
                                </div>
                                <h3 className="font-bold text-sm text-text-main mb-1 group-hover:text-primary transition-colors">{reward.title}</h3>
                                <p className="text-[10px] text-text-secondary font-black uppercase tracking-widest mb-4">{reward.business}</p>
                                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                                    <p className="text-sm font-black text-text-main">{reward.points} pts</p>
                                    <div className="w-8 h-8 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-400 group-hover:bg-primary group-hover:border-primary group-hover:text-white transition-all">
                                        <Info size={14} />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Reward Detail Modal */}
                {selectedReward && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <div className="absolute inset-0 bg-text-main/80 backdrop-blur-xl animate-in fade-in" onClick={() => setSelectedReward(null)}></div>
                        <div className="relative w-full max-w-lg bg-white rounded-[3rem] overflow-hidden shadow-2xl animate-in zoom-in slide-in-from-bottom-10 duration-500">
                            <div className={`h-40 relative flex items-center justify-center ${selectedReward.color}`}>
                                <button
                                    onClick={() => setSelectedReward(null)}
                                    className="absolute top-6 right-6 p-2 bg-white/20 hover:bg-white/40 rounded-full transition-colors text-white"
                                >
                                    <X size={20} />
                                </button>
                                <span className="material-icons-round text-6xl opacity-20 scale-150 absolute top-0 left-0 -translate-x-4 -translate-y-4">{selectedReward.image}</span>
                                <span className="material-icons-round text-7xl drop-shadow-2xl">{selectedReward.image}</span>
                            </div>

                            <div className="p-10">
                                <div className="flex items-start justify-between mb-8">
                                    <div>
                                        <h2 className="text-3xl font-display font-bold text-text-main mb-1">{selectedReward.title}</h2>
                                        <div className="flex items-center gap-2 text-primary font-black text-xs uppercase tracking-widest">
                                            <MapPin size={14} />
                                            {selectedReward.business}
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-[10px] font-black uppercase text-text-secondary tracking-widest mb-1">Value</p>
                                        <p className="text-xl font-display font-bold text-text-main">{selectedReward.value}</p>
                                    </div>
                                </div>

                                <div className="space-y-6 mb-10">
                                    <div className="flex gap-4 p-4 bg-gray-50 rounded-2xl border border-gray-100">
                                        <Clock className="text-primary shrink-0" size={20} />
                                        <div>
                                            <p className="font-bold text-sm text-text-main">Voucher Validity</p>
                                            <p className="text-xs text-text-secondary font-medium">Valid for 30 days once activated. Single use only.</p>
                                        </div>
                                    </div>
                                    <div>
                                        <p className="font-bold text-sm text-text-main mb-2">Description</p>
                                        <p className="text-sm text-text-secondary font-medium leading-relaxed">{selectedReward.desc}</p>
                                    </div>
                                </div>

                                {selectedReward.progress >= 100 || !selectedReward.progress ? (
                                    <div className="space-y-6">
                                        <div className="bg-primary/5 rounded-[2rem] p-8 border-2 border-dashed border-primary/20 text-center flex flex-col items-center">
                                            <QrCode size={120} className="text-text-main mb-4 opacity-30" />
                                            <p className="text-xs font-bold text-primary mb-1">Activation Required</p>
                                            <p className="text-[10px] text-text-secondary font-black uppercase tracking-widest leading-tight px-4">QR Code will appear here after activation</p>
                                        </div>
                                        <button
                                            onClick={() => handleRedeem(selectedReward)}
                                            className="w-full h-16 bg-primary text-white font-black uppercase tracking-[0.2em] rounded-2xl hover:bg-primary-hover shadow-2xl shadow-primary/30 transition-all active:scale-95 flex items-center justify-center gap-3"
                                        >
                                            Burn {selectedReward.points} Points & Activate
                                        </button>
                                    </div>
                                ) : (
                                    <div className="p-8 bg-gray-50 rounded-[2.5rem] text-center">
                                        <p className="text-lg font-bold text-text-main mb-2">Check-in at {selectedReward.business}</p>
                                        <p className="text-sm text-text-secondary font-medium mb-6">You need {selectedReward.points - 1250} more points to unlock this reward.</p>
                                        <button
                                            onClick={() => setSelectedReward(null)}
                                            className="w-full h-14 bg-white border border-gray-200 text-text-secondary font-bold rounded-2xl hover:bg-gray-100 transition-all"
                                        >
                                            Back to Vault
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </CustomerSidebar>
    );
}
