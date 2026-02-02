'use client';

import React, { useEffect, useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useCustomerFlowStore, businessConfigs, BusinessType, CustomerStep } from '@/store/useCustomerFlowStore';
import { useAuthStore } from '@/store/useAuthStore';
import Link from 'next/link';
import Script from 'next/script';
import { jwtDecode } from 'jwt-decode';

const visitorSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    phone: z.string().optional().or(z.literal('')),
    email: z.string().email("Invalid email format").optional().or(z.literal('')),
});

type VisitorFormData = z.infer<typeof visitorSchema>;

const presets = {
    title: "text-2xl md:text-3xl font-display font-black text-text-main tracking-tight leading-tight",
    subtitle: "text-[10px] font-black text-primary mb-6 uppercase tracking-[0.3em] block",
    body: "text-sm md:text-base font-medium text-gray-500 leading-relaxed",
    card: "w-full max-w-[420px] bg-white rounded-2xl p-8 md:p-12 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.06)] border border-gray-50 relative overflow-hidden",
    button: "w-full h-14 rounded-2xl bg-primary text-white font-black uppercase tracking-widest text-xs shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2 disabled:opacity-30 disabled:hover:scale-100 disabled:cursor-not-allowed",
    input: "w-full h-12 px-5 bg-gray-50 border-none rounded-xl font-bold text-sm focus:ring-2 focus:ring-primary/10 transition-all outline-none",
    label: "text-[9px] font-black uppercase text-gray-400 ml-1",
    error: "text-[10px] font-bold text-red-500 mt-1 ml-1"
};

export default function UserStepPage() {
    const {
        currentStep, setStep, storeName, setUserData, resetFlow,
        getBusinessConfig, customWelcomeMessage, customSuccessMessage,
        customPrivacyMessage, customRewardMessage, hasRewardSetup,
        setBusinessType, userData
    } = useCustomerFlowStore();

    const { user } = useAuthStore();
    const config = getBusinessConfig();

    const [hasConsented, setHasConsented] = useState(false);
    const [isDownloading, setIsDownloading] = useState(false);
    const [isSyncingReal, setIsSyncingReal] = useState(false);
    const [isDeviceSynced, setIsDeviceSynced] = useState(false);

    // Form Initialization (Device-First)
    const storedIdentity = useMemo(() => {
        if (typeof window === 'undefined') return null;
        const saved = localStorage.getItem('google_identity');
        return saved ? JSON.parse(saved) : null;
    }, []);

    const {
        register,
        handleSubmit,
        setValue,
        reset,
        formState: { errors, isValid },
    } = useForm<VisitorFormData>({
        resolver: zodResolver(visitorSchema),
        defaultValues: {
            name: storedIdentity?.name || user?.name || '',
            email: storedIdentity?.email || user?.email || '',
            phone: storedIdentity?.phone || ''
        },
        mode: 'onChange'
    });

    // Reactive form reset for late-loading data (e.g. from state store)
    useEffect(() => {
        if (storedIdentity || user) {
            setIsDeviceSynced(!!storedIdentity);
            reset({
                name: storedIdentity?.name || user?.name || '',
                email: storedIdentity?.email || user?.email || '',
                phone: storedIdentity?.phone || ''
            });
        }
    }, [storedIdentity, user, reset]);

    // Google Identity SDK Integration
    const handleCredentialResponse = (response: any) => {
        try {
            setIsSyncingReal(true);
            const decoded: any = jwtDecode(response.credential);

            // Update Form Reactively
            if (decoded.name) setValue('name', decoded.name, { shouldValidate: true });
            if (decoded.email) setValue('email', decoded.email, { shouldValidate: true });

            // Update Device Memory (Device-First for next time)
            const identity = {
                name: decoded.name,
                email: decoded.email,
                phone: '' // Phone remained blank as per request
            };
            localStorage.setItem('google_identity', JSON.stringify(identity));
            setIsDeviceSynced(true);

            setTimeout(() => {
                setIsSyncingReal(false);
                setStep('FORM');
            }, 800);
        } catch (error) {
            console.error("Google Sync Error:", error);
            setStep('FORM');
        }
    };

    // Device-First Transition Logic
    useEffect(() => {
        if (currentStep === 'SCANNING') {
            const timer = setTimeout(() => setStep('IDENTIFYING'), 800);
            return () => clearTimeout(timer);
        }

        if (currentStep === 'IDENTIFYING') {
            // Background Google prompt
            if ((window as any).google) {
                (window as any).google.accounts.id.prompt();
            }

            // Swift Exit: Move to form or welcome back regardless of sync status after 1.5s
            const syncTimeout = setTimeout(() => {
                if (storedIdentity) {
                    setStep('WELCOME_BACK');
                } else {
                    setStep('FORM');
                }
            }, 1500);

            return () => clearTimeout(syncTimeout);
        }
    }, [currentStep, setStep, storedIdentity]);

    const onFormSubmit = (data: VisitorFormData) => {
        // Save to local storage (Device-First persistence)
        localStorage.setItem('google_identity', JSON.stringify(data));
        setUserData(data);
        setStep('OUTCOME');
    };

    const handleDownloadReward = () => {
        setIsDownloading(true);
        setTimeout(() => {
            setIsDownloading(false);
            setStep('FINAL_SUCCESS');
            const link = document.createElement('a');
            link.href = '#';
            link.download = `LaTap_Reward_${storeName.replace(/\s+/g, '_')}.pdf`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }, 2000);
    };

    return (
        <div className="min-h-screen bg-[#fafbfc] font-body flex flex-col items-center py-20 px-6 antialiased">
            <Script
                src="https://accounts.google.com/gsi/client"
                strategy="afterInteractive"
                onLoad={() => {
                    if ((window as any).google) {
                        (window as any).google.accounts.id.initialize({
                            client_id: "721458892695-placeholder.apps.googleusercontent.com",
                            callback: handleCredentialResponse,
                            auto_select: true
                        });
                    }
                }}
            />

            <nav className="fixed top-0 left-0 right-0 z-60 px-10 py-8 flex items-center justify-between pointer-events-none">
                <Link href="/" className="flex items-center gap-2 group pointer-events-auto">
                    <div className="size-8 rounded-xl bg-primary flex items-center justify-center text-white shadow-lg shadow-primary/20 group-hover:rotate-12 transition-transform">
                        <span className="material-symbols-outlined text-[18px]">nfc</span>
                    </div>
                    <span className="font-display font-black text-xl tracking-tighter">LaTap</span>
                </Link>

                <div className="flex items-center gap-4 pointer-events-auto">
                    <button onClick={resetFlow} className="text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-primary transition-colors">
                        Restart
                    </button>
                    <div className="size-8 rounded-full border-2 border-gray-100 flex items-center justify-center">
                        <span className="material-symbols-outlined text-sm text-gray-300">help</span>
                    </div>
                </div>
            </nav>

            <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
                <div className="absolute -top-[10%] -left-[10%] size-[50%] rounded-full bg-primary/5 blur-[120px] animate-pulse" />
                <div className="absolute top-[20%] -right-[10%] size-[40%] rounded-full bg-indigo-500/5 blur-[100px]" />
                <div className="absolute -bottom-[10%] left-[20%] size-[50%] rounded-full bg-blue-400/5 blur-[120px] animate-pulse" />
            </div>

            {currentStep !== 'SELECT_TYPE' && (
                <div className="fixed top-24 w-full max-w-sm px-6 flex gap-1.5 z-50">
                    {[1, 2, 3, 4].map((i) => {
                        const stepsMap: Record<CustomerStep, number> = {
                            'SELECT_TYPE': 0,
                            'SCANNING': 1,
                            'IDENTIFYING': 1,
                            'WELCOME_BACK': 2,
                            'FORM': 2,
                            'OUTCOME': 3,
                            'FINAL_SUCCESS': 4,
                            'SUCCESS_LINKED': 3,
                            'ERROR_NOT_FOUND': 1,
                            'WELCOME': 2,
                            'PRIVACY': 2
                        };
                        const activeIndex = stepsMap[currentStep] || 0;
                        return (
                            <div key={i} className="flex-1 h-1 rounded-full bg-gray-200/50 overflow-hidden">
                                <motion.div
                                    initial={false}
                                    animate={{
                                        width: activeIndex >= i ? '100%' : '0%',
                                        backgroundColor: activeIndex >= i ? '#2563eb' : 'rgba(229, 231, 235, 0.5)'
                                    }}
                                    className="h-full"
                                />
                            </div>
                        );
                    })}
                </div>
            )}

            <main className="grow flex items-center justify-center w-full max-w-2xl relative">
                <AnimatePresence mode="wait">
                    {currentStep === 'SELECT_TYPE' && (
                        <motion.div key="select" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="md:col-span-2 mb-4">
                                <span className={presets.subtitle}>Simulated Environment</span>
                                <h1 className={presets.title}>Select Industry</h1>
                                <p className={presets.body}>Choose a business type to experience the tailored guest flow.</p>
                            </div>
                            {Object.entries(businessConfigs).map(([key, cfg]) => (
                                <button
                                    key={key}
                                    onClick={() => {
                                        setBusinessType(key as BusinessType);
                                        setStep('SCANNING');
                                    }}
                                    className="p-8 bg-white rounded-3xl border border-gray-100 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.04)] hover:shadow-2xl hover:shadow-primary/10 hover:border-primary/20 transition-all text-left group"
                                >
                                    <div className="size-14 bg-primary/5 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-all">
                                        <span className="material-symbols-outlined text-3xl">{cfg.icon}</span>
                                    </div>
                                    <h3 className="text-xl font-black text-text-main mb-2 tracking-tight">{cfg.label}</h3>
                                    <p className="text-[13px] text-gray-500 font-medium leading-relaxed">{cfg.description}</p>
                                </button>
                            ))}
                        </motion.div>
                    )}
                    {currentStep === 'SCANNING' && (
                        <motion.div key="scanning" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className={presets.card}>
                            <span className={presets.subtitle}>Connection Hub</span>
                            <h1 className={presets.title}>Locating...</h1>
                            <p className={`${presets.body} mt-4 mb-12`}>Syncing with the sensor at <span className="text-primary font-bold">{storeName}</span>.</p>
                            <div className="size-48 mx-auto relative flex items-center justify-center">
                                <motion.div animate={{ scale: [1, 1.3, 1], opacity: [0.1, 0.05, 0.1] }} transition={{ duration: 2, repeat: Infinity }} className="absolute inset-0 bg-primary/20 rounded-full" />
                                <div className="size-20 bg-white rounded-2xl shadow-xl flex items-center justify-center border border-gray-50 z-10 transition-transform hover:scale-110">
                                    <motion.span animate={{ rotate: [0, 10, 0, -10, 0] }} transition={{ duration: 2, repeat: Infinity }} className="material-symbols-outlined text-primary text-4xl">contactless</motion.span>
                                </div>
                            </div>
                            <p className="text-center text-[10px] font-black text-gray-300 uppercase tracking-widest mt-10 animate-pulse">Handshake in progress</p>
                        </motion.div>
                    )}

                    {currentStep === 'IDENTIFYING' && (
                        <motion.div key="id" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className={presets.card + " text-center"}>
                            <div className="size-20 bg-primary/5 rounded-full flex items-center justify-center mx-auto mb-8 border border-primary/10 relative">
                                <span className="material-symbols-outlined text-primary animate-spin text-3xl">sync</span>
                                <motion.div
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                                    className="absolute inset-0 border-2 border-primary border-t-transparent rounded-full opacity-20"
                                />
                            </div>
                            <h1 className={presets.title}>Verifying Connection</h1>
                            <p className={presets.body + " mt-4 uppercase text-[10px] font-black tracking-widest text-primary animate-pulse"}>
                                Checking local profile cache...
                            </p>
                            <p className="text-[10px] text-gray-400 font-bold mt-2">Almost there.</p>
                        </motion.div>
                    )}

                    {currentStep === 'FORM' && (
                        <motion.div key="form" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className={presets.card}>
                            <button
                                onClick={() => setStep('SELECT_TYPE')}
                                className="absolute top-8 right-8 size-8 rounded-full bg-gray-50 flex items-center justify-center hover:bg-gray-100 transition-colors group"
                            >
                                <span className="material-symbols-outlined text-gray-400 text-[18px] group-hover:text-primary transition-colors">close</span>
                            </button>

                            {isSyncingReal && (
                                <div className="absolute inset-0 bg-white/90 backdrop-blur-md z-50 flex flex-col items-center justify-center p-10 text-center">
                                    <div className="size-20 bg-[#4285F4]/10 rounded-full flex items-center justify-center mb-8 relative">
                                        <motion.div animate={{ scale: [1, 1.4, 1], opacity: [0.3, 0.1, 0.3] }} transition={{ duration: 2, repeat: Infinity }} className="absolute inset-0 bg-[#4285F4] rounded-full" />
                                        <svg className="size-10 text-[#4285F4] relative z-10" viewBox="0 0 24 24">
                                            <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                            <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                            <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" />
                                            <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                                        </svg>
                                    </div>
                                    <h3 className="text-base font-black text-[#4285F4] uppercase tracking-[0.2em]">Synchronizing</h3>
                                    <p className="text-[10px] font-bold text-gray-400 mt-4">Connecting verified profile data.</p>
                                </div>
                            )}

                            <span className={presets.subtitle}>Digital Profile</span>
                            <h1 className={presets.title}>{customWelcomeMessage || `Welcome to ${storeName}`}</h1>
                            <p className={`${presets.body} mt-3 mb-8`}>Complete your profile to claim your rewards.</p>

                            {isDeviceSynced && (
                                <div className="mb-8 p-4 rounded-xl bg-blue-50/50 border border-blue-100/50 flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="size-10 bg-white rounded-full flex items-center justify-center shadow-sm">
                                            <span className="material-symbols-outlined text-blue-500 text-xl">devices</span>
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-black text-blue-500 uppercase tracking-widest leading-none mb-1">Device Recognized</p>
                                            <p className="text-[10px] font-bold text-gray-400">Synced from local memory</p>
                                        </div>
                                    </div>
                                    <span className="material-symbols-outlined text-green-500 text-sm">check_circle</span>
                                </div>
                            )}

                            <form className="space-y-4" onSubmit={handleSubmit(onFormSubmit)}>
                                <div className="space-y-1">
                                    <label htmlFor="name" className={presets.label}>Full Name</label>
                                    <input
                                        id="name"
                                        type="text"
                                        {...register('name')}
                                        placeholder="Enter your name"
                                        className={`${presets.input} ${errors.name ? 'ring-2 ring-red-500/20' : ''}`}
                                    />
                                    {errors.name && <p className={presets.error}>{errors.name.message}</p>}
                                </div>

                                <div className="space-y-1">
                                    <label htmlFor="phone" className={presets.label}>Phone Number</label>
                                    <input
                                        id="phone"
                                        type="tel"
                                        {...register('phone')}
                                        placeholder="Phone"
                                        className={`${presets.input} ${errors.phone ? 'ring-2 ring-red-500/20' : ''}`}
                                    />
                                    {errors.phone && <p className={presets.error}>{errors.phone.message}</p>}
                                </div>

                                <div className="space-y-1">
                                    <label htmlFor="email" className={presets.label}>Email Address <span className="text-[8px] opacity-40 lowercase font-medium">(for receipt)</span></label>
                                    <input
                                        id="email"
                                        type="email"
                                        {...register('email')}
                                        placeholder="Optional email"
                                        className={`${presets.input} ${errors.email ? 'ring-2 ring-red-500/20' : ''}`}
                                    />
                                    {errors.email && <p className={presets.error}>{errors.email.message}</p>}
                                </div>

                                <div className="pt-6 pb-2">
                                    <label className="flex items-start gap-3 p-4 rounded-xl border border-gray-100 bg-gray-50/50 cursor-pointer group hover:bg-white hover:border-primary/20 transition-all">
                                        <input
                                            type="checkbox"
                                            checked={hasConsented}
                                            onChange={(e) => setHasConsented(e.target.checked)}
                                            className="size-4 accent-primary mt-1"
                                        />
                                        <div>
                                            <p className="text-[9px] font-black uppercase tracking-widest text-text-main group-hover:text-primary">I Accept Privacy Terms</p>
                                            <p className="text-[10px] text-gray-400 font-medium leading-tight mt-1">
                                                {customPrivacyMessage || "I agree to have my visits securely tracked for loyalty rewards."}
                                            </p>
                                        </div>
                                    </label>
                                </div>

                                <button type="submit" disabled={!hasConsented || !isValid} className={presets.button}>
                                    Finalize Setup
                                </button>
                            </form>
                        </motion.div>
                    )}

                    {currentStep === 'WELCOME_BACK' && (
                        <motion.div key="welcome-back" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }} className={presets.card + " text-center"}>
                            <div className="size-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-8 border border-primary/20">
                                <span className="material-symbols-outlined text-primary text-5xl">waving_hand</span>
                            </div>
                            <span className={presets.subtitle}>Welcome Back</span>
                            <h1 className={presets.title}>Great to see you again!</h1>
                            <p className={`${presets.body} mt-4 mb-10`}>
                                We recognized your device. Ready to continue your experience at <span className="text-primary font-bold">{storeName}</span>?
                            </p>

                            <div className="p-4 rounded-2xl bg-gray-50 mb-10 border border-gray-100 flex items-center gap-4 text-left">
                                <div className="size-12 bg-white rounded-xl flex items-center justify-center shadow-sm">
                                    <span className="material-symbols-outlined text-primary">person</span>
                                </div>
                                <div>
                                    <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Signed in as</p>
                                    <p className="font-black text-text-main">{userData?.name || storedIdentity?.name}</p>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <button onClick={() => setStep('OUTCOME')} className={presets.button}>
                                    Continue
                                </button>
                                <button
                                    onClick={() => {
                                        localStorage.removeItem('google_identity');
                                        resetFlow();
                                    }}
                                    className="text-[10px] font-black text-gray-400 uppercase tracking-widest hover:text-red-500 transition-colors py-2 block w-full"
                                >
                                    Not you? Clear Profile
                                </button>
                            </div>
                        </motion.div>
                    )}

                    {currentStep === 'OUTCOME' && (
                        <motion.div key="outcome" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className={presets.card}>
                            <div className="flex flex-col items-center text-center">
                                <div className="size-20 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mb-8 shadow-inner">
                                    <span className="material-symbols-outlined text-4xl">{config.specificIcon}</span>
                                </div>
                                <h1 className={presets.title}>{customSuccessMessage || config.outcomeTitle}</h1>
                                <p className={`${presets.body} mt-4 mb-10`}>{config.outcomeDesc}</p>

                                {hasRewardSetup && (
                                    <motion.div
                                        initial={{ y: 20, opacity: 0 }}
                                        whileInView={{ y: 0, opacity: 1 }}
                                        className="w-full bg-linear-to-br from-primary to-primary-dark rounded-2xl p-8 text-white relative overflow-hidden mb-10 text-left shadow-2xl shadow-primary/20"
                                    >
                                        <div className="z-10 relative">
                                            <p className="text-[10px] font-black uppercase tracking-widest opacity-60 mb-1">Your Reward</p>
                                            <h3 className="text-2xl font-black italic mb-8 tracking-tighter">
                                                {customRewardMessage || "Access Granted"}
                                            </h3>
                                            <button
                                                onClick={handleDownloadReward}
                                                disabled={isDownloading}
                                                className="w-full h-12 bg-white text-primary font-black uppercase tracking-widest text-[10px] rounded-xl flex items-center justify-center gap-2 hover:bg-gray-50 transition-all"
                                            >
                                                {isDownloading ? <span className="animate-spin material-symbols-outlined text-sm">sync</span> : <span className="material-symbols-outlined text-sm">file_download</span>}
                                                {isDownloading ? 'Processing...' : 'Save Reward to Phone'}
                                            </button>
                                        </div>
                                    </motion.div>
                                )}

                                <div className="w-full space-y-4">
                                    {!hasRewardSetup && (
                                        <button onClick={() => setStep('FINAL_SUCCESS')} className={presets.button}>Finish</button>
                                    )}
                                    <button onClick={resetFlow} className="text-[10px] font-black text-gray-300 uppercase tracking-widest hover:text-red-400 transition-colors">Return to Start</button>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {currentStep === 'FINAL_SUCCESS' && (
                        <motion.div key="final" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className={presets.card + " text-center"}>
                            <div className="size-24 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-10 shadow-2xl shadow-green-200">
                                <span className="material-symbols-outlined text-white text-4xl font-black">celebration</span>
                            </div>
                            <h1 className={presets.title}>Task Achieved!</h1>
                            <p className={`${presets.body} mt-4 mb-12 italic`}>
                                Successfully interacted with <span className="text-primary font-bold">{storeName}</span> via LaTap.
                            </p>
                            <button onClick={resetFlow} className={presets.button}>Close & Return to Start</button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </main>

            <footer className="mt-12 flex flex-col items-center gap-3 opacity-20 pointer-events-none grayscale saturate-0">
                <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-sm">verified</span>
                    <span className="text-[9px] font-black uppercase tracking-[0.4em]">Transaction Verified</span>
                </div>
            </footer>

            <style jsx>{`
                .font-display { font-family: var(--font-outfit), sans-serif; }
            `}</style>
        </div>
    );
}
