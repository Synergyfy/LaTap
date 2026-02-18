'use client';

import React, { useState } from 'react';
import PageHeader from '@/components/dashboard/PageHeader';
import { useAuthStore } from '@/store/useAuthStore';
import { Smartphone, Plus, QrCode, Copy, Download, Trash2, Calendar, Link as LinkIcon, ExternalLink, X, Save } from 'lucide-react';
import { QRCodeCanvas } from 'qrcode.react';
import { toast } from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';
import { useCustomerFlowStore } from '@/store/useCustomerFlowStore';

interface NFCLink {
    id: string;
    uniqueId: string;
    createdAt: string;
    url: string;
    note?: string;
}

export default function NFCManagerPage() {
    const { user } = useAuthStore();
    const { businessId: customerFlowStoreId } = useCustomerFlowStore();
    const businessId = user?.businessId || customerFlowStoreId;
    const [quantity, setQuantity] = useState<number>(1);
    const [generatedLinks, setGeneratedLinks] = useState<NFCLink[]>([]);
    const [selectedLink, setSelectedLink] = useState<NFCLink | null>(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editUrl, setEditUrl] = useState('');

    const generateLinks = () => {
        if (!businessId) {
            toast.error("Business ID not found. Please complete setup first.");
            return;
        }

        const newLinks: NFCLink[] = [];
        const timestamp = new Date().toISOString();
        const baseUrl = window.location.origin;

        for (let i = 0; i < quantity; i++) {
            const uniqueId = Math.random().toString(36).substring(2, 10).toUpperCase();
            const url = `${baseUrl}/${businessId}/${uniqueId}`;

            newLinks.push({
                id: `NFC-${Date.now()}-${i}`,
                uniqueId,
                createdAt: timestamp,
                url
            });
        }

        setGeneratedLinks(prev => [...newLinks, ...prev]);
        toast.success(`Generated ${quantity} unique NFC assets`);
    };

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
        toast.success("Link copied to clipboard");
    };

    const downloadQRCode = (id: string, uniqueId: string) => {
        const canvas = document.getElementById(`qr-${id}`) as HTMLCanvasElement;
        if (canvas) {
            const url = canvas.toDataURL("image/png");
            const link = document.createElement("a");
            link.download = `QR-${uniqueId}.png`;
            link.href = url;
            link.click();
        }
    };

    const removeLink = (id: string) => {
        if (confirm("Are you sure you want to delete this asset? This action cannot be undone.")) {
            setGeneratedLinks(prev => prev.filter(link => link.id !== id));
            toast.success("Asset removed");
        }
    };

    const openEditModal = (link: NFCLink) => {
        setSelectedLink(link);
        setEditUrl(link.url);
        setIsEditModalOpen(true);
    };

    const saveEdit = () => {
        if (!selectedLink) return;

        setGeneratedLinks(prev => prev.map(l =>
            l.id === selectedLink.id ? { ...l, url: editUrl } : l
        ));

        setIsEditModalOpen(false);
        setSelectedLink(null);
        toast.success("Link updated and assets synchronized");
    };

    return (
        <div className="p-8 max-w-7xl mx-auto space-y-8">
            <PageHeader
                title="NFC Asset Hub"
                description="Manage your physical hardware links and generate high-resolution QR codes for print."
            />

            {/* Generator Card */}
            <div className="bg-white rounded-[2.5rem] border border-gray-100 p-8 shadow-sm">
                <div className="flex flex-col md:flex-row items-end gap-6">
                    <div className="flex-1 space-y-3">
                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-700 ml-1">
                            Asset Batch Quantity
                        </label>
                        <div className="relative">
                            <Plus size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input
                                type="number"
                                min="1"
                                max="100"
                                value={quantity}
                                onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                                className="w-full h-14 bg-gray-50 border border-gray-100 rounded-2xl pl-12 pr-4 text-sm font-bold focus:bg-white focus:ring-4 focus:ring-primary/10 transition-all outline-none"
                            />
                        </div>
                    </div>
                    <button
                        onClick={generateLinks}
                        className="h-14 px-8 bg-primary text-white font-black uppercase tracking-widest text-xs rounded-2xl shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all flex items-center gap-3 whitespace-nowrap"
                    >
                        <QrCode size={18} />
                        Generate Assets
                    </button>
                </div>
            </div>

            {/* Links Table */}
            <div className="bg-white rounded-[2.5rem] border border-gray-200 shadow-sm overflow-hidden">
                <div className="px-8 py-6 border-b border-gray-100 bg-gray-50/50 flex items-center justify-between">
                    <div>
                        <h3 className="font-display font-bold text-text-main">Connected NFC Hardware</h3>
                        <p className="text-[10px] text-text-secondary font-medium">Manage individual tag configurations and print-ready QR codes.</p>
                    </div>
                    <span className="px-4 py-1.5 bg-primary/10 text-primary border border-primary/20 rounded-full text-[10px] font-black uppercase tracking-tighter">
                        {generatedLinks.length} Assets Active
                    </span>
                </div>

                {generatedLinks.length === 0 ? (
                    <div className="p-20 text-center space-y-4">
                        <div className="size-16 bg-gray-50 text-gray-300 rounded-2xl flex items-center justify-center mx-auto">
                            <Smartphone size={32} />
                        </div>
                        <p className="text-sm font-bold text-text-secondary">No assets found. Start by generating new links above.</p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-gray-50/30 text-[10px] font-black uppercase tracking-widest text-slate-700 border-b border-gray-100">
                                <tr>
                                    <th className="px-8 py-4">Hardware ID</th>
                                    <th className="px-8 py-4">Configuration</th>
                                    <th className="px-8 py-4">Asset Preview</th>
                                    <th className="px-8 py-4 text-right">Utility</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                <AnimatePresence mode="popLayout">
                                    {generatedLinks.map((link) => (
                                        <motion.tr
                                            key={link.id}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, scale: 0.95 }}
                                            className="group hover:bg-gray-50/50 transition-colors"
                                        >
                                            <td className="px-8 py-6">
                                                <div className="flex items-center gap-4">
                                                    <div className="size-10 bg-slate-100 text-slate-800 border border-slate-200 rounded-xl flex items-center justify-center font-black text-xs">
                                                        {link.uniqueId.slice(0, 2)}
                                                    </div>
                                                    <div>
                                                        <span className="font-mono font-bold text-sm text-text-main tracking-widest block">{link.uniqueId}</span>
                                                        <span className="text-[9px] text-text-secondary font-medium uppercase">{new Date(link.createdAt).toDateString()}</span>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-8 py-6">
                                                <div className="flex items-center gap-3 p-2 bg-slate-50 border border-slate-100 rounded-xl w-fit pr-4">
                                                    <div className="size-8 bg-white border border-slate-200 rounded-lg flex items-center justify-center">
                                                        <LinkIcon size={14} className="text-primary" />
                                                    </div>
                                                    <div className="min-w-0 max-w-[150px]">
                                                        <span className="text-[10px] font-black text-slate-400 uppercase block leading-none mb-1">Target link</span>
                                                        <span className="text-xs font-bold text-text-main truncate block">{link.url}</span>
                                                    </div>
                                                    <button
                                                        onClick={() => copyToClipboard(link.url)}
                                                        className="size-8 bg-white border border-slate-200 rounded-lg flex items-center justify-center hover:bg-primary/5 hover:border-primary/20 transition-all shadow-sm"
                                                    >
                                                        <Copy size={14} className="text-slate-400 group-hover:text-primary transition-colors" />
                                                    </button>
                                                </div>
                                            </td>
                                            <td className="px-8 py-6">
                                                <div className="flex items-center gap-4 p-2 bg-slate-50 border border-slate-100 rounded-xl w-fit pr-4">
                                                    <div className="p-2 bg-white border border-slate-200 rounded-lg shadow-sm origin-left">
                                                        <QRCodeCanvas
                                                            id={`qr-${link.id}`}
                                                            value={link.url}
                                                            size={32}
                                                            level="H"
                                                        />
                                                    </div>
                                                    <div>
                                                        <span className="text-[10px] font-black text-slate-400 uppercase block leading-none mb-1">Print Code</span>
                                                        <button
                                                            onClick={() => downloadQRCode(link.id, link.uniqueId)}
                                                            className="flex items-center gap-1.5 text-[10px] font-black text-primary hover:underline uppercase tracking-tighter"
                                                        >
                                                            <Download size={12} />
                                                            Download PNG
                                                        </button>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-8 py-6 text-right">
                                                <div className="flex items-center justify-end gap-2">
                                                    <button
                                                        onClick={() => openEditModal(link)}
                                                        className="px-4 py-2 bg-white border border-slate-200 text-[10px] font-black text-slate-800 rounded-xl hover:border-primary hover:text-primary transition-all shadow-sm uppercase tracking-widest"
                                                    >
                                                        Details
                                                    </button>
                                                    <button
                                                        onClick={() => removeLink(link.id)}
                                                        className="p-2.5 text-slate-400 hover:text-red-500 hover:bg-rose-50 rounded-xl transition-all border border-transparent hover:border-red-100"
                                                    >
                                                        <Trash2 size={16} />
                                                    </button>
                                                </div>
                                            </td>
                                        </motion.tr>
                                    ))}
                                </AnimatePresence>
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {/* Edit/Details Modal */}
            <AnimatePresence>
                {isEditModalOpen && selectedLink && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsEditModalOpen(false)}
                            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            className="relative w-full max-w-lg bg-white rounded-[2.5rem] shadow-2xl overflow-hidden"
                        >
                            <div className="p-8 border-b border-gray-100 bg-gray-50/50 flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="size-12 bg-primary flex items-center justify-center rounded-2xl shadow-lg shadow-primary/20">
                                        <Smartphone className="text-white" size={24} />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-display font-black text-text-main uppercase tracking-tight leading-none mb-1">Asset Configuration</h3>
                                        <p className="text-[10px] text-text-secondary font-medium uppercase tracking-[0.2em]">ID: {selectedLink.uniqueId}</p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setIsEditModalOpen(false)}
                                    className="size-10 bg-white border border-gray-100 rounded-xl flex items-center justify-center hover:bg-gray-50 transition-all shadow-sm"
                                >
                                    <X size={20} />
                                </button>
                            </div>

                            <div className="p-8 space-y-8">
                                {/* Large QR Preview */}
                                <div className="flex flex-col items-center gap-4">
                                    <div className="p-4 bg-white border-2 border-primary/10 rounded-3xl shadow-inner group relative">
                                        <QRCodeCanvas
                                            id={`qr-modal-${selectedLink.id}`}
                                            value={editUrl}
                                            size={180}
                                            level="H"
                                            includeMargin={true}
                                        />
                                        <div className="absolute inset-x-0 -bottom-3 flex justify-center">
                                            <span className="bg-primary text-white text-[8px] font-black uppercase px-3 py-1 rounded-full shadow-lg">Live Preview</span>
                                        </div>
                                    </div>
                                    <p className="text-[10px] text-text-secondary font-medium italic text-center max-w-[250px]">
                                        QR Code updates in real-time as you modify the destination URL.
                                    </p>
                                </div>

                                {/* URL Input */}
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between ml-1">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-700">Destination URL</label>
                                        <button
                                            onClick={() => setEditUrl(`${window.location.origin}/${businessId}/${selectedLink.uniqueId}`)}
                                            className="text-[10px] font-black text-primary hover:underline uppercase"
                                        >
                                            Reset to Default
                                        </button>
                                    </div>
                                    <div className="relative">
                                        <LinkIcon size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-primary" />
                                        <input
                                            type="text"
                                            value={editUrl}
                                            onChange={(e) => setEditUrl(e.target.value)}
                                            className="w-full h-14 bg-gray-50 border border-slate-200 rounded-2xl pl-12 pr-4 text-sm font-bold focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/5 transition-all outline-none"
                                            placeholder="Enter redirect URL..."
                                        />
                                    </div>
                                </div>

                                {/* Details Grid */}
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="p-4 bg-slate-50 border border-slate-100 rounded-2xl">
                                        <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block mb-1">Setup Date</span>
                                        <span className="text-xs font-bold text-slate-800">{new Date(selectedLink.createdAt).toLocaleString()}</span>
                                    </div>
                                    <div className="p-4 bg-slate-50 border border-slate-100 rounded-2xl">
                                        <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block mb-1">Asset Status</span>
                                        <div className="flex items-center gap-2">
                                            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                                            <span className="text-xs font-bold text-slate-800 uppercase tracking-tighter">Connected</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex gap-3 pt-2">
                                    <button
                                        onClick={() => setIsEditModalOpen(false)}
                                        className="flex-1 h-14 bg-slate-50 text-slate-800 font-black uppercase tracking-widest text-xs rounded-2xl hover:bg-slate-100 transition-all border border-slate-200"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={saveEdit}
                                        className="flex-[2] h-14 bg-primary text-white font-black uppercase tracking-widest text-xs rounded-2xl shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2"
                                    >
                                        <Save size={18} />
                                        Save Configuration
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
