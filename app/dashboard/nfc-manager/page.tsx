'use client';

import React, { useState } from 'react';
import PageHeader from '@/components/dashboard/PageHeader';
import { useCustomerFlowStore } from '@/store/useCustomerFlowStore';
import { Smartphone, Plus, QrCode, Copy, Download, Trash2, Calendar, Link as LinkIcon, ExternalLink } from 'lucide-react';
import { QRCodeCanvas } from 'qrcode.react';
import { toast } from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';

interface NFCLink {
    id: string;
    uniqueId: string;
    createdAt: string;
    url: string;
}

export default function NFCManagerPage() {
    const { businessId } = useCustomerFlowStore();
    const [quantity, setQuantity] = useState<number>(1);
    const [generatedLinks, setGeneratedLinks] = useState<NFCLink[]>([]);

    const generateLinks = () => {
        if (!businessId) {
            toast.error("Business ID not found. Please complete setup first.");
            return;
        }

        const newLinks: NFCLink[] = [];
        const timestamp = new Date().toISOString();
        const baseUrl = window.location.origin;

        for (let i = 0; i < quantity; i++) {
            // Generate a random 8-character unique ID
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
        toast.success(`Generated ${quantity} unique NFC links`);
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
        setGeneratedLinks(prev => prev.filter(link => link.id !== id));
    };

    return (
        <div className="p-8 max-w-7xl mx-auto space-y-8">
            <PageHeader
                title="NFC Manager"
                description="Generate and manage unique links for your physical NFC hardware and QR codes."
            />

            {/* Generator Card */}
            <div className="bg-white rounded-[2.5rem] border border-gray-100 p-8 shadow-sm">
                <div className="flex flex-col md:flex-row items-end gap-6">
                    <div className="flex-1 space-y-3">
                        <label className="text-[10px] font-black uppercase tracking-widest text-text-secondary ml-1">
                            Number of NFC Cards / QR Codes
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
                <p className="text-[10px] text-text-secondary font-medium mt-4 italic">
                    Tip: Each link is unique and will redirect users to your VemTap flow when tapped or scanned.
                </p>
            </div>

            {/* Links Table */}
            <div className="bg-white rounded-[2.5rem] border border-gray-200 shadow-sm overflow-hidden">
                <div className="px-8 py-6 border-b border-gray-100 bg-gray-50/50 flex items-center justify-between">
                    <h3 className="font-display font-bold text-text-main">Generated Hardware Links</h3>
                    <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-[10px] font-bold">
                        {generatedLinks.length} Assets Total
                    </span>
                </div>

                {generatedLinks.length === 0 ? (
                    <div className="p-20 text-center space-y-4">
                        <div className="size-16 bg-gray-50 text-gray-300 rounded-2xl flex items-center justify-center mx-auto">
                            <Smartphone size={32} />
                        </div>
                        <p className="text-sm font-medium text-text-secondary">No links generated yet. Use the generator above to start.</p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-gray-50/30 text-[10px] font-black uppercase tracking-widest text-text-secondary border-b border-gray-100">
                                <tr>
                                    <th className="px-8 py-4">Unique ID</th>
                                    <th className="px-8 py-4">Created Date</th>
                                    <th className="px-8 py-4">Direct URL</th>
                                    <th className="px-8 py-4">QR Preview</th>
                                    <th className="px-8 py-4 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                <AnimatePresence mode="popLayout">
                                    {generatedLinks.map((link) => (
                                        <motion.tr
                                            key={link.id}
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: 20 }}
                                            className="group hover:bg-gray-50/50 transition-colors"
                                        >
                                            <td className="px-8 py-6">
                                                <div className="flex items-center gap-3">
                                                    <div className="size-8 bg-primary/10 text-primary rounded-lg flex items-center justify-center font-black text-[10px]">
                                                        {link.uniqueId.slice(0, 2)}
                                                    </div>
                                                    <span className="font-mono font-bold text-sm text-text-main tracking-wider">{link.uniqueId}</span>
                                                </div>
                                            </td>
                                            <td className="px-8 py-6">
                                                <div className="flex items-center gap-2 text-text-secondary font-medium text-xs">
                                                    <Calendar size={14} className="opacity-50" />
                                                    {new Date(link.createdAt).toLocaleDateString()}
                                                </div>
                                            </td>
                                            <td className="px-8 py-6">
                                                <div className="flex items-center gap-2 max-w-[200px]">
                                                    <LinkIcon size={14} className="text-primary shrink-0" />
                                                    <span className="text-xs font-bold text-text-secondary truncate">{link.url}</span>
                                                </div>
                                            </td>
                                            <td className="px-8 py-6">
                                                <div className="p-1 bg-white border border-gray-100 rounded-lg shadow-sm w-fit group-hover:scale-125 transition-transform origin-left">
                                                    <QRCodeCanvas
                                                        id={`qr-${link.id}`}
                                                        value={link.url}
                                                        size={40}
                                                        level="H"
                                                        includeMargin={false}
                                                    />
                                                </div>
                                            </td>
                                            <td className="px-8 py-6 text-right">
                                                <div className="flex items-center justify-end gap-2">
                                                    <button
                                                        onClick={() => copyToClipboard(link.url)}
                                                        className="p-2.5 text-text-secondary hover:text-primary hover:bg-white rounded-xl transition-all shadow-sm border border-transparent hover:border-gray-100"
                                                        title="Copy Link"
                                                    >
                                                        <Copy size={16} />
                                                    </button>
                                                    <button
                                                        onClick={() => downloadQRCode(link.id, link.uniqueId)}
                                                        className="p-2.5 text-text-secondary hover:text-primary hover:bg-white rounded-xl transition-all shadow-sm border border-transparent hover:border-gray-100"
                                                        title="Download QR"
                                                    >
                                                        <Download size={16} />
                                                    </button>
                                                    <button
                                                        onClick={() => removeLink(link.id)}
                                                        className="p-2.5 text-text-secondary hover:text-red-500 hover:bg-white rounded-xl transition-all shadow-sm border border-transparent hover:border-gray-100"
                                                        title="Delete"
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
        </div>
    );
}
