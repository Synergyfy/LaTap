'use client';

import React, { useState } from 'react';
import CustomerSidebar from '@/components/customer/CustomerSidebar';
import { MessageSquare, LifeBuoy, Clock, Search, Filter, Plus, ChevronRight, HelpCircle } from 'lucide-react';
import CreateTicketModal from '@/components/ui/CreateTicketModal';
import { notify } from '@/lib/notify';

export default function CustomerSupportPage() {
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    const [tickets, setTickets] = useState([
        { id: 'TKT-7721', subject: 'Forgot to scan at Green Terrace', status: 'In Progress', category: 'Points Inquiry', date: 'Feb 4, 2024' },
        { id: 'TKT-7650', subject: 'Voucher code not working', status: 'Closed', category: 'Redemption Issue', date: 'Jan 28, 2024' },
    ]);

    const handleCreateTicket = (data: any) => {
        const newTicket = {
            id: `TKT-${Math.floor(1000 + Math.random() * 9000)}`,
            subject: data.subject,
            status: 'Open',
            category: data.category,
            date: 'Just now'
        };
        setTickets([newTicket, ...tickets]);
        setIsCreateModalOpen(false);
        notify.success('Support ticket created successfully. Our team will review it soon.');
    };

    const faqs = [
        { q: 'How do I earn points?', a: 'Just tap your phone on any EntryConnect terminal at participating businesses.' },
        { q: 'Can I transfer points?', a: 'Currently, points are tied to your specific identity and cannot be transferred.' },
        { q: 'What happens if a reward expires?', a: 'Expired rewards cannot be reclaimed, but you can always earn new ones!' },
    ];

    return (
        <CustomerSidebar>
            <div className="max-w-5xl mx-auto space-y-10 pb-20">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                    <div>
                        <h1 className="text-3xl font-display font-bold text-text-main tracking-tight">Help & Resolution</h1>
                        <p className="text-text-secondary font-medium mt-1">We're here to ensure your EntryConnect experience is seamless</p>
                    </div>
                    <button
                        onClick={() => setIsCreateModalOpen(true)}
                        className="px-6 py-3.5 bg-primary text-white font-black uppercase tracking-widest text-[10px] rounded-lg hover:bg-primary-hover shadow-xl shadow-primary/20 transition-all flex items-center gap-2 active:scale-95"
                    >
                        <Plus size={16} />
                        New Support Request
                    </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                    {/* Left Column: Tickets */}
                    <div className="lg:col-span-2 space-y-6">
                        <h3 className="text-lg font-display font-bold text-text-main flex items-center gap-2">
                            <MessageSquare size={20} className="text-primary" />
                            Active Conversations
                        </h3>

                        {tickets.length > 0 ? (
                            <div className="space-y-4">
                                {tickets.map((ticket) => (
                                    <div key={ticket.id} className="bg-white border border-gray-100 rounded-xl p-6 hover:shadow-md transition-all group cursor-pointer">
                                        <div className="flex items-start justify-between mb-4">
                                            <div>
                                                <span className="text-[10px] font-black text-text-secondary uppercase tracking-widest bg-gray-50 px-2 py-1 rounded-md">{ticket.id}</span>
                                                <h4 className="font-bold text-text-main mt-2 group-hover:text-primary transition-colors">{ticket.subject}</h4>
                                            </div>
                                            <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${ticket.status === 'Open' ? 'bg-green-100 text-green-700' :
                                                    ticket.status === 'In Progress' ? 'bg-blue-100 text-blue-700' :
                                                        'bg-gray-100 text-gray-500'
                                                }`}>
                                                {ticket.status}
                                            </span>
                                        </div>
                                        <div className="flex items-center justify-between pt-4 border-t border-gray-50 text-xs text-text-secondary font-medium">
                                            <div className="flex items-center gap-4">
                                                <span className="flex items-center gap-1"><Filter size={12} /> {ticket.category}</span>
                                                <span className="flex items-center gap-1"><Clock size={12} /> {ticket.date}</span>
                                            </div>
                                            <ChevronRight size={16} className="text-gray-300 group-hover:text-primary group-hover:translate-x-1 transition-all" />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="bg-gray-50 border-2 border-dashed border-gray-200 rounded-2xl p-12 text-center">
                                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm text-gray-300">
                                    <MessageSquare size={32} />
                                </div>
                                <h4 className="font-bold text-text-main">No active tickets</h4>
                                <p className="text-sm text-text-secondary mt-2">Need help? Create a ticket and we'll be right with you.</p>
                            </div>
                        )}
                    </div>

                    {/* Right Column: FAQ & Quick Help */}
                    <div className="space-y-8">
                        <div className="bg-white border border-gray-100 rounded-xl p-8 shadow-sm">
                            <h3 className="text-lg font-display font-bold text-text-main mb-6 flex items-center gap-2">
                                <HelpCircle size={20} className="text-primary" />
                                Frequent Questions
                            </h3>
                            <div className="space-y-6">
                                {faqs.map((faq, i) => (
                                    <div key={i} className="space-y-2">
                                        <p className="text-sm font-bold text-text-main">{faq.q}</p>
                                        <p className="text-xs text-text-secondary leading-relaxed">{faq.a}</p>
                                    </div>
                                ))}
                            </div>
                            <button className="w-full mt-8 py-3 bg-gray-50 text-primary font-black uppercase tracking-widest text-[10px] rounded-lg hover:bg-primary/5 transition-all">
                                Visit Help Center
                            </button>
                        </div>

                        <div className="bg-primary/5 border border-primary/10 rounded-xl p-8">
                            <h4 className="font-bold text-primary mb-2">Live Support Hours</h4>
                            <p className="text-xs text-text-secondary leading-relaxed">
                                Our technical agents are online Monday to Friday, 9:00 AM — 6:00 PM (WAT).
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <CreateTicketModal
                isOpen={isCreateModalOpen}
                onClose={() => setIsCreateModalOpen(false)}
                onSubmit={handleCreateTicket}
                userType="customer"
            />
        </CustomerSidebar>
    );
}
