'use client';

import React, { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { MessageCircle, Mail, Send, Phone } from 'lucide-react';
import toast from 'react-hot-toast';

export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));

        toast.success('Message sent successfully! We\'ll get back to you soon.');
        setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
        setIsSubmitting(false);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    const supportOptions = [
        {
            icon: MessageCircle,
            title: 'Live Chat Support',
            description: 'Get instant help from our AI assistant or connect with a support agent',
            action: 'Open Chatbot',
            color: 'from-blue-500 to-blue-600',
            onClick: () => {
                // The chatbot is already available via the sticky button
                toast.success('Click the chat button in the bottom right corner!');
            }
        },
        {
            icon: Mail,
            title: 'Email Support',
            description: 'Send us a detailed message and we\'ll respond within 24 hours',
            action: 'Send Email',
            color: 'from-orange-500 to-orange-600',
            onClick: () => {
                const emailSection = document.getElementById('email-form');
                emailSection?.scrollIntoView({ behavior: 'smooth' });
            }
        },
        {
            icon: Phone,
            title: 'WhatsApp Support',
            description: 'Chat with us directly on WhatsApp for quick assistance',
            action: 'Open WhatsApp',
            color: 'from-green-500 to-green-600',
            onClick: () => {
                window.open('https://wa.me/2348012345678?text=Hi, I need help with VemTap', '_blank');
            }
        }
    ];

    return (
        <div className="min-h-screen bg-white">
            <Navbar />

            {/* Hero Section */}
            <section className="pt-32 pb-16 bg-linear-to-br from-gray-50 to-white relative overflow-hidden">
                <div className="absolute inset-0 opacity-5">
                    <div className="absolute inset-0" style={{
                        backgroundImage: 'linear-gradient(to right, #2563eb 1px, transparent 1px), linear-gradient(to bottom, #2563eb 1px, transparent 1px)',
                        backgroundSize: '40px 40px'
                    }}></div>
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="text-center max-w-3xl mx-auto">
                        <span className="text-[10px] font-black uppercase tracking-widest text-primary mb-4 block">
                            Get In Touch
                        </span>
                        <h1 className="text-5xl md:text-6xl font-display font-bold mb-6 text-text-main">
                            We're Here to Help
                        </h1>
                        <p className="text-lg text-text-secondary font-medium leading-relaxed">
                            Choose your preferred way to reach us. Our team is ready to assist you with any questions about VemTap.
                        </p>
                    </div>
                </div>
            </section>

            {/* Support Options */}
            <section className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {supportOptions.map((option, index) => {
                            const IconComponent = option.icon;
                            return (
                                <div
                                    key={index}
                                    className="group relative bg-white border-2 border-gray-100 rounded-3xl p-8 hover:border-primary/20 transition-all duration-300 hover:shadow-xl"
                                >
                                    {/* Icon */}
                                    <div className={`w-16 h-16 rounded-2xl bg-linear-to-br ${option.color} flex items-center justify-center mb-6 transform group-hover:scale-110 transition-transform duration-300`}>
                                        <IconComponent className="text-white" size={28} />
                                    </div>

                                    {/* Content */}
                                    <h3 className="text-2xl font-display font-bold text-text-main mb-3">
                                        {option.title}
                                    </h3>
                                    <p className="text-text-secondary font-medium mb-6 leading-relaxed">
                                        {option.description}
                                    </p>

                                    {/* Action Button */}
                                    <button
                                        onClick={option.onClick}
                                        className={`w-full py-3 px-6 bg-linear-to-br ${option.color} text-white font-bold rounded-xl hover:shadow-lg transition-all active:scale-95 flex items-center justify-center gap-2`}
                                    >
                                        {option.action}
                                        <Send size={16} />
                                    </button>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Email Contact Form */}
            <section id="email-form" className="py-24 bg-gray-50">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-display font-bold text-text-main mb-4">
                            Send Us a Message
                        </h2>
                        <p className="text-text-secondary font-medium">
                            Fill out the form below and we'll get back to you within 24 hours
                        </p>
                    </div>

                    <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-gray-100">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-1">
                                        Full Name *
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                        className="w-full h-12 px-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:bg-white transition-all font-medium text-sm"
                                        placeholder="John Doe"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-1">
                                        Email Address *
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        className="w-full h-12 px-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:bg-white transition-all font-medium text-sm"
                                        placeholder="john@example.com"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-1">
                                        Phone Number
                                    </label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        className="w-full h-12 px-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:bg-white transition-all font-medium text-sm"
                                        placeholder="+234 800 000 0000"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-1">
                                        Subject *
                                    </label>
                                    <select
                                        name="subject"
                                        value={formData.subject}
                                        onChange={handleChange}
                                        required
                                        className="w-full h-12 px-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:bg-white transition-all font-medium text-sm appearance-none cursor-pointer"
                                    >
                                        <option value="">Select a subject</option>
                                        <option value="general">General Inquiry</option>
                                        <option value="sales">Sales Question</option>
                                        <option value="support">Technical Support</option>
                                        <option value="partnership">Partnership Opportunity</option>
                                        <option value="feedback">Feedback</option>
                                    </select>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-1">
                                    Message *
                                </label>
                                <textarea
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                    rows={6}
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:bg-white transition-all font-medium text-sm resize-none"
                                    placeholder="Tell us how we can help you..."
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full h-14 bg-linear-to-br from-primary to-blue-500 text-white font-bold rounded-xl hover:shadow-xl transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                            >
                                {isSubmitting ? (
                                    <>
                                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                        Sending...
                                    </>
                                ) : (
                                    <>
                                        Send Message
                                        <Send size={18} />
                                    </>
                                )}
                            </button>
                        </form>
                    </div>
                </div>
            </section>

            {/* Contact Info */}
            <section className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                        <div>
                            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                                <Mail className="text-primary" size={24} />
                            </div>
                            <h3 className="font-bold text-text-main mb-2">Email Us</h3>
                            <p className="text-text-secondary font-medium">support@vemtap.com</p>
                        </div>

                        <div>
                            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                                <Phone className="text-primary" size={24} />
                            </div>
                            <h3 className="font-bold text-text-main mb-2">Call Us</h3>
                            <p className="text-text-secondary font-medium">+234 801 234 5678</p>
                        </div>

                        <div>
                            <div className="w-12 h-12 bg-green-500/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                                <MessageCircle className="text-green-500" size={24} />
                            </div>
                            <h3 className="font-bold text-text-main mb-2">WhatsApp</h3>
                            <p className="text-text-secondary font-medium">+234 801 234 5678</p>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}
