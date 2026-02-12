'use client';

import React from 'react';
import Link from 'next/link';
import { ShoppingBag, ArrowRight, Package, Shield, Zap } from 'lucide-react';

export default function MarketplaceCTA() {
    return (
        <section className="py-24 bg-gradient-to-br from-primary/5 via-white to-primary/5 overflow-hidden relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* Left Content */}
                    <div>
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-6">
                            <ShoppingBag size={16} className="text-primary" />
                            <span className="text-xs font-black uppercase tracking-widest text-primary">
                                Hardware Marketplace
                            </span>
                        </div>
                        <h2 className="text-4xl md:text-5xl font-display font-bold mb-6 text-text-main leading-tight">
                            Get the hardware that powers your business
                        </h2>
                        <p className="text-lg text-text-secondary font-medium mb-8 leading-relaxed">
                            Browse our curated selection of enterprise-grade NFC readers, smart cards, and access control hardware.
                            All products are tested, certified, and ready to integrate with your ElizTap system.
                        </p>

                        {/* Features Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
                            <div className="flex flex-col items-start">
                                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-3">
                                    <Package className="text-primary" size={24} />
                                </div>
                                <h4 className="font-bold text-text-main mb-1">Premium Quality</h4>
                                <p className="text-sm text-text-secondary">Industrial-grade hardware built to last</p>
                            </div>
                            <div className="flex flex-col items-start">
                                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-3">
                                    <Shield className="text-primary" size={24} />
                                </div>
                                <h4 className="font-bold text-text-main mb-1">Certified</h4>
                                <p className="text-sm text-text-secondary">All products meet international standards</p>
                            </div>
                            <div className="flex flex-col items-start">
                                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-3">
                                    <Zap className="text-primary" size={24} />
                                </div>
                                <h4 className="font-bold text-text-main mb-1">Fast Delivery</h4>
                                <p className="text-sm text-text-secondary">Quick shipping across Nigeria</p>
                            </div>
                        </div>

                        {/* CTA Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4">
                            <Link
                                href="/marketplace"
                                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary text-white font-bold rounded-2xl hover:bg-primary-hover transition-all shadow-xl shadow-primary/20 group"
                            >
                                Browse Marketplace
                                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                            </Link>
                            <Link
                                href="/marketplace#bulk-orders"
                                className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-primary text-primary font-bold rounded-2xl hover:bg-primary hover:text-white transition-all"
                            >
                                Request Bulk Quote
                            </Link>
                        </div>
                    </div>

                    {/* Right Visual */}
                    <div className="relative">
                        <div className="grid grid-cols-2 gap-4">
                            {/* Product Cards */}
                            <div className="space-y-4">
                                <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-lg hover:shadow-xl transition-all">
                                    <div className="w-full aspect-square bg-gray-50 rounded-xl mb-4 flex items-center justify-center">
                                        <span className="material-icons-round text-primary text-5xl">nfc</span>
                                    </div>
                                    <h4 className="font-bold text-sm text-text-main mb-1">NFC Reader Pro</h4>
                                    <p className="text-xs text-text-secondary mb-3">Enterprise-grade</p>
                                    <div className="flex items-center justify-between">
                                        <span className="text-lg font-bold text-primary">₦45,000</span>
                                        <span className="text-xs text-green-600 font-bold">In Stock</span>
                                    </div>
                                </div>
                                <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-lg hover:shadow-xl transition-all">
                                    <div className="w-full aspect-square bg-gray-50 rounded-xl mb-4 flex items-center justify-center">
                                        <span className="material-icons-round text-primary text-5xl">credit_card</span>
                                    </div>
                                    <h4 className="font-bold text-sm text-text-main mb-1">Smart Cards</h4>
                                    <p className="text-xs text-text-secondary mb-3">Pack of 100</p>
                                    <div className="flex items-center justify-between">
                                        <span className="text-lg font-bold text-primary">₦25,000</span>
                                        <span className="text-xs text-green-600 font-bold">In Stock</span>
                                    </div>
                                </div>
                            </div>
                            <div className="space-y-4 pt-8">
                                <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-lg hover:shadow-xl transition-all">
                                    <div className="w-full aspect-square bg-gray-50 rounded-xl mb-4 flex items-center justify-center">
                                        <span className="material-icons-round text-primary text-5xl">qr_code_scanner</span>
                                    </div>
                                    <h4 className="font-bold text-sm text-text-main mb-1">Access Terminal</h4>
                                    <p className="text-xs text-text-secondary mb-3">Wall-mounted</p>
                                    <div className="flex items-center justify-between">
                                        <span className="text-lg font-bold text-primary">₦85,000</span>
                                        <span className="text-xs text-green-600 font-bold">In Stock</span>
                                    </div>
                                </div>
                                <div className="bg-primary/10 p-6 rounded-2xl border-2 border-dashed border-primary/30">
                                    <div className="text-center">
                                        <ShoppingBag className="mx-auto text-primary mb-3" size={32} />
                                        <p className="text-sm font-bold text-text-main mb-1">100+ Products</p>
                                        <p className="text-xs text-text-secondary">Available now</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Floating Badge */}
                        <div className="absolute -top-4 -right-4 bg-white px-4 py-3 rounded-full shadow-xl border border-gray-200">
                            <p className="text-xs font-black uppercase tracking-wider text-primary">Free Shipping</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Background Decoration */}
            <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-primary/5 to-transparent pointer-events-none" />
        </section>
    );
}
