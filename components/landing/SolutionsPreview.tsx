import React from 'react';
import Link from 'next/link';
import { ArrowRight, Smartphone, LayoutDashboard } from 'lucide-react';

export default function SolutionsPreview() {
    return (
        <section className="py-24 bg-white">
            <div className="container mx-auto px-4">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <span className="text-primary font-bold tracking-widest text-xs uppercase mb-4 block">Our Ecosystem</span>
                    <h2 className="text-4xl md:text-5xl font-display font-bold text-text-main leading-tight mb-6">
                        Complete Offline-to-Online Solution
                    </h2>
                    <p className="text-lg text-text-secondary max-w-2xl mx-auto">
                        We provide both the physical touchpoints and the digital brain to power your customer loyalty.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-12 max-w-7xl mx-auto font-sans">
                    {/* Hardware Card - Clean Light Theme */}
                    <div className="group relative h-[450px] rounded-[2.5rem] bg-white p-12 flex flex-col justify-between transition-all duration-500 hover:shadow-2xl hover:-translate-y-1 border border-gray-100 shadow-lg">
                        <div className="flex items-start justify-between">
                            <div className="flex flex-col gap-6">
                                {/* Hand-drawn style icon placeholder */}
                                <div className="text-primary">
                                    <Smartphone size={48} strokeWidth={1.5} className="transform -rotate-6 group-hover:rotate-0 transition-transform duration-500" />
                                </div>
                            </div>
                        </div>

                        <div className="relative z-10 flex items-end justify-between">
                            <div className="max-w-[70%]">
                                <h3 className="text-4xl font-display font-bold text-text-main leading-none mb-4">
                                    Enterprise <br /> Hardware
                                </h3>
                                <p className="text-text-secondary text-base font-medium leading-relaxed">
                                    Industrial-grade NFC plates & cards. Waterproof, durable, and instantly ready.
                                </p>
                            </div>

                            <Link href="/solutions/hardware" className="size-16 rounded-full bg-text-main text-white flex items-center justify-center hover:bg-black hover:scale-110 transition-all shadow-xl cursor-pointer">
                                <ArrowRight size={24} />
                            </Link>
                        </div>
                    </div>

                    {/* Software Card - Premium Dark Theme */}
                    <div className="group relative h-[450px] rounded-[2.5rem] bg-gray-900 p-12 flex flex-col justify-between transition-all duration-500 hover:shadow-2xl hover:-translate-y-1 border border-gray-800 overflow-hidden">
                        {/* Subtle doodle effect background */}
                        <div className="absolute top-10 right-10 opacity-10">
                            <LayoutDashboard size={120} strokeWidth={0.5} className="text-white transform rotate-12" />
                        </div>

                        <div className="flex items-start justify-between relative z-10">
                            <div className="flex flex-col gap-6">
                                <div className="text-white">
                                    <LayoutDashboard size={48} strokeWidth={1.5} className="transform rotate-3 group-hover:rotate-0 transition-transform duration-500" />
                                </div>
                            </div>
                        </div>

                        <div className="relative z-10 flex items-end justify-between">
                            <div className="max-w-[70%]">
                                <h3 className="text-4xl font-display font-bold text-white leading-none mb-4">
                                    Merchant <br /> Software
                                </h3>
                                <p className="text-gray-400 text-base font-medium leading-relaxed">
                                    Cloud dashboard to track visits, automate rewards, and engage customers.
                                </p>
                            </div>

                            <Link href="/solutions/software" className="size-16 rounded-full bg-primary text-white flex items-center justify-center hover:bg-primary-hover hover:scale-110 transition-all shadow-xl shadow-primary/30 cursor-pointer">
                                <ArrowRight size={24} />
                            </Link>
                        </div>
                    </div>
                </div>

                {/* White-Label Banner */}
                <div className="mt-12 max-w-7xl mx-auto">
                    <Link href="/solutions/white-label" className="group flex flex-col md:flex-row items-center justify-between p-8 bg-gray-50 border border-gray-100 rounded-[2.5rem] hover:bg-gray-100 transition-all">
                        <div className="flex items-center gap-6 mb-4 md:mb-0">
                            <div className="size-12 bg-white rounded-xl shadow-sm border border-gray-100 flex items-center justify-center text-primary">
                                <span className="material-icons-round text-2xl">workspace_premium</span>
                            </div>
                            <div className="text-left">
                                <h4 className="text-xl font-bold text-text-main">Looking for a White-Label Partnership?</h4>
                                <p className="text-sm text-text-secondary font-medium">Build your own brand using our proven NFC infrastructure.</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2 text-primary font-bold text-sm uppercase tracking-widest group-hover:translate-x-2 transition-transform">
                            View Partner Program
                            <ArrowRight size={18} />
                        </div>
                    </Link>
                </div>
            </div>
        </section>
    );
}
