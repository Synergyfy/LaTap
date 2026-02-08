'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import { useCartStore } from '@/store/cartStore';
import { fetchProducts } from '@/lib/api/marketplace';
import { CartItem } from '@/types/marketplace';
import {
    ShoppingCart, Trash2, ArrowRight, Heart, Gift, Tag,
    ChevronLeft, Plus, Minus, Check, X, CreditCard, MapPin, Truck, Grid
} from 'lucide-react';
import toast from 'react-hot-toast';

export default function CartPage() {
    const {
        items, summary, coupon, isGift,
        setItems, updateQuantity, removeItem, applyCoupon, toggleGift
    } = useCartStore();

    const [step, setStep] = useState(1);
    const [address, setAddress] = useState({
        fullName: '',
        email: '',
        phone: '',
        street: '',
        city: '',
        state: '',
        zip: ''
    });
    const [paymentMethod, setPaymentMethod] = useState('card');
    const [tempCoupon, setTempCoupon] = useState('');

    const { data: cartData, isLoading } = useQuery({
        queryKey: ['cart'],
        queryFn: async () => {
            // Mock fetch cart - in reality this would fetch from backend
            // For now we just return empty array or sync with local storage if needed
            return [];
        }
    });

    // ... (rest of usage of useCartStore and useQuery)

    // Sync remote cart with local store
    useEffect(() => {
        if (cartData && items.length === 0) {
            setItems(cartData);
        }
    }, [cartData, setItems, items.length]);

    const handleApplyCoupon = (e: React.FormEvent) => {
        // ... (existing logic)
        e.preventDefault();
        if (tempCoupon.trim() === '') return;

        // Mock validation
        if (tempCoupon === 'MAX500') {
            applyCoupon(tempCoupon);
            toast.success('Coupon applied successfully!');
        } else {
            toast.error('Invalid coupon code');
        }
    };

    const handleNextStep = () => {
        if (step === 1 && items.length === 0) {
            toast.error('Your cart is empty');
            return;
        }
        if (step === 2) {
            // Validate address
            if (!address.fullName || !address.email || !address.street || !address.city) {
                toast.error('Please fill in all required fields');
                return;
            }
        }
        if (step < 3) {
            setStep(step + 1);
            window.scrollTo(0, 0);
        } else {
            handleCheckout();
        }
    };

    const handleCheckout = () => {
        toast.promise(
            new Promise((resolve) => setTimeout(resolve, 2000)),
            {
                loading: 'Processing checkout...',
                success: 'Order placed successfully!',
                error: 'Checkout failed',
            }
        );
    };

    return (
        <div className="min-h-screen bg-white flex flex-col font-sans text-slate-900 pb-20">

            {/* Header */}
            <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-2 group">
                        <div className="w-10 h-10 bg-primary/10 rounded-sm flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
                            <Grid size={24} />
                        </div>
                        <span className="font-display font-bold text-xl tracking-tight text-slate-900">
                            ElizTap<span className="text-primary">.Market</span>
                        </span>
                    </Link>

                    <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-500">
                        <Link href="/marketplace" className="hover:text-primary transition-colors">Marketplace</Link>
                        <Link href="/contact" className="hover:text-primary transition-colors">Contact</Link>
                    </nav>

                    <div className="flex items-center gap-6">
                        <Link href="/marketplace/wishlist" className="p-2 text-slate-500 hover:text-primary transition-colors relative">
                            <Heart size={22} />
                        </Link>
                        <div className="relative">
                            <ShoppingCart size={22} className="text-primary" />
                            {items.length > 0 && (
                                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-sm font-bold border-2 border-white">
                                    {items.length}
                                </span>
                            )}
                        </div>
                        <div className="w-9 h-9 rounded-sm bg-slate-200 flex items-center justify-center text-slate-500 font-bold text-xs">
                            JP
                        </div>
                    </div>
                </div>
            </header>

            {/* Stepper */}
            <div className="max-w-3xl mx-auto w-full pt-12 pb-12 px-4">
                <div className="flex items-center justify-between relative">
                    <div className="absolute top-4 left-0 w-full h-0.5 bg-gray-200 -z-10"></div>

                    {['Cart', 'Address', 'Payment'].map((s, index) => {
                        const stepNum = index + 1;
                        const isActive = step >= stepNum;
                        const isCurrent = step === stepNum;
                        return (
                            <div key={s} className="flex flex-col items-center gap-2 bg-white px-4 cursor-pointer" onClick={() => step > stepNum && setStep(stepNum)}>
                                <div className={`size-8 rounded-sm flex items-center justify-center text-xs font-bold border transition-all ${isActive ? 'bg-primary border-primary text-white' : 'bg-white border-gray-200 text-gray-400'}`}>
                                    {step > stepNum ? <Check size={14} /> : stepNum}
                                </div>
                                <span className={`text-[10px] font-bold uppercase tracking-wider transition-colors ${isCurrent ? 'text-primary' : 'text-gray-400'}`}>{s}</span>
                            </div>
                        );
                    })}
                </div>
            </div>

            <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col lg:flex-row gap-12 lg:gap-24">

                    {/* Main Content Area */}
                    <div className="flex-1 space-y-6">
                        {step === 1 && (
                            <>
                                <div className="flex items-center justify-between">
                                    <h2 className="text-lg font-bold flex items-center gap-2 text-slate-900">
                                        <div className="w-5 h-5 bg-primary rounded-sm flex items-center justify-center">
                                            <Check size={12} className="text-white" />
                                        </div>
                                        {items.length}/{items.length} items selected
                                    </h2>
                                    <div className="text-xs font-bold text-gray-400 space-x-4">
                                        <Link href="/marketplace/wishlist" className="hover:text-primary transition-colors">Move to wishlist</Link>
                                        <button onClick={() => setItems([])} className="hover:text-red-500 transition-colors">Clear Cart</button>
                                    </div>
                                </div>

                                {isLoading && items.length === 0 ? (
                                    <div className="space-y-4">
                                        {[1, 2].map(i => <div key={i} className="h-32 bg-gray-200 rounded-sm animate-pulse" />)}
                                    </div>
                                ) : (
                                    <div className="bg-white rounded-sm border border-gray-100 shadow-sm overflow-hidden divide-y divide-gray-100">
                                        {items.length > 0 ? (
                                            items.map((item) => (
                                                <div key={item.id} className="p-6 flex gap-6 group hover:bg-gray-50/50 transition-colors relative">
                                                    <div className="w-32 h-24 bg-gray-100 rounded-sm flex items-center justify-center overflow-hidden shrink-0">
                                                        <img src={item.image} alt={item.name} className="max-w-full max-h-full object-contain p-2" />
                                                    </div>

                                                    <div className="flex-1">
                                                        <div className="flex justify-between items-start mb-2">
                                                            <h3 className="font-bold text-gray-900 line-clamp-1 text-lg">{item.name}</h3>
                                                            <button onClick={() => removeItem(item.id)} className="text-gray-400 hover:text-red-500 absolute top-6 right-6 p-1 transition-colors">
                                                                <X size={20} />
                                                            </button>
                                                        </div>

                                                        <div className="flex items-center gap-4 text-xs text-gray-500 font-medium mb-6">
                                                            <span className="flex items-center gap-1 bg-gray-100 px-2 py-1 rounded"><Tag size={12} /> {item.brand}</span>
                                                            {item.variant && <span className="flex items-center gap-1">• {item.variant}</span>}
                                                            <span className="flex items-center gap-1 text-green-600"><Truck size={12} /> {item.shippingInfo}</span>
                                                        </div>

                                                        <div className="flex items-center justify-between mt-auto">
                                                            <div className="font-bold text-xl">₦{item.price.toLocaleString()}</div>

                                                            <div className="flex items-center bg-white border border-gray-200 rounded-sm h-9 overflow-hidden">
                                                                <button onClick={() => updateQuantity(item.id, -1)} className="w-9 h-full flex items-center justify-center hover:bg-gray-50 border-r border-gray-200 text-gray-500 transition-colors">
                                                                    <Minus size={14} />
                                                                </button>
                                                                <span className="w-10 text-center text-sm font-bold flex items-center justify-center">{item.quantity}</span>
                                                                <button onClick={() => updateQuantity(item.id, 1)} className="w-9 h-full flex items-center justify-center hover:bg-gray-50 border-l border-gray-200 text-gray-500 transition-colors">
                                                                    <Plus size={14} />
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))
                                        ) : (
                                            <div className="text-center py-20 px-4">
                                                <ShoppingCart size={48} className="mx-auto text-gray-300 mb-4" />
                                                <h3 className="text-lg font-bold text-gray-900">Your cart is empty</h3>
                                                <p className="text-gray-500 mb-6">Looks like you haven't added anything yet.</p>
                                                <Link href="/marketplace" className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-sm font-bold hover:opacity-90 transition-opacity shadow-lg shadow-primary/20">
                                                    Start Shopping <ArrowRight size={18} />
                                                </Link>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </>
                        )}

                        {step === 2 && (
                            <div className="bg-white rounded-sm border border-gray-100 shadow-sm p-8 space-y-6">
                                <h3 className="font-bold text-xl text-gray-900">Shipping Address</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-gray-500 uppercase">Full Name</label>
                                        <input
                                            type="text"
                                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-sm outline-none focus:ring-2 focus:ring-black/5 transaction-all font-medium"
                                            placeholder="John Doe"
                                            value={address.fullName}
                                            onChange={(e) => setAddress({ ...address, fullName: e.target.value })}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-gray-500 uppercase">Email Address</label>
                                        <input
                                            type="email"
                                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-sm outline-none focus:ring-2 focus:ring-black/5 transaction-all font-medium"
                                            placeholder="john@example.com"
                                            value={address.email}
                                            onChange={(e) => setAddress({ ...address, email: e.target.value })}
                                        />
                                    </div>
                                    <div className="space-y-2 md:col-span-2">
                                        <label className="text-xs font-bold text-gray-500 uppercase">Street Address</label>
                                        <input
                                            type="text"
                                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-sm outline-none focus:ring-2 focus:ring-black/5 transaction-all font-medium"
                                            placeholder="123 Main St"
                                            value={address.street}
                                            onChange={(e) => setAddress({ ...address, street: e.target.value })}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-gray-500 uppercase">City</label>
                                        <input
                                            type="text"
                                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-sm outline-none focus:ring-2 focus:ring-black/5 transaction-all font-medium"
                                            placeholder="Lagos"
                                            value={address.city}
                                            onChange={(e) => setAddress({ ...address, city: e.target.value })}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-gray-500 uppercase">Phone Number</label>
                                        <input
                                            type="tel"
                                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-sm outline-none focus:ring-2 focus:ring-black/5 transaction-all font-medium"
                                            placeholder="+234..."
                                            value={address.phone}
                                            onChange={(e) => setAddress({ ...address, phone: e.target.value })}
                                        />
                                    </div>
                                </div>
                            </div>
                        )}

                        {step === 3 && (
                            <div className="space-y-6">
                                <div className="bg-white rounded-sm border border-gray-100 shadow-sm p-8 space-y-6">
                                    <h3 className="font-bold text-xl text-gray-900">Payment Method</h3>
                                    <div className="space-y-3">
                                        {['card', 'transfer', 'crypto'].map((method) => (
                                            <label key={method} className={`flex items-center gap-4 p-4 rounded-sm border-2 cursor-pointer transition-all ${paymentMethod === method ? 'border-primary bg-primary/5' : 'border-gray-100 hover:border-gray-200'}`}>
                                                <input
                                                    type="radio"
                                                    name="payment"
                                                    className="hidden"
                                                    checked={paymentMethod === method}
                                                    onChange={() => setPaymentMethod(method)}
                                                />
                                                <div className={`w-5 h-5 rounded-sm border-2 flex items-center justify-center ${paymentMethod === method ? 'border-primary' : 'border-gray-300'}`}>
                                                    {paymentMethod === method && <div className="w-2.5 h-2.5 bg-primary rounded-sm" />}
                                                </div>
                                                <div className="flex-1 flex items-center justify-between">
                                                    <span className="font-bold text-gray-900 capitalize">
                                                        {method === 'card' && 'Credit / Debit Card'}
                                                        {method === 'transfer' && 'Bank Transfer'}
                                                        {method === 'crypto' && 'Crypto Payment'}
                                                    </span>
                                                    {method === 'card' && <CreditCard size={20} className="text-gray-400" />}
                                                    {method === 'transfer' && <div className="bg-green-100 text-green-700 text-[10px] font-bold px-2 py-0.5 rounded">INSTANT</div>}
                                                </div>
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                <div className="bg-blue-50 border border-blue-100 rounded-sm p-6 flex items-start gap-4">
                                    <div className="bg-white p-2 rounded-sm shadow-sm text-blue-600">
                                        <CreditCard size={24} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-gray-900 mb-1">Secure Payment</h4>
                                        <p className="text-sm text-gray-600 leading-relaxed">
                                            Your payment information is processed securely. We do not store your card details on our servers.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Order Summary Sidebar */}
                    <div className="w-full lg:w-[400px] space-y-8 shrink-0">

                        {/* Summary Card */}
                        <div className="bg-white rounded-sm p-8 space-y-4 border border-gray-100 shadow-sm sticky top-32">
                            <h3 className="font-bold text-lg mb-4 text-gray-900">Order Summary</h3>

                            {/* Items Preview (collapsed) */}
                            {items.length > 0 && (
                                <div className="flex -space-x-3 overflow-hidden py-2 mb-4">
                                    {items.slice(0, 4).map((item) => (
                                        <div key={item.id} className="w-10 h-10 rounded-sm border-2 border-white bg-gray-100 flex items-center justify-center overflow-hidden">
                                            <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                        </div>
                                    ))}
                                    {items.length > 4 && (
                                        <div className="w-10 h-10 rounded-sm border-2 border-white bg-gray-900 text-white text-xs font-bold flex items-center justify-center">
                                            +{items.length - 4}
                                        </div>
                                    )}
                                </div>
                            )}

                            <div className="space-y-3 pt-2">
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-500 font-medium">Subtotal ({items.length} items)</span>
                                    <span className="font-bold text-gray-900">₦{summary.subtotal.toLocaleString()}</span>
                                </div>
                                {summary.discount > 0 && (
                                    <div className="flex justify-between text-sm text-green-600">
                                        <span className="font-medium">Coupon Discount</span>
                                        <span className="font-bold">- ₦{summary.discount.toLocaleString()}</span>
                                    </div>
                                )}
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-500 font-medium">Delivery Charges</span>
                                    <span className="font-bold text-green-600">{summary.shipping === 0 ? 'Free' : `₦${summary.shipping.toLocaleString()}`}</span>
                                </div>
                                {isGift && (
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-500 font-medium">Gift Wrap</span>
                                        <span className="font-bold text-gray-900">₦1,500</span>
                                    </div>
                                )}
                            </div>

                            <div className="border-t-2 border-dashed border-gray-200 pt-6 mt-6">
                                <div className="flex justify-between items-end">
                                    <span className="font-bold text-lg text-gray-900">Total Amount</span>
                                    <span className="font-bold text-2xl text-gray-900">₦{summary.total.toLocaleString()}</span>
                                </div>
                            </div>

                            {step === 1 && (
                                <>
                                    <div className="pt-6">
                                        {/* Coupons logic */}
                                        <h3 className="font-bold text-sm mb-3 text-gray-900">Coupons</h3>
                                        <div className="bg-gray-50 p-1.5 rounded-sm border border-gray-200 flex shadow-sm mb-4">
                                            <input
                                                type="text"
                                                placeholder="Enter coupon code"
                                                className="w-full px-4 py-2 bg-transparent text-sm font-medium outline-none text-gray-900 placeholder:text-gray-400 uppercase tracking-wider"
                                                value={tempCoupon}
                                                onChange={(e) => setTempCoupon(e.target.value)}
                                            />
                                            <button onClick={handleApplyCoupon} type="button" className="px-5 py-2 bg-white border border-gray-200 hover:bg-gray-50 text-primary rounded-sm font-bold text-xs transition-colors uppercase tracking-wide shadow-sm">
                                                Apply
                                            </button>
                                        </div>
                                    </div>

                                    {/* Gifting logic */}
                                    <div
                                        className={`p-4 rounded-sm border transition-all cursor-pointer flex items-center gap-4 group mb-4 ${isGift ? 'bg-indigo-50 border-indigo-200' : 'bg-gray-50 border-gray-200 hover:border-gray-300'}`}
                                        onClick={toggleGift}
                                    >
                                        <Gift size={20} className={isGift ? 'text-indigo-600' : 'text-gray-400'} />
                                        <div className="flex-1">
                                            <span className="text-sm font-bold text-gray-900 block">Gift Wrap?</span>
                                            <span className="text-xs text-gray-500">Add a special touch (+₦1,500)</span>
                                        </div>
                                        <div className={`w-5 h-5 rounded-sm border-2 flex items-center justify-center transition-all ${isGift ? 'bg-indigo-600 border-indigo-600' : 'bg-white border-gray-300'}`}>
                                            {isGift && <Check size={12} className="text-white" />}
                                        </div>
                                    </div>
                                </>
                            )}

                            <button
                                onClick={handleNextStep}
                                disabled={items.length === 0}
                                className="w-full bg-primary text-white h-14 rounded-sm font-bold flex items-center justify-center gap-2 hover:bg-primary/90 transition-all shadow-xl shadow-primary/20 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed mt-6"
                            >
                                {step === 3 ? 'Place Order' : 'Continue'} <ArrowRight size={18} />
                            </button>

                            <p className="text-xs text-center text-gray-400 font-medium mt-4">
                                Secure Checkout tailored for you.
                            </p>
                        </div>
                    </div>
                </div>
            </main>

        </div>
    );
}
