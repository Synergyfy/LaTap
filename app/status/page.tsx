import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export default function StatusPage() {
    const systems = [
        { name: 'NFC Response API', status: 'Operational', uptime: '99.99%', load: '12ms' },
        { name: 'Dashboard Web App', status: 'Operational', uptime: '99.95%', load: '142ms' },
        { name: 'Real-time Analytics Engine', status: 'Operational', uptime: '99.98%', load: '45ms' },
        { name: 'NFC Hardware Sync', status: 'Operational', uptime: '100%', load: '8ms' },
        { name: 'Email & Notification Service', status: 'Operational', uptime: '99.90%', load: '1.2s' },
        { name: 'CRM Webhook Delivery', status: 'Degraded Performance', statusColor: 'amber', uptime: '98.50%', load: '4.5s' },
    ];

    const incidents = [
        { date: 'Jan 28, 2026', title: 'Scheduled Database Maintenance', desc: 'Successfully completed with zero downtime.', type: 'Success' },
        { date: 'Jan 22, 2026', title: 'Increased Latency in EU-West Region', desc: 'Resolved within 15 minutes by scaling compute resources.', type: 'Resolved' },
    ];

    return (
        <div className="min-h-screen bg-white">
            <Navbar />
            <main className="pt-48 pb-24 px-4 sm:px-6 lg:px-8">
                <div className="max-w-5xl mx-auto">
                    {/* Status Overview */}
                    <div className="bg-emerald-50 border border-emerald-100 p-8 md:p-12 rounded-[2.5rem] mb-16 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-8">
                            <span className="material-icons-round text-emerald-500 text-7xl opacity-10">check_circle</span>
                        </div>
                        <div className="text-center md:text-left relative z-10">
                            <h1 className="text-3xl md:text-4xl font-display font-bold text-emerald-900 mb-2">All Systems Operational</h1>
                            <p className="text-emerald-700 font-medium">Verified by distributed monitoring across 12 global regions.</p>
                        </div>
                        <div className="flex flex-col items-center md:items-end gap-2 relative z-10">
                            <div className="flex items-center gap-2">
                                <div className="size-3 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.5)]"></div>
                                <span className="font-black text-[10px] uppercase tracking-widest text-emerald-600">Live Status</span>
                            </div>
                            <p className="text-emerald-900/40 text-[10px] font-bold">Refreshed every 60 seconds</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                        {/* Systems Grid */}
                        <div className="lg:col-span-8 space-y-8">
                            <h3 className="text-xl font-display font-bold text-text-main flex items-center gap-2">
                                <span className="material-icons-round text-primary">dns</span> System Component Status
                            </h3>
                            <div className="grid gap-4">
                                {systems.map((s, i) => (
                                    <div key={i} className="bg-white border border-gray-100 p-6 rounded-2xl flex items-center justify-between hover:shadow-lg transition-all group">
                                        <div className="space-y-1">
                                            <h4 className="font-bold text-text-main group-hover:text-primary transition-colors">{s.name}</h4>
                                            <div className="flex gap-4">
                                                <p className="text-[10px] font-bold text-text-secondary uppercase tracking-widest">Uptime: {s.uptime}</p>
                                                <p className="text-[10px] font-bold text-text-secondary uppercase tracking-widest">Load: {s.load}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className={`text-[10px] font-black uppercase tracking-widest ${s.statusColor === 'amber' ? 'text-amber-500' : 'text-emerald-500'}`}>
                                                {s.status}
                                            </span>
                                            <div className={`size-2 rounded-full ${s.statusColor === 'amber' ? 'bg-amber-500' : 'bg-emerald-500'}`}></div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Recent Incidents */}
                        <div className="lg:col-span-4 space-y-8">
                            <h3 className="text-xl font-display font-bold text-text-main flex items-center gap-2">
                                <span className="material-icons-round text-primary">history</span> Past Incidents
                            </h3>
                            <div className="space-y-6">
                                {incidents.map((inc, i) => (
                                    <div key={i} className="relative pl-8 border-l-2 border-gray-100 pb-2">
                                        <div className="absolute left-[-9px] top-0 size-4 bg-white border-2 border-gray-200 rounded-full flex items-center justify-center">
                                            <div className="size-1.5 bg-gray-200 rounded-full"></div>
                                        </div>
                                        <p className="text-[10px] font-black uppercase tracking-widest text-text-secondary mb-1">{inc.date}</p>
                                        <h5 className="font-bold text-sm text-text-main mb-2 leading-tight">{inc.title}</h5>
                                        <p className="text-xs text-text-secondary font-medium leading-relaxed">{inc.desc}</p>
                                        <div className="mt-3 inline-block bg-emerald-50 text-emerald-600 text-[8px] font-black px-2 py-0.5 rounded uppercase tracking-tighter">
                                            {inc.type}
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="p-6 rounded-2xl bg-gray-50 border border-gray-100">
                                <p className="text-xs text-text-secondary font-bold text-center">90-day Uptime Average</p>
                                <p className="text-3xl font-display font-bold text-text-main text-center mt-2">99.98%</p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
