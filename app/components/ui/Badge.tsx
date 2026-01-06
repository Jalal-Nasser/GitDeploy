import React from "react";

export const Badge = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
    <span className={`inline-flex items-center rounded-full border border-purple-500/30 bg-purple-500/10 px-2.5 py-1 text-xs font-medium text-purple-200 shadow-[0_0_10px_rgba(168,85,247,0.2)] ${className}`}>
        {children}
    </span>
);
