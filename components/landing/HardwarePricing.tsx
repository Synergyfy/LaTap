import Link from 'next/link';
import { Cpu, Shield, Zap, Palette, Printer, ArrowRight } from 'lucide-react';

export default function HardwarePricing() {
    const hardwareOptions = [
        {
            name: "Premium NFC Card",
            price: "₦3,500",
            unit: "per card",
            desc: "Durable PVC with high-quality printing.",
            icon: Cpu,
            features: ['Waterproof PVC', 'NXP NTAG213', 'Full Color CMYK', 'Anti-Metal Option'],
            color: 'blue'
        },
        {
            name: "Smart Sticker",
            price: "₦1,500",
            unit: "per sticker",
            desc: "Peel and stick on any surface.",
            icon: Shield,
            features: ['3M Adhesive', 'Flexible PET', 'Logo Printing', 'UV Protected'],
            color: 'green'
        },
        {
            name: "Metal NFC Plate",
            price: "₦12,000",
            unit: "per plate",
            desc: "For luxury venues and heavy use.",
            icon: Zap,
            features: ['Stainless Steel', 'Laser Engraved', 'Anti-Metal NFC', 'Scratch Resistant'],
            color: 'orange'
        }
    ];

    const whiteLabelFeatures = [
        {
            title: "Custom Branding",
            desc: "Your logo, colors, and design on every piece of hardware.",
            icon: Palette
        },
        {
            title: "Bulk Printing",
            desc: "High-volume offset printing for superior quality and lower costs.",
            icon: Printer
        },
        {
            title: "Pre-Configured",
            desc: "Cards arrive ready to use, linked to your business account.",
            icon: Cpu
        }
    ];

    return (
        <section className="py-24 bg-white border-t border-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <span className="text-primary font-bold tracking-widest text-xs uppercase mb-4 block">Hardware Solutions</span>
                    <h2 className="text-4xl md:text-5xl font-display font-bold mb-6 text-text-main">ElizTap Hardware & White Labeling</h2>
                    <p className="text-lg text-text-secondary font-medium">Get premium, custom-branded NFC hardware for your business or clients.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
                    {hardwareOptions.map((item, index) => (
                        <div key={index} className="bg-gray-50 rounded-2xl p-8 border border-gray-100 hover:border-primary/20 hover:shadow-xl transition-all group">
                            <div className={`w-14 h-14 rounded-xl mb-6 flex items-center justify-center ${item.color === 'blue' ? 'bg-blue-100 text-blue-600' :
                                item.color === 'green' ? 'bg-green-100 text-green-600' :
                                    'bg-orange-100 text-orange-600'
                                }`}>
                                <item.icon size={28} />
                            </div>
                            <h3 className="text-xl font-bold text-text-main mb-2">{item.name}</h3>
                            <p className="text-sm text-text-secondary font-medium mb-6">{item.desc}</p>
                            <div className="flex items-baseline gap-2 mb-8">
                                <span className="text-3xl font-bold text-text-main">{item.price}</span>
                                <span className="text-sm text-text-secondary font-bold uppercase tracking-wider">{item.unit}</span>
                            </div>
                            <ul className="space-y-3">
                                {item.features.map((feature, i) => (
                                    <li key={i} className="flex items-center gap-3 text-sm font-semibold text-text-secondary">
                                        <div className="size-1.5 rounded-full bg-primary" />
                                        {feature}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
}
