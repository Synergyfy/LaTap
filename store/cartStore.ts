import { create } from 'zustand';
import { CartItem, CartSummary } from '@/types/marketplace';

interface CartState {
    items: CartItem[];
    summary: CartSummary;
    coupon: string | null;
    isGift: boolean;
    setItems: (items: CartItem[]) => void;
    addItem: (item: Omit<CartItem, 'quantity'>) => void;
    updateQuantity: (id: string, delta: number) => void;
    removeItem: (id: string) => void;
    applyCoupon: (coupon: string) => void;
    toggleGift: () => void;
    calculateSummary: () => void;
}

export const useCartStore = create<CartState>((set, get) => ({
    items: [],
    summary: { subtotal: 0, discount: 0, shipping: 0, total: 0 },
    coupon: null,
    isGift: false,

    setItems: (items) => {
        set({ items });
        get().calculateSummary();
    },

    addItem: (newItem) => {
        const { items } = get();
        const existingItem = items.find(item => item.productId === newItem.productId);

        if (existingItem) {
            set({
                items: items.map(item => 
                    item.productId === newItem.productId 
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                )
            });
        } else {
            set({ items: [...items, { ...newItem, quantity: 1 }] });
        }
        get().calculateSummary();
    },

    updateQuantity: (id, delta) => {
        const { items } = get();
        const updatedItems = items.map(item => 
            item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item
        );
        set({ items: updatedItems });
        get().calculateSummary();
    },

    removeItem: (id) => {
        const { items } = get();
        set({ items: items.filter(item => item.id !== id) });
        get().calculateSummary();
    },

    applyCoupon: (coupon) => {
        set({ coupon });
        get().calculateSummary();
    },

    toggleGift: () => {
        set((state) => ({ isGift: !state.isGift }));
        get().calculateSummary();
    },

    calculateSummary: () => {
        const { items, coupon, isGift } = get();
        const subtotal = items.reduce((acc, item) => acc + (item.price * item.quantity), 0);
        
        let discount = 0;
        if (coupon === 'MAX500') {
            discount = 2500; // Mock discount value
        }

        const shipping = subtotal > 100000 ? 0 : 2500; // Free shipping over 100k
        const giftWrap = isGift ? 1500 : 0;
        
        const total = Math.max(0, subtotal - discount + shipping + giftWrap);

        set({
            summary: {
                subtotal,
                discount,
                shipping,
                total
            }
        });
    }
}));
