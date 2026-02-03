import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export interface Visitor {
  id: string;
  name: string;
  phone: string;
  time: string;
  timestamp: number;
  status: 'new' | 'returning';
}

export interface ActivityPoint {
  hour: string;
  visits: number;
}

export interface Reward {
  id: string;
  title: string;
  points: number;
  description: string;
  active: boolean;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  timestamp: number;
  read: boolean;
  type: 'info' | 'success' | 'warning';
}

export interface Campaign {
  id: string;
  name: string;
  type: 'WhatsApp' | 'SMS' | 'Email';
  audience: string;
  status: 'Active' | 'Scheduled' | 'Recurring' | 'Completed' | 'Draft';
  sent: number;
  delivered: string;
  clicks: number;
  timestamp: number;
}

export interface Staff {
  id: string;
  name: string;
  email: string;
  role: 'Owner' | 'Manager' | 'Staff';
  status: 'Active' | 'Inactive';
  lastActive: string;
}

export interface Device {
  id: string;
  name: string;
  type: 'Card' | 'Sticker' | 'Fob';
  code: string;
  location: string;
  assignedTo: string; // Business name or 'Unassigned'
  lastActive: string;
  status: 'active' | 'inactive';
  batteryLevel: number;
  totalScans: number;
  timestamp: number;
}

export interface RedemptionRequest {
  id: string;
  visitorId: string;
  visitorName: string;
  rewardTitle: string;
  timestamp: number;
  status: 'pending' | 'approved' | 'declined';
}

export interface DashboardState {
  visitors: Visitor[];
  activityData: ActivityPoint[];
  rewards: Reward[];
  notifications: Notification[];
  campaigns: Campaign[];
  staffMembers: Staff[];
  devices: Device[];
  redemptionRequests: RedemptionRequest[];
  stats: {
    totalVisitors: number;
    newVisitors: number;
    repeatVisitors: number;
    todaysVisits: number;
  };
  // Actions
  addVisitor: (visitor: Visitor) => void;
  addReward: (reward: Reward) => void;
  updateReward: (id: string, reward: Partial<Reward>) => void;
  deleteReward: (id: string) => void;
  toggleReward: (id: string, active: boolean) => void;
  addNotification: (notification: Notification) => void;
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;
  clearNotifications: () => void;
  addCampaign: (campaign: Campaign) => void;
  updateCampaign: (id: string, campaign: Partial<Campaign>) => void;
  deleteCampaign: (id: string) => void;
  updateCampaignStatus: (id: string, status: Campaign['status']) => void;
  addStaff: (staff: Staff) => void;
  updateStaffMember: (id: string, updates: Partial<Staff>) => void;
  deleteStaff: (id: string) => void;
  addDevice: (device: Device) => void;
  updateDevice: (id: string, updates: Partial<Device>) => void;
  deleteDevice: (id: string) => void;
  addRedemptionRequest: (request: Omit<RedemptionRequest, 'id' | 'status' | 'timestamp'>) => void;
  approveRedemption: (id: string) => void;
  declineRedemption: (id: string) => void;
  recordExternalTap: (visitorData: { name: string; email?: string; phone: string; uniqueId?: string }) => void;
  reset: () => void;
}

const initialVisitors: Visitor[] = [
  { id: '1', name: 'John Doe', phone: '+234 801 234 5678', time: '2 mins ago', timestamp: Date.now() - 120000, status: 'new' },
  { id: '2', name: 'Jane Smith', phone: '+234 802 345 6789', time: '15 mins ago', timestamp: Date.now() - 900000, status: 'returning' },
  { id: '3', name: 'Mike Johnson', phone: '+234 803 456 7890', time: '1 hour ago', timestamp: Date.now() - 3600000, status: 'new' },
  { id: '4', name: 'Sarah Williams', phone: '+234 804 567 8901', time: '2 hours ago', timestamp: Date.now() - 7200000, status: 'returning' },
  { id: '5', name: 'David Brown', phone: '+234 805 678 9012', time: '3 hours ago', timestamp: Date.now() - 10800000, status: 'new' },
];

const initialActivityData: ActivityPoint[] = [
  { hour: '9 AM', visits: 12 },
  { hour: '10 AM', visits: 24 },
  { hour: '11 AM', visits: 35 },
  { hour: '12 PM', visits: 48 },
  { hour: '1 PM', visits: 42 },
  { hour: '2 PM', visits: 38 },
  { hour: '3 PM', visits: 45 },
  { hour: '4 PM', visits: 52 },
];

const initialRewards: Reward[] = [
  { id: '1', title: 'Free Coffee', points: 100, description: 'Get a free coffee on us', active: true },
  { id: '2', title: '10% Off', points: 250, description: '10% off your next purchase', active: true },
  { id: '3', title: 'VIP Access', points: 500, description: 'VIP access for one month', active: false },
];

const initialNotifications: Notification[] = [
  { id: '1', title: 'Welcome', message: 'Welcome to your new dashboard!', timestamp: Date.now(), read: false, type: 'info' },
];

const initialCampaigns: Campaign[] = [
  { id: '1', name: 'Weekend Coffee Special', type: 'WhatsApp', audience: 'All Customers', status: 'Active', sent: 1240, delivered: '98%', clicks: 156, timestamp: Date.now() - 86400000 },
  { id: '2', name: 'Welcome Message', type: 'SMS', audience: 'New Customers', status: 'Recurring', sent: 412, delivered: '95%', clicks: 84, timestamp: Date.now() - 172800000 },
  { id: '3', name: 'VIP Night Invitation', type: 'WhatsApp', audience: 'VIP Members', status: 'Scheduled', sent: 0, delivered: '0%', clicks: 0, timestamp: Date.now() + 86400000 },
  { id: '4', name: 'October Newsletter', type: 'Email', audience: 'Newsletter Subs', status: 'Completed', sent: 2840, delivered: '92%', clicks: 312, timestamp: Date.now() - 604800000 },
];

const initialStaff: Staff[] = [
    { id: '1', name: 'John Manager', email: 'john@greenterrace.com', role: 'Owner', status: 'Active', lastActive: 'Now' },
    { id: '2', name: 'Sarah Supervisor', email: 'sarah.s@example.com', role: 'Manager', status: 'Active', lastActive: '2h ago' },
    { id: '3', name: 'Michael Cashier', email: 'mike.c@example.com', role: 'Staff', status: 'Active', lastActive: '1d ago' },
];

const initialDevices: Device[] = [
    { id: '1', name: 'Main Entrance', type: 'Card', code: 'NFC-001', location: 'Front Door', assignedTo: 'Green Terrace Cafe', lastActive: '2 mins ago', status: 'active', batteryLevel: 85, totalScans: 1247, timestamp: Date.now() },
    { id: '2', name: 'Table 5', type: 'Sticker', code: 'NFC-002', location: 'Dining Area', assignedTo: 'Tech Hub Lagos', lastActive: '15 mins ago', status: 'active', batteryLevel: 92, totalScans: 892, timestamp: Date.now() },
    { id: '3', name: 'Checkout Counter', type: 'Fob', code: 'NFC-003', location: 'Cashier', assignedTo: 'Unassigned', lastActive: 'Never', status: 'inactive', batteryLevel: 0, totalScans: 2341, timestamp: Date.now() },
];

const initialStats = {
  totalVisitors: 2847,
  newVisitors: 512,
  repeatVisitors: 1234,
  todaysVisits: 89,
};

export const useMockDashboardStore = create<DashboardState>()(
  persist(
    (set) => ({
      visitors: initialVisitors,
      activityData: initialActivityData,
      rewards: initialRewards,
      notifications: initialNotifications,
      campaigns: initialCampaigns,
      staffMembers: initialStaff,
      devices: initialDevices,
      redemptionRequests: [],
      stats: initialStats,

      addVisitor: (visitor) =>
        set((state) => {
          const newVisitors = [visitor, ...state.visitors];
          const currentHour = new Date().getHours();
          const hourLabel = currentHour > 12 ? `${currentHour - 12} PM` : `${currentHour === 0 ? 12 : currentHour} ${currentHour >= 12 ? 'PM' : 'AM'}`;
          
          const newActivity = [...state.activityData];
          const activityIndex = newActivity.findIndex(a => a.hour === hourLabel);
          if (activityIndex >= 0) {
             newActivity[activityIndex].visits += 1;
          }

          const newStats = { ...state.stats };
          newStats.totalVisitors += 1;
          newStats.todaysVisits += 1;
          if (visitor.status === 'new') {
            newStats.newVisitors += 1;
          } else {
            newStats.repeatVisitors += 1;
          }

          return {
            visitors: newVisitors,
            activityData: newActivity,
            stats: newStats,
          };
        }),

      addReward: (reward) => set((state) => ({ rewards: [...state.rewards, reward] })),
      updateReward: (id, updates) => set((state) => ({
        rewards: state.rewards.map(r => r.id === id ? { ...r, ...updates } : r)
      })),
      deleteReward: (id) => set((state) => ({ rewards: state.rewards.filter((r) => r.id !== id) })),
      toggleReward: (id, active) => set((state) => ({ rewards: state.rewards.map((r) => r.id === id ? { ...r, active } : r) })),
      
      addNotification: (notification) => set((state) => ({ notifications: [notification, ...state.notifications] })),
      markNotificationRead: (id) => set((state) => ({ 
        notifications: state.notifications.map(n => n.id === id ? { ...n, read: true } : n) 
      })),
      markAllNotificationsRead: () => set((state) => ({
        notifications: state.notifications.map(n => ({ ...n, read: true }))
      })),

      clearNotifications: () => set({ notifications: [] }),

      addCampaign: (campaign) => set((state) => ({ campaigns: [campaign, ...state.campaigns] })),
      updateCampaign: (id, updates) => set((state) => ({
        campaigns: state.campaigns.map(c => c.id === id ? { ...c, ...updates } : c)
      })),
      deleteCampaign: (id) => set((state) => ({ campaigns: state.campaigns.filter(c => c.id !== id) })),
      updateCampaignStatus: (id, status) => set((state) => ({
        campaigns: state.campaigns.map(c => c.id === id ? { ...c, status } : c)
      })),

      addStaff: (staff: Staff) => set((state) => ({ staffMembers: [...state.staffMembers, staff] })),
      updateStaffMember: (id: string, updates: Partial<Staff>) => set((state) => ({
        staffMembers: state.staffMembers.map(s => s.id === id ? { ...s, ...updates } : s)
      })),
      deleteStaff: (id: string) => set((state) => ({ staffMembers: state.staffMembers.filter(s => s.id !== id) })),

      addDevice: (device) => set((state) => ({ devices: [...state.devices, device] })),
      updateDevice: (id, updates) => set((state) => ({
        devices: state.devices.map(d => d.id === id ? { ...d, ...updates } : d)
      })),
      deleteDevice: (id) => set((state) => ({ devices: state.devices.filter(d => d.id !== id) })),
      recordExternalTap: (visitorData) => set((state) => {
        const existingIndex = state.visitors.findIndex(v => 
          (visitorData.phone && v.phone === visitorData.phone) || 
          (visitorData.uniqueId && v.id === visitorData.uniqueId)
        );

        let newVisitors = [...state.visitors];
        let isReturning = false;

        if (existingIndex > -1) {
          isReturning = true;
          const updatedVisitor = {
            ...newVisitors[existingIndex],
            time: 'Just now',
            timestamp: Date.now(),
            status: 'returning' as const
          };
          newVisitors.splice(existingIndex, 1);
          newVisitors.unshift(updatedVisitor);
        } else {
          const newVisitor = {
            id: visitorData.uniqueId || `V-${Math.random().toString(36).substring(2, 9).toUpperCase()}`,
            name: visitorData.name,
            phone: visitorData.phone,
            time: 'Just now',
            timestamp: Date.now(),
            status: 'new' as const
          };
          newVisitors.unshift(newVisitor);
        }

        const newStats = { ...state.stats };
        newStats.todaysVisits += 1;
        if (isReturning) {
          newStats.repeatVisitors += 1;
        } else {
          newStats.totalVisitors += 1;
          newStats.newVisitors += 1;
        }

        // Add a notification for the business
        const notification: Notification = {
          id: `N-${Date.now()}`,
          title: isReturning ? 'Returning Visitor' : 'New Visitor',
          message: `${visitorData.name} just tapped at your NFC point.`,
          timestamp: Date.now(),
          read: false,
          type: 'success'
        };

        return {
          visitors: newVisitors,
          stats: newStats,
          notifications: [notification, ...state.notifications]
        };
      }),

      addRedemptionRequest: (request) => set((state) => {
        const newRequest: RedemptionRequest = {
          ...request,
          id: `RR-${Date.now()}`,
          status: 'pending',
          timestamp: Date.now()
        };
        
        const notification: Notification = {
          id: `N-RED-${Date.now()}`,
          title: 'Reward Requested',
          message: `${request.visitorName} wants to redeem ${request.rewardTitle}.`,
          timestamp: Date.now(),
          read: false,
          type: 'warning'
        };
        
        return {
          redemptionRequests: [newRequest, ...state.redemptionRequests],
          notifications: [notification, ...state.notifications]
        };
      }),

      approveRedemption: (id) => set((state) => {
        const request = state.redemptionRequests.find(r => r.id === id);
        if (!request) return state;

        const notification: Notification = {
          id: `N-APP-${Date.now()}`,
          title: 'Redemption Approved',
          message: `Approved ${request.rewardTitle} for ${request.visitorName}.`,
          timestamp: Date.now(),
          read: false,
          type: 'success'
        };

        return {
          redemptionRequests: state.redemptionRequests.map(r => r.id === id ? { ...r, status: 'approved' } : r),
          notifications: [notification, ...state.notifications]
        };
      }),

      declineRedemption: (id) => set((state) => {
        const request = state.redemptionRequests.find(r => r.id === id);
        if (!request) return state;

        const notification: Notification = {
          id: `N-DEC-${Date.now()}`,
          title: 'Redemption Declined',
          message: `Declined ${request.rewardTitle} for ${request.visitorName}.`,
          timestamp: Date.now(),
          read: false,
          type: 'info'
        };

        return {
          redemptionRequests: state.redemptionRequests.map(r => r.id === id ? { ...r, status: 'declined' } : r),
          notifications: [notification, ...state.notifications]
        };
      }),

      reset: () =>
        set({
          visitors: initialVisitors,
          activityData: initialActivityData,
          rewards: initialRewards,
          notifications: initialNotifications,
          campaigns: initialCampaigns,
          staffMembers: initialStaff,
          devices: initialDevices,
          redemptionRequests: [],
          stats: initialStats,
        }),
    }),
    {
      name: 'dashboard-storage-v2', 
      storage: createJSONStorage(() => localStorage),
    }
  )
);
