'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function LoginPage() {
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        rememberMe: false
    });

    return (
        <div className="min-h-screen bg-white flex overflow-hidden font-sans">
            {/* Left Side: Login Form */}
            <div className="w-full lg:w-[60%] flex flex-col p-8 md:p-16 lg:p-24 overflow-y-auto">
                <Link href="/" className="flex items-center gap-2 mb-24">
                    <span className="material-icons-round text-primary text-2xl">nfc</span>
                    <span className="font-display font-semibold text-xl tracking-tight text-text-main">LaTap</span>
                </Link>

                <div className="max-w-md w-full mx-auto lg:mx-0">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-8"
                    >
                        <div>
                            <h1 className="text-3xl font-display font-bold text-text-main mb-3 leading-tight tracking-tight">Welcome back</h1>
                            <p className="text-sm text-text-secondary font-medium leading-relaxed">Login to manage your physical spaces and view real-time visitor analytics.</p>
                        </div>

                        <div className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-text-secondary ml-1">Business Email</label>
                                <div className="relative">
                                    <span className="material-icons-round absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg">mail</span>
                                    <input
                                        type="email"
                                        placeholder="name@company.com"
                                        className="w-full h-12 bg-gray-50 border border-gray-100 rounded-xl pl-12 pr-5 font-medium outline-none focus:ring-2 focus:ring-primary/20 focus:bg-white transition-all text-sm"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <div className="flex justify-between items-center px-1">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-text-secondary">Password</label>
                                    <Link href="/forgot-password"  className="text-[10px] font-black uppercase tracking-widest text-primary hover:underline">Forgot password?</Link>
                                </div>
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

                            <div className="flex items-center gap-3">
                                <input
                                    type="checkbox"
                                    id="remember"
                                    className="size-4 accent-primary rounded"
                                    checked={formData.rememberMe}
                                    onChange={(e) => setFormData({ ...formData, rememberMe: e.target.checked })}
                                />
                                <label htmlFor="remember" className="text-[11px] font-medium text-text-secondary">Keep me signed in for 30 days</label>
                            </div>

                            <button className="w-full h-12 bg-text-main text-white font-bold rounded-xl shadow-lg hover:bg-black transition-all flex items-center justify-center gap-2 text-sm mt-4">
                                Sign In
                                <span className="material-icons-round text-lg">login</span>
                            </button>
                        </div>
                    </motion.div>

                    <p className="text-[10px] text-center lg:text-left text-text-secondary font-bold uppercase tracking-widest mt-12">
                        New to LaTap? <Link href="/get-started" className="text-primary hover:underline">Create an account</Link>
                    </p>
                </div>
            </div>

            {/* Right Side: Shared Mockup Image */}
            <div className="hidden lg:block lg:w-[40%] bg-gray-50 relative overflow-hidden h-screen">
                <div className="absolute inset-0 bg-linear-to-br from-primary/5 via-transparent to-black/5 opacity-50"></div>
                <div className="absolute inset-0 flex items-center justify-center p-12">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1 }}
                        className="relative w-full aspect-square max-w-lg rounded-3xl overflow-hidden shadow-2xl border border-white"
                    >
                        <img
                            src="onboarding_mockup_side_1769837048919.png"
                            alt="Mockup"
                            className="w-full h-full object-cover"
                        />
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
