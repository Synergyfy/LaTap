import { useMockDashboardStore, Visitor, Reward } from '@/lib/store/mockDashboardStore';

// Simulate network delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const dashboardApi = {
  fetchDashboardData: async () => {
    await delay(800); // Simulate fetch latency
    const state = useMockDashboardStore.getState();
    return {
      stats: state.stats,
      recentVisitors: state.visitors,
      activityData: state.activityData,
      rewards: state.rewards,
      notifications: state.notifications,
      campaigns: state.campaigns,
    };
  },

  addVisitor: async (visitor: Visitor) => {
    await delay(500);
    useMockDashboardStore.getState().addVisitor(visitor);
    useMockDashboardStore.getState().addNotification({
        id: Math.random().toString(36).substr(2, 9),
        title: 'New Visitor',
        message: `${visitor.name} just checked in!`,
        timestamp: Date.now(),
        read: false,
        type: 'info'
    });
    return visitor;
  },

  clearDashboard: async () => {
    await delay(300);
    useMockDashboardStore.getState().reset();
  },

  // Reward Actions
  createReward: async (reward: Reward) => {
      await delay(600);
      useMockDashboardStore.getState().addReward(reward);
      useMockDashboardStore.getState().addNotification({
          id: Math.random().toString(36).substr(2, 9),
          title: 'Reward Created',
          message: `Reward "${reward.title}" has been created successfully.`,
          timestamp: Date.now(),
          read: false,
          type: 'success'
      });
      return reward;
  },

  deleteReward: async (id: string) => {
      await delay(400);
      useMockDashboardStore.getState().deleteReward(id);
      return id;
  },

  
  rewardUser: async ({ userId, rewardId }: { userId: string, rewardId: string }) => {
      await delay(700);
      const state = useMockDashboardStore.getState();
      const reward = state.rewards.find(r => r.id === rewardId);
      
      if (reward) {
          useMockDashboardStore.getState().addNotification({
              id: Math.random().toString(36).substr(2, 9),
              title: 'Points Redeemed',
              message: `User redeemed "${reward.title}" for ${reward.points} points.`,
              timestamp: Date.now(),
              read: false,
              type: 'success'
          });
      }
      return { userId, rewardId };
  },

  // Notification Actions
  markNotificationRead: async (id: string) => {
      // Immediate optimistic update usually, but we can delay
      useMockDashboardStore.getState().markNotificationRead(id);
      return id;
  },
  
  markAllNotificationsRead: async () => {
    useMockDashboardStore.getState().markAllNotificationsRead();
    return true;
  },

  // Campaign Actions
  createCampaign: async (campaign: any) => {
    await delay(1000);
    const id = Math.random().toString(36).substr(2, 9);
    const newCampaign = {
      ...campaign,
      id,
      sent: 0,
      delivered: '0%',
      clicks: 0,
      timestamp: Date.now()
    };
    useMockDashboardStore.getState().addCampaign(newCampaign);
    useMockDashboardStore.getState().addNotification({
      id: Math.random().toString(36).substr(2, 9),
      title: 'Campaign Created',
      message: `Campaign "${campaign.name}" has been ${campaign.status === 'Active' ? 'launched' : 'scheduled'}.`,
      timestamp: Date.now(),
      read: false,
      type: 'success'
    });
    return newCampaign;
  },

  deleteCampaign: async (id: string) => {
    await delay(500);
    useMockDashboardStore.getState().deleteCampaign(id);
    return id;
  },

  updateCampaignStatus: async (id: string, status: any) => {
    await delay(300);
    useMockDashboardStore.getState().updateCampaignStatus(id, status);
    return { id, status };
  }
};
