'use client';

import React from 'react';
import PageHeader from '@/components/dashboard/PageHeader';

export default function NotificationsPage() {
    const notificationTypes = [
        {
            title: 'New Visitor Alerts',
            desc: 'Get notified as soon as a customer taps your NFC device',
            channels: ['Browser', 'Email']
        },
        {
            title: 'Daily Summary',
            desc: 'Receive a summary of your daily footfall and message performance',
            channels: ['Email']
        },
        {
            title: 'Device Issues',
            desc: 'Alerts if a device goes offline for more than 15 minutes',
            channels: ['Email', 'SMS']
        },
        {
            title: 'Message Reports',
            desc: 'Final reports when a message is completed',
            channels: ['Email']
        },
        {
            title: 'Weekly Insights',
            desc: 'Deep dive into your weekly growth and retention metrics',
            channels: ['Email']
        },
    ];

    return (
        <div className="p-8 max-w-4xl mx-auto">
            <PageHeader
                title="Notifications"
                description="Choose how and when you want to stay updated"
            />

            <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden divide-y divide-gray-100">
                {notificationTypes.map((item, i) => (
                    <div key={i} className="p-8 flex items-center justify-between hover:bg-gray-50 transition-colors">
                        <div className="flex-1 pr-8">
                            <h3 className="font-bold text-text-main mb-1">{item.title}</h3>
                            <p className="text-sm text-text-secondary font-medium">{item.desc}</p>
                            <div className="mt-3 flex gap-2">
                                {item.channels.map((ch, j) => (
                                    <span key={j} className="px-2 py-0.5 bg-gray-100 text-[10px] font-black uppercase tracking-widest text-text-secondary rounded">
                                        {ch}
                                    </span>
                                ))}
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input type="checkbox" defaultChecked className="sr-only peer" />
                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                            </label>
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-8 bg-blue-50 border border-blue-100 rounded-2xl p-6 flex items-start gap-4">
                <span className="material-icons-round text-primary mt-1">info</span>
                <div>
                    <p className="font-bold text-blue-900 mb-1">Email Delivery</p>
                    <p className="text-sm text-blue-800 leading-relaxed font-medium">
                        Notifications are sent to **hello@greenterrace.com**. You can change this in your profile settings.
                    </p>
                </div>
            </div>
        </div>
    );
}
