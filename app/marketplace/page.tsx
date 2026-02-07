'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { useQuery } from '@tanstack/react-query';
import {
    Search, ShoppingCart, Grid, Heart, Star, Download, CheckCircle2, SlidersHorizontal, ArrowRight,
    Menu, LayoutGrid, ChevronLeft, ChevronRight, X
} from 'lucide-react';
import { useMarketplaceStore } from '@/store/marketplaceStore';
import { useCartStore } from '@/store/cartStore';
import { useWishlistStore } from '@/store/wishlistStore';
import { fetchProducts } from '@/lib/api/marketplace';
import { ProductCardSkeleton } from '@/components/marketplace/Skeletons';

export default function MarketplacePage() {
    const router = useRouter();

    // Zustand Store
    const {
        selectedCategory, priceRange, selectedBrands, currentPage, searchQuery,
        setCategory, setPriceRange, toggleBrand, setPage, setSearchQuery, resetFilters
    } = useMarketplaceStore();

    const { addItem, items } = useCartStore();
    const { toggleItem, isInWishlist, items: wishlistItems } = useWishlistStore();

    const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
    const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
    const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
    const [selectedQuoteProduct, setSelectedQuoteProduct] = useState<any>(null);

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
        if (product.action === 'quote') {
            setSelectedQuoteProduct(product);
            setIsQuoteModalOpen(true);
        } else if (product.action === 'cart') {
            addItem({
                id: Math.random().toString(36).substr(2, 9), // Temp ID gen
                productId: product.id,
                name: product.name,
                brand: product.brand,
                price: product.price,
                originalPrice: product.originalPrice || undefined,
                image: product.image,
                inStock: true,
                shippingInfo: 'Standard Delivery'
            });
            toast.success(`Added ${product.name} to cart`);
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

    const handleQuoteSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsQuoteModalOpen(false);
        setIsSuccessModalOpen(true);
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
                            <div className="w-10 h-10 bg-primary/10 rounded-sm flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
                                <Grid size={24} />
                            </div>
                            <span className="font-display font-bold text-xl tracking-tight text-text-main">
                                ElizTap<span className="text-primary">.Market</span>
                            </span>
                        </Link>

                        {/* Desktop Nav */}
                        <nav className="hidden lg:flex items-center gap-8">
                            {['New Arrivals', 'Best Sellers', 'Deals', 'Support'].map((item) => (
                                <Link key={item} href="#" className="text-sm font-bold text-gray-500 hover:text-primary transition-colors">
                                    {item}
                                </Link>
                            ))}
                        </nav>
                    </div>

                    {/* Search Bar */}
                    <div className="hidden lg:flex flex-1 max-w-xl relative group">
                        <input
                            type="text"
                            placeholder="Check product name, MCU, or part number..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full h-12 pl-12 pr-4 bg-gray-50 hover:bg-gray-100 focus:bg-white border-2 border-transparent focus:border-primary/20 rounded-sm outline-none font-medium transition-all text-sm placeholder:text-gray-400"
                        />
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors" size={20} />
                    </div>

                    <div className="flex items-center gap-3 sm:gap-6">
                        <button className="lg:hidden p-2 text-gray-500" onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}>
                            <Search size={22} />
                        </button>

                        <div className="flex items-center gap-4">
                            <Link href="/marketplace/wishlist" className="p-2 text-gray-500 hover:text-primary transition-colors relative hidden sm:block">
                                <Heart size={22} />
                                {wishlistItems.length > 0 && (
                                    <span className="absolute top-0 right-0 w-4 h-4 bg-primary text-white text-[10px] font-bold flex items-center justify-center rounded-full border border-white">
                                        {wishlistItems.length}
                                    </span>
                                )}
                            </Link>
                            <Link href="/marketplace/cart" className="p-2 text-gray-500 hover:text-primary transition-colors relative">
                                <ShoppingCart size={22} />
                                {items.length > 0 && (
                                    <span className="absolute top-0 right-0 w-4 h-4 bg-red-500 text-white text-[10px] font-bold flex items-center justify-center rounded-full border border-white">
                                        {items.length}
                                    </span>
                                )}
                            </Link>
                        </div>

                        <div className="h-8 w-[1px] bg-gray-200 hidden sm:block"></div>

                        <button className="hidden sm:flex items-center gap-3 hover:bg-gray-50 p-1.5 pr-3 rounded-sm border border-transparent hover:border-gray-200 transition-all">
                            <div className="w-9 h-9 rounded-sm bg-linear-to-br from-gray-100 to-gray-200 border border-gray-200 overflow-hidden flex items-center justify-center">
                                <span className="font-bold text-gray-500">JP</span>
                            </div>
                            <span className="text-sm font-bold text-gray-700">Account</span>
                        </button>

                        <button className="lg:hidden p-2 text-gray-700" onClick={() => setIsMobileFilterOpen(true)}>
                            <Menu size={24} />
                        </button>
                    </div>
                </div >
            </header >

            {/* Sub-Header Categories */}
            <div className="bg-white border-b border-gray-200 overflow-x-auto no-scrollbar shadow-sm sticky top-20 z-40">
                <div className="max-w-[1600px] mx-auto px-4 md:px-8 h-14 flex items-center gap-8 min-w-max">
                    <button
                        onClick={() => setCategory('All Products')}
                        className={`h-full border-b-[3px] px-1 font-bold flex items-center gap-2 transition-all ${selectedCategory === 'All Products' ? 'border-primary text-primary' : 'border-transparent text-gray-500 hover:text-gray-800'
                            }`}
                    >
                        <LayoutGrid size={18} /> All Products
                    </button>
                    {['NFC Readers', 'Smart Cards', 'Development Kits'].map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setCategory(cat)}
                            className={`h-full border-b-[3px] px-1 font-bold flex items-center gap-2 transition-all ${selectedCategory === cat ? 'border-primary text-primary' : 'border-transparent text-gray-500 hover:text-gray-800'
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>


            <main className="max-w-[1600px] mx-auto px-4 md:px-8 py-8 md:py-12 flex-1 w-full">
                <div className="flex flex-col lg:flex-row gap-8 xl:gap-12">

                    {/* Filters Sidebar (Desktop) */}
                    <aside className="hidden lg:block w-72 flex-shrink-0">
                        <div className="sticky top-40 space-y-10">
                            <div>
                                <h3 className="flex items-center gap-2 font-display font-bold text-lg mb-6 text-text-main">
                                    <SlidersHorizontal size={20} className="text-gray-400" />
                                    Filters
                                </h3>

                                <div className="space-y-8">
                                    {/* Category Filter */}
                                    <div className="space-y-4">
                                        <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Category</p>
                                        <div className="space-y-1">
                                            {['All Products', 'NFC Readers', 'Smart Cards', 'Development Kits', 'Modules', 'Accessory'].map((item, i) => (
                                                <label key={i} className="flex items-center gap-3 cursor-pointer group py-1">
                                                    <input
                                                        type="radio"
                                                        name="category"
                                                        className="hidden"
                                                        checked={selectedCategory === item}
                                                        onChange={() => setCategory(item)}
                                                    />
                                                    <div className={`w-4 h-4 rounded-full border flex items-center justify-center transition-colors ${selectedCategory === item ? 'border-primary' : 'border-gray-300 group-hover:border-primary'}`}>
                                                        {selectedCategory === item && <div className="w-2 h-2 rounded-full bg-primary"></div>}
                                                    </div>
                                                    <span className={`text-sm transition-colors ${selectedCategory === item ? 'text-primary font-bold' : 'text-gray-600 font-medium group-hover:text-primary'}`}>{item}</span>
                                                </label>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Price Range */}
                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between">
                                            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Price Limit</p>
                                            <span className="text-xs font-bold text-primary">₦{(priceRange[1]).toLocaleString()}</span>
                                        </div>
                                        <input
                                            type="range"
                                            min="0"
                                            max="1000000"
                                            step="5000"
                                            value={priceRange[1]}
                                            onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                                            className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary hover:accent-primary-hover"
                                        />
                                    </div>

                                    {/* Brand */}
                                    <div className="space-y-4">
                                        <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Brands</p>
                                        <div className="space-y-2">
                                            {['ACS', 'HID Global', 'NXP', 'EntryConnect', 'StrongLink'].map((brand, i) => (
                                                <label key={i} className="flex items-center gap-3 cursor-pointer group hover:bg-gray-50 p-2 -mx-2 rounded-sm transition-colors">
                                                    <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${selectedBrands.includes(brand) ? 'bg-primary border-primary' : 'bg-white border-gray-300'}`}>
                                                        {selectedBrands.includes(brand) && <CheckCircle2 size={12} className="text-white" />}
                                                    </div>
                                                    <input
                                                        type="checkbox"
                                                        className="hidden"
                                                        checked={selectedBrands.includes(brand)}
                                                        onChange={() => toggleBrand(brand)}
                                                    />
                                                    <span className="text-sm text-gray-600 font-medium group-hover:text-gray-900">{brand}</span>
                                                </label>
                                            ))}
                                        </div>
                                    </div>

                                    <button onClick={resetFilters} className="w-full py-2.5 border border-gray-300 rounded-sm text-sm font-bold text-gray-600 hover:border-gray-400 hover:text-text-main transition-colors">
                                        Reset Filters
                                    </button>
                                </div>
                            </div>
                        </div>
                    </aside>

                    {/* Mobile Filter Drawer */}
                    {isMobileFilterOpen && (
                        <div className="fixed inset-0 z-[60] lg:hidden">
                            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setIsMobileFilterOpen(false)}></div>
                            <div className="absolute inset-y-0 right-0 w-80 bg-white shadow-2xl p-6 overflow-y-auto animate-in slide-in-from-right duration-200">
                                <div className="flex items-center justify-between mb-8">
                                    <h3 className="font-display font-bold text-xl">Filters</h3>
                                    <button onClick={() => setIsMobileFilterOpen(false)} className="p-2 hover:bg-gray-100 rounded-full">
                                        <X size={24} />
                                    </button>
                                </div>
                                <div className="space-y-8">
                                    <div className="space-y-4">
                                        <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Category</p>
                                        <div className="space-y-2">
                                            {['All Products', 'NFC Readers', 'Smart Cards', 'Development Kits'].map((item) => (
                                                <button key={item} onClick={() => { setCategory(item); setIsMobileFilterOpen(false); }} className={`block w-full text-left py-2 px-3 rounded-lg text-sm font-medium ${selectedCategory === item ? 'bg-primary/10 text-primary' : 'text-gray-600'}`}>
                                                    {item}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Product Grid Area */}
                    <div className="flex-1 flex flex-col min-h-[600px]">

                        <div className="mb-6 flex items-center justify-between flex-wrap gap-4">
                            <div>
                                <h2 className="font-display font-bold text-3xl text-text-main mb-1">{selectedCategory}</h2>
                                <p className="text-text-secondary">Showing {products.length} results</p>
                            </div>
                            <div className="hidden sm:flex items-center gap-3">
                                <span className="text-sm text-gray-500 font-medium">Sort by:</span>
                                <select className="bg-white border border-gray-200 text-sm font-bold text-text-main rounded-sm px-4 py-2.5 outline-none focus:ring-2 focus:ring-primary/20 cursor-pointer shadow-sm hover:border-gray-300 transition-colors">
                                    <option>Popularity</option>
                                    <option>Price: Low to High</option>
                                    <option>Newest</option>
                                </select>
                            </div>
                        </div>

                        {/* Loading State Skeleton */}
                        {isLoading && (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-8 mb-12">
                                {[...Array(6)].map((_, i) => (
                                    <ProductCardSkeleton key={i} />
                                ))}
                            </div>
                        )}

                        {/* Error State */}
                        {isError && (
                            <div className="flex-1 flex flex-col items-center justify-center p-20 text-center">
                                <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mb-4">
                                    <X size={32} />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2">Failed to load products</h3>
                                <p className="text-gray-500 mb-6">Something went wrong while fetching the marketplace data.</p>
                                <button onClick={() => window.location.reload()} className="px-6 py-2 bg-primary text-white rounded-lg font-bold hover:bg-primary-hover transition-colors">
                                    Try Again
                                </button>
                            </div>
                        )}

                        {/* Products Grid */}
                        {!isLoading && !isError && products.length > 0 && (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-8 mb-12">
                                {products.map((product) => (
                                    <div
                                        key={product.id}
                                        onClick={() => handleCardClick(product.id)}
                                        className="group bg-white rounded-sm border border-gray-200 hover:border-primary/30 hover:shadow-2xl hover:shadow-primary/5 transition-all duration-300 flex flex-col overflow-hidden relative cursor-pointer"
                                    >

                                        {/* Image Area */}
                                        <div className="relative aspect-square p-8 bg-white group-hover:bg-gray-50 transition-colors duration-500 flex items-center justify-center border-b border-gray-100">
                                            <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
                                                <span className={`self-start px-3 py-1 rounded-sm text-[10px] font-bold uppercase tracking-wider text-white shadow-sm ${product.tagColor}`}>
                                                    {product.tag}
                                                </span>
                                            </div>
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    toggleItem({
                                                        id: product.id,
                                                        productId: product.id,
                                                        name: product.name,
                                                        brand: product.brand,
                                                        price: product.price,
                                                        image: product.image,
                                                        desc: product.desc
                                                    });
                                                    toast.success(isInWishlist(product.id) ? 'Removed from wishlist' : 'Added to wishlist');
                                                }}
                                                className={`absolute top-4 right-4 p-2.5 bg-white rounded-sm shadow-md transition-all z-10 opacity-0 group-hover:opacity-100 ${isInWishlist(product.id) ? 'text-red-500' : 'text-gray-400 hover:text-red-500 hover:scale-110'}`}
                                            >
                                                <Heart size={18} fill={isInWishlist(product.id) ? "currentColor" : "none"} />
                                            </button>

                                            <img
                                                src={product.image}
                                                alt={product.name}
                                                className="w-full h-full object-contain filter group-hover:brightness-105 transition-all duration-500 transform group-hover:scale-105"
                                            />
                                        </div>

                                        {/* Content */}
                                        <div className="p-6 flex-1 flex flex-col">
                                            <div className="mb-4 flex items-center justify-between">
                                                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1">
                                                    {product.brand}
                                                </span>
                                                <div className="flex items-center gap-1.5 bg-amber-50 px-2 py-1 rounded-md">
                                                    <Star size={12} className="text-amber-400 fill-amber-400" />
                                                    <span className="text-xs font-bold text-amber-700">{product.rating}</span>
                                                </div>
                                            </div>

                                            <h3 className="font-display font-bold text-xl text-text-main leading-snug mb-3 group-hover:text-primary transition-colors line-clamp-2">
                                                {product.name}
                                            </h3>
                                            <p className="text-sm text-text-secondary line-clamp-2 mb-8 leading-relaxed font-medium">{product.desc}</p>

                                            <div className="mt-auto flex items-center justify-between gap-4">
                                                <div className="flex flex-col">
                                                    {product.originalPrice && (
                                                        <span className="text-xs text-gray-400 line-through font-medium mb-0.5">₦{product.originalPrice.toLocaleString()}</span>
                                                    )}
                                                    <span className="block text-2xl font-bold text-text-main leading-none">
                                                        ₦{product.price.toLocaleString()}
                                                    </span>
                                                </div>

                                                <button
                                                    onClick={(e) => handleAction(e, product)}
                                                    className={`
                                                        h-11 px-6 rounded-sm text-sm font-bold flex items-center gap-2 transition-all active:scale-95 shadow-sm ml-auto
                                                        ${product.action === 'quote'
                                                            ? 'bg-transparent text-primary hover:text-primary-hover hover:underline shadow-none px-0'
                                                            : product.action === 'download'
                                                                ? 'bg-primary/10 text-primary hover:bg-primary/20'
                                                                : 'bg-primary text-white hover:bg-primary-dark shadow-lg shadow-primary/20'
                                                        }
                                                    `}
                                                >
                                                    {product.action === 'quote' && <span className="flex items-center gap-1">Request Quote <ArrowRight size={16} /></span>}
                                                    {product.action === 'download' && <span className="flex items-center gap-2">Get <Download size={18} /></span>}
                                                    {product.action === 'cart' && <span className="flex items-center gap-2">Add <ShoppingCart size={18} /></span>}
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {!isLoading && !isError && products.length === 0 && (
                            <div className="py-20 text-center bg-gray-50 rounded-sm border border-dashed border-gray-200">
                                <p className="text-text-secondary font-medium">No products match your filters.</p>
                                <button onClick={resetFilters} className="mt-4 text-primary font-bold hover:underline">Clear Filters</button>
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
                                        className="p-2 rounded-lg border border-gray-200 text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 hover:border-gray-300 transition-all"
                                    >
                                        <ChevronLeft size={20} />
                                    </button>

                                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                                        <button
                                            key={page}
                                            onClick={() => setPage(page)}
                                            className={`w-10 h-10 rounded-lg text-sm font-bold transition-all ${currentPage === page
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
                                        className="p-2 rounded-lg border border-gray-200 text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 hover:border-gray-300 transition-all"
                                    >
                                        <ChevronRight size={20} />
                                    </button>
                                </div>
                            </div>
                        )}

                    </div>
                </div>
            </main>

            <footer className="bg-white border-t border-gray-200 py-8 mt-auto">
                <div className="max-w-[1600px] mx-auto px-4 md:px-8 text-center">
                    <p className="text-sm font-medium text-gray-500">
                        ElizTap Marketplace © {new Date().getFullYear()}
                    </p>
                </div>
            </footer>

            {/* Modals */}
            {
                isQuoteModalOpen && selectedQuoteProduct && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity" onClick={() => setIsQuoteModalOpen(false)}></div>
                        <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden animate-in zoom-in-95 duration-200">
                            <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                                <div>
                                    <h3 className="font-display font-bold text-xl text-text-main">Request Quote</h3>
                                    <p className="text-sm text-text-secondary">Bulk pricing for {selectedQuoteProduct.name}</p>
                                </div>
                                <button onClick={() => setIsQuoteModalOpen(false)} className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500">
                                    <X size={20} />
                                </button>
                            </div>
                            <form onSubmit={handleQuoteSubmit} className="p-6 space-y-4">
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Quantity Needed</label>
                                    <input type="number" placeholder="e.g. 50" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 outline-none font-medium" required />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Business Name</label>
                                    <input type="text" placeholder="Company Ltd." className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 outline-none font-medium" required />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Additional Notes</label>
                                    <textarea rows={3} placeholder="Any specific requirements?" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 outline-none font-medium resize-none"></textarea>
                                </div>
                                <div className="pt-2">
                                    <button type="submit" className="w-full py-4 bg-primary text-white font-bold rounded-xl hover:bg-primary-hover shadow-lg shadow-primary/20 transition-all active:scale-[0.98]">
                                        Submit Request
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )
            }

            {
                isSuccessModalOpen && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity" onClick={() => setIsSuccessModalOpen(false)}></div>
                        <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-sm overflow-hidden animate-in zoom-in-95 duration-200 text-center p-8">
                            <div className="w-16 h-16 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                                <CheckCircle2 size={32} />
                            </div>
                            <h3 className="font-display font-bold text-2xl text-text-main mb-2">Request Sent!</h3>
                            <p className="text-sm text-text-secondary mb-8">We've received your quote request. A member of our sales team will contact you shortly.</p>
                            <button onClick={() => setIsSuccessModalOpen(false)} className="w-full py-3 bg-gray-100 hover:bg-gray-200 text-text-main font-bold rounded-xl transition-colors">
                                Continue Browsing
                            </button>
                        </div>
                    </div>
                )
            }
        </div >
    );
}
