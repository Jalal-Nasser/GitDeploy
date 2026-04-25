import React from 'react';

interface AppStoreBadgeProps {
    link?: string;
    className?: string;
    style?: React.CSSProperties;
    size?: "small" | "large";
}

export function AppStoreBadge({
    link = "https://testflight.apple.com/join/Nt1cG1SZ",
    className = "",
    style,
    size = "large"
}: AppStoreBadgeProps) {
    // We match the visual weight of the MS Store badge
    const defaultStyles: React.CSSProperties = size === 'large'
        ? { width: '250px', maxWidth: '100%' }
        : { width: '120px', maxWidth: '100%' };

    return (
        <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className={`${className} transition-transform duration-200 hover:scale-105 active:scale-95 ease-in-out`}
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', ...defaultStyles, ...style }}
            aria-label="Download on the App Store (TestFlight)"
        >
            <img
                src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
                alt="Download on the App Store"
                style={{ height: 'auto', width: '100%', display: 'block' }}
            />
        </a>
    );
}
