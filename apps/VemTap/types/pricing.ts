
export interface PricingPlan {
    id: string;
    name: string;
    price: string;
    period: string;
    billingPeriod: 'monthly' | 'yearly' | 'quarterly';
    description: string;
    features: string[];
    isPopular?: boolean;
    buttonText: string;
    color: string;
    visitorLimit: number;
    tagLimit: number;
}

export interface HardwareOption {
    id: string;
    name: string;
    price: number;
    cost: number;
    stock: number;
    status: 'active' | 'inactive';
    color: string;
    icon: string;
    desc: string;
    unit: string;
    features: string[];
}
