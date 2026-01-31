import React from 'react';
import Link from 'next/link';

export default function Pricing() {
    return (
        <section id="pricing" className="py-24 bg-gray-50 overflow-hidden relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-4xl md:text-5xl font-display font-bold mb-6 text-text-main">Smart plans for every scale</h2>
                    <p className="text-lg text-text-secondary font-medium">Clear pricing with no hidden fees. All plans include secure NFC technology.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="bg-white p-10 rounded-xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col">
                        <h3 className="text-xl font-bold mb-2 text-text-main font-display">Starter</h3>
                        <p className="text-gray-400 text-sm mb-8 font-medium">For small events & pop-ups.</p>
                        <div className="flex items-baseline mb-8">
                            <span className="text-5xl font-bold text-text-main">£29</span>
                            <span className="text-gray-400 ml-2 font-bold text-sm">/mo</span>
                        </div>
                        <ul className="space-y-4 mb-10 flex-1">
                            {['500 visitors/mo', '1 Active Tag License', 'Basic Analytics', 'Email Support'].map((item, i) => (
                                <li key={i} className="flex items-center text-sm font-semibold text-text-secondary">
                                    <span className="material-icons-round text-primary mr-3 text-lg">check_circle</span> {item}
                                </li>
                            ))}
                        </ul>
                        <Link href="/get-started" className="w-full py-4 rounded-2xl border-2 border-primary text-primary font-bold hover:bg-primary hover:text-white transition-all cursor-pointer text-center">Choose Starter</Link>
                    </div>

                    <div className="bg-primary p-10 rounded-xl shadow-2xl shadow-primary/30 transform lg:-translate-y-4 relative flex flex-col">
                        <div className="absolute top-6 right-6 bg-white/20 text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest">Growth</div>
                        <h3 className="text-xl font-bold mb-2 text-white font-display">Business</h3>
                        <p className="text-white/80 text-sm mb-8 font-medium">For regular venues & scaling teams.</p>
                        <div className="flex items-baseline mb-8 text-white">
                            <span className="text-6xl font-bold">£79</span>
                            <span className="ml-2 font-bold opacity-70 text-sm">/mo</span>
                        </div>
                        <ul className="space-y-4 mb-10 text-white flex-1">
                            {['5,000 visitors/mo', '5 Active Tag Licenses', 'Full CRM Integration', 'Custom Brand Themes', 'Priority Live Support'].map((item, i) => (
                                <li key={i} className="flex items-center font-bold text-sm">
                                    <span className="material-icons-round mr-3 text-lg">verified</span> {item}
                                </li>
                            ))}
                        </ul>
                        <Link href="/get-started" className="w-full py-4 rounded-2xl bg-white text-primary font-black hover:bg-blue-50 transition-all shadow-lg cursor-pointer text-center">Start Free Trial</Link>
                    </div>

                    <div className="bg-white p-10 rounded-xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col">
                        <h3 className="text-xl font-bold mb-2 text-text-main font-display">Enterprise</h3>
                        <p className="text-gray-400 text-sm mb-8 font-medium">For multi-location operations.</p>
                        <div className="flex items-baseline mb-8">
                            <span className="text-5xl font-bold text-text-main">Custom</span>
                        </div>
                        <ul className="space-y-4 mb-10 flex-1">
                            {['Unlimited visitors', 'Unlimited Active Tags', 'SSO Security', 'Dedicated Account Mgr'].map((item, i) => (
                                <li key={i} className="flex items-center text-sm font-semibold text-text-secondary">
                                    <span className="material-icons-round text-blue-500 mr-3 text-lg">check_circle</span> {item}
                                </li>
                            ))}
                        </ul>
                        <Link href="/get-started" className="w-full py-4 rounded-2xl bg-text-main text-white font-bold bg-primary hover:bg-black transition-all cursor-pointer text-center">Contact Sales</Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
