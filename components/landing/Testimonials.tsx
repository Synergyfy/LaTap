'use client';

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { designPresets as presets } from '@/styles/presets';

const testimonials = [
    {
        id: 1,
        metric: '8X',
        metricLabel: 'More Sales',
        quote: "Using VemTap at our events changed everything. We collected 8 times more customer contacts than when we used paper.",
        author: "David Okon",
        role: "Head of Marketing, Jara",
        avatar: "https://i.pravatar.cc/150?u=1",
        logo: "verified"
    },
    {
        id: 2,
        metric: '45%',
        metricLabel: 'More Profit',
        quote: "It is so easy for customers. Just a tap and they are in. This is exactly what our shops needed.",
        author: "Sarah Adebayo",
        role: "Customer Success",
        avatar: "https://i.pravatar.cc/150?u=2",
        logo: "insights"
    },
    {
        id: 3,
        metric: '3.2k',
        metricLabel: 'New Users',
        quote: "The design is beautiful and it works perfectly. We now understand our customers better.",
        author: "Tunde Bakare",
        role: "Founder, PulseCore",
        avatar: "https://i.pravatar.cc/150?u=3",
        logo: "analytics"
    },
    {
        id: 4,
        metric: '100%',
        metricLabel: 'Success Rate',
        quote: "Setup was very fast. We got 50 locations working in less than a week. The support team is great.",
        author: "Jennifer Olu",
        role: "COO, Flash Stores",
        avatar: "https://i.pravatar.cc/150?u=4",
        logo: "sync_alt"
    }
];

export default function Testimonials() {
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    const scroll = (direction: 'left' | 'right') => {
        if (scrollContainerRef.current) {
            const scrollAmount = 450; // card width + gap
            scrollContainerRef.current.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth'
            });
        }
    };

    return (
        <section className={`${presets.sectionPadding} bg-[#fafbfc] overflow-hidden`}>
            <div className={presets.containerMaxWidth}>
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
                    <div className="max-w-2xl">
                        <span className={presets.badge}>Success Stories</span>
                        <h2 className={presets.title}>
                            Results that speak volume
                        </h2>
                        <h3 className={`${presets.subtitle} mt-2`}>
                            Read success stories
                        </h3>
                    </div>

                    <div className="flex gap-4">
                        <button
                            onClick={() => scroll('left')}
                            className="size-12 rounded-full border border-gray-200 bg-white flex items-center justify-center text-text-main hover:bg-gray-50 hover:border-gray-300 transition-all active:scale-90"
                        >
                            <span className="material-icons-round">chevron_left</span>
                        </button>
                        <button
                            onClick={() => scroll('right')}
                            className="size-12 rounded-full border border-gray-200 bg-white flex items-center justify-center text-text-main hover:bg-gray-50 hover:border-gray-300 transition-all active:scale-90"
                        >
                            <span className="material-icons-round">chevron_right</span>
                        </button>
                    </div>
                </div>

                <div className="relative">
                    <div
                        className="flex gap-6 overflow-x-auto snap-x snap-mandatory no-scrollbar pb-8"
                        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                        ref={scrollContainerRef}
                    >
                        {testimonials.map((t, i) => (
                            <motion.div
                                key={t.id}
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ delay: i * 0.1 }}
                                className="min-w-full md:min-w-[450px] snap-center"
                            >
                                <div className={`${presets.card} p-8 h-full flex flex-col`}>
                                    <div className="flex justify-between items-start mb-8">
                                        <div>
                                            <p className={presets.metric}>{t.metric}</p>
                                            <p className={presets.metricLabel}>{t.metricLabel}</p>
                                        </div>
                                        <div className="size-10 rounded-xl bg-primary/5 flex items-center justify-center text-primary">
                                            <span className="material-icons-round text-xl">{t.logo}</span>
                                        </div>
                                    </div>

                                    <p className="text-base text-text-main font-medium leading-relaxed mb-10 grow">
                                        "{t.quote}"
                                    </p>

                                    <div className="flex items-center gap-4 pt-6 border-t border-gray-50">
                                        <img src={t.avatar} alt={t.author} className="size-10 rounded-full grayscale hover:grayscale-0 transition-all" />
                                        <div>
                                            <p className="font-bold text-sm text-text-main leading-none mb-1">{t.author}</p>
                                            <p className="text-[10px] font-bold text-text-secondary uppercase tracking-widest">{t.role}</p>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                <div className="mt-16 pt-10 border-t border-gray-100 flex flex-col md:flex-row items-center justify-between gap-8">
                    <div className="flex items-center gap-6">
                        <p className="text-xs font-bold text-text-secondary">1500+ satisfied clients</p>
                        <div className="flex items-center gap-1">
                            {[1, 2, 3, 4, 5].map((s) => (
                                <span key={s} className="material-icons-round text-amber-400 text-sm">star</span>
                            ))}
                            <span className="ml-2 text-sm font-black text-text-main">4.9</span>
                        </div>
                    </div>

                    <Link href="/testimonials" className={presets.buttonSecondary}>
                        View all reviews
                        <span className="material-icons-round text-sm">arrow_forward</span>
                    </Link>
                </div>
            </div>
        </section>
    );
}
