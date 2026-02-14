import { Product, ProductDetail } from '@/types/marketplace';

// Mock Data Source
const allProducts: Product[] = [
    {
        id: 'nfc-plate-white',
        name: 'VemTap NFC Plate (White)',
        brand: 'VemTap',
        category: 'NFC Plates',
        rating: 4.9,
        price: 500,
        originalPrice: 700,
        image: "/assets/nfc/Card NFC Plate White.avif",
        desc: 'Premium white NFC plate for desks and counters.',
        tag: 'Best Seller',
        tagColor: 'bg-emerald-500',
        action: 'quote',
        moq: 1
    },
    {
        id: 'nfc-plate-white-pack',
        name: 'VemTap NFC Plate White (Pack of 5)',
        brand: 'VemTap',
        category: 'NFC Plates',
        rating: 5.0,
        price: 450,
        originalPrice: 600,
        image: "/assets/nfc/Card_NFC_Plate_White Pack.avif",
        desc: 'Value pack of 5 white NFC plates.',
        tag: 'Value Pack',
        tagColor: 'bg-blue-500',
        action: 'quote',
        moq: 1
    },
    {
        id: 'round-nfc-plate-white',
        name: 'Round NFC Plate (White)',
        brand: 'VemTap',
        category: 'NFC Plates',
        rating: 4.8,
        price: 550,
        originalPrice: 750,
        image: "/assets/nfc/Round Card NFC Plate White 1.avif",
        desc: 'Sleek round NFC plate for modern spaces.',
        tag: 'New',
        tagColor: 'bg-purple-500',
        action: 'quote',
        moq: 1
    },
    {
        id: 'small-round-nfc',
        name: 'Small Round NFC Tag',
        brand: 'VemTap',
        category: 'NFC Tags',
        rating: 4.7,
        price: 300,
        originalPrice: 500,
        image: "/assets/nfc/Small Round Card NFC.avif",
        desc: 'Compact NFC tag for versatile use.',
        tag: 'In Stock',
        tagColor: 'bg-emerald-500',
        action: 'quote',
        moq: 5
    },
    {
        id: 'square-nfc-plate',
        name: 'Square NFC Plate',
        brand: 'VemTap',
        category: 'NFC Plates',
        rating: 4.8,
        price: 600,
        originalPrice: 800,
        image: "/assets/nfc/Square Card NFC Plate.avif",
        desc: 'Modern square design with high-range NFC.',
        tag: 'Trending',
        tagColor: 'bg-orange-500',
        action: 'quote',
        moq: 1
    },
    {
        id: 'standing-nfc-plate-black',
        name: 'Standing NFC Plate (Black)',
        brand: 'VemTap',
        category: 'NFC Stands',
        rating: 4.9,
        price: 800,
        originalPrice: 1200,
        image: "/assets/nfc/Standing NFC Plate Black.avif",
        desc: 'Elegant black standing NFC plate for tables.',
        tag: 'Premium',
        tagColor: 'bg-zinc-800',
        action: 'quote',
        moq: 1
    },
    {
        id: 'standing-nfc-plate-qr',
        name: 'Standing NFC Plate with QR',
        brand: 'VemTap',
        category: 'NFC Stands',
        rating: 5.0,
        price: 1000,
        originalPrice: 1500,
        image: "/assets/nfc/Standing NFC Plate with QR.avif",
        desc: 'Dual-tech standing plate with NFC and QR code.',
        tag: 'Hybrid',
        tagColor: 'bg-indigo-500',
        action: 'quote',
        moq: 1
    },
    {
        id: 'chip-tag-nfc215',
        name: 'NTAG215 Chip Tag',
        brand: 'NXP',
        category: 'Components',
        rating: 4.6,
        price: 800,
        originalPrice: 1000,
        image: "/assets/nfc/Chip_tag_NFC215.avif",
        desc: 'Raw NTAG215 chip for custom implementations.',
        tag: 'DIY',
        tagColor: 'bg-gray-500',
        action: 'quote',
        moq: 50
    }
];

export const fetchProducts = async (
    page: number = 1,
    limit: number = 8,
    category: string = 'All Products',
    priceRange: [number, number] = [0, 1000000],
    brands: string[] = [],
    searchQuery: string = ''
) => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 800));

    let filtered = allProducts.filter(p => {
        const matchesCategory = category === 'All Products' || p.category === category;
        const matchesPrice = p.price >= priceRange[0] && p.price <= priceRange[1];
        const matchesBrand = brands.length === 0 || brands.includes(p.brand);
        const matchesSearch = searchQuery === '' || 
            p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
            p.desc.toLowerCase().includes(searchQuery.toLowerCase());

        return matchesCategory && matchesPrice && matchesBrand && matchesSearch;
    });

    const totalCount = filtered.length;
    const totalPages = Math.ceil(totalCount / limit);
    const start = (page - 1) * limit;
    const end = start + limit;
    const paginatedProducts = filtered.slice(start, end);

    return {
        products: paginatedProducts,
        totalPages,
        totalCount
    };
};

export const fetchProductDetail = async (id: string): Promise<ProductDetail | null> => {
    await new Promise(resolve => setTimeout(resolve, 800));

    const product = allProducts.find(p => p.id === id);

    if (product) {
        return {
            ...product,
            sku: `VEM-${id.toUpperCase()}`,
            description: product.desc,
            longDescription: `Experience the future of connectivity with the ${product.name}. Designed for reliability and style, this NFC solution integrates seamlessly into any environment. Perfect for businesses looking to enhance customer engagement through tap-to-action technology.`,
            images: [
                product.image,
                // Add varied images if available, otherwise repeat or use generic
                "/assets/nfc/Reading position.avif",
                "/assets/nfc/Card NFC Plate White spread.avif"
            ],
            mainImage: product.image,
            specifications: {
                'Material': 'Premium PVC / Acrylic',
                'Frequency': '13.56 MHz',
                'Chip Type': 'NTAG215 / NTAG216',
                'Reading Distance': '2-5 cm',
                'Water Resistance': 'IP65'
            },
            documents: [
                { name: 'User Guide', size: '1.2 MB', date: '2024', downloads: 120, type: 'pdf' }
            ],
            relatedProducts: allProducts.filter(p => p.id !== id).slice(0, 2),
            features: ['Instant Setup', 'Durable Build', 'Cloud Compatible'],
            tieredPricing: [
                { minQuantity: 1, maxQuantity: 49, price: product.price },
                { minQuantity: 50, maxQuantity: 100, price: Math.floor(product.price * 0.9) },
                { minQuantity: 101, price: 'quote' }
            ]
        };
    }

    return null;
};

