import React from 'react';
import { motion } from 'framer-motion';

interface EngagementTileProps {
    icon: string;
    label: string;
    description: string;
    onClick: () => void;
    color: string;
}

const EngagementTile: React.FC<EngagementTileProps> = ({ icon, label, description, onClick, color }) => (
    <motion.button
        whileHover={{ scale: 1.02, backgroundColor: 'rgba(0,0,0,0.02)' }}
        whileTap={{ scale: 0.98 }}
        onClick={onClick}
        className="w-full p-4 flex items-center gap-4 rounded-2xl border border-gray-100 bg-white shadow-sm transition-all text-left group"
    >
        <div className={`size-12 rounded-xl ${color} flex items-center justify-center shrink-0`}>
            <span className="material-symbols-outlined text-2xl">{icon}</span>
        </div>
        <div className="flex-1">
            <h4 className="text-sm font-black text-slate-900 leading-tight">{label}</h4>
            <p className="text-[10px] font-medium text-slate-500 mt-0.5">{description}</p>
        </div>
        <span className="material-symbols-outlined text-slate-300 group-hover:text-primary transition-colors">arrow_forward_ios</span>
    </motion.button>
);

interface EngagementTilesProps {
    onAction: (type: 'review' | 'social' | 'feedback') => void;
    settings?: {
        showReview?: boolean;
        showSocial?: boolean;
        showFeedback?: boolean;
    };
}

export const EngagementTiles: React.FC<EngagementTilesProps> = ({
    onAction,
    settings = { showReview: true, showSocial: true, showFeedback: true }
}) => {
    return (
        <div className="w-full space-y-3 mt-8">
            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 text-left ml-1 mb-4">
                Boost Your Experience
            </h3>

            {settings.showReview && (
                <EngagementTile
                    icon="star"
                    label="Leave a Review"
                    description="Share your experience on Google"
                    color="bg-amber-50 text-amber-500"
                    onClick={() => onAction('review')}
                />
            )}

            {settings.showSocial && (
                <EngagementTile
                    icon="share"
                    label="Follow on Social"
                    description="Stay updated with our latest news"
                    color="bg-blue-50 text-blue-500"
                    onClick={() => onAction('social')}
                />
            )}

            {settings.showFeedback && (
                <EngagementTile
                    icon="chat_bubble"
                    label="Quick Feedback"
                    description="Help us improve our service"
                    color="bg-purple-50 text-purple-500"
                    onClick={() => onAction('feedback')}
                />
            )}
        </div>
    );
};
