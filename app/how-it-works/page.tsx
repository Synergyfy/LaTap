import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'How It Works',
    description: 'Learn how VemTap uses NFC technology to bridge the gap between physical visitors and digital data capture.',
};

export default function HowItWorks() {
    const steps = [
        {
            number: '01',
            title: 'Setup your Dashboard',
            description: 'Create your account and configure your business link. This is where your customers will land when they tap their phone.',
            icon: 'dashboard_customize'
        },
        {
            number: '02',
            title: 'Place NFC Tags',
            description: 'Position your VemTap NFC tags at strategic walk-in points—receptions, tables, or checkout counters.',
            icon: 'nfc'
        },
        {
            number: '03',
            title: 'The Customer Tap',
            description: 'Customers simply tap their phone. No apps, no searching, just instant connection to your digital experience.',
            icon: 'touch_app'
        },
        {
            number: '04',
            title: 'Collect & Redirect',
            description: 'Capture visitor data automatically and redirect them to any link you choose—your menu, booking page, or review form.',
            icon: 'sync_alt'
        }
    ];

    return (
        <div className="min-h-screen bg-white">
            <Navbar />

            <main className="pt-40">
                {/* Hero section */}
                <section className="pb-24 px-4 sm:px-6 lg:px-8 text-center">
                    <div className="max-w-4xl mx-auto">
                        <span className="text-primary font-bold tracking-widest text-xs uppercase mb-4 block">Process</span>
                        <h1 className="text-5xl md:text-7xl font-display font-bold text-text-main mb-8 leading-tight">
                            The bridge between <br />
                            <span className="text-gradient">Physical & Digital</span>
                        </h1>
                        <p className="text-xl text-text-secondary font-medium leading-relaxed max-w-2xl mx-auto">
                            VemTap uses NFC technology to eliminate the friction in customer interactions. Here is how we help you capture every visitor.
                        </p>
                    </div>
                </section>

                {/* Steps Section */}
                <section className="py-24 bg-gray-50">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                            {steps.map((step, i) => (
                                <div key={i} className="relative group">
                                    <div className="mb-8">
                                        <span className="text-6xl font-display font-black text-primary/10 group-hover:text-primary/20 transition-colors uppercase leading-none">
                                            {step.number}
                                        </span>
                                    </div>
                                    <div className="size-16 rounded-2xl bg-white shadow-lg flex items-center justify-center text-primary mb-6">
                                        <span className="material-icons-round text-3xl">{step.icon}</span>
                                    </div>
                                    <h3 className="text-2xl font-bold text-text-main mb-4 font-display">{step.title}</h3>
                                    <p className="text-text-secondary font-medium leading-relaxed">
                                        {step.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Deep Dive Section */}
                <section className="py-32 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-7xl mx-auto">
                        <div className="flex flex-col lg:flex-row items-center gap-16">
                            <div className="lg:w-1/2 space-y-8">
                                <h2 className="text-4xl md:text-5xl font-display font-bold text-text-main leading-tight">
                                    Capture data without <br />lifting a finger.
                                </h2>
                                <p className="text-lg text-text-secondary font-medium leading-relaxed">
                                    When a customer taps their phone, our system handles the handshake. We securely transfer their preference settings to your mobile landing page, allowing for a personalized experience from the very first second.
                                </p>
                                <div className="space-y-4">
                                    {[
                                        'Automatic visitor logging',
                                        'Dynamic link redirection',
                                        'Real-time CRM sync',
                                        'No app download required'
                                    ].map((item, i) => (
                                        <div key={i} className="flex items-center gap-3 font-bold text-text-main">
                                            <span className="material-icons-round text-primary">check_circle</span>
                                            {item}
                                        </div>
                                    ))}
                                </div>
                                <div className="pt-4">
                                    <Link href="/get-started" className="inline-block bg-primary text-white font-bold px-10 py-4 rounded-full shadow-xl shadow-primary/20 hover:bg-primary-hover transition-all">
                                        Get Started Today
                                    </Link>
                                </div>
                            </div>
                            <div className="lg:w-1/2 relative">
                                <div className="bg-primary/5 rounded-[3rem] p-8 border border-primary/10">
                                    <img
                                        src="https://images.unsplash.com/photo-1556742111-a301076d9d18?auto=format&fit=crop&q=80&w=800"
                                        alt="Customer Tapping"
                                        className="rounded-2rem shadow-2xl"
                                    />
                                    {/* Abstract UI Elements */}
                                    <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-2xl border border-gray-100 hidden md:block">
                                        <div className="flex items-center gap-3">
                                            <div className="size-10 bg-green-500 rounded-full flex items-center justify-center text-white">
                                                <span className="material-icons-round">contactless</span>
                                            </div>
                                            <div>
                                                <p className="text-xs font-black uppercase tracking-widest text-gray-400">Connection Speed</p>
                                                <p className="font-bold text-text-main">400ms</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Final CTA */}
                <section className="py-24 bg-text-main text-white text-center">
                    <div className="max-w-4xl mx-auto px-4">
                        <h2 className="text-4xl md:text-5xl font-display font-bold mb-8">Ready to digitize your venue?</h2>
                        <p className="text-xl opacity-70 mb-12 max-w-2xl mx-auto">
                            Join thousands of businesses using VemTap to bridge the gap between their physical visits and digital data.
                        </p>
                        <div className="flex flex-col sm:flex-row justify-center gap-4">
                            <Link href="/get-started" className="bg-primary text-white font-bold px-10 py-4 rounded-full hover:bg-primary-hover transition-all">
                                Signup Now
                            </Link>
                            <Link href="/tap/AZURE-BISTRO/DEMO-UNIT" className="bg-white text-primary font-bold px-10 py-4 rounded-full hover:bg-gray-50 transition-all flex items-center justify-center gap-2 border-2 border-primary/10 shadow-xl shadow-primary/5 group">
                                <span className="material-icons-round text-primary group-hover:animate-bounce transition-all">contactless</span>
                                Tap Now (Live Demo)
                            </Link>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}
