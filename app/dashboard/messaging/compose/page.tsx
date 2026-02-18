'use client';

import MessagingLayout from '@/components/messaging/MessagingLayout';
import MessageBuilder from '@/components/messaging/MessageBuilder';

type Channel = 'WHATSAPP' | 'SMS' | 'EMAIL';

interface CampaignType {
    id: string;
    title: string;
    description: string;
    icon: any;
    color: string;
}

export default function ComposeMessagePage() {
    return (
        <MessageBuilder />
    );
}

