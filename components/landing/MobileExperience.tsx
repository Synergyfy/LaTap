import React from 'react';

export default function MobileExperience() {
    return (
        <section id="mobile" className="py-24 bg-white overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col lg:flex-row items-center gap-20">
                    <div className="lg:w-1/2 flex justify-center order-2 lg:order-1">
                        <div className="relative">
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] bg-primary/20 rounded-full blur-[100px] -z-10 opacity-30 animate-pulse"></div>
                            <div className="w-[300px] h-[620px] bg-slate-900 rounded-[3rem] p-3 shadow-2xl relative border-4 border-slate-800">
                                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-slate-900 rounded-b-xl z-20"></div>
                                <div className="w-full h-full bg-white rounded-[2.5rem] overflow-hidden flex flex-col font-sans">
                                    <div className="bg-primary/5 p-6 pt-10 text-center border-b border-gray-50">
                                        <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-primary/30">
                                            <span className="material-icons-round text-white">bolt</span>
                                        </div>
                                        <h4 className="font-display font-bold text-gray-900">Welcome to Launch Event</h4>
                                    </div>
                                    <div className="p-6 space-y-5">
                                        {[
                                            { label: 'Full Name', icon: 'person' },
                                            { label: 'Email Address', icon: 'email' },
                                            { label: 'Company', icon: 'business' }
                                        ].map((f, i) => (
                                            <div key={i} className="space-y-1.5">
                                                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">{f.label}</label>
                                                <div className="h-12 bg-gray-50 border border-gray-100 rounded-xl px-4 flex items-center gap-3">
                                                    <span className="material-icons-round text-sm text-gray-300">{f.icon}</span>
                                                    <div className="h-2 w-24 bg-gray-200 rounded animate-pulse"></div>
                                                </div>
                                            </div>
                                        ))}
                                        <button className="w-full bg-primary text-white py-4 rounded-xl font-bold text-sm shadow-xl shadow-primary/20 mt-4 active:scale-95 transition-transform">Complete Registration</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="lg:w-1/2 order-1 lg:order-2">
                        <span className="text-xs font-black uppercase tracking-[0.2em] text-primary mb-6 block">Frictionless Experience</span>
                        <h2 className="text-4xl md:text-5xl font-display font-bold text-text-main leading-tight mb-8">Tap & Go flow for maximum conversion</h2>
                        <p className="text-lg text-text-secondary leading-relaxed mb-10 font-medium">Your visitors simply tap their phone. No app download required. They are instantly directed to a beautifully branded mobile form that converts physical traffic into digital leads in seconds.</p>

                        <div className="grid sm:grid-cols-2 gap-8 mb-12">
                            <div className="flex flex-col gap-4">
                                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                                    <span className="material-icons-round">flash_on</span>
                                </div>
                                <h4 className="font-bold text-text-main">Instant Connection</h4>
                                <p className="text-sm text-text-secondary leading-relaxed">Loads in under 400ms on cellular networks. Zero friction, zero wait.</p>
                            </div>
                            <div className="flex flex-col gap-4">
                                <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center text-green-600">
                                    <span className="material-icons-round">security</span>
                                </div>
                                <h4 className="font-bold text-text-main">Secure Pipeline</h4>
                                <p className="text-sm text-text-secondary leading-relaxed">GDPR-first approach with end-to-end data encryption.</p>
                            </div>
                        </div>

                        <a href="#" className="inline-flex items-center gap-3 font-black text-xs uppercase tracking-widest text-text-main group">
                            Download Feature Specs
                            <span className="material-icons-round text-primary group-hover:translate-x-1 transition-transform">arrow_forward</span>
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}
