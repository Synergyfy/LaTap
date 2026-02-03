'use client';

import React from 'react';
import CustomerSidebar from '@/components/customer/CustomerSidebar';

export default function CustomerHistoryPage() {
    const visits = [
        { id: 1, place: 'Green Terrace Cafe', date: 'Feb 3, 2024', time: '10:30 AM', points: 50, amount: '₦2,500', status: 'Completed', icon: 'coffee' },
        { id: 2, place: 'NextGen Tech Store', date: 'Feb 2, 2024', time: '4:15 PM', points: 120, amount: '₦15,000', status: 'Completed', icon: 'devices' },
        { id: 3, place: 'Fitness Center', date: 'Feb 1, 2024', time: '9:00 AM', points: 30, amount: 'Subscription', status: 'Completed', icon: 'fitness_center' },
        { id: 4, place: 'Green Terrace Cafe', date: 'Jan 28, 2024', time: '11:00 AM', points: 50, amount: '₦3,200', status: 'Completed', icon: 'coffee' },
        { id: 5, place: 'Mega Plaza', date: 'Jan 25, 2024', time: '6:30 PM', points: 20, amount: '₦12,000', status: 'Completed', icon: 'shopping_bag' },
        { id: 6, place: 'Club 54', date: 'Jan 24, 2024', time: '10:00 PM', points: 100, amount: '₦25,000', status: 'Completed', icon: 'nightlife' },
    ];

    return (
        <CustomerSidebar>
            <div className="max-w-4xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-2xl font-display font-bold text-text-main mb-2">Visit History</h1>
                    <p className="text-text-secondary font-medium text-sm">Track your past check-ins and earned points</p>
                </div>

                <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
                    {visits.map((visit, index) => (
                        <div key={visit.id} className={`p-5 flex items-center justify-between hover:bg-gray-50 transition-colors ${index !== visits.length - 1 ? 'border-b border-gray-100' : ''}`}>
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-gray-500">
                                    <span className="material-icons-round">{visit.icon}</span>
                                </div>
                                <div>
                                    <h3 className="font-bold text-sm text-text-main">{visit.place}</h3>
                                    <p className="text-xs text-text-secondary font-medium">{visit.date} • {visit.time}</p>
                                </div>
                            </div>

                            <div className="text-right">
                                <p className="font-bold text-sm text-green-600">+{visit.points} pts</p>
                                <p className="text-xs text-text-secondary font-mono">{visit.amount}</p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-6 text-center">
                    <button className="text-sm font-bold text-primary hover:underline">
                        Load More Activity
                    </button>
                </div>
            </div>
        </CustomerSidebar>
    );
}
