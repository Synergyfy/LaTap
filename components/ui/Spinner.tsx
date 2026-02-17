import React from 'react';

interface SpinnerProps {
    size?: 'sm' | 'md' | 'lg' | 'xl';
    className?: string;
    color?: 'primary' | 'white' | 'gray';
}

export default function Spinner({ size = 'md', className = '', color = 'primary' }: SpinnerProps) {
    const sizeClasses = {
        sm: 'w-4 h-4 border-2',
        md: 'w-6 h-6 border-2',
        lg: 'w-8 h-8 border-3',
        xl: 'w-12 h-12 border-4',
    };

    const colorClasses = {
        primary: 'border-primary border-t-transparent',
        white: 'border-white border-t-transparent',
        gray: 'border-gray-300 border-t-gray-600',
    };

    return (
        <div
            className={`
                rounded-full animate-spin 
                ${sizeClasses[size]} 
                ${colorClasses[color]} 
                ${className}
            `}
            role="status"
            aria-label="loading"
        >
            <span className="sr-only">Loading...</span>
        </div>
    );
}
