import React from 'react';
import Link from 'next/link';

export default function Process() {
    return (
        <section id="process" className="py-24 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <span className="text-primary font-black uppercase tracking-[0.3em] text-[10px] mb-4 block">Process</span>
                    <h2 className="text-3xl md:text-5xl font-display font-bold text-text-main leading-tight mb-6">
                        Start collecting data in 3 steps
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {[
                        {
                            step: '1. The Tap',
                            heading: 'Tap the card',
                            desc: '"It is so fast. It helps us get customer numbers 10x faster than typing it out or using paper."',
                            img: 'https://images.unsplash.com/photo-1556742044-3c52d6e88c62?auto=format&fit=crop&q=80&w=800',
                            color: 'bg-primary'
                        },
                        {
                            step: '2. The Connect',
                            heading: 'Capture customer info',
                            desc: 'Getting customer details is easy. VemTap captures info in under 2 seconds without them needing to download any app.',
                            img: 'https://images.unsplash.com/photo-1556740758-90eb39f3203c?auto=format&fit=crop&q=80&w=800',
                            color: 'bg-primary-dark'
                        },
                        {
                            step: '3. The Growth',
                            heading: 'Grow your business',
                            desc: 'See who visits, reward loyal customers, and improve your marketing with data that is saved automatically.',
                            img: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800',
                            color: 'bg-[#0a4a3e]'
                        }
                    ].map((item, i) => (
                        <div key={i} className="group flex flex-col h-full rounded-2xl overflow-hidden shadow-soft hover:shadow-strong transition-all duration-500 transform hover:-translate-y-2">
                            <div className="h-64 overflow-hidden relative">
                                <img src={item.img} alt={item.step} className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700" />
                            </div>
                            <div className={`flex-1 p-10 ${item.color} flex flex-col text-white`}>
                                <div className="mb-auto">
                                    <h3 className="text-2xl md:text-3xl font-bold font-display leading-[1.1] mb-6">
                                        {item.heading}
                                    </h3>
                                    <p className="text-white/80 font-medium leading-relaxed mb-10 text-sm">
                                        {item.desc}
                                    </p>
                                </div>
                                <div className="mt-4">
                                    <Link href="/how-it-works" className="inline-block px-6 py-2.5 rounded-full border border-white/40 text-xs font-black uppercase tracking-widest hover:bg-white hover:text-text-main transition-all cursor-pointer">
                                        Learn More
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
