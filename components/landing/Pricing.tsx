'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { CheckCircle2 } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { fetchPricingPlans } from '@/lib/api/pricing';
import { useAuthStore } from '@/store/useAuthStore';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import SubscriptionCheckout from '@/components/dashboard/SubscriptionCheckout';

export default function Pricing() {
    const router = useRouter();
    const { user, subscribe, isAuthenticated } = useAuthStore();
    const [checkoutPlan, setCheckoutPlan] = useState<any>(null);

    const { data: plans = [], isLoading } = useQuery({
        queryKey: ['subscription-plans'],
        queryFn: fetchPricingPlans
    });

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
        <section id="pricing" className="py-20 bg-white overflow-hidden relative border-t border-gray-100">
            <div className="max-w-7xl mx-auto px-6 sm:px-10 py-16">
                <div className="text-center max-w-2xl mx-auto mb-12">
                    <h2 className="text-3xl md:text-5xl font-display font-bold text-text-main mb-3">Enterprise-Grade <span className="text-primary italic">Licensing</span></h2>
                    <p className="text-base text-text-secondary font-medium">Clear pricing with no hidden fees.</p>
                </div>

                {/* Pricing Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
                    {mainPlans.map((plan, index) => {
                        const highlight = plan.isPopular;
                        const isCurrentPlan = user?.planId === plan.id;

                        return (
                            <div
                                key={index}
                                className={`
                                    relative flex flex-col p-5 rounded-2xl transition-all duration-300
                                    ${highlight
                                        ? 'bg-primary shadow-xl shadow-primary/20 text-white z-10 border-2 border-white/10'
                                        : 'bg-white border border-gray-100 shadow-lg hover:shadow-xl'
                                    }
                                `}
                            >
                                {highlight && (
                                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-white text-primary text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest shadow-sm">
                                        Most Popular
                                    </div>
                                )}
                                <div className="mb-4">
                                    <h3 className={`text-lg font-display font-bold mb-1 ${highlight ? 'text-white' : 'text-text-main'}`}>
                                        {plan.name}
                                    </h3>
                                    <p className={`text-xs font-medium ${highlight ? 'text-white/80' : 'text-text-secondary'}`}>
                                        {plan.description}
                                    </p>
                                </div>
                                <div className="mb-4">
                                    <span className="text-3xl font-display font-bold">{plan.price}</span>
                                    <span className={`text-xs font-medium ml-1 ${highlight ? 'text-white/70' : 'text-text-secondary'}`}>
                                        {plan.period}
                                    </span>
                                </div>
                                <ul className="space-y-2 mb-6 flex-1">
                                    {plan.features.slice(0, 4).map((feature, fIndex) => (
                                        <li key={fIndex} className="flex items-start gap-2 text-[10px] font-medium leading-tight">
                                            <CheckCircle2 className={`w-3.5 h-3.5 mt-0.5 shrink-0 ${highlight ? 'text-white' : 'text-primary'}`} />
                                            <span className={highlight ? 'text-white/90' : 'text-text-secondary'}>
                                                {feature}
                                            </span>
                                        </li>
                                    ))}
                                </ul>

                                <button
                                    onClick={() => handleSubscription(plan)}
                                    // Subscription logic kept, but display logic updated
                                    className={`
                                        w-full py-2.5 rounded-lg text-xs font-bold text-center transition-all cursor-pointer
                                        ${highlight
                                            ? 'bg-white text-primary hover:bg-gray-50 shadow-lg shadow-white/10'
                                            : 'bg-primary text-white hover:bg-primary/90 shadow-lg shadow-primary/10'
                                        }
                                    `}
                                >
                                    {plan.id === 'free' ? 'Get Started' : 'Subscribe'}
                                </button>
                            </div>
                        );
                    })}
                </div>

                {/* White Label Plan - Separate Row */}
                {enterprisePlan && (() => {
                    const isCurrentPlan = user?.planId === enterprisePlan.id;
                    return (
                        <div className="max-w-5xl mx-auto">
                            <div className="relative flex flex-col md:flex-row items-center gap-8 p-6 md:p-8 rounded-2xl bg-primary text-white shadow-xl shadow-primary/10 border border-white/10">
                                <div className="flex-1 text-center md:text-left">
                                    <div className="inline-block px-2.5 py-1 bg-white/20 text-white text-[8px] font-black rounded-full uppercase tracking-widest mb-3">
                                        Enterprise
                                    </div>
                                    <h3 className="text-xl md:text-2xl font-bold mb-1 font-display tracking-tight text-white">
                                        {enterprisePlan.name}
                                    </h3>
                                    <p className="text-xs mb-6 font-medium text-white/80 max-w-xl">
                                        {enterprisePlan.description}
                                    </p>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-2">
                                        {enterprisePlan.features.slice(0, 4).map((item, i) => (
                                            <li key={i} className="flex items-center text-xs font-semibold gap-2.5 list-none justify-center md:justify-start">
                                                <CheckCircle2 size={14} className="text-white shrink-0" />
                                                <span className="text-white/90">{item}</span>
                                            </li>
                                        ))}
                                    </div>
                                </div>
                                <div className="flex flex-col items-center md:items-end gap-5 shrink-0">
                                    <div className="text-center md:text-right">
                                        <span className="text-3xl md:text-4xl font-bold block leading-none">{enterprisePlan.price}</span>
                                        {enterprisePlan.period && <span className="text-xs font-bold opacity-60 mt-1 block tracking-wider">{enterprisePlan.period}</span>}
                                    </div>
                                    <button
                                        onClick={() => isCurrentPlan ? null : handleSubscription(enterprisePlan)}
                                        disabled={isCurrentPlan}
                                        className={`
                                            px-8 py-3 rounded-xl text-sm font-bold text-center transition-all bg-white text-primary shadow-lg shadow-white/10 hover:scale-[1.02] active:scale-[0.98]
                                            ${isCurrentPlan
                                                ? 'opacity-50 cursor-not-allowed shadow-none'
                                                : ''
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
        </section >
    );
}
