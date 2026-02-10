import React from 'react';
import defaultLogo from '@/assets/logos/logo.png';

interface VisitorHeaderProps {
    logoUrl?: string | null;
    storeName: string;
    tag?: string;
}

export const VisitorHeader: React.FC<VisitorHeaderProps> = ({ logoUrl, storeName, tag = "Verified Partner" }) => {
    return (
        <div className="flex items-center gap-4 mb-8">
            <div className="size-14 rounded-full bg-white shadow-lg shadow-primary/5 border border-slate-100 overflow-hidden flex items-center justify-center p-1.5">
                <img
                    src={logoUrl || defaultLogo.src}
                    alt={storeName}
                    className="w-full h-full object-contain"
                />
            </div>
            <div className="flex-1 min-w-0 text-left">
                <h2 className="text-lg font-black text-slate-900 truncate tracking-tight">{storeName}</h2>
                <span className="text-[9px] font-bold text-primary uppercase tracking-[0.2em] block">{tag}</span>
            </div>
        </div>
    );
};
