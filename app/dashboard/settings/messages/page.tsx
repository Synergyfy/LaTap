'use client';

import React, { useState } from 'react';
import DashboardSidebar from '@/components/dashboard/DashboardSidebar';
import PageHeader from '@/components/dashboard/PageHeader';
import { useCustomerFlowStore } from '@/store/useCustomerFlowStore';
import { StepWelcomeBack } from '@/components/visitor/StepWelcomeBack';
import { StepFinalSuccess } from '@/components/visitor/StepFinalSuccess';
import { motion, AnimatePresence } from 'framer-motion';
import { HelpCircle, X, CheckCircle2, Gift, ArrowRight, MessageSquare, Smartphone, ChevronLeft, ChevronRight } from 'lucide-react';
import { notify } from '@/lib/notify';

export default function MessageSettingsPage() {
    const store = useCustomerFlowStore();
    const [activeTab, setActiveTab] = useState<'welcome' | 'success' | 'rewards'>('welcome');
    const [showRulesModal, setShowRulesModal] = useState(false);
    const [previewIndex, setPreviewIndex] = useState(0);

    // Local state for preview updates before saving
    const [settings, setSettings] = useState({
        welcomeMessage: store.customWelcomeMessage || 'Welcome back! We are so glad to see you again. Enjoy your stay!',
        successMessage: store.customSuccessMessage || 'Check-in successful! You are all set. Thank you for visiting us.',
        rewardMessage: store.customRewardMessage || 'Congratulations! You have earned a reward for your loyalty.',
        rewardEnabled: store.hasRewardSetup,
        rewardVisitThreshold: store.rewardVisitThreshold,
        logoUrl: store.logoUrl || ''
    });

    const handleSave = () => {
        store.updateCustomSettings(settings);
        notify.success('Your message settings have been updated and are live!');
    };

    return (
        <DashboardSidebar>
            <div className="p-8 max-w-7xl mx-auto space-y-8">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <PageHeader
                        title="Customer engagement messages"
                        description="Customize the automated touchpoints your customers see when they tap at your venue."
                    />
                    <button
                        onClick={() => setShowRulesModal(true)}
                        className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl text-xs font-bold text-text-secondary hover:text-primary hover:border-primary/20 transition-all shadow-sm"
                    >
                        <HelpCircle size={16} />
                        Loyalty rule guide
                    </button>
                </div>

                <div className="grid grid-cols-1 xl:grid-cols-2 gap-10">
                    {/* Settings Panel */}
                    <div className="space-y-6">
                        {/* Tabs */}
                        <div className="flex bg-gray-100 p-1.5 rounded-xl">
                            <button
                                onClick={() => setActiveTab('welcome')}
                                className={`flex-1 py-3 text-xs font-bold rounded-lg transition-all ${activeTab === 'welcome' ? 'bg-white shadow-md text-primary' : 'text-text-secondary hover:bg-gray-200/50'}`}
                            >
                                Returning message
                            </button>
                            <button
                                onClick={() => setActiveTab('success')}
                                className={`flex-1 py-3 text-xs font-bold rounded-lg transition-all ${activeTab === 'success' ? 'bg-white shadow-md text-primary' : 'text-text-secondary hover:bg-gray-200/50'}`}
                            >
                                Final check-in
                            </button>
                            <button
                                onClick={() => setActiveTab('rewards')}
                                className={`flex-1 py-3 text-xs font-bold rounded-lg transition-all ${activeTab === 'rewards' ? 'bg-white shadow-md text-primary' : 'text-text-secondary hover:bg-gray-200/50'}`}
                            >
                                Reward rules
                            </button>
                        </div>

                        <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full translate-x-16 -translate-y-16 blur-2xl"></div>

                            <AnimatePresence mode="wait">
                                {activeTab === 'welcome' && (
                                    <motion.div
                                        key="welcome"
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        className="space-y-6"
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className="size-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600">
                                                <MessageSquare size={24} />
                                            </div>
                                            <div>
                                                <h3 className="font-display font-bold text-lg text-text-main">Returning user message</h3>
                                                <p className="text-xs text-text-secondary font-medium">Shown to customers who have visited before.</p>
                                            </div>
                                        </div>

                                        <div className="space-y-3">
                                            <label className="text-[10px] font-bold text-text-secondary ml-1">Message content</label>
                                            <textarea
                                                rows={5}
                                                className="w-full bg-gray-50 border border-gray-100 rounded-xl p-5 font-medium outline-none focus:ring-4 focus:ring-primary/10 focus:bg-white transition-all text-sm resize-none"
                                                value={settings.welcomeMessage}
                                                onChange={(e) => setSettings({ ...settings, welcomeMessage: e.target.value })}
                                                placeholder="e.g. Welcome back to Green Terrace! Your next coffee is on us after 3 more visits."
                                            />
                                            <div className="flex justify-between items-center px-1">
                                                <div className="flex gap-3">
                                                    <p className="text-[10px] text-text-secondary font-medium">Tokens: <code className="text-primary font-bold">{"{name}"}</code>, <code className="text-primary font-bold">{"{visits}"}</code>, <code className="text-primary font-bold">{"{remaining}"}</code></p>
                                                </div>
                                                <p className="text-[10px] text-text-secondary font-medium">{settings.welcomeMessage.length}/200</p>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}

                                {activeTab === 'success' && (
                                    <motion.div
                                        key="success"
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        className="space-y-6"
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className="size-12 bg-green-50 rounded-xl flex items-center justify-center text-green-600">
                                                <CheckCircle2 size={24} />
                                            </div>
                                            <div>
                                                <h3 className="font-display font-bold text-lg text-text-main">Final success message</h3>
                                                <p className="text-xs text-text-secondary font-medium">The last screen customers see before finishing.</p>
                                            </div>
                                        </div>

                                        <div className="space-y-3">
                                            <label className="text-[10px] font-bold text-text-secondary ml-1">Message content</label>
                                            <textarea
                                                rows={5}
                                                className="w-full bg-gray-50 border border-gray-100 rounded-xl p-5 font-medium outline-none focus:ring-4 focus:ring-primary/10 focus:bg-white transition-all text-sm resize-none"
                                                value={settings.successMessage}
                                                onChange={(e) => setSettings({ ...settings, successMessage: e.target.value })}
                                                placeholder="e.g. You are all set! Your check-in is verified."
                                            />
                                        </div>
                                    </motion.div>
                                )}

                                {activeTab === 'rewards' && (
                                    <motion.div
                                        key="rewards"
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        className="space-y-8"
                                    >
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-4">
                                                <div className="size-12 bg-orange-50 rounded-xl flex items-center justify-center text-orange-600">
                                                    <Gift size={24} />
                                                </div>
                                                <div>
                                                    <h3 className="font-display font-bold text-lg text-text-main">Loyalty programs</h3>
                                                    <p className="text-xs text-text-secondary font-medium">Reward your frequent customers automatically.</p>
                                                </div>
                                            </div>

                                            <label className="relative inline-flex items-center cursor-pointer group">
                                                <input
                                                    type="checkbox"
                                                    checked={settings.rewardEnabled}
                                                    onChange={(e) => setSettings({ ...settings, rewardEnabled: e.target.checked })}
                                                    className="sr-only peer"
                                                />
                                                <div className="w-14 h-7 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[4px] after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary shadow-inner"></div>
                                            </label>
                                        </div>

                                        <div className={`space-y-8 transition-all duration-500 ${!settings.rewardEnabled ? 'opacity-30 pointer-events-none grayscale' : ''}`}>
                                            <div className="space-y-4 bg-gray-50 p-6 rounded-xl border border-gray-100">
                                                <div className="flex justify-between items-center px-1">
                                                    <label className="text-[10px] font-bold text-text-secondary">Visit milestone</label>
                                                    <div className="flex items-center gap-2">
                                                        <input
                                                            type="number"
                                                            min="1"
                                                            max="100"
                                                            value={settings.rewardVisitThreshold}
                                                            onChange={(e) => setSettings({ ...settings, rewardVisitThreshold: Math.min(100, Math.max(1, parseInt(e.target.value) || 1)) })}
                                                            className="w-16 h-8 bg-white border border-gray-200 rounded-lg text-center font-bold text-xs outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/30"
                                                        />
                                                        <span className="text-[10px] font-bold text-text-secondary">visits</span>
                                                    </div>
                                                </div>
                                                <input
                                                    type="range"
                                                    min="1"
                                                    max="50"
                                                    step="1"
                                                    value={settings.rewardVisitThreshold > 50 ? 50 : settings.rewardVisitThreshold}
                                                    onChange={(e) => setSettings({ ...settings, rewardVisitThreshold: parseInt(e.target.value) })}
                                                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary"
                                                />
                                                <div className="flex justify-between text-[10px] font-bold text-text-secondary px-1">
                                                    <span>1 visit</span>
                                                    <span>50+ visits</span>
                                                </div>
                                            </div>

                                            <div className="space-y-3">
                                                <label className="text-[10px] font-bold text-text-secondary ml-1">Threshold reached message</label>
                                                <textarea
                                                    rows={3}
                                                    className="w-full bg-gray-50 border border-gray-100 rounded-xl p-5 font-medium outline-none focus:ring-4 focus:ring-primary/10 focus:bg-white transition-all text-sm resize-none"
                                                    placeholder="e.g. You've earned a free drink! Show this to our staff."
                                                    value={settings.rewardMessage}
                                                    onChange={(e) => setSettings({ ...settings, rewardMessage: e.target.value })}
                                                />
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            <div className="mt-10 pt-8 border-t border-gray-100">
                                <button
                                    onClick={handleSave}
                                    className="w-full h-14 bg-primary text-white font-bold rounded-xl shadow-xl shadow-primary/20 hover:bg-primary-hover hover:-translate-y-0.5 transition-all active:scale-[0.98] flex items-center justify-center gap-3 text-sm"
                                >
                                    Update customer experience
                                    <Smartphone size={18} />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Preview Panel with Carousel */}
                    <div className="space-y-6">
                        <div className="flex items-center justify-between px-4">
                            <h3 className="text-sm font-bold text-text-secondary">Interactive preview</h3>
                            <div className="flex items-center gap-4">
                                <div className="flex items-center gap-2">
                                    <div className="size-2 rounded-full bg-green-500 animate-pulse"></div>
                                    <span className="text-[10px] font-bold text-green-600">Live sync</span>
                                </div>
                                <div className="flex bg-gray-200 p-1 rounded-lg">
                                    <button
                                        onClick={() => setPreviewIndex(0)}
                                        className={`px-3 py-1 text-[10px] font-bold transition-all rounded-md ${previewIndex === 0 ? 'bg-white shadow-sm text-primary' : 'text-text-secondary hover:text-text-main'}`}
                                    >
                                        Screen A
                                    </button>
                                    <button
                                        onClick={() => setPreviewIndex(1)}
                                        className={`px-3 py-1 text-[10px] font-bold transition-all rounded-md ${previewIndex === 1 ? 'bg-white shadow-sm text-primary' : 'text-text-secondary hover:text-text-main'}`}
                                    >
                                        Screen B
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="relative group bg-gray-100 rounded-3xl border border-gray-200 shadow-inner overflow-hidden min-h-[600px] flex items-center justify-center p-8">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={previewIndex}
                                    drag="x"
                                    dragConstraints={{ left: 0, right: 0 }}
                                    onDragEnd={(e, { offset, velocity }) => {
                                        const swipe = offset.x;
                                        if (swipe < -50 && previewIndex === 0) {
                                            setPreviewIndex(1);
                                        } else if (swipe > 50 && previewIndex === 1) {
                                            setPreviewIndex(0);
                                        }
                                    }}
                                    initial={{ opacity: 0, x: previewIndex === 0 ? -100 : 100 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: previewIndex === 0 ? 100 : -100 }}
                                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                    className="w-full max-w-[380px] cursor-grab active:cursor-grabbing"
                                >
                                    {previewIndex === 0 ? (
                                        /* Device 1: Returning / Welcome */
                                        <div className="space-y-6">
                                            <div className="flex flex-col items-center gap-1">
                                                <p className="text-[10px] font-bold text-text-secondary">Screen A</p>
                                                <p className="text-xs font-bold text-text-main">Returning user flow</p>
                                            </div>
                                            <div className="bg-gray-900 rounded-3xl p-4 shadow-2xl border-[6px] border-gray-800 aspect-[10/18] relative overflow-hidden">
                                                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-6 bg-gray-800 rounded-b-xl z-50"></div>
                                                <div className="bg-white w-full h-full rounded-xl overflow-hidden relative flex flex-col">
                                                    <div className="flex-1 overflow-y-auto pt-12 px-5 bg-gray-50">
                                                        <StepWelcomeBack
                                                            storeName={store.storeName}
                                                            logoUrl={store.logoUrl}
                                                            customWelcomeMessage={settings.welcomeMessage}
                                                            visitCount={settings.rewardVisitThreshold - 1}
                                                            userData={{ name: 'John Doe', email: 'john@example.com' }}
                                                            rewardVisitThreshold={settings.rewardVisitThreshold}
                                                            hasRewardSetup={settings.rewardEnabled}
                                                            redemptionStatus="none"
                                                            onRedeem={() => { }}
                                                            onContinue={() => { }}
                                                            onClear={() => { }}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        /* Device 2: Final Success */
                                        <div className="space-y-6">
                                            <div className="flex flex-col items-center gap-1">
                                                <p className="text-[10px] font-bold text-text-secondary">Screen B</p>
                                                <p className="text-xs font-bold text-text-main">Completion success</p>
                                            </div>
                                            <div className="bg-gray-900 rounded-3xl p-4 shadow-2xl border-[6px] border-gray-800 aspect-[10/18] relative overflow-hidden">
                                                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-6 bg-gray-800 rounded-b-xl z-50"></div>
                                                <div className="bg-white w-full h-full rounded-xl overflow-hidden relative flex flex-col">
                                                    <div className="flex-1 overflow-y-auto pt-12 px-5 bg-gray-50">
                                                        <StepFinalSuccess
                                                            finalSuccessMessage={settings.successMessage}
                                                            onFinish={() => { }}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </motion.div>
                            </AnimatePresence>

                            {/* Carousel Navigation Buttons */}
                            <button
                                onClick={() => setPreviewIndex(0)}
                                className={`absolute left-4 p-3 rounded-full bg-white/80 backdrop-blur-sm border border-gray-200 shadow-lg text-text-secondary hover:text-primary transition-all ${previewIndex === 0 ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
                            >
                                <ChevronLeft size={24} />
                            </button>
                            <button
                                onClick={() => setPreviewIndex(1)}
                                className={`absolute right-4 p-3 rounded-full bg-white/80 backdrop-blur-sm border border-gray-200 shadow-lg text-text-secondary hover:text-primary transition-all ${previewIndex === 1 ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
                            >
                                <ChevronRight size={24} />
                            </button>

                            {/* Navigation Dots */}
                            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3">
                                {[0, 1].map((idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => setPreviewIndex(idx)}
                                        className={`size-2.5 rounded-full transition-all duration-300 ${previewIndex === idx ? 'bg-primary w-8' : 'bg-gray-300 hover:bg-gray-400'}`}
                                    />
                                ))}
                            </div>
                        </div>
                        <p className="text-center text-[10px] font-bold text-text-secondary uppercase">Swipe or use controls to see different customer screens</p>
                    </div>
                </div>
            </div>

            {/* Loyalty Rules Modal */}
            <AnimatePresence>
                {showRulesModal && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-text-main/80 backdrop-blur-xl"
                            onClick={() => setShowRulesModal(false)}
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            className="relative w-full max-w-2xl bg-white rounded-2xl overflow-hidden shadow-2xl"
                        >
                            <div className="p-10">
                                <div className="flex justify-between items-start mb-10">
                                    <div className="flex items-center gap-4">
                                        <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                                            <HelpCircle size={28} />
                                        </div>
                                        <div>
                                            <h2 className="text-2xl font-display font-bold text-text-main">Loyalty system guide</h2>
                                            <p className="text-sm font-medium text-text-secondary">How your reward logic works for customers</p>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => setShowRulesModal(false)}
                                        className="p-3 hover:bg-gray-100 rounded-full transition-colors text-text-secondary"
                                    >
                                        <X size={24} />
                                    </button>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
                                    <div className="p-6 bg-gray-50 rounded-xl border border-gray-100">
                                        <div className="flex items-center gap-3 mb-4 text-primary">
                                            <ArrowRight size={20} />
                                            <h4 className="font-bold text-sm text-text-main">Visit threshold</h4>
                                        </div>
                                        <p className="text-xs text-text-secondary font-medium leading-relaxed">
                                            The milestone a customer must reach to unlock a reward. For example, if set to <strong>5</strong>, their 5th check-in will trigger the reward screen.
                                        </p>
                                    </div>

                                    <div className="p-6 bg-gray-50 rounded-xl border border-gray-100">
                                        <div className="flex items-center gap-3 mb-4 text-orange-600">
                                            <Gift size={20} />
                                            <h4 className="font-bold text-sm text-text-main">Digital redemption</h4>
                                        </div>
                                        <p className="text-xs text-text-secondary font-medium leading-relaxed">
                                            When a user reaches the threshold, they see your <strong>reward message</strong>. They must show this screen to your staff to claim it physically.
                                        </p>
                                    </div>

                                    <div className="p-6 bg-gray-50 rounded-xl border border-gray-100">
                                        <div className="flex items-center gap-3 mb-4 text-blue-600">
                                            <MessageSquare size={20} />
                                            <h4 className="font-bold text-sm text-text-main">Dynamic tokens</h4>
                                        </div>
                                        <p className="text-xs text-text-secondary font-medium leading-relaxed">
                                            Personalize messages with <code className="text-primary font-bold">{"{name}"}</code>, <code className="text-primary font-bold">{"{visits}"}</code> (total visits), or <code className="text-primary font-bold">{"{remaining}"}</code> (visits until next reward).
                                        </p>
                                    </div>

                                    <div className="p-6 bg-gray-50 rounded-xl border border-gray-100">
                                        <div className="flex items-center gap-3 mb-4 text-green-600">
                                            <CheckCircle2 size={20} />
                                            <h4 className="font-bold text-sm text-text-main">Automatic reset</h4>
                                        </div>
                                        <p className="text-xs text-text-secondary font-medium leading-relaxed">
                                            After a customer successfully redeems their reward, their visit count subtracts the threshold and starts building toward the next one.
                                        </p>
                                    </div>
                                </div>

                                <button
                                    onClick={() => setShowRulesModal(false)}
                                    className="w-full h-16 bg-primary text-white font-bold rounded-xl hover:bg-primary-hover shadow-xl shadow-primary/20 transition-all flex items-center justify-center"
                                >
                                    Got it, proceed
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </DashboardSidebar>
    );
}
