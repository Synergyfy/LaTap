'use client';

import React, { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { ShoppingCart, Check, Info, Truck, CreditCard, Paintbrush, ArrowRight } from 'lucide-react';
import { notify } from '@/lib/notify';
import Nfc1 from "@/assets/nfc/Card NFC Plate White Spec branded.avif"
import Nfc2 from "@/assets/nfc/Chip_tag_NFC215.avif"
import Nfc3 from "@/assets/nfc/Reading_position.avif"

export default function NfcMarketplacePage() {
    const products = [
        {
            id: 'card-1',
            name: 'Elite NFC Identity Card',
            price: 3500,
            image: Nfc1.src,
            desc: 'Durable premium PVC with full-color CMYK printing. Perfect for staff and VIP members.',
            features: ['NXP NTAG213 Chip', 'Waterproof PVC', 'Both Sides Printing', 'Hole Punching Option'],
            colors: ['Matte Black', 'Royal White', 'Clear Frost']
        },
        {
            id: 'sticker-1',
            name: 'Smart Business Sticker',
            price: 1500,
            image: Nfc2.src,
            desc: 'Peel and stick on any non-metal surface. Ideal for menus, mirrors, and checkout counters.',
            features: ['3M Industrial Adhesive', 'UV Protected PET', 'Small 30mm Profile', 'Fast Tap Handshake'],
            colors: ['Circular White', 'Transparent']
        },
        {
            id: 'metal-1',
            name: 'Signature Metal Plate',
            price: 12000,
            image: Nfc3.src,
            desc: 'Precision laser-engraved stainless steel for the ultimate luxury feel and durability.',
            features: ['304 Stainless Steel', 'Anti-Metal Shielding', 'Deep Laser Etching', 'Lifetime Warranty'],
            colors: ['Brushed Silver', 'Gold Plated', 'Space Grey']
        }
    ];

    const [cart, setCart] = useState<any[]>([]);

    const addToCart = (product: any) => {
        setCart([...cart, product]);
        notify.success(`${product.name} added to cart!`);
    };

    return (
        <div className="min-h-screen bg-white">
            <Navbar />

            <main className="relative">
                {/* Background Decoration */}
                <div className="absolute top-0 left-0 w-full h-[800px] pointer-events-none overflow-hidden -z-10">
                    <div className="absolute top-20 right-[5%] w-[400px] h-[400px] bg-primary/5 rounded-full blur-[100px]"></div>
                    <div className="absolute inset-0 opacity-[0.03]" style={{
                        backgroundImage: `linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)`,
                        backgroundSize: '40px 40px'
                    }}></div>
                </div>

                <div className="pt-32 pb-24">
                    {/* Marketplace Header */}
                    <section className="px-4 py-20 mb-16">
                        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-end gap-8">
                            <div className="space-y-6">
                                <span className="text-primary font-black uppercase tracking-[0.25em] text-[10px] px-4 py-1.5 bg-primary/5 rounded-full border border-primary/10">Merchant Store</span>
                                <h1 className="text-5xl md:text-7xl font-display font-bold text-text-main tracking-tight leading-tight">Design Your <span className="text-gradient">Physical</span> Entry.</h1>
                                <p className="text-xl text-text-secondary font-medium max-w-xl leading-relaxed">Get premium, custom-branded NFC hardware pre-configured to sync with your EntryConnect dashboard.</p>
                            </div>
                            <div className="flex items-center gap-4 bg-gray-50 border border-gray-100 p-2 rounded-2xl">
                                <div className="px-6 py-3 bg-white shadow-sm border border-gray-200 rounded-xl text-xs font-bold flex items-center gap-2">
                                    <ShoppingCart size={14} className="text-primary" />
                                    {cart.length} Items In Cart
                                </div>
                                <button className="px-6 py-3 bg-primary text-white text-xs font-black uppercase tracking-widest rounded-xl hover:bg-primary-hover shadow-lg shadow-primary/20 transition-all active:scale-95">
                                    Checkout
                                </button>
                            </div>
                        </div>
                    </section>

                    {/* Product Grid */}
                    <section className="px-4 mb-32">
                        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                            {products.map((product) => (
                                <div key={product.id} className="bg-white rounded-[2rem] border border-gray-200 overflow-hidden hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 flex flex-col group">
                                    <div className="aspect-[4/3] bg-gray-100 relative overflow-hidden">
                                        <img
                                            src={product.image}
                                            alt={product.name}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                        />
                                        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-4 py-2 rounded-full font-bold text-lg text-text-main shadow-sm">
                                            ₦{product.price.toLocaleString()}
                                        </div>
                                    </div>
                                    <div className="p-8 flex-1 flex flex-col space-y-6">
                                        <div>
                                            <h3 className="text-2xl font-display font-bold text-text-main mb-2 tracking-tight group-hover:text-primary transition-colors">{product.name}</h3>
                                            <p className="text-sm text-text-secondary leading-relaxed font-medium">{product.desc}</p>
                                        </div>

                                        <div className="space-y-3">
                                            <p className="text-[10px] font-black uppercase tracking-widest text-text-secondary">Key Specifications</p>
                                            <div className="flex flex-wrap gap-2">
                                                {product.features.map((f, i) => (
                                                    <span key={i} className="px-3 py-1 bg-gray-50 border border-gray-100 text-text-secondary text-[10px] font-bold rounded-lg flex items-center gap-1.5">
                                                        <Check size={10} className="text-primary" />
                                                        {f}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="pt-6 mt-auto flex items-center gap-3">
                                            <button
                                                onClick={() => addToCart(product)}
                                                className="flex-1 py-4 bg-primary text-white font-black uppercase tracking-[0.15em] text-[11px] rounded-xl hover:bg-primary-hover transition-all shadow-xl shadow-primary/20 flex items-center justify-center gap-2 active:scale-95"
                                            >
                                                <ShoppingCart size={16} />
                                                Add To Order
                                            </button>
                                            <button className="size-12 bg-gray-100 text-gray-400 rounded-xl hover:bg-gray-200 hover:text-text-main transition-all flex items-center justify-center">
                                                <Info size={20} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Ordering Process */}
                    <section className="bg-gray-50 py-24 px-4 overflow-hidden relative">
                        <div className="max-w-7xl mx-auto">
                            <div className="text-center max-w-2xl mx-auto mb-20 space-y-4">
                                <h2 className="text-3xl md:text-5xl font-display font-bold text-text-main">The Ordering Process</h2>
                                <p className="text-lg text-text-secondary font-medium leading-relaxed">We've simplified the bridge between the physical and digital for your business.</p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
                                {/* Connector line (desktop) */}
                                <div className="hidden md:block absolute top-[60px] left-[10%] right-[10%] h-[2px] bg-linear-to-r from-primary/0 via-primary/20 to-primary/0"></div>

                                {[
                                    { icon: ShoppingCart, title: 'Select Product', desc: 'Choose the hardware that matches your venue aesthetic.' },
                                    { icon: Paintbrush, title: 'Custom Design', desc: 'Upload your brand assets or work with our designers.' },
                                    { icon: CreditCard, title: 'Secure Payment', desc: 'Complete your order via bank transfer or card.' },
                                    { icon: Truck, title: 'Fast Delivery', desc: 'Get your pre-configured hardware in 3-5 business days.' }
                                ].map((step, i) => (
                                    <div key={i} className="text-center space-y-6 relative z-10">
                                        <div className="size-20 bg-white border border-gray-100 rounded-[2rem] shadow-xl flex items-center justify-center text-primary mx-auto group-hover:scale-110 transition-transform">
                                            <step.icon size={32} />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-lg text-text-main mb-2">{step.title}</h4>
                                            <p className="text-sm text-text-secondary leading-relaxed font-medium">{step.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-24 bg-white border border-gray-100 rounded-[2.5rem] p-12 shadow-2xl shadow-gray-200/50 flex flex-col lg:flex-row items-center justify-between gap-10">
                                <div className="space-y-4 max-w-lg">
                                    <h3 className="text-3xl font-display font-bold">Ready to white-label?</h3>
                                    <p className="text-text-secondary font-medium leading-relaxed">Launch your own identity cards for your clients with our reseller hardware kits. Contact us for wholesale pricing.</p>
                                </div>
                                <button className="px-10 py-5 bg-text-main text-white font-black uppercase tracking-widest text-[12px] rounded-2xl hover:bg-black transition-all shadow-2xl flex items-center gap-3">
                                    Become a Reseller Partner
                                    <ArrowRight size={18} />
                                </button>
                            </div>
                        </div>
                    </section>
                </div>
            </main>

            <Footer />
        </div>
    );
}
