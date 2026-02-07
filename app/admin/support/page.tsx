'use client';

import React, { useState } from 'react';
import AdminSidebar from '@/components/admin/AdminSidebar';
import { notify } from '@/lib/notify';
import { Search, Filter, MessageSquare, UserPlus, CheckCircle2, XCircle, MoreVertical, Clock, ShieldAlert } from 'lucide-react';

export default function AdminSupportPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [filterStatus, setFilterStatus] = useState('all');
    const [filterPriority, setFilterPriority] = useState('all');
    const [supportType, setSupportType] = useState<'business' | 'customer'>('business');

    const [tickets, setTickets] = useState([
        { id: 'TKT-2401', subject: 'NFC device not scanning correctly', business: 'Green Terrace Cafe', user: 'Business', priority: 'High', status: 'Open', created: '2 hours ago', agent: 'Daniel' },
        { id: 'TKT-2398', subject: 'Billing inquiry for March', business: 'Tech Hub Lagos', user: 'Business', priority: 'Medium', status: 'In Progress', created: '5 hours ago', agent: 'Sarah' },
        { id: 'TKT-2392', subject: 'How to update business logo?', business: 'Fashion Boutique', user: 'Business', priority: 'Low', status: 'Closed', created: '1 day ago', agent: 'Mike' },
        { id: 'TKT-2385', subject: 'Points not added after visit', user: 'Customer', name: 'Bisi Adebowale', priority: 'High', status: 'Open', created: '1 day ago', agent: 'Unassigned' },
        { id: 'TKT-2350', subject: 'Cannot redeem coffee voucher', user: 'Customer', name: 'John Doe', priority: 'Low', status: 'In Progress', created: '2 days ago', agent: 'Daniel' },
        { id: 'TKT-2342', subject: 'Device arrived damaged', business: 'Beauty Spa', user: 'Business', priority: 'High', status: 'Closed', created: '3 days ago', agent: 'Sarah' },
    ]);

    const stats = [
        { label: 'Unresolved', value: tickets.filter(t => t.status !== 'Closed').length.toString(), icon: 'mark_email_unread', color: 'red' },
        { label: 'Assigned to Me', value: '5', icon: 'person', color: 'blue' },
        { label: 'SLA Breaches', value: '0', icon: 'timer_off', color: 'orange' },
        { label: 'Satisfaction', value: '98%', icon: 'sentiment_very_satisfied', color: 'green' },
    ];

    const handleAssignToMe = (id: string) => {
        setTickets(prev => prev.map(t => t.id === id ? { ...t, agent: 'Daniel (Me)', status: 'In Progress' } : t));
        notify.success(`Ticket ${id} has been assigned to you`);
    };

    const handleResolve = (id: string) => {
        setTickets(prev => prev.map(t => t.id === id ? { ...t, status: 'Closed' } : t));
        notify.success(`Ticket ${id} marked as resolved`);
    };

    const filteredTickets = tickets.filter(ticket => {
        const matchesType = supportType === 'business' ? ticket.user === 'Business' : ticket.user === 'Customer';
        const matchesSearch = ticket.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
            ticket.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (ticket.business?.toLowerCase().includes(searchQuery.toLowerCase())) ||
            (ticket.name?.toLowerCase().includes(searchQuery.toLowerCase()));
        const matchesPriority = filterPriority === 'all' || ticket.priority === filterPriority;
        const matchesStatus = filterStatus === 'all' || ticket.status === filterStatus;
        return matchesType && matchesSearch && matchesPriority && matchesStatus;
    });

    return (
        <AdminSidebar>
            <div className="p-8">
                {/* Page Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
                    <div>
                        <h1 className="text-3xl font-display font-bold text-text-main mb-2">Omnichannel Support</h1>
                        <p className="text-text-secondary font-medium">Manage inquiries and resolve platform issues</p>
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="bg-gray-100 p-1.5 rounded-xl flex items-center gap-1 shadow-inner">
                            <button
                                onClick={() => setSupportType('business')}
                                className={`px-4 py-2 text-xs font-black uppercase tracking-wider rounded-lg transition-all ${supportType === 'business' ? 'bg-white text-primary shadow-sm' : 'text-text-secondary hover:text-text-main'}`}
                            >
                                Business
                            </button>
                            <button
                                onClick={() => setSupportType('customer')}
                                className={`px-4 py-2 text-xs font-black uppercase tracking-wider rounded-lg transition-all ${supportType === 'customer' ? 'bg-white text-primary shadow-sm' : 'text-text-secondary hover:text-text-main'}`}
                            >
                                Customer
                            </button>
                        </div>
                        <button
                            onClick={() => notify.info('Support dashboard syncing...')}
                            className="px-6 py-3 bg-primary text-white font-bold rounded-xl hover:bg-primary-hover transition-all flex items-center gap-2 shadow-lg shadow-primary/20"
                        >
                            <MessageSquare size={18} />
                            Live Console
                        </button>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {stats.map((stat, index) => (
                        <div key={index} className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
                            <div className="flex items-center gap-4">
                                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${stat.color === 'red' ? 'bg-red-50 text-red-600' :
                                    stat.color === 'blue' ? 'bg-blue-50 text-blue-600' :
                                        stat.color === 'orange' ? 'bg-orange-50 text-orange-600' :
                                            'bg-green-50 text-green-600'
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
                                placeholder="Search tickets, businesses, or issues..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full h-12 pl-10 pr-4 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-4 focus:ring-primary/10 focus:bg-white transition-all shadow-inner"
                            />
                        </div>
                        <div className="flex gap-2">
                            <select
                                value={filterPriority}
                                onChange={(e) => setFilterPriority(e.target.value)}
                                className="h-12 px-4 bg-gray-50 border border-gray-200 rounded-lg text-sm font-bold focus:outline-none focus:ring-2 focus:ring-primary/20"
                            >
                                <option value="all">Priority</option>
                                <option value="High">Emergency</option>
                                <option value="Medium">Standard</option>
                                <option value="Low">Low</option>
                            </select>
                            <select
                                value={filterStatus}
                                onChange={(e) => setFilterStatus(e.target.value)}
                                className="h-12 px-4 bg-gray-50 border border-gray-200 rounded-lg text-sm font-bold focus:outline-none focus:ring-2 focus:ring-primary/20"
                            >
                                <option value="all">Status</option>
                                <option value="Open">Unassigned</option>
                                <option value="In Progress">Active</option>
                                <option value="Closed">Resolved</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Tickets Table */}
                <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50 border-b border-gray-200">
                                <tr>
                                    <th className="text-left py-4 px-6 text-xs font-black uppercase tracking-wider text-text-secondary">ID</th>
                                    <th className="text-left py-4 px-6 text-xs font-black uppercase tracking-wider text-text-secondary">Subject & {supportType === 'business' ? 'Business' : 'Customer'}</th>
                                    <th className="text-left py-4 px-6 text-xs font-black uppercase tracking-wider text-text-secondary">Priority</th>
                                    <th className="text-left py-4 px-6 text-xs font-black uppercase tracking-wider text-text-secondary">Status</th>
                                    <th className="text-left py-4 px-6 text-xs font-black uppercase tracking-wider text-text-secondary">Time Ago</th>
                                    <th className="text-left py-4 px-6 text-xs font-black uppercase tracking-wider text-text-secondary">Agent</th>
                                    <th className="text-right py-4 px-6 text-xs font-black uppercase tracking-wider text-text-secondary">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {filteredTickets.map((ticket) => (
                                    <tr key={ticket.id} className="hover:bg-gray-50 transition-colors group">
                                        <td className="py-4 px-6">
                                            <span className="font-mono text-xs font-bold text-text-secondary">{ticket.id}</span>
                                        </td>
                                        <td className="py-4 px-6">
                                            <div className="max-w-xs">
                                                <p className="font-bold text-sm text-text-main group-hover:text-primary transition-colors cursor-pointer">{ticket.subject}</p>
                                                <p className="text-[10px] text-text-secondary font-black uppercase tracking-widest mt-0.5">{supportType === 'business' ? (ticket as any).business : (ticket as any).name}</p>
                                            </div>
                                        </td>
                                        <td className="py-4 px-6">
                                            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[10px] font-black uppercase tracking-wider border ${ticket.priority === 'High' ? 'bg-red-50 text-red-600 border-red-100' :
                                                ticket.priority === 'Medium' ? 'bg-orange-50 text-orange-600 border-orange-100' :
                                                    'bg-gray-50 text-gray-500 border-gray-200'
                                                }`}>
                                                {ticket.priority === 'High' && <ShieldAlert size={10} />}
                                                {ticket.priority}
                                            </span>
                                        </td>
                                        <td className="py-4 px-6">
                                            <span className={`inline-flex px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${ticket.status === 'Open' ? 'bg-green-50 text-green-600' :
                                                ticket.status === 'In Progress' ? 'bg-blue-50 text-blue-600' :
                                                    'bg-gray-100 text-gray-400'
                                                }`}>
                                                {ticket.status}
                                            </span>
                                        </td>
                                        <td className="py-4 px-6">
                                            <div className="flex items-center gap-1.5 text-xs text-text-secondary font-bold">
                                                <Clock size={12} />
                                                {ticket.created}
                                            </div>
                                        </td>
                                        <td className="py-4 px-6">
                                            <div className="flex items-center gap-2">
                                                <div className="w-6 h-6 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center overflow-hidden">
                                                    <span className="text-[8px] font-black">{ticket.agent.charAt(0)}</span>
                                                </div>
                                                <span className="text-xs font-bold text-text-main">{ticket.agent}</span>
                                            </div>
                                        </td>
                                        <td className="py-4 px-6 text-right">
                                            <div className="flex items-center justify-end gap-1">
                                                {ticket.agent === 'Unassigned' && (
                                                    <button
                                                        onClick={() => handleAssignToMe(ticket.id)}
                                                        className="p-2 text-primary hover:bg-primary/10 rounded-lg transition-all"
                                                        title="Claim Ticket"
                                                    >
                                                        <UserPlus size={18} />
                                                    </button>
                                                )}
                                                {ticket.status !== 'Closed' && (
                                                    <button
                                                        onClick={() => handleResolve(ticket.id)}
                                                        className="p-2 text-green-500 hover:bg-green-50 rounded-lg transition-all"
                                                        title="Mark Resolved"
                                                    >
                                                        <span className="material-icons-round text-lg">check_circle</span>
                                                    </button>
                                                )}
                                                <button className="p-2 text-gray-400 hover:text-text-main hover:bg-gray-100 rounded-lg transition-colors">
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
            </div>
        </AdminSidebar>
    );
}
