'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import PageHeader from '@/components/dashboard/PageHeader';
import { Plus, Trash2 } from 'lucide-react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { dashboardApi } from '@/lib/api/dashboard';
import { Template } from '@/lib/store/mockDashboardStore';
import CreateTemplateModal from '@/components/dashboard/CreateTemplateModal';
import toast from 'react-hot-toast';
import PremiumFeatureWrapper from '@/components/dashboard/PremiumFeatureWrapper';

export default function CampaignTemplatesPage() {
    const router = useRouter();
    const queryClient = useQueryClient();
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

    const { data, isLoading } = useQuery({
        queryKey: ['dashboard'],
        queryFn: dashboardApi.fetchDashboardData,
    });

    const createTemplateMutation = useMutation({
        mutationFn: dashboardApi.addTemplate,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['dashboard'] });
            setIsCreateModalOpen(false);
            toast.success('Template created successfully');
        }
    });

    const deleteTemplateMutation = useMutation({
        mutationFn: dashboardApi.deleteTemplate,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['dashboard'] });
            toast.success('Template deleted');
        }
    });

    const handleCreateTemplate = (formData: any) => {
        const newTemplate = {
            id: Math.random().toString(36).substr(2, 9),
            ...formData
        };
        createTemplateMutation.mutate(newTemplate);
    };

    const handleUseTemplate = (templateId: string) => {
        router.push(`/dashboard/campaigns?create=true&template=${templateId}`);
    };

    const templates = data?.templates || [];

    return (
        <PremiumFeatureWrapper
            featureName="Marketing Templates"
            description="Use pre-built message formats to launch your campaigns faster."
        >
            <div className="p-8">
                <PageHeader
                    title="Message Templates"
                    description="Quick-start your campaigns with pre-built message formats"
                    actions={
                        <button
                            onClick={() => setIsCreateModalOpen(true)}
                            className="flex items-center gap-2 px-4 py-2.5 bg-primary text-white font-bold rounded-xl hover:bg-primary-hover transition-all text-sm shadow-md shadow-primary/20"
                        >
                            <Plus size={18} />
                            Create Template
                        </button>
                    }
                />

                <CreateTemplateModal
                    isOpen={isCreateModalOpen}
                    onClose={() => setIsCreateModalOpen(false)}
                    onSubmit={handleCreateTemplate}
                    isLoading={createTemplateMutation.isPending}
                />

                {isLoading ? (
                    <div className="flex items-center justify-center p-20">
                        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary"></div>
                    </div>
                ) : (
                    <div className="max-h-[calc(100vh-300px)] overflow-y-auto pr-2">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {templates.map((template: Template) => (
                                <div key={template.id} className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-all group flex flex-col justify-between">
                                    <div className="p-6">
                                        <div className="flex items-start justify-between mb-4">
                                            <div className={`w-10 h-10 rounded-lg flex items-center justify-center bg-gray-50 text-text-secondary group-hover:bg-primary/10 group-hover:text-primary transition-colors`}>
                                                <span className="material-icons-round text-xl">description</span>
                                            </div>
                                            <span className="px-2 py-1 bg-gray-50 text-[10px] font-black uppercase tracking-wider text-text-secondary rounded">
                                                {template.category}
                                            </span>
                                        </div>
                                        <h3 className="text-lg font-display font-bold text-text-main mb-2 tracking-tight">{template.title}</h3>
                                        <p className="text-xs text-text-secondary leading-relaxed line-clamp-3 italic mb-4">
                                            "{template.content}"
                                        </p>
                                    </div>
                                    <div className="p-6 pt-0 border-t border-gray-100 mt-auto">
                                        <div className="flex items-center justify-between pt-4">
                                            <div className="flex items-center gap-1.5">
                                                <span className="material-icons-round text-sm text-gray-400">devices</span>
                                                <span className="text-[10px] font-bold text-text-secondary uppercase tracking-widest">{template.type}</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <button
                                                    onClick={() => deleteTemplateMutation.mutate(template.id)}
                                                    className="p-1.5 text-gray-400 hover:text-red-500 rounded-lg hover:bg-red-50 transition-all"
                                                    title="Delete Template"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                                <button
                                                    onClick={() => handleUseTemplate(template.id)}
                                                    className="text-primary text-xs font-bold hover:underline flex items-center gap-1"
                                                >
                                                    Use This
                                                    <span className="material-icons-round text-sm">arrow_forward</span>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}

                            <button
                                onClick={() => setIsCreateModalOpen(true)}
                                className="bg-gray-50 rounded-lg border-2 border-dashed border-gray-200 p-6 flex flex-col items-center justify-center text-center hover:bg-gray-100 hover:border-primary/30 transition-all group min-h-[200px]"
                            >
                                <div className="size-12 rounded-full bg-white flex items-center justify-center mb-4 shadow-sm group-hover:scale-110 transition-transform">
                                    <Plus size={24} className="text-gray-400 group-hover:text-primary" />
                                </div>
                                <h3 className="font-bold text-text-main mb-1">Custom Template</h3>
                                <p className="text-xs text-text-secondary">Build from scratch</p>
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </PremiumFeatureWrapper>
    );
}
