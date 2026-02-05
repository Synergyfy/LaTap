'use client';

import React, { useState } from 'react';
import AdminSidebar from '@/components/admin/AdminSidebar';
import { notify } from '@/lib/notify';
import { Search, Filter, Download, MoreVertical, CreditCard, RefreshCw, AlertCircle, CheckCircle2 } from 'lucide-react';

export default function AdminSubscriptionsPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [filterPlan, setFilterPlan] = useState('all');
    const [filterStatus, setFilterStatus] = useState('all');

    const [subscriptions, setSubscriptions] = useState([
        { id: 1, business: 'Tech Hub Lagos', plan: 'Enterprise', amount: '₦450,000/yr', status: 'active', nextBilling: '2024-03-01', method: 'Card ending 4242' },
        { id: 2, business: 'Green Terrace Cafe', plan: 'Premium', amount: '₦120,000/mo', status: 'active', nextBilling: '2024-02-15', method: 'Bank Transfer' },
        { id: 3, business: 'Fashion Boutique', plan: 'Basic', amount: '₦45,000/mo', status: 'past_due', nextBilling: '2024-02-01', method: 'Card ending 1234' },
        { id: 4, business: 'Fitness Center', plan: 'Premium', amount: '₦120,000/mo', status: 'active', nextBilling: '2024-02-20', method: 'Card ending 8888' },
        { id: 5, business: 'Restaurant 360', plan: 'Basic', amount: '₦45,000/mo', status: 'canceled', nextBilling: '-', method: 'N/A' },
        { id: 6, business: 'Beauty Spa', plan: 'Free', amount: '₦0/mo', status: 'active', nextBilling: 'N/A', method: 'N/A' },
    ]);

    const stats = [
        { label: 'Annual Revenue (ARR)', value: '₦42.5M', icon: 'payments', color: 'green' },
        { label: 'Subscribed Venues', value: '845', icon: 'check_circle', color: 'blue' },
        { label: 'Payment Failures', value: '12', icon: 'warning', color: 'red' },
        { label: 'Revenue Churn', value: '0.8%', icon: 'trending_down', color: 'orange' },
    ];

    const handleRetryPayment = (business: string) => {
        notify.info(`Retrying charge for ${business}...`);
        setTimeout(() => {
            notify.success(`Payment successful for ${business}. Account restored.`);
            setSubscriptions(prev => prev.map(s => s.business === business ? { ...s, status: 'active' } : s));
        }, 1500);
    };

    const handleCancelSubscription = (id: number) => {
        if (window.confirm('Are you sure you want to cancel this subscription? The business will lose access at the end of the billing cycle.')) {
            setSubscriptions(prev => prev.map(s => s.id === id ? { ...s, status: 'canceled' } : s));
            notify.success('Subscription scheduled for cancellation');
        }
    };

    const filteredSubs = subscriptions.filter(sub => {
        const matchesSearch = sub.business.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesPlan = filterPlan === 'all' || sub.plan.toLowerCase() === filterPlan;
        const matchesStatus = filterStatus === 'all' || sub.status === filterStatus;
        return matchesSearch && matchesPlan && matchesStatus;
    });

    return (
        <AdminSidebar>
            <div className="p-8">
                {/* Page Header */}
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-3xl font-display font-bold text-text-main mb-2">Revenue & Billing</h1>
                        <p className="text-text-secondary font-medium">Monitor financial health and manage licensing subscriptions</p>
                    </div>
                    <button
                        onClick={() => notify.success('Syncing with payment gateway (Flutterwave)...')}
                        className="px-6 py-3 bg-white border border-gray-200 text-text-main font-bold rounded-xl hover:bg-gray-50 transition-all flex items-center gap-2 shadow-sm active:scale-95"
                    >
                        <RefreshCw size={18} className="text-primary" />
                        Sync Gateway
                    </button>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {stats.map((stat, index) => (
                        <div key={index} className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
                            <div className="flex items-center gap-4">
                                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${stat.color === 'green' ? 'bg-green-50 text-green-600' :
                                        stat.color === 'orange' ? 'bg-orange-50 text-orange-600' :
                                            stat.color === 'red' ? 'bg-red-50 text-red-600' :
                                                'bg-blue-50 text-blue-600'
                                    }`}>
                                    <span className="material-icons-round text-xl">{stat.icon}</span>
                                </div>
                                <div>
                                    <p className="text-xs font-bold uppercase tracking-wider text-text-secondary mb-1">{stat.label}</p>
                                    <p className="text-2xl font-display font-bold text-text-main">{stat.value}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Filters and Search */}
                <div className="bg-white rounded-xl p-6 border border-gray-200 mb-6 shadow-sm">
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="flex-1 relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                            <input
                                type="text"
                                placeholder="Search by venue name..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full h-12 pl-10 pr-4 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-4 focus:ring-primary/10 focus:bg-white transition-all shadow-inner"
                            />
                        </div>
                        <div className="flex gap-2">
                            <select
                                value={filterPlan}
                                onChange={(e) => setFilterPlan(e.target.value)}
                                className="h-12 px-4 bg-gray-50 border border-gray-200 rounded-lg text-sm font-bold focus:outline-none focus:ring-2 focus:ring-primary/20"
                            >
                                <option value="all">All Plans</option>
                                <option value="enterprise">Enterprise</option>
                                <option value="premium">Premium</option>
                                <option value="basic">Basic</option>
                            </select>
                            <select
                                value={filterStatus}
                                onChange={(e) => setFilterStatus(e.target.value)}
                                className="h-12 px-4 bg-gray-50 border border-gray-200 rounded-lg text-sm font-bold focus:outline-none focus:ring-2 focus:ring-primary/20"
                            >
                                <option value="all">All Status</option>
                                <option value="active">Active</option>
                                <option value="canceled">Canceled</option>
                                <option value="past_due">Past Due</option>
                            </select>
                            <button
                                onClick={() => notify.info('Exporting financial ledger (CSV)...')}
                                className="h-12 px-6 bg-primary text-white font-bold rounded-lg hover:bg-primary-hover transition-colors flex items-center gap-2"
                            >
                                <Download size={18} />
                                Ledger
                            </button>
                        </div>
                    </div>
                </div>

                {/* Subscriptions Table */}
                <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50 border-b border-gray-200">
                                <tr>
                                    <th className="text-left py-4 px-6 text-xs font-black uppercase tracking-wider text-text-secondary">Venue</th>
                                    <th className="text-left py-4 px-6 text-xs font-black uppercase tracking-wider text-text-secondary">Tier</th>
                                    <th className="text-left py-4 px-6 text-xs font-black uppercase tracking-wider text-text-secondary">Recurring</th>
                                    <th className="text-left py-4 px-6 text-xs font-black uppercase tracking-wider text-text-secondary">Status</th>
                                    <th className="text-left py-4 px-6 text-xs font-black uppercase tracking-wider text-text-secondary">Next Cycle</th>
                                    <th className="text-left py-4 px-6 text-xs font-black uppercase tracking-wider text-text-secondary">Billing Info</th>
                                    <th className="text-right py-4 px-6 text-xs font-black uppercase tracking-wider text-text-secondary">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {filteredSubs.map((sub) => (
                                    <tr key={sub.id} className="hover:bg-gray-50 transition-colors group">
                                        <td className="py-4 px-6">
                                            <div className="font-bold text-sm text-text-main">{sub.business}</div>
                                        </td>
                                        <td className="py-4 px-6">
                                            <span className={`inline-flex px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${sub.plan === 'Enterprise' ? 'bg-purple-50 text-purple-600 border border-purple-100' :
                                                    sub.plan === 'Premium' ? 'bg-blue-50 text-blue-600 border border-blue-100' :
                                                        sub.plan === 'Basic' ? 'bg-green-50 text-green-600 border border-green-100' :
                                                            'bg-gray-50 text-gray-500 border border-gray-200'
                                                }`}>
                                                {sub.plan}
                                            </span>
                                        </td>
                                        <td className="py-4 px-6 font-bold text-sm text-text-main">{sub.amount}</td>
                                        <td className="py-4 px-6">
                                            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${sub.status === 'active' ? 'bg-green-50 text-green-600' :
                                                    sub.status === 'past_due' ? 'bg-red-50 text-red-600 animate-pulse' :
                                                        'bg-gray-100 text-gray-400'
                                                }`}>
                                                {sub.status === 'active' ? <CheckCircle2 size={10} /> : <AlertCircle size={10} />}
                                                {sub.status.replace('_', ' ')}
                                            </span>
                                        </td>
                                        <td className="py-4 px-6 text-sm text-text-secondary font-bold font-mono tracking-tighter">{sub.nextBilling}</td>
                                        <td className="py-4 px-6">
                                            <div className="flex items-center gap-2">
                                                <CreditCard size={14} className="text-text-secondary" />
                                                <span className="text-xs text-text-secondary font-bold uppercase tracking-tight">{sub.method}</span>
                                            </div>
                                        </td>
                                        <td className="py-4 px-6 text-right">
                                            <div className="flex items-center justify-end gap-1">
                                                {sub.status === 'past_due' && (
                                                    <button
                                                        onClick={() => handleRetryPayment(sub.business)}
                                                        className="p-2 text-primary hover:bg-primary/10 rounded-lg transition-all"
                                                        title="Retry Charge"
                                                    >
                                                        <RefreshCw size={18} />
                                                    </button>
                                                )}
                                                <button
                                                    onClick={() => notify.info(`Opening billing history for ${sub.business}...`)}
                                                    className="p-2 text-gray-400 hover:text-text-main hover:bg-gray-100 rounded-lg transition-colors"
                                                    title="View Invoices"
                                                >
                                                    <Download size={18} />
                                                </button>
                                                <button
                                                    onClick={() => handleCancelSubscription(sub.id)}
                                                    className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                                    title="Cancel Plan"
                                                >
                                                    <AlertCircle size={18} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </AdminSidebar>
    );
}
