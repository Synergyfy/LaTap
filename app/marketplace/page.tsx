'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { useQuery } from '@tanstack/react-query';
import {
    Search, Grid, Star, Download, CheckCircle2, SlidersHorizontal, ArrowRight,
    Menu, LayoutGrid, ChevronLeft, ChevronRight, X
} from 'lucide-react';
import { useMarketplaceStore } from '@/store/marketplaceStore';
import { fetchProducts } from '@/lib/api/marketplace';
import { ProductCardSkeleton } from '@/components/marketplace/Skeletons';
import { useAuthStore } from '@/store/useAuthStore';

export default function MarketplacePage() {
    const router = useRouter();

    // Zustand Store
    const {
        selectedCategory, priceRange, selectedBrands, currentPage, searchQuery,
        setPage, resetFilters
    } = useMarketplaceStore();
    const { user } = useAuthStore();
    const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
    const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
    const [selectedQuoteProduct, setSelectedQuoteProduct] = useState<any>(null);
    const [quoteFormData, setQuoteFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        quantity: '',
        location: '',
        businessName: '',
        notes: ''
    });
    const [showOTPStep, setShowOTPStep] = useState(false);
    const [otp, setOtp] = useState('');
    const [isCreatingAccount, setIsCreatingAccount] = useState(false);

    // React Query
    const { data, isLoading, isError } = useQuery({
        queryKey: ['products', currentPage, selectedCategory, priceRange, selectedBrands, searchQuery],
        queryFn: () => fetchProducts(currentPage, 9, selectedCategory, priceRange, selectedBrands, searchQuery),
        placeholderData: (previousData: any) => previousData
    });

    const products = data?.products || [];
    const totalPages = data?.totalPages || 1;

    const handleAction = (e: React.MouseEvent, product: any) => {
        e.stopPropagation(); // Prevent card click navigation
        if (product.action === 'quote' || product.action === 'cart') {
            setSelectedQuoteProduct(product);
            setIsQuoteModalOpen(true);
            // Pre-fill user data if logged in
            if (user) {
                setQuoteFormData(prev => ({
                    ...prev,
                    firstName: user.name?.split(' ')[0] || '',
                    lastName: user.name?.split(' ').slice(1).join(' ') || '',
                    email: user.email || '',
                    businessName: user.businessName || ''
                }));
            }
        } else if (product.action === 'download') {
            toast.promise(
                new Promise((resolve) => setTimeout(resolve, 2000)),
                {
                    loading: 'Preparing download...',
                    success: 'Download started!',
                    error: 'Download failed',
                }
            );
        }
    };

    const handleQuoteSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // If user is not logged in, create account and send OTP
        if (!user) {
            setIsCreatingAccount(true);
            // Simulate account creation and OTP sending
            await new Promise(resolve => setTimeout(resolve, 1000));
            toast.success('Account created! OTP sent to your email.');
            setShowOTPStep(true);
            setIsCreatingAccount(false);
        } else {
            // Submit quote directly
            setIsQuoteModalOpen(false);
            setIsSuccessModalOpen(true);
            setQuoteFormData({
                firstName: '',
                lastName: '',
                email: '',
                phone: '',
                quantity: '',
                location: '',
                businessName: '',
                notes: ''
            });
        }
    };

    const handleOTPVerify = async (e: React.FormEvent) => {
        e.preventDefault();
        if (otp.length === 6) {
            toast.success('Account verified successfully!');
            setIsQuoteModalOpen(false);
            setIsSuccessModalOpen(true);
            setShowOTPStep(false);
            setOtp('');
            setQuoteFormData({
                firstName: '',
                lastName: '',
                email: '',
                phone: '',
                quantity: '',
                location: '',
                businessName: '',
                notes: ''
            });
        } else {
            toast.error('Please enter a valid 6-digit OTP');
        }
    };

    const handleCardClick = (id: string) => {
        router.push(`/marketplace/product/${id}`);
    };

    return (
        <div className="min-h-screen bg-white flex flex-col font-sans text-text-main relative">
            {/* Header */}
            <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
                <div className="max-w-[1600px] mx-auto px-4 md:px-8 h-20 flex items-center justify-between gap-8">
                    {/* Logo Area */}
                    <div className="flex items-center gap-12">
                        <Link href="/" className="flex items-center gap-2 group">
                            <div className="w-12 h-12 flex items-center justify-center transition-all duration-300">
                                <span className="material-icons-round text-primary text-4xl select-none">nfc</span>
                            </div>
                            <span className="font-display font-bold text-xl tracking-tight text-text-main">
                                ElizTap<span className="text-primary">.Market</span>
                            </span>
                        </Link>

                        {/* Desktop Nav */}
                        <nav className="hidden lg:flex items-center gap-8">
                            <div className="relative group">
                                <button className="flex items-center gap-1 text-sm font-bold text-gray-500 hover:text-primary transition-colors py-2">
                                    Solutions
                                    <span className="material-icons-round text-lg transition-transform group-hover:rotate-180">expand_more</span>
                                </button>
                                <div className="absolute top-full left-0 mt-2 w-56 bg-white rounded-none shadow-2xl border border-gray-100 p-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                                    <Link href="/solutions/hardware" className="flex items-center gap-3 p-3 hover:bg-gray-50 transition-colors">
                                        <div className="size-10 bg-blue-50 text-blue-600 rounded-none flex items-center justify-center">
                                            <span className="material-icons-round">nfc</span>
                                        </div>
                                        <div>
                                            <p className="text-text-main text-[10px] font-black uppercase tracking-wider">Hardware</p>
                                            <p className="text-[10px] text-text-secondary font-medium whitespace-nowrap">NFC Plates & Cards</p>
                                        </div>
                                    </Link>
                                    <Link href="/solutions/software" className="flex items-center gap-3 p-3 hover:bg-gray-50 transition-colors">
                                        <div className="size-10 bg-primary/10 text-primary rounded-none flex items-center justify-center">
                                            <span className="material-icons-round">terminal</span>
                                        </div>
                                        <div>
                                            <p className="text-text-main text-[10px] font-black uppercase tracking-wider">Software</p>
                                            <p className="text-[10px] text-text-secondary font-medium whitespace-nowrap">Management Dashboard</p>
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        </nav>
                    </div>


                    <div className="flex items-center gap-3 sm:gap-6">
                        <div className="h-8 w-px bg-gray-200 hidden sm:block"></div>

                        <button className="hidden sm:flex items-center gap-3 hover:bg-gray-50 p-1.5 pr-3 rounded-none border border-transparent hover:border-gray-200 transition-all">
                            <div className="w-9 h-9 rounded-none bg-linear-to-br from-gray-100 to-gray-200 border border-gray-200 overflow-hidden flex items-center justify-center">
                                <span className="font-bold text-gray-500">JP</span>
                            </div>
                            <span className="text-sm font-bold text-gray-700">Account</span>
                        </button>
                    </div>
                </div>
            </header>




            <main className="max-w-[1600px] mx-auto px-4 md:px-8 py-8 md:py-12 flex-1 w-full">


                {/* Product Grid Area */}
                <div className="flex-1 flex flex-col min-h-[600px]">

                    <div className="mb-12">
                        <h2 className="font-display font-bold text-4xl text-text-main mb-2">Our Marketplace</h2>
                        <p className="text-text-secondary text-lg">Explore our industrial-grade NFC hardware and identification solutions.</p>
                    </div>

                    {/* Loading State Skeleton */}
                    {isLoading && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-12">
                            {[...Array(8)].map((_, i) => (
                                <ProductCardSkeleton key={i} />
                            ))}
                        </div>
                    )}

                    {/* Error State */}
                    {isError && (
                        <div className="flex-1 flex flex-col items-center justify-center p-20 text-center">
                            <div className="w-16 h-16 bg-red-50 text-red-500 rounded-none flex items-center justify-center mb-4">
                                <X size={32} />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">Failed to load products</h3>
                            <p className="text-gray-500 mb-6">Something went wrong while fetching the marketplace data.</p>
                            <button onClick={() => window.location.reload()} className="px-6 py-2 bg-primary text-white rounded-none font-bold hover:bg-primary-hover transition-colors">
                                Try Again
                            </button>
                        </div>
                    )}

                    {/* Products Grid */}
                    {!isLoading && !isError && products.length > 0 && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-12">
                            {products.map((product) => (
                                <div
                                    key={product.id}
                                    onClick={() => handleCardClick(product.id)}
                                    className="group bg-white rounded-none border border-gray-200 hover:border-primary/30 hover:shadow-2xl hover:shadow-primary/5 transition-all duration-300 flex flex-col overflow-hidden relative cursor-pointer"
                                >

                                    {/* Image Area */}
                                    <div className="relative aspect-square p-8 bg-white group-hover:bg-gray-50 transition-colors duration-500 flex items-center justify-center border-b border-gray-100">
                                        <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
                                            <span className={`self-start px-3 py-1 rounded-none text-[10px] font-bold uppercase tracking-wider text-white shadow-sm ${product.tagColor}`}>
                                                {product.tag}
                                            </span>
                                        </div>


                                        <img
                                            src={product.image}
                                            alt={product.name}
                                            className="w-full h-full object-contain filter group-hover:brightness-105 transition-all duration-500 transform group-hover:scale-105"
                                        />
                                    </div>

                                    {/* Content */}
                                    <div className="p-6 flex-1 flex flex-col">
                                        <div className="mb-4 flex items-center justify-between">
                                            <div className="flex items-center gap-1.5 bg-primary/10 px-2 py-1 rounded-none">
                                                <Star size={12} className="text-primary fill-primary" />
                                                <span className="text-xs font-bold text-primary">{product.rating}</span>
                                            </div>
                                            <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">SKU: {product.id.toUpperCase().split('-')[0]}</span>
                                        </div>

                                        <h3 className="font-display font-bold text-xl text-text-main leading-snug mb-3 group-hover:text-primary transition-colors line-clamp-2">
                                            {product.name}
                                        </h3>
                                        <p className="text-sm text-text-secondary line-clamp-2 mb-8 leading-relaxed font-medium">{product.desc}</p>

                                        <div className="mt-auto space-y-3">
                                            {/* Price per unit and MOQ */}
                                            <div className="flex items-center justify-between gap-4">
                                                <div className="flex flex-col">
                                                    <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">Unit Price</span>
                                                    <div className="flex items-baseline gap-1">
                                                        <span className="text-2xl font-bold text-text-main leading-none">
                                                            ₦{product.price.toLocaleString()}
                                                        </span>
                                                        <span className="text-xs text-text-secondary font-medium">/ unit</span>
                                                    </div>
                                                </div>
                                                <div className="flex flex-col items-end">
                                                    <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">Min. Order</span>
                                                    <span className="text-lg font-bold text-primary">{product.moq || 1} {product.moq === 1 ? 'piece' : 'pieces'}</span>
                                                </div>
                                            </div>

                                            <button
                                                onClick={(e) => handleAction(e, product)}
                                                className="w-full py-3 rounded-none text-sm font-bold flex items-center justify-center gap-1 transition-all active:scale-95 text-primary hover:text-primary-hover hover:underline shadow-none"
                                            >
                                                Request Quote <ArrowRight size={16} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {!isLoading && !isError && products.length === 0 && (
                        <div className="py-20 text-center bg-gray-50 rounded-none border border-dashed border-gray-200">
                            <p className="text-text-secondary font-medium">No products match your search.</p>
                        </div>
                    )}

                    {/* Pagination */}
                    {!isLoading && !isError && products.length > 0 && (
                        <div className="mt-auto border-t border-gray-200 pt-8 flex items-center justify-between">
                            <span className="text-sm text-gray-500 font-medium hidden sm:block">
                                Page {currentPage} of {totalPages}
                            </span>

                            <div className="flex items-center gap-2 mx-auto sm:mx-0">
                                <button
                                    onClick={() => setPage(Math.max(1, currentPage - 1))}
                                    disabled={currentPage === 1}
                                    className="p-2 rounded-none border border-gray-200 text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 hover:border-gray-300 transition-all"
                                >
                                    <ChevronLeft size={20} />
                                </button>

                                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                                    <button
                                        key={page}
                                        onClick={() => setPage(page)}
                                        className={`w-10 h-10 rounded-none text-sm font-bold transition-all ${currentPage === page
                                            ? 'bg-primary text-white shadow-lg shadow-primary/20'
                                            : 'text-gray-600 hover:bg-gray-50 border border-transparent hover:border-gray-200'
                                            }`}
                                    >
                                        {page}
                                    </button>
                                ))}

                                <button
                                    onClick={() => setPage(Math.min(totalPages, currentPage + 1))}
                                    disabled={currentPage === totalPages}
                                    className="p-2 rounded-none border border-gray-200 text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 hover:border-gray-300 transition-all"
                                >
                                    <ChevronRight size={20} />
                                </button>
                            </div>
                        </div>
                    )}

                </div>
            </main>

            {/* Footer */}
            <footer className="bg-white border-t border-slate-200 py-12 mt-20">
                <div className="max-w-[1600px] mx-auto px-4 md:px-8">
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

            {/* Modals */}
            {
                isQuoteModalOpen && selectedQuoteProduct && (
                    <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
                        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity" onClick={() => setIsQuoteModalOpen(false)}></div>
                        <div className="relative bg-white rounded-none shadow-2xl w-full max-w-4xl overflow-hidden animate-in zoom-in-95 duration-200 flex flex-col md:flex-row">
                            {/* Signup Suggestion Side Panel */}
                            {!user && !showOTPStep && (
                                <div className="w-full md:w-80 bg-primary/5 p-8 border-b md:border-b-0 md:border-r border-primary/10 flex flex-col justify-center">
                                    <div className="w-12 h-12 bg-primary/10 text-primary rounded-none flex items-center justify-center mb-6">
                                        <Star size={24} className="fill-primary" />
                                    </div>
                                    <h4 className="font-display font-bold text-xl text-text-main mb-3">Save your quotes</h4>
                                    <p className="text-sm text-text-secondary mb-8 leading-relaxed">
                                        We'll create an account for you automatically. Track your bulk requests, get faster responses, and access exclusive member pricing.
                                    </p>
                                    <div className="bg-white/50 border border-primary/20 rounded-lg p-4">
                                        <p className="text-[10px] text-gray-600 font-bold uppercase tracking-wider mb-2">What happens next:</p>
                                        <ul className="space-y-2 text-xs text-text-secondary">
                                            <li className="flex items-start gap-2">
                                                <CheckCircle2 size={14} className="text-primary mt-0.5 shrink-0" />
                                                <span>Account created instantly</span>
                                            </li>
                                            <li className="flex items-start gap-2">
                                                <CheckCircle2 size={14} className="text-primary mt-0.5 shrink-0" />
                                                <span>OTP sent to your email</span>
                                            </li>
                                            <li className="flex items-start gap-2">
                                                <CheckCircle2 size={14} className="text-primary mt-0.5 shrink-0" />
                                                <span>Quote submitted automatically</span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            )}

                            {/* OTP Verification Side Panel */}
                            {!user && showOTPStep && (
                                <div className="w-full md:w-80 bg-primary/5 p-8 border-b md:border-b-0 md:border-r border-primary/10 flex flex-col justify-center">
                                    <div className="w-12 h-12 bg-primary/10 text-primary rounded-none flex items-center justify-center mb-6">
                                        <Star size={24} className="fill-primary" />
                                    </div>
                                    <h4 className="font-display font-bold text-xl text-text-main mb-3">Almost there!</h4>
                                    <p className="text-sm text-text-secondary mb-8 leading-relaxed">
                                        We've sent a 6-digit verification code to <strong>{quoteFormData.email}</strong>. Enter it below to complete your quote request.
                                    </p>
                                    <div className="bg-white/50 border border-primary/20 rounded-lg p-4">
                                        <p className="text-[10px] text-gray-600 font-bold uppercase tracking-wider mb-2">Check your inbox</p>
                                        <p className="text-xs text-text-secondary">
                                            The code should arrive within a few seconds. Don't forget to check your spam folder.
                                        </p>
                                    </div>
                                </div>
                            )}

                            <div className="flex-1">
                                {!showOTPStep ? (
                                    <>
                                        <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                                            <div>
                                                <h3 className="font-display font-bold text-xl text-text-main">Request Quote</h3>
                                                <p className="text-sm text-text-secondary">Bulk pricing for {selectedQuoteProduct.name}</p>
                                            </div>
                                            <button onClick={() => setIsQuoteModalOpen(false)} className="p-2 hover:bg-gray-100 rounded-none transition-colors text-gray-500">
                                                <X size={20} />
                                            </button>
                                        </div>
                                        <form onSubmit={handleQuoteSubmit} className="p-6 space-y-4">
                                            <div className="grid grid-cols-2 gap-4">
                                                <div>
                                                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">First Name</label>
                                                    <input
                                                        type="text"
                                                        placeholder="John"
                                                        value={quoteFormData.firstName}
                                                        onChange={(e) => setQuoteFormData({ ...quoteFormData, firstName: e.target.value })}
                                                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-none focus:ring-2 focus:ring-primary/20 outline-none font-medium"
                                                        required
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Last Name</label>
                                                    <input
                                                        type="text"
                                                        placeholder="Doe"
                                                        value={quoteFormData.lastName}
                                                        onChange={(e) => setQuoteFormData({ ...quoteFormData, lastName: e.target.value })}
                                                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-none focus:ring-2 focus:ring-primary/20 outline-none font-medium"
                                                        required
                                                    />
                                                </div>
                                            </div>
                                            <div className="grid grid-cols-2 gap-4">
                                                <div>
                                                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Email Address</label>
                                                    <input
                                                        type="email"
                                                        placeholder="john@company.com"
                                                        value={quoteFormData.email}
                                                        onChange={(e) => setQuoteFormData({ ...quoteFormData, email: e.target.value })}
                                                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-none focus:ring-2 focus:ring-primary/20 outline-none font-medium"
                                                        required
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Phone Number</label>
                                                    <input
                                                        type="tel"
                                                        placeholder="+234 800 000 0000"
                                                        value={quoteFormData.phone}
                                                        onChange={(e) => setQuoteFormData({ ...quoteFormData, phone: e.target.value })}
                                                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-none focus:ring-2 focus:ring-primary/20 outline-none font-medium"
                                                        required
                                                    />
                                                </div>
                                            </div>
                                            <div className="grid grid-cols-2 gap-4">
                                                <div>
                                                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Quantity Needed</label>
                                                    <input
                                                        type="number"
                                                        placeholder="e.g. 50"
                                                        value={quoteFormData.quantity}
                                                        onChange={(e) => setQuoteFormData({ ...quoteFormData, quantity: e.target.value })}
                                                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-none focus:ring-2 focus:ring-primary/20 outline-none font-medium"
                                                        required
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Location</label>
                                                    <input
                                                        type="text"
                                                        placeholder="Lagos, Nigeria"
                                                        value={quoteFormData.location}
                                                        onChange={(e) => setQuoteFormData({ ...quoteFormData, location: e.target.value })}
                                                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-none focus:ring-2 focus:ring-primary/20 outline-none font-medium"
                                                        required
                                                    />
                                                </div>
                                            </div>
                                            <div>
                                                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Business Name</label>
                                                <input
                                                    type="text"
                                                    placeholder="Company Ltd."
                                                    value={quoteFormData.businessName}
                                                    onChange={(e) => setQuoteFormData({ ...quoteFormData, businessName: e.target.value })}
                                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-none focus:ring-2 focus:ring-primary/20 outline-none font-medium"
                                                    required
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Additional Notes</label>
                                                <textarea
                                                    rows={3}
                                                    placeholder="Any specific requirements?"
                                                    value={quoteFormData.notes}
                                                    onChange={(e) => setQuoteFormData({ ...quoteFormData, notes: e.target.value })}
                                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-none focus:ring-2 focus:ring-primary/20 outline-none font-medium resize-none"
                                                ></textarea>
                                            </div>
                                            <div className="pt-2">
                                                <button
                                                    type="submit"
                                                    disabled={isCreatingAccount}
                                                    className="w-full py-4 bg-primary text-white font-bold rounded-none hover:bg-primary-hover shadow-lg shadow-primary/20 transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                                >
                                                    {isCreatingAccount ? (
                                                        <>
                                                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                                            Creating Account...
                                                        </>
                                                    ) : (
                                                        user ? 'Submit Request' : 'Create Account & Submit'
                                                    )}
                                                </button>
                                            </div>
                                        </form>
                                    </>
                                ) : (
                                    <>
                                        <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                                            <div>
                                                <h3 className="font-display font-bold text-xl text-text-main">Verify Your Email</h3>
                                                <p className="text-sm text-text-secondary">Enter the 6-digit code we sent you</p>
                                            </div>
                                            <button onClick={() => {
                                                setIsQuoteModalOpen(false);
                                                setShowOTPStep(false);
                                            }} className="p-2 hover:bg-gray-100 rounded-none transition-colors text-gray-500">
                                                <X size={20} />
                                            </button>
                                        </div>
                                        <form onSubmit={handleOTPVerify} className="p-6 space-y-6">
                                            <div>
                                                <label className="block text-xs font-bold text-gray-500 uppercase mb-3 text-center">Verification Code</label>
                                                <input
                                                    type="text"
                                                    placeholder="000000"
                                                    maxLength={6}
                                                    value={otp}
                                                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                                                    className="w-full px-4 py-4 bg-gray-50 border-2 border-gray-200 rounded-none focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none font-bold text-2xl text-center tracking-widest"
                                                    required
                                                />
                                                <p className="text-xs text-text-secondary text-center mt-3">
                                                    Didn't receive the code? <button type="button" className="text-primary font-bold hover:underline">Resend</button>
                                                </p>
                                            </div>
                                            <button
                                                type="submit"
                                                className="w-full py-4 bg-primary text-white font-bold rounded-none hover:bg-primary-hover shadow-lg shadow-primary/20 transition-all active:scale-[0.98]"
                                            >
                                                Verify & Submit Quote
                                            </button>
                                        </form>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                )
            }

            {
                isSuccessModalOpen && (
                    <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
                        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity" onClick={() => setIsSuccessModalOpen(false)}></div>
                        <div className="relative bg-white rounded-none shadow-2xl w-full max-w-sm overflow-hidden animate-in zoom-in-95 duration-200 text-center p-8">
                            <div className="w-16 h-16 bg-green-50 text-green-500 rounded-none flex items-center justify-center mx-auto mb-6">
                                <CheckCircle2 size={32} />
                            </div>
                            <h3 className="font-display font-bold text-2xl text-text-main mb-2">Request Sent!</h3>
                            <p className="text-sm text-text-secondary mb-8">We've received your quote request. A member of our sales team will contact you shortly.</p>
                            <button onClick={() => setIsSuccessModalOpen(false)} className="w-full py-3 bg-gray-100 hover:bg-gray-200 text-text-main font-bold rounded-none transition-colors">
                                Continue Browsing
                            </button>
                        </div>
                    </div>
                )
            }
        </div>
    );
}
