'use client';

import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';
import {
    MessageSquare, Gift, LayoutDashboard, Share2,
    Smartphone, BarChart3, Database, Shield, Zap,
    ArrowRight, CheckCircle2, Cloud, Settings, Users2, Bell,
    Layers, Cpu, PieChart, Activity, Lock, Search
} from 'lucide-react';

export default function SoftwareSolutionPage() {
    return (
        <div className="min-h-screen bg-white font-sans text-text-main">
            <Navbar />

            <main className="relative">
                {/* HERO SECTION*/}
                <section className="relative pt-48 pb-24 overflow-hidden bg-white min-h-[85vh] flex flex-col items-center border-b border-gray-50">
                    {/* Ambient Gradients */}
                    <div className="absolute top-20 right-10 w-96 h-96 bg-primary/10 rounded-full blur-[100px] pointer-events-none"></div>
                    <div className="absolute bottom-20 left-10 w-80 h-80 bg-purple-500/10 rounded-full blur-[80px] pointer-events-none"></div>

                    {/* Decorative Fading Grid Lines */}
                    <div className="absolute inset-0 pointer-events-none opacity-[0.05]" style={{
                        backgroundImage: `linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)`,
                        backgroundSize: '40px 40px',
                        maskImage: 'linear-gradient(to right, black 20%, transparent 80%)',
                        WebkitMaskImage: 'linear-gradient(to right, black 20%, transparent 80%)'
                    }}></div>

                    <div className="container mx-auto px-4 text-center z-10 relative">
                        <div className="inline-flex items-center gap-2 px-6 py-2 bg-purple-50 text-purple-600 rounded-full text-[10px] font-black uppercase tracking-[0.25em] border border-purple-100/50 mb-8">
                            <Cloud size={14} />
                            Cloud-Native Enterprise Platform
                        </div>

                        <h1 className="font-display font-bold text-5xl md:text-8xl leading-[1.05] text-text-main max-w-5xl mx-auto mb-8 tracking-tight">
                            The Operating System for <br />
                            <span className="text-gradient">Merchant Growth</span>
                        </h1>

                        <p className="text-lg md:text-xl text-text-secondary max-w-3xl mx-auto mb-12 leading-relaxed font-medium">
                            Automate every touchpoint of your customer journey. From instant identification via NFC to personalized rewards and automated engagement across WhatsApp and SMS.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-24">
                            <Link href="/get-started" className="bg-primary hover:bg-primary-hover text-white font-bold px-12 py-5 rounded-full transition-all transform hover:scale-105 shadow-xl shadow-primary/25 text-sm uppercase tracking-widest cursor-pointer flex items-center gap-3">
                                Start Free Trial
                                <ArrowRight size={18} />
                            </Link>
                            <Link href="/login" className="flex items-center gap-2 bg-white text-text-main font-bold px-12 py-5 rounded-full border border-gray-200 hover:bg-gray-50 transition-all cursor-pointer text-sm uppercase tracking-widest">
                                Dashboard Login
                            </Link>
                        </div>

                        {/* Large Dashboard Visualization */}
                        <div className="relative max-w-5xl mx-auto group">
                            <div className="absolute -inset-1 bg-linear-to-r from-primary/30 to-purple-300/30 rounded-[3rem] blur opacity-20 animate-pulse"></div>
                            <div className="relative bg-white rounded-[2.5rem] shadow-2xl border border-gray-100 overflow-hidden">
                                {/* Browser Header */}
                                <div className="bg-gray-50/80 border-b border-gray-100 px-6 py-4 flex items-center gap-6">
                                    <div className="flex gap-2">
                                        <div className="size-3 rounded-full bg-red-400"></div>
                                        <div className="size-3 rounded-full bg-yellow-400"></div>
                                        <div className="size-3 rounded-full bg-green-400"></div>
                                    </div>
                                    <div className="bg-white px-4 py-1.5 rounded-lg text-[10px] text-gray-400 font-bold flex-1 text-center max-w-[300px] mx-auto border border-gray-100 uppercase tracking-widest">
                                        secure-analytics.elicztap.io/live
                                    </div>
                                </div>

                                <div className="grid grid-cols-12 min-h-[600px]">
                                    {/* Mock Sidebar */}
                                    <div className="col-span-3 bg-gray-50/30 border-r border-gray-100 p-10 hidden md:block space-y-12">
                                        <div className="flex items-center gap-3">
                                            <div className="size-10 rounded-2xl bg-primary flex items-center justify-center text-white text-xs font-black">EC</div>
                                            <div className="font-display font-bold text-text-main">Enterprise</div>
                                        </div>
                                        <div className="space-y-4 text-left">
                                            {['Insights', 'Visitors', 'Campaigns', 'Loyalty', 'Settings'].map((item, i) => (
                                                <div key={i} className={`flex items-center gap-4 px-4 py-3 rounded-xl text-xs font-black uppercase tracking-wider transition-colors ${i === 0 ? 'bg-primary/5 text-primary' : 'text-text-secondary hover:bg-gray-50'}`}>
                                                    <div className="size-1.5 rounded-full bg-current opacity-30"></div>
                                                    {item}
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Mock Main Content */}
                                    <div className="col-span-12 md:col-span-9 p-10 md:p-16 text-left space-y-16">
                                        <div className="flex flex-col sm:flex-row justify-between items-end gap-6">
                                            <div className="space-y-2">
                                                <h3 className="text-3xl font-display font-bold text-text-main tracking-tight">Real-time Intelligence</h3>
                                                <p className="text-sm text-text-secondary font-medium">Automatic identification and reward processing active.</p>
                                            </div>
                                            <div className="flex gap-2">
                                                <div className="px-4 py-2.5 bg-green-50 text-green-600 rounded-xl text-[10px] font-black uppercase tracking-widest border border-green-100 flex items-center gap-2">
                                                    <div className="size-2 rounded-full bg-green-500 animate-ping"></div>
                                                    Live Feed
                                                </div>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
                                            {[
                                                { label: 'Active Visitors Today', value: '1,248', color: 'text-primary' },
                                                { label: 'Points Distributed', value: '42.5K', color: 'text-purple-600' },
                                                { label: 'Campaign Conversion', value: '68%', color: 'text-blue-600' }
                                            ].map((stat, i) => (
                                                <div key={i} className="p-8 rounded-4xl border border-gray-50 bg-white shadow-sm space-y-4">
                                                    <p className="text-[10px] font-black uppercase tracking-widest text-text-secondary">{stat.label}</p>
                                                    <p className={`text-3xl font-display font-bold ${stat.color}`}>{stat.value}</p>
                                                </div>
                                            ))}
                                        </div>

                                        <div className="bg-gray-50 rounded-4xl border border-gray-100 p-8 space-y-6">
                                            <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-[0.2em] text-text-secondary">
                                                <span>System Load</span>
                                                <span className="text-primary">Healthy</span>
                                            </div>
                                            <div className="h-4 w-full bg-white rounded-full overflow-hidden border border-gray-100 p-1">
                                                <div className="h-full bg-primary rounded-full w-[14%]"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* THE SYSTEM FLOW SECTION - How everything works together */}
                <section className="py-32 px-4 bg-white border-b border-gray-50">
                    <div className="max-w-7xl mx-auto space-y-24">
                        <div className="text-center max-w-3xl mx-auto space-y-6">
                            <span className="text-primary font-black uppercase tracking-[0.2em] text-[10px]">Unified Merchant Workflow</span>
                            <h2 className="text-4xl md:text-6xl font-display font-bold tracking-tight text-text-main leading-tight">A single tap triggers a <br /> digital explosion.</h2>
                            <p className="text-lg text-text-secondary font-medium">Under the hood, our engine performs complex identification and automation cycles in less than 800ms.</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
                            {/* Connector visual (desktop) */}
                            <div className="hidden md:block absolute top-[52px] left-[20%] right-[20%] h-[2px] bg-linear-to-r from-transparent via-gray-100 to-transparent -z-10"></div>

                            {[
                                {
                                    title: 'Identification Handshake',
                                    desc: 'When an NFC tap occurs, our API validates the unique chip signature and identifies the visitor profile linked to your venue.',
                                    icon: Search,
                                    time: '120ms'
                                },
                                {
                                    title: 'Automation Engine',
                                    desc: 'Logic rules verify if the visitor is new or returning, calculating point balances and queuing outbound campaign messages.',
                                    icon: Zap,
                                    time: '240ms'
                                },
                                {
                                    title: 'Cloud Persistence',
                                    desc: 'The transaction is logged in our cloud ledger, syncing across your merchant dashboard and the customer digital ID instantly.',
                                    icon: Cloud,
                                    time: '420ms'
                                }
                            ].map((step, i) => (
                                <div key={i} className="bg-white p-12 rounded-4xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500 group text-center space-y-8">
                                    <div className="size-20 bg-primary/5 text-primary rounded-4xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
                                        <step.icon size={36} />
                                    </div>
                                    <div className="space-y-4">
                                        <h4 className="text-2xl font-display font-bold">{step.title}</h4>
                                        <p className="text-sm text-text-secondary leading-relaxed font-medium">{step.desc}</p>
                                    </div>
                                    <div className="pt-4 border-t border-gray-50 flex items-center justify-center gap-2">
                                        <span className="text-[10px] font-black uppercase tracking-widest text-text-secondary">Latency</span>
                                        <span className="text-xs font-bold text-primary">{step.time}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* CORE INFRASTRUCTURE DEEP DIVE - Heavy Content */}
                <section className="py-48 px-4 bg-gray-50/50">
                    <div className="max-w-7xl mx-auto space-y-48">

                        {/* messaging */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
                            <div className="space-y-10">
                                <span className="px-6 py-2 bg-blue-50 text-blue-600 rounded-full text-[10px] font-black uppercase tracking-widest border border-blue-100">Messaging Hub</span>
                                <h3 className="text-4xl md:text-7xl font-display font-bold tracking-tight leading-[1.1]">Omnichannel Outreach Engine</h3>
                                <p className="text-xl text-text-secondary font-medium leading-relaxed">
                                    Automate your marketing without the high cost of manual labor. Our software connects directly to WhatsApp, SMS, and Email gateways to send targeted, personalized content.
                                </p>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-4">
                                    <div className="space-y-4">
                                        <div className="size-10 bg-primary text-white rounded-xl flex items-center justify-center shadow-lg shadow-primary/20">
                                            <MessageSquare size={20} />
                                        </div>
                                        <h5 className="font-bold text-lg">Auto-Engagement</h5>
                                        <p className="text-sm text-text-secondary font-medium leading-relaxed">Welcome messages sent the moment they tap. Personalized with their name and visit history.</p>
                                    </div>
                                    <div className="space-y-4">
                                        <div className="size-10 bg-primary text-white rounded-xl flex items-center justify-center shadow-lg shadow-primary/20">
                                            <Bell size={20} />
                                        </div>
                                        <h5 className="font-bold text-lg">Smart Triggers</h5>
                                        <p className="text-sm text-text-secondary font-medium leading-relaxed">Birthday rewards, inactive customer reminders, and event announcements sent automatically.</p>
                                    </div>
                                </div>
                            </div>
                            <div className="relative">
                                <div className="absolute inset-0 bg-primary/5 rounded-3xl blur-[80px] -z-10 rotate-12"></div>
                                <div className="bg-white p-12 rounded-[3.5rem] shadow-2xl border border-gray-100 space-y-8">
                                    <div className="p-10 bg-gray-50 rounded-[2.5rem] border border-gray-100 space-y-6">
                                        <p className="text-[10px] font-black uppercase tracking-widest text-text-secondary">Message Queuing Service</p>
                                        <div className="space-y-4">
                                            {[
                                                { label: 'WhatsApp API', v: 'Connected', c: 'text-green-500' },
                                                { label: 'SMS Gateway', v: 'Active', c: 'text-green-500' },
                                                { label: 'SMTP Server', v: 'Standby', c: 'text-blue-500' }
                                            ].map((s, i) => (
                                                <div key={i} className="flex justify-between items-center text-sm font-bold">
                                                    <span>{s.label}</span>
                                                    <span className={s.c}>{s.v}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Inventory & ERP */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-32 items-center">
                            <div className="relative order-2 lg:order-1">
                                <div className="bg-white p-12 rounded-[3.5rem] shadow-2xl border border-gray-100 grid grid-cols-2 gap-6 relative">
                                    <div className="absolute -top-10 -right-10 size-40 bg-emerald-500/10 rounded-full blur-3xl -z-10"></div>
                                    {[1, 2, 3, 4].map(i => (
                                        <div key={i} className="aspect-square bg-gray-50 rounded-2xl border border-gray-100 flex flex-col items-center justify-center gap-2 p-6">
                                            <Database className="text-emerald-500" size={24} />
                                            <div className="h-1.5 w-12 bg-gray-200 rounded-full"></div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="space-y-10 order-1 lg:order-2">
                                <span className="px-6 py-2 bg-emerald-50 text-emerald-600 rounded-full text-[10px] font-black uppercase tracking-widest border border-emerald-100">Supply Chain Control</span>
                                <h3 className="text-4xl md:text-7xl font-display font-bold tracking-tight leading-[1.1]">Merchant Inventory Management</h3>
                                <p className="text-xl text-text-secondary font-medium leading-relaxed">
                                    Our platform doesn't just manage data; it keeps track of your physical business assets. Manage stock of physical rewards, vouchers, and hardware devices across branches.
                                </p>
                                <ul className="space-y-5">
                                    {[
                                        'Real-time physical reward stock tracking',
                                        'Low-inventory automated alerts for hardware',
                                        'Centralized inventory across multiple business branches',
                                        'Reward redemption logs for audit trails'
                                    ].map((text, i) => (
                                        <li key={i} className="flex items-center gap-4 text-sm font-bold">
                                            <div className="size-6 bg-emerald-500 text-white rounded-full flex items-center justify-center shrink-0">
                                                <CheckCircle2 size={14} />
                                            </div>
                                            {text}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>

                {/* OPERATIONAL METRICS - Dashboard Proof */}
                <section className="py-48 px-4 bg-white overflow-hidden relative border-t border-gray-50">
                    <div className="max-w-7xl mx-auto space-y-24">
                        <div className="text-center max-w-3xl mx-auto space-y-6">
                            <h2 className="text-4xl md:text-6xl font-display font-bold tracking-tight text-text-main leading-tight">Architecture designed <br /> for high footfall venues.</h2>
                            <p className="text-lg text-text-secondary font-medium leading-relaxed">Scalable back-end that maintains peak performance even during your busiest holiday season.</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                            {[
                                { title: '99.9% SLW', desc: 'Enterprise-grade uptime service level commitment.', icon: Shield },
                                { title: '800ms Latency', desc: 'Average tap-to-message response time globally.', icon: Activity },
                                { title: 'NDPR Compliant', desc: 'Localized data hosting for Nigerian privacy laws.', icon: Lock },
                                { title: 'API Core', desc: 'Fully RESTful architecture for easy external syncing.', icon: PieChart }
                            ].map((item, i) => (
                                <div key={i} className="bg-white p-10 rounded-[3rem] border border-gray-100 shadow-sm hover:shadow-xl transition-all text-center space-y-6">
                                    <div className="size-14 bg-primary/5 text-primary rounded-2xl flex items-center justify-center mx-auto">
                                        <item.icon size={26} />
                                    </div>
                                    <div className="space-y-2">
                                        <h4 className="font-bold text-lg">{item.title}</h4>
                                        <p className="text-xs text-text-secondary font-medium leading-relaxed">{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* THE FINAL CALL TO ACTION */}
                <section className="py-24 px-4 bg-blue-200">
                    <div className="max-w-5xl mx-auto bg-text-main rounded-3xl p-12 md:p-24 text-center text-white space-y-12 relative overflow-hidden shadow-2xl">

                        <div className="space-y-6 relative z-10">
                            <h2 className="text-4xl md:text-8xl font-display font-bold leading-tight">Digitize your <br /> venue today.</h2>
                            <p className="text-xl text-white/60 font-medium max-w-2xl mx-auto leading-relaxed">
                                Experience the power of the Eliztap merchant ecosystem. No credit card required to start your enterprise trial.
                            </p>
                        </div>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 relative z-10 pt-6">
                            <Link
                                href="/get-started"
                                className="px-14 py-7 bg-primary text-white font-black uppercase tracking-widest text-[12px] rounded-full hover:bg-primary-hover shadow-2xl shadow-primary/30 transition-all flex items-center gap-4 active:scale-95 transform hover:scale-105"
                            >
                                Launch My Store Dashboard
                                <ArrowRight size={20} />
                            </Link>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}
