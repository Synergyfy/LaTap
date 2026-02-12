'use client';

import React, { useState, useEffect, Suspense } from 'react';
import DashboardSidebar from '@/components/dashboard/DashboardSidebar';
import PageHeader from '@/components/dashboard/PageHeader';
import StatsCard from '@/components/dashboard/StatsCard';
import DataTable, { Column } from '@/components/dashboard/DataTable';
import EmptyState from '@/components/dashboard/EmptyState';
import CreateMessageModal from '@/components/dashboard/CreateMessageModal';
import DeleteConfirmationModal from '@/components/dashboard/DeleteConfirmationModal';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { dashboardApi } from '@/lib/api/dashboard';
import { Campaign } from '@/lib/store/mockDashboardStore';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuthStore } from '@/store/useAuthStore';
import toast from 'react-hot-toast';
import { BarChart, Send, Eye, Edit, Trash2, Plus, FileText } from 'lucide-react';

function MessagesContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { user } = useAuthStore();
    const queryClient = useQueryClient();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingMessage, setEditingMessage] = useState<Campaign | null>(null);
    const [templateData, setTemplateData] = useState<Partial<Campaign> | null>(null);
    const [deleteCampaignId, setDeleteCampaignId] = useState<string | null>(null);

    const { data, isLoading } = useQuery({
        queryKey: ['dashboard'],
        queryFn: dashboardApi.fetchDashboardData,
    });

    // Check for 'create' query param to auto-open modal
    useEffect(() => {
        if (!isLoading && data && searchParams.get('create') === 'true') {
            const templateId = searchParams.get('template');
            if (templateId) {
                const template = data.templates?.find((t: any) => t.id === templateId);
                if (template) {
                    setTemplateData({
                        name: template.title,
                        type: template.type === 'Any' ? 'WhatsApp' : template.type,
                        content: template.content,
                        audience: 'All Customers',
                        status: 'Active',
                    });
                    toast.success('Template loaded! Customize your message below.');
                }
            }
            setIsModalOpen(true);
            router.replace('/dashboard/campaigns');
        }
    }, [searchParams, router, data, isLoading]);

    // Protection: Only Owners and Managers can manage messages
    useEffect(() => {
        if (!isLoading && user && user.role === 'staff') {
            router.push('/dashboard');
        }
    }, [user, isLoading, router]);

    const messages = data?.campaigns || [];

    const deleteMutation = useMutation({
        mutationFn: dashboardApi.deleteCampaign,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['dashboard'] });
            toast.success('Message deleted successfully');
            setDeleteCampaignId(null);
        }
    });

    const createMutation = useMutation({
        mutationFn: dashboardApi.createCampaign,
        onSuccess: (newMessage) => {
            queryClient.invalidateQueries({ queryKey: ['dashboard'] });
            setIsModalOpen(false);
            toast.success(`Message "${newMessage.name}" created!`);
        }
    });

    const updateMutation = useMutation({
        mutationFn: dashboardApi.updateCampaign,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['dashboard'] });
            setEditingMessage(null);
            toast.success('Message updated successfully');
        }
    });

    const handleCreateOrUpdate = (formData: any) => {
        if (editingMessage) {
            updateMutation.mutate({ id: editingMessage.id, updates: formData });
        } else {
            createMutation.mutate(formData);
        }
    };

    const confirmDeleteCampaign = () => {
        if (deleteCampaignId) {
            deleteMutation.mutate(deleteCampaignId);
        }
    };

    const stats = [
        { label: 'Total Sent', value: messages.reduce((acc: number, c: Campaign) => acc + c.sent, 0).toLocaleString(), icon: Send, color: 'blue' as const, trend: { value: '+15%', isUp: true } },
        { label: 'Avg. Delivery', value: '94%', icon: Eye, color: 'green' as const, trend: { value: '+2%', isUp: true } },
        { label: 'Total Clicks', value: messages.reduce((acc: number, c: Campaign) => acc + c.clicks, 0).toLocaleString(), icon: FileText, color: 'purple' as const, trend: { value: '+1.5%', isUp: true } },
        { label: 'Active Messages', value: messages.filter((c: Campaign) => c.status === 'Active').length.toString(), icon: BarChart, color: 'yellow' as const, trend: { value: '0', isUp: true } },
    ];

    const columns: Column<Campaign>[] = [
        {
            header: 'Message Name',
            accessor: (item: Campaign) => (
                <div>
                    <p className="font-bold text-text-main">{item.name}</p>
                    <p className="text-xs text-text-secondary">{item.audience}</p>
                </div>
            )
        },
        {
            header: 'Channel',
            accessor: (item: Campaign) => (
                <div className="flex items-center gap-2">
                    <span className="material-icons-round text-lg text-text-secondary">
                        {item.type === 'WhatsApp' ? 'chat' : item.type === 'SMS' ? 'textsms' : 'email'}
                    </span>
                    <span className="text-sm font-medium">{item.type}</span>
                </div>
            )
        },
        { header: 'Sent', accessor: 'sent' },
        { header: 'Delivery', accessor: 'delivered' },
        {
            header: 'Status',
            accessor: (item: Campaign) => (
                <span className={`inline-flex px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${item.status === 'Active' ? 'bg-green-100 text-green-700' :
                    item.status === 'Scheduled' ? 'bg-blue-100 text-blue-700' :
                        item.status === 'Recurring' ? 'bg-purple-100 text-purple-700' :
                            'bg-gray-100 text-gray-700'
                    }`}>
                    {item.status}
                </span>
            )
        },
        {
            header: 'Actions',
            accessor: (item: Campaign) => (
                <div className="flex items-center gap-2">
                    <button
                        className="p-1.5 text-text-secondary hover:text-primary hover:bg-primary/5 rounded-lg transition-colors"
                        onClick={() => router.push(`/dashboard/campaigns/${item.id}`)}
                        title="View Analytics"
                    >
                        <BarChart size={18} />
                    </button>
                    <button
                        className="p-1.5 text-text-secondary hover:text-text-main hover:bg-gray-100 rounded-lg transition-colors"
                        onClick={() => setEditingMessage(item)}
                        title="Edit Message"
                    >
                        <Edit size={18} />
                    </button>
                    <button
                        className="p-1.5 text-text-secondary hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                        onClick={() => setDeleteCampaignId(item.id)}
                        title="Delete Message"
                    >
                        <Trash2 size={18} />
                    </button>
                </div>
            )
        }
    ];

    return (
        <div className="p-8">
            <PageHeader
                title="Messages"
                description="Reach your customers with targeted messaging"
                actions={
                    <div className="flex gap-3">
                        <button
                            onClick={() => router.push('/dashboard/campaigns/templates')}
                            className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 text-text-main font-bold rounded-xl hover:bg-gray-50 transition-all text-sm"
                        >
                            <FileText size={18} />
                            Templates
                        </button>
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="flex items-center gap-2 px-4 py-2.5 bg-primary text-white font-bold rounded-xl hover:bg-primary-hover transition-all text-sm shadow-lg shadow-primary/20 active:scale-95"
                        >
                            <Plus size={18} />
                            Create Message
                        </button>
                    </div>
                }
            />

            <CreateMessageModal
                isOpen={isModalOpen || !!editingMessage}
                onClose={() => {
                    setIsModalOpen(false);
                    setEditingMessage(null);
                    setTemplateData(null);
                }}
                onSubmit={handleCreateOrUpdate}
                isLoading={createMutation.isPending || updateMutation.isPending}
                initialData={editingMessage || templateData}
                isEditing={!!editingMessage}
            />

            <DeleteConfirmationModal
                isOpen={!!deleteCampaignId}
                onClose={() => setDeleteCampaignId(null)}
                onConfirm={confirmDeleteCampaign}
                title="Delete Message?"
                description="This action cannot be undone. This message will be permanently removed."
                isLoading={deleteMutation.isPending}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {stats.map((stat, index) => (
                    <StatsCard key={index} {...stat as any} />
                ))}
            </div>

            {isLoading ? (
                <div className="flex items-center justify-center p-20">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                </div>
            ) : (
                <DataTable
                    columns={columns}
                    data={messages}
                    emptyState={
                        <EmptyState
                            icon="campaign"
                            title="No messages yet"
                            description="Start your first marketing message to drive repeat visits and increase revenue."
                            action={{
                                label: "Create Message",
                                onClick: () => setIsModalOpen(true),
                                icon: "add"
                            }}
                        />
                    }
                />
            )}
        </div>
    );
}

export default function AllMessagesPage() {
    return (
        <DashboardSidebar>
            <div className="p-4 md:p-8">
                <Suspense fallback={<div className="p-8"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div></div>}>
                    <MessagesContent />
                </Suspense>
            </div>
        </DashboardSidebar>
    );
}
