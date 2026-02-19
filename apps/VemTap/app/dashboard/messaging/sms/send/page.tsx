'use client';

import React from 'react';
import MessageBuilder from '@/components/messaging/MessageBuilder';

export default function SMSSendPage() {
    return <MessageBuilder defaultChannel="SMS" />;
}
