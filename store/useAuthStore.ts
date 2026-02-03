import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type UserRole = 'business' | 'admin' | null;

interface User {
  email: string;
  name: string;
  role: UserRole;
  businessName?: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
}

// Mock users for demonstration
const MOCK_USERS = {
  business: {
    email: 'business@latap.com',
    password: 'business123',
    name: 'John Smith',
    role: 'business' as UserRole,
    businessName: 'The Azure Bistro'
  },
  admin: {
    email: 'admin@latap.com',
    password: 'admin123',
    name: 'Admin User',
    role: 'admin' as UserRole
  }
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      
      login: async (email: string, password: string) => {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500));

        // Check business user
        if (email === MOCK_USERS.business.email && password === MOCK_USERS.business.password) {
          const { password: _, ...user } = MOCK_USERS.business;
          set({ user, isAuthenticated: true });
          return { success: true };
        }

        // Check admin user
        if (email === MOCK_USERS.admin.email && password === MOCK_USERS.admin.password) {
          const { password: _, ...user } = MOCK_USERS.admin;
          set({ user, isAuthenticated: true });
          return { success: true };
        }

        return { success: false, error: 'Invalid email or password' };
      },

      logout: () => {
        set({ user: null, isAuthenticated: false });
      }
    }),
    {
      name: 'auth-storage',
    }
  )
);
