import Link from 'next/link';
import React from 'react';

export default function Hero() {
    return (
        <section className="relative pt-32 pb-24 overflow-hidden bg-white min-h-screen flex flex-col items-center">
            {/* Ambient Gradients */}
            <div className="absolute top-20 left-10 w-96 h-96 bg-primary/5 rounded-full blur-[100px] pointer-events-none"></div>
            <div className="absolute bottom-20 right-10 w-80 h-80 bg-blue-500/5 rounded-full blur-[80px] pointer-events-none"></div>

            {/* Decorative Fading Grid Lines */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.03]" style={{
                backgroundImage: `linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)`,
                backgroundSize: '40px 40px',
                maskImage: 'linear-gradient(to right, black 20%, transparent 80%)',
                WebkitMaskImage: 'linear-gradient(to right, black 20%, transparent 80%)'
            }}></div>

            <div className="container mx-auto px-8 md:px-16 lg:px-20 max-w-7xl z-10 relative">
                {/* Top Section: Split Layout (Text & Video) */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-24 overflow-hidden">
                    {/* Left Column: Content */}
                    <div className="text-left space-y-8 animate-in fade-in slide-in-from-left-32 duration-1000">
                        <h1 className="font-display font-black text-4xl md:text-5xl lg:text-6xl leading-[1.1] text-text-main tracking-tight">
                            Collect Customer Details <br />
                            <span className="text-gradient">Fast & Simple</span>
                        </h1>

                        <p className="text-base md:text-lg text-text-secondary max-w-xl font-medium leading-relaxed">
                            7 out of 10 customers don't buy on first visit. Instantly collect customer numbers and details with a simple tap, and see everything on your phone.
                        </p>

                        <div className="pt-4">
                            <Link href="/get-started" className="inline-block bg-primary hover:bg-primary-hover text-white font-bold px-10 py-4 rounded-2xl transition-all transform hover:scale-105 shadow-xl shadow-primary/25 text-lg cursor-pointer">
                                Get Started
                            </Link>
                        </div>
                    </div>

                    {/* Right Column: Video Showcase (Portrait Refined) */}
                    <div className="relative animate-in fade-in slide-in-from-right-32 duration-1000 delay-200 flex justify-center lg:justify-end">
                        <div className="relative w-full max-w-[320px] p-3 bg-gray-50/50 rounded-[2.5rem] border border-gray-100 shadow-sm">
                            <div className="relative aspect-[9/16] bg-gray-900 rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-gray-900">
                                <video
                                    autoPlay
                                    loop
                                    muted
                                    playsInline
                                    className="w-full h-full object-cover opacity-90 hover:opacity-100 transition-opacity duration-700"
                                >
                                    <source src="/assets/videos/ElizTap_Video.mp4" type="video/mp4" />
                                </video>
                                <div className="absolute inset-0 bg-linear-to-t from-black/20 via-transparent to-transparent pointer-events-none"></div>
                            </div>
                        </div>

                        {/* 5000+ Ratings Badge overlaying video */}
                        <div className="absolute -bottom-5 -right-2 bg-white/95 backdrop-blur-md px-5 py-3 rounded-xl shadow-xl border border-gray-100 hidden sm:block z-20">
                            <p className="text-[9px] font-black uppercase tracking-widest text-[#1A2E1A]/40 mb-1">5000+ RATINGS</p>
                            <p className="text-[11px] font-black text-[#1A2E1A]">Top Rated Solution</p>
                        </div>
                    </div>
                </div>

                {/* Bottom Section: Dashboard Mockup (Moved below) */}
                <div className="max-w-5xl mx-auto animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-500">
                    <div className="relative group">
                        <div className="absolute -inset-1 bg-linear-to-r from-primary/20 to-blue-400/20 rounded-[2.5rem] blur-2xl opacity-20 animate-pulse"></div>
                        <div className="relative bg-white rounded-4xl shadow-[0_40px_100px_-20px_rgba(0,0,0,0.15)] overflow-hidden border border-gray-100">
                            {/* Browser Header */}
                            <div className="bg-gray-50/80 border-b border-gray-100 px-6 py-4 flex items-center gap-4">
                                <div className="flex gap-2">
                                    <div className="size-2.5 rounded-full bg-red-400/60"></div>
                                    <div className="size-2.5 rounded-full bg-yellow-400/60"></div>
                                    <div className="size-2.5 rounded-full bg-green-400/60"></div>
                                </div>
                                <div className="bg-white px-4 py-1 rounded-lg text-[10px] text-gray-400 font-bold flex-1 text-center max-w-[280px] mx-auto border border-gray-100 uppercase tracking-widest">
                                    app.vemtap.io/dashboard
                                </div>
                            </div>

                            <div className="grid grid-cols-12 min-h-[500px]">
                                {/* Sidebar Mockup */}
                                <div className="col-span-3 bg-gray-50/50 border-r border-gray-100 p-8 hidden md:block">
                                    <div className="flex items-center gap-3 mb-10">
                                        <div className="size-10 rounded-xl bg-primary flex items-center justify-center text-white text-xs font-black shadow-lg shadow-primary/20">VT</div>
                                        <div className="font-display font-black text-text-main text-sm">VemTap</div>
                                    </div>
                                    <div className="space-y-3 text-left">
                                        <div className="flex items-center gap-3 px-4 py-2.5 text-primary bg-primary/5 rounded-xl text-xs font-bold uppercase tracking-wider">
                                            <span className="material-icons-round text-lg">dashboard</span> Dashboard
                                        </div>
                                        {['Customers', 'Analytics', 'Settings', 'Support'].map((item, i) => (
                                            <div key={i} className="flex items-center gap-3 px-4 py-2.5 text-text-secondary hover:bg-gray-50 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-colors cursor-pointer opacity-60">
                                                <span className="material-icons-round text-sm opacity-30">circle</span> {item}
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Main Content Mockup */}
                                <div className="col-span-12 md:col-span-9 p-8 md:p-12 text-left">
                                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10 gap-4">
                                        <div>
                                            <h3 className="text-2xl font-display font-black text-text-main">Visitor Insights</h3>
                                            <p className="text-xs text-text-secondary mt-1 font-medium">Real-time engagement tracking</p>
                                        </div>
                                        <div className="bg-primary/5 px-4 py-2 rounded-xl flex items-center gap-3 border border-primary/10">
                                            <div className="size-2 rounded-full bg-green-500 animate-pulse"></div>
                                            <span className="text-[10px] font-black text-primary uppercase tracking-widest">Live Updates</span>
                                        </div>
                                    </div>

                                    {/* Stats Interior */}
                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
                                        {[
                                            { l: 'Total Scans', v: '2,845', c: '+12%', up: true },
                                            { l: 'Conversion', v: '64.2%', c: '+5.4%', up: true },
                                            { l: 'Returning', v: '18.5%', c: '+2.1%', up: true }
                                        ].map((s, i) => (
                                            <div key={i} className="p-6 rounded-2xl border border-gray-50 bg-white shadow-sm hover:shadow-md transition-shadow duration-300">
                                                <p className="text-[10px] font-black uppercase tracking-widest text-text-secondary mb-2">{s.l}</p>
                                                <div className="flex items-end justify-between">
                                                    <h4 className="text-2xl font-display font-black text-text-main">{s.v}</h4>
                                                    <span className={`text-[10px] font-black ${s.up ? 'text-green-500' : 'text-primary'}`}>{s.c}</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Recent Activity Mini Table */}
                                    <div className="rounded-2xl border border-gray-50 overflow-hidden bg-white">
                                        <div className="divide-y divide-gray-50">
                                            {[
                                                { n: 'Robert Fox', s: 'NFC Plate 01', t: 'Just now', i: 'RF', bg: 'bg-blue-50', text: 'text-blue-600' },
                                                { n: 'Sarah Chen', s: 'QR Fallback', t: '5m ago', i: 'SC', bg: 'bg-primary/10', text: 'text-primary' },
                                                { n: 'Marcus Bell', s: 'NFC Plate 04', t: '12m ago', i: 'MB', bg: 'bg-green-50', text: 'text-green-600' }
                                            ].map((row, i) => (
                                                <div key={i} className="px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
                                                    <div className="flex items-center gap-4">
                                                        <div className={`size-10 rounded-full ${row.bg} ${row.text} flex items-center justify-center text-[10px] font-black shrink-0`}>{row.i}</div>
                                                        <div className="flex flex-col text-left">
                                                            <div className="text-xs font-bold text-text-main leading-none mb-1">{row.n}</div>
                                                            <div className="text-[10px] text-text-secondary">{row.s}</div>
                                                        </div>
                                                    </div>
                                                    <div className="text-[10px] font-black text-gray-400 tracking-tighter">{row.t}</div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
