import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export interface Visitor {
  id: string;
  name: string;
  phone: string;
  time: string;
  timestamp: number; // to sort or filter
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

export interface DashboardState {
  visitors: Visitor[];
  activityData: ActivityPoint[];
  rewards: Reward[];
  notifications: Notification[];
  stats: {
    totalVisitors: number;
    newVisitors: number;
    repeatVisitors: number;
    todaysVisits: number;
  };
  // Actions
  addVisitor: (visitor: Visitor) => void;
  addReward: (reward: Reward) => void;
  deleteReward: (id: string) => void;
  toggleReward: (id: string, active: boolean) => void;
  addNotification: (notification: Notification) => void;
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;
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
      stats: initialStats,

      addVisitor: (visitor) =>
        set((state) => {
          const newVisitors = [visitor, ...state.visitors];
          
          // Update activity based on current hour (simplified)
          const currentHour = new Date().getHours();
          const hourLabel = currentHour > 12 ? `${currentHour - 12} PM` : `${currentHour} AM`;
          
          const newActivity = [...state.activityData];
          const activityIndex = newActivity.findIndex(a => a.hour === hourLabel);
          if (activityIndex >= 0) {
             newActivity[activityIndex].visits += 1;
          }

          // Update stats
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
      deleteReward: (id) => set((state) => ({ rewards: state.rewards.filter((r) => r.id !== id) })),
      toggleReward: (id, active) => set((state) => ({ rewards: state.rewards.map((r) => r.id === id ? { ...r, active } : r) })),
      
      addNotification: (notification) => set((state) => ({ notifications: [notification, ...state.notifications] })),
      markNotificationRead: (id) => set((state) => ({ 
        notifications: state.notifications.map(n => n.id === id ? { ...n, read: true } : n) 
      })),
      markAllNotificationsRead: () => set((state) => ({
        notifications: state.notifications.map(n => ({ ...n, read: true }))
      })),

      reset: () =>
        set({
          visitors: initialVisitors,
          activityData: initialActivityData,
          rewards: initialRewards,
          notifications: initialNotifications,
          stats: initialStats,
        }),
    }),
    {
      name: 'dashboard-storage', 
      storage: createJSONStorage(() => localStorage),
    }
  )
);
