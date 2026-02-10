
import { HardwareOption } from '@/types/pricing';

const DEFAULT_HARDWARE: HardwareOption[] = [
    {
        id: 'h1',
        name: "Premium NFC Card",
        price: 3500,
        cost: 2100,
        stock: 450,
        status: 'active',
        color: 'blue',
        icon: 'Cpu',
        desc: "Durable PVC with high-quality printing.",
        unit: "per card",
        features: ['Waterproof PVC', 'NXP NTAG213', 'Full Color CMYK', 'Anti-Metal Option']
    },
    {
        id: 'h2',
        name: "Smart Sticker",
        price: 1500,
        cost: 850,
        stock: 1200,
        status: 'active',
        color: 'green',
        icon: 'Zap',
        desc: "Peel and stick on any surface.",
        unit: "per sticker",
        features: ['3M Adhesive', 'Flexible PET', 'Logo Printing', 'UV Protected']
    },
    {
        id: 'h3',
        name: "Metal NFC Plate",
        price: 12000,
        cost: 7500,
        stock: 85,
        status: 'active',
        color: 'orange',
        icon: 'Shield',
        desc: "For luxury venues and heavy use.",
        unit: "per plate",
        features: ['Stainless Steel', 'Laser Engraved', 'Anti-Metal NFC', 'Scratch Resistant']
    },
    {
        id: 'h4',
        name: "Custom Branded Card",
        price: 5000,
        cost: 3200,
        stock: 0,
        status: 'active',
        color: 'purple',
        icon: 'Palette',
        desc: "Your design, your brand, our tech.",
        unit: "per card",
        features: ['Custom Artwork', 'Edge-to-Edge Print', 'NTAG215 High Memory', 'Matte or Gloss']
    }
];

export const fetchHardwarePricing = async (): Promise<HardwareOption[]> => {
    if (typeof window === 'undefined') return DEFAULT_HARDWARE;
    await new Promise(resolve => setTimeout(resolve, 500));
    const saved = localStorage.getItem('hardware_pricing');
    return saved ? JSON.parse(saved) : DEFAULT_HARDWARE;
};

export const updateHardwareItem = async (item: HardwareOption): Promise<HardwareOption> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    const hardware = await fetchHardwarePricing();
    const updated = hardware.map(h => h.id === item.id ? item : h);
    localStorage.setItem('hardware_pricing', JSON.stringify(updated));
    return item;
};

export const updateHardwarePrice = async (id: string, newPrice: number): Promise<HardwareOption> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    const hardware = await fetchHardwarePricing();
    const updated = hardware.map(h => h.id === id ? { ...h, price: newPrice } : h);
    localStorage.setItem('hardware_pricing', JSON.stringify(updated));
    return updated.find(h => h.id === id)!;
};
