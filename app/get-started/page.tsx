'use client';
import React, { useState } from 'react';
import Link from 'next/link';

export default function GetStarted() {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        password: '',
        businessName: '',
        category: '',
        serialNumber: '',
        otp: '',
        plan: 'basic'
    });

    const categories = ['Restaurant', 'Retail', 'Pharmacy', 'Gym & Wellness', 'Events', 'Other'];

    const nextStep = () => setStep(prev => prev + 1);
    const prevStep = () => setStep(prev => prev - 1);

    return (
        <div className="min-h-screen bg-white font-sans text-text-main flex flex-col">
            {/* Simple Header */}
            <div className="py-8 px-10 flex justify-between items-center bg-white border-b border-gray-50">
                <Link href="/" className="flex items-center gap-2">
                    <span className="material-icons-round text-primary text-3xl">nfc</span>
                    <span className="font-display font-semibold text-xl tracking-tight text-text-main">LaTap</span>
                </Link>
                <div className="flex gap-2">
                    {[1, 2, 3].map(s => (
                        <div key={s} className={`h-1.5 w-8 rounded-full transition-all duration-500 ${step >= s ? 'bg-primary' : 'bg-gray-100'}`}></div>
                    ))}
                </div>
            </div>

            <main className="flex-1 flex flex-col items-center justify-center p-6 relative overflow-hidden">
                {/* Background Decoration */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] -z-10 translate-x-1/2 -translate-y-1/2"></div>
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[100px] -z-10 -translate-x-1/2 translate-y-1/2"></div>

                <div className="max-w-4xl w-full">
                    {step === 1 && (
                        <div className="flex flex-col lg:flex-row items-center gap-16 animate-in fade-in slide-in-from-bottom-4 duration-700">
                            <div className="lg:w-1/2 space-y-6">
                                <span className="inline-block px-4 py-1.5 rounded-full bg-primary/5 text-primary text-[10px] font-black uppercase tracking-widest">Step 01: Account</span>
                                <h1 className="text-4xl md:text-5xl font-display font-bold leading-[1.1] text-text-main tracking-tight">
                                    Start capturing footfall data <span className="text-gradient">in 5 minutes.</span>
                                </h1>
                                <p className="text-lg text-text-secondary font-medium leading-relaxed">
                                    Join 2,000+ businesses who have eliminated paper forms and digitized their physical visitor experience.
                                </p>
                                <div className="space-y-4 pt-4">
                                    {['Zero setup fees', 'No technical skill required', 'Enterprise security'].map((item, i) => (
                                        <div key={i} className="flex items-center gap-3 font-bold text-sm text-text-main">
                                            <span className="material-icons-round text-primary text-lg">check_circle</span>
                                            {item}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="lg:w-1/2 w-full">
                                <div className="relative group p-[1px] rounded-[2.5rem] bg-gradient-to-br from-primary/20 via-transparent to-blue-500/20">
                                    <div className="bg-white/80 backdrop-blur-xl p-10 rounded-[2.5rem] shadow-2xl border border-white/50 relative overflow-hidden">
                                        {/* Asymmetric Frame Background Effect */}
                                        <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary/10 rounded-full blur-3xl pointer-events-none"></div>

                                        <div className="space-y-6">
                                            <div className="space-y-1.5">
                                                <label className="text-[10px] font-black uppercase tracking-widest text-text-secondary ml-1">Full Name</label>
                                                <input
                                                    type="text"
                                                    placeholder="Daniel Smith"
                                                    className="w-full h-14 bg-gray-50 border border-gray-100 rounded-2xl px-6 font-medium focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm outline-none"
                                                    value={formData.fullName}
                                                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                                                />
                                            </div>
                                            <div className="space-y-1.5">
                                                <label className="text-[10px] font-black uppercase tracking-widest text-text-secondary ml-1">Business Email</label>
                                                <input
                                                    type="email"
                                                    placeholder="daniel@company.com"
                                                    className="w-full h-14 bg-gray-50 border border-gray-100 rounded-2xl px-6 font-medium focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm outline-none"
                                                    value={formData.email}
                                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                />
                                            </div>
                                            <div className="space-y-1.5">
                                                <label className="text-[10px] font-black uppercase tracking-widest text-text-secondary ml-1">Password</label>
                                                <input
                                                    type="password"
                                                    placeholder="••••••••"
                                                    className="w-full h-14 bg-gray-50 border border-gray-100 rounded-2xl px-6 font-medium focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm outline-none"
                                                    value={formData.password}
                                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                                />
                                            </div>
                                            <button
                                                onClick={nextStep}
                                                className="w-full h-14 bg-primary text-white font-bold rounded-2xl shadow-xl shadow-primary/20 hover:bg-primary-hover transition-all flex items-center justify-center gap-2 group mt-4 cursor-pointer"
                                            >
                                                Continue to Profile
                                                <span className="material-icons-round text-lg group-hover:translate-x-1 transition-transform">arrow_forward</span>
                                            </button>
                                            <p className="text-[10px] text-center text-text-secondary font-bold uppercase tracking-widest mt-6">
                                                Already have an account? <Link href="#" className="text-primary hover:underline">Login</Link>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {step === 2 && (
                        <div className="max-w-2xl mx-auto space-y-12 animate-in fade-in slide-in-from-right-4 duration-700">
                            <div className="text-center space-y-4">
                                <span className="inline-block px-4 py-1.5 rounded-full bg-primary/5 text-primary text-[10px] font-black uppercase tracking-widest">Step 02: Business Profile</span>
                                <h1 className="text-4xl font-display font-bold text-text-main">Tell us about <span className="text-gradient">your space.</span></h1>
                                <p className="text-text-secondary font-medium">We'll use this to customize your visitor welcome message and hardware settings.</p>
                            </div>

                            <div className="bg-white p-10 rounded-[2.5rem] shadow-2xl border border-gray-50 space-y-8">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="space-y-1.5">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-text-secondary ml-1">Business Name</label>
                                        <input
                                            type="text"
                                            placeholder="The Green Cafe"
                                            className="w-full h-14 bg-gray-50 border border-gray-100 rounded-2xl px-6 font-medium outline-none focus:ring-2 focus:ring-primary/20"
                                            value={formData.businessName}
                                            onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                                        />
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-text-secondary ml-1">Business Category</label>
                                        <select
                                            className="w-full h-14 bg-gray-50 border border-gray-100 rounded-2xl px-6 font-medium outline-none focus:ring-2 focus:ring-primary/20 appearance-none text-sm"
                                            value={formData.category}
                                            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                        >
                                            <option value="">Select a category</option>
                                            {categories.map(c => <option key={c} value={c}>{c}</option>)}
                                        </select>
                                    </div>
                                </div>

                                <div className="p-8 bg-primary/5 rounded-3xl border border-primary/10 relative overflow-hidden group">
                                    <div className="absolute top-0 right-0 p-4">
                                        <span className="material-icons-round text-primary text-4xl opacity-10 group-hover:opacity-20 transition-opacity">nfc</span>
                                    </div>
                                    <div className="space-y-4 relative z-10">
                                        <div className="flex items-center gap-3">
                                            <div className="size-8 rounded-full bg-primary text-white flex items-center justify-center text-xs font-bold">3</div>
                                            <h4 className="font-bold text-text-main">Link your NFC Hardware</h4>
                                        </div>
                                        <p className="text-xs text-text-secondary font-bold leading-relaxed max-w-md">
                                            Enter the 12-digit serial number found on the back of your LaTap puck to link it to your account immediately.
                                        </p>
                                        <input
                                            type="text"
                                            placeholder="LT-XXXX-XXXX-XX"
                                            className="w-full h-14 bg-white border border-gray-100 rounded-2xl px-6 font-display font-bold tracking-widest focus:ring-2 focus:ring-primary/40 outline-none uppercase"
                                            value={formData.serialNumber}
                                            onChange={(e) => setFormData({ ...formData, serialNumber: e.target.value })}
                                        />
                                    </div>
                                </div>

                                <div className="flex gap-4 pt-4">
                                    <button
                                        onClick={prevStep}
                                        className="h-14 px-8 border border-gray-100 text-text-main font-bold rounded-2xl hover:bg-gray-50 transition-all cursor-pointer"
                                    >Back</button>
                                    <button
                                        onClick={nextStep}
                                        className="flex-1 h-14 bg-primary text-white font-bold rounded-2xl shadow-xl shadow-primary/20 hover:bg-primary-hover transition-all cursor-pointer"
                                    >Almost there</button>
                                </div>
                            </div>
                        </div>
                    )}

                    {step === 3 && (
                        <div className="max-w-4xl mx-auto space-y-12 animate-in fade-in zoom-in-95 duration-700">
                            <div className="text-center space-y-4">
                                <span className="inline-block px-4 py-1.5 rounded-full bg-primary/5 text-primary text-[10px] font-black uppercase tracking-widest">Step 03: Finalize</span>
                                <h1 className="text-4xl font-display font-bold text-text-main">Welcome aboard, <span className="text-gradient">{formData.businessName || 'Partner'}!</span></h1>
                                <p className="text-text-secondary font-medium">One last step to verify your account and choose your growth path.</p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-6">
                                    <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-xl space-y-6">
                                        <h4 className="font-bold text-text-main flex items-center gap-2">
                                            <span className="material-icons-round text-primary">verified_user</span>
                                            Verify your email
                                        </h4>
                                        <p className="text-xs text-text-secondary font-bold leading-relaxed">
                                            We've sent a 6-digit code to <span className="text-primary">{formData.email || 'your email'}</span>.
                                        </p>
                                        <div className="flex gap-3">
                                            {[1, 2, 3, 4, 5, 6].map(i => (
                                                <input key={i} type="text" maxLength={1} className="size-12 bg-gray-50 border border-gray-100 rounded-xl text-center font-display font-bold text-lg focus:ring-2 focus:ring-primary/20 outline-none" />
                                            ))}
                                        </div>
                                    </div>

                                    <div className="bg-text-main p-8 rounded-3xl text-white space-y-6 relative overflow-hidden">
                                        <div className="absolute top-0 right-0 p-8">
                                            <span className="material-icons-round text-primary opacity-20 text-6xl rotate-12">play_circle</span>
                                        </div>
                                        <h4 className="font-display font-bold text-xl relative z-10">Your "First Tap" Guide</h4>
                                        <div className="aspect-video bg-white/10 rounded-2xl border border-white/10 flex items-center justify-center group cursor-pointer relative z-10">
                                            <span className="material-icons-round text-5xl text-white group-hover:scale-125 transition-transform">play_circle_filled</span>
                                            <p className="absolute bottom-4 text-[10px] font-black uppercase tracking-[0.2em] opacity-60">Watch 45s Tutorial</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-xl space-y-8 flex flex-col">
                                    <h4 className="font-bold text-text-main">Select your Plan</h4>
                                    <div className="space-y-4 flex-1">
                                        {[
                                            { id: 'free', name: 'Free Tier', price: '£0', desc: 'Up to 50 visitors/mo' },
                                            { id: 'basic', name: 'Standard', price: '£29', desc: 'Unlimited data, 1 license', popular: true },
                                            { id: 'premium', name: 'Business Pro', price: '£79', desc: 'CRM + White-labeling' }
                                        ].map(p => (
                                            <label key={p.id} className={`flex items-center justify-between p-5 rounded-2xl border-2 transition-all cursor-pointer ${formData.plan === p.id ? 'border-primary bg-primary/5 shadow-lg shadow-primary/5' : 'border-gray-50 hover:border-gray-100'}`}>
                                                <div className="flex items-center gap-4">
                                                    <input
                                                        type="radio"
                                                        className="size-5 accent-primary"
                                                        checked={formData.plan === p.id}
                                                        onChange={() => setFormData({ ...formData, plan: p.id })}
                                                    />
                                                    <div>
                                                        <div className="flex items-center gap-2">
                                                            <p className="font-bold text-text-main">{p.name}</p>
                                                            {p.popular && <span className="bg-primary text-white text-[8px] font-black px-2 py-0.5 rounded-full uppercase">Popular</span>}
                                                        </div>
                                                        <p className="text-[10px] font-bold text-text-secondary">{p.desc}</p>
                                                    </div>
                                                </div>
                                                <p className="font-display font-bold text-text-main">{p.price}<span className="text-[10px] opacity-40">/mo</span></p>
                                            </label>
                                        ))}
                                    </div>
                                    <button
                                        onClick={() => window.location.href = '/dashboard'}
                                        className="w-full h-14 bg-text-main text-white font-black uppercase tracking-[0.2em] text-xs rounded-2xl hover:bg-primary transition-all shadow-xl cursor-pointer"
                                    >
                                        Go to Live Dashboard
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}
