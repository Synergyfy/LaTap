'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { designPresets as presets } from '@/styles/presets';
import AuthSidePanel from '@/components/auth/AuthSidePanel';

export default function GetStarted() {
    const [step, setStep] = useState(1);
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        password: '',
        confirmPassword: '',
        businessName: '',
        category: '',
        visitors: '',
        goal: '',
        serialNumber: '',
        otp: '',
        agreeToTerms: false
    });

    const categories = ['Retail', 'Hospitality', 'Events & Booths', 'Service Centers', 'Professional Office'];
    const goals = ['Capture Leads', 'Automated Rewards', 'Customer Feedback', 'Digital Loyalty'];

    const nextStep = () => setStep(prev => prev + 1);
    const prevStep = () => setStep(prev => prev - 1);

    return (
        <div className="h-screen bg-white flex overflow-hidden font-sans">
            {/* Left Side: Form */}
            <div className="w-full lg:w-1/2 flex flex-col overflow-y-auto">
                <div className="p-8 md:p-16 lg:p-24">
                    <Link href="/" className="flex items-center gap-2 mb-16">
                        <span className="material-icons-round text-primary text-2xl">nfc</span>
                        <span className="font-display font-semibold text-xl tracking-tight text-text-main">ElizTap</span>
                    </Link>

                    <div className="max-w-md w-full mx-auto lg:mx-0">
                        {/* Progress Bar */}
                        <div className="flex gap-1.5 mb-12">
                            {[1, 2, 3, 4, 5].map(s => (
                                <div key={s} className={`h-1 flex-1 rounded-full transition-all duration-500 ${step >= s ? 'bg-primary' : 'bg-gray-100'}`}></div>
                            ))}
                        </div>

                        <AnimatePresence mode="wait">
                            {step === 1 && (
                                <motion.div
                                    key="step1"
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 20 }}
                                    className="space-y-6"
                                >
                                    <div>
                                        <h1 className="text-2xl font-display font-bold text-text-main mb-2 leading-tight tracking-tight">Create your account</h1>
                                        <p className="text-[13px] text-text-secondary font-medium leading-relaxed">Join 2,000+ businesses who have digitized their physical visitor experience.</p>
                                    </div>

                                    <div className="space-y-5">
                                        <div className="space-y-1.5">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-text-secondary ml-1">Full Name</label>
                                            <div className="relative">
                                                <span className="material-icons-round absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg">person</span>
                                                <input
                                                    type="text"
                                                    placeholder="Daniel Smith"
                                                    className="w-full h-12 bg-gray-50 border border-gray-100 rounded-xl pl-12 pr-5 font-medium outline-none focus:ring-2 focus:ring-primary/20 focus:bg-white transition-all text-sm"
                                                    value={formData.fullName}
                                                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                                                />
                                            </div>
                                        </div>
                                        <div className="space-y-1.5">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-text-secondary ml-1">Business Email</label>
                                            <div className="relative">
                                                <span className="material-icons-round absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg">mail</span>
                                                <input
                                                    type="email"
                                                    placeholder="daniel@company.com"
                                                    className="w-full h-12 bg-gray-50 border border-gray-100 rounded-xl pl-12 pr-5 font-medium outline-none focus:ring-2 focus:ring-primary/20 focus:bg-white transition-all text-sm"
                                                    value={formData.email}
                                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                />
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div className="space-y-1.5">
                                                <label className="text-[10px] font-black uppercase tracking-widest text-text-secondary ml-1">Password</label>
                                                <div className="relative">
                                                    <span className="material-icons-round absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg">lock</span>
                                                    <input
                                                        type={showPassword ? "text" : "password"}
                                                        placeholder="••••••••"
                                                        className="w-full h-12 bg-gray-50 border border-gray-100 rounded-xl pl-12 pr-12 font-medium outline-none focus:ring-2 focus:ring-primary/20 focus:bg-white transition-all text-sm"
                                                        value={formData.password}
                                                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                                    />
                                                    <button
                                                        onClick={() => setShowPassword(!showPassword)}
                                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-primary transition-colors"
                                                    >
                                                        <span className="material-icons-round text-lg">{showPassword ? 'visibility_off' : 'visibility'}</span>
                                                    </button>
                                                </div>
                                            </div>
                                            <div className="space-y-1.5">
                                                <label className="text-[10px] font-black uppercase tracking-widest text-text-secondary ml-1">Confirm</label>
                                                <div className="relative">
                                                    <span className="material-icons-round absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg">lock_reset</span>
                                                    <input
                                                        type={showPassword ? "text" : "password"}
                                                        placeholder="••••••••"
                                                        className="w-full h-12 bg-gray-50 border border-gray-100 rounded-xl pl-12 pr-5 font-medium outline-none focus:ring-2 focus:ring-primary/20 focus:bg-white transition-all text-sm"
                                                        value={formData.confirmPassword}
                                                        onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex items-start gap-3 mt-4">
                                            <input
                                                type="checkbox"
                                                id="terms"
                                                className="mt-1 size-4 accent-primary rounded"
                                                checked={formData.agreeToTerms}
                                                onChange={(e) => setFormData({ ...formData, agreeToTerms: e.target.checked })}
                                            />
                                            <label htmlFor="terms" className="text-[11px] font-medium text-text-secondary leading-normal">
                                                I agree to the <Link href="/terms" className="text-primary hover:underline">Terms of Service</Link> and <Link href="/privacy" className="text-primary hover:underline">Privacy Policy</Link>.
                                            </label>
                                        </div>

                                        <button
                                            onClick={nextStep}
                                            disabled={!formData.agreeToTerms}
                                            className="w-full h-12 bg-primary text-white font-bold rounded-xl shadow-lg shadow-primary/20 hover:bg-primary-hover transition-all flex items-center justify-center gap-2 text-sm mt-2 disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            Create Account
                                            <span className="material-icons-round text-lg">arrow_forward</span>
                                        </button>
                                    </div>
                                </motion.div>
                            )}

                            {step === 2 && (
                                <motion.div
                                    key="step2"
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 20 }}
                                    className="space-y-6"
                                >
                                    <div>
                                        <h1 className="text-2xl font-display font-bold text-text-main mb-2 leading-tight tracking-tight">Verify your email</h1>
                                        <p className="text-[13px] text-text-secondary font-medium leading-relaxed">We've sent a code to <span className="text-primary font-bold">{formData.email || 'your email'}</span>. Please enter it below.</p>
                                    </div>

                                    <div className="space-y-8">
                                        <div className="flex gap-3 justify-between">
                                            {[1, 2, 3, 4].map(i => (
                                                <input
                                                    key={i}
                                                    type="text"
                                                    maxLength={1}
                                                    className="w-16 h-16 bg-gray-50 border border-gray-100 rounded-xl text-center font-display font-black text-2xl focus:ring-2 focus:ring-primary/20 focus:bg-white outline-none transition-all"
                                                />
                                            ))}
                                        </div>

                                        <div className="text-center">
                                            <p className="text-xs font-bold text-text-secondary uppercase tracking-widest">
                                                Didn't receive it? <button className="text-primary hover:underline">Resend code</button>
                                            </p>
                                        </div>

                                        <div className="flex gap-4 pt-4">
                                            <button onClick={prevStep} className="h-12 px-8 border border-gray-100 text-text-main font-bold rounded-xl hover:bg-gray-50 transition-all text-sm">Back</button>
                                            <button onClick={nextStep} className="flex-1 h-12 bg-primary text-white font-bold rounded-xl shadow-lg shadow-primary/20 hover:bg-primary-hover transition-all text-sm">Verify & Continue</button>
                                        </div>
                                    </div>
                                </motion.div>
                            )}

                            {step === 3 && (
                                <motion.div
                                    key="step3"
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 20 }}
                                    className="space-y-8"
                                >
                                    <div>
                                        <h1 className="text-2xl font-display font-bold text-text-main mb-2 leading-tight tracking-tight">Setup your space</h1>
                                        <p className="text-[13px] text-text-secondary font-medium leading-relaxed">Tell us about your physical location so we can customize your dashboard.</p>
                                    </div>

                                    <div className="space-y-6">
                                        <div className="space-y-1.5">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-text-secondary ml-1">Business Name</label>
                                            <div className="relative">
                                                <span className="material-icons-round absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg">storefront</span>
                                                <input
                                                    type="text"
                                                    placeholder="Green Terrace Cafe"
                                                    className="w-full h-12 bg-gray-50 border border-gray-100 rounded-xl pl-12 pr-5 font-medium outline-none focus:ring-2 focus:ring-primary/20 focus:bg-white transition-all text-sm"
                                                    value={formData.businessName}
                                                    onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-3">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-text-secondary ml-1">Business Type</label>
                                            <div className="flex flex-wrap gap-2">
                                                {categories.map(c => (
                                                    <button
                                                        key={c}
                                                        onClick={() => setFormData({ ...formData, category: c })}
                                                        className={`px-4 py-2 rounded-lg text-[11px] font-bold transition-all border ${formData.category === c ? 'bg-primary/5 border-primary/20 text-primary' : 'bg-gray-50 border-gray-100 text-text-secondary hover:bg-gray-100'}`}
                                                    >
                                                        {c}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="space-y-1.5">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-text-secondary ml-1">Average Monthly Visitors</label>
                                            <select
                                                className="w-full h-12 bg-gray-50 border border-gray-100 rounded-xl px-5 font-medium outline-none focus:ring-2 focus:ring-primary/20 appearance-none text-sm"
                                                value={formData.visitors}
                                                onChange={(e) => setFormData({ ...formData, visitors: e.target.value })}
                                            >
                                                <option value="">Select range</option>
                                                <option value="0-500">0 - 500 visitors</option>
                                                <option value="501-2000">501 - 2,000 visitors</option>
                                                <option value="2001-5000">2,001 - 5,000 visitors</option>
                                                <option value="5000+">5,000+ visitors</option>
                                            </select>
                                        </div>

                                        <div className="flex gap-4 pt-4">
                                            <button onClick={prevStep} className="h-12 px-8 border border-gray-100 text-text-main font-bold rounded-xl hover:bg-gray-50 transition-all text-sm">Back</button>
                                            <button onClick={nextStep} className="flex-1 h-12 bg-primary text-white font-bold rounded-xl shadow-lg shadow-primary/20 hover:bg-primary-hover transition-all text-sm">Save & Continue</button>
                                        </div>
                                    </div>
                                </motion.div>
                            )}

                            {step === 4 && (
                                <motion.div
                                    key="step4"
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 20 }}
                                    className="space-y-8"
                                >
                                    <div>
                                        <h1 className="text-2xl font-display font-bold text-text-main mb-2 leading-tight tracking-tight">Main objective</h1>
                                        <p className="text-[13px] text-text-secondary font-medium leading-relaxed">What would you like to achieve first with ElizTap?</p>
                                    </div>

                                    <div className="grid grid-cols-1 gap-3">
                                        {goals.map(g => (
                                            <button
                                                key={g}
                                                onClick={() => setFormData({ ...formData, goal: g })}
                                                className={`w-full p-5 rounded-2xl border flex items-center justify-between transition-all ${formData.goal === g ? 'bg-primary/5 border-primary/20' : 'bg-gray-50 border-gray-100 hover:border-gray-200'}`}
                                            >
                                                <span className={`text-sm font-bold ${formData.goal === g ? 'text-primary' : 'text-text-main'}`}>{g}</span>
                                                {formData.goal === g && <span className="material-icons-round text-primary">check_circle</span>}
                                            </button>
                                        ))}
                                    </div>

                                    <div className="flex gap-4 pt-4">
                                        <button onClick={prevStep} className="h-12 px-8 border border-gray-100 text-text-main font-bold rounded-xl hover:bg-gray-50 transition-all text-sm">Back</button>
                                        <button onClick={nextStep} className="flex-1 h-12 bg-primary text-white font-bold rounded-xl shadow-lg shadow-primary/20 hover:bg-primary-hover transition-all text-sm">Finalize Setup</button>
                                    </div>
                                </motion.div>
                            )}

                            {step === 5 && (
                                <motion.div
                                    key="final"
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="space-y-8 text-center"
                                >
                                    <div className="size-20 bg-primary/10 rounded-full flex items-center justify-center text-primary mx-auto mb-8">
                                        <span className="material-icons-round text-4xl">celebration</span>
                                    </div>
                                    <div>
                                        <h1 className="text-2xl font-display font-bold text-text-main mb-3">You're ready to tap!</h1>
                                        <p className="text-sm text-text-secondary font-medium mb-8">Your account is active and your space is ready for configuration.</p>
                                        <Link href="/dashboard" className="w-full h-12 bg-primary text-white font-bold rounded-xl shadow-xl shadow-primary/20 hover:bg-primary-hover transition-all flex items-center justify-center gap-2">
                                            Enter Dashboard
                                            <span className="material-icons-round">space_dashboard</span>
                                        </Link>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <p className="text-[10px] text-center lg:text-left text-text-secondary font-bold uppercase tracking-widest mt-12">
                            Already have an account? <Link href="/login" className="text-primary hover:underline">Login</Link>
                        </p>
                    </div>
                </div>
            </div>

            {/* Right Side: Mockup Image */}
            <div className="hidden lg:block lg:w-1/2 relative overflow-hidden h-screen">
                <AuthSidePanel
                    features={
                        step === 1 ? [
                            {
                                title: "Join 2,000+ businesses.",
                                description: "Start capturing customer data automatically with every tap. No apps, no friction.",
                                icon: "storefront"
                            },
                            {
                                title: "Secure & compliant.",
                                description: "Your customer data is encrypted and GDPR-compliant from day one.",
                                icon: "verified_user"
                            }
                        ] : step === 2 ? [
                            {
                                title: "Verify your identity.",
                                description: "We've sent a secure code to your email to ensure your account is protected.",
                                icon: "mark_email_read"
                            }
                        ] : step === 3 ? [
                            {
                                title: "Tell us about your space.",
                                description: "We'll customize your dashboard to match your business type and visitor volume.",
                                icon: "tune"
                            },
                            {
                                title: "Smart recommendations.",
                                description: "Get AI-powered insights based on your business category and goals.",
                                icon: "psychology"
                            }
                        ] : step === 4 ? [
                            {
                                title: "Set your primary goal.",
                                description: "Whether it's lead capture, loyalty, or feedback—we'll optimize your experience.",
                                icon: "flag"
                            }
                        ] : [
                            {
                                title: "You're all set!",
                                description: "Your dashboard is ready. Start creating your first NFC campaign and watch the data flow in.",
                                icon: "celebration"
                            },
                            {
                                title: "Need help?",
                                description: "Our support team and knowledge base are here 24/7 to guide you.",
                                icon: "support_agent"
                            }
                        ]
                    }
                />
            </div>
        </div>
    );
}
