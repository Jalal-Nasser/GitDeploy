
import React from 'react';

// Using static image for reliable styling and theming
// Image URL: https://get.microsoft.com/images/en-us%20light.svg
// Store URL: https://apps.microsoft.com/detail/9n5c328ctl7d

interface MsStoreBadgeProps {
    productId?: string;
    productName?: string;
    windowMode?: "popup" | "direct";
    theme?: "light" | "dark" | "auto";
    size?: "small" | "large";
    language?: string;
    animation?: "on" | "off";
    className?: string;
    style?: React.CSSProperties;
}

export function MsStoreBadge({
    productId = "9n5c328ctl7d",
    productName = "PassGen Secrets Vault",
    windowMode = "direct",
    theme = "light", // Default to light as requested
    size = "large",
    language = "en-us",
    animation = "on",
    className,
    style
}: MsStoreBadgeProps) {
    const storeUrl = `https://apps.microsoft.com/detail/${productId}`;
    const badgeUrl = "https://get.microsoft.com/images/en-us%20light.svg";

    // Determine dimensions based on size prop if no style width provided
    // Standard sizes: Large ~284x96px (approx 3:1), Small ~120px
    const defaultStyles: React.CSSProperties = size === 'large'
        ? { width: '284px', maxWidth: '100%' }
        : { width: '120px', maxWidth: '100%' };

    // Merge styles: default -> className-implied (not easily reachable here) -> prop style
    // We apply defaults to the image or wrapper. Let's apply to wrapper 'a' tag to constrain it.

    return (
        <a
            href={storeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`${className} transition-transform duration-200 hover:scale-105 active:scale-95 ease-in-out`}
            style={{ display: 'inline-block', ...defaultStyles, ...style }}
            aria-label={`Download ${productName} from the Microsoft Store`}
        >
            <img
                src={badgeUrl}
                alt="Download from the Microsoft Store"
                style={{ height: 'auto', width: '100%', display: 'block' }}
            />
        </a>
    );
}
