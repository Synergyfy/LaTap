import React from 'react';

export default function Features() {
    return (
        <section id="features" className="py-24 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-3xl mx-auto mb-20">
                    <span className="text-primary font-bold tracking-widest text-xs uppercase mb-4 block">Power Solutions</span>
                    <h2 className="text-4xl md:text-5xl font-display font-bold text-text-main leading-tight">
                        Connect with your customers <br />digitally
                    </h2>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {[
                        { icon: 'tap_and_play', title: 'Update Links Anytime', desc: 'Change where your card links to anytime without buying a new one. Update offers instantly.', color: 'blue' },
                        { icon: 'speed', title: 'Works Fast on All Phones', desc: 'Loads quickly even on slow mobile networks. Ensure your customers connect without waiting.', color: 'indigo', highlight: true },
                        { icon: 'auto_awesome', title: 'Automatic Follow-ups', desc: 'Capture customer interest and send them email or SMS messages immediately.', color: 'purple' },
                        { icon: 'analytics', title: 'Track Usage', desc: 'See how many people scan your card, which phones they use, and when they scan.', color: 'orange' },
                        { icon: 'security', title: 'Secure Data', desc: 'Your data is safe and encrypted. We protect your customer information.', color: 'teal' },
                        { icon: 'hub', title: 'Connect Other Apps', desc: 'Send your customer data to other tools you use automatically.', color: 'pink' }
                    ].map((f, i) => (
                        <div key={i} className={`p-8 md:p-10 rounded-xl transition-all duration-300 border ${f.highlight ? 'bg-primary text-white border-primary shadow-2xl shadow-primary/20 -translate-y-2' : 'bg-gray-50 border-gray-100 hover:shadow-xl'}`}>
                            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-8 ${f.highlight ? 'bg-white/20' : 'bg-white shadow-lg shadow-gray-200/50'}`}>
                                <span className={`material-icons-round text-3xl ${f.highlight ? 'text-white' : 'text-primary'}`}>{f.icon}</span>
                            </div>
                            <h3 className={`text-xl font-bold mb-4 font-display ${f.highlight ? 'text-white' : 'text-text-main'}`}>{f.title}</h3>
                            <p className={`leading-relaxed ${f.highlight ? 'text-white/90' : 'text-text-secondary font-medium'}`}>{f.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
