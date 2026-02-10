'use client';

import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import {
    Cpu, Shield, Zap, Palette, Printer,
    Download, ArrowRight, CheckCircle2,
    Layers, Globe, Smartphone, BarChart3,
    FileText, Mail, Phone, Info
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function HardwareWhitepaperPage() {
    const sections = [
        {
            title: "Premium NFC Infrastructure",
            desc: "Our hardware is built using industrial-grade NXP NTAG chips, ensuring 99.9% read reliability across all modern smartphones.",
            items: [
                "NXP NTAG213/215 Chipsets",
                "High-coercivity magnetic shielding",
                "UV-resistant protective coating",
                "Operating range: 0-5cm"
            ],
            icon: Cpu,
            color: "blue"
        },
        {
            title: "White-Label Sovereignty",
            desc: "Complete brand autonomy. Your clients never see 'ElizTap'—they only see your brand, your colors, and your ecosystem.",
            items: [
                "Custom CNAME (your-app.com)",
                "Branded Administration Panel",
                "Customized Success Flows",
                "Dedicated API Endpoints"
            ],
            icon: Layers,
            color: "purple"
        },
        {
            title: "Global Compliance",
            desc: "Security and privacy aren't afterthoughts. We build hardware that respects international data standards.",
            items: [
                "GDPR Ready Data Capture",
                "AES-128 Hardware Encryption",
                "Anti-cloning protection",
                "ISO 14443-A Standard"
            ],
            icon: Shield,
            color: "green"
        }
    ];

    const hardwarePricing = [
        {
            type: "NFC Smart Cards",
            startingAt: "Custom Quote",
            bestFor: "Membership & VIP loyalty",
            specs: "PVC / Metal / Wood",
            moq: "10 Units"
        },
        {
            type: "Digital Window Stickers",
            startingAt: "Custom Quote",
            bestFor: "Storefronts & Tables",
            specs: "3M Adhesive PET",
            moq: "20 Units"
        },
        {
            type: "Industrial NFC Plates",
            startingAt: "Custom Quote",
            bestFor: "Outdoor & High-Traffic",
            specs: "Laser-Engraved Steel",
            moq: "5 Units"
        }
    ];

    return (
        <div className="min-h-screen bg-slate-50 font-sans selection:bg-primary/10">
            <Navbar />

            <main className="pt-32 pb-24">
                <div className="max-w-5xl mx-auto px-6 lg:px-8">
                    {/* Cover Section */}
                    <div className="bg-white rounded-[3rem] p-12 md:p-20 shadow-2xl shadow-slate-200/50 border border-slate-100 relative overflow-hidden mb-12">
                        <div className="absolute top-0 right-0 w-full h-full bg-linear-to-br from-primary/5 via-transparent to-transparent opacity-50"></div>

                        <div className="relative z-10 flex flex-col items-center text-center">
                            <span className="px-5 py-2 bg-primary/10 text-primary rounded-full text-[10px] font-black uppercase tracking-[0.3em] mb-8">
                                Official Whitepaper 2026
                            </span>
                            <h1 className="text-4xl md:text-6xl font-display font-bold text-slate-900 mb-6 tracking-tight">
                                NFC Hardware & <br /> White-Label Infrastructure
                            </h1>
                            <p className="text-lg md:text-xl text-slate-500 font-medium max-w-2xl leading-relaxed mb-10">
                                A comprehensive guide to scaling your business identity with ElizTap's decentralized hardware solutions.
                            </p>

                            <div className="flex flex-wrap justify-center gap-4">
                                <button className="h-14 px-8 bg-slate-900 text-white font-bold rounded-2xl flex items-center gap-3 hover:bg-slate-800 transition-all shadow-xl active:scale-95">
                                    <Download size={20} />
                                    Download PDF Version
                                </button>
                                <button className="h-14 px-8 bg-white border border-slate-200 text-slate-600 font-bold rounded-2xl flex items-center gap-2 hover:bg-slate-50 transition-all active:scale-95">
                                    View Specifications
                                    <ArrowRight size={20} />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Detailed Layout */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
                        {sections.map((section, idx) => (
                            <div key={idx} className="bg-white rounded-[2.5rem] p-10 border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all group">
                                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-8 ${section.color === 'blue' ? 'bg-blue-50 text-blue-600' :
                                    section.color === 'purple' ? 'bg-purple-50 text-purple-600' :
                                        'bg-green-50 text-green-600'
                                    }`}>
                                    <section.icon size={28} />
                                </div>
                                <h3 className="text-xl font-display font-bold text-slate-900 mb-4">{section.title}</h3>
                                <p className="text-sm text-slate-500 font-medium leading-relaxed mb-8">{section.desc}</p>
                                <ul className="space-y-4">
                                    {section.items.map((item, i) => (
                                        <li key={i} className="flex items-center gap-3 text-xs font-bold text-slate-700">
                                            <CheckCircle2 size={16} className="text-primary" />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>

                    {/* Pricing Matrix */}
                    <div className="bg-white rounded-[3rem] p-12 border border-slate-100 shadow-sm mb-12 overflow-hidden relative">
                        <div className="absolute top-0 right-0 p-8">
                            <Zap size={120} className="text-slate-50 opacity-50" />
                        </div>

                        <h2 className="text-3xl font-display font-bold text-slate-900 mb-2">Hardware Unit Pricing</h2>
                        <p className="text-slate-500 mb-12 font-medium">Standard rates for custom-branded NFC hardware units.</p>

                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b border-slate-100">
                                        <th className="text-left pb-6 text-[10px] font-black uppercase tracking-widest text-slate-400">Unit Type</th>
                                        <th className="text-left pb-6 text-[10px] font-black uppercase tracking-widest text-slate-400">Best For</th>
                                        <th className="text-left pb-6 text-[10px] font-black uppercase tracking-widest text-slate-400">Build Quality</th>
                                        <th className="text-right pb-6 text-[10px] font-black uppercase tracking-widest text-slate-400">Rate (Starting)</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-50">
                                    {hardwarePricing.map((row, i) => (
                                        <tr key={i} className="group hover:bg-slate-50/50 transition-colors">
                                            <td className="py-6 font-bold text-slate-900">{row.type}</td>
                                            <td className="py-6 text-sm text-slate-500 font-medium">{row.bestFor}</td>
                                            <td className="py-6">
                                                <span className="px-3 py-1 bg-slate-100 text-slate-600 rounded-lg text-[10px] font-bold uppercase tracking-wider">
                                                    {row.specs}
                                                </span>
                                            </td>
                                            <td className="py-6 text-right font-display font-bold text-primary text-xl">{row.startingAt}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <p className="mt-8 text-xs text-slate-400 italic">
                            * Pricing excludes shipping. Multi-year bulk contracts are eligible for up to 30% discount.
                        </p>
                    </div>

                    {/* White Label Program */}
                    <div className="bg-slate-900 rounded-[3rem] p-12 md:p-20 text-white relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 rounded-full translate-x-32 -translate-y-32 blur-3xl"></div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
                            <div>
                                <h2 className="text-4xl font-display font-bold mb-6">The Elite White-Label <br /> Partnership</h2>
                                <p className="text-lg text-slate-400 font-medium mb-10 leading-relaxed">
                                    Remove all traces of ElizTap and present our technology as your own proprietary solution. Perfect for agencies, franchises, and large-scale enterprises.
                                </p>

                                <div className="space-y-6">
                                    <div className="flex items-start gap-4">
                                        <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center shrink-0">
                                            <Globe size={24} className="text-primary" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-white mb-1">Custom Domain Routing</h4>
                                            <p className="text-sm text-slate-400">Your clients access the dashboard and tap links via your own domain names.</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-4">
                                        <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center shrink-0">
                                            <Palette size={24} className="text-primary" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-white mb-1">Full Aesthetics Control</h4>
                                            <p className="text-sm text-slate-400">Inject custom CSS and branding assets to match your company's identity perfectly.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white/5 backdrop-blur-xl rounded-[2.5rem] p-10 border border-white/10 border-dashed">
                                <div className="text-center mb-8">
                                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-primary mb-2">License Setup</p>
                                    <p className="text-3xl font-display font-bold text-white">Project Quote Basis</p>
                                </div>
                                <div className="space-y-4 mb-10">
                                    <div className="flex items-center justify-between text-sm py-3 border-b border-white/5">
                                        <span className="text-slate-400 font-medium">Setup Fee</span>
                                        <span className="text-white font-bold">Inquire for Quote</span>
                                    </div>
                                    <div className="flex items-center justify-between text-sm py-3 border-b border-white/5">
                                        <span className="text-slate-400 font-medium">Monthly Infrastructure</span>
                                        <span className="text-white font-bold">Volume-Based</span>
                                    </div>
                                    <div className="flex items-center justify-between text-sm py-3">
                                        <span className="text-slate-400 font-medium">Minimum Hardware Order</span>
                                        <span className="text-white font-bold">Custom Volume</span>
                                    </div>
                                </div>
                                <button className="w-full h-16 bg-primary text-white font-black uppercase tracking-widest text-xs rounded-2xl hover:bg-primary-hover shadow-2xl shadow-primary/30 transition-all active:scale-95">
                                    Apply for Partnership
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Footer Call to Action */}
                    <div className="mt-20 text-center">
                        <p className="text-sm text-slate-400 font-bold uppercase tracking-widest mb-4">Have questions?</p>
                        <div className="flex justify-center gap-8">
                            <a href="mailto:sales@eliztap.com" className="flex items-center gap-2 text-slate-600 font-bold hover:text-primary transition-colors">
                                <Mail size={18} />
                                sales@eliztap.com
                            </a>
                            <a href="tel:+234800ELIZTAP" className="flex items-center gap-2 text-slate-600 font-bold hover:text-primary transition-colors">
                                <Phone size={18} />
                                +234 800-ELIZTAP
                            </a>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
