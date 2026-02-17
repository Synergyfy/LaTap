import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export type MessageChannel = 'SMS' | 'WhatsApp' | 'Email';
export type MessageStatus = 'queued' | 'sent' | 'delivered' | 'read' | 'failed';
export type MessageDirection = 'inbound' | 'outbound';

export interface Wallet {
    credits: number;
    currency: string;
    autoRecharge: boolean;
}

export interface Message {
    id: string;
    threadId: string;
    direction: MessageDirection;
    content: string;
    status: MessageStatus;
    timestamp: number;
    channel: MessageChannel;
    attachments?: string[];
}

export interface Thread {
    id: string;
    customerName: string;
    customerPhone?: string;
    customerEmail?: string;
    channel: MessageChannel;
    lastMessage: string;
    lastMessageTime: number;
    unreadCount: number;
    status: 'open' | 'resolved' | 'archived';
    tags: string[];
}

export interface Template {
    id: string;
    name: string;
    content: string; // Supports {Name} variables
    channel: MessageChannel | 'Any';
    category: 'Marketing' | 'Utility' | 'Auth';
    status: 'approved' | 'pending' | 'rejected';
}

export interface CampaignLog {
    id: string;
    name: string;
    channel: MessageChannel;
    audienceSize: number;
    sent: number;
    delivered: number;
    status: 'Draft' | 'Scheduled' | 'Sending' | 'Completed';
    timestamp: number;
}

interface MessagingState {
    wallet: Wallet;
    threads: Thread[];
    messages: Message[];
    templates: Template[];
    campaigns: CampaignLog[]; // Internal logging for broadcasts
    stats: {
        totalSent: number;
        deliveryRate: number;
        responseRate: number;
    };

    // Actions
    deductCredits: (amount: number) => void;
    addRecharge: (amount: number) => void;
    
    addMessage: (message: Message) => void;
    updateMessageStatus: (id: string, status: MessageStatus) => void;
    
    addThread: (thread: Thread) => void;
    updateThread: (id: string, updates: Partial<Thread>) => void;
    
    addTemplate: (template: Template) => void;
    deleteTemplate: (id: string) => void;
    
    addCampaign: (campaign: CampaignLog) => void;
    
    reset: () => void;
}

// Initial Mock Data
const initialThreads: Thread[] = [
    {
        id: 't1',
        customerName: 'Alice Freeman',
        customerPhone: '+234 801 111 2222',
        channel: 'WhatsApp',
        lastMessage: 'Is the venue open today?',
        lastMessageTime: Date.now() - 1000 * 60 * 5, // 5 mins ago
        unreadCount: 1,
        status: 'open',
        tags: ['inquiry']
    },
    {
        id: 't2',
        customerName: 'Bob Smith',
        channel: 'SMS',
        customerPhone: '+234 809 999 8888',
        lastMessage: 'CONFIRM',
        lastMessageTime: Date.now() - 1000 * 60 * 60 * 2, // 2 hours ago
        unreadCount: 0,
        status: 'resolved',
        tags: ['rsvp']
    },
    {
        id: 't3',
        customerName: 'Carol Danvers',
        channel: 'Email',
        customerEmail: 'carol@marvel.com',
        lastMessage: 'Thank you for the update.',
        lastMessageTime: Date.now() - 1000 * 60 * 60 * 24, // 1 day ago
        unreadCount: 0,
        status: 'open',
        tags: ['vip']
    }
];

const initialMessages: Message[] = [
    { id: 'm1', threadId: 't1', direction: 'inbound', content: 'Hi, I wanted to ask about your opening hours.', status: 'read', timestamp: Date.now() - 1000 * 60 * 10, channel: 'WhatsApp' },
    { id: 'm2', threadId: 't1', direction: 'inbound', content: 'Is the venue open today?', status: 'read', timestamp: Date.now() - 1000 * 60 * 5, channel: 'WhatsApp' },
    { id: 'm3', threadId: 't2', direction: 'outbound', content: 'Please reply CONFIRM to secure your reservation.', status: 'delivered', timestamp: Date.now() - 1000 * 60 * 60 * 2.5, channel: 'SMS' },
    { id: 'm4', threadId: 't2', direction: 'inbound', content: 'CONFIRM', status: 'read', timestamp: Date.now() - 1000 * 60 * 60 * 2, channel: 'SMS' },
    { id: 'm5', threadId: 't3', direction: 'outbound', content: 'Your VIP pass is ready.', status: 'sent', timestamp: Date.now() - 1000 * 60 * 60 * 25, channel: 'Email' },
    { id: 'm6', threadId: 't3', direction: 'inbound', content: 'Thank you for the update.', status: 'read', timestamp: Date.now() - 1000 * 60 * 60 * 24, channel: 'Email' }
];

const initialTemplates: Template[] = [
    { id: 'tpl1', name: 'Welcome Message', content: 'Hi {Name}, welcome to VemTap! expecting you soon.', channel: 'SMS', category: 'Marketing', status: 'approved' },
    { id: 'tpl2', name: 'Reservation Conf', content: 'Hello {Name}, your table is confirmed.', channel: 'WhatsApp', category: 'Utility', status: 'approved' },
    { id: 'tpl3', name: 'Weekly Newsletter', content: 'Check out our weekly updates...', channel: 'Email', category: 'Marketing', status: 'approved' }
];

export const useMessagingStore = create<MessagingState>()(
    persist(
        (set) => ({
            wallet: {
                credits: 500.00,
                currency: 'Points',
                autoRecharge: false
            },
            threads: initialThreads,
            messages: initialMessages,
            templates: initialTemplates,
            campaigns: [],
            stats: {
                totalSent: 1250,
                deliveryRate: 98.5,
                responseRate: 12.4
            },

            deductCredits: (amount) => set((state) => ({
                wallet: { ...state.wallet, credits: Math.max(0, state.wallet.credits - amount) }
            })),
            
            addRecharge: (amount) => set((state) => ({
                wallet: { ...state.wallet, credits: state.wallet.credits + amount }
            })),

            addMessage: (message) => set((state) => ({
                messages: [...state.messages, message]
            })),

            updateMessageStatus: (id, status) => set((state) => ({
                messages: state.messages.map(m => m.id === id ? { ...m, status } : m)
            })),

            addThread: (thread) => set((state) => ({
                threads: [thread, ...state.threads]
            })),

            updateThread: (id, updates) => set((state) => ({
                threads: state.threads.map(t => t.id === id ? { ...t, ...updates } : t)
            })),

            addTemplate: (template) => set((state) => ({
                templates: [...state.templates, template]
            })),

            deleteTemplate: (id) => set((state) => ({
                templates: state.templates.filter(t => t.id !== id)
            })),

            addCampaign: (campaign) => set((state) => ({
                campaigns: [campaign, ...state.campaigns]
            })),

            reset: () => set({
                threads: initialThreads,
                messages: initialMessages,
                templates: initialTemplates,
                campaigns: []
            })
        }),
        {
            name: 'messaging-storage',
            storage: createJSONStorage(() => localStorage),
        }
    )
);
