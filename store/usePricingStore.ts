import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface WhiteLabelSettings {
    minOrder: number;
    markupPercentage: number;
    setupFee: number;
    available: boolean;
}

interface PricingStore {
    whiteLabelSettings: WhiteLabelSettings;
    currency: string;
    setWhiteLabelSettings: (settings: Partial<WhiteLabelSettings>) => void;
    setCurrency: (currency: string) => void;
}

export const usePricingStore = create<PricingStore>()(
    persist(
        (set) => ({
            whiteLabelSettings: {
                minOrder: 1000,
                markupPercentage: 15,
                setupFee: 50000,
                available: true
            },
            currency: 'NGN',
            setWhiteLabelSettings: (settings) => 
                set((state) => ({ 
                    whiteLabelSettings: { ...state.whiteLabelSettings, ...settings } 
                })),
            setCurrency: (currency) => set({ currency }),
        }),
        {
            name: 'pricing-storage',
        }
    )
);
