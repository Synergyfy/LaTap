'use client';
import React, { useState } from 'react';

export default function FAQ() {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const faqs = [
        {
            q: "Do visitors need to download an app?",
            a: "No. That's the beauty of LaTap. Visitors simply tap their phone against the NFC puck, and your custom landing page opens instantly in their default mobile browser. It works with 99% of modern smartphones."
        },
        {
            q: "How do I set up the NFC hardware?",
            a: "Setup takes less than 2 minutes. Once you receive your LaTap puck, enter the serial number in your dashboard, choose your welcome message, and peel-and-stick the puck to any non-metallic surface at your entrance."
        },
        {
            q: "Can I use it for multiple locations?",
            a: "Absolutely. Our Business and Enterprise plans allow you to manage multiple 'pucks' or locations from a single centralized dashboard. You can see comparative analytics across all your venues in real-time."
        },
        {
            q: "What happens if a visitor doesn't have NFC?",
            a: "Every LaTap puck comes with a high-resolution, branded QR code laser-etched onto its surface. If a visitor has a very old device without NFC, they can simply scan the QR code to access the same experience."
        },
        {
            q: "How secure is the visitor data?",
            a: "We take privacy seriously. All data is encrypted using AES-256 at rest and TLS 1.3 in transit. We are fully GDPR and CCPA compliant, and we never sell your visitor data to third parties."
        },
        {
            q: "Does it integrate with my existing CRM?",
            a: "Yes. LaTap integrates seamlessly with HubSpot, Salesforce, Mailchimp, and thousands of other apps via Zapier or our direct API. Your leads are synced the moment they tap."
        }
    ];

    return (
        <section id="faq" className="py-24 bg-white">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <span className="text-primary font-bold tracking-widest text-xs uppercase mb-4 block">Common Questions</span>
                    <h2 className="text-4xl md:text-5xl font-display font-bold text-text-main">
                        Everything you need <br />to know
                    </h2>
                </div>

                <div className="space-y-4">
                    {faqs.map((faq, i) => (
                        <div
                            key={i}
                            className={`rounded-2xl border transition-all duration-300 ${openIndex === i ? 'border-primary/30 bg-primary/5' : 'border-gray-100 bg-white hover:border-gray-200'}`}
                        >
                            <button
                                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                                className="w-full text-left p-6 md:p-8 flex justify-between items-center cursor-pointer group"
                            >
                                <span className={`font-bold text-lg md:text-xl pr-8 ${openIndex === i ? 'text-primary' : 'text-text-main group-hover:text-primary transition-colors'}`}>
                                    {faq.q}
                                </span>
                                <span className={`material-icons-round transition-transform duration-300 ${openIndex === i ? 'rotate-180 text-primary' : 'text-gray-300'}`}>
                                    expand_more
                                </span>
                            </button>
                            <div className={`overflow-hidden transition-all duration-300 ease-in-out ${openIndex === i ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                                <div className="p-6 md:p-8 pt-0 text-text-secondary font-medium leading-relaxed">
                                    {faq.a}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-16 p-8 rounded-[2.5rem] bg-gray-50 border border-gray-100 flex flex-col md:flex-row items-center justify-between gap-8">
                    <div className="text-center md:text-left">
                        <h4 className="font-display font-bold text-xl text-text-main mb-2">Still have questions?</h4>
                        <p className="text-text-secondary font-medium">Our support team is available 24/7 to help you get started.</p>
                    </div>
                    <button className="bg-text-main text-white font-bold px-8 py-4 rounded-full hover:bg-black transition-all shadow-xl shadow-black/10 whitespace-nowrap cursor-pointer">
                        Chat with Support
                    </button>
                </div>
            </div>
        </section>
    );
}
