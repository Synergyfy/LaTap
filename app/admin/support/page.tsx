'use client';

import React, { useState } from 'react';
import { MessageCircle, User, Clock, Check, Send, Search, Users, Settings, LogOut } from 'lucide-react';
import { useAuthStore } from '@/store/useAuthStore';
import { notify } from '@/lib/notify';

export default function AgentDashboard() {
    const { logout, user } = useAuthStore();
    const [activeChat, setActiveChat] = useState<any>(null);
    const [replyText, setReplyText] = useState('');

    const [chats, setChats] = useState([
        {
            id: 'CH-102', user: 'Guest_2847', lastMessage: 'How do I link my NFC tag?', time: '2 mins ago', status: 'active', messages: [
                { sender: 'user', text: 'How do I link my NFC tag?', time: '10:02 AM' }
            ]
        },
        {
            id: 'CH-105', user: 'Daniel Admin', lastMessage: 'Is the API down?', time: '15 mins ago', status: 'active', messages: [
                { sender: 'user', text: 'Is the API down?', time: '09:48 AM' }
            ]
        },
        {
            id: 'CH-101', user: 'Sarah J.', lastMessage: 'Thanks for the help!', time: '1 hour ago', status: 'resolved', messages: [
                { sender: 'user', text: 'Thanks for the help!', time: '08:12 AM' }
            ]
        },
    ]);

    const handleSendReply = () => {
        if (!replyText.trim() || !activeChat) return;

        const updatedChat = {
            ...activeChat,
            messages: [...activeChat.messages, { sender: 'agent', text: replyText, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }],
            lastMessage: replyText,
            time: 'Just now'
        };

        setChats(chats.map(c => c.id === activeChat.id ? updatedChat : c));
        setActiveChat(updatedChat);
        setReplyText('');
        notify.success('Reply sent successfully.');
    };

    const handleLogout = () => {
        logout();
        notify.success('Logged out and local data cleared.');
        window.location.href = '/login';
    };

    return (
        <div className="flex h-[calc(100vh-64px)] bg-gray-50 border-t border-gray-200">
            {/* Sidebar / Chat List */}
            <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
                <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
                    <h2 className="font-display font-bold text-text-main flex items-center gap-2">
                        <MessageCircle size={20} className="text-primary" />
                        Live Chats
                    </h2>
                    <span className="bg-primary/10 text-primary text-[10px] font-black px-2 py-0.5 rounded-full">{chats.filter(c => c.status === 'active').length}</span>
                </div>

                <div className="p-4 border-b border-gray-100">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
                        <input
                            type="text"
                            placeholder="Search active chats..."
                            className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-100 rounded-lg text-xs font-medium focus:outline-none focus:ring-2 focus:ring-primary/20"
                        />
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto divide-y divide-gray-50">
                    {chats.map((chat) => (
                        <button
                            key={chat.id}
                            onClick={() => setActiveChat(chat)}
                            className={`w-full p-4 flex gap-3 text-left hover:bg-gray-50 transition-colors ${activeChat?.id === chat.id ? 'bg-primary/5 border-l-4 border-primary' : ''}`}
                        >
                            <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center shrink-0">
                                <User size={18} className="text-gray-400" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex justify-between items-center mb-1">
                                    <p className="font-bold text-sm text-text-main truncate">{chat.user}</p>
                                    <p className="text-[10px] text-text-secondary font-bold">{chat.time}</p>
                                </div>
                                <p className="text-xs text-text-secondary truncate font-medium">{chat.lastMessage}</p>
                            </div>
                        </button>
                    ))}
                </div>

                {/* Agent Profile & Logout */}
                <div className="p-4 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold text-xs uppercase">
                            {user?.name?.charAt(0) || 'A'}
                        </div>
                        <div className="min-w-0">
                            <p className="text-xs font-bold text-text-main truncate">{user?.name || 'Agent'}</p>
                            <p className="text-[10px] text-green-600 font-bold flex items-center gap-1">
                                <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
                                Online
                            </p>
                        </div>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                        title="Logout & Clear Data"
                    >
                        <LogOut size={18} />
                    </button>
                </div>
            </div>

            {/* Chat View */}
            <div className="flex-1 flex flex-col bg-white">
                {activeChat ? (
                    <>
                        {/* Chat Header */}
                        <div className="h-16 px-6 border-b border-gray-100 flex items-center justify-between bg-white shadow-sm z-10">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                                    <User size={20} className="text-gray-400" />
                                </div>
                                <div>
                                    <p className="font-bold text-text-main">{activeChat.user}</p>
                                    <p className="text-xs text-text-secondary font-medium">Chatting since {activeChat.time}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <button className="px-4 py-2 text-[10px] font-black uppercase tracking-widest text-text-secondary hover:text-primary transition-colors">Assign to Me</button>
                                <button className="px-4 py-2 bg-green-500 text-white text-[10px] font-black uppercase tracking-widest rounded-lg hover:bg-green-600 shadow-lg shadow-green-100 transition-all flex items-center gap-2">
                                    <Check size={14} />
                                    Resolve Chat
                                </button>
                            </div>
                        </div>

                        {/* Messages Area */}
                        <div className="flex-1 overflow-y-auto p-8 space-y-6 bg-gray-50/30">
                            {activeChat.messages.map((m: any, idx: number) => (
                                <div key={idx} className={`flex ${m.sender === 'agent' ? 'justify-end' : 'justify-start'}`}>
                                    <div className={`max-w-[70%] ${m.sender === 'agent' ? 'bg-primary text-white rounded-2xl rounded-tr-none' : 'bg-white border border-gray-100 text-text-main rounded-2xl rounded-tl-none'} px-4 py-3 shadow-sm`}>
                                        <p className="text-sm leading-relaxed">{m.text}</p>
                                        <p className={`text-[10px] mt-1 text-right ${m.sender === 'agent' ? 'text-white/60' : 'text-text-secondary'} font-bold`}>{m.time}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Input Area */}
                        <div className="p-6 border-t border-gray-100 bg-white">
                            <div className="flex items-end gap-4">
                                <div className="flex-1 p-3 bg-gray-50 border border-gray-200 rounded-2xl focus-within:ring-2 focus-within:ring-primary/20 transition-all">
                                    <textarea
                                        rows={2}
                                        placeholder="Type your response to the visitor..."
                                        value={replyText}
                                        onChange={(e) => setReplyText(e.target.value)}
                                        className="w-full bg-transparent resize-none border-none outline-none text-sm font-medium placeholder:text-gray-400"
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter' && !e.shiftKey) {
                                                e.preventDefault();
                                                handleSendReply();
                                            }
                                        }}
                                    />
                                </div>
                                <button
                                    onClick={handleSendReply}
                                    disabled={!replyText.trim()}
                                    className="size-14 bg-primary text-white rounded-2xl flex items-center justify-center shadow-xl shadow-primary/20 hover:bg-primary-hover transition-all transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <Send size={24} />
                                </button>
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="flex-1 flex flex-col items-center justify-center text-center p-12">
                        <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mb-6">
                            <MessageCircle size={48} className="text-gray-200" />
                        </div>
                        <h3 className="text-xl font-display font-bold text-text-main">Select a conversation</h3>
                        <p className="text-sm text-text-secondary mt-2 max-w-sm">Choose an active chat from the sidebar to start assisting visitors in real-time.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
