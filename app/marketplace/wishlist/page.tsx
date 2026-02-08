'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
    Heart, ShoppingCart, ShoppingBag, Trash2, ArrowLeft, Grid, ChevronRight, Home
} from 'lucide-react';
import { useWishlistStore } from '@/store/wishlistStore';
import { useCartStore } from '@/store/cartStore';
import toast from 'react-hot-toast';

export default function WishlistPage() {
    const router = useRouter();
    const { items, removeItem, clearWishlist } = useWishlistStore();
    const { addItem } = useCartStore();

    const handleAddToCart = (item: any) => {
        addItem({
            id: Math.random().toString(36).substr(2, 9),
            productId: item.productId,
            name: item.name,
            brand: item.brand,
            price: item.price,
            image: item.image,
            inStock: true,
            shippingInfo: 'Standard Delivery'
        });
        toast.success(`Added ${item.name} to cart`);
    };

    return (
        <div className="min-h-screen bg-white pb-20">
            {/* Header */}
            <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
                <div className="max-w-[1400px] mx-auto px-4 md:px-8 h-20 flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-2 group">
                        <div className="w-10 h-10 bg-primary/10 rounded-none flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
                            <Grid size={24} />
                        </div>
                        <span className="font-display font-bold text-xl tracking-tight text-slate-900">
                            ElizTap<span className="text-primary">.Market</span>
                        </span>
                    </Link>

                    <div className="flex items-center gap-6">
                        <Link href="/marketplace/cart" className="p-2 text-slate-500 hover:text-primary transition-colors relative">
                            <ShoppingCart size={22} />
                        </Link>
                        <div className="w-9 h-9 rounded-none bg-slate-200 flex items-center justify-center text-slate-500 font-bold text-xs">
                            JP
                        </div>
                    </div>
                </div>
            </header>

            <main className="max-w-[1400px] mx-auto px-4 md:px-8 py-12">
                {/* Breadcrumb */}
                <nav className="flex mb-8 text-sm font-medium text-slate-500">
                    <Link href="/" className="hover:text-primary flex items-center gap-1"><Home size={14} /> Home</Link>
                    <ChevronRight size={14} className="mx-2 self-center" />
                    <Link href="/marketplace" className="hover:text-primary">Marketplace</Link>
                    <ChevronRight size={14} className="mx-2 self-center" />
                    <span className="text-slate-900 font-bold">Wishlist</span>
                </nav>

                <div className="flex items-center justify-between mb-10">
                    <div>
                        <h1 className="text-4xl font-display font-bold text-slate-900 mb-2">My Wishlist</h1>
                        <p className="text-slate-500 font-medium">You have {items.length} items saved in your wishlist</p>
                    </div>
                    {items.length > 0 && (
                        <button
                            onClick={() => {
                                if (confirm('Clear all items from wishlist?')) clearWishlist();
                            }}
                            className="text-sm font-bold text-red-500 hover:text-red-600 flex items-center gap-2"
                        >
                            <Trash2 size={18} /> Clear Wishlist
                        </button>
                    )}
                </div>

                {items.length === 0 ? (
                    <div className="py-32 text-center bg-slate-50 rounded-sm border border-dashed border-slate-200">
                        <div className="w-20 h-20 bg-white rounded-sm shadow-sm flex items-center justify-center mx-auto mb-6 text-slate-300">
                            <Heart size={40} />
                        </div>
                        <h2 className="text-2xl font-bold text-slate-900 mb-4">Your wishlist is empty</h2>
                        <p className="text-slate-500 mb-10 max-w-sm mx-auto">Save items you're interested in to keep track of them and get notified about price drops.</p>
                        <Link
                            href="/marketplace"
                            className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-white font-bold rounded-sm hover:bg-primary/90 transition-all shadow-lg shadow-primary/20"
                        >
                            <ShoppingBag size={20} /> Browse Marketplace
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        {items.map((item) => (
                            <div key={item.id} className="group bg-white rounded-none border border-slate-200 hover:border-primary/20 hover:shadow-xl transition-all flex flex-col overflow-hidden relative">
                                <button
                                    onClick={() => removeItem(item.id)}
                                    className="absolute top-4 right-4 p-2 bg-white/80 backdrop-blur-sm text-red-500 rounded-none shadow-sm hover:bg-red-50 transition-all z-10"
                                >
                                    <Trash2 size={16} />
                                </button>

                                <Link href={`/marketplace/product/${item.productId}`} className="aspect-square p-8 bg-slate-50 flex items-center justify-center">
                                    <img src={item.image} alt={item.name} className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform duration-500" />
                                </Link>

                                <div className="p-6 flex-1 flex flex-col">
                                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">{item.brand}</span>
                                    <Link href={`/marketplace/product/${item.productId}`} className="font-display font-bold text-lg text-slate-900 mb-4 group-hover:text-primary transition-colors line-clamp-1">
                                        {item.name}
                                    </Link>

                                    <div className="mt-auto flex items-center justify-between gap-4">
                                        <span className="text-xl font-bold text-slate-900">₦{item.price.toLocaleString()}</span>
                                        <button
                                            onClick={() => handleAddToCart(item)}
                                            className="p-3 bg-primary text-white rounded-none hover:bg-primary/90 transition-all flex items-center justify-center"
                                            title="Add to Cart"
                                        >
                                            <ShoppingCart size={18} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </main>

            {/* Footer */}
            <footer className="bg-white border-t border-slate-200 py-12 mt-20">
                <div className="max-w-[1400px] mx-auto px-4 md:px-8">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
                        <div className="col-span-2">
                            <div className="flex items-center gap-2 mb-6">
                                <div className="bg-primary p-2 rounded-none text-white">
                                    <Grid size={24} />
                                </div>
                                <span className="text-xl font-bold tracking-tight text-slate-900">ElizTap</span>
                            </div>
                            <p className="text-slate-500 text-sm max-w-xs">
                                The leading marketplace for secure access hardware, NFC readers, and enterprise connectivity solutions.
                            </p>
                        </div>
                        <div>
                            <h4 className="font-bold text-sm mb-6 uppercase tracking-wider text-slate-900">Shop</h4>
                            <ul className="space-y-4 text-sm text-slate-600">
                                <li><Link href="/marketplace" className="hover:text-primary transition-colors">All Products</Link></li>
                                <li><Link href="/marketplace?cat=NFC Readers" className="hover:text-primary transition-colors">NFC Readers</Link></li>
                                <li><Link href="/marketplace?cat=Smart Cards" className="hover:text-primary transition-colors">Smart Cards</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-bold text-sm mb-6 uppercase tracking-wider text-slate-900">Support</h4>
                            <ul className="space-y-4 text-sm text-slate-600">
                                <li><Link href="/contact" className="hover:text-primary transition-colors">Contact Us</Link></li>
                                <li><Link href="/faq" className="hover:text-primary transition-colors">Knowledge Base</Link></li>
                                <li><Link href="/contact" className="hover:text-primary transition-colors">Bulk Orders</Link></li>
                            </ul>
                        </div>
                    </div>
                    <div className="pt-8 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500">
                        <p>© {new Date().getFullYear()} ElizTap. All rights reserved.</p>
                        <div className="flex gap-6">
                            <Link href="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link>
                            <Link href="/terms" className="hover:text-primary transition-colors">Terms of Service</Link>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}
