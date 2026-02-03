export interface BusinessProfile {
    id: string;
    slug: string;
    nfcId: string; // Master/Default NFC ID
    name: string;
    welcomeMessage: string;
    successMessage: string;
    privacyMessage?: string;
    rewardEnabled: boolean;
    rewardMessage?: string;
    brandColor?: string;
    type: 'RESTAURANT' | 'RETAIL' | 'GYM' | 'EVENT';
    logoUrl?: string;
}

const MOCK_BUSINESSES: BusinessProfile[] = [
    {
        id: 'B-123',
        slug: 'AZURE-BISTRO',
        nfcId: 'MASTER-01',
        name: 'The Blue Azure Bistro',
        welcomeMessage: 'Welcome to EntryConnects Blue Azure! Tap below to view our menu.',
        successMessage: 'Thanks for visiting! Your table check-in is complete.',
        privacyMessage: 'We value your privacy. Your data is only used for check-in purposes.',
        rewardEnabled: true,
        rewardMessage: 'Show this screen for a free coffee!',
        type: 'RESTAURANT',
        logoUrl: 'https://cdn-icons-png.flaticon.com/512/3448/3448609.png'
    },
    {
        id: 'B-456',
        slug: 'LUXE-BOUTIQUE',
        nfcId: 'MASTER-02',
        name: 'Luxe Boutique Store',
        welcomeMessage: 'Welcome to Luxe Boutique. Get exclusive VIP discounts.',
        successMessage: 'Profile created! Enjoy your VIP shopping experience.',
        rewardEnabled: true,
        rewardMessage: '10% OFF on your first purchase today!',
        type: 'RETAIL',
        logoUrl: 'https://cdn-icons-png.flaticon.com/512/3081/3081559.png'
    }
];

export const getBusinessBySlug = async (slug: string): Promise<BusinessProfile | null> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return MOCK_BUSINESSES.find(b => b.slug === slug.toUpperCase()) || null;
};

export const getBusinessByNfcId = async (nfcId: string): Promise<BusinessProfile | null> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return MOCK_BUSINESSES.find(b => b.nfcId === nfcId) || null;
};
