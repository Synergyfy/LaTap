'use client';

import React from 'react';
import Image from 'next/image';

interface LogoProps {
    className?: string;
    iconSize?: number;
    fontSize?: string;
    withText?: boolean;
    textClassName?: string;
}

export default function Logo({
    className = "flex items-center gap-2",
    iconSize = 32,
    fontSize = "text-xl",
    withText = true,
    textClassName = "font-display font-bold tracking-tight text-text-main"
}: LogoProps) {
    return (
        <div className={className}>
            <Image
                src="/assets/VEMTAP_PNG.png"
                alt="VemTap Logo"
                width={iconSize}
                height={iconSize}
                className="object-contain"
            />
            {withText && (
                <span className={`${fontSize} ${textClassName}`}>VemTap</span>
            )}
        </div>
    );
}
