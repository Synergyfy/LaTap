'use client';

import React from 'react';
import CustomerSidebar from '@/components/customer/CustomerSidebar';

export default function CustomerRewardsPage() {
    const myRewards = [
        { id: 1, title: 'Free Gym Session', business: 'Fitness Center', points: 1000, value: '₦5,000', image: 'fitness_center', color: 'bg-blue-100 text-blue-600', progress: 100 },
        { id: 2, title: 'Free Cappuccino', business: 'Green Terrace Cafe', points: 500, value: '₦2,500', image: 'local_cafe', color: 'bg-orange-100 text-orange-600', progress: 70 },
    ];

    const availableRewards = [
        { id: 3, title: '10% Off Next Purchase', business: 'NextGen Tech', points: 2000, value: 'Discount', image: 'devices', color: 'bg-indigo-100 text-indigo-600' },
        { id: 4, title: 'VIP Entry Ticket', business: 'Club 54', points: 5000, value: '₦15,000', image: 'nightlife', color: 'bg-purple-100 text-purple-600' },
        { id: 5, title: 'Free Spa Treatment', business: 'Beauty Spa', points: 3000, value: '₦10,000', image: 'spa', color: 'bg-pink-100 text-pink-600' },
    ];

    return (
        <CustomerSidebar>
            <div className="max-w-5xl mx-auto space-y-10">

                {/* Header */}
                <div>
                    <h1 className="text-2xl font-display font-bold text-text-main mb-2">My Rewards</h1>
                    <p className="text-text-secondary font-medium text-sm">Redeem your hard-earned points for exclusive perks</p>
                </div>

                {/* Redeemable Now */}
                <section>
                    <h2 className="text-lg font-bold text-text-main mb-4 flex items-center gap-2">
                        <span className="material-icons-round text-primary">stars</span>
                        Ready to Redeem
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {myRewards.map((reward) => (
                            <div key={reward.id} className="bg-white rounded-2xl border border-gray-200 p-6 flex gap-6 hover:shadow-md transition-all group">
                                <div className={`w-20 h-20 rounded-xl flex items-center justify-center flex-shrink-0 ${reward.color}`}>
                                    <span className="material-icons-round text-3xl">{reward.image}</span>
                                </div>
                                <div className="flex-1 flex flex-col justify-between">
                                    <div>
                                        <h3 className="font-bold text-text-main">{reward.title}</h3>
                                        <p className="text-xs text-text-secondary font-medium">{reward.business}</p>
                                    </div>
                                    <div className="mt-3">
                                        <div className="flex justify-between items-end mb-2">
                                            <span className="text-xs font-bold text-primary">{reward.points} Points</span>
                                            {reward.progress >= 100 && (
                                                <span className="text-[10px] font-bold bg-green-100 text-green-700 px-2 py-0.5 rounded-full">Available</span>
                                            )}
                                        </div>
                                        {reward.progress < 100 && (
                                            <div className="w-full bg-gray-100 rounded-full h-1.5 overflow-hidden">
                                                <div className="bg-primary h-full rounded-full" style={{ width: `${reward.progress}%` }}></div>
                                            </div>
                                        )}
                                        {reward.progress >= 100 && (
                                            <button className="w-full py-2 bg-primary text-white text-xs font-bold rounded-lg hover:bg-primary-hover transition-colors shadow-lg shadow-primary/20">
                                                Redeem Reward
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Explore More */}
                <section>
                    <h2 className="text-lg font-bold text-text-main mb-4">Explore More Rewards</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {availableRewards.map((reward) => (
                            <div key={reward.id} className="bg-white rounded-xl border border-gray-100 p-4 transition-all hover:bg-gray-50 hover:border-gray-200">
                                <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-3 ${reward.color}`}>
                                    <span className="material-icons-round text-xl">{reward.image}</span>
                                </div>
                                <h3 className="font-bold text-sm text-text-main mb-1 truncate">{reward.title}</h3>
                                <p className="text-xs text-text-secondary mb-3">{reward.business}</p>
                                <div className="flex items-center justify-between pt-3 border-t border-gray-50">
                                    <span className="text-xs font-bold text-text-main">{reward.points} pts</span>
                                    <button className="text-xs font-bold text-primary hover:underline">View Details</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

            </div>
        </CustomerSidebar>
    );
}
