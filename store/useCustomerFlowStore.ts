import { create } from 'zustand';

export type CustomerStep = 
    | 'SELECT_TYPE'
    | 'SCANNING' 
    | 'IDENTIFYING' 
    | 'SUCCESS_LINKED' 
    | 'ERROR_NOT_FOUND' 
    | 'WELCOME' 
    | 'WELCOME_BACK'
    | 'PRIVACY' 
    | 'FORM' 
    | 'OUTCOME'
    | 'FINAL_SUCCESS';

export type BusinessType = 'RESTAURANT' | 'RETAIL' | 'GYM' | 'EVENT';

interface BusinessConfig {
    type: BusinessType;
    label: string;
    storeName: string;
    icon: string;
    description: string;
    actionLabel: string;
    outcomeTitle: string;
    outcomeDesc: string;
    specificIcon: string;
}

export const businessConfigs: Record<BusinessType, BusinessConfig> = {
    RESTAURANT: {
        type: 'RESTAURANT',
        label: 'Restaurant',
        storeName: 'The Azure Bistro',
        icon: 'restaurant_menu',
        description: 'Instant menu access and table service.',
        actionLabel: 'Browse Digital Menu',
        outcomeTitle: 'Table 14 Linked',
        outcomeDesc: 'Our servers have been notified. You can now browse our full menu below.',
        specificIcon: 'menu_book'
    },
    RETAIL: {
        type: 'RETAIL',
        label: 'Retail Store',
        storeName: 'Luxe Boutique',
        icon: 'shopping_bag',
        description: 'VIP pricing and personalized styling.',
        actionLabel: 'Start VIP Shopping',
        outcomeTitle: 'VIP Member Active',
        outcomeDesc: 'Your exclusive member rates have been applied to your session.',
        specificIcon: 'loyalty'
    },
    GYM: {
        type: 'GYM',
        label: 'Fitness Center',
        storeName: 'Iron Roots Gym',
        icon: 'fitness_center',
        description: 'Swift check-in and locker allocation.',
        actionLabel: 'Check Locker Status',
        outcomeTitle: 'Check-in Complete',
        outcomeDesc: 'Welcome back! Your locker #42 is ready. Have a great workout.',
        specificIcon: 'lock_open'
    },
    EVENT: {
        type: 'EVENT',
        label: 'Live Events',
        storeName: 'Neon Pulse Festival',
        icon: 'confirmation_number',
        description: 'Digital passes and stage schedules.',
        actionLabel: 'Access Digital Pass',
        outcomeTitle: 'Pass Validated',
        outcomeDesc: 'You have full access to Stage A and the Networking Lounge.',
        specificIcon: 'qr_code_2'
    }
};

interface CustomerFlowState {
    currentStep: CustomerStep;
    serialNumber: string;
    storeName: string;
    businessType: BusinessType;
    visitCount: number;
    hasRewardSetup: boolean;
    showFeedback: boolean;
    userData: {
        name: string;
        email: string;
        phone: string;
        uniqueId?: string;
    } | null;
    isReturningUser: boolean;
    
    // Actions
    setStep: (step: CustomerStep) => void;
    setUserData: (data: { name: string; email: string; phone: string }) => void;
    resetFlow: () => void;
    toggleFeedback: (show: boolean) => void;
    setRewardSetup: (has: boolean) => void;
    simulateReturningUser: (visits?: number) => void;
    setBusinessType: (type: BusinessType) => void;
    getBusinessConfig: () => BusinessConfig;
}

export const useCustomerFlowStore = create<CustomerFlowState>((set, get) => ({
    currentStep: 'SELECT_TYPE',
    serialNumber: 'LT-8829-X',
    storeName: 'LaTap Venue',
    businessType: 'RESTAURANT',
    visitCount: 1,
    hasRewardSetup: true,
    showFeedback: false,
    userData: null,
    isReturningUser: false,

    setStep: (step) => set({ currentStep: step }),
    setUserData: (data) => {
        const uniqueId = `LT-${Math.random().toString(36).substring(2, 9).toUpperCase()}`;
        set({ userData: { ...data, uniqueId }, visitCount: 1 });
    },
    resetFlow: () => set({ 
        currentStep: 'SELECT_TYPE', 
        userData: null, 
        isReturningUser: false,
        visitCount: 1,
        showFeedback: false
    }),
    toggleFeedback: (show) => set({ showFeedback: show }),
    setRewardSetup: (has) => set({ hasRewardSetup: has }),
    simulateReturningUser: (visits = 5) => {
        const type = get().businessType;
        set({ 
            isReturningUser: true, 
            currentStep: 'IDENTIFYING',
            visitCount: visits,
            storeName: businessConfigs[type].storeName,
            userData: { 
                name: 'Sarah Jordan', 
                email: 'sarah@example.com', 
                phone: '+44 7700 900000',
                uniqueId: 'LT-SARAH-99'
            }
        });
    },
    setBusinessType: (type) => set({ businessType: type, storeName: businessConfigs[type].storeName }),
    getBusinessConfig: () => businessConfigs[get().businessType],
}));
