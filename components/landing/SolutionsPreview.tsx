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
                    <div className="group relative min-h-[400px] rounded-[2.5rem] bg-white p-8 md:p-12 flex flex-col justify-between transition-all duration-500 hover:shadow-2xl hover:-translate-y-1 border border-gray-100 shadow-lg">
                        <div className="flex items-start justify-between">
                            <div className="flex flex-col gap-6">
                                {/* Hand-drawn style icon placeholder */}
                                <div className="text-primary">
                                    <Smartphone size={40} md:size={48} strokeWidth={1.5} className="transform -rotate-6 group-hover:rotate-0 transition-transform duration-500" />
                                </div>
                            </div>
                        </div>

                        <div className="relative z-10 flex items-end justify-between gap-4">
                            <div className="flex-1">
                                <h3 className="text-3xl md:text-4xl font-display font-bold text-text-main leading-none mb-4">
                                    Enterprise <br /> Hardware
                                </h3>
                                <p className="text-text-secondary text-sm md:text-base font-medium leading-relaxed">
                                    Industrial-grade NFC plates & cards. Waterproof, durable, and instantly ready.
                                </p>
                            </div>

                            <Link href="/solutions/hardware" className="size-14 md:size-16 rounded-full bg-text-main text-white flex items-center justify-center hover:bg-black hover:scale-110 transition-all shadow-xl cursor-pointer shrink-0">
                                <ArrowRight size={20} md:size={24} />
                            </Link>
                        </div>
                    </div>

                    {/* Software Card - Premium Dark Theme */}
                    <div className="group relative min-h-[400px] rounded-[2.5rem] bg-gray-900 p-8 md:p-12 flex flex-col justify-between transition-all duration-500 hover:shadow-2xl hover:-translate-y-1 border border-gray-800 overflow-hidden">
                        {/* Subtle doodle effect background */}
                        <div className="absolute top-10 right-10 opacity-10">
                            <LayoutDashboard size={80} md:size={120} strokeWidth={0.5} className="text-white transform rotate-12" />
                        </div>

                        <div className="flex items-start justify-between relative z-10">
                            <div className="flex flex-col gap-6">
                                <div className="text-white">
                                    <LayoutDashboard size={40} md:size={48} strokeWidth={1.5} className="transform rotate-3 group-hover:rotate-0 transition-transform duration-500" />
                                </div>
                            </div>
                        </div>

                        <div className="relative z-10 flex items-end justify-between gap-4">
                            <div className="flex-1">
                                <h3 className="text-3xl md:text-4xl font-display font-bold text-white leading-none mb-4">
                                    Merchant <br /> Software
                                </h3>
                                <p className="text-gray-400 text-sm md:text-base font-medium leading-relaxed">
                                    Cloud dashboard to track visits, automate rewards, and engage customers.
                                </p>
                            </div>

                            <Link href="/solutions/software" className="size-14 md:size-16 rounded-full bg-primary text-white flex items-center justify-center hover:bg-primary-hover hover:scale-110 transition-all shadow-xl shadow-primary/30 cursor-pointer shrink-0">
                                <ArrowRight size={20} md:size={24} />
                            </Link>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
}
