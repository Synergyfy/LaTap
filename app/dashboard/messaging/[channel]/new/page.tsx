'use client';

import React from 'react';
import { notFound } from 'next/navigation';
import MessageBuilder from '@/components/messaging/MessageBuilder';
import { MessageChannel } from '@/lib/store/useMessagingStore';

interface Props {
    params: Promise<{
        channel: string;
    }>;
}

export default async function NewMessagePage(props: Props) {
    const params = await props.params;
    const { channel } = params;

    const channelMap: Record<string, MessageChannel> = {
        'sms': 'SMS',
        'whatsapp': 'WhatsApp',
        'email': 'Email'
    };

    const type = channelMap[channel.toLowerCase()];
    if (!type) return notFound();

    return <MessageBuilder defaultChannel={type} />;
}
