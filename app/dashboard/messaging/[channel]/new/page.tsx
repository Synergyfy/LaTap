'use client';

import React from 'react';
import { notFound } from 'next/navigation';
import CampaignBuilder from '@/components/messaging/CampaignBuilder';
import { MessageChannel } from '@/lib/store/useMessagingStore';

interface Props {
    params: Promise<{
        channel: string;
    }>;
}

export default async function NewCampaignPage(props: Props) {
    const params = await props.params;
    const { channel } = params;

    const channelMap: Record<string, MessageChannel> = {
        'sms': 'SMS',
        'whatsapp': 'WhatsApp',
        'email': 'Email'
    };

    const type = channelMap[channel.toLowerCase()];
    if (!type) return notFound();

    return <CampaignBuilder defaultChannel={type} />;
}
