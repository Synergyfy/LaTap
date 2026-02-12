'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { fetchPricingPlans } from '@/lib/api/pricing';
import { useAuthStore, SubscriptionPlan } from '@/store/useAuthStore';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import SubscriptionCheckout from '@/components/dashboard/SubscriptionCheckout';

export default function Pricing() {
    const router = useRouter();
    const { user, subscribe, isAuthenticated } = useAuthStore();
    const [checkoutPlan, setCheckoutPlan] = useState<any>(null);
    const scrollContainerRef = React.useRef<HTMLDivElement>(null);

    const { data: plans = [], isLoading } = useQuery({
        queryKey: ['subscription-plans'],
        queryFn: fetchPricingPlans
    });

    const scroll = (direction: 'left' | 'right') => {
        if (scrollContainerRef.current) {
            const scrollAmount = 400; // card width + gap
            scrollContainerRef.current.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth'
            });
        }
    };

    const handleSubscription = async (plan: any) => {
        if (!isAuthenticated) {
            router.push('/login');
            return;
        }

        if (plan.id === 'free') {
            const res = await subscribe('free');
            if (res.success) toast.success('Switched to Free plan!');
            else toast.error(res.error || 'Failed to update plan');
        } else {
            setCheckoutPlan(plan);
        }
    };

    if (isLoading) return (
        <div className="py-24 bg-gray-50 flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
    );

    const mainPlans = plans.filter(plan => plan.id !== 'white-label');
    const enterprisePlan = plans.find(plan => plan.id === 'white-label');

    return (
        <section id="pricing" className="py-24 bg-gray-50 overflow-hidden relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-16 gap-8 text-center md:text-left">
                    <div className="max-w-2xl">
                        <h2 className="text-4xl md:text-5xl font-display font-bold mb-6 text-text-main">Smart plans for every scale</h2>
                        <p className="text-lg text-text-secondary font-medium px-4 md:px-0">Clear pricing with no hidden fees. All plans include secure NFC technology.</p>
                    </div>

                    <div className="flex gap-4">
                        <button
                            onClick={() => scroll('left')}
                            className="size-12 rounded-full border border-gray-200 bg-white flex items-center justify-center text-text-main shadow-sm hover:bg-gray-50 hover:border-gray-300 transition-all active:scale-90"
                        >
                            <span className="material-icons-round">chevron_left</span>
                        </button>
                        <button
                            onClick={() => scroll('right')}
                            className="size-12 rounded-full border border-gray-200 bg-white flex items-center justify-center text-text-main shadow-sm hover:bg-gray-50 hover:border-gray-300 transition-all active:scale-90"
                        >
                            <span className="material-icons-round">chevron_right</span>
                        </button>
                    </div>
                </div>

                {/* Swipable Pricing Cards - Single Line */}
                <div className="relative mb-16">
                    <div
                        ref={scrollContainerRef}
                        className="flex gap-6 overflow-x-auto snap-x snap-mandatory no-scrollbar pb-8 px-4 -mx-4 scroll-smooth"
                        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                    >
                        {mainPlans.map((plan, index) => {
                            const highlight = plan.isPopular;
                            const tagLabel = highlight ? "Best Value" : null;
                            const isCurrentPlan = user?.planId === plan.id;

                            return (
                                <div
                                    key={index}
                                    className={`
                                        relative flex flex-col p-8 rounded-[2.5rem] transition-all duration-500 
                                        min-w-[320px] md:min-w-[400px] snap-center
                                        ${highlight
                                            ? 'bg-primary shadow-2xl shadow-primary/30 text-white'
                                            : 'bg-white border border-gray-100 shadow-sm hover:shadow-xl'
                                        }
                                    `}
                                >
                                    {tagLabel && (
                                        <div className="absolute top-6 right-6 bg-white/20 text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest">
                                            {tagLabel}
                                        </div>
                                    )}
                                    <h3 className={`text-xl font-bold mb-2 font-display ${highlight ? 'text-white' : 'text-text-main'}`}>
                                        {plan.name}
                                    </h3>
                                    <p className={`text-sm mb-8 font-medium ${highlight ? 'text-white/80' : 'text-gray-400'}`}>
                                        {plan.description}
                                    </p>
                                    <div className={`flex items-baseline mb-8 ${highlight ? 'text-white' : ''}`}>
                                        <span className={`text-4xl font-bold ${!highlight ? 'text-text-main' : ''}`}>{plan.price}</span>
                                        {plan.period && <span className={`ml-2 font-bold text-sm ${highlight ? 'opacity-70' : 'text-gray-400'}`}>{plan.period}</span>}
                                    </div>
                                    <ul className={`space-y-4 mb-10 flex-1 ${highlight ? 'text-white' : ''}`}>
                                        {plan.features.map((item, i) => (
                                            <li key={i} className="flex items-center text-sm font-semibold gap-3">
                                                <CheckCircle2 size={18} className={highlight ? 'text-green-400' : 'text-primary'} />
                                                {highlight ? item : <span className="text-text-secondary">{item}</span>}
                                            </li>
                                        ))}
                                    </ul>
                                    <button
                                        onClick={() => isCurrentPlan ? null : handleSubscription(plan)}
                                        disabled={isCurrentPlan}
                                        className={`
                                            w-full py-4 rounded-2xl font-bold text-center transition-all cursor-pointer shadow-lg
                                            ${isCurrentPlan
                                                ? 'bg-gray-100 text-gray-400 cursor-not-allowed shadow-none'
                                                : highlight
                                                    ? 'bg-white text-primary hover:bg-blue-50'
                                                    : 'border-2 border-primary text-primary hover:bg-primary hover:text-white'
                                            }
                                        `}
                                    >
                                        {isCurrentPlan ? 'Current Plan' : plan.id === 'free' ? 'Get Started' : 'Subscribe'}
                                    </button>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* White Label Plan - Separate Row */}
                {enterprisePlan && (() => {
                    const isCurrentPlan = user?.planId === enterprisePlan.id;
                    return (
                        <div className="max-w-4xl mx-auto">
                            <div className="relative flex flex-col md:flex-row items-center gap-8 p-8 md:p-10 rounded-[2.5rem] bg-linear-to-br from-gray-900 to-gray-800 text-white shadow-2xl border border-gray-700">
                                <div className="flex-1">
                                    <div className="inline-block px-3 py-1 bg-white/10 text-white text-[10px] font-black rounded-full uppercase tracking-widest mb-4">
                                        Enterprise
                                    </div>
                                    <h3 className="text-2xl md:text-3xl font-bold mb-2 font-display">
                                        {enterprisePlan.name}
                                    </h3>
                                    <p className="text-sm mb-6 font-medium text-white/80">
                                        {enterprisePlan.description}
                                    </p>
                                    <ul className="space-y-3 mb-6">
                                        {enterprisePlan.features.slice(0, 4).map((item, i) => (
                                            <li key={i} className="flex items-center text-sm font-semibold gap-3">
                                                <CheckCircle2 size={16} className="text-green-400" />
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="flex flex-col items-center md:items-end gap-4">
                                    <div className="text-center md:text-right">
                                        <span className="text-4xl md:text-5xl font-bold block">{enterprisePlan.price}</span>
                                        {enterprisePlan.period && <span className="text-sm font-bold opacity-70">{enterprisePlan.period}</span>}
                                    </div>
                                    <button
                                        onClick={() => isCurrentPlan ? null : handleSubscription(enterprisePlan)}
                                        disabled={isCurrentPlan}
                                        className={`
                                            px-8 py-4 rounded-2xl font-bold text-center transition-all shadow-lg whitespace-nowrap
                                            ${isCurrentPlan
                                                ? 'bg-gray-700 text-gray-400 cursor-not-allowed shadow-none'
                                                : 'bg-white text-gray-900 hover:bg-gray-100'
                                            }
                                        `}
                                    >
                                        {isCurrentPlan ? 'Current Plan' : 'Contact Sales'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    );
                })()}

                {checkoutPlan && (
                    <SubscriptionCheckout
                        isOpen={!!checkoutPlan}
                        onClose={() => setCheckoutPlan(null)}
                        plan={checkoutPlan}
                    />
                )}
            </div>
        </section>
    );
}
