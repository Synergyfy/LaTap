'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import AuthSidePanel from '@/components/auth/AuthSidePanel';
import { useAuthStore } from '@/store/useAuthStore';
import { notify } from '@/lib/notify';
import Logo from '@/components/brand/Logo';

export default function LoginPage() {
    const router = useRouter();
    const login = useAuthStore((state) => state.login);
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        rememberMe: false
    });

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        const result = await login(formData.email, formData.password);

        if (result.success) {
            // Get user to determine redirect
            const user = useAuthStore.getState().user;
            if (user?.role === 'admin') {
                router.push('/admin/dashboard');
            } else if (user?.role === 'customer') {
                router.push('/customer/dashboard');
            } else {
                router.push('/dashboard');
            }
        } else {
            setError(result.error || 'Login failed');
        }

        setIsLoading(false);
    };

    return (
        <div className="h-screen bg-white flex overflow-hidden font-sans">
            {/* Left Side: Login Form */}
            <div className="w-full lg:w-[60%] flex flex-col overflow-y-auto">
                <div className="p-8 md:p-16 lg:p-24">
                    <Link href="/" className="mb-24 block w-fit">
                        <Logo iconSize={32} fontSize="text-2xl" />
                    </Link>

                    <div className="max-w-md w-full mx-auto lg:mx-0">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="space-y-8"
                        >
                            <div>
                                <h1 className="text-3xl font-display font-bold text-text-main mb-3 leading-tight tracking-tight">Welcome back</h1>
                                <p className="text-sm text-text-secondary font-medium leading-relaxed">Login to manage your business and check your customer data.</p>
                            </div>

                            {/* Demo Credentials */}
                            <div className="bg-primary/5 border border-primary/10 rounded-2xl p-6 shadow-sm overflow-hidden relative group">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full translate-x-10 -translate-y-10 blur-2xl group-hover:bg-primary/20 transition-all"></div>

                                <p className="text-[10px] font-black underline decoration-primary/30 underline-offset-4 text-primary mb-5 uppercase tracking-[0.15em] flex items-center gap-2">
                                    <span className="material-icons-round text-sm">explore</span>
                                    Instant Quick Access Demo
                                </p>

                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 relative z-10">
                                    {[
                                        { id: 'business', label: 'Business Owner', icon: 'storefront', email: 'business@latap.com', pass: 'business123', route: '/dashboard' },
                                        { id: 'customer', label: 'Loyal Customer', icon: 'person', email: 'customer@latap.com', pass: 'customer123', route: '/customer/dashboard' },
                                        { id: 'admin', label: 'Main Admin', icon: 'admin_panel_settings', email: 'admin@latap.com', pass: 'admin123', route: '/admin/dashboard' }
                                    ].map((demo) => (
                                        <button
                                            key={demo.id}
                                            type="button"
                                            onClick={async () => {
                                                setFormData({ email: demo.email, password: demo.pass, rememberMe: true });
                                                setError('');
                                                setIsLoading(true);
                                                const result = await login(demo.email, demo.pass);
                                                if (result.success) {
                                                    router.push(demo.route);
                                                    notify.success(`Logged in as ${demo.label}`);
                                                } else {
                                                    setError(result.error || 'Demo login failed');
                                                }
                                                setIsLoading(false);
                                            }}
                                            disabled={isLoading}
                                            className="group/btn flex flex-col items-center justify-center gap-2 p-4 bg-white border border-gray-100 rounded-xl hover:border-primary/30 hover:shadow-md transition-all disabled:opacity-50"
                                        >
                                            <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center group-hover/btn:bg-primary/10 transition-colors">
                                                <span className="material-icons-round text-xl text-gray-500 group-hover/btn:text-primary">{demo.icon}</span>
                                            </div>
                                            <span className="text-[11px] font-bold text-text-main group-hover/btn:text-primary">{demo.label}</span>
                                        </button>
                                    ))}
                                </div>
                                <p className="text-[10px] text-text-secondary text-center mt-4 font-medium italic opacity-70">
                                    Click any card to start a live demo session
                                </p>
                            </div>

                            <form onSubmit={handleLogin} className="space-y-6">
                                {error && (
                                    <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-center gap-3">
                                        <span className="material-icons-round text-red-600">error</span>
                                        <p className="text-sm font-medium text-red-900">{error}</p>
                                    </div>
                                )}

                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-text-secondary ml-1">Email</label>
                                    <div className="relative">
                                        <span className="material-icons-round absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg">mail</span>
                                        <input
                                            type="email"
                                            placeholder="name@company.com"
                                            className="w-full h-12 bg-gray-50 border border-gray-100 rounded-xl pl-12 pr-5 font-medium outline-none focus:ring-2 focus:ring-primary/20 focus:bg-white transition-all text-sm"
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <div className="flex justify-between items-center px-1">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-text-secondary">Password</label>
                                        <Link href="/forgot-password" className="text-[10px] font-black uppercase tracking-widest text-primary hover:underline">Forgot password?</Link>
                                    </div>
                                    <div className="relative">
                                        <span className="material-icons-round absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg">lock</span>
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            placeholder="••••••••"
                                            className="w-full h-12 bg-gray-50 border border-gray-100 rounded-xl pl-12 pr-12 font-medium outline-none focus:ring-2 focus:ring-primary/20 focus:bg-white transition-all text-sm"
                                            value={formData.password}
                                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                            required
                                        />
                                        <button
                                            type="button"
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

                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="w-full h-12 bg-primary text-white font-bold rounded-xl shadow-lg shadow-primary/20 hover:bg-primary-hover transition-all flex items-center justify-center gap-2 text-sm mt-4 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {isLoading ? (
                                        <>
                                            <span className="material-icons-round animate-spin">refresh</span>
                                            Signing in...
                                        </>
                                    ) : (
                                        <>
                                            Sign In
                                            <span className="material-icons-round text-lg">login</span>
                                        </>
                                    )}
                                </button>
                            </form>
                        </motion.div>

                        <p className="text-[10px] text-center lg:text-left text-text-secondary font-bold uppercase tracking-widest mt-12">
                            New to LaTap? <Link href="/get-started" className="text-primary hover:underline">Create an account</Link>
                        </p>
                    </div>
                </div>
            </div>

            {/* Right Side: Shared Mockup Image */}
            <div className="hidden lg:block lg:w-[40%] relative overflow-hidden h-screen">
                <AuthSidePanel
                    features={[
                        {
                            title: "Monitor your business in real-time.",
                            description: "Track customer visits, peak hours, and loyalty growth instantly from your dashboard.",
                            icon: "analytics"
                        },
                        {
                            title: "Connect with every tap.",
                            description: "Turn anonymous footfall into loyal customers with our seamless NFC technology.",
                            icon: "nfc"
                        }
                    ]}
                />
            </div>
        </div>
    );
}
