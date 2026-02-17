'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useMessagingStore, Thread, Message } from '@/lib/store/useMessagingStore';
import { messagingApi } from '@/lib/api/messaging';
import { Search, Send, Paperclip, MoreVertical, Check, CheckCheck, Phone, Video, User } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'react-hot-toast';

interface ChannelInboxProps {
    channel: 'SMS' | 'WhatsApp' | 'Email';
}

export default function ChannelInbox({ channel }: ChannelInboxProps) {
    const { threads, messages, updateThread } = useMessagingStore();
    const [activeThreadId, setActiveThreadId] = useState<string | null>(null);
    const [filteredThreads, setFilteredThreads] = useState<Thread[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [replyContent, setReplyContent] = useState('');
    const [isSending, setIsSending] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // Filter threads by channel
    useEffect(() => {
        const relevant = threads.filter(t => t.channel === channel);
        setFilteredThreads(relevant);
        if (!activeThreadId && relevant.length > 0) {
            setActiveThreadId(relevant[0].id);
        }
    }, [threads, channel, activeThreadId]);

    // Scroll to bottom of chat
    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages, activeThreadId]);

    const activeThread = threads.find(t => t.id === activeThreadId);
    const activeMessages = messages.filter(m => m.threadId === activeThreadId).sort((a, b) => a.timestamp - b.timestamp);

    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!replyContent.trim() || !activeThreadId) return;

        setIsSending(true);
        try {
            await messagingApi.sendMessage(activeThreadId, replyContent, channel);
            setReplyContent('');
        } catch (error) {
            toast.error('Failed to send message. Check your credits.');
        } finally {
            setIsSending(false);
        }
    };

    const handleSelectThread = (id: string) => {
        setActiveThreadId(id);
        // Mark as read potentially
        const thread = threads.find(t => t.id === id);
        if (thread && thread.unreadCount > 0) {
            updateThread(id, { unreadCount: 0 });
        }
    };

    return (
        <div className="flex h-[calc(100vh-200px)] bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
            {/* Sidebar List */}
            <div className="w-80 border-r border-gray-200 flex flex-col">
                <div className="p-4 border-b border-gray-100">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                        <input
                            type="text"
                            placeholder="Search conversation..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full h-10 pl-9 pr-4 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                        />
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto">
                    {filteredThreads.length === 0 ? (
                        <div className="p-8 text-center text-text-secondary text-sm">
                            No conversations yet.
                        </div>
                    ) : (
                        filteredThreads.map(thread => (
                            <button
                                key={thread.id}
                                onClick={() => handleSelectThread(thread.id)}
                                className={cn(
                                    "w-full p-4 flex items-start gap-3 border-b border-gray-50 transition-colors hover:bg-gray-50 text-left",
                                    activeThreadId === thread.id && "bg-blue-50/50 hover:bg-blue-50/50"
                                )}
                            >
                                <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 shrink-0">
                                    <User size={20} />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex justify-between items-start mb-1">
                                        <h4 className={cn("font-bold text-sm truncate", activeThreadId === thread.id ? "text-primary" : "text-text-main")}>
                                            {thread.customerName}
                                        </h4>
                                        <span className="text-[10px] text-gray-400">
                                            {new Date(thread.lastMessageTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                        </span>
                                    </div>
                                    <p className={cn("text-xs truncate", thread.unreadCount > 0 ? "font-bold text-text-main" : "text-text-secondary")}>
                                        {thread.lastMessage}
                                    </p>
                                </div>
                                {thread.unreadCount > 0 && (
                                    <div className="min-w-[18px] h-[18px] rounded-full bg-primary text-white text-[10px] font-bold flex items-center justify-center">
                                        {thread.unreadCount}
                                    </div>
                                )}
                            </button>
                        ))
                    )}
                </div>
            </div>

            {/* Chat Area */}
            <div className="flex-1 flex flex-col">
                {activeThread ? (
                    <>
                        {/* Chat Header */}
                        <div className="h-16 border-b border-gray-200 flex items-center justify-between px-6 bg-gray-50/50">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                                    {activeThread.customerName.charAt(0)}
                                </div>
                                <div>
                                    <h3 className="font-bold text-text-main text-sm">{activeThread.customerName}</h3>
                                    <p className="text-xs text-text-secondary">
                                        {channel === 'Email' ? activeThread.customerEmail : activeThread.customerPhone}
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <button className="p-2 text-text-secondary hover:bg-gray-100 rounded-lg">
                                    <Phone size={18} />
                                </button>
                                <button className="p-2 text-text-secondary hover:bg-gray-100 rounded-lg">
                                    <Video size={18} />
                                </button>
                                <button className="p-2 text-text-secondary hover:bg-gray-100 rounded-lg">
                                    <MoreVertical size={18} />
                                </button>
                            </div>
                        </div>

                        {/* Messages List */}
                        <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-[#F0F2F5]">
                            {activeMessages.map((msg) => {
                                const isMe = msg.direction === 'outbound';
                                return (
                                    <div key={msg.id} className={cn("flex w-full", isMe ? "justify-end" : "justify-start")}>
                                        <div className={cn(
                                            "max-w-[70%] rounded-xl p-3 shadow-sm relative",
                                            isMe ? "bg-[#DCF8C6] rounded-tr-none" : "bg-white rounded-tl-none"
                                        )}>
                                            <p className="text-sm text-text-main leading-relaxed">{msg.content}</p>
                                            <div className="flex items-center justify-end gap-1 mt-1">
                                                <span className="text-[10px] text-gray-400">
                                                    {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                </span>
                                                {isMe && (
                                                    msg.status === 'read' ? <CheckCheck size={12} className="text-blue-500" /> : <Check size={12} className="text-gray-400" />
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input Area */}
                        <div className="p-4 bg-white border-t border-gray-200">
                            <form onSubmit={handleSendMessage} className="flex gap-4">
                                <button type="button" className="p-2 text-text-secondary hover:bg-gray-100 rounded-full transition-colors">
                                    <Paperclip size={20} />
                                </button>
                                <input
                                    type="text"
                                    value={replyContent}
                                    onChange={(e) => setReplyContent(e.target.value)}
                                    placeholder="Type a message..."
                                    className="flex-1 bg-gray-50 border border-gray-200 rounded-full px-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                                />
                                <button
                                    type="submit"
                                    disabled={!replyContent.trim() || isSending}
                                    className="p-2 bg-primary text-white rounded-full hover:bg-primary-hover disabled:opacity-50 transition-all shadow-md active:scale-95"
                                >
                                    <Send size={20} />
                                </button>
                            </form>
                        </div>
                    </>
                ) : (
                    <div className="flex-1 flex flex-col items-center justify-center text-text-secondary">
                        <MessageSquare size={48} className="mb-4 opacity-20" />
                        <p className="font-bold">Select a conversation to start messaging</p>
                    </div>
                )}
            </div>
        </div>
    );
}
