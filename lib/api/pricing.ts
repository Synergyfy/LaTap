
import { PricingPlan } from '@/types/pricing';

const DEFAULT_PLANS: PricingPlan[] = [
    {
        id: 'free',
        name: 'Free',
        price: '₦0',
        period: '/mo',
        description: 'Essential features for personal use and basic connectivity.',
        features: ['100 visitors/mo', '1 Demo Tag', 'Basic Analytics', 'Community Support'],
        buttonText: 'Get Started Free',
        color: 'slate'
    },
    {
        id: 'basic',
        name: 'Basic',
        price: '₦45,000',
        period: '/mo',
        description: 'Advanced identification for individuals and small teams.',
        features: ['500 visitors/mo', '1 Active Tag License', 'Standard Analytics', 'Email Support'],
        buttonText: 'Choose Basic',
        color: 'primary'
    },
    {
        id: 'premium',
        name: 'Premium',
        price: '₦120,000',
        period: '/mo',
        description: 'Comprehensive solutions for growing businesses and enterprises.',
        features: ['5,000 visitors/mo', '5 Active Tag Licenses', 'Full CRM Integration', 'Priority Support'],
        isPopular: true,
        buttonText: 'Choose Premium',
        color: 'primary'
    },
    {
        id: 'enterprise',
        name: 'Enterprise',
        price: 'Custom',
        period: '',
        description: 'Full branding rights and administrative control for resellers.',
        features: ['Unlimited visitors', 'Unlimited Active Tags', 'SSO Security', 'Dedicated Account Mgr'],
        buttonText: 'Contact Sales',
        color: 'slate'
    }
];

export const fetchPricingPlans = async (): Promise<PricingPlan[]> => {
    if (typeof window === 'undefined') return DEFAULT_PLANS;
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));
    const saved = localStorage.getItem('subscription_plans');
    return saved ? JSON.parse(saved) : DEFAULT_PLANS;
};

export const updatePricingPlan = async (plan: PricingPlan): Promise<PricingPlan> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    const plans = await fetchPricingPlans();
    const updatedPlans = plans.map(p => p.id === plan.id ? plan : p);
    localStorage.setItem('subscription_plans', JSON.stringify(updatedPlans));
    return plan;
};

export const addPricingPlan = async (plan: Omit<PricingPlan, 'id'>): Promise<PricingPlan> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    const plans = await fetchPricingPlans();
    const newPlan = { ...plan, id: Math.random().toString(36).substr(2, 9) };
    const updatedPlans = [...plans, newPlan];
    localStorage.setItem('subscription_plans', JSON.stringify(updatedPlans));
    return newPlan;
};

export const deletePricingPlan = async (id: string): Promise<void> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    const plans = await fetchPricingPlans();
    const updatedPlans = plans.filter(p => p.id !== id);
    localStorage.setItem('subscription_plans', JSON.stringify(updatedPlans));
};
