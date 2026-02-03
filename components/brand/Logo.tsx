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
    textClassName = "font-display font-bold tracking-tight text-text-main"
}: LogoProps) {
    return (
        <div className={className}>
            <span
                className="material-icons-round text-primary select-none"
                style={{ fontSize: iconSize }}
            >
                nfc
            </span>
            {withText && (
                <span className={`${fontSize} ${textClassName}`}>LaTap</span>
            )}
        </div>
    );
}
