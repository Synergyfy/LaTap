import Link from 'next/link';
import { CheckCircle2 } from 'lucide-react';

const STATIC_PLANS = [
    {
        name: "Free",
        desc: "For individuals & testing.",
        price: "₦0",
        period: "/mo",
        features: ['100 visitors/mo', '1 Demo Tag', 'Basic Analytics', 'Community Support'],
        cta: "Get Started Free",
        highlight: false,
    },
    {
        name: "Basic",
        desc: "For small events & pop-ups.",
        price: "₦45,000",
        period: "/mo",
        features: ['500 visitors/mo', '1 Active Tag License', 'Standard Analytics', 'Email Support'],
        cta: "Choose Basic",
        highlight: false,
    },
    {
        name: "Premium",
        desc: "For regular venues & scaling.",
        price: "₦120,000",
        period: "/mo",
        features: ['5,000 visitors/mo', '5 Active Tag Licenses', 'Full CRM Integration', 'Priority Support'],
        cta: "Choose Premium",
        highlight: true,
        tag: "Best Value"
    },
    {
        name: "Enterprise",
        desc: "For multi-location operations.",
        price: "Custom",
        period: "",
        features: ['Unlimited visitors', 'Unlimited Active Tags', 'SSO Security', 'Dedicated Account Mgr'],
        cta: "Contact Sales",
        highlight: false,
    },
    {
        name: "White-Label",
        desc: "Your brand, our tech infrastructure.",
        features: ['Custom Domain', 'Branded Hardware', 'Admin Dashboard', 'Reseller Rights'],
        cta: "Partner With Us",
        highlight: false,
        style: "col-span-1 md:col-span-2 lg:col-span-4 lg:w-1/2 lg:mx-auto mt-12 bg-gray-900 border-gray-800 text-white"
    }
];

export default function Pricing() {
    return (
        <section id="pricing" className="py-24 bg-gray-50 overflow-hidden relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-4xl md:text-5xl font-display font-bold mb-6 text-text-main">Smart plans for every scale</h2>
                    <p className="text-lg text-text-secondary font-medium">Clear pricing with no hidden fees. All plans include secure NFC technology.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {STATIC_PLANS.map((plan, index) => (
                        <div
                            key={index}
                            className={`
                                relative flex flex-col p-8 rounded-xl transition-all duration-500
                                ${plan.style ? plan.style :
                                    plan.highlight
                                        ? 'bg-primary shadow-2xl shadow-primary/30 transform lg:scale-105 z-10'
                                        : 'bg-white border border-gray-100 shadow-sm hover:shadow-xl'
                                }
                            `}
                        >
                            {plan.tag && (
                                <div className="absolute top-6 right-6 bg-white/20 text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest">
                                    {plan.tag}
                                </div>
                            )}
                            <h3 className={`text-xl font-bold mb-2 font-display ${plan.highlight || plan.style ? 'text-white' : 'text-text-main'}`}>
                                {plan.name}
                            </h3>
                            <p className={`text-sm mb-8 font-medium ${plan.highlight || plan.style ? 'text-white/80' : 'text-gray-400'}`}>
                                {plan.desc}
                            </p>
                            <div className={`flex items-baseline mb-8 ${plan.highlight || plan.style ? 'text-white' : ''}`}>
                                <span className={`text-4xl font-bold ${!plan.highlight && !plan.style && 'text-text-main'}`}>{plan.price}</span>
                                {plan.period && <span className={`ml-2 font-bold text-sm ${plan.highlight || plan.style ? 'opacity-70' : 'text-gray-400'}`}>{plan.period}</span>}
                            </div>
                            <ul className={`space-y-4 mb-10 flex-1 ${plan.highlight || plan.style ? 'text-white' : ''}`}>
                                {plan.features.map((item, i) => (
                                    <li key={i} className="flex items-center text-sm font-semibold gap-3">
                                        <CheckCircle2 size={18} className={plan.highlight || plan.style ? 'text-green-400' : 'text-primary'} />
                                        {plan.highlight || plan.style ? item : <span className="text-text-secondary">{item}</span>}
                                    </li>
                                ))}
                            </ul>
                            <Link
                                href={"/get-started"}
                                className={`
                                    w-full py-4 rounded-2xl font-bold text-center transition-all cursor-pointer shadow-lg
                                    ${plan.highlight
                                        ? 'bg-white text-primary hover:bg-blue-50'
                                        : plan.style ? 'bg-primary text-white hover:bg-primary-hover border-none' : 'border-2 border-primary text-primary hover:bg-primary hover:text-white'
                                    }
                                `}
                            >
                                {plan.cta}
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
