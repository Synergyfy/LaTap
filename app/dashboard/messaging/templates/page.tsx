'use client';

import React, { useState } from 'react';
import PageHeader from '@/components/dashboard/PageHeader';
import { useMessagingStore, Template } from '@/lib/store/useMessagingStore';
import { Plus, MessageSquare, Copy, Trash2, Edit } from 'lucide-react';
import toast from 'react-hot-toast';

export default function TemplatesPage() {
    const { templates, deleteTemplate } = useMessagingStore();
    const [searchQuery, setSearchQuery] = useState('');

    const filteredTemplates = templates.filter(t =>
        t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.content.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleCopy = (content: string) => {
        navigator.clipboard.writeText(content);
        toast.success('Template copied to clipboard');
    };

    return (
        <div className="p-4 md:p-8">
            <PageHeader
                title="Message Templates"
                description="Manage pre-written messages for quick broadcasting"
                actions={
                    <button className="flex items-center gap-2 px-4 py-2.5 bg-primary text-white font-bold rounded-xl hover:bg-primary-hover transition-all text-sm">
                        <Plus size={18} />
                        New Template
                    </button>
                }
            />

            <div className="mt-8 mb-6">
                <input
                    type="text"
                    placeholder="Search templates..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full max-w-md h-12 px-4 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary/20 transition-all font-medium"
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredTemplates.map((template) => (
                    <div key={template.id} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
                        <div>
                            <div className="flex justify-between items-start mb-4">
                                <div className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${template.channel === 'WhatsApp' ? 'bg-green-100 text-green-700' :
                                        template.channel === 'SMS' ? 'bg-blue-100 text-blue-700' :
                                            template.channel === 'Email' ? 'bg-purple-100 text-purple-700' :
                                                'bg-slate-100 text-slate-700'
                                    }`}>
                                    {template.channel}
                                </div>
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => handleCopy(template.content)}
                                        className="p-1.5 text-gray-400 hover:text-primary transition-colors"
                                        title="Copy Content"
                                    >
                                        <Copy size={16} />
                                    </button>
                                    <button
                                        onClick={() => deleteTemplate(template.id)}
                                        className="p-1.5 text-gray-400 hover:text-red-500 transition-colors"
                                        title="Delete Template"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            </div>
                            <h3 className="font-bold text-text-main mb-2">{template.name}</h3>
                            <p className="text-sm text-text-secondary line-clamp-3 mb-4 leading-relaxed">
                                {template.content}
                            </p>
                        </div>
                        <button className="w-full py-2.5 bg-gray-50 text-text-main font-bold rounded-xl hover:bg-gray-100 transition-colors text-xs flex items-center justify-center gap-2">
                            <Edit size={14} />
                            Edit Template
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}
