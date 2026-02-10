'use client';

import React, { useState } from 'react';
import AdminSidebar from '@/components/admin/AdminSidebar';
import { notify } from '@/lib/notify';
import { Cpu, Zap, Shield, Palette, Printer, Settings, Save, Smartphone, ChevronRight, Package, Box } from 'lucide-react';

export default function AdminHardwarePage() {
    const [hardware, setHardware] = useState([
        { id: 'h1', name: "Premium NFC Card", price: 3500, cost: 2100, stock: 450, status: 'active', color: 'blue', icon: Cpu },
        { id: 'h2', name: "Smart Sticker", price: 1500, cost: 850, stock: 1200, status: 'active', color: 'green', icon: Zap },
        { id: 'h3', name: "Metal NFC Plate", price: 12000, cost: 7500, stock: 85, status: 'active', color: 'orange', icon: Shield },
    ]);

    const [whiteLabelSettings, setWhiteLabelSettings] = useState({
        minOrder: 1000,
        markupPercentage: 15,
        setupFee: 50000,
        available: true
    });

    const handleUpdatePrice = (id: string, newPrice: number) => {
        setHardware(prev => prev.map(h => h.id === id ? { ...h, price: newPrice } : h));
        notify.success('Hardware pricing updated');
    };

    const handleToggleWhiteLabel = () => {
        setWhiteLabelSettings(prev => ({ ...prev, available: !prev.available }));
        notify.success(`White-labeling ${!whiteLabelSettings.available ? 'enabled' : 'disabled'}`);
    };

    return (
        <AdminSidebar>
            <div className="p-8">
                {/* Page Header */}
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-3xl font-display font-bold text-text-main mb-2">Hardware & Logistics</h1>
                        <p className="text-text-secondary font-medium">Manage NFC hardware pricing, stock levels, and white-labeling configuration</p>
                    </div>
                    <div className="flex gap-3">
                        <button
                            onClick={() => notify.info('Syncing inventory with warehouse...')}
                            className="px-6 py-3 bg-white border border-gray-200 text-text-main font-bold rounded-xl hover:bg-gray-50 transition-all flex items-center gap-2 shadow-sm active:scale-95"
                        >
                            <Box size={18} className="text-primary" />
                            Inventory Sync
                        </button>
                        <button className="px-6 py-3 bg-primary text-white font-bold rounded-xl hover:bg-primary-hover transition-all flex items-center gap-2 shadow-lg shadow-primary/20 active:scale-95">
                            <Save size={18} />
                            Deploy Changes
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Hardware Pricing Cards */}
                    <div className="lg:col-span-2 space-y-6">
                        <h2 className="text-xl font-bold text-text-main flex items-center gap-2">
                            <Package size={20} className="text-primary" />
                            Product Catalog & Retail Pricing
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {hardware.map((item) => (
                                <div key={item.id} className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm group">
                                    <div className="flex items-start justify-between mb-6">
                                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${item.color === 'blue' ? 'bg-blue-50 text-blue-600' :
                                            item.color === 'green' ? 'bg-green-50 text-green-600' :
                                                'bg-orange-50 text-orange-600'
                                            }`}>
                                            <item.icon size={24} />
                                        </div>
                                        <div className="text-right">
                                            <span className="text-[10px] font-black uppercase tracking-widest text-text-secondary">Current Net Margin</span>
                                            <p className="text-lg font-bold text-green-600">+{((item.price - item.cost) / item.price * 100).toFixed(0)}%</p>
                                        </div>
                                    </div>

                                    <h3 className="text-lg font-bold text-text-main mb-1">{item.name}</h3>
                                    <p className="text-xs text-text-secondary font-bold uppercase tracking-widest mb-6">Stock: {item.stock} Units</p>

                                    <div className="space-y-4">
                                        <div>
                                            <label className="text-[10px] font-black uppercase tracking-widest text-text-secondary block mb-1.5 ml-1">Retail Price (₦)</label>
                                            <div className="relative">
                                                <input
                                                    type="number"
                                                    value={item.price}
                                                    onChange={(e) => handleUpdatePrice(item.id, parseInt(e.target.value))}
                                                    className="w-full h-11 pl-4 pr-12 bg-gray-50 border border-gray-200 rounded-xl font-bold text-sm focus:ring-2 focus:ring-primary/20 focus:outline-none focus:bg-white transition-all"
                                                />
                                                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-text-secondary">NGN</span>
                                            </div>
                                        </div>
                                        <div className="flex gap-4">
                                            <div className="flex-1">
                                                <label className="text-[10px] font-black uppercase tracking-widest text-text-secondary block mb-1.5 ml-1">Unit Cost</label>
                                                <p className="h-11 flex items-center px-4 bg-gray-100 border border-gray-200 rounded-xl font-bold text-sm text-text-secondary">
                                                    ₦{item.cost.toLocaleString()}
                                                </p>
                                            </div>
                                            <div className="flex-1">
                                                <label className="text-[10px] font-black uppercase tracking-widest text-text-secondary block mb-1.5 ml-1">Profit</label>
                                                <p className="h-11 flex items-center px-4 bg-green-50 border border-green-100 rounded-xl font-bold text-sm text-green-600">
                                                    ₦{(item.price - item.cost).toLocaleString()}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* White Label Settings */}
                    <div className="space-y-6">
                        <h2 className="text-xl font-bold text-text-main flex items-center gap-2">
                            <Palette size={20} className="text-primary" />
                            White-Label Rules
                        </h2>

                        <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-lg relative overflow-hidden">
                            <div className={`absolute top-0 right-0 w-32 h-32 -translate-y-16 translate-x-16 rounded-full blur-3xl opacity-20 ${whiteLabelSettings.available ? 'bg-green-500' : 'bg-red-500'}`} />

                            <div className="flex items-center justify-between mb-8 relative z-10">
                                <div>
                                    <h3 className="font-bold text-text-main">Global Availability</h3>
                                    <p className="text-xs text-text-secondary font-medium">Allow merchants to request custom branding</p>
                                </div>
                                <button
                                    onClick={handleToggleWhiteLabel}
                                    className={`w-12 h-6 rounded-full transition-colors relative ${whiteLabelSettings.available ? 'bg-primary' : 'bg-gray-200'}`}
                                >
                                    <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${whiteLabelSettings.available ? 'left-7' : 'left-1'}`} />
                                </button>
                            </div>

                            <div className="space-y-6 relative z-10">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-text-secondary flex items-center gap-2">
                                        <Package size={12} />
                                        Min. Bulk Order Quantity
                                    </label>
                                    <input
                                        type="number"
                                        value={whiteLabelSettings.minOrder}
                                        onChange={(e) => setWhiteLabelSettings(prev => ({ ...prev, minOrder: parseInt(e.target.value) }))}
                                        className="w-full h-12 px-4 bg-gray-50 border border-gray-200 rounded-xl font-bold text-sm focus:ring-2 focus:ring-primary/20 focus:outline-none focus:bg-white transition-all"
                                    />
                                </div>

                            </div>
                        </div>
                    </div>
                </div>

                <div className="pt-4 border-t border-gray-100">
                    <div className="flex items-center gap-3 text-sm font-bold text-text-main">
                        <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                            <Printer size={16} className="text-primary" />
                        </div>
                        Branding Service: <span className="text-primary">Operational</span>
                    </div>
                </div>
            </div>
        </AdminSidebar>
    );
}
