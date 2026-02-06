'use client';

import React, { useState } from 'react';
import CustomerSidebar from '@/components/customer/CustomerSidebar';
import { Search, Filter, Download, ExternalLink, Calendar, Clock, MapPin, Receipt, Star, MoreVertical, X } from 'lucide-react';

export default function CustomerHistoryPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedVisit, setSelectedVisit] = useState<any>(null);

    const visits = [
        { id: 1, place: 'Green Terrace Cafe', date: 'Feb 3, 2024', time: '10:30 AM', points: 50, amount: '₦2,500', status: 'Completed', icon: 'coffee', category: 'Dining', address: '12 Admiralty Way, Lekki Phase 1', receiptId: 'TXN-908271' },
        { id: 2, place: 'NextGen Tech Store', date: 'Feb 2, 2024', time: '4:15 PM', points: 120, amount: '₦15,000', status: 'Completed', icon: 'devices', category: 'Electronics', address: 'Mall of Africa, Victoria Island', receiptId: 'TXN-112233' },
        { id: 3, place: 'Fitness Center', date: 'Feb 1, 2024', time: '9:00 AM', points: 30, amount: 'Subscription', status: 'Completed', icon: 'fitness_center', category: 'Health', address: '48 Bourdillon Rd, Ikoyi', receiptId: 'MEM-445566' },
        { id: 4, place: 'Green Terrace Cafe', date: 'Jan 28, 2024', time: '11:00 AM', points: 50, amount: '₦3,200', status: 'Completed', icon: 'coffee', category: 'Dining', address: '12 Admiralty Way, Lekki Phase 1', receiptId: 'TXN-778899' },
        { id: 5, place: 'Mega Plaza', date: 'Jan 25, 2024', time: '6:30 PM', points: 20, amount: '₦12,000', status: 'Completed', icon: 'shopping_bag', category: 'Shopping', address: 'Idowu Martins St, VI, Lagos', receiptId: 'TXN-334455' },
        { id: 6, place: 'Club 54', date: 'Jan 24, 2024', time: '10:00 PM', points: 100, amount: '₦25,000', status: 'Completed', icon: 'nightlife', category: 'Entertainment', address: 'Adeola Hopewell, VI', receiptId: 'TXN-667788' },
    ];

    const filteredVisits = visits.filter(v =>
        v.place.toLowerCase().includes(searchQuery.toLowerCase()) ||
        v.category.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <CustomerSidebar>
            <div className="max-w-5xl mx-auto space-y-8 pb-12">

                {/* Header & Controls */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                    <div>
                        <h1 className="text-3xl font-display font-bold text-text-main mb-2">Check-in Ledger</h1>
                        <p className="text-text-secondary font-medium text-base">You've visited <span className="text-primary font-black">12 venues</span> in the last 30 days.</p>
                    </div>
                    <div className="flex gap-3 w-full md:w-auto">
                        <div className="relative flex-1 md:w-64">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                            <input
                                type="text"
                                placeholder="Search history..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full h-12 pl-12 pr-4 bg-white border border-gray-200 rounded-lg text-sm font-bold focus:ring-4 focus:ring-primary/10 transition-all outline-none"
                            />
                        </div>
                        <button className="h-12 w-12 bg-white border border-gray-200 rounded-lg flex items-center justify-center text-text-secondary hover:bg-gray-50 transition-all shadow-sm">
                            <Filter size={18} />
                        </button>
                        <button className="h-12 px-6 bg-primary text-white font-black uppercase tracking-widest text-xs rounded-lg flex items-center justify-center gap-2 hover:bg-primary-hover transition-all shadow-lg shadow-primary/20">
                            <Download size={16} />
                            Export
                        </button>
                    </div>
                </div>

                {/* Visits Timeline */}
                <div className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50/50 border-b border-gray-100">
                                <tr>
                                    <th className="text-left py-6 px-8 text-[10px] font-black uppercase tracking-widest text-text-secondary">Venue & Identity</th>
                                    <th className="text-left py-6 px-8 text-[10px] font-black uppercase tracking-widest text-text-secondary">Date & Time</th>
                                    <th className="text-left py-6 px-8 text-[10px] font-black uppercase tracking-widest text-text-secondary">Category</th>
                                    <th className="text-right py-6 px-8 text-[10px] font-black uppercase tracking-widest text-text-secondary">Value & Points</th>
                                    <th className="text-center py-6 px-8 text-[10px] font-black uppercase tracking-widest text-text-secondary">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {filteredVisits.map((visit) => (
                                    <tr
                                        key={visit.id}
                                        className="hover:bg-gray-50/50 transition-all group cursor-pointer"
                                        onClick={() => setSelectedVisit(visit)}
                                    >
                                        <td className="py-6 px-8">
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 rounded-lg bg-gray-50 flex items-center justify-center text-text-secondary group-hover:bg-primary group-hover:text-white transition-all duration-300">
                                                    {visit.icon === 'coffee' ? <Coffee size={24} /> :
                                                        visit.icon === 'devices' ? <Smartphone size={24} /> :
                                                            visit.icon === 'fitness_center' ? <Dumbbell size={24} /> :
                                                                visit.icon === 'shopping_bag' ? <Receipt size={24} /> :
                                                                    visit.icon === 'nightlife' ? <Star size={24} /> :
                                                                        <Clock size={24} />}
                                                </div>
                                                <div>
                                                    <p className="font-bold text-sm text-text-main group-hover:text-primary transition-colors">{visit.place}</p>
                                                    <p className="text-[10px] text-text-secondary font-black uppercase tracking-widest mt-0.5">{visit.receiptId}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="py-6 px-8">
                                            <div className="space-y-1">
                                                <div className="flex items-center gap-1.5 text-xs text-text-main font-bold">
                                                    <Calendar size={12} className="text-primary" />
                                                    {visit.date}
                                                </div>
                                                <div className="flex items-center gap-1.5 text-xs text-text-secondary font-medium">
                                                    <Clock size={12} />
                                                    {visit.time}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="py-6 px-8">
                                            <span className="px-3 py-1 bg-gray-100 text-[10px] font-black uppercase tracking-widest text-text-secondary rounded-full">
                                                {visit.category}
                                            </span>
                                        </td>
                                        <td className="py-6 px-8 text-right">
                                            <div className="space-y-1">
                                                <p className="font-display font-bold text-sm text-text-main">{visit.amount}</p>
                                                <p className="text-xs font-black text-green-600">+{visit.points} Points</p>
                                            </div>
                                        </td>
                                        <td className="py-6 px-8">
                                            <div className="flex justify-center">
                                                <button className="p-2 text-gray-300 hover:text-text-main hover:bg-white hover:shadow-sm rounded-lg transition-all">
                                                    <MoreVertical size={18} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Visit Detail Modal */}
                {selectedVisit && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <div className="absolute inset-0 bg-text-main/80 backdrop-blur-xl animate-in fade-in" onClick={() => setSelectedVisit(null)}></div>
                        <div className="relative w-full max-w-lg bg-white rounded-lg overflow-hidden shadow-2xl animate-in zoom-in slide-in-from-bottom-10 duration-500">
                            <div className="p-10">
                                <div className="flex justify-between items-start mb-10">
                                    <div className="w-16 h-16 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                                        {selectedVisit.icon === 'coffee' ? <Coffee size={32} /> :
                                            selectedVisit.icon === 'devices' ? <Smartphone size={32} /> :
                                                selectedVisit.icon === 'fitness_center' ? <Dumbbell size={32} /> :
                                                    selectedVisit.icon === 'shopping_bag' ? <Receipt size={32} /> :
                                                        selectedVisit.icon === 'nightlife' ? <Star size={32} /> :
                                                            <Clock size={32} />}
                                    </div>
                                    <button
                                        onClick={() => setSelectedVisit(null)}
                                        className="p-2 hover:bg-gray-100 rounded-full transition-colors text-text-secondary"
                                    >
                                        <X size={20} />
                                    </button>
                                </div>

                                <div className="space-y-1 mb-8">
                                    <h2 className="text-3xl font-display font-bold text-text-main">{selectedVisit.place}</h2>
                                    <p className="text-sm font-bold text-primary uppercase tracking-widest">{selectedVisit.category}</p>
                                </div>

                                <div className="grid grid-cols-2 gap-8 py-8 border-y border-gray-100 mb-8">
                                    <div className="space-y-1">
                                        <p className="text-[10px] font-black uppercase text-text-secondary tracking-widest">Transaction Date</p>
                                        <p className="text-sm font-bold text-text-main">{selectedVisit.date} at {selectedVisit.time}</p>
                                    </div>
                                    <div className="space-y-1 text-right">
                                        <p className="text-[10px] font-black uppercase text-text-secondary tracking-widest">Receipt ID</p>
                                        <p className="text-sm font-bold font-mono text-text-main">{selectedVisit.receiptId}</p>
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-[10px] font-black uppercase text-text-secondary tracking-widest">Amount Spent</p>
                                        <p className="text-xl font-display font-bold text-text-main">{selectedVisit.amount}</p>
                                    </div>
                                    <div className="space-y-1 text-right">
                                        <p className="text-[10px] font-black uppercase text-text-secondary tracking-widest">Points Earned</p>
                                        <p className="text-xl font-display font-bold text-green-600">+{selectedVisit.points} pts</p>
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    <div className="flex items-start gap-4">
                                        <div className="p-3 bg-blue-50 rounded-lg text-blue-600">
                                            <MapPin size={20} />
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-black uppercase text-text-secondary tracking-widest">Location</p>
                                            <p className="text-sm font-bold text-text-main leading-snug">{selectedVisit.address}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-4">
                                        <div className="p-3 bg-orange-50 rounded-lg text-orange-600">
                                            <Star size={20} />
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-black uppercase text-text-secondary tracking-widest">Loyalty Status</p>
                                            <p className="text-sm font-bold text-text-main leading-snug">Elite Silver Member (Level 4)</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4 mt-12">
                                    <button className="h-14 bg-gray-100 text-text-secondary font-black uppercase tracking-widest text-[10px] rounded-lg hover:bg-gray-200 transition-all flex items-center justify-center gap-2">
                                        <Receipt size={16} />
                                        PDF Receipt
                                    </button>
                                    <button className="h-14 bg-primary text-white font-black uppercase tracking-widest text-[10px] rounded-lg hover:bg-primary-hover shadow-xl shadow-primary/20 transition-all flex items-center justify-center gap-2">
                                        <ExternalLink size={16} />
                                        Venue Profile
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Empty State Mock */}
                {filteredVisits.length === 0 && (
                    <div className="bg-white rounded-lg border border-gray-100 p-20 text-center">
                        <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Search className="text-gray-300" size={32} />
                        </div>
                        <h3 className="text-xl font-bold text-text-main mb-2">No visits found</h3>
                        <p className="text-sm text-text-secondary max-w-xs mx-auto">We couldn't find any check-ins matching your search. Try different keywords.</p>
                    </div>
                )}
            </div>
        </CustomerSidebar>
    );
}
