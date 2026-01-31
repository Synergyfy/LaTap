import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export default function PrivacyPolicy() {
    const lastUpdated = "January 31, 2026";

    return (
        <div className="min-h-screen bg-white">
            <Navbar />
            <main className="pt-40 pb-24 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto">
                    <div className="mb-16">
                        <span className="text-primary font-bold tracking-widest text-[10px] uppercase mb-4 block">Privacy</span>
                        <h1 className="text-4xl md:text-5xl font-display font-bold text-text-main mb-6">Privacy Policy</h1>
                        <p className="text-text-secondary font-medium">Last updated: {lastUpdated}</p>
                    </div>

                    <div className="prose prose-blue max-w-none space-y-12">
                        <section>
                            <h2 className="text-2xl font-bold text-text-main mb-4 font-display">1. Information We Collect</h2>
                            <p className="text-text-secondary leading-relaxed font-medium">
                                We collect information that you provide directly to us when you create an account, use our NFC devices, or communicate with us. This may include your business name, email address, password, and the serial numbers of your NFC pucks.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-text-main mb-4 font-display">2. Visitor Data</h2>
                            <p className="text-text-secondary leading-relaxed font-medium">
                                When visitors tap their devices against our NFC pucks, we may collect data they choose to share, such as their contact information or feedback. This data is stored securely on our servers and is only accessible by you (the account holder).
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-text-main mb-4 font-display">3. How We Use Information</h2>
                            <p className="text-text-secondary leading-relaxed font-medium">
                                We use the information we collect to operate, maintain, and provide the features of the Service. We do not sell your data or your visitors' data to third parties. We use anonymized aggregate data to improve our analytics platform.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-text-main mb-4 font-display">4. Data Security</h2>
                            <p className="text-text-secondary leading-relaxed font-medium">
                                We implement industry-standard security measures to protect your data, including end-to-end encryption for NFC transmissions and secure cloud storage with limited access.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-text-main mb-4 font-display">5. Your Rights</h2>
                            <p className="text-text-secondary leading-relaxed font-medium font-bold">
                                Under GDPR and CCPA, you have the right to access, delete, or port your data. You can manage your data preferences directly through your LaTap dashboard or by contacting our support team.
                            </p>
                        </section>
                    </div>

                    <div className="mt-20 p-8 rounded-3xl bg-primary/5 border border-primary/10">
                        <h4 className="font-bold text-text-main mb-2">GDPR Compliance</h4>
                        <p className="text-sm text-text-secondary font-medium mb-6">Our Data Processing Agreement (DPA) is available upon request for enterprise customers requiring additional documentation.</p>
                        <button className="text-primary font-bold text-sm hover:underline">privacy@latap.io</button>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
