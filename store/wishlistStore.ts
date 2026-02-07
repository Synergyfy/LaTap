import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface WishlistItem {
    id: string;
    productId: string;
    name: string;
    brand: string;
    price: number;
    image: string;
    desc?: string;
}

interface WishlistState {
    items: WishlistItem[];
    addItem: (item: WishlistItem) => void;
    removeItem: (productId: string) => void;
    toggleItem: (item: WishlistItem) => void;
    isInWishlist: (productId: string) => boolean;
    clearWishlist: () => void;
}

export const useWishlistStore = create<WishlistState>()(
    persist(
        (set, get) => ({
            items: [],
            addItem: (item) => set((state) => ({ 
                items: [...state.items, item] 
            })),
            removeItem: (productId) => set((state) => ({ 
                items: state.items.filter((i) => i.productId !== productId) 
            })),
            toggleItem: (item) => {
                const { items, addItem, removeItem } = get();
                const isExist = items.find((i) => i.productId === item.productId);
                if (isExist) {
                    removeItem(item.productId);
                } else {
                    addItem(item);
                }
            },
            isInWishlist: (productId) => {
                return get().items.some((i) => i.productId === productId);
            },
            clearWishlist: () => set({ items: [] }),
        }),
        {
            name: 'eliztap-wishlist',
        }
    )
);
