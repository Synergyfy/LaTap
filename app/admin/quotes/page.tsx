'use client';

import React, { useState } from 'react';
import AdminSidebar from '@/components/admin/AdminSidebar';
import { notify } from '@/lib/notify';
import {
    FileText, Search, Filter, MoreVertical, Eye, CheckCircle,
    XCircle, Clock, ChevronLeft, ChevronRight, ArrowUpRight,
    MessageSquare, User, Building2, Package
} from 'lucide-react';
import Modal from '@/components/ui/Modal';
import { useQuoteStore, Quote } from '@/store/quoteStore';
import Link from 'next/link';
import Image from 'next/image';

export default function AdminQuotesPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [filterStatus, setFilterStatus] = useState('all');
    const [selectedQuote, setSelectedQuote] = useState<Quote | null>(null);
    const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);

    const quotes = useQuoteStore((state) => state.quotes);
    const updateQuoteStatus = useQuoteStore((state) => state.updateQuoteStatus);
    const deleteQuote = useQuoteStore((state) => state.deleteQuote);

    const handleAction = (id: string, action: 'Approve' | 'Reject' | 'Archive') => {
        if (action === 'Archive') {
            deleteQuote(id);
            notify.success(`Quote ${id} archived`);
        } else {
            updateQuoteStatus(id, action === 'Approve' ? 'Approved' : 'Rejected');
            notify.success(`Quote ${id} marked as ${action}`);
        }
        setIsDetailsModalOpen(false);
    };

    const formatValue = (value: number | 'quote') => {
        if (value === 'quote') return 'Custom Quote';
        return `₦${value.toLocaleString()}`;
    };

    const formatDate = (date: Date) => {
        const now = new Date();
        const diff = now.getTime() - new Date(date).getTime();
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const days = Math.floor(hours / 24);

        if (hours < 1) return 'Just now';
        if (hours < 24) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
        if (days === 1) return 'Yesterday';
        if (days < 7) return `${days} days ago`;
        return `${Math.floor(days / 7)} week${Math.floor(days / 7) > 1 ? 's' : ''} ago`;
    };

    const filteredQuotes = quotes.filter(q => {
        const matchesSearch = q.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
            q.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
            q.productName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            `${q.firstName} ${q.lastName}`.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStatus = filterStatus === 'all' || q.status === filterStatus;
        return matchesSearch && matchesStatus;
    });

    return (
        <div className="flex min-h-screen bg-gray-50/50">
            <AdminSidebar activePage="quotes">
                <main className="flex-1 p-8 md:p-12">
                    <div className="max-w-6xl mx-auto">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                            <div>
                                <div className="flex items-center gap-3 text-primary mb-2">
                                    <FileText size={20} />
                                    <span className="text-xs font-black uppercase tracking-widest">Marketplace Leads</span>
                                </div>
                                <h1 className="text-4xl font-display font-bold text-text-main">Quote Requests</h1>
                            </div>
                            <div className="flex gap-4">
                                <button className="h-12 px-6 bg-white border border-gray-200 text-text-main rounded-xl font-bold text-sm shadow-sm hover:bg-gray-50 transition-all flex items-center gap-2">
                                    <Filter size={18} /> Filters
                                </button>
                                <button
                                    onClick={() => notify.info('Exporting quote data...')}
                                    className="h-12 px-6 bg-primary text-white rounded-xl font-bold text-sm shadow-lg shadow-primary/20 hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
                                >
                                    <ArrowUpRight size={18} /> Export
                                </button>
                            </div>
                        </div>

                        <div className="bg-white rounded-2xl border border-gray-100 shadow-xl overflow-hidden">
                            <div className="p-6 border-b border-gray-50 bg-gray-50/30 flex items-center gap-4">
                                <div className="flex-1 relative">
                                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                    <input
                                        type="text"
                                        placeholder="Search by ID, business or product..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="w-full h-12 pl-12 pr-4 bg-white border border-gray-200 rounded-xl text-sm font-medium outline-none focus:ring-4 focus:ring-primary/5 transition-all"
                                    />
                                </div>
                                <select
                                    value={filterStatus}
                                    onChange={(e) => setFilterStatus(e.target.value)}
                                    className="h-12 px-4 bg-white border border-gray-200 rounded-xl text-sm font-bold text-text-main outline-none focus:ring-4 focus:ring-primary/5 cursor-pointer"
                                >
                                    <option value="all">All Status</option>
                                    <option value="Pending">Pending</option>
                                    <option value="Approved">Approved</option>
                                    <option value="Rejected">Rejected</option>
                                    <option value="Expired">Expired</option>
                                </select>
                            </div>

                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="text-[10px] font-black uppercase tracking-widest text-text-secondary border-b border-gray-100 bg-gray-50/50">
                                            <th className="px-8 py-6">Product</th>
                                            <th className="px-8 py-6">Reference</th>
                                            <th className="px-8 py-6">Business & Contact</th>
                                            <th className="px-8 py-6">Quantity</th>
                                            <th className="px-8 py-6">Est. Value</th>
                                            <th className="px-8 py-6">Status</th>
                                            <th className="px-8 py-6 text-right">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-50">
                                        {filteredQuotes.map((quote) => (
                                            <tr
                                                key={quote.id}
                                                className="group hover:bg-gray-50/50 transition-colors"
                                            >
                                                <td className="px-8 py-6">
                                                    <Link
                                                        href={`/marketplace/product/${quote.productId}`}
                                                        className="flex items-center gap-3 group/product"
                                                    >
                                                        <div className="relative w-12 h-12 rounded-lg overflow-hidden border border-gray-200 flex-shrink-0">
                                                            <Image
                                                                src={quote.productImage}
                                                                alt={quote.productName}
                                                                fill
                                                                className="object-cover"
                                                            />
                                                        </div>
                                                        <div className="flex flex-col">
                                                            <span className="font-bold text-text-main group-hover/product:text-primary transition-colors">{quote.productName}</span>
                                                            <span className="text-xs font-mono text-text-secondary">ID: {quote.productId}</span>
                                                        </div>
                                                    </Link>
                                                </td>
                                                <td className="px-8 py-6">
                                                    <span className="text-xs font-mono font-bold text-slate-400">#{quote.id}</span>
                                                    <div className="flex items-center gap-1.5 text-[10px] text-slate-400 font-bold uppercase mt-1">
                                                        <Clock size={10} /> {formatDate(quote.createdAt)}
                                                    </div>
                                                </td>
                                                <td className="px-8 py-6">
                                                    <div className="flex flex-col">
                                                        <span className="font-bold text-text-main">{quote.company || 'N/A'}</span>
                                                        <span className="text-xs font-medium text-text-secondary mt-0.5">{quote.firstName} {quote.lastName}</span>
                                                    </div>
                                                </td>
                                                <td className="px-8 py-6 text-sm font-bold text-text-main">
                                                    {quote.quantity} units
                                                </td>
                                                <td className="px-8 py-6 text-sm font-black text-text-main">
                                                    {formatValue(quote.estimatedValue)}
                                                </td>
                                                <td className="px-8 py-6">
                                                    <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${quote.status === 'Pending' ? 'bg-orange-50 text-orange-600' :
                                                        quote.status === 'Approved' ? 'bg-green-50 text-green-600' :
                                                            quote.status === 'Rejected' ? 'bg-red-50 text-red-600' :
                                                                'bg-gray-100 text-gray-500'
                                                        }`}>
                                                        {quote.status}
                                                    </span>
                                                </td>
                                                <td className="px-8 py-6 text-right">
                                                    <div className="relative inline-block text-left group/menu">
                                                        <button className="p-2 hover:bg-white border-2 border-transparent hover:border-gray-100 rounded-xl transition-all text-slate-400 hover:text-text-main active:scale-95">
                                                            <MoreVertical size={20} />
                                                        </button>

                                                        {/* Dropdown Menu (Implementation for three dots menu) */}
                                                        <div className="absolute right-0 top-full mt-2 w-56 bg-white border border-gray-100 rounded-2xl shadow-2xl opacity-0 invisible group-hover/menu:opacity-100 group-hover/menu:visible transition-all z-20 overflow-hidden translate-y-2 group-hover/menu:translate-y-0">
                                                            <div className="p-2 space-y-1">
                                                                <button
                                                                    onClick={() => { setSelectedQuote(quote); setIsDetailsModalOpen(true); }}
                                                                    className="w-full flex items-center gap-3 px-4 py-3 text-sm font-bold text-slate-600 hover:bg-slate-50 hover:text-primary transition-all rounded-xl"
                                                                >
                                                                    <Eye size={18} /> View Details
                                                                </button>
                                                                <button
                                                                    onClick={() => notify.info(`Opening chat with ${quote.company || `${quote.firstName} ${quote.lastName}`}`)}
                                                                    className="w-full flex items-center gap-3 px-4 py-3 text-sm font-bold text-slate-600 hover:bg-slate-50 hover:text-primary transition-all rounded-xl"
                                                                >
                                                                    <MessageSquare size={18} /> Message Business
                                                                </button>
                                                                <div className="h-px bg-gray-50 my-1 mx-2" />
                                                                {quote.status === 'Pending' && (
                                                                    <>
                                                                        <button
                                                                            onClick={() => handleAction(quote.id, 'Approve')}
                                                                            className="w-full flex items-center gap-3 px-4 py-3 text-sm font-bold text-green-600 hover:bg-green-50 transition-all rounded-xl"
                                                                        >
                                                                            <CheckCircle size={18} /> Approve Quote
                                                                        </button>
                                                                        <button
                                                                            onClick={() => handleAction(quote.id, 'Reject')}
                                                                            className="w-full flex items-center gap-3 px-4 py-3 text-sm font-bold text-red-600 hover:bg-red-50 transition-all rounded-xl"
                                                                        >
                                                                            <XCircle size={18} /> Reject Quote
                                                                        </button>
                                                                    </>
                                                                )}
                                                                <button
                                                                    onClick={() => handleAction(quote.id, 'Archive')}
                                                                    className="w-full flex items-center gap-3 px-4 py-3 text-sm font-bold text-slate-400 hover:bg-slate-50 hover:text-red-500 transition-all rounded-xl"
                                                                >
                                                                    Archive Request
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                    {/* Quote details modal */}
                    {selectedQuote && (
                        <Modal
                            isOpen={isDetailsModalOpen}
                            onClose={() => setIsDetailsModalOpen(false)}
                            title="Quote Breakdown"
                            description={`Reference: #${selectedQuote.id}`}
                            size="2xl"
                        >
                            <div className="space-y-8 py-4">
                                {/* Product Preview */}
                                <Link
                                    href={`/marketplace/product/${selectedQuote.productId}`}
                                    className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl border border-gray-100 hover:border-primary/20 transition-all group"
                                >
                                    <div className="relative w-20 h-20 rounded-lg overflow-hidden border border-gray-200 flex-shrink-0">
                                        <Image
                                            src={selectedQuote.productImage}
                                            alt={selectedQuote.productName}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-lg font-black text-text-main group-hover:text-primary transition-colors">{selectedQuote.productName}</p>
                                        <p className="text-xs font-mono text-text-secondary">Product ID: {selectedQuote.productId}</p>
                                    </div>
                                    <ArrowUpRight size={20} className="text-primary" />
                                </Link>

                                <div className="grid grid-cols-2 gap-8">
                                    <div className="space-y-6">
                                        <div className="space-y-1">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-text-secondary flex items-center gap-2">
                                                <Building2 size={12} /> Entity Information
                                            </label>
                                            <p className="text-lg font-black text-text-main">{selectedQuote.company || 'N/A'}</p>
                                            <p className="text-sm font-medium text-text-secondary">Contact: {selectedQuote.firstName} {selectedQuote.lastName}</p>
                                            <p className="text-sm font-medium text-text-secondary">{selectedQuote.email}</p>
                                        </div>
                                        <div className="space-y-1">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-text-secondary flex items-center gap-2">
                                                <Package size={12} /> Order Details
                                            </label>
                                            <p className="text-sm font-medium text-text-secondary">Quantity: {selectedQuote.quantity} units</p>
                                        </div>
                                    </div>
                                    <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100 flex flex-col justify-center text-center">
                                        <p className="text-[10px] font-black uppercase tracking-widest text-text-secondary mb-2">Total Estimated Value</p>
                                        <h4 className="text-4xl font-display font-black text-primary">{formatValue(selectedQuote.estimatedValue)}</h4>
                                        <p className="text-xs font-bold text-text-secondary mt-2">Calculated at current unit cost</p>
                                    </div>
                                </div>

                                {selectedQuote.message && (
                                    <div className="bg-primary/5 p-6 rounded-2xl border border-primary/10">
                                        <h5 className="font-bold text-text-main mb-3 flex items-center gap-2">
                                            <MessageSquare size={18} className="text-primary" />
                                            Customer Requirements
                                        </h5>
                                        <p className="text-sm text-text-secondary leading-relaxed">
                                            {selectedQuote.message}
                                        </p>
                                    </div>
                                )}

                                <div className="flex gap-4 pt-4">
                                    <button className="flex-1 h-14 border border-gray-200 text-text-main font-bold rounded-xl hover:bg-gray-50 transition-all">
                                        Send Counter Offer
                                    </button>
                                    <button
                                        onClick={() => handleAction(selectedQuote.id, 'Approve')}
                                        className="flex-1 h-14 bg-primary text-white font-bold rounded-xl hover:bg-primary-hover shadow-xl shadow-primary/20 transition-all flex items-center justify-center gap-2"
                                    >
                                        <CheckCircle size={18} /> Approve This Quote
                                    </button>
                                </div>
                            </div>
                        </Modal>
                    )}
                </main>
            </AdminSidebar>
        </div>
    );
}
