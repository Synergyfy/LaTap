import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Pricing from '@/components/landing/Pricing';
import Footer from '@/components/layout/Footer';

export default function PricingPage() {
    return (
        <div className="min-h-screen bg-white">
            <Navbar />
            <div className="pt-32 pb-12 text-center container mx-auto px-4">
                <span className="text-primary font-bold tracking-widest text-xs uppercase mb-4 block">Plans & Pricing</span>
                <h1 className="text-4xl md:text-6xl font-display font-bold text-text-main leading-tight mb-6">
                    Simple, transparent pricing <br /> for growing businesses
                </h1>
                <p className="text-lg text-text-secondary max-w-2xl mx-auto font-medium leading-relaxed">
                    Choose the plan that fits your scale. All plans include 24/7 support and secure data encryption.
                </p>
            </div>
            <Pricing />
            {/* FAQ or additional pricing info can go here */}
            <section className="py-24 bg-white border-t border-gray-50">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <h2 className="text-3xl font-display font-bold text-text-main mb-8">Frequently Asked Questions</h2>
                    <div className="grid gap-6 text-left">
                        {[
                            { q: "How does the redirection work?", a: "Each LaTap tag can be configured in your dashboard to point to any URL. You can update these links instantly at any time." },
                            { q: "Can I upgrade my plan later?", a: "Yes, you can upgrade or downgrade your plan at any time through your dashboard settings. Changes apply immediately." },
                            { q: "Do I need special hardware?", a: "Our service works with standard NFC tags. You can use your own or obtain our high-durability LaTap tags to ensure the best customer experience." }
                        ].map((item, i) => (
                            <div key={i} className="p-6 rounded-2xl bg-gray-50 border border-gray-100">
                                <h4 className="font-bold text-text-main mb-2">{item.q}</h4>
                                <p className="text-sm text-text-secondary font-medium">{item.a}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            <Footer />
        </div>
    );
}
