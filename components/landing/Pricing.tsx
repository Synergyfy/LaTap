'use client';

import Link from 'next/link';
import { CheckCircle2 } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { fetchPricingPlans } from '@/lib/api/pricing';

export default function Pricing() {
    const { data: plans = [], isLoading } = useQuery({
        queryKey: ['subscription-plans'],
        queryFn: fetchPricingPlans
    });

    if (isLoading) return (
        <div className="py-24 bg-gray-50 flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
    );

    return (
        <section id="pricing" className="py-24 bg-gray-50 overflow-hidden relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-4xl md:text-5xl font-display font-bold mb-6 text-text-main">Smart plans for every scale</h2>
                    <p className="text-lg text-text-secondary font-medium">Clear pricing with no hidden fees. All plans include secure NFC technology.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {plans.map((plan, index) => {
                        const style = plan.id === 'white-label' || plan.id === 'enterprise'
                            ? "col-span-1 md:col-span-2 lg:col-span-4 lg:w-1/2 lg:mx-auto mt-12 bg-gray-900 border-gray-800 text-white"
                            : "";
                        const highlight = plan.isPopular;
                        const tagLabel = highlight ? "Best Value" : null;

                        return (
                            <div
                                key={index}
                                className={`
                                    relative flex flex-col p-8 rounded-xl transition-all duration-500
                                    ${style ? style :
                                        highlight
                                            ? 'bg-primary shadow-2xl shadow-primary/30 transform lg:scale-105 z-10'
                                            : 'bg-white border border-gray-100 shadow-sm hover:shadow-xl'
                                    }
                                `}
                            >
                                {tagLabel && (
                                    <div className="absolute top-6 right-6 bg-white/20 text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest">
                                        {tagLabel}
                                    </div>
                                )}
                                <h3 className={`text-xl font-bold mb-2 font-display ${highlight || style ? 'text-white' : 'text-text-main'}`}>
                                    {plan.name}
                                </h3>
                                <p className={`text-sm mb-8 font-medium ${highlight || style ? 'text-white/80' : 'text-gray-400'}`}>
                                    {plan.description}
                                </p>
                                <div className={`flex items-baseline mb-8 ${highlight || style ? 'text-white' : ''}`}>
                                    <span className={`text-4xl font-bold ${!highlight && !style ? 'text-text-main' : ''}`}>{plan.price}</span>
                                    {plan.period && <span className={`ml-2 font-bold text-sm ${highlight || style ? 'opacity-70' : 'text-gray-400'}`}>{plan.period}</span>}
                                </div>
                                <ul className={`space-y-4 mb-10 flex-1 ${highlight || style ? 'text-white' : ''}`}>
                                    {plan.features.map((item, i) => (
                                        <li key={i} className="flex items-center text-sm font-semibold gap-3">
                                            <CheckCircle2 size={18} className={highlight || style ? 'text-green-400' : 'text-primary'} />
                                            {highlight || style ? item : <span className="text-text-secondary">{item}</span>}
                                        </li>
                                    ))}
                                </ul>
                                <Link
                                    href="/get-started"
                                    className={`
                                        w-full py-4 rounded-2xl font-bold text-center transition-all cursor-pointer shadow-lg
                                        ${highlight
                                            ? 'bg-white text-primary hover:bg-blue-50'
                                            : style ? 'bg-primary text-white hover:bg-primary-hover border-none' : 'border-2 border-primary text-primary hover:bg-primary hover:text-white'
                                        }
                                    `}
                                >
                                    {plan.buttonText}
                                </Link>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
