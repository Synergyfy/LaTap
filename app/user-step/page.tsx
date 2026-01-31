'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { useCustomerFlowStore, businessConfigs, BusinessType } from '@/store/useCustomerFlowStore';
import Link from 'next/link';

const presets = {
    title: "text-2xl md:text-3xl font-display font-black text-text-main tracking-tight leading-tight",
    subtitle: "text-[10px] font-black text-primary mb-6 uppercase tracking-[0.3em] block",
    body: "text-sm md:text-base font-medium text-gray-500 leading-relaxed",
    card: "w-full max-w-[420px] bg-white rounded-2xl p-8 md:p-12 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.06)] border border-gray-50 relative overflow-hidden",
    button: "w-full h-14 rounded-2xl bg-primary text-white font-black uppercase tracking-widest text-xs shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2 disabled:opacity-30 disabled:hover:scale-100 disabled:cursor-not-allowed",
    input: "w-full h-12 px-5 bg-gray-50 border-none rounded-xl font-bold text-sm focus:ring-2 focus:ring-primary/10 transition-all outline-none",
};

export default function UserStepPage() {
    const {
        currentStep, setStep, storeName, userData, setUserData, resetFlow,
        simulateReturningUser, visitCount, getBusinessConfig, setBusinessType,
        isReturningUser, showFeedback, toggleFeedback, hasRewardSetup, setRewardSetup
    } = useCustomerFlowStore();

    const [hasConsented, setHasConsented] = useState(false);
    const [isDownloading, setIsDownloading] = useState(false);
    const config = getBusinessConfig();

    // Queries for Simulation
    const { data: scanResult } = useQuery({
        queryKey: ['scan-tag'],
        queryFn: async () => {
            await new Promise(resolve => setTimeout(resolve, 2000));
            return { success: true };
        },
        enabled: currentStep === 'SCANNING',
    });

    useEffect(() => {
        if (currentStep === 'SCANNING' && scanResult?.success) setStep('IDENTIFYING');
    }, [scanResult, currentStep, setStep]);

    useEffect(() => {
        if (currentStep === 'IDENTIFYING') {
            const timer = setTimeout(() => {
                setStep(isReturningUser ? 'WELCOME_BACK' : 'SUCCESS_LINKED');
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, [currentStep, isReturningUser, setStep]);

    useEffect(() => {
        if (currentStep === 'SUCCESS_LINKED') {
            const timer = setTimeout(() => setStep('WELCOME'), 2000);
            return () => clearTimeout(timer);
        }
    }, [currentStep, setStep]);

    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);
        setUserData({
            name: formData.get('name') as string,
            email: formData.get('email') as string,
            phone: formData.get('phone') as string,
        });
        setStep('OUTCOME');
    };

    const handleDownloadReward = () => {
        setIsDownloading(true);
        // Simulate PDF generation/download
        setTimeout(() => {
            setIsDownloading(false);
            setStep('FINAL_SUCCESS');
            // Trigger actual browser download shim
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
            {/* Header / Logo / Navigation */}
            <nav className="fixed top-0 left-0 right-0 z-[60] px-10 py-8 flex items-center justify-between">
                <Link href="/" className="flex items-center gap-2 group pointer-events-auto">
                    <div className="size-8 rounded-xl bg-primary flex items-center justify-center text-white shadow-lg shadow-primary/20 group-hover:rotate-12 transition-transform">
                        <span className="material-symbols-outlined text-[18px]">nfc</span>
                    </div>
                    <span className="font-display font-black text-xl tracking-tighter">LaTap</span>
                </Link>
                <div className="flex items-center gap-4">
                    {currentStep !== 'SELECT_TYPE' && currentStep !== 'FINAL_SUCCESS' && (
                        <button
                            onClick={() => toggleFeedback(true)}
                            className="bg-white px-5 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest text-red-500 hover:bg-red-50 transition-all shadow-sm border border-red-100/50"
                        >
                            End Session
                        </button>
                    )}
                </div>
            </nav>

            {/* Feedback Dropdown (Brand Styled) */}
            <AnimatePresence>
                {showFeedback && (
                    <motion.div
                        initial={{ opacity: 0, y: -20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -20, scale: 0.95 }}
                        className="fixed top-24 left-1/2 -translate-x-1/2 z-[70] w-full max-w-sm px-4"
                    >
                        <div className="bg-white rounded-2xl p-8 shadow-2xl border-2 border-primary/20 flex flex-col gap-6 ring-4 ring-primary/5">
                            <div className="flex justify-between items-center">
                                <h3 className="font-display font-black text-xl text-primary tracking-tight">Report a Problem</h3>
                                <button onClick={() => toggleFeedback(false)} className="text-gray-300 hover:text-primary transition-colors">
                                    <span className="material-symbols-outlined">close</span>
                                </button>
                            </div>
                            <p className="text-sm font-bold text-gray-400 leading-relaxed italic">Help us make LaTap better. What went wrong?</p>
                            <div className="space-y-4">
                                <select className="w-full h-12 px-4 bg-gray-50 border border-transparent rounded-xl font-bold text-xs text-text-main focus:ring-2 focus:ring-primary/20 focus:bg-white outline-none transition-all appearance-none cursor-pointer">
                                    <option>Connection too slow</option>
                                    <option>NFC not responding</option>
                                    <option>Privacy concerns</option>
                                    <option>Inaccurate location name</option>
                                    <option>Other technical issue</option>
                                </select>
                                <textarea placeholder="Additional details (optional)..." className="w-full p-4 bg-gray-50 border border-transparent rounded-xl font-bold text-xs focus:ring-2 focus:ring-primary/20 focus:bg-white outline-none h-24 resize-none transition-all"></textarea>
                            </div>
                            <button onClick={resetFlow} className="w-full h-14 bg-primary text-white font-black uppercase tracking-widest text-[10px] rounded-2xl shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all">Submit Report & Reset</button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <main className="flex-grow flex items-center justify-center w-full max-w-lg relative">
                <AnimatePresence mode="wait">
                    {/* STEP: SELECT_TYPE */}
                    {currentStep === 'SELECT_TYPE' && (
                        <motion.div key="select" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.05 }} className={presets.card}>
                            <span className={presets.subtitle}>Simulation Setup</span>
                            <h1 className={presets.title}>Select Live Venue</h1>
                            <p className={`${presets.body} mt-4 mb-8`}>Test how the flow adapts to different business identities and setups.</p>

                            <div className="grid grid-cols-2 gap-4 mb-8">
                                {(Object.keys(businessConfigs) as BusinessType[]).map((type) => (
                                    <button
                                        key={type}
                                        onClick={() => { setBusinessType(type); setStep('SCANNING'); }}
                                        className="flex flex-col items-center gap-3 p-6 rounded-2xl bg-gray-50 border border-transparent hover:border-primary/20 hover:bg-white transition-all group text-center"
                                    >
                                        <span className="material-symbols-outlined text-gray-300 group-hover:text-primary transition-colors text-3xl">
                                            {businessConfigs[type].icon}
                                        </span>
                                        <div className="space-y-1">
                                            <p className="text-[10px] font-black uppercase tracking-widest text-text-main">
                                                {businessConfigs[type].label}
                                            </p>
                                            <p className="text-[8px] font-bold text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity">
                                                {businessConfigs[type].storeName}
                                            </p>
                                        </div>
                                    </button>
                                ))}
                            </div>

                            <div className="space-y-4">
                                <label className="flex items-center justify-between p-5 rounded-2xl bg-primary/5 hover:bg-primary/10 cursor-pointer group transition-all">
                                    <div className="flex gap-3 items-center">
                                        <span className="material-symbols-outlined text-primary text-xl">loyalty</span>
                                        <span className="text-[10px] font-black uppercase tracking-[0.1em] text-primary">Enable Reward PDF</span>
                                    </div>
                                    <input
                                        type="checkbox"
                                        checked={hasRewardSetup}
                                        onChange={(e) => setRewardSetup(e.target.checked)}
                                        className="size-5 accent-primary"
                                    />
                                </label>
                                <button
                                    onClick={() => { simulateReturningUser(8); setStep('SCANNING'); }}
                                    className="w-full h-12 rounded-xl border border-dashed border-gray-200 text-gray-400 text-[9px] font-black uppercase tracking-widest hover:border-primary/40 hover:text-primary transition-all"
                                >
                                    Test Returning User (Visit #8)
                                </button>
                            </div>
                        </motion.div>
                    )}

                    {/* STEP: SCANNING */}
                    {currentStep === 'SCANNING' && (
                        <motion.div key="scanning" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className={presets.card}>
                            <span className={presets.subtitle}>Connection Hub</span>
                            <h1 className={presets.title}>Locating...</h1>
                            <p className={`${presets.body} mt-4 mb-12`}>Syncing with the LaTap sensor at <span className="text-primary font-bold">{storeName}</span>.</p>

                            <div className="size-48 mx-auto relative flex items-center justify-center">
                                <motion.div animate={{ scale: [1, 1.3, 1], opacity: [0.1, 0.05, 0.1] }} transition={{ duration: 2, repeat: Infinity }} className="absolute inset-0 bg-primary/20 rounded-full" />
                                <div className="size-20 bg-white rounded-2xl shadow-xl flex items-center justify-center border border-gray-50 z-10 transition-transform hover:scale-110">
                                    <motion.span animate={{ rotate: [0, 10, 0, -10, 0] }} transition={{ duration: 2, repeat: Infinity }} className="material-symbols-outlined text-primary text-4xl">contactless</motion.span>
                                </div>
                            </div>
                            <p className="text-center text-[10px] font-black text-gray-300 uppercase tracking-widest mt-10 tracking-[0.4em] animate-pulse">Handshake in progress</p>
                        </motion.div>
                    )}

                    {currentStep === 'IDENTIFYING' && (
                        <motion.div key="id" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className={presets.card + " text-center"}>
                            <div className="size-16 bg-primary/5 rounded-full flex items-center justify-center mx-auto mb-8 border border-primary/10">
                                <span className="material-symbols-outlined text-primary animate-spin text-3xl">sync</span>
                            </div>
                            <h1 className={presets.title}>Verifying Device</h1>
                            <p className={presets.body + " mt-4"}>Checking security permissions and local visitor profile...</p>
                        </motion.div>
                    )}

                    {currentStep === 'WELCOME_BACK' && (
                        <motion.div key="welcome-back" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className={presets.card}>
                            <span className={presets.subtitle}>Recognition Success</span>
                            <h1 className={presets.title}>Welcome back to <br /><span className="text-primary">{storeName}</span></h1>
                            <p className={`${presets.body} mt-4 mb-10`}>Hello {userData?.name.split(' ')[0]}! We've recognized your Visit #{visitCount}.</p>

                            <div className="p-6 rounded-2xl bg-gray-50 border border-gray-100 flex items-center justify-between mb-10 relative overflow-hidden group">
                                <span className="material-symbols-outlined text-5xl absolute right-[-10px] bottom-[-10px] text-primary/5 group-hover:scale-125 transition-transform">{config.icon}</span>
                                <div className="z-10">
                                    <p className="text-[10px] font-black uppercase text-gray-400 mb-1">Membership Status</p>
                                    <p className="text-sm font-bold text-text-main flex items-center gap-2">
                                        Frequent Visitor
                                        <span className="material-symbols-outlined text-green-500 text-sm">verified</span>
                                    </p>
                                </div>
                            </div>

                            <button onClick={() => setStep('OUTCOME')} className={presets.button}>
                                {config.actionLabel}
                                <span className="material-symbols-outlined text-sm">arrow_forward</span>
                            </button>
                        </motion.div>
                    )}

                    {currentStep === 'WELCOME' && (
                        <motion.div key="welcome" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className={presets.card}>
                            <span className={presets.subtitle}>Initial Discovery</span>
                            <h1 className={presets.title}>Welcome to <br />{storeName}</h1>
                            <p className={`${presets.body} mt-4 mb-12`}>Access the full digital experience of this {config.label} instantly.</p>
                            <button onClick={() => setStep('PRIVACY')} className={presets.button}>Open Experience</button>
                        </motion.div>
                    )}

                    {currentStep === 'PRIVACY' && (
                        <motion.div key="privacy" initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className={presets.card}>
                            <h1 className={presets.title}>Privacy Guard</h1>
                            <p className={`${presets.body} mt-4 mb-10`}>LaTap uses secure encryption to link your physical presence to your digital rewards. No data is sold.</p>

                            <label className="flex items-start gap-4 p-5 rounded-2xl border border-gray-100 bg-gray-50 mb-10 cursor-pointer group hover:bg-white hover:border-primary/20 transition-all">
                                <input
                                    type="checkbox"
                                    checked={hasConsented}
                                    onChange={(e) => setHasConsented(e.target.checked)}
                                    className="size-5 accent-primary mt-1"
                                />
                                <div>
                                    <p className="text-[10px] font-black uppercase tracking-widest text-text-main group-hover:text-primary">I Consent & Verify</p>
                                    <p className="text-[10px] font-bold text-gray-400 mt-1 leading-tight">Enables your unique Visitor ID for future recognition.</p>
                                </div>
                            </label>

                            <button onClick={() => setStep('FORM')} disabled={!hasConsented} className={presets.button}>Accept & Continue</button>
                        </motion.div>
                    )}

                    {currentStep === 'FORM' && (
                        <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className={presets.card}>
                            <h1 className={presets.title}>Create Digital Profile</h1>
                            <p className={`${presets.body} mt-4 mb-10`}>Tell us where to send your digital perks for {storeName}.</p>

                            <form className="space-y-4" onSubmit={handleFormSubmit}>
                                <input type="text" name="name" placeholder="Full Name" className={presets.input} required />
                                <input type="email" name="email" placeholder="Email Address" className={presets.input} required />
                                <input type="tel" name="phone" placeholder="Phone Number" className={presets.input} required />
                                <button type="submit" className={presets.button + " mt-6"}>Finalize Setup</button>
                            </form>
                        </motion.div>
                    )}

                    {currentStep === 'OUTCOME' && (
                        <motion.div key="outcome" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className={presets.card}>
                            <div className="flex flex-col items-center text-center">
                                <div className="size-20 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mb-8 shadow-inner">
                                    <span className="material-symbols-outlined text-4xl">{config.specificIcon}</span>
                                </div>
                                <h1 className={presets.title}>{config.outcomeTitle}</h1>
                                <p className={`${presets.body} mt-4 mb-10`}>{config.outcomeDesc}</p>

                                {hasRewardSetup && (
                                    <motion.div
                                        initial={{ y: 20, opacity: 0 }}
                                        whileInView={{ y: 0, opacity: 1 }}
                                        className="w-full bg-gradient-to-br from-primary to-[#1e40af] rounded-2xl p-8 text-white relative overflow-hidden mb-10 text-left shadow-2xl shadow-primary/20"
                                    >
                                        <div className="absolute top-[-20px] right-[-20px] size-32 bg-white/10 rounded-full blur-2xl"></div>
                                        <div className="relative z-10">
                                            <p className="text-[10px] font-black uppercase tracking-widest opacity-60 mb-1">Digital Perk Voted</p>
                                            <h3 className="text-4xl font-black italic mb-8 tracking-tighter">Access Token</h3>

                                            <button
                                                onClick={handleDownloadReward}
                                                disabled={isDownloading}
                                                className="w-full h-12 bg-white text-primary font-black uppercase tracking-widest text-[10px] rounded-xl flex items-center justify-center gap-2 hover:bg-gray-50 transition-all disabled:bg-white/50"
                                            >
                                                {isDownloading ? (
                                                    <span className="animate-spin material-symbols-outlined text-sm">sync</span>
                                                ) : (
                                                    <span className="material-symbols-outlined text-sm">picture_as_pdf</span>
                                                )}
                                                {isDownloading ? 'Downloading...' : 'Auto-Save Reward PDF'}
                                            </button>
                                        </div>
                                    </motion.div>
                                )}

                                <div className="w-full space-y-4">
                                    {!hasRewardSetup && (
                                        <button onClick={() => setStep('FINAL_SUCCESS')} className={presets.button}>{config.actionLabel}</button>
                                    )}
                                    <button onClick={() => toggleFeedback(true)} className="text-[10px] font-black text-gray-300 uppercase tracking-widest hover:text-red-400 transition-colors">Problem with this?</button>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {/* FINAL SUCCESS STEP */}
                    {currentStep === 'FINAL_SUCCESS' && (
                        <motion.div key="final" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className={presets.card + " text-center"}>
                            <div className="size-24 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-10 shadow-2xl shadow-green-200">
                                <span className="material-symbols-outlined text-white text-4xl font-black">celebration</span>
                            </div>
                            <h1 className={presets.title}>Task Achieved!</h1>
                            <p className={`${presets.body} mt-4 mb-12 italic`}>
                                You've successfully interacted with <span className="text-primary font-bold">{storeName}</span> via LaTap. Everything is ready for you.
                            </p>

                            <div className="space-y-4">
                                <button onClick={resetFlow} className={presets.button}>
                                    Close & Return to Start
                                </button>
                                <p className="text-[9px] font-black uppercase tracking-widest text-gray-300">Thank you for using LaTap</p>
                            </div>
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
