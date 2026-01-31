import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export default function TermsOfService() {
    const lastUpdated = "January 31, 2026";

    return (
        <div className="min-h-screen bg-white">
            <Navbar />
            <main className="pt-40 pb-24 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto">
                    <div className="mb-16">
                        <span className="text-primary font-bold tracking-widest text-[10px] uppercase mb-4 block">Legal</span>
                        <h1 className="text-4xl md:text-5xl font-display font-bold text-text-main mb-6">Terms of Service</h1>
                        <p className="text-text-secondary font-medium">Last updated: {lastUpdated}</p>
                    </div>

                    <div className="prose prose-blue max-w-none space-y-12">
                        <section>
                            <h2 className="text-2xl font-bold text-text-main mb-4 font-display">1. Acceptance of Terms</h2>
                            <p className="text-text-secondary leading-relaxed font-medium">
                                By accessing and using LaTap (the "Service"), you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our service. The Service is provided by LaTap Inc., and these terms constitute a legally binding agreement between you and us.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-text-main mb-4 font-display">2. Description of Service</h2>
                            <p className="text-text-secondary leading-relaxed font-medium">
                                LaTap provides NFC-based visitor capture and management software. You are responsible for obtaining the necessary hardware (NFC pucks) and internet access required to use the Service. We reserve the right to modify or discontinue the Service at any time.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-text-main mb-4 font-display">3. User Accounts</h2>
                            <p className="text-text-secondary leading-relaxed font-medium">
                                To use certain features of the Service, you must register for an account. You agree to provide accurate, current, and complete information and to keep your password secure. You are responsible for all activities that occur under your account.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-text-main mb-4 font-display">4. Hardware Use</h2>
                            <p className="text-text-secondary leading-relaxed font-medium">
                                Our NFC hardware is designed for physical visitor interaction. You agree not to reverse engineer the hardware or use it for any purpose other than visitor data capture as permitted by these terms. Hardware warranties are handled separately through our Hardware Warranty Policy.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-text-main mb-4 font-display">5. Data Privacy</h2>
                            <p className="text-text-secondary leading-relaxed font-medium">
                                Your use of the Service is also governed by our Privacy Policy. You represent that you have the necessary consent to collect any visitor data through our Service and that you will comply with all applicable data protection laws.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-text-main mb-4 font-display">6. Limitation of Liability</h2>
                            <p className="text-text-secondary leading-relaxed font-medium italic">
                                To the maximum extent permitted by law, LaTap shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly.
                            </p>
                        </section>
                    </div>

                    <div className="mt-20 p-8 rounded-3xl bg-gray-50 border border-gray-100">
                        <h4 className="font-bold text-text-main mb-2">Need clarification?</h4>
                        <p className="text-sm text-text-secondary font-medium mb-6">If you have any questions regarding these terms, please reach out to our legal department.</p>
                        <button className="text-primary font-bold text-sm hover:underline">legal@latap.io</button>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
