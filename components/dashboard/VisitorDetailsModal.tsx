import React from 'react';
import Modal from '@/components/ui/Modal';
import { Visitor } from '@/lib/store/mockDashboardStore';
import { User, Phone, Calendar, Clock, MapPin, Activity, Tag, Mail, MessageSquare } from 'lucide-react';

interface VisitorDetailsModalProps {
    isOpen: boolean;
    onClose: () => void;
    visitor: Visitor | null;
}

export default function VisitorDetailsModal({ isOpen, onClose, visitor }: VisitorDetailsModalProps) {
    if (!visitor) return null;

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title="Visitor Profile"
            description="Detailed customer information and activity history"
            size="full"
        >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-4">
                {/* Sidebar / Profile Card */}
                <div className="md:col-span-1 space-y-6">
                    <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100 flex flex-col items-center text-center">
                        <div className="w-24 h-24 rounded-full bg-linear-to-br from-primary to-blue-600 flex items-center justify-center text-white text-3xl font-black shadow-lg mb-4">
                            {visitor.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <h3 className="text-xl font-black text-text-main mb-1">{visitor.name}</h3>
                        <p className="text-sm font-medium text-text-secondary mb-4">{visitor.phone}</p>

                        <div className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider ${visitor.status === 'new' ? 'bg-green-100 text-green-700' : 'bg-purple-100 text-purple-700'
                            }`}>
                            {visitor.status === 'new' ? 'New Customer' : 'Loyal Customer'}
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="flex items-center gap-3 p-4 bg-white border border-gray-100 rounded-xl">
                            <div className="bg-orange-50 p-2 rounded-lg text-orange-500">
                                <Activity size={18} />
                            </div>
                            <div>
                                <p className="text-[10px] uppercase font-black text-text-secondary tracking-widest">Total Visits</p>
                                <p className="font-bold text-text-main">12 Visits</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 p-4 bg-white border border-gray-100 rounded-xl">
                            <div className="bg-blue-50 p-2 rounded-lg text-blue-500">
                                <Tag size={18} />
                            </div>
                            <div>
                                <p className="text-[10px] uppercase font-black text-text-secondary tracking-widest">Last Message</p>
                                <p className="font-bold text-text-main">Summer Sale</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="md:col-span-2 space-y-8">
                    <div>
                        <h4 className="text-sm font-black uppercase tracking-widest text-text-secondary mb-4 flex items-center gap-2">
                            <User size={16} /> Personal Details
                        </h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                                <label className="text-[10px] font-bold text-text-secondary uppercase mb-1 block">Customer ID</label>
                                <p className="font-medium text-text-main">{visitor.id}</p>
                            </div>
                            <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                                <label className="text-[10px] font-bold text-text-secondary uppercase mb-1 block">Email Address</label>
                                <p className="font-medium text-text-main flex items-center gap-2">
                                    <Mail size={14} className="text-gray-400" />
                                    No email provided
                                </p>
                            </div>
                            <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                                <label className="text-[10px] font-bold text-text-secondary uppercase mb-1 block">Phone Number</label>
                                <p className="font-medium text-text-main flex items-center gap-2">
                                    <Phone size={14} className="text-gray-400" />
                                    {visitor.phone}
                                </p>
                            </div>
                            <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                                <label className="text-[10px] font-bold text-text-secondary uppercase mb-1 block">First Seen</label>
                                <p className="font-medium text-text-main flex items-center gap-2">
                                    <Calendar size={14} className="text-gray-400" />
                                    Jan 12, 2024
                                </p>
                            </div>
                            <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                                <label className="text-[10px] font-bold text-text-secondary uppercase mb-1 block">Last Seen</label>
                                <p className="font-medium text-text-main flex items-center gap-2">
                                    <Clock size={14} className="text-gray-400" />
                                    {visitor.time}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div>
                        <h4 className="text-sm font-black uppercase tracking-widest text-text-secondary mb-4 flex items-center gap-2">
                            <MessageSquare size={16} /> Recent Activity
                        </h4>
                        <div className="space-y-3">
                            {[1, 2, 3].map((_, i) => (
                                <div key={i} className="flex gap-4 p-4 rounded-xl bg-white border border-gray-100 hover:bg-gray-50 transition-colors">
                                    <div className="flex flex-col items-center gap-1 min-w-[60px]">
                                        <span className="text-xs font-bold text-text-secondary">Feb {12 - i}</span>
                                        <span className="text-[10px] font-medium text-gray-400">14:30</span>
                                    </div>
                                    <div className="w-px bg-gray-200 self-stretch"></div>
                                    <div>
                                        <p className="text-sm font-bold text-text-main">Checked in via NFC</p>
                                        <p className="text-xs text-text-secondary">Main Entrance Device</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
    );
}
