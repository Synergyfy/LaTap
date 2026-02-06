'use client';

import React, { useState } from 'react';
import Modal from '@/components/ui/Modal';
import { useCustomerFlowStore } from '@/store/useCustomerFlowStore';
import { MessageSquare, Send, Smartphone } from 'lucide-react';
import { notify } from '@/lib/notify';

interface SendMessageModalProps {
    isOpen: boolean;
    onClose: () => void;
    recipientName: string;
    recipientPhone?: string;
    type: 'welcome' | 'general' | 'reward';
}

export default function SendMessageModal({ isOpen, onClose, recipientName, recipientPhone, type }: SendMessageModalProps) {
    const store = useCustomerFlowStore();

    // Get template from store
    const getTemplate = () => {
        if (type === 'welcome') return store.customWelcomeMessage || 'Welcome back! We are so glad to see you again. Enjoy your stay!';
        if (type === 'reward') return store.customRewardMessage || 'Congratulations! You have earned a reward for your loyalty.';
        return 'Hello {name}, thank you for visiting us! We have a special offer for you.';
    };

    const getTitle = () => {
        if (type === 'welcome') return store.customWelcomeTitle || 'Hi, {name}!';
        return 'Special Message for {name}';
    };

    const [message, setMessage] = useState(getTemplate());
    const [title, setTitle] = useState(getTitle());
    const [isLoading, setIsLoading] = useState(false);

    // Sync with store if it changes
    React.useEffect(() => {
        setMessage(getTemplate());
        setTitle(getTitle());
    }, [type, store.customWelcomeMessage, store.customRewardMessage]);

    const handleSend = async () => {
        setIsLoading(true);
        // Simulate sending
        await new Promise(resolve => setTimeout(resolve, 1500));

        // Update store as requested: "edit from the pop up modal should reflect in the template"
        if (type === 'welcome') {
            store.updateCustomSettings({ welcomeMessage: message, welcomeTitle: title });
        } else if (type === 'reward') {
            store.updateCustomSettings({ rewardMessage: message });
        }

        setIsLoading(false);
        notify.success(`Message sent to ${recipientName} successfully!`);
        onClose();
    };

    // Helper to replace tokens for preview
    const previewMessage = message.replace('{name}', recipientName);
    const previewTitle = title.replace('{name}', recipientName);

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title="Compose Message"
            description={`Personalize and send a message to ${recipientName}`}
            size="2xl"
        >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-4">
                {/* Editor */}
                <div className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-text-secondary ml-1">Message Heading</label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full h-12 bg-gray-50 border border-gray-100 rounded-xl px-5 font-medium outline-none focus:ring-4 focus:ring-primary/10 focus:bg-white transition-all text-sm"
                            placeholder="e.g. Welcome back, {name}"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-text-secondary ml-1">Message Content</label>
                        <textarea
                            rows={6}
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            className="w-full bg-gray-50 border border-gray-100 rounded-xl p-5 font-medium outline-none focus:ring-4 focus:ring-primary/10 focus:bg-white transition-all text-sm resize-none"
                            placeholder="Type your message here..."
                        />
                        <p className="text-[10px] text-text-secondary font-medium px-1">
                            Use <code className="text-primary font-bold">{"{name}"}</code> for customer personalization.
                        </p>
                    </div>

                    <div className="pt-4 flex gap-3">
                        <button
                            onClick={onClose}
                            className="flex-1 h-14 border border-gray-100 text-text-main font-bold rounded-2xl hover:bg-gray-50 transition-all text-sm active:scale-95"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleSend}
                            disabled={isLoading}
                            className="flex-2 h-14 bg-primary text-white font-bold rounded-2xl hover:bg-primary-hover transition-all shadow-xl shadow-primary/20 flex items-center justify-center gap-2 active:scale-95 disabled:opacity-50"
                        >
                            {isLoading ? (
                                <div className="size-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                            ) : (
                                <>
                                    <Send size={18} />
                                    Send Message
                                </>
                            )}
                        </button>
                    </div>
                </div>

                {/* Live Preview */}
                <div className="bg-gray-50 rounded-3xl p-6 border border-gray-100 flex flex-col items-center">
                    <div className="w-full max-w-[240px] aspect-9/16 bg-gray-900 rounded-[2.5rem] border-4 border-gray-800 shadow-2xl relative overflow-hidden flex flex-col">
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-4 bg-gray-800 rounded-b-xl z-10"></div>
                        <div className="flex-1 bg-white m-1 rounded-4xl overflow-hidden flex flex-col p-4 pt-10">
                            <div className="size-10 bg-primary/10 rounded-full flex items-center justify-center text-primary mb-4 mx-auto">
                                <MessageSquare size={20} />
                            </div>
                            <h4 className="text-sm font-display font-black text-text-main text-center leading-tight mb-2">
                                {previewTitle}
                            </h4>
                            <p className="text-[10px] text-text-secondary font-medium text-center leading-relaxed">
                                {previewMessage}
                            </p>

                            <div className="mt-auto pt-4">
                                <button className="w-full py-2 bg-primary text-white text-[10px] font-bold rounded-lg shadow-md shadow-primary/20">
                                    View Details
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="mt-4 flex items-center gap-2 text-text-secondary">
                        <Smartphone size={14} />
                        <span className="text-[10px] font-bold uppercase tracking-widest text-text-secondary">Smartphone Preview</span>
                    </div>
                </div>
            </div>
        </Modal>
    );
}
