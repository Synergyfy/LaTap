'use client';

import React, { useState } from 'react';
import Modal from '@/components/ui/Modal';
import AnimatedRewardModal from '@/components/customer/AnimatedRewardModal';
import { notify } from '@/lib/notify';
import { Star, Gift, Search, Info, CheckCircle2, QrCode, X, Clock, MapPin, Coffee, Dumbbell, Smartphone, Music, Film, Flower2 } from 'lucide-react';

export default function CustomerRewardsPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedReward, setSelectedReward] = useState<any>(null);
    const [showRewardAnimation, setShowRewardAnimation] = useState(false);

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

    const getRewardIcon = (image: string, size = 24) => {
        switch (image) {
            case 'fitness_center': return <Dumbbell size={size} />;
            case 'local_cafe': return <Coffee size={size} />;
            case 'spa': return <Flower2 size={size} />;
            case 'devices': return <Smartphone size={size} />;
            case 'nightlife': return <Music size={size} />;
            case 'movie': return <Film size={size} />;
            default: return <Gift size={size} />;
        }
    };

    const handleRedeem = (reward: any) => {
        setSelectedReward(null);
        setShowRewardAnimation(true);
        // In a real app, we would deduct points here
    };

    return (
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
                        className="w-full h-12 pl-12 pr-4 bg-white border border-gray-200 rounded-lg text-sm font-bold focus:ring-4 focus:ring-primary/10 transition-all outline-none"
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
                        <div key={reward.id} className="bg-white rounded-lg border-2 border-primary/20 p-8 flex flex-col hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 group relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full translate-x-16 -translate-y-16 group-hover:scale-150 transition-transform duration-700" />

                            <div className={`w-16 h-16 rounded-lg flex items-center justify-center mb-6 shadow-lg ${reward.color}`}>
                                {getRewardIcon(reward.image, 32)}
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
                                    className="w-full h-14 bg-primary text-white text-sm font-black uppercase tracking-widest rounded-lg hover:bg-primary-hover transition-all shadow-xl shadow-primary/25 active:scale-95 flex items-center justify-center gap-2"
                                >
                                    Activate Voucher
                                    <Gift size={18} />
                                </button>
                            </div>
                        </div>
                    ))}

                    {/* In Progress Rewards */}
                    {myRewards.filter(r => r.progress < 100).map((reward) => (
                        <div key={reward.id} className="bg-white rounded-lg border border-gray-100 p-8 flex flex-col hover:border-primary/20 transition-all group">
                            <div className={`w-16 h-16 rounded-lg bg-gray-50 text-gray-400 flex items-center justify-center mb-6 group-hover:text-primary transition-colors`}>
                                {getRewardIcon(reward.image, 32)}
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
                                <button className="w-full h-12 border-2 border-gray-100 text-text-secondary text-xs font-black uppercase tracking-widest rounded-lg hover:bg-gray-50 transition-all">
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
                            className="bg-white rounded-lg border border-gray-100 p-6 transition-all hover:bg-gray-50 hover:shadow-xl hover:border-transparent group cursor-pointer"
                            onClick={() => setSelectedReward(reward)}
                        >
                            <div className={`w-14 h-14 rounded-lg flex items-center justify-center mb-6 transition-transform group-hover:scale-110 duration-500 ${reward.color}`}>
                                {getRewardIcon(reward.image, 24)}
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

            <Modal
                isOpen={!!selectedReward}
                onClose={() => setSelectedReward(null)}
                size="lg"
            >
                {selectedReward && (
                    <div className="-m-6"> {/* Negative margin to bleed to edges if desired, or just use standard padding */}
                        <div className={`h-32 relative flex items-center justify-center ${selectedReward.color}`}>
                            <div className="opacity-20 scale-150 absolute top-0 left-0 -translate-x-4 -translate-y-4">
                                {getRewardIcon(selectedReward.image, 64)}
                            </div>
                            <div className="drop-shadow-2xl">
                                {getRewardIcon(selectedReward.image, 48)}
                            </div>
                        </div>

                        <div className="p-8">
                            <div className="flex items-start justify-between mb-8">
                                <div>
                                    <h2 className="text-2xl font-display font-bold text-slate-900 mb-1">{selectedReward.title}</h2>
                                    <div className="flex items-center gap-2 text-primary font-black text-[10px] uppercase tracking-widest">
                                        <MapPin size={12} />
                                        {selectedReward.business}
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-1">Value</p>
                                    <p className="text-lg font-display font-bold text-slate-900">{selectedReward.value}</p>
                                </div>
                            </div>

                            <div className="space-y-4 mb-8">
                                <div className="flex gap-4 p-4 bg-slate-50 rounded-lg border border-slate-100">
                                    <Clock className="text-primary shrink-0" size={18} />
                                    <div>
                                        <p className="font-bold text-sm text-slate-900">Voucher Validity</p>
                                        <p className="text-xs text-slate-500 font-medium">Valid for 30 days once activated. Single use only.</p>
                                    </div>
                                </div>
                                <div>
                                    <p className="font-bold text-xs text-slate-400 uppercase tracking-widest mb-2 ml-1">Description</p>
                                    <p className="text-sm text-slate-600 font-medium leading-relaxed bg-slate-50/50 p-4 rounded-lg border border-slate-100">
                                        {selectedReward.desc}
                                    </p>
                                </div>
                            </div>

                            {selectedReward.progress >= 100 || !selectedReward.progress ? (
                                <div className="space-y-6">
                                    <div className="bg-slate-50 rounded-lg p-6 border-2 border-dashed border-slate-200 text-center flex flex-col items-center">
                                        <QrCode size={80} className="text-slate-300 mb-3" />
                                        <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest leading-tight">Activation Required</p>
                                    </div>
                                    <button
                                        onClick={() => handleRedeem(selectedReward)}
                                        className="w-full h-14 bg-primary text-white font-black uppercase tracking-widest rounded-lg hover:bg-primary-hover shadow-xl shadow-primary/20 transition-all active:scale-95 flex items-center justify-center gap-3"
                                    >
                                        Redeem {selectedReward.points} Points
                                    </button>
                                </div>
                            ) : (
                                <div className="p-6 bg-slate-50 rounded-lg text-center border border-slate-100">
                                    <p className="text-sm font-bold text-slate-900 mb-1">More points needed</p>
                                    <p className="text-xs text-slate-500 font-medium mb-4">Check-in at {selectedReward.business} to earn {selectedReward.points - 1250} more pts.</p>
                                    <button
                                        onClick={() => setSelectedReward(null)}
                                        className="w-full h-12 bg-white border border-slate-200 text-slate-600 font-bold rounded-lg hover:bg-slate-100 transition-all text-sm"
                                    >
                                        Back to Vault
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </Modal>

            <AnimatedRewardModal
                isOpen={showRewardAnimation}
                onClose={() => setShowRewardAnimation(false)}
                rewardName={selectedReward?.title ?? ''}
                rewardIcon={selectedReward ? getRewardIcon(selectedReward.image, 64) : null}
                points={selectedReward?.points ?? 0}
            />
        </div>
    );
}
