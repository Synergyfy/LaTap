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
      staffMembers: state.staffMembers,
      devices: state.devices,
      redemptionRequests: state.redemptionRequests,
      templates: state.templates,
      businessName: 'Green Terrace Cafe',
      businessLogo: '/icon.png',
    };
  },

  addTemplate: async (template: any) => {
    await delay(500);
    useMockDashboardStore.getState().addTemplate(template);
    return template;
  },

  deleteTemplate: async (id: string) => {
    await delay(400);
    useMockDashboardStore.getState().deleteTemplate(id);
    return id;
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
        type: 'info',
        scope: 'DASHBOARD'
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
          type: 'success',
          scope: 'DASHBOARD'
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
              type: 'success',
              scope: 'DASHBOARD'
          });
      }
      return { userId, rewardId };
  },

  // Notification Actions
  markNotificationRead: async (id: string) => {
      useMockDashboardStore.getState().markNotificationRead(id);
      return id;
  },
  
  markAllNotificationsRead: async () => {
    useMockDashboardStore.getState().markAllNotificationsRead();
    return true;
  },

  clearNotifications: async () => {
    useMockDashboardStore.getState().clearNotifications();
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
      title: 'Message Created',
      message: `Message "${campaign.name}" has been ${campaign.status === 'Active' ? 'launched' : 'scheduled'}.`,
      timestamp: Date.now(),
      read: false,
      type: 'success',
      scope: 'DASHBOARD'    
    });
    return newCampaign;
  },

  updateCampaign: async ({ id, updates }: { id: string, updates: any }) => {
    await delay(600);
    useMockDashboardStore.getState().updateCampaign(id, updates);
    return { id, updates };
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
  },

  // Staff Actions
  addStaff: async (staff: any) => {
    await delay(800);
    const id = Math.random().toString(36).substr(2, 9);
    const newStaff = { ...staff, id, lastActive: 'Never', status: 'Active' };
    useMockDashboardStore.getState().addStaff(newStaff);
    return newStaff;
  },

  updateStaffMember: async ({ id, updates }: { id: string, updates: any }) => {
    await delay(500);
    useMockDashboardStore.getState().updateStaffMember(id, updates);
    return { id, updates };
  },

  deleteStaff: async (id: string) => {
    await delay(400);
    useMockDashboardStore.getState().deleteStaff(id);
    return id;
  },

  // Device Actions
  addDevice: async (device: any) => {
    await delay(800);
    const id = Math.random().toString(36).substr(2, 9);
    const newDevice = { 
      ...device, 
      id,
      lastActive: 'Never', 
      status: 'active', 
      batteryLevel: 100,
      totalScans: 0,
      timestamp: Date.now()
    };
    useMockDashboardStore.getState().addDevice(newDevice);
    return newDevice;
  },

  updateDevice: async ({ id, updates }: { id: string, updates: any }) => {
    await delay(500);
    useMockDashboardStore.getState().updateDevice(id, updates);
    return { id, updates };
  },

  deleteDevice: async (id: string) => {
    await delay(400);
    useMockDashboardStore.getState().deleteDevice(id);
    return id;
  },

  updateReward: async ({ id, updates }: { id: string, updates: any }) => {
    await delay(500);
    useMockDashboardStore.getState().updateReward(id, updates);
    return { id, updates };
  },

  approveRedemption: async (id: string) => {
    await delay(700);
    useMockDashboardStore.getState().approveRedemption(id);
    return id;
  },

  declineRedemption: async (id: string) => {
    await delay(600);
    useMockDashboardStore.getState().declineRedemption(id);
    return id;
  },

  updateVisitor: async ({ id, updates }: { id: string, updates: any }) => {
    await delay(500);
    useMockDashboardStore.getState().updateVisitor(id, updates);
    return { id, updates };
  },

  deleteVisitor: async (id: string) => {
    await delay(400);
    useMockDashboardStore.getState().deleteVisitor(id);
    return id;
  }
};
