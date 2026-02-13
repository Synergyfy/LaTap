import { Product } from '@/types/marketplace';

// Mock Data Source
const allProducts: Product[] = [
    {
        id: 'acs-acr1552u',
        name: 'ACS ACR1552U USB-C NFC Reader IV',
        brand: 'ACS',
        category: 'NFC Readers',
        rating: 4.9,
        price: 124999,
        originalPrice: 149000,
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuB6J_11qPV0OmQwFJoKJtTMpD_qjs1SsBP9UsQg0ecJWY2IONWb79e03v7EMbPHEBzTJtdwTiWa4uHBlwQpbnU0EI9XkmDEOrQF_F57RfXBMpzCz3WITiymIK5fKWEIyOxSSyurDKwi32cxVO-m90-snIAYuoCD8Yr181lIcfNaCRwZr0bXXLyxdrvlnrxIO6jof5lw-BXhuVlPaRUFxFKCg5okpbY0Vrtjw1r2KKRGWGcmaZz_OUHZQ7qJnz8J7LCbuEvtvZWaxQWL",
        desc: 'Dual-interface Smart Card Reader with CCID Support',
        tag: 'In Stock',
        tagColor: 'bg-emerald-500',
        action: 'quote'
    },
    {
        id: 'omnikey-5422',
        name: 'OMNIKEY 5422 Dual Interface Reader',
        brand: 'HID Global',
        category: 'NFC Readers',
        rating: 4.8,
        price: 189000,
        originalPrice: null,
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuA13i7tJ7UvtV5AeSpw3wOHaYE8eOSOAHsJtyf9B8QtVXaQpAPS3C7Teyqjev3z6_-2UBAUUsl9_wQrPFQB4dsL21qcM803GIIhce48iGdAgKXjYlhpJBNo1PKjrd-FnkGqZzA9IKKpAIcee1B396E-WCSuonb2_wSUSBjZpX_9OT6hB2FsxRZYweRceLiA9MfmDMM0f3rXJHKAq-TzdbZ2XPvvKlIxen5gbQNQZlFxGq791xkCofDQmiLKdWXKTXx5bV39FHTL2Zxu",
        desc: 'Contactless 13.56 MHz and Contact Smart Card',
        tag: 'Out of Stock',
        tagColor: 'bg-red-500',
        action: 'quote'
    },

    {
        id: 'ntag215-pack',
        name: 'NTAG215 PVC Smart Cards (Pack of 100)',
        brand: 'NXP',
        category: 'Smart Cards',
        rating: 4.7,
        price: 500, // Price per unit
        originalPrice: 650,
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAjOLHjEImnuX2LOtQ9_35UJ5iBVDjYgoAdUkfVCIOKlzLzNbR8jzZuXMqBzr2zm7bTB60FByuzS4DfbPxOdC-XETnsg_xSz6HydW21C7a49GAGuikH8vL51ldD0GCCYAAAWeyYjrsST43T02ixab1YBLQ0SN7FPkmwUSZjyJwz5rbAfLT4RqccxCFX1gzrKZ55WEV-TfuHqVMMxN3TpGlj_Q1xdnQblfVWikTCC9YahMk0rdT2xgoAgGPqhqumczAzvpmU-SttVIU1",
        desc: '504 Bytes Memory, Compatible with Amiibo',
        tag: 'In Stock',
        tagColor: 'bg-emerald-500',
        action: 'quote',
        moq: 100
    },
    {
        id: 'sl025m-module',
        name: 'SL025M 13.56MHz RFID Reader/Writer Module',
        brand: 'StrongLink',
        category: 'Modules',
        rating: 4.5,
        price: 15400,
        originalPrice: null,
        image: "https://m.media-amazon.com/images/I/61+yV+J+d3L._AC_SL1000_.jpg",
        desc: 'Embedded module for custom hardware integration.',
        tag: 'In Stock',
        tagColor: 'bg-emerald-500',
        action: 'quote',
        moq: 1
    },
    {
        id: 'nfc-wristband',
        name: 'Silicone NFC Wristband (Pack of 50)',
        brand: 'ElizTap',
        category: 'Accessory',
        rating: 4.6,
        price: 800, // Price per unit
        originalPrice: 1000,
        image: "https://sc04.alicdn.com/kf/H835260171a3949989506684724495537t.jpg",
        desc: 'Waterproof wristbands for event access.',
        tag: 'In Stock',
        tagColor: 'bg-emerald-500',
        action: 'quote',
        moq: 50
    },
    {
        id: 'ntag216-keyfob',
        name: 'NTAG216 Epoxy Keyfob (Pack of 50)',
        brand: 'NXP',
        category: 'Smart Cards',
        rating: 4.8,
        price: 600, // Price per unit
        originalPrice: 800,
        image: "https://m.media-amazon.com/images/I/61kQqnyv7BL._AC_SX679_.jpg",
        desc: 'Durable epoxy finish, 888 bytes memory.',
        tag: 'In Stock',
        tagColor: 'bg-emerald-500',
        action: 'quote',
        moq: 50
    },
    {
        id: 'acr122u-reader',
        name: 'ACS ACR122U USB NFC Reader',
        brand: 'ACS',
        category: 'NFC Readers',
        rating: 4.6,
        price: 45000,
        originalPrice: 55000,
        image: "https://m.media-amazon.com/images/I/61+yV+J+d3L._AC_SL1000_.jpg",
        desc: 'Popular NFC reader for desktop applications.',
        tag: 'In Stock',
        tagColor: 'bg-emerald-500',
        action: 'quote',
        moq: 1
    },
    {
        id: 'metal-nfc-card',
        name: 'Premium Metal NFC Business Card',
        brand: 'ElizTap',
        category: 'Smart Cards',
        rating: 4.9,
        price: 15000,
        originalPrice: 25000,
        image: "https://m.media-amazon.com/images/I/61kQqnyv7BL._AC_SX679_.jpg",
        desc: 'Matte black metal finish with laser engraving.',
        tag: 'In Stock',
        tagColor: 'bg-emerald-500',
        action: 'quote',
        moq: 5
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

export const fetchProductDetail = async (id: string) => {
    await new Promise(resolve => setTimeout(resolve, 800));

    // Mock Detail Data
    const productDetails: Record<string, any> = {
        'acs-acr1552u': {
            id: 'acs-acr1552u',
            sku: 'ACS-1552U-G1',
            name: 'ACS ACR1552U NFC USB Reader',
            brand: 'ACS',
            price: 124999,
            description: 'The ACS ACR1552U is a dual-interface smart card reader that can access both contact and contactless smart cards.',
            longDescription: 'The ACS ACR1552U is a high-performance smart card reader designed for secure authentication and data transfer. It supports both ISO 14443 Type A and B cards, as well as MIFARE and FeliCa tags. With its CCID compliance, it is easy to integrate into various operating systems without the need for additional drivers.',
            images: [
                "https://lh3.googleusercontent.com/aida-public/AB6AXuDDeoGIbe96WBYeBtXjfjKNGuMBnUKo8owrQjFCfRXn5sOY75-fKbRoAFwhnf-MmV3PkVeVDquiiZuY6hSC2RaIht4m9kVtAKVIw7mXHuG_ghUTYpvFpGST06tdjc6vjFGqvXt715ctcwE0ENV9Dio7DjJ3dENX67OM18BDAb5Y4dwga1fACWSxnXhWVyHU3E3grs8eXgG85LZvQgxuvPfrSvFw0JevUzmXXCQ7Sn0O0xJ632mfEaX42KztUAwJL-bATOO1oTXo-Csw",
                "https://lh3.googleusercontent.com/aida-public/AB6AXuClhb2SNUDTfTv_zqsIT6XNhSrFl_P1wPF0EmYibzGxElOj4IgBYOUkJWFGq-F-0dyckxS6st9qGO5rZqykoVDHudTBFrThBQPEiqC7aB8Y2GSNZgUxlXk4lkp1w8-m2P9LaQUK9zfVzvsY-XX4Z90lhhB-PvdYihC-Cuqp1oAzenNBOuFX6Fyvv19QZNuEC0zUNbqVANsmiYXiiSnxbDZB5UmHnIO5I7HlC7CXfBoMvtQTvy4a75KJWL5_2Q-5vvo9UEjZijj6WAoB",
                "https://lh3.googleusercontent.com/aida-public/AB6AXuDLq0oL8TeUy14bdgcWDQ6hThA_wxvKcrGnCrIZhGwRH0hHyjUOFsx8FCYIYcwwDduc-P3Lb2JDj6O-WvGuIynJltqFgDnvQt6mOp_CnzsRlTy5eCw9iWqA-FZ0uj5K06GJ8-57615mEGq_l9NmKvsvWYSvgXGcdmG68SEObxbP4LmQRbhGkKyDDpqu6QFhvPBEQmBE6nvrxHGXNSLYRSwh1Zwe8V_ft_CSl_GmMDAlwUwt9dhJQoPN8b-P_CwlBGTl17VP9MECHr5U",
                "https://lh3.googleusercontent.com/aida-public/AB6AXuDdB2rQ9j86VQqP-WApDQLRBt94FUGSaJgk8XIZFsDyLoXjqaHg2Ykh4Qt0Q67XQHF74WRN27Ns69IiKxzL6NnNeKgdpFqUDciXY6Q9YjLsm2kIGDZoWNS_JGCr-QiFXAkXHAbtGLvXhPdNEDm5SyIUxNpn_kN6D8MdmI3TEBegFcbNr5qUyqBJnlG4GDyYvDFjG-EIaIru5MwelRsZ6QiyKpTCm1TBHi3zswKvaL22J3BA4jG99yd1SEBxE4Q0okjHBaf1hWLVxEyr"
            ],
            mainImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuDDeoGIbe96WBYeBtXjfjKNGuMBnUKo8owrQjFCfRXn5sOY75-fKbRoAFwhnf-MmV3PkVeVDquiiZuY6hSC2RaIht4m9kVtAKVIw7mXHuG_ghUTYpvFpGST06tdjc6vjFGqvXt715ctcwE0ENV9Dio7DjJ3dENX67OM18BDAb5Y4dwga1fACWSxnXhWVyHU3E3grs8eXgG85LZvQgxuvPfrSvFw0JevUzmXXCQ7Sn0O0xJ632mfEaX42KztUAwJL-bATOO1oTXo-Csw",
            tag: 'In Stock',
            tagColor: 'bg-green-100 text-green-800',
            specifications: {
                'Interface': 'USB 2.0 Full Speed (Type A)',
                'Operating Distance': 'Up to 50 mm (depending on tag type)',
                'Supported Standards': 'ISO 14443 Type A & B, MIFARE, FeliCa',
                'Supply Current': 'Max. 200 mA',
                'Operating Temperature': '0°C to 50°C',
                'Dimensions': '98.0 mm (L) x 65.0 mm (W) x 12.8 mm (H)'
            },
            documents: [
                { name: 'ACR1552U Software Development Kit (SDK)', size: '12.4 MB', date: 'Updated 2 days ago', downloads: 421, type: 'sdk' },
                { name: 'Technical Datasheet (PDF)', size: '1.2 MB', date: 'EN', downloads: 1200, type: 'pdf' }
            ],
            relatedProducts: [
                { id: 'ntag215-pack', name: 'NTAG215 PVC Smart Cards', image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAjOLHjEImnuX2LOtQ9_35UJ5iBVDjYgoAdUkfVCIOKlzLzNbR8jzZuXMqBzr2zm7bTB60FByuzS4DfbPxOdC-XETnsg_xSz6HydW21C7a49GAGuikH8vL51ldD0GCCYAAAWeyYjrsST43T02ixab1YBLQ0SN7FPkmwUSZjyJwz5rbAfLT4RqccxCFX1gzrKZ55WEV-TfuHqVMMxN3TpGlj_Q1xdnQblfVWikTCC9YahMk0rdT2xgoAgGPqhqumczAzvpmU-SttVIU1", brand: 'NXP', price: 85500 },
                { id: 'omnikey-5422', name: 'OMNIKEY 5422 Reader', image: "https://lh3.googleusercontent.com/aida-public/AB6AXuA13i7tJ7UvtV5AeSpw3wOHaYE8eOSOAHsJtyf9B8QtVXaQpAPS3C7Teyqjev3z6_-2UBAUUsl9_wQrPFQB4dsL21qcM803GIIhce48iGdAgKXjYlhpJBNo1PKjrd-FnkGqZzA9IKKpAIcee1B396E-WCSuonb2_wSUSBjZpX_9OT6hB2FsxRZYweRceLiA9MfmDMM0f3rXJHKAq-TzdbZ2XPvvKlIxen5gbQNQZlFxGq791xkCofDQmiLKdWXKTXx5bV39FHTL2Zxu", brand: 'HID Global', price: 189000 }
            ],
            features: [
                'Ships in 24-48 Hours',
                'Genuine Product'
            ],
            video: {
                url: 'https://www.youtube.com/embed/dQw4w9WgXcQ' // Mock video
            },
            howToSteps: [
                { title: 'Connect to Device', description: 'Plug the ACR1552U into any USB-C port on your computer or compatible device.' },
                { title: 'Wait for Initialization', description: 'The LED light will flash green indicating the device is ready to use.' },
                { title: 'Position NFC Tag', description: 'Place your NFC card or phone within 50mm of the reader head.' },
                { title: 'Success Signal', description: 'A short beep will confirm the successful reading of the tag data.' }
            ],
            tieredPricing: [
                { minQuantity: 1, maxQuantity: 10, price: 124999 },
                { minQuantity: 11, maxQuantity: 100, price: 115000 },
                { minQuantity: 101, maxQuantity: 500, price: 105000 },
                { minQuantity: 501, price: 'quote' }
            ]
        },
        'omnikey-5422': {
            id: 'omnikey-5422',
            sku: 'HID-5422-DUAL',
            name: 'OMNIKEY 5422 Dual Interface Reader',
            brand: 'HID Global',
            price: 189000,
            description: 'The OMNIKEY 5422 represents the ultimate combination of contact and contactless smart card reader technology.',
            longDescription: 'The OMNIKEY® 5422 represents the ultimate combination of contact and contactless technology in a single device. The solution features a dual interface, PC-linked reader that reads/writes to both a 13.56 MHz contactless smart card and virtually any contact smart card, allowing users to experience the convenience, speed and security of contactless technology for applications, including logon to Windows®, networks, websites and applications for the storage of user names, passwords and personal information.',
            images: [
                "https://lh3.googleusercontent.com/aida-public/AB6AXuA13i7tJ7UvtV5AeSpw3wOHaYE8eOSOAHsJtyf9B8QtVXaQpAPS3C7Teyqjev3z6_-2UBAUUsl9_wQrPFQB4dsL21qcM803GIIhce48iGdAgKXjYlhpJBNo1PKjrd-FnkGqZzA9IKKpAIcee1B396E-WCSuonb2_wSUSBjZpX_9OT6hB2FsxRZYweRceLiA9MfmDMM0f3rXJHKAq-TzdbZ2XPvvKlIxen5gbQNQZlFxGq791xkCofDQmiLKdWXKTXx5bV39FHTL2Zxu"
            ],
            mainImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuA13i7tJ7UvtV5AeSpw3wOHaYE8eOSOAHsJtyf9B8QtVXaQpAPS3C7Teyqjev3z6_-2UBAUUsl9_wQrPFQB4dsL21qcM803GIIhce48iGdAgKXjYlhpJBNo1PKjrd-FnkGqZzA9IKKpAIcee1B396E-WCSuonb2_wSUSBjZpX_9OT6hB2FsxRZYweRceLiA9MfmDMM0f3rXJHKAq-TzdbZ2XPvvKlIxen5gbQNQZlFxGq791xkCofDQmiLKdWXKTXx5bV39FHTL2Zxu",
            tag: 'Bulk Choice',
            tagColor: 'bg-blue-100 text-blue-800',
            specifications: {
                'Host Interface': 'USB 2.0 (also compliant with USB 1.1)',
                'Standard': 'ISO 7816 & ISO 14443 A/B, MIFARE, DESFire',
                'Protocols': 'T=0, T=1, 2-wire: SLE 4432/42 (S=10); 3-wire: SLE 4418/28 (S=9); I2C (S=8)',
                'Operating Temp': '0° - 55° C (32° - 131° F)',
                'Driver Support': 'Windows, MacOS, Linux, Android'
            },
            documents: [
                { name: 'HID OMNIKEY 5422 Guide', size: '2.4 MB', date: 'EN', downloads: 850, type: 'pdf' }
            ],
            relatedProducts: [],
            features: ['Standard Shipping', 'HID Certified'],
            tieredPricing: [
                { minQuantity: 1, maxQuantity: 5, price: 189000 },
                { minQuantity: 6, maxQuantity: 20, price: 175000 },
                { minQuantity: 21, price: 'quote' }
            ]
        },
        'ntag215-pack': {
            id: 'ntag215-pack',
            sku: 'NXP-NTAG215-100',
            name: 'NTAG215 PVC Smart Cards (Pack of 100)',
            brand: 'NXP',
            price: 500, // Unit price
            description: 'NTAG215 PVC cards for Amiibo, event tracking, and access control.',
            longDescription: 'High-quality PVC cards with genuine NXP NTAG215 chip. Perfect for Amiibo identification, asset tracking, event management, and custom NFC solutions. These cards are blank white and suitable for thermal transfer or inkjet printing (with specialized trays). 504 bytes of usable memory with read/write capability.',
            images: [
                "https://lh3.googleusercontent.com/aida-public/AB6AXuAjOLHjEImnuX2LOtQ9_35UJ5iBVDjYgoAdUkfVCIOKlzLzNbR8jzZuXMqBzr2zm7bTB60FByuzS4DfbPxOdC-XETnsg_xSz6HydW21C7a49GAGuikH8vL51ldD0GCCYAAAWeyYjrsST43T02ixab1YBLQ0SN7FPkmwUSZjyJwz5rbAfLT4RqccxCFX1gzrKZ55WEV-TfuHqVMMxN3TpGlj_Q1xdnQblfVWikTCC9YahMk0rdT2xgoAgGPqhqumczAzvpmU-SttVIU1"
            ],
            mainImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuAjOLHjEImnuX2LOtQ9_35UJ5iBVDjYgoAdUkfVCIOKlzLzNbR8jzZuXMqBzr2zm7bTB60FByuzS4DfbPxOdC-XETnsg_xSz6HydW21C7a49GAGuikH8vL51ldD0GCCYAAAWeyYjrsST43T02ixab1YBLQ0SN7FPkmwUSZjyJwz5rbAfLT4RqccxCFX1gzrKZ55WEV-TfuHqVMMxN3TpGlj_Q1xdnQblfVWikTCC9YahMk0rdT2xgoAgGPqhqumczAzvpmU-SttVIU1",
            tag: 'Multipack',
            tagColor: 'bg-amber-100 text-amber-800',
            specifications: {
                'Chip Type': 'NXP NTAG215',
                'Memory': '540 Bytes (504 Bytes usable)',
                'Standard': 'ISO/IEC 14443A',
                'Frequency': '13.56 MHz',
                'Material': 'Polished PVC (White)'
            },
            documents: [
                { name: 'NTAG21x Datasheet', size: '1.1 MB', date: 'Updated 2023', downloads: 3000, type: 'pdf' }
            ],
            relatedProducts: [],
            features: ['Free Shipping on 5+ Packs'],
            tieredPricing: [
                { minQuantity: 100, maxQuantity: 499, price: 500 },
                { minQuantity: 500, maxQuantity: 999, price: 400 },
                { minQuantity: 1000, price: 350 }
            ]
        },
        'sl025m-module': {
            id: 'sl025m-module',
            sku: 'SL-025M-13MHZ',
            name: 'SL025M 13.56MHz RFID Reader/Writer Module',
            brand: 'StrongLink',
            price: 15400,
            description: 'Embedded module for custom hardware integration.',
            longDescription: 'The SL025M is a highly integrated 13.56MHz RFID reader/writer module designed for embedded applications. It supports ISO14443A/B protocols and MIFARE cards. Perfect for custom hardware integration, access control systems, and IoT applications. Features UART interface for easy microcontroller integration.',
            images: [
                "https://m.media-amazon.com/images/I/61+yV+J+d3L._AC_SL1000_.jpg"
            ],
            mainImage: "https://m.media-amazon.com/images/I/61+yV+J+d3L._AC_SL1000_.jpg",
            tag: 'In Stock',
            tagColor: 'bg-green-100 text-green-800',
            specifications: {
                'Interface': 'UART (TTL)',
                'Frequency': '13.56 MHz',
                'Supported Cards': 'ISO14443A/B, MIFARE Classic, MIFARE Ultralight',
                'Operating Voltage': '5V DC',
                'Operating Distance': 'Up to 50mm',
                'Dimensions': '45mm x 35mm x 8mm'
            },
            documents: [
                { name: 'SL025M Datasheet', size: '800 KB', date: 'EN', downloads: 450, type: 'pdf' }
            ],
            relatedProducts: [],
            features: ['Ships in 24-48 Hours', 'Developer Friendly'],
            tieredPricing: [
                { minQuantity: 1, maxQuantity: 10, price: 15400 },
                { minQuantity: 11, maxQuantity: 50, price: 14000 },
                { minQuantity: 51, price: 12500 }
            ]
        },
        'nfc-wristband': {
            id: 'nfc-wristband',
            sku: 'ELIZTAP-WRIST-50',
            name: 'Silicone NFC Wristband (Pack of 50)',
            brand: 'ElizTap',
            price: 800,
            description: 'Waterproof wristbands for event access.',
            longDescription: 'Durable silicone NFC wristbands perfect for events, festivals, gyms, and access control. These waterproof wristbands feature NTAG213 chips with 144 bytes of usable memory. Comfortable, adjustable design suitable for all wrist sizes. Available in multiple colors for easy identification and branding.',
            images: [
                "https://sc04.alicdn.com/kf/H835260171a3949989506684724495537t.jpg"
            ],
            mainImage: "https://sc04.alicdn.com/kf/H835260171a3949989506684724495537t.jpg",
            tag: 'In Stock',
            tagColor: 'bg-green-100 text-green-800',
            specifications: {
                'Chip Type': 'NTAG213',
                'Memory': '180 Bytes (144 Bytes usable)',
                'Material': 'Medical-grade Silicone',
                'Water Resistance': 'IP68 Waterproof',
                'Adjustable': 'Yes, fits all wrist sizes',
                'Colors Available': 'Blue, Red, Green, Black, White'
            },
            documents: [
                { name: 'NTAG213 Specifications', size: '600 KB', date: 'Updated 2023', downloads: 800, type: 'pdf' }
            ],
            relatedProducts: [],
            features: ['Waterproof', 'Comfortable Wear'],
            tieredPricing: [
                { minQuantity: 50, maxQuantity: 199, price: 800 },
                { minQuantity: 200, maxQuantity: 499, price: 700 },
                { minQuantity: 500, price: 600 }
            ]
        },
        'ntag216-keyfob': {
            id: 'ntag216-keyfob',
            sku: 'NXP-NTAG216-FOB',
            name: 'NTAG216 Epoxy Keyfob (Pack of 50)',
            brand: 'NXP',
            price: 600,
            description: 'Durable epoxy finish, 888 bytes memory.',
            longDescription: 'Premium quality NTAG216 keyfobs with durable epoxy coating. These keyfobs feature 888 bytes of usable memory, making them ideal for access control, loyalty programs, and asset tracking. The epoxy finish provides excellent protection against wear and tear. Compact design easily attaches to keychains.',
            images: [
                "https://m.media-amazon.com/images/I/61kQqnyv7BL._AC_SX679_.jpg"
            ],
            mainImage: "https://m.media-amazon.com/images/I/61kQqnyv7BL._AC_SX679_.jpg",
            tag: 'In Stock',
            tagColor: 'bg-green-100 text-green-800',
            specifications: {
                'Chip Type': 'NXP NTAG216',
                'Memory': '924 Bytes (888 Bytes usable)',
                'Standard': 'ISO/IEC 14443A',
                'Frequency': '13.56 MHz',
                'Material': 'Epoxy Resin',
                'Dimensions': '30mm diameter x 5mm thick'
            },
            documents: [
                { name: 'NTAG216 Technical Guide', size: '1.3 MB', date: 'Updated 2023', downloads: 1500, type: 'pdf' }
            ],
            relatedProducts: [],
            features: ['Durable Epoxy Coating', 'High Memory Capacity'],
            tieredPricing: [
                { minQuantity: 50, maxQuantity: 199, price: 600 },
                { minQuantity: 200, maxQuantity: 499, price: 500 },
                { minQuantity: 500, price: 450 }
            ]
        },
        'acr122u-reader': {
            id: 'acr122u-reader',
            sku: 'ACS-122U-USB',
            name: 'ACS ACR122U USB NFC Reader',
            brand: 'ACS',
            price: 45000,
            description: 'Popular NFC reader for desktop applications.',
            longDescription: 'The ACR122U is one of the most popular PC-linked contactless smart card readers in the market. It supports ISO 14443 Type A and B cards, MIFARE, FeliCa, and all 4 types of NFC tags. With its USB full-speed interface, the ACR122U is perfect for desktop applications, development, and testing. CCID compliant for easy integration.',
            images: [
                "https://m.media-amazon.com/images/I/61+yV+J+d3L._AC_SL1000_.jpg"
            ],
            mainImage: "https://m.media-amazon.com/images/I/61+yV+J+d3L._AC_SL1000_.jpg",
            tag: 'In Stock',
            tagColor: 'bg-green-100 text-green-800',
            specifications: {
                'Interface': 'USB 2.0 Full Speed',
                'Supported Standards': 'ISO 14443 Type A & B, MIFARE, FeliCa, NFC',
                'Operating Distance': 'Up to 50mm',
                'LED Indicators': 'Bi-color LED for card detection',
                'Buzzer': 'Built-in buzzer for audio feedback',
                'Dimensions': '98mm x 65mm x 12.8mm'
            },
            documents: [
                { name: 'ACR122U User Manual', size: '2.1 MB', date: 'EN', downloads: 5000, type: 'pdf' },
                { name: 'SDK and Sample Code', size: '15 MB', date: 'Updated 2024', downloads: 2500, type: 'sdk' }
            ],
            relatedProducts: [],
            features: ['Ships in 24-48 Hours', 'CCID Compliant', 'Developer Friendly'],
            tieredPricing: [
                { minQuantity: 1, maxQuantity: 5, price: 45000 },
                { minQuantity: 6, maxQuantity: 20, price: 42000 },
                { minQuantity: 21, price: 38000 }
            ]
        },
        'metal-nfc-card': {
            id: 'metal-nfc-card',
            sku: 'ELIZTAP-METAL-CARD',
            name: 'Premium Metal NFC Business Card',
            brand: 'ElizTap',
            price: 15000,
            description: 'Matte black metal finish with laser engraving.',
            longDescription: 'Make a lasting impression with our premium metal NFC business cards. Featuring a sleek matte black finish with custom laser engraving, these cards combine elegance with cutting-edge technology. Each card contains an NTAG216 chip that can be programmed with your contact information, website, or social media profiles. Simply tap to share your details instantly.',
            images: [
                "https://m.media-amazon.com/images/I/61kQqnyv7BL._AC_SX679_.jpg"
            ],
            mainImage: "https://m.media-amazon.com/images/I/61kQqnyv7BL._AC_SX679_.jpg",
            tag: 'In Stock',
            tagColor: 'bg-green-100 text-green-800',
            specifications: {
                'Material': 'Stainless Steel',
                'Finish': 'Matte Black with Laser Engraving',
                'Chip Type': 'NTAG216',
                'Memory': '888 Bytes usable',
                'Dimensions': '85.6mm x 54mm x 0.8mm (Standard card size)',
                'Weight': '28 grams'
            },
            documents: [
                { name: 'Customization Guide', size: '500 KB', date: 'EN', downloads: 300, type: 'pdf' }
            ],
            relatedProducts: [],
            features: ['Premium Quality', 'Custom Laser Engraving Available'],
            tieredPricing: [
                { minQuantity: 5, maxQuantity: 24, price: 15000 },
                { minQuantity: 25, maxQuantity: 99, price: 12000 },
                { minQuantity: 100, price: 10000 }
            ]
        }
    };

    if (productDetails[id]) return productDetails[id];

    // Better Fallback
    return {
        id: id,
        sku: `${id.toUpperCase()}-GEN`,
        name: `Product ${id}`,
        brand: 'ElizTap',
        price: 99999,
        description: 'Universal NFC hardware for enterprise solutions.',
        longDescription: 'Detailed information for this specific product is currently being updated. This product meets all industry standards for NFC connectivity and security. Please contact our support for specific technical data.',
        images: ["https://placehold.co/600x600/png?text=Product+Image"],
        mainImage: "https://placehold.co/600x600/png?text=Product+Image",
        tag: 'Available',
        tagColor: 'bg-blue-100 text-blue-800',
        specifications: { 
            'Type': 'NFC Solution',
            'Frequency': '13.56 MHz',
            'Standard': 'ISO 14443A/B'
        },
        documents: [],
        relatedProducts: [],
        features: ['Standard Warranty'],
        tieredPricing: [
            { minQuantity: 1, maxQuantity: 10, price: 99999 },
            { minQuantity: 11, price: 'quote' }
        ]
    };
};

