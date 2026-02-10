'use client';

import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';
import {
    Palette, Shield, Globe, Layers,
    Briefcase, Zap, CheckCircle2, ArrowRight,
    Star, Database, Smartphone, Users,
    Award, ShieldCheck, Lock
} from 'lucide-react';

export default function WhiteLabelSolutionPage() {
    return (
        <div className="min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-primary/20">
            <Navbar />

            <main className="pt-32">
                {/* HERO SECTION */}
                <section className="relative py-32 overflow-hidden flex flex-col items-center">
                    <div className="absolute top-20 left-10 w-96 h-96 bg-primary/10 rounded-full blur-[100px] pointer-events-none"></div>
                    <div className="absolute bottom-20 right-10 w-80 h-80 bg-blue-500/10 rounded-full blur-[80px] pointer-events-none"></div>

                    <div className="container mx-auto px-6 text-center z-10 relative">
                        <span className="inline-block py-2 px-6 rounded-full bg-slate-900/5 text-slate-900 text-[10px] font-black uppercase tracking-[0.3em] mb-10 border border-slate-200">
                            Elite Partnership Program
                        </span>
                        <h1 className="font-display font-bold text-5xl md:text-8xl leading-[1.05] text-slate-900 max-w-5xl mx-auto mb-8 tracking-tight">
                            Your Brand, <br />
                            <span className="text-primary italic">Our Technology.</span>
                        </h1>

                        <p className="text-lg md:text-xl text-slate-500 max-w-3xl mx-auto mb-16 leading-relaxed font-medium">
                            Scale your business identity with ElizTap's white-label infrastructure. Remove all traces of our name and provide your clients with a seamless, proprietary NFC ecosystem.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                            <Link href="/get-started" className="h-16 px-12 bg-slate-900 text-white font-bold rounded-2xl transition-all transform hover:scale-105 shadow-2xl shadow-slate-900/20 text-sm uppercase tracking-widest flex items-center gap-3">
                                Apply for Sovereignty
                                <ArrowRight size={20} />
                            </Link>
                            <Link href="/whitepaper" className="h-16 px-12 bg-white text-slate-600 font-bold rounded-2xl border border-slate-200 hover:bg-white hover:border-slate-400 transition-all text-sm uppercase tracking-widest flex items-center gap-3">
                                Read Whitepaper
                            </Link>
                        </div>
                    </div>
                </section>

                {/* THE PILLARS SECTION */}
                <section className="py-32 px-6 bg-white border-y border-slate-100">
                    <div className="max-w-7xl mx-auto">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
                            <div className="space-y-12">
                                <div className="space-y-6">
                                    <h2 className="text-4xl md:text-6xl font-display font-bold tracking-tight">Complete Brand Autonomy.</h2>
                                    <p className="text-lg text-slate-500 font-medium leading-relaxed">
                                        We provide the plumbing; you provide the paint. Our white-label solution is built for agencies and enterprises that want to own the customer relationship 100%.
                                    </p>
                                </div>

                                <div className="space-y-8">
                                    {[
                                        {
                                            icon: Globe,
                                            title: "Custom Domain Mapping",
                                            desc: "Direct your clients to a dashboard hosted on your own domain (e.g., dashboard.yourbrand.com)."
                                        },
                                        {
                                            icon: Palette,
                                            title: "Full Aesthetics Control",
                                            desc: "Adjust logos, primary colors, and UI elements to match your brand style guide perfectly."
                                        },
                                        {
                                            icon: Lock,
                                            title: "Invisible Infrastructure",
                                            desc: "No 'Powered by ElizTap' links. Your clients never know we exist."
                                        }
                                    ].map((pillar, i) => (
                                        <div key={i} className="flex gap-6 p-6 rounded-3xl hover:bg-slate-50 transition-colors group">
                                            <div className="size-14 bg-slate-900 text-white rounded-2xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                                                <pillar.icon size={28} />
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-xl text-slate-900 mb-2">{pillar.title}</h4>
                                                <p className="text-sm text-slate-500 font-medium leading-relaxed">{pillar.desc}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="relative group">
                                <div className="absolute -inset-4 bg-primary/20 blur-[100px] opacity-20 -z-10 group-hover:opacity-40 transition-opacity"></div>
                                <div className="bg-slate-900 rounded-[3rem] p-10 md:p-16 text-white shadow-2xl relative overflow-hidden">
                                    <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full translate-x-32 -translate-y-32 blur-3xl"></div>

                                    <div className="space-y-10 relative z-10">
                                        <div className="flex items-center gap-4">
                                            <div className="size-12 bg-white/10 rounded-xl flex items-center justify-center">
                                                <Layers size={24} className="text-primary" />
                                            </div>
                                            <h3 className="text-2xl font-display font-bold">Reseller Dashboard</h3>
                                        </div>

                                        <div className="space-y-6">
                                            <div className="p-6 bg-white/5 rounded-2xl border border-white/10 space-y-4">
                                                <div className="flex justify-between items-center text-xs font-black uppercase tracking-widest text-slate-400">
                                                    <span>Active Merchants</span>
                                                    <span>42 Units</span>
                                                </div>
                                                <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                                                    <div className="h-full bg-primary w-[75%] rounded-full"></div>
                                                </div>
                                            </div>
                                            <div className="p-6 bg-white/5 rounded-2xl border border-white/10 space-y-4">
                                                <div className="flex justify-between items-center text-xs font-black uppercase tracking-widest text-slate-400">
                                                    <span>Revenue Share</span>
                                                    <span>Premium Tier</span>
                                                </div>
                                                <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                                                    <div className="h-full bg-blue-500 w-[90%] rounded-full"></div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="pt-6">
                                            <p className="text-xs text-slate-400 font-medium leading-relaxed italic border-l-2 border-primary pl-4">
                                                "Moving to ElizTap's white-label infrastructure allowed us to launch our loyalty agency in under 2 weeks with a fully proprietary feel."
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* NO PRICING SECTION - BUT VALUE PROPOSITION */}
                <section className="py-32 px-6 bg-slate-50">
                    <div className="max-w-5xl mx-auto text-center space-y-16">
                        <div className="space-y-6">
                            <h2 className="text-3xl md:text-5xl font-display font-bold">Scaling Without Limits.</h2>
                            <p className="text-slate-500 max-w-2xl mx-auto font-medium">
                                Our partnership is built on volume and performance. We don't believe in one-size-fits-all pricing for our elite partners.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {[
                                { icon: Zap, title: "Wholesale Hardware", desc: "Access bulk pricing tiers for NFC plates and cards available only to partners." },
                                { icon: Database, title: "Isolation Control", desc: "Dedicated database instances ensuring your client data is never commingled." },
                                { icon: ShieldCheck, title: "SLA Guarantee", desc: "Uptime and response time guarantees backed by professional service agreements." }
                            ].map((feature, i) => (
                                <div key={i} className="p-10 bg-white rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl transition-all">
                                    <div className="size-16 bg-slate-50 text-primary rounded-2xl flex items-center justify-center mx-auto mb-8">
                                        <feature.icon size={32} />
                                    </div>
                                    <h4 className="font-bold text-lg mb-4">{feature.title}</h4>
                                    <p className="text-sm text-slate-500 font-medium leading-relaxed">{feature.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* CTA SECTION */}
                <section className="py-48 px-6 bg-slate-900 relative overflow-hidden">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-primary/10 rounded-full blur-[200px] pointer-events-none"></div>

                    <div className="max-w-4xl mx-auto text-center relative z-10 space-y-12">
                        <div className="size-24 bg-white/10 text-primary rounded-4xl flex items-center justify-center mx-auto mb-8">
                            <Award size={48} />
                        </div>
                        <h2 className="text-4xl md:text-7xl font-display font-bold text-white tracking-tight leading-tight">Your Empire Starts Here.</h2>
                        <p className="text-xl text-slate-400 font-medium max-w-2xl mx-auto leading-relaxed">
                            Bypass months of R&D and hundreds of thousands in development costs. Leverage our stack and build your vision today.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                            <Link href="/get-started" className="h-16 px-16 bg-primary hover:bg-primary-hover text-white font-black uppercase tracking-widest text-xs rounded-2xl transition-all shadow-2xl shadow-primary/30">
                                Request Partnership Access
                            </Link>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}
