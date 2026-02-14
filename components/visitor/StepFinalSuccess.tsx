import React from 'react';
import { motion } from 'framer-motion';
import { presets } from './presets';
import { EngagementTiles } from './EngagementTiles';
import { SocialMediaModal } from '@/components/ui/SocialMediaModal';

interface StepFinalSuccessProps {
    finalSuccessMessage?: string | null;
    customSuccessTitle?: string | null;
    customSuccessButton?: string | null;
    customSuccessTag?: string | null;
    onFinish: () => void;
    onEngagement?: (type: 'review' | 'social' | 'feedback' | 'rewards') => void;
    engagementSettings?: any;
    socialLinks?: any;
}

export const StepFinalSuccess: React.FC<StepFinalSuccessProps> = ({
    finalSuccessMessage,
    customSuccessTitle,
    customSuccessButton,
    customSuccessTag,
    onFinish,
    onEngagement,
    engagementSettings,
    socialLinks
}) => {
    const [isSocialModalOpen, setIsSocialModalOpen] = React.useState(false);

    const handleEngagement = (type: 'review' | 'social' | 'feedback' | 'rewards') => {
        if (type === 'social') {
            setIsSocialModalOpen(true);
        }
        onEngagement?.(type);
    };

    return (
        <motion.div key="final-success" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className={presets.card + " text-center"}>
            <div className="size-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-green-500/20">
                <span className="material-symbols-outlined text-white text-4xl">check_circle</span>
            </div>
            {customSuccessTag && <span className={presets.tag + " mb-2 inline-block"}>{customSuccessTag}</span>}
            <h1 className={presets.title}>{customSuccessTitle || "Successfully Linked!"}</h1>
            <p className={presets.body + " mt-4 mb-8"}>
                {finalSuccessMessage || "Your profile has been successfully updated."}
            </p>

            {/* Engagement Layer preserved in final step */}
            {onEngagement && (
                <div className="mb-8">
                    <EngagementTiles
                        onAction={handleEngagement}
                        settings={engagementSettings}
                    />
                </div>
            )}

            <button onClick={onFinish} className={presets.secondaryButton}>
                {customSuccessButton || "Finish Process"}
            </button>

            <SocialMediaModal
                isOpen={isSocialModalOpen}
                onClose={() => setIsSocialModalOpen(false)}
                socialLinks={socialLinks}
            />
        </motion.div>
    );
};
