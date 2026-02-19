'use client';

import React from 'react';
import MessageBuilder from '@/components/messaging/MessageBuilder';

export default function WhatsAppSendPage() {
    return <MessageBuilder defaultChannel="WhatsApp" />;
}
