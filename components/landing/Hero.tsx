import Link from 'next/link';

export default function Hero() {
    return (
        <section className="relative pt-48 pb-20 overflow-hidden bg-white min-h-[90vh] flex flex-col items-center">
            {/* Ambient Gradients */}
            <div className="absolute top-20 left-10 w-96 h-96 bg-primary/10 rounded-full blur-[100px] pointer-events-none"></div>
            <div className="absolute bottom-20 right-10 w-80 h-80 bg-blue-500/10 rounded-full blur-[80px] pointer-events-none"></div>

            {/* Decorative Fading Grid Lines */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.05]" style={{
                backgroundImage: `linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)`,
                backgroundSize: '40px 40px',
                maskImage: 'linear-gradient(to right, black 20%, transparent 80%)',
                WebkitMaskImage: 'linear-gradient(to right, black 20%, transparent 80%)'
            }}></div>

            <div className="container mx-auto px-4 text-center z-10 relative">
                <h1 className="font-display font-bold text-5xl md:text-7xl leading-[1.1] text-text-main max-w-4xl mx-auto mb-8 tracking-tight">
                    Capture Visitor Data <br />
                    <span className="text-gradient">Instantly & Seamlessly</span>
                </h1>

                <p className="text-lg md:text-xl text-text-secondary max-w-2xl mx-auto mb-10 leading-relaxed font-medium">
                    Replace paper forms with smart NFC technology. Instantly collect visitor details, deliver digital rewards, and sync with your CRM in real-time.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-24">
                    <Link href="/get-started" className="bg-primary hover:bg-primary-hover text-white font-bold px-10 py-4 rounded-full transition-all transform hover:scale-105 shadow-xl shadow-primary/25 text-lg cursor-pointer">
                        Start Free Trial
                    </Link>
                    <Link href="/login" className="flex items-center gap-2 bg-white text-text-main font-bold px-10 py-4 rounded-full border border-gray-200 hover:bg-gray-50 transition-all cursor-pointer">
                        Login to Dashboard
                    </Link>
                </div>

                {/* Desktop Dashboard Mockup */}
                <div className="relative max-w-5xl mx-auto group">
                    <div className="absolute -inset-1 bg-linear-to-r from-primary/30 to-blue-300/30 rounded-3xl blur opacity-20 animate-pulse"></div>
                    <div className="relative bg-white rounded-xl shadow-2xl overflow-hidden border border-gray-100">
                        {/* Browser Header */}
                        <div className="bg-gray-50/80 border-b border-gray-100 px-4 py-3 flex items-center gap-4">
                            <div className="flex gap-2">
                                <div className="size-2.5 rounded-full bg-red-400"></div>
                                <div className="size-2.5 rounded-full bg-yellow-400"></div>
                                <div className="size-2.5 rounded-full bg-green-400"></div>
                            </div>
                            <div className="bg-white px-3 py-1 rounded-md text-[10px] text-gray-400 font-bold flex-1 text-center max-w-[240px] mx-auto border border-gray-100 italic-none">
                                app.latap.io/dashboard
                            </div>
                        </div>

                        <div className="grid grid-cols-12 min-h-[500px]">
                            {/* Sidebar Mockup */}
                            <div className="col-span-3 bg-gray-50/50 border-r border-gray-100 p-8 hidden md:block">
                                <div className="flex items-center gap-3 mb-10">
                                    <div className="size-8 rounded-xl bg-primary flex items-center justify-center text-white text-xs font-black">EC</div>
                                    <div className="font-display font-bold text-text-main text-sm">Dashboard</div>
                                </div>
                                <div className="space-y-2 text-left">
                                    <div className="flex items-center gap-3 px-3 py-2 text-primary bg-primary/5 rounded-xl text-xs font-black uppercase tracking-wider">
                                        <span className="material-icons-round text-sm">dashboard</span> Overview
                                    </div>
                                    {['Visitors', 'NFC Hardware', 'Integrations', 'Reports'].map((item, i) => (
                                        <div key={i} className="flex items-center gap-3 px-3 py-2 text-text-secondary hover:bg-gray-50 rounded-xl text-[10px] font-black uppercase tracking-widest transition-colors cursor-pointer">
                                            <span className="material-icons-round text-xs opacity-50">circle</span> {item}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Main Content Mockup */}
                            <div className="col-span-12 md:col-span-9 p-6 md:p-12 text-left">
                                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10 gap-4">
                                    <div>
                                        <h3 className="text-xl font-display font-bold text-text-main">Visitor Analytics</h3>
                                    </div>
                                    <button className="bg-text-main text-white text-[10px] font-black uppercase tracking-widest px-4 py-2.5 rounded-xl whitespace-nowrap cursor-pointer">
                                        Export Reports
                                    </button>
                                </div>

                                {/* Stats Interior - Responsive Grid */}
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6 mb-10">
                                    {[
                                        { l: 'Total Scans', v: '2,845', c: '+12%', up: true },
                                        { l: 'Conversion', v: '64.2%', c: '+5.4%', up: true },
                                        { l: 'Avg. Time', v: '1m 20s', c: 'Stable', up: false }
                                    ].map((s, i) => (
                                        <div key={i} className="p-5 md:p-6 rounded-2xl border border-gray-50 bg-white shadow-sm">
                                            <p className="text-[10px] font-black uppercase tracking-widest text-text-secondary mb-2">{s.l}</p>
                                            <div className="flex items-end justify-between">
                                                <h4 className="text-xl md:text-2xl font-display font-bold text-text-main">{s.v}</h4>
                                                <span className={`text-[10px] font-black ${s.up ? 'text-green-500' : 'text-gray-400'}`}>{s.c}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Table Interior - Responsive */}
                                <div className="rounded-2xl border border-gray-50 overflow-hidden">
                                    <div className="bg-gray-50/50 px-4 md:px-6 py-4 border-b border-gray-50 flex text-[10px] font-black uppercase tracking-[0.2em] text-text-secondary">
                                        <div className="flex-1">Visitor</div>
                                        <div className="hidden sm:block w-1/4">Source</div>
                                        <div className="w-20 md:w-1/4 text-right">Time</div>
                                    </div>
                                    <div className="divide-y divide-gray-50">
                                        {[
                                            { n: 'Robert Fox', s: 'NFC Plate 01', t: '10:51 AM', i: 'RF' },
                                            { n: 'Sarah Chen', s: 'QR Fallback', t: '10:45 AM', i: 'SC' },
                                            { n: 'Marcus Bell', s: 'NFC Plate 04', t: '10:42 AM', i: 'MB' }
                                        ].map((row, i) => (
                                            <div key={i} className="px-4 md:px-6 py-4 flex items-center hover:bg-gray-50 transition-colors">
                                                <div className="flex-1 flex items-center gap-3">
                                                    <div className="size-8 md:size-9 rounded-full bg-primary/10 text-primary flex items-center justify-center text-[10px] font-black shrink-0">{row.i}</div>
                                                    <div className="text-xs font-bold text-text-main truncate">{row.n}</div>
                                                </div>
                                                <div className="hidden sm:block w-1/4 text-[10px] font-bold text-text-secondary uppercase">{row.s}</div>
                                                <div className="w-20 md:w-1/4 text-right text-[10px] font-bold text-gray-400 whitespace-nowrap">{row.t}</div>
                                            </div>
                                        ))}
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
