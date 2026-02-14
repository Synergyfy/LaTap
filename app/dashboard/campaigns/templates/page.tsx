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
    const [activeTab, setActiveTab] = useState<'system' | 'custom'>('system');
    const [editingTemplate, setEditingTemplate] = useState<Template | null>(null);

    const { data, isLoading } = useQuery({
        queryKey: ['dashboard'],
        queryFn: dashboardApi.fetchDashboardData,
    });

    const createTemplateMutation = useMutation({
        mutationFn: dashboardApi.addTemplate,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['dashboard'] });
            setIsCreateModalOpen(false);
            setEditingTemplate(null);
            toast.success('Template saved successfully');
        }
    });

    const updateTemplateMutation = useMutation({
        mutationFn: dashboardApi.updateTemplate,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['dashboard'] });
            setIsCreateModalOpen(false);
            setEditingTemplate(null);
            toast.success('Template updated successfully');
        }
    });

    const deleteTemplateMutation = useMutation({
        mutationFn: dashboardApi.deleteTemplate,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['dashboard'] });
            toast.success('Template deleted');
        }
    });

    const handleSaveTemplate = (formData: any) => {
        if (editingTemplate && !editingTemplate.isSystem) {
            // Edit existing custom template
            updateTemplateMutation.mutate({
                id: editingTemplate.id,
                updates: formData
            });
        } else {
            // Create new or Clone
            const newTemplate = {
                id: Math.random().toString(36).substr(2, 9),
                ...formData,
                isSystem: false // Always ensure created templates are custom
            };
            createTemplateMutation.mutate(newTemplate);
        }
    };

    const openCreateModal = () => {
        setEditingTemplate(null);
        setIsCreateModalOpen(true);
    };

    const openEditModal = (template: Template) => {
        setEditingTemplate(template);
        setIsCreateModalOpen(true);
    };

    const handleUseTemplate = (templateId: string) => {
        router.push(`/dashboard/campaigns?create=true&template=${templateId}`);
    };

    const allTemplates = data?.templates || [];
    const systemTemplates = allTemplates.filter((t: Template) => t.isSystem);
    const customTemplates = allTemplates.filter((t: Template) => !t.isSystem);

    const displayedTemplates = activeTab === 'system' ? systemTemplates : customTemplates;

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
                            onClick={openCreateModal}
                            className="flex items-center gap-2 px-4 py-2 bg-primary text-white font-bold rounded-lg hover:bg-primary-hover transition-all text-sm shadow-md shadow-primary/20"
                        >
                            <Plus size={18} />
                            Create Template
                        </button>
                    }
                />

                {/* Tabs */}
                <div className="flex items-center gap-4 mb-8 border-b border-gray-100">
                    <button
                        onClick={() => setActiveTab('system')}
                        className={`pb-3 px-1 text-sm font-bold transition-all relative ${activeTab === 'system' ? 'text-primary' : 'text-text-secondary hover:text-text-main'}`}
                    >
                        System Templates
                        {activeTab === 'system' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full" />}
                    </button>
                    <button
                        onClick={() => setActiveTab('custom')}
                        className={`pb-3 px-1 text-sm font-bold transition-all relative ${activeTab === 'custom' ? 'text-primary' : 'text-text-secondary hover:text-text-main'}`}
                    >
                        My Templates
                        {activeTab === 'custom' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full" />}
                    </button>
                </div>

                <CreateTemplateModal
                    isOpen={isCreateModalOpen}
                    onClose={() => setIsCreateModalOpen(false)}
                    onSubmit={handleSaveTemplate}
                    isLoading={createTemplateMutation.isPending || updateTemplateMutation.isPending}
                    initialData={editingTemplate}
                />

                {isLoading ? (
                    <div className="flex items-center justify-center p-20">
                        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary"></div>
                    </div>
                ) : (
                    <div className="max-h-[calc(100vh-350px)] overflow-y-auto pr-2">
                        {displayedTemplates.length === 0 && activeTab === 'custom' ? (
                            <div className="text-center py-20 bg-gray-50 rounded-lg border-2 border-dashed border-gray-200">
                                <span className="material-icons-round text-4xl text-gray-300 mb-4">post_add</span>
                                <h3 className="font-bold text-text-main">No custom templates yet</h3>
                                <p className="text-sm text-text-secondary mb-6">Create your own or customize a system template.</p>
                                <button
                                    onClick={() => setActiveTab('system')}
                                    className="text-primary font-bold text-sm hover:underline"
                                >
                                    Browse System Templates
                                </button>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {activeTab === 'custom' && (
                                    <button
                                        onClick={openCreateModal}
                                        className="bg-gray-50 rounded-lg border-2 border-dashed border-gray-200 p-6 flex flex-col items-center justify-center text-center hover:bg-gray-100 hover:border-primary/30 transition-all group min-h-[200px]"
                                    >
                                        <div className="size-12 rounded-full bg-white flex items-center justify-center mb-4 shadow-sm group-hover:scale-110 transition-transform">
                                            <Plus size={24} className="text-gray-400 group-hover:text-primary" />
                                        </div>
                                        <h3 className="font-bold text-text-main mb-1">Create New</h3>
                                        <p className="text-xs text-text-secondary">Build from scratch</p>
                                    </button>
                                )}

                                {displayedTemplates.map((template: Template) => (
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
                                                    {activeTab === 'custom' && (
                                                        <button
                                                            onClick={() => deleteTemplateMutation.mutate(template.id)}
                                                            className="p-1.5 text-gray-400 hover:text-red-500 rounded-lg hover:bg-red-50 transition-all"
                                                            title="Delete Template"
                                                        >
                                                            <Trash2 size={16} />
                                                        </button>
                                                    )}

                                                    <button
                                                        onClick={() => openEditModal(template)}
                                                        className="px-3 py-1.5 bg-gray-50 text-text-main text-xs font-bold rounded-lg hover:bg-gray-100 transition-all border border-gray-200"
                                                    >
                                                        {activeTab === 'system' ? 'Customize' : 'Edit'}
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </PremiumFeatureWrapper>
    );
}
