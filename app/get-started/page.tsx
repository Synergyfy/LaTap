'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import AuthSidePanel from '@/components/auth/AuthSidePanel';
import { useAuthStore } from '@/store/useAuthStore';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import Logo from '@/components/brand/Logo';

export default function GetStarted() {
    const router = useRouter();
    const { signup } = useAuthStore();
    const [step, setStep] = useState(1);
    const [subStep, setSubStep] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        businessName: '',
        businessLogo: null as string | null,
        category: '',
        role: 'Owner' as 'Owner' | 'Manager',
        visitors: '',
        whatsappNumber: '',
        officialEmail: '',
        businessNumber: '',
        goals: [] as string[],
        serialNumber: '',
        otp: '',
        agreeToTerms: false
    });

    const categories = ['Retail', 'Hospitality', 'Events & Booths', 'Service Centers', 'Professional Office'];
    const goals = ['Capture Leads', 'Automated Rewards', 'Customer Feedback', 'Digital Loyalty'];

    const nextStep = () => {
        if (step === 3 && subStep < 8) {
            setSubStep(prev => prev + 1);
        } else {
            setStep(prev => prev + 1);
            setSubStep(1);
        }
    };
    const prevStep = () => {
        if (step === 3 && subStep > 1) {
            setSubStep(prev => prev - 1);
        } else {
            setStep(prev => prev - 1);
            if (step === 4) setSubStep(8);
        }
    };

    const handleFinalize = async () => {
        setIsLoading(true);
        try {
            const userData = {
                email: formData.email,
                name: `${formData.firstName} ${formData.lastName}`,
                role: formData.role.toLowerCase() as any,
                businessName: formData.businessName,
                businessLogo: formData.businessLogo,
                businessGoals: formData.goals,
                businessId: 'new_' + Math.random().toString(36).substr(2, 6)
            };

            await signup(userData);
            setStep(6);

            // Auto redirect to Plan Selection after 3 seconds
            setTimeout(() => {
                router.push('/pricing');
            }, 3000);
        } catch (error) {
            toast.error('Failed to create account. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="h-screen bg-white flex overflow-hidden font-sans">
            {/* Left Side: Form */}
            <div className="w-full lg:w-1/2 flex flex-col overflow-y-auto">
                <div className="p-8 md:p-16 lg:p-24">
                    <Logo className="flex items-center gap-3" />

                    <div className="max-w-md w-full mx-auto lg:mx-0">
                        {/* Progress Bar */}
                        <div className="flex gap-1.5 mb-12">
                            {[1, 2, 3, 4, 5, 6].map(s => {
                                let progress = 0;
                                if (step > s) progress = 100;
                                else if (step === s) {
                                    if (step === 3) progress = (subStep / 8) * 100;
                                    else progress = 100;
                                }
                                return (
                                    <div key={s} className="h-1 flex-1 bg-gray-100 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-primary transition-all duration-500 ease-out"
                                            style={{ width: `${progress}%` }}
                                        ></div>
                                    </div>
                                );
                            })}
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
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-1.5">
                                                <label className="text-[10px] font-black uppercase tracking-widest text-text-secondary ml-1">First Name</label>
                                                <div className="relative">
                                                    <span className="material-icons-round absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg">person</span>
                                                    <input
                                                        type="text"
                                                        placeholder="Daniel"
                                                        className="w-full h-12 bg-gray-50 border border-gray-100 rounded-xl pl-12 pr-5 font-medium outline-none focus:ring-2 focus:ring-primary/20 focus:bg-white transition-all text-sm"
                                                        value={formData.firstName}
                                                        onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                                                    />
                                                </div>
                                            </div>
                                            <div className="space-y-1.5">
                                                <label className="text-[10px] font-black uppercase tracking-widest text-text-secondary ml-1">Last Name</label>
                                                <div className="relative">
                                                    <span className="material-icons-round absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg">person</span>
                                                    <input
                                                        type="text"
                                                        placeholder="Smith"
                                                        className="w-full h-12 bg-gray-50 border border-gray-100 rounded-xl pl-12 pr-5 font-medium outline-none focus:ring-2 focus:ring-primary/20 focus:bg-white transition-all text-sm"
                                                        value={formData.lastName}
                                                        onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                                                    />
                                                </div>
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
                                            className="w-full h-14 bg-primary text-white font-bold rounded-xl shadow-lg shadow-primary/20 hover:bg-primary-hover transition-all flex items-center justify-center gap-2 text-sm mt-4 disabled:opacity-50 disabled:cursor-not-allowed active:scale-95"
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
                                        <h1 className="text-2xl font-display font-bold text-text-main mb-2 leading-tight tracking-tight">
                                            {subStep === 1 && "What's the name of your space?"}
                                            {subStep === 2 && "Add your brand's face"}
                                            {subStep === 3 && "What describes you best?"}
                                            {subStep === 4 && "What kind of space is it?"}
                                            {subStep === 5 && "WhatsApp & Official Email"}
                                            {subStep === 6 && "Reach you at Business Number"}
                                            {subStep === 7 && "How many visitors do you see?"}
                                            {subStep === 8 && "What are your goals?"}
                                        </h1>
                                        <p className="text-[13px] text-text-secondary font-medium leading-relaxed">
                                            {subStep === 1 && "Start with the name customers know you by."}
                                            {subStep === 2 && "Upload your logo to personalize your dashboard and customer tags."}
                                            {subStep === 3 && "This helps us tailor the dashboard features for you."}
                                            {subStep === 4 && "Select the category that best fits your business."}
                                            {subStep === 5 && "Important for campaign communications and support."}
                                            {subStep === 6 && "The primary number for your business operations."}
                                            {subStep === 7 && "This helps us optimize your experience for your footfall volume."}
                                            {subStep === 8 && "Tell us what you want to achieve with VemTap."}
                                        </p>
                                    </div>

                                    <div className="space-y-6">
                                        {subStep === 1 && (
                                            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-1.5">
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
                                            </motion.div>
                                        )}

                                        {subStep === 2 && (
                                            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-3">
                                                <label className="text-[10px] font-black uppercase tracking-widest text-text-secondary ml-1">Business Logo</label>
                                                <div className="flex flex-col items-center gap-6 p-8 border-2 border-dashed border-gray-100 rounded-[2rem] bg-gray-50/50">
                                                    <div className="size-24 rounded-3xl bg-white border border-gray-100 flex items-center justify-center overflow-hidden shadow-sm">
                                                        {formData.businessLogo ? (
                                                            <img src={formData.businessLogo} alt="Logo Preview" className="w-full h-full object-contain p-2" />
                                                        ) : (
                                                            <span className="material-icons-round text-gray-300 text-4xl">image</span>
                                                        )}
                                                    </div>
                                                    <div className="text-center">
                                                        <input
                                                            type="file"
                                                            accept="image/*"
                                                            id="logo-upload"
                                                            className="hidden"
                                                            onChange={(e) => {
                                                                const file = e.target.files?.[0];
                                                                if (file) {
                                                                    const reader = new FileReader();
                                                                    reader.onloadend = () => {
                                                                        setFormData({ ...formData, businessLogo: reader.result as string });
                                                                    };
                                                                    reader.readAsDataURL(file);
                                                                }
                                                            }}
                                                        />
                                                        <label htmlFor="logo-upload" className="inline-flex px-6 py-3 bg-primary text-white rounded-xl text-xs font-bold cursor-pointer transition-all shadow-lg shadow-primary/20 active:scale-95">
                                                            Upload Brand Logo
                                                        </label>
                                                        <p className="text-[10px] text-text-secondary mt-3 font-medium">PNG or SVG, max. 2MB</p>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        )}

                                        {subStep === 3 && (
                                            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-3">
                                                <label className="text-[10px] font-black uppercase tracking-widest text-text-secondary ml-1">Your Role</label>
                                                <div className="grid grid-cols-1 gap-3">
                                                    {['Owner', 'Manager'].map((r) => (
                                                        <button
                                                            key={r}
                                                            onClick={() => setFormData({ ...formData, role: r as any })}
                                                            className={`h-16 rounded-2xl text-xs font-bold transition-all border flex items-center justify-between px-6 ${formData.role === r ? 'bg-primary/5 border-primary/20 text-primary' : 'bg-gray-50 border-gray-100 text-text-secondary hover:bg-gray-100'}`}
                                                        >
                                                            <div className="flex items-center gap-3">
                                                                <span className="material-icons-round text-xl">{r === 'Owner' ? 'grade' : 'badge'}</span>
                                                                Business {r}
                                                            </div>
                                                            {formData.role === r && <span className="material-icons-round text-primary text-sm">check_circle</span>}
                                                        </button>
                                                    ))}
                                                </div>
                                            </motion.div>
                                        )}

                                        {subStep === 4 && (
                                            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-3">
                                                <label className="text-[10px] font-black uppercase tracking-widest text-text-secondary ml-1">Business Type</label>
                                                <div className="grid grid-cols-2 gap-2">
                                                    {categories.map(c => (
                                                        <button
                                                            key={c}
                                                            onClick={() => setFormData({ ...formData, category: c })}
                                                            className={`px-4 py-3 rounded-xl text-[11px] font-bold transition-all border text-center ${formData.category === c ? 'bg-primary/5 border-primary/20 text-primary' : 'bg-gray-50 border-gray-100 text-text-secondary hover:bg-gray-100'}`}
                                                        >
                                                            {c}
                                                        </button>
                                                    ))}
                                                </div>
                                            </motion.div>
                                        )}

                                        {subStep === 5 && (
                                            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
                                                <div className="space-y-1.5">
                                                    <label className="text-[10px] font-black uppercase tracking-widest text-text-secondary ml-1">WhatsApp Number</label>
                                                    <div className="relative">
                                                        <span className="material-icons-round absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg">message</span>
                                                        <input
                                                            type="tel"
                                                            placeholder="+234 801 234 5678"
                                                            className="w-full h-12 bg-gray-50 border border-gray-100 rounded-xl pl-12 pr-5 font-medium outline-none focus:ring-2 focus:ring-primary/20 focus:bg-white transition-all text-sm"
                                                            value={formData.whatsappNumber}
                                                            onChange={(e) => setFormData({ ...formData, whatsappNumber: e.target.value })}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="space-y-1.5">
                                                    <label className="text-[10px] font-black uppercase tracking-widest text-text-secondary ml-1">Official Email</label>
                                                    <div className="relative">
                                                        <span className="material-icons-round absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg">alternate_email</span>
                                                        <input
                                                            type="email"
                                                            placeholder="hello@business.com"
                                                            className="w-full h-12 bg-gray-50 border border-gray-100 rounded-xl pl-12 pr-5 font-medium outline-none focus:ring-2 focus:ring-primary/20 focus:bg-white transition-all text-sm"
                                                            value={formData.officialEmail}
                                                            onChange={(e) => setFormData({ ...formData, officialEmail: e.target.value })}
                                                        />
                                                    </div>
                                                </div>
                                            </motion.div>
                                        )}

                                        {subStep === 6 && (
                                            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-1.5">
                                                <label className="text-[10px] font-black uppercase tracking-widest text-text-secondary ml-1">Business Phone Number</label>
                                                <div className="relative">
                                                    <span className="material-icons-round absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg">phone</span>
                                                    <input
                                                        type="tel"
                                                        placeholder="+234 801 234 5678"
                                                        className="w-full h-12 bg-gray-50 border border-gray-100 rounded-xl pl-12 pr-5 font-medium outline-none focus:ring-2 focus:ring-primary/20 focus:bg-white transition-all text-sm"
                                                        value={formData.businessNumber}
                                                        onChange={(e) => setFormData({ ...formData, businessNumber: e.target.value })}
                                                    />
                                                </div>
                                            </motion.div>
                                        )}

                                        {subStep === 7 && (
                                            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-3">
                                                <label className="text-[10px] font-black uppercase tracking-widest text-text-secondary ml-1">Monthly Visitors</label>
                                                <div className="grid grid-cols-1 gap-2">
                                                    {['0-500', '501-2000', '2001-5000', '5000+'].map(range => (
                                                        <button
                                                            key={range}
                                                            onClick={() => setFormData({ ...formData, visitors: range })}
                                                            className={`w-full h-14 rounded-xl px-6 text-sm font-bold transition-all border flex items-center justify-between ${formData.visitors === range ? 'bg-primary/5 border-primary/20 text-primary' : 'bg-gray-50 border-gray-100 text-text-secondary hover:bg-gray-100'}`}
                                                        >
                                                            <span>{range.includes('+') ? range : `${range} visitors`}</span>
                                                            {formData.visitors === range && <span className="material-icons-round text-primary text-sm">check_circle</span>}
                                                        </button>
                                                    ))}
                                                </div>
                                            </motion.div>
                                        )}

                                        {subStep === 8 && (
                                            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-3">
                                                <label className="text-[10px] font-black uppercase tracking-widest text-text-secondary ml-1">Select Goals</label>
                                                <div className="grid grid-cols-1 gap-2">
                                                    {goals.map(goal => (
                                                        <button
                                                            key={goal}
                                                            onClick={() => {
                                                                const newGoals = formData.goals.includes(goal)
                                                                    ? formData.goals.filter(g => g !== goal)
                                                                    : [...formData.goals, goal];
                                                                setFormData({ ...formData, goals: newGoals });
                                                            }}
                                                            className={`w-full h-14 rounded-xl px-6 text-sm font-bold transition-all border flex items-center justify-between ${formData.goals.includes(goal) ? 'bg-primary/5 border-primary/20 text-primary' : 'bg-gray-50 border-gray-100 text-text-secondary hover:bg-gray-100'}`}
                                                        >
                                                            <span>{goal}</span>
                                                            {formData.goals.includes(goal) && <span className="material-icons-round text-primary text-sm">check_circle</span>}
                                                        </button>
                                                    ))}
                                                </div>
                                            </motion.div>
                                        )}

                                        <div className="flex gap-4 pt-4">
                                            <button onClick={prevStep} className="h-12 px-8 border border-gray-100 text-text-main font-bold rounded-xl hover:bg-gray-50 transition-all text-sm">Back</button>
                                            <button
                                                onClick={nextStep}
                                                disabled={
                                                    (subStep === 1 && !formData.businessName) ||
                                                    (subStep === 3 && !formData.role) ||
                                                    (subStep === 4 && !formData.category) ||
                                                    (subStep === 5 && (!formData.whatsappNumber || !formData.officialEmail)) ||
                                                    (subStep === 6 && !formData.businessNumber) ||
                                                    (subStep === 7 && !formData.visitors) ||
                                                    (subStep === 8 && formData.goals.length === 0)
                                                }
                                                className="flex-1 h-12 bg-primary text-white font-bold rounded-xl shadow-lg shadow-primary/20 hover:bg-primary-hover transition-all text-sm disabled:opacity-50"
                                            >
                                                {subStep === 8 ? "Save & Continue" : "Next Question"}
                                            </button>
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
                                        <h1 className="text-2xl font-display font-bold text-text-main mb-2 leading-tight tracking-tight">Select your objectives</h1>
                                        <p className="text-[13px] text-text-secondary font-medium leading-relaxed">Choose one or more things you'd like to achieve with VemTap.</p>
                                    </div>

                                    <div className="grid grid-cols-1 gap-3">
                                        {goals.map(g => (
                                            <button
                                                key={g}
                                                onClick={() => {
                                                    const newGoals = formData.goals.includes(g)
                                                        ? formData.goals.filter(item => item !== g)
                                                        : [...formData.goals, g];
                                                    setFormData({ ...formData, goals: newGoals });
                                                }}
                                                className={`w-full p-5 rounded-2xl border flex items-center justify-between transition-all ${formData.goals.includes(g) ? 'bg-primary/5 border-primary/20' : 'bg-gray-50 border-gray-100 hover:border-gray-200'}`}
                                            >
                                                <span className={`text-sm font-bold ${formData.goals.includes(g) ? 'text-primary' : 'text-text-main'}`}>{g}</span>
                                                {formData.goals.includes(g) && <span className="material-icons-round text-primary">check_circle</span>}
                                            </button>
                                        ))}
                                    </div>

                                    <div className="flex gap-4 pt-4">
                                        <button onClick={prevStep} className="h-12 px-8 border border-gray-100 text-text-main font-bold rounded-xl hover:bg-gray-50 transition-all text-sm">Back</button>
                                        <button
                                            onClick={nextStep}
                                            disabled={formData.goals.length === 0}
                                            className="flex-1 h-12 bg-primary text-white font-bold rounded-xl shadow-lg shadow-primary/20 hover:bg-primary-hover transition-all text-sm flex items-center justify-center gap-2 disabled:opacity-50"
                                        >
                                            Continue to Review
                                            <span className="material-icons-round text-lg">arrow_forward</span>
                                        </button>
                                    </div>
                                </motion.div>
                            )}

                            {step === 5 && (
                                <motion.div
                                    key="step5"
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 20 }}
                                    className="space-y-8"
                                >
                                    <div>
                                        <h1 className="text-2xl font-display font-bold text-text-main mb-2 leading-tight tracking-tight">Review your details</h1>
                                        <p className="text-[13px] text-text-secondary font-medium leading-relaxed">Check everything over before we create your account.</p>
                                    </div>

                                    <div className="space-y-4 bg-gray-50 rounded-2xl p-6 border border-gray-100">
                                        <div className="flex items-center gap-4 border-b border-gray-200 pb-4 mb-4">
                                            <div className="size-16 rounded-xl bg-white border border-gray-200 flex items-center justify-center overflow-hidden shadow-sm">
                                                {formData.businessLogo ? (
                                                    <img src={formData.businessLogo} alt="Logo" className="w-full h-full object-contain p-2" />
                                                ) : (
                                                    <span className="material-icons-round text-gray-200 text-2xl">storefront</span>
                                                )}
                                            </div>
                                            <div>
                                                <h3 className="font-bold text-text-main">{formData.businessName}</h3>
                                                <p className="text-[10px] font-black text-primary uppercase tracking-wider">{formData.category}</p>
                                            </div>
                                        </div>

                                        <div className="space-y-4">
                                            <div className="grid grid-cols-2 gap-4">
                                                <div>
                                                    <p className="text-[10px] font-black text-text-secondary uppercase tracking-widest mb-1">Account Owner</p>
                                                    <p className="text-xs font-bold text-text-main">{formData.firstName} {formData.lastName}</p>
                                                </div>
                                                <div>
                                                    <p className="text-[10px] font-black text-text-secondary uppercase tracking-widest mb-1">Email</p>
                                                    <p className="text-xs font-bold text-text-main">{formData.email}</p>
                                                </div>
                                            </div>

                                            <div>
                                                <p className="text-[10px] font-black text-text-secondary uppercase tracking-widest mb-1">Target Objectives</p>
                                                <div className="flex flex-wrap gap-1.5 mt-2">
                                                    {formData.goals.map(g => (
                                                        <span key={g} className="px-2 py-1 bg-white border border-gray-200 rounded-lg text-[10px] font-bold text-text-main">
                                                            {g}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-2 gap-4 pt-2">
                                                <div>
                                                    <p className="text-[10px] font-black text-text-secondary uppercase tracking-widest mb-1">Visitors Scale</p>
                                                    <p className="text-xs font-bold text-text-main">{formData.visitors}</p>
                                                </div>
                                                <div>
                                                    <p className="text-[10px] font-black text-text-secondary uppercase tracking-widest mb-1">Role</p>
                                                    <p className="text-xs font-bold text-text-main">{formData.role}</p>
                                                </div>
                                                <div>
                                                    <p className="text-[10px] font-black text-text-secondary uppercase tracking-widest mb-1">WhatsApp</p>
                                                    <p className="text-xs font-bold text-text-main">{formData.whatsappNumber || 'Not set'}</p>
                                                </div>
                                                <div>
                                                    <p className="text-[10px] font-black text-text-secondary uppercase tracking-widest mb-1">Official Email</p>
                                                    <p className="text-xs font-bold text-text-main break-all">{formData.officialEmail || 'Not set'}</p>
                                                </div>
                                                <div className="col-span-2">
                                                    <p className="text-[10px] font-black text-text-secondary uppercase tracking-widest mb-1">Business Phone</p>
                                                    <p className="text-xs font-bold text-text-main">{formData.businessNumber || 'Not set'}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex gap-4 pt-4">
                                        <button onClick={prevStep} className="h-12 px-8 border border-gray-100 text-text-main font-bold rounded-xl hover:bg-gray-50 transition-all text-sm">Back</button>
                                        <button
                                            onClick={handleFinalize}
                                            disabled={isLoading}
                                            className="flex-1 h-12 bg-primary text-white font-bold rounded-xl shadow-lg shadow-primary/20 hover:bg-primary-hover transition-all text-sm flex items-center justify-center gap-2"
                                        >
                                            {isLoading ? (
                                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                            ) : (
                                                <>
                                                    Confirm & Create Account
                                                    <span className="material-icons-round text-lg">verified</span>
                                                </>
                                            )}
                                        </button>
                                    </div>
                                </motion.div>
                            )}

                            {step === 6 && (
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
                                description: "Your dashboard is ready. Start creating your first NFC message and watch the data flow in.",
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
