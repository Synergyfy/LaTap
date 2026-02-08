import { create } from 'zustand';

interface Product {
    id: string;
    name: string;
    brand: string;
    category: string;
    rating: number;
    price: number;
    originalPrice: number | null;
    image: string;
    desc: string;
    tag: string;
    tagColor: string;
    action: 'cart' | 'quote' | 'download';
}

interface FilterState {
    selectedCategory: string;
    priceRange: [number, number];
    selectedBrands: string[];
    currentPage: number;
    searchQuery: string;
}

interface MarketplaceStore extends FilterState {
    setCategory: (category: string) => void;
    setPriceRange: (range: [number, number]) => void;
    toggleBrand: (brand: string) => void;
    setPage: (page: number) => void;
    setSearchQuery: (query: string) => void;
    resetFilters: () => void;
}

export const useMarketplaceStore = create<MarketplaceStore>((set) => ({
    selectedCategory: 'All Products',
    priceRange: [0, 1000000],
    selectedBrands: [],
    currentPage: 1,
    searchQuery: '',

    setCategory: (category) => set({ selectedCategory: category, currentPage: 1 }),
    setPriceRange: (range) => set({ priceRange: range, currentPage: 1 }),
    toggleBrand: (brand) => set((state) => {
        const newBrands = state.selectedBrands.includes(brand)
            ? state.selectedBrands.filter((b) => b !== brand)
            : [...state.selectedBrands, brand];
        return { selectedBrands: newBrands, currentPage: 1 };
    }),
    setPage: (page) => set({ currentPage: page }),
    setSearchQuery: (query) => set({ searchQuery: query, currentPage: 1 }),
    resetFilters: () => set({
        selectedCategory: 'All Products',
        priceRange: [0, 1000000],
        selectedBrands: [],
        currentPage: 1,
        searchQuery: ''
    })
}));
