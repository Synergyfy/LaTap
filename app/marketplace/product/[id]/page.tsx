'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import {
    Search, Grid, Star, Download, CheckCircle2, SlidersHorizontal, ArrowRight,
    Home, ChevronRight, FileText, CheckCircle, ShieldCheck, Truck, Headset,
    Share2, Scale, Flag, MessageSquare, StarHalf, Layout, X
} from 'lucide-react';
import { fetchProductDetail } from '@/lib/api/marketplace';
import { ProductDetailSkeleton } from '@/components/marketplace/Skeletons';
import useEmblaCarousel from 'embla-carousel-react';
import toast from 'react-hot-toast';
import { useAuthStore } from '@/store/useAuthStore';
import { useQuoteStore } from '@/store/quoteStore';
import { calculateQuotePrice } from '@/lib/utils/calculateQuotePrice';

export default function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const router = useRouter();
    const { id } = React.use(params);

    const { data: product, isLoading, isError } = useQuery({
        queryKey: ['product', id],
        queryFn: () => fetchProductDetail(id)
    });

    const { user } = useAuthStore();
    const [selectedImage, setSelectedImage] = useState(0);
    const [quantity, setQuantity] = useState(1);
    const [activeTab, setActiveTab] = useState<'specs' | 'quote' | 'reviews'>('specs');
    const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);

    const [quoteData, setQuoteData] = useState({
        firstName: user?.name?.split(' ')[0] || '',
        lastName: user?.name?.split(' ').slice(1).join(' ') || '',
        email: user?.email || '',
        company: user?.businessName || '',
        quantity: '',
        location: '',
        notes: ''
    });

    React.useEffect(() => {
        if (user) {
            setQuoteData(prev => ({
                ...prev,
                firstName: user.name?.split(' ')[0] || '',
                lastName: user.name?.split(' ').slice(1).join(' ') || '',
                email: user.email || '',
                company: user.businessName || ''
            }));
        }
    }, [user]);
    const [reviews, setReviews] = React.useState([
        { id: 1, user: 'Samuel O.', rating: 5, date: '2 days ago', comment: 'Excellent quality, exactly what we needed for our office access system.' },
        { id: 2, user: 'Chioma A.', rating: 4, date: '1 week ago', comment: 'Good value for money. Setup was straightforward.' },
    ]);
    const [newReview, setNewReview] = React.useState({ rating: 5, comment: '' });
    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });

    // Price Calculation
    const currentTier = product?.tieredPricing?.find((tier: any) =>
        quantity >= tier.minQuantity && (!tier.maxQuantity || quantity <= tier.maxQuantity)
    ) || product?.tieredPricing?.[0];

    const unitPrice = currentTier?.price === 'quote' ? 0 : currentTier?.price || product?.price;
    const totalPrice = unitPrice * quantity;
    const savings = (product?.price * quantity) - totalPrice;

    React.useEffect(() => {
        if (emblaApi) {
            emblaApi.on('select', () => {
                setSelectedImage(emblaApi.selectedScrollSnap());
            });
        }
    }, [emblaApi]);

    const scrollToImage = (index: number) => {
        if (emblaApi) emblaApi.scrollTo(index);
    };

    if (isLoading) return <ProductDetailSkeleton />;
    if (isError || !product) return (
        <div className="flex flex-col items-center justify-center min-h-[50vh]">
            <h2 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white">Product not found</h2>
            <button onClick={() => router.back()} className="text-primary underline">Go Back</button>
        </div>
    );

    const handleShare = async () => {
        const shareData = {
            title: `ElizTap - ${product.name}`,
            text: product.description,
            url: window.location.href
        };

        try {
            if (navigator.share && navigator.canShare(shareData)) {
                await navigator.share(shareData);
            } else {
                await navigator.clipboard.writeText(window.location.href);
                toast.success('Link copied to clipboard!');
            }
        } catch (err) {
            if ((err as Error).name !== 'AbortError') {
                console.error('Share failed:', err);
                toast.error('Sharing failed');
            }
        }
    };

    const addQuote = useQuoteStore((state) => state.addQuote);

    const handleQuoteSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!quoteData.firstName || !quoteData.lastName || !quoteData.email || !quoteData.quantity) {
            toast.error('Please fill in all required fields');
            return;
        }

        const quantity = parseInt(quoteData.quantity);
        if (isNaN(quantity) || quantity < 1) {
            toast.error('Please enter a valid quantity');
            return;
        }

        // Calculate estimated value based on tiered pricing
        const estimatedValue = calculateQuotePrice(product.tieredPricing || [], quantity);

        addQuote({
            productId: product.id,
            productName: product.name,
            productImage: product.mainImage || product.images?.[0] || '',
            firstName: quoteData.firstName,
            lastName: quoteData.lastName,
            email: quoteData.email,
            company: quoteData.company,
            quantity,
            message: quoteData.notes,
            estimatedValue,
        });

        toast.success(`Quote request sent for ${product.name}!`);
        setActiveTab('specs');
        setQuoteData({
            firstName: user?.name?.split(' ')[0] || '',
            lastName: user?.name?.split(' ').slice(1).join(' ') || '',
            email: user?.email || '',
            company: user?.businessName || '',
            quantity: '',
            location: '',
            notes: ''
        });
    };

    return (
        <div className="min-h-screen bg-white pb-0">
            {/* Header */}
            <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
                <div className="max-w-[1400px] mx-auto px-4 md:px-8 h-20 flex items-center justify-between gap-8">
                    <div className="flex items-center gap-12">
                        <Link href="/" className="flex items-center gap-2 group">
                            <div className="w-12 h-12 flex items-center justify-center transition-all duration-300">
                                <img src="/logo.png" alt="ElizTap Logo" className="w-full h-full object-contain rounded-full" />
                            </div>
                            <span className="font-display font-bold text-xl tracking-tight text-slate-900">
                                ElizTap<span className="text-primary">.Market</span>
                            </span>
                        </Link>
                        <nav className="hidden lg:flex items-center gap-8">
                            <Link href="/marketplace" className="text-sm font-bold text-primary">Marketplace</Link>
                            <Link href="#" className="text-sm font-bold text-slate-500 hover:text-primary transition-colors">Support</Link>
                        </nav>
                    </div>

                    <div className="flex items-center gap-6">
                        <div className="w-9 h-9 rounded-full bg-slate-200 flex items-center justify-center text-slate-500 font-bold text-xs ring-2 ring-slate-100">
                            JP
                        </div>
                    </div>
                </div>
            </header>

            <main className="max-w-[1400px] mx-auto px-4 md:px-8 py-8">
                {/* Breadcrumb */}
                <nav className="flex mb-8 text-sm font-medium text-slate-500">
                    <Link href="/" className="hover:text-primary flex items-center gap-1"><Home size={14} /> Home</Link>
                    <ChevronRight size={14} className="mx-2 self-center" />
                    <Link href="/marketplace" className="hover:text-primary">Marketplace</Link>
                    <ChevronRight size={14} className="mx-2 self-center" />
                    <span className="text-slate-900 font-bold">{product.name}</span>
                </nav>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    {/* Left Column: Images */}
                    <div className="lg:col-span-7 space-y-6">
                        <div className="aspect-square bg-white rounded-none border border-slate-200 overflow-hidden relative group shadow-sm">
                            <div className="h-full w-full" ref={emblaRef}>
                                <div className="flex h-full">
                                    {product.images.map((img: string, i: number) => (
                                        <div className="flex-[0_0_100%] min-w-0 relative flex items-center justify-center p-12" key={i}>
                                            <img
                                                src={img}
                                                alt={`${product.name} - View ${i + 1}`}
                                                className="max-w-full h-full object-contain"
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="absolute top-6 left-6 z-10">
                                <span className={`px-3 py-1 rounded-none text-xs font-bold uppercase tracking-wider ${product.tagColor}`}>
                                    {product.tag}
                                </span>
                            </div>
                        </div>
                        <div className="grid grid-cols-4 gap-4">
                            {product.images.map((img: string, i: number) => (
                                <button
                                    key={i}
                                    onClick={() => scrollToImage(i)}
                                    className={`aspect-square rounded-none border-2 overflow-hidden bg-white hover:opacity-100 transition-all ${selectedImage === i ? 'border-primary opacity-100 shadow-lg shadow-primary/10' : 'border-slate-200 opacity-60 hover:border-slate-300'}`}
                                >
                                    <img src={img} alt={`View ${i + 1}`} className="w-full h-full object-contain p-2" />
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Right Column: Product Details */}
                    <div className="lg:col-span-5 space-y-8">
                        <div className="space-y-4">
                            <div className="flex items-center gap-4">
                                <span className="inline-block px-2.5 py-0.5 rounded-none text-xs font-semibold bg-green-100 text-green-800">
                                    In Stock
                                </span>
                                <button
                                    onClick={() => setActiveTab('reviews')}
                                    className="flex items-center gap-1 hover:opacity-70 transition-opacity"
                                >
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} size={14} className={i < Math.floor(product.rating || 4.5) ? "text-primary fill-primary" : "text-slate-300"} />
                                    ))}
                                    <span className="text-xs font-bold text-slate-500 ml-1 underline decoration-primary/30">({product.reviews || 24} Reviews)</span>
                                </button>
                            </div>
                            <h1 className="text-4xl font-display font-bold text-slate-900 mb-2 leading-tight">{product.name}</h1>

                            <p className="text-slate-600 leading-relaxed font-medium line-clamp-4">
                                {product.longDescription || product.description}
                            </p>

                            <div className="flex items-center gap-6 pt-2">
                                <button onClick={handleShare} className="text-xs font-bold text-primary hover:underline flex items-center gap-1">
                                    <Share2 size={14} /> Share Product
                                </button>
                                <div className="h-4 w-px bg-slate-200"></div>
                                <div className="text-xs font-medium text-slate-500">
                                    <span className="font-bold text-slate-900">Price per unit:</span> ₦{product.price.toLocaleString()}
                                </div>
                                <div className="h-4 w-px bg-slate-200"></div>
                                <div className="text-xs font-medium text-slate-500">
                                    <span className="font-bold text-slate-900">Lower than MOQ:</span> Contact for pricing
                                </div>
                            </div>
                        </div>

                        {/* Minimum Order Display */}
                        <div className="bg-primary/5 p-6 rounded-none border border-primary/10 space-y-4 shadow-sm">
                            <div className="flex items-center justify-between">
                                <span className="text-sm font-bold text-slate-600 uppercase tracking-wider">Minimum Quantity</span>
                                <span className="text-2xl font-black text-primary">{product.tieredPricing?.[0]?.minQuantity || 1} Units</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-sm font-bold text-slate-600 uppercase tracking-wider">Starting Price</span>
                                <span className="text-2xl font-black text-slate-900">₦{product.price.toLocaleString()}</span>
                            </div>
                            <button
                                onClick={() => setIsQuoteModalOpen(true)}
                                className="w-full mt-4 py-4 bg-primary text-white font-bold rounded-none hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 flex items-center justify-center gap-2 group"
                            >
                                Request Bulk Quote
                                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                            </button>
                        </div>

                        {/* Price Breakdown */}
                        <div className="bg-slate-50 p-6 rounded-none border border-slate-200 space-y-3">
                            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Breakdown Quote</h3>
                            <div className="flex justify-between text-sm">
                                <span className="text-slate-500">Selected Quantity</span>
                                <span className="font-bold text-slate-900">{quantity} Units</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-slate-500">Unit Price</span>
                                <span className="font-bold text-slate-900">
                                    {currentTier?.price === 'quote' ? 'Request Quote' : `₦${unitPrice.toLocaleString()}`}
                                </span>
                            </div>
                            {savings > 0 && (
                                <div className="flex justify-between text-sm text-green-600">
                                    <span>Bulk Discount Applied</span>
                                    <span className="font-bold">-₦{savings.toLocaleString()}</span>
                                </div>
                            )}
                            <div className="pt-3 border-t border-slate-200 flex justify-between items-baseline">
                                <span className="text-base font-bold text-slate-900">Estimated Total</span>
                                <span className="text-2xl font-black text-primary">
                                    {currentTier?.price === 'quote' ? 'TBA' : `₦${totalPrice.toLocaleString()}`}
                                </span>
                            </div>
                        </div>

                        <div className="flex flex-col gap-4 pt-4">
                            <div className="flex items-center gap-4">
                                <div className="flex items-center border border-slate-300 rounded-none h-14 bg-white flex-1 max-w-[140px]">
                                    <button
                                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                        className="px-4 text-slate-500 hover:text-primary transition-colors text-lg"
                                    >-</button>
                                    <input
                                        className="w-12 text-center bg-transparent border-none focus:ring-0 text-lg font-bold text-slate-900"
                                        type="number"
                                        value={quantity}
                                        onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                                    />
                                    <button
                                        onClick={() => setQuantity(quantity + 1)}
                                        className="px-4 text-slate-500 hover:text-primary transition-colors text-lg"
                                    >+</button>
                                </div>
                                <button
                                    onClick={() => setActiveTab('quote')}
                                    className="flex-1 bg-primary hover:bg-primary/90 text-white font-bold h-14 rounded-none shadow-lg shadow-primary/25 transition-all flex items-center justify-center gap-3 active:scale-[0.98]"
                                >
                                    Instant Quote
                                </button>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 text-xs font-semibold text-slate-500 pt-4">
                            <div className="flex items-center gap-2">
                                <Truck size={16} className="text-primary" /> Ships in 24-48 Hours
                            </div>
                            <div className="flex items-center gap-2">
                                <ShieldCheck size={16} className="text-green-500" /> Genuine Product
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-20 grid grid-cols-1 lg:grid-cols-12 gap-12">
                    {/* Tabs / Sections */}
                    <div className="lg:col-span-8">
                        {/* Tabbed Navigation */}
                        <div className="border-b border-slate-200 dark:border-slate-800 mb-8">
                            <nav className="flex space-x-8">
                                <button
                                    onClick={() => setActiveTab('specs')}
                                    className={`border-b-2 py-4 text-sm font-bold transition-all ${activeTab === 'specs' ? 'border-primary text-primary' : 'border-transparent text-slate-500 hover:text-slate-700'}`}
                                >
                                    Specifications
                                </button>
                                <button
                                    onClick={() => setActiveTab('quote')}
                                    className={`border-b-2 py-4 text-sm font-bold transition-all ${activeTab === 'quote' ? 'border-primary text-primary' : 'border-transparent text-slate-500 hover:text-slate-700'}`}
                                >
                                    Request Quote
                                </button>
                                <button
                                    onClick={() => setActiveTab('reviews')}
                                    className={`border-b-2 py-4 text-sm font-bold transition-all ${activeTab === 'reviews' ? 'border-primary text-primary' : 'border-transparent text-slate-500 hover:text-slate-700'}`}
                                >
                                    Reviews
                                </button>
                            </nav>
                        </div>

                        {/* Tab Content */}
                        <div className="space-y-12">
                            {activeTab === 'specs' && (
                                <section className="space-y-8 animate-in fade-in duration-300">
                                    <div className="space-y-4">
                                        <h3 className="text-2xl font-bold text-slate-900">Technical Specifications</h3>
                                        <div className="prose prose-slate max-w-none bg-slate-50 p-6 rounded-none border border-slate-100">
                                            <p className="text-slate-600 leading-relaxed text-lg">{product.longDescription || product.description}</p>
                                        </div>
                                    </div>

                                    <div className="bg-white border border-slate-200 rounded-none overflow-hidden shadow-sm">
                                        <table className="w-full text-sm text-left">
                                            <tbody className="divide-y divide-slate-100">
                                                {Object.entries(product.specifications || {}).map(([key, value]) => (
                                                    <tr key={key}>
                                                        <td className="px-6 py-4 font-bold text-slate-500 w-1/3 bg-slate-50/50">{key}</td>
                                                        <td className="px-6 py-4 text-slate-900 font-medium">{value as string}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </section>
                            )}

                            {activeTab === 'quote' && (
                                <section className="animate-in slide-in-from-bottom-4 duration-500 space-y-6">
                                    <div className="bg-slate-50 p-8 border border-slate-200">
                                        <h3 className="text-2xl font-bold text-slate-900 mb-2">Bulk Pricing Request</h3>
                                        <p className="text-slate-600 mb-8">Fill in the details below and our hardware team will reach out with customized pricing for {product.name}.</p>

                                        <form onSubmit={handleQuoteSubmit} className="space-y-6">
                                            <div className="grid grid-cols-2 gap-6">
                                                <div>
                                                    <label className="block text-[10px] font-black uppercase text-gray-500 mb-1">First Name</label>
                                                    <input
                                                        type="text"
                                                        value={quoteData.firstName}
                                                        onChange={(e) => setQuoteData({ ...quoteData, firstName: e.target.value })}
                                                        placeholder="John"
                                                        className="w-full px-4 py-3 bg-white border border-gray-200 rounded-none focus:ring-2 focus:ring-primary/20 outline-none font-medium"
                                                        required
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-[10px] font-black uppercase text-gray-500 mb-1">Last Name</label>
                                                    <input
                                                        type="text"
                                                        value={quoteData.lastName}
                                                        onChange={(e) => setQuoteData({ ...quoteData, lastName: e.target.value })}
                                                        placeholder="Doe"
                                                        className="w-full px-4 py-3 bg-white border border-gray-200 rounded-none focus:ring-2 focus:ring-primary/20 outline-none font-medium"
                                                        required
                                                    />
                                                </div>
                                            </div>
                                            <div className="grid grid-cols-2 gap-6">
                                                <div>
                                                    <label className="block text-[10px] font-black uppercase text-gray-500 mb-1">Work Email</label>
                                                    <input
                                                        type="email"
                                                        value={quoteData.email}
                                                        onChange={(e) => setQuoteData({ ...quoteData, email: e.target.value })}
                                                        placeholder="john@company.com"
                                                        className="w-full px-4 py-3 bg-white border border-gray-200 rounded-none focus:ring-2 focus:ring-primary/20 outline-none font-medium"
                                                        required
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-[10px] font-black uppercase text-gray-500 mb-1">Location / State</label>
                                                    <input
                                                        type="text"
                                                        value={quoteData.location}
                                                        onChange={(e) => setQuoteData({ ...quoteData, location: e.target.value })}
                                                        placeholder="Lagos, Nigeria"
                                                        className="w-full px-4 py-3 bg-white border border-gray-200 rounded-none focus:ring-2 focus:ring-primary/20 outline-none font-medium"
                                                        required
                                                    />
                                                </div>
                                            </div>
                                            <div className="grid grid-cols-2 gap-6">
                                                <div>
                                                    <label className="block text-[10px] font-black uppercase text-gray-500 mb-1">Quantity Needed</label>
                                                    <input
                                                        type="number"
                                                        value={quoteData.quantity}
                                                        onChange={(e) => setQuoteData({ ...quoteData, quantity: e.target.value })}
                                                        placeholder="e.g. 100"
                                                        className="w-full px-4 py-3 bg-white border border-gray-200 rounded-none focus:ring-2 focus:ring-primary/20 outline-none font-medium"
                                                        required
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-[10px] font-black uppercase text-gray-500 mb-1">Business Name</label>
                                                    <input
                                                        type="text"
                                                        value={quoteData.company}
                                                        onChange={(e) => setQuoteData({ ...quoteData, company: e.target.value })}
                                                        placeholder="Company Ltd."
                                                        className="w-full px-4 py-3 bg-white border border-gray-200 rounded-none focus:ring-2 focus:ring-primary/20 outline-none font-medium"
                                                        required
                                                    />
                                                </div>
                                            </div>
                                            <div>
                                                <label className="block text-[10px] font-black uppercase text-gray-500 mb-1">Additional Notes</label>
                                                <textarea
                                                    rows={4}
                                                    value={quoteData.notes}
                                                    onChange={(e) => setQuoteData({ ...quoteData, notes: e.target.value })}
                                                    placeholder="Any specific requirements?"
                                                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-none focus:ring-2 focus:ring-primary/20 outline-none font-medium resize-none"
                                                ></textarea>
                                            </div>
                                            <button type="submit" className="w-full py-5 bg-primary text-white font-bold rounded-none hover:bg-primary-hover shadow-xl shadow-primary/20 transition-all active:scale-[0.98]">
                                                Submit Request
                                            </button>
                                        </form>
                                    </div>
                                </section>
                            )}

                            {activeTab === 'reviews' && (
                                <section className="animate-in fade-in duration-300 space-y-8">
                                    <h3 className="text-2xl font-bold text-slate-900">Customer Reviews</h3>
                                    <div className="space-y-6">
                                        {reviews.map((review) => (
                                            <div key={review.id} className="p-6 border border-slate-100 bg-slate-50/50">
                                                <div className="flex justify-between items-center mb-4">
                                                    <div className="flex items-center gap-1">
                                                        {[...Array(5)].map((_, i) => (
                                                            <Star key={i} size={14} className={i < review.rating ? "text-primary fill-primary" : "text-slate-300"} />
                                                        ))}
                                                    </div>
                                                    <span className="text-xs text-slate-400 font-medium">{review.date}</span>
                                                </div>
                                                <p className="text-slate-700 font-medium mb-2">{review.comment}</p>
                                                <p className="text-xs font-bold text-slate-900">— {review.user}</p>
                                            </div>
                                        ))}
                                    </div>
                                </section>
                            )}
                        </div>
                    </div>

                    {/* Right / Sidebar removal placeholder - now spanning 8/12 grid but we can adjust to centered if needed or just keep empty */}
                    <div className="hidden lg:block lg:col-span-4">
                        <div className="bg-primary/5 p-8 border border-primary/10 space-y-6">
                            <Headset size={40} className="text-primary" />
                            <h4 className="text-xl font-bold text-slate-900">Need Customization?</h4>
                            <p className="text-sm text-slate-600 font-medium">Our hardware team specializes in custom NFC builds for large-scale enterprise deployments.</p>
                            <button onClick={() => setActiveTab('quote')} className="w-full py-4 bg-white border border-primary/20 text-primary font-bold hover:bg-primary hover:text-white transition-all">
                                Request Consultation
                            </button>
                        </div>
                    </div>
                </div>
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

            {/* Quote Modal */}
            {isQuoteModalOpen && (
                <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity" onClick={() => setIsQuoteModalOpen(false)}></div>
                    <div className="relative bg-white rounded-none shadow-2xl w-full max-w-lg overflow-hidden animate-in zoom-in-95 duration-200">
                        <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                            <div>
                                <h3 className="font-display font-bold text-xl text-text-main">Request Bulk Quote</h3>
                                <p className="text-sm text-text-secondary">ElizTap specialized pricing for {product.name}</p>
                            </div>
                            <button onClick={() => setIsQuoteModalOpen(false)} className="p-2 hover:bg-gray-100 rounded-none transition-colors text-gray-500">
                                <X size={20} />
                            </button>
                        </div>
                        <form onSubmit={handleQuoteSubmit} className="p-6 space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-[10px] font-black uppercase text-gray-500 mb-1">First Name</label>
                                    <input
                                        type="text"
                                        value={quoteData.firstName}
                                        onChange={(e) => setQuoteData({ ...quoteData, firstName: e.target.value })}
                                        placeholder="John"
                                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-none focus:ring-2 focus:ring-primary/20 outline-none font-medium"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-[10px] font-black uppercase text-gray-500 mb-1">Last Name</label>
                                    <input
                                        type="text"
                                        value={quoteData.lastName}
                                        onChange={(e) => setQuoteData({ ...quoteData, lastName: e.target.value })}
                                        placeholder="Doe"
                                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-none focus:ring-2 focus:ring-primary/20 outline-none font-medium"
                                        required
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-[10px] font-black uppercase text-gray-500 mb-1">Work Email</label>
                                    <input
                                        type="email"
                                        value={quoteData.email}
                                        onChange={(e) => setQuoteData({ ...quoteData, email: e.target.value })}
                                        placeholder="john@company.com"
                                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-none focus:ring-2 focus:ring-primary/20 outline-none font-medium"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-[10px] font-black uppercase text-gray-500 mb-1">Location / State</label>
                                    <input
                                        type="text"
                                        value={quoteData.location}
                                        onChange={(e) => setQuoteData({ ...quoteData, location: e.target.value })}
                                        placeholder="Lagos, Nigeria"
                                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-none focus:ring-2 focus:ring-primary/20 outline-none font-medium"
                                        required
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-[10px] font-black uppercase text-gray-500 mb-1">Quantity Needed</label>
                                    <input
                                        type="number"
                                        value={quoteData.quantity}
                                        onChange={(e) => setQuoteData({ ...quoteData, quantity: e.target.value })}
                                        placeholder="e.g. 100"
                                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-none focus:ring-2 focus:ring-primary/20 outline-none font-medium"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-[10px] font-black uppercase text-gray-500 mb-1">Business Name</label>
                                    <input
                                        type="text"
                                        value={quoteData.company}
                                        onChange={(e) => setQuoteData({ ...quoteData, company: e.target.value })}
                                        placeholder="Company Ltd."
                                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-none focus:ring-2 focus:ring-primary/20 outline-none font-medium"
                                        required
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-[10px] font-black uppercase text-gray-500 mb-1">Additional Notes</label>
                                <textarea
                                    rows={3}
                                    value={quoteData.notes}
                                    onChange={(e) => setQuoteData({ ...quoteData, notes: e.target.value })}
                                    placeholder="Any specific requirements?"
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-none focus:ring-2 focus:ring-primary/20 outline-none font-medium resize-none"
                                ></textarea>
                            </div>
                            <div className="pt-2">
                                <button type="submit" className="w-full py-4 bg-primary text-white font-bold rounded-none hover:bg-primary-hover shadow-lg shadow-primary/20 transition-all active:scale-[0.98]">
                                    Submit Request
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
