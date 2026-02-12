import React from 'react';

export default function SpeedComparison() {
    return (
        <section className="py-24 bg-white">
            <div className="container mx-auto px-4 relative z-10">
                {/* Section Header */}
                <div className="text-center max-w-3xl mx-auto mb-20">
                    <span className="text-primary font-bold tracking-widest text-xs uppercase mb-4 block">Speed Comparison</span>
                    <h2 className="text-4xl md:text-5xl font-display font-bold text-text-main leading-tight mb-4">
                        Built for speed and reliability
                    </h2>
                    <p className="text-text-secondary text-lg max-w-2xl mx-auto">
                        Eliminate the friction of QR codes. No need for camera focus, lighting adjustments, or finding the right app.
                    </p>
                </div>

                <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">

                    {/* Left Column: Visual Card */}
                    <div className="flex-1 w-full max-w-xl relative">
                        {/* Abstract background blobs */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-linear-to-tr from-primary/10 to-blue-200/20 rounded-full blur-[80px] -z-10"></div>

                        <div className="bg-white rounded-xl p-8 md:p-10 shadow-2xl border border-gray-100 relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-8 opacity-5 font-black text-9xl select-none leading-none -mr-4 -mt-4">4x</div>

                            <div className="space-y-8 relative z-10">
                                <div className="space-y-2">
                                    <h3 className="text-3xl font-display font-bold text-text-main">
                                        <span className="text-primary">4x Faster</span> than QR
                                    </h3>
                                    <p className="text-text-secondary text-sm">Real-world performance test</p>
                                </div>

                                <div className="space-y-6">
                                    {/* NFC Bar */}
                                    <div className="space-y-3">
                                        <div className="flex justify-between items-center text-sm font-bold text-text-main">
                                            <div className="flex items-center gap-2">
                                                <span className="material-icons-round text-primary text-base">nfc</span>
                                                <span>NFC Tap</span>
                                            </div>
                                            <span className="text-primary bg-primary/10 px-2 py-0.5 rounded text-xs">~2s (Instant)</span>
                                        </div>
                                        <div className="h-3 bg-gray-50 rounded-full overflow-hidden border border-gray-100">
                                            <div className="h-full bg-primary w-[95%] rounded-full shadow-[0_0_10px_rgba(59,130,246,0.5)] animate-pulse"></div>
                                        </div>
                                    </div>

                                    {/* QR Bar */}
                                    <div className="space-y-3 opacity-60">
                                        <div className="flex justify-between items-center text-sm font-bold text-text-main">
                                            <div className="flex items-center gap-2">
                                                <span className="material-icons-round text-gray-400 text-base">qr_code</span>
                                                <span>QR Scan</span>
                                            </div>
                                            <span className="text-gray-500 bg-gray-100 px-2 py-0.5 rounded text-xs">~8s+ (Slow)</span>
                                        </div>
                                        <div className="h-3 bg-gray-50 rounded-full overflow-hidden border border-gray-100">
                                            <div className="h-full bg-gray-300 w-[25%] rounded-full"></div>
                                        </div>
                                    </div>
                                </div>

                                {/* Floating Badge Effect meant to mimic the reference's 'Test Kits' overlay */}
                                <div className="absolute -bottom-6 -right-6 bg-white p-4 rounded-xl shadow-xl border border-gray-50 hidden sm:block transform rotate-3">
                                    <div className="flex items-center gap-3">
                                        <div className="size-10 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                                            <span className="material-icons-round">check_circle</span>
                                        </div>
                                        <div>
                                            <div className="text-xs text-secondary font-bold uppercase tracking-wider">Success Rate</div>
                                            <div className="text-lg font-bold text-text-main">99.9%</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Timeline/Stepper */}
                    <div className="flex-1 w-full max-w-lg">
                        <div className="relative space-y-12">
                            {/* Vertical Line */}
                            <div className="absolute left-6 top-8 bottom-8 w-0.5 bg-gray-100 hidden sm:block"></div>

                            {[
                                {
                                    icon: 'bolt',
                                    title: 'Lightning Fast',
                                    desc: 'Process entries in seconds. Keep the queue moving smoothly without bottlenecks.'
                                },
                                {
                                    icon: 'wb_incandescent',
                                    title: 'No Lighting Needed',
                                    desc: 'Works perfectly in dark clubs or bright sunlight where QR codes often fail.'
                                },
                                {
                                    icon: 'center_focus_weak',
                                    title: 'No Camera Focus',
                                    desc: 'Forget about blurry scans or dirty lenses. NFC works with a simple proximity tap.'
                                }
                            ].map((feature, i) => (
                                <div key={i} className="relative flex items-start gap-6 group">
                                    {/* Icon */}
                                    <div className="relative z-10 shrink-0">
                                        <div className="size-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center transition-transform duration-300 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-primary/20 group-hover:bg-primary group-hover:text-white">
                                            <span className="material-icons-round text-2xl">{feature.icon}</span>
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="pt-1">
                                        <h4 className="text-xl font-bold text-text-main mb-2 font-display">{feature.title}</h4>
                                        <p className="text-text-secondary leading-relaxed text-sm md:text-base">
                                            {feature.desc}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
