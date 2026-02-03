'use client';

import React from 'react';
import { Nfc } from 'lucide-react';

interface LogoProps {
    className?: string;
    iconSize?: number;
    fontSize?: string;
    withText?: boolean;
    textClassName?: string;
}

export default function Logo({
    className = "flex items-center gap-2",
    iconSize = 24,
    fontSize = "text-xl",
    withText = true,
    textClassName = "font-display font-semibold tracking-tight text-text-main"
}: LogoProps) {
    return (
        <div className={className}>
            <Nfc className="text-primary" size={iconSize} strokeWidth={2.5} />
            {withText && (
                <span className={`${fontSize} ${textClassName}`}>LaTap</span>
            )}
        </div>
    );
}
