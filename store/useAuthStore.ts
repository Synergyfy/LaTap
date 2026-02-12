import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type UserRole = 'owner' | 'manager' | 'staff' | 'admin' | 'customer' | null;
export type SubscriptionPlan = 'free' | 'basic' | 'premium' | 'white-label' | 'enterprise';
export type SubscriptionStatus = 'active' | 'past_due' | 'canceled' | 'trialing' | 'none';

interface User {
  id?: string;
  email: string;
  name: string;
  role: UserRole;
  businessName?: string;
  businessId?: string;
  // Subscription fields
  planId?: SubscriptionPlan;
  subscriptionStatus?: SubscriptionStatus;
  trialEndsAt?: string;
  billingCycleAt?: string;
  phone?: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  signup: (userData: User) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  subscribe: (planId: SubscriptionPlan) => Promise<{ success: boolean; error?: string }>;
}

// Mock users for demonstration
const MOCK_USERS: Record<string, any> = {
  owner: {
    id: 'OW-001',
    email: 'business@eliztap.com',
    password: 'business123',
    name: 'John Smith',
    role: 'owner' as UserRole,
    businessName: 'The Azure Bistro',
    businessId: 'bistro_001',
    planId: 'premium',
    subscriptionStatus: 'active'
  },
  manager: {
    id: 'MG-001',
    email: 'manager@eliztap.com',
    password: 'manager123',
    name: 'Sarah Supervisor',
    role: 'manager' as UserRole,
    businessName: 'The Azure Bistro',
    businessId: 'bistro_001',
    planId: 'premium',
    subscriptionStatus: 'active'
  },
  staff: {
    id: 'ST-001',
    email: 'staff@eliztap.com',
    password: 'staff123',
    name: 'Michael Cashier',
    role: 'staff' as UserRole,
    businessName: 'The Azure Bistro',
    businessId: 'bistro_001',
    planId: 'premium',
    subscriptionStatus: 'active'
  },
  admin: {
    id: 'AD-001',
    email: 'admin@eliztap.com',
    password: 'admin123',
    name: 'Admin User',
    role: 'admin' as UserRole
  },
  customer: {
    id: 'CS-2847',
    email: 'customer@eliztap.com',
    password: 'customer123',
    name: 'Jane Customer',
    role: 'customer' as UserRole,
    planId: 'free',
    subscriptionStatus: 'none'
  }
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      
      login: async (email: string, pass: string) => {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 800));

        const normalizedEmail = email.toLowerCase().trim();
        const normalizedPass = pass.trim();

        // 1. Check Pre-defined Mock Users
        const mockUserKey = Object.keys(MOCK_USERS).find(key => 
          MOCK_USERS[key].email.toLowerCase() === normalizedEmail && 
          MOCK_USERS[key].password === normalizedPass
        );

        if (mockUserKey) {
          const { password: _, ...user } = MOCK_USERS[mockUserKey];
          // Ensure role is set correctly based on the key if not explicit
          const finalUser = { 
            ...user, 
            role: user.role || mockUserKey as UserRole 
          };
           set({ user: finalUser, isAuthenticated: true });
           return { success: true };
        }

        return { success: false, error: 'Invalid email or password. Try the demo accounts!' };
      },

      signup: async (userData: any) => {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // Default subscription for new business owners is the Free plan
        const isOwner = userData.role === 'owner' || !userData.role;
        
        const newUser = {
            ...userData,
            id: userData.id || `USER-${Math.random().toString(36).substr(2, 9)}`,
            role: userData.role || 'owner',
            planId: isOwner ? 'free' : undefined,
            subscriptionStatus: isOwner ? 'none' : undefined
        };

        set({ user: newUser, isAuthenticated: true });
        return { success: true };
      },

      logout: () => {
        set({ user: null, isAuthenticated: false });
      },

      subscribe: async (planId: SubscriptionPlan) => {
        const { user } = get();
        if (!user) return { success: false, error: 'User must be logged in' };

        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));

        const trialDays = (planId === 'basic' || planId === 'premium') ? 14 : 0;
        const trialEndsAt = trialDays 
          ? new Date(Date.now() + trialDays * 24 * 60 * 60 * 1000).toISOString()
          : undefined;

        const updatedUser = {
          ...user,
          planId,
          subscriptionStatus: (trialDays ? 'trialing' : 'active') as SubscriptionStatus,
          trialEndsAt,
          billingCycleAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
        };

        set({ user: updatedUser });
        return { success: true };
      }
    }),
    {
      name: 'auth-storage',
    }
  )
);
