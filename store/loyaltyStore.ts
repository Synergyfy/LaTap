import { create } from 'zustand';
import { loyaltyApi } from '@/lib/api/loyalty';
import { 
  LoyaltyProfile, 
  PointTransaction, 
  Reward, 
  Redemption,
  PointEarnRequest,
  LoyaltyRule
} from '@/types/loyalty';

interface LoyaltyState {
  // Current user's loyalty profiles (one per business)
  profiles: Record<string, LoyaltyProfile>; // key: businessId
  
  // Recent transactions for current viewed business
  recentTransactions: PointTransaction[];
  
  // Available rewards for current business
  availableRewards: Reward[];
  
  // User's redemptions
  redemptions: Redemption[];
  
  // Last earned points info for modal
  lastEarnedResponse: {
    pointsEarned: number;
    newBalance: number;
    message: string;
    breakdown?: any;
  } | null;
  
  // Loading & Error states
  isLoading: boolean;
  error: string | null;
  
  // Admin State
  rules: LoyaltyRule | null;
  
  // Actions
  fetchLoyaltyProfile: (userId: string, businessId: string) => Promise<LoyaltyProfile | null>;
  fetchRewards: (businessId: string) => Promise<void>;
  fetchTransactions: (profileId: string) => Promise<void>;
  earnPoints: (request: PointEarnRequest) => Promise<{ success: boolean; pointsEarned: number; message: string; newBalance?: number; breakdown?: any }>;
  redeemReward: (loyaltyProfileId: string, rewardId: string) => Promise<{ success: boolean; redemption?: Redemption; error?: string }>;
  setLastEarnedResponse: (response: LoyaltyState['lastEarnedResponse']) => void;
  clearLoyaltyData: () => void;
  
  // Admin Actions
  fetchRules: (businessId: string) => Promise<void>;
  updateRules: (businessId: string, updates: Partial<LoyaltyRule>) => Promise<void>;
  createReward: (businessId: string, reward: Partial<Reward>) => Promise<void>;
  updateReward: (businessId: string, id: string, updates: Partial<Reward>) => Promise<void>;
  verifyRedemption: (businessId: string, code: string) => Promise<{ success: boolean; redemption?: Redemption; reward?: Reward; error?: string }>;
}

export const useLoyaltyStore = create<LoyaltyState>((set, get) => ({
  profiles: {},
  recentTransactions: [],
  availableRewards: [],
  redemptions: [],
  lastEarnedResponse: null,
  isLoading: false,
  error: null,
  rules: null,
  
  fetchLoyaltyProfile: async (userId: string, businessId: string) => {
    set({ isLoading: true, error: null });
    try {
      const profile = await loyaltyApi.fetchProfile(userId, businessId);
      if (profile) {
        set(state => ({
          profiles: { ...state.profiles, [businessId]: profile },
          isLoading: false
        }));
      } else {
        set({ isLoading: false });
      }
      return profile;
    } catch (error) {
      console.error('Failed to fetch loyalty profile:', error);
      set({ isLoading: false, error: 'Failed to load loyalty profile' });
      return null;
    }
  },
  
  fetchRewards: async (businessId: string) => {
    set({ isLoading: true, error: null });
    try {
      const rewards = await loyaltyApi.fetchRewardsByBusiness(businessId);
      set({ availableRewards: rewards, isLoading: false });
    } catch (error) {
      console.error('Failed to fetch rewards:', error);
      set({ isLoading: false, error: 'Failed to load rewards' });
    }
  },
  
  fetchTransactions: async (profileId: string) => {
    set({ isLoading: true, error: null });
    try {
      const transactions = await loyaltyApi.fetchTransactionsByProfile(profileId);
      set({ recentTransactions: transactions, isLoading: false });
    } catch (error) {
      console.error('Failed to fetch transactions:', error);
      set({ isLoading: false, error: 'Failed to load transactions' });
    }
  },
  
  earnPoints: async (request: PointEarnRequest) => {
    set({ isLoading: true, error: null });
    try {
      const response = await loyaltyApi.earnPoints(request);
      if (response.success) {
        // Refresh profile to get updated balance
        await get().fetchLoyaltyProfile(request.userId, request.businessId);
        
        // Store for UI modal
        set({ 
          lastEarnedResponse: {
            pointsEarned: response.pointsEarned,
            newBalance: response.newBalance || 0,
            message: response.message,
            breakdown: response.breakdown
          }
        });
      }
      set({ isLoading: false });
      return response;
    } catch (error) {
      console.error('Failed to earn points:', error);
      set({ isLoading: false, error: 'Failed to process points' });
      return { success: false, pointsEarned: 0, message: 'Server error occurred', newBalance: 0 };
    }
  },
  
  redeemReward: async (loyaltyProfileId: string, rewardId: string) => {
    set({ isLoading: true, error: null });
    try {
      const response = await loyaltyApi.redeemReward({ loyaltyProfileId, rewardId });
      if (response.success && response.redemption) {
        // Refresh data
        const profile = Object.values(get().profiles).find(p => p.id === loyaltyProfileId);
        if (profile) {
          await get().fetchLoyaltyProfile(profile.userId, profile.businessId);
          await get().fetchTransactions(loyaltyProfileId);
        }
      }
      set({ isLoading: false });
      return response;
    } catch (error) {
      console.error('Failed to redeem reward:', error);
      set({ isLoading: false, error: 'Failed to redeem reward' });
      return { success: false, error: 'Server error occurred' };
    }
  },

  setLastEarnedResponse: (response) => set({ lastEarnedResponse: response }),
  
  fetchRules: async (businessId: string) => {
    set({ isLoading: true });
    try {
      const rules = await loyaltyApi.fetchRules(businessId);
      set({ rules, isLoading: false });
    } catch (error) {
      set({ isLoading: false, error: 'Failed to fetch rules' });
    }
  },

  updateRules: async (businessId: string, updates: Partial<LoyaltyRule>) => {
    set({ isLoading: true });
    try {
      await loyaltyApi.updateRules(businessId, updates);
      await get().fetchRules(businessId);
      set({ isLoading: false });
    } catch (error) {
      set({ isLoading: false, error: 'Failed to update rules' });
    }
  },

  createReward: async (businessId: string, reward: Partial<Reward>) => {
    set({ isLoading: true });
    try {
      await loyaltyApi.createReward(businessId, reward);
      await get().fetchRewards(businessId);
      set({ isLoading: false });
    } catch (error) {
      set({ isLoading: false, error: 'Failed to create reward' });
    }
  },

  updateReward: async (businessId: string, id: string, updates: Partial<Reward>) => {
    set({ isLoading: true });
    try {
      await loyaltyApi.updateReward(businessId, id, updates);
      await get().fetchRewards(businessId);
      set({ isLoading: false });
    } catch (error) {
      set({ isLoading: false, error: 'Failed to update reward' });
    }
  },

  verifyRedemption: async (businessId: string, code: string) => {
    set({ isLoading: true });
    try {
      const result = await loyaltyApi.verifyRedemption(code, businessId);
      set({ isLoading: false });
      
      if (result.success && result.redemption) {
        const reward = (get().availableRewards.length > 0) 
          ? get().availableRewards.find(r => r.id === result.redemption?.rewardId)
          : undefined;
          
        return { ...result, reward };
      }
      
      return result;
    } catch (error) {
      set({ isLoading: false });
      return { success: false, error: 'Verification failed' };
    }
  },

  clearLoyaltyData: () => {
    set({
      profiles: {},
      recentTransactions: [],
      availableRewards: [],
      redemptions: [],
      rules: null,
      error: null
    });
  }
}));
