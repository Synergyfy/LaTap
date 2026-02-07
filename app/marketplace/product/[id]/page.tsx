'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { useCartStore } from '@/store/cartStore';
import {
    Search, ShoppingCart, Grid, Heart, Star, Download, CheckCircle2, SlidersHorizontal, ArrowRight,
    Home, ChevronRight, Play, FileText, CheckCircle, ShieldCheck, Truck, Headset
} from 'lucide-react';
import { fetchProductDetail } from '@/lib/api/marketplace';
import { ProductDetailSkeleton } from '@/components/marketplace/Skeletons';
import { useWishlistStore } from '@/store/wishlistStore';
import useEmblaCarousel from 'embla-carousel-react';
import toast from 'react-hot-toast';

export default function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const router = useRouter();
    const { id } = React.use(params);

    const { data: product, isLoading, isError } = useQuery({
        queryKey: ['product', id],
        queryFn: () => fetchProductDetail(id)
    });

    const { addItem, items } = useCartStore();
    const { toggleItem, isInWishlist } = useWishlistStore();
    const [selectedImage, setSelectedImage] = React.useState(0);
    const [quantity, setQuantity] = React.useState(1);
    const [activeTab, setActiveTab] = React.useState<'specs' | 'downloads' | 'details' | 'video' | 'howto' | 'quote'>('specs');
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

    const handleAddToCart = () => {
        addItem({
            id: Math.random().toString(36).substr(2, 9),
            productId: product.id,
            name: product.name,
            brand: product.brand,
            price: unitPrice || product.price,
            image: product.images[0],
            inStock: true,
            shippingInfo: 'Standard Delivery'
        });
        toast.success(`Added ${quantity} x ${product.name} to cart`);
    };

    return (
        <div className="min-h-screen bg-white dark:bg-slate-950 pb-0">
            {/* Header */}
            <header className="sticky top-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
                <div className="max-w-[1400px] mx-auto px-4 md:px-8 h-20 flex items-center justify-between gap-8">
                    <div className="flex items-center gap-12">
                        <Link href="/" className="flex items-center gap-2 group">
                            <div className="w-10 h-10 bg-primary/10 rounded-sm flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
                                <Grid size={24} />
                            </div>
                            <span className="font-display font-bold text-xl tracking-tight text-slate-900 dark:text-white">
                                ElizTap<span className="text-primary">.Market</span>
                            </span>
                        </Link>
                        <nav className="hidden lg:flex items-center gap-8">
                            <Link href="/marketplace" className="text-sm font-bold text-primary">Marketplace</Link>
                            <Link href="#" className="text-sm font-bold text-slate-500 hover:text-primary transition-colors">Support</Link>
                        </nav>
                    </div>

                    <div className="flex items-center gap-6">
                        <Link href="/marketplace/wishlist" className="p-2 text-slate-500 hover:text-primary transition-colors">
                            <Heart size={22} fill={isInWishlist(product.id) ? "currentColor" : "none"} className={isInWishlist(product.id) ? "text-red-500" : ""} />
                        </Link>
                        <Link href="/marketplace/cart" className="p-2 text-slate-500 hover:text-primary transition-colors relative">
                            <ShoppingCart size={22} />
                            {items.length > 0 && (
                                <span className="absolute top-0 right-0 w-4 h-4 bg-red-500 text-white text-[10px] font-bold flex items-center justify-center rounded-full border border-white">
                                    {items.length}
                                </span>
                            )}
                        </Link>
                        <div className="w-9 h-9 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center text-slate-500 font-bold text-xs">
                            JP
                        </div>
                    </div>
                </div>
            </header>

            <main className="max-w-[1400px] mx-auto px-4 md:px-8 py-8">
                {/* Breadcrumb */}
                <nav className="flex mb-8 text-sm font-medium text-slate-500 dark:text-slate-400">
                    <Link href="/" className="hover:text-primary flex items-center gap-1"><Home size={14} /> Home</Link>
                    <ChevronRight size={14} className="mx-2 self-center" />
                    <Link href="/marketplace" className="hover:text-primary">Marketplace</Link>
                    <ChevronRight size={14} className="mx-2 self-center" />
                    <span className="text-slate-900 dark:text-white font-bold">{product.name}</span>
                </nav>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    {/* Left Column: Images */}
                    <div className="lg:col-span-7 space-y-6">
                        <div className="aspect-square bg-white dark:bg-slate-900 rounded-sm border border-slate-200 dark:border-slate-800 overflow-hidden relative group shadow-sm">
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
                                <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${product.tagColor}`}>
                                    {product.tag}
                                </span>
                            </div>
                        </div>
                        <div className="grid grid-cols-4 gap-4">
                            {product.images.map((img: string, i: number) => (
                                <button
                                    key={i}
                                    onClick={() => scrollToImage(i)}
                                    className={`aspect-square rounded-sm border-2 overflow-hidden bg-white dark:bg-slate-900 hover:opacity-100 transition-all ${selectedImage === i ? 'border-primary opacity-100 shadow-lg shadow-primary/10' : 'border-slate-200 dark:border-slate-800 opacity-60 hover:border-slate-300'}`}
                                >
                                    <img src={img} alt={`View ${i + 1}`} className="w-full h-full object-contain p-2" />
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Right Column: Product Details */}
                    <div className="lg:col-span-5 space-y-8">
                        <div>
                            <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 mb-4">
                                In Stock
                            </span>
                            <h1 className="text-4xl font-display font-bold text-slate-900 dark:text-white mb-2 leading-tight">{product.name}</h1>
                            <p className="text-slate-500 dark:text-slate-400 font-medium font-mono text-sm">SKU: {product.sku}</p>
                        </div>

                        {/* Tiered Pricing Table */}
                        <div className="space-y-4">
                            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Tiered Pricing</h3>
                            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-sm overflow-hidden shadow-sm">
                                <table className="w-full text-left text-sm">
                                    <thead className="bg-slate-50 dark:bg-slate-800/50 text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                                        <tr>
                                            <th className="px-6 py-3 font-bold">Quantity</th>
                                            <th className="px-6 py-3 font-bold text-right">Unit Price</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                                        {product.tieredPricing?.map((tier: any, idx: number) => {
                                            const isActive = quantity >= tier.minQuantity && (!tier.maxQuantity || quantity <= tier.maxQuantity);
                                            return (
                                                <tr key={idx} className={isActive ? "bg-primary/5" : ""}>
                                                    <td className={`px-6 py-4 font-medium ${isActive ? 'text-primary' : 'text-slate-600 dark:text-slate-300'}`}>
                                                        {tier.maxQuantity ? `${tier.minQuantity} - ${tier.maxQuantity} Units` : `${tier.minQuantity}+ Units`}
                                                    </td>
                                                    <td className={`px-6 py-4 font-bold text-right ${tier.price === 'quote' ? 'text-primary' : isActive ? 'text-primary' : 'text-slate-900 dark:text-white'}`}>
                                                        {tier.price === 'quote' ? 'Request Quote' : `₦${tier.price.toLocaleString()}`}
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* Price Breakdown */}
                        <div className="bg-slate-50 dark:bg-slate-900 p-6 rounded-sm border border-slate-200 dark:border-slate-800 space-y-3">
                            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Breakdown Quote</h3>
                            <div className="flex justify-between text-sm">
                                <span className="text-slate-500">Selected Quantity</span>
                                <span className="font-bold text-slate-900 dark:text-white">{quantity} Units</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-slate-500">Unit Price</span>
                                <span className="font-bold text-slate-900 dark:text-white">
                                    {currentTier?.price === 'quote' ? 'Request Quote' : `₦${unitPrice.toLocaleString()}`}
                                </span>
                            </div>
                            {savings > 0 && (
                                <div className="flex justify-between text-sm text-green-600">
                                    <span>Bulk Discount Applied</span>
                                    <span className="font-bold">-₦{savings.toLocaleString()}</span>
                                </div>
                            )}
                            <div className="pt-3 border-t border-slate-200 dark:border-slate-700 flex justify-between items-baseline">
                                <span className="text-base font-bold text-slate-900 dark:text-white">Estimated Total</span>
                                <span className="text-2xl font-black text-primary">
                                    {currentTier?.price === 'quote' ? 'TBA' : `₦${totalPrice.toLocaleString()}`}
                                </span>
                            </div>
                        </div>

                        <div className="flex flex-col gap-4 pt-4">
                            <div className="flex items-center gap-4">
                                <div className="flex items-center border border-slate-300 dark:border-slate-700 rounded-sm h-14 bg-white dark:bg-slate-900">
                                    <button
                                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                        className="px-4 text-slate-500 hover:text-primary transition-colors text-lg"
                                    >-</button>
                                    <input
                                        className="w-12 text-center bg-transparent border-none focus:ring-0 text-lg font-bold text-slate-900 dark:text-white"
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
                                    onClick={handleAddToCart}
                                    className="flex-1 bg-primary hover:bg-primary/90 text-white font-bold h-14 rounded-sm shadow-lg shadow-primary/25 transition-all flex items-center justify-center gap-3 active:scale-[0.98]"
                                >
                                    <ShoppingCart size={20} />
                                    Add to Cart
                                </button>
                                <button
                                    onClick={() => router.push('/marketplace/cart')}
                                    className="px-6 border-2 border-primary text-primary hover:bg-primary/5 font-bold h-14 rounded-sm transition-all flex items-center justify-center active:scale-[0.98]"
                                >
                                    Checkout
                                </button>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <button
                                    onClick={() => router.push('/contact?type=quote')}
                                    className="w-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold py-4 rounded-sm hover:opacity-90 transition-all active:scale-[0.98]"
                                >
                                    Bulk Quote
                                </button>
                                <button
                                    onClick={() => toggleItem({
                                        id: product.id,
                                        productId: product.id,
                                        name: product.name,
                                        brand: product.brand,
                                        price: unitPrice || product.price,
                                        image: product.images[0]
                                    })}
                                    className={`w-full border font-bold py-4 rounded-sm transition-all flex items-center justify-center gap-2 active:scale-[0.98] ${isInWishlist(product.id) ? 'bg-red-50 border-red-200 text-red-600' : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'}`}
                                >
                                    <Heart size={18} fill={isInWishlist(product.id) ? "currentColor" : "none"} />
                                    Wishlist
                                </button>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 text-xs font-semibold text-slate-500 dark:text-slate-400">
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
                        <div className="border-b border-slate-200 dark:border-slate-800 mb-8 overflow-x-auto no-scrollbar">
                            <nav className="flex space-x-8 min-w-max">
                                <button
                                    onClick={() => setActiveTab('specs')}
                                    className={`border-b-2 py-4 text-sm font-bold transition-all ${activeTab === 'specs' ? 'border-primary text-primary' : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'}`}
                                >
                                    Specifications
                                </button>
                                <button
                                    onClick={() => setActiveTab('downloads')}
                                    className={`border-b-2 py-4 text-sm font-bold transition-all flex items-center gap-2 ${activeTab === 'downloads' ? 'border-primary text-primary' : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'}`}
                                >
                                    Downloads <span className="bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-full text-[10px]">{product.documents?.length || 0}</span>
                                </button>
                                <button
                                    onClick={() => setActiveTab('details')}
                                    className={`border-b-2 py-4 text-sm font-bold transition-all ${activeTab === 'details' ? 'border-primary text-primary' : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'}`}
                                >
                                    Details
                                </button>
                                {product.video && (
                                    <button
                                        onClick={() => setActiveTab('video')}
                                        className={`border-b-2 py-4 text-sm font-bold transition-all ${activeTab === 'video' ? 'border-primary text-primary' : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'}`}
                                    >
                                        Video Demo
                                    </button>
                                )}
                                {product.howToSteps?.length > 0 && (
                                    <button
                                        onClick={() => setActiveTab('howto')}
                                        className={`border-b-2 py-4 text-sm font-bold transition-all ${activeTab === 'howto' ? 'border-primary text-primary' : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'}`}
                                    >
                                        How to Use
                                    </button>
                                )}
                                <button
                                    onClick={() => setActiveTab('quote')}
                                    className={`border-b-2 py-4 text-sm font-bold transition-all ${activeTab === 'quote' ? 'border-primary text-primary' : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'}`}
                                >
                                    Quote
                                </button>
                            </nav>
                        </div>

                        {/* Tab Content */}
                        <div className="space-y-12">
                            {activeTab === 'specs' && (
                                <section className="space-y-6 animate-in fade-in duration-300">
                                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Technical Specifications</h3>
                                    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-sm overflow-hidden shadow-sm">
                                        <table className="w-full text-sm text-left">
                                            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                                                {Object.entries(product.specifications || {}).map(([key, value]) => (
                                                    <tr key={key}>
                                                        <td className="px-6 py-4 font-bold text-slate-500 dark:text-slate-400 w-1/3 bg-slate-50/50 dark:bg-slate-800/30">{key}</td>
                                                        <td className="px-6 py-4 text-slate-900 dark:text-white font-medium">{value as string}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </section>
                            )}

                            {activeTab === 'downloads' && (
                                <section className="space-y-6 animate-in fade-in duration-300">
                                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white">SDKs & Documentation</h3>
                                    <div className="grid gap-4">
                                        {product.documents?.map((doc: any, i: number) => (
                                            <div key={i} className="flex items-center justify-between p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl hover:border-primary transition-all cursor-pointer group shadow-sm">
                                                <div className="flex items-center gap-4">
                                                    <div className={`p-3 rounded-sm ${doc.type === 'sdk' ? 'bg-primary/10 text-primary' : 'bg-slate-100 dark:bg-slate-800 text-slate-600'}`}>
                                                        {doc.type === 'sdk' ? <Grid size={24} /> : <FileText size={24} />}
                                                    </div>
                                                    <div>
                                                        <p className="font-bold text-slate-900 dark:text-white group-hover:text-primary transition-colors">{doc.name}</p>
                                                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-medium">{doc.size} • {doc.date}</p>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-4">
                                                    <span className="text-xs text-slate-400 hidden sm:block">{doc.downloads} Downloads</span>
                                                    <div className="p-2 text-slate-400 group-hover:text-primary transition-colors"><Download size={20} /></div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </section>
                            )}

                            {activeTab === 'details' && (
                                <section className="space-y-8 animate-in fade-in duration-300">
                                    <div className="space-y-6">
                                        <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Product Overview</h3>
                                        <div className="prose prose-slate dark:prose-invert max-w-none">
                                            <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-lg">{product.longDescription || product.description}</p>
                                        </div>
                                    </div>
                                </section>
                            )}

                            {activeTab === 'video' && product.video && (
                                <section className="space-y-6 animate-in fade-in duration-300">
                                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Product Action video</h3>
                                    <div className="aspect-video rounded-3xl overflow-hidden bg-black shadow-2xl">
                                        <iframe
                                            src={product.video.url || ''}
                                            className="w-full h-full"
                                            title="Product Video"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            allowFullScreen
                                        ></iframe>
                                    </div>
                                </section>
                            )}

                            {activeTab === 'howto' && product.howToSteps?.length > 0 && (
                                <section className="space-y-6 animate-in fade-in duration-300">
                                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white">How to Use</h3>
                                    <div className="space-y-8 relative">
                                        <div className="absolute left-[19px] top-6 bottom-6 w-0.5 bg-slate-100 dark:bg-slate-800"></div>
                                        {product.howToSteps.map((step: any, idx: number) => (
                                            <div key={idx} className="flex gap-6 relative">
                                                <div className="size-10 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm shadow-lg shadow-primary/20 shrink-0 z-10">
                                                    {idx + 1}
                                                </div>
                                                <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm flex-1">
                                                    <h4 className="font-bold text-lg text-slate-900 dark:text-white mb-2">{step.title}</h4>
                                                    <p className="text-slate-500 dark:text-slate-400 leading-relaxed">{step.description}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </section>
                            )}
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="lg:col-span-4 space-y-8">
                        <div className="bg-white dark:bg-slate-900/40 rounded-sm p-6 border border-slate-200 dark:border-slate-800 sticky top-28">
                            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6">Compatible Hardware</h3>
                            <div className="space-y-6">
                                {product.relatedProducts?.map((related: any) => (
                                    <Link key={related.id} href={`/marketplace/product/${related.id}`} className="flex gap-4 group">
                                        <div className="w-20 h-20 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden shrink-0 flex items-center justify-center p-2 group-hover:scale-95 transition-transform">
                                            <img src={related.image} alt={related.name} className="max-w-full max-h-full object-contain" />
                                        </div>
                                        <div className="flex-1">
                                            <h4 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-primary transition-colors line-clamp-1">{related.name}</h4>
                                            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{related.brand}</p>
                                            <p className="text-sm font-bold text-slate-900 dark:text-white mt-2">₦{related.price.toLocaleString()}</p>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                            <button className="w-full mt-8 py-3 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-bold hover:bg-white dark:hover:bg-slate-800 transition-all text-slate-600 dark:text-slate-300">
                                View All Compatibility
                            </button>

                            <div className="mt-8 bg-linear-to-br from-primary to-primary-dark rounded-sm p-6 text-white shadow-xl shadow-primary/20">
                                <Headset className="mb-4" size={32} />
                                <h3 className="text-lg font-bold mb-2">Need a custom solution?</h3>
                                <p className="text-sm text-blue-100 mb-6">Our hardware specialists can help you integrate NFC technology into your existing systems.</p>
                                <button
                                    onClick={() => router.push('/contact')}
                                    className="bg-white text-primary px-4 py-3 rounded-sm font-bold text-sm w-full hover:bg-blue-50 transition-colors shadow-lg"
                                >
                                    Book a Consultation
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            {/* Footer */}
            <footer className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 py-12 mt-20">
                <div className="max-w-[1400px] mx-auto px-4 md:px-8">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
                        <div className="col-span-2">
                            <div className="flex items-center gap-2 mb-6">
                                <div className="bg-primary p-2 rounded-sm text-white">
                                    <Grid size={24} />
                                </div>
                                <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">ElizTap</span>
                            </div>
                            <p className="text-slate-500 dark:text-slate-400 text-sm max-w-xs">
                                The leading marketplace for secure access hardware, NFC readers, and enterprise connectivity solutions.
                            </p>
                        </div>
                        <div>
                            <h4 className="font-bold text-sm mb-6 uppercase tracking-wider text-slate-900 dark:text-white">Shop</h4>
                            <ul className="space-y-4 text-sm text-slate-600 dark:text-slate-400">
                                <li><Link href="/marketplace" className="hover:text-primary transition-colors">All Products</Link></li>
                                <li><Link href="/marketplace?cat=NFC Readers" className="hover:text-primary transition-colors">NFC Readers</Link></li>
                                <li><Link href="/marketplace?cat=Smart Cards" className="hover:text-primary transition-colors">Smart Cards</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-bold text-sm mb-6 uppercase tracking-wider text-slate-900 dark:text-white">Support</h4>
                            <ul className="space-y-4 text-sm text-slate-600 dark:text-slate-400">
                                <li><Link href="/contact" className="hover:text-primary transition-colors">Contact Us</Link></li>
                                <li><Link href="/faq" className="hover:text-primary transition-colors">Knowledge Base</Link></li>
                                <li><Link href="/contact" className="hover:text-primary transition-colors">Bulk Orders</Link></li>
                            </ul>
                        </div>
                    </div>
                    <div className="pt-8 border-t border-slate-100 dark:border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500 dark:text-slate-400">
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
