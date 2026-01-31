'use client';
import React, { useState } from 'react';
import Link from 'next/link';

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <>
            <div className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4">
                <nav className={`bg-white/80 text-text-main rounded-full py-3 px-6 flex items-center shadow-xl shadow-gray-200/20 border border-gray-200/50 max-w-5xl w-full justify-between backdrop-blur-xl transition-all duration-300`}>
                    <div className="flex items-center gap-2">
                        <Link href="/" className="flex items-center gap-2">
                            <span className="material-icons-round text-primary text-2xl">nfc</span>
                            <span className="font-display font-semibold text-lg tracking-tight">LaTap</span>
                        </Link>
                    </div>

                    <div className="hidden md:flex items-center gap-8 text-sm font-bold text-text-secondary">
                        <Link className="hover:text-primary transition-colors" href="/solutions">Solutions</Link>
                        <Link className="hover:text-primary transition-colors" href="/features">Features</Link>
                        <Link className="hover:text-primary transition-colors" href="/pricing">Pricing</Link>
                        <Link className="hover:text-primary transition-colors" href="/how-it-works">How it Works</Link>
                    </div>

                    <div className="hidden md:flex items-center gap-3">
                        <Link href="/login" className="text-text-main font-bold text-sm px-5 py-2 hover:text-primary transition-colors cursor-pointer text-center">
                            Login
                        </Link>
                        <Link href="/get-started" className="bg-primary text-white font-bold text-sm px-6 py-2.5 rounded-full hover:bg-primary-hover transition-all shadow-lg shadow-primary/20 cursor-pointer">
                            Get Started
                        </Link>
                    </div>

                    <button
                        onClick={() => setIsMenuOpen(true)}
                        className="md:hidden flex items-center justify-center size-10 rounded-full bg-gray-50 text-text-main hover:bg-gray-100 transition-colors cursor-pointer"
                    >
                        <span className="material-icons-round">menu</span>
                    </button>
                </nav>
            </div>

            <div className={`fixed inset-0 z-[100] transition-opacity duration-300 md:hidden ${isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" onClick={() => setIsMenuOpen(false)}></div>
                <div className={`absolute right-0 top-0 bottom-0 w-[80%] max-w-sm bg-white shadow-2xl transition-transform duration-500 transform ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'} p-8 flex flex-col`}>
                    <div className="flex justify-between items-center mb-12">
                        <div className="flex items-center gap-2">
                            <span className="material-icons-round text-primary text-2xl">nfc</span>
                            <span className="font-display font-semibold text-lg tracking-tight text-text-main">LaTap</span>
                        </div>
                        <button onClick={() => setIsMenuOpen(false)} className="size-10 rounded-full bg-gray-50 text-text-main flex items-center justify-center cursor-pointer">
                            <span className="material-icons-round">close</span>
                        </button>
                    </div>

                    <div className="flex flex-col gap-8 text-xl font-bold text-text-secondary">
                        <Link onClick={() => setIsMenuOpen(false)} className="hover:text-primary transition-colors" href="/">Home</Link>
                        <Link onClick={() => setIsMenuOpen(false)} className="hover:text-primary transition-colors" href="/features">Features</Link>
                        <Link onClick={() => setIsMenuOpen(false)} className="hover:text-primary transition-colors" href="/how-it-works">How it Works</Link>
                        <Link onClick={() => setIsMenuOpen(false)} className="hover:text-primary transition-colors" href="/solutions">Solutions</Link>
                        <Link onClick={() => setIsMenuOpen(false)} className="hover:text-primary transition-colors" href="/pricing">Pricing</Link>
                    </div>

                    <div className="mt-auto flex flex-col gap-4">
                        <Link href="/login" onClick={() => setIsMenuOpen(false)} className="w-full py-4 rounded-2xl bg-gray-50 text-text-main font-bold border border-gray-100 hover:bg-gray-100 transition-colors cursor-pointer text-center">
                            Login
                        </Link>
                        <Link href="/get-started" onClick={() => setIsMenuOpen(false)} className="w-full py-4 rounded-2xl bg-primary text-white font-bold shadow-xl shadow-primary/20 hover:bg-primary-hover transition-colors text-center">
                            Get Started Free
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}
