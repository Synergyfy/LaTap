'use client';

import React, { useState, useEffect, useRef } from 'react';
import { X, Send, Minimize2, Maximize2, MessageCircle } from 'lucide-react';

interface Message {
    id: string;
    text: string;
    sender: 'user' | 'bot' | 'agent';
    timestamp: Date;
}

interface SupportChatbotProps {
    onRequestConsultation?: () => void;
}

export default function SupportChatbot({ onRequestConsultation }: SupportChatbotProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [isFullScreen, setIsFullScreen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        {
            id: '1',
            text: 'Hi! 👋 I\'m your ElizTap AI assistant. How can I help you today?',
            sender: 'bot',
            timestamp: new Date()
        }
    ]);
    const [inputValue, setInputValue] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [agentAvailable, setAgentAvailable] = useState(true);
    const [handedToAgent, setHandedToAgent] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const generateBotResponse = (userMessage: string): string => {
        const lowerMessage = userMessage.toLowerCase();

        // Consultation keywords
        if (lowerMessage.includes('consultation') || lowerMessage.includes('consult') || lowerMessage.includes('speak to agent') || lowerMessage.includes('talk to someone')) {
            if (agentAvailable) {
                setTimeout(() => setHandedToAgent(true), 1500);
                return 'Great! Let me connect you with one of our support agents. They\'ll be with you shortly...';
            } else {
                return 'I\'d love to connect you with an agent, but they\'re all currently assisting other customers. Would you like to schedule a consultation or leave a message?';
            }
        }

        // Pricing
        if (lowerMessage.includes('price') || lowerMessage.includes('cost') || lowerMessage.includes('plan')) {
            return 'We offer flexible pricing plans starting from a Free tier up to Enterprise solutions. Our Basic plan starts at ₦15,000/month, Premium at ₦45,000/month, and we have custom Enterprise packages. Would you like more details about a specific plan?';
        }

        // NFC/Hardware
        if (lowerMessage.includes('nfc') || lowerMessage.includes('hardware') || lowerMessage.includes('device')) {
            return 'Our NFC devices are enterprise-grade and support contactless data capture. We offer NFC cards, tags, and custom hardware solutions. Would you like to know about specific hardware options or see our marketplace?';
        }

        // Features
        if (lowerMessage.includes('feature') || lowerMessage.includes('what can') || lowerMessage.includes('capabilities')) {
            return 'ElizTap offers visitor data capture, real-time analytics, CRM integration, automated follow-ups, and much more! We help businesses convert physical foot traffic into digital leads. What specific feature interests you?';
        }

        // Support
        if (lowerMessage.includes('help') || lowerMessage.includes('support') || lowerMessage.includes('issue') || lowerMessage.includes('problem')) {
            return 'I\'m here to help! You can ask me about our products, pricing, features, or technical questions. For complex issues, I can connect you with a human agent. What do you need assistance with?';
        }

        // Getting started
        if (lowerMessage.includes('start') || lowerMessage.includes('begin') || lowerMessage.includes('sign up') || lowerMessage.includes('register')) {
            return 'Getting started is easy! You can sign up for a free account, set up your first NFC device, and start capturing visitor data within minutes. Would you like me to guide you through the process or connect you with an onboarding specialist?';
        }

        // Default response
        return 'That\'s a great question! While I can help with general inquiries about our products, pricing, and features, would you like me to connect you with a specialist who can provide more detailed information?';
    };

    const handleSendMessage = async () => {
        if (!inputValue.trim()) return;

        const userMessage: Message = {
            id: Date.now().toString(),
            text: inputValue,
            sender: 'user',
            timestamp: new Date()
        };

        setMessages(prev => [...prev, userMessage]);
        setInputValue('');
        setIsTyping(true);

        // Simulate bot thinking time
        setTimeout(() => {
            const botResponse: Message = {
                id: (Date.now() + 1).toString(),
                text: handedToAgent
                    ? 'Agent Sarah is now handling your request. How can I assist you today?'
                    : generateBotResponse(inputValue),
                sender: handedToAgent ? 'agent' : 'bot',
                timestamp: new Date()
            };
            setMessages(prev => [...prev, botResponse]);
            setIsTyping(false);
        }, 1000 + Math.random() * 1000);
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    const quickActions = [
        { label: '💰 Pricing Plans', action: 'Tell me about pricing plans' },
        { label: '🚀 Get Started', action: 'How do I get started?' },
        { label: '📱 NFC Devices', action: 'Tell me about NFC devices' },
        { label: '👤 Talk to Agent', action: 'I need to speak to an agent' },
    ];

    const handleQuickAction = (action: string) => {
        setInputValue(action);
        setTimeout(() => handleSendMessage(), 100);
    };

    return (
        <>
            {/* Floating Chat Button */}
            {!isOpen && (
                <button
                    onClick={() => setIsOpen(true)}
                    className="fixed bottom-6 right-6 z-50 group"
                    aria-label="Open support chat"
                >
                    <div className="relative">
                        {/* Animated gradient pulse */}
                        <div className="absolute inset-0 rounded-full bg-linear-to-r from-primary to-blue-400 opacity-75 animate-pulse blur-md"></div>

                        {/* Main button */}
                        <div className="relative w-16 h-16 rounded-full bg-linear-to-br from-primary to-blue-500 shadow-2xl flex items-center justify-center transform transition-all duration-300 group-hover:scale-110 group-active:scale-95">
                            <MessageCircle className="text-white" size={28} />

                            {/* Notification badge */}
                            <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center border-2 border-white">
                                <span className="text-white text-xs font-bold">1</span>
                            </div>
                        </div>

                        {/* Leaking gradient effect */}
                        <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-linear-to-br from-primary to-blue-400 rounded-full opacity-60 animate-ping"></div>
                    </div>
                </button>
            )}

            {/* Chat Window */}
            {isOpen && (
                <div
                    className={`fixed z-50 bg-white shadow-2xl transition-all duration-300 ${isFullScreen
                        ? 'inset-0 rounded-none'
                        : 'bottom-6 right-6 w-[400px] h-[600px] rounded-2xl'
                        }`}
                    style={{
                        maxWidth: isFullScreen ? '100%' : '400px',
                        maxHeight: isFullScreen ? '100%' : '600px'
                    }}
                >
                    {/* Header */}
                    <div className="relative h-20 bg-linear-to-br from-primary to-blue-500 rounded-t-2xl px-6 flex items-center justify-between overflow-hidden">
                        {/* Animated background pattern */}
                        <div className="absolute inset-0 opacity-10">
                            <div className="absolute inset-0 bg-linear-to-r from-transparent via-white to-transparent animate-shimmer"></div>
                        </div>

                        <div className="relative flex items-center gap-3">
                            <div className="relative">
                                <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                                    <MessageCircle className="text-white" size={24} />
                                </div>
                                {agentAvailable && !handedToAgent && (
                                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 rounded-full border-2 border-white"></div>
                                )}
                            </div>
                            <div>
                                <h3 className="text-white font-bold text-lg">
                                    {handedToAgent ? 'Agent Sarah' : 'ElizTap Support'}
                                </h3>
                                <p className="text-white/80 text-xs font-medium">
                                    {handedToAgent ? 'Support Agent' : 'AI Assistant • Online'}
                                </p>
                            </div>
                        </div>

                        <div className="relative flex items-center gap-2">
                            <button
                                onClick={() => setIsFullScreen(!isFullScreen)}
                                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                                aria-label={isFullScreen ? 'Minimize' : 'Maximize'}
                            >
                                {isFullScreen ? (
                                    <Minimize2 className="text-white" size={20} />
                                ) : (
                                    <Maximize2 className="text-white" size={20} />
                                )}
                            </button>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                                aria-label="Close chat"
                            >
                                <X className="text-white" size={20} />
                            </button>
                        </div>
                    </div>

                    {/* Messages Area */}
                    <div className="h-[calc(100%-180px)] overflow-y-auto p-4 space-y-4 bg-gray-50">
                        {messages.map((message) => (
                            <div
                                key={message.id}
                                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                            >
                                <div
                                    className={`max-w-[80%] rounded-2xl px-4 py-3 ${message.sender === 'user'
                                        ? 'bg-primary text-white rounded-br-none'
                                        : message.sender === 'agent'
                                            ? 'bg-green-500 text-white rounded-bl-none'
                                            : 'bg-white border border-gray-200 text-text-main rounded-bl-none'
                                        }`}
                                >
                                    <p className="text-sm font-medium leading-relaxed">{message.text}</p>
                                    <p
                                        className={`text-xs mt-1 ${message.sender === 'user' || message.sender === 'agent'
                                            ? 'text-white/70'
                                            : 'text-gray-400'
                                            }`}
                                    >
                                        {message.timestamp.toLocaleTimeString([], {
                                            hour: '2-digit',
                                            minute: '2-digit'
                                        })}
                                    </p>
                                </div>
                            </div>
                        ))}

                        {isTyping && (
                            <div className="flex justify-start">
                                <div className="bg-white border border-gray-200 rounded-2xl rounded-bl-none px-4 py-3">
                                    <div className="flex gap-1">
                                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                                    </div>
                                </div>
                            </div>
                        )}

                        <div ref={messagesEndRef} />
                    </div>

                    {/* Quick Actions */}
                    {messages.length <= 2 && !handedToAgent && (
                        <div className="px-4 py-2 bg-gray-50 border-t border-gray-200">
                            <div className="flex flex-wrap gap-2">
                                {quickActions.map((qa, index) => (
                                    <button
                                        key={index}
                                        onClick={() => handleQuickAction(qa.action)}
                                        className="px-3 py-1.5 bg-white border border-gray-200 rounded-full text-xs font-bold text-text-secondary hover:border-primary hover:text-primary transition-all"
                                    >
                                        {qa.label}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Input Area */}
                    <div className="absolute bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-200 rounded-b-2xl">
                        <div className="flex items-end gap-2">
                            <div className="flex-1 relative">
                                <textarea
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                    onKeyPress={handleKeyPress}
                                    placeholder="Type your message..."
                                    rows={1}
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-primary/20 focus:bg-white transition-all text-sm font-medium"
                                    style={{ maxHeight: '100px' }}
                                />
                            </div>
                            <button
                                onClick={handleSendMessage}
                                disabled={!inputValue.trim()}
                                className="p-3 bg-linear-to-br from-primary to-blue-500 text-white rounded-xl hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed active:scale-95"
                                aria-label="Send message"
                            >
                                <Send size={20} />
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <style jsx>{`
                @keyframes shimmer {
                    0% {
                        transform: translateX(-100%);
                    }
                    100% {
                        transform: translateX(100%);
                    }
                }
                .animate-shimmer {
                    animation: shimmer 3s infinite;
                }
            `}</style>
        </>
    );
}
