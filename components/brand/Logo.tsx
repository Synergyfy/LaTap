'use client';

import React from 'react';
import Image from 'next/image';

interface LogoProps {
    className?: string;
    iconSize?: number;
}

export default function Logo({
    className = "flex items-center gap-2",
    iconSize = 73
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
        </div>
    );
}
