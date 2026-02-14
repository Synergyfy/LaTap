'use client';

import React from 'react';
import PageHeader from '@/components/dashboard/PageHeader';
import { CreditCard, Package, CheckCircle2, AlertCircle, Clock } from 'lucide-react';

export default function AdminSubscriptionsPage() {
    const subscriptions = [
        { id: '1', business: 'Green Terrace Cafe', plan: 'Premium', status: 'active', renewal: '2024-05-12', amount: '₦25,000' },
        { id: '2', business: 'Tech Hub Lagos', owner: 'Sarah Johnson', plan: 'Enterprise', status: 'active', renewal: '2024-06-01', amount: '₦75,000' },
        { id: '3', business: 'Fashion Boutique', plan: 'Basic', status: 'past_due', renewal: '2024-03-20', amount: '₦10,000' },
    ];

    return (
        <div className="p-8">
            <PageHeader
                title="Subscription Management"
                description="Monitor and manage platform subscription plans and billing"
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {[
                    { label: 'Active Subscriptions', value: '842', icon: CheckCircle2, color: 'text-green-600', bg: 'bg-green-50' },
                    { label: 'Expiring Soon', value: '45', icon: Clock, color: 'text-orange-600', bg: 'bg-orange-50' },
                    { label: 'Past Due', value: '12', icon: AlertCircle, color: 'text-red-600', bg: 'bg-red-50' },
                ].map((stat, i) => (
                    <div key={i} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-xl ${stat.bg} ${stat.color} flex items-center justify-center`}>
                            <stat.icon size={24} />
                        </div>
                        <div>
                            <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">{stat.label}</p>
                            <p className="text-2xl font-display font-bold text-slate-900">{stat.value}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
                <table className="w-full">
                    <thead className="bg-gray-50 border-b border-gray-100">
                        <tr>
                            <th className="px-6 py-4 text-left text-[10px] font-black uppercase tracking-widest text-gray-400">Business</th>
                            <th className="px-6 py-4 text-left text-[10px] font-black uppercase tracking-widest text-gray-400">Plan</th>
                            <th className="px-6 py-4 text-left text-[10px] font-black uppercase tracking-widest text-gray-400">Status</th>
                            <th className="px-6 py-4 text-left text-[10px] font-black uppercase tracking-widest text-gray-400">Renewal</th>
                            <th className="px-6 py-4 text-right text-[10px] font-black uppercase tracking-widest text-gray-400">Amount</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                        {subscriptions.map((sub) => (
                            <tr key={sub.id} className="hover:bg-gray-50/50 transition-colors">
                                <td className="px-6 py-4 font-bold text-sm text-slate-900">{sub.business}</td>
                                <td className="px-6 py-4">
                                    <span className="px-2 py-1 bg-primary/10 text-primary text-[10px] font-black uppercase rounded-md tracking-wider">
                                        {sub.plan}
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold ${sub.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                                        }`}>
                                        <div className={`w-1.5 h-1.5 rounded-full ${sub.status === 'active' ? 'bg-green-500' : 'bg-red-500'}`} />
                                        {sub.status.replace('_', ' ')}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-sm text-slate-500 font-medium">{sub.renewal}</td>
                                <td className="px-6 py-4 text-right font-display font-bold text-slate-900">{sub.amount}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
