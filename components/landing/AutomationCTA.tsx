import React from 'react';
import Link from 'next/link';

export default function AutomationCTA() {
    return (
        <section className="py-24 bg-white overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-primary/5 rounded-[3rem] p-8 md:p-16 lg:p-20 relative overflow-hidden flex flex-col lg:flex-row items-center gap-16">
                    <div className="relative w-full lg:w-1/2 order-2 lg:order-1 flex justify-center">
                        <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden transform -rotate-2 z-10 transition-transform hover:rotate-0 duration-700">
                            <div className="p-5 border-b border-gray-50 flex justify-between items-center">
                                <h3 className="font-bold text-text-main text-sm font-display">Awaiting Follow-up</h3>
                                <div className="text-[10px] bg-gray-50 px-2 py-1 rounded-lg text-gray-500 font-bold uppercase tracking-wider flex items-center gap-1">
                                    Bulk Action <span className="material-icons text-xs">expand_more</span>
                                </div>
                            </div>
                            <div className="text-[10px] w-full">
                                <div className="bg-primary text-white p-3 grid grid-cols-6 gap-2 font-black uppercase tracking-widest">
                                    <div className="col-span-2">Visitor</div>
                                    <div className="col-span-2">Category</div>
                                    <div className="col-span-2">Status</div>
                                </div>
                                {[
                                    { name: 'Alex Rivera', cat: 'VIP Event', status: 'Followed Up', active: true },
                                    { name: 'Sarah Chen', cat: 'Store Walk-in', status: 'Pending', active: false },
                                    { name: 'Marcus Bell', cat: 'Trade Show', status: 'Followed Up', active: true },
                                    { name: 'Elena Diaz', cat: 'VIP Event', status: 'Pending', active: false },
                                ].map((row, i) => (
                                    <div key={i} className={`p-4 grid grid-cols-6 gap-2 border-b border-gray-50 items-center ${row.active ? 'bg-green-50/50' : 'text-gray-400'}`}>
                                        <div className="col-span-2 flex items-center gap-2 font-bold text-text-main">
                                            <div className={`size-1.5 rounded-full ${row.active ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                                            {row.name}
                                        </div>
                                        <div className="col-span-2 font-bold">{row.cat}</div>
                                        <div className="col-span-2">
                                            <span className={`px-2 py-1 rounded-md text-[9px] font-black uppercase tracking-tighter ${row.active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>{row.status}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="absolute top-10 -right-4 lg:-right-6 w-60 bg-white rounded-2xl shadow-[0_30px_60px_-15px_rgba(0,0,0,0.2)] z-20 border border-gray-100 transform rotate-3 p-6 transition-transform hover:rotate-0 duration-700">
                            <div className="flex items-center justify-between mb-6">
                                <div className="size-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                                    <span className="material-icons-round text-sm">auto_awesome</span>
                                </div>
                                <div className="h-4 w-12 bg-green-100 rounded-full border border-green-200"></div>
                            </div>
                            <h4 className="font-bold text-text-main mb-4 text-xs font-display">Rule: VIP Engagement</h4>
                            <div className="space-y-3">
                                {[
                                    { text: 'Assign VIP Tag', done: true },
                                    { text: 'Send Welcome SMS', done: true },
                                    { text: 'Notify Sales Team', done: false }
                                ].map((step, i) => (
                                    <div key={i} className={`flex items-center justify-between text-[10px] font-bold ${step.done ? 'text-text-main' : 'text-gray-300'}`}>
                                        <span>{step.text}</span>
                                        <span className="material-icons-round text-base text-primary">{step.done ? 'check_circle' : 'radio_button_unchecked'}</span>
                                    </div>
                                ))}
                            </div>
                            <Link href="/get-started" className="block w-full mt-6 py-2.5 rounded-xl bg-primary text-white text-[10px] font-black uppercase tracking-widest shadow-lg shadow-primary/20 text-center">Get Started</Link>
                        </div>
                    </div>

                    <div className="w-full lg:w-1/2 text-center lg:text-left">
                        <span className="text-xs font-black uppercase tracking-[0.3em] text-primary mb-6 block">Maximize ROI</span>
                        <h2 className="text-4xl md:text-5xl font-display font-bold text-text-main leading-tight mb-8">
                            Reduce manual follow-ups and grow 10x more repeat visits
                        </h2>
                        <p className="text-lg text-text-secondary leading-relaxed mb-10 font-medium max-w-xl mx-auto lg:mx-0">
                            Stop wasting time on repetitive tasks. Automate your visitor journey with custom rules and focus on scaling your physical presence.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                            <Link href="/get-started" className="px-10 py-5 rounded-full bg-primary text-white font-bold hover:bg-primary-hover transition-all shadow-xl shadow-primary/20 cursor-pointer">Start Free Trial</Link>
                            <Link href="/login" className="px-10 py-5 rounded-full border border-gray-200 text-text-main font-bold hover:bg-white transition-all cursor-pointer text-center">Login</Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
